(function(){
/* Grade 7 Maths Chapter 1 — Large Numbers Around Us
   Plugin: simulations (k7m1_*), the Chintamani paddy-field seed-bank scene, and Gilli the palm squirrel guide. */

/* ---------- private helpers ---------- */
const kh = (hl, p) => ` data-part="${p}"${hl === p ? ' class="hl"' : ""}`;
const kn = x => { const v = +x; return isFinite(v) ? v : 0; };
const kr = x => Math.round(kn(x));
function kIN(x) { const n = kr(x), neg = n < 0; let s = String(Math.abs(n)); if (s.length > 3) s = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + s.slice(-3); return (neg ? "−" : "") + s; }
function kUS(x) { const n = kr(x), neg = n < 0; return (neg ? "−" : "") + String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
const K1 = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const K10 = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const k2 = n => n < 20 ? K1[n] : K10[Math.floor(n / 10)] + (n % 10 ? " " + K1[n % 10] : "");
const k3 = n => { const h = Math.floor(n / 100), r = n % 100; return [h ? K1[h] + " hundred" : "", r ? k2(r) : ""].filter(Boolean).join(" "); };
const kCap = s => s.charAt(0).toUpperCase() + s.slice(1);
function kNameIN(x) {
  let n = Math.abs(kr(x)); if (!n) return "Zero"; const out = [];
  const ar = Math.floor(n / 1e9); n -= ar * 1e9; const cr = Math.floor(n / 1e7); n -= cr * 1e7; const l = Math.floor(n / 1e5); n -= l * 1e5; const th = Math.floor(n / 1e3), r = n - th * 1e3;
  if (ar) out.push(k3(ar) + " arab"); if (cr) out.push(k2(cr) + " crore"); if (l) out.push(k2(l) + " lakh"); if (th) out.push(k2(th) + " thousand"); if (r) out.push(k3(r));
  return kCap(out.join(" "));
}
function kNameUS(x) {
  let n = Math.abs(kr(x)); if (!n) return "Zero"; const out = [];
  [[1e9, "billion"], [1e6, "million"], [1e3, "thousand"]].forEach(([u, w]) => { const q = Math.floor(n / u); if (q) { out.push(k3(q) + " " + w); n -= q * u; } });
  if (n) out.push(k3(n)); return kCap(out.join(" "));
}
const kPlaceName = { 3: "thousand", 4: "ten thousand", 5: "lakh", 6: "ten lakh", 7: "crore", 8: "ten crore" };
function kNice(mx, n) { const c = [1, 2, 2.5, 5]; let p = Math.pow(10, Math.floor(Math.log10(Math.max(mx, 1) / n))); for (let k = 0; k < 8; k++) { for (const m of c) { if (mx / (m * p) <= n) return m * p; } p *= 10; } return p; }
const kRound = (n, u) => { const U = Math.pow(10, u); return Math.floor(n / U + 0.5) * U; };

/* =========================================================
   2. k7m1_tower — compare heights with Somu (1 m) and Somu's building (floors × 4 m)
   params: floors, fl (metres a floor), items ("statue,falls,eagle,everest,plane"), cmp (item compared)
   readouts: bld, diff, times    parts: "bld", "item"
   ========================================================= */
const K_ITEMS = { statue: { h: 180, l: "Statue of Unity" }, falls: { h: 450, l: "Kunchikal falls" }, eagle: { h: 6000, l: "Bald eagle (up to)" }, everest: { h: 8850, l: "Mount Everest" }, plane: { h: 12800, l: "Aeroplane (up to)" }, eagle2: { h: 4500, l: "Bald eagle (low)" }, plane2: { h: 10000, l: "Aeroplane (low)" } };
SIM_DEF.k7m1_tower = {
  def: { floors: 10, fl: 4, items: "statue,falls", cmp: "" },
  rng: { floors: () => [1, 150, 1] },
  lab: { floors: "Floors in Somu's building" },
  reads: { bld: "Building height", diff: "How much taller", times: "How many times" },
  draw(D, P, sh, hl) {
    const fl = kn(P.fl) || 4, fD = Math.max(1, kn(D.floors)), fP = Math.max(1, kr(P.floors)), hb = fD * fl, hbP = fP * fl;
    const its = String(P.items || "").split(",").map(t => t.trim()).filter(t => K_ITEMS[t]);
    const tops = its.map(k => K_ITEMS[k].h).concat([hb, hbP]);
    const step = kNice(Math.max(...tops) * 1.08, 5), M = Math.ceil(Math.max(...tops) * 1.08 / step) * step;
    const gy = 196, top = 30, Y = v => gy - v / M * (gy - top), x0 = 64;
    let s = `<svg viewBox="0 0 420 236">`;
    for (let v = 0; v <= M + 1e-9; v += step) { const y = Y(v); s += `<line x1="${x0 - 6}" y1="${y.toFixed(1)}" x2="410" y2="${y.toFixed(1)}" stroke="var(--line)" stroke-dasharray="3 5"/>` + T(x0 - 9, y + 4, kIN(v), { size: 10, fill: "var(--muted)", a: "end" }); }
    s += T(14, 18, "metres", { size: 11, fill: "var(--muted)", a: "start" });
    s += `<line x1="${x0 - 6}" y1="${gy}" x2="412" y2="${gy}" stroke="var(--muted)" stroke-width="2"/>`;
    const n = its.length + 1, sw = (410 - x0) / n;
    // Somu's building
    const bx = x0 + sw * .5, bw = Math.min(44, sw * .55), bt = Y(hb);
    s += `<g${kh(hl, "bld")}><rect x="${(bx - bw / 2).toFixed(1)}" y="${bt.toFixed(1)}" width="${bw.toFixed(1)}" height="${(gy - bt).toFixed(1)}" fill="#b5523b" stroke="#ffd6a0" stroke-width="1"/>`;
    const fpx = (gy - bt) / fD;
    if (fpx >= 3) for (let i = 0; i < Math.floor(fD); i++) { const yy = gy - (i + 1) * fpx; s += `<line x1="${(bx - bw / 2).toFixed(1)}" y1="${yy.toFixed(1)}" x2="${(bx + bw / 2).toFixed(1)}" y2="${yy.toFixed(1)}" stroke="#ffd6a0" stroke-opacity=".6"/>`; if (fpx >= 8) s += `<rect x="${(bx - bw / 4).toFixed(1)}" y="${(yy + fpx * .25).toFixed(1)}" width="${(bw / 2).toFixed(1)}" height="${(fpx * .45).toFixed(1)}" fill="#ffe7a8" opacity=".75"/>`; }
    s += `</g>`;
    // Somu: 1 metre (drawn at least 8 px so we can see him)
    const sh1 = Math.max(8, (gy - Y(1))); s += `<g><circle cx="${(bx + bw / 2 + 8).toFixed(1)}" cy="${(gy - sh1 + 2).toFixed(1)}" r="2.4" fill="var(--rani)"/><line x1="${(bx + bw / 2 + 8).toFixed(1)}" y1="${(gy - sh1 + 4).toFixed(1)}" x2="${(bx + bw / 2 + 8).toFixed(1)}" y2="${gy}" stroke="var(--rani)" stroke-width="2"/></g>`;
    s += T(bx, gy + 16, `Building`, { size: 11 }) + T(bx, gy + 30, `${fP} floors`, { size: 10, fill: "var(--muted)" });
    s += T(bx, bt - 6, sh.has("bld") ? `${fmtN(hbP)} m` : "? m", { size: 12, fill: "var(--mari)" });
    its.forEach((k, i) => {
      const it = K_ITEMS[k], cx = x0 + sw * (i + 1.5), t = Y(it.h), w = Math.min(56, sw * .6), hi = hl === "item" && (P.cmp ? P.cmp === k : true);
      const cl = hi ? ' class="hl"' : "";
      if (k === "statue") s += `<g data-part="item"${cl} fill="#a7794a"><rect x="${cx - w * .32}" y="${gy - (gy - t) * .12}" width="${w * .64}" height="${(gy - t) * .12}"/><path d="M${cx - w * .18} ${gy - (gy - t) * .12} L${cx - w * .22} ${t + (gy - t) * .2} Q${cx} ${t + (gy - t) * .12} ${cx + w * .22} ${t + (gy - t) * .2} L${cx + w * .18} ${gy - (gy - t) * .12}Z"/><circle cx="${cx}" cy="${t + (gy - t) * .09}" r="${Math.max(2, (gy - t) * .08)}"/><path d="M${cx - w * .22} ${t + (gy - t) * .2} L${cx - w * .32} ${t + (gy - t) * .55}" stroke="#a7794a" stroke-width="${Math.max(2, w * .08)}"/></g>`;
      else if (k === "falls") s += `<g data-part="item"${cl}><path d="M${cx - w * .7} ${gy} L${cx - w * .6} ${t} L${cx - w * .05} ${t} L${cx - w * .05} ${gy}Z" fill="#4b5d4f"/><rect x="${cx - w * .05}" y="${t}" width="${w * .5}" height="${gy - t}" fill="var(--sky)" opacity=".75"/><path d="M${cx + w * .05} ${t} v${gy - t} M${cx + w * .2} ${t} v${gy - t} M${cx + w * .35} ${t} v${gy - t}" stroke="#e8f6ff" stroke-width="1.5" stroke-dasharray="6 5" opacity=".8"/></g>`;
      else if (k === "everest") s += `<path data-part="item"${cl} d="M${cx - w * .8} ${gy} L${cx} ${t} L${cx + w * .8} ${gy}Z" fill="#6c7a91"/><path d="M${cx - w * .18} ${t + (gy - t) * .22} L${cx} ${t} L${cx + w * .18} ${t + (gy - t) * .22}Z" fill="#fff"/>`;
      else { s += `<line x1="${cx}" y1="${t}" x2="${cx}" y2="${gy}" stroke="var(--muted)" stroke-dasharray="2 4"/>`; s += /plane/.test(k) ? `<path data-part="item"${cl} d="M${cx - 14} ${t} L${cx + 14} ${t} M${cx + 2} ${t} l-8 -8 M${cx + 2} ${t} l-8 8 M${cx - 12} ${t} l-3 -5" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>` : `<path data-part="item"${cl} d="M${cx - 16} ${t - 4} Q${cx - 6} ${t - 10} ${cx} ${t} Q${cx + 6} ${t - 10} ${cx + 16} ${t - 4}" stroke="var(--ink)" stroke-width="3" fill="none" stroke-linecap="round"/>`; }
      s += T(cx, t - 8, `${kIN(it.h)} m`, { size: 12, fill: "var(--mari)" });
      const words = it.l.split(" (");
      s += T(cx, gy + 16, words[0], { size: Math.min(11, sw / 7.5) }) + (words[1] ? T(cx, gy + 30, "(" + words[1], { size: 10, fill: "var(--muted)" }) : "");
    });
    s += "</svg>";
    const cmpK = P.cmp && K_ITEMS[P.cmp] ? P.cmp : its[0];
    const C = cmpK ? K_ITEMS[cmpK] : null;
    return { svg: s, reads: {
      bld: `${fP} floors × ${fl} m = ${fmtN(hbP)} m`,
      diff: C ? `${C.l}: ${kIN(C.h)} − ${fmtN(hbP)} = ${C.h >= hbP ? fmtN(C.h - hbP) + " m taller" : fmtN(hbP - C.h) + " m shorter"}` : "—",
      times: C ? `${kIN(C.h)} ÷ ${fmtN(hbP)} ≈ ${fmtN(C.h / hbP, 2)} times` : "—" } };
  }
};

/* =========================================================
   3. k7m1_calc — Land of Tens button calculator
   params: c0..c6 (presses of +1 … +10,00,000), on (buttons present, e.g. "1,3"), name, target, mx (slider max)
   readouts: total, expr, clicks    parts: "display", "btn"
   ========================================================= */
const KBTN = [1, 10, 100, 1000, 10000, 100000, 1000000];
const KBL = ["+1", "+10", "+100", "+1,000", "+10,000", "+1,00,000", "+10,00,000"];
const kOn = P => String(P.on == null ? "0,1,2,3,4,5,6" : P.on).split(",").map(t => +t).filter(k => k >= 0 && k <= 6).sort((a, b) => b - a);
const kCalcMax = (P, k) => P.mx ? kn(P.mx) : (P.target ? Math.min(1200, Math.max(20, Math.ceil(kn(P.target) / KBTN[k]) + 10)) : 100);
const kCalcRng = {}; for (let k = 0; k <= 6; k++) kCalcRng["c" + k] = (P, I) => [0, kCalcMax(I || P, k), 1];
SIM_DEF.k7m1_calc = {
  def: { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0, c6: 0, on: "0,1,2,3,4,5,6", name: "Creative Chitti", target: 0, mx: 0 },
  rng: kCalcRng,
  lab: { c0: "Presses of +1", c1: "Presses of +10", c2: "Presses of +100", c3: "Presses of +1000", c4: "Presses of +10,000", c5: "Presses of +1,00,000", c6: "Presses of +10,00,000" },
  reads: { total: "Display", expr: "Expression", clicks: "Button clicks" },
  draw(D, P, sh, hl) {
    const on = kOn(P);
    let tD = 0, tP = 0, cl = 0; const ex = [];
    on.forEach(k => { const cD = Math.max(0, kn(D["c" + k])), cP = Math.max(0, kr(P["c" + k])); tD += Math.round(cD) * KBTN[k]; tP += cP * KBTN[k]; cl += cP; if (cP) ex.push(`(${cP} × ${KBTN[k]})`); });
    let s = `<svg viewBox="0 0 420 240">`;
    // calculator body
    s += `<rect x="12" y="10" width="176" height="222" rx="18" fill="#2b3f57" stroke="var(--sky)" stroke-width="2"/>`;
    s += T(100, 30, P.name || "Calculator", { size: 13, fill: "var(--manila)" });
    s += `<rect x="24" y="40" width="152" height="40" rx="8" fill="#c9e7b8"${kh(hl, "display")}/>`;
    const disp = kIN(tD); s += `<text x="168" y="69" fill="#1c3020" font-size="${disp.length > 11 ? 15 : 20}" font-family="Courier Prime, monospace" font-weight="700" text-anchor="end">${disp}</text>`;
    const nb = on.length, bh = Math.min(30, 138 / Math.max(nb, 1) - 4);
    on.forEach((k, i) => {
      const y = 90 + i * (bh + 4), pressed = kr(P["c" + k]) > 0;
      s += `<rect x="30" y="${y.toFixed(1)}" width="140" height="${bh.toFixed(1)}" rx="${(bh / 2).toFixed(1)}" fill="${pressed ? "var(--mari)" : "#41597a"}" data-part="btn"${hl === "btn" ? ' class="hl"' : ""}/>` + T(100, y + bh / 2 + 5, KBL[k], { size: Math.min(14, bh * .55), fill: pressed ? "#1d160a" : "var(--ink)" });
    });
    // tally rows
    s += T(206, 30, "Presses", { size: 12, fill: "var(--muted)", a: "start" }) + T(408, 30, "Adds", { size: 12, fill: "var(--muted)", a: "end" });
    const rh = Math.min(24, 150 / Math.max(nb, 1));
    on.forEach((k, i) => { const y = 52 + i * rh, c = Math.max(0, kr(P["c" + k])); s += T(206, y, `${KBL[k]} × ${c}`, { size: 13, a: "start", fill: c ? "var(--ink)" : "var(--muted)" }) + T(408, y, kIN(c * KBTN[k]), { size: 13, a: "end", fill: c ? "var(--mari)" : "var(--muted)" }); });
    const yb = 52 + nb * rh;
    s += `<line x1="206" y1="${yb - 10}" x2="408" y2="${yb - 10}" stroke="var(--line)"/>`;
    s += T(206, yb + 8, "Total", { size: 13, a: "start" }) + T(408, yb + 8, kIN(tP), { size: 15, a: "end", fill: "var(--teal)" });
    s += T(206, yb + 30, `Clicks: ${sh.has("clicks") ? cl : "?"}`, { size: 14, a: "start", fill: "var(--sky)" });
    if (P.target) { const ok = tP === kr(P.target); s += T(408, yb + 30, `Target ${kIN(P.target)} ${ok ? "✓" : "✗"}`, { size: 13, a: "end", fill: ok ? "var(--teal)" : "var(--rani)" }); }
    s += "</svg>";
    return { svg: s, reads: { total: kIN(tP), expr: (ex.join(" + ") || "0") + ` = ${kIN(tP)}`, clicks: `${on.filter(k => kr(P["c" + k]) > 0).map(k => kr(P["c" + k])).join(" + ") || 0} = ${cl}` } };
  }
};

/* =========================================================
   4. k7m1_pv — place-value chart: Indian (3-2-2-2) and American (3-3-3) commas and names
   params: n (number) or z ≥ 0 (1 followed by z zeros), sys ("both" | "in" | "us")
   readouts: ind, us, zeros    parts: "in", "us"
   ========================================================= */
const KIN_AB = ["O", "T", "H", "Th", "TTh", "L", "TL", "Cr", "TCr", "A", "TA"], KUS_AB = ["O", "T", "H", "Th", "TTh", "HTh", "M", "TM", "HM", "B", "TB"];
const kGrpIN = e => e < 3 ? 0 : e < 5 ? 1 : e < 7 ? 2 : e < 9 ? 3 : 4, kGrpUS = e => Math.floor(e / 3);
const KGC = ["var(--mari)", "var(--teal)", "var(--sky)", "var(--rani)", "var(--manila)"];
const kVal = P => kn(P.z) >= 0 ? Math.pow(10, kr(P.z)) : Math.abs(kr(P.n));
SIM_DEF.k7m1_pv = {
  def: { n: 100000, z: -1, sys: "both", hide: false },
  rng: { z: () => [0, 10, 1] },
  lab: { z: "Zeros after the 1" },
  reads: { ind: "Indian system", us: "American system", zeros: "Zeros" },
  draw(D, P, sh, hl) {
    const v = kVal(P), ds = String(v), L = ds.length, N = Math.min(11, Math.max(6, L)), bw = Math.min(36, 384 / N), x0 = 210 - N * bw / 2;
    const rows = P.sys === "in" ? ["in"] : P.sys === "us" ? ["us"] : ["in", "us"];
    const H = rows.length * 106 + 6;
    let s = `<svg viewBox="0 0 420 ${H}">`;
    rows.forEach((r, ri) => {
      const y0 = 6 + ri * 106, IN = r === "in", ab = IN ? KIN_AB : KUS_AB, gp = IN ? kGrpIN : kGrpUS, hid = P.hide && !sh.has(IN ? "ind" : "us");
      s += `<g${kh(hl, r)}>`;
      s += T(x0, y0 + 12, IN ? "Indian system" : "American (International) system", { size: 12, a: "start", fill: "var(--muted)" });
      for (let i = 0; i < N; i++) {
        const e = N - 1 - i, x = x0 + i * bw, has = e < L && !hid, dg = has ? ds[L - 1 - e] : "", c = KGC[gp(e)];
        s += T(x + bw / 2, y0 + 30, ab[e] || "", { size: Math.min(11, bw * .34), fill: c });
        s += `<rect x="${(x + 1.5).toFixed(1)}" y="${y0 + 36}" width="${(bw - 3).toFixed(1)}" height="34" rx="6" fill="${has ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.02)"}" stroke="${c}" stroke-opacity="${has ? 1 : .35}" stroke-width="${has ? 2 : 1}"/>`;
        if (has) s += T(x + bw / 2, y0 + 60, dg, { size: Math.min(20, bw * .6) });
        if (e > 0 && gp(e) !== gp(e - 1) && e < L && !hid) s += T(x + bw + .5, y0 + 76, ",", { size: 20, fill: "var(--rani)", w: 900 });
      }
      s += T(210, y0 + 98, hid ? "?" : IN ? kIN(v) : kUS(v), { size: 19, fill: IN ? "var(--mari)" : "var(--sky)" });
      s += `</g>`;
    });
    s += "</svg>";
    const zc = (ds.match(/0/g) || []).length;
    return { svg: s, reads: { ind: `${kIN(v)} → ${kNameIN(v)}`, us: `${kUS(v)} → ${kNameUS(v)}`, zeros: /^10*$/.test(ds) ? `1 followed by ${L - 1} zero${L === 2 ? "" : "s"}` : `${zc} zero${zc === 1 ? "" : "s"} in ${kIN(v)}` } };
  }
};

/* =========================================================
   5. k7m1_line — number line for rounding (mode "round") and estimating (mode "est")
   round: n, u (3 = thousand … 7 = crore)     est: a, b, op ("+" | "−"), marks ("800000,900000"), who ("Roxie,Estu")
   readouts: near, gap, all (round) | exact, cmp (est)    parts: "marker", "near"
   ========================================================= */
SIM_DEF.k7m1_line = {
  def: { mode: "round", n: 67285183, u: 5, a: 463128, b: 419682, op: "+", marks: "", who: "" },
  rng: { u: () => [3, 7, 1] },
  lab: { u: "Round to 10^u (3 = thousand … 7 = crore)" },
  reads: { near: "Nearest", gap: "Distances", all: "Five nearest neighbours", exact: "Exact value", cmp: "Compare" },
  draw(D, P, sh, hl) {
    let s = `<svg viewBox="0 0 420 ${P.mode === "est" ? 200 : 244}">`;
    const x0 = 30, x1 = 390;
    if (P.mode === "est") {
      const a = kr(P.a), b = kr(P.b), ex = P.op === "−" || P.op === "-" ? a - b : a + b;
      const ms = String(P.marks || "").split(",").map(t => kr(t)).filter(t => t > 0), who = String(P.who || "").split(",");
      const all = ms.concat([ex]), lo0 = Math.min(...all), hi0 = Math.max(...all), sp = Math.max(1, hi0 - lo0), st = kNice(sp * 1.3, 4);
      const lo = Math.floor((lo0 - sp * .12) / st) * st, hi = Math.ceil((hi0 + sp * .12) / st) * st, X = v => x0 + (v - lo) / (hi - lo) * (x1 - x0);
      s += T(210, 26, `${kIN(a)} ${P.op === "-" ? "−" : P.op} ${kIN(b)} = ${sh.has("exact") ? kIN(ex) : "?"}`, { size: 18 });
      s += `<line x1="${x0}" y1="110" x2="${x1}" y2="110" stroke="var(--muted)" stroke-width="3"/>`;
      for (let v = lo; v <= hi + 1e-6; v += st / 2) { const x = X(v), big = Math.abs(v / st - Math.round(v / st)) < 1e-9; s += `<line x1="${x.toFixed(1)}" y1="${big ? 102 : 105}" x2="${x.toFixed(1)}" y2="${big ? 118 : 115}" stroke="var(--muted)"/>`; if (big) s += T(x, 136, kIN(v), { size: 10.5, fill: "var(--muted)" }); }
      ms.forEach((m, i) => { const x = X(m), up = i % 2 === 0; s += `<line x1="${x.toFixed(1)}" y1="${up ? 62 : 110}" x2="${x.toFixed(1)}" y2="${up ? 110 : 160}" stroke="${i % 2 ? "var(--sky)" : "var(--rani)"}" stroke-width="2" stroke-dasharray="4 3"/>` + T(clampN(x, 50, 370), up ? 56 : 176, `${who[i] ? who[i].trim() + ": " : ""}${kIN(m)}`, { size: 12, fill: i % 2 ? "var(--sky)" : "var(--rani)" }); });
      const xe = X(kn(D.a) + (P.op === "−" || P.op === "-" ? -kn(D.b) : kn(D.b)));
      if (sh.has("exact")) s += `<g${kh(hl, "marker")}><circle cx="${xe.toFixed(1)}" cy="110" r="8" fill="var(--teal)" stroke="var(--ink)" stroke-width="2"/></g>` + T(clampN(xe, 50, 370), 92, kIN(ex), { size: 13, fill: "var(--teal)" });
      s += "</svg>";
      const cmp = ms.map((m, i) => `${who[i] ? who[i].trim() + " " : ""}${kIN(m)}: ${ex >= m ? "exact is " + kIN(ex - m) + " more" : "exact is " + kIN(m - ex) + " less"}`).join("; ");
      return { svg: s, reads: { exact: kIN(ex), cmp: cmp || "—", near: "—", gap: "—", all: "—" } };
    }
    const n = kr(P.n), u = clampN(kr(P.u), 3, 8), U = Math.pow(10, u), lo = Math.floor(n / U) * U, hi = lo + U, mid = lo + U / 2, near = n - lo < hi - n ? lo : hi;
    const X = v => x0 + (v - lo) / U * (x1 - x0);
    s += T(210, 24, `${kIN(n)} — nearest ${kPlaceName[u]}?`, { size: 16 });
    s += `<line x1="${x0}" y1="84" x2="${x1}" y2="84" stroke="var(--muted)" stroke-width="3"/>`;
    for (let i = 0; i <= 10; i++) { const x = x0 + i * (x1 - x0) / 10; s += `<line x1="${x}" y1="${i % 5 ? 79 : 72}" x2="${x}" y2="${i % 5 ? 89 : 96}" stroke="var(--muted)" stroke-width="${i % 5 ? 1 : 2}"/>`; }
    s += T(x0, 114, kIN(lo), { size: 11.5, fill: near === lo && sh.has("near") ? "var(--teal)" : "var(--ink)" }) + T(x1, 114, kIN(hi), { size: 11.5, fill: near === hi && sh.has("near") ? "var(--teal)" : "var(--ink)" }) + T(210, 114, `halfway ${kIN(mid)}`, { size: 10.5, fill: "var(--muted)" });
    s += `<line x1="210" y1="60" x2="210" y2="100" stroke="var(--muted)" stroke-dasharray="3 3"/>`;
    const xm = clampN(X(n), x0, x1), xn = X(near);
    if (sh.has("near")) s += `<path d="M${xm.toFixed(1)} 66 Q${((xm + xn) / 2).toFixed(1)} 38 ${xn.toFixed(1)} 66" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-dasharray="5 4"${kh(hl, "near")}/><circle cx="${xn.toFixed(1)}" cy="84" r="9" fill="none" stroke="var(--teal)" stroke-width="3"/>`;
    s += `<g${kh(hl, "marker")}><path d="M${xm.toFixed(1)} 84 l-7 -14 h14z" fill="var(--mari)"/><circle cx="${xm.toFixed(1)}" cy="84" r="4.5" fill="var(--mari)"/></g>`;
    if (sh.has("all")) {
      s += `<rect x="40" y="130" width="340" height="108" rx="10" fill="rgba(255,255,255,.04)" stroke="var(--line)"/>`;
      [3, 4, 5, 6, 7].forEach((e, i) => { const y = 150 + i * 19, on = e === u; s += T(56, y, `Nearest ${kPlaceName[e]}`, { size: 12.5, a: "start", fill: on ? "var(--mari)" : "var(--muted)" }) + T(364, y, kIN(kRound(n, e)), { size: 13, a: "end", fill: on ? "var(--mari)" : "var(--ink)" }); });
    }
    s += "</svg>";
    return { svg: s, reads: { near: `Nearest ${kPlaceName[u]}: ${kIN(near)}`, gap: `${kIN(n)} − ${kIN(lo)} = ${kIN(n - lo)}; ${kIN(hi)} − ${kIN(n)} = ${kIN(hi - n)}`, all: [3, 4, 5, 6, 7].map(e => kIN(kRound(n, e))).join(" · "), exact: "—", cmp: "—" } };
  }
};

/* =========================================================
   9. k7m1_trip — travelling a fixed distance every day: can we get there?
   params: rate (km a day), years, target (km), tname, ymax
   readouts: year, total, left    parts: "trav", "goal"
   ========================================================= */
SIM_DEF.k7m1_trip = {
  def: { rate: 100, years: 1, target: 384400, tname: "Moon", ymax: 20 },
  rng: { years: (P, I) => [1, (I || P).ymax || 20, 1], rate: () => [100, 5000, 100] },
  lab: { years: "Years of travel", rate: "Kilometres a day" },
  reads: { year: "In one year", total: "Distance travelled", left: "Result" },
  draw(D, P, sh, hl) {
    const tg = kn(P.target) || 1, rD = kn(D.rate), yD = Math.max(0, kn(D.years)), rP = kr(P.rate), yP = kr(P.years);
    const totD = rD * 365 * yD, totP = rP * 365 * yP, f = clampN(totD / tg, 0, 1), x0 = 50, x1 = 370, sun = /sun/i.test(P.tname || "");
    let s = `<svg viewBox="0 0 420 230">`;
    s += `<circle cx="${x0 - 14}" cy="100" r="20" fill="#2f7dd1"/><path d="M${x0 - 24} 92 q6 -8 12 -2 q4 8 -4 12 q-8 2 -8 -10z M${x0 - 10} 106 q8 -4 10 4 q-4 6 -10 -4z" fill="#3fa46a"/>` + T(x0 - 14, 136, "Earth", { size: 11, fill: "var(--muted)" });
    s += `<g${kh(hl, "goal")}>${sun ? `<circle cx="${x1 + 14}" cy="100" r="26" fill="#ffb52e"/><circle cx="${x1 + 14}" cy="100" r="34" fill="#ffb52e" opacity=".2"/>` : `<circle cx="${x1 + 14}" cy="100" r="16" fill="#e8e2cf"/><circle cx="${x1 + 9}" cy="95" r="3.5" fill="#bdb49a"/><circle cx="${x1 + 19}" cy="106" r="2.5" fill="#bdb49a"/>`}</g>` + T(x1 + 14, 142, P.tname || "Target", { size: 11, fill: "var(--muted)" });
    s += `<line x1="${x0 + 8}" y1="100" x2="${x1 - 10}" y2="100" stroke="var(--line)" stroke-width="3" stroke-dasharray="2 6"/>`;
    s += `<line x1="${x0 + 8}" y1="100" x2="${(x0 + 8 + f * (x1 - x0 - 18)).toFixed(1)}" y2="100" stroke="var(--mari)" stroke-width="4"/>`;
    const per = rP * 365 / tg, nt = Math.min(60, Math.floor(1 / Math.max(per, 1e-9)));
    for (let i = 1; i <= Math.min(nt, yP) && per > 0.012; i++) { const x = x0 + 8 + i * per * (x1 - x0 - 18); s += `<line x1="${x.toFixed(1)}" y1="94" x2="${x.toFixed(1)}" y2="106" stroke="var(--mari)" stroke-width="1.5"/>`; }
    const tx = x0 + 8 + f * (x1 - x0 - 18);
    s += `<g${kh(hl, "trav")}><path d="M${(tx - 12).toFixed(1)} 92 L${(tx + 8).toFixed(1)} 100 L${(tx - 12).toFixed(1)} 108 L${(tx - 7).toFixed(1)} 100Z" fill="var(--rani)"/><circle cx="${(tx + 2).toFixed(1)}" cy="100" r="2" fill="#fff"/></g>`;
    s += T(210, 30, `${kIN(rP)} km a day × 365 × ${yP} year${yP > 1 ? "s" : ""}`, { size: 15 });
    s += T(210, 56, `distance to the ${P.tname || "target"}: ${kIN(tg)} km`, { size: 12.5, fill: "var(--muted)" });
    s += T(210, 172, `travelled: ${sh.has("total") ? kIN(totP) + " km" : "?"}`, { size: 15, fill: "var(--mari)" });
    const ok = totP >= tg;
    s += T(210, 204, sh.has("left") ? (ok ? `Reached the ${P.tname}! (${fmtN(Math.min(totP / tg, 99) * 100, 0)}% of the way)` : `Still ${kIN(tg - totP)} km to go (${fmtN(totP / tg * 100, 1)}%)`) : "Will we get there?", { size: 14, fill: ok ? "var(--teal)" : "var(--ink)" });
    s += "</svg>";
    return { svg: s, reads: { year: `${kIN(rP)} × 365 = ${kIN(rP * 365)} km`, total: `${kIN(rP * 365)} × ${yP} = ${kIN(totP)} km`, left: ok ? `reached: ${kIN(totP)} ≥ ${kIN(tg)}` : `${kIN(tg)} − ${kIN(totP)} = ${kIN(tg - totP)} km still to go` } };
  }
};

/* =========================================================
   SCENE — Chintamani at dusk: paddy terraces, the seed-bank hut, palms, fireflies, a lakh-counter board
   ========================================================= */
let k1w = null;
function k1wInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  k1w = { W, H,
    stars: Array.from({ length: Math.round(W * H / 7000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .45), r: rnd(.3, 1.5), p: rnd(0, 6.28) })),
    flies: Array.from({ length: Math.max(14, Math.round(W / 60)) }, () => ({ x: rnd(0, W), y: rnd(H * .55, H), p: rnd(0, 6.28), s: rnd(.2, .6) })),
    hills: Array.from({ length: 12 }, (_, i) => ({ x: i * W / 10 - 40, h: rnd(40, 110) })),
    palms: Array.from({ length: Math.max(3, Math.round(W / 300)) }, (_, i) => ({ x: (i + .5) * W / Math.max(3, Math.round(W / 300)) + rnd(-40, 40), h: rnd(110, 170), lean: rnd(-.15, .15) })),
    birds: Array.from({ length: 5 }, () => ({ x: rnd(0, W), y: rnd(H * .1, H * .3), s: rnd(.3, .7), p: rnd(0, 6.28) })) };
}
SCENES.k7m1_paddy = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!k1w || k1w.W !== W || k1w.H !== H) k1wInit(W, H);
  const S = k1w, hz = H * .56;
  let g = c.createLinearGradient(0, 0, 0, hz); g.addColorStop(0, "#0b1530"); g.addColorStop(.55, "#2a2550"); g.addColorStop(.85, "#7a3f4e"); g.addColorStop(1, "#d98a4a");
  c.fillStyle = g; c.fillRect(0, 0, W, hz);
  S.stars.forEach(s => { c.globalAlpha = .3 + .4 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // crescent moon
  const mx = W * .78, my = H * .14, mr = Math.min(W, H) * .045;
  const mg = c.createRadialGradient(mx, my, mr, mx, my, mr * 3); mg.addColorStop(0, "rgba(255,240,200,.25)"); mg.addColorStop(1, "rgba(255,240,200,0)"); c.fillStyle = mg; c.beginPath(); c.arc(mx, my, mr * 3, 0, 6.28); c.fill();
  c.fillStyle = "#fbefc8"; c.beginPath(); c.arc(mx, my, mr, 0, 6.28); c.fill(); c.fillStyle = "#2a2550"; c.beginPath(); c.arc(mx + mr * .45, my - mr * .2, mr * .9, 0, 6.28); c.fill();
  // birds flying home
  c.strokeStyle = "rgba(20,15,35,.75)"; c.lineWidth = 1.6;
  S.birds.forEach(b => { if (!RM) { b.x += b.s; if (b.x > W + 20) b.x = -20; } const f = Math.sin(t / 220 + b.p) * 4; c.beginPath(); c.moveTo(b.x - 7, b.y - f); c.quadraticCurveTo(b.x - 3, b.y - 3, b.x, b.y); c.quadraticCurveTo(b.x + 3, b.y - 3, b.x + 7, b.y - f); c.stroke(); });
  // Nandi hills on the horizon
  c.fillStyle = "#2b1f3a"; c.beginPath(); c.moveTo(0, hz); S.hills.forEach((h, i) => c.quadraticCurveTo(h.x + W / 20, hz - h.h - 20, h.x + W / 10, hz - (i % 2 ? 30 : 10))); c.lineTo(W, hz); c.fill();
  // paddy terraces: bands of green with swaying rice stalks
  const bands = 6;
  for (let i = 0; i < bands; i++) {
    const y0 = hz + (H - hz) * (i / bands) ** 1.2, y1 = hz + (H - hz) * ((i + 1) / bands) ** 1.2, k = i / bands;
    c.fillStyle = `rgb(${Math.round(18 + 22 * k)},${Math.round(48 + 40 * k)},${Math.round(34 + 12 * k)})`; c.fillRect(0, y0, W, y1 - y0 + 1);
    c.fillStyle = "rgba(120,170,200,.10)"; c.fillRect(0, y0, W, 2);
    c.strokeStyle = `rgba(${150 + 60 * k},${190 + 30 * k},90,${.25 + .25 * k})`; c.lineWidth = 1 + k;
    const gap = 9 + 12 * k, ht = 6 + 16 * k;
    c.beginPath();
    for (let x = (i * 7) % gap; x < W; x += gap) { const sw = RM ? 0 : Math.sin(t / 900 + x * .03 + i) * (2 + 3 * k); c.moveTo(x, y1); c.quadraticCurveTo(x + sw * .5, y1 - ht * .6, x + sw, y1 - ht); }
    c.stroke();
    if (i >= 3) { c.fillStyle = `rgba(232,196,90,${.35 + .2 * k})`; for (let x = (i * 7) % gap; x < W; x += gap * 2) { const sw = RM ? 0 : Math.sin(t / 900 + x * .03 + i) * (2 + 3 * k); c.beginPath(); c.ellipse(x + sw, y1 - ht, 1.6 + k, 3 + 2 * k, .4, 0, 6.28); c.fill(); } }
  }
  // coconut palms
  S.palms.forEach((p, i) => { const bx = p.x, by = hz + 26, tx = bx + p.lean * p.h, ty = by - p.h;
    c.strokeStyle = "#2a1a14"; c.lineWidth = 6; c.beginPath(); c.moveTo(bx, by); c.quadraticCurveTo(bx + p.lean * p.h * .3, by - p.h * .6, tx, ty); c.stroke();
    c.fillStyle = "#14261c"; for (let j = 0; j < 7; j++) { const a = -Math.PI / 2 + (j - 3) * .5 + (RM ? 0 : Math.sin(t / 1300 + i + j) * .05); c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx + Math.cos(a) * 30, ty + Math.sin(a) * 30 - 12, tx + Math.cos(a) * 56, ty + Math.sin(a) * 40 + 14); c.quadraticCurveTo(tx + Math.cos(a) * 30, ty + Math.sin(a) * 30 - 4, tx, ty); c.fill(); }
  });
  // seed-bank hut with a tiled roof and a glowing window
  const hx = W * .1, hw = Math.min(190, W * .2), hh = 62, hy = hz + 30;
  c.fillStyle = "#3b2a22"; c.fillRect(hx, hy - hh, hw, hh);
  c.fillStyle = "#7c3626"; c.beginPath(); c.moveTo(hx - 16, hy - hh + 4); c.lineTo(hx + hw / 2, hy - hh - 36); c.lineTo(hx + hw + 16, hy - hh + 4); c.fill();
  c.strokeStyle = "rgba(0,0,0,.25)"; c.lineWidth = 1; for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(hx - 16 + k * 8, hy - hh + 4 - k * 8); c.lineTo(hx + hw + 16 - k * 8, hy - hh + 4 - k * 8); c.stroke(); }
  const wl = .55 + .15 * Math.sin(t / 600); c.fillStyle = `rgba(255,200,110,${wl})`; c.fillRect(hx + 14, hy - hh + 16, 30, 22); c.fillRect(hx + hw - 44, hy - hh + 16, 30, 22);
  c.fillStyle = "#24170f"; c.fillRect(hx + hw / 2 - 12, hy - 36, 24, 36);
  // sacks of seed by the door
  [[-30, 0], [-16, -2], [24, 0], [38, -1]].forEach(([dx, dy], j) => { c.fillStyle = j % 2 ? "#c9a46a" : "#b38f57"; c.beginPath(); c.ellipse(hx + hw / 2 + dx, hy - 9 + dy, 8, 10, 0, 0, 6.28); c.fill(); });
  // lakh-counter board ticking up in Indian commas
  const cnt = 99990 + Math.floor(t / 900) % 12, bw2 = 120;
  c.fillStyle = "rgba(10,14,30,.85)"; c.fillRect(hx + hw / 2 - bw2 / 2, hy - hh - 70, bw2, 26); c.strokeStyle = "rgba(244,165,28,.7)"; c.strokeRect(hx + hw / 2 - bw2 / 2, hy - hh - 70, bw2, 26);
  c.fillStyle = cnt >= 100000 ? "#35c29a" : "#f4a51c"; c.font = "bold 15px monospace"; c.textAlign = "center"; c.fillText(kIN(Math.min(cnt, 100000)), hx + hw / 2, hy - hh - 52); c.textAlign = "start";
  // fireflies
  S.flies.forEach(f => { if (!RM) { f.x += Math.sin(t / 1100 + f.p) * f.s; f.y += Math.cos(t / 1300 + f.p) * f.s * .6; } const a = Math.max(0, Math.sin(t / 500 + f.p)); const fg = c.createRadialGradient(f.x, f.y, 0, f.x, f.y, 9); fg.addColorStop(0, `rgba(220,255,120,${.7 * a})`); fg.addColorStop(1, "rgba(220,255,120,0)"); c.fillStyle = fg; c.beginPath(); c.arc(f.x, f.y, 9, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(4,8,20,.30)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Gilli, the three-striped palm squirrel who keeps the seed bank's count
   ========================================================= */
GUIDES.k7m1_squirrel = () => `<svg class="guide squirrel" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="32" ry="4" fill="#000" opacity=".25"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 78 100;6 78 100;0 78 100;-4 78 100;0 78 100" dur="3s" repeatCount="indefinite"/>
    <path d="M76 104 Q112 100 110 64 Q108 34 86 26 Q98 44 94 62 Q90 84 72 92Z" fill="#8c6a4f"/>
    <path d="M84 34 Q100 46 98 66 Q96 86 80 96" stroke="#c9ad8c" stroke-width="3" fill="none" stroke-dasharray="5 4"/></g>
  <ellipse cx="56" cy="92" rx="24" ry="28" fill="#9a7658"/>
  <path d="M44 72 Q52 92 46 116 M56 68 Q62 92 56 118 M68 72 Q72 92 66 116" stroke="#f1e3c8" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M44 72 Q52 92 46 116 M56 68 Q62 92 56 118" stroke="#4a3426" stroke-width="1.2" fill="none" transform="translate(5 0)" opacity=".7"/>
  <ellipse cx="54" cy="100" rx="12" ry="16" fill="#e8d3b0"/>
  <path d="M34 82 Q24 76 26 66 Q34 70 40 78Z" fill="#c33b3b"/><path d="M30 70 l4 5 M27 74 l5 2" stroke="#fff" stroke-width="1.2"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
    <ellipse cx="54" cy="48" rx="21" ry="19" fill="#9a7658"/>
    <path d="M38 34 L34 18 L46 30Z M68 32 L74 16 L62 29Z" fill="#7d5c43"/><path d="M39 31 L37 22 L44 29Z M67 30 L70 21 L64 28Z" fill="#e8b9a0"/>
    <path d="M46 34 Q54 26 62 34" stroke="#f1e3c8" stroke-width="3" fill="none"/>
    <ellipse cx="56" cy="58" rx="11" ry="8" fill="#e8d3b0"/>
    <circle cx="46" cy="46" r="5" fill="#15202a"/><circle cx="64" cy="46" r="5" fill="#15202a"/><circle cx="47.6" cy="44.4" r="1.6" fill="#fff"/><circle cx="65.6" cy="44.4" r="1.6" fill="#fff"/>
    <rect x="40" y="40" width="30" height="0" fill="#9a7658"><animate attributeName="height" values="0;0;0;12;0" keyTimes="0;.84;.9;.95;1" dur="4.2s" repeatCount="indefinite"/></rect>
    <ellipse cx="56" cy="55" rx="3" ry="2.2" fill="#3a2a22"/>
    <path d="M51 60 Q56 64 61 60" stroke="#3a2a22" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="55" r="3.4" fill="#ff7aa2" opacity=".45"/><circle cx="72" cy="55" r="3.4" fill="#ff7aa2" opacity=".45"/>
    <path d="M66 58 l12 -2 M66 61 l12 2" stroke="#3a2a22" stroke-width=".8"/>
  </g>
  <g><animateTransform attributeName="transform" type="rotate" values="0 46 84;-10 46 84;0 46 84" dur="2.2s" repeatCount="indefinite"/>
    <path d="M42 86 Q34 78 38 70 Q44 74 48 82Z" fill="#8c6a4f"/>
    <path d="M38 70 Q36 54 30 44" stroke="#c9a14a" stroke-width="2" fill="none"/>
    <g fill="#f2cf63"><ellipse cx="31" cy="46" rx="2" ry="3.6" transform="rotate(-30 31 46)"/><ellipse cx="35" cy="50" rx="2" ry="3.6" transform="rotate(30 35 50)"/><ellipse cx="30" cy="53" rx="2" ry="3.6" transform="rotate(-30 30 53)"/><ellipse cx="35" cy="57" rx="2" ry="3.6" transform="rotate(30 35 57)"/><ellipse cx="29" cy="40" rx="2" ry="3.6"/></g></g>
  <path d="M60 86 Q70 82 70 92 Q64 94 60 90Z" fill="#8c6a4f"/>
  <ellipse cx="44" cy="120" rx="9" ry="4" fill="#7d5c43"/><ellipse cx="66" cy="120" rx="9" ry="4" fill="#7d5c43"/>
</svg>`;

/* =========================================================================================
   3D SIMULATIONS (WebGL via make3D, drag to turn)
   ========================================================================================= */
const k1reads = (name, P) => SIM_DEF[name].draw(Object.assign({}, SIM_DEF[name].def, P), Object.assign({}, SIM_DEF[name].def, P), new Set(Object.keys(SIM_DEF[name].reads)), null).reads;
const k1lerp = (a, b, k) => a + (b - a) * k;
function k1tex(THREE, draw, w, h) { const cv = document.createElement("canvas"); cv.width = w || 128; cv.height = h || 128; draw(cv.getContext("2d"), cv.width, cv.height); const t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t; }

/* ---------- 3D-1. k7m1_3dblocks — ten of each block make the next: 1 → 10 → 100 → 1000 → 10,000 → 1 lakh → 10 lakh
   params: e (power of ten, 0–6)   readouts: val, made, name   parts: "new" ---------- */
const K1DIM = e => { const b = Math.pow(10, Math.floor(e / 3)), r = e % 3; return r === 0 ? [b, b, b] : r === 1 ? [10 * b, b, b] : [10 * b, 10 * b, b]; };
const K1NAMES = ["one", "ten", "one hundred", "one thousand", "ten thousand", "one lakh", "ten lakh"];
SIM_DEF.k7m1_3dblocks = {
  def: { e: 5 },
  rng: { e: () => [0, 6, 1] },
  lab: { e: "Power of ten (zeros)" },
  reads: { val: "This block", made: "Made of", name: "Name" },
  readouts(P) { const e = clampN(kr(P.e), 0, 6), v = Math.pow(10, e); return { val: `1 followed by ${e} zero${e === 1 ? "" : "s"} = ${kIN(v)}`, made: e ? `10 × ${kIN(v / 10)} = ${kIN(v)}` : "a single unit cube", name: kCap(K1NAMES[e]) + (e === 6 ? " (one million)" : "") }; },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 9, phi: 1.05, theta: 0.65, auto: 0.12, target: [0, 0, 0], hint: "Drag to turn the seed blocks" });
    if (!g) return null;
    const { THREE, root } = g;
    const COLS = ["#f4a51c", "#35c29a", "#62b6e8", "#e04a86", "#ffd166", "#9b7ede", "#ff7a59"];
    const gridTex = (col, nx, ny) => k1tex(THREE, (c, w, h) => { c.fillStyle = col; c.fillRect(0, 0, w, h); c.strokeStyle = "rgba(20,20,40,.55)"; c.lineWidth = 2; for (let i = 1; i < nx; i++) { c.beginPath(); c.moveTo(i * w / nx, 0); c.lineTo(i * w / nx, h); c.stroke(); } for (let j = 1; j < ny; j++) { c.beginPath(); c.moveTo(0, j * h / ny); c.lineTo(w, j * h / ny); c.stroke(); } c.lineWidth = 6; c.strokeStyle = "rgba(10,10,30,.8)"; c.strokeRect(0, 0, w, h); });
    const mats = COLS.map(col => new THREE.MeshStandardMaterial({ map: gridTex(col, 10, 10), roughness: .55 }));
    const plain = COLS.map(col => new THREE.MeshStandardMaterial({ color: col, roughness: .55 }));
    const boxG = new THREE.BoxGeometry(1, 1, 1), edgeG = new THREE.EdgesGeometry(boxG), edgeM = new THREE.LineBasicMaterial({ color: 0x0b1020 });
    const pieces = []; for (let i = 0; i < 10; i++) { const m = new THREE.Mesh(boxG, plain[0]); m.add(new THREE.LineSegments(edgeG, edgeM)); root.add(m); pieces.push({ m, p: new THREE.Vector3(), tp: new THREE.Vector3(), s: new THREE.Vector3(1, 1, 1), ts: new THREE.Vector3(1, 1, 1) }); }
    const unit = new THREE.Mesh(boxG, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xf4a51c, emissiveIntensity: .6 })); root.add(unit);
    const lVal = g.label("", [0, 2.9, 0], "big"), lName = g.label("", [0, -2.7, 0], "plain"), lUnit = g.label("1 unit", unit, "plain");
    const st = { hl: null, e: -1, flyT: 1 };
    g.onFrame((t, dt) => {
      st.flyT = Math.min(1, st.flyT + dt * 0.9); const k = Math.min(1, dt * 6);
      pieces.forEach((p, i) => { const delay = clampN(st.flyT * 1.6 - i * 0.06, 0, 1), e2 = ease(delay); p.m.position.set(k1lerp(p.p.x, p.tp.x, e2), k1lerp(p.p.y, p.tp.y, e2), k1lerp(p.p.z, p.tp.z, e2)); p.s.lerp(p.ts, k); p.m.scale.copy(p.s); });
      const pul = st.hl === "new" ? 1 + 0.06 * Math.sin(t * 8) : 1; root.scale.setScalar(pul);
    });
    function apply(D, P, sh, hl) {
      st.hl = hl; const e = clampN(kr(P.e), 0, 6);
      if (e !== st.e) {
        const full = K1DIM(e), sub = e ? K1DIM(e - 1) : [1, 1, 1], sc = 4.2 / Math.max(...full), ax = e === 0 ? -1 : (e % 3 === 1 ? 0 : e % 3 === 2 ? 1 : 2);
        const nSub = e ? 10 : 1, gap = 0.04;
        pieces.forEach((p, i) => {
          p.m.visible = i < nSub; if (i >= nSub) return;
          const pos = [0, 0, 0]; if (ax >= 0) pos[ax] = (i - 4.5) * sub[ax] * sc;
          p.tp.set(pos[0] * (1 + gap), pos[1] * (1 + gap), pos[2] * (1 + gap));
          p.p.set(p.tp.x + (ax === 0 ? 0 : 0), p.tp.y + 6, p.tp.z + 2);
          if (i === 0 && st.e >= 0 && e === st.e + 1) p.p.copy(p.tp); // the old block stays, nine new copies fly in
          p.ts.set(sub[0] * sc * .985, sub[1] * sc * .985, sub[2] * sc * .985);
          if (st.e < 0) p.s.copy(p.ts);
          const sd = e ? K1DIM(e - 1) : [1, 1, 1];
          const fine = e >= 2 && e <= 4; p.m.material = fine ? mats[(e - 1) % 7] : plain[(e === 0 ? 0 : e - 1) % 7];
          void sd;
        });
        const us = sc * 1; unit.scale.setScalar(Math.max(us, 0.02)); unit.position.set(-2.1 - Math.max(us, 0.05) - 0.5, -sub[1] * sc / 2 * (ax === 1 ? 10 : 1) + us / 2, 1.6);
        unit.visible = e > 0;
        lUnit.show(e > 0 && e <= 4);
        st.flyT = (st.e < 0) ? 1 : 0; st.e = e;
      }
      const v = Math.pow(10, e);
      lVal.set(`${kIN(v)}${sh.has("made") && e ? `&nbsp;= 10 × ${kIN(v / 10)}` : ""}`);
      lName.set(sh.has("name") ? `<span style="font-size:14px">${kCap(K1NAMES[e])}</span>` : ""); lName.show(sh.has("name"));
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

})();
