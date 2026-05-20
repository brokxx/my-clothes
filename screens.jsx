// MY CLOTHES — Home + Catalogue + Product Detail screens.

const { useState: useStateS, useEffect: useEffectS, useMemo, useRef: useRefS } = React;

// ---------- Countdown to next drop ----------
function useCountdown(target) {
  const [now, setNow] = useStateS(Date.now());
  useEffectS(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, done: diff === 0 };
}

// ============================================================
//   HOME
// ============================================================
function HomeScreen({ navigate, openProduct, openCategory, audio }) {
  // drop is ~6 days from now
  const dropTarget = useRefS(Date.now() + (6 * 24 * 3600 + 7 * 3600 + 41 * 60) * 1000).current;
  const cd = useCountdown(dropTarget);

  const bestSellers = useMemo(() => window.bestSellers(8), []);
  const newIn = useMemo(() => window.PRODUCTS.filter(p => p.drop === 'SS26').slice(0, 6), []);

  const [parallax, setParallax] = useStateS(0);
  useEffectS(() => {
    const onScroll = () => setParallax(Math.min(window.scrollY * 0.15, 60));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [trendingTab, setTrendingTab] = useStateS('all');
  const trendingList = useMemo(() => {
    let arr = bestSellers;
    if (trendingTab === 'sneakers') arr = window.PRODUCTS.filter(p => p.category === 'sneakers').sort((a, b) => a.rank - b.rank);
    if (trendingTab === 'hoodies')  arr = window.PRODUCTS.filter(p => p.category === 'hoodies').sort((a, b) => a.rank - b.rank);
    if (trendingTab === 'tees')     arr = window.PRODUCTS.filter(p => p.category === 'tees').sort((a, b) => a.rank - b.rank);
    return arr.slice(0, 8);
  }, [trendingTab, bestSellers]);

  return (
    <div className="screen">
      {/* ---------- HERO ---------- */}
      <section className="hero">
        {/* Background image — replace this with a real lifestyle/product photo later */}
        <div className="hero-bg" style={{ transform: `translateY(${parallax * 0.4}px) scale(1.08)` }}>
          <ProductMedia product={window.PRODUCTS.find(p => p.id === 'o01')} showLabel={false} />
        </div>

        <div className="hero-stack">
          <div className="eyebrow center-flex" style={{ justifyContent: 'space-between' }}>
            <span>Drop 003 — Printemps/Été 26</span>
            <span>Édition limitée · Paris</span>
          </div>

          <div>
            <div className="hero-title">
              My <em>Clothes,</em><br/>votre <em>uniforme.</em>
            </div>
          </div>

          <div className="hero-row">
            <button className="btn" onClick={() => openCategory('sneakers', 'all')}>
              Découvrir le drop <span style={{ fontSize: 14 }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------- CATEGORY TILES ---------- */}
      <section style={{ paddingTop: 50, paddingBottom: 30 }}>
        <div style={{ padding: '0 28px', marginBottom: 18 }}>
          <div className="eyebrow">Parcourir par catégorie</div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', marginTop: 6 }}>Trouvez <em style={{ fontStyle: 'normal', fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '.65em', textTransform: 'uppercase', letterSpacing: '.04em' }}>votre style</em></h2>
        </div>
        <div className="cat-tiles">
          {window.NAV_CATS.map(c => {
            const feature = window.PRODUCTS.find(p => p.id === c.feature);
            return (
              <button key={c.id} className="cat-tile" onClick={() => openCategory(c.id, 'all')}>
                <div className="cat-img">{feature && <ProductMedia product={feature} showLabel={false} />}</div>
                <div className="cat-label">
                  <span>{c.label}</span>
                  <span className="arrow">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------- TENDANCES / BEST SELLERS ---------- */}
      <section className="rail-section">
        <div className="rail-head">
          <div>
            <span className="eyebrow">Les plus commandés cette semaine</span>
            <h2>Tendances<em style={{ color: 'var(--accent)' }}>.</em></h2>
          </div>
          <div className="rail-tabs">
            {[
              { id: 'all',      label: 'Tout' },
              { id: 'sneakers', label: 'Chaussures' },
              { id: 'hoodies',  label: 'Sweats' },
              { id: 'tees',     label: 'T-shirts' },
            ].map(t => (
              <button key={t.id} className="chip" aria-pressed={trendingTab === t.id} onClick={() => setTrendingTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="rail">
          {trendingList.map((p, i) => (
            <button key={p.id} className="rail-card" onClick={() => openProduct(p.id)}>
              <div className="pmedia">
                <div className="pimg"><ProductMedia product={p} /></div>
                <div className="rank">N°{String(i + 1).padStart(2, '0')}</div>
                {window.isLowStock(p) && <div className="lowstock">Plus que {window.totalStock(p)}</div>}
              </div>
              <div className="pinfo">
                <div>
                  <div className="ptitle">{p.name}</div>
                  <div className="pmeta">{window.CATEGORY_LABEL[p.category]} · {p.drop}</div>
                </div>
                <div className="pprice">€{p.price}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ---------- EDITORIAL BLOCK ---------- */}
      <section className="edit-block">
        <div>
          <ProductMedia product={window.PRODUCTS.find(p => p.id === 'o01')} showLabel={false}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>L'Atelier — N° 003</div>
          <h3>"Un manteau<br/>qui ne demande <em>rien</em><br/>en retour."</h3>
          <p>L'Atelier Mac est taillé dans un twill de coton encollé développé à Biella en six mois. Les épaules tombent. Les coutures sont étanchéifiées. Rien d'autre.</p>
          <p>Chaque pièce est finie à la main et étiquetée avec son numéro de production, son lot de tissu et le nom du tailleur.</p>
          <div style={{ marginTop: 20 }}>
            <button className="btn" onClick={() => openProduct('o01')}>Découvrir le Mac — €695</button>
          </div>
        </div>
      </section>

      {/* ---------- NEW IN ---------- */}
      <section className="section">
        <div className="section-head">
          <h2>Nouveautés</h2>
          <button className="btn btn-ghost" onClick={() => navigate('catalogue')}>Catalogue complet →</button>
        </div>
        <div className="product-grid">
          {newIn.map(p => <ProductCard key={p.id} product={p} onClick={() => openProduct(p.id)} />)}
        </div>
      </section>

      {/* ---------- BIG STATEMENT ---------- */}
      <section className="section" style={{ paddingTop: 140, paddingBottom: 140 }}>
        <div className="serif distort-hover" style={{ fontSize: 'clamp(40px, 8vw, 130px)', lineHeight: 1.0, letterSpacing: '-0.035em', maxWidth: '14ch' }}>
          Nous faisons des vêtements pour ceux qui les <em style={{ fontStyle: 'normal', fontFamily: 'var(--sans)', fontWeight: 300 }}>portent vraiment.</em>
        </div>
        <div className="eyebrow" style={{ marginTop: 30 }}>— Manifeste de l'Atelier, 2024</div>
      </section>
    </div>
  );
}

// ---------- Reusable product card ----------
function ProductCard({ product, onClick }) {
  return (
    <button className="product-card" onClick={onClick} data-cursor="image" style={{ textAlign: 'left' }}>
      <div className="pmedia">
        <div className="pimg"><ProductMedia product={product} /></div>
        <div className="pimg alt"><ProductMedia product={product} alt /></div>
        {window.isLowStock(product) && <div className="lowstock">Plus que {window.totalStock(product)}</div>}
        {window.isSoldOut(product) && <div className="lowstock" style={{ color: 'var(--muted)', borderColor: 'var(--muted)' }}>Épuisé</div>}
      </div>
      <div className="pinfo">
        <div>
          <div className="ptitle">{product.name}</div>
          <div className="pmeta">{window.CATEGORY_LABEL[product.category]} · {product.drop}</div>
        </div>
        <div className="pprice">€{product.price}</div>
      </div>
    </button>
  );
}

// ============================================================
//   CATALOGUE
// ============================================================
function CatalogueScreen({ openProduct, initialCategory, initialSubcategory }) {
  // For the "Accessories" tab in the mega-nav we route a few subcategories under
  // the "access" id but they might belong to category "caps" — handle that.
  const resolveInitial = () => {
    if (!initialCategory || initialCategory === 'all') return { cat: 'all', sub: 'all' };
    if (initialCategory === 'access') {
      if (['caps','bucket'].includes(initialSubcategory)) return { cat: 'caps', sub: initialSubcategory };
      if (['bags','belts','jewelry'].includes(initialSubcategory)) return { cat: 'access', sub: initialSubcategory };
      return { cat: 'access-all', sub: 'all' };
    }
    return { cat: initialCategory, sub: initialSubcategory || 'all' };
  };

  const [cat, setCat] = useStateS(() => resolveInitial().cat);
  const [sub, setSub] = useStateS(() => resolveInitial().sub);
  const [sort, setSort] = useStateS('drop');
  const [priceBand, setPriceBand] = useStateS('all');
  const [panelOpen, setPanelOpen] = useStateS(false);

  // re-resolve when initial props change (nav clicks)
  useEffectS(() => {
    const r = resolveInitial();
    setCat(r.cat);
    setSub(r.sub);
  }, [initialCategory, initialSubcategory]);

  const availableSubs = useMemo(() => {
    if (cat === 'all') return [];
    if (cat === 'access-all') return window.NAV_CATS.find(c => c.id === 'access').subs;
    const nav = window.NAV_CATS.find(c => c.id === cat);
    return nav ? nav.subs : [];
  }, [cat]);

  const filtered = useMemo(() => {
    let arr = window.PRODUCTS.slice();
    if (cat === 'access-all') arr = arr.filter(p => p.category === 'access' || p.category === 'caps');
    else if (cat !== 'all') arr = arr.filter(p => p.category === cat);

    if (sub !== 'all' && sub) {
      if (cat === 'access-all') {
        const accessSub = window.NAV_CATS.find(c => c.id === 'access').subs.find(s => s.id === sub);
        if (accessSub && accessSub.cat) {
          arr = arr.filter(p => p.category === accessSub.cat && p.subcategory === accessSub.sub);
        } else {
          arr = arr.filter(p => p.subcategory === sub);
        }
      } else {
        arr = arr.filter(p => p.subcategory === sub);
      }
    }

    if (priceBand !== 'all') {
      arr = arr.filter(p => {
        if (priceBand === 'lt200') return p.price < 200;
        if (priceBand === '200-400') return p.price >= 200 && p.price < 400;
        if (priceBand === 'gt400') return p.price >= 400;
        return true;
      });
    }
    if (sort === 'price-asc') arr.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') arr.sort((a, b) => b.price - a.price);
    else if (sort === 'popular') arr.sort((a, b) => a.rank - b.rank);
    return arr;
  }, [cat, sub, sort, priceBand]);

  const catLabel = useMemo(() => {
    if (cat === 'all') return 'Catalogue';
    if (cat === 'access-all') return 'Accessories';
    const n = window.NAV_CATS.find(c => c.id === cat);
    return n ? n.label : 'Catalogue';
  }, [cat]);

  // Count of active filters (excluding default sort)
  const activeFilters = (sub !== 'all' ? 1 : 0) + (priceBand !== 'all' ? 1 : 0) + (sort !== 'drop' ? 1 : 0);

  const sortLabel = {
    'drop': 'Nouveautés',
    'popular': 'Populaires',
    'price-asc': 'Prix ↑',
    'price-desc': 'Prix ↓',
  }[sort];

  const resetFilters = () => { setSub('all'); setPriceBand('all'); setSort('drop'); };

  return (
    <div className="screen">
      <section style={{ padding: '60px 28px 30px' }}>
        <div className="eyebrow">Drop 003 — SS26</div>
        <h1 className="serif" style={{ fontSize: 'clamp(48px, 10vw, 140px)', lineHeight: .85, letterSpacing: '-0.04em', marginTop: 14 }}>
          {catLabel === 'Catalogue' ? (
            <>Le <em style={{ fontStyle: 'normal', fontFamily: 'var(--sans)', fontWeight: 300, textTransform: 'uppercase', fontSize: '.55em', letterSpacing: '.02em' }}>catalogue</em></>
          ) : (
            <>{catLabel}<em style={{ color: 'var(--accent)' }}>.</em></>
          )}
        </h1>
        <div className="muted" style={{ marginTop: 14, maxWidth: '52ch' }}>
          {filtered.length} pièce{filtered.length > 1 ? 's' : ''} · triées par {sortLabel.toLowerCase()}.
        </div>
      </section>

      <div className="filters">
        <button className="filter-btn" data-active={panelOpen} onClick={() => setPanelOpen(!panelOpen)}>
          <span>Filtres</span>
          {activeFilters > 0 && <span className="badge">{activeFilters}</span>}
          <span style={{ fontSize: 9 }}>{panelOpen ? '▲' : '▼'}</span>
        </button>
        {activeFilters > 0 && (
          <button className="chip" onClick={resetFilters} style={{ marginLeft: 4 }}>
            Réinitialiser ×
          </button>
        )}
        <div style={{ flex: 1 }} />
        <div className="muted" style={{ marginRight: 8 }}>{filtered.length} pièce{filtered.length !== 1 ? 's' : ''}</div>
      </div>

      {panelOpen && (
        <div className="filter-panel">
          {availableSubs.length > 0 && (
            <div>
              <h5>{catLabel}</h5>
              <div className="chip-row">
                {availableSubs.map(s => (
                  <button key={s.id} className="chip" aria-pressed={sub === s.id} onClick={() => setSub(s.id)}>{s.label.replace(/^All /, '')}</button>
                ))}
              </div>
            </div>
          )}
          <div>
            <h5>Prix</h5>
            <div className="chip-row">
              {[
                { id: 'all', label: 'Tous' },
                { id: 'lt200', label: '<200' },
                { id: '200-400', label: '200—400' },
                { id: 'gt400', label: '400+' },
              ].map(o => (
                <button key={o.id} className="chip" aria-pressed={priceBand === o.id} onClick={() => setPriceBand(o.id)}>{o.label}</button>
              ))}
            </div>
          </div>
          <div>
            <h5>Trier par</h5>
            <div className="chip-row">
              <button className="chip" aria-pressed={sort === 'drop'} onClick={() => setSort('drop')}>Nouveautés</button>
              <button className="chip" aria-pressed={sort === 'popular'} onClick={() => setSort('popular')}>Populaires</button>
              <button className="chip" aria-pressed={sort === 'price-asc'} onClick={() => setSort('price-asc')}>Prix ↑</button>
              <button className="chip" aria-pressed={sort === 'price-desc'} onClick={() => setSort('price-desc')}>Prix ↓</button>
            </div>
          </div>
        </div>
      )}

      <section style={{ padding: '40px 28px 80px' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '120px 0', textAlign: 'center' }}>
            <div className="serif" style={{ fontSize: 64, letterSpacing: '-0.03em' }}>Rien ici.</div>
            <div className="muted" style={{ marginTop: 12 }}>Essayez d'élargir les filtres.</div>
            <button className="btn btn-ghost" style={{ marginTop: 24 }} onClick={resetFilters}>Réinitialiser les filtres</button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} onClick={() => openProduct(p.id)} />)}
          </div>
        )}
      </section>
    </div>
  );
}

// ============================================================
//   PRODUCT DETAIL
// ============================================================
function ProductScreen({ productId, openProduct, addToCart }) {
  const product = window.PRODUCTS.find(p => p.id === productId);
  const [size, setSize] = useStateS(null);
  const [showSpecs, setShowSpecs] = useStateS(true);
  const [colorIdx, setColorIdx] = useStateS(0);

  // recommendations: same category, excluding current, fall back to drop
  const recs = useMemo(() => {
    const same = window.PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
    const others = window.PRODUCTS.filter(p => p.category !== product.category);
    return [...same, ...others].slice(0, 4);
  }, [productId]);

  // reset size + color on product change
  useEffectS(() => { setSize(null); setColorIdx(0); }, [productId]);

  if (!product) return <div style={{ padding: 60 }}>Not found.</div>;

  const sizeStock = (s) => product.stock[s] ?? 0;
  const totalLeft = window.totalStock(product);

  const handleAdd = () => {
    if (!size) return;
    const colorLabel = product.colors ? product.colors[colorIdx]?.label : null;
    addToCart({ productId: product.id, size, qty: 1, color: colorLabel });
  };

  // If the product has a `colors` array, show the selected color's image in the gallery
  const displayProduct = product.colors
    ? { ...product, image: product.colors[colorIdx]?.image || product.image }
    : product;

  return (
    <div className="screen">
      <div className="pdp">
        <div className="pdp-gallery">
          <div className="pdp-img"><ProductMedia product={displayProduct} /></div>
          {!product.image && !product.colors && <div className="pdp-img"><ProductMedia product={product} alt /></div>}
          {!product.image && !product.colors && <div className="pdp-img"><ProductMedia product={product} /></div>}
        </div>

        <aside className="pdp-info">
          <div className="eyebrow">{window.CATEGORY_LABEL[product.category]} · {product.drop} · {product.id.toUpperCase()}</div>
          <h1 className="pdp-title">{product.name}</h1>
          <div className="pdp-price">€{product.price}.00</div>

          <p className="pdp-desc">
            Coupe <strong>{product.cut.toLowerCase()}</strong> pour {product.name.toLowerCase()} du Drop {product.drop}. Fabriqué en <strong>{product.made}</strong>. {product.materials}. Chaque pièce est numérotée et signée par son tailleur à l'atelier.
          </p>

          {product.colors && product.colors.length > 0 && (
            <div>
              <div className="eyebrow" style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                <span>Couleur · {product.colors[colorIdx]?.label || '—'}</span>
                <span style={{ color: 'var(--muted)' }}>{product.colors.length} couleurs</span>
              </div>
              <div className="color-grid">
                {product.colors.map((c, i) => (
                  <button
                    key={c.id || i}
                    className="color-swatch"
                    aria-pressed={colorIdx === i}
                    aria-label={c.label}
                    title={c.label}
                    onClick={() => setColorIdx(i)}
                  >
                    <img src={c.image} alt={c.label} loading="lazy" onError={(e) => { e.currentTarget.style.opacity = 0; e.currentTarget.parentElement.style.background = c.hex || '#333'; }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="eyebrow" style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
              <span>Choisir une taille</span>
              <button className="muted" style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase' }}>Guide des tailles ↗</button>
            </div>
            <div className="size-grid" style={{ gridTemplateColumns: `repeat(${Math.min(product.sizes.length, 6)}, 1fr)` }}>
              {product.sizes.map(s => (
                <button key={s} className="size-btn" disabled={sizeStock(s) === 0} aria-pressed={size === s} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
            {size && (
              <div className="mono" style={{ fontSize: 10, marginTop: 8, color: sizeStock(size) <= 3 ? 'var(--accent)' : 'var(--muted)' }}>
                Il reste {sizeStock(size)} en {size}
              </div>
            )}
          </div>

          <button className="btn btn-accent" onClick={handleAdd} disabled={!size} style={{ opacity: !size ? 0.4 : 1 }}>
            {size ? `Ajouter au panier — €${product.price}` : 'Choisir une taille'}
          </button>

          <div className="hr" />

          <dl className="pdp-specs">
            <dt>Coupe</dt><dd>{product.cut}</dd>
            <dt>Matière</dt><dd>{product.materials.split(' · ')[0]}</dd>
            <dt>Origine</dt><dd>{product.made}</dd>
            <dt>Drop</dt><dd>{product.drop} — N° 003</dd>
            <dt>Stock</dt><dd>{totalLeft} unités au total</dd>
            <dt>Édition</dt><dd>Numérotée</dd>
          </dl>

          <div className="muted" style={{ fontSize: 11, lineHeight: 1.6, fontFamily: 'var(--mono)', letterSpacing: '.04em', marginTop: 16 }}>
            Livraison offerte dès €250.<br/>
            Expédition sous 5 jours ouvrés.<br/>
            Retours sous 30 jours — non porté, avec étiquettes.
          </div>
        </aside>
      </div>

      {/* Recommendations */}
      <section className="recs">
        <h3>Vous aimerez <em>aussi</em></h3>
        {recs.map(r => <ProductCard key={r.id} product={r} onClick={() => { window.scrollTo({ top: 0 }); openProduct(r.id); }} />)}
      </section>
    </div>
  );
}

Object.assign(window, { HomeScreen, CatalogueScreen, ProductScreen, ProductCard });
