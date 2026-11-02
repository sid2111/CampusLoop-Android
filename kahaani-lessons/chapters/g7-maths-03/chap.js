(function(){
/* Grade 7 Part I, Chapter 3 — A Peek Beyond the Point
   Plugin: simulations (k7m3_*), the Kanchipuram silk-weavers' street scene, and Chinti the ant guide. */

/* ---------- private helpers ---------- */
const m3hl = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const m3n = x => { const v = +x; return isFinite(v) ? v : 0; };
// exact-looking decimal string (rounds float noise away)
function m3s(x, dp) { let s = m3n(x).toFixed(dp == null ? 6 : dp); if (s.indexOf(".") >= 0) s = s.replace(/0+$/, "").replace(/\.$/, ""); if (s === "-0") s = "0"; return s; }
const m3dp = x => { const s = String(x); const i = s.indexOf("."); return i < 0 ? 0 : s.length - i - 1; };
// stacked fraction inside SVG; (x,y) = centre of the fraction bar line's baseline area
function m3F(x, y, n, d, o = {}) {
  const s = o.size || 14, f = o.fill || "var(--ink)", w = Math.max(String(n).length, String(d).length) * s * .56 + 4;
  return T(x, y - s * .42, n, { size: s * .82, fill: f, a: "middle" }) + `<line x1="${(x - w / 2).toFixed(1)}" y1="${(y - s * .3).toFixed(1)}" x2="${(x + w / 2).toFixed(1)}" y2="${(y - s * .3).toFixed(1)}" stroke="${f}" stroke-width="1.4"/>` + T(x, y + s * .5, d, { size: s * .82, fill: f, a: "middle" });
}
const m3Fw = (n, d, s) => Math.max(String(n).length, String(d).length) * s * .56 + 4;
// mixed number "w n/d" centred at x
function m3Mix(x, y, w, n, d, o = {}) {
  const s = o.size || 14, f = o.fill || "var(--ink)";
  if (!n) return T(x, y, w, { size: s * 1.15, fill: f });
  const ww = w ? String(w).length * s * .68 + 3 : 0, fw = m3Fw(n, d, s), L = x - (ww + fw) / 2;
  return (w ? T(L + ww / 2 - 1, y + s * .12, w, { size: s * 1.15, fill: f }) : "") + m3F(L + ww + fw / 2, y, n, d, { size: s, fill: f });
}
const m3Mixw = (w, n, d, s) => (n ? m3Fw(n, d, s) : 0) + (w ? String(w).length * s * .68 + 3 : 0);
const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function m3w(n) { n = Math.round(n); if (n < 20) return ONES[n]; if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : ""); if (n < 1000) return ONES[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + m3w(n % 100) : ""); if (n < 100000) return m3w(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + m3w(n % 1000) : ""); return m3w(Math.floor(n / 100000)) + " lakh" + (n % 100000 ? " " + m3w(n % 100000) : ""); }
const PLW = { 1: "tenth", 2: "hundredth", 3: "thousandth" };
function m3read(x) {
  const s = m3s(x, 3), [ip, fp = ""] = s.split(".");
  let r = m3w(+ip); if (!fp) return r;
  const pt = r + " point " + fp.split("").map(d => ONES[+d]).join(" ");
  const nn = +fp, word = PLW[fp.length] + (nn === 1 ? "" : "s");
  return `${pt} (${+ip ? m3w(+ip) + " and " : ""}${m3w(nn)} ${word})`;
}
const PCOL = { 2: "#9b7ede", 1: "#c58cf0", 0: "var(--sky)", "-1": "var(--teal)", "-2": "var(--mari)", "-3": "var(--rani)" };
const PNAME = { 2: "Hundreds", 1: "Tens", 0: "Units", "-1": "Tenths", "-2": "Hundredths", "-3": "Thousandths" };

/* =========================================================
   1. k7m3_ruler — an object (screw, pencil, silk ribbon…) laid on a ruler whose unit is cut into parts
   params: len (length), a, b (ruler window), div (parts per unit: 1, 2, 4, 10, 100), s (object start),
           obj (screw | pencil | ribbon | eraser | chalk | bar), unit, lx (title)
   readouts: val (mixed number), parts (counted in small parts), dec (decimal)
   parts: "obj", "ticks"
   ========================================================= */
function m3obj(kind, xs, xe, yT, h, hl) {
  const w = Math.max(2, xe - xs), yM = yT + h / 2; let s = `<g${m3hl(hl, "obj")}>`;
  if (kind === "screw") {
    const hw = Math.min(14, w * .25), sh = h * .42;
    s += `<rect x="${xs.toFixed(1)}" y="${yT}" width="${hw.toFixed(1)}" height="${h}" rx="3" fill="#8fa0c8" stroke="#3d4c75" stroke-width="1.5"/>`;
    let th = ""; for (let x = xs + hw + 4; x < xe - 10; x += 6) th += `M${x.toFixed(1)} ${(yM - sh / 2).toFixed(1)} l4 ${sh.toFixed(1)}`;
    s += `<path d="M${(xs + hw).toFixed(1)} ${(yM - sh / 2).toFixed(1)} H${(xe - 10).toFixed(1)} L${xe.toFixed(1)} ${yM} L${(xe - 10).toFixed(1)} ${(yM + sh / 2).toFixed(1)} H${(xs + hw).toFixed(1)}Z" fill="#b3c0de" stroke="#3d4c75" stroke-width="1.5"/><path d="${th}" stroke="#3d4c75" stroke-width="1.3"/>`;
  } else if (kind === "pencil") {
    const tip = Math.min(26, w * .3);
    s += `<rect x="${xs.toFixed(1)}" y="${yT + 4}" width="${Math.max(1, w - tip).toFixed(1)}" height="${h - 8}" fill="#f4a51c" stroke="#7a4b00" stroke-width="1.3"/><rect x="${xs.toFixed(1)}" y="${yT + 4}" width="${Math.min(10, w / 4).toFixed(1)}" height="${h - 8}" fill="#e04a86"/>`;
    s += `<path d="M${(xe - tip).toFixed(1)} ${yT + 4} L${xe.toFixed(1)} ${yM} L${(xe - tip).toFixed(1)} ${yT + h - 4}Z" fill="#efdcae" stroke="#7a4b00" stroke-width="1.3"/><path d="M${(xe - tip * .3).toFixed(1)} ${(yM - 2.4).toFixed(1)} L${xe.toFixed(1)} ${yM} L${(xe - tip * .3).toFixed(1)} ${(yM + 2.4).toFixed(1)}Z" fill="#2a2418"/>`;
  } else if (kind === "ribbon") {
    let top = `M${xs.toFixed(1)} ${yT + 6}`, n = Math.max(2, Math.round(w / 18));
    for (let i = 1; i <= n; i++) top += ` Q${(xs + (i - .5) * w / n).toFixed(1)} ${yT + (i % 2 ? 0 : 12)} ${(xs + i * w / n).toFixed(1)} ${yT + 6}`;
    s += `<path d="${top} V${yT + h - 4} H${xs.toFixed(1)}Z" fill="#e04a86" stroke="#9c1c56" stroke-width="1.2"/><rect x="${xs.toFixed(1)}" y="${yT + h - 10}" width="${w.toFixed(1)}" height="5" fill="#f4c430"/>`;
  } else if (kind === "eraser") {
    s += `<rect x="${xs.toFixed(1)}" y="${yT + 2}" width="${w.toFixed(1)}" height="${h - 4}" rx="5" fill="#e8ecf4" stroke="#55607a" stroke-width="1.4"/><rect x="${(xs + w * .3).toFixed(1)}" y="${yT + 2}" width="${(w * .7).toFixed(1)}" height="${h - 4}" fill="#62b6e8" opacity=".75"/>`;
  } else if (kind === "chalk") {
    s += `<rect x="${xs.toFixed(1)}" y="${yT + 8}" width="${w.toFixed(1)}" height="${h - 16}" rx="7" fill="#f6f2e6" stroke="#9a9384" stroke-width="1.4"/>`;
  } else {
    s += `<rect x="${xs.toFixed(1)}" y="${yT + 6}" width="${w.toFixed(1)}" height="${h - 12}" rx="5" fill="var(--teal)" stroke="#1d6b55" stroke-width="1.4"/>`;
  }
  return s + "</g>";
}
SIM_DEF.k7m3_ruler = {
  def: { len: 2.7, a: 0, b: 4, div: 10, s: 0, obj: "screw", unit: "cm", lx: "" },
  rng: { len: P => [+P.a, +P.b, 1 / Math.max(1, Math.round(+P.div))] },
  lab: { len: "Length" },
  reads: { val: "Length", parts: "Counted in small parts", dec: "As a decimal" },
  draw(D, P, sh, hl) {
    const a = m3n(P.a), b = m3n(P.b), div = Math.max(1, Math.round(m3n(P.div))), x0 = 34, x1 = 386, X = v => x0 + (clampN(v, a, b) - a) / (b - a) * (x1 - x0);
    const u = P.unit ? " " + P.unit : "", yR = 132;
    let s = `<svg viewBox="0 0 420 232">`;
    if (P.lx) s += T(210, 20, svgFr(P.lx), { size: 13, fill: "var(--muted)" });
    s += `<rect x="${x0 - 16}" y="${yR}" width="${x1 - x0 + 32}" height="62" rx="6" fill="#f2d35b" stroke="#a88a1c" stroke-width="1.5"/>`;
    const N = Math.round((b - a) * div); let tk = "";
    for (let i = 0; i <= N; i++) {
      const v = a + i / div, x = X(v), whole = Math.abs(v - Math.round(v)) < 1e-9, half = !whole && div % 2 === 0 && i % (div / 2) === 0, tenth = div === 100 && i % 10 === 0;
      const hgt = whole ? 26 : (half || tenth) ? 17 : (div >= 100 ? 8 : 11);
      tk += `M${x.toFixed(2)} ${yR}v${hgt}`;
      if (whole) s += T(x, yR + 48, Math.round(v), { size: 17, fill: "#2a2418", w: 800 });
    }
    s += `<path d="${tk}" stroke="#2a2418" stroke-width="${N > 150 ? .7 : 1.3}"${m3hl(hl, "ticks")}/>`;
    if (div === 10 && b - a <= 2.01) for (let i = 1; i < N; i++) { if (i % 10) s += T(X(a + i / div), yR + 40, (a + i / div).toFixed(1).split(".")[1], { size: 9, fill: "#5a4a10" }); }
    const L = m3n(D.len), xs = X(m3n(P.s)), xe = X(L);
    s += m3obj(P.obj, Math.min(xs, xe - 2), xe, 74, 46, hl);
    const n = Math.round(m3n(P.len) * div), w = Math.floor(n / div), r = n - w * div;
    s += `<line x1="${xe.toFixed(1)}" y1="66" x2="${xe.toFixed(1)}" y2="${yR + 30}" stroke="var(--red)" stroke-width="2" stroke-dasharray="4 3"/>`;
    if (sh.has("val")) { const tx = clampN(xe, 60, 360); s += `<rect x="${(tx - 46).toFixed(1)}" y="30" width="92" height="34" rx="10" fill="rgba(10,15,40,.8)" stroke="var(--mari)"/>` + m3Mix(tx - (u ? 10 : 0), 50, w, r, div, { size: 14, fill: "var(--mari)" }) + (u ? T(tx + 30, 52, P.unit, { size: 12, fill: "var(--mari)" }) : ""); }
    else s += T(clampN(xe, 40, 380), 54, "?", { size: 18, fill: "var(--mari)" });
    s += T(210, 222, div === 1 ? "each unit has no smaller marks" : `each unit is cut into ${div} equal parts`, { size: 12, fill: "var(--muted)" });
    s += "</svg>";
    const small = div === 10 ? "tenths" : div === 100 ? "hundredths" : div === 4 ? "quarters" : div === 2 ? "halves" : div === 16 ? "sixteenths" : "parts";
    const val = r ? `${w ? w + " " : ""}[${r}/${div}]${u}` : `${w}${u}`;
    let parts = `${n} ${small} = [${n}/${div}]${u}`;
    if (div === 100 && r) parts += ` = ${w} + [${Math.floor(r / 10)}/10] + [${r % 10}/100]`;
    const dec = (div === 10 || div === 100) ? m3s(n / div) + u : (div === 2 || div === 4) ? m3s(n / div) + u + " (" + (n / div).toFixed(2) + ")" : "—";
    return { svg: s, reads: { val, parts, dec } };
  }
};

/* =========================================================
   2. k7m3_regroup — column addition / subtraction with beads, showing 10-for-1 trades
   params: a, b, op ("+" or "−"), dp (decimal places used), step (0 numbers, 1 combine / regroup, 2 answer), ua, ub (row labels)
   readouts: res (answer), how (what got regrouped)
   parts: "trade", "ans"
   ========================================================= */
function m3rg(P) {
  const dp = clampN(Math.round(m3n(P.dp)), 0, 3), S = 10 ** dp, A = Math.round(m3n(P.a) * S), B = Math.round(m3n(P.b) * S), sub = P.op === "−" || P.op === "-";
  const R = sub ? A - B : A + B, big = Math.max(A, B, Math.abs(R));
  let hi = 0; while (Math.floor(big / S / 10 ** (hi + 1)) > 0 && hi < 2) hi++;
  const es = []; for (let e = hi; e >= -dp; e--) es.push(e);
  const dg = (N, e) => Math.floor(N / 10 ** (e + dp)) % 10;
  const dA = {}, dB = {}, row3 = {}, res = {}, notes = [], mark = {};
  es.forEach(e => { dA[e] = dg(A, e); dB[e] = dg(B, e); res[e] = dg(Math.abs(R), e); });
  if (!sub) { es.forEach(e => { row3[e] = dA[e] + dB[e]; }); let c = 0; [...es].reverse().forEach(e => { const t = row3[e] + c; if (t >= 10) { mark[e] = 1; notes.push(`${t} ${PNAME[e].toLowerCase()} = 1 ${PNAME[e + 1] ? PNAME[e + 1].toLowerCase().replace(/s$/, "") : "more"} + ${t - 10} ${PNAME[e].toLowerCase()}`); c = 1; } else c = 0; }); }
  else { const t = {}; es.forEach(e => t[e] = dA[e]); [...es].reverse().forEach(e => { if (t[e] < dB[e] && t[e + 1] != null) { t[e] += 10; t[e + 1] -= 1; mark[e] = 1; notes.push(`1 ${PNAME[e + 1].toLowerCase().replace(/s$/, "")} → 10 ${PNAME[e].toLowerCase()}, so we have ${t[e]} ${PNAME[e].toLowerCase()}`); } }); es.forEach(e => row3[e] = t[e]); }
  return { dp, S, A, B, R, es, dA, dB, row3, res, notes, mark, sub };
}
SIM_DEF.k7m3_regroup = {
  def: { a: 2.7, b: 3.6, op: "+", dp: 1, step: 0, ua: "", ub: "" },
  rng: { step: () => [0, 2, 1] },
  lab: { step: "Step (0 numbers, 1 regroup, 2 answer)" },
  reads: { res: "Answer", how: "Regrouping" },
  draw(D, P, sh, hl) {
    const G = m3rg(P), st = clampN(Math.round(m3n(D.step)), 0, 2), nc = G.es.length, lw = 92, cw = (412 - lw) / nc, X = i => lw + cw * i + cw / 2;
    let s = `<svg viewBox="0 0 420 236">`;
    G.es.forEach((e, i) => { s += T(X(i), 18, PNAME[e], { size: cw < 66 ? 9.5 : 11, fill: PCOL[e] }); });
    const pi = G.es.indexOf(0); if (pi >= 0 && pi < nc - 1) s += `<line x1="${(lw + cw * (pi + 1)).toFixed(1)}" y1="26" x2="${(lw + cw * (pi + 1)).toFixed(1)}" y2="214" stroke="var(--mari)" stroke-width="1.5" stroke-dasharray="3 4"/>`;
    const cell = (i, e, v, y, emph, part) => {
      let c = T(X(i), y + 6, v, { size: 19, fill: emph ? "#ffd6e6" : "var(--ink)", w: 800 });
      const nd = clampN(v, 0, 20); for (let k = 0; k < nd; k++) { const cx = X(i) - 26 + (k % 10) * 5.8, cy = y + 15 + Math.floor(k / 10) * 6; c += `<circle cx="${cx.toFixed(1)}" cy="${cy}" r="2.3" fill="${PCOL[e]}"/>`; }
      if (emph) c = `<g${m3hl(hl, part)}><rect x="${(X(i) - cw / 2 + 4).toFixed(1)}" y="${y - 14}" width="${(cw - 8).toFixed(1)}" height="40" rx="8" fill="rgba(224,74,134,.13)" stroke="var(--rani)"/>${c}</g>`;
      return c;
    };
    const lab = (y, t, c) => T(8, y + 6, t, { size: 13, a: "start", fill: c || "var(--muted)" });
    s += lab(44, P.ua ? svgFr(P.ua) : m3s(G.A / G.S)); G.es.forEach((e, i) => s += cell(i, e, G.dA[e], 44));
    s += lab(88, (G.sub ? "− " : "+ ") + (P.ub ? svgFr(P.ub) : m3s(G.B / G.S))); G.es.forEach((e, i) => s += cell(i, e, G.dB[e], 88));
    s += `<line x1="6" y1="116" x2="414" y2="116" stroke="var(--line)" stroke-width="2"/>`;
    if (st >= 1) { s += lab(140, G.sub ? "regroup top" : "together", "var(--rani)"); G.es.forEach((e, i) => s += cell(i, e, G.row3[e], 140, !!G.mark[e], "trade")); }
    if (st >= 2) { s += `<g${m3hl(hl, "ans")}>` + lab(190, "answer", "var(--teal)"); G.es.forEach((e, i) => s += T(X(i), 196, G.res[e], { size: 22, fill: "var(--teal)", w: 800 })); s += "</g>"; }
    s += T(210, 230, st >= 2 ? `${m3s(G.A / G.S)} ${G.sub ? "−" : "+"} ${m3s(G.B / G.S)} = ${m3s(G.R / G.S)}` : st === 1 ? (G.notes.length ? "10 of a place = 1 of the place to its left" : "no regrouping needed here") : "line the places up, point under point", { size: 13, fill: st >= 2 ? "var(--teal)" : "var(--muted)" });
    s += "</svg>";
    return { svg: s, reads: { res: `${m3s(G.A / G.S)} ${G.sub ? "−" : "+"} ${m3s(G.B / G.S)} = ${m3s(G.R / G.S)}`, how: G.notes.length ? G.notes.join("; ") : "no regrouping needed" } };
  }
};

/* =========================================================
   3. k7m3_pv — spindle place-value board (beads on silk spindles) with a decimal point
   params: h, t, o, d1, d2, d3 (counts on each spindle), cols (which spindles), lx
   readouts: dec (decimal), exp (place value form), word (how to read it)
   parts: "point", "beads"
   ========================================================= */
const PVK = ["h", "t", "o", "d1", "d2", "d3"], PVE = { h: 2, t: 1, o: 0, d1: -1, d2: -2, d3: -3 };
SIM_DEF.k7m3_pv = {
  def: { h: 0, t: 0, o: 0, d1: 0, d2: 0, d3: 0, cols: "o,d1", lx: "" },
  rng: { h: () => [0, 9, 1], t: () => [0, 9, 1], o: () => [0, 9, 1], d1: () => [0, 9, 1], d2: () => [0, 9, 1], d3: () => [0, 9, 1] },
  lab: { h: "Hundreds", t: "Tens", o: "Units", d1: "Tenths", d2: "Hundredths", d3: "Thousandths" },
  reads: { dec: "Decimal", exp: "Place value", word: "Read as" },
  draw(D, P, sh, hl) {
    const dc = String(P.cols).split(",").map(c => c.trim()).filter(c => PVK.includes(c)), ix = PVK.map((k, i) => (dc.includes(k) || Math.round(m3n(P[k])) || m3n(D[k]) > .05) ? i : -1).filter(i => i >= 0), cols = PVK.slice(Math.min(...ix, PVK.indexOf("o")), Math.max(...ix, PVK.indexOf("o")) + 1), nc = cols.length, cw = Math.min(84, 390 / nc), x0 = 210 - nc * cw / 2;
    let s = `<svg viewBox="0 0 420 250">`;
    if (P.lx) s += T(210, 16, svgFr(P.lx), { size: 12.5, fill: "var(--muted)" });
    cols.forEach((k, i) => {
      const e = PVE[k], cx = x0 + cw * i + cw / 2, col = PCOL[e];
      s += T(cx, 36, PNAME[e], { size: cw < 70 ? 10 : 11.5, fill: col });
      s += e >= 0 ? T(cx, 54, 10 ** e, { size: 12, fill: "var(--muted)" }) : m3F(cx, 52, 1, 10 ** -e, { size: 11, fill: "var(--muted)" });
      s += `<line x1="${cx}" y1="66" x2="${cx}" y2="180" stroke="#c9b48a" stroke-width="3"/><rect x="${cx - cw / 2 + 8}" y="178" width="${cw - 16}" height="8" rx="3" fill="#8a5a2b"/>`;
      const c = Math.max(0, m3n(D[k])), shown = Math.min(10, Math.floor(c + .001)), frac = c - Math.floor(c);
      for (let j = 0; j < shown; j++) s += `<ellipse cx="${cx}" cy="${170 - j * 10.4}" rx="${Math.min(15, cw / 3)}" ry="5" fill="${col}" stroke="#10233a" stroke-width="1"${j === 0 ? m3hl(hl, "beads") : ""}/>`;
      if (frac > .05 && shown < 10) s += `<ellipse cx="${cx}" cy="${(170 - shown * 10.4 - 30 * (1 - frac)).toFixed(1)}" rx="${Math.min(15, cw / 3)}" ry="5" fill="${col}" opacity="${frac.toFixed(2)}"/>`;
      const raw = Math.round(m3n(P[k]));
      if (raw > 10) s += T(cx, 62, `+${raw - 10}`, { size: 11, fill: "var(--rani)" });
      s += `<rect x="${cx - 17}" y="194" width="34" height="30" rx="6" fill="rgba(255,255,255,.06)" stroke="${col}"/>` + T(cx, 216, raw, { size: raw > 9 ? 15 : 19, w: 800, fill: raw > 9 ? "var(--rani)" : "var(--ink)" });
      if (k === "o" && i < nc - 1) s += `<circle cx="${(cx + cw / 2).toFixed(1)}" cy="214" r="5.5" fill="var(--mari)"${m3hl(hl, "point")}/>`;
    });
    const N = PVK.reduce((t, k) => t + Math.round(m3n(P[k])) * 10 ** (PVE[k] + 3), 0), v = N / 1000;
    s += T(210, 244, sh.has("dec") ? `= ${m3s(v, 3)}` : "= ?", { size: 16, fill: "var(--teal)" });
    s += "</svg>";
    const exp = cols.filter(k => Math.round(m3n(P[k]))).map(k => { const e = PVE[k], c = Math.round(m3n(P[k])); return e >= 0 ? `${c} × ${10 ** e}` : `${c} × [1/${10 ** -e}]`; }).join(" + ") || "0";
    const over = cols.some(k => Math.round(m3n(P[k])) > 9);
    return { svg: s, reads: { dec: m3s(v, 3) + (over ? " (after regrouping)" : ""), exp, word: m3read(v) } };
  }
};

/* =========================================================
   4. k7m3_nline — number line with equal parts, lettered arrows and a movable pointer
   params: a, b, parts (main parts), sub (small parts in each), m (pointer, in small steps), ptr (1 show pointer),
           marks ("A:9,B:13" small-step positions), auto (1 label every main tick), dp (label decimals)
   readouts: val, step, marks
   parts: "ptr", "marks"
   ========================================================= */
SIM_DEF.k7m3_nline = {
  def: { a: 1, b: 2, parts: 10, sub: 1, m: 4, ptr: 1, marks: "", auto: 1, dp: 1 },
  rng: { m: P => [0, Math.round(P.parts) * Math.max(1, Math.round(P.sub || 1)), 1] },
  lab: { m: "Pointer (small steps from the left end)" },
  reads: { val: "Pointer at", step: "One small step", marks: "Letters" },
  draw(D, P, sh, hl) {
    const a = m3n(P.a), b = m3n(P.b), pr = Math.max(1, Math.round(m3n(P.parts))), sb = Math.max(1, Math.round(m3n(P.sub) || 1)), N = pr * sb, x0 = 34, x1 = 386, X = i => x0 + (x1 - x0) * i / N, val = i => a + (b - a) * i / N, y = 116;
    let s = `<svg viewBox="0 0 420 232">`;
    s += `<line x1="${x0 - 22}" y1="${y}" x2="${x1 + 22}" y2="${y}" stroke="var(--ink)" stroke-width="2.5"/><path d="M${x0 - 24} ${y} l9 -6 v12z M${x1 + 24} ${y} l-9 -6 v12z" fill="var(--ink)"/>`;
    for (let i = 0; i <= N; i++) { const main = i % sb === 0; s += `<line x1="${X(i).toFixed(1)}" y1="${y - (main ? 13 : 6)}" x2="${X(i).toFixed(1)}" y2="${y + (main ? 13 : 6)}" stroke="var(--ink)" stroke-width="${main ? 2.2 : 1.2}"/>`;
      if (main && (m3n(P.auto) || i === 0 || i === N)) s += T(X(i), y + 32, m3s(val(i), +P.dp + 3), { size: pr > 10 ? 10.5 : 12.5 }); }
    const mk = String(P.marks || "").split(",").map(t => t.split(":")).filter(t => t.length === 2).map(([l, p]) => ({ l: l.trim(), p: +p }));
    mk.forEach((q, j) => { const x = X(q.p), up = j % 2 ? 0 : 10;
      s += `<g${m3hl(hl, "marks")}><line x1="${x.toFixed(1)}" y1="${56 - up}" x2="${x.toFixed(1)}" y2="${y - 4}" stroke="var(--rani)" stroke-width="2"/><path d="M${(x - 5).toFixed(1)} ${y - 12} L${(x + 5).toFixed(1)} ${y - 12} L${x.toFixed(1)} ${y - 3}Z" fill="var(--rani)"/></g>`;
      s += T(x, 50 - up, q.l, { size: 15, fill: "var(--rani)" });
      if (sh.has("marks")) s += T(x, 34 - up, m3s(val(q.p), 4), { size: 11.5, fill: "var(--mari)" }); });
    if (m3n(P.ptr)) { const mx = X(clampN(m3n(D.m), 0, N)), mv = Math.round(clampN(m3n(P.m), 0, N));
      s += `<g${m3hl(hl, "ptr")}><line x1="${mx.toFixed(1)}" y1="${y + 50}" x2="${mx.toFixed(1)}" y2="${y + 8}" stroke="var(--mari)" stroke-width="3"/><path d="M${(mx - 7).toFixed(1)} ${y + 16} L${(mx + 7).toFixed(1)} ${y + 16} L${mx.toFixed(1)} ${y + 4}Z" fill="var(--mari)"/></g>`;
      s += T(clampN(mx, 30, 390), y + 72, sh.has("val") ? m3s(val(mv), 4) : "?", { size: 18, fill: "var(--mari)" }); }
    s += T(210, 226, `${N} small steps, each ${sh.has("step") ? m3s((b - a) / N, 5) : "?"}`, { size: 12, fill: "var(--muted)" });
    s += "</svg>";
    const mv = Math.round(clampN(m3n(P.m), 0, N));
    return { svg: s, reads: { val: `${m3s(a, 4)} + ${mv} × ${m3s((b - a) / N, 5)} = ${m3s(val(mv), 4)}`, step: `(${m3s(b, 4)} − ${m3s(a, 4)}) ÷ ${N} = ${m3s((b - a) / N, 5)}`, marks: mk.map(q => `${q.l} = ${m3s(val(q.p), 4)}`).join(", ") || "—" } };
  }
};

/* =========================================================
   5. k7m3_zoom — nested magnified number lines (0–10 → units → tenths → hundredths)
   params: x (a number below 10 with up to 3 decimals), lv (levels shown 1–4), q (1 = hide the final value as "?")
   readouts: val, path
   parts: "box", "mark"
   ========================================================= */
function m3zoom(x) { const X = Math.round(m3n(x) * 1000), L = []; for (let i = 0; i < 4; i++) { const W = i ? 10 ** (4 - i) : 10000, st = i ? Math.floor(X / W) * W : 0, p = W / 10; L.push({ st, W, p, k: Math.min(9, Math.floor((X - st) / p)) }); } return { X, L }; }
/* =========================================================
   6. k7m3_convert — small unit to big unit (mm→cm, cm→m, g→kg, paise→₹)
   params: n (count of small units), f (10, 100 or 1000), su, bu, pre (₹), max (slider max)
   readouts: big (value in the big unit), frac (as a fraction)
   parts: "fill", "digits"
   ========================================================= */
SIM_DEF.k7m3_convert = {
  def: { n: 12, f: 10, su: "mm", bu: "cm", pre: "", max: 30 },
  rng: { n: P => [0, Math.max(10, Math.round(m3n(P.max))), 1] },
  lab: { n: "Number of small units" },
  reads: { big: "In the bigger unit", frac: "As a fraction" },
  draw(D, P, sh, hl) {
    const f = Math.max(10, Math.round(m3n(P.f))), n = Math.max(0, Math.round(m3n(P.n))), nD = Math.max(0, m3n(D.n)), w = Math.floor(n / f), r = n - w * f, wD = Math.floor(nD / f), rD = nD - wD * f;
    const v = m3s(n / f, 4), pre = P.pre || "", bu = P.bu, su = P.su;
    let s = `<svg viewBox="0 0 420 236">`;
    s += T(210, 22, `1 ${bu === "rupee" ? "rupee" : bu} = ${f} ${su}`, { size: 14, fill: "var(--muted)" });
    // whole big units as filled chips
    const chips = Math.min(wD, 6); for (let i = 0; i < chips; i++) s += `<rect x="${20 + i * 30}" y="40" width="26" height="26" rx="5" fill="var(--sky)" stroke="#10233a"/>` + T(33 + i * 30, 58, "1", { size: 12, fill: "#10233a" });
    s += T(chips ? 30 + chips * 30 : 20, 58, `${w > 6 ? "… " : ""}${w} whole ${bu === "rupee" ? (w === 1 ? "rupee" : "rupees") : bu}`, { size: 13, a: "start", fill: "var(--sky)" });
    // one big unit split into 10 (and each into 10 for f = 100)
    const bx = 20, bw = 380, by = 82, bh = 44;
    s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="6" fill="rgba(255,255,255,.05)" stroke="var(--line)"/>`;
    s += `<rect x="${bx}" y="${by}" width="${(bw * clampN(rD / f, 0, 1)).toFixed(1)}" height="${bh}" rx="6" fill="var(--mari)" fill-opacity=".75"${m3hl(hl, "fill")}/>`;
    let gl = ""; for (let i = 1; i < 10; i++) gl += `M${(bx + bw * i / 10).toFixed(1)} ${by}v${bh}`;
    let fl = ""; if (f === 100) for (let i = 1; i < 100; i++) if (i % 10) fl += `M${(bx + bw * i / 100).toFixed(2)} ${by + bh * .55}v${bh * .45}`;
    if (f === 1000) for (let i = 1; i < 100; i++) if (i % 10) fl += `M${(bx + bw * i / 100).toFixed(2)} ${by + bh * .7}v${bh * .3}`;
    s += `<path d="${gl}" stroke="var(--ink)" stroke-opacity=".6" stroke-width="1.4"/><path d="${fl}" stroke="var(--ink)" stroke-opacity=".3" stroke-width=".8"/>`;
    s += T(bx, by + bh + 16, "0", { size: 11, fill: "var(--muted)" }) + T(bx + bw, by + bh + 16, `1 ${bu}`, { size: 11, fill: "var(--muted)", a: "end" }) + T(210, by + bh + 16, f === 10 ? `each part = 1 ${su}` : f === 100 ? `each big part = 10 ${su}` : `each big part = 100 ${su}`, { size: 11, fill: "var(--muted)" });
    // equation
    const fw = m3Fw(n, f, 16), y = 200; let x = 24;
    s += T(x, y + 6, `${n} ${su === "p" ? "paise" : su} =`, { size: 17, a: "start" }); x += (String(n).length + 1 + (su === "p" ? 5 : su.length) + 2) * 9.6 + 8;
    s += m3F(x + fw / 2, y, n, f, { size: 16 }); x += fw + 6;
    s += T(x, y + 6, `${bu === "rupee" ? "rupee" : bu} =`, { size: 17, a: "start" }); x += ((bu === "rupee" ? 5 : bu.length) + 2) * 9.6 + 6;
    s += `<g${m3hl(hl, "digits")}>` + T(x, y + 6, sh.has("big") ? `${pre}${pre ? (+v).toFixed(2) : v}${pre ? "" : " " + bu}` : "?", { size: 19, a: "start", fill: "var(--teal)", w: 800 }) + "</g>";
    s += "</svg>";
    const bigTxt = pre ? `${pre}${(+v).toFixed(2)}` : `${v} ${bu}`;
    return { svg: s, reads: { big: `${n} ${su === "p" ? "paise" : su} = ${bigTxt}`, frac: `[${n}/${f}] ${bu}${w && r ? ` = ${w} + [${r}/${f}]` : ""}` } };
  }
};

/* =========================================================
   SCENE — Kanchipuram weavers' street at dusk: temple gopuram, drying silk sarees, a loom with a flying shuttle
   ========================================================= */
let m3w0 = null;
function m3wInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  m3w0 = { W, H,
    stars: Array.from({ length: Math.round(W * H / 9000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .45), r: rnd(.3, 1.4), p: rnd(0, 6.28) })),
    sarees: Array.from({ length: Math.max(5, Math.round(W / 150)) }, (_, i) => ({ x: (i + .5) * W / Math.max(5, Math.round(W / 150)), c: ["#e04a86", "#f4a51c", "#35c29a", "#9b3dd1", "#d8342c", "#2f7fd8"][i % 6], p: rnd(0, 6.28), w: rnd(46, 70) })),
    motes: Array.from({ length: 40 }, () => ({ x: rnd(0, W), y: rnd(H * .3, H), s: rnd(.2, .6), p: rnd(0, 6.28) })),
    houses: (() => { const a = []; let x = -20; while (x < W + 40) { const w = rnd(90, 150); a.push({ x, w, h: rnd(70, 110), c: ["#5b2a3c", "#3d2a55", "#5a3a22", "#2f4a4a"][Math.floor(rnd(0, 4))] }); x += w + 6; } return a; })() };
}
SCENES.k7m3_looms = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!m3w0 || m3w0.W !== W || m3w0.H !== H) m3wInit(W, H);
  const S = m3w0, gy = H * .8;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#130a2a"); g.addColorStop(.5, "#3a1640"); g.addColorStop(.85, "#8a3a3a"); g.addColorStop(1, "#c46a3a");
  c.fillStyle = g; c.fillRect(0, 0, W, gy);
  S.stars.forEach(s => { c.globalAlpha = .3 + .35 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // crescent moon
  const mx = W * .18, my = H * .16, mr = Math.min(W, H) * .045; c.fillStyle = "#ffe7b0"; c.beginPath(); c.arc(mx, my, mr, 0, 6.28); c.fill(); c.fillStyle = "#1a0d30"; c.beginPath(); c.arc(mx + mr * .45, my - mr * .2, mr * .9, 0, 6.28); c.fill();
  // temple gopuram (stepped tower) in the distance
  const gx = W * .62, gw = Math.min(220, W * .2), gh = Math.min(H * .5, 360); c.fillStyle = "#24122e";
  for (let i = 0; i < 7; i++) { const w = gw * (1 - i * .11), h = gh / 7; c.fillRect(gx - w / 2, gy - (i + 1) * h, w, h + 1); }
  c.fillRect(gx - gw * .18, gy - gh - 18, gw * .36, 20); for (let i = -2; i <= 2; i++) { c.beginPath(); c.arc(gx + i * gw * .07, gy - gh - 20, 4, 0, 6.28); c.fill(); }
  c.fillStyle = `rgba(255,190,90,${.5 + .25 * Math.sin(t / 900)})`; for (let i = 0; i < 6; i++) { const w = gw * (1 - i * .11); for (let k = -1; k <= 1; k++) c.fillRect(gx + k * w * .28 - 2, gy - (i + .6) * gh / 7, 4, 6); }
  // weavers' houses
  S.houses.forEach((hs, i) => { const y = gy - hs.h; c.fillStyle = hs.c; c.fillRect(hs.x, y, hs.w, hs.h); c.fillStyle = "#2a1420"; c.beginPath(); c.moveTo(hs.x - 8, y); c.lineTo(hs.x + hs.w / 2, y - 26); c.lineTo(hs.x + hs.w + 8, y); c.fill();
    c.fillStyle = `rgba(255,200,110,${.55 + .2 * Math.sin(t / 700 + i)})`; c.fillRect(hs.x + hs.w * .18, y + hs.h * .3, hs.w * .22, hs.h * .3); c.fillRect(hs.x + hs.w * .6, y + hs.h * .3, hs.w * .22, hs.h * .3); });
  // drying line with silk sarees waving
  const ly = gy - Math.min(170, H * .22); c.strokeStyle = "rgba(255,230,190,.5)"; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, ly); c.quadraticCurveTo(W / 2, ly + 18, W, ly); c.stroke();
  S.sarees.forEach(sr => { const k = sr.x / W, yy = ly + 18 * 4 * k * (1 - k), wave = RM ? 0 : Math.sin(t / 900 + sr.p) * 8, len = 90;
    c.fillStyle = sr.c; c.globalAlpha = .85; c.beginPath(); c.moveTo(sr.x - sr.w / 2, yy); c.lineTo(sr.x + sr.w / 2, yy); c.quadraticCurveTo(sr.x + sr.w / 2 + wave, yy + len / 2, sr.x + sr.w / 2 + wave * 1.5, yy + len); c.lineTo(sr.x - sr.w / 2 + wave * 1.5, yy + len); c.quadraticCurveTo(sr.x - sr.w / 2 + wave, yy + len / 2, sr.x - sr.w / 2, yy); c.fill();
    c.fillStyle = "#f4c430"; c.fillRect(sr.x - sr.w / 2 + wave * 1.5, yy + len - 12, sr.w, 7); c.globalAlpha = 1; });
  // ground
  c.fillStyle = "#2a1418"; c.fillRect(0, gy, W, H - gy); c.fillStyle = "rgba(244,165,28,.35)"; c.fillRect(0, gy, W, 2);
  // handloom at the right: frame, warp threads, moving shuttle
  const lx = W * .78, lw = Math.min(240, W * .2), lh = 90, lt = gy - lh;
  c.strokeStyle = "#8a5a2b"; c.lineWidth = 5; c.strokeRect(lx, lt, lw, lh);
  c.strokeStyle = "rgba(255,220,170,.55)"; c.lineWidth = 1; for (let x = lx + 6; x < lx + lw - 4; x += 6) { c.beginPath(); c.moveTo(x, lt + 4); c.lineTo(x, gy - 4); c.stroke(); }
  const woven = ((t / 60) % (lh - 20)); c.fillStyle = "rgba(224,74,134,.75)"; c.fillRect(lx + 3, gy - 6 - woven, lw - 6, woven); c.fillStyle = "rgba(244,196,48,.8)"; for (let y = gy - 14; y > gy - 6 - woven; y -= 14) c.fillRect(lx + 3, y, lw - 6, 2);
  const sx = lx + 8 + (lw - 30) * (.5 + .5 * Math.sin(t / 500)); c.fillStyle = "#f4c430"; c.beginPath(); c.ellipse(sx + 7, gy - 10 - woven, 11, 4, 0, 0, 6.28); c.fill();
  // floating lamp-light motes
  S.motes.forEach(m => { if (!RM) { m.y -= m.s; m.x += Math.sin(t / 1500 + m.p) * .3; if (m.y < H * .25) { m.y = H; m.x = Math.random() * W; } } c.fillStyle = `rgba(255,200,120,${.25 + .2 * Math.sin(t / 500 + m.p)})`; c.beginPath(); c.arc(m.x, m.y, 2, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(6,4,16,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Chinti, the tiny red ant with a magnifying glass and a measuring-tape scarf
   ========================================================= */
GUIDES.k7m3_chinti = () => `<svg class="guide ant" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="36" ry="4" fill="#000" opacity=".25"/>
  <path d="M40 98 L26 120 M50 100 L44 122 M70 100 L76 122 M80 98 L94 120" stroke="#5a1a12" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <ellipse cx="86" cy="96" rx="22" ry="17" fill="#c0392b"/><ellipse cx="80" cy="90" rx="8" ry="5" fill="#e8705f" opacity=".7"/>
  <ellipse cx="58" cy="92" rx="12" ry="10" fill="#b03224"/>
  <path d="M30 66 Q34 50 50 54" stroke="#5a1a12" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 32 72;-14 32 72;0 32 72" dur="2.4s" repeatCount="indefinite"/>
    <path d="M44 84 Q28 78 22 66" stroke="#5a1a12" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <circle cx="16" cy="54" r="13" fill="rgba(160,220,255,.35)" stroke="#f4a51c" stroke-width="4"/><path d="M10 48 Q14 44 20 45" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/><line x1="24" y1="64" x2="30" y2="72" stroke="#8a5a2b" stroke-width="5" stroke-linecap="round"/></g>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M50 30 Q40 6 30 8 M66 30 Q74 6 86 8" stroke="#5a1a12" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="30" cy="8" r="3.5" fill="#f4a51c"/><circle cx="86" cy="8" r="3.5" fill="#f4a51c"/>
    <ellipse cx="58" cy="52" rx="24" ry="22" fill="#d24433"/>
    <circle cx="49" cy="48" r="6.5" fill="#fff"/><circle cx="68" cy="48" r="6.5" fill="#fff"/><circle cx="50" cy="49" r="3.6" fill="#15202a"/><circle cx="69" cy="49" r="3.6" fill="#15202a"/><circle cx="51.3" cy="47.6" r="1.2" fill="#fff"/><circle cx="70.3" cy="47.6" r="1.2" fill="#fff"/>
    <rect x="42" y="40" width="34" height="0" fill="#d24433"><animate attributeName="height" values="0;0;0;14;0" keyTimes="0;.82;.9;.95;1" dur="4.2s" repeatCount="indefinite"/></rect>
    <path d="M50 62 Q58 68 66 62" stroke="#3a0d08" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <circle cx="42" cy="58" r="3.4" fill="#ff9aa8" opacity=".6"/><circle cx="74" cy="58" r="3.4" fill="#ff9aa8" opacity=".6"/></g>
  <path d="M40 72 Q58 82 78 72 L80 78 Q58 88 38 78Z" fill="#f2d35b" stroke="#a88a1c" stroke-width="1"/>
  <path d="M44 74v4 M50 76v5 M56 77v4 M62 77v5 M68 76v4 M74 74v4" stroke="#2a2418" stroke-width="1"/>
  <path d="M76 76 L84 92 L90 90 L80 74Z" fill="#f2d35b" stroke="#a88a1c" stroke-width="1"/>
</svg>`;

/* =========================================================================================
   3D SIMULATIONS (WebGL via make3D, drag to turn)
   ========================================================================================= */
const m3lerp = (a, b, k) => a + (b - a) * k;

/* ---------- 3D-1. k7m3_zoom3d — Chinti's magnifier: a 0–10 measuring rod, and below it rods that magnify
   one part ten times each, down to thousandths. A glowing bead marks x.
   params: x, lv (rods shown 1–4)   readouts: val, path   parts: "box", "mark" ---------- */
SIM_DEF.k7m3_zoom3d = {
  def: { x: 4.185, lv: 4 },
  rng: { lv: () => [1, 4, 1] },
  lab: { lv: "Zoom levels" },
  reads: { val: "The number", path: "Zoom path" },
  readouts(P) { const Z = m3zoom(P.x), steps = [Z.L[0].k, ...Z.L.slice(1).map(L => m3s((L.st + L.k * L.p) / 1000, 3))]; return { val: m3s(Z.X / 1000, 3), path: [...new Set(steps.map(String))].join(" → ") }; },
  init(stage, I) {
    const g = make3D(stage, { height: 320, dist: 9.5, phi: 1.3, theta: 0.12, auto: 0, target: [0, -1, 0.9], hint: "Drag to turn Chinti's magnifier" });
    if (!g) return null;
    const { THREE, root } = g;
    const RL = 8, rodG = new THREE.BoxGeometry(RL, 0.26, 0.6), tickG = new THREE.BoxGeometry(0.04, 0.3, 0.06);
    const rodCols = [0xc89b5a, 0x62b6e8, 0x35c29a, 0xf4a51c], tickM = new THREE.MeshStandardMaterial({ color: 0x1d160a });
    const rods = [];
    for (let i = 0; i < 4; i++) {
      const grp = new THREE.Group(); grp.position.set(0, 1.2 - i * 1.45, i * 0.7); root.add(grp);
      const rod = new THREE.Mesh(rodG, new THREE.MeshStandardMaterial({ color: rodCols[i], roughness: .55, metalness: .05 })); grp.add(rod);
      for (let k = 0; k <= 10; k++) { const tk = new THREE.Mesh(tickG, tickM); tk.position.set(-RL / 2 + RL * k / 10, 0.2, 0.2); tk.scale.y = k % 5 ? 0.8 : 1.5; grp.add(tk); }
      const boxM = new THREE.MeshBasicMaterial({ color: 0xffd166, transparent: true, opacity: .35 }), box = new THREE.Mesh(new THREE.BoxGeometry(RL / 10, 0.5, 0.75), boxM); box.position.y = 0.05; grp.add(box);
      const lA = g.label("", [0, 0, 0], "plain"), lB = g.label("", [0, 0, 0], "plain");
      const lineM = new THREE.LineBasicMaterial({ color: 0xffd166, transparent: true, opacity: .55 }), lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]);
      const lines = new THREE.LineSegments(lg, lineM); root.add(lines);
      rods.push({ grp, box, boxM, lA, lB, lines, s: 0.01, ts: 0 });
    }
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 14), new THREE.MeshStandardMaterial({ color: 0xe04a86, emissive: 0xe04a86, emissiveIntensity: .7 })); root.add(bead);
    const lVal = g.label("", [0, 0, 0], "big");
    const st = { hl: null, bx: 0, by: 0, bz: 0 };
    g.onFrame((t, dt) => {
      const k = Math.min(1, dt * 7);
      rods.forEach((r, i) => { r.s = m3lerp(r.s, r.ts, k); r.grp.scale.set(Math.max(.01, r.s), Math.max(.01, r.s), Math.max(.01, r.s)); r.grp.visible = r.s > .03; r.lines.visible = r.grp.visible && rods[i + 1] && rods[i + 1].s > .5; r.boxM.opacity = st.hl === "box" ? .35 + .25 * Math.sin(t * 8) : .35; });
      bead.position.set(st.bx, st.by + 0.28 + 0.06 * Math.sin(t * 3), st.bz + 0.1); bead.scale.setScalar(st.hl === "mark" ? 1.4 + .3 * Math.sin(t * 8) : 1);
    });
    function apply(D, P, sh, hl) {
      st.hl = hl; const Z = m3zoom(P.x), lv = Math.round(clampN(m3n(P.lv), 1, 4));
      rods.forEach((r, i) => {
        const L = Z.L[i], on = i < lv; r.ts = on ? 1 : 0;
        r.lA.set(m3s(L.st / 1000, 3)); r.lB.set(m3s((L.st + L.W) / 1000, 3)); r.lA.show(on); r.lB.show(on);
        const y = 1.2 - i * 1.45, z = i * 0.7; r.lA.move([-RL / 2, y - 0.45, z + 0.4]); r.lB.move([RL / 2, y - 0.45, z + 0.4]);
        const bxp = -RL / 2 + RL * (L.k + .5) / 10; r.box.position.x = bxp; r.box.visible = on && i < lv - 1;
        if (i < 3) { const p = r.lines.geometry.attributes.position, y2 = 1.2 - (i + 1) * 1.45, z2 = (i + 1) * 0.7;
          p.setXYZ(0, bxp - RL / 20, y - 0.25, z); p.setXYZ(1, -RL / 2, y2 + 0.15, z2); p.setXYZ(2, bxp + RL / 20, y - 0.25, z); p.setXYZ(3, RL / 2, y2 + 0.15, z2); p.needsUpdate = true; }
      });
      const L = Z.L[lv - 1]; st.bx = -RL / 2 + RL * (Z.X - L.st) / L.W; st.by = 1.2 - (lv - 1) * 1.45; st.bz = (lv - 1) * 0.7;
      lVal.move([st.bx, st.by + 0.9, st.bz]); lVal.set(sh.has("val") ? (lv === 4 ? m3s(Z.X / 1000, 3) : m3s(lv === 1 ? Z.L[0].k : (L.st + L.k * L.p) / 1000, 3) + " …") : "?");
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

})();
