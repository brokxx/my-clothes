// GET /api/admin/session — indique si la session est valide (pour le front).
import { json, isAuthed } from '../../_auth.js';

export async function onRequestGet({ request, env }) {
  const authed = await isAuthed(request, env);
  return json({ authed }, 200);
}
