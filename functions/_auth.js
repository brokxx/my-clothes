// Authentification admin côté serveur : cookie signé HMAC-SHA256.
//
// Le mot de passe (env.ADMIN_PASSWORD) est vérifié côté serveur. En cas de
// succès on émet un cookie `mc_admin` = `${expES}.${signature}` signé avec
// env.COOKIE_SECRET. Les endpoints protégés revérifient la signature et
// l'expiration avant de répondre. Impossible à forger sans le secret.

const COOKIE_NAME = 'mc_admin';
const TTL_SEC = 60 * 60 * 8; // 8 heures

export const json = (obj, status = 200, extraHeaders = {}) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...extraHeaders },
  });

function toHex(buf) {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function hmac(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return toHex(mac);
}

// Comparaison à temps constant.
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyPassword(submitted, env) {
  if (!env.ADMIN_PASSWORD) return false;
  return safeEqual(String(submitted || ''), String(env.ADMIN_PASSWORD));
}

export async function makeSessionCookie(env) {
  const secret = env.COOKIE_SECRET || env.ADMIN_PASSWORD || 'dev-secret';
  const exp = Math.floor(Date.now() / 1000) + TTL_SEC;
  const sig = await hmac(secret, String(exp));
  const value = `${exp}.${sig}`;
  const attrs = [
    `${COOKIE_NAME}=${value}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
    `Max-Age=${TTL_SEC}`,
  ];
  return attrs.join('; ');
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

function readCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i === -1) continue;
    if (part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}

export async function isAuthed(request, env) {
  const raw = readCookie(request, COOKIE_NAME);
  if (!raw) return false;
  const dot = raw.lastIndexOf('.');
  if (dot === -1) return false;
  const exp = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  const expNum = parseInt(exp, 10);
  if (!Number.isFinite(expNum) || expNum < Math.floor(Date.now() / 1000)) return false;
  const secret = env.COOKIE_SECRET || env.ADMIN_PASSWORD || 'dev-secret';
  const expected = await hmac(secret, exp);
  return safeEqual(sig, expected);
}
