# My Clothes — Atelier 003

Site e-commerce prototype en vanilla React/Babel (no-build), déployable n'importe où en static.

## Stack

- HTML + React 18 chargés via CDN + Babel standalone (pas de bundler ni de transpilation locale)
- Vanilla CSS (`styles.css`) avec variables thèmes (dark/light)
- Données catalogue dans `data.js` (objet JS chargé en `window.PRODUCTS` et `window.NAV_CATS`)
- Images produits servies depuis `uploads/<batch>/`

## Lancer en local

```bash
cd site-ressel
python3 -m http.server 8765
# Ouvrir http://localhost:8765/
```

Pas de hot reload — recharger la page (Ctrl+Shift+R pour vider le cache après modif `styles.css` ou `data.js`).

## Structure des fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Shell de la page, chargement React/Babel, polices |
| `app.jsx` | Root React, routing entre screens, gestion panier global |
| `chrome.jsx` | Header mega-menu, custom cursor, audio, `ProductMedia`, footer, toast |
| `screens.jsx` | `HomeScreen`, `CatalogueScreen`, `ProductScreen` (PDP) |
| `cart.jsx` | `CartDrawer` + `CheckoutScreen` (3 étapes) |
| `tweaks-panel.jsx` | Panel d'édition (palettes / typo / intensité) |
| `data.js` | Catalogue produits, navigation, helpers stock |
| `styles.css` | Design system complet |
| `uploads/` | Images produits téléchargées (jerseys, shorts, shoes, underwear) |

## Workflow Git en équipe

```bash
# Récupérer la dernière version
git pull origin main

# Créer une branche pour ta feature
git checkout -b feature/ma-modif

# Coder, tester localement, puis :
git add .
git commit -m "Ajout de X"
git push origin feature/ma-modif

# Sur GitHub : ouvrir une Pull Request vers main
# L'autre review, on merge, puis :
git checkout main
git pull origin main
git branch -d feature/ma-modif  # nettoyage local
```

**Règles :**
- Ne pas commit direct sur `main` (sauf urgences ou typos triviaux)
- Toujours `git pull` avant de commencer à coder
- Tester localement avant de pousser
- Mettre l'UI **en français** uniquement (les noms de marques/clubs restent dans leur langue)

## Ajouter des produits

Voir `data.js` — chaque produit suit ce shape :

```js
{
  id: 'xx01',                          // unique
  name: 'Nom du produit',
  category: 'tees',                    // doit exister dans NAV_CATS
  subcategory: 'maillots-foot',
  rank: 60,                            // tri par popularité (max+1 pour ajouter)
  price: 95,
  sizes: ['S','M','L','XL'],
  stock: { S: 5, M: 8, L: 6, XL: 3 },
  palette: ['#bg','#mid','#accent'],   // fallback si l'image plante
  glyph: 'XXX',                        // 3 lettres
  drop: 'SS26',
  materials: 'Description courte',
  cut: 'Standard',
  made: 'France',
  image: 'uploads/<batch>/xx01.jpg',   // chemin local
  colors: [...]                        // optionnel : sélecteur multi-couleurs PDP
}
```

Pour les produits multi-couleurs (modèle B), ajouter le champ `colors` :
```js
colors: [
  { id: 'c01', label: 'Noir', hex: '#0a0a0a', image: 'uploads/<batch>/xx01-noir.jpg' },
  { id: 'c02', label: 'Blanc', hex: '#ffffff', image: 'uploads/<batch>/xx01-blanc.jpg' },
]
```

## Catégories disponibles

T-shirts (incl. Maillots de foot) · Sweats & Hoodies · Vestes & Manteaux · Pantalons · Shorts · Sous-vêtements · Chaussures (incl. Claquettes) · Accessoires

## Conventions

- Tout l'UI en **français** (UI text, boutons, placeholders)
- Images produits **toujours en local** dans `uploads/` (jamais en URL externe — hotlinking souvent bloqué)
- Préférer photos en HD (>800px) pour éviter le rendu flou en PDP
- Aspect ratio container PDP : **1:1** (carré) avec `object-fit: contain` — toutes les images s'affichent en entier
