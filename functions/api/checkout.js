// POST /api/checkout
// Reçoit le panier { items: [{productId, size, qty}], shipMethod }, valide les
// prix contre le catalogue serveur (jamais le prix envoyé par le client), crée
// une commande "pending" dans KV, ouvre une session Stripe Checkout et renvoie
// l'URL de paiement hébergée par Stripe.

import { CATALOG } from '../_catalog.js';
import { json } from '../_auth.js';

const ALLOWED_COUNTRIES = ['FR', 'BE', 'CH', 'LU', 'DE', 'IT', 'ES', 'GB', 'US'];

function genOrderId() {
  const year = new Date().getFullYear();
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `MC-${year}-${rand}`;
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.STRIPE_SECRET_KEY) {
      console.log('config_error: STRIPE_SECRET_KEY manquant');
      return json({ error: 'paiement_non_configure' }, 500);
    }

    const body = await request.json().catch(() => ({}));
    const rawItems = Array.isArray(body.items) ? body.items : [];
    const shipMethod = body.shipMethod === 'express' ? 'express' : 'standard';

    // Validation : on reconstruit chaque ligne depuis le catalogue serveur.
    const items = [];
    for (const it of rawItems) {
      const ref = CATALOG[it && it.productId];
      if (!ref) continue;
      const qty = Math.max(1, Math.min(20, parseInt(it.qty, 10) || 1));
      const size = String(it.size || 'OS').slice(0, 12);
      items.push({ productId: it.productId, name: ref.name, price: ref.price, size, qty });
    }
    if (items.length === 0) return json({ error: 'panier_vide' }, 400);

    const subtotal = items.reduce((s, l) => s + l.price * l.qty, 0);
    const shippingCents =
      subtotal >= 250 ? (shipMethod === 'express' ? 3200 : 0)
        : (shipMethod === 'express' ? 3200 : 1800);

    const orderId = genOrderId();
    const origin = new URL(request.url).origin;

    // Commande en attente — confirmée par le webhook après paiement.
    if (env.ORDERS) {
      const pending = {
        id: orderId,
        ts: Date.now(),
        status: 'pending',
        items,
        subtotal,
        shippingCents,
        currency: 'eur',
      };
      await env.ORDERS.put(`order:${orderId}`, JSON.stringify(pending), {
        expirationTtl: 60 * 60 * 24, // purge auto si jamais payé (24 h)
      });
    }

    // Session Stripe Checkout (hosted page).
    const params = new URLSearchParams();
    params.append('mode', 'payment');
    items.forEach((li, i) => {
      params.append(`line_items[${i}][price_data][currency]`, 'eur');
      params.append(`line_items[${i}][price_data][unit_amount]`, String(Math.round(li.price * 100)));
      params.append(`line_items[${i}][price_data][product_data][name]`, `${li.name} — ${li.size}`);
      params.append(`line_items[${i}][quantity]`, String(li.qty));
    });
    if (shippingCents > 0) {
      params.append('shipping_options[0][shipping_rate_data][type]', 'fixed_amount');
      params.append('shipping_options[0][shipping_rate_data][fixed_amount][amount]', String(shippingCents));
      params.append('shipping_options[0][shipping_rate_data][fixed_amount][currency]', 'eur');
      params.append('shipping_options[0][shipping_rate_data][display_name]', shipMethod === 'express' ? 'Express' : 'Standard');
    }
    params.append('success_url', `${origin}/?checkout=success&order=${orderId}`);
    params.append('cancel_url', `${origin}/?checkout=cancel`);
    params.append('locale', 'fr');
    params.append('allow_promotion_codes', 'true');
    params.append('billing_address_collection', 'required');
    params.append('phone_number_collection[enabled]', 'true');
    params.append('metadata[orderId]', orderId);
    params.append('payment_intent_data[metadata][orderId]', orderId);
    ALLOWED_COUNTRIES.forEach((cc, i) => {
      params.append(`shipping_address_collection[allowed_countries][${i}]`, cc);
    });

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.log('stripe_error', res.status, data && data.error && data.error.message);
      return json({ error: 'stripe_error' }, 502);
    }
    return json({ url: data.url, orderId }, 200);
  } catch (err) {
    console.log('server_error', err && err.message);
    return json({ error: 'server_error' }, 500);
  }
}
