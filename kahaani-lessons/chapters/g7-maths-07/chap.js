(function(){
/* Grade 7 Chapter 7 — A Tale of Three Intersecting Lines
   Plugin: simulations (k7m7_*), the White Rann tent-city scene, and Laali the flamingo guide.
   All drawings use model coordinates in cm (y up) mapped into the SVG box (y down). */

/* ---------- private helpers ---------- */
const m7hl = (hl, p) => ` data-part="${p}"${hl === p ? ' class="hl"' : ""}`;
const m7rad = d => d * Math.PI / 180, m7deg = r => r * 180 / Math.PI;
const m7f = (x, d = 1) => fmtN(+x, d);
const m7d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const m7P = a => a.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
const m7cen = a => [a.reduce((s, p) => s + p[0], 0) / a.length, a.reduce((s, p) => s + p[1], 0) / a.length];
const m7lerp = (a, b, t) => a + (b - a) * t;
const m7num = x => { const v = +x; return isFinite(v) ? v : 0; };
/* A=(0,0), B=(c,0); third vertex C with AC=b, BC=a (y up) */
function m7sss(c, b, a) { c = Math.max(c, 1e-6); const x = (b * b - a * a + c * c) / (2 * c), h2 = b * b - x * x; return { x, h: Math.sqrt(Math.max(h2, 0)), h2 }; }
/* 1 = triangle exists, 0 = the two smaller add up exactly to the longest, -1 = no triangle */
function m7kind(a, b, c) { const s = [+a, +b, +c].sort((x, y) => x - y), d = s[0] + s[1] - s[2]; return Math.abs(d) < 1e-9 ? 0 : (d > 0 ? 1 : -1); }
/* angle (deg) opposite side a in a triangle with sides a, b, c */
const m7opp = (a, b, c) => m7deg(Math.acos(clampN((b * b + c * c - a * a) / (2 * b * c), -1, 1)));
/* fit y-up model points into a screen box; returns map fn with .k (px per unit) */
function m7fit(pts, box = [24, 26, 396, 210], maxk = 32) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const k = Math.min((box[2] - box[0]) / Math.max(x1 - x0, 1e-6), (box[3] - box[1]) / Math.max(y1 - y0, 1e-6), maxk);
  const ox = (box[0] + box[2]) / 2 - k * (x0 + x1) / 2, oy = (box[1] + box[3]) / 2 + k * (y0 + y1) / 2;
  const f = p => [ox + k * p[0], oy - k * p[1]]; f.k = k; return f;
}
/* angle mark at screen vertex v between rays to p1 and p2; label t; square if right angle */
function m7ang(v, p1, p2, r, col, t, o = {}) {
  const a1 = Math.atan2(p1[1] - v[1], p1[0] - v[0]), a2 = Math.atan2(p2[1] - v[1], p2[0] - v[0]);
  let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
  const ex = o.extra || "";
  let s = "";
  if (o.sq || Math.abs(Math.abs(d) - Math.PI / 2) < 0.004) {
    const q = r * 0.6, u1 = [Math.cos(a1), Math.sin(a1)], u2 = [Math.cos(a1 + d), Math.sin(a1 + d)];
    s += `<path d="M${(v[0] + u1[0] * q).toFixed(1)} ${(v[1] + u1[1] * q).toFixed(1)} L${(v[0] + (u1[0] + u2[0]) * q).toFixed(1)} ${(v[1] + (u1[1] + u2[1]) * q).toFixed(1)} L${(v[0] + u2[0] * q).toFixed(1)} ${(v[1] + u2[1] * q).toFixed(1)}" stroke="${col}" stroke-width="2.2" fill="none"${ex}/>`;
  } else {
    const n = 24; let pth = "";
    for (let i = 0; i <= n; i++) { const a = a1 + d * i / n; pth += (i ? "L" : "M") + (v[0] + r * Math.cos(a)).toFixed(1) + " " + (v[1] + r * Math.sin(a)).toFixed(1); }
    if (o.fill) s += `<path d="M${v[0].toFixed(1)} ${v[1].toFixed(1)} ${pth.replace("M", "L")} Z" fill="${col}" fill-opacity="${o.fill}" stroke="none"/>`;
    s += `<path d="${pth}" stroke="${col}" stroke-width="2.4" fill="none"${ex}/>`;
  }
  if (t != null && t !== "") { const L = r + (o.lo || 15), am = a1 + d / 2; s += T((v[0] + L * Math.cos(am)).toFixed(1), (v[1] + L * Math.sin(am) + 4.5).toFixed(1), t, { size: o.size || 12.5, fill: o.tc || col }); }
  return s;
}
function m7ticks(p, q, n, col = "var(--ink)") {
  if (!n) return "";
  const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], d = m7d(p, q) || 1, u = [(q[0] - p[0]) / d, (q[1] - p[1]) / d], nn = [-u[1], u[0]];
  let s = "";
  for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 5, c = [m[0] + u[0] * o, m[1] + u[1] * o]; s += `M${(c[0] - nn[0] * 6).toFixed(1)} ${(c[1] - nn[1] * 6).toFixed(1)} L${(c[0] + nn[0] * 6).toFixed(1)} ${(c[1] + nn[1] * 6).toFixed(1)} `; }
  return `<path d="${s}" stroke="${col}" stroke-width="2"/>`;
}
/* equal-side tick counts for sides [s0,s1,s2] */
function m7tickN(s) { const e = (x, y) => Math.abs(x - y) < 1e-6; if (e(s[0], s[1]) && e(s[1], s[2])) return [1, 1, 1]; if (e(s[0], s[1])) return [1, 1, 0]; if (e(s[1], s[2])) return [0, 1, 1]; if (e(s[0], s[2])) return [1, 0, 1]; return [0, 0, 0]; }
const m7lbl = (pt, cen, name, col = "var(--ink)", d = 15) => { let dx = pt[0] - cen[0], dy = pt[1] - cen[1]; const L = Math.hypot(dx, dy) || 1; return T((pt[0] + dx / L * d).toFixed(1), (pt[1] + dy / L * d + 5).toFixed(1), name, { size: 14, fill: col }); };
const m7side = (p, q, cen, t, col = "var(--muted)", d = 13) => { const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; let dx = m[0] - cen[0], dy = m[1] - cen[1]; const L = Math.hypot(dx, dy) || 1; return T((m[0] + dx / L * d).toFixed(1), (m[1] + dy / L * d + 4.5).toFixed(1), t, { size: 12, fill: col }); };
const m7dot = (p, col = "var(--ink)", r = 4) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${r}" fill="${col}"/>`;
const m7line = (p, q, col, w = 2.5, ex = "") => `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${ex}/>`;
/* polyline arc in model coords: centre c, radius r, from deg a0 to a1 */
function m7arcPts(c, r, a0, a1, n = 48) { const o = []; for (let i = 0; i <= n; i++) { const a = m7rad(a0 + (a1 - a0) * i / n); o.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); } return o; }
const m7path = (pts, f) => pts.map((p, i) => { const q = f(p); return (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1); }).join("");
/* a little compass at screen centre c, pencil at screen point t */
function m7compass(c, t) {
  const m = [(c[0] + t[0]) / 2, (c[1] + t[1]) / 2], d = m7d(c, t) || 1, n = [-(t[1] - c[1]) / d, (t[0] - c[0]) / d];
  const up = n[1] > 0 ? -1 : 1, h = [m[0] + n[0] * 30 * up, m[1] + n[1] * 30 * up];
  return `<g opacity=".9"><path d="M${c[0].toFixed(1)} ${c[1].toFixed(1)} L${h[0].toFixed(1)} ${h[1].toFixed(1)} L${t[0].toFixed(1)} ${t[1].toFixed(1)}" stroke="#c9d4ea" stroke-width="3" fill="none" stroke-linejoin="round"/><circle cx="${h[0].toFixed(1)}" cy="${h[1].toFixed(1)}" r="4.5" fill="var(--mari)"/><circle cx="${t[0].toFixed(1)}" cy="${t[1].toFixed(1)}" r="3" fill="var(--rani)"/></g>`;
}
const m7cmp = (x, y) => Math.abs(x - y) < 1e-9 ? "=" : (x < y ? "&lt;" : "&gt;");
const m7cmpT = (x, y) => Math.abs(x - y) < 1e-9 ? "=" : (x < y ? "<" : ">");

/* =========================================================
   1. k7m7_compass — construct a triangle from its three sides with ruler and compass
   params: c (base, first two letters of n), b (arc from first vertex), a (arc from second vertex),
           step 0 base · 1 arc from A · 2 arc from B · 3 mark C · 4 join; full (whole circles), mx (mark X on AB), n, u, lx
   readouts: sides, test, res     parts: "base", "arcA", "arcB", "apex"
   ========================================================= */
SIM_DEF.k7m7_compass = {
  def: { c: 4, b: 4, a: 4, step: 4, full: 0, mx: 0, n: "ABC", u: "cm", lx: "" },
  rng: { c: () => [1, 12, 0.5], b: () => [0.5, 12, 0.5], a: () => [0.5, 12, 0.5], step: () => [0, 4, 1] },
  lab: { c: "Base length", b: "Compass opening at the left end", a: "Compass opening at the right end", step: "Construction step (0 to 4)" },
  reads: { sides: "Lengths", test: "Longest vs the other two", res: "Result" },
  draw(D, P, sh, hl) {
    const N = String(P.n || "ABC"), u = P.u ? " " + P.u : "";
    const c = Math.max(.3, m7num(D.c)), b = Math.max(.1, m7num(D.b)), a = Math.max(.1, m7num(D.a)), st = clampN(m7num(D.step), 0, 4), full = !!+P.full;
    const S = m7sss(c, b, a), kd = m7kind(a, b, c), Cm = [S.x, S.h];
    let ra, rb;
    if (full) { ra = [0, 360]; rb = [180, -180]; }
    else if (kd > 0) { const ta = m7deg(Math.atan2(S.h, S.x)), tb = m7deg(Math.atan2(S.h, S.x - c)); ra = [ta - 26, ta + 26]; rb = [tb + 26, tb - 26]; }
    else { ra = [-30, 50]; rb = [210, 130]; }
    const A = [0, 0], B = [c, 0];
    const arcA = m7arcPts(A, b, ra[0], ra[1]), arcB = m7arcPts(B, a, rb[0], rb[1]);
    const f = m7fit([A, B, ...arcA.filter((_, i) => i % 4 === 0), ...arcB.filter((_, i) => i % 4 === 0)], [30, 34, 390, 204], 34);
    const sA = f(A), sB = f(B), sC = f(Cm);
    const fa = clampN(st, 0, 1), fb = clampN(st - 1, 0, 1), mk = st >= 2.5, jn = clampN(st - 3, 0, 1);
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 18, P.lx ? svgFr(P.lx) : `Construct ${N}: ${N[0]}${N[1]} = ${m7f(P.c)}${u}, ${N[0]}${N[2]} = ${m7f(P.b)}${u}, ${N[1]}${N[2]} = ${m7f(P.a)}${u}`, { size: 12.5, fill: "var(--muted)" });
    // arcs (drawn progressively)
    if (fa > 0) { const k = Math.max(2, Math.round(arcA.length * fa)); s += `<path d="${m7path(arcA.slice(0, k), f)}" fill="none" stroke="var(--sky)" stroke-width="2.2"${m7hl(hl, "arcA")}/>`; }
    if (fb > 0) { const k = Math.max(2, Math.round(arcB.length * fb)); s += `<path d="${m7path(arcB.slice(0, k), f)}" fill="none" stroke="var(--teal)" stroke-width="2.2"${m7hl(hl, "arcB")}/>`; }
    if (full && P.mx) { const X = f([b, 0]); s += m7dot(X, "var(--sky)", 4) + T(X[0] + 2, X[1] + 18, "X", { size: 13, fill: "var(--sky)" }); }
    // base
    s += m7line(sA, sB, "var(--ink)", 3, m7hl(hl, "base"));
    s += m7dot(sA) + m7dot(sB) + T(sA[0] - 4, sA[1] + 20, N[0], { size: 14 }) + T(sB[0] + 4, sB[1] + 20, N[1], { size: 14 });
    s += T((sA[0] + sB[0]) / 2, sA[1] + 20, `${m7f(P.c)}${u}`, { size: 12, fill: "var(--muted)" });
    if (full && P.mx && sh.has("res")) { const X = f([b, 0]); s += T((X[0] + sB[0]) / 2, X[1] - 8, `${N[1]}X = ${m7f(m7num(P.c) - m7num(P.b))}${u}`, { size: 11.5, fill: "var(--sky)" }); }
    // compass in action
    if (fa > 0 && fa < 1) s += m7compass(sA, f(arcA[Math.max(0, Math.round((arcA.length - 1) * fa))]));
    else if (fb > 0 && fb < 1) s += m7compass(sB, f(arcB[Math.max(0, Math.round((arcB.length - 1) * fb))]));
    // radius labels
    if (fa >= 1 && kd > 0 && !full) s += m7line(sA, sC, "var(--sky)", 1.4, ' stroke-dasharray="4 4" opacity=".7"');
    if (fb >= 1 && kd > 0 && !full) s += m7line(sB, sC, "var(--teal)", 1.4, ' stroke-dasharray="4 4" opacity=".7"');
    if (fa >= 1) { const m = f(arcA[Math.round(arcA.length * (kd > 0 && !full ? .3 : .12))]); s += T(m[0] - 8, m[1] - 8, `${m7f(P.b)}${u}`, { size: 12, fill: "var(--sky)" }); }
    if (fb >= 1) { const m = f(arcB[Math.round(arcB.length * (kd > 0 && !full ? .3 : .12))]); s += T(m[0] + 8, m[1] - 8, `${m7f(P.a)}${u}`, { size: 12, fill: "var(--teal)" }); }
    // apex / gap
    if (mk) {
      if (kd > 0) {
        if (jn > 0) {
          s += `<polygon points="${m7P([sA, sB, sC])}" fill="var(--mari)" fill-opacity="${(.16 * jn).toFixed(2)}"/>`;
          s += m7line(sA, sC, "var(--mari)", 3, ` opacity="${jn.toFixed(2)}"`) + m7line(sB, sC, "var(--mari)", 3, ` opacity="${jn.toFixed(2)}"`);
          if (jn > .95) { const tk = m7tickN([m7num(P.c), m7num(P.b), m7num(P.a)]); s += m7ticks(sA, sB, tk[0], "var(--ink)") + m7ticks(sA, sC, tk[1], "var(--ink)") + m7ticks(sB, sC, tk[2], "var(--ink)"); }
        }
        s += `<circle cx="${sC[0].toFixed(1)}" cy="${sC[1].toFixed(1)}" r="5.5" fill="var(--rani)"${m7hl(hl, "apex")}/>` + T(sC[0], sC[1] - 11, N[2], { size: 14, fill: "var(--rani)" });
        if (full) { const sC2 = f([S.x, -S.h]); s += `<circle cx="${sC2[0].toFixed(1)}" cy="${sC2[1].toFixed(1)}" r="4.5" fill="var(--rani)" opacity=".7"/>`; }
      } else if (kd === 0) {
        const sm = [a, b, c].sort((x, y) => x - y);
        if (Math.abs(a + b - c) < 1e-9) { const X = f([b, 0]); s += `<circle cx="${X[0].toFixed(1)}" cy="${X[1].toFixed(1)}" r="6" fill="none" stroke="var(--rani)" stroke-width="2.5"${m7hl(hl, "apex")}/>`; if (sh.has("res")) s += T(X[0], X[1] - 12, "arcs only touch", { size: 12, fill: "var(--rani)" }); }
        else s += T(210, 222, `${m7f(sm[0])} + ${m7f(sm[1])} = ${m7f(sm[2])}: the circles only touch`, { size: 12, fill: "var(--rani)" });
      } else {
        if (a + b < c) { const g1 = f([b, 0]), g2 = f([c - a, 0]); s += `<line x1="${g1[0].toFixed(1)}" y1="${(g1[1] - 4).toFixed(1)}" x2="${g2[0].toFixed(1)}" y2="${(g2[1] - 4).toFixed(1)}" stroke="var(--red)" stroke-width="5"${m7hl(hl, "apex")}/>` + (sh.has("res") ? T((g1[0] + g2[0]) / 2, g1[1] - 12, `gap ${m7f(c - a - b)}${u}`, { size: 12, fill: "var(--red)" }) : ""); }
        else s += T(210, 222, "one circle sits inside the other: they never meet", { size: 12, fill: "var(--red)" });
      }
    }
    if (sh.has("res") && st >= 2.5) { const kP = m7kind(P.a, P.b, P.c); s += T(210, 236, kP > 0 ? "the arcs cross: triangle exists" : kP === 0 ? "the three points fall on one line: no triangle" : "the arcs never meet: no triangle", { size: 12.5, fill: kP > 0 ? "var(--teal)" : "var(--red)" }); }
    s += "</svg>";
    const sp = [m7num(P.a), m7num(P.b), m7num(P.c)].sort((x, y) => x - y), kP = m7kind(P.a, P.b, P.c);
    return { svg: s, reads: {
      sides: `${N[0]}${N[1]} = ${m7f(P.c)}${u}, ${N[0]}${N[2]} = ${m7f(P.b)}${u}, ${N[1]}${N[2]} = ${m7f(P.a)}${u}`,
      test: `${m7f(sp[2])} ${m7cmp(sp[2], sp[0] + sp[1])} ${m7f(sp[0])} + ${m7f(sp[1])} = ${m7f(sp[0] + sp[1])}`,
      res: kP > 0 ? "the arcs cross, so the triangle exists" : kP === 0 ? "the arcs only touch on the base line: no triangle" : "the arcs never meet: no triangle" } };
  }
};

/* =========================================================
   3. k7m7_ineq — compare each length with the sum of the other two; rods try to close up
   params: p, q, r (lengths), u   readouts: cmp, verdict   parts: "rows", "rods"
   ========================================================= */
SIM_DEF.k7m7_ineq = {
  def: { p: 10, q: 15, r: 30, u: "cm" },
  rng: { p: () => [0.5, 40, 0.5], q: () => [0.5, 40, 0.5], r: () => [0.5, 40, 0.5] },
  lab: { p: "First length", q: "Second length", r: "Third length" },
  reads: { cmp: "Three comparisons", verdict: "Triangle?" },
  draw(D, P, sh, hl) {
    const v = [Math.max(.1, m7num(D.p)), Math.max(.1, m7num(D.q)), Math.max(.1, m7num(D.r))], vP = [m7num(P.p), m7num(P.q), m7num(P.r)];
    const tot = v[0] + v[1] + v[2], k = 236 / Math.max(...v.map((x, i) => tot - x), ...v), x0 = 150;
    const col = ["var(--sky)", "var(--teal)", "var(--rani)"], u = P.u ? " " + P.u : "";
    let s = `<svg viewBox="0 0 420 262">`;
    s += `<g${m7hl(hl, "rows")}>`;
    for (let i = 0; i < 3; i++) {
      const j = (i + 1) % 3, l = (i + 2) % 3, y = 14 + i * 50, ok = vP[i] < vP[j] + vP[l] - 1e-9, eq = Math.abs(vP[i] - vP[j] - vP[l]) < 1e-9;
      s += T(8, y + 16, `${m7f(vP[i])} ${sh.has("cmp") ? m7cmp(vP[i], vP[j] + vP[l]) : "?"} ${m7f(vP[j])} + ${m7f(vP[l])}`, { size: 12.5, a: "start", fill: sh.has("cmp") ? (ok ? "var(--teal)" : "var(--red)") : "var(--ink)" });
      s += `<rect x="${x0}" y="${y + 2}" width="${(v[i] * k).toFixed(1)}" height="13" rx="3" fill="${col[i]}"/>`;
      s += `<rect x="${x0}" y="${y + 19}" width="${(v[j] * k).toFixed(1)}" height="13" rx="3" fill="${col[j]}" fill-opacity=".75"/><rect x="${(x0 + v[j] * k + 1).toFixed(1)}" y="${y + 19}" width="${Math.max(0, v[l] * k - 1).toFixed(1)}" height="13" rx="3" fill="${col[l]}" fill-opacity=".75"/>`;
      if (sh.has("cmp")) s += T(404, y + 24, ok ? "✓" : "✗", { size: 17, fill: ok ? "var(--teal)" : "var(--red)", a: "end" });
      if (!ok && !eq && sh.has("cmp")) s += T(8, y + 33, "longer than the other two!", { size: 10.5, a: "start", fill: "var(--red)" });
    }
    s += `</g><line x1="10" y1="164" x2="410" y2="164" stroke="var(--line)"/>`;
    // rods: longest as base, the other two hinged at its ends
    const ord = [0, 1, 2].sort((x, y) => v[y] - v[x]), L = v[ord[0]], r1 = v[ord[1]], r2 = v[ord[2]];
    const kd = m7kind(v[0], v[1], v[2]), S = m7sss(L, r1, r2);
    const kk = Math.min(330 / L, kd > 0 && S.h > 0 ? 64 / S.h : 99), bx = 210 - L * kk / 2, by = 246;
    const A = [bx, by], B = [bx + L * kk, by];
    s += `<g${m7hl(hl, "rods")}>`;
    s += m7line(A, B, col[ord[0]], 6);
    if (!sh.has("verdict")) { const q1 = Math.min(r1 * kk, 64) * .7, q2 = Math.min(r2 * kk, 64) * .7; s += m7line(A, [A[0] - q1, by - q1], col[ord[1]], 6) + m7line(B, [B[0] + q2, by - q2], col[ord[2]], 6) + T(210, by - 18, "will the rods meet?", { size: 12, fill: "var(--muted)" }); }
    else if (kd > 0) { const C = [bx + S.x * kk, by - S.h * kk]; s += m7line(A, C, col[ord[1]], 6) + m7line(B, C, col[ord[2]], 6) + m7dot(C, "var(--mari)", 5); }
    else { const tA = [bx + r1 * kk, by - 9], tB = [bx + L * kk - r2 * kk, by - 9]; s += m7line([A[0], by - 9], tA, col[ord[1]], 6) + m7line([B[0], by - 9], tB, col[ord[2]], 6); if (kd < 0) s += T((tA[0] + tB[0]) / 2, by - 18, "can't meet", { size: 11.5, fill: "var(--red)" }); else s += T(tA[0], by - 18, "flat: just touch", { size: 11.5, fill: "var(--red)" }); }
    s += m7dot(A, "var(--ink)", 4) + m7dot(B, "var(--ink)", 4) + `</g>`;
    s += "</svg>";
    const kP = m7kind(vP[0], vP[1], vP[2]), lines = [0, 1, 2].map(i => { const j = (i + 1) % 3, l = (i + 2) % 3; return `${m7f(vP[i])} ${m7cmp(vP[i], vP[j] + vP[l])} ${m7f(vP[j])} + ${m7f(vP[l])}`; });
    return { svg: s, reads: { cmp: lines.join("; "), verdict: kP > 0 ? `yes: every length is less than the sum of the other two${u ? "" : ""}` : kP === 0 ? "no: the longest equals the sum of the other two (flat)" : "no: the longest is more than the sum of the other two" } };
  }
};

/* =========================================================
   5. k7m7_sas — two sides and the included angle: base AB = c, ∠A = ang, AC = b
   step 0 base · 1 angle arm (protractor) · 2 mark C · 3 join BC
   readouts: given, bc, angs   parts: "base", "arm", "apex", "bc"
   ========================================================= */
SIM_DEF.k7m7_sas = {
  def: { c: 5, b: 4, ang: 45, step: 3, n: "ABC", u: "cm", lx: "" },
  rng: { c: () => [1, 10, 0.5], b: () => [1, 10, 0.5], ang: () => [5, 180, 5], step: () => [0, 3, 1] },
  lab: { c: "Base length", b: "Other side length", ang: "Included angle (°)", step: "Construction step (0 to 3)" },
  reads: { given: "Given", bc: "Third side", angs: "Other angles" },
  draw(D, P, sh, hl) {
    const N = String(P.n || "ABC"), u = P.u ? " " + P.u : "", c = Math.max(.5, m7num(D.c)), b = Math.max(.5, m7num(D.b)), an = clampN(m7num(D.ang), 0, 180), st = clampN(m7num(D.step), 0, 3);
    const A = [0, 0], B = [c, 0], ur = [Math.cos(m7rad(an)), Math.sin(m7rad(an))], C = [b * ur[0], b * ur[1]], armL = Math.max(b, c) * 1.12, E = [armL * ur[0], armL * ur[1]];
    const f = m7fit([A, B, E, [0, Math.max(b, c) * .25], [-0.6, 0]], [34, 30, 386, 194], 30), sA = f(A), sB = f(B), sC = f(C), sE = f(E);
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 18, P.lx ? svgFr(P.lx) : `${N[0]}${N[1]} = ${m7f(P.c)}${u}, ∠${N[0]} = ${m7f(P.ang, 0)}°, ${N[0]}${N[2]} = ${m7f(P.b)}${u}`, { size: 12.5, fill: "var(--muted)" });
    if (st > 0.4 && st < 2.6) { // protractor
      const R = 46, o = clampN(Math.min(st - .4, 2.6 - st) * 2, 0, 1);
      let pr = `<path d="M${sA[0] - R} ${sA[1]} A${R} ${R} 0 0 1 ${sA[0] + R} ${sA[1]}Z" fill="var(--sky)" fill-opacity=".12" stroke="var(--sky)" stroke-width="1.4"/>`;
      for (let d = 0; d <= 180; d += 10) { const q = m7rad(d), l = d % 30 ? 5 : 9; pr += `<line x1="${(sA[0] + R * Math.cos(q)).toFixed(1)}" y1="${(sA[1] - R * Math.sin(q)).toFixed(1)}" x2="${(sA[0] + (R - l) * Math.cos(q)).toFixed(1)}" y2="${(sA[1] - (R - l) * Math.sin(q)).toFixed(1)}" stroke="var(--sky)" stroke-width="1.2"/>`; }
      s += `<g opacity="${o.toFixed(2)}">${pr}</g>`;
    }
    s += m7line(sA, sB, "var(--ink)", 3, m7hl(hl, "base"));
    if (st > 0) { const t = clampN(st, 0, 1), e2 = [m7lerp(sA[0], sE[0], t), m7lerp(sA[1], sE[1], t)]; s += m7line(sA, e2, "var(--sky)", 2.2, m7hl(hl, "arm")); s += m7ang(sA, sB, sE, 24, "var(--mari)", `${m7f(P.ang, 0)}°`, { lo: 14 }); }
    if (st >= 1.5) { s += `<circle cx="${sC[0].toFixed(1)}" cy="${sC[1].toFixed(1)}" r="5.5" fill="var(--rani)"${m7hl(hl, "apex")}/>`; s += m7side(sA, sC, sB, `${m7f(P.b)}${u}`, "var(--sky)", 14); }
    if (st >= 2.5 && an < 179.9) { s += `<polygon points="${m7P([sA, sB, sC])}" fill="var(--mari)" fill-opacity=".14"/>` + m7line(sB, sC, "var(--mari)", 3, m7hl(hl, "bc")); s += m7line(sA, sC, "var(--mari)", 3); }
    s += m7dot(sA) + m7dot(sB);
    const cen = m7cen([sA, sB, sC]);
    s += T(sA[0] - 6, sA[1] + 20, N[0], { size: 14 }) + T(sB[0] + 4, sB[1] + 20, N[1], { size: 14 }) + T((sA[0] + sB[0]) / 2, sA[1] + 20, `${m7f(P.c)}${u}`, { size: 12, fill: "var(--muted)" });
    if (st >= 1.5) s += m7lbl(sC, an > 150 ? [sC[0] + 20, sC[1] + 30] : cen, N[2], "var(--rani)", 15);
    const cP = m7num(P.c), bP = m7num(P.b), aP = m7num(P.ang), bc = Math.sqrt(Math.max(0, cP * cP + bP * bP - 2 * cP * bP * Math.cos(m7rad(aP))));
    if (aP >= 179.9 && st >= 1.5 && sh.has("bc")) s += T(210, 232, `${N[2]}, ${N[0]}, ${N[1]} lie on one straight line: no triangle`, { size: 12.5, fill: "var(--red)" });
    else if (sh.has("bc") && st >= 2.5) s += T(210, 232, `${N[1]}${N[2]} measures about ${m7f(bc)}${u}`, { size: 12.5, fill: "var(--teal)" });
    s += "</svg>";
    const angB = aP >= 179.9 ? 0 : m7opp(bP, bc, cP), angC = aP >= 179.9 ? 0 : 180 - aP - angB;
    return { svg: s, reads: { given: `${N[0]}${N[1]} = ${m7f(P.c)}${u}, ${N[0]}${N[2]} = ${m7f(P.b)}${u}, ∠${N[0]} = ${m7f(aP, 0)}°`, bc: aP >= 179.9 ? "no triangle (angle is a straight angle)" : `${N[1]}${N[2]} ≈ ${m7f(bc)}${u}`, angs: aP >= 179.9 ? "—" : `∠${N[1]} ≈ ${m7f(angB, 0)}°, ∠${N[2]} ≈ ${m7f(angC, 0)}°` } };
  }
};

/* =========================================================
   6. k7m7_asa — two angles and the included side: base AB = c, ∠A = A, ∠B = B; par shows the line m ∥ l through B
   step 0 base · 1 ray at A · 2 ray at B · 3 mark C
   readouts: given, third, status   parts: "rayA", "rayB", "apex", "par"
   ========================================================= */
SIM_DEF.k7m7_asa = {
  def: { c: 5, A: 45, B: 80, step: 3, par: 0, n: "ABC", u: "cm", lx: "" },
  rng: { c: () => [2, 10, 0.5], A: () => [5, 175, 1], B: () => [5, 175, 1], step: () => [0, 3, 1] },
  lab: { c: "Included side", A: "Angle at the left end (°)", B: "Angle at the right end (°)", step: "Construction step (0 to 3)" },
  reads: { given: "Given", third: "Third angle", status: "Do the arms meet?" },
  draw(D, P, sh, hl) {
    const N = String(P.n || "ABC"), u = P.u ? " " + P.u : "", c = Math.max(.5, m7num(D.c)), aA = clampN(m7num(D.A), 1, 179), aB = clampN(m7num(D.B), 1, 179), st = clampN(m7num(D.step), 0, 3);
    const A = [0, 0], B = [c, 0], uA = [Math.cos(m7rad(aA)), Math.sin(m7rad(aA))], uB = [Math.cos(m7rad(180 - aB)), Math.sin(m7rad(180 - aB))];
    const sum = aA + aB, meet = sum < 180 - 1e-6;
    const AC = meet ? c * Math.sin(m7rad(aB)) / Math.sin(m7rad(sum)) : Infinity, BC = meet ? c * Math.sin(m7rad(aA)) / Math.sin(m7rad(sum)) : Infinity;
    const cap = 1.9 * c, lA = meet ? Math.min(AC * 1.18, cap) : cap * .8, lB = meet ? Math.min(BC * 1.18, cap) : cap * .8;
    const EA = [uA[0] * lA, uA[1] * lA], EB = [c + uB[0] * lB, uB[1] * lB];
    const f = m7fit([A, B, EA, EB, [0, c * .3]], [30, 30, 390, 194], 30), sA = f(A), sB = f(B);
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 18, P.lx ? svgFr(P.lx) : `∠${N[0]} = ${m7f(P.A, 0)}°, ${N[0]}${N[1]} = ${m7f(P.c)}${u}, ∠${N[1]} = ${m7f(P.B, 0)}°`, { size: 12.5, fill: "var(--muted)" });
    s += m7line(sA, sB, "var(--ink)", 3);
    const tA = clampN(st, 0, 1), tB = clampN(st - 1, 0, 1);
    if (tA > 0) { const e = f([EA[0] * tA, EA[1] * tA]); s += m7line(sA, e, "var(--sky)", 2.4, m7hl(hl, "rayA")) + m7ang(sA, sB, f(EA), 24, "var(--sky)", `${m7f(P.A, 0)}°`, { lo: 13 }); if (tA >= 1 && +P.par) s += T(e[0] + 8, e[1] + 2, "l", { size: 14, fill: "var(--sky)", a: "start" }); }
    if (tB > 0) { const e = f([c + (EB[0] - c) * tB, EB[1] * tB]); s += m7line(sB, e, "var(--teal)", 2.4, m7hl(hl, "rayB")) + m7ang(sB, f(EB), sA, 24, "var(--teal)", `${m7f(P.B, 0)}°`, { lo: 13 }); }
    if (+P.par) { const L = cap * .9, M = f([c + uA[0] * L, uA[1] * L]); s += m7line(sB, M, "var(--rani)", 2, ` stroke-dasharray="6 5"${m7hl(hl, "par")}`) + T(M[0] + 8, M[1] + 2, "m", { size: 14, fill: "var(--rani)", a: "start" }); s += m7ang(sB, M, sA, 38, "var(--rani)", Math.abs(m7num(P.B) - (180 - m7num(P.A))) < .5 ? "" : `${m7f(180 - m7num(P.A), 0)}°`, { lo: 16 }); }
    if (st >= 2.5) {
      if (meet && AC <= cap * 1.05) { const C = f([uA[0] * AC, uA[1] * AC]); s += `<polygon points="${m7P([sA, sB, C])}" fill="var(--mari)" fill-opacity=".15"/><circle cx="${C[0].toFixed(1)}" cy="${C[1].toFixed(1)}" r="5.5" fill="var(--rani)"${m7hl(hl, "apex")}/>` + T(C[0], C[1] - 12, N[2], { size: 14, fill: "var(--rani)" }); if (sh.has("third")) s += m7ang(C, sA, sB, 20, "var(--mari)", `${m7f(180 - m7num(P.A) - m7num(P.B), 0)}°`, { lo: 12 }); }
      else if (meet && sh.has("status")) s += T(210, 232, "the arms meet far away, beyond this page", { size: 12.5, fill: "var(--mari)" });
      else if (sh.has("status")) s += T(210, 232, Math.abs(sum - 180) < 1e-6 ? "the arms are parallel: they never meet" : "the arms open away from each other: they never meet", { size: 12.5, fill: "var(--red)" });
    }
    s += m7dot(sA) + m7dot(sB) + T(sA[0] - 6, sA[1] + 20, N[0], { size: 14 }) + T(sB[0] + 6, sB[1] + 20, N[1], { size: 14 }) + T((sA[0] + sB[0]) / 2, sA[1] + 20, `${m7f(P.c)}${u}`, { size: 12, fill: "var(--muted)" });
    s += "</svg>";
    const pA = m7num(P.A), pB = m7num(P.B), ps = pA + pB;
    return { svg: s, reads: { given: `∠${N[0]} = ${m7f(pA, 0)}°, ∠${N[1]} = ${m7f(pB, 0)}°, ${N[0]}${N[1]} = ${m7f(P.c)}${u}`, third: ps < 180 ? `∠${N[2]} = 180° − (${m7f(pA, 0)}° + ${m7f(pB, 0)}°) = ${m7f(180 - ps, 0)}°` : "no third vertex", status: ps < 180 ? `${m7f(pA, 0)}° + ${m7f(pB, 0)}° = ${m7f(ps, 0)}° < 180°: they meet` : `${m7f(pA, 0)}° + ${m7f(pB, 0)}° = ${m7f(ps, 0)}° ≥ 180°: no triangle` } };
  }
};

/* =========================================================
   7. k7m7_sum — angle sum with a line XY through A parallel to BC; the angles at B and C turn half a circle
   about the midpoints of AB and AC and land at A as ∠XAB and ∠YAC (alternate angles). ext shows an exterior angle at C.
   params: B, C (base angles), base, par 0/1, mv 0–1, ext 0/1/2, n
   readouts: angs, sum, ext   parts: "par", "copyB", "copyC", "ext"
   ========================================================= */
SIM_DEF.k7m7_sum = {
  def: { B: 50, C: 70, base: 6, par: 0, mv: 0, ext: 0, n: "ABC", showA: 1 },
  rng: { B: () => [5, 170, 1], C: () => [5, 170, 1], mv: () => [0, 1, 0.05], base: () => [3, 9, 0.5] },
  lab: { B: "Angle at B (°)", C: "Angle at C (°)", mv: "Slide the angles to the top", base: "Base length (cm)" },
  reads: { angs: "Angles", sum: "Sum", ext: "Exterior angle" },
  draw(D, P, sh, hl) {
    const N = String(P.n || "ABC"), bA = clampN(m7num(D.B), 1, 178), cA = clampN(m7num(D.C), 1, 178), L = Math.max(1, m7num(D.base)), ext = Math.round(m7num(P.ext));
    const ok = bA + cA < 179.5;
    let s = `<svg viewBox="0 0 420 240">`;
    if (!ok) { s += T(210, 120, `∠${N[1]} + ∠${N[2]} = ${m7f(m7num(P.B) + m7num(P.C), 0)}° is not less than 180°: no triangle`, { size: 13, fill: "var(--red)" }) + "</svg>"; return { svg: s, reads: { angs: "—", sum: "no triangle", ext: "—" } }; }
    const AB = L * Math.sin(m7rad(cA)) / Math.sin(m7rad(bA + cA)), Bm = [0, 0], Cm = [L, 0], Am = [AB * Math.cos(m7rad(bA)), AB * Math.sin(m7rad(bA))];
    const xs = [Bm, Cm, Am, [Am[0] - L * .45, Am[1]], [Am[0] + L * .45, Am[1]]]; if (ext) xs.push([L * 1.45, 0]);
    const f = m7fit(xs, [26, 30, 394, 212], 34), sB = f(Bm), sC = f(Cm), sA = f(Am);
    const aA = 180 - bA - cA, mv = clampN(m7num(D.mv), 0, 1);
    s += `<polygon points="${m7P([sA, sB, sC])}" fill="var(--manila)" fill-opacity=".14" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>`;
    if (+P.par) { const X = f([Am[0] - L * .55, Am[1]]), Y = f([Am[0] + L * .55, Am[1]]); s += m7line(X, Y, "var(--sky)", 2.2, m7hl(hl, "par")) + T(X[0] - 2, X[1] - 8, "X", { size: 13, fill: "var(--sky)" }) + T(Y[0] + 2, Y[1] - 8, "Y", { size: 13, fill: "var(--sky)" }); }
    if (ext) { const Dp = f([L * 1.45, 0]); s += m7line(sC, Dp, "var(--ink)", 2.2, ' stroke-dasharray="7 5"') + m7dot(Dp, "var(--ink)", 3) + T(Dp[0] + 2, Dp[1] + 19, "D", { size: 14 }); s += m7ang(sC, Dp, sA, 30, "var(--mari)", sh.has("ext") ? `${m7f(180 - m7num(P.C), 0)}°` : "?", { extra: m7hl(hl, "ext"), lo: 16, fill: .18 }); if (ext === 2) { const E = f([L + (Am[0] - Bm[0]) * .8, (Am[1] - Bm[1]) * .8]); s += m7line(sC, E, "var(--rani)", 2, ' stroke-dasharray="5 4"') + T(E[0] + 4, E[1] - 6, "E", { size: 13, fill: "var(--rani)" }); s += m7ang(sC, E, sA, 20, "var(--rani)", "", {}) + m7ang(sC, Dp, E, 20, "var(--teal)", "", {}); } }
    // angle wedges
    const wedge = (v, p1, p2, col, r, t, ex = "") => m7ang(v, p1, p2, r, col, t, { fill: .35, extra: ex, lo: 13 });
    if (+P.showA) s += wedge(sA, sB, sC, "var(--rani)", 22, sh.has("angs") || sh.has("sum") ? `${m7f(180 - m7num(P.B) - m7num(P.C), 0)}°` : "?");
    s += wedge(sB, sC, sA, "var(--teal)", 24, `${m7f(P.B, 0)}°`) + wedge(sC, sA, sB, "var(--mari)", 24, ext ? "" : `${m7f(P.C, 0)}°`);
    if (mv > 0) {
      const MB = [(sA[0] + sB[0]) / 2, (sA[1] + sB[1]) / 2], MC = [(sA[0] + sC[0]) / 2, (sA[1] + sC[1]) / 2], th = (180 * mv).toFixed(1);
      s += `<g transform="rotate(${th} ${MB[0].toFixed(1)} ${MB[1].toFixed(1)})"${m7hl(hl, "copyB")}>${m7ang(sB, sC, sA, 24, "var(--teal)", "", { fill: .55 })}</g>`;
      s += `<g transform="rotate(${th} ${MC[0].toFixed(1)} ${MC[1].toFixed(1)})"${m7hl(hl, "copyC")}>${m7ang(sC, sA, sB, 24, "var(--mari)", "", { fill: .55 })}</g>`;
      if (mv > .97) { s += T(f([Am[0] - L * .3, Am[1]])[0], sA[1] - 10, `${m7f(P.B, 0)}°`, { size: 12, fill: "var(--teal)" }) + T(f([Am[0] + L * .3, Am[1]])[0], sA[1] - 10, `${m7f(P.C, 0)}°`, { size: 12, fill: "var(--mari)" }); }
    }
    const cen = m7cen([sA, sB, sC]);
    s += m7lbl(sA, cen, N[0], "var(--ink)", 16).replace(/y="([\d.]+)"/, (m, y) => `y="${(+y - (P.par ? 10 : 0)).toFixed(1)}"`) + m7lbl(sB, cen, N[1]) + m7lbl(sC, cen, N[2]);
    if (sh.has("sum")) s += T(210, 234, `${m7f(P.B, 0)}° + ${m7f(P.C, 0)}° + ${m7f(aA, 0)}° = 180°`, { size: 13, fill: "var(--teal)" });
    s += "</svg>";
    const pB = m7num(P.B), pC = m7num(P.C), pA = 180 - pB - pC;
    return { svg: s, reads: { angs: `∠${N[0]} = ${m7f(pA, 0)}°, ∠${N[1]} = ${m7f(pB, 0)}°, ∠${N[2]} = ${m7f(pC, 0)}°`, sum: `${m7f(pA, 0)}° + ${m7f(pB, 0)}° + ${m7f(pC, 0)}° = 180°`, ext: Math.round(m7num(P.ext)) ? `∠${N[0]}${N[2]}D = 180° − ${m7f(pC, 0)}° = ${m7f(180 - pC, 0)}° = ∠${N[0]} + ∠${N[1]}` : `extend ${N[1]}${N[2]} beyond ${N[2]} to see it` } };
  }
};

/* =========================================================
   SCENE — the White Rann of Kutch at dusk: salt flat with hexagon crust, full moon, tent city, flamingos, camel
   ========================================================= */
let m7w = null;
function m7wInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  m7w = { W, H,
    stars: Array.from({ length: Math.round(W * H / 6000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .5), r: rnd(.3, 1.5), p: rnd(0, 6.28) })),
    tents: Array.from({ length: Math.max(7, Math.round(W / 120)) }, (_, i) => ({ x: (i + .5) * W / Math.max(7, Math.round(W / 120)) + rnd(-20, 20), s: rnd(.7, 1.15), c: ["#e04a86", "#f4a51c", "#35c29a", "#62b6e8", "#b8323a"][i % 5], ph: rnd(0, 6.28) })),
    birds: Array.from({ length: 7 }, (_, i) => ({ x: rnd(0, W), y: rnd(H * .12, H * .36), v: rnd(.25, .55), ph: rnd(0, 6.28), s: rnd(.7, 1.2) })),
    camelX: rnd(0, W) };
}
SCENES.k7m7_rann = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!m7w || m7w.W !== W || m7w.H !== H) m7wInit(W, H);
  const S = m7w, hz = H * .58;
  let g = c.createLinearGradient(0, 0, 0, hz); g.addColorStop(0, "#0b1430"); g.addColorStop(.55, "#2a2350"); g.addColorStop(.85, "#7a3f5e"); g.addColorStop(1, "#d98a62");
  c.fillStyle = g; c.fillRect(0, 0, W, hz);
  S.stars.forEach(s => { c.globalAlpha = .3 + .4 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // full moon rising slowly
  const mr = Math.min(W, H) * .06, mx = W * .78, my = hz * .42 - Math.sin(t / 40000) * hz * .05;
  const gl = c.createRadialGradient(mx, my, mr * .8, mx, my, mr * 3); gl.addColorStop(0, "rgba(255,240,220,.3)"); gl.addColorStop(1, "rgba(255,240,220,0)"); c.fillStyle = gl; c.beginPath(); c.arc(mx, my, mr * 3, 0, 6.28); c.fill();
  c.fillStyle = "#fbf1dc"; c.beginPath(); c.arc(mx, my, mr, 0, 6.28); c.fill();
  // white salt desert with perspective hexagon crust
  g = c.createLinearGradient(0, hz, 0, H); g.addColorStop(0, "#c9c3d6"); g.addColorStop(1, "#eef0f6"); c.fillStyle = g; c.fillRect(0, hz, W, H - hz);
  c.strokeStyle = "rgba(120,110,150,.28)"; c.lineWidth = 1;
  for (let row = 0; row < 14; row++) {
    const y = hz + Math.pow(row / 14, 1.8) * (H - hz), sc = .15 + row / 14 * 1.3, w = 46 * sc;
    for (let x = -w + (row % 2) * w / 2; x < W + w; x += w) { c.beginPath(); c.moveTo(x, y); c.lineTo(x + w * .25, y - 5 * sc); c.lineTo(x + w * .75, y - 5 * sc); c.lineTo(x + w, y); c.stroke(); }
  }
  // moon reflection
  c.fillStyle = "rgba(255,240,220,.18)"; c.beginPath(); c.ellipse(mx, hz + (H - hz) * .3, mr * 1.2, mr * .25, 0, 0, 6.28); c.fill();
  // tent city along the horizon
  S.tents.forEach((tn, i) => {
    const s = 34 * tn.s, x = tn.x, y = hz + 4;
    c.fillStyle = "#f3e9d6"; c.beginPath(); c.moveTo(x - s, y); c.lineTo(x, y - s * 1.05); c.lineTo(x + s, y); c.closePath(); c.fill();
    c.fillStyle = tn.c; c.beginPath(); c.moveTo(x - s * .55, y - s * .48); c.lineTo(x, y - s * 1.05); c.lineTo(x + s * .55, y - s * .48); c.closePath(); c.fill();
    c.fillStyle = `rgba(255,190,90,${.55 + .3 * Math.sin(t / 600 + tn.ph)})`; c.beginPath(); c.moveTo(x - s * .22, y); c.lineTo(x, y - s * .45); c.lineTo(x + s * .22, y); c.closePath(); c.fill();
    c.strokeStyle = "rgba(90,60,40,.6)"; c.beginPath(); c.moveTo(x, y - s * 1.05); c.lineTo(x, y - s * 1.35); c.stroke(); c.fillStyle = tn.c; c.fillRect(x, y - s * 1.35, 9, 5);
  });
  // flamingos flying in a line
  S.birds.forEach(b => {
    if (!RM) { b.x += b.v; if (b.x > W + 40) { b.x = -40; b.y = H * (.12 + Math.random() * .24); } }
    const fl = Math.sin(t / 180 + b.ph) * 7 * b.s, x = b.x, y = b.y;
    c.strokeStyle = "#ff8fb1"; c.lineWidth = 2.2 * b.s; c.beginPath(); c.moveTo(x - 18 * b.s, y); c.lineTo(x + 16 * b.s, y); c.stroke();
    c.beginPath(); c.moveTo(x - 4 * b.s, y); c.lineTo(x - 10 * b.s, y - fl); c.moveTo(x + 2 * b.s, y); c.lineTo(x + 8 * b.s, y - fl); c.stroke();
    c.fillStyle = "#2a1a20"; c.fillRect(x + 16 * b.s, y - 1, 4 * b.s, 2);
  });
  // camel walking slowly near the front
  if (!RM) S.camelX -= .25; if (S.camelX < -80) S.camelX = W + 80;
  const cx = S.camelX, cy = H * .9, st = Math.sin(t / 300);
  c.fillStyle = "rgba(60,40,60,.75)";
  c.beginPath(); c.ellipse(cx, cy - 34, 26, 12, 0, 0, 6.28); c.fill(); c.beginPath(); c.ellipse(cx - 2, cy - 46, 12, 9, 0, 0, 6.28); c.fill();
  c.lineWidth = 4; c.strokeStyle = "rgba(60,40,60,.75)"; c.beginPath(); c.moveTo(cx - 24, cy - 36); c.quadraticCurveTo(cx - 38, cy - 50, cx - 40, cy - 64); c.stroke();
  c.beginPath(); c.ellipse(cx - 44, cy - 64, 7, 4, 0, 0, 6.28); c.fill();
  c.lineWidth = 3; [[-16, st], [-8, -st], [12, -st], [20, st]].forEach(([dx, k]) => { c.beginPath(); c.moveTo(cx + dx, cy - 26); c.lineTo(cx + dx + k * 4, cy); c.stroke(); });
  c.fillStyle = "rgba(4,8,24,.25)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Laali, the Kutch flamingo with a compass and a mirror-work scarf
   ========================================================= */
GUIDES.k7m7_flamingo = () => `<svg class="guide flamingo" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="58" cy="125" rx="26" ry="3.5" fill="#000" opacity=".25"/>
  <path d="M58 86 L58 123 M58 104 L72 96 L64 92" stroke="#e8708f" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M52 123 h12" stroke="#e8708f" stroke-width="3" stroke-linecap="round"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -1.8;0 0" dur="2.8s" repeatCount="indefinite"/>
    <ellipse cx="56" cy="76" rx="24" ry="15" fill="#ff8fb1"/>
    <path d="M36 72 Q24 66 22 76 Q30 84 42 82Z" fill="#ff6f9a"/>
    <g><animateTransform attributeName="transform" type="rotate" values="0 62 72;-10 62 72;0 62 72" dur="2.4s" repeatCount="indefinite"/>
      <path d="M44 70 Q60 60 76 72 Q64 84 46 80Z" fill="#ff6f9a"/><path d="M54 80 Q62 86 72 76" stroke="#22262e" stroke-width="2.5" fill="none"/></g>
    <path d="M74 70 Q90 62 84 44 Q78 30 84 22" stroke="#ff8fb1" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M74 68 Q86 60 82 48" stroke="#e04a86" stroke-width="3.6" fill="none" opacity=".9"/>
    <circle cx="74" cy="67" r="2" fill="#62b6e8"/><circle cx="80" cy="61" r="2" fill="#f4a51c"/><circle cx="83" cy="53" r="2" fill="#62b6e8"/>
    <g><animateTransform attributeName="transform" type="rotate" values="0 86 20;6 86 20;0 86 20;-4 86 20;0 86 20" dur="3.4s" repeatCount="indefinite"/>
      <ellipse cx="88" cy="20" rx="11" ry="10" fill="#ff8fb1"/>
      <circle cx="91" cy="17" r="3.4" fill="#15202a"/><circle cx="92.2" cy="15.8" r="1.1" fill="#fff"/>
      <rect x="86" y="12" width="10" height="0" fill="#ff8fb1"><animate attributeName="height" values="0;0;0;9;0" keyTimes="0;.8;.9;.95;1" dur="4.2s" repeatCount="indefinite"/></rect>
      <path d="M97 18 Q110 20 108 30 Q104 34 100 28 Q98 24 95 24Z" fill="#f7efe4"/><path d="M104 27 Q108 32 105 35 Q101 33 100 28Z" fill="#22262e"/>
      <circle cx="84" cy="23" r="2.6" fill="#ff5c8a" opacity=".5"/></g>
    <g transform="translate(22 92)"><path d="M10 -26 L2 0 M10 -26 L18 0" stroke="#c9d4ea" stroke-width="2.6" stroke-linecap="round"/><circle cx="10" cy="-26" r="3.2" fill="#f4a51c"/><path d="M18 0 l1 5" stroke="#e04a86" stroke-width="2.4"/>
      <path d="M0 4 A16 16 0 0 1 22 -6" stroke="#62b6e8" stroke-width="1.6" fill="none" stroke-dasharray="3 3"><animate attributeName="stroke-dashoffset" values="0;12" dur="1.6s" repeatCount="indefinite"/></path></g>
  </g>
</svg>`;

/* =========================================================================================
   3D SIMULATIONS (WebGL via make3D, drag to turn)
   ========================================================================================= */
function m7tex(THREE, draw, w, h) { const cv = document.createElement("canvas"); cv.width = w || 128; cv.height = h || 128; draw(cv.getContext("2d"), cv.width, cv.height); const t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t; }
const m7reads = (name, P) => SIM_DEF[name].draw(Object.assign({}, SIM_DEF[name].def, P), Object.assign({}, SIM_DEF[name].def, P), new Set(Object.keys(SIM_DEF[name].reads)), null).reads;

/* ---------- 3D-1. k7m7_tent3d — three bamboo poles on the salt flat: the longest lies on the ground, the other two
   rise from its ends (rise 0–1). If they meet, a tent cloth is pitched and the centre pole is the altitude.
   params: p, q, r (lengths in m), rise   readouts: cmp, verdict, h   parts: "rods", "pole" ---------- */
SIM_DEF.k7m7_tent3d = {
  def: { p: 4, q: 5, r: 8, rise: 1 },
  rng: { p: () => [0.5, 12, 0.5], q: () => [0.5, 12, 0.5], r: () => [0.5, 12, 0.5], rise: () => [0, 1, 0.05] },
  lab: { p: "First pole (m)", q: "Second pole (m)", r: "Third pole (m)", rise: "Raise the two poles" },
  reads: { cmp: "Three comparisons", verdict: "Triangle?", h: "Centre pole (altitude)" },
  readouts(P) {
    const r = m7reads("k7m7_ineq", { p: P.p, q: P.q, r: P.r, u: "m" }), v = [+P.p, +P.q, +P.r].sort((x, y) => y - x), S = m7sss(v[0], v[1], v[2]);
    return { cmp: r.cmp, verdict: r.verdict, h: m7kind(v[0], v[1], v[2]) > 0 ? `${m7f(S.h, 2)} m tall, standing on the longest pole` : "no tent can be pitched" };
  },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 12, phi: 1.12, theta: 0.35, auto: 0.08, target: [0, 1.6, -0.8], hint: "Drag to walk around the tent" });
    if (!g) return null;
    const { THREE, root } = g;
    const salt = m7tex(THREE, (c, w, h) => { c.fillStyle = "#e9ecf3"; c.fillRect(0, 0, w, h); c.strokeStyle = "rgba(120,120,150,.35)"; c.lineWidth = 2; for (let j = 0; j < 9; j++) for (let i = 0; i < 9; i++) { const x = i * 32 + (j % 2) * 16, y = j * 28; c.beginPath(); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; c.lineTo(x + 15 * Math.cos(a), y + 15 * Math.sin(a)); } c.closePath(); c.stroke(); } }, 256, 256);
    salt.wrapS = salt.wrapT = THREE.RepeatWrapping; salt.repeat.set(16, 16);
    const ground = new THREE.Mesh(new THREE.CircleGeometry(40, 64), new THREE.MeshStandardMaterial({ map: salt, color: 0x6f7a96, roughness: .95 })); ground.rotation.x = -Math.PI / 2; root.add(ground);
    const cloth = m7tex(THREE, (c, w, h) => { c.fillStyle = "#b8323a"; c.fillRect(0, 0, w, h); for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? "#f4a51c" : "#35c29a"; c.fillRect(0, i * h / 8, w, 5); } c.fillStyle = "#fff"; for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { c.beginPath(); c.arc(i * 16 + 8, j * 16 + 10, 2.4, 0, 6.28); c.fill(); } }, 128, 128);
    const cMat = new THREE.MeshStandardMaterial({ map: cloth, side: THREE.DoubleSide, roughness: .8, transparent: true, opacity: .88 });
    const rodG = new THREE.CylinderGeometry(0.07, 0.07, 1, 12);
    const mk = col => { const m = new THREE.Mesh(rodG, new THREE.MeshStandardMaterial({ color: col, roughness: .55, emissive: col, emissiveIntensity: .1 })); root.add(m); return m; };
    const rBase = mk(0xe04a86), rL = mk(0x62b6e8), rR = mk(0x35c29a), pole = mk(0xf4a51c);
    const back = [mk(0xc9a46a), mk(0xc9a46a), mk(0xc9a46a)];
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 12), new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0xf4a51c, emissiveIntensity: .5 })); root.add(knob);
    let tentMesh = null;
    const lBase = g.label("", [0, 0, 0], "plain"), lL = g.label("", [0, 0, 0], "plain"), lR = g.label("", [0, 0, 0], "plain"), lH = g.label("", [0, 0, 0], "plain"), lMsg = g.label("", [0, 4.4, 0], "big");
    const setRod = (m, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.max(1e-3, Math.hypot(dx, dy, dz)); m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2); m.scale.set(1, L, 1); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L)); m.visible = L > .01; };
    const st = { hl: null };
    g.onFrame(t => { const k = st.hl === "rods" ? .5 + .4 * Math.sin(t * 8) : .1; [rL, rR, rBase].forEach(m => m.material.emissiveIntensity = k); pole.material.emissiveIntensity = st.hl === "pole" ? .5 + .4 * Math.sin(t * 8) : .1; });
    function apply(D, P, sh, hl) {
      st.hl = hl;
      const v = [Math.max(.2, +D.p), Math.max(.2, +D.q), Math.max(.2, +D.r)].sort((x, y) => y - x), L = v[0], r1 = v[1], r2 = v[2], rise = clampN(+D.rise, 0, 1);
      const sc = 7 / Math.max(L, r1 + r2 * .2, 4), kd = m7kind(L, r1, r2), S = m7sss(L, r1, r2);
      const angA = kd > 0 ? Math.atan2(S.h, S.x) : 0, angB = kd > 0 ? Math.atan2(S.h, L - S.x) : 0;
      const tA = m7lerp(Math.PI, angA, rise), tB = m7lerp(Math.PI, angB, rise);
      const x0 = -L * sc / 2, x1 = L * sc / 2, y = .08;
      const A = [x0, y, 0], B = [x1, y, 0], EA = [x0 + r1 * sc * Math.cos(tA), y + r1 * sc * Math.sin(tA), 0], EB = [x1 - r2 * sc * Math.cos(tB), y + r2 * sc * Math.sin(tB), 0];
      setRod(rBase, A, B); setRod(rL, A, EA); setRod(rR, B, EB);
      const done = kd > 0 && rise > .98, C = [x0 + S.x * sc, y + S.h * sc, 0], dep = -Math.min(4, L * sc * .55);
      knob.visible = done; knob.position.set(C[0], C[1], C[2]);
      pole.visible = done; if (done) setRod(pole, [C[0], y, 0], C);
      back.forEach(m => m.visible = done); if (done) { setRod(back[0], [x0, y, dep], [x1, y, dep]); setRod(back[1], [x0, y, dep], [C[0], C[1], dep]); setRod(back[2], [x1, y, dep], [C[0], C[1], dep]); }
      if (tentMesh) { root.remove(tentMesh); tentMesh.geometry.dispose(); tentMesh = null; }
      if (done) {
        const gm = new THREE.BufferGeometry(), V = [x0, y, 0, C[0], C[1], 0, C[0], C[1], dep, x0, y, 0, C[0], C[1], dep, x0, y, dep, x1, y, 0, C[0], C[1], 0, C[0], C[1], dep, x1, y, 0, C[0], C[1], dep, x1, y, dep, x0, y, dep, C[0], C[1], dep, x1, y, dep];
        const UV = [0, 0, .5, 1, .5, 1, 0, 0, .5, 1, 0, 0, 1, 0, .5, 1, .5, 1, 1, 0, .5, 1, 1, 0, 0, 0, .5, 1, 1, 0];
        gm.setAttribute("position", new THREE.Float32BufferAttribute(V, 3)); gm.setAttribute("uv", new THREE.Float32BufferAttribute(UV, 2)); gm.computeVertexNormals();
        tentMesh = new THREE.Mesh(gm, cMat); root.add(tentMesh);
      }
      lBase.move([0, -.35, .4]); lBase.set(`${m7f(L)} m`);
      lL.move([(A[0] + EA[0]) / 2 - .3, (A[1] + EA[1]) / 2 + .2, .3]); lL.set(`${m7f(r1)} m`);
      lR.move([(B[0] + EB[0]) / 2 + .3, (B[1] + EB[1]) / 2 + .2, .3]); lR.set(`${m7f(r2)} m`);
      lH.move([C[0] + .5, C[1] / 2, .2]); lH.set(done ? `height ${m7f(S.h, 2)} m` : ""); lH.show(done && sh.has("h"));
      const kP = m7kind(+P.p, +P.q, +P.r);
      lMsg.show(sh.has("verdict") || rise < .98); lMsg.set(rise < .98 ? "raising the poles…" : kP > 0 ? "the poles meet: tent pitched!" : kP === 0 ? "the poles lie flat: no tent" : "the poles cannot meet: no tent");
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

})();
