// MY CLOTHES — Cart drawer + Checkout screen.

const { useState: useStateC, useEffect: useEffectC, useMemo: useMemoC } = React;

function CartLine({ line, product, onQty, onRemove }) {
  return (
    <div className="cart-line">
      <div className="pmedia"><ProductMedia product={product} showLabel={false} /></div>
      <div className="cinfo">
        <div>{product.name}</div>
        <div className="cmeta">{window.CATEGORY_LABEL[product.category]} · Size {line.size}</div>
        <div className="cqty">
          <button onClick={() => onQty(Math.max(1, line.qty - 1))}>−</button>
          <span className="mono" style={{ fontSize: 12, minWidth: 18, textAlign: 'center' }}>{line.qty}</span>
          <button onClick={() => onQty(line.qty + 1)}>+</button>
        </div>
        <button className="cremove" onClick={onRemove}>Retirer</button>
      </div>
      <div className="cprice">€{(product.price * line.qty).toFixed(0)}</div>
    </div>
  );
}

// ---------- Cart drawer ----------
function CartDrawer({ open, onClose, cart, updateQty, removeLine, onCheckout }) {
  useEffectC(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const lines = cart.map(l => ({ line: l, product: window.PRODUCTS.find(p => p.id === l.productId) })).filter(x => x.product);
  const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.qty, 0);
  const shipping = subtotal === 0 ? 0 : 18;
  const total = subtotal + shipping;

  return (
    <React.Fragment>
      <div className="drawer-back" onClick={onClose} />
      <aside className="drawer">
        <div className="drawer-head">
          <span>Le Panier — {lines.length} pièce{lines.length !== 1 ? 's' : ''}</span>
          <button onClick={onClose}>Fermer ✕</button>
        </div>

        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="cart-empty">
              <div className="big">vide.</div>
              <p>Rien dans le panier pour le moment.</p>
              <p className="muted" style={{ marginTop: 4 }}>Le Drop 001 est en ligne — commencez par là.</p>
            </div>
          ) : (
            lines.map(({ line, product }, i) => (
              <CartLine
                key={`${line.productId}-${line.size}-${i}`}
                line={line} product={product}
                onQty={(q) => updateQty(i, q)}
                onRemove={() => removeLine(i)}
              />
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="drawer-foot">
            <div className="cart-total">
              <span className="label">Sous-total</span>
              <span className="mono" style={{ fontSize: 13 }}>€{subtotal.toFixed(0)}</span>
            </div>
            <div className="cart-total">
              <span className="label">Livraison</span>
              <span className="mono" style={{ fontSize: 13 }}>{shipping === 0 ? '—' : `€${shipping}`}</span>
            </div>
            <div className="hr" />
            <div className="cart-total">
              <span className="label">Total</span>
              <span className="value">€{total.toFixed(0)}</span>
            </div>
            <button className="btn btn-accent" onClick={onCheckout}>Commander</button>
            <button className="btn btn-ghost" onClick={onClose}>Continuer mes achats</button>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

// ---------- Checkout ----------
function CheckoutScreen({ cart, navigate, clearCart }) {
  const [step, setStep] = useStateC(0); // 0 = details, 1 = shipping, 2 = payment, 3 = done
  const [form, setForm] = useStateC({
    email: '', firstName: '', lastName: '',
    address: '', city: '', zip: '', country: 'France',
    card: '', expiry: '', cvc: '',
    shipMethod: 'standard',
  });
  const [paying, setPaying] = useStateC(false);
  const [payError, setPayError] = useStateC('');

  const lines = cart.map(l => ({ line: l, product: window.PRODUCTS.find(p => p.id === l.productId) })).filter(x => x.product);
  const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.qty, 0);
  const shipping = form.shipMethod === 'express' ? 32 : 18;
  const total = subtotal + shipping;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // simple validity
  const validDetails = form.email.includes('@') && form.firstName && form.lastName && form.address && form.city && form.zip;
  const validPay = form.card.replace(/\s/g, '').length >= 12 && form.expiry.length >= 4 && form.cvc.length >= 3;

  const next = () => {
    if (step === 0 && validDetails) setStep(1);
    else if (step === 1) setStep(2);
  };

  // Paiement réel via Stripe Checkout (backend Cloudflare). Si aucun backend
  // n'est présent (hébergement statique pur), on retombe sur la confirmation
  // de démonstration pour que le prototype reste navigable.
  const payNow = async () => {
    setPaying(true);
    setPayError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(l => ({ productId: l.productId, size: l.size, qty: l.qty })),
          shipMethod: form.shipMethod,
        }),
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data && data.url) { window.location.href = data.url; return; }
      }
      if (res.status === 404) { setStep(3); return; } // pas de backend → démo
      const d = await res.json().catch(() => ({}));
      if (d && d.error === 'paiement_non_configure') {
        setPayError("Le paiement en ligne n'est pas encore activé. Réessayez bientôt.");
      } else {
        setPayError("Le paiement a échoué. Merci de réessayer dans un instant.");
      }
      setPaying(false);
    } catch (e) {
      // réseau / pas de backend → confirmation de démonstration
      setStep(3);
    }
  };

  // confirmation
  if (step === 3) {
    return (
      <div className="screen" style={{ minHeight: 'calc(100vh - 60px)', display: 'grid', placeItems: 'center', padding: '80px 28px' }}>
        <div style={{ textAlign: 'center', maxWidth: 640 }}>
          <div className="eyebrow">Commande confirmée — N° MC-{Math.floor(Math.random() * 90000 + 10000)}</div>
          <h1 className="serif distort-hover" style={{ fontSize: 'clamp(56px, 10vw, 140px)', letterSpacing: '-0.04em', lineHeight: .9, marginTop: 20 }}>
            Merci<em style={{ fontStyle: 'normal', fontFamily: 'var(--sans)', fontWeight: 300 }}>.</em>
          </h1>
          <p style={{ marginTop: 24, color: 'var(--muted)', lineHeight: 1.7 }}>
            Une confirmation a été envoyée à <strong style={{ color: 'var(--fg)' }}>{form.email || 'votre email'}</strong>.<br/>
            Le suivi vous parviendra par e-mail.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => { clearCart(); navigate('home'); }}>Retour à l'accueil</button>
            <button className="btn btn-ghost" onClick={() => { clearCart(); navigate('catalogue'); }}>Continuer les achats</button>
          </div>
          <div className="mono muted" style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 80 }}>
            Chaque pièce est finie à la main.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="checkout">
        <div className="checkout-form">
          <div className="eyebrow">Commande · N° 001</div>
          <h1>{step === 0 ? <span>Vos <em>coordonnées</em>.</span> : step === 1 ? <span>Adresse de <em>livraison.</em></span> : <span>Paiement par <em>carte.</em></span>}</h1>

          <div className="checkout-steps">
            <span data-active={step === 0}>01 · Coordonnées</span>
            <span data-active={step === 1}>02 · Livraison</span>
            <span data-active={step === 2}>03 · Paiement</span>
          </div>

          {step === 0 && (
            <div>
              <h3>Contact</h3>
              <div className="field">
                <label>E-mail</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="vous@exemple.com" />
              </div>
              <h3>Adresse de livraison</h3>
              <div className="field-row">
                <div className="field"><label>Prénom</label><input value={form.firstName} onChange={e => set('firstName', e.target.value)} /></div>
                <div className="field"><label>Nom</label><input value={form.lastName} onChange={e => set('lastName', e.target.value)} /></div>
              </div>
              <div className="field"><label>Adresse</label><input value={form.address} onChange={e => set('address', e.target.value)} placeholder="11 rue Saint-Maur" /></div>
              <div className="field-row">
                <div className="field"><label>Ville</label><input value={form.city} onChange={e => set('city', e.target.value)} /></div>
                <div className="field"><label>Code postal</label><input value={form.zip} onChange={e => set('zip', e.target.value)} /></div>
              </div>
              <div className="field"><label>Pays</label>
                <select value={form.country} onChange={e => set('country', e.target.value)}>
                  <option>France</option><option>Italie</option><option>Royaume-Uni</option><option>Japon</option><option>États-Unis</option><option>Allemagne</option>
                </select>
              </div>
              <button className="btn btn-accent" onClick={next} disabled={!validDetails} style={{ opacity: validDetails ? 1 : 0.4, marginTop: 12 }}>Continuer vers livraison →</button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3>Choisir une méthode</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { id: 'standard', label: 'Standard', price: 18 },
                  { id: 'express',  label: 'Express',  price: 32 },
                ].map(opt => (
                  <button key={opt.id} onClick={() => set('shipMethod', opt.id)} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, padding: '18px 20px',
                    border: '1px solid ' + (form.shipMethod === opt.id ? 'var(--fg)' : 'var(--line)'),
                    background: form.shipMethod === opt.id ? 'color-mix(in srgb, var(--fg) 6%, transparent)' : 'transparent',
                    textAlign: 'left',
                  }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{opt.label}</div>
                    </div>
                    <div className="mono" style={{ fontSize: 13 }}>€{opt.price}</div>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <button className="btn btn-ghost" onClick={() => setStep(0)}>← Retour</button>
                <button className="btn btn-accent" onClick={next}>Continuer vers paiement →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3>Paiement sécurisé</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 6 }}>
                Vous allez être redirigé vers la page de paiement sécurisée <strong style={{ color: 'var(--fg)' }}>Stripe</strong> pour régler votre commande par carte. Vos coordonnées bancaires ne transitent jamais par notre site.
              </p>
              <div className="mono muted" style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', marginTop: 14 }}>
                Paiement chiffré · Carte · Apple Pay · Google Pay
              </div>
              {payError && (
                <div className="mono" style={{ fontSize: 12, color: 'var(--accent)', marginTop: 14, letterSpacing: '.04em' }}>
                  {payError}
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <button className="btn btn-ghost" onClick={() => setStep(1)} disabled={paying}>← Retour</button>
                <button className="btn btn-accent" onClick={payNow} disabled={paying} style={{ opacity: paying ? 0.5 : 1 }}>
                  {paying ? 'Redirection…' : `Payer €${total} →`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <aside className="checkout-summary">
          <div className="eyebrow">Commande — N° 001 · {lines.length} pièce{lines.length !== 1 ? 's' : ''}</div>
          <div className="spacer-md" />
          <div className="summary-list">
            {lines.map(({ line, product }, i) => (
              <div className="cart-line" key={i} style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="pmedia"><ProductMedia product={product} showLabel={false} /></div>
                <div className="cinfo">
                  <div>{product.name}</div>
                  <div className="cmeta">Taille {line.size} · ×{line.qty}</div>
                </div>
                <div className="cprice">€{(product.price * line.qty).toFixed(0)}</div>
              </div>
            ))}
          </div>
          <div className="spacer-md" />
          <div className="cart-total"><span className="label">Sous-total</span><span className="mono" style={{ fontSize: 13 }}>€{subtotal.toFixed(0)}</span></div>
          <div className="cart-total" style={{ marginTop: 6 }}>
            <span className="label">Livraison</span>
            <span className="mono" style={{ fontSize: 13 }}>€{shipping}</span>
          </div>
          <div className="hr" style={{ margin: '16px 0' }}/>
          <div className="cart-total">
            <span className="label">Total</span>
            <span className="value">€{total.toFixed(0)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { CartDrawer, CheckoutScreen });
