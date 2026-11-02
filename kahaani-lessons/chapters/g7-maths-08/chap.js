(function(){
/* Grade 7 Chapter 8 — Working with Fractions
   Plugin: simulations (k7m8_*), the Chand Baori stepwell scene, and Meenu the mynah guide. */

/* ---------- private helpers ---------- */
const h8 = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const n8 = x => { const v = +x; return isFinite(v) ? v : 0; };
const i8 = (x, lo, hi) => clampN(Math.round(n8(x)), lo, hi);
function red8(n, d) { n = Math.round(n); d = Math.round(d); if (!d) return [n, 1]; const g = gcdI(n, d); return [n / g, d / g]; }
// plain text fraction for SVG text: "3/4", "2"
function fp8(n, d) { const [a, b] = red8(n, d); return b === 1 ? String(a) : `${a}/${b}`; }
// readout fraction (rendered stacked by fx): "[3/4]" or "2"
function fr8(n, d) { const [a, b] = red8(n, d); return b === 1 ? String(a) : `[${a}/${b}]`; }
// readout with mixed form when improper
function mx8(n, d) { const [a, b] = red8(n, d); if (b === 1) return String(a); if (a > b) { const w = Math.floor(a / b), r = a - w * b; return `[${a}/${b}] = ${w} [${r}/${b}]`; } return `[${a}/${b}]`; }
function mxp8(n, d) { const [a, b] = red8(n, d); if (b === 1) return String(a); if (a > b) { const w = Math.floor(a / b), r = a - w * b; return `${w} ${r}/${b}`; } return `${a}/${b}`; }
// stacked fraction in SVG, centred at x, bar at y
function F8(x, y, n, d, o = {}) {
  const sz = o.size || 16, col = o.fill || "var(--ink)";
  if (d === undefined || d === null || +d === 1) return T(x, y + sz * 0.36, n, Object.assign({}, o, { size: sz }));
  const w = Math.max(String(n).length, String(d).length) * sz * 0.31 + 3;
  return T(x, y - sz * 0.22, n, Object.assign({}, o, { size: sz })) + `<line x1="${(x - w).toFixed(1)}" y1="${y}" x2="${(x + w).toFixed(1)}" y2="${y}" stroke="${col}" stroke-width="${Math.max(1.3, sz / 11).toFixed(1)}"/>` + T(x, y + sz * 0.98, d, Object.assign({}, o, { size: sz }));
}

/* =========================================================
   1. k7m8_track — "rate × time" on a number line: the 1-unit distance is cut into td equal jumps,
   and tn of those jumps are taken.
   params: rn/rd (amount for 1 unit of time), tn/td (time), unit, pre, per, who, lx
   readouts: prod, how     parts: "hour", "jumps", "end"
   ========================================================= */
SIM_DEF.k7m8_track = {
  def: { rn: 3, rd: 1, tn: 1, td: 1, unit: "km", pre: "", per: "hour", who: "Aaron", lx: "" },
  rng: { tn: () => [0, 12, 1], td: () => [1, 12, 1] },
  lab: { tn: "Time: numerator", td: "Time: denominator" },
  reads: { prod: "Total", how: "How" },
  draw(D, P, sh, hl) {
    const rn = Math.max(0, n8(P.rn)), rd = Math.max(1, i8(P.rd, 1, 999)), tn = i8(P.tn, 0, 99), td = i8(P.td, 1, 99);
    const rate = rn / rd, piece = rate / td, tot = piece * tn, u = P.unit ? " " + P.unit : "", pre = P.pre || "";
    const span = Math.max(rate, tot, 1e-6) * 1.1, x0 = 26, x1 = 396, X = v => x0 + (x1 - x0) * clampN(v / span, 0, 1.2);
    let s = `<svg viewBox="0 0 420 214">`;
    s += T(210, 20, P.lx ? svgFr(P.lx) : `${P.who}: ${pre}${fp8(rn, rd)}${u} for 1 ${P.per}`, { size: 13, fill: "var(--muted)" });
    // one-unit bracket
    const xr = X(rate);
    s += `<g${h8(hl, "hour")}><line x1="${x0}" y1="52" x2="${xr.toFixed(1)}" y2="52" stroke="var(--sky)" stroke-width="3"/><line x1="${x0}" y1="44" x2="${x0}" y2="60" stroke="var(--sky)" stroke-width="2"/><line x1="${xr.toFixed(1)}" y1="44" x2="${xr.toFixed(1)}" y2="60" stroke="var(--sky)" stroke-width="2"/></g>`;
    s += T(clampN((x0 + xr) / 2, 70, 350), 40, `1 ${P.per} → ${pre}${fp8(rn, rd)}${u}`, { size: 12, fill: "var(--sky)" });
    if (td > 1 && td <= 24) for (let k = 1; k < td; k++) { const x = X(k * piece); s += `<line x1="${x.toFixed(1)}" y1="47" x2="${x.toFixed(1)}" y2="57" stroke="var(--sky)" stroke-width="1.5"/>`; }
    // axis
    const ay = 132;
    s += `<line x1="${x0}" y1="${ay}" x2="${x1}" y2="${ay}" stroke="var(--ink)" stroke-width="2.5"/>`;
    s += `<line x1="${x0}" y1="${ay - 7}" x2="${x0}" y2="${ay + 7}" stroke="var(--ink)" stroke-width="2"/>` + T(x0, ay + 22, "0", { size: 12, fill: "var(--muted)" });
    if (span >= 1.5) { const stp = span <= 8 ? 1 : span <= 20 ? 2 : span <= 50 ? 5 : 10; for (let v = stp; v < span; v += stp) { const x = X(v); s += `<line x1="${x.toFixed(1)}" y1="${ay - 5}" x2="${x.toFixed(1)}" y2="${ay + 5}" stroke="var(--muted)" stroke-width="1.5"/>` + T(x, ay + 22, v, { size: 11, fill: "var(--muted)" }); } }
    if (tn <= 48) for (let k = 1; k <= tn; k++) { const x = X(k * piece); s += `<line x1="${x.toFixed(1)}" y1="${ay - 4}" x2="${x.toFixed(1)}" y2="${ay + 4}" stroke="var(--mari)" stroke-width="1.5"/>`; }
    // jumps (animated)
    const dj = clampN(n8(D.tn), 0, tn || 0), full = Math.floor(dj + 1e-6), part = dj - full, pw = X(piece) - x0, hh = clampN(pw * 0.55 + 6, 8, 46);
    let arcs = "";
    const arc = (a, b, k) => { const xa = X(a), xb = X(b), hgt = hh * (k < 1 ? k : 1); return `<path d="M${xa.toFixed(1)} ${ay - 2} Q${((xa + xb) / 2).toFixed(1)} ${(ay - 2 - hgt * 2).toFixed(1)} ${xb.toFixed(1)} ${ay - 2}" fill="none" stroke="var(--mari)" stroke-width="2.4"/>`; };
    for (let k = 0; k < Math.min(full, 60); k++) arcs += arc(k * piece, (k + 1) * piece, 1);
    if (part > 0.02 && full < 60) arcs += arc(full * piece, (full + part) * piece, 1);
    s += `<g${h8(hl, "jumps")}>${arcs}</g>`;
    // walker
    const wx = X(dj * piece);
    s += `<g${h8(hl, "end")}><circle cx="${wx.toFixed(1)}" cy="${ay}" r="7" fill="var(--rani)" stroke="#fff" stroke-width="1.5"/></g>`;
    const tStr = fp8(tn, td), res = tn * rn, resD = td * rd;
    s += T(210, 186, `${tStr} × ${pre}${fp8(rn, rd)}${u} = ${sh.has("prod") ? pre + mxp8(res, resD) + u : "?"}`, { size: 17, fill: "var(--mari)" });
    if (sh.has("how")) s += T(210, 206, td > 1 ? `each jump = ${fp8(rn, rd)} ÷ ${td} = ${fp8(rn, rd * td)}; take ${tn} jump${tn === 1 ? "" : "s"}` : `${tn} jump${tn === 1 ? "" : "s"} of ${fp8(rn, rd)}`, { size: 12, fill: "var(--muted)" });
    s += "</svg>";
    return { svg: s, reads: { prod: `${fr8(tn, td)} × ${pre}${fr8(rn, rd)}${u} = ${pre}${mx8(res, resD)}${u}`, how: td > 1 ? `${fr8(rn, rd)} ÷ ${td} = ${fr8(rn, rd * td)}, then × ${tn} = ${fr8(res, resD)}` : `${tn} × ${fr8(rn, rd)} = ${fr8(res, resD)} (repeated addition)` } };
  }
};

/* =========================================================
   2. k7m8_area — fraction × fraction as the area of a rectangle inside unit squares.
   a/b = multiplier (along the width, b columns), c/d = multiplicand (along the height, d rows).
   step: 0 unit square, 1 shade c/d, 2 cut it into b parts (one part yellow), 3 the full product rectangle
   readouts: prod, cells     parts: "band", "piece", "rect", "unit"
   ========================================================= */
SIM_DEF.k7m8_area = {
  def: { a: 1, b: 2, c: 1, d: 4, step: 3, lx: "" },
  rng: { a: () => [1, 12, 1], b: () => [1, 12, 1], c: () => [1, 12, 1], d: () => [1, 12, 1] },
  lab: { a: "Multiplier: numerator", b: "Multiplier: denominator", c: "Multiplicand: numerator", d: "Multiplicand: denominator" },
  reads: { prod: "Product", cells: "Counting cells" },
  draw(D, P, sh, hl) {
    const a = i8(P.a, 0, 24), b = i8(P.b, 1, 24), c = i8(P.c, 0, 24), d = i8(P.d, 1, 24);
    const A = Math.min(a / b, 2), C = Math.min(c / d, 2), nx = Math.max(1, Math.ceil(A - 1e-9)), ny = Math.max(1, Math.ceil(C - 1e-9));
    const S = Math.min(190 / ny, 236 / nx), ox = 40, oy = 16, st = clampN(n8(D.step), 0, 3);
    let s = `<svg viewBox="0 0 420 236">`;
    // unit squares
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) s += `<rect x="${ox + i * S}" y="${oy + j * S}" width="${S}" height="${S}" fill="rgba(255,255,255,.04)"/>`;
    // fine grid
    let g = "";
    if (b * nx <= 36) for (let k = 1; k < b * nx; k++) g += `M${(ox + k * S / b).toFixed(1)} ${oy}v${(ny * S).toFixed(1)}`;
    if (d * ny <= 36) for (let k = 1; k < d * ny; k++) g += `M${ox} ${(oy + k * S / d).toFixed(1)}h${(nx * S).toFixed(1)}`;
    const fineOp = st >= 2 ? .45 : st >= 1 ? .25 : .1;
    // shading
    const op1 = clampN(st, 0, 1), op2 = clampN(st - 1, 0, 1), op3 = clampN(st - 2, 0, 1);
    if (op1 > 0) s += `<rect x="${ox}" y="${oy}" width="${S}" height="${(C * S).toFixed(1)}" fill="var(--sky)" fill-opacity="${(.4 * op1).toFixed(2)}"${h8(hl, "band")}/>`;
    if (op2 > 0) s += `<rect x="${ox}" y="${oy}" width="${(S / b).toFixed(1)}" height="${(C * S).toFixed(1)}" fill="#ffd166" fill-opacity="${(.85 * op2).toFixed(2)}"${h8(hl, "piece")}/>`;
    if (op3 > 0) s += `<rect x="${ox}" y="${oy}" width="${(A * S).toFixed(1)}" height="${(C * S).toFixed(1)}" fill="var(--mari)" fill-opacity="${(.8 * op3).toFixed(2)}" stroke="var(--rani)" stroke-width="3"${h8(hl, "rect")}/>`;
    s += `<path d="${g}" stroke="var(--ink)" stroke-opacity="${fineOp}" stroke-width="1"/>`;
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) s += `<rect x="${ox + i * S}" y="${oy + j * S}" width="${S}" height="${S}" fill="none" stroke="var(--teal)" stroke-width="2.5"${h8(hl, "unit")}/>`;
    s += T(ox + S / 2, oy + ny * S + 16, nx * ny > 1 ? "each teal square = 1 whole" : "unit square = 1 whole", { size: 11, fill: "var(--teal)" });
    // side labels
    if (st >= 1) s += F8(ox - 18, oy + C * S / 2, c, d, { size: 13, fill: "var(--sky)" });
    if (st >= 2.5) s += F8(ox + A * S / 2, oy + ny * S + 40 > 232 ? oy + ny * S + 30 : oy + ny * S + 36, a, b, { size: 13, fill: "var(--mari)" });
    // right panel
    const px = Math.max(ox + nx * S + 70, 330);
    const pX = Math.min(px, 360);
    s += F8(pX - 34, 70, a, b, { size: 20 }) + T(pX, 77, "×", { size: 18 }) + F8(pX + 34, 70, c, d, { size: 20 });
    const [pa, pb] = red8(a * c, b * d);
    s += T(pX, 130, "=", { size: 18 });
    if (sh.has("prod") && st >= 2.9) { s += F8(pX - 22, 160, a * c, b * d, { size: 18, fill: "var(--mari)" }); if (pb !== b * d) s += T(pX + 6, 166, "=", { size: 16 }) + F8(pX + 34, 160, pa, pb, { size: 18, fill: "var(--teal)" }); }
    else s += T(pX, 166, "?", { size: 22, fill: "var(--mari)" });
    s += "</svg>";
    return { svg: s, reads: { prod: `${b === 1 ? a : `[${a}/${b}]`} × ${d === 1 ? c : `[${c}/${d}]`} = ${b * d === 1 ? a * c : `[${a * c}/${b * d}]`}${pb !== b * d ? " = " + fr8(a * c, b * d) : ""}`, cells: `${a} × ${c} = ${a * c} shaded cells; the whole has ${b} × ${d} = ${b * d} cells` } };
  }
};

/* =========================================================
   3. k7m8_cancel — cancel common factors (apavartana) before multiplying.
   params: a, b, c, d (a/b × c/d), step (0 show, 1 spot factors, 2 cancel, 3 multiply)
   readouts: res, why     parts: "pairs", "res"
   ========================================================= */
function cn8(a, b, c, d) {
  const moves = []; let A = a, B = b, Cc = c, Dd = d;
  const tryPair = (kx, ky) => { const v = { A, B, C: Cc, D: Dd }; const g = gcdI(v[kx], v[ky]); if (g > 1) { moves.push({ x: kx, y: ky, g }); v[kx] /= g; v[ky] /= g; A = v.A; B = v.B; Cc = v.C; Dd = v.D; } };
  tryPair("A", "D"); tryPair("C", "B"); tryPair("A", "B"); tryPair("C", "D");
  return { A, B, C: Cc, D: Dd, moves };
}
SIM_DEF.k7m8_cancel = {
  def: { a: 12, b: 7, c: 5, d: 24, step: 0 },
  rng: { step: () => [0, 3, 1] },
  lab: { step: "Steps" },
  reads: { res: "Product", why: "Cancelled" },
  draw(D, P, sh, hl) {
    const a = i8(P.a, 1, 999), b = i8(P.b, 1, 999), c = i8(P.c, 1, 999), d = i8(P.d, 1, 999), st = clampN(n8(D.step), 0, 3);
    const R = cn8(a, b, c, d), pos = { A: [92, 74], C: [168, 74], B: [92, 150], D: [168, 150] }, orig = { A: a, B: b, C: c, D: d };
    let s = `<svg viewBox="0 0 420 224">`;
    s += T(130, 22, "Look for common factors across the line", { size: 12, fill: "var(--muted)" });
    s += `<line x1="52" y1="112" x2="208" y2="112" stroke="var(--ink)" stroke-width="3"/>`;
    s += T(130, 80, "×", { size: 22 }) + T(130, 157, "×", { size: 22 });
    // links between pairs
    if (st >= 0.5) R.moves.forEach((m, i) => { const [x1, y1] = pos[m.x], [x2, y2] = pos[m.y]; const op = clampN((st - .5) * 2, 0, 1); s += `<g opacity="${op.toFixed(2)}"${h8(hl, "pairs")}><line x1="${x1}" y1="${y1 + (y1 < y2 ? 8 : -26)}" x2="${x2}" y2="${y2 + (y2 < y1 ? 8 : -26)}" stroke="${i % 2 ? "var(--teal)" : "var(--rani)"}" stroke-width="2" stroke-dasharray="5 4"/>` + T(x1 < 130 ? 44 : 222, y1 + 2, `÷${m.g}`, { size: 12, fill: i % 2 ? "var(--teal)" : "var(--rani)" }) + `</g>`; });
    const now = st >= 1.5 ? R : orig;
    ["A", "B", "C", "D"].forEach(k => {
      const [x, y] = pos[k], changed = R[k] !== orig[k];
      s += T(x, y + 6, orig[k], { size: 26, fill: changed && st >= 1.5 ? "var(--muted)" : "var(--ink)" });
      if (changed && st >= 1.5) { const w = String(orig[k]).length * 8 + 6; s += `<line x1="${x - w}" y1="${y + 10}" x2="${x + w}" y2="${y - 14}" stroke="var(--rani)" stroke-width="2.5"/>` + T(x + w + 4, y < 112 ? y - 16 : y + 22, now[k], { size: 16, fill: "var(--rani)", a: "start" }); }
    });
    const num = R.A * R.C, den = R.B * R.D;
    s += T(236, 120, "=", { size: 22 });
    if (st >= 2.5) s += `<g${h8(hl, "res")}>` + F8(270, 112, `${R.A}×${R.C}`, `${R.B}×${R.D}`, { size: 17 }) + T(318, 120, "=", { size: 22 }) + F8(360, 112, num, den, { size: 24, fill: "var(--mari)" }) + `</g>`;
    else s += T(300, 122, "?", { size: 26, fill: "var(--mari)" });
    s += T(210, 208, st >= 2.5 ? (gcdI(num, den) === 1 ? "already in lowest form — no big numbers needed!" : "") : "cancel first, multiply later", { size: 12, fill: "var(--teal)" });
    s += "</svg>";
    const why = R.moves.length ? R.moves.map(m => `${orig[m.x]} and ${orig[m.y]}: ÷ ${m.g}`).join("; ") : "no common factors";
    return { svg: s, reads: { res: `[${a}/${b}] × [${c}/${d}] = [${R.A}×${R.C}/${R.B}×${R.D}] = ${fr8(num, den)}`, why } };
  }
};

/* =========================================================
   4. k7m8_size — where do a, b and a × b (or a ÷ b) sit compared with 1?
   params: an/ad, bn/bd, op ("×" or "÷")
   readouts: res, rel     parts: "a", "b", "res", "one"
   ========================================================= */
SIM_DEF.k7m8_size = {
  def: { an: 3, ad: 4, bn: 2, bd: 5, op: "×" },
  rng: { an: () => [1, 12, 1], ad: () => [1, 12, 1], bn: () => [1, 12, 1], bd: () => [1, 12, 1] },
  lab: { an: "First: numerator", ad: "First: denominator", bn: "Second: numerator", bd: "Second: denominator" },
  reads: { res: "Result", rel: "Compare" },
  draw(D, P, sh, hl) {
    const div = P.op === "÷";
    const an = i8(P.an, 0, 999), ad = i8(P.ad, 1, 999), bn = i8(P.bn, 1, 999), bd = i8(P.bd, 1, 999);
    const Da = n8(D.an) / Math.max(1, n8(D.ad)), Db = n8(D.bn) / Math.max(1, n8(D.bd)), Dr = div ? Da / Math.max(1e-6, Db) : Da * Db;
    const va = an / ad, vb = bn / bd, rn = div ? an * bd : an * bn, rd = div ? ad * bn : ad * bd, vr = rn / rd;
    const top = Math.min(Math.max(1.25, va, vb, sh.has("res") ? vr : 0) * 1.12, 40), x0 = 24, x1 = 396, X = v => x0 + (x1 - x0) * clampN(v / top, 0, 1);
    let s = `<svg viewBox="0 0 420 220">`;
    s += `<rect x="${x0}" y="96" width="${(X(1) - x0).toFixed(1)}" height="28" fill="var(--teal)" fill-opacity=".14"/>` + `<rect x="${x0}" y="200" width="12" height="10" fill="var(--teal)" fill-opacity=".35"/>` + T(x0 + 17, 209, "between 0 and 1", { size: 11, fill: "var(--teal)", a: "start" });
    s += `<line x1="${x0}" y1="124" x2="${x1}" y2="124" stroke="var(--ink)" stroke-width="2.5"/>`;
    s += `<g${h8(hl, "one")}><line x1="${X(1).toFixed(1)}" y1="88" x2="${X(1).toFixed(1)}" y2="134" stroke="var(--teal)" stroke-width="3"/>` + T(X(1), 150, "1", { size: 15, fill: "var(--teal)" }) + `</g>` + T(x0, 150, "0", { size: 13, fill: "var(--muted)" });
    if (top > 3) { const stp = top <= 10 ? 1 : top <= 25 ? 5 : 10; for (let v = 2; v < top; v += (v < stp ? stp - v : stp)) { if (v % stp) continue; s += `<line x1="${X(v).toFixed(1)}" y1="119" x2="${X(v).toFixed(1)}" y2="129" stroke="var(--muted)"/>` + T(X(v), 150, v, { size: 11, fill: "var(--muted)" }); } }
    const pin = (v, y, col, lab, part, up) => `<g${h8(hl, part)}><line x1="${X(v).toFixed(1)}" y1="${up ? y + 12 : 128}" x2="${X(v).toFixed(1)}" y2="${up ? 122 : y - 22}" stroke="${col}" stroke-width="2.5"/><circle cx="${X(v).toFixed(1)}" cy="124" r="5" fill="${col}"/></g>` + F8(clampN(X(v), 30, 390), y, lab[0], lab[1], { size: 14, fill: col });
    s += pin(Da, 40, "var(--sky)", [an, ad], "a", true);
    s += pin(Db, 70, "var(--rani)", [bn, bd], "b", true);
    if (sh.has("res")) s += pin(Dr, 182, "var(--mari)", red8(rn, rd), "res", false);
    s += T(408, 210, `${fp8(an, ad)} ${div ? "÷" : "×"} ${fp8(bn, bd)} = ${sh.has("res") ? fp8(rn, rd) : "?"}`, { size: 15, fill: "var(--mari)", a: "end" });
    s += "</svg>";
    const cmp = (x, y) => Math.abs(x - y) < 1e-9 ? "equal to" : x > y ? "greater than" : "less than";
    const rel = div ? `quotient is ${cmp(vr, va)} the dividend ${fr8(an, ad)} (divisor ${vb < 1 ? "between 0 and 1" : vb > 1 ? "greater than 1" : "= 1"})`
      : `product is ${cmp(vr, va)} ${fr8(an, ad)} and ${cmp(vr, vb)} ${fr8(bn, bd)}`;
    return { svg: s, reads: { res: `${fr8(an, ad)} ${div ? "÷" : "×"} ${fr8(bn, bd)} = ${mx8(rn, rd)}`, rel } };
  }
};

/* =========================================================
   5. k7m8_fit — division as "how many divisors fit into the dividend?"
   params: an/ad (dividend), bn/bd (divisor), unit, k (pieces laid so far, animated; -1 = all)
   readouts: q, rule     parts: "bar", "pieces", "last"
   ========================================================= */
SIM_DEF.k7m8_fit = {
  def: { an: 1, ad: 1, bn: 2, bd: 3, unit: "", k: -1, lx: "" },
  rng: { an: () => [1, 24, 1], ad: () => [1, 12, 1], bn: () => [1, 12, 1], bd: () => [1, 12, 1] },
  lab: { an: "Dividend: numerator", ad: "Dividend: denominator", bn: "Divisor: numerator", bd: "Divisor: denominator" },
  reads: { q: "Quotient", rule: "Brahmagupta's way" },
  draw(D, P, sh, hl) {
    const an = i8(P.an, 0, 999), ad = i8(P.ad, 1, 999), bn = i8(P.bn, 1, 999), bd = i8(P.bd, 1, 999), u = P.unit ? " " + P.unit : "";
    const A = an / ad, B = bn / bd, q = A / B, qn = an * bd, qd = ad * bn;
    const top = Math.max(A, B) * 1.04, x0 = 22, x1 = 398, X = v => x0 + (x1 - x0) * clampN(v / top, 0, 1.1);
    let s = `<svg viewBox="0 0 420 214">`;
    s += T(210, 20, P.lx ? svgFr(P.lx) : `How many pieces of ${fp8(bn, bd)}${u} fit into ${fp8(an, ad)}${u}?`, { size: 13, fill: "var(--muted)" });
    s += `<rect x="${x0}" y="40" width="${(X(A) - x0).toFixed(1)}" height="34" rx="6" fill="var(--sky)" fill-opacity=".35" stroke="var(--sky)" stroke-width="2"${h8(hl, "bar")}/>`;
    s += T(x0 + 6, 62, `${fp8(an, ad)}${u}`, { size: 13, a: "start" });
    // unit ticks
    if (top <= 30) for (let v = 1; v < top; v++) s += `<line x1="${X(v).toFixed(1)}" y1="36" x2="${X(v).toFixed(1)}" y2="78" stroke="var(--ink)" stroke-opacity=".35" stroke-dasharray="3 3"/>` + (top <= 12 ? T(X(v), 32, v, { size: 10, fill: "var(--muted)" }) : "");
    // pieces
    const kk = n8(P.k) < 0 ? q : Math.min(n8(D.k), q), full = Math.floor(kk + 1e-9), part = kk - full, pw = X(B) - x0;
    let pcs = "";
    if (full <= 80 && pw >= 3) {
      for (let i = 0; i < full; i++) pcs += `<rect x="${(x0 + i * pw + 1).toFixed(1)}" y="92" width="${Math.max(1, pw - 2).toFixed(1)}" height="30" rx="4" fill="${i % 2 ? "var(--mari)" : "#ffb84d"}"/>`;
      if (part > 1e-6) pcs += `<g${h8(hl, "last")}><rect x="${(x0 + full * pw + 1).toFixed(1)}" y="92" width="${Math.max(1, pw - 2).toFixed(1)}" height="30" rx="4" fill="none" stroke="var(--rani)" stroke-dasharray="4 3" stroke-width="2"/><rect x="${(x0 + full * pw + 1).toFixed(1)}" y="92" width="${Math.max(1, pw * part - 2).toFixed(1)}" height="30" rx="4" fill="var(--rani)"/></g>`;
      if (full <= 14 && pw >= 22) for (let i = 0; i < full; i++) pcs += T(x0 + i * pw + pw / 2, 112, i + 1, { size: 12, fill: "#2a1a00" });
    } else {
      pcs += `<rect x="${x0}" y="92" width="${(X(Math.min(kk * B, A)) - x0).toFixed(1)}" height="30" rx="4" fill="var(--mari)" fill-opacity=".7"/>`;
      pcs += T(210, 112, `tiny pieces: too many to draw one by one`, { size: 12, fill: "#2a1a00" });
    }
    s += `<g${h8(hl, "pieces")}>${pcs}</g>`;
    s += T(x0, 140, `one piece = ${fp8(bn, bd)}${u}`, { size: 12, fill: "var(--mari)", a: "start" });
    s += T(210, 176, `${fp8(an, ad)} ÷ ${fp8(bn, bd)} = ${sh.has("q") ? mxp8(qn, qd) : "?"}`, { size: 19, fill: "var(--mari)" });
    s += T(210, 202, sh.has("rule") ? `${fp8(an, ad)} × ${fp8(bd, bn)} (reciprocal of the divisor) = ${fp8(qn, qd)}` : "", { size: 12, fill: "var(--teal)" });
    s += "</svg>";
    return { svg: s, reads: { q: `${fr8(an, ad)} ÷ ${fr8(bn, bd)} = ${mx8(qn, qd)}`, rule: `${fr8(an, ad)} × ${fr8(bd, bn)} = [${an}×${bd}/${ad}×${bn}] = ${fr8(qn, qd)}` } };
  }
};

/* =========================================================
   SCENE — the Chand Baori stepwell of Abhaneri at dusk
   ========================================================= */
let k8w = null;
function k8wInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  k8w = { W, H,
    stars: Array.from({ length: Math.round(W * H / 9000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .4), r: rnd(.3, 1.4), p: rnd(0, 6.28) })),
    lamps: Array.from({ length: Math.max(8, Math.round(W / 120)) }, () => ({ x: rnd(0, W), y: rnd(H * .3, H), s: rnd(.1, .3), p: rnd(0, 6.28) })),
    birds: Array.from({ length: 5 }, (_, i) => ({ x: rnd(0, W), y: rnd(H * .08, H * .28), v: rnd(.3, .7), p: rnd(0, 6.28) })),
    trees: Array.from({ length: 6 }, (_, i) => ({ x: i < 3 ? rnd(0, W * .14) : rnd(W * .86, W), r: rnd(24, 44) })) };
}
SCENES.k7m8_baori = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!k8w || k8w.W !== W || k8w.H !== H) k8wInit(W, H);
  const S = k8w, gy = H * .42;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#1b1640"); g.addColorStop(.6, "#5a2c4f"); g.addColorStop(1, "#c8643a");
  c.fillStyle = g; c.fillRect(0, 0, W, gy);
  S.stars.forEach(s => { c.globalAlpha = .25 + .35 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // setting sun
  const sx = W * .7, sy = gy - 6, sr = Math.min(W, H) * .06;
  const sg = c.createRadialGradient(sx, sy, sr * .5, sx, sy, sr * 3); sg.addColorStop(0, "rgba(255,200,110,.5)"); sg.addColorStop(1, "rgba(255,200,110,0)"); c.fillStyle = sg; c.beginPath(); c.arc(sx, sy, sr * 3, 0, 6.28); c.fill();
  c.fillStyle = "#ffcf73"; c.beginPath(); c.arc(sx, sy, sr, Math.PI, 0); c.fill();
  // birds
  c.strokeStyle = "rgba(20,10,30,.7)"; c.lineWidth = 1.6;
  S.birds.forEach(b => { if (!RM) { b.x += b.v; if (b.x > W + 20) b.x = -20; } const f = Math.sin(t / 180 + b.p) * 4; c.beginPath(); c.moveTo(b.x - 7, b.y - f); c.quadraticCurveTo(b.x - 3, b.y - 2, b.x, b.y); c.quadraticCurveTo(b.x + 3, b.y - 2, b.x + 7, b.y - f); c.stroke(); });
  // ground / courtyard
  c.fillStyle = "#3b2230"; c.fillRect(0, gy, W, H - gy);
  // the stepwell pit: an inverted pyramid of zig-zag stairs
  const top = gy + 14, bot = H - 40, wTop = W * .78, wBot = W * .16, cx = W / 2, rows = 13;
  for (let i = 0; i < rows; i++) {
    const y0 = top + (bot - top) * i / rows, y1 = top + (bot - top) * (i + 1) / rows, k0 = i / rows, k1 = (i + 1) / rows;
    const w0 = wTop + (wBot - wTop) * k0, w1 = wTop + (wBot - wTop) * k1;
    c.fillStyle = i % 2 ? "#5b3a3d" : "#6d4645"; c.beginPath(); c.moveTo(cx - w0 / 2, y0); c.lineTo(cx + w0 / 2, y0); c.lineTo(cx + w1 / 2, y1); c.lineTo(cx - w1 / 2, y1); c.closePath(); c.fill();
    // little stair triangles
    c.strokeStyle = "rgba(255,210,170,.16)"; c.lineWidth = 1; const n = Math.max(4, Math.round(w0 / 26));
    c.beginPath(); for (let j = 0; j < n; j++) { const xa = cx - w0 / 2 + w0 * j / n, xb = xa + w0 / n; c.moveTo(xa, y1); c.lineTo((xa + xb) / 2, y0); c.lineTo(xb, y1); } c.stroke();
    c.fillStyle = "rgba(0,0,0,.25)"; c.fillRect(cx - w0 / 2, y0, w0, 2);
  }
  // water at the bottom
  const wy = bot, ww = wBot;
  const wg = c.createLinearGradient(0, wy, 0, H); wg.addColorStop(0, "#2f7fa8"); wg.addColorStop(1, "#163c5a"); c.fillStyle = wg; c.fillRect(cx - ww / 2, wy, ww, H - wy);
  c.strokeStyle = "rgba(200,240,255,.35)"; c.lineWidth = 1.2;
  for (let r = 0; r < 3; r++) { const ph = (t / 1600 + r / 3) % 1; c.globalAlpha = 1 - ph; c.beginPath(); c.ellipse(cx, wy + 16, ww * .1 + ph * ww * .35, 4 + ph * 6, 0, 0, 6.28); c.stroke(); } c.globalAlpha = 1;
  // pavilion with arches on the far side
  const pw = Math.min(W * .34, 340), ph = 56, px = cx - pw / 2, py = top - ph;
  c.fillStyle = "#7a4a43"; c.fillRect(px, py, pw, ph);
  c.fillStyle = "#2a1520"; const na = 5; for (let i = 0; i < na; i++) { const ax = px + pw * (i + .5) / na, aw = pw / na * .55; c.beginPath(); c.moveTo(ax - aw / 2, top); c.lineTo(ax - aw / 2, py + 24); c.quadraticCurveTo(ax, py + 6, ax + aw / 2, py + 24); c.lineTo(ax + aw / 2, top); c.fill(); }
  c.fillStyle = "#8d574d"; c.fillRect(px - 10, py - 8, pw + 20, 9);
  [px + 16, px + pw - 16].forEach(x => { c.beginPath(); c.arc(x, py - 8, 14, Math.PI, 0); c.fill(); });
  // mango trees
  S.trees.forEach((tr, i) => { const y = gy + 6; c.fillStyle = "#24131a"; c.fillRect(tr.x - 3, y - tr.r, 6, tr.r); c.fillStyle = "#1f3b2c"; c.beginPath(); c.arc(tr.x, y - tr.r * 1.2, tr.r * .8, 0, 6.28); c.arc(tr.x - tr.r * .5, y - tr.r, tr.r * .55, 0, 6.28); c.arc(tr.x + tr.r * .5, y - tr.r, tr.r * .55, 0, 6.28); c.fill(); });
  // floating diya lamps / fireflies
  S.lamps.forEach(l => { if (!RM) { l.y -= l.s; l.x += Math.sin(t / 1500 + l.p) * .25; if (l.y < gy) { l.y = H + 10; l.x = Math.random() * W; } }
    const a = .35 + .3 * Math.sin(t / 600 + l.p), rg = c.createRadialGradient(l.x, l.y, 0, l.x, l.y, 14); rg.addColorStop(0, `rgba(255,190,80,${a})`); rg.addColorStop(1, "rgba(255,190,80,0)"); c.fillStyle = rg; c.beginPath(); c.arc(l.x, l.y, 14, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(10,6,20,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Meenu, the talking mynah with a little turban
   ========================================================= */
GUIDES.k7m8_mynah = () => `<svg class="guide mynah" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="30" ry="4" fill="#000" opacity=".25"/>
  <path d="M22 116 L100 116" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/>
  <path d="M52 108 l-4 8 M66 108 l4 8" stroke="#f4c430" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M40 96 Q24 112 18 122 Q34 118 48 102Z" fill="#2a1d18"/>
  <ellipse cx="60" cy="82" rx="27" ry="29" fill="#4a3226"/>
  <ellipse cx="64" cy="90" rx="15" ry="18" fill="#6b4a37"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 42 74;-10 42 74;0 42 74" dur="2.4s" repeatCount="indefinite"/>
    <path d="M40 66 Q26 86 36 106 Q52 98 54 72Z" fill="#2a1d18"/><path d="M34 96 Q38 102 44 102" stroke="#fff" stroke-width="3" fill="none"/></g>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.8s" repeatCount="indefinite"/>
    <circle cx="64" cy="44" r="22" fill="#1e1512"/>
    <path d="M70 34 Q86 32 88 46 Q80 52 70 48Z" fill="#f4c430"/>
    <circle cx="76" cy="41" r="6.5" fill="#fff"/><circle cx="77.5" cy="41.5" r="3.6" fill="#15202a"/><circle cx="78.6" cy="40.2" r="1.2" fill="#fff"/>
    <rect x="68" y="33" width="16" height="0" fill="#1e1512"><animate attributeName="height" values="0;0;0;15;0" keyTimes="0;.82;.9;.95;1" dur="4.2s" repeatCount="indefinite"/></rect>
    <path d="M84 46 L104 50 L86 56Z" fill="#f4a51c"/><path d="M86 52 L100 51" stroke="#c4860e" stroke-width="1.2"/>
    <path d="M44 34 Q46 16 66 16 Q84 16 86 30 Q66 22 44 34Z" fill="#e04a86"/><path d="M48 28 Q64 18 82 26" stroke="#f4a51c" stroke-width="2.5" fill="none"/>
    <circle cx="66" cy="18" r="3.5" fill="#35c29a"/><path d="M66 15 Q70 4 62 2" stroke="#f4a51c" stroke-width="2" fill="none"/>
    <circle cx="70" cy="56" r="3.5" fill="#ff7aa2" opacity=".45"/>
  </g>
</svg>`;

/* =========================================================
   6. k7m8_tank3d — the stepwell cistern in 3D: water rises by (rate × time).
   params: rn/rd (part of the cistern filled in 1 unit of time), tn/td (time), per, m (level marks), sp (spout labels, comma list)
   readouts: fill, full     parts: "water", "marks"
   ========================================================= */
const k8tankReads = P => {
  const rn = i8(P.rn, 0, 999), rd = i8(P.rd, 1, 999), tn = i8(P.tn, 0, 99), td = i8(P.td, 1, 99), per = P.per || "hour";
  const fn = rn * tn, fd = rd * td, [a, b] = red8(fn, fd);
  return { fill: `${fr8(tn, td)} ${per} × ${fr8(rn, rd)} = ${fr8(fn, fd)} of the cistern${a > b ? " (it overflows!)" : a === b ? " — full!" : ""}`, full: rn ? `1 ÷ ${fr8(rn, rd)} = ${mx8(rd, rn)} ${per}${rd > rn ? "s" : ""}` : "never" };
};
SIM_DEF.k7m8_tank3d = {
  def: { rn: 7, rd: 10, tn: 1, td: 1, per: "hour", m: 10, sp: "tap" },
  rng: { tn: () => [0, 12, 1], td: () => [1, 12, 1] },
  lab: { tn: "Time: numerator", td: "Time: denominator" },
  reads: { fill: "Filled", full: "Time to fill it" },
  readouts(P, sh) { return k8tankReads(P); },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 10, phi: 1.12, theta: 0.55, auto: 0.12, target: [0, 1.6, 0], hint: "Drag to turn the cistern" });
    if (!g) return null;
    const { THREE, root } = g;
    const TW = 3.2, TH = 3, TD = 2.2;
    const stoneM = new THREE.MeshStandardMaterial({ color: 0x8d574d, roughness: .9 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(TW + 0.6, 0.3, TD + 0.6), stoneM); base.position.y = -0.15; root.add(base);
    const glassM = new THREE.MeshStandardMaterial({ color: 0xc9a27a, transparent: true, opacity: .16, roughness: .3, side: THREE.DoubleSide, depthWrite: false });
    const shell = new THREE.Mesh(new THREE.BoxGeometry(TW, TH, TD), glassM); shell.position.y = TH / 2; root.add(shell);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(TW, TH, TD)), new THREE.LineBasicMaterial({ color: 0xefdcae })); edge.position.y = TH / 2; root.add(edge);
    // back and side stone walls for depth
    const wallM = new THREE.MeshStandardMaterial({ color: 0x6d4645, roughness: .95 });
    const back = new THREE.Mesh(new THREE.BoxGeometry(TW + 0.3, TH, 0.15), wallM); back.position.set(0, TH / 2, -TD / 2 - 0.08); root.add(back);
    const waterM = new THREE.MeshStandardMaterial({ color: 0x3aa0d8, transparent: true, opacity: .78, roughness: .15, metalness: .1, emissive: 0x0b3a5a, emissiveIntensity: .4 });
    const water = new THREE.Mesh(new THREE.BoxGeometry(TW - 0.06, 1, TD - 0.06), waterM); root.add(water);
    const marksM = new THREE.LineBasicMaterial({ color: 0xffd166 }), marks = new THREE.LineSegments(new THREE.BufferGeometry(), marksM); root.add(marks);
    // spouts
    const pipeM = new THREE.MeshStandardMaterial({ color: 0xc0a080, metalness: .5, roughness: .4 });
    const dropM = new THREE.MeshBasicMaterial({ color: 0x9fdcff }), dropG = new THREE.SphereGeometry(0.06, 8, 6);
    const spouts = []; for (let i = 0; i < 4; i++) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.8, 12), pipeM); p.rotation.z = Math.PI / 2; root.add(p); const tag = new THREE.Object3D(); p.add(tag); tag.position.set(0, -0.0, 0); const drops = []; for (let k = 0; k < 10; k++) { const dm = new THREE.Mesh(dropG, dropM); dm.visible = false; root.add(dm); drops.push(dm); } spouts.push({ p, drops, l: g.label("", [0, 0, 0], "plain") }); }
    const lTitle = g.label("", [0, TH + 1.95, 0], "plain"), lSp = g.label("", [0, TH + 1.5, 0], "plain"), lFill = g.label("", [0, -0.75, TD / 2 + 0.6], "big"), lMark = g.label("", [TW / 2 + 0.6, TH, TD / 2], "plain");
    const st = { lv: 0, tl: 0, hl: null, n: 1, m: 10 };
    g.onFrame((t, dt) => {
      const k = Math.min(1, dt * 1.6), prev = st.lv; st.lv += (st.tl - st.lv) * k;
      const rising = st.tl - st.lv > 0.004;
      const h = Math.max(0.01, Math.min(1, st.lv) * TH);
      water.scale.y = h; water.position.y = h / 2 + 0.01 * Math.sin(t * 3);
      waterM.emissiveIntensity = st.hl === "water" ? 0.8 + 0.4 * Math.sin(t * 8) : 0.4;
      marksM.color.setHex(st.hl === "marks" ? (Math.sin(t * 8) > 0 ? 0xffffff : 0xffd166) : 0xffd166);
      spouts.forEach((s, i) => { s.drops.forEach((dm, j) => { if (i >= st.n || !rising) { dm.visible = false; return; } dm.visible = true; const ph = ((t * 1.4 + j / 10 + i * 0.13) % 1); const x0 = s.p.position.x + 0.45; dm.position.set(x0 + ph * 0.25, s.p.position.y - ph * (s.p.position.y - h), 0); }); });
    });
    function apply(D, P, sh, hl) {
      st.hl = hl;
      const rn = n8(P.rn), rd = Math.max(1, n8(P.rd)), tn = n8(D.tn), td = Math.max(1, n8(D.td));
      st.tl = Math.max(0, rn / rd * tn / td);
      const labels = String(P.sp || "tap").split(",").map(x => x.trim()).slice(0, 4); st.n = labels.length;
      spouts.forEach((s, i) => { const on = i < st.n; s.p.visible = on; const x = -TW / 2 + TW * (i + 0.5) / st.n - 0.3; s.p.position.set(x, TH + 0.5 + (i % 2) * 0.6, 0); s.l.move([s.p.position.x, s.p.position.y + 0.32, 0]); s.l.set(fx(labels[i] || "")); s.l.show(on && st.n === 1); });
      lSp.set(fx("fountains: " + labels.join(" · "))); lSp.show(st.n > 1);
      const m = clampN(Math.round(n8(P.m)), 1, 24); st.m = m; const pts = [];
      for (let j = 1; j < m; j++) { const y = TH * j / m; pts.push(-TW / 2, y, TD / 2 + 0.01, -TW / 2 + 0.45, y, TD / 2 + 0.01); pts.push(TW / 2 - 0.45, y, TD / 2 + 0.01, TW / 2, y, TD / 2 + 0.01); }
      marks.geometry.dispose(); marks.geometry = new THREE.BufferGeometry(); marks.geometry.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      const R = k8tankReads(P), ptn = i8(P.tn, 0, 99), ptd = i8(P.td, 1, 99);
      lTitle.set(fx(`${fr8(P.rn, P.rd)} of the cistern in 1 ${P.per || "hour"}`));
      lMark.set(`${m} equal marks`); lMark.show(sh.has("fill"));
      lFill.set(fx(`${fr8(ptn, ptd)} ${P.per || "hour"} → ${sh.has("fill") ? fr8(i8(P.rn, 0, 999) * ptn, i8(P.rd, 1, 999) * ptd) + " full" : "?"}`));
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

})();
