// MY CLOTHES — shared chrome: header, custom cursor, audio engine,
// placeholder media, page transitions, ticker, footer.

const { useState, useEffect, useRef, useCallback } = React;

// ---------- Product placeholder (duotone + category silhouette) ----------
// Renders a stylized SVG silhouette over a duotone gradient. Looks intentional
// rather than fake. Used everywhere we'd show product photography.
const SIL = {
  tees: (
    <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="xMidYMid meet">
      <path d="M60 50 L40 70 L20 95 L42 120 L55 105 L55 220 L145 220 L145 105 L158 120 L180 95 L160 70 L140 50 L122 60 Q100 75 78 60 Z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M78 60 Q100 75 122 60" fill="none"/>
    </svg>
  ),
  hoodies: (
    <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="xMidYMid meet">
      <path d="M65 40 Q100 20 135 40 L155 70 L180 105 L155 130 L155 230 L45 230 L45 130 L20 105 L45 70 Z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M65 40 Q100 95 135 40" />
      <path d="M85 110 L85 200 M115 110 L115 200" opacity="0.4"/>
      <circle cx="100" cy="155" r="14" fill="none" opacity="0.4"/>
    </svg>
  ),
  outerwear: (
    <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="xMidYMid meet">
      <path d="M55 45 L35 65 L20 100 L40 125 L48 115 L48 230 L100 220 L152 230 L152 115 L160 125 L180 100 L165 65 L145 45 L100 65 Z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M100 65 L100 220" />
      <rect x="62" y="130" width="22" height="34" opacity="0.4"/>
      <rect x="116" y="130" width="22" height="34" opacity="0.4"/>
    </svg>
  ),
  pants: (
    <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="xMidYMid meet">
      <path d="M55 20 L145 20 L150 70 L145 230 L110 230 L100 110 L90 230 L55 230 L50 70 Z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M55 50 L145 50" opacity="0.4"/>
    </svg>
  ),
  caps: (
    <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="xMidYMid meet">
      <path d="M40 130 Q100 60 160 130 L165 145 L185 145 L185 160 L15 160 L15 145 L35 145 Z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M100 60 L100 130" opacity="0.4"/>
    </svg>
  ),
  access: (
    <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="xMidYMid meet">
      <path d="M50 80 L150 80 L160 220 L40 220 Z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M75 80 Q75 50 100 50 Q125 50 125 80" />
    </svg>
  ),
  sneakers: (
    <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="xMidYMid meet">
      <path d="M30 160 Q40 150 60 150 L100 140 Q140 130 165 145 Q180 152 180 168 Q180 180 165 185 L40 188 Q30 188 30 178 Z" fill="currentColor" fillOpacity="0.08"/>
      <path d="M80 150 L78 168 M100 145 L98 168 M125 142 L122 168 M145 142 L142 170" opacity="0.4"/>
      <rect x="30" y="180" width="150" height="6" opacity="0.3" fill="currentColor"/>
    </svg>
  ),
};

function ProductMedia({ product, alt = false, showLabel = true }) {
  const p = product.palette;
  const style = {
    '--ph-1': p[0],
    '--ph-2': alt ? p[1] : p[0],
    '--ph-3': alt ? p[0] : p[2],
  };
  if (product.image) {
    return (
      <div className="ph ph-photo" style={{ ...style, background: 'var(--card)' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '4%', zIndex: 1, transform: alt ? 'scale(1.04) translateX(2%)' : 'none', transition: 'transform 800ms cubic-bezier(.22,1,.36,1)' }}
        />
        {showLabel && <div className="ph-label" style={{ zIndex: 2 }}>{product.id.toUpperCase()} · {product.drop}</div>}
      </div>
    );
  }
  const tint = { color: alt ? p[0] : p[2], opacity: alt ? 0.75 : 1 };
  return (
    <div className="ph" style={style}>
      <div style={{ ...tint, position: 'relative', zIndex: 1, width: '60%', display: 'grid', placeItems: 'center', transform: alt ? 'translateX(6%) rotate(-2deg)' : 'none', transition: 'transform 800ms cubic-bezier(.22,1,.36,1)' }}>
        {SIL[product.category] || SIL.tees}
      </div>
      {showLabel && <div className="ph-label">{product.id.toUpperCase()} · {product.drop}</div>}
    </div>
  );
}

// ---------- Custom cursor ----------
// Currently unmounted by the App (kept for re-enable). On touch/coarse-pointer
// devices we no-op entirely to avoid mousemove listeners + RAF on phones.
const __IS_TOUCH_CURSOR = typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches;
function Cursor() {
  if (__IS_TOUCH_CURSOR) return null;
  const ref = useRef(null);
  const [state, setState] = useState('default');
  const [label, setLabel] = useState('');
  const pos = useRef({ x: -100, y: -100, tx: -100, ty: -100 });

  useEffect(() => {
    document.documentElement.classList.add('cursor-on');
    let raf;
    const tick = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.22;
      pos.current.y += (pos.current.ty - pos.current.y) * 0.22;
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      const el = e.target;
      if (el && el.closest) {
        if (el.closest('[data-cursor="image"]')) { setState('image'); setLabel('view'); return; }
        if (el.closest('a, button, .chip, .size-btn, .nav-links button, [data-cursor="hover"]')) { setState('hover'); setLabel(''); return; }
        if (el.closest('input, textarea, [contenteditable]')) { setState('text'); setLabel(''); return; }
      }
      setState('default');
      setLabel('');
    };
    const onDown = () => ref.current && (ref.current.style.opacity = '0.6');
    const onUp   = () => ref.current && (ref.current.style.opacity = '1');
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    tick();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-on');
    };
  }, []);

  return (
    <div ref={ref} className="cursor" data-state={state}>
      <div className="cursor-label">{label}</div>
    </div>
  );
}

// ---------- Audio engine (ambient drone + click ticks) ----------
function useAudio(initialOn) {
  const [on, setOn] = useState(initialOn);
  const ctxRef = useRef(null);
  const droneRef = useRef(null);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch {}
    }
    return ctxRef.current;
  }, []);

  const startDrone = useCallback(() => {
    const ctx = ensureCtx();
    if (!ctx) return;
    if (droneRef.current) return;
    if (ctx.state === 'suspended') ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.6);
    master.connect(ctx.destination);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 600;
    lp.Q.value = 1.2;
    lp.connect(master);

    const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = 55;
    const o2 = ctx.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = 82.5;
    const o3 = ctx.createOscillator(); o3.type = 'sine'; o3.frequency.value = 110.3;
    const og = ctx.createGain(); og.gain.value = 0.18;
    o2.connect(og); og.connect(lp);
    o1.connect(lp); o3.connect(lp);

    // slow LFO on filter
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 280;
    lfo.connect(lfoGain); lfoGain.connect(lp.frequency);

    o1.start(); o2.start(); o3.start(); lfo.start();
    droneRef.current = { master, oscs: [o1, o2, o3, lfo], ctx };
  }, [ensureCtx]);

  const stopDrone = useCallback(() => {
    const d = droneRef.current;
    if (!d) return;
    const t = d.ctx.currentTime;
    d.master.gain.cancelScheduledValues(t);
    d.master.gain.linearRampToValueAtTime(0, t + 0.6);
    setTimeout(() => {
      d.oscs.forEach(o => { try { o.stop(); } catch {} });
      droneRef.current = null;
    }, 700);
  }, []);

  const tick = useCallback((freq = 1800, duration = 0.04, gainV = 0.06) => {
    if (!on) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'square'; o.frequency.value = freq;
    g.gain.value = 0; g.gain.linearRampToValueAtTime(gainV, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    o.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + duration + 0.02);
  }, [on, ensureCtx]);

  useEffect(() => {
    if (on) startDrone(); else stopDrone();
  }, [on, startDrone, stopDrone]);

  return { on, setOn, tick };
}

// ---------- Audio toggle UI ----------
function AudioToggle({ on, onToggle }) {
  return (
    <button className="audio-toggle" data-on={on} onClick={onToggle} aria-label="Basculer le son">
      <span className="eq"><span/><span/><span/><span/></span>
      <span>{on ? 'son activé' : 'son coupé'}</span>
    </button>
  );
}

// ---------- Mega-nav header (Nike-style) ----------
function Header({ screen, navigate, openCategory, cartCount, onOpenCart, theme, onToggleTheme, audio }) {
  const [openCat, setOpenCat] = useState(null); // id of the open mega-menu
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef(null);

  // Show/hide header on scroll direction
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < 60) {
          setNavHidden(false);
        } else if (delta > 6) {
          setNavHidden(true);
          setOpenCat(null);
        } else if (delta < -6) {
          setNavHidden(false);
        }
        lastY = y;
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onEnter = (id) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenCat(id);
  };
  const onLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenCat(null), 160);
  };

  const active = window.NAV_CATS.find(c => c.id === openCat);

  const go = (catId, subId) => {
    setOpenCat(null);
    setMobileOpen(false);
    openCategory(catId, subId);
  };

  return (
    <React.Fragment>
      <div className={"nav-wrap" + (navHidden ? " hidden" : "")} onMouseLeave={onLeave}>
        <nav className="nav">
          <button className="nav-logo" onClick={() => { setOpenCat(null); navigate('home'); }}>My Clothes</button>

          <div className="nav-cats">
            {window.NAV_CATS.map(c => (
              <button
                key={c.id}
                onClick={() => go(c.id, 'all')}
              >
                {c.label}
              </button>
            ))}
            <button className="nav-search-trigger" onClick={() => setSearchOpen(true)} aria-label="Rechercher un article" title="Rechercher">
              <SearchIcon />
            </button>
          </div>

          <div className="nav-right">
            <button onClick={onToggleTheme} aria-label="Basculer le thème" title="Basculer le thème">{theme === 'dark' ? '◐' : '◑'}</button>
            <AudioToggle on={audio.on} onToggle={() => audio.setOn(!audio.on)} />
            <button onClick={onOpenCart} aria-label="Ouvrir le panier">
              Panier {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            {/* mobile menu trigger */}
            <button className="nav-mobile-toggle" style={{ display: 'none' }} onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu">☰</button>
          </div>
        </nav>

        {/* Mega-menu */}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mnav">
          <div className="mnav-head">
            <button onClick={() => { setMobileOpen(false); navigate('home'); }} className="nav-logo" style={{ fontSize: 22 }}>My Clothes</button>
            <button onClick={() => setMobileOpen(false)}>Fermer ✕</button>
          </div>
          <div className="mnav-body">
            <button className="mnav-search-btn" onClick={() => { setMobileOpen(false); setSearchOpen(true); }}>
              <SearchIcon /> <span>Rechercher</span>
            </button>
            {window.NAV_CATS.map(c => (
              <div className="mnav-cat" key={c.id}>
                <button onClick={() => go(c.id, 'all')}>
                  <span>{c.label}</span>
                  <span style={{ fontSize: 18 }}>→</span>
                </button>
                <div className="subs">
                  {c.subs.filter(s => s.id !== 'all').map(s => (
                    <button key={s.id} onClick={() => go(c.id, s.id)}>{s.label}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </React.Fragment>
  );
}

// ---------- Search icon (inline SVG) ----------
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

// ---------- Site-wide search overlay ----------
function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const q = query.trim().toLowerCase();
  const results = q.length === 0 ? [] : window.PRODUCTS.filter(p => {
    const catLabel = (window.CATEGORY_LABEL[p.category] || '').toLowerCase();
    return p.name.toLowerCase().includes(q)
      || p.category.toLowerCase().includes(q)
      || (p.subcategory || '').toLowerCase().includes(q)
      || catLabel.includes(q)
      || (p.drop || '').toLowerCase().includes(q)
      || (p.glyph || '').toLowerCase().includes(q);
  }).slice(0, 24);

  const pickProduct = (id) => {
    onClose();
    if (window.__openProductFromNav) window.__openProductFromNav(id);
  };

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Recherche">
      <div className="search-backdrop" onClick={onClose} />
      <div className="search-panel">
        <div className="search-bar">
          <SearchIcon />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un article, une catégorie, un drop…"
            autoComplete="off"
            spellCheck={false}
          />
          <button className="search-close" onClick={onClose} aria-label="Fermer la recherche">✕</button>
        </div>

        <div className="search-body">
          {q.length === 0 && (
            <div className="search-empty">
              <div className="eyebrow">Astuce</div>
              <p>Tapez le nom d'une pièce, une catégorie (« sweat », « cargo »…) ou un drop (« SS26 »).</p>
            </div>
          )}
          {q.length > 0 && results.length === 0 && (
            <div className="search-empty">
              <div className="eyebrow">Aucun résultat</div>
              <p>Aucune pièce ne correspond à « {query} ».</p>
            </div>
          )}
          {results.length > 0 && (
            <ul className="search-results">
              {results.map(p => (
                <li key={p.id}>
                  <button className="search-result" onClick={() => pickProduct(p.id)}>
                    <div className="search-result-thumb">
                      <ProductMedia product={p} showLabel={false} />
                    </div>
                    <div className="search-result-info">
                      <div className="search-result-name">{p.name}</div>
                      <div className="search-result-meta">{window.CATEGORY_LABEL[p.category]} · {p.drop}</div>
                    </div>
                    <div className="search-result-price">€{p.price}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Distortion SVG defs ----------
function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="distort">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="3" result="t"/>
          <feDisplacementMap in="SourceGraphic" in2="t" scale="6"/>
        </filter>
        <filter id="distort-strong">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.05" numOctaves="2" seed="6" result="t"/>
          <feDisplacementMap in="SourceGraphic" in2="t" scale="18"/>
        </filter>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .25 0"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
    </svg>
  );
}

// ---------- Ticker ----------
function Ticker({ items }) {
  const block = items.map((it, i) => (
    <React.Fragment key={i}>
      <span><span className="ticker-dot"/>{it}</span>
    </React.Fragment>
  ));
  return (
    <div className="ticker">
      <div className="ticker-track">
        {block}{block}{block}{block}
      </div>
    </div>
  );
}

// ---------- Footer ----------
function Footer({ navigate }) {
  return (
    <footer>
      <div className="fcol">
        <div className="flogo">My<br/><i>Clothes</i></div>
        <div className="fmeta">SS26 · Édition 003<br/>Atelier 003</div>
      </div>
      <div className="fcol">
        <h4>Boutique</h4>
        <button onClick={() => navigate('catalogue')}>Tout</button>
        <button onClick={() => navigate('catalogue')}>Nouveautés</button>
        <button onClick={() => navigate('catalogue')}>T-shirts</button>
        <button onClick={() => navigate('catalogue')}>Sweats</button>
        <button onClick={() => navigate('catalogue')}>Outerwear</button>
      </div>
      <div className="fcol">
        <h4>Maison</h4>
        <a href="#">À propos</a>
        <a href="#">Atelier</a>
        <a href="#">Journal</a>
        <a href="#">Points de vente</a>
      </div>
      <div className="fcol">
        <h4>Aide</h4>
        <a href="#">Livraison</a>
        <button onClick={() => navigate('returns')}>Retours</button>
        <a href="#">Guide des tailles</a>
        <button onClick={() => navigate('contact')}>Contact</button>
      </div>
      <div className="fbottom">
        <div>© My Clothes 2026</div>
        <div>Conçu en atelier</div>
      </div>
    </footer>
  );
}

// ---------- Toast (added-to-cart confirmation) ----------
function Toast({ message, product, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="toast">
      {product && (
        <div className="toast-thumb">
          <ProductMedia product={product} showLabel={false} />
        </div>
      )}
      <span>{message}</span>
    </div>
  );
}

// expose
Object.assign(window, {
  Cursor, Header, Footer, Ticker, Toast,
  ProductMedia, SvgDefs, useAudio, AudioToggle,
});
