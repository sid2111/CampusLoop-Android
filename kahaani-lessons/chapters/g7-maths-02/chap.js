(function(){
/* Grade 7 Chapter 2 — Arithmetic Expressions
   Plugin: simulations (k7m2_*), the Dal Lake floating-market scene, and Kilkila the kingfisher guide. */

/* ---------- private helpers ---------- */
const mhl = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const mnum = x => { const v = +x; return isFinite(v) ? v : 0; };
const mfmt = v => { const r = Math.round(v * 1000) / 1000; const s = Math.abs(r).toLocaleString("en-IN", { maximumFractionDigits: 3 }); return (r < 0 ? "−" : "") + s; };
const mw = (s, size) => String(s).replace(/<[^>]+>/g, "").length * size * 0.56;   // rough text width
const fitSize = (s, maxW, big) => Math.max(9, Math.min(big || 20, maxW / Math.max(1, String(s).replace(/<[^>]+>/g, "").length * 0.56)));

/* ---------- a tiny, safe expression engine: + − × ÷, brackets, unary minus ---------- */
function mtok(src) {
  const s = String(src).replace(/−|–/g, "-").replace(/\*/g, "×").replace(/\//g, "÷"), out = [];
  for (let i = 0; i < s.length;) {
    const ch = s[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (/[0-9.]/.test(ch)) { let j = i; while (j < s.length && /[0-9.,]/.test(s[j])) j++; out.push({ t: "n", v: parseFloat(s.slice(i, j).replace(/,/g, "")) }); i = j; continue; }
    if ("+-×÷()".includes(ch)) { out.push({ t: ch }); i++; continue; }
    i++;
  }
  return out;
}
function mparse(src, ltr) {
  const tk = mtok(src); let i = 0;
  const peek = () => tk[i] && tk[i].t, eat = () => tk[i++];
  function primary() {
    const t = peek();
    if (t === "n") return { k: "n", v: eat().v };
    if (t === "(") { eat(); const e = expr(); if (peek() === ")") eat(); return { k: "p", e }; }
    if (t === "-") { eat(); return { k: "u", e: primary() }; }
    if (t === "+") { eat(); return primary(); }
    eat(); return { k: "n", v: 0 };
  }
  function term() { let l = primary(); while (peek() === "×" || peek() === "÷") { const op = eat().t; l = { k: "b", op, l, r: primary() }; } return l; }
  function expr() {
    if (ltr) { let l = primary(); while (["+", "-", "×", "÷"].includes(peek())) { const op = eat().t; l = { k: "b", op, l, r: primary() }; } return l; }
    let l = term(); while (peek() === "+" || peek() === "-") { const op = eat().t; l = { k: "b", op, l, r: term() }; } return l;
  }
  const e = tk.length ? expr() : { k: "n", v: 0 };
  return e;
}
function mev(n) {
  if (!n) return 0;
  if (n.k === "n") return n.v; if (n.k === "p") return mev(n.e); if (n.k === "u") return -mev(n.e);
  const a = mev(n.l), b = mev(n.r);
  return n.op === "+" ? a + b : n.op === "-" ? a - b : n.op === "×" ? a * b : (b === 0 ? NaN : a / b);
}
const OPS = { "+": "+", "-": "−", "×": "×", "÷": "÷" };
// render a node; `mark` is the node to colour, `col` its colour
function mstr(n, mark, col, first = true) {
  let s;
  if (n.k === "n") s = n.v < 0 ? (first ? "−" + mfmt(-n.v) : "(−" + mfmt(-n.v) + ")") : mfmt(n.v);
  else if (n.k === "p") s = "(" + mstr(n.e, mark, col, true) + ")";
  else if (n.k === "u") s = "−" + mstr(n.e, mark, col, false);
  else s = mstr(n.l, mark, col, first) + " " + OPS[n.op] + " " + mstr(n.r, mark, col, false);
  return n === mark ? `<tspan fill="${col || "var(--mari)"}">${s}</tspan>` : s;
}
const mplain = src => mstr(mparse(src)).replace(/<[^>]+>/g, "");
// ready nodes: all children are numbers
function mready(n, depth, list, order) {
  if (n.k === "n") return;
  if (n.k === "p") { mready(n.e, depth + 1, list, order); return; }
  if (n.k === "u") { if (n.e.k === "n") list.push({ n, depth, mul: 1, o: order.i++ }); else mready(n.e, depth, list, order); return; }
  mready(n.l, depth, list, order);
  if (n.l.k === "n" && n.r.k === "n") list.push({ n, depth, mul: n.op === "×" || n.op === "÷" ? 1 : 0, o: order.i++ });
  mready(n.r, depth, list, order);
}
function mreplace(n, target, val) {
  if (n === target) return { k: "n", v: val };
  if (n.k === "n") return n;
  if (n.k === "p") { const e = mreplace(n.e, target, val); return e.k === "n" ? e : { k: "p", e }; }
  if (n.k === "u") return { k: "u", e: mreplace(n.e, target, val) };
  return { k: "b", op: n.op, l: mreplace(n.l, target, val), r: mreplace(n.r, target, val) };
}
function mstrip(n) { // drop brackets around a single number
  if (n.k === "p") { const e = mstrip(n.e); return e.k === "n" ? e : { k: "p", e }; }
  if (n.k === "u") return { k: "u", e: mstrip(n.e) };
  if (n.k === "b") return { k: "b", op: n.op, l: mstrip(n.l), r: mstrip(n.r) };
  return n;
}
// sequence of evaluation lines: brackets first, then × ÷, then + −, left to right
function msteps(src, ltr) {
  let a = mstrip(mparse(src, ltr)); const out = [];
  for (let g = 0; g < 30; g++) {
    const L = []; mready(a, 0, L, { i: 0 });
    if (!L.length) { out.push({ node: a, mark: null }); break; }
    L.sort((x, y) => ltr ? x.o - y.o : (y.depth - x.depth) || (y.mul - x.mul) || (x.o - y.o));
    const pick = L[0].n; out.push({ node: a, mark: pick });
    a = mreplace(a, pick, mev(pick));
  }
  return out;
}
// split into terms (parts joined by + after subtraction becomes adding the inverse)
function mterms(n, sign = 1, out = []) {
  if (n.k === "b" && (n.op === "+" || n.op === "-")) { mterms(n.l, sign, out); mterms(n.r, n.op === "-" ? -sign : sign, out); return out; }
  out.push({ n, sign }); return out;
}
function mtermStr(t) { const s = mstr(t.n, null, null, true); if (t.sign > 0) return s; if (t.n.k === "n" && t.n.v < 0) return mfmt(-t.n.v); return "−" + s; }
const subBlank = (e, a) => String(e).replace(/□/g, a < 0 ? "(−" + Math.abs(a) + ")" : String(a));

/* =========================================================
   1. k7m2_scale — a tarazu (balance) that compares two expressions
   params: L, R (expressions; □ is replaced by the slider value a), a, title
   readouts: vals, sign    parts: "left", "right"
   ========================================================= */
SIM_DEF.k7m2_scale = {
  def: { L: "10 + 2", R: "7 + 1", a: 0, title: "", amax: 40, amin: 0 },
  rng: { a: P => [P.amin || 0, P.amax || 40, 1] },
  lab: { a: "Number in the blank □" },
  reads: { vals: "Values", sign: "Compare" },
  draw(D, P, sh, hl) {
    const aP = Math.round(mnum(P.a)), aD = mnum(D.a);
    const vL = mev(mparse(subBlank(P.L, aP))), vR = mev(mparse(subBlank(P.R, aP)));
    const dL = mev(mparse(subBlank(P.L, aD))), dR = mev(mparse(subBlank(P.R, aD)));
    const showSign = sh.has("sign"), diff = dL - dR, big = Math.max(Math.abs(dL), Math.abs(dR), 1);
    const ang = showSign ? clampN(diff / big * 40, -14, 14) : 0, rad = ang * Math.PI / 180;
    const cx = 210, cy = 74, arm = 130;
    const lx = cx - arm * Math.cos(rad), ly = cy + arm * Math.sin(rad), rx = cx + arm * Math.cos(rad), ry = cy - arm * Math.sin(rad);
    const lt = P.L.includes("□") ? String(P.L).replace(/□/g, `<tspan fill="var(--mari)">${P.a === "" ? "□" : aP < 0 ? "(−" + (-aP) + ")" : aP}</tspan>`) : P.L;
    const rt = P.R.includes("□") ? String(P.R).replace(/□/g, `<tspan fill="var(--mari)">${aP < 0 ? "(−" + (-aP) + ")" : aP}</tspan>`) : P.R;
    let s = `<svg viewBox="0 0 420 240">`;
    if (P.title) s += T(210, 20, P.title, { size: 12.5, fill: "var(--muted)" });
    s += `<path d="M${cx - 34} 226 L${cx} ${cy} L${cx + 34} 226 Z" fill="#7a4a24" stroke="#4a2c14" stroke-width="2"/><rect x="${cx - 60}" y="222" width="120" height="10" rx="4" fill="#5a3418"/>`;
    s += `<line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${ry.toFixed(1)}" stroke="#d9b071" stroke-width="7" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="8" fill="var(--rani)"/>`;
    const pan = (x, y, txt, part, v) => {
      const w = 170, fs = fitSize(txt, w - 18, 17);
      return `<g${mhl(hl, part)}><line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x - 62).toFixed(1)}" y2="${(y + 58).toFixed(1)}" stroke="var(--muted)" stroke-width="1.5"/><line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + 62).toFixed(1)}" y2="${(y + 58).toFixed(1)}" stroke="var(--muted)" stroke-width="1.5"/>
        <path d="M${(x - w / 2).toFixed(1)} ${(y + 58).toFixed(1)} Q${x.toFixed(1)} ${(y + 92).toFixed(1)} ${(x + w / 2).toFixed(1)} ${(y + 58).toFixed(1)} Z" fill="rgba(244,165,28,.25)" stroke="var(--mari)" stroke-width="2"/>
        ${T(x, y + 52, txt, { size: fs })}
        ${sh.has("vals") ? T(x, y + 98, "= " + mfmt(v), { size: 14, fill: "var(--teal)" }) : ""}</g>`;
    };
    s += pan(lx, ly, lt, "left", vL) + pan(rx, ry, rt, "right", vR);
    const sg = Math.abs(vL - vR) < 1e-9 ? "=" : vL > vR ? "&gt;" : "&lt;";
    s += `<circle cx="${cx}" cy="186" r="19" fill="rgba(10,24,38,.85)" stroke="${showSign ? "var(--teal)" : "var(--line)"}" stroke-width="2"/>` + T(cx, 194, showSign ? sg : "?", { size: 22, fill: showSign ? "var(--teal)" : "var(--muted)" });
    s += "</svg>";
    const lp = subBlank(P.L, aP), rp = subBlank(P.R, aP);
    return { svg: s, reads: { vals: `${lp} = ${mfmt(vL)};  ${rp} = ${mfmt(vR)}`, sign: `${lp} ${sg} ${rp}` } };
  }
};

/* =========================================================
   3. k7m2_ladder — step-by-step evaluation (brackets, then terms, then add);
      mode "ltr" shows the wrong left-to-right way
   params: e, step, mode, title    readouts: val, order    parts: "now"
   ========================================================= */
SIM_DEF.k7m2_ladder = {
  def: { e: "30 + 5 × 4", step: 0, mode: "", title: "" },
  rng: { step: P => [0, Math.max(1, msteps(P.e, P.mode === "ltr").length - 1), 1] },
  lab: { step: "Evaluation steps" },
  reads: { val: "Value", order: "Order used" },
  draw(D, P, sh, hl) {
    const ltr = P.mode === "ltr", S = msteps(P.e, ltr), n = S.length - 1, k = clampN(Math.round(mnum(D.step)), 0, n);
    const col = ltr ? "var(--rani)" : "var(--mari)";
    let s = `<svg viewBox="0 0 420 250">`;
    s += T(210, 20, P.title || (ltr ? "Left to right, ignoring terms (wrong way)" : "Brackets first, then each term, then add"), { size: 12.5, fill: ltr ? "var(--rani)" : "var(--muted)" });
    const first = Math.max(0, k - 5), rows = [];
    for (let i = first; i <= k; i++) rows.push(i);
    const lh = rows.length > 4 ? 34 : 40;
    rows.forEach((i, j) => {
      const y = 56 + j * lh, line = S[i], last = i === n;
      const txt = (i ? "= " : "") + mstr(line.node, i === k ? line.mark : null, col);
      const fs = fitSize(txt, 360, 22);
      if (i === k && !last) s += `<rect x="14" y="${y - fs - 2}" width="392" height="${fs + 14}" rx="9" fill="rgba(244,165,28,.12)"${mhl(hl, "now")}/>`;
      s += T(210, y, txt, { size: fs, fill: last && sh.has("val") ? "var(--teal)" : "var(--ink)" });
    });
    if (k < n) { const m = S[k].mark; const what = m.k === "u" ? "make the number negative" : m.op === "×" || m.op === "÷" ? "work out this product/quotient" : "add/subtract these two"; s += T(210, 238, `next: ${what}${!ltr && S[k].mark && mready.length >= 0 ? "" : ""}`, { size: 12, fill: col }); }
    else s += T(210, 238, sh.has("val") ? `value = ${mfmt(mev(S[n].node))}` : "value = ?", { size: 15, fill: "var(--teal)" });
    s += "</svg>";
    return { svg: s, reads: { val: `${mplain(P.e)} = ${mfmt(mev(mparse(P.e, ltr)))}${ltr ? " (left to right: wrong)" : ""}`, order: ltr ? "each operation in the order written" : "brackets first, then each term (× and ÷), then add the terms" } };
  }
};

/* =========================================================
   4. k7m2_terms — split an expression into its terms (textbook ovals), evaluate each, add
   params: e, stage (0 expression, 1 terms, 2 term values, 3 sum)
   readouts: terms, val    parts: "terms", "vals"
   ========================================================= */
SIM_DEF.k7m2_terms = {
  def: { e: "13 − 2 + 6", stage: 0, title: "" },
  rng: { stage: () => [0, 3, 1] },
  lab: { stage: "Show: expression → terms → values → sum" },
  reads: { terms: "Terms", val: "Value" },
  draw(D, P, sh, hl) {
    const ast = mparse(P.e), tm = mterms(ast), st = clampN(mnum(D.stage), 0, 3);
    let s = `<svg viewBox="0 0 420 250">`;
    s += T(210, 20, P.title || "Terms are the parts joined by +", { size: 12.5, fill: "var(--muted)" });
    const ex = mplain(P.e); s += T(210, 58, ex, { size: fitSize(ex, 380, 24) });
    const ovRow = (y, labels, part, col, op) => {
      const fs0 = 15, gap = 26; let ws = labels.map(l => Math.max(40, mw(l, fs0) + 22)); let tot = ws.reduce((a, b) => a + b, 0) + gap * (labels.length - 1);
      const sc = Math.min(1, 396 / tot); ws = ws.map(w => w * sc); tot *= sc; const fs = fs0 * Math.min(1, sc * 1.05);
      let x = 210 - tot / 2, r = "";
      labels.forEach((l, i) => { r += `<ellipse cx="${(x + ws[i] / 2).toFixed(1)}" cy="${y}" rx="${(ws[i] / 2).toFixed(1)}" ry="17" fill="rgba(255,255,255,.05)" stroke="${col}" stroke-width="2"${mhl(hl, part)}/>` + T(x + ws[i] / 2, y + 5, l, { size: fs });
        x += ws[i]; if (i < labels.length - 1) r += T(x + gap * sc / 2, y + 5, op, { size: 15, fill: "var(--muted)" }); x += gap * sc; });
      return r;
    };
    if (st > 0.5) { s += T(24, 84, "=", { size: 16, a: "start", fill: "var(--muted)" }); s += ovRow(110, tm.map(mtermStr), "terms", "var(--mari)", "+"); }
    if (st > 1.5) { s += T(24, 140, "=", { size: 16, a: "start", fill: "var(--muted)" }); s += ovRow(166, tm.map(t => mfmt(t.sign * mev(t.n))), "vals", "var(--sky)", "+"); }
    if (st > 2.5) s += T(210, 226, `= ${sh.has("val") ? mfmt(mev(ast)) : "?"}`, { size: 22, fill: "var(--teal)" });
    s += "</svg>";
    return { svg: s, reads: { terms: tm.map(mtermStr).join(",  "), val: `${ex} = ${mfmt(mev(ast))}` } };
  }
};

/* =========================================================
   7. k7m2_strip — removing brackets: a − (b + c) and a − (b − c) as a money/length strip
   params: a, b, c, kind ("sum" | "diff" | "plus"), step 0..2, pre, unit
   readouts: res, rule    parts: "b", "c"
   ========================================================= */
SIM_DEF.k7m2_strip = {
  def: { a: 100, b: 15, c: 56, kind: "sum", step: 0, pre: "₹", unit: "" },
  rng: { step: () => [0, 2, 1] },
  lab: { step: "Steps" },
  reads: { res: "Result", rule: "Without brackets" },
  draw(D, P, sh, hl) {
    const a = mnum(P.a), b = mnum(P.b), c = mnum(P.c), st = clampN(mnum(D.step), 0, 2), kind = P.kind || "sum";
    const x0 = 30, W = 360, top = kind === "plus" ? a + b : a, X = v => x0 + W * v / top, pre = P.pre || "", u = P.unit ? " " + P.unit : "";
    let s = `<svg viewBox="0 0 420 240">`;
    const fullExpr = kind === "sum" ? `${a} − (${b} + ${c})` : kind === "diff" ? `${a} − (${b} − ${c})` : `${a} + (${b} − ${c})`;
    s += T(210, 22, fullExpr, { size: 18 });
    if (kind === "plus") {
      s += `<rect x="${x0}" y="70" width="${(X(a) - x0).toFixed(1)}" height="44" rx="6" fill="rgba(98,182,232,.4)" stroke="var(--sky)"/>` + T((x0 + X(a)) / 2, 98, `${pre}${a}${u}`, { size: 14 });
      const kb = Math.min(1, st); s += `<rect x="${X(a).toFixed(1)}" y="70" width="${((X(a + b) - X(a)) * kb).toFixed(1)}" height="44" rx="6" fill="rgba(53,194,154,.4)" stroke="var(--teal)"${mhl(hl, "b")}/>`;
      if (st >= .5) s += T((X(a) + X(a + b)) / 2, 98, `+${b}`, { size: 14 });
      if (st >= 1.5) { const k = Math.min(1, st - 1); s += `<rect x="${(X(a + b) - (X(a + b) - X(a + b - c)) * k).toFixed(1)}" y="64" width="${((X(a + b) - X(a + b - c)) * k).toFixed(1)}" height="56" rx="6" fill="rgba(224,74,134,.3)" stroke="var(--rani)" stroke-dasharray="5 3"${mhl(hl, "c")}/>` + T((X(a + b) + X(a + b - c)) / 2, 140, `−${c}`, { size: 13, fill: "var(--rani)" }); }
    } else {
      s += `<rect x="${x0}" y="70" width="${W}" height="44" rx="6" fill="rgba(98,182,232,.4)" stroke="var(--sky)"/>` + T(x0 + 8, 62, `start: ${pre}${a}${u}`, { size: 12.5, a: "start", fill: "var(--muted)" });
      if (st >= .3) { const k = Math.min(1, st); s += `<rect x="${(X(a) - (X(a) - X(a - b)) * k).toFixed(1)}" y="64" width="${((X(a) - X(a - b)) * k).toFixed(1)}" height="56" rx="6" fill="rgba(224,74,134,.35)" stroke="var(--rani)" stroke-dasharray="5 3"${mhl(hl, "b")}/>` + T((X(a) + X(a - b)) / 2, 140, `−${b}`, { size: 13, fill: "var(--rani)" }); }
      if (st >= 1.3) {
        const k = Math.min(1, st - 1);
        if (kind === "sum") s += `<rect x="${(X(a - b) - (X(a - b) - X(a - b - c)) * k).toFixed(1)}" y="64" width="${((X(a - b) - X(a - b - c)) * k).toFixed(1)}" height="56" rx="6" fill="rgba(224,74,134,.22)" stroke="var(--rani)" stroke-dasharray="2 3"${mhl(hl, "c")}/>` + T((X(a - b) + X(a - b - c)) / 2, 158, `−${c}`, { size: 13, fill: "var(--rani)" });
        else s += `<rect x="${X(a - b).toFixed(1)}" y="70" width="${((X(a - b + c) - X(a - b)) * k).toFixed(1)}" height="44" rx="6" fill="rgba(53,194,154,.55)" stroke="var(--teal)"${mhl(hl, "c")}/>` + T((X(a - b) + X(a - b + c)) / 2, 158, `+${c} back`, { size: 13, fill: "var(--teal)" });
      }
    }
    const res = kind === "sum" ? a - b - c : kind === "diff" ? a - b + c : a + b - c;
    const rule = kind === "sum" ? `${a} − (${b} + ${c}) = ${a} − ${b} − ${c}` : kind === "diff" ? `${a} − (${b} − ${c}) = ${a} − ${b} + ${c}` : `${a} + (${b} − ${c}) = ${a} + ${b} − ${c}`;
    const stepTxt = kind === "sum" ? [`${pre}${a}${u}`, `${a} − ${b} = ${a - b}`, `${a - b} − ${c} = ${res}`] : kind === "diff" ? [`${pre}${a}${u}`, `${a} − ${b} = ${a - b} (took ${c} too many)`, `${a - b} + ${c} = ${res}`] : [`${pre}${a}${u}`, `${a} + ${b} = ${a + b}`, `${a + b} − ${c} = ${res}`];
    s += T(210, 192, stepTxt[Math.round(st)], { size: 15, fill: "var(--ink)" });
    s += T(210, 224, sh.has("rule") ? rule.replace(/(\d+) − \((\d+) ([+−]) (\d+)\)/, "$1 − ($2 $3 $4)") : "", { size: 14, fill: "var(--teal)" });
    s += "</svg>";
    return { svg: s, reads: { res: `${fullExpr} = ${pre}${mfmt(res)}${u}`, rule } };
  }
};

/* =========================================================
   8. k7m2_grid — arrays for products and the distributive property: (r1 ± r2) × c = r1 × c ± r2 × c
   params: r1, r2, c, sub (0/1: r2 rows taken away), plus (extra loose squares), l1, l2 (labels), title
   readouts: whole, split    parts: "r1", "r2", "plus"
   ========================================================= */
SIM_DEF.k7m2_grid = {
  def: { r1: 4, r2: 3, c: 5, sub: 0, plus: 0, l1: "", l2: "", title: "" },
  rng: { r1: () => [0, 12, 1], r2: () => [0, 12, 1], c: () => [1, 12, 1] },
  lab: { r1: "First group (rows)", r2: "Second group (rows)", c: "In each row" },
  reads: { whole: "As one product", split: "As a sum of products" },
  draw(D, P, sh, hl) {
    const r1 = Math.max(0, mnum(D.r1)), r2 = Math.max(0, mnum(D.r2)), c = Math.max(.2, mnum(D.c)), sub = !!+P.sub, plus = Math.round(mnum(P.plus));
    const R1 = Math.round(mnum(P.r1)), R2 = Math.round(mnum(P.r2)), C = Math.round(mnum(P.c));
    const rows = sub ? r1 : r1 + r2, cells = Math.max(rows, 1) * c, area = cells > 260;
    const ox = 70, oy = 34, maxW = 250 - (plus ? 30 : 0), maxH = 176;
    const cs = Math.min(26, maxW / Math.max(c, 1), maxH / Math.max(rows, 1)), W = c * cs, H1 = r1 * cs, H2 = r2 * cs;
    let s = `<svg viewBox="0 0 420 240">`;
    if (P.title) s += T(210, 18, P.title, { size: 12.5, fill: "var(--muted)" });
    const blk = (y, h, col, part, rr) => {
      let g = `<rect x="${ox}" y="${y.toFixed(1)}" width="${W.toFixed(1)}" height="${Math.max(0, h).toFixed(1)}" rx="3" fill="${col}" fill-opacity="${area ? .55 : .12}" stroke="${col}" stroke-width="2"${mhl(hl, part)}/>`;
      if (!area) for (let i = 0; i < Math.ceil(rr); i++) for (let j = 0; j < Math.ceil(c); j++) { const cx = ox + j * cs + cs / 2, cy = y + i * cs + cs / 2; if (cy - y < h) g += `<rect x="${(cx - cs * .4).toFixed(1)}" y="${(cy - cs * .4).toFixed(1)}" width="${(cs * .8).toFixed(1)}" height="${(cs * .8).toFixed(1)}" rx="${(cs * .18).toFixed(1)}" fill="${col}"/>`; }
      return g;
    };
    const cA = "var(--mari)", cB = sub ? "var(--rani)" : "var(--sky)";
    s += blk(oy, H1, cA, "r1", r1);
    if (sub) { s += `<rect x="${ox}" y="${(oy + H1 - H2).toFixed(1)}" width="${W.toFixed(1)}" height="${H2.toFixed(1)}" fill="rgba(15,36,54,.72)" stroke="var(--rani)" stroke-width="2.5" stroke-dasharray="6 4"${mhl(hl, "r2")}/>`; if (H2 > 12) s += `<path d="M${ox} ${(oy + H1 - H2).toFixed(1)} L${(ox + W).toFixed(1)} ${(oy + H1).toFixed(1)}" stroke="var(--rani)" stroke-width="2"/>`; }
    else s += blk(oy + H1, H2, cB, "r2", r2);
    if (plus) { for (let i = 0; i < plus; i++) s += `<rect x="${(ox + W + 12).toFixed(1)}" y="${(oy + i * cs + cs * .1).toFixed(1)}" width="${(cs * .8).toFixed(1)}" height="${(cs * .8).toFixed(1)}" rx="${(cs * .18).toFixed(1)}" fill="var(--rani)"${mhl(hl, "plus")}/>`; }
    // braces / labels
    const lab1 = P.l1 || `${R1} rows`, lab2 = P.l2 || `${R2} rows`;
    s += T(ox - 8, oy + H1 / 2 + 4, lab1, { size: 12, a: "end", fill: cA });
    if (R2) s += T(ox - 8, (sub ? oy + H1 - H2 / 2 : oy + H1 + H2 / 2) + 4, lab2, { size: 12, a: "end", fill: cB });
    s += T(ox + W / 2, Math.min(oy + (sub ? H1 : H1 + H2) + 16, 236), `${C} in each row`, { size: 12, fill: "var(--muted)" });
    // right panel equations
    const tx = 336, vW = sub ? (R1 - R2) * C : (R1 + R2) * C;
    const e1 = plus ? `${R1} × ${C} + ${plus}` : sub ? `(${R1} − ${R2}) × ${C}` : `(${R1} + ${R2}) × ${C}`;
    const e2 = plus ? `${R1 * C} + ${plus}` : sub ? `${R1} × ${C} − ${R2} × ${C}` : `${R1} × ${C} + ${R2} × ${C}`;
    const tot = plus ? R1 * C + plus : vW;
    if (sh.has("whole")) s += T(tx, 70, e1, { size: fitSize(e1, 160, 15), fill: "var(--mari)" });
    if (sh.has("split")) s += T(tx, 104, plus ? "= " + e2 : "= " + e2, { size: fitSize(e2, 160, 14), fill: "var(--sky)" });
    if (sh.has("whole") || sh.has("split")) s += T(tx, 140, `= ${mfmt(tot)}`, { size: 20, fill: "var(--teal)" });
    s += "</svg>";
    const sp = plus ? `${R1 * C} + ${plus} = ${tot}` : sub ? `${R1} × ${C} − ${R2} × ${C} = ${R1 * C} − ${R2 * C} = ${tot}` : `${R1} × ${C} + ${R2} × ${C} = ${R1 * C} + ${R2 * C} = ${tot}`;
    return { svg: s, reads: { whole: `${e1} = ${plus ? tot : (sub ? R1 - R2 : R1 + R2) + " × " + C + " = " + tot}`, split: sp } };
  }
};

/* =========================================================
   SCENE — Dal Lake at dawn: Zabarwan hills, a houseboat, shikaras with vegetables, ripples, chinar leaves
   ========================================================= */
let dw = null;
function dwInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  dw = { W, H,
    hills: Array.from({ length: 12 }, (_, i) => ({ x: i * W / 10 - 40, h: rnd(70, 150) })),
    near: Array.from({ length: 10 }, (_, i) => ({ x: i * W / 8 - 30, h: rnd(30, 70) })),
    boats: Array.from({ length: Math.max(4, Math.round(W / 300)) }, (_, i) => ({ x: rnd(0, W), y: rnd(.66, .92), v: rnd(.08, .25) * (Math.random() < .5 ? -1 : 1), c: ["#e04a86", "#f4a51c", "#35c29a", "#62b6e8"][i % 4], load: i % 3 })),
    leaves: Array.from({ length: 14 }, () => ({ x: rnd(0, W), y: rnd(0, H), s: rnd(.2, .6), r: rnd(0, 6.28), p: rnd(0, 6.28) })),
    birds: Array.from({ length: 5 }, () => ({ x: rnd(0, W), y: rnd(H * .08, H * .3), v: rnd(.3, .7), p: rnd(0, 6) })),
    rip: Array.from({ length: 40 }, () => ({ x: rnd(0, W), y: rnd(.62, 1), w: rnd(20, 70), p: rnd(0, 6.28) })) };
}
SCENES.k7m2_dal = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!dw || dw.W !== W || dw.H !== H) dwInit(W, H);
  const S = dw, wy = H * .6;
  let g = c.createLinearGradient(0, 0, 0, wy); g.addColorStop(0, "#14244a"); g.addColorStop(.55, "#4b3a6e"); g.addColorStop(1, "#d98a5a");
  c.fillStyle = g; c.fillRect(0, 0, W, wy);
  // rising sun
  const sx = W * .7, sy = wy - 30 - 10 * Math.sin(t / 20000), sr = Math.min(W, H) * .06;
  const sg = c.createRadialGradient(sx, sy, sr * .6, sx, sy, sr * 3.5); sg.addColorStop(0, "rgba(255,214,140,.55)"); sg.addColorStop(1, "rgba(255,214,140,0)"); c.fillStyle = sg; c.beginPath(); c.arc(sx, sy, sr * 3.5, 0, 6.28); c.fill();
  c.fillStyle = "#ffd28a"; c.beginPath(); c.arc(sx, sy, sr, 0, 6.28); c.fill();
  // far snowy hills
  c.fillStyle = "#3a3f6b"; c.beginPath(); c.moveTo(0, wy); S.hills.forEach(h => c.lineTo(h.x, wy - h.h)); c.lineTo(W, wy); c.fill();
  c.fillStyle = "rgba(240,240,255,.5)"; S.hills.forEach(h => { c.beginPath(); c.moveTo(h.x - 14, wy - h.h + 14); c.lineTo(h.x, wy - h.h); c.lineTo(h.x + 14, wy - h.h + 14); c.fill(); });
  c.fillStyle = "#26294c"; c.beginPath(); c.moveTo(0, wy); S.near.forEach(h => c.lineTo(h.x, wy - h.h)); c.lineTo(W, wy); c.fill();
  // poplar row
  c.fillStyle = "#1a2a2c"; for (let x = 10; x < W; x += 34) { const h = 26 + (x * 7 % 18); c.beginPath(); c.ellipse(x, wy - h / 2, 5, h / 2, 0, 0, 6.28); c.fill(); }
  // birds
  c.strokeStyle = "rgba(20,20,40,.7)"; c.lineWidth = 1.6; S.birds.forEach(b => { if (!RM) { b.x += b.v; if (b.x > W + 20) b.x = -20; } const f = Math.sin(t / 200 + b.p) * 4; c.beginPath(); c.moveTo(b.x - 8, b.y + f); c.quadraticCurveTo(b.x - 3, b.y - 3, b.x, b.y); c.quadraticCurveTo(b.x + 3, b.y - 3, b.x + 8, b.y + f); c.stroke(); });
  // water
  g = c.createLinearGradient(0, wy, 0, H); g.addColorStop(0, "#c0795a"); g.addColorStop(.2, "#3c3f6e"); g.addColorStop(1, "#101c38"); c.fillStyle = g; c.fillRect(0, wy, W, H - wy);
  c.fillStyle = "rgba(255,210,140,.28)"; for (let i = 0; i < 9; i++) { const yy = wy + 6 + i * 9, w = (60 - i * 5) * (1 + .15 * Math.sin(t / 600 + i)); c.fillRect(sx - w / 2, yy, w, 2); }
  c.strokeStyle = "rgba(255,255,255,.12)"; c.lineWidth = 1; S.rip.forEach(r => { const yy = r.y * H, xx = r.x + Math.sin(t / 1500 + r.p) * 10; c.beginPath(); c.moveTo(xx, yy); c.quadraticCurveTo(xx + r.w / 2, yy - 2, xx + r.w, yy); c.stroke(); });
  // houseboat
  const hx = W * .08, hy = wy + 22, hw = Math.min(260, W * .24);
  c.fillStyle = "#5a3418"; c.fillRect(hx, hy, hw, 22); c.fillStyle = "#8a5a2b"; c.fillRect(hx + 10, hy - 30, hw - 20, 30);
  c.fillStyle = "#3a2010"; c.beginPath(); c.moveTo(hx + 4, hy - 30); c.lineTo(hx + hw / 2, hy - 52); c.lineTo(hx + hw - 4, hy - 30); c.fill();
  for (let xx = hx + 20; xx < hx + hw - 24; xx += 24) { c.fillStyle = `rgba(255,200,120,${.55 + .2 * Math.sin(t / 800 + xx)})`; c.fillRect(xx, hy - 22, 12, 12); }
  c.fillStyle = "rgba(255,200,120,.12)"; c.fillRect(hx, hy + 24, hw, 16);
  // shikaras gliding with vegetables
  S.boats.forEach(b => {
    if (!RM) { b.x += b.v; if (b.x > W + 120) b.x = -120; if (b.x < -120) b.x = W + 120; }
    const y = b.y * H + Math.sin(t / 900 + b.x * .01) * 2, sc = .6 + (b.y - .6) * 1.4, L = 110 * sc, dir = b.v > 0 ? 1 : -1;
    c.fillStyle = "#2a160a"; c.beginPath(); c.moveTo(b.x - L / 2, y - 6 * sc); c.quadraticCurveTo(b.x, y + 12 * sc, b.x + L / 2, y - 6 * sc); c.lineTo(b.x + L * .4, y); c.lineTo(b.x - L * .4, y); c.fill();
    c.fillStyle = b.c; c.fillRect(b.x - L * .22, y - 22 * sc, L * .44, 4 * sc);
    c.fillStyle = "rgba(0,0,0,.25)"; c.fillRect(b.x - L * .2, y - 18 * sc, 2 * sc, 13 * sc); c.fillRect(b.x + L * .19, y - 18 * sc, 2 * sc, 13 * sc);
    const veg = [["#e0362c", "#3a9a3a"], ["#f4a51c", "#7fc24a"], ["#8e3a9a", "#e8e0c0"]][b.load];
    for (let i = 0; i < 5; i++) { c.fillStyle = veg[i % 2]; c.beginPath(); c.arc(b.x - L * .15 + i * L * .07, y - 8 * sc, 4.5 * sc, 0, 6.28); c.fill(); }
    // boatman + paddle
    const px = b.x - dir * L * .34; c.fillStyle = "#3b2a20"; c.beginPath(); c.arc(px, y - 20 * sc, 4 * sc, 0, 6.28); c.fill(); c.fillRect(px - 3 * sc, y - 16 * sc, 6 * sc, 11 * sc);
    const pa = Math.sin(t / 500 + b.x) * .4; c.strokeStyle = "#c9a77b"; c.lineWidth = 2 * sc; c.beginPath(); c.moveTo(px, y - 14 * sc); c.lineTo(px - dir * 18 * sc * Math.cos(pa), y + 8 * sc); c.stroke();
    c.fillStyle = "rgba(255,255,255,.08)"; c.fillRect(b.x - L * .4, y + 4, L * .8, 2);
  });
  // drifting chinar leaves
  S.leaves.forEach(l => { if (!RM) { l.y += l.s; l.x += Math.sin(t / 1200 + l.p) * .5; l.r += .01; if (l.y > H + 20) { l.y = -20; l.x = Math.random() * W; } }
    c.save(); c.translate(l.x, l.y); c.rotate(l.r); c.fillStyle = "rgba(214,88,40,.75)"; c.beginPath();
    for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * .55; c.lineTo(Math.cos(a) * 9, Math.sin(a) * 9); c.lineTo(Math.cos(a + .27) * 4, Math.sin(a + .27) * 4); }
    c.lineTo(0, 5); c.fill(); c.restore(); });
  c.fillStyle = "rgba(6,10,24,.30)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Kilkila, the kingfisher hisaab-keeper with a slate
   ========================================================= */
GUIDES.k7m2_kingfisher = () => `<svg class="guide kingfisher" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="125" rx="32" ry="4" fill="#000" opacity=".25"/>
  <path d="M14 116 Q60 108 108 116" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round" fill="none"/>
  <path d="M50 112 l-3 7 M62 112 l3 7" stroke="#e0362c" stroke-width="3" stroke-linecap="round"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 46 90;6 46 90;0 46 90" dur="3s" repeatCount="indefinite"/>
    <path d="M40 98 Q22 112 14 124 Q30 120 46 104Z" fill="#1d5fa8"/></g>
  <ellipse cx="56" cy="86" rx="24" ry="27" fill="#f08a2c"/>
  <ellipse cx="62" cy="92" rx="14" ry="18" fill="#f7a94e"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 40 72;-8 40 72;0 40 72;0 40 72" dur="2.4s" repeatCount="indefinite"/>
    <path d="M34 66 Q22 88 34 108 Q52 98 54 72Z" fill="#1f6fc0"/><path d="M32 82 Q38 96 42 100" stroke="#5fd0ff" stroke-width="3" fill="none"/>
    <circle cx="38" cy="76" r="1.8" fill="#9ae6ff"/><circle cx="42" cy="86" r="1.8" fill="#9ae6ff"/></g>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.8s" repeatCount="indefinite"/>
    <circle cx="60" cy="48" r="22" fill="#1f6fc0"/>
    <path d="M40 44 Q50 34 62 40 Q54 46 42 50Z" fill="#5fd0ff" opacity=".8"/>
    <path d="M48 56 Q58 66 70 58 Q66 50 56 52Z" fill="#fff6e6"/>
    <path d="M44 50 Q52 52 58 48 Q54 56 46 56Z" fill="#f08a2c"/>
    <circle cx="66" cy="44" r="6" fill="#fff"/><circle cx="67.5" cy="44.5" r="3.4" fill="#15202a"/><circle cx="68.6" cy="43.2" r="1.1" fill="#fff"/>
    <rect x="59" y="37" width="14" height="0" fill="#1f6fc0"><animate attributeName="height" values="0;0;0;13;0" keyTimes="0;.8;.88;.94;1" dur="4.2s" repeatCount="indefinite"/></rect>
    <path d="M76 46 L112 52 L76 54 Z" fill="#2a2a2a"/><path d="M76 50 L112 52 L76 54 Z" fill="#c0392b"/>
    <path d="M52 27 Q58 20 66 26" stroke="#5fd0ff" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  <g><animateTransform attributeName="transform" type="rotate" values="-4 92 96;4 92 96;-4 92 96" dur="3.4s" repeatCount="indefinite"/>
    <rect x="76" y="80" width="36" height="28" rx="3" fill="#2b3a33" stroke="#c9a77b" stroke-width="3"/>
    <text x="94" y="92" font-size="8" font-weight="800" fill="#efdcae" text-anchor="middle" font-family="Mulish, sans-serif">(5×4)</text>
    <text x="94" y="103" font-size="8" font-weight="800" fill="#f4a51c" text-anchor="middle" font-family="Mulish, sans-serif">+30</text>
  </g>
</svg>`;

/* =========================================================================================
   3D SIMULATIONS (WebGL via make3D, drag to turn).
   ========================================================================================= */
const mreads = (name, P) => { const d = SIM_DEF[name]; const A = Object.assign({}, d.def, P); return d.draw(A, A, new Set(Object.keys(d.reads)), null).reads; };
function mtex(THREE, draw, w, h) { const cv = document.createElement("canvas"); cv.width = w || 128; cv.height = h || 128; draw(cv.getContext("2d"), cv.width, cv.height); const t = new THREE.CanvasTexture(cv); return t; }
const mlerp = (a, b, k) => a + (b - a) * k;

/* ---------- 3D-1. k7m2_crates3d — vegetable crates stacked on a shikara deck: (r1 + r2) × c
   params: r1, r2, c, l1, l2   readouts: whole, split   parts: "r1", "r2" ---------- */
SIM_DEF.k7m2_crates3d = {
  def: { r1: 4, r2: 3, c: 5, l1: "", l2: "" },
  rng: { r1: () => [0, 8, 1], r2: () => [0, 8, 1], c: () => [1, 9, 1] },
  lab: { r1: "Orange rows", r2: "Green rows", c: "Crates in each row" },
  reads: { whole: "As one product", split: "As a sum of products" },
  readouts(P) { return mreads("k7m2_grid", { r1: P.r1, r2: P.r2, c: P.c }); },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 13, phi: 0.95, theta: 0.55, auto: 0.15, target: [0, 0.3, 0], hint: "Drag to turn the shikara" });
    if (!g) return null;
    const { THREE, root } = g;
    const crate = (col) => mtex(THREE, (c, w, h) => { c.fillStyle = col; c.fillRect(0, 0, w, h); c.strokeStyle = "rgba(60,30,10,.7)"; c.lineWidth = 10; c.strokeRect(5, 5, w - 10, h - 10); c.lineWidth = 6; c.beginPath(); c.moveTo(0, h / 2); c.lineTo(w, h / 2); c.stroke(); c.fillStyle = "rgba(255,255,255,.25)"; c.beginPath(); c.arc(w * .3, h * .28, 10, 0, 6.28); c.arc(w * .65, h * .3, 9, 0, 6.28); c.fill(); });
    const mA = new THREE.MeshStandardMaterial({ map: crate("#f4a51c"), roughness: .7, emissive: 0x3a2000, emissiveIntensity: .3 });
    const mB = new THREE.MeshStandardMaterial({ map: crate("#35c29a"), roughness: .7, emissive: 0x003a20, emissiveIntensity: .3 });
    const boxG = new THREE.BoxGeometry(0.82, 0.62, 0.82);
    // shikara hull
    const hullM = new THREE.MeshStandardMaterial({ color: 0x5a3418, roughness: .8 });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 1), hullM); hull.position.y = -0.55; root.add(hull);
    const prowG = new THREE.ConeGeometry(0.55, 2.2, 4); const pr1 = new THREE.Mesh(prowG, hullM), pr2 = new THREE.Mesh(prowG, hullM); pr1.rotation.z = -Math.PI / 2; pr2.rotation.z = Math.PI / 2; root.add(pr1); root.add(pr2);
    const water = new THREE.Mesh(new THREE.CircleGeometry(14, 40), new THREE.MeshStandardMaterial({ color: 0x1e3a6a, roughness: .3, metalness: .2, transparent: true, opacity: .85 })); water.rotation.x = -Math.PI / 2; water.position.y = -0.75; root.add(water);
    const items = []; for (let i = 0; i < 160; i++) { const m = new THREE.Mesh(boxG, mA); m.visible = false; m.scale.setScalar(.01); root.add(m); items.push({ m, tp: new THREE.Vector3(), ts: .01 }); }
    const lA = g.label("", [0, 0, 0], ""), lB = g.label("", [0, 0, 0], ""), lT = g.label("", [0, 3.2, 0], "big");
    const st = { hl: null };
    g.onFrame((t, dt) => {
      const k = Math.min(1, dt * 7);
      items.forEach((it, i) => { it.m.position.lerp(it.tp, k); const s = mlerp(it.m.scale.x, it.ts, k); it.m.scale.setScalar(Math.max(.01, s)); it.m.visible = s > .03;
        if (st.hl && it.part === st.hl) it.m.position.y = it.tp.y + 0.12 * Math.abs(Math.sin(t * 5 + i * .3)); });
      root.position.y = 0.06 * Math.sin(t * 1.3); root.rotation.z = 0.02 * Math.sin(t * 0.9);
    });
    function apply(D, P, sh, hl) {
      st.hl = hl;
      const r1 = Math.round(mnum(P.r1)), r2 = Math.round(mnum(P.r2)), c = Math.round(mnum(P.c)), rows = r1 + r2;
      const X = j => (j - (c - 1) / 2) * 0.95, Z = i => (i - (rows - 1) / 2) * 0.95;
      let n = 0;
      for (let i = 0; i < rows; i++) for (let j = 0; j < c; j++) { if (n >= items.length) break; const it = items[n++]; const A = i < r1; it.m.material = A ? mA : mB; it.part = A ? "r1" : "r2"; it.tp.set(X(j), 0.06 + (A ? 0 : 0), Z(i) + (A ? 0 : 0.18)); it.ts = 1; if (it.m.scale.x < .05) it.m.position.copy(it.tp).setY(3); }
      for (; n < items.length; n++) items[n].ts = 0.01;
      const L = Math.max(c * 0.95 + 0.6, 2), Wd = Math.max(rows * 0.95 + 0.6, 1.4);
      hull.scale.set(L, 1, Wd); pr1.position.set(L / 2 + 1.0, -0.55, 0); pr2.position.set(-L / 2 - 1.0, -0.55, 0); pr1.scale.set(1, 1, Wd / 1.1); pr2.scale.set(1, 1, Wd / 1.1);
      lA.move([-(c * 0.95) / 2 - 0.9, 0.5, Z((r1 - 1) / 2)]); lA.set(`<span style="color:#f4a51c">${P.l1 || r1 + " rows"}</span>`); lA.show(r1 > 0);
      lB.move([-(c * 0.95) / 2 - 0.9, 0.5, Z(r1 + (r2 - 1) / 2) + 0.18]); lB.set(`<span style="color:#35c29a">${P.l2 || r2 + " rows"}</span>`); lB.show(r2 > 0);
      lT.set(sh.has("whole") || sh.has("split") ? `(${r1} + ${r2}) × ${c} = ${r1} × ${c} + ${r2} × ${c} = ${rows * c}` : `(${r1} + ${r2}) × ${c} = ?`);
      g.view.dist = Math.max(6.5, Math.max(c, rows) * 1.25 + 4);
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

})();
