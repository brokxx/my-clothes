// GET /api/admin/orders — liste les commandes payées (protégé par cookie).
// Renvoie 401 si non authentifié. Les vraies données clients ne sont JAMAIS
// exposées sans session valide.
import { json, isAuthed } from '../../_auth.js';

export async function onRequestGet({ request, env }) {
  if (!(await isAuthed(request, env))) return json({ error: 'non_autorise' }, 401);
  if (!env.ORDERS) return json({ orders: [] }, 200);

  const orders = [];
  let cursor;
  do {
    const list = await env.ORDERS.list({ prefix: 'paid:', cursor });
    for (const key of list.keys) {
      const raw = await env.ORDERS.get(key.name);
      if (raw) {
        try { orders.push(JSON.parse(raw)); } catch (e) {}
      }
    }
    cursor = list.list_complete ? null : list.cursor;
  } while (cursor);

  orders.sort((a, b) => (b.paidAt || b.ts || 0) - (a.paidAt || a.ts || 0));
  return json({ orders }, 200);
}
