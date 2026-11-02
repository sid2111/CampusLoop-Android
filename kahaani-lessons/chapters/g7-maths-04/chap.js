(function(){
/* Grade 7 (Ganita Prakash Part I) Chapter 4 — Expressions using Letter-Numbers
   Plugin: simulations (k7m4_*), the Kanchipuram loom-house scene, and Mitthu the mynah guide. */

/* ---------- private helpers ---------- */
const m4hl = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const m4n = x => { const v = +x; return isFinite(v) ? v : 0; };
const m4f = x => { let v = Math.round(m4n(x) * 100) / 100; if (Object.is(v, -0)) v = 0; const s = String(Math.abs(v)); return (v < 0 ? "−" : "") + s; };
const m4e = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const M4COL = ["var(--mari)", "var(--sky)", "var(--rani)", "var(--teal)", "#b99cff", "#ff8a65"];
const M4HEX = ["#f4a51c", "#62b6e8", "#e04a86", "#35c29a", "#b99cff", "#ff8a65"];
const M4LET = "abcdefghijklmnopqrstuvwxyz".split("");

/* ---- a tiny expression engine: tokens → tree → value, or → list of signed terms ---- */
function m4tok(src) {
  const s = String(src).replace(/−|–/g, "-").replace(/×|·/g, "*").replace(/÷/g, "/");
  const raw = []; let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (/[0-9.]/.test(ch)) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; raw.push({ t: "n", v: parseFloat(s.slice(i, j)) }); i = j; continue; }
    if (/[a-zA-Z]/.test(ch)) { raw.push({ t: "v", v: ch }); i++; continue; }
    if ("+-*/()".includes(ch)) raw.push({ t: ch });
    i++;
  }
  const out = [];
  raw.forEach(tk => { const p = out[out.length - 1]; if (p && (p.t === "n" || p.t === "v" || p.t === ")") && (tk.t === "n" || tk.t === "v" || tk.t === "(")) out.push({ t: "*", imp: true }); out.push(tk); });
  return out;
}
function m4parse(src) {
  const tk = m4tok(src); let p = 0;
  const peek = () => tk[p], eat = () => tk[p++];
  function prim() { const t = eat(); if (!t) return { o: "n", v: 0 };
    if (t.t === "n") return { o: "n", v: t.v }; if (t.t === "v") return { o: "v", v: t.v };
    if (t.t === "(") { const e = expr(); if (peek() && peek().t === ")") eat(); return e; }
    if (t.t === "-") return { o: "neg", a: unary() }; if (t.t === "+") return unary();
    return { o: "n", v: 0 }; }
  function unary() { const t = peek(); if (t && t.t === "-") { eat(); return { o: "neg", a: unary() }; } if (t && t.t === "+") { eat(); return unary(); } return prim(); }
  function term() { let a = unary(); while (peek() && (peek().t === "*" || peek().t === "/")) { const o = eat().t; a = { o, a, b: unary() }; } return a; }
  function expr() { let a = term(); while (peek() && (peek().t === "+" || peek().t === "-")) { const o = eat().t; a = { o, a, b: term() }; } return a; }
  return expr();
}
function m4val(n, env) {
  switch (n.o) { case "n": return n.v; case "v": return m4n(env[n.v]); case "neg": return -m4val(n.a, env);
    case "+": return m4val(n.a, env) + m4val(n.b, env); case "-": return m4val(n.a, env) - m4val(n.b, env);
    case "*": return m4val(n.a, env) * m4val(n.b, env); case "/": { const d = m4val(n.b, env); return d ? m4val(n.a, env) / d : NaN; } }
  return 0;
}
const m4isC = L => L && L.every(t => !t.v);
const m4sum = L => L.reduce((s, t) => s + t.k, 0);
function m4terms(n) { // linear only; null when two letter-numbers are multiplied
  switch (n.o) {
    case "n": return [{ k: n.v, v: "" }]; case "v": return [{ k: 1, v: n.v }];
    case "neg": { const A = m4terms(n.a); return A && A.map(t => ({ k: -t.k, v: t.v })); }
    case "+": { const A = m4terms(n.a), B = m4terms(n.b); return A && B && A.concat(B); }
    case "-": { const A = m4terms(n.a), B = m4terms(n.b); return A && B && A.concat(B.map(t => ({ k: -t.k, v: t.v }))); }
    case "*": { const A = m4terms(n.a), B = m4terms(n.b); if (!A || !B) return null;
      if (m4isC(A)) { const c = m4sum(A); return B.map(t => ({ k: c * t.k, v: t.v })); }
      if (m4isC(B)) { const c = m4sum(B); return A.map(t => ({ k: c * t.k, v: t.v })); } return null; }
    case "/": { const A = m4terms(n.a), B = m4terms(n.b); if (!A || !B || !m4isC(B) || !m4sum(B)) return null; const c = m4sum(B); return A.map(t => ({ k: t.k / c, v: t.v })); }
  }
  return null;
}
function m4merge(L) {
  const order = [], acc = {};
  L.forEach(t => { if (!(t.v in acc)) { acc[t.v] = 0; order.push(t.v); } acc[t.v] += t.k; });
  const res = order.filter(v => v).map(v => ({ k: Math.round(acc[v] * 1e6) / 1e6, v })).filter(t => t.k);
  const c = Math.round((acc[""] || 0) * 1e6) / 1e6; if (c) res.push({ k: c, v: "" });
  return res.length ? res : [{ k: 0, v: "" }];
}
const m4coef = (k, v) => { const a = Math.abs(k); return v ? (a === 1 ? v : m4f(a) + v) : m4f(a); };
const m4term1 = t => (t.k < 0 ? "−" : "") + m4coef(t.k, t.v);
function m4fmt(L) { if (!L || !L.length) return "0"; return L.map((t, i) => i === 0 ? m4term1(t) : (t.k < 0 ? " − " : " + ") + m4coef(t.k, t.v)).join(""); }
function m4simp(src) { const T0 = m4terms(m4parse(src)); return T0 ? m4fmt(m4merge(T0)) : String(src); }
function m4letters(src) { const s = []; m4tok(src).forEach(t => { if (t.t === "v" && s.indexOf(t.v) < 0) s.push(t.v); }); return s; }
// "23 + 3": the expression with every letter-number replaced by its value
function m4sub(src, env) {
  const tk = m4tok(src); let o = "";
  tk.forEach((t, i) => { const pv = tk[i - 1];
    const un = !pv || pv.t === "(" || "+-*/".includes(pv.t);
    if (t.t === "n") o += m4f(t.v);
    else if (t.t === "v") { const v = m4n(env[t.v]); o += v < 0 ? `(${m4f(v)})` : m4f(v); }
    else if (t.t === "(" || t.t === ")") o += t.t;
    else if (t.t === "-" && un) o += "−";
    else o += { "+": " + ", "-": " − ", "*": " × ", "/": " ÷ " }[t.t]; });
  return o;
}
const m4show = s => m4e(String(s).replace(/-/g, "−").replace(/\*/g, "×"));
const m4w = (s, size) => String(s).length * size * 0.56;
const m4fit = (s, size, max) => Math.min(size, max / Math.max(1, String(s).length * 0.56));

/* =========================================================
   1. k7m4_eval — the pattern-book slate: replace letter-numbers by numbers and find the value
   params: ex ("s = a + 3" or "35c + 60j"), lx (title), one param per letter (a … z), min/max (slider range)
   readouts: sub (substitution), val (value)   parts: "ex", "sub", "val"
   ========================================================= */
const m4evDef = { ex: "a + 3", lx: "", min: -10, max: 50, step: 1 }, m4evRng = {}, m4evLab = {};
M4LET.forEach(l => { m4evDef[l] = 0; m4evRng[l] = P => [P.min != null ? P.min : -10, P.max != null ? P.max : 50, P.step || 1]; m4evLab[l] = `Value of ${l}`; });
function m4split(ex) { const s = String(ex); const i = s.indexOf("="); return i > 0 ? { lhs: s.slice(0, i).trim(), rhs: s.slice(i + 1).trim() } : { lhs: "", rhs: s }; }
function m4evRead(P) {
  const { lhs, rhs } = m4split(P.ex), env = {}; M4LET.forEach(l => env[l] = Math.round(m4n(P[l]) * 100) / 100);
  const L = m4letters(rhs), v = m4val(m4parse(rhs), env);
  return { L, lhs, rhs, env, v, sub: `${L.map(l => `${l} = ${m4f(env[l])}`).join(", ")}${L.length ? ": " : ""}${m4show(rhs)} → ${m4sub(rhs, env)}`, val: `${lhs ? lhs + " = " : ""}${m4f(v)}` };
}
SIM_DEF.k7m4_eval = {
  def: m4evDef, rng: m4evRng, lab: m4evLab,
  reads: { sub: "Replace the letters", val: "Value" },
  draw(D, P, sh, hl) {
    const R = m4evRead(P), env = {}; M4LET.forEach(l => env[l] = Math.round(m4n(D[l])));
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 22, m4e(P.lx || "Pattern-book slate"), { size: 13, fill: "var(--muted)" });
    // slate
    s += `<rect x="20" y="34" width="380" height="62" rx="12" fill="#18302a" stroke="#8a6a3b" stroke-width="5"${m4hl(hl, "ex")}/>`;
    const big = (R.lhs ? R.lhs + " = " : "") + (P.hide && !sh.has("val") ? "?" : R.rhs), fs = m4fit(big, 28, 350);
    s += T(210, 74, m4show(big), { size: fs, fill: "#f3f0dc" });
    // spools: one per letter-number
    const n = R.L.length, sw = Math.min(112, 380 / Math.max(n, 1) - 8);
    (P.hide && !sh.has("val") ? [] : R.L).forEach((l, i) => { const x = 210 - (n * (sw + 8) - 8) / 2 + i * (sw + 8), c = M4COL[i % M4COL.length];
      s += `<rect x="${x.toFixed(1)}" y="108" width="${sw.toFixed(1)}" height="30" rx="15" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="2"/>`;
      s += `<circle cx="${(x + 15).toFixed(1)}" cy="123" r="9" fill="${c}"/>` + T(x + 15, 127, l, { size: 13, fill: "#10233a" });
      s += T(x + sw / 2 + 9, 128, `= ${m4f(env[l])}`, { size: m4fit(`= ${m4f(env[l])}`, 15, sw - 34), fill: "var(--ink)" }); });
    // substitution and value
    const sub = P.hide && !sh.has("val") ? "?" : m4sub(R.rhs, env);
    s += `<g${m4hl(hl, "sub")}>` + T(210, 172, sh.has("sub") ? sub : "Replace each letter by its number…", { size: sh.has("sub") ? m4fit(sub, 20, 390) : 13, fill: sh.has("sub") ? "var(--ink)" : "var(--muted)" }) + `</g>`;
    const vt = `${R.lhs ? R.lhs + " = " : "= "}${sh.has("val") ? m4f(m4val(m4parse(R.rhs), env)) : "?"}`;
    s += `<rect x="${(210 - m4w(vt, 22) / 2 - 18).toFixed(1)}" y="190" width="${(m4w(vt, 22) + 36).toFixed(1)}" height="38" rx="19" fill="rgba(53,194,154,.16)" stroke="var(--teal)"${m4hl(hl, "val")}/>`;
    s += T(210, 216, vt, { size: 22, fill: "var(--teal)" });
    s += "</svg>";
    return { svg: s, reads: { sub: R.sub, val: R.val } };
  }
};

/* =========================================================
   2. k7m4_sort — like terms: open brackets, sort the thread-chips into bins, combine
   params: ex, step (0 expression, 1 brackets opened, 2 sorted, 3 combined), lx
   readouts: open, res   parts: "chips", "bins", "res"
   ========================================================= */
function m4sortInfo(ex) { const L = m4terms(m4parse(ex)) || [{ k: 0, v: "" }]; return { L, M: m4merge(L), open: m4fmt(L) }; }
SIM_DEF.k7m4_sort = {
  def: { ex: "5c + 3c + 10c", step: 0, lx: "" },
  rng: { step: () => [0, 3, 1] },
  lab: { step: "Simplify step" },
  reads: { open: "Brackets opened", res: "Simplest form" },
  draw(D, P, sh, hl) {
    const I = m4sortInfo(P.ex), st = clampN(m4n(D.step), 0, 3);
    const groups = []; I.L.forEach(t => { if (groups.indexOf(t.v) < 0) groups.push(t.v); });
    groups.sort((a, b) => (a === "") - (b === "")); // constants last
    const colOf = v => v ? M4COL[groups.indexOf(v) % M4COL.length] : "var(--manila)";
    let s = `<svg viewBox="0 0 420 250">`;
    s += T(210, 18, m4e(P.lx || "Sort the threads: like terms go together"), { size: 12, fill: "var(--muted)" });
    s += `<rect x="16" y="26" width="388" height="40" rx="10" fill="#18302a" stroke="#8a6a3b" stroke-width="3"/>`;
    s += T(210, 53, m4show(P.ex), { size: m4fit(P.ex, 22, 370), fill: "#f3f0dc" });
    // chip layouts: A = one row (wrapping), B = bins
    const lab = t => (t.k < 0 ? "−" : "+") + m4coef(t.k, t.v), cw = t => Math.max(34, m4w(lab(t), 14) + 14);
    const A = []; let x = 0, row = 0; const rows = [[]];
    I.L.forEach((t, i) => { const w = cw(t); if (x + w > 392 && x > 0) { row++; x = 0; rows.push([]); } rows[row].push(i); A[i] = { x, y: 92 + row * 34, w }; x += w + 6; });
    rows.forEach(r => { const tot = r.reduce((q, i) => q + A[i].w + 6, -6), off = 210 - tot / 2; r.forEach(i => A[i].x += off); });
    const G = groups.length, bw = 396 / Math.max(G, 1), cnt = {}, B = [];
    I.L.forEach((t, i) => { const g = groups.indexOf(t.v), j = cnt[t.v] = (cnt[t.v] || 0) + 1, n = I.L.filter(q => q.v === t.v).length, dy = Math.min(28, 92 / Math.max(n, 1));
      B[i] = { x: 12 + g * bw + bw / 2 - A[i].w / 2, y: 92 + (j - 1) * dy, w: A[i].w }; });
    const k2 = clampN(st - 1, 0, 1), op1 = clampN(st, 0, 1);
    if (st > 1.02) groups.forEach((v, g) => s += `<rect x="${(14 + g * bw).toFixed(1)}" y="80" width="${(bw - 4).toFixed(1)}" height="118" rx="10" fill="none" stroke="${colOf(v)}" stroke-dasharray="5 4" stroke-opacity="${(k2 * .8).toFixed(2)}"${m4hl(hl, "bins")}/>` + T(14 + g * bw + bw / 2, 190, v ? `${v}-terms` : "numbers", { size: 11, fill: "var(--muted)" }));
    s += `<g opacity="${op1.toFixed(2)}"${m4hl(hl, "chips")}>`;
    I.L.forEach((t, i) => { const a = A[i], b = B[i], cx = a.x + (b.x - a.x) * k2, cy = a.y + (b.y - a.y) * k2, c = colOf(t.v), fade = st > 2 ? clampN(1 - (st - 2) * .6, .35, 1) : 1;
      s += `<g opacity="${fade.toFixed(2)}"><rect x="${cx.toFixed(1)}" y="${cy.toFixed(1)}" width="${a.w.toFixed(1)}" height="26" rx="13" fill="${c}" fill-opacity=".25" stroke="${c}" stroke-width="2"/>` + T(cx + a.w / 2, cy + 18, lab(t), { size: 14, fill: "var(--ink)" }) + `</g>`; });
    s += `</g>`;
    if (st > 2.02 && sh.has("res")) { const k3 = clampN(st - 2, 0, 1); groups.forEach((v, g) => { const tot = I.L.filter(q => q.v === v).reduce((q, t) => q + t.k, 0), r = Math.round(tot * 1e6) / 1e6;
      s += `<g opacity="${k3.toFixed(2)}">` + T(14 + g * bw + bw / 2, 218, m4term1({ k: r, v: r ? v : "" }), { size: 17, fill: colOf(v) }) + `</g>`; }); }
    const res = m4fmt(I.M);
    s += `<g${m4hl(hl, "res")}>` + T(210, 242, st >= 3 ? `Simplest form: ${sh.has("res") ? res : "?"}` : st >= 1 ? "" : "Step 1 opens the brackets", { size: st >= 3 ? m4fit("Simplest form: " + res, 17, 400) : 12, fill: st >= 3 ? "var(--teal)" : "var(--muted)" }) + `</g>`;
    s += "</svg>";
    return { svg: s, reads: { open: I.open, res: `${m4show(P.ex)} = ${res}` } };
  }
};

/* =========================================================
   3. k7m4_sticks — matchstick patterns: L (2n), triangles (2y + 1), squares (3w + 1), X of squares (4n + 1)
   params: kind ("L" | "tri" | "sq" | "x"), n (step), split (colour by orientation), max, lx
   readouts: cnt, rule, split   parts: "new", "orient"
   ========================================================= */
function m4stickPlan(kind, n) { // list of sticks [x1,y1,x2,y2,group] in units (stick = 1)
  const S = [];
  if (kind === "L") for (let i = 0; i < n; i++) { const x = i * 1.5; S.push([x, 0, x, 1, "v", i]); S.push([x, 1, x + 1, 1, "h", i]); }
  else if (kind === "tri") { const h = Math.sqrt(3) / 2, b = i => [i, h], t = i => [i + .5, 0];
    for (let k = 0; k < n; k++) { if (k % 2 === 0) S.push([...b(k / 2), ...b(k / 2 + 1), "h", k]); else S.push([...t((k - 1) / 2), ...t((k + 1) / 2), "h", k]); }
    for (let j = 0; j <= n; j++) { if (j % 2 === 0) S.push([...b(j / 2), ...t(j / 2), "d", Math.max(0, j - 1)]); else S.push([...t((j - 1) / 2), ...b((j + 1) / 2), "d", j - 1]); } }
  else if (kind === "sq") { S.push([0, 0, 0, 1, "v", 0]); for (let i = 0; i < n; i++) { S.push([i, 0, i + 1, 0, "h", i]); S.push([i, 1, i + 1, 1, "h", i]); S.push([i + 1, 0, i + 1, 1, "v", i]); } }
  return S;
}
function m4stickRead(kind, n) {
  n = Math.max(1, Math.round(m4n(n)));
  if (kind === "L") return { cnt: `${n} L${n > 1 ? "s" : ""}: ${2 * n} matchsticks`, rule: `2 × n = 2 × ${n} = ${2 * n}`, split: `${n} upright + ${n} lying flat` };
  if (kind === "tri") return { cnt: `Step ${n}: ${2 * n + 1} matchsticks`, rule: `3 + 2 × (y − 1) = 2y + 1 = 2 × ${n} + 1 = ${2 * n + 1}`, split: `horizontal: y = ${n}; slanting: y + 1 = ${n + 1}` };
  if (kind === "sq") return { cnt: `${n} square${n > 1 ? "s" : ""}: ${3 * n + 1} matchsticks`, rule: `4 + 3 × (w − 1) = 3w + 1 = 3 × ${n} + 1 = ${3 * n + 1}`, split: `first square 4, then 3 more for each of the other ${n - 1}` };
  return { cnt: `Step ${n}: ${4 * n + 1} squares`, rule: `4n + 1 = 4 × ${n} + 1 = ${4 * n + 1}`, split: `vertices (4 per square): 16n + 4 = ${16 * n + 4}` };
}
SIM_DEF.k7m4_sticks = {
  def: { kind: "tri", n: 1, split: 0, max: 12, lx: "" },
  rng: { n: P => [1, P.max || 12, 1] },
  lab: { n: "Step number" },
  reads: { cnt: "Count", rule: "Formula", split: "Two kinds" },
  draw(D, P, sh, hl) {
    const n = Math.max(1, Math.round(m4n(P.n))), nd = clampN(m4n(D.n), 1, 40), kind = P.kind, R = m4stickRead(kind, n);
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 20, m4e(P.lx || ({ L: "Parthiv's L pattern", tri: "Triangle pattern", sq: "Square pattern", x: "X pattern of squares" }[kind] || "")), { size: 13, fill: "var(--muted)" });
    s += `<rect x="10" y="32" width="400" height="148" rx="12" fill="#3a2716" stroke="#6e4a26" stroke-width="2"/>`;
    if (kind === "x") {
      const q = Math.min(16, 132 / (2 * n + 1)), cx = 210, cy = 106, cells = [[0, 0]];
      for (let i = 1; i <= n; i++) cells.push([i, i], [-i, i], [i, -i], [-i, -i]);
      cells.forEach(([a, b], j) => { const newest = Math.max(Math.abs(a), Math.abs(b)) === n && n > 1;
        s += `<rect x="${(cx + a * q - q / 2).toFixed(1)}" y="${(cy + b * q - q / 2).toFixed(1)}" width="${q.toFixed(1)}" height="${q.toFixed(1)}" fill="${j === 0 ? "var(--rani)" : "#f08a1c"}" stroke="#3a2716" stroke-width="1"${newest ? m4hl(hl, "new") : ""}/>`; });
    } else {
      const S = m4stickPlan(kind, n), xs = S.flatMap(t => [t[0], t[2]]), ys = S.flatMap(t => [t[1], t[3]]);
      const W = Math.max(...xs) - Math.min(...xs) || 1, H = Math.max(...ys) - Math.min(...ys) || 1;
      const u = Math.min(70, 360 / W, 110 / H), ox = 210 - W * u / 2 - Math.min(...xs) * u, oy = 106 - H * u / 2 - Math.min(...ys) * u, sw = Math.max(3, Math.min(6, u / 10));
      S.forEach(t => { const grow = clampN(nd - t[5], 0, 1); if (grow <= 0) return;
        const x1 = ox + t[0] * u, y1 = oy + t[1] * u, x2 = ox + (t[0] + (t[2] - t[0]) * grow) * u, y2 = oy + (t[1] + (t[3] - t[1]) * grow) * u;
        const or = P.split || hl === "orient", col = or ? (t[4] === "h" ? "var(--mari)" : t[4] === "d" ? "var(--sky)" : "var(--teal)") : (kind === "sq" && t[5] > 0 && P.split !== 0 && sh.has("split") ? "#f7d58b" : "#f2cf8f");
        const isNew = t[5] === n - 1 && n > 1;
        s += `<g${isNew ? m4hl(hl, "new") : (t[4] === "d" ? m4hl(hl, "orient") : "")}><line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`;
        if (grow > .95) s += `<circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="${(sw * .75).toFixed(1)}" fill="#c0392b"/>`; s += `</g>`; });
      if (kind === "sq" && sh.has("split") && n > 1) { s += `<rect x="${(ox - 4).toFixed(1)}" y="${(oy - 4).toFixed(1)}" width="${(u + 8).toFixed(1)}" height="${(u + 8).toFixed(1)}" fill="none" stroke="var(--rani)" stroke-dasharray="4 3"/>`; }
    }
    s += T(210, 206, sh.has("cnt") ? R.cnt : (kind === "x" ? `Step ${n}: how many squares?` : `Step ${n}: how many matchsticks?`), { size: 17, fill: sh.has("cnt") ? "var(--teal)" : "var(--ink)" });
    s += T(210, 230, sh.has("rule") ? R.rule : "", { size: m4fit(R.rule, 14, 400), fill: "var(--mari)" });
    s += "</svg>";
    return { svg: s, reads: R };
  }
};

/* =========================================================
   4. k7m4_cal — the calendar (7 columns) or an endless 4-column grid; a shape picks numbers
   params: cols, off (blank cells before 1), shape ("sq2" | "plus" | "g23" | "sq3" | "cell" | "none"), at (anchor number),
           alg (show letter labels), lt (letter), rows, mult (ring multiples), month (dim numbers > 30), lx
   readouts: nums, alg   parts: "shape", "diag"
   ========================================================= */
const M4SHAPES = { sq2: [[0, 0], [0, 1], [1, 0], [1, 1]], plus: [[-1, 0], [0, -1], [0, 0], [0, 1], [1, 0]], g23: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1]], sq3: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]], cell: [[0, 0]], none: [] };
const m4lab = (lt, k) => k > 0 ? `${lt} + ${k}` : k < 0 ? `${lt} − ${-k}` : lt;
function m4calInfo(P) {
  const cols = Math.round(m4n(P.cols)) || 7, off = Math.round(m4n(P.off)), at = Math.round(m4n(P.at)), lt = P.lt || "a";
  const ai = at + off - 1, ar = Math.floor(ai / cols), ac = ((ai % cols) + cols) % cols;
  const cells = (M4SHAPES[P.shape] || []).map(([dr, dc]) => ({ dr, dc, k: dr * cols + dc, num: at + dr * cols + dc }));
  const ok = cells.every(c => ac + c.dc >= 0 && ac + c.dc < cols && c.num >= 1);
  return { cols, off, at, lt, ar, ac, cells, ok };
}
function m4calRead(P) {
  const I = m4calInfo(P), { cells, at, lt, cols } = I, nums = cells.map(c => c.num), sum = nums.reduce((a, b) => a + b, 0);
  if (!I.ok) return { nums: "This shape does not fit here: slide to another number.", alg: "—" };
  const allK = cells.map(c => c.k), kSum = allK.reduce((a, b) => a + b, 0), n = cells.length;
  const algSum = `${cells.map(c => cells.length > 1 && c.k ? `(${m4lab(lt, c.k)})` : m4lab(lt, c.k)).join(" + ")} = ${n}${lt}${kSum ? (kSum > 0 ? " + " + kSum : " − " + (-kSum)) : ""}`;
  switch (P.shape) {
    case "sq2": return { nums: `diagonals: ${nums[0]} + ${nums[3]} = ${nums[0] + nums[3]} and ${nums[1]} + ${nums[2]} = ${nums[1] + nums[2]}`, alg: `${lt} + (${lt} + ${cols + 1}) = 2${lt} + ${cols + 1}; (${lt} + 1) + (${lt} + ${cols}) = 2${lt} + ${cols + 1}` };
    case "plus": return { nums: `${nums.join(" + ")} = ${sum} = 5 × ${at}`, alg: algSum };
    case "sq3": return { nums: `sum of the 9 numbers = ${sum} = 9 × ${at}`, alg: algSum };
    case "g23": return { nums: `top row ${nums.slice(0, 3).join(", ")}; bottom row ${nums.slice(3).join(", ")}`, alg: `top: ${cells.slice(0, 3).map(c => m4lab(lt, c.k)).join(", ")}; bottom: ${cells.slice(3).map(c => m4lab(lt, c.k)).join(", ")}` };
    case "cell": { const r = I.ar + 1, c = I.ac + 1; return { nums: `${at} is in row ${r}, column ${c}`, alg: cols === 4 ? `4 × (r − 1) + c = 4 × ${r - 1} + ${c} = ${at}` : `${at} = ${cols} × ${I.ar} + ${c - I.off}` }; }
  }
  return { nums: "—", alg: "—" };
}
SIM_DEF.k7m4_cal = {
  def: { cols: 7, off: 5, shape: "sq2", at: 12, alg: 0, lt: "a", rows: 5, mult: 0, month: 1, r0: -1, lx: "" },
  rng: { at: P => [1, P.amax || 60, 1] },
  lab: { at: "Move the shape" },
  reads: { nums: "Numbers", alg: "With letter-numbers" },
  draw(D, P, sh, hl) {
    const I = m4calInfo(P), R = m4calRead(P), cols = I.cols, rows = Math.round(m4n(P.rows)) || 5;
    const r0 = P.r0 >= 0 ? Math.round(P.r0) : Math.max(0, I.ar - Math.floor(rows / 2));
    const left = cols === 4 ? 70 : 20, cw = Math.min(54, (400 - left) / cols), ch = 30, top = 52, gx = left + (400 - left - cw * cols) / 2;
    let s = `<svg viewBox="0 0 420 ${top + rows * ch + 46}">`;
    s += T(210, 18, m4e(P.lx || (cols === 7 ? "November 2024 (rows go on and on)" : "Endless 4-column grid")), { size: 12, fill: "var(--muted)" });
    const heads = cols === 7 ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["col 1", "col 2", "col 3", "col 4"];
    heads.forEach((h, c) => s += `<rect x="${(gx + c * cw).toFixed(1)}" y="26" width="${(cw - 2).toFixed(1)}" height="22" rx="4" fill="#7a1f2b"/>` + T(gx + c * cw + cw / 2, 41, h, { size: 11, fill: "#fff" }));
    const inShape = new Map(); if (I.ok) I.cells.forEach(c => inShape.set(c.num, c));
    for (let r = 0; r < rows; r++) {
      if (cols === 4) s += T(left - 10, top + r * ch + 20, `row ${r0 + r + 1}`, { size: 11, a: "end", fill: "var(--muted)" });
      for (let c = 0; c < cols; c++) {
        const num = (r0 + r) * cols + c - I.off + 1, x = gx + c * cw, y = top + r * ch;
        if (num < 1) { s += `<rect x="${x.toFixed(1)}" y="${y}" width="${(cw - 2).toFixed(1)}" height="${ch - 2}" rx="4" fill="rgba(255,255,255,.03)"/>`; continue; }
        const cl = inShape.get(num), dim = P.month && num > 30;
        s += `<rect x="${x.toFixed(1)}" y="${y}" width="${(cw - 2).toFixed(1)}" height="${ch - 2}" rx="4" fill="${cl ? "rgba(224,74,134,.32)" : "rgba(239,220,174,.1)"}" stroke="${cl ? "var(--rani)" : "var(--line)"}" stroke-width="${cl ? 2 : 1}"${cl ? m4hl(hl, "shape") : ""}${dim && !cl ? ' stroke-dasharray="3 3"' : ""}/>`;
        if (P.mult && num % P.mult === 0) s += `<circle cx="${(x + cw / 2 - 1).toFixed(1)}" cy="${y + ch / 2 - 1}" r="12" fill="none" stroke="var(--teal)" stroke-width="2"/>`;
        const txt = cl && P.alg ? m4lab(I.lt, cl.k) : String(num);
        s += T(x + cw / 2 - 1, y + 19, txt, { size: cl && P.alg ? m4fit(txt, 13, cw - 6) : 13, fill: cl ? "#fff" : dim ? "var(--muted)" : "var(--ink)" });
      }
    }
    if (I.ok && P.shape === "sq2" && sh.has("nums")) { const p = c => { const rr = I.ar + c.dr - r0, cc = I.ac + c.dc; return [gx + cc * cw + cw / 2 - 1, top + rr * ch + ch / 2 - 1]; }, [a, b, c, d] = I.cells.map(p);
      s += `<g${m4hl(hl, "diag")}><line x1="${a[0]}" y1="${a[1]}" x2="${d[0]}" y2="${d[1]}" stroke="var(--mari)" stroke-width="2.5" opacity=".8"/><line x1="${b[0]}" y1="${b[1]}" x2="${c[0]}" y2="${c[1]}" stroke="var(--sky)" stroke-width="2.5" opacity=".8"/></g>`; }
    const yb = top + rows * ch + 20, line = !I.ok ? R.nums : sh.has("alg") ? R.alg : sh.has("nums") ? R.nums : "";
    s += T(210, yb, line, { size: m4fit(line, 14, 404), fill: !I.ok ? "var(--red)" : sh.has("alg") ? "var(--mari)" : "var(--teal)" });
    s += "</svg>";
    return { svg: s, reads: R };
  }
};

/* =========================================================
   7. k7m4_border — repeating patterns: saree border (A, B, C) or traffic signal (red, yellow, green, yellow)
   params: kind ("saree" | "signal"), pos (slider), max
   readouts: div, which   parts: "pos"
   ========================================================= */
function m4bordRead(kind, pos) {
  pos = Math.max(1, Math.round(m4n(pos)));
  if (kind === "signal") { const q = Math.floor(pos / 4), r = pos % 4, c = r === 1 ? "Red (4n − 3)" : r === 3 ? "Green (4n − 1)" : "Yellow (2n)";
    return { div: `${pos} ÷ 4 = ${q} remainder ${r}`, which: `Position ${pos}: ${c}`, r }; }
  const q = Math.floor(pos / 3), r = pos % 3, c = r === 0 ? "Design C (3n)" : r === 2 ? "Design B (3n − 1)" : "Design A (3n − 2)";
  return { div: `${pos} ÷ 3 = ${q} remainder ${r}`, which: `Position ${pos}: ${c}`, r };
}
function m4motif(kind, k, x, y, r) {
  if (kind === "signal") { const c = k % 4 === 1 ? "#ef5b45" : k % 4 === 3 ? "#6fd46f" : "#ffe45c"; return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="#222" stroke-width="2"/>`; }
  const m = k % 3; let g = "";
  if (m === 1) { for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; g += `<ellipse cx="${(x + Math.cos(a) * r * .55).toFixed(1)}" cy="${(y + Math.sin(a) * r * .55).toFixed(1)}" rx="${(r * .42).toFixed(1)}" ry="${(r * .2).toFixed(1)}" transform="rotate(${i * 45} ${(x + Math.cos(a) * r * .55).toFixed(1)} ${(y + Math.sin(a) * r * .55).toFixed(1)})" fill="var(--rani)"/>`; } g += `<circle cx="${x}" cy="${y}" r="${(r * .25).toFixed(1)}" fill="var(--mari)"/>`; }
  else if (m === 2) { let d = ""; for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + i * Math.PI / 6, rr = i % 2 ? r * .45 : r; d += (i ? "L" : "M") + (x + Math.cos(a) * rr).toFixed(1) + " " + (y + Math.sin(a) * rr).toFixed(1); } g += `<path d="${d}Z" fill="var(--mari)"/><circle cx="${x}" cy="${y}" r="${(r * .22).toFixed(1)}" fill="#7a1f2b"/>`; }
  else { g += `<circle cx="${x}" cy="${y}" r="${r * .9}" fill="none" stroke="var(--teal)" stroke-width="3"/>`; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; g += `<line x1="${x}" y1="${y}" x2="${(x + Math.cos(a) * r * .9).toFixed(1)}" y2="${(y + Math.sin(a) * r * .9).toFixed(1)}" stroke="var(--teal)" stroke-width="2"/>`; } g += `<circle cx="${x}" cy="${y}" r="${(r * .3).toFixed(1)}" fill="var(--sky)"/>`; }
  return g;
}
SIM_DEF.k7m4_border = {
  def: { kind: "saree", pos: 1, max: 400 },
  rng: { pos: P => [1, P.max || 400, 1] },
  lab: { pos: "Position number" },
  reads: { div: "Divide", which: "What is there" },
  draw(D, P, sh, hl) {
    const pos = Math.max(1, Math.round(m4n(P.pos))), R = m4bordRead(P.kind, pos), sig = P.kind === "signal";
    const st = Math.max(1, pos - 4);
    let s = `<svg viewBox="0 0 420 220">`;
    s += T(210, 20, sig ? "Traffic signal: the colours repeat" : "Somjit's saree border: the designs repeat", { size: 13, fill: "var(--muted)" });
    s += `<rect x="6" y="34" width="408" height="92" rx="10" fill="${sig ? "#1d2833" : "#5a1426"}" stroke="${sig ? "#3d4e5e" : "#d4a63a"}" stroke-width="3"/>`;
    if (!sig) s += `<path d="M6 44 h408 M6 116 h408" stroke="#d4a63a" stroke-width="1.5" stroke-dasharray="6 4"/>`;
    for (let i = 0; i < 9; i++) { const k = st + i, x = 30 + i * 45;
      const me = k === pos; if (me) s += `<rect x="${x - 21}" y="40" width="42" height="80" rx="8" fill="rgba(255,255,255,.12)" stroke="var(--mari)" stroke-width="2.5"${m4hl(hl, "pos")}/>`;
      s += me && !sh.has("which") ? T(x, 80, "?", { size: 26, fill: "var(--mari)" }) : m4motif(P.kind, k, x, 72, 15);
      if (!sig && sh.has("which")) s += T(x, 108, ["C", "A", "B"][k % 3], { size: 12, fill: "#f6e7c1" });
      s += T(x, 146, k, { size: k > 99 ? 11 : 13, fill: me ? "var(--mari)" : "var(--muted)" }); }
    s += T(210, 180, sh.has("div") ? R.div : `Position ${pos}: which ${sig ? "colour" : "design"}?`, { size: 17, fill: "var(--ink)" });
    s += T(210, 206, sh.has("which") ? R.which : "", { size: 16, fill: "var(--teal)" });
    s += "</svg>";
    return { svg: s, reads: { div: R.div, which: R.which } };
  }
};

/* =========================================================
   SCENE — Kanchipuram loom house at dusk: gopuram, hanging silk skeins, a working loom, lamps
   ========================================================= */
let m4w0 = null;
function m4wInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  m4w0 = { W, H, stars: Array.from({ length: Math.round(W * H / 14000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .4), r: rnd(.4, 1.4), p: rnd(0, 6.28) })),
    skeins: Array.from({ length: Math.max(7, Math.round(W / 110)) }, (_, i) => ({ x: (i + .5) * W / Math.max(7, Math.round(W / 110)), l: rnd(70, 150), c: ["#e04a86", "#f4a51c", "#35c29a", "#62b6e8", "#b8323a", "#9b7ede", "#ffd166"][i % 7], p: rnd(0, 6.28) })),
    birds: [], next: 0, motes: Array.from({ length: 40 }, () => ({ x: rnd(0, W), y: rnd(0, H), s: rnd(.1, .35), p: rnd(0, 6.28) })) };
}
SCENES.k7m4_looms = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!m4w0 || m4w0.W !== W || m4w0.H !== H) m4wInit(W, H);
  const S = m4w0, gy = H * .8;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#1b0f2e"); g.addColorStop(.55, "#4a1d3a"); g.addColorStop(1, "#a2463a");
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  S.stars.forEach(s => { c.globalAlpha = .3 + .4 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // setting sun and the temple gopuram
  const sx = W * .7, sy = gy - H * .18; const sg = c.createRadialGradient(sx, sy, 10, sx, sy, H * .3); sg.addColorStop(0, "rgba(255,190,90,.55)"); sg.addColorStop(1, "rgba(255,190,90,0)"); c.fillStyle = sg; c.fillRect(0, 0, W, H);
  c.fillStyle = "#ffb85c"; c.beginPath(); c.arc(sx, sy, Math.min(W, H) * .06, 0, 6.28); c.fill();
  const gx = W * .62, gw = Math.min(220, W * .2), gh = Math.min(H * .5, 340);
  c.fillStyle = "#2a1424";
  for (let k = 0; k < 7; k++) { const w = gw * (1 - k * .11), h = gh / 7, y = gy - (k + 1) * h; c.fillRect(gx - w / 2, y, w, h + 1); c.fillStyle = k % 2 ? "#2a1424" : "#321a2c"; }
  c.fillStyle = "#2a1424"; c.beginPath(); c.ellipse(gx, gy - gh - 6, gw * .2, 12, 0, 0, 6.28); c.fill();
  c.fillStyle = "#f4a51c"; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(gx - gw * .12 + k * gw * .06, gy - gh - 16, 3, 0, 6.28); c.fill(); }
  // birds (mynahs) crossing now and then
  if (!RM && t > S.next) { S.next = t + 5000 + Math.random() * 6000; S.birds.push({ x: -30, y: H * (.12 + Math.random() * .25), v: 1.2 + Math.random() }); }
  c.strokeStyle = "#140a14"; c.lineWidth = 2; S.birds.forEach(b => { b.x += b.v; const f = Math.sin(t / 120 + b.y) * 5; c.beginPath(); c.moveTo(b.x - 9, b.y - f); c.quadraticCurveTo(b.x - 4, b.y - 2, b.x, b.y); c.quadraticCurveTo(b.x + 4, b.y - 2, b.x + 9, b.y - f); c.stroke(); });
  S.birds = S.birds.filter(b => b.x < W + 40);
  // loom-house roof beam and hanging silk skeins
  c.fillStyle = "#3b2414"; c.fillRect(0, 0, W, 22); c.fillStyle = "#5b3a1e"; c.fillRect(0, 22, W, 6);
  S.skeins.forEach(k => { const sw = Math.sin(t / 1400 + k.p) * 6; c.strokeStyle = k.c; c.lineWidth = 9; c.globalAlpha = .85;
    c.beginPath(); c.moveTo(k.x - 6, 26); c.quadraticCurveTo(k.x - 8 + sw, 26 + k.l * .6, k.x - 4 + sw, 26 + k.l); c.stroke();
    c.beginPath(); c.moveTo(k.x + 6, 26); c.quadraticCurveTo(k.x + 8 + sw, 26 + k.l * .6, k.x + 4 + sw, 26 + k.l); c.stroke();
    c.fillStyle = "#f6d78b"; c.fillRect(k.x - 7 + sw, 26 + k.l - 2, 14, 5); c.globalAlpha = 1; });
  // floor
  c.fillStyle = "#2b1a12"; c.fillRect(0, gy, W, H - gy); c.fillStyle = "rgba(244,165,28,.35)"; c.fillRect(0, gy, W, 2);
  // handloom: frame, warp threads, moving shuttle and growing silk with a zari border
  const lx = W * .06, lw = Math.min(320, W * .3), ly = gy - 120;
  c.fillStyle = "#6e4526"; c.fillRect(lx, ly - 10, 10, 130); c.fillRect(lx + lw - 10, ly - 10, 10, 130); c.fillRect(lx, ly - 14, lw, 10); c.fillRect(lx, gy - 30, lw, 10);
  c.strokeStyle = "rgba(255,230,200,.35)"; c.lineWidth = 1; for (let x = lx + 16; x < lx + lw - 14; x += 6) { c.beginPath(); c.moveTo(x, ly - 4); c.lineTo(x, gy - 30); c.stroke(); }
  const woven = 40 + ((t / 90) % 40); c.fillStyle = "#b8323a"; c.fillRect(lx + 14, gy - 30 - woven, lw - 28, woven);
  c.fillStyle = "#f4c04a"; for (let x = lx + 18, i = 0; x < lx + lw - 20; x += 14, i++) { const kk = i % 3; c.beginPath(); if (kk === 0) c.arc(x, gy - 40, 3.5, 0, 6.28); else if (kk === 1) { c.moveTo(x, gy - 45); c.lineTo(x + 4, gy - 40); c.lineTo(x, gy - 35); c.lineTo(x - 4, gy - 40); } else c.rect(x - 2, gy - 43, 4, 6); c.fill(); }
  const ph = (t / 1600) % 2, shx = lx + 14 + (ph < 1 ? ph : 2 - ph) * (lw - 40);
  c.fillStyle = "#e8c27a"; c.beginPath(); c.ellipse(shx + 6, gy - 30 - woven - 4, 12, 4, 0, 0, 6.28); c.fill();
  // oil lamps (vilakku) with flickering flames
  [W * .42, W * .9].forEach((x, i) => { const fl = 1 + .15 * Math.sin(t / 90 + i * 3) + .1 * Math.sin(t / 37 + i);
    const lg = c.createRadialGradient(x, gy - 58, 2, x, gy - 58, 60); lg.addColorStop(0, "rgba(255,190,90,.35)"); lg.addColorStop(1, "rgba(255,190,90,0)"); c.fillStyle = lg; c.beginPath(); c.arc(x, gy - 58, 60, 0, 6.28); c.fill();
    c.fillStyle = "#c8962e"; c.fillRect(x - 3, gy - 50, 6, 50); c.beginPath(); c.ellipse(x, gy - 50, 16, 5, 0, 0, 6.28); c.fill(); c.beginPath(); c.ellipse(x, gy - 2, 14, 4, 0, 0, 6.28); c.fill();
    c.fillStyle = "#ffd36b"; c.beginPath(); c.ellipse(x, gy - 60, 4 * fl, 9 * fl, 0, 0, 6.28); c.fill(); c.fillStyle = "#fff4c2"; c.beginPath(); c.ellipse(x, gy - 58, 1.8, 4, 0, 0, 6.28); c.fill(); });
  // floating thread dust in the lamp light
  S.motes.forEach(m => { if (!RM) { m.y -= m.s; m.x += Math.sin(t / 2000 + m.p) * .2; if (m.y < 0) { m.y = H; m.x = Math.random() * W; } } c.fillStyle = `rgba(255,220,160,${.25 + .2 * Math.sin(t / 500 + m.p)})`; c.fillRect(m.x, m.y, 1.6, 1.6); });
  c.fillStyle = "rgba(10,4,16,.32)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Mitthu, the common mynah who copies every voice (and lets letters copy numbers)
   ========================================================= */
GUIDES.k7m4_mynah = () => `<svg class="guide mynah" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="32" ry="4" fill="#000" opacity=".25"/>
  <path d="M14 116 L106 116" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/>
  <path d="M52 108 l-4 8 M66 108 l4 8" stroke="#f2c230" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M30 96 Q14 112 8 120 Q24 116 38 102Z" fill="#2b1f1a"/>
  <ellipse cx="58" cy="82" rx="28" ry="27" fill="#6b4630"/>
  <ellipse cx="62" cy="92" rx="16" ry="15" fill="#8a6045"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 40 72;-14 40 72;0 40 72" dur="2.4s" repeatCount="indefinite"/>
    <path d="M40 66 Q24 84 32 104 Q48 96 52 74Z" fill="#3a2a20"/><path d="M34 92 Q38 98 44 98" stroke="#f4f0e6" stroke-width="4" fill="none"/></g>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.6s" repeatCount="indefinite"/>
    <circle cx="66" cy="44" r="21" fill="#1d1612"/>
    <path d="M70 34 Q86 32 88 46 Q84 54 74 52 Z" fill="#f2c230"/>
    <circle cx="76" cy="42" r="5" fill="#15202a"/><circle cx="77.6" cy="40.4" r="1.6" fill="#fff"/>
    <rect x="70" y="35" width="13" height="0" fill="#f2c230"><animate attributeName="height" values="0;0;0;12;0" keyTimes="0;.82;.9;.95;1" dur="4.2s" repeatCount="indefinite"/></rect>
    <path d="M86 44 L104 49 L86 54 Z" fill="#f6b51e"/><path d="M86 49 L104 49" stroke="#b5800f" stroke-width="1"/>
    <path d="M48 26 Q60 12 80 22 Q70 24 64 30 Z" fill="#e04a86"/><circle cx="50" cy="27" r="4" fill="#f4a51c"/></g>
  <g transform="translate(78 78) rotate(-8)"><rect x="0" y="0" width="34" height="24" rx="4" fill="#18302a" stroke="#8a6a3b" stroke-width="3"/>
    <text x="17" y="16" text-anchor="middle" font-size="10" font-weight="800" fill="#f3f0dc" font-family="Mulish, sans-serif">a+3</text></g>
</svg>`;

/* =========================================================================================
   3D SIMULATIONS (WebGL via make3D, drag to turn). Readouts reuse the 2D sims' maths.
   ========================================================================================= */
const m4lerp = (a, b, k) => a + (b - a) * k;

/* ---------- 3D-1. k7m4_sticks3d — matchsticks laid out on the weaver's wooden table; new sticks drop in.
   params: kind ("L" | "tri" | "sq"), n, split, max   readouts: cnt, rule, split   parts: "new", "orient" ---------- */
SIM_DEF.k7m4_sticks3d = {
  def: { kind: "tri", n: 1, split: 0, max: 10 },
  rng: { n: P => [1, P.max || 10, 1] },
  lab: { n: "Step number" },
  reads: { cnt: "Count", rule: "Formula", split: "Two kinds" },
  readouts(P) { return m4stickRead(P.kind, P.n); },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 8, phi: 0.75, theta: 0.2, auto: 0, target: [0, 0, 0], hint: "Drag to turn the table" });
    if (!g) return null;
    const { THREE, root } = g;
    const table = new THREE.Mesh(new THREE.BoxGeometry(1, 0.2, 1), new THREE.MeshStandardMaterial({ color: 0x6e4526, roughness: .8 })); table.position.y = -0.14; root.add(table);
    const cloth = new THREE.Mesh(new THREE.BoxGeometry(1, 0.02, 1), new THREE.MeshStandardMaterial({ color: 0x7a1f2b, roughness: .9 })); cloth.position.y = -0.03; root.add(cloth);
    const stickG = new THREE.BoxGeometry(1, 0.07, 0.07), headG = new THREE.SphereGeometry(0.065, 12, 10);
    const woodM = new THREE.MeshStandardMaterial({ color: 0xf2cf8f, roughness: .6 }), hM = new THREE.MeshStandardMaterial({ color: 0xf4a51c, roughness: .5, emissive: 0x6a3a00, emissiveIntensity: .3 }), dM = new THREE.MeshStandardMaterial({ color: 0x62b6e8, roughness: .5, emissive: 0x0b2a44, emissiveIntensity: .3 });
    const headM = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: .4 });
    const pool = []; for (let i = 0; i < 45; i++) { const m = new THREE.Mesh(stickG, woodM), h = new THREE.Mesh(headG, headM); m.add(h); h.position.x = 0.5; m.visible = false; root.add(m); pool.push({ m, y: 3, ty: 0.03, on: false }); }
    const lCnt = g.label("", [0, 1.4, 0], "big");
    const st = { hl: null, camD: 8 };
    g.onFrame((t, dt) => { const k = Math.min(1, dt * 7);
      pool.forEach((p, i) => { if (!p.on) { p.m.visible = false; return; } p.y = m4lerp(p.y, p.ty, k); p.m.position.y = p.y; p.m.visible = true; });
      [hM, dM].forEach(m => m.emissiveIntensity = st.hl === "orient" ? .6 + .4 * Math.sin(t * 8) : .3);
      g.view.dist = m4lerp(g.view.dist, st.camD, k * .4); });
    function apply(D, P, sh, hl) {
      st.hl = hl; const n = Math.max(1, Math.round(m4n(P.n)));
      const S = m4stickPlan(P.kind, n), xs = S.flatMap(s => [s[0], s[2]]), zs = S.flatMap(s => [s[1], s[3]]);
      const cx = (Math.max(...xs) + Math.min(...xs)) / 2, cz = (Math.max(...zs) + Math.min(...zs)) / 2, W = Math.max(...xs) - Math.min(...xs), Z = Math.max(...zs) - Math.min(...zs);
      table.scale.set(W + 1.6, 1, Z + 1.6); cloth.scale.set(W + 1.2, 1, Z + 1.2);
      pool.forEach((p, i) => { const s = S[i]; if (!s) { p.on = false; p.y = 3; return; }
        const x1 = s[0] - cx, z1 = s[1] - cz, x2 = s[2] - cx, z2 = s[3] - cz;
        p.m.position.set((x1 + x2) / 2, p.y, (z1 + z2) / 2); p.m.rotation.set(0, -Math.atan2(z2 - z1, x2 - x1), 0);
        const or = P.split || hl === "orient"; p.m.material = or ? (s[4] === "h" ? hM : s[4] === "d" ? dM : woodM) : (hl === "new" && s[5] === n - 1 ? hM : woodM);
        if (!p.on) p.y = 2.5 + i * 0.02; p.on = true; p.ty = 0.03; });
      st.camD = Math.max(5.5, Math.max(W, Z * 1.6) * 1.15 + 2.5);
      const R = m4stickRead(P.kind, n); lCnt.set(sh.has("cnt") ? R.cnt : `Step ${n}: count them!`); lCnt.move([0, 1.2, 0]);
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

})();
