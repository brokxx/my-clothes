// MY CLOTHES — admin data layer
// Mock orders, logging, aggregations, CSV export. All client-side.

(function () {
  'use strict';

  // ---------- Mulberry32 seeded RNG ----------
  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6D2B79F5) | 0;
      t = Math.imul(t ^ (t >>> 15), 1 | t);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pickWeighted(items, weights, rng) {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = rng() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  }

  // ---------- Customer pool (FR) ----------
  const FIRST_NAMES = ['Lucas', 'Manon', 'Hugo', 'Camille', 'Léa', 'Nathan', 'Chloé', 'Enzo', 'Sarah', 'Mathéo',
    'Inès', 'Théo', 'Jade', 'Maxime', 'Louise', 'Antoine', 'Emma', 'Adrien', 'Alice', 'Romain',
    'Clara', 'Julien', 'Anaïs', 'Noah', 'Léna', 'Tom', 'Mila', 'Arthur', 'Lina', 'Gabriel'];
  const LAST_NAMES = ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau',
    'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'David', 'Bertrand', 'Roux', 'Vincent', 'Fournier',
    'Morel', 'Girard', 'André', 'Lefèvre', 'Mercier', 'Dupont', 'Lambert', 'Bonnet', 'François', 'Martinez'];
  const CITIES = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille', 'Nantes', 'Strasbourg',
    'Nice', 'Montpellier', 'Rennes', 'Reims', 'Saint-Étienne', 'Le Havre', 'Toulon', 'Grenoble',
    'Dijon', 'Angers', 'Brest', 'Nîmes', 'Tours', 'Limoges', 'Clermont-Ferrand', 'Aix-en-Provence'];
  const STATUSES = [
    { label: 'delivered', weight: 60 },
    { label: 'shipped', weight: 20 },
    { label: 'paid', weight: 15 },
    { label: 'returned', weight: 5 },
  ];
  const PAYMENTS = ['card', 'paypal'];

  // ---------- Order generation ----------
  function generateOrders(seed) {
    const rng = mulberry32(seed >>> 0);
    const products = (window.PRODUCTS || []).filter(p => p && p.price);
    if (products.length === 0) return [];

    // weight products by 1/rank (best-sellers favored)
    const prodWeights = products.map(p => 1 / Math.max(1, p.rank || 50));

    const orders = [];
    const now = Date.now();
    const dayMs = 86400000;
    let counter = 1;

    for (let d = 119; d >= 0; d--) {
      const dayTs = now - d * dayMs;
      const dow = new Date(dayTs).getDay(); // 0=dim, 6=sam
      // density: weekends +50%, weekdays baseline ~1
      const lambda = (dow === 0 || dow === 6) ? 1.6 : 1.0;
      const nOrdersDay = Math.max(0, Math.round(lambda + (rng() - 0.5) * 1.5));

      for (let k = 0; k < nOrdersDay; k++) {
        const items = [];
        const nItems = 1 + Math.floor(rng() * 4); // 1..4
        for (let it = 0; it < nItems; it++) {
          const p = pickWeighted(products, prodWeights, rng);
          const sizes = (p.sizes && p.sizes.length) ? p.sizes : ['OS'];
          const size = sizes[Math.floor(rng() * sizes.length)];
          const qty = 1 + (rng() < 0.18 ? 1 : 0); // mostly 1, sometimes 2
          items.push({ productId: p.id, name: p.name, size, qty, price: p.price });
        }
        const subtotal = items.reduce((s, l) => s + l.qty * l.price, 0);
        const shipping = subtotal >= 200 ? 0 : 6;
        const total = subtotal + shipping;
        const status = pickWeighted(
          STATUSES.map(s => s.label),
          STATUSES.map(s => s.weight),
          rng
        );
        const fn = FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)];
        const ln = LAST_NAMES[Math.floor(rng() * LAST_NAMES.length)];
        const city = CITIES[Math.floor(rng() * CITIES.length)];
        const dateObj = new Date(dayTs + Math.floor(rng() * dayMs));
        const orderTs = dateObj.getTime();
        const yyyy = dateObj.getFullYear();
        const id = 'MC-' + yyyy + '-' + String(counter).padStart(5, '0');
        counter++;
        orders.push({
          id,
          ts: orderTs,
          date: dateObj.toISOString().slice(0, 10),
          customer: {
            name: fn + ' ' + ln,
            email: (fn + '.' + ln).toLowerCase().replace(/[éèêë]/g, 'e').replace(/[àâ]/g, 'a').replace(/[ùû]/g, 'u') + '@mail.fr',
            city,
          },
          items,
          subtotal,
          shipping,
          total,
          status,
          paymentMethod: PAYMENTS[Math.floor(rng() * PAYMENTS.length)],
        });
      }
    }
    return orders.sort((a, b) => b.ts - a.ts);
  }

  function loadOrders() {
    try {
      const raw = localStorage.getItem('mc-admin-orders');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    const fresh = generateOrders(0xC10741E5);
    try { localStorage.setItem('mc-admin-orders', JSON.stringify(fresh)); } catch (e) {}
    return fresh;
  }

  function regenerateOrders(seed) {
    const fresh = generateOrders((seed || Date.now()) >>> 0);
    try { localStorage.setItem('mc-admin-orders', JSON.stringify(fresh)); } catch (e) {}
    window.MOCK_ORDERS = fresh;
    return fresh;
  }

  window.MOCK_ORDERS = loadOrders();
  window.regenerateMockOrders = regenerateOrders;

  // ---------- Aggregations ----------
  window.AdminAgg = {
    caTotal(orders) {
      return orders.reduce((s, o) => s + (o.total || 0), 0);
    },
    avgBasket(orders) {
      if (!orders.length) return 0;
      return Math.round(this.caTotal(orders) / orders.length);
    },
    topProducts(orders, n) {
      const map = new Map();
      orders.forEach(o => {
        (o.items || []).forEach(it => {
          const cur = map.get(it.productId) || { productId: it.productId, name: it.name, qty: 0, revenue: 0 };
          cur.qty += it.qty;
          cur.revenue += it.qty * it.price;
          map.set(it.productId, cur);
        });
      });
      return Array.from(map.values()).sort((a, b) => b.qty - a.qty).slice(0, n || 5);
    },
    caByDay(orders, days) {
      const out = [];
      const now = Date.now();
      const dayMs = 86400000;
      for (let d = (days || 30) - 1; d >= 0; d--) {
        const start = now - d * dayMs;
        const date = new Date(start).toISOString().slice(0, 10);
        const ca = orders
          .filter(o => o.date === date)
          .reduce((s, o) => s + o.total, 0);
        out.push({ date, ca });
      }
      return out;
    },
    statusBreakdown(orders) {
      const out = { paid: 0, shipped: 0, delivered: 0, returned: 0 };
      orders.forEach(o => { if (out[o.status] !== undefined) out[o.status]++; });
      return out;
    },
    filterByPeriod(orders, days) {
      const cutoff = Date.now() - days * 86400000;
      return orders.filter(o => o.ts >= cutoff);
    },
  };

  // ---------- Logger ----------
  window.AdminLog = {
    push(kind, payload) {
      try {
        const key = 'mc-admin-logs';
        const arr = JSON.parse(localStorage.getItem(key) || '[]');
        arr.push(Object.assign({ kind, ts: Date.now() }, payload || {}));
        while (arr.length > 2000) arr.shift();
        localStorage.setItem(key, JSON.stringify(arr));
      } catch (e) {}
    },
    read() {
      try { return JSON.parse(localStorage.getItem('mc-admin-logs') || '[]'); }
      catch (e) { return []; }
    },
    clear() {
      try { localStorage.removeItem('mc-admin-logs'); } catch (e) {}
    },
    countSince(days) {
      const cutoff = Date.now() - days * 86400000;
      return this.read().filter(l => l.ts >= cutoff).length;
    },
  };

  // ---------- CSV export ----------
  window.AdminCsv = {
    toCsv(rows, columns) {
      const escape = (v) => {
        const s = v === null || v === undefined ? '' : String(v);
        return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
      };
      const header = columns.map(c => c.label).join(';');
      const body = rows.map(r => columns.map(c => escape(c.get(r))).join(';')).join('\n');
      return '﻿' + header + '\n' + body;
    },
    download(filename, content, mime) {
      const blob = new Blob([content], { type: mime || 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 1000);
      window.__lastCsv = content; // debug hook for Playwright
    },
    todayStamp() {
      const d = new Date();
      return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    },
  };

})();
