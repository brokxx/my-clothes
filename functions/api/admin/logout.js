// POST /api/admin/logout — efface le cookie de session.
import { json, clearSessionCookie } from '../../_auth.js';

export async function onRequestPost() {
  return json({ ok: true }, 200, { 'set-cookie': clearSessionCookie() });
}
