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
.sts .sp-bar{display:block;background:var(--blue);color:#fff;text-decoration:none;padding:14px 20px 12px;text-align:center;font-size:15px;letter-spacing:.06em;line-height:1.5}\
.sts .sp-bar b{letter-spacing:.18em;text-transform:uppercase;margin-right:10px}\
.sts .sp-bar span.go{white-space:nowrap;margin-left:10px;text-decoration:underline}\
.sts .sp-list{padding:10px 0 60px}\
.sts .sp{border:1px solid var(--line);margin-top:40px}\
.sts .sp-head{background:var(--band);color:#fff;padding:26px 28px 24px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px;align-items:flex-end}\
.sts .sp-head .sup{color:#9fa3ff}\
.sts .sp-head h2{font-size:clamp(20px,2.6vw,28px);margin-top:6px}\
.sts .sp-head p{color:#cfcfcf;font-size:16px;line-height:1.5;margin:10px 0 0;max-width:640px}\
.sts .sp-badge{text-align:right}\
.sts .sp-off{font-size:clamp(26px,3.4vw,40px);font-weight:700;letter-spacing:.06em;text-transform:uppercase}\
.sts .sp-ends{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#cfcfcf;margin-top:4px}\
.sts .sp-promo{display:inline-block;margin-top:14px;border:1px dashed #fff;padding:8px 14px 6px;font-size:15px;letter-spacing:.14em}\
.sts .sp-body{padding:4px 28px 26px}\
.sts .sp .grid{padding:24px 0 6px}\
.sts .price{display:flex;align-items:baseline;gap:10px;margin:2px 0 4px}\
.sts .price .now{font-size:22px;font-weight:700;color:var(--blue)}\
.sts .price .was{font-size:14px;color:var(--muted);text-decoration:line-through}\
.sts .sp-terms{font-size:14px;line-height:1.55;color:#555;margin:18px 0 0;padding-left:18px}\
.sts .sp-links{display:flex;flex-wrap:wrap;gap:12px;margin-top:18px}\
.sts .sp-links a{font-size:12px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;padding:12px 18px 10px;border:1px solid var(--ink)}\
.sts .sp-links a.primary{background:var(--ink);color:#fff}\
.sts .sp-none{text-align:center;color:var(--muted);font-size:18px;padding:40px 0}\
.sts .capa-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:24px 0 10px}\
@media (max-width:1000px){.sts .capa-grid{grid-template-columns:repeat(2,1fr)}}\
@media (max-width:480px){.sts .capa-grid{grid-template-columns:1fr}}\
.sts .capa-logo{display:inline-block;margin-top:18px}.sts .capa-logo img{height:46px;width:auto;display:block}\
.sts .capa-flyers{display:inline-block;margin-top:14px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);font-weight:600;text-decoration:none}\
.sts .tag{display:inline-block;align-self:flex-start;margin-top:6px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;background:var(--blue-soft);color:var(--blue);padding:3px 7px 2px;vertical-align:middle}\
.sts .vid-main{max-width:980px;margin:10px auto 0}\
.sts .vid-frame{position:relative;aspect-ratio:16/9;background:#000;overflow:hidden}\
.sts .vid-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}\
.sts .vid-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.92}\
.sts .vid-poster.fit{object-fit:contain;background:#fff;opacity:1}\
.sts .vid-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:84px;height:84px;border-radius:50%;background:rgba(26,26,26,.82);border:2px solid #fff;cursor:pointer}\
.sts .vid-play:after{content:"";position:absolute;left:33px;top:24px;border-left:26px solid #fff;border-top:18px solid transparent;border-bottom:18px solid transparent}\
.sts .vid-cap{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;padding:16px 2px 0}\
.sts .vid-cap h2{font-size:clamp(18px,2.2vw,24px);letter-spacing:.08em;margin-top:4px}\
.sts .vid-cap .note{font-size:13px;color:var(--muted);margin-top:4px}\
.sts .vid-cap .actions a{flex:none;padding:12px 22px 10px}\
.sts .vid-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;padding:40px 0 20px}\
@media (max-width:860px){.sts .vid-grid{grid-template-columns:repeat(2,1fr)}}\
@media (max-width:480px){.sts .vid-grid{grid-template-columns:1fr}}\
.sts .vcard{border:1px solid var(--line);background:#fff;cursor:pointer;text-align:left;font-family:inherit;padding:0;display:flex;flex-direction:column}\
.sts .vcard:hover{border-color:var(--ink)}\
.sts .vcard .thumb{position:relative;aspect-ratio:16/9;background:#f5f5f5;overflow:hidden}\
.sts .vcard .thumb img{width:100%;height:100%;object-fit:cover}\
.sts .vcard .thumb img.fit{object-fit:contain;background:#fff}\
.sts .vcard .thumb:after{content:"";position:absolute;left:50%;top:50%;transform:translate(-30%,-50%);border-left:22px solid #fff;border-top:14px solid transparent;border-bottom:14px solid transparent;filter:drop-shadow(0 0 6px rgba(0,0,0,.6))}\
.sts .vcard .meta{padding:14px 16px 16px}\
.sts .vcard h3{font-family:inherit;font-size:16px;line-height:1.3;margin:6px 0 0;font-weight:600;color:var(--ink)}\
.sts .vcard.on{outline:3px solid var(--blue);outline-offset:-3px}\
.sts .vid-more{text-align:center;padding:10px 0 56px;font-size:15px;line-height:2}\
.sts .vid-more a{color:var(--blue);font-weight:600;text-decoration:none;letter-spacing:.06em;margin:0 10px;white-space:nowrap}\
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
    var w = weekIndex('2026-11-17');
    var d = w > 0 ? new Date(new Date('2026-11-17T12:00:00-06:00').getTime() + (w - 1) * 7 * 864e5) : new Date(data.updated + 'T12:00:00');
    return 'Week of ' + d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Chicago' });
  }

  // Rotations change every Tuesday at midnight, Central time.
  function weekIndex(startWeek) {
    var start = new Date(startWeek + 'T00:00:00-06:00').getTime();
    return Math.max(0, Math.floor((Date.now() - start) / (7 * 864e5)) + 1);
  }
  function rotate(list, n, week) {
    var out = [];
    n = Math.min(n, list.length);
    for (var i = 0; i < n; i++) out.push(list[(week * n + i) % list.length]);
    return out;
  }
  function stillActive(until) { return !until || Date.now() < new Date(until + 'T23:59:59-06:00').getTime(); }

  // Cap America: 4 per week; knits keep 2 slots through their end date, holiday styles join the pool through theirs
  function capaPicks(capa) {
    if (!capa) return [];
    var week = weekIndex(capa.startWeek), g = capa.groups, out = [];
    var knits = capa.items.filter(function (c) { return c.group === 'knits'; });
    var knitSlots = stillActive(g.knits.until) ? Math.min(g.knits.slots || 2, knits.length) : 0;
    var pool = capa.items.filter(function (c) { return c.group === 'caps' || (c.group === 'holiday' && stillActive(g.holiday.until)); });
    out = out.concat(rotate(knits, knitSlots, week), rotate(pool, capa.perWeek - knitSlots, week));
    return out.map(function (c) { return { supplier: 'Cap America', name: c.name, item: c.item, desc: c.desc, img: BASE + c.img, url: c.url, tag: c.group === 'knits' ? 'Knit' : (c.group === 'holiday' ? 'Holiday' : '') }; });
  }

  // PEI: alternate brands so each week's fill-ins mix Callaway, Original Penguin and PGA TOUR
  function peiPicks(pei, n) {
    if (!pei || n <= 0) return [];
    var by = {}, order = [];
    pei.items.forEach(function (p) { if (!by[p.brand]) { by[p.brand] = []; order.push(p.brand); } by[p.brand].push(p); });
    var mixed = [], i = 0, left = pei.items.length;
    while (left > 0) { order.forEach(function (b) { if (by[b][i]) { mixed.push(by[b][i]); left--; } }); i++; }
    return rotate(mixed, n, weekIndex(pei.startWeek)).map(function (p) {
      return { supplier: 'PEI · ' + p.brand, name: p.name, item: p.styles, desc: p.desc + ' MSRP $' + p.msrp + '.', img: BASE + p.img, url: pei.url };
    });
  }

  function umaAsProducts(uma) {
    if (!uma) return [];
    var picks = umaPicks(uma);
    return picks.plastic.concat(picks.metal).map(function (p) { return { supplier: 'uma', name: p.name, item: p.item, img: BASE + p.img, url: p.url }; });
  }

  // Front page: one pick from each partner, in a fixed order
  function teaserPicks(ctx) {
    var out = [], data = ctx.data;
    ['Innovation Line', 'Twintech', 'Rupt'].forEach(function (s) {
      var list = data.products.filter(function (p) { return p.supplier === s; });
      if (list.length) out.push(list[weekIndex('2026-11-17') % list.length]);
    });
    var c = capaPicks(ctx.capa); if (c.length) out.push(c[0]);
    var p = peiPicks(ctx.pei, 1); if (p.length) out.push(p[0]);
    var u = umaAsProducts(ctx.uma); if (u.length) out.push(u[weekIndex('2026-11-17') % u.length]);
    if (out.length < 6) data.products.forEach(function (x) { if (out.length < 6 && out.indexOf(x) < 0) out.push(x); });
    return out.slice(0, 6);
  }

  function renderTeaser(box, ctx) {
    var data = ctx.data;
    var allUrl = box.getAttribute('data-all') || '#';
    var cards = teaserPicks(ctx).map(function (p) {
      return '<a class="t-card" href="' + esc(p.url) + '" target="_blank" rel="noopener"><div class="img">' + imgTag(p) +
        '</div><div class="meta"><div class="sup">' + esc(p.supplier) + '</div><div class="name">' + esc(p.name) + '</div></div></a>';
    }).join('');
    box.innerHTML = '<div class="sts">' + specialsBar(box, ctx.sp) + '<section class="teaser"><div class="wrap center">' +
      '<p class="eyebrow">Top partners, top solutions</p><h2>Solutions that Sell</h2>' +
      '<p class="lede">Fresh ideas from the supplier lines I represent, with one pick from each partner. Updated every Tuesday.</p>' +
      '<div class="focus-tag">' + weekOf(data) + '</div>' +
      '<div class="teaser-grid">' + cards + '</div>' +
      '<a class="btn" href="' + esc(allUrl) + '" target="_top">See this week\'s solutions</a>' +
      '</div></section></div>';
  }

  // ---------- Specials ----------
  // A special with an "ends" date disappears automatically after that day (Central time).
  function activeSpecials(sp) {
    if (!sp || !sp.specials) return [];
    var now = Date.now();
    return sp.specials.filter(function (s) {
      if (!s.ends) return true;
      return now < new Date(s.ends + 'T23:59:59-06:00').getTime();
    });
  }
  function endsLabel(s) {
    if (!s.ends) return 'While supplies last';
    var d = new Date(s.ends + 'T12:00:00');
    return 'Ends ' + d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  function specialsBar(box, sp) {
    var list = activeSpecials(sp);
    if (!list.length) return '';
    var url = box.getAttribute('data-specials') || 'https://www.5ymarketing.com/specials';
    var text = list.map(function (s) { return s.title + ' (' + s.headline + ')'; }).join(' &middot; ');
    return '<a class="sp-bar" href="' + esc(url) + '" target="_top"><b>Current Specials</b>' + text + '<span class="go">See all specials &rarr;</span></a>';
  }
  function renderSpecials(box, data, sp) {
    var list = activeSpecials(sp);
    var html = '<div class="sts"><header class="full-head"><div class="wrap center"><p class="eyebrow">Limited-time offers</p><h1>Specials</h1>' +
      '<p class="lede">Current closeouts and promotions from my supplier partners. Offers drop off this page automatically when they end.</p></div></header><div class="wrap sp-list">';
    if (!list.length) html += '<p class="sp-none">No specials are running right now. Check back soon, or ask me about current deals.</p>';
    list.forEach(function (s) {
      var items = (s.items || []).map(function (p) {
        var q = { name: p.name, item: p.styles, supplier: s.supplier + ' ' + s.title };
        return '<article class="card"><div class="img"><img loading="lazy" alt="' + esc(p.name) + '" src="' + esc(BASE + p.img) + '"></div>' +
          '<div class="body"><span class="sup">' + esc(s.title) + '</span><h3>' + esc(p.name) + '</h3><div class="item">' + esc(p.styles) + '</div>' +
          '<div class="price"><span class="now">$' + esc(p.price) + ' (a)</span><span class="was">MSRP $' + esc(p.msrp) + '</span></div>' +
          '<p>' + esc(p.desc) + '</p><div class="actions"><a class="primary" href="' + mailto(data, q) + '" target="_top">Ask Chris</a></div></div></article>';
      }).join('');
      var q = { name: s.title, item: s.promo || '', supplier: s.supplier };
      html += '<section class="sp" id="' + esc(s.id) + '"><div class="sp-head"><div><span class="sup">' + esc(s.supplier) + '</span><h2>' + esc(s.title) + '</h2><p>' + esc(s.summary) + '</p>' +
        (s.promo ? '<div class="sp-promo">Promo code: ' + esc(s.promo) + '</div>' : '') + '</div>' +
        '<div class="sp-badge"><div class="sp-off">' + esc(s.headline) + '</div><div class="sp-ends">' + esc(endsLabel(s)) + '</div></div></div>' +
        '<div class="sp-body">' + (items ? '<div class="grid">' + items + '</div>' : '') +
        (s.terms && s.terms.length ? '<ul class="sp-terms">' + s.terms.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') +
        '<div class="sp-links"><a class="primary" href="' + mailto(data, q) + '" target="_top">Ask Chris about this offer</a>' +
        (s.flyer ? '<a href="' + esc(BASE + s.flyer) + '" target="_blank" rel="noopener">View the flyer (PDF)</a>' : '') + '</div></div></section>';
    });
    html += '</div><section class="contact"><div class="wrap"><p>Questions, samples or pricing on anything here?</p>' +
      '<p class="small">Chris Yoder &nbsp;|&nbsp; <a href="mailto:' + esc(data.contactEmail) + '">' + esc(data.contactEmail) + '</a> &nbsp;|&nbsp; 262.442.8223</p></div></section></div>';
    box.innerHTML = html;
  }

  // uma rotation: a new set of 2 Plastic + 2 Metal pens every Monday, cycling through the catalog
  function umaPicks(uma) {
    var week = weekIndex(uma.startWeek);
    return { plastic: rotate(uma.plastic, uma.perWeek, week), metal: rotate(uma.metal, uma.perWeek, week) };
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

  function productCard(data, p) {
    return '<article class="card"><div class="img">' + imgTag(p) + '</div><div class="body"><span class="sup">' + esc(p.supplier) + '</span>' +
      (p.tag ? '<span class="tag">' + esc(p.tag) + '</span>' : '') +
      '<h3>' + esc(p.name) + '</h3>' + (p.item ? '<div class="item">' + (/[ \/]/.test(p.item) ? '' : 'Item #') + esc(p.item) + '</div>' : '') +
      '<p>' + esc(p.desc) + '</p><div class="actions"><a class="primary" href="' + mailto(data, p) + '" target="_top">Ask Chris</a>' +
      '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">Details</a></div></div></article>';
  }

  function renderCapa(data, capa) {
    var picks = capaPicks(capa);
    if (!picks.length) return '';
    return '<section class="uma"><div class="wrap"><div class="center"><p class="eyebrow">Headwear</p><h2>Cap America Picks</h2>' +
      '<p class="lede">Four caps from Cap America each week, including knits for the cold months.</p>' +
      '<a class="capa-logo" href="' + esc(capa.salesFlyers) + '" target="_blank" rel="noopener" title="Cap America sales flyers"><img src="' + esc(BASE + capa.logo) + '" alt="Cap America"></a><br>' +
      '<a class="capa-flyers" href="' + esc(capa.salesFlyers) + '" target="_blank" rel="noopener">See Cap America sales flyers &rarr;</a></div>' +
      '<div class="capa-grid">' + picks.map(function (p) { return productCard(data, p); }).join('') + '</div></div></section>';
  }

  // ---------- Videos ----------
  function videoPicks(v) {
    if (!v) return [];
    var week = weekIndex(v.startWeek);
    var groups = v.suppliers.filter(function (s) { return s.videos && s.videos.length; });
    if (!groups.length) return [];
    var perSup = Math.ceil(v.perWeek / groups.length) + 1;
    var lists = groups.map(function (g) {
      return rotate(g.videos, Math.min(perSup, g.videos.length), week).map(function (x) {
        var t = x.thumb ? (/^https?:/.test(x.thumb) ? x.thumb : BASE + x.thumb) : '';
        return { supplier: g.name, id: x.id, provider: x.provider || 'youtube', item: x.item, name: x.title, thumb: t, note: g.note || '' };
      });
    });
    // round-robin across suppliers, starting with a different supplier each week
    var out = [], i = 0, start = week % lists.length;
    while (out.length < v.perWeek && i < perSup) {
      for (var k = 0; k < lists.length && out.length < v.perWeek; k++) {
        var l = lists[(start + k) % lists.length];
        if (l[i]) out.push(l[i]);
      }
      i++;
    }
    return out;
  }
  function ytThumb(id) { return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg'; }
  function posterOf(p) { return p.provider === 'vimeo' ? p.thumb : ytThumb(p.id); }
  function playerSrc(p) {
    return p.provider === 'vimeo' ? 'https://player.vimeo.com/video/' + encodeURIComponent(p.id) + '?autoplay=1&title=0&byline=0&portrait=0'
      : 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(p.id) + '?autoplay=1&rel=0';
  }

  function renderVideos(box, ctx) {
    var data = ctx.data, v = ctx.videos, picks = videoPicks(v);
    var more = (v ? v.suppliers : []).map(function (s) { return '<a href="' + esc(s.more) + '" target="_blank" rel="noopener">' + esc(s.moreLabel) + ' &rarr;</a>'; }).join(' ');
    box.innerHTML = '<div class="sts">' + specialsBar(box, ctx.sp) +
      '<header class="full-head"><div class="wrap center"><p class="eyebrow">See it in action</p><h1>Watch &amp; Sell</h1>' +
      '<p class="lede">Product videos from my supplier partners, with new picks every Tuesday. Share them with your clients to help close the sale.</p>' +
      '<p class="updated">' + weekOf(data) + '</p></div></header>' +
      '<div class="wrap">' + (picks.length ?
        '<div class="vid-main"><div class="vid-frame"></div><div class="vid-cap"><div><span class="sup"></span><h2></h2><div class="note"></div></div>' +
        '<div class="actions"><a class="primary" href="#" target="_top">Ask Chris</a></div></div></div>' +
        '<div class="vid-grid"></div>' : '<p class="sp-none">New videos are on the way.</p>') +
      '<div class="vid-more">More videos: ' + more + '</div></div>' +
      '<section class="contact"><div class="wrap"><p>Questions, samples or pricing on anything here?</p>' +
      '<p class="small">Chris Yoder &nbsp;|&nbsp; <a href="mailto:' + esc(data.contactEmail) + '">' + esc(data.contactEmail) + '</a> &nbsp;|&nbsp; 262.442.8223</p></div></section></div>';
    if (!picks.length) return;
    var frame = box.querySelector('.vid-frame'), grid = box.querySelector('.vid-grid');
    function poster(p) {
      return '<img class="vid-poster' + (p.provider === 'vimeo' ? ' fit' : '') + '" alt="" src="' + esc(posterOf(p)) + '"><button class="vid-play" type="button" aria-label="Play video"></button>';
    }
    function show(idx, autoplay) {
      var p = picks[idx];
      box.querySelector('.vid-cap .sup').textContent = p.supplier + (p.item ? ' · ' + p.item : '');
      box.querySelector('.vid-cap h2').textContent = p.name;
      box.querySelector('.vid-cap .note').textContent = p.note;
      box.querySelector('.vid-cap a.primary').href = mailto(data, { name: p.name, item: p.item, supplier: p.supplier });
      grid.querySelectorAll('.vcard').forEach(function (c, k) { c.classList.toggle('on', k === idx); });
      if (autoplay) {
        frame.innerHTML = '<iframe src="' + esc(playerSrc(p)) + '" title="' + esc(p.name) +
          '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
      } else {
        frame.innerHTML = poster(p);
        frame.querySelector('.vid-play').onclick = function () { show(idx, true); };
      }
    }
    grid.innerHTML = picks.map(function (p, k) {
      var img = p.thumb ? '<img class="fit" loading="lazy" alt="" src="' + esc(p.thumb) + '"' + (p.provider === 'vimeo' ? '' : ' onerror="this.src=\'' + ytThumb(p.id) + '\';this.className=\'\'"') + '>' : '<img loading="lazy" alt="" src="' + esc(ytThumb(p.id)) + '">';
      return '<button type="button" class="vcard" data-k="' + k + '"><div class="thumb">' + img + '</div><div class="meta"><span class="sup">' + esc(p.supplier) + '</span><h3>' + esc(p.name) + '</h3></div></button>';
    }).join('');
    grid.querySelectorAll('.vcard').forEach(function (c) {
      c.onclick = function () { show(+c.getAttribute('data-k'), true); frame.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
    });
    show(0, false);
  }

  function renderFull(box, ctx) {
    var data = ctx.data, uma = ctx.uma;
    // Main grid: weekly partner picks, topped up with PEI so rows come out even (at least one PEI pick)
    var base = data.products.slice();
    var fill = Math.max(1, (4 - ((base.length + 1) % 4)) % 4 + 1);
    var products = base.concat(peiPicks(ctx.pei, fill));
    var sups = [];
    products.forEach(function (p) { if (sups.indexOf(p.supplier) < 0) sups.push(p.supplier); });
    box.innerHTML = '<div class="sts">' + specialsBar(box, ctx.sp) +
      '<header class="full-head"><div class="wrap center"><p class="eyebrow">Top partners, top solutions</p><h1>Solutions that Sell</h1>' +
      '<p class="lede">Fresh picks from my supplier partners, updated every Tuesday, with ideas that work for you and your clients.</p></div></header>' +
      '<div class="wrap"><p class="updated center">' + weekOf(data) + '</p><div class="filters"></div><p class="count"></p><div class="grid"></div></div>' +
      renderCapa(data, ctx.capa) +
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
      var list = products.filter(function (p) { return current === 'All' || p.supplier === current; });
      count.textContent = list.length + ' pick' + (list.length === 1 ? '' : 's') + ' this week';
      grid.innerHTML = list.map(function (p) { return productCard(data, p); }).join('');
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
    function getJSON(name) {
      return fetch(BASE + name + '?v=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .catch(function () { return null; });
    }
    var reqs = ['uma.json', 'specials.json', 'capamerica.json', 'pei.json', 'videos.json'].map(getJSON);
    fetch(BASE + 'feed.json?v=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        return Promise.all(reqs).then(function (res) {
          var ctx = { data: data, uma: res[0], sp: res[1], capa: res[2], pei: res[3], videos: res[4] };
          boxes.forEach(function (box) {
            var v = box.getAttribute('data-view');
            if (v === 'full') renderFull(box, ctx);
            else if (v === 'specials') renderSpecials(box, data, ctx.sp);
            else if (v === 'videos') renderVideos(box, ctx);
            else renderTeaser(box, ctx);
          });
        });
      })
      .catch(function () {
        boxes.forEach(function (box) { box.innerHTML = '<p style="text-align:center;font-family:sans-serif;color:#888">Solutions that Sell is loading. Please refresh in a moment.</p>'; });
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
