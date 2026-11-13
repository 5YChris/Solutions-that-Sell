/*
 * Solutions that Sell — embeddable widget for 5ymarketing.com
 *
 * Usage (paste into a GoDaddy HTML section):
 *   <div class="sts-embed" data-view="teaser" data-all="https://www.5ymarketing.com/solutions-that-sell"></div>
 *   <script src="https://5ychris.github.io/Solutions-that-Sell/embed.js"></script>
 *
 * data-view: "teaser" (front-page block) or "full" (full page).
 * data-all:  where the teaser's button goes.
 * Weekly content lives in feed.json next to this file.
 */
(function () {
  var script = document.currentScript;
  var BASE = script ? script.src.replace(/[^\/]*$/, '') : './';

  var CSS = '\
.sts{--ink:#1b1b1b;--band:#1a1a1a;--blue:#2e3192;--blue-soft:#eef0fb;--muted:#6b6b6b;--line:#e4e4e4;font-family:"Josefin Sans",system-ui,sans-serif;color:var(--ink);background:#fff;box-sizing:border-box}\
.sts *{box-sizing:border-box}.sts a{color:inherit}\
.sts .wrap{max-width:1180px;margin:0 auto;padding:0 24px}.sts .center{text-align:center}\
.sts .eyebrow{font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:var(--blue);font-weight:600;margin:0 0 10px}\
.sts h1,.sts h2{font-family:inherit;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin:0;color:inherit}\
.sts h1{font-size:clamp(28px,4vw,44px)}.sts h2{font-size:clamp(22px,3vw,32px)}\
.sts .lede{font-size:19px;line-height:1.5;color:#333;max-width:720px;margin:14px auto 0}\
.sts .teaser{background:var(--band);color:#fff;padding:56px 0 64px}\
.sts .teaser .eyebrow{color:#9fa3ff}.sts .teaser .lede{color:#cfcfcf}\
.sts .focus-tag{display:inline-block;border:1px solid #fff;padding:10px 22px 8px;margin-top:22px;font-size:15px;letter-spacing:.16em;text-transform:uppercase}\
.sts .teaser-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin:36px auto 0;max-width:960px}\
@media (max-width:760px){.sts .teaser-grid{grid-template-columns:repeat(2,1fr);gap:14px}}\
@media (max-width:440px){.sts .teaser-grid{grid-template-columns:1fr}}\
.sts .t-card{background:#fff;color:var(--ink);text-decoration:none;display:flex;flex-direction:column;transition:transform .15s;text-align:left}\
.sts .t-card:hover{transform:translateY(-3px)}\
.sts .img{background:#f5f5f5;display:flex;align-items:center;justify-content:center;overflow:hidden}\
.sts .t-card .img{aspect-ratio:1/1}.sts .card .img{aspect-ratio:4/3}\
.sts .img img{width:100%;height:100%;object-fit:contain}\
.sts .fallback{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#aaa;padding:20px;text-align:center}\
.sts .t-card .meta{padding:16px 16px 18px}\
.sts .sup{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);font-weight:600}\
.sts .t-card .name{font-size:17px;line-height:1.3;margin-top:6px}\
.sts .btn{display:inline-block;background:#fff;color:var(--ink);text-decoration:none;font-size:15px;letter-spacing:.16em;text-transform:uppercase;padding:18px 44px;margin-top:36px}\
.sts .full-head{padding:56px 0 20px}\
.sts .focus-banner{background:var(--band);color:#fff;padding:34px 0 36px;margin-top:8px}\
.sts .focus-banner .eyebrow{color:#9fa3ff;margin:0}.sts .focus-banner h2{margin-top:8px}\
.sts .focus-banner p{color:#cfcfcf;font-size:17px;line-height:1.5;max-width:760px;margin:12px auto 0}\
.sts .updated{font-size:14px;color:var(--muted);margin-top:18px;letter-spacing:.04em}\
.sts .filters{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:20px 0 0}\
.sts .chip{font-family:inherit;font-size:14px;border:1px solid var(--line);background:#fff;color:var(--ink);padding:9px 16px 7px;cursor:pointer;letter-spacing:.04em}\
.sts .chip[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}\
.sts .count{text-align:center;color:var(--muted);font-size:14px;margin:16px 0 0}\
.sts .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:26px;padding:28px 0 56px}\
.sts .card{border:1px solid var(--line);display:flex;flex-direction:column;background:#fff}\
.sts .card .body{padding:16px 18px 18px;display:flex;flex-direction:column;flex:1}\
.sts .card .sup{font-size:11px}\
.sts .card h3{font-family:inherit;font-size:18px;line-height:1.3;margin:10px 0 6px;font-weight:600}\
.sts .card .item{font-size:13px;color:var(--muted)}\
.sts .card p{font-size:15px;line-height:1.45;color:#3a3a3a;margin:10px 0 16px;flex:1}\
.sts .actions{display:flex;gap:10px}\
.sts .actions a{flex:1;text-align:center;text-decoration:none;font-size:12px;letter-spacing:.14em;text-transform:uppercase;padding:12px 6px 10px;border:1px solid var(--ink)}\
.sts .actions a.primary{background:var(--ink);color:#fff}\
.sts .uma{border-top:1px solid var(--line);padding:52px 0 20px}\
.sts .uma .lede{font-size:17px}\
.sts .uma-groups{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:34px}\
@media (max-width:900px){.sts .uma-groups{grid-template-columns:1fr}}\
.sts .uma-head{font-family:inherit;font-size:15px;letter-spacing:.2em;text-transform:uppercase;margin:0;display:flex;align-items:center;gap:14px}\
.sts .uma-head:after{content:"";flex:1;border-top:1px solid var(--line)}\
.sts .uma-head a{font-size:12px;letter-spacing:.14em;color:var(--blue);text-decoration:none;font-weight:600;order:2}\
.sts .uma-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;padding:20px 0 10px}\
@media (max-width:480px){.sts .uma-grid{grid-template-columns:1fr}}\
.sts .partners{background:var(--blue-soft);padding:52px 0 60px}\
.sts .partner-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:20px;margin-top:30px}\
.sts .partner{background:#fff;padding:22px;border-top:4px solid var(--blue);display:flex;flex-direction:column}\
.sts .partner h4{font-family:inherit;margin:0;font-size:17px;letter-spacing:.1em;text-transform:uppercase}\
.sts .partner .known{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:6px}\
.sts .partner p{font-size:15px;line-height:1.45;color:#3a3a3a;margin:10px 0 14px;flex:1}\
.sts .partner a{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);font-weight:600;text-decoration:none}\
.sts .contact{background:var(--band);color:#fff;padding:48px 0;text-align:center}\
.sts .contact p{font-size:20px;margin:0}.sts .contact .small{font-size:15px;color:#bbb;margin-top:8px}';

  function addHead() {
    if (document.getElementById('sts-style')) return;
    var f = document.createElement('link');
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&display=swap';
    document.head.appendChild(f);
    var s = document.createElement('style');
    s.id = 'sts-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgTag(p) {
    return '<img loading="lazy" alt="' + esc(p.name) + '" src="' + esc(p.img) + '" onerror="this.outerHTML=\'<div class=&quot;fallback&quot;>' + esc(p.supplier) + '</div>\'">';
  }
  function mailto(data, p) {
    var subj = 'Info request: ' + p.name + (p.item ? ' (#' + p.item + ')' : '') + ' - ' + p.supplier;
    return 'mailto:' + data.contactEmail + '?subject=' + encodeURIComponent(subj);
  }
  function weekOf(data) {
    var d = new Date(data.updated + 'T12:00:00');
    return 'Week of ' + d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  function pickTeaser(products, n) {
    var bySup = {}, order = [];
    products.forEach(function (p) { if (!bySup[p.supplier]) { bySup[p.supplier] = []; order.push(p.supplier); } bySup[p.supplier].push(p); });
    var out = [], i = 0;
    while (out.length < n && i < 50) { order.forEach(function (s) { if (bySup[s][i] && out.length < n) out.push(bySup[s][i]); }); i++; }
    return out;
  }

  function renderTeaser(box, data) {
    var allUrl = box.getAttribute('data-all') || '#';
    var cards = pickTeaser(data.products, 6).map(function (p) {
      return '<a class="t-card" href="' + esc(p.url) + '" target="_blank" rel="noopener"><div class="img">' + imgTag(p) +
        '</div><div class="meta"><div class="sup">' + esc(p.supplier) + '</div><div class="name">' + esc(p.name) + '</div></div></a>';
    }).join('');
    box.innerHTML = '<div class="sts"><section class="teaser"><div class="wrap center">' +
      '<p class="eyebrow">Top partners, top solutions</p><h2>Solutions that Sell</h2>' +
      '<p class="lede">Each week I spotlight a different category with proven ideas from the supplier lines I represent.</p>' +
      '<div class="focus-tag">This week: ' + esc(data.focus.title) + '</div>' +
      '<div class="teaser-grid">' + cards + '</div>' +
      '<a class="btn" href="' + esc(allUrl) + '" target="_top">See this week\'s solutions</a>' +
      '</div></section></div>';
  }

  // uma rotation: a new set of 2 Plastic + 2 Metal pens every Monday, cycling through the catalog
  function umaPicks(uma) {
    var start = new Date(uma.startWeek + 'T00:00:00');
    var week = Math.max(0, Math.floor((Date.now() - start.getTime()) / (7 * 864e5)));
    function take(list) {
      var out = [], n = Math.min(uma.perWeek, list.length);
      for (var i = 0; i < n; i++) out.push(list[(week * uma.perWeek + i) % list.length]);
      return out;
    }
    return { plastic: take(uma.plastic), metal: take(uma.metal) };
  }

  function umaCard(data, p) {
    var q = { name: p.name, item: p.item, supplier: 'uma' };
    return '<article class="card"><div class="img"><img loading="lazy" alt="uma ' + esc(p.name) + '" src="' + esc(BASE + p.img) + '"></div>' +
      '<div class="body"><span class="sup">uma &middot; ' + esc(p.material) + '</span><h3>' + esc(p.name) + '</h3>' +
      '<div class="item">Item #' + esc(p.item) + '</div><p>' + esc(p.desc) + '</p>' +
      '<div class="actions"><a class="primary" href="' + mailto(data, q) + '" target="_top">Ask Chris</a>' +
      '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">Details</a></div></div></article>';
  }

  function renderUma(data, uma) {
    if (!uma) return '';
    var picks = umaPicks(uma);
    function group(title, list, url) {
      return '<div class="uma-group"><h3 class="uma-head">' + title + '<a href="' + esc(url) + '" target="_blank" rel="noopener">View all &rarr;</a></h3>' +
        '<div class="uma-grid">' + list.map(function (p) { return umaCard(data, p); }).join('') + '</div></div>';
    }
    return '<section class="uma"><div class="wrap"><div class="center"><p class="eyebrow">Writing instruments</p><h2>uma Pen Picks</h2>' +
      '<p class="lede">Two plastic and two metal pens from uma, a new set each week.</p></div>' +
      '<div class="uma-groups">' + group('Plastic', picks.plastic, uma.plasticUrl) + group('Metal', picks.metal, uma.metalUrl) + '</div></div></section>';
  }

  function renderFull(box, data, uma) {
    var sups = [];
    data.products.forEach(function (p) { if (sups.indexOf(p.supplier) < 0) sups.push(p.supplier); });
    sups.sort();
    box.innerHTML = '<div class="sts">' +
      '<header class="full-head"><div class="wrap center"><p class="eyebrow">Top partners, top solutions</p><h1>Solutions that Sell</h1>' +
      '<p class="lede">A new category every week, with products from my supplier partners that give you and your clients ideas that work.</p></div></header>' +
      '<section class="focus-banner"><div class="wrap center"><p class="eyebrow">This week\'s focus</p><h2>' + esc(data.focus.title) + '</h2><p>' + esc(data.focus.intro) + '</p></div></section>' +
      '<div class="wrap"><p class="updated center">' + weekOf(data) + '</p><div class="filters"></div><p class="count"></p><div class="grid"></div></div>' +
      renderUma(data, uma) +
      '<section class="partners"><div class="wrap"><div class="center"><p class="eyebrow">The lines I represent</p><h2>Our Partners</h2></div><div class="partner-grid">' +
      data.partners.map(function (s) {
        return '<div class="partner"><h4>' + esc(s.name) + '</h4><div class="known">' + esc(s.known) + '</div><p>' + esc(s.text) +
          '</p><a href="' + esc(s.url) + '" target="_blank" rel="noopener">Visit website &rarr;</a></div>';
      }).join('') + '</div></div></section>' +
      '<section class="contact"><div class="wrap"><p>Questions, samples or pricing on anything here?</p>' +
      '<p class="small">Chris Yoder &nbsp;|&nbsp; <a href="mailto:' + esc(data.contactEmail) + '">' + esc(data.contactEmail) + '</a> &nbsp;|&nbsp; 262.442.8223</p></div></section></div>';

    var filters = box.querySelector('.filters'), grid = box.querySelector('.grid'), count = box.querySelector('.count');
    var current = 'All';
    function draw() {
      var list = data.products.filter(function (p) { return current === 'All' || p.supplier === current; });
      count.textContent = list.length + ' solution' + (list.length === 1 ? '' : 's');
      grid.innerHTML = list.map(function (p) {
        return '<article class="card"><div class="img">' + imgTag(p) + '</div><div class="body"><span class="sup">' + esc(p.supplier) + '</span>' +
          '<h3>' + esc(p.name) + '</h3>' + (p.item ? '<div class="item">Item #' + esc(p.item) + '</div>' : '') +
          '<p>' + esc(p.desc) + '</p><div class="actions"><a class="primary" href="' + mailto(data, p) + '" target="_top">Ask Chris</a>' +
          '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">Details</a></div></div></article>';
      }).join('');
    }
    if (sups.length > 1) {
      ['All'].concat(sups).forEach(function (v) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'chip';
        b.textContent = v === 'All' ? 'All partners' : v;
        b.setAttribute('aria-pressed', v === 'All' ? 'true' : 'false');
        b.onclick = function () {
          current = v;
          filters.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
          draw();
        };
        filters.appendChild(b);
      });
    }
    draw();
  }

  function init() {
    var boxes = document.querySelectorAll('.sts-embed');
    if (!boxes.length) return;
    addHead();
    var umaReq = fetch(BASE + 'uma.json?v=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
    fetch(BASE + 'feed.json?v=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        return umaReq.then(function (uma) {
          boxes.forEach(function (box) {
            if (box.getAttribute('data-view') === 'full') renderFull(box, data, uma); else renderTeaser(box, data);
          });
        });
      })
      .catch(function () {
        boxes.forEach(function (box) { box.innerHTML = '<p style="text-align:center;font-family:sans-serif;color:#888">Solutions that Sell is loading. Please refresh in a moment.</p>'; });
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
