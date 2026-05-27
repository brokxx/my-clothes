// MY CLOTHES — admin page (#admin route)
// Login SHA-256 client + dashboard, commandes, produits, logs, export CSV.

const { useState: useStateAd, useEffect: useEffectAd, useMemo: useMemoAd, useRef: useRefAd } = React;

const ADMIN_PWD_HASH = 'c9f43734e882914618a8ebbd4c236cceaf34cd76540f75f34b0b86e7ca4e52aa';

async function hashPwd(s) {
  const buf = new TextEncoder().encode(s);
  const dig = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(dig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function formatEUR(n) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n || 0);
}
function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function formatDateTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString('fr-FR') + ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// ---------- AdminLogin ----------
function AdminLogin({ onSuccess }) {
  const [pwd, setPwd] = useStateAd('');
  const [err, setErr] = useStateAd('');
  const [attempts, setAttempts] = useStateAd(0);
  const [cooldown, setCooldown] = useStateAd(false);
  const inputRef = useRefAd(null);

  useEffectAd(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  async function submit(e) {
    if (e) e.preventDefault();
    if (cooldown) return;
    const h = await hashPwd(pwd);
    if (h === ADMIN_PWD_HASH) {
      sessionStorage.setItem('mc-admin-session', '1');
      onSuccess();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setErr('Mot de passe incorrect');
      setPwd('');
      if (next >= 3) {
        setCooldown(true);
        setErr('Trop d\'essais — patientez 5 secondes');
        setTimeout(() => {
          setCooldown(false);
          setAttempts(0);
          setErr('');
        }, 5000);
      }
    }
  }

  return (
    <div className="adm-login">
      <form className="adm-login-card" onSubmit={submit}>
        <div className="adm-login-eyebrow">My Clothes — Admin</div>
        <h1 className="adm-login-title">Espace privé</h1>
        <p className="adm-login-desc">Entrez le mot de passe d'administration.</p>
        <input
          ref={inputRef}
          type="password"
          className="adm-login-input"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          placeholder="Mot de passe"
          disabled={cooldown}
          autoComplete="off"
        />
        {err && <div className="adm-login-error">{err}</div>}
        <button type="submit" className="adm-login-btn" disabled={cooldown || !pwd}>
          {cooldown ? 'Verrouillé…' : 'Entrer'}
        </button>
        <a className="adm-login-back" href="#home" onClick={() => { window.location.hash = ''; }}>← Retour au site</a>
      </form>
    </div>
  );
}

// ---------- KPI card ----------
function KpiCard({ label, value, hint }) {
  return (
    <div className="adm-kpi">
      <div className="adm-kpi-label">{label}</div>
      <div className="adm-kpi-value">{value}</div>
      {hint && <div className="adm-kpi-hint">{hint}</div>}
    </div>
  );
}

// ---------- Dashboard ----------
function DashboardTab({ orders }) {
  const stats = useMemoAd(() => {
    const last30 = window.AdminAgg.filterByPeriod(orders, 30);
    return {
      caTotal: window.AdminAgg.caTotal(orders),
      ca30: window.AdminAgg.caTotal(last30),
      count: orders.length,
      count30: last30.length,
      avg: window.AdminAgg.avgBasket(orders),
      visits30: window.AdminLog.countSince(30),
      byDay: window.AdminAgg.caByDay(orders, 30),
      top: window.AdminAgg.topProducts(orders, 5),
      status: window.AdminAgg.statusBreakdown(orders),
    };
  }, [orders]);

  const maxDay = Math.max(1, ...stats.byDay.map(d => d.ca));
  const maxTop = Math.max(1, ...stats.top.map(t => t.qty));

  return (
    <div className="adm-content">
      <div className="adm-grid adm-grid-4">
        <KpiCard label="Chiffre d'affaires" value={formatEUR(stats.caTotal)} hint={formatEUR(stats.ca30) + ' sur 30j'} />
        <KpiCard label="Commandes" value={stats.count} hint={stats.count30 + ' sur 30j'} />
        <KpiCard label="Panier moyen" value={formatEUR(stats.avg)} hint="Sur tout l'historique" />
        <KpiCard label="Visites 30j" value={stats.visits30} hint="Sessions de navigation" />
      </div>

      <div className="adm-grid adm-grid-2" style={{ marginTop: 24 }}>
        <div className="adm-card">
          <div className="adm-card-title">CA sur 30 jours</div>
          <svg viewBox="0 0 600 140" style={{ width: '100%', height: 140 }}>
            <polyline
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              points={stats.byDay.map((d, i) => {
                const x = (i / (stats.byDay.length - 1)) * 600;
                const y = 130 - (d.ca / maxDay) * 110;
                return x + ',' + y;
              }).join(' ')}
            />
            {stats.byDay.map((d, i) => {
              const x = (i / (stats.byDay.length - 1)) * 600;
              const y = 130 - (d.ca / maxDay) * 110;
              return <circle key={i} cx={x} cy={y} r="2" fill="var(--accent)" />;
            })}
          </svg>
          <div className="adm-card-foot">Max jour : {formatEUR(maxDay)}</div>
        </div>

        <div className="adm-card">
          <div className="adm-card-title">Top 5 produits (quantité)</div>
          <div className="adm-bars">
            {stats.top.map(t => (
              <div className="adm-bar-row" key={t.productId}>
                <div className="adm-bar-label" title={t.name}>{t.name}</div>
                <div className="adm-bar-track">
                  <div className="adm-bar-fill" style={{ width: ((t.qty / maxTop) * 100) + '%' }} />
                </div>
                <div className="adm-bar-val">{t.qty} · {formatEUR(t.revenue)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="adm-grid adm-grid-4" style={{ marginTop: 24 }}>
        <KpiCard label="Payées" value={stats.status.paid} />
        <KpiCard label="Expédiées" value={stats.status.shipped} />
        <KpiCard label="Livrées" value={stats.status.delivered} />
        <KpiCard label="Retours" value={stats.status.returned} />
      </div>
    </div>
  );
}

// ---------- Orders Tab ----------
function OrdersTab({ orders }) {
  const [period, setPeriod] = useStateAd(30);
  const [status, setStatus] = useStateAd('all');
  const [selected, setSelected] = useStateAd(null);

  const filtered = useMemoAd(() => {
    let arr = period === 'all' ? orders.slice() : window.AdminAgg.filterByPeriod(orders, period);
    if (status !== 'all') arr = arr.filter(o => o.status === status);
    return arr;
  }, [orders, period, status]);

  return (
    <div className="adm-content">
      <div className="adm-filters">
        <label>Période :
          <select value={period} onChange={e => setPeriod(e.target.value === 'all' ? 'all' : Number(e.target.value))}>
            <option value={7}>7 jours</option>
            <option value={30}>30 jours</option>
            <option value={90}>90 jours</option>
            <option value="all">Tout</option>
          </select>
        </label>
        <label>Statut :
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="all">Tous</option>
            <option value="paid">Payée</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="returned">Retour</option>
          </select>
        </label>
        <span className="adm-count">{filtered.length} commande{filtered.length > 1 ? 's' : ''}</span>
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>N°</th>
              <th>Client</th>
              <th>Ville</th>
              <th>Articles</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Paiement</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 200).map(o => (
              <tr key={o.id} onClick={() => setSelected(o)} className="adm-tr-click">
                <td>{formatDate(o.ts)}</td>
                <td className="adm-mono">{o.id}</td>
                <td>{o.customer.name}</td>
                <td>{o.customer.city}</td>
                <td>{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                <td>{formatEUR(o.total)}</td>
                <td><span className={'adm-status adm-status-' + o.status}>{o.status}</span></td>
                <td>{o.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 200 && <div className="adm-table-foot">Affichage limité aux 200 premières lignes. Exportez pour tout voir.</div>}
      </div>

      {selected && <OrderDrawer order={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function OrderDrawer({ order, onClose }) {
  const product = (id) => (window.PRODUCTS || []).find(p => p.id === id);
  return (
    <div className="adm-drawer-overlay" onClick={onClose}>
      <div className="adm-drawer" onClick={e => e.stopPropagation()}>
        <div className="adm-drawer-head">
          <div>
            <div className="adm-mono adm-drawer-id">{order.id}</div>
            <h3 className="adm-drawer-title">{order.customer.name}</h3>
          </div>
          <button className="adm-drawer-close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>
        <div className="adm-drawer-row">
          <span>Date</span><b>{formatDateTime(order.ts)}</b>
        </div>
        <div className="adm-drawer-row">
          <span>Email</span><b>{order.customer.email}</b>
        </div>
        <div className="adm-drawer-row">
          <span>Ville</span><b>{order.customer.city}</b>
        </div>
        <div className="adm-drawer-row">
          <span>Statut</span><b><span className={'adm-status adm-status-' + order.status}>{order.status}</span></b>
        </div>
        <div className="adm-drawer-row">
          <span>Paiement</span><b>{order.paymentMethod}</b>
        </div>
        <div className="adm-drawer-section">Articles</div>
        <ul className="adm-drawer-items">
          {order.items.map((it, i) => {
            const p = product(it.productId);
            return (
              <li key={i}>
                <div>
                  <div className="adm-drawer-item-name">{it.name}</div>
                  <div className="adm-drawer-item-meta">{it.size} · ×{it.qty} {p ? '· ' + window.CATEGORY_LABEL[p.category] : ''}</div>
                </div>
                <div className="adm-drawer-item-price">{formatEUR(it.qty * it.price)}</div>
              </li>
            );
          })}
        </ul>
        <div className="adm-drawer-row"><span>Sous-total</span><b>{formatEUR(order.subtotal)}</b></div>
        <div className="adm-drawer-row"><span>Livraison</span><b>{order.shipping === 0 ? 'Offerte' : formatEUR(order.shipping)}</b></div>
        <div className="adm-drawer-row adm-drawer-total"><span>Total</span><b>{formatEUR(order.total)}</b></div>
      </div>
    </div>
  );
}

// ---------- Products Tab ----------
function ProductsTab() {
  const [cat, setCat] = useStateAd('all');
  const [q, setQ] = useStateAd('');
  const cats = window.NAV_CATS || [];

  const filtered = useMemoAd(() => {
    let arr = (window.PRODUCTS || []).slice();
    if (cat !== 'all') arr = arr.filter(p => p.category === cat);
    if (q) {
      const ql = q.toLowerCase();
      arr = arr.filter(p => (p.name || '').toLowerCase().includes(ql) || (p.id || '').toLowerCase().includes(ql));
    }
    arr.sort((a, b) => (a.rank || 999) - (b.rank || 999));
    return arr;
  }, [cat, q]);

  return (
    <div className="adm-content">
      <div className="adm-filters">
        <label>Catégorie :
          <select value={cat} onChange={e => setCat(e.target.value)}>
            <option value="all">Toutes</option>
            {cats.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </label>
        <label>Recherche :
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Nom ou id…" />
        </label>
        <span className="adm-count">{filtered.length} produit{filtered.length > 1 ? 's' : ''}</span>
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Sous-cat.</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>État</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const stock = window.totalStock ? window.totalStock(p) : 0;
              const low = window.isLowStock ? window.isLowStock(p) : false;
              const out = window.isSoldOut ? window.isSoldOut(p) : false;
              return (
                <tr key={p.id}>
                  <td className="adm-mono">{p.id}</td>
                  <td>{p.name}</td>
                  <td>{(window.CATEGORY_LABEL || {})[p.category] || p.category}</td>
                  <td>{p.subcategory || '—'}</td>
                  <td>{formatEUR(p.price)}</td>
                  <td>{stock}</td>
                  <td>
                    {out && <span className="adm-badge-danger">Épuisé</span>}
                    {!out && low && <span className="adm-badge-warn">Stock bas</span>}
                    {!out && !low && <span className="adm-badge-ok">OK</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Logs Tab ----------
function LogsTab() {
  const [logs, setLogs] = useStateAd(() => window.AdminLog.read());
  const [page, setPage] = useStateAd(0);
  const perPage = 50;

  const sorted = useMemoAd(() => logs.slice().sort((a, b) => b.ts - a.ts), [logs]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const slice = sorted.slice(page * perPage, (page + 1) * perPage);

  function refresh() { setLogs(window.AdminLog.read()); }
  function clear() {
    if (confirm('Effacer tous les logs ?')) {
      window.AdminLog.clear();
      setLogs([]);
      setPage(0);
    }
  }

  return (
    <div className="adm-content">
      <div className="adm-filters">
        <span className="adm-count">{logs.length} entrée{logs.length > 1 ? 's' : ''}</span>
        <button className="adm-btn-ghost" onClick={refresh}>Rafraîchir</button>
        <button className="adm-btn-ghost adm-btn-danger" onClick={clear}>Vider les logs</button>
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Horodatage</th>
              <th>Type</th>
              <th>Écran</th>
              <th>Produit</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((l, i) => {
              const prod = l.productId ? (window.PRODUCTS || []).find(p => p.id === l.productId) : null;
              return (
                <tr key={i}>
                  <td className="adm-mono">{formatDateTime(l.ts)}</td>
                  <td>{l.kind}</td>
                  <td>{l.screen || '—'}</td>
                  <td>{prod ? prod.name : (l.productId || '—')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="adm-pager">
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>← Précédent</button>
          <span>Page {page + 1} / {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}>Suivant →</button>
        </div>
      )}
    </div>
  );
}

// ---------- Export Tab ----------
function ExportTab({ orders, onRegenerate }) {
  const [preview, setPreview] = useStateAd('');

  function exportOrders() {
    const cols = [
      { label: 'ID', get: o => o.id },
      { label: 'Date', get: o => o.date },
      { label: 'Client', get: o => o.customer.name },
      { label: 'Email', get: o => o.customer.email },
      { label: 'Ville', get: o => o.customer.city },
      { label: 'Articles', get: o => o.items.reduce((s, i) => s + i.qty, 0) },
      { label: 'Detail', get: o => o.items.map(i => i.name + ' (' + i.size + ' x' + i.qty + ')').join(' | ') },
      { label: 'Sous-total', get: o => o.subtotal },
      { label: 'Livraison', get: o => o.shipping },
      { label: 'Total', get: o => o.total },
      { label: 'Statut', get: o => o.status },
      { label: 'Paiement', get: o => o.paymentMethod },
    ];
    const csv = window.AdminCsv.toCsv(orders, cols);
    window.AdminCsv.download('commandes-myclothes-' + window.AdminCsv.todayStamp() + '.csv', csv);
    setPreview(csv.slice(0, 1500));
  }

  function exportProducts() {
    const products = window.PRODUCTS || [];
    const cols = [
      { label: 'ID', get: p => p.id },
      { label: 'Nom', get: p => p.name },
      { label: 'Categorie', get: p => (window.CATEGORY_LABEL || {})[p.category] || p.category },
      { label: 'Sous-cat', get: p => p.subcategory || '' },
      { label: 'Prix', get: p => p.price },
      { label: 'Stock total', get: p => window.totalStock ? window.totalStock(p) : 0 },
      { label: 'Drop', get: p => p.drop || '' },
      { label: 'Made in', get: p => p.made || '' },
    ];
    const csv = window.AdminCsv.toCsv(products, cols);
    window.AdminCsv.download('produits-myclothes-' + window.AdminCsv.todayStamp() + '.csv', csv);
    setPreview(csv.slice(0, 1500));
  }

  function exportLogs() {
    const logs = window.AdminLog.read();
    const cols = [
      { label: 'Horodatage', get: l => formatDateTime(l.ts) },
      { label: 'Type', get: l => l.kind },
      { label: 'Ecran', get: l => l.screen || '' },
      { label: 'ProduitID', get: l => l.productId || '' },
    ];
    const csv = window.AdminCsv.toCsv(logs, cols);
    window.AdminCsv.download('logs-myclothes-' + window.AdminCsv.todayStamp() + '.csv', csv);
    setPreview(csv.slice(0, 1500));
  }

  return (
    <div className="adm-content">
      <div className="adm-export-actions">
        <button className="adm-btn" onClick={exportOrders}>Exporter commandes (CSV)</button>
        <button className="adm-btn" onClick={exportProducts}>Exporter produits (CSV)</button>
        <button className="adm-btn" onClick={exportLogs}>Exporter logs (CSV)</button>
        <button className="adm-btn-ghost" onClick={() => { if (confirm('Re-générer 120 commandes aléatoires ?')) onRegenerate(); }}>
          Régénérer données démo
        </button>
      </div>
      <div className="adm-card" style={{ marginTop: 24 }}>
        <div className="adm-card-title">Aperçu CSV</div>
        <textarea className="adm-export-preview" value={preview} readOnly placeholder="Cliquez sur un bouton d'export pour voir un aperçu ici (1500 premiers caractères)."></textarea>
      </div>
    </div>
  );
}

// ---------- AdminScreen ----------
function AdminScreen({ navigate }) {
  const [authed, setAuthed] = useStateAd(() => sessionStorage.getItem('mc-admin-session') === '1');
  const [tab, setTab] = useStateAd('dashboard');
  const [orders, setOrders] = useStateAd(() => window.MOCK_ORDERS || []);

  function logout() {
    sessionStorage.removeItem('mc-admin-session');
    setAuthed(false);
  }
  function regenerate() {
    const fresh = window.regenerateMockOrders();
    setOrders(fresh);
  }

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;

  return (
    <div className="adm-shell">
      <div className="adm-topbar">
        <div className="adm-topbar-left">
          <div className="adm-logo">My Clothes <span className="adm-logo-tag">Admin</span></div>
          <nav className="adm-tabs">
            <button className={'adm-tab' + (tab === 'dashboard' ? ' active' : '')} onClick={() => setTab('dashboard')}>Dashboard</button>
            <button className={'adm-tab' + (tab === 'orders' ? ' active' : '')} onClick={() => setTab('orders')}>Commandes</button>
            <button className={'adm-tab' + (tab === 'products' ? ' active' : '')} onClick={() => setTab('products')}>Produits</button>
            <button className={'adm-tab' + (tab === 'logs' ? ' active' : '')} onClick={() => setTab('logs')}>Logs</button>
            <button className={'adm-tab' + (tab === 'export' ? ' active' : '')} onClick={() => setTab('export')}>Export</button>
          </nav>
        </div>
        <div className="adm-topbar-right">
          <a className="adm-btn-ghost" href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; navigate('home'); }}>← Site</a>
          <button className="adm-btn-ghost" onClick={logout}>Déconnexion</button>
        </div>
      </div>

      {tab === 'dashboard' && <DashboardTab orders={orders} />}
      {tab === 'orders' && <OrdersTab orders={orders} />}
      {tab === 'products' && <ProductsTab />}
      {tab === 'logs' && <LogsTab />}
      {tab === 'export' && <ExportTab orders={orders} onRegenerate={regenerate} />}
    </div>
  );
}

window.AdminScreen = AdminScreen;
