// MY CLOTHES — root app: routing, cart state, tweaks integration.

const { useState: useStateA, useEffect: useEffectA, useCallback: useCallbackA, useMemo: useMemoA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#0a0a0a","#f4f1ea","#ff3b00"],
  "typeSet": "editorial",
  "intensity": "experimental",
  "boldHero": true
}/*EDITMODE-END*/;

// Palette options exposed in Tweaks — each is [bg, fg, accent]
const PALETTES = {
  charcoal:   ['#0a0a0a','#f4f1ea','#ff3b00'],   // dark + blood orange (default)
  acid:       ['#0d0d12','#f0efea','#c8ff00'],   // dark + lime
  bone:       ['#f4f1ea','#0a0a0a','#9a3220'],   // light + rust
  oxblood:    ['#0a0807','#ebe3d4','#8a1e1e'],   // dark + oxblood
  electric:   ['#08080a','#f4f1ea','#3b6dff'],   // dark + electric blue
};

// Type sets — exposed in Tweaks
const TYPE_SETS = {
  editorial: { display: '"Instrument Serif", "Times New Roman", serif',     sans: '"Schibsted Grotesk", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace' },
  industrial:{ display: '"Anton", "Bebas Neue", system-ui, sans-serif',     sans: '"Schibsted Grotesk", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace' },
  modern:    { display: '"Fraunces", Georgia, serif',                        sans: '"Geist", system-ui, sans-serif',             mono: '"Geist Mono", ui-monospace, monospace' },
  techno:    { display: '"Space Grotesk", system-ui, sans-serif',           sans: '"Space Grotesk", system-ui, sans-serif',     mono: '"JetBrains Mono", ui-monospace, monospace' },
};

function applyTweaks(t) {
  const root = document.documentElement;
  // palette: t.palette can be either an array (palette swatch) OR a key
  let pal = t.palette;
  if (typeof pal === 'string' && PALETTES[pal]) pal = PALETTES[pal];
  if (Array.isArray(pal) && pal.length >= 3) {
    const [bg, fg, accent] = pal;
    root.style.setProperty('--bg', bg);
    root.style.setProperty('--fg', fg);
    root.style.setProperty('--accent', accent);
    // pick a readable card surface from bg
    root.style.setProperty('--card', shiftLight(bg, 8));
    root.style.setProperty('--line', shiftLight(bg, 14));
    root.style.setProperty('--muted', shiftToward(bg, fg, 0.5));
    root.style.setProperty('--accent-fg', bg);
    // determine theme attr from luminance
    root.setAttribute('data-theme', luminance(bg) < 0.4 ? 'dark' : 'light');
  }
  // typography
  const ts = TYPE_SETS[t.typeSet] || TYPE_SETS.editorial;
  root.style.setProperty('--display', ts.display);
  root.style.setProperty('--sans',    ts.sans);
  root.style.setProperty('--mono',    ts.mono);
  root.style.setProperty('--font-italic-display', t.typeSet === 'editorial' || t.typeSet === 'modern' ? 'italic' : 'normal');
}

// quick color utils (hex only)
function hexToRgb(h) {
  h = h.replace('#','');
  if (h.length === 3) h = h.split('').map(c => c+c).join('');
  const n = parseInt(h, 16);
  return [(n>>16)&255, (n>>8)&255, n&255];
}
function rgbToHex(r,g,b) { return '#' + [r,g,b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2,'0')).join(''); }
function shiftLight(hex, delta) {
  const [r,g,b] = hexToRgb(hex);
  const dir = luminance(hex) < 0.5 ? 1 : -1;
  return rgbToHex(r + dir*delta, g + dir*delta, b + dir*delta);
}
function shiftToward(hex, target, t) {
  const a = hexToRgb(hex), b = hexToRgb(target);
  return rgbToHex(a[0] + (b[0]-a[0])*t, a[1] + (b[1]-a[1])*t, a[2] + (b[2]-a[2])*t);
}
function luminance(hex) {
  const [r,g,b] = hexToRgb(hex);
  return (0.299*r + 0.587*g + 0.114*b) / 255;
}

// =========================================================
//   TOUCH / COARSE-POINTER DETECTION
// =========================================================
// Mobile fluidity gate. We mark <html data-touch="1"> once at boot so the
// stylesheet can disable heavy effects (backdrop-filter, SVG distortion,
// crossfade hovers) and components can short-circuit listeners (custom cursor,
// hero parallax). Re-evaluated on matchMedia change in case the user docks a
// tablet to a mouse.
const __mqTouch = window.matchMedia('(hover: none), (pointer: coarse)');
function __syncTouch() {
  document.documentElement.dataset.touch = __mqTouch.matches ? '1' : '0';
  window.IS_TOUCH = __mqTouch.matches;
}
__syncTouch();
if (__mqTouch.addEventListener) __mqTouch.addEventListener('change', __syncTouch);
else if (__mqTouch.addListener) __mqTouch.addListener(__syncTouch);

// =========================================================
//   APP ROOT
// =========================================================
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectA(() => { applyTweaks(tweaks); }, [tweaks]);

  // routing
  const [screen, setScreen] = useStateA('home');
  const [productId, setProductId] = useStateA(null);
  const [catFilter, setCatFilter] = useStateA({ category: 'all', subcategory: 'all' });
  const [transitioning, setTransitioning] = useStateA(false);
  const [history, setHistory] = useStateA([]);

  const navigate = useCallbackA((next, opts = {}) => {
    if (next === screen && !opts.force) return;
    if (!opts.skipHistory) {
      setHistory(prev => [...prev, { screen, productId, catFilter, scrollY: window.scrollY }]);
    }
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      if (next !== 'product') setProductId(null);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => setTransitioning(false), 60);
    }, 220);
  }, [screen, productId, catFilter]);

  const goBack = useCallbackA(() => {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setTransitioning(true);
      setTimeout(() => {
        setScreen(last.screen);
        setProductId(last.productId);
        setCatFilter(last.catFilter);
        // Wait two frames so the restored screen is laid out before we scroll
        requestAnimationFrame(() => requestAnimationFrame(() => {
          window.scrollTo({ top: last.scrollY || 0, behavior: 'instant' });
          setTransitioning(false);
        }));
      }, 220);
      return prev.slice(0, -1);
    });
  }, []);

  const openProduct = useCallbackA((id) => {
    setProductId(id);
    navigate('product');
  }, [navigate]);

  const openCategory = useCallbackA((category, subcategory) => {
    setCatFilter({ category, subcategory: subcategory || 'all' });
    navigate('catalogue', { force: true });
  }, [navigate]);

  // expose for mega-menu featured product clicks
  useEffectA(() => { window.__openProductFromNav = openProduct; }, [openProduct]);

  // cart state
  const [cart, setCart] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem('mc-cart') || '[]'); } catch { return []; }
  });
  useEffectA(() => { localStorage.setItem('mc-cart', JSON.stringify(cart)); }, [cart]);
  const [cartOpen, setCartOpen] = useStateA(false);
  const [toast, setToast] = useStateA(null);

  const addToCart = useCallbackA((entry) => {
    setCart(prev => {
      const i = prev.findIndex(l => l.productId === entry.productId && l.size === entry.size);
      if (i >= 0) {
        const next = prev.slice();
        next[i] = { ...next[i], qty: next[i].qty + entry.qty };
        return next;
      }
      return [...prev, entry];
    });
    const p = window.PRODUCTS.find(x => x.id === entry.productId);
    setToast({ message: 'Ajouté au panier', product: p });
    audio.tick(2200, 0.05, 0.07);
    setTimeout(() => setCartOpen(true), 80);
  }, []);

  const updateQty = useCallbackA((idx, qty) => {
    setCart(prev => prev.map((l, i) => i === idx ? { ...l, qty } : l));
  }, []);
  const removeLine = useCallbackA((idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  }, []);
  const clearCart = useCallbackA(() => setCart([]), []);

  const cartCount = useMemoA(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);

  // theme toggle (swaps to bone palette as light)
  const onToggleTheme = useCallbackA(() => {
    const isDark = luminance(tweaks.palette && tweaks.palette[0] ? tweaks.palette[0] : '#0a0a0a') < 0.4;
    setTweak({ palette: isDark ? PALETTES.bone : PALETTES.charcoal });
  }, [tweaks, setTweak]);
  const theme = luminance(tweaks.palette && tweaks.palette[0] ? tweaks.palette[0] : '#0a0a0a') < 0.4 ? 'dark' : 'light';

  // audio
  const audio = useAudio(false);

  // render screen
  let body;
  if (screen === 'home')        body = <HomeScreen navigate={navigate} openProduct={openProduct} openCategory={openCategory} audio={audio}/>;
  else if (screen === 'catalogue') body = <CatalogueScreen openProduct={openProduct} initialCategory={catFilter.category} initialSubcategory={catFilter.subcategory} />;
  else if (screen === 'product' && productId) body = <ProductScreen productId={productId} openProduct={openProduct} addToCart={addToCart} />;
  else if (screen === 'checkout')  body = <CheckoutScreen cart={cart} navigate={navigate} clearCart={clearCart} />;
  else if (screen === 'contact')   body = <ContactScreen />;
  else if (screen === 'returns')   body = <ReturnsScreen />;
  else if (screen === 'stores')    body = <StoresScreen />;
  else if (screen === 'about')     body = <AboutScreen />;
  else body = <HomeScreen navigate={navigate} openProduct={openProduct} openCategory={openCategory} audio={audio}/>;

  return (
    <React.Fragment>
      <SvgDefs />

      <Header
        screen={screen}
        navigate={navigate}
        openCategory={openCategory}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        theme={theme}
        onToggleTheme={onToggleTheme}
        audio={audio}
      />

      {history.length > 0 && screen !== 'home' && (
        <button className="back-btn" type="button" aria-label="Retour à la page précédente" onClick={goBack}>
          <span aria-hidden="true">←</span>
          <span className="back-btn-label">Retour</span>
        </button>
      )}

      <main key={screen + (screen === 'product' ? productId : '')} data-screen-label={
        screen === 'home' ? '01 Accueil' :
        screen === 'catalogue' ? '02 Catalogue' :
        screen === 'product' ? '03 Produit' :
        screen === 'checkout' ? '04 Commande' :
        screen === 'contact' ? '05 Contact' : screen
      }>
        {body}
      </main>

      {screen !== 'checkout' && <Footer navigate={navigate} openCategory={openCategory} />}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeLine={removeLine}
        onCheckout={() => { setCartOpen(false); navigate('checkout'); }}
      />

      {toast && <Toast message={toast.message} product={toast.product} onDone={() => setToast(null)} />}

      {transitioning && <div className="page-mask in" />}

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette" subtitle="Fond · Texte · Accent">
          <TweakColor
            label="Combo"
            value={tweaks.palette}
            options={[
              PALETTES.charcoal, PALETTES.acid, PALETTES.bone, PALETTES.oxblood, PALETTES.electric,
            ]}
            onChange={(v) => setTweak({ palette: v })}
          />
        </TweakSection>

        <TweakSection title="Typographie">
          <TweakSelect
            label="Police"
            value={tweaks.typeSet}
            options={[
              { value: 'editorial',  label: 'Editorial — Instrument Serif + Schibsted' },
              { value: 'industrial', label: 'Industrial — Anton + Schibsted' },
              { value: 'modern',     label: 'Modern — Fraunces + Geist' },
              { value: 'techno',     label: 'Techno — Space Grotesk only' },
            ]}
            onChange={(v) => setTweak({ typeSet: v })}
          />
        </TweakSection>

        <TweakSection title="Expérience">
          <TweakRadio
            label="Intensité"
            value={tweaks.intensity}
            options={['gentle','rich','experimental']}
            onChange={(v) => {
              setTweak({ intensity: v });
              const root = document.documentElement;
              if (v === 'gentle') { root.style.setProperty('--distort-amount','2'); }
              if (v === 'rich')   { root.style.setProperty('--distort-amount','6'); }
              if (v === 'experimental') { root.style.setProperty('--distort-amount','12'); }
            }}
          />
          <TweakToggle
            label="Typographie hero en gras"
            value={tweaks.boldHero}
            onChange={(v) => setTweak({ boldHero: v })}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Hide loader once the app has mounted (window.load may have fired already
// before Babel finished compiling, so we run unconditionally).
setTimeout(() => {
  const l = document.querySelector('.loader');
  if (l) l.classList.add('hidden');
  setTimeout(() => l && l.remove(), 900);
}, 1600);
