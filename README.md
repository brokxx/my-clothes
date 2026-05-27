# My Clothes — Atelier 001

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

## Workflow Git en équipe (branches courtes)

**Avant chaque session de code :**

```bash
git checkout main
git pull origin main          # toujours partir de la dernière version
git checkout -b feature/<truc> # nouvelle branche dédiée à UNE tâche
```

**Pendant la session :**

```bash
# code, teste localement (http.server 8765 + browser)
git add .
git commit -m "Ajout/modif claire"
# tu peux commit/push plusieurs fois sur ta branche
git push -u origin feature/<truc>
```

**Quand la tâche est finie :**

```bash
gh pr create --web        # ouvre la PR dans le navigateur
# L'autre review, commente si besoin, puis merge sur GitHub
# Ensuite, nettoyage local :
git checkout main
git pull origin main
git branch -d feature/<truc>
```

### Règles importantes

- Une branche = une tâche claire et courte (`add-jerseys-batch5`, `reorg-footer`, pas `feature/big-stuff`)
- Tester localement avant de pousser
- Mettre l'UI **en français** uniquement (les noms de marques/clubs restent dans leur langue)
- Si tu vois que ta branche traîne >3 jours, pull main dedans pour rester à jour : `git checkout feature/X && git pull origin main`

### Répartition des fichiers (qui touche à quoi)

Pour éviter de se marcher dessus :

| Fichier | Toi (catalogue/images) | Lui (réorganisation UI) |
|---|---|---|
| `uploads/**` | ✅ oui | ❌ non |
| `data.js` — `window.PRODUCTS` (fin de fichier) | ✅ oui | ❌ non |
| `data.js` — `window.NAV_CATS`, `CATEGORIES` (haut de fichier) | ❌ non | ✅ oui |
| `chrome.jsx`, `screens.jsx`, `cart.jsx`, `app.jsx` | ❌ non | ✅ oui |
| `styles.css` | ❌ non | ✅ oui |
| `index.html` | ❌ non | ✅ oui |
| `README.md` | les deux peuvent | les deux peuvent |

**`data.js` est la seule zone partagée.** Vous touchez des sections différentes du fichier (PRODUCTS en bas, NAV_CATS en haut) — Git auto-merge la plupart du temps. En cas de conflit rare, la personne qui rebase/merge en dernier résout à la main.

### Résoudre un conflit Git

Si `git pull` ou un merge te dit "CONFLICT" :

```bash
git status                # voir les fichiers en conflit
# Ouvre le fichier, cherche les marqueurs <<<<<<< / ======= / >>>>>>>
# Garde les bonnes lignes, supprime les marqueurs
git add <fichier-résolu>
git commit                # finir le merge
git push
```

Si tu paniques : `git merge --abort` annule, et tu peux demander de l'aide.

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
