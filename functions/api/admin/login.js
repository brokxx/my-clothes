// POST /api/admin/login — { password } → pose un cookie de session signé.
import { json, verifyPassword, makeSessionCookie } from '../../_auth.js';

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const ok = await verifyPassword(body.password, env);
  if (!ok) return json({ error: 'mot_de_passe_incorrect' }, 401);
  const cookie = await makeSessionCookie(env);
  return json({ ok: true }, 200, { 'set-cookie': cookie });
}
