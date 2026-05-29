// Génère functions/_catalog.js (prix de référence côté serveur) depuis data.js.
//
// Pourquoi : Stripe doit calculer les montants à partir d'une source de
// confiance côté serveur, jamais à partir du prix envoyé par le navigateur
// (qu'un client peut falsifier). data.js définit window.PRODUCTS — on l'évalue
// ici avec un shim window pour en extraire {id, name, price, category}.
//
// À relancer après chaque modification des prix/produits dans data.js :
//   node tools/gen-catalog.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataSrc = readFileSync(join(root, 'data.js'), 'utf8');

// eval contrôlé de notre propre fichier (pas d'entrée utilisateur)
const window = {};
// eslint-disable-next-line no-eval
eval(dataSrc);

const products = window.PRODUCTS || [];
const catalog = {};
for (const p of products) {
  if (!p || !p.id || typeof p.price !== 'number') continue;
  catalog[p.id] = { name: p.name, price: p.price, category: p.category };
}

const out =
  '// AUTO-GÉNÉRÉ par tools/gen-catalog.mjs — NE PAS ÉDITER À LA MAIN.\n' +
  '// Source de vérité des prix côté serveur (validation Stripe).\n' +
  '// Régénérer : node tools/gen-catalog.mjs\n\n' +
  'export const CATALOG = ' + JSON.stringify(catalog, null, 2) + ';\n';

writeFileSync(join(root, 'functions', '_catalog.js'), out);
console.log('functions/_catalog.js généré :', Object.keys(catalog).length, 'produits');
