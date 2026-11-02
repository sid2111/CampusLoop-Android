(function(){
/* Grade 7 Chapter 5 — Parallel and Intersecting Lines
   Plugin: simulations (k7m5_*), the Pochampally handloom scene, and Gilli the striped palm squirrel guide. */

/* ---------- private helpers (screen coords, angles in math degrees, counter-clockwise) ---------- */
const m5R = d => d * Math.PI / 180;
const m5hl = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const m5dir = a => [Math.cos(m5R(a)), -Math.sin(m5R(a))];
const m5pt = (v, a, r) => [v[0] + r * Math.cos(m5R(a)), v[1] - r * Math.sin(m5R(a))];
const m5add = (p, d, s) => [p[0] + d[0] * s, p[1] + d[1] * s];
const m5f = v => (+v).toFixed(1);
const m5n = v => fmtN(Math.round(v * 10) / 10);
const m5list = s => (s == null || s === "" || s === "none") ? [] : String(s).split(",").map(x => x.trim()).filter(x => x !== "");
const m5map = s => { const o = {}; String(s || "").split(";").forEach(kv => { const i = kv.indexOf("="); if (i > 0) o[kv.slice(0, i).trim()] = kv.slice(i + 1); }); return o; };
function m5clip(p, a, box = [8, 8, 412, 242]) {
  const d = m5dir(a); let t0 = -1e9, t1 = 1e9;
  [[0, box[0], box[2]], [1, box[1], box[3]]].forEach(([k, lo, hi]) => {
    if (Math.abs(d[k]) < 1e-9) { if (p[k] < lo || p[k] > hi) { t0 = 1; t1 = 0; } return; }
    const u = (lo - p[k]) / d[k], w = (hi - p[k]) / d[k]; t0 = Math.max(t0, Math.min(u, w)); t1 = Math.min(t1, Math.max(u, w));
  });
  return [m5add(p, d, t0), m5add(p, d, t1)];
}
function m5X(p1, a1, p2, a2) { // intersection of two lines (point + direction)
  const d1 = m5dir(a1), d2 = m5dir(a2), den = d1[0] * d2[1] - d1[1] * d2[0];
  if (Math.abs(den) < 1e-9) return null;
  const s = ((p2[0] - p1[0]) * d2[1] - (p2[1] - p1[1]) * d2[0]) / den; return m5add(p1, d1, s);
}
const m5seg = (p, q, col = "var(--ink)", w = 2.6, extra = "") => `<line x1="${m5f(p[0])}" y1="${m5f(p[1])}" x2="${m5f(q[0])}" y2="${m5f(q[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${extra}/>`;
function m5chev(p, a, n = 1, col = "var(--ink)") {
  let s = ""; const d = m5dir(a), nn = m5dir(a + 90);
  for (let k = 0; k < n; k++) { const c = m5add(p, d, k * 7), tip = m5add(c, d, 5), w1 = m5add(m5add(c, d, -4), nn, 5), w2 = m5add(m5add(c, d, -4), nn, -5);
    s += `<path d="M${m5f(w1[0])} ${m5f(w1[1])} L${m5f(tip[0])} ${m5f(tip[1])} L${m5f(w2[0])} ${m5f(w2[1])}" stroke="${col}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`; }
  return s;
}
/* angle mark at v from direction a1 turning span degrees counter-clockwise; returns svg + label position */
function m5arc(v, a1, span, r, o = {}) {
  span = ((span % 360) + 360) % 360; const col = o.col || "var(--mari)", ex = o.extra || "";
  let s = "";
  if (o.fill) { const p0 = m5pt(v, a1, r), p1 = m5pt(v, a1 + span, r); s += `<path d="M${m5f(v[0])} ${m5f(v[1])} L${m5f(p0[0])} ${m5f(p0[1])} A${r} ${r} 0 ${span > 180 ? 1 : 0} 0 ${m5f(p1[0])} ${m5f(p1[1])} Z" fill="${col}" fill-opacity=".22" stroke="none"/>`; }
  if (Math.abs(span - 90) < 0.6 && o.sq !== false) {
    const q = r * 0.62, p0 = m5pt(v, a1, q), p2 = m5pt(v, a1 + 90, q), p1 = m5add(p0, m5dir(a1 + 90), q);
    s += `<path d="M${m5f(p0[0])} ${m5f(p0[1])} L${m5f(p1[0])} ${m5f(p1[1])} L${m5f(p2[0])} ${m5f(p2[1])}" stroke="${col}" stroke-width="2.2" fill="none"${ex}/>`;
  } else {
    const p0 = m5pt(v, a1, r), p1 = m5pt(v, a1 + span, r);
    s += `<path d="M${m5f(p0[0])} ${m5f(p0[1])} A${r} ${r} 0 ${span > 180 ? 1 : 0} 0 ${m5f(p1[0])} ${m5f(p1[1])}" stroke="${col}" stroke-width="${o.w || 2.5}" fill="none"${ex}/>`;
  }
  const lr = r + (o.lr != null ? o.lr : (span < 40 ? 20 : 14)), lp = m5pt(v, a1 + span / 2, lr);
  if (o.txt) s += T(m5f(lp[0]), m5f(lp[1] + 5), o.txt, { size: o.size || 13, fill: o.tcol || col });
  return s;
}
const m5dot = (p, name, dx = 0, dy = -10, col = "var(--ink)") => `<circle cx="${m5f(p[0])}" cy="${m5f(p[1])}" r="3.6" fill="var(--rani)"/>` + (name ? T(m5f(p[0] + dx), m5f(p[1] + dy), name, { size: 13, fill: col }) : "");

/* =========================================================
   1. k7m5_cross — two intersecting lines l and m; four angles a (above-left), b, c, d (clockwise)
   params: a (∠a), rot (turn of l), nm (4 names), vals ("all" | list of 0–3), q (list shown as ?), thick, err (protractor readings), arcs
   parts: "l", "m", "lin", "vop"
   ========================================================= */
SIM_DEF.k7m5_cross = {
  def: { a: 120, rot: 0, nm: "a,b,c,d", vals: "none", q: "", thick: 2.6, err: 0, cap: "" },
  rng: { a: () => [10, 170, 1], rot: () => [-60, 60, 5] },
  lab: { a: "Angle a (°)", rot: "Turn the lines" },
  reads: { vals: "Angles", lin: "Linear pairs", vop: "Vertically opposite", meas: "Protractor readings" },
  draw(D, P, sh, hl) {
    const a = clampN(D.a, 1, 179), rho = D.rot, beta = 180 - a, C = [210, 122], nm = m5list(P.nm);
    const A = Math.round(P.a), vals = [A, 180 - A, A, 180 - A];
    const showAll = P.vals === "all", vl = m5list(P.vals).map(Number), ql = m5list(P.q).map(Number);
    let s = `<svg viewBox="0 0 420 250">`;
    if (P.cap) s += T(210, 20, P.cap, { size: 12.5, fill: "var(--muted)" });
    const L = m5clip(C, rho, [20, 30, 400, 240]), M = m5clip(C, rho + beta, [20, 30, 400, 240]);
    s += `<g${m5hl(hl, "l")}>${m5seg(L[0], L[1], "var(--sky)", P.thick)}</g><g${m5hl(hl, "m")}>${m5seg(M[0], M[1], "var(--teal)", P.thick)}</g>`;
    s += T(m5f(L[1][0] - 8), m5f(L[1][1] - 10), "l", { size: 15, fill: "var(--sky)" }) + T(m5f(M[1][0] + 10), m5f(M[1][1] + 6), "m", { size: 15, fill: "var(--teal)" });
    const marks = [[rho + beta, a], [rho, beta], [rho + beta + 180, a], [rho + 180, beta]]; // AL, AR, BR, BL
    marks.forEach(([st, sp], i) => {
      const inLin = hl === "lin" && (i === 0 || i === 1), inVop = hl === "vop" && (i === 0 || i === 2);
      const col = (i % 2 ? "var(--mari)" : "var(--rani)");
      const txt = ql.includes(i) ? `${nm[i] || ""} = ?` : (showAll || vl.includes(i)) ? (nm[i] ? `${nm[i]} = ${vals[i]}°` : `${vals[i]}°`) : (nm[i] || "");
      s += `<g${(inLin || inVop) ? ' class="hl"' : ""}>${m5arc(C, st, sp, 24 + (i % 2) * 6, { col, txt, fill: inLin || inVop, lr: sp < 75 ? 40 : 22 })}</g>`;
    });
    s += `<circle cx="${C[0]}" cy="${C[1]}" r="3.5" fill="var(--ink)"/></svg>`;
    const n = i => "∠" + (nm[i] || ["a", "b", "c", "d"][i]);
    const e1 = P.err ? 2 : 0, e2 = P.err ? -3 : 0;
    return { svg: s, reads: {
      vals: `${n(0)} = ${vals[0]}°, ${n(1)} = ${vals[1]}°, ${n(2)} = ${vals[2]}°, ${n(3)} = ${vals[3]}°`,
      lin: `${n(0)} + ${n(1)} = ${vals[0]}° + ${vals[1]}° = 180°`,
      vop: `${n(0)} = ${n(2)} = ${vals[0]}°, ${n(1)} = ${n(3)} = ${vals[1]}°`,
      meas: `${n(0)} ≈ ${vals[0] + e1}°, ${n(1)} ≈ ${vals[1] + e2}° → sum ≈ ${180 + e1 + e2}° (thick lines, protractor slips)` } };
  }
};

/* =========================================================
   2. k7m5_trans — lines l and m cut by transversal t; 8 angles.
   Index: 0 above-left, 1 above-right, 2 below-right, 3 below-left at l; 4–7 the same at m (textbook Fig 5.14 order).
   params: A (∠ between l and t, at index 1), dm (tilt of m; 0 = parallel), rot, nm (8 names), vals ("all"|list),
           mark ("all"|list), hi, hi2 (highlight lists), lab ("i=text;…"), arrows (auto|1|0), hideM, pts
   parts: "l", "m", "t", "pair"
   ========================================================= */
const m5tv = (A, dm) => { const B = A - dm; return [180 - A, A, 180 - A, A, 180 - B, B, 180 - B, B]; };
SIM_DEF.k7m5_trans = {
  def: { A: 60, dm: 0, rot: 0, nm: "1,2,3,4,5,6,7,8", vals: "none", mark: "all", hi: "", hi2: "", lab: "", arrows: "auto", hideM: 0, pts: 0, cap: "" },
  rng: { A: () => [20, 160, 1], dm: () => [-30, 30, 1], rot: () => [-60, 60, 5] },
  lab: { A: "Angle between t and l (°)", dm: "Tilt line m (°)", rot: "Turn the picture" },
  reads: { vals: "Angles", corr: "Corresponding", alt: "Alternate", int: "Interior, same side", par: "Parallel?" },
  draw(D, P, sh, hl) {
    const A = clampN(D.A, 5, 175), dm = D.dm, rho = D.rot, C = [210, 128];
    const h = Math.min(92, 50 / Math.sin(m5R(A))), X = m5add(C, m5dir(rho + A), h), Y = m5add(C, m5dir(rho + A), -h);
    const nm = m5list(P.nm), V = m5tv(Math.round(P.A), Math.round(P.dm)), lab = m5map(P.lab);
    const vl = P.vals === "all" ? [0, 1, 2, 3, 4, 5, 6, 7] : m5list(P.vals).map(Number);
    const mk = P.mark === "all" ? [0, 1, 2, 3, 4, 5, 6, 7] : m5list(P.mark).map(Number), hi = m5list(P.hi).map(Number), hi2 = m5list(P.hi2).map(Number);
    let s = `<svg viewBox="0 0 420 250">`;
    if (P.cap) s += T(210, 18, P.cap, { size: 12.5, fill: "var(--muted)" });
    const L = m5clip(X, rho), Tt = m5clip(C, rho + A), M = m5clip(Y, rho + dm);
    s += `<g${m5hl(hl, "t")}>${m5seg(Tt[0], Tt[1], "var(--ink)", 2.6)}</g>`;
    s += `<g${m5hl(hl, "l")}>${m5seg(L[0], L[1], "var(--sky)", 3)}</g>`;
    if (!P.hideM) s += `<g${m5hl(hl, "m")}>${m5seg(M[0], M[1], "var(--teal)", 3)}</g>`;
    const par = P.arrows === 1 || P.arrows === "1" || (P.arrows === "auto" && Math.abs(P.dm) < 0.01);
    if (par && !P.hideM) { s += m5chev(m5add(L[0], m5dir(rho), 0.78 * Math.hypot(L[1][0] - L[0][0], L[1][1] - L[0][1])), rho, 1, "var(--sky)"); s += m5chev(m5add(M[0], m5dir(rho + dm), 0.78 * Math.hypot(M[1][0] - M[0][0], M[1][1] - M[0][1])), rho + dm, 1, "var(--teal)"); }
    const nmAt = (seg, col, txt, up) => T(m5f(seg[1][0] - 10), m5f(seg[1][1] + (up ? -9 : 17)), txt, { size: 15, fill: col });
    s += nmAt(L, "var(--sky)", "l", true) + (P.hideM ? "" : nmAt(M, "var(--teal)", "m", false));
    const tl = Tt[0][1] > Tt[1][1] ? Tt[0] : Tt[1]; s += T(m5f(tl[0] + 12), m5f(Math.min(tl[1], 240) - 4), "t", { size: 15 });
    if (!P.hideM && Math.abs(dm) > 0.5 && sh.has("par")) { const Z = m5X(X, rho, Y, rho + dm); if (Z && Z[0] > 10 && Z[0] < 410 && Z[1] > 10 && Z[1] < 240) s += `<circle cx="${m5f(Z[0])}" cy="${m5f(Z[1])}" r="7" fill="none" stroke="var(--red)" stroke-width="2.5"/>` + T(m5f(clampN(Z[0], 50, 370)), m5f(Z[1] > 40 ? Z[1] - 14 : Z[1] + 24), "l and m meet!", { size: 12, fill: "var(--red)" }); }
    const B = A - dm, arcs = [[rho + A, 180 - A], [rho, A], [rho + A + 180, 180 - A], [rho + 180, A], [rho + A, 180 - B], [rho + dm, B], [rho + A + 180, 180 - B], [rho + dm + 180, B]];
    arcs.forEach(([st, sp], i) => {
      if (!mk.includes(i) || (P.hideM && i > 3)) return;
      const v = i < 4 ? X : Y, isH = hi.includes(i), isH2 = hi2.includes(i);
      const col = isH ? "var(--rani)" : isH2 ? "var(--teal)" : "var(--mari)";
      const txt = lab[i] != null ? lab[i] : vl.includes(i) ? `${V[i]}°` : (nm[i] || "");
      s += `<g${(isH || isH2) ? m5hl(hl, "pair") : ""}>${m5arc(v, st, sp, isH || isH2 ? 22 : 17, { col, txt, fill: isH || isH2, lr: sp < 45 ? 22 : 13, size: 12.5 })}</g>`;
    });
    if (P.pts) { s += m5dot(X, "X", -14, -8); if (P.pts > 1 || P.hideM) s += m5dot(Y, "Y", -14, -8); }
    s += `</svg>`;
    const n = i => "∠" + (nm[i] || i + 1), eq = Math.abs(P.dm) < 0.01;
    return { svg: s, reads: {
      vals: `at l: ${n(0)} = ${n(2)} = ${V[0]}°, ${n(1)} = ${n(3)} = ${V[1]}° · at m: ${n(4)} = ${n(6)} = ${V[4]}°, ${n(5)} = ${n(7)} = ${V[5]}°`,
      corr: `${n(1)} = ${V[1]}° and ${n(5)} = ${V[5]}°: ${eq ? "equal" : "not equal"}`,
      alt: `${n(3)} = ${V[3]}° and ${n(5)} = ${V[5]}°: ${eq ? "equal" : "not equal"}`,
      int: `${n(2)} + ${n(5)} = ${V[2]}° + ${V[5]}° = ${V[2] + V[5]}°`,
      par: eq ? "Yes: corresponding angles are equal, so l ∥ m" : `No: corresponding angles differ by ${Math.abs(Math.round(P.dm))}°, so l and m meet` } };
  }
};

/* =========================================================
   3. k7m5_fig — textbook figures drawn to true angles, with step-by-step reveal (step).
   fig: f55 f513 f529 f530e f530i f530j f531a f531b f531c f531d f532a f532b f533 f534 f535 hering vhering zollner
   arcs carry k (first step shown), only (shown only on that step), q (shows qt until step >= q)
   ========================================================= */
const M5LN = (p, a, o = {}) => Object.assign({ p, a }, o);
const M5FIG = {
  f55: { n: 1, b(P) {
      const F = [60, 200], H = m5pt(F, 10.3, 56), G = m5pt(F, 10.3 - 115.3, 36);
      const segs = [["S", [30, 62], "T", [130, 30]], ["U", [34, 85], "V", [150, 40]], ["O", [300, 45], "P", [380, 80]], ["Q", [250, 64], "R", [392, 140]], ["A", [112, 178], "B", [200, 100]], ["C", [135, 118], "D", [195, 148]], ["I", [238, 150], "J", [300, 200]], ["L", [330, 150], "M", [252, 228]], ["F", F, "H", H], ["F", F, "G", G]];
      return { segs, ext: P.step >= 1 ? [[0, 1], [2, 3]] : [], arcs: [{ v: F, a1: 10.3 - 115.3, sp: 115.3, txt: "115.3°" }] };
    }, R: P => P.step < 1 ? { ans: "FG and FH meet at the endpoint F at 115.3°. AB and CD intersect at X; IJ and LM intersect at Y.", why: "Look for: a point, an endpoint, the midpoint, meet, intersect." } : { ans: "Extended, ST and UV close in towards the right; OP and QR close in towards the left.", why: "Lines that look almost parallel may still meet far away. Looking is not enough!" } },
  f513: { n: 2, b(P) {
      const Pp = [150, 40], Z = [214, 205], ta = Math.atan2(-(Z[1] - Pp[1]), Z[0] - Pp[0]) * 180 / Math.PI;
      const A0 = m5pt(Z, 148, 115), cE = m5pt(Pp, -32, 150), bE = m5pt(Pp, -24, 175);
      const at = ((ta % 360) + 360) % 360, ca = (328 - at + 360) % 360, cb = (336 - at + 360) % 360;
      return { segs: [["", A0, "", Z, "var(--sky)", "a"], ["", Pp, "", cE, "var(--teal)", "c"], ["", Pp, "", bE, "var(--mari)", "b"], ["", Pp, "", Z, "var(--muted)", "", " stroke-dasharray=\"5 4\""]],
        arcs: [{ v: Z, a1: at, sp: ca, txt: m5n(ca) + "°", k: 1, col: "var(--sky)" }, { v: Pp, a1: at, sp: ca, txt: m5n(ca) + "°", k: 1, col: "var(--teal)", r: 30 }, { v: Pp, a1: at, sp: cb, txt: m5n(cb) + "°", k: 2, col: "var(--mari)", r: 52 }] };
    }, R: P => [{ ans: "Which line is parallel to a: b or c?", why: "Join an end of a to the start of b and c: this transversal lets us compare angles." }, { ans: "a and c make equal corresponding angles with the dashed transversal.", why: "Equal corresponding angles → c ∥ a." }, { ans: "b makes a bigger angle, so b is not parallel to a. Answer: c.", why: "Corresponding angles not equal → the lines meet." }][P.step] },
  f529: { n: 4, b(P) {
      const D = [80, 200], C = [260, 200], A = [161.3, 59.1], B = [341.3, 59.1];
      return { segs: [["", A, "", B], ["", B, "", C], ["", D, "", C], ["", A, "", D], ["", A, "", C, "var(--muted)"]], dots: [A, B, C, D], names: [[A, "A", -6, -10], [B, "B", 6, -10], [C, "C", 8, 18], [D, "D", -8, 18]],
        chev: [[[251, 59.1], 0, 1], [[170, 200], 0, 1], [m5pt(D, 60, 80), 60, 2], [m5pt(C, 60, 80), 60, 2]],
        arcs: [{ v: D, a1: 0, sp: 60, txt: "60°" }, { v: A, a1: 240, sp: 65, txt: "65°", r: 26 }, { v: A, a1: 240, sp: 120, txt: "120°", only: 1, col: "var(--teal)", r: 46 }, { v: A, a1: 305, sp: 55, txt: "55°", k: 2, col: "var(--rani)" },
          { v: C, a1: 60, sp: 120, txt: "120°", k: 3, col: "var(--rani)" }, { v: B, a1: 180, sp: 60, txt: "60°", k: 4, col: "var(--rani)" }] };
    }, R: P => [{ ans: "Find ∠CAB, ∠ABC and ∠BCD", why: "AB ∥ CD and AD ∥ BC; ∠DAC = 65°, ∠ADC = 60°." }, { ans: "∠DAB = 180° − 60° = 120°", why: "AD cuts AB ∥ CD: interior angles on the same side add to 180°." }, { ans: "∠CAB = 120° − 65° = 55°", why: "∠DAB = ∠DAC + ∠CAB" }, { ans: "∠BCD = 180° − 60° = 120°", why: "CD cuts AD ∥ BC: ∠ADC + ∠BCD = 180°." }, { ans: "∠ABC = 180° − 120° = 60°", why: "BC cuts AB ∥ CD: ∠ABC + ∠BCD = 180°." }][P.step] },
  f530e: { n: 1, b(P) {
      const l0 = [210, 90], m0 = [210, 180], P1 = m5X(m0, 10, [120, 0], 90), P2 = m5X(m0, 10, [300, 0], 90), Q2 = m5X(l0, 10, P2, 121);
      return { lines: [M5LN(l0, 10, { arr: 1 }), M5LN(m0, 10, { arr: 1 }), M5LN(P1, 93, { col: "var(--muted)" }), M5LN(P2, 121, { col: "var(--muted)" })],
        arcs: [{ v: P1, a1: 93, sp: 97, txt: "97°" }, { v: P1, a1: 10, sp: 83, txt: "83°", r: 24 }, { v: P2, a1: 121, sp: 69, txt: "69°" }, { v: Q2, a1: 301, sp: 69, txt: "69°", q: 1, qt: "e°", col: "var(--rani)" }] };
    }, R: P => P.step < 1 ? { ans: "e = ?", why: "97° + 83° = 180° is just a linear pair on the left transversal." } : { ans: "e = 69°", why: "e and 69° are alternate angles: the right transversal cuts the parallel lines." } },
  f530i: { n: 1, b(P) {
      const Lp = [120, 205], Vv = [250, 205], Pp = m5X(Lp, 56, Vv, 110);
      return { lines: [M5LN([210, 205], 0)], segs: [["", Lp, "", m5pt(Lp, 56, 190), "var(--ink)"], ["", Vv, "", m5pt(Vv, 56, 175), "var(--ink)"], ["", Vv, "", m5pt(Pp, 110, 30), "var(--muted)"]],
        chev: [[m5pt(Lp, 56, 70), 56, 1], [m5pt(Vv, 56, 70), 56, 1]],
        arcs: [{ v: Vv, a1: 110, sp: 70, txt: "70°", r: 20 }, { v: Vv, a1: 56, sp: 54, txt: "54°", r: 30 }, { v: Vv, a1: 0, sp: 56, txt: "56°", r: 20 }, { v: Pp, a1: 236, sp: 54, txt: "54°", q: 1, qt: "i°", col: "var(--rani)" }] };
    }, R: P => P.step < 1 ? { ans: "i = ?", why: "70° + 54° + 56° = 180°: a straight angle at the bottom point." } : { ans: "i = 54°", why: "i and 54° are alternate angles: the slanting line is a transversal of the two parallel lines." } },
  f530j: { n: 1, b(P) {
      const O = [34, 58], Q = [110, 210, 310].map(d => m5pt(O, -23, d)), U = Q.map(q => m5X(q, 60, O, 4));
      const segs = Q.map((q, i) => ["", m5pt(q, 240, 32), "", m5pt(U[i], 60, 32), "var(--ink)"]);
      segs.push(["", O, "", m5pt(O, -23, 370), "var(--muted)"], ["", O, "", m5pt(O, 4, 390), "var(--muted)"]);
      return { segs, chev: U.map(u => [m5pt(u, 60, 18), 60, 1]),
        arcs: [{ v: O, a1: -23, sp: 27, txt: "27°", r: 34 }, { v: Q[0], a1: 240, sp: 97, txt: "97°" }, { v: U[2], a1: 240, sp: 124, txt: "124°" }, { v: Q[2], a1: 60, sp: 97, txt: "97°", q: 1, qt: "j°", col: "var(--rani)" }] };
    }, R: P => P.step < 1 ? { ans: "j = ?", why: "Three parallel lines; follow the lower transversal." } : { ans: "j = 97°", why: "j is vertically opposite the angle that corresponds to 97° at the first line." } },
  f531a: { n: 1, b(P) {
      const l0 = [210, 85], m0 = [210, 165], T1 = [75, 165], T2 = [190, 165], Z = m5X(l0, 0, T2, 42);
      return { lines: [M5LN(l0, 0, { arr: 1 }), M5LN(m0, 0, { arr: 1 }), M5LN(T1, 100, { col: "var(--muted)" }), M5LN(T2, 42, { col: "var(--muted)" })],
        arcs: [{ v: T1, a1: 0, sp: 100, txt: "100°" }, { v: Z, a1: 0, sp: 42, txt: "42°" }, { v: Z, a1: 42, sp: 138, txt: "138°", k: 1, col: "var(--teal)", r: 26 }, { v: T2, a1: 42, sp: 138, txt: "138°", q: 1, qt: "a°", col: "var(--rani)" }] };
    }, R: P => P.step < 1 ? { ans: "a = ?", why: "The 100° belongs to the other transversal. Use the 42°." } : { ans: "a = 180° − 42° = 138°", why: "At the top line, 180° − 42° = 138° (linear pair); a is its corresponding angle." } },
  f531b: { n: 1, b(P) {
      const l0 = [210, 72], m0 = [210, 168], T1 = m5X(m0, -8, [150, 0], 90), T2 = m5X(l0, -8, [265, 0], 90);
      return { lines: [M5LN(l0, -8, { arr: 1 }), M5LN(m0, -8, { arr: 1 }), M5LN(T1, 110, { arr: 2, col: "var(--muted)" }), M5LN(T2, 110, { arr: 2, col: "var(--muted)" })],
        arcs: [{ v: T2, a1: 290, sp: 62, txt: "62°" }, { v: T1, a1: 172, sp: 118, txt: "118°", q: 1, qt: "a°", col: "var(--rani)" }] };
    }, R: P => P.step < 1 ? { ans: "a = ?", why: "Single arrows: one parallel pair. Double arrows: another parallel pair." } : { ans: "a = 180° − 62° = 118°", why: "62° copies down and across as corresponding angles; a forms a linear pair with the copy." } },
  f531c: { n: 2, b(P) {
      const Pp = [150, 60], Vv = m5X([0, 125], 0, Pp, 110), W = m5X([0, 195], 0, Vv, 75);
      return { lines: [M5LN([210, 60], 0, { arr: 1 }), M5LN([210, 125], 0, { arr: 1 }), M5LN([210, 195], 0, { arr: 1 })], segs: [["", m5pt(Pp, 110, 32), "", Vv, "var(--muted)"], ["", m5pt(W, 255, 35), "", m5pt(Vv, 75, 175), "var(--muted)"]],
        arcs: [{ v: Pp, a1: 0, sp: 110, txt: "110°" }, { v: Vv, a1: 75, sp: 35, txt: "35°", r: 30 }, { v: Vv, a1: 110, sp: 70, txt: "70°", k: 1, col: "var(--teal)", r: 20 }, { v: W, a1: 75, sp: 105, txt: "105°", q: 2, qt: "a°", col: "var(--rani)" }] };
    }, R: P => [{ ans: "a = ?", why: "Three parallel lines. Work at the point V on the middle line." }, { ans: "At V: 180° − 110° = 70°", why: "Alternate angle of the 70° below the top line (110° + 70° = 180°)." }, { ans: "a = 70° + 35° = 105°", why: "The right line makes 105° with the middle line; a is the corresponding angle on the bottom line." }][P.step] },
  f531d: { n: 2, b(P) {
      const Ff = [200, 210], Rr = [262, 210], Lb = [100, 210], Q = m5X(Ff, 90, Rr, 113);
      return { lines: [M5LN([210, 210], 0)], segs: [["", Ff, "", [200, 22], "var(--muted)"], ["", Lb, "", m5pt(Lb, 113, 190), "var(--ink)"], ["", Rr, "", m5pt(Rr, 113, 185), "var(--ink)"], ["", m5pt(Q, 180, 60), "", m5pt(Q, 0, 90), "var(--teal)", "", P.step >= 2 ? ' stroke-dasharray="5 4"' : ' stroke-opacity="0"']],
        chev: [[m5pt(Lb, 113, 100), 113, 1], [m5pt(Rr, 113, 60), 113, 1]],
        arcs: [{ v: Lb, a1: 113, sp: 67, txt: "67°" }, { v: Ff, a1: 0, sp: 90, txt: "" }, { v: Rr, a1: 113, sp: 67, txt: "67°", k: 1, col: "var(--teal)" }, { v: Q, a1: 293, sp: 67, txt: "67°", k: 2, col: "var(--teal)", r: 30 }, { v: Q, a1: 270, sp: 23, txt: "23°", q: 2, qt: "a°", col: "var(--rani)", r: 46 }] };
    }, R: P => [{ ans: "a = ?", why: "The two slanting lines are parallel; one line stands at 90° on the base." }, { ans: "The right line also makes 67° with the base", why: "Corresponding angles on parallel lines." }, { ans: "a = 90° − 67° = 23°", why: "Draw a line through the top point parallel to the base: 67° there (alternate), and the vertical makes 90° with it." }][P.step] },
  f532a: { n: 3, b(P) {
      const Ww = [120, 170], Z = m5X([0, 80], 0, Ww, 25);
      return { lines: [M5LN([210, 80], 0, { arr: 1 }), M5LN([210, 170], 0, { arr: 1 }), M5LN([120, 125], 90, { col: "var(--muted)" })], segs: [["", m5pt(Ww, 205, 60), "", m5pt(Z, 25, 70), "var(--muted)"]],
        arcs: [{ v: [120, 80], a1: 0, sp: 90, txt: "" }, { v: Ww, a1: 25, sp: 65, txt: "65°", r: 26 }, { v: Ww, a1: 0, sp: 25, txt: "25°", k: 1, col: "var(--teal)", r: 46 }, { v: Ww, a1: 180, sp: 25, txt: "25°", q: 2, qt: "x°", col: "var(--rani)", r: 26 }, { v: Z, a1: 205, sp: 155, txt: "155°", q: 3, qt: "y°", col: "var(--rani)" }] };
    }, R: P => [{ ans: "x = ?, y = ?", why: "The vertical line is perpendicular to both parallel lines." }, { ans: "Slant with bottom line: 90° − 65° = 25°", why: "The vertical makes 90° with the bottom line." }, { ans: "x = 25°", why: "Vertically opposite angles are equal." }, { ans: "y = 180° − 25° = 155°", why: "The slant makes 25° with the top line too (corresponding); y is its linear pair." }][P.step] },
  f532b: { n: 2, b(P) {
      const Pp = [230, 80], A1 = m5X([0, 180], 0, Pp, 53), A2 = m5X([0, 180], 0, Pp, 78);
      return { lines: [M5LN([210, 80], 0, { arr: 1 }), M5LN([210, 180], 0, { arr: 1 })], segs: [["", m5pt(A1, 233, 40), "", m5pt(Pp, 53, 75), "var(--muted)"], ["", m5pt(A2, 258, 45), "", m5pt(Pp, 78, 70), "var(--muted)"]],
        arcs: [{ v: A1, a1: 0, sp: 53, txt: "53°" }, { v: A2, a1: 0, sp: 78, txt: "78°" }, { v: Pp, a1: 0, sp: 53, txt: "53°", k: 1, col: "var(--teal)", r: 24 }, { v: Pp, a1: 53, sp: 25, txt: "25°", q: 2, qt: "x°", col: "var(--rani)", r: 46 }] };
    }, R: P => [{ ans: "x = ?", why: "Both lines pass through one point P on the top line." }, { ans: "At P: line 1 makes 53°, line 2 makes 78° with the top line", why: "Corresponding angles of the bottom ones." }, { ans: "x = 78° − 53° = 25°", why: "x is the gap between the two lines." }][P.step] },
  f533: { n: 3, b(P) {
      const E = [200, 185], K = m5X([0, 105], 0, E, 102), B = m5X([0, 105], 0, E, 45);
      const J = m5pt(K, 102, 45), C = m5pt(B, 45, 45), H = m5pt(E, 225, 50), F = m5pt(E, 282, 50);
      return { lines: [M5LN([210, 105], 0, { arr: 1 }), M5LN([210, 185], 0, { arr: 1 })], segs: [["", m5pt(J, 102, 14), "", F, "var(--muted)"], ["", H, "", m5pt(C, 45, 14), "var(--muted)"]],
        names: [[J, "J", -12, 4], [K, "K", -12, 20], [B, "B", -4, -10], [C, "C", 12, 0], [[100, 105], "I", 0, -10], [[372, 105], "A", 0, -10], [[120, 185], "G", 0, 20], [E, "E", 16, -8], [[330, 185], "D", 0, 20], [H, "H", -12, 6], [F, "F", 12, 6]],
        dots: [J, K, B, C, [100, 105], [372, 105], [120, 185], E, [330, 185], H, F],
        arcs: [{ v: K, a1: 102, sp: 78, txt: "78°" }, { v: B, a1: 0, sp: 45, txt: "45°" }, { v: E, a1: 180, sp: 45, txt: "45°", q: 1, qt: "?", col: "var(--rani)", r: 22 }, { v: E, a1: 282, sp: 78, txt: "78°", q: 2, qt: "?", col: "var(--rani)", r: 22 }, { v: E, a1: 225, sp: 57, txt: "57°", q: 3, qt: "?", col: "var(--teal)", r: 30 }] };
    }, R: P => [{ ans: "Find ∠GEH, ∠HEF, ∠FED", why: "IA ∥ GD; HC and JF are transversals." }, { ans: "∠GEH = 45°", why: "∠BED = ∠ABC = 45° (corresponding); ∠GEH is vertically opposite ∠BED." }, { ans: "∠FED = 78°", why: "∠KEG = ∠JKI = 78° (corresponding); ∠FED is vertically opposite ∠KEG." }, { ans: "∠HEF = 180° − 45° − 78° = 57°", why: "∠GEH + ∠HEF + ∠FED is the straight angle GED." }][P.step] },
  f534: { n: 3, b(P) {
      const E = [290, 40], D = m5X(E, 215, [200, 0], 90), B = m5X(E, 215, [110, 0], 90);
      return { segs: [["", [80, 40], "", [330, 40], "var(--muted)"], ["", [110, 40], "", [110, 235], "var(--ink)"], ["", [200, 40], "", [200, 235], "var(--ink)"], ["", [290, 40], "", [290, 235], "var(--ink)"], ["", E, "", m5pt(B, 215, 30), "var(--muted)"]],
        chev: [[[110, 205], 90, 1], [[200, 205], 90, 1], [[290, 205], 90, 1]],
        names: [[[110, 40], "A", -10, -8], [[200, 40], "C", -10, -8], [E, "E", 10, -8], [B, "B", -12, 0], [D, "D", -12, 0], [[290, 232], "F", 12, 0]],
        arcs: [{ v: [110, 40], a1: 270, sp: 90, txt: "" }, { v: E, a1: 215, sp: 55, txt: "55°" }, { v: B, a1: 35, sp: 55, txt: "55°", k: 1, col: "var(--teal)", r: 28 }, { v: B, a1: 270, sp: 125, txt: "125°", q: 2, qt: "x°", col: "var(--rani)" }, { v: D, a1: 270, sp: 125, txt: "125°", q: 3, qt: "y°", col: "var(--rani)" }] };
    }, R: P => [{ ans: "x = ?, y = ?", why: "AB ∥ CD ∥ EF, EA ⟂ AB, ∠BEF = 55°." }, { ans: "∠ABE = ∠BEF = 55°", why: "Alternate angles: BE cuts AB ∥ EF." }, { ans: "x = 180° − 55° = 125°", why: "x and ∠ABE form a linear pair." }, { ans: "y = 125°", why: "y and x are corresponding angles: BE cuts AB ∥ CD." }][P.step] },
  f535: { n: 3, b(P) {
      const M = [60, 220], N = [140.3, 105.3], O = [271.5, 178], Pp = [355.6, 99.6], Q = [364.3, 199.2], L = [47.8, 80.5];
      const segs = [["", L, "", M], ["", M, "", N], ["", N, "", O], ["", O, "", Pp], ["", Pp, "", Q]];
      if (P.step >= 1) segs.push(["", m5pt(N, 95, 60), "", m5pt(N, 275, 70), "var(--teal)", "", ' stroke-dasharray="5 4"']);
      if (P.step >= 2) segs.push(["", m5pt(O, 95, 80), "", m5pt(O, 275, 50), "var(--teal)", "", ' stroke-dasharray="5 4"']);
      return { segs, chev: [[m5pt(M, 95, 60), 95, 1], [m5pt(Q, 95, 40), 95, 1]], names: [[L, "L", 12, 4], [M, "M", -4, 20], [N, "N", -6, -10], [O, "O", 0, 22], [Pp, "P", 10, -8], [Q, "Q", 12, 6]], dots: [L, M, N, O, Pp, Q],
        arcs: [{ v: M, a1: 55, sp: 40, txt: "40°", r: 30 }, { v: N, a1: 235, sp: 96, txt: "96°", r: 18 }, { v: Pp, a1: 223, sp: 52, txt: "52°", r: 24 }, { v: N, a1: 235, sp: 40, txt: "40°", k: 1, col: "var(--teal)", r: 40, lr: 18 }, { v: N, a1: 275, sp: 56, txt: "56°", k: 1, col: "var(--teal)", r: 40, lr: 16 },
          { v: O, a1: 95, sp: 56, txt: "56°", k: 2, col: "var(--teal)", r: 30 }, { v: O, a1: 43, sp: 52, txt: "52°", k: 2, col: "var(--teal)", r: 44 }, { v: O, a1: 43, sp: 108, txt: "108°", q: 3, qt: "a°", col: "var(--rani)", r: 18, lr: 50 }] };
    }, R: P => [{ ans: "∠NOP = ?", why: "LM ∥ PQ. Hint: draw parallels through N and O." }, { ans: "At N: 96° = 40° + 56°", why: "The angle next to LM is 40° (alternate angles), so the rest is 56°." }, { ans: "At O: 56° and 52°", why: "56° is alternate to the 56° at N; 52° is alternate to ∠OPQ." }, { ans: "∠NOP = 56° + 52° = 108°", why: "Add the two parts." }][P.step] },
  hering: { n: 1, b(P) { const rays = []; for (let a = 0; a < 180; a += 9) rays.push(M5LN([210, 125], a + 4.5, { col: "var(--muted)", w: 1.4, op: P.rays })); return { lines: rays.concat([M5LN([210, 85], 0, { col: "var(--rani)", w: 3.5 }), M5LN([210, 165], 0, { col: "var(--rani)", w: 3.5 })]), ruler: P.step >= 1 ? [[60, 85, 165], [210, 85, 165], [360, 85, 165]] : [] }; },
    R: P => P.step < 1 ? { ans: "Do the pink lines bend?", why: "The rays fool your eyes." } : { ans: "The gap is the same everywhere: the pink lines are parallel.", why: "Our brain judges a line by the lines around it." } },
  vhering: { n: 1, b(P) { const rays = []; for (let a = 0; a < 180; a += 15) rays.push(M5LN([210, 125], a, { col: "var(--muted)", w: 2, op: P.rays, box: [120, 30, 300, 220] })); return { lines: rays.concat([M5LN([190, 125], 90, { col: "var(--rani)", w: 3.5, box: [0, 20, 420, 230] }), M5LN([230, 125], 90, { col: "var(--rani)", w: 3.5, box: [0, 20, 420, 230] })]), ruler: P.step >= 1 ? [[190, 40, 230, 1], [190, 125, 230, 1], [190, 210, 230, 1]] : [] }; },
    R: P => P.step < 1 ? { ans: "Do the two pink lines bulge apart?", why: "The star of lines confuses your eyes." } : { ans: "Same gap at the top, middle and bottom: parallel!", why: "Measure instead of trusting your eyes." } },
  zollner: { n: 1, b(P) { const L = [], segs = []; for (let i = 0; i < 5; i++) { const p = [60 + i * 70, 125]; L.push(M5LN(p, 60, { col: "var(--rani)", w: 3, box: [10, 20, 410, 230] }));
      for (let k = -5; k <= 5; k++) { const c = m5pt(p, 60, k * 20); const a = i % 2 ? 0 : 90; segs.push(["", m5pt(c, a, 10), "", m5pt(c, a + 180, 10), "var(--muted)", "", ` stroke-opacity="${P.rays}"`]); } }
      return { lines: L, segs, box: [10, 20, 410, 230] }; },
    R: P => P.step < 1 ? { ans: "Do the long pink lines look tilted towards each other?", why: "Short crossing strokes change in direction from line to line." } : { ans: "They are all parallel.", why: "Take away the short strokes (slider) and see." } }
};
SIM_DEF.k7m5_fig = {
  def: { fig: "f529", step: 0, rays: 1 },
  rng: { step: P => [0, (M5FIG[P.fig] || { n: 1 }).n, 1], rays: () => [0, 1, 0.1] },
  lab: { step: "Reveal the reasoning", rays: "Distracting lines" },
  reads: { ans: "Answer", why: "Reason" },
  draw(D, P, sh, hl) {
    const F = M5FIG[P.fig] || M5FIG.f529, st = Math.round(P.step), G = F.b(Object.assign({}, P, { step: st, rays: clampN(D.rays, 0, 1) }));
    let s = `<svg viewBox="0 0 420 250">`;
    (G.lines || []).forEach(L => { const e = m5clip(L.p, L.a, L.box || G.box || [8, 8, 412, 242]); s += m5seg(e[0], e[1], L.col || "var(--ink)", L.w || 2.6, L.op != null ? ` stroke-opacity="${L.op}"` : "");
      if (L.arr) s += m5chev(m5add(e[0], m5dir(L.a), 0.8 * Math.hypot(e[1][0] - e[0][0], e[1][1] - e[0][1])), L.a, L.arr); });
    (G.segs || []).forEach(g => { s += m5seg(g[1], g[3], g[4] || "var(--ink)", 2.6, g[6] || "");
      if (g[0]) s += m5dot(g[1], g[0], 0, g[1][1] < g[3][1] ? -9 : 18); if (g[2]) s += m5dot(g[3], g[2], 0, g[3][1] < g[1][1] ? -9 : 18);
      if (g[5]) { const m = [(g[1][0] + g[3][0]) / 2, (g[1][1] + g[3][1]) / 2]; s += T(m5f(m[0] + 8), m5f(m[1] - 8), g[5], { size: 15, fill: g[4] }); } });
    (G.ext || []).forEach(([i, j]) => [i, j].forEach(k => { const g = G.segs[k], a = Math.atan2(-(g[3][1] - g[1][1]), g[3][0] - g[1][0]) * 180 / Math.PI, e = m5clip(g[1], a); s += m5seg(e[0], e[1], "var(--mari)", 1.6, ' stroke-dasharray="5 5"'); }));
    (G.chev || []).forEach(c => { s += m5chev(c[0], c[1], c[2]); });
    (G.dots || []).forEach(p => { s += `<circle cx="${m5f(p[0])}" cy="${m5f(p[1])}" r="3.4" fill="var(--rani)"/>`; });
    (G.names || []).forEach(([p, n, dx, dy]) => { s += T(m5f(p[0] + dx), m5f(p[1] + dy), n, { size: 13.5 }); });
    (G.arcs || []).forEach(a => {
      if (a.only != null && a.only !== st) return; if (a.k != null && st < a.k) return;
      const txt = a.q != null && st < a.q ? a.qt : a.txt, ans = a.q != null && st >= a.q;
      s += `<g${ans ? m5hl(hl, "ans") : ""}>${m5arc(a.v, a.a1, a.sp, a.r || 20, { col: a.col, txt, fill: ans, lr: a.lr })}</g>`;
    });
    (G.ruler || []).forEach(r => { if (r[3]) s += m5seg([r[0], r[1]], [r[2], r[1]], "var(--mari)", 2, ' stroke-dasharray="3 3"') + T(r[0] + 20, r[1] - 6, "40", { size: 11, fill: "var(--mari)" });
      else s += m5seg([r[0], r[1]], [r[0], r[2]], "var(--mari)", 2, ' stroke-dasharray="3 3"') + T(r[0] + 14, (r[1] + r[2]) / 2 + 4, "80", { size: 11, fill: "var(--mari)" }); });
    s += `</svg>`;
    return { svg: s, reads: F.R(Object.assign({}, P, { step: st })) };
  }
};

/* =========================================================
   4. k7m5_dots — dot paper. fig: f56 | f510 | f511 | f512 | free.
   marks 0/1 shows parallel groups (colours, arrows) or sample answers; user 1 adds a student segment
   from (ax, ay) along (ux, uy), compared with segment tgt.
   ========================================================= */
const M5DOT = {
  f56: { c: 16, r: 8, s: [[1, 0, 1, 3, "a", 1], [1, 3, 9, 3, "c", 2], [3, 1, 6, 4, "d", 3], [6, 4, 9, 1, "e", 4], [1, 6, 4, 3, "b", 4], [5, 4, 12, 4, "g", 2], [9, 3, 13, 7, "f", 3], [5, 4, 5, 7, "i", 1], [8, 4, 8, 7, "h", 1]] },
  f510: { c: 6, r: 4, s: [[0, 0, 2, 0, "", 0], [0, 3, 2, 1, "", 0], [3, 1, 3, 3, "", 0], [3, 0, 5, 3, "", 0]], ex: [[1, 0, 1, 3], [0, 1, 2, 3], [3, 2, 5, 2], [2, 2, 5, 0]] },
  f511: { c: 12, r: 12, s: [[0, 0, 0, 5, "", 1], [2, 2, 2, 5, "", 1], [0, 5, 2, 5, "", 2], [0, 0, 2, 2, "", 0], [6, 1, 10, 1, "", 2], [4, 3, 8, 3, "", 2], [4, 3, 6, 1, "", 3], [8, 3, 10, 1, "", 3], [5, 9, 5, 12, "", 1], [11, 7, 11, 12, "", 1], [5, 12, 11, 12, "", 2], [5, 9, 8, 9, "", 2], [8, 9, 11, 7, "", 0]], sq: [[0, 5, 0, 4, 1, 5], [2, 5, 2, 4, 1, 5], [5, 12, 5, 11, 6, 12], [11, 12, 11, 11, 10, 12], [5, 9, 5, 10, 6, 9]] },
  f512: { c: 13, r: 14, s: [[1, 1, 2, 2, "a", 0], [3, 1, 5, 3, "b", 0], [6, 4, 9, 1, "c", 0], [7, 5, 11, 1, "d", 0], [1, 3, 2, 6, "e", 0], [3, 3, 4, 9, "f", 0], [6, 8, 11, 6, "g", 0], [1, 9, 11, 12, "h", 0]], ex: [[0, 2, 1, 3], [4, 0, 6, 2], [5, 6, 8, 3], [8, 6, 12, 2], [0, 4, 1, 7], [4, 2, 5, 8], [5, 7, 10, 5], [0, 10, 10, 13]] },
  free: { c: 10, r: 7, s: [[1, 5, 4, 2, "", 0]], ex: [[3, 6, 7, 2], [5, 6, 8, 3], [1, 2, 3, 4], [6, 0, 9, 3]] }
};
const M5GC = ["var(--ink)", "var(--sky)", "var(--mari)", "var(--teal)", "var(--rani)"];
SIM_DEF.k7m5_dots = {
  def: { fig: "f56", marks: 0, user: 0, ax: 2, ay: 2, ux: 1, uy: 0, tgt: 0 },
  rng: { ux: () => [-4, 4, 1], uy: () => [-4, 4, 1], marks: () => [0, 1, 1] },
  lab: { ux: "Your segment: steps right", uy: "Your segment: steps down", marks: "Show the answer" },
  reads: { sets: "Parallel sets", check: "Your segment" },
  draw(D, P, sh, hl) {
    const F = M5DOT[P.fig] || M5DOT.f56, gap = Math.min(380 / Math.max(F.c - 1, 1), 226 / Math.max(F.r - 1, 1)), W = (F.c - 1) * gap, H = (F.r - 1) * gap;
    const x0 = 210 - W / 2, y0 = 125 - H / 2, X = (i, j) => [x0 + i * gap, y0 + j * gap], mk = Math.round(D.marks) > 0;
    let s = `<svg viewBox="0 0 420 250">`;
    for (let i = 0; i < F.c; i++) for (let j = 0; j < F.r; j++) s += `<circle cx="${m5f(x0 + i * gap)}" cy="${m5f(y0 + j * gap)}" r="${gap > 20 ? 3.4 : 2.6}" fill="#6a6fd0"/>`;
    F.s.forEach(g => { const p = X(g[0], g[1]), q = X(g[2], g[3]), col = mk && g[5] ? M5GC[g[5]] : "var(--ink)";
      s += `<g${m5hl(hl, "seg" + g[5])}>${m5seg(p, q, col, 3)}</g>`; if (g[4]) s += T(m5f((p[0] + q[0]) / 2 + 9), m5f((p[1] + q[1]) / 2 - 6), g[4], { size: 14, fill: col });
      if (mk && g[5] && P.fig !== "f511x") { const a = Math.atan2(-(q[1] - p[1]), q[0] - p[0]) * 180 / Math.PI; s += m5chev([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], a, P.fig === "f56" || P.fig === "f511" ? Math.min(g[5], 3) : 1, col); } });
    if (mk && F.sq) F.sq.forEach(q => { const c = X(q[0], q[1]), a = X(q[2], q[3]), b = X(q[4], q[5]), k = 0.45; const pa = [c[0] + (a[0] - c[0]) * k, c[1] + (a[1] - c[1]) * k], pb = [c[0] + (b[0] - c[0]) * k, c[1] + (b[1] - c[1]) * k], pc = [pa[0] + pb[0] - c[0], pa[1] + pb[1] - c[1]];
      s += `<path d="M${m5f(pa[0])} ${m5f(pa[1])} L${m5f(pc[0])} ${m5f(pc[1])} L${m5f(pb[0])} ${m5f(pb[1])}" stroke="var(--rani)" stroke-width="2" fill="none"/>`; });
    if (mk && F.ex) F.ex.forEach(g => { s += m5seg(X(g[0], g[1]), X(g[2], g[3]), "var(--teal)", 2.6, ' stroke-dasharray="6 4"'); });
    let check = "Move the sliders";
    if (P.user) { const p = X(P.ax, P.ay), q = X(P.ax + D.ux, P.ay + D.uy); s += m5seg(p, q, "var(--rani)", 3.4) + `<circle cx="${m5f(p[0])}" cy="${m5f(p[1])}" r="5" fill="var(--rani)"/>`;
      const g = F.s[P.tgt] || F.s[0], gx = g[2] - g[0], gy = g[3] - g[1], ux = P.ux, uy = P.uy, cr = gx * uy - gy * ux, dt = gx * ux + gy * uy;
      check = (!ux && !uy) ? "Stretch your segment" : cr === 0 ? "Parallel to the given segment" : dt === 0 ? "Perpendicular to the given segment (90°)" : "Neither parallel nor perpendicular"; }
    s += `</svg>`;
    const names = { f56: "a, i, h · c, g · d, f · e, b", f511: "vertical sides · horizontal sides · slanting sides", f512: "the dashed lines are parallel to a … h" };
    return { svg: s, reads: { sets: names[P.fig] || "Dashed segments show answers", check } };
  }
};

/* =========================================================
   5. k7m5_craft — paper folding and the set square.
   mode "sheet": n horizontal folds (0–4, creases 2ⁿ + 1 lines), vf vertical fold, dg diagonal, dp fold parallel to diagonal
   mode "f58": Fig 5.8 activity, step 0–3.  mode "foldA": parallel through A by folding, step 0–3.
   mode "setsq": set square slides along ruler on l (sx); ang 90 | 60; drawn (list of x); Ax, Ay point A
   ========================================================= */
SIM_DEF.k7m5_craft = {
  def: { mode: "sheet", n: 0, vf: 0, dg: 0, dp: 0, step: 0, sx: 120, ang: 90, drawn: "", Ax: 0, Ay: 0 },
  rng: { n: () => [0, 4, 1], step: () => [0, 3, 1], sx: () => [60, 340, 5] },
  lab: { n: "Horizontal folds", step: "Next fold", sx: "Slide the set square" },
  reads: { count: "Count", rule: "Why" },
  draw(D, P, sh, hl) {
    let s = `<svg viewBox="0 0 420 250">`, count = "", rule = "";
    const paper = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="#f3e6c4" stroke="#c9b27a" stroke-width="2" rx="2"/>`;
    const cr = (p, q, col = "#8a6a3a", extra = "") => m5seg(p, q, col, 2, ' stroke-dasharray="6 4"' + extra);
    if (P.mode === "sheet") {
      const x = 30, y = 25, w = 200, nf = clampN(D.n, 0, 4), N = Math.floor(nf + 1e-6), fr = nf - N;
      s += paper(x, y, w);
      s += `<g${m5hl(hl, "edges")}>${m5seg([x, y], [x + w, y], "var(--sky)", 3.5)}${m5seg([x, y + w], [x + w, y + w], "var(--sky)", 3.5)}</g>`;
      for (let lev = 1; lev <= 4; lev++) { const op = lev <= N ? 1 : lev === N + 1 ? fr : 0; if (op <= 0) continue;
        const k = 2 ** lev; for (let j = 1; j < k; j += 2) s += cr([x, y + w * j / k], [x + w, y + w * j / k], "var(--sky)", ` stroke-opacity="${op.toFixed(2)}"`); }
      if (P.vf) s += cr([x + w / 2, y], [x + w / 2, y + w], "var(--rani)") + `<path d="M${x + w / 2} ${y + w - 14} h12 v14" stroke="var(--rani)" fill="none" stroke-width="2"/>`;
      if (P.dg) s += cr([x, y + w], [x + w, y], "var(--teal)");
      if (P.dp) s += cr([x + w / 2, y], [x + w, y + w / 2], "var(--teal)") + m5chev([x + w * .3, y + w * .7], 45, 1, "var(--teal)") + m5chev([x + w * .78, y + w * .22], 45, 1, "var(--teal)");
      const Nn = Math.round(P.n), tot = 2 ** Nn + 1;
      s += T(330, 40, "Folds → parallel lines", { size: 13, fill: "var(--muted)" });
      [0, 1, 2, 3, 4].forEach(i => { const on = i <= Nn; s += T(300, 70 + i * 30, `${i}`, { size: 16, fill: on ? "var(--ink)" : "var(--line)" }) + T(330, 70 + i * 30, "→", { size: 15, fill: on ? "var(--muted)" : "var(--line)" }) + T(365, 70 + i * 30, `${2 ** i + 1}`, { size: 16, fill: on ? (i === Nn ? "var(--mari)" : "var(--ink)") : "var(--line)" }); });
      count = `${Nn} fold${Nn === 1 ? "" : "s"}: ${tot} parallel lines (2 edges + ${tot - 2} creases)`;
      rule = "Each fold doubles the strips: lines = 2ⁿ + 1" + (P.vf ? ". The vertical crease is perpendicular to all of them." : "");
    } else if (P.mode === "f58") {
      const st = Math.round(P.step), x = 110, y = 25, w = 200; s += paper(x, y, w);
      if (st >= 1) s += cr([x + w / 2, y], [x + w / 2, y + w]);
      if (st >= 2) s += cr([x + w / 4, y], [x + w / 4, y + w]) + cr([x + 3 * w / 4, y], [x + 3 * w / 4, y + w]);
      if (st >= 3) { const q = w / 4;
        s += `<path d="M${x + 3 * q} ${y} L${x + w} ${y} L${x + 3 * q} ${y + q}Z" fill="#d9c08a" stroke="#8a6a3a" stroke-width="1.5"/><path d="M${x} ${y + w} L${x + q} ${y + w} L${x + q} ${y + w - q}Z" fill="#d9c08a" stroke="#8a6a3a" stroke-width="1.5"/>`;
        s += m5seg([x + 3 * q, y], [x + w, y], "var(--sky)", 3.5) + m5seg([x + 3 * q, y], [x + 3 * q, y + q], "var(--mari)", 3.5) + m5seg([x + 3 * q, y + q], [x + w, y], "var(--teal)", 3.5);
        s += m5seg([x, y + w], [x + q, y + w], "var(--sky)", 3.5) + m5seg([x + q, y + w], [x + q, y + w - q], "var(--mari)", 3.5) + m5seg([x + q, y + w - q], [x, y + w], "var(--teal)", 3.5);
        s += T(x + 3.5 * q, y - 6, "a", { fill: "var(--sky)", size: 15 }) + T(x + 3 * q - 10, y + q / 2 + 5, "b", { fill: "var(--mari)", size: 15 }) + T(x + 3.7 * q + 4, y + q / 2 + 10, "c", { fill: "var(--teal)", size: 15 });
        s += T(x + q / 2, y + w + 17, "p", { fill: "var(--sky)", size: 15 }) + T(x + q + 10, y + w - q / 2 + 5, "q", { fill: "var(--mari)", size: 15 }) + T(x + q * .3 - 6, y + w - q * .6, "r", { fill: "var(--teal)", size: 15 }); }
      count = ["A square sheet", "Fold in the middle and unfold", "Fold the edges to the centre line", "Fold two corners onto the creases"][st];
      rule = st < 3 ? "Creases made by folding edge to edge are parallel to the side edges" : "a ∥ p (top and bottom edges), b ∥ q (both on vertical creases), c ∥ r (both 45° corner folds in the same direction)";
    } else if (P.mode === "foldA") {
      const st = Math.round(P.step), x = 70, y = 15, w = 280, h = 220, la = 12, l0 = [x + 30, y + 175], A = [250, 70];
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f3e6c4" stroke="#c9b27a" stroke-width="2" rx="2"/>`;
      const box = [x + 2, y + 2, x + w - 2, y + h - 2], Lc = m5clip(l0, la, box); s += m5seg(Lc[0], Lc[1], "var(--sky)", 3) + T(m5f(Lc[1][0] - 14), m5f(Lc[1][1] - 8), "l", { fill: "var(--sky)", size: 15 });
      const F = m5X(l0, la, A, la + 90);
      if (st >= 1) { const t = m5clip(A, la + 90, box); s += cr(t[0], t[1], "var(--rani)") + T(m5f(t[0][0] + 12), m5f(t[0][1] - 6), "t", { fill: "var(--rani)", size: 15 }) + m5arc(F, la, 90, 14, { col: "var(--rani)" }); }
      if (st >= 2) { const m = m5clip(A, la, box); s += cr(m[0], m[1], "var(--teal)") + T(m5f(m[1][0] - 14), m5f(m[1][1] - 8), "m", { fill: "var(--teal)", size: 15 }) + m5arc(A, la + 180, 90, 14, { col: "var(--teal)" }); }
      if (st >= 3) s += m5chev(m5pt(l0, la, 80), la, 1, "var(--sky)") + m5chev(m5pt(A, la + 180, 80), la, 1, "var(--teal)");
      s += m5dot(A, "A", 12, -8);
      count = ["Line l is a crease; A is a point not on it", "Fold t perpendicular to l through A", "Fold m perpendicular to t through A", "l ∥ m"][st];
      rule = "l and m both make 90° with t: equal corresponding angles, so l ∥ m";
    } else {
      const ly = 170, x0 = clampN(D.sx, 40, 380), ang = +P.ang, hgt = 120, base = ang === 90 ? 70 : hgt / Math.tan(m5R(ang));
      s += m5seg([15, ly], [405, ly], "var(--sky)", 3) + T(398, ly - 8, "l", { fill: "var(--sky)", size: 15 });
      s += `<rect x="15" y="${ly + 2}" width="390" height="26" fill="#e9d9a8" stroke="#b3955a" rx="3"/>`;
      for (let i = 20; i < 405; i += 10) s += m5seg([i, ly + 2], [i, ly + (i % 50 === 20 ? 14 : 8)], "#7a5c2e", 1);
      m5list(P.drawn).map(Number).forEach(dx => { if (ang === 90) s += m5seg([dx, 15], [dx, ly], "var(--teal)", 2.6) + m5arc([dx, ly], 90, 90, 14, { col: "var(--teal)" });
        else { const p = m5pt([dx, ly], 180 - ang, 170); s += m5seg(p, [dx, ly], "var(--teal)", 2.6) + m5arc([dx, ly], 180 - ang, ang, 22, { col: "var(--teal)", txt: ang + "°" }); } });
      if (P.Ax) s += m5dot([P.Ax, P.Ay], "A", 12, -8);
      const pts = ang === 90 ? [[x0, ly], [x0 + base, ly], [x0, ly - hgt]] : [[x0 - base, ly], [x0, ly], [x0 - base, ly - hgt]];
      s += `<g${m5hl(hl, "setsq")}><path d="M${pts.map(p => m5f(p[0]) + " " + m5f(p[1])).join(" L")}Z" fill="rgba(98,182,232,.28)" stroke="var(--sky)" stroke-width="2"/></g>`;
      const edgeX = ang === 90 ? x0 : null, hit = P.Ax && edgeX != null && Math.abs(P.sx - P.Ax) < 0.5;
      s += m5seg(ang === 90 ? [x0, ly] : [x0, ly], ang === 90 ? [x0, ly - hgt] : [x0 - base, ly - hgt], hit ? "var(--teal)" : "var(--mari)", 3);
      if (hit) s += T(P.Ax, 22, "edge passes through A!", { size: 13, fill: "var(--teal)" });
      count = ang === 90 ? "Lines drawn along the edge make 90° with l" : `Lines drawn along the long side make ${ang}° with l`;
      rule = "l is a transversal; the corresponding angles are equal, so the lines are parallel" + (P.Ax ? (hit ? ". Draw along the edge: a line through A ∥ to the others" : ". Slide until the edge reaches A") : "");
    }
    s += `</svg>`;
    return { svg: s, reads: { count, rule } };
  }
};

/* =========================================================
   3D — k7m5_trace3d: tracing-paper test on a weaving table. Lines l, m and transversal t lie on the cloth;
   the traced copy of ∠a lifts and glides along t onto ∠b. params A (∠a), dm (tilt of m), slide 0–1
   ========================================================= */
SIM_DEF.k7m5_trace3d = {
  def: { A: 60, dm: 0, slide: 0 },
  rng: { slide: () => [0, 1, 0.05], dm: () => [-20, 20, 1], A: () => [30, 150, 5] },
  lab: { slide: "Glide the tracing paper", dm: "Tilt line m (°)", A: "Angle a (°)" },
  reads: { ang: "Angles", fit: "Tracing test" },
  readouts(P) { const B = Math.round(P.A - P.dm); return { ang: `∠a = ${Math.round(P.A)}°, ∠b = ${B}°`, fit: Math.abs(P.dm) < 0.01 ? "The traced angle fits ∠b exactly: l ∥ m" : `No fit: off by ${Math.abs(Math.round(P.dm))}°, so l and m are not parallel` }; },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 8.6, phi: 0.72, theta: 0.25, auto: 0, target: [0, 0, 0], hint: "Drag to look around the weaving table" }); if (!g) return null;
    const { THREE, root } = g, Yax = new THREE.Vector3(0, 1, 0);
    const mat = c => new THREE.MeshStandardMaterial({ color: c, roughness: .6 });
    const cv = document.createElement("canvas"); cv.width = cv.height = 128; const x = cv.getContext("2d");
    x.fillStyle = "#e8d6a8"; x.fillRect(0, 0, 128, 128); for (let i = 0; i < 128; i += 8) { x.fillStyle = i % 16 ? "rgba(180,60,90,.18)" : "rgba(40,110,150,.16)"; x.fillRect(i, 0, 4, 128); x.fillRect(0, i, 128, 3); }
    const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(3, 2);
    const cloth = new THREE.Mesh(new THREE.BoxGeometry(9, 0.2, 6), new THREE.MeshStandardMaterial({ map: tex, roughness: .95 })); cloth.position.y = -0.11; root.add(cloth);
    const legM = mat(0x6d3f2b); [[-4.2, -2.7], [4.2, -2.7], [-4.2, 2.7], [4.2, 2.7]].forEach(([a, b]) => { const l = new THREE.Mesh(new THREE.BoxGeometry(.3, 1.6, .3), legM); l.position.set(a, -1, b); root.add(l); });
    const geo = new THREE.CylinderGeometry(1, 1, 1, 10);
    const stick = c => { const m = new THREE.Mesh(geo, mat(c)); root.add(m); return m; };
    const place = (m, a, b, r = 0.07) => { const d = b.clone().sub(a), L = d.length(); m.position.copy(a).add(b).multiplyScalar(.5); m.scale.set(r, L, r); m.quaternion.setFromUnitVectors(Yax, d.normalize()); };
    const sl = stick(0x62b6e8), sm = stick(0x35c29a), st = stick(0xffd166);
    const W = (p, h = 0.04) => new THREE.Vector3(p[0], h, -p[1]), Wa = (p, h = 0.04) => [p[0], h, -p[1]];
    const fan = (col, op) => { const N = 20, gg = new THREE.BufferGeometry(); gg.setAttribute("position", new THREE.BufferAttribute(new Float32Array((N + 2) * 3), 3)); const idx = []; for (let k = 1; k <= N; k++) idx.push(0, k, k + 1); gg.setIndex(idx);
      const m = new THREE.Mesh(gg, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, side: THREE.DoubleSide, depthWrite: false })); root.add(m);
      m.set = (c, a1, sp, r, h) => { const p = gg.attributes.position; p.setXYZ(0, c[0], h, -c[1]); for (let k = 0; k <= N; k++) { const a = (a1 + sp * k / N) * Math.PI / 180; p.setXYZ(k + 1, c[0] + r * Math.cos(a), h, -(c[1] + r * Math.sin(a))); } p.needsUpdate = true; gg.computeBoundingSphere(); }; return m; };
    const wa = fan(0xf4a51c, .8), wb = fan(0x62b6e8, .7), wc = fan(0xe04a86, .75);
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: .28, side: THREE.DoubleSide, depthWrite: false })); sheet.rotation.x = -Math.PI / 2; root.add(sheet);
    const la = g.label("∠a", [0, 0, 0]), lb = g.label("∠b", [0, 0, 0]), big = g.label("", [-2.6, 0.2, 2.4], "big"), ll = g.label("l", [0, 0, 0], "plain"), lm = g.label("m", [0, 0, 0], "plain"), lt = g.label("t", [0, 0, 0], "plain");
    return {
      update(D, P) {
        const A = D.A, dm = D.dm, ar = A * Math.PI / 180, X = [0.3, 1.2], h = Math.min(3.2, 2.4 / Math.sin(ar)), Y = [X[0] - h * Math.cos(ar), X[1] - h * Math.sin(ar)];
        const dl = [Math.cos(0), 0], dmv = [Math.cos(dm * Math.PI / 180), Math.sin(dm * Math.PI / 180)], dt = [Math.cos(ar), Math.sin(ar)];
        const ext = (p, d, s) => [p[0] + d[0] * s, p[1] + d[1] * s];
        place(sl, W(ext(X, dl, -4.2)), W(ext(X, dl, 4.2))); place(sm, W(ext(Y, dmv, -4.2)), W(ext(Y, dmv, 4.2))); place(st, W(ext(Y, dt, -1.6)), W(ext(X, dt, 1.6)));
        wa.set(X, 0, A, 0.95, 0.06); wb.set(Y, dm, A - dm, 0.95, 0.05);
        const s = clampN(D.slide, 0, 1), C = [X[0] + (Y[0] - X[0]) * s, X[1] + (Y[1] - X[1]) * s], lift = 0.08 + Math.sin(Math.PI * s) * 0.9;
        wc.set(C, 0, A, 0.9, lift + 0.01); sheet.position.set(C[0], lift, -C[1]);
        la.move([X[0] + 1.0 * Math.cos(ar / 2), 0.1, -(X[1] + 1.0 * Math.sin(ar / 2))]); lb.move([Y[0] + 1.0 * Math.cos((A + dm) * Math.PI / 360), 0.1, -(Y[1] + 1.0 * Math.sin((A + dm) * Math.PI / 360))]);
        ll.move(Wa(ext(X, dl, 3.9), 0.3)); lm.move(Wa(ext(Y, dmv, 3.9), 0.3)); lt.move(Wa(ext(X, dt, 1.5), 0.35));
        const fit = Math.abs(P.dm) < 0.01; big.set(fit ? "✓ fits exactly: l ∥ m" : "✗ does not fit"); big.show(s > 0.97);
        wc.material.color.setHex(s > 0.97 ? (fit ? 0x35c29a : 0xef5b45) : 0xe04a86);
      },
      dispose() { g.dispose(); }
    };
  }
};

/* =========================================================
   SCENE — a Pochampally handloom village at dusk: warp threads, a flying shuttle, ikat cloth drying
   ========================================================= */
let m5w = null;
function m5wInit(W, H) { const r = (a, b) => a + Math.random() * (b - a);
  m5w = { W, H, flies: Array.from({ length: Math.round(W / 40) }, () => ({ x: r(0, W), y: r(H * .3, H), p: r(0, 6.28), s: r(.2, .6) })), stars: Array.from({ length: Math.round(W * H / 9000) }, () => ({ x: r(0, W), y: r(0, H * .45), p: r(0, 6.28) })) }; }
SCENES.k7m5_loom = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!m5w || m5w.W !== W || m5w.H !== H) m5wInit(W, H);
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#1b1638"); g.addColorStop(.5, "#4a2448"); g.addColorStop(.8, "#8a3f3a"); g.addColorStop(1, "#2a1a20");
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  m5w.stars.forEach(s => { c.globalAlpha = .3 + .3 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.fillRect(s.x, s.y, 1.5, 1.5); }); c.globalAlpha = 1;
  const gy = H * .82;
  // drying lines with ikat saris (parallel ropes)
  for (let k = 0; k < 2; k++) { const y = H * (.2 + k * .1); c.strokeStyle = "rgba(255,220,180,.35)"; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke();
    for (let x = (k * 60) % 120; x < W * .55; x += 120) { const sw = Math.sin(t / 1200 + x * .02 + k) * 4, cols = k ? ["#e04a86", "#f4a51c"] : ["#35c29a", "#62b6e8"];
      c.fillStyle = cols[0]; c.globalAlpha = .55; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 70, y); c.lineTo(x + 70 + sw, y + 60); c.lineTo(x + sw, y + 60); c.fill();
      c.fillStyle = cols[1]; for (let j = 0; j < 3; j++) { const cx = x + 18 + j * 17 + sw / 2, cy = y + 30; c.beginPath(); c.moveTo(cx, cy - 8); c.lineTo(cx + 6, cy); c.lineTo(cx, cy + 8); c.lineTo(cx - 6, cy); c.fill(); } c.globalAlpha = 1; } }
  // the big loom: warp threads (parallel), beams, a moving shuttle carrying the weft
  const lx = W * .58, lw = Math.min(W * .38, 460), ly = H * .3, lh = gy - ly;
  c.fillStyle = "#3b2216"; c.fillRect(lx - 10, ly - 14, lw + 20, 14); c.fillRect(lx - 10, gy - 40, lw + 20, 14); c.fillRect(lx - 14, ly - 14, 10, lh + 14); c.fillRect(lx + lw + 4, ly - 14, 10, lh + 14);
  const nw = Math.round(lw / 9); for (let i = 0; i <= nw; i++) { const x = lx + i * lw / nw; c.strokeStyle = ["rgba(244,165,28,.55)", "rgba(224,74,134,.55)", "rgba(98,182,232,.5)"][i % 3]; c.lineWidth = 1.3; c.beginPath(); c.moveTo(x, ly); c.lineTo(x, gy - 40); c.stroke(); }
  const woven = gy - 40 - (lh - 40) * .35; c.fillStyle = "rgba(224,74,134,.35)"; c.fillRect(lx, woven, lw, gy - 40 - woven);
  for (let yy = woven; yy < gy - 40; yy += 6) { c.strokeStyle = "rgba(255,230,190,.25)"; c.beginPath(); c.moveTo(lx, yy); c.lineTo(lx + lw, yy); c.stroke(); }
  const ph = (t / 2200) % 2, sx = lx + lw * (ph < 1 ? ph : 2 - ph); c.fillStyle = "#d9a55a"; c.beginPath(); c.ellipse(sx, woven - 6, 22, 5, 0, 0, 6.28); c.fill();
  c.strokeStyle = "rgba(255,240,200,.7)"; c.beginPath(); c.moveTo(ph < 1 ? lx : lx + lw, woven - 6); c.lineTo(sx, woven - 6); c.stroke();
  // diagonal heddle string as a transversal
  c.strokeStyle = "rgba(255,255,255,.28)"; c.lineWidth = 2; c.beginPath(); c.moveTo(lx - 20, ly + lh * .15); c.lineTo(lx + lw + 20, ly + lh * .45); c.stroke();
  // village houses
  c.fillStyle = "#1d1119"; for (let x = 0; x < W * .55; x += 110) { const hh = 50 + (x * 7) % 40; c.fillRect(x, gy - hh, 90, hh); c.beginPath(); c.moveTo(x - 6, gy - hh); c.lineTo(x + 45, gy - hh - 26); c.lineTo(x + 96, gy - hh); c.fill();
    c.fillStyle = `rgba(255,190,110,${.35 + .15 * Math.sin(t / 900 + x)})`; c.fillRect(x + 35, gy - hh + 18, 16, 18); c.fillStyle = "#1d1119"; }
  c.fillStyle = "#170d12"; c.fillRect(0, gy, W, H - gy);
  m5w.flies.forEach(f => { if (!RM) { f.x += Math.sin(t / 1500 + f.p) * f.s; f.y += Math.cos(t / 1700 + f.p) * f.s * .6; } c.fillStyle = `rgba(255,230,120,${.25 + .3 * Math.sin(t / 400 + f.p)})`; c.beginPath(); c.arc(f.x, f.y, 2, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(10,6,16,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Gilli, the three-striped palm squirrel (her stripes are parallel!)
   ========================================================= */
GUIDES.k7m5_gilli = () => `<svg class="guide gilli" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="32" ry="4" fill="#000" opacity=".25"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 78 100;8 78 100;0 78 100;-4 78 100;0 78 100" dur="3s" repeatCount="indefinite"/>
    <path d="M76 104 Q112 100 108 60 Q104 26 84 22 Q100 44 92 62 Q86 80 72 92Z" fill="#9a6a44"/>
    <path d="M84 26 Q98 44 92 64 Q88 78 78 90" stroke="#c99b6e" stroke-width="5" fill="none" stroke-linecap="round"/></g>
  <ellipse cx="56" cy="92" rx="24" ry="28" fill="#a8754c"/>
  <ellipse cx="52" cy="98" rx="13" ry="18" fill="#e9cfa6"/>
  <path d="M68 70 Q76 88 70 112 M74 72 Q82 90 77 110 M62 68 Q70 86 64 112" stroke="#f4ead6" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M65 69 Q73 87 67 112 M71 71 Q79 89 73 111" stroke="#3a2416" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <ellipse cx="44" cy="118" rx="8" ry="4" fill="#7a5032"/><ellipse cx="64" cy="119" rx="8" ry="4" fill="#7a5032"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M30 84 Q20 76 26 68" stroke="#a8754c" stroke-width="7" fill="none" stroke-linecap="round"/>
    <rect x="16" y="54" width="16" height="16" rx="3" fill="#e04a86"/><path d="M16 58 h16 M16 62 h16 M16 66 h16" stroke="#f4a51c" stroke-width="1.6"/>
    <path d="M24 54 Q30 30 52 40" stroke="#f4a51c" stroke-width="1.4" fill="none"/>
    <ellipse cx="50" cy="52" rx="20" ry="17" fill="#a8754c"/>
    <path d="M36 40 L32 26 L44 36Z M58 37 L64 24 L66 40Z" fill="#8a5a38"/>
    <ellipse cx="40" cy="58" rx="8" ry="6" fill="#e9cfa6"/>
    <path d="M46 36 Q50 46 48 54 M52 35 Q56 45 54 53" stroke="#3a2416" stroke-width="1.8" fill="none"/>
    <circle cx="44" cy="49" r="4" fill="#15202a"/><circle cx="58" cy="48" r="4" fill="#15202a"/><circle cx="45.3" cy="47.6" r="1.3" fill="#fff"/><circle cx="59.3" cy="46.6" r="1.3" fill="#fff"/>
    <rect x="38" y="43" width="26" height="0" fill="#a8754c"><animate attributeName="height" values="0;0;0;10;0" keyTimes="0;.82;.9;.95;1" dur="4s" repeatCount="indefinite"/></rect>
    <circle cx="36" cy="58" r="2.6" fill="#2a1a10"/>
    <path d="M38 63 Q43 66 47 62" stroke="#2a1a10" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="54" cy="58" r="3" fill="#ff7aa2" opacity=".5"/></g>
</svg>`;
})();
