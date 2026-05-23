# CLAUDE.md — Instructions partagées pour ce repo

Tout assistant Claude qui ouvre une session sur ce projet doit suivre ces règles. Lecture obligatoire avant toute action.

## Contexte projet

- **Nom** : My Clothes — Atelier 003 (`brokxx/my-clothes`)
- **Stack** : Vanilla React 18 + Babel standalone via CDN. AUCUN bundler, AUCUN npm install. Tout est servi statiquement.
- **Lancer en local** : `python3 -m http.server 8765` dans la racine du repo → http://localhost:8765/
- **UI 100% en français** : labels, boutons, placeholders, copy. Les noms de marques/clubs étrangers (Liverpool, PSG, Nike) restent dans leur langue.

## Routine de DÉBUT de session

Dès qu'une nouvelle conversation démarre sur ce repo, **exécute automatiquement** ce qui suit avant de prendre les instructions de l'utilisateur :

```bash
cd /home/manao/site-ressel  # adapter au path local
git fetch origin
git status -sb
gh pr list --state open
```

Puis donne un résumé court à l'utilisateur :
- Branche actuelle et si elle est à jour avec `origin/main`
- Liste des PRs ouvertes (auteur, titre, numéro, état CI)
- Si la branche est en retard sur main, suggère `git pull`

**Ne fais cette routine qu'une fois par conversation**, pas après chaque message.

## Routine de FIN d'ajout (après chaque commit/merge important)

Après avoir mergé une PR ou commité un changement structurant, re-vérifie l'état :

```bash
git fetch origin
gh pr list --state open
gh pr status
```

Pour voir si quelque chose s'est résolu en background ou si le coéquipier a poussé entre temps.

## Workflow Git obligatoire

Branches courtes, PR systématique sur `main`. **Jamais de commit direct sur main** sauf pour typos triviaux dans la doc.

```bash
git checkout main && git pull origin main
git checkout -b <type>/<sujet-court>     # ex: add/jerseys-batch5, reorg/footer, fix/cart-bug
# ... code ...
git add . && git commit -m "<résumé clair en français>"
git push -u origin <type>/<sujet-court>
gh pr create --fill                      # ou --web pour ouvrir dans le navigateur
```

Conventions de nommage de branche :
- `add/...` pour ajouts de catalogue/contenu
- `reorg/...` pour réorganisations UI/structure
- `fix/...` pour bugs
- `docs/...` pour documentation

## Répartition des fichiers par contributeur

| Fichier | brokxx (catalogue/images) | coéquipier (réorganisation UI) |
|---|---|---|
| `uploads/**` | ✅ | ❌ |
| `data.js` — `window.PRODUCTS` (fin de fichier) | ✅ | ❌ |
| `data.js` — `window.NAV_CATS`, `CATEGORIES` (haut de fichier) | ❌ | ✅ |
| `chrome.jsx`, `screens.jsx`, `cart.jsx`, `app.jsx` | ❌ | ✅ |
| `styles.css` | ❌ | ✅ |
| `index.html` | ❌ | ✅ |
| `README.md`, `CLAUDE.md` | les deux | les deux |

**`data.js` est partagé** mais chacun touche une zone différente du fichier (`PRODUCTS` en bas, `NAV_CATS` en haut). Git auto-merge la plupart du temps. Si conflit, la personne qui pousse en dernier résout à la main.

## Routine d'AJOUT de produits

L'utilisateur peut demander d'ajouter des produits de 2 façons. Choisis selon ce qu'il fournit.

### Variante A — Depuis une URL source (USFans, Taobao agent, archive sportive)

1. Crée une branche : `git checkout main && git pull && git checkout -b add/<batch-slug>`
2. Navigate sur l'URL avec Playwright MCP
3. Extrais la liste des variants (couleurs, tailles, prix) — voir les patterns dans le skill `populate-catalog` si disponible
4. **Pose des questions à l'utilisateur** quand il y a doute (catégorie cible, sous-catégorie, modèle A vs B pour multi-couleurs, prix d'affichage). Ne devine PAS sur du contenu visible par le client final.
5. Trouve une photo HD pour chaque variant. Sources prioritaires : footballkitarchive (kits foot, drop `-small` pour HD), GOAT/StockX (chaussures, og:image), blogspot CDN (footyheadlines, hotlinkable).
6. Télécharge en local dans `uploads/<batch>/` avec curl + UA browser + Referer adapté. **JAMAIS `rm` en masse** — `curl -o` écrase en place.
7. Vérifie chaque image visuellement (le `Read` tool affiche les JPGs) pour rejeter : photos QC (fond vert + règle), logos floutés/pixelisés, produits mixés (foam runner dans claquettes, mesh dans coton boxers), images d'info de taille.
8. Patche `data.js` à la fin de `window.PRODUCTS` avec le bon shape. Pour multi-couleurs, modèle B = champ `colors: [{id, label, hex, image}]`.
9. Si nouvelle catégorie : modifie `window.NAV_CATS` et `window.CATEGORIES` en concertation avec le coéquipier.
10. Vérifie le rendu via Playwright sur http://localhost:8765/
11. Commit, push, ouvre PR.
12. Après merge, retourne sur main, pull, vérifie les autres PRs.

### Variante B — Sans source (produits inventés ou spécifiés)

1. Crée une branche : `add/<sujet>`
2. Demande à l'utilisateur : noms, prix, tailles, palettes (3 couleurs), description courte, catégorie/sous-catégorie
3. Génère les entrées `data.js` avec `image: null` (placeholder SVG s'affichera automatiquement) ou avec une image que l'utilisateur fournira
4. Suit le shape standard. `rank` = max actuel + 1
5. PR, vérification, merge

## Shape standard d'un produit

```js
{
  id: 'xx01',                          // unique (préfixe par batch)
  name: 'Nom du produit',
  category: 'tees',                    // doit exister dans NAV_CATS
  subcategory: 'maillots-foot',
  rank: 60,                            // tri par popularité (max+1)
  price: 95,                           // EUR
  sizes: ['S','M','L','XL'],
  stock: { S: 5, M: 8, L: 6, XL: 3 },  // entier par taille
  palette: ['#bg','#mid','#accent'],   // fallback si l'image plante
  glyph: 'XXX',                        // 3 lettres pour les overlays
  drop: 'SS26',
  materials: 'Description courte',
  cut: 'Standard',                     // Regular, Boxy, Slim, Oversized, Slide, Low-top...
  made: 'France',
  image: 'uploads/<batch>/xx01.jpg',   // chemin LOCAL relatif
  colors: [                            // OPTIONNEL : multi-couleurs (modèle B)
    { id: 'c01', label: 'Noir', hex: '#0a0a0a', image: 'uploads/<batch>/xx01-noir.jpg' },
  ],
},
```

## Pièges connus à anticiper

- **Cache CSS/JS du navigateur** : après modif `styles.css` ou `data.js`, hard refresh nécessaire (Ctrl+Shift+R). Pour forcer côté serveur, ajouter `?v=N` au lien `<link>` dans `index.html`.
- **Playwright MCP verrou** : si "Browser is already in use", récupérer le PID via `cat ~/.cache/ms-playwright/mcp-chrome-*/SingletonLock`, demander à l'utilisateur l'autorisation de `kill <PID>`, puis `rm` des fichiers Singleton.
- **Hotlinking 403** : Footballkitarchive et certains CDNs bloquent les requêtes sans bon Referer. Toujours télécharger en local plutôt qu'utiliser des URLs externes.
- **Images QC USFans** : les pages de l'agent affichent souvent des photos d'inspection (fond vert texturé, règle de mesure, date stampée). Visuellement repérables — à exclure du catalogue final.
- **Aspect-ratio PDP** : container fixé à `1/1` (carré) avec `object-fit: contain` + `padding: 4%` + `background: var(--card)` pour que toutes les images s'affichent en entier.
- **Espaces dans les paths** : le repo est dans `site-ressel` (sans espace). Si quelqu'un recrée un dossier avec espace, refuser.

## Tooling Claude Code

- Le `gh` CLI est installé dans `~/.local/bin/gh` (PAS dans `/usr/bin`). Le credential helper git pointe dessus.
- L'utilisateur peut taper `! commande` pour exécuter en mode console direct (utile pour `gh auth login` qui est interactif).
- Skill `populate-catalog` est disponible chez brokxx mais peut ne pas l'être chez le coéquipier. Les instructions ci-dessus dans la "Routine d'AJOUT" sont autonomes et n'ont pas besoin du skill.
