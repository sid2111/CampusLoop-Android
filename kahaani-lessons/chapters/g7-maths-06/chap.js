(function(){
/* Grade 7 (Ganita Prakash Part I) Chapter 6 — Number Play
   Plugin: simulations (k7m6_*), the Khajuraho dance-night scene, and Mayuri the peacock guide. */

/* ---------- private helpers ---------- */
const m6hl = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const m6n = x => { const v = +x; return isFinite(v) ? v : 0; };
const m6list = s => String(s == null ? "" : s).split(",").map(t => t.trim()).filter(t => t !== "");
const m6nums = s => m6list(s).map(Number);
const m6par = v => (Math.abs(Math.round(v)) % 2 === 0 ? "even" : "odd");
const m6lerp = (a, b, k) => a + (b - a) * k;
const M6COL = ["#62b6e8", "#f4a51c", "#e04a86", "#35c29a", "#b388ff", "#ff7a59", "#ffd166", "#9ad0ff", "#7fe09a", "#ff9ec4"];
const m6sgn = v => (v < 0 ? "− " + Math.abs(v) : "+ " + v);
const m6fmt = v => (v < 0 ? "−" + Math.abs(v) : String(v));

/* =========================================================
   1. k7m6_line — children in a line; each calls out how many taller children stand in front (to the left)
   params: h (heights in cm, comma list, front first), who (1-based child to move, 0 none), pos (where that child goes),
           target (optional sequence to reach), lx (title)
   readouts: calls, rule      parts: "front", "tallest", "mover"
   ========================================================= */
function m6order(h, who, pos) {
  const idx = h.map((_, i) => i);
  if (who >= 1 && who <= h.length) { const k = who - 1; idx.splice(idx.indexOf(k), 1); idx.splice(clampN(Math.round(pos), 1, h.length) - 1, 0, k); }
  return idx;
}
function m6calls(h, order) { return order.map((k, j) => order.slice(0, j).filter(q => h[q] > h[k]).length); }
SIM_DEF.k7m6_line = {
  def: { h: "130,150,140,155,135,160,145", who: 0, pos: 1, target: "", lx: "" },
  rng: { pos: P => [1, Math.max(2, m6nums(P.h).length), 1] },
  lab: { pos: "Place in line for the moving child" },
  reads: { calls: "Numbers called", rule: "Rule" },
  draw(D, P, sh, hl) {
    const h = m6nums(P.h), n = h.length, who = Math.round(m6n(P.who));
    const pD = clampN(m6n(D.pos), 1, n), a = Math.floor(pD), b = Math.ceil(pD), f = pD - a;
    const oa = m6order(h, who, a), ob = m6order(h, who, b), oP = m6order(h, who, m6n(P.pos));
    const calls = m6calls(h, oP), tgt = m6nums(P.target);
    const x0 = 40, x1 = 395, gap = (x1 - x0) / Math.max(1, n - 1), maxH = Math.max(...h), minH = Math.min(...h), base = 206;
    const tall = k => 70 + (h[k] - minH) / Math.max(1, maxH - minH) * 70;
    let s = `<svg viewBox="0 0 420 250">`;
    s += T(210, 16, P.lx ? svgFr(P.lx) : "Count the taller children in front of you", { size: 12.5, fill: "var(--muted)" });
    s += `<g${m6hl(hl, "front")}><path d="M14 236 H120" stroke="var(--mari)" stroke-width="2.5"/><path d="M14 236 l10 -6 v12z" fill="var(--mari)"/></g>` + T(68, 230, "front of line", { size: 10.5, fill: "var(--mari)" });
    for (let i = 0; i < 6; i++) s += `<line x1="20" y1="${base - i * 26}" x2="410" y2="${base - i * 26}" stroke="var(--line)" stroke-width="1" opacity=".55"/>`;
    const tallest = h.indexOf(maxH);
    h.forEach((_, k) => {
      const ia = oa.indexOf(k), ib = ob.indexOf(k), x = x0 + m6lerp(ia, ib, f) * gap, H = tall(k), top = base - H;
      const col = M6COL[k % M6COL.length], mover = who - 1 === k;
      const part = mover ? m6hl(hl, "mover") : k === tallest ? m6hl(hl, "tallest") : "";
      s += `<g${part}>`;
      s += `<circle cx="${x.toFixed(1)}" cy="${(top + 9).toFixed(1)}" r="9" fill="none" stroke="${col}" stroke-width="2.6"/>`;
      s += `<path d="M${x.toFixed(1)} ${(top + 18).toFixed(1)} V${(base - H * .38).toFixed(1)} M${(x - 10).toFixed(1)} ${(top + 30).toFixed(1)} L${x.toFixed(1)} ${(top + 24).toFixed(1)} L${(x + 10).toFixed(1)} ${(top + 30).toFixed(1)} M${(x - 8).toFixed(1)} ${base} L${x.toFixed(1)} ${(base - H * .38).toFixed(1)} L${(x + 8).toFixed(1)} ${base}" stroke="${col}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
      if (mover) s += `<path d="M${(x - 6).toFixed(1)} ${(top - 4).toFixed(1)} l6 -7 l6 7z" fill="var(--mari)"/>`;
      s += `</g>`;
      const j = oP.indexOf(k), settled = Math.abs(pD - Math.round(m6n(P.pos))) < .05 || who < 1;
      const by = top - 22, txt = sh.has("calls") && settled ? String(calls[j]) : "?";
      const ok = tgt.length === n && settled && sh.has("calls") ? (calls[j] === tgt[j]) : null;
      s += `<rect x="${(x - 13).toFixed(1)}" y="${(by - 13).toFixed(1)}" width="26" height="20" rx="9" fill="${ok === false ? "rgba(224,74,134,.35)" : "rgba(98,182,232,.22)"}" stroke="${ok === false ? "var(--rani)" : "var(--sky)"}"/>`;
      s += `<path d="M${(x - 3).toFixed(1)} ${(by + 7).toFixed(1)} l3 5 l3 -5z" fill="var(--sky)"/>`;
      s += T(x.toFixed(1), (by + 2).toFixed(1), txt, { size: 13 });
      s += T(x.toFixed(1), base + 14, sh.has("calls") ? h[k] : "", { size: 9, fill: "var(--muted)", w: 600 });
    });
    if (tgt.length) {
      const all = tgt.length === n && calls.every((c, i) => c === tgt[i]);
      s += T(300, 236, `goal: ${tgt.join(", ")}`, { size: 12, fill: all && sh.has("calls") ? "var(--teal)" : "var(--ink)" });
      if (all && sh.has("calls")) s += T(400, 236, "✓", { size: 15, fill: "var(--teal)" });
    }
    s += "</svg>";
    return { svg: s, reads: { calls: calls.join(", "), rule: "each child counts the children in front who are taller (heights in cm under the feet)" } };
  }
};

/* =========================================================
   2. k7m6_pairs — numbers as pairs of dots; adding them shows the parity of the sum
   params: a, b, c, d, e (0 = not used), lx
   readouts: sum, par     parts: "left" (leftover dots), "sum"
   ========================================================= */
SIM_DEF.k7m6_pairs = {
  def: { a: 6, b: 4, c: 0, d: 0, e: 0, lx: "" },
  rng: { a: () => [0, 15, 1], b: () => [0, 15, 1], c: () => [0, 15, 1], d: () => [0, 15, 1], e: () => [0, 15, 1] },
  lab: { a: "1st number", b: "2nd number", c: "3rd number", d: "4th number", e: "5th number" },
  reads: { sum: "Sum", par: "Parity" },
  draw(D, P, sh, hl) {
    const keys = ["a", "b", "c", "d", "e"], nums = keys.map(k => Math.round(m6n(P[k]))).filter(v => v > 0);
    const tot = nums.reduce((x, y) => x + y, 0), cols = nums.reduce((x, v) => x + Math.ceil(v / 2), 0) + Math.max(0, nums.length - 1) * 1.6;
    const sp = Math.min(16, 380 / Math.max(1, cols)), r = Math.min(5, sp * .36);
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 18, P.lx ? svgFr(P.lx) : "Every even number pairs up. An odd number has one dot left over.", { size: 12, fill: "var(--muted)" });
    let x = 210 - cols * sp / 2 + sp / 2;
    nums.forEach((v, i) => {
      const col = M6COL[i % M6COL.length], c2 = Math.ceil(v / 2), cx = x + (c2 - 1) * sp / 2;
      for (let j = 0; j < v; j++) { const cc = Math.floor(j / 2), rr = j % 2, single = v % 2 === 1 && j === v - 1;
        s += `<circle cx="${(x + cc * sp).toFixed(1)}" cy="${(52 + rr * sp).toFixed(1)}" r="${r.toFixed(1)}" fill="${single ? "var(--night)" : col}" stroke="${single ? "var(--rani)" : "none"}" stroke-width="2"${single ? m6hl(hl, "left") : ""}/>`; }
      s += T(cx.toFixed(1), 52 + sp + 24, v, { size: 14, fill: col });
      s += T(cx.toFixed(1), 52 + sp + 40, sh.has("par") ? m6par(v) : "", { size: 10, fill: "var(--muted)" });
      if (i < nums.length - 1) s += T((x + c2 * sp - sp / 2 + sp * .8).toFixed(1), 52 + sp / 2 + 5, "+", { size: 16, fill: "var(--muted)" });
      x += c2 * sp + sp * 1.6;
    });
    // the sum: all dots regrouped in pairs, leftovers pair with each other
    const sc = Math.ceil(tot / 2), sp2 = Math.min(16, 380 / Math.max(1, sc)), r2 = Math.min(5, sp2 * .38), sx = 210 - (sc - 1) * sp2 / 2;
    s += `<rect x="14" y="128" width="392" height="${(sp2 + 62).toFixed(1)}" rx="12" fill="rgba(255,255,255,.04)" stroke="var(--line)"${m6hl(hl, "sum")}/>`;
    let left = 0; const singles = [];
    let q = 0; nums.forEach((v, i) => { for (let j = 0; j < v; j++) singles.push({ i, s: v % 2 === 1 && j === v - 1 }); });
    const ordered = singles.filter(o => !o.s).concat(singles.filter(o => o.s));
    const progress = clampN(m6n(D.a) >= 0 ? 1 : 1, 0, 1);
    ordered.forEach((o, j) => { const cc = Math.floor(j / 2), rr = j % 2, last = tot % 2 === 1 && j === tot - 1;
      if (last) left = 1;
      s += `<circle cx="${(sx + cc * sp2).toFixed(1)}" cy="${(150 + rr * sp2).toFixed(1)}" r="${r2.toFixed(1)}" fill="${last ? "var(--night)" : o.s ? "var(--rani)" : M6COL[o.i % M6COL.length]}" stroke="${last ? "var(--rani)" : "none"}" stroke-width="2" opacity="${progress}"/>`; q++; });
    s += T(210, 150 + sp2 + 34, `sum = ${sh.has("sum") ? tot : "?"}${sh.has("par") ? (left ? " — one dot left over: ODD" : " — all in pairs: EVEN") : ""}`, { size: 14.5, fill: sh.has("par") ? (left ? "var(--rani)" : "var(--teal)") : "var(--ink)" });
    s += "</svg>";
    const nOdd = nums.filter(v => v % 2).length;
    return { svg: s, reads: { sum: nums.join(" + ") + " = " + tot, par: `${nOdd} odd number${nOdd === 1 ? "" : "s"} → ${nOdd} leftover dot${nOdd === 1 ? "" : "s"} → sum is ${m6par(tot)}` } };
  }
};

/* =========================================================
   5. k7m6_sq — a square grid (3 × 3 or 4 × 4) with row, column and diagonal sums
   params: cells (comma list; "" or "?" = blank), rs, cs (custom circle sums, else computed), diag (1 = show diagonals),
           add, mul (operate on every number), hide (indices shown as "?"), lx
   readouts: rows, cols, diag, magic     parts: "rows", "cols", "diag", "centre", "corners", "middles"
   ========================================================= */
function m6cells(P) {
  const raw = m6list(P.cells), N = Math.round(Math.sqrt(raw.length)) || 3, hide = new Set(m6nums(P.hide));
  const mul = m6n(P.mul) || 1, add = m6n(P.add);
  const v = raw.map((t, i) => (t === "?" || t === "_" || hide.has(i) || isNaN(+t)) ? null : +t * mul + add);
  return { N, v, lab: raw.map((t, i) => (hide.has(i) ? "?" : (t === "_" ? "" : (isNaN(+t) ? t : String(+t * mul + add))))) };
}
function m6lines(N) { const L = []; for (let r = 0; r < N; r++) L.push({ n: `Row ${r + 1}`, k: "rows", c: Array.from({ length: N }, (_, j) => r * N + j) });
  for (let c = 0; c < N; c++) L.push({ n: `Column ${c + 1}`, k: "cols", c: Array.from({ length: N }, (_, j) => j * N + c) });
  L.push({ n: "Diagonal ↘", k: "diag", c: Array.from({ length: N }, (_, j) => j * N + j) }); L.push({ n: "Diagonal ↙", k: "diag", c: Array.from({ length: N }, (_, j) => j * N + N - 1 - j) }); return L; }
SIM_DEF.k7m6_sq = {
  def: { cells: "4,7,5,6,1,2,3,9,8", rs: "", cs: "", diag: 0, add: 0, mul: 1, hide: "", lx: "" },
  rng: { add: () => [-5, 20, 1], mul: () => [1, 5, 1] },
  lab: { add: "Add to every number", mul: "Multiply every number by" },
  reads: { rows: "Row sums", cols: "Column sums", diag: "Diagonal sums", magic: "Magic?" },
  draw(D, P, sh, hl) {
    const { N, v, lab } = m6cells(P), L = m6lines(N), rs = m6list(P.rs), cs = m6list(P.cs), dg = !!m6n(P.diag);
    const sumOf = l => l.c.every(i => v[i] != null) ? l.c.reduce((x, i) => x + v[i], 0) : null;
    const u = N === 3 ? 52 : 42, gx = 120 - N * u / 2 + 20, gy = 30 + (N === 3 ? 18 : 6);
    let s = `<svg viewBox="0 0 420 250">`;
    if (P.lx) s += T(210, 16, svgFr(P.lx), { size: 12, fill: "var(--muted)" });
    const centre = N === 3 ? 4 : -1, corners = N === 3 ? [0, 2, 6, 8] : [0, N - 1, N * N - N, N * N - 1], middles = N === 3 ? [1, 3, 5, 7] : [];
    for (let i = 0; i < N * N; i++) {
      const r = Math.floor(i / N), c = i % N, x = gx + c * u, y = gy + r * u;
      const part = i === centre ? "centre" : corners.includes(i) ? "corners" : middles.includes(i) ? "middles" : "";
      s += `<rect x="${x}" y="${y}" width="${u - 3}" height="${u - 3}" rx="6" fill="rgba(239,220,174,.92)" stroke="#8a6a3a" stroke-width="1.5"${part ? m6hl(hl, part) : ""}/>`;
      const t = lab[i] || "", fs = t.length > 4 ? 12 : t.length > 2 ? 16 : 21;
      s += T(x + (u - 3) / 2, y + (u - 3) / 2 + fs * .36, esc(t), { size: fs, fill: t === "?" ? "var(--rani)" : "#2a2418", w: 800 });
    }
    const circ = (x, y, t, part, ok) => `<g${m6hl(hl, part)}><circle cx="${x}" cy="${y}" r="15" fill="${ok === false ? "var(--rani)" : "#f2d43a"}"/>` + T(x, y + 4.5, t, { size: t.length > 2 ? 10.5 : 12.5, fill: "#2a2418", w: 800 }) + `</g>`;
    for (let r = 0; r < N; r++) { const auto = sumOf(L[r]), t = rs[r] != null ? rs[r] : (sh.has("rows") && auto != null ? String(auto) : "?"); s += circ(gx + N * u + 16, gy + r * u + (u - 3) / 2, t, "rows"); }
    for (let c = 0; c < N; c++) { const auto = sumOf(L[N + c]), t = cs[c] != null ? cs[c] : (sh.has("cols") && auto != null ? String(auto) : "?"); s += circ(gx + c * u + (u - 3) / 2, gy + N * u + 16, t, "cols"); }
    if (dg) {
      s += `<g${m6hl(hl, "diag")} opacity=".3"><line x1="${gx}" y1="${gy}" x2="${gx + N * u - 3}" y2="${gy + N * u - 3}" stroke="var(--sky)" stroke-width="6" stroke-linecap="round"/><line x1="${gx + N * u - 3}" y1="${gy}" x2="${gx}" y2="${gy + N * u - 3}" stroke="var(--sky)" stroke-width="6" stroke-linecap="round"/></g>`;
      const d1 = sumOf(L[2 * N]), d2 = sumOf(L[2 * N + 1]);
      s += circ(gx + N * u + 16, gy + N * u + 16, sh.has("diag") && d1 != null ? String(d1) : "?", "diag");
      s += circ(gx - 18, gy + N * u + 16, sh.has("diag") && d2 != null ? String(d2) : "?", "diag");
    }
    // right panel: verdict
    const sums = L.map(sumOf), full = sums.every(x => x != null), magic = full && sums.every(x => x === sums[0]);
    const px = 330;
    const op = (m6n(P.mul) || 1) !== 1 || m6n(P.add) ? `${(m6n(P.mul) || 1) !== 1 ? "× " + (m6n(P.mul) || 1) + " " : ""}${m6n(P.add) ? (m6n(P.add) > 0 ? "+ " : "− ") + Math.abs(m6n(P.add)) : ""}` : "";
    if (op) s += T(px, 54, `every number ${op}`, { size: 12.5, fill: "var(--sky)" });
    if (full) { const tot = v.reduce((x, y) => x + y, 0); s += T(px, 92, `all ${N * N} numbers`, { size: 11, fill: "var(--muted)" }) + T(px, 112, `add to ${sh.has("rows") || sh.has("cols") ? tot : "?"}`, { size: 15 }); }
    if (sh.has("magic") && full) s += T(px, 160, magic ? "MAGIC!" : "not magic", { size: 20, fill: magic ? "var(--teal)" : "var(--rani)" }) + T(px, 182, magic ? `magic sum ${sums[0]}` : "the lines differ", { size: 13, fill: "var(--muted)" });
    s += "</svg>";
    const fmt = (a, b) => L.slice(a, b).map(l => l.c.map(i => v[i] == null ? "?" : m6fmt(v[i])).join(" + ") + " = " + (sumOf(l) == null ? "?" : sumOf(l))).join("; ");
    return { svg: s, reads: { rows: rs.length ? rs.join(", ") : fmt(0, N), cols: cs.length ? cs.join(", ") : fmt(N, 2 * N), diag: fmt(2 * N, 2 * N + 2), magic: !full ? "fill every box first" : magic ? `yes — every row, column and diagonal adds to ${sums[0]}` : `no — sums are ${sums.join(", ")}` } };
  }
};

/* =========================================================
   7. k7m6_rhythm — Virahāṅka rhythms: every way to fill n beats with short (1 beat) and long (2 beats) syllables
   params: n (beats), mode ("beats" or "steps")
   readouts: count, rule    parts: "one" (rhythms starting 1+), "two" (starting 2+)
   ========================================================= */
function m6comp(n) { if (n === 0) return [[]]; if (n < 0) return []; return m6comp(n - 1).map(c => [1].concat(c)).concat(m6comp(n - 2).map(c => [2].concat(c))); }
const m6fib = n => { let a = 1, b = 1; for (let i = 0; i < n; i++) [a, b] = [b, a + b]; return a; }; // m6fib(n) = number of n-beat rhythms
SIM_DEF.k7m6_rhythm = {
  def: { n: 4, mode: "beats" },
  rng: { n: () => [1, 8, 1] },
  lab: { n: "Number of beats n" },
  reads: { count: "Number of rhythms", rule: "Virahāṅka’s rule" },
  draw(D, P, sh, hl) {
    const n = clampN(Math.round(m6n(D.n)), 1, 8), all = m6comp(n), steps = P.mode === "steps", cnt = all.length;
    const show = all.slice(0, cnt > 13 ? 12 : 13), two = show.length > 7, colW = two ? 200 : 400, rows = two ? Math.ceil(show.length / 2) : show.length;
    const rh = Math.min(24, 196 / Math.max(1, rows)), u = two ? Math.min(15, 88 / n) : Math.min(34, (colW - 110) / n);
    let s = `<svg viewBox="0 0 420 256">`;
    s += T(210, 16, steps ? `ways to climb ${n} stairs, 1 or 2 steps at a time` : `${n}-beat rhythms: short = 1 beat, long = 2 beats`, { size: 12, fill: "var(--muted)" });
    show.forEach((c, i) => {
      const col = two ? (i < rows ? 0 : 1) : 0, row = two ? i % rows : i, x0 = 14 + col * 206, y = 28 + row * rh;
      const part = c[0] === 1 ? "one" : "two";
      s += `<g${m6hl(hl, part)}><rect x="${x0}" y="${y}" width="${(two ? 196 : 392)}" height="${(rh - 3).toFixed(1)}" rx="5" fill="${c[0] === 1 ? "rgba(53,194,154,.13)" : "rgba(244,165,28,.13)"}"/></g>`;
      let x = x0 + 6;
      c.forEach(k => { s += `<rect x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}" width="${(k * u - 3).toFixed(1)}" height="${Math.max(4, rh - 9).toFixed(1)}" rx="${k === 1 ? 5 : 4}" fill="${k === 1 ? "var(--teal)" : "var(--mari)"}"/>`;
        if (rh > 13 && u > 13) s += T((x + (k * u - 3) / 2).toFixed(1), (y + rh / 2 + 2).toFixed(1), steps ? k : (k === 1 ? "S" : "L"), { size: Math.min(11, rh * .5), fill: "#10233a", w: 800 });
        x += k * u; });
      s += T((x0 + (two ? 190 : 386)).toFixed(1), (y + rh / 2 + 2).toFixed(1), c.join("+"), { size: Math.min(n >= 8 ? 9 : 10.5, rh * .48), fill: "var(--muted)", a: "end", w: 600 });
    });
    const yb = 28 + rows * rh + 16;
    if (cnt > show.length) s += T(210, Math.min(yb, 236), `… and ${cnt - show.length} more`, { size: 12, fill: "var(--muted)" });
    s += T(210, 250, sh.has("count") ? `${cnt} ${steps ? "ways" : "rhythms"}: ${n >= 2 ? `${m6fib(n - 1)} start with 1+, ${n >= 3 ? m6fib(n - 2) : 1} start with 2+` : "just one"}` : `how many? count them`, { size: 13.5, fill: sh.has("count") ? "var(--mari)" : "var(--ink)" });
    s += "</svg>";
    return { svg: s, reads: { count: `${cnt}`, rule: n >= 3 ? `rhythms of ${n} = rhythms of ${n - 1} (put 1+ in front) + rhythms of ${n - 2} (put 2+ in front) = ${m6fib(n - 1)} + ${m6fib(n - 2)} = ${cnt}` : n === 2 ? "1+1 or 2: 2 rhythms" : "only 1: one rhythm" } };
  }
};

/* =========================================================
   9. k7m6_crypt — cryptarithm: letters stand for digits. Slide the addend letters; the sum is checked against the pattern.
   params: pz ("UT+TA=TAT"), and one param per letter (A..Z) with its digit
   readouts: sum, check     parts: "sum", "units"
   ========================================================= */
const M6L = "ABCDEFHKMOPRTUYZ".split("");
function m6crypt(P) {
  const [lhs, rhs] = String(P.pz || "T+T+T=UT").split("="), adds = lhs.split("+"), val = {};
  M6L.forEach(L => val[L] = clampN(Math.round(m6n(P[L])), 0, 9));
  const num = w => +w.split("").map(ch => /\d/.test(ch) ? ch : String(val[ch])).join("");
  const sum = adds.reduce((x, w) => x + num(w), 0), sd = String(sum);
  const known = {}; adds.join("").split("").forEach(ch => { if (!/\d/.test(ch)) known[ch] = val[ch]; });
  let ok = sd.length === rhs.length, why = ok ? "" : `the sum has ${sd.length} digit${sd.length > 1 ? "s" : ""}, the answer needs ${rhs.length}`;
  const got = Object.assign({}, known);
  if (ok) for (let i = 0; i < rhs.length; i++) { const ch = rhs[i], d = +sd[i];
    if (/\d/.test(ch)) { if (+ch !== d) { ok = false; why = `that place should be ${ch}, the sum gives ${d}`; break; } }
    else if (got[ch] != null && got[ch] !== d) { ok = false; why = `${ch} would have to be both ${got[ch]} and ${d}`; break; }
    else got[ch] = d; }
  if (ok) { const ls = Object.keys(got), ds = ls.map(l => got[l]); if (new Set(ds).size !== ds.length) { ok = false; why = "two different letters got the same digit"; } }
  return { adds, rhs, val, sum, sd, ok, why, got };
}
SIM_DEF.k7m6_crypt = {
  def: Object.assign({ pz: "T+T+T=UT" }, Object.fromEntries(M6L.map(L => [L, 0]))),
  rng: Object.fromEntries(M6L.map(L => [L, () => [0, 9, 1]])),
  lab: Object.fromEntries(M6L.map(L => [L, `Digit for ${L}`])),
  reads: { sum: "Sum with these digits", check: "Does it fit?" },
  draw(D, P, sh, hl) {
    const C = m6crypt(P), w = Math.max(C.rhs.length, ...C.adds.map(a => a.length)), u = 40, xr = 230, y0 = 28;
    let s = `<svg viewBox="0 0 420 ${Math.max(236, y0 + (C.adds.length + 1) * 56 + 30)}">`;
    const row = (word, y, isSum) => { let t = ""; word.split("").forEach((ch, i) => { const x = xr - (word.length - i) * u, dig = /\d/.test(ch);
      const units = i === word.length - 1;
      t += `<rect x="${x + 3}" y="${y}" width="${u - 6}" height="36" rx="7" fill="${dig ? "rgba(255,255,255,.08)" : isSum ? "rgba(98,182,232,.22)" : "rgba(244,165,28,.22)"}" stroke="${dig ? "var(--line)" : isSum ? "var(--sky)" : "var(--mari)"}"${units ? m6hl(hl, "units") : ""}/>`;
      t += T(x + u / 2, y + 25, ch, { size: 20, fill: dig ? "var(--muted)" : "var(--ink)" });
      if (!dig && sh.has("sum")) { const d = isSum ? (C.ok ? C.got[ch] : "?") : C.val[ch]; t += T(x + u / 2, y + 50, d, { size: 11, fill: isSum ? "var(--sky)" : "var(--mari)" }); }
    }); return t; };
    C.adds.forEach((a, i) => { s += row(a, y0 + i * 56, false); if (i === C.adds.length - 1) s += T(xr - w * u - 14, y0 + i * 56 + 25, "+", { size: 22, fill: "var(--muted)" }); });
    const ly = y0 + C.adds.length * 56 - 2;
    s += `<line x1="${xr - w * u - 24}" y1="${ly}" x2="${xr + 4}" y2="${ly}" stroke="var(--ink)" stroke-width="2.5"/>`;
    s += `<g${m6hl(hl, "sum")}>` + row(C.rhs, ly + 8, true) + `</g>`;
    const px = 330;
    s += T(px, 50, "with these digits:", { size: 11.5, fill: "var(--muted)" });
    C.adds.forEach((a, i) => { s += T(px, 72 + i * 18, a.split("").map(ch => /\d/.test(ch) ? ch : C.val[ch]).join("").replace(/^0+(?=\d)/, ""), { size: 14 }); });
    const yy = 72 + C.adds.length * 18;
    s += T(px, yy + 6, sh.has("sum") ? `sum = ${C.sum}` : "sum = ?", { size: 15, fill: "var(--mari)" });
    if (sh.has("check")) { s += T(px, yy + 36, C.ok ? "FITS! ✓" : "does not fit", { size: 17, fill: C.ok ? "var(--teal)" : "var(--rani)" }); if (!C.ok) { const words = C.why.split(" "), half = Math.ceil(words.length / 2); s += T(px, yy + 56, words.slice(0, half).join(" "), { size: 10, fill: "var(--muted)", w: 600 }) + T(px, yy + 69, words.slice(half).join(" "), { size: 10, fill: "var(--muted)", w: 600 }); } }
    s += "</svg>";
    const assign = Object.keys(C.got).sort().map(l => `${l} = ${C.got[l]}`).join(", ");
    return { svg: s, reads: { sum: C.adds.map(a => a.split("").map(ch => /\d/.test(ch) ? ch : C.val[ch]).join("")).join(" + ") + " = " + C.sum, check: C.ok ? `yes: ${assign}` : `no — ${C.why}` } };
  }
};

/* =========================================================
   GUIDE — Mayuri, the dancing peacock of Khajuraho
   ========================================================= */
GUIDES.k7m6_peacock = () => `<svg class="guide peacock" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="125" rx="32" ry="4" fill="#000" opacity=".25"/>
  <g><animateTransform attributeName="transform" type="rotate" values="-4 60 92;4 60 92;-4 60 92" dur="3.2s" repeatCount="indefinite"/>
    ${Array.from({ length: 11 }, (_, i) => { const a = (-160 + i * 14) * Math.PI / 180, x = 60 + Math.cos(a) * 52, y = 92 + Math.sin(a) * 58; return `<path d="M60 92 L${(60 + Math.cos(a - .09) * 50).toFixed(1)} ${(92 + Math.sin(a - .09) * 56).toFixed(1)} L${(60 + Math.cos(a + .09) * 50).toFixed(1)} ${(92 + Math.sin(a + .09) * 56).toFixed(1)}Z" fill="#1f8f5f"/><ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="7.5" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="#2fb07a"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.2" fill="#f4c430"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#1a5fb4"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.1" fill="#0b1a33"/>`; }).join("")}
  </g>
  <path d="M50 116 l-3 8 M47 124 h-5 M47 124 h5 M70 116 l3 8 M73 124 h-5 M73 124 h5" stroke="#c98a3a" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="47" cy="119" r="1.6" fill="#f4c430"/><circle cx="50" cy="119" r="1.6" fill="#f4c430"/><circle cx="70" cy="119" r="1.6" fill="#f4c430"/><circle cx="73" cy="119" r="1.6" fill="#f4c430"/>
  <ellipse cx="60" cy="98" rx="17" ry="21" fill="#1e5bd6"/>
  <ellipse cx="57" cy="102" rx="9" ry="13" fill="#2f7bf0" opacity=".7"/>
  <path d="M44 96 Q36 108 46 118 Q52 108 50 96Z" fill="#7a5a2a"/><path d="M76 96 Q84 108 74 118 Q68 108 70 96Z" fill="#7a5a2a"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M54 82 Q52 62 58 50 L64 50 Q68 62 66 82Z" fill="#1e5bd6"/>
    <circle cx="61" cy="44" r="11" fill="#1e5bd6"/>
    <path d="M57 42 Q61 39 66 42" stroke="#fff" stroke-width="2.2" fill="none"/>
    <circle cx="63" cy="43" r="2.6" fill="#15202a"/><circle cx="63.8" cy="42.2" r=".9" fill="#fff"/>
    <g class="lids"><rect x="59" y="39" width="8" height="8" rx="4" fill="#1e5bd6"/></g>
    <path d="M71 45 L79 47 L71 49Z" fill="#c98a3a"/>
    <path d="M58 33 L54 20 M61 33 L61 18 M64 33 L68 20" stroke="#1e5bd6" stroke-width="1.6"/>
    <circle cx="54" cy="19" r="2.6" fill="#2fb07a"/><circle cx="61" cy="17" r="2.6" fill="#2fb07a"/><circle cx="68" cy="19" r="2.6" fill="#2fb07a"/>
    <circle cx="57" cy="50" r="2.6" fill="#ff7aa2" opacity=".45"/>
  </g>
</svg>`;

/* =========================================================
   SCENE — Khajuraho on festival night: temple spires, a lamp-lit stage, a rising moon, floating diyas
   ========================================================= */
let m6w = null;
function m6wInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  m6w = { W, H,
    stars: Array.from({ length: Math.round(W * H / 6000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .6), r: rnd(.3, 1.6), p: rnd(0, 6.28) })),
    temples: (() => { const a = []; let x = -40; while (x < W + 60) { const w = rnd(110, 200); a.push({ x, w, h: rnd(.32, .5) * H, tiers: Math.round(rnd(4, 7)) }); x += w * rnd(.7, 1.05); } return a; })(),
    sparks: Array.from({ length: Math.max(10, Math.round(W / 70)) }, () => ({ x: rnd(0, W), y: rnd(H * .3, H), s: rnd(.15, .45), p: rnd(0, 6.28) })) };
}
function m6spire(c, x, w, h, gy, tiers, lit) {
  // a nagara-style shikhara: a curved tower made of stacked rounded tiers, a smaller spire on each side
  const drawTower = (cx, tw, th) => {
    c.beginPath(); c.moveTo(cx - tw / 2, gy);
    c.bezierCurveTo(cx - tw / 2, gy - th * .55, cx - tw * .18, gy - th * .92, cx, gy - th);
    c.bezierCurveTo(cx + tw * .18, gy - th * .92, cx + tw / 2, gy - th * .55, cx + tw / 2, gy); c.closePath(); c.fill();
  };
  c.fillStyle = lit[0]; drawTower(x + w * .2, w * .34, h * .62); drawTower(x + w * .8, w * .34, h * .62);
  c.fillStyle = lit[1]; drawTower(x + w / 2, w * .56, h);
  c.strokeStyle = lit[2]; c.lineWidth = 1.2;
  for (let i = 1; i < tiers; i++) { const yy = gy - h * i / tiers, k = 1 - Math.pow(i / tiers, 1.6); c.beginPath(); c.moveTo(x + w / 2 - w * .28 * k, yy); c.quadraticCurveTo(x + w / 2, yy - 5, x + w / 2 + w * .28 * k, yy); c.stroke(); }
  c.fillStyle = lit[2]; c.beginPath(); c.ellipse(x + w / 2, gy - h - 4, 7, 4, 0, 0, 6.28); c.fill(); c.fillRect(x + w / 2 - 1.2, gy - h - 16, 2.4, 10);
}
SCENES.k7m6_khajuraho = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!m6w || m6w.W !== W || m6w.H !== H) m6wInit(W, H);
  const S = m6w, gy = H * .8;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#070b24"); g.addColorStop(.55, "#1d1546"); g.addColorStop(1, "#4a2350");
  c.fillStyle = g; c.fillRect(0, 0, W, gy);
  S.stars.forEach(s => { c.globalAlpha = .3 + .4 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // moon slowly rising
  const mr = Math.min(W, H) * .06, mx = W * .18, my = H * .2 + Math.sin(t / 20000) * H * .02;
  const mg = c.createRadialGradient(mx, my, mr * .7, mx, my, mr * 3); mg.addColorStop(0, "rgba(255,236,190,.3)"); mg.addColorStop(1, "rgba(255,236,190,0)");
  c.fillStyle = mg; c.beginPath(); c.arc(mx, my, mr * 3, 0, 6.28); c.fill(); c.fillStyle = "#f6e7c1"; c.beginPath(); c.arc(mx, my, mr, 0, 6.28); c.fill();
  // far temples, then near temples lit warm from below
  S.temples.forEach((tp, i) => m6spire(c, tp.x, tp.w * .8, tp.h * .7, gy - 8, tp.tiers, ["#160f30", "#1b1338", "rgba(120,90,140,.35)"]));
  S.temples.forEach((tp, i) => { if (i % 2) return; const glow = .55 + .1 * Math.sin(t / 900 + i);
    m6spire(c, tp.x + tp.w * .2, tp.w, tp.h, gy, tp.tiers, [`rgba(92,52,48,${glow})`, `rgba(122,70,52,${glow})`, `rgba(244,165,28,${.35 * glow})`]); });
  // stage platform and floor
  c.fillStyle = "#1a0f22"; c.fillRect(0, gy, W, H - gy);
  const sw = Math.min(W * .5, 520), sx = W / 2 - sw / 2;
  c.fillStyle = "#5b3524"; c.fillRect(sx, gy - 6, sw, 22); c.fillStyle = "#7c4a2f"; c.fillRect(sx, gy - 10, sw, 6);
  // spotlight sweep on the stage
  const sa = Math.sin(t / 2600) * .35; c.save(); c.translate(W / 2, 0); c.rotate(sa);
  const lg = c.createLinearGradient(0, 0, 0, gy); lg.addColorStop(0, "rgba(255,220,160,0)"); lg.addColorStop(1, "rgba(255,220,160,.12)");
  c.fillStyle = lg; c.beginPath(); c.moveTo(-10, 0); c.lineTo(10, 0); c.lineTo(sw * .25, gy); c.lineTo(-sw * .25, gy); c.fill(); c.restore();
  // a row of diyas along the stage edge, flickering
  for (let x = sx + 14; x < sx + sw - 6; x += 34) { const f = .7 + .3 * Math.sin(t / 120 + x);
    const dg = c.createRadialGradient(x, gy - 18, 0, x, gy - 18, 16); dg.addColorStop(0, `rgba(255,190,80,${.55 * f})`); dg.addColorStop(1, "rgba(255,190,80,0)");
    c.fillStyle = dg; c.beginPath(); c.arc(x, gy - 18, 16, 0, 6.28); c.fill();
    c.fillStyle = "#c97a3a"; c.beginPath(); c.ellipse(x, gy - 11, 6, 3, 0, 0, Math.PI); c.fill();
    c.fillStyle = `rgba(255,220,120,${f})`; c.beginPath(); c.ellipse(x, gy - 17, 2.2, 4.5 * f, 0, 0, 6.28); c.fill(); }
  // drums keeping the beat: short-short-long
  const beat = Math.floor(t / 400) % 4, dx = sx - 50;
  if (dx > 20) { c.fillStyle = "#6b3a1e"; c.beginPath(); c.ellipse(dx, gy - 6, 20, 9, 0, 0, 6.28); c.fill(); c.fillStyle = beat < 2 ? "#ffd166" : "#e9d6b0"; c.beginPath(); c.ellipse(dx, gy - 10, 16, 6, 0, 0, 6.28); c.fill(); }
  // floating festival sparks
  S.sparks.forEach(p => { if (!RM) { p.y -= p.s; p.x += Math.sin(t / 1500 + p.p) * .3; if (p.y < H * .2) { p.y = H; p.x = Math.random() * W; } }
    c.fillStyle = `rgba(255,200,110,${.25 + .25 * Math.sin(t / 500 + p.p)})`; c.beginPath(); c.arc(p.x, p.y, 1.8, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(4,6,20,.25)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================================================
   3D SIMULATIONS (WebGL via make3D, drag to turn)
   ========================================================================================= */
function m6tex(THREE, draw, w, h) { const cv = document.createElement("canvas"); cv.width = w || 128; cv.height = h || 128; draw(cv.getContext("2d"), cv.width, cv.height); const t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t; }
const M6SQ = { loshu: "4,9,2,3,5,7,8,1,6", lo: "2,7,6,9,5,1,4,3,8", chautisa: "7,12,1,14,2,13,8,11,16,3,10,5,9,6,15,4", kubera: "27,20,25,22,24,26,23,28,21", magic: "8,1,6,3,5,7,4,9,2" };
function m6yreads(P) {
  const v = m6nums(M6SQ[P.sq] || P.sq), N = Math.round(Math.sqrt(v.length)), L = m6lines(N), k = Math.round(m6n(P.line));
  const ms = v.slice(0, N).reduce((a, b) => a + b, 0);
  const l = k >= 1 && k <= L.length ? L[k - 1] : null;
  return { line: l ? `${l.n}: ${l.c.map(i => v[i]).join(" + ")} = ${l.c.reduce((a, i) => a + v[i], 0)}` : "pick a line with the slider", sum: `${2 * N + 2} lines, each adds to ${ms}` };
}
/* ---------- 3D-1. k7m6_yantra3d — a carved stone yantra; the chosen line of tiles rises and glows
   params: sq (loshu | lo | chautisa | kubera | magic | comma list), line (0 none, then rows, columns, 2 diagonals), title
   readouts: line, sum   parts: "slab", "line" ---------- */
SIM_DEF.k7m6_yantra3d = {
  def: { sq: "chautisa", line: 0, title: "" },
  rng: { line: P => { const N = Math.round(Math.sqrt(m6nums(M6SQ[P.sq] || P.sq).length)); return [0, 2 * N + 2, 1]; } },
  lab: { line: "Line to light up (rows, columns, diagonals)" },
  reads: { line: "Chosen line", sum: "Every line" },
  readouts(P) { return m6yreads(P); },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 8, phi: 0.95, theta: 0.25, auto: 0.12, target: [0, -0.4, 0.3], hint: "Drag to turn the stone yantra" });
    if (!g) return null;
    const { THREE, root } = g;
    const stoneTex = m6tex(THREE, (c, w, h) => { c.fillStyle = "#b98a5a"; c.fillRect(0, 0, w, h); for (let i = 0; i < 900; i++) { c.fillStyle = `rgba(${Math.random() < .5 ? "70,40,20" : "255,230,190"},${Math.random() * .12})`; c.fillRect(Math.random() * w, Math.random() * h, 2, 2); } }, 256, 256);
    const slab = new THREE.Mesh(new THREE.BoxGeometry(1, 0.4, 1), new THREE.MeshStandardMaterial({ map: stoneTex, roughness: .9 }));
    slab.position.y = -0.3; root.add(slab);
    const rim = new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 1), new THREE.MeshStandardMaterial({ color: 0x7a4f2c, roughness: .8 })); rim.position.y = -0.52; root.add(rim);
    const tileG = new THREE.BoxGeometry(0.9, 0.3, 0.9), side = new THREE.MeshStandardMaterial({ color: 0xc9a06a, roughness: .7, emissive: 0x3a2200, emissiveIntensity: .1 });
    const faceFor = (n, hot) => new THREE.MeshStandardMaterial({ map: m6tex(THREE, (c, w, h) => { c.fillStyle = hot ? "#ffd166" : "#e9cf9e"; c.fillRect(0, 0, w, h); c.strokeStyle = hot ? "#b8601c" : "#8a6a3a"; c.lineWidth = 10; c.strokeRect(5, 5, w - 10, h - 10); c.fillStyle = "#2a1a0a"; c.font = "bold 70px sans-serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(String(n), w / 2, h / 2 + 4); }), roughness: .6, emissive: hot ? 0xf4a51c : 0x000000, emissiveIntensity: hot ? .35 : 0 });
    let tiles = [], N = 0, cur = "";
    const lTitle = g.label("", [0, 2.6, -2.4], "plain"), lSum = g.label("", [0, 1.9, -2.4], "big");
    const st = { line: [], hl: null };
    function build(sq) {
      tiles.forEach(t => { root.remove(t.m); t.m.material.forEach(m => { if (m.map) m.map.dispose(); if (m !== side) m.dispose(); }); }); tiles = [];
      const v = m6nums(M6SQ[sq] || sq); N = Math.round(Math.sqrt(v.length));
      slab.scale.set(N + 0.6, 1, N + 0.6); rim.scale.set(N + 1, 1, N + 1);
      v.forEach((n, i) => { const r = Math.floor(i / N), c = i % N, cold = faceFor(n, false), hot = faceFor(n, true);
        const m = new THREE.Mesh(tileG, [side, side, cold, side, side, side]); m.position.set(c - (N - 1) / 2, 0, r - (N - 1) / 2); root.add(m);
        tiles.push({ m, cold, hot, y: 0, ty: 0, n }); });
      g.view.dist = N === 4 ? 7 : 5.8; lSum.move([0, 1.6, -N / 2 - 0.4]); lTitle.move([0, 2.3, -N / 2 - 0.4]);
    }
    g.onFrame((t, dt) => { const k = Math.min(1, dt * 7);
      tiles.forEach((tl, i) => { tl.y = tl.y + (tl.ty - tl.y) * k; tl.m.position.y = tl.y + (st.hl === "line" && tl.ty > 0 ? 0.08 * Math.sin(t * 8) : 0); });
      slab.material.emissive = slab.material.emissive || new THREE.Color(0); slab.material.emissiveIntensity = st.hl === "slab" ? .3 + .2 * Math.sin(t * 8) : 0; slab.material.emissive.setHex(0x553311); });
    function apply(D, P, sh, hl) {
      st.hl = hl;
      if (P.sq !== cur) { cur = P.sq; build(P.sq); }
      const L = m6lines(N), k = Math.round(m6n(P.line)), l = k >= 1 && k <= L.length ? L[k - 1] : null, on = new Set(l ? l.c : []);
      tiles.forEach((tl, i) => { const hot = on.has(i); tl.ty = hot ? 0.55 : 0; tl.m.material[2] = hot ? tl.hot : tl.cold; });
      lTitle.set(P.title ? fx(String(P.title)) : "");
      const r = m6yreads(P); lSum.set(l ? (sh.has("line") ? r.line : `${l.n}: = ?`) : (sh.has("sum") ? r.sum : "")); lSum.show(!!(l || sh.has("sum")));
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

})();
