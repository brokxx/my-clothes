// POST /api/webhook — endpoint appelé par Stripe après paiement.
// Vérifie la signature HMAC, puis sur `checkout.session.completed` confirme la
// commande "pending" dans KV (statut paid + coordonnées client + adresse).

const txt = (status, msg = '') =>
  new Response(msg, { status, headers: { 'content-type': 'text/plain; charset=utf-8' } });

// Vérification de la signature Stripe (header `stripe-signature`).
async function verifyStripeSignature(rawBody, sigHeader, secret, toleranceSec = 300) {
  if (!sigHeader || !secret) return false;
  const parts = Object.fromEntries(
    sigHeader.split(',').map((p) => {
      const i = p.indexOf('=');
      return i === -1 ? [p, ''] : [p.slice(0, i), p.slice(i + 1)];
    })
  );
  const t = parts.t;
  if (!t) return false;
  const ts = parseInt(t, 10);
  if (!Number.isFinite(ts)) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSec - ts) > toleranceSec) return false;

  const v1List = sigHeader
    .split(',')
    .map((p) => p.split('='))
    .filter(([k]) => k === 'v1')
    .map(([, v]) => v);
  if (!v1List.length) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(`${t}.${rawBody}`));
  const expected = Array.from(new Uint8Array(mac)).map((b) => b.toString(16).padStart(2, '0')).join('');

  return v1List.some((sig) => {
    if (sig.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
    return diff === 0;
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    console.log('config_error: STRIPE_WEBHOOK_SECRET manquant');
    return txt(500, 'config_error');
  }

  const rawBody = await request.text();
  const sigHeader = request.headers.get('stripe-signature') || '';
  const ok = await verifyStripeSignature(rawBody, sigHeader, env.STRIPE_WEBHOOK_SECRET);
  if (!ok) {
    console.log('webhook_signature_invalid');
    return txt(400, 'invalid_signature');
  }

  let event;
  try { event = JSON.parse(rawBody); } catch { return txt(400, 'invalid_json'); }

  if (event.type !== 'checkout.session.completed') return txt(200, 'ignored');

  const session = event.data && event.data.object;
  if (!session || session.payment_status !== 'paid') return txt(200, 'not_paid');

  const orderId = session.metadata && session.metadata.orderId;
  if (!orderId || !env.ORDERS) {
    console.log('webhook_no_order', session.id);
    return txt(200, 'no_order');
  }

  const raw = await env.ORDERS.get(`order:${orderId}`);
  const pending = raw ? JSON.parse(raw) : null;

  const details = session.customer_details || {};
  const ship = session.shipping_details || null;
  const addr = (ship && ship.address) || details.address || {};

  const order = {
    ...(pending || { id: orderId, items: [], ts: Date.now() }),
    id: orderId,
    status: 'paid',
    paidAt: Date.now(),
    stripeSessionId: session.id,
    total: (session.amount_total || 0) / 100,
    currency: (session.currency || 'eur'),
    paymentMethod: 'card',
    customer: {
      name: (ship && ship.name) || details.name || '',
      email: details.email || session.customer_email || '',
      phone: details.phone || '',
      city: addr.city || '',
      address: addr.line1 || '',
      address2: addr.line2 || '',
      zip: addr.postal_code || '',
      country: addr.country || '',
    },
  };

  // Stocké sans TTL (commande payée = à conserver). Préfixe `paid:` pour le listing.
  await env.ORDERS.put(`paid:${orderId}`, JSON.stringify(order));
  await env.ORDERS.delete(`order:${orderId}`); // retire le pending

  return txt(200, 'ok');
}
