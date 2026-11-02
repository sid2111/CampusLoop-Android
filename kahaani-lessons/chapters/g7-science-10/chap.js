(function(){
/* Grade 7 Science (Curiosity) Chapter 10 — Life Processes in Plants
   Plugin: simulations (k7s10_*), the Wayanad glasshouse scene, and Hara the chameleon guide. */

/* ---------- private helpers ---------- */
const kh = (hl, p) => ` data-part="${p}"${hl === p ? ' class="hl"' : ""}`;
const kn = x => { const v = +x; return isFinite(v) ? v : 0; };
const kc = (x, a, b) => Math.max(a, Math.min(b, kn(x)));
const kf = x => (Math.round(kn(x) * 10) / 10).toFixed(1).replace(/\.0$/, "");
function kmix(a, b, k) {
  k = kc(k, 0, 1); const p = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16));
  const A = p(a), B = p(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, "0")).join("");
}
// a leaf shape centred at (cx,cy), length L along x, half-width W
const kleaf = (cx, cy, L, W) => { const l = cx - L / 2, r = cx + L / 2; return `M${l} ${cy} C${l + L * .25} ${cy - W} ${r - L * .2} ${cy - W * .75} ${r} ${cy} C${r - L * .2} ${cy + W * .75} ${l + L * .25} ${cy + W} ${l} ${cy}Z`; };
const ksun = (x, y, r, on) => { let s = `<g opacity="${(.25 + .75 * kc(on, 0, 1)).toFixed(2)}">`; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; s += `<line x1="${(x + Math.cos(a) * (r + 3)).toFixed(1)}" y1="${(y + Math.sin(a) * (r + 3)).toFixed(1)}" x2="${(x + Math.cos(a) * (r + 9)).toFixed(1)}" y2="${(y + Math.sin(a) * (r + 9)).toFixed(1)}" stroke="var(--mari)" stroke-width="2.5" stroke-linecap="round"/>`; } return s + `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--mari)"/></g>`; };
const kmoon = (x, y, r) => `<path d="M${x + r * .3} ${y - r} A${r} ${r} 0 1 0 ${x + r * .3} ${y + r} A${r * .75} ${r * .75} 0 1 1 ${x + r * .3} ${y - r}Z" fill="#dfe6f2"/>`;
const karrow = (x1, y1, x2, y2, col, op, lab, lx, ly, o = {}) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 8;
  return `<g opacity="${kc(op, 0, 1).toFixed(2)}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${o.sw || 4}" stroke-linecap="round"${o.dash ? ' stroke-dasharray="6 5"' : ""}/>` +
    `<path d="M${x2} ${y2} L${(x2 - h * Math.cos(a - .5)).toFixed(1)} ${(y2 - h * Math.sin(a - .5)).toFixed(1)} L${(x2 - h * Math.cos(a + .5)).toFixed(1)} ${(y2 - h * Math.sin(a + .5)).toFixed(1)}Z" fill="${col}"/>` +
    (lab ? T(lx, ly, lab, { size: o.size || 11.5, fill: col, a: o.a || "middle" }) : "") + `</g>`;
};
const kdrop = (x, y, s, on) => `<g><path d="M${x} ${y - 9 * s} Q${x + 7 * s} ${y} ${x} ${y + 5 * s} Q${x - 7 * s} ${y} ${x} ${y - 9 * s}Z" fill="var(--sky)" opacity="${on ? 1 : .35}"/>${on ? "" : `<line x1="${x - 8}" y1="${y - 9}" x2="${x + 8}" y2="${y + 6}" stroke="var(--red)" stroke-width="2.5"/>`}</g>`;

/* =========================================================
   1. k7s10_pots — potted plants under different conditions, growing day by day
   params: pots ("SW,SN,DW": S=sunlight/D=dark, W=water/N=no water, X=no CO₂), names ("A,B,C"), day, lx
   readouts: grow, starch, o2      parts: "pot0", "pot1", …
   ========================================================= */
function kpot(code, d) {
  const S = code.includes("S"), W = code.includes("W"), C = !code.includes("X");
  d = kc(d, 0, 14);
  if (S && W && C) return { S, W, C, h: 6 + .7 * d, n: 6 + Math.floor(d / 2), col: "#2f9e4a", wilt: 0, starch: true, o2: true, word: "green, healthy" };
  if (!W) { const k = Math.min(1, d / 8); return { S, W, C, h: 6, n: Math.max(2, 6 - Math.floor(d / 3)), col: kmix("#2f9e4a", "#8a5a2b", k), wilt: Math.min(1, d / 6), starch: false, o2: false, word: d > 9 ? "dried up, may have died" : d > 2 ? "wilting, turning brown" : "green" }; }
  if (!S) { const k = Math.min(1, d / 10); return { S, W, C, h: 6 + .15 * d, n: 6, col: kmix("#2f9e4a", "#d9c23a", k), wilt: .2 * k, starch: false, o2: false, word: d > 4 ? "pale yellow, weak" : "green" }; }
  return { S, W, C, h: 6 + .1 * d, n: 6, col: kmix("#2f9e4a", "#7fb85a", Math.min(1, d / 10)), wilt: 0, starch: false, o2: false, word: d > 4 ? "pale, hardly growing" : "green" };
}
SIM_DEF.k7s10_pots = {
  def: { pots: "SW,SN,DW", names: "A,B,C", day: 0, lx: "" },
  rng: { day: () => [0, 14, 1] },
  lab: { day: "Days passed" },
  reads: { grow: "Growth", starch: "Iodine test on a leaf", o2: "Oxygen given out?" },
  draw(D, P, sh, hl) {
    const codes = String(P.pots).split(","), names = String(P.names).split(","), N = codes.length, cw = 420 / N, d = kn(D.day);
    let s = `<svg viewBox="0 0 420 250">`;
    s += T(210, 16, P.lx ? P.lx : `Day ${Math.round(d)}`, { size: 13, fill: "var(--muted)" });
    codes.forEach((code, i) => {
      const g = kpot(code, d), cx = cw * i + cw / 2, soil = 196, h = g.h * 6.2;
      s += `<g${kh(hl, "pot" + i)}>`;
      if (!g.S) s += `<rect x="${cx - cw / 2 + 4}" y="24" width="${cw - 8}" height="188" rx="10" fill="#050a14" opacity=".72"/>` + kmoon(cx + cw / 2 - 22, 40, 9);
      else s += ksun(cx + cw / 2 - 24, 42, 9, 1);
      if (!g.C) s += `<path d="M${cx - 34} ${soil + 10} L${cx - 34} 80 Q${cx - 34} 56 ${cx} 56 Q${cx + 34} 56 ${cx + 34} 80 L${cx + 34} ${soil + 10}" fill="rgba(98,182,232,.12)" stroke="var(--sky)" stroke-width="1.5"/>` + T(cx, 72, "no CO₂", { size: 10.5, fill: "var(--sky)" });
      // stem
      s += `<path d="M${cx} ${soil} Q${cx + 3} ${soil - h / 2} ${cx} ${soil - h}" stroke="${kmix(g.col, "#5a3a1a", .25)}" stroke-width="3.5" fill="none"/>`;
      for (let j = 0; j < g.n; j++) {
        const y = soil - h * (.22 + .74 * j / Math.max(1, g.n - 1)), side = j % 2 ? 1 : -1, ang = side * (-25 + 70 * g.wilt) * (side < 0 ? -1 : 1);
        const rot = side > 0 ? -20 + 75 * g.wilt : 200 - 75 * g.wilt;
        s += `<path d="${kleaf(cx + 13, y, 26, 7)}" fill="${g.col}" transform="rotate(${rot.toFixed(1)} ${cx} ${y.toFixed(1)})" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>`;
        void ang;
      }
      // pot
      s += `<path d="M${cx - 30} ${soil - 4} L${cx + 30} ${soil - 4} L${cx + 23} ${soil + 30} L${cx - 23} ${soil + 30}Z" fill="#b8643a"/><rect x="${cx - 33}" y="${soil - 8}" width="66" height="8" rx="2" fill="#c97847"/><ellipse cx="${cx}" cy="${soil - 6}" rx="28" ry="3" fill="${g.W ? "#3b2414" : "#8a6a48"}"/>`;
      s += kdrop(cx - cw / 2 + 18, 44, 1, g.W);
      s += T(cx, soil + 22, names[i] || "", { size: 15, fill: "#fff" });
      s += `</g>`;
      s += T(cx, 244, `${g.S ? "sun" : "dark"} · ${g.W ? "water" : "no water"}${g.C ? "" : " · no CO₂"}`, { size: 10.5, fill: "var(--muted)" });
    });
    s += "</svg>";
    const lst = f => codes.map((c, i) => `${names[i] || i + 1}: ${f(kpot(c, kn(P.day)))}`).join("; ");
    return { svg: s, reads: {
      grow: lst(g => `${kf(g.h)} cm, ${g.n} leaves, ${g.word}`),
      starch: lst(g => g.starch ? "blue-black (starch made)" : "no blue-black (no starch)"),
      o2: lst(g => g.o2 ? "yes" : "no")
    } };
  }
};

/* =========================================================
   2. k7s10_starch — the iodine test on a leaf, step by step
   params: stage 0 fresh / 1 boiled in water / 2 decolourised in alcohol / 3 iodine added
           leaf "plain" | "varieg" (green + non-green patches) | "bottle" (half inside a caustic-soda bottle)
           light 1 (plant kept in sunlight) / 0 (kept in the dark)
   readouts: step, result     parts: "leaf", "lab", "bottle"
   ========================================================= */
const KSTEP = ["Fresh leaf, just picked", "Boiled in water for 5 minutes to soften it", "Warmed in alcohol in a water bath until colourless", "A few drops of dilute iodine added"];
function kstarchCol(stage, starch, patch) {
  if (stage < 1) return patch ? "#f1ecc8" : "#2f9e4a";
  if (stage < 2) return patch ? "#e2dbb0" : "#4d8a3a";
  if (stage < 3) return patch ? "#fbf7e8" : "#f1e9c9";
  return starch ? "#1c1f4c" : "#d4a03e";
}
SIM_DEF.k7s10_starch = {
  def: { stage: 0, leaf: "plain", light: 1, lx: "" },
  rng: { stage: () => [0, 3, 1] },
  lab: { stage: "Starch-test step" },
  reads: { step: "What we did", result: "Result" },
  draw(D, P, sh, hl) {
    const st = Math.round(kc(D.stage, 0, 3)), lit = kn(P.light) > 0, mode = P.leaf;
    let s = `<svg viewBox="0 0 420 240"><defs><clipPath id="k7s10cA"><rect x="0" y="0" width="285" height="240"/></clipPath><clipPath id="k7s10cB"><rect x="285" y="0" width="200" height="240"/></clipPath></defs>`;
    // left: lab equipment for this step
    s += `<g${kh(hl, "lab")}>`;
    const bx = 70;
    if (st === 0) {
      s += `<path d="M${bx - 26} 170 L${bx + 26} 170 L${bx + 20} 206 L${bx - 20} 206Z" fill="#b8643a"/><path d="M${bx} 170 L${bx} 118" stroke="#2f7a3a" stroke-width="3"/>` +
        `<path d="${kleaf(bx + 14, 128, 28, 8)}" fill="#2f9e4a"/><path d="${kleaf(bx - 14, 146, 28, 8)}" fill="#2f9e4a"/>` + (lit ? ksun(bx + 34, 82, 11, 1) : kmoon(bx + 34, 82, 11) + T(bx, 226, "kept in the dark", { size: 11, fill: "var(--muted)" }));
    } else {
      s += `<path d="M${bx - 38} 110 L${bx - 38} 196 Q${bx - 38} 204 ${bx - 30} 204 L${bx + 30} 204 Q${bx + 38} 204 ${bx + 38} 196 L${bx + 38} 110" fill="rgba(98,182,232,.18)" stroke="#cfe3ef" stroke-width="2"/>`;
      s += `<rect x="${bx - 36}" y="136" width="72" height="66" fill="rgba(98,182,232,.35)"/>`;
      if (st === 1) for (let i = 0; i < 6; i++) s += `<circle cx="${bx - 24 + i * 10}" cy="${190 - (i * 13) % 50}" r="3" fill="none" stroke="#e6f3fb" stroke-width="1.2"/>`;
      if (st === 2) s += `<rect x="${bx - 9}" y="92" width="18" height="96" rx="9" fill="rgba(255,255,255,.18)" stroke="#e6f3fb" stroke-width="1.5"/><rect x="${bx - 7}" y="130" width="14" height="54" rx="7" fill="rgba(140,200,120,.6)"/>` + T(bx, 86, "alcohol", { size: 10.5, fill: "var(--ink)" });
      if (st < 3) s += `<path d="M${bx - 10} 228 Q${bx} 206 ${bx + 10} 228Z" fill="var(--mari)"/><path d="M${bx - 5} 228 Q${bx} 216 ${bx + 5} 228Z" fill="#fff3b0"/>`;
      if (st === 3) s += `<rect x="${bx + 40}" y="40" width="10" height="44" rx="3" fill="#5a3a1a"/><path d="M${bx + 45} 84 L${bx + 45} 98" stroke="#cfe3ef" stroke-width="3"/><circle cx="${bx + 45}" cy="104" r="4" fill="#a8641c"/>` + T(bx, 70, "iodine", { size: 11, fill: "var(--mari)" });
      if (st === 2) s += T(bx, 236, "never heat alcohol directly!", { size: 10, fill: "var(--red)" });
    }
    s += T(bx, 30, `Step ${st + 1} of 4`, { size: 12, fill: "var(--mari)" });
    s += `</g>`;
    for (let i = 0; i < 4; i++) s += `<circle cx="${bx - 24 + i * 16}" cy="46" r="5" fill="${i <= st ? "var(--mari)" : "rgba(255,255,255,.15)"}"/>`;
    // right: the leaf
    const cx = 285, cy = 122;
    if (mode === "bottle") {
      const out = kstarchCol(st, lit, false), inn = kstarchCol(st, false, false);
      s += `<g transform="rotate(90 ${cx} ${cy})"${kh(hl, "leaf")}><path d="${kleaf(cx, cy, 200, 72)}" fill="${out}" clip-path="url(#k7s10cA)"/><path d="${kleaf(cx, cy, 200, 72)}" fill="${inn}" clip-path="url(#k7s10cB)"/><path d="${kleaf(cx, cy, 200, 72)}" fill="none" stroke="rgba(0,0,0,.3)"/><line x1="${cx - 100}" y1="${cy}" x2="${cx + 96}" y2="${cy}" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/></g>`;
      if (st === 0) s += `<g${kh(hl, "bottle")}><rect x="215" y="120" width="140" height="10" rx="3" fill="#a87a4a"/><path d="M219 130 L219 220 Q219 230 229 230 L341 230 Q351 230 351 220 L351 130" fill="rgba(200,230,255,.12)" stroke="#cfe3ef" stroke-width="2"/><rect x="221" y="200" width="128" height="28" fill="rgba(226,220,255,.35)"/>` + T(285, 218, "caustic soda", { size: 11, fill: "var(--ink)" }) + `</g>` + T(408, 165, "inside: no CO₂", { size: 11, fill: "var(--sky)", a: "end" }) + T(408, 70, "outside: air", { size: 11, fill: "var(--teal)", a: "end" });
      else s += `<line x1="200" y1="124" x2="370" y2="124" stroke="var(--muted)" stroke-dasharray="5 4"/>` + T(408, 175, "was inside", { size: 11, fill: "var(--muted)", a: "end" }) + T(408, 70, "was outside", { size: 11, fill: "var(--muted)", a: "end" });
    } else {
      const green = kstarchCol(st, lit, false), patch = kstarchCol(st, false, true);
      s += `<g${kh(hl, "leaf")}>`;
      if (mode === "varieg") s += `<path d="${kleaf(cx, cy, 230, 82)}" fill="${patch}" stroke="rgba(0,0,0,.3)"/><path d="${kleaf(cx + 6, cy, 160, 50)}" fill="${green}"/>`;
      else s += `<path d="${kleaf(cx, cy, 230, 82)}" fill="${green}" stroke="rgba(0,0,0,.3)"/>`;
      s += `<path d="M${cx - 115} ${cy} L${cx + 112} ${cy}" stroke="rgba(0,0,0,.25)" stroke-width="1.6"/>`;
      for (let i = 1; i < 6; i++) { const x = cx - 100 + i * 34; s += `<path d="M${x} ${cy} Q${x + 14} ${cy - 22} ${x + 26} ${cy - 34 + i * 2}M${x} ${cy} Q${x + 14} ${cy + 22} ${x + 26} ${cy + 34 - i * 2}" stroke="rgba(0,0,0,.18)" fill="none"/>`; }
      s += `<path d="M${cx - 115} ${cy} l-30 18" stroke="#5a7a3a" stroke-width="4" stroke-linecap="round"/></g>`;
      if (mode === "varieg") s += T(cx + 6, 224, "middle: green · edge: non-green", { size: 11, fill: "var(--muted)" });
    }
    s += T(cx, 26, P.lx ? P.lx : (lit ? "Plant kept in sunlight" : "Plant kept in the dark"), { size: 12.5, fill: "var(--muted)" });
    s += "</svg>";
    const sP = Math.round(kc(P.stage, 0, 3));
    let res = "Finish all four steps to see the result.";
    if (sP === 3) {
      if (mode === "bottle") res = "Outside half: blue-black (starch). Inside half: no blue-black — no CO₂, no starch.";
      else if (!lit) res = "No blue-black anywhere — no starch is made in the dark.";
      else if (mode === "varieg") res = "Green part: blue-black (starch). Non-green edge: no blue-black.";
      else res = "Blue-black all over — the leaf has starch.";
    } else if (sP === 2) res = "Leaf is colourless now, so a colour change will be easy to see.";
    return { svg: s, reads: { step: KSTEP[sP], result: res } };
  }
};

/* =========================================================
   3. k7s10_factory — the leaf food factory (photosynthesis), the respiration engine, and the
   oxygen-bubble set-up of Activity 10.5
   params: proc 0 photosynthesis / 1 respiration; mode "leaf" | "funnel"; light, co2, water (0–100); chl 1/0
   readouts: eq, rate, out      parts: "sun", "co2", "water", "o2", "food", "leaf"
   ========================================================= */
const kRate = P => kn(P.chl) > 0 ? Math.min(kn(P.light), kn(P.co2), kn(P.water)) : 0;
function kWhy(P) {
  const m = [];
  if (kn(P.light) <= 0) m.push("no sunlight"); if (kn(P.co2) <= 0) m.push("no carbon dioxide"); if (kn(P.water) <= 0) m.push("no water"); if (kn(P.chl) <= 0) m.push("no chlorophyll");
  return m;
}
SIM_DEF.k7s10_factory = {
  def: { proc: 0, mode: "leaf", light: 100, co2: 100, water: 100, chl: 1, lx: "" },
  rng: { light: () => [0, 100, 25], co2: () => [0, 100, 25], water: () => [0, 100, 25] },
  lab: { light: "Sunlight (%)", co2: "Carbon dioxide (%)", water: "Water (%)" },
  reads: { eq: "Word equation", rate: "Factory status", out: "Products" },
  draw(D, P, sh, hl) {
    let s = `<svg viewBox="0 0 420 240">`;
    const r = Math.min(kn(D.light), kn(D.co2), kn(D.water)) * (kn(P.chl) > 0 ? 1 : 0) / 100;
    if (P.mode === "funnel") {
      [[105, kn(D.light) / 100, "A: in sunlight"], [315, 0, "B: in the dark"]].forEach(([x, L, lab], i) => {
        s += `<g${kh(hl, i ? "dark" : "sun")}>`;
        s += `<path d="M${x - 70} 92 L${x - 70} 222 Q${x - 70} 230 ${x - 62} 230 L${x + 62} 230 Q${x + 70} 230 ${x + 70} 222 L${x + 70} 92" fill="rgba(98,182,232,.14)" stroke="#cfe3ef" stroke-width="2"/><rect x="${x - 68}" y="104" width="136" height="124" fill="rgba(98,182,232,.3)"/>`;
        for (let k = 0; k < 7; k++) s += `<path d="M${x - 30 + k * 10} 226 Q${x - 38 + k * 10} 210 ${x - 28 + k * 10} 196 Q${x - 20 + k * 10} 184 ${x - 26 + k * 10} 172" stroke="#2f9e4a" stroke-width="3" fill="none"/>`;
        s += `<path d="M${x - 50} 224 L${x - 8} 150 L${x - 8} 118 L${x + 8} 118 L${x + 8} 150 L${x + 50} 224" fill="none" stroke="#e6f3fb" stroke-width="2"/>`;
        s += `<rect x="${x - 10}" y="30" width="20" height="92" rx="10" fill="rgba(98,182,232,.35)" stroke="#e6f3fb" stroke-width="2"/>`;
        const gas = 50 * L; if (gas > 1) s += `<rect x="${x - 8}" y="32" width="16" height="${gas.toFixed(1)}" rx="8" fill="rgba(255,255,255,.55)"${kh(hl, "o2")}/>`;
        const nb = Math.round(L * 6); for (let k = 0; k < nb; k++) s += `<circle cx="${x + (k % 2 ? 3 : -3)}" cy="${150 - k * 9}" r="${2 + (k % 3)}" fill="none" stroke="#fff" stroke-width="1.3"/>`;
        if (i) s += `<rect x="${x - 100}" y="22" width="200" height="214" rx="10" fill="#050a14" opacity=".6"/>` + kmoon(x + 76, 40, 10);
        else s += ksun(x + 82, 40, 11, L);
        s += T(x, 18, lab, { size: 12.5, fill: i ? "var(--muted)" : "var(--mari)" });
        s += `</g>`;
      });
    } else if (kn(P.proc) > 0) {
      s += `<rect x="140" y="60" width="140" height="120" rx="26" fill="rgba(53,194,154,.16)" stroke="var(--teal)" stroke-width="2"${kh(hl, "leaf")}/>`;
      s += T(210, 112, "every living cell", { size: 12.5 }) + T(210, 130, "day and night", { size: 12, fill: "var(--muted)" }) + T(210, 150, "root, stem, leaf, seed", { size: 11, fill: "var(--muted)" });
      s += karrow(20, 90, 136, 100, "var(--mari)", 1, "glucose", 60, 82, { a: "middle" }) + karrow(20, 160, 136, 140, "var(--sky)", 1, "oxygen", 60, 178);
      s += karrow(284, 90, 400, 66, "#cfd8e3", 1, sh.has("out") ? "carbon dioxide" : "?", 350, 58) + karrow(284, 120, 400, 120, "var(--sky)", 1, sh.has("out") ? "water" : "?", 350, 112);
      s += `<g${kh(hl, "food")}>` + karrow(284, 150, 380, 186, "var(--rani)", 1, "", 0, 0) + `<path d="M392 176 L380 200 L390 200 L380 226 L404 192 L393 192 L402 176Z" fill="var(--mari)"/>` + T(340, 220, sh.has("out") ? "energy" : "?", { size: 13, fill: "var(--mari)" }) + `</g>`;
      s += T(210, 30, P.lx || "Respiration: food is broken down to release energy", { size: 12.5, fill: "var(--muted)" });
    } else {
      const L = kn(D.light) / 100, C = kn(D.co2) / 100, Wt = kn(D.water) / 100, chl = kn(P.chl) > 0;
      s += `<g${kh(hl, "sun")}>` + ksun(44, 44, 18, L) + `</g>`;
      for (let i = 0; i < 3; i++) s += `<line x1="${62 + i * 6}" y1="${60 + i * 10}" x2="${150 + i * 12}" y2="${92 + i * 6}" stroke="var(--mari)" stroke-width="2" stroke-dasharray="5 4" opacity="${(L * .9).toFixed(2)}"/>`;
      s += `<path d="M210 232 L210 160" stroke="#5a7a3a" stroke-width="7" stroke-linecap="round"/>`;
      s += `<g${kh(hl, "leaf")}><path d="${kleaf(225, 120, 200, 64)}" fill="${chl ? "#2f9e4a" : "#d8d2a8"}" stroke="rgba(0,0,0,.3)"/><path d="M125 120 L322 120" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/>`;
      if (chl) for (let i = 0; i < 14; i++) s += `<ellipse cx="${145 + (i * 41) % 165}" cy="${102 + (i * 23) % 38}" rx="5" ry="3" fill="#1f7a35"/>`;
      s += `</g>`;
      s += `<g${kh(hl, "co2")}>` + karrow(8, 152, 120, 132, "#cfd8e3", .25 + .75 * C, "CO₂ from air", 56, 174) + `</g>`;
      s += `<g${kh(hl, "water")}>` + karrow(250, 232, 226, 166, "var(--sky)", .25 + .75 * Wt, "water + minerals", 330, 228) + `</g>`;
      const nb = Math.round(r * 5);
      s += `<g${kh(hl, "o2")}>` + karrow(318, 98, 404, 62, "var(--teal)", r > 0 ? 1 : .2, sh.has("out") ? "oxygen out" : "? out", 360, 50);
      for (let i = 0; i < nb; i++) s += `<circle cx="${334 + i * 15}" cy="${82 - i * 6}" r="4" fill="none" stroke="var(--teal)" stroke-width="1.5"/>`;
      s += `</g><g${kh(hl, "food")}><rect x="338" y="130" width="64" height="70" rx="8" fill="rgba(255,255,255,.06)" stroke="var(--mari)" stroke-width="1.5"/><rect x="340" y="${(198 - 66 * r).toFixed(1)}" width="60" height="${(66 * r).toFixed(1)}" rx="6" fill="var(--mari)" opacity=".7"/>` + T(370, 152, sh.has("out") ? "glucose" : "?", { size: 11.5 }) + T(370, 168, sh.has("out") ? "→ starch" : "", { size: 11, fill: "var(--ink)" }) + `</g>`;
      s += `<rect x="168" y="106" width="104" height="26" rx="13" fill="rgba(10,15,40,.72)"/>` + T(220, 124, sh.has("rate") ? `food: ${Math.round(r * 100)}%` : "food: ?", { size: 13, fill: r > 0 ? "var(--mari)" : "var(--red)" });
    }
    s += "</svg>";
    const resp = kn(P.proc) > 0 && P.mode !== "funnel", R = kRate(P), why = kWhy(P);
    let rate;
    if (P.mode === "funnel") rate = kn(P.light) > 0 ? "A: bubbles of oxygen collect in the tube; a lit matchstick burns with an intense flame. B: no bubbles in the dark." : "No light on A either — no bubbles anywhere.";
    else if (resp) rate = "Running all the time — in green and non-green parts alike";
    else rate = R >= 100 ? "Running at full speed — all four needs are met" : R > 0 ? `Running at ${R}% — the scarcest need sets the pace` : `Stopped: ${why.join(", ")}`;
    return { svg: s, reads: {
      eq: resp ? "Glucose + Oxygen → Carbon dioxide + Water + Energy" : "Carbon dioxide + Water —(sunlight, chlorophyll)→ Glucose + Oxygen",
      rate,
      out: resp ? "Carbon dioxide, water and energy (used for growth)" : (P.mode === "funnel" || R > 0 ? "Glucose (later stored as starch) and oxygen" : "Nothing — no food, no oxygen")
    } };
  }
};

/* =========================================================
   4. k7s10_stoma — leaf peel under the microscope + one stoma close up, with gas exchange
   params: open (0–100 %), day 1 (day) / 0 (night)
   readouts: gas, pore      parts: "peel", "stoma", "gas"
   ========================================================= */
const kguard = (x, y, g, sc) => `<ellipse cx="${(x - (g + 5) * sc).toFixed(1)}" cy="${y}" rx="${(5.5 * sc).toFixed(1)}" ry="${(12 * sc).toFixed(1)}" fill="#3fae5a" stroke="#1d6b33" stroke-width="${(.9 * sc).toFixed(1)}"/><ellipse cx="${(x + (g + 5) * sc).toFixed(1)}" cy="${y}" rx="${(5.5 * sc).toFixed(1)}" ry="${(12 * sc).toFixed(1)}" fill="#3fae5a" stroke="#1d6b33" stroke-width="${(.9 * sc).toFixed(1)}"/><ellipse cx="${x}" cy="${y}" rx="${Math.max(.3, g * sc).toFixed(1)}" ry="${(9 * sc).toFixed(1)}" fill="#141a2a"/>`;
SIM_DEF.k7s10_stoma = {
  def: { open: 100, day: 1, lx: "" },
  rng: { open: () => [0, 100, 10], day: () => [0, 1, 1] },
  lab: { open: "Stoma opening (%)", day: "Night 0 · Day 1" },
  reads: { gas: "Gases through the stomata", pore: "Pore" },
  draw(D, P, sh, hl) {
    const o = kc(D.open, 0, 100) / 100, day = kn(D.day) >= .5;
    let s = `<svg viewBox="0 0 420 240"><defs><clipPath id="k7s10scope"><circle cx="104" cy="126" r="92"/></clipPath></defs>`;
    s += `<g${kh(hl, "peel")}><circle cx="104" cy="126" r="94" fill="#2a1630" stroke="#cfe3ef" stroke-width="3"/><g clip-path="url(#k7s10scope)">`;
    for (let r = 0; r < 9; r++) for (let c = 0; c < 7; c++) { const x = 14 + c * 30 + (r % 2) * 15, y = 34 + r * 24; s += `<path d="M${x - 15} ${y} L${x - 8} ${y - 12} L${x + 8} ${y - 12} L${x + 15} ${y} L${x + 8} ${y + 12} L${x - 8} ${y + 12}Z" fill="#b06fbf" fill-opacity=".45" stroke="#e8c8f0" stroke-width="1"/>`; }
    [[70, 82], [132, 100], [86, 164], [146, 176], [40, 132]].forEach(([x, y]) => { s += kguard(x, y, .4 + 3.6 * o, 1); });
    s += `</g></g>`;
    s += `<line x1="40" y1="228" x2="80" y2="228" stroke="#fff" stroke-width="2"/>` + T(60, 222, "0.1 mm", { size: 10, fill: "#fff" });
    // close-up
    const cx = 300, cy = 130, g = 1 + 9 * o;
    s += `<line x1="150" y1="98" x2="252" y2="70" stroke="var(--muted)" stroke-dasharray="3 4"/><line x1="150" y1="104" x2="252" y2="196" stroke="var(--muted)" stroke-dasharray="3 4"/>`;
    s += `<g${kh(hl, "stoma")}>` + kguard(cx, cy, g, 4) + `</g>`;
    s += T(cx - 60, 222, "guard cells", { size: 11, fill: "#7fd18f" }) + T(cx + 2, 222, "pore", { size: 11, fill: "var(--ink)" });
    const op = o > .05 ? 1 : .15, gq = sh.has("gas"), G = x => gq ? x : "?";
    s += `<g${kh(hl, "gas")}>`;
    if (day) s += karrow(cx - 92, 40, cx - 12, 100, "#cfd8e3", op, G("CO₂ in"), cx - 92, 32) + karrow(cx + 12, 100, cx + 86, 40, "var(--teal)", op, G("O₂ out"), cx + 86, 32);
    else s += karrow(cx - 92, 40, cx - 12, 100, "var(--teal)", op, G("O₂ in"), cx - 92, 32) + karrow(cx + 12, 100, cx + 86, 40, "#cfd8e3", op, G("CO₂ out"), cx + 86, 32);
    s += karrow(cx + 14, 150, cx + 92, 176, "var(--sky)", op * (day ? 1 : .6), G("water vapour"), cx + 76, 198, { dash: 1, sw: 3, size: 10.5 });
    s += `</g>`;
    s += day ? ksun(404, 18, 8, 1) : kmoon(404, 18, 9);
    s += "</svg>";
    const oP = kc(P.open, 0, 100), dP = kn(P.day) >= .5;
    return { svg: s, reads: {
      gas: oP <= 0 ? "Pores closed — very little gas can pass" : dP ? "Day: carbon dioxide goes in for photosynthesis, oxygen comes out; some water escapes as vapour" : "Night: no photosynthesis; oxygen goes in for respiration, carbon dioxide comes out",
      pore: `${oP}% open — the two guard cells control the opening`
    } };
  }
};

/* =========================================================
   5. k7s10_glass — the lab bench: "tumbler" (red ink climbs the xylem), "flask" (germinating seeds and
   lime water), "tubes" (Ananya's four test tubes with a CO₂ indicator)
   params: mode, hours, temp (0 cold / 1 room / 2 warm, tumbler), cut (1 = show cut stem)
   readouts: what, why      parts: "A", "B", "C", "D", "cut", "lime"
   ========================================================= */
const KSPEED = [.6, 1, 1.4];
SIM_DEF.k7s10_glass = {
  def: { mode: "tumbler", hours: 0, temp: 1, cut: 0, lx: "" },
  rng: { hours: P => P.mode === "tubes" ? [0, 3, .5] : P.mode === "flask" ? [0, 24, 4] : [0, 24, 2], temp: () => [0, 2, 1] },
  lab: { hours: "Hours passed", temp: "Cold 0 · Room 1 · Warm 2" },
  reads: { what: "What we see", why: "Why" },
  draw(D, P, sh, hl) {
    const h = kn(D.hours);
    let s = `<svg viewBox="0 0 420 240">`;
    if (P.mode === "flask") {
      const k = kc(h / 24, 0, 1);
      s += `<g${kh(hl, "A")}><path d="M100 60 L100 104 L48 214 Q44 226 58 226 L182 226 Q196 226 192 214 L140 104 L140 60" fill="rgba(200,230,255,.1)" stroke="#cfe3ef" stroke-width="2"/><rect x="96" y="48" width="48" height="14" rx="3" fill="#a87a4a"/>`;
      s += `<path d="M58 210 L182 210 L188 222 L52 222Z" fill="#f4f0e6"/>`;
      for (let i = 0; i < 9; i++) { const x = 66 + i * 13; s += `<ellipse cx="${x}" cy="206" rx="5" ry="4" fill="#8bbf4a"/><path d="M${x} 203 q2 ${-8 * k - 2} ${4 * k} ${-14 * k - 2}" stroke="#d8f0c0" stroke-width="2" fill="none"/>`; }
      s += T(120, 244 - 6, "germinating moong seeds", { size: 10.5, fill: "var(--muted)" }) + `</g>`;
      s += `<path d="M112 48 L112 24 L300 24 L300 150" stroke="#cfe3ef" stroke-width="3" fill="none"/><path d="M128 48 L128 36" stroke="#cfe3ef" stroke-width="3"/>`;
      for (let i = 0; i < 5; i++) { const u = ((i / 5) + k * 3) % 1; const px = u < .3 ? 112 : u < .7 ? 112 + (u - .3) / .4 * 188 : 300, py = u < .3 ? 48 - u / .3 * 24 : u < .7 ? 24 : 24 + (u - .7) / .3 * 126; if (k > 0) s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3" fill="#cfd8e3"/>`; }
      [[300, k, "connected to flask"], [380, k * .06, "open to air"]].forEach(([x, m, lab], i) => {
        s += `<g${kh(hl, i ? "D" : "lime")}><rect x="${x - 16}" y="${i ? 96 : 104}" width="32" height="${i ? 124 : 116}" rx="14" fill="rgba(200,230,255,.1)" stroke="#cfe3ef" stroke-width="2"/><rect x="${x - 14}" y="150" width="28" height="68" rx="12" fill="${kmix("#bfe4f5", "#f6f6f2", m)}" opacity="${(.45 + .5 * m).toFixed(2)}"/>`;
        if (!i) s += `<rect x="${x - 18}" y="100" width="36" height="10" rx="3" fill="#a87a4a"/>`;
        s += T(x, 236, lab, { size: 10, fill: "var(--muted)" }) + `</g>`;
      });
      s += T(340, 138, "lime water", { size: 10.5, fill: "var(--ink)" });
      s += T(210, 14, P.lx || `Kept in the dark · ${Math.round(h)} h`, { size: 12, fill: "var(--muted)" });
    } else if (P.mode === "tubes") {
      const k = kc(h / 3, 0, 1), base = "#d9534f";
      const T4 = [["A", "snail", kmix(base, "#e8c53a", k), "more CO₂"], ["B", "plant", kmix(base, "#8a4fb0", k), "less CO₂"], ["C", "snail + plant", kmix(base, "#cf6a4a", k * .5), "about the same"], ["D", "only water", base, "no change"]];
      T4.forEach(([n, lab, col, res], i) => {
        const x = 60 + i * 100;
        s += `<g${kh(hl, n)}><rect x="${x - 20}" y="40" width="40" height="170" rx="18" fill="rgba(200,230,255,.08)" stroke="#cfe3ef" stroke-width="2"/><rect x="${x - 18}" y="84" width="36" height="124" rx="16" fill="${col}" opacity=".75"/>`;
        if (/plant/.test(lab)) for (let j = 0; j < 3; j++) s += `<path d="M${x - 8 + j * 8} 204 Q${x - 14 + j * 8} 170 ${x - 6 + j * 8} 120" stroke="#2f9e4a" stroke-width="3" fill="none"/>`;
        if (/snail/.test(lab)) s += `<g transform="translate(${x + (lab === "snail" ? 0 : 6)} 186)"><ellipse cx="0" cy="10" rx="13" ry="4" fill="#c9a27a"/><circle cx="2" cy="2" r="9" fill="#a0603a"/><path d="M2 2 m-5 0 a5 5 0 1 0 5 -5" stroke="#f4d9b0" stroke-width="1.6" fill="none"/></g>`;
        s += T(x, 30, n, { size: 15 }) + T(x, 226, lab, { size: 10.5, fill: "var(--muted)" });
        if (h > 0 && sh.has("what")) s += T(x, 70, res, { size: 10.5, fill: "#fff" });
        s += `</g>`;
      });
      s += ksun(404, 16, 8, 1);
    } else {
      const sp = KSPEED[Math.round(kc(P.temp, 0, 2))], p = kc(h * sp / 20, 0, 1), red = "#d6283c";
      [[70, "A", 0], [190, "B", 1]].forEach(([x, n, ink]) => {
        const q = ink ? p : 0;
        s += `<g${kh(hl, n)}><path d="M${x - 34} 140 L${x - 28} 228 L${x + 28} 228 L${x + 34} 140" fill="rgba(200,230,255,.08)" stroke="#cfe3ef" stroke-width="2"/><path d="M${x - 31} 196 L${x - 29} 226 L${x + 29} 226 L${x + 31} 196Z" fill="${ink ? "rgba(214,40,60,.75)" : "rgba(98,182,232,.35)"}"/>`;
        s += `<path d="M${x} 222 L${x} 56" stroke="#5f9a4a" stroke-width="6" stroke-linecap="round"/>`;
        if (q > 0) s += `<path d="M${x} 222 L${x} ${(222 - 166 * q).toFixed(1)}" stroke="${red}" stroke-width="2.4"/>`;
        [[118, 1], [96, -1], [150, -1]].forEach(([y, sd]) => { s += `<path d="${kleaf(x + sd * 22, y, 40, 10)}" fill="#3a9e4a"/>`; if (q > .55) s += `<path d="M${x} ${y} L${x + sd * 40} ${y}" stroke="${red}" stroke-width="1.6" opacity="${kc((q - .55) * 3, 0, 1).toFixed(2)}"/>`; });
        const pet = ink ? kmix("#ffffff", "#ff8aa0", kc((q - .8) * 5, 0, 1)) : "#ffffff";
        for (let j = 0; j < 5; j++) { const a = j * 1.2566; s += `<ellipse cx="${(x + Math.cos(a) * 10).toFixed(1)}" cy="${(48 + Math.sin(a) * 10).toFixed(1)}" rx="8" ry="6" fill="${pet}" transform="rotate(${(a * 57.3).toFixed(0)} ${(x + Math.cos(a) * 10).toFixed(1)} ${(48 + Math.sin(a) * 10).toFixed(1)})"/>`; }
        s += `<circle cx="${x}" cy="48" r="4" fill="var(--mari)"/>` + T(x - 46, 160, n, { size: 15 }) + T(x, 240 - 2, ink ? "water + red ink" : "plain water", { size: 10, fill: "var(--muted)" }) + `</g>`;
      });
      // thermometer
      const tc = ["var(--sky)", "var(--teal)", "var(--red)"][Math.round(kc(P.temp, 0, 2))];
      s += `<rect x="258" y="150" width="8" height="56" rx="4" fill="rgba(255,255,255,.12)" stroke="#cfe3ef"/><rect x="260" y="${206 - 16 - 16 * Math.round(kc(P.temp, 0, 2))}" width="4" height="${16 + 16 * Math.round(kc(P.temp, 0, 2))}" fill="${tc}"/><circle cx="262" cy="210" r="7" fill="${tc}"/>` + T(262, 142, ["cold", "room", "warm"][Math.round(kc(P.temp, 0, 2))], { size: 10.5, fill: tc });
      if (kn(P.cut) > 0) {
        const cx = 350, cy = 104;
        s += `<g${kh(hl, "cut")}><line x1="190" y1="70" x2="${cx - 52}" y2="${cy}" stroke="var(--muted)" stroke-dasharray="3 4"/><circle cx="${cx}" cy="${cy}" r="54" fill="#7fbf5a" stroke="#3d7a2a" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="30" fill="#e8f2d8"/>`;
        for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, bx = cx + Math.cos(a) * 38, by = cy + Math.sin(a) * 38; s += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="9" fill="#f2e3a0"/><circle cx="${(cx + Math.cos(a) * 34).toFixed(1)}" cy="${(cy + Math.sin(a) * 34).toFixed(1)}" r="5" fill="${p > .3 ? red : "#9ab07a"}"/>`; }
        s += `</g>` + T(cx, cy + 4, "cut end", { size: 11, fill: "#2a3a1a" }) + T(cx, cy + 72, sh.has("why") ? "red dots = xylem" : "red dots = ?", { size: 11, fill: red }) + T(cx, cy + 88, sh.has("why") ? "yellow = phloem" : "yellow = ?", { size: 11, fill: "#f2e3a0" });
      }
      s += T(210, 14, P.lx || `${Math.round(h)} hours later`, { size: 12, fill: "var(--muted)" });
    }
    s += "</svg>";
    const hp = kn(P.hours);
    let what, why;
    if (P.mode === "flask") { what = hp <= 0 ? "Both test tubes of lime water are clear." : `Lime water connected to the flask is ${hp >= 16 ? "milky" : "turning milky"}; the other stays clear.`; why = "The germinating seeds respire and give out carbon dioxide, which turns lime water milky."; }
    else if (P.mode === "tubes") { what = hp <= 0 ? "All four start with the same indicator colour." : "A: more CO₂ · B: less CO₂ (in light) · C: about the same · D: no change"; why = "The snail respires (adds CO₂); the plant in light uses CO₂ for photosynthesis; D is the control."; }
    else { const pp = kc(hp * KSPEED[Math.round(kc(P.temp, 0, 2))] / 20, 0, 1); what = pp <= 0 ? "Both twigs look the same." : `Twig B: red colour has reached ${pp >= 1 ? "the stem, leaves and flower" : pp > .55 ? "the stem and leaves" : Math.round(pp * 100) + "% up the stem"}. Twig A stays white.`; why = "Water (with ink or minerals dissolved in it) moves up through thin tubes called xylem."; }
    return { svg: s, reads: { what, why } };
  }
};

/* =========================================================
   6. k7s10_plant3d — a 3D plant: water rises in the xylem, food moves in the phloem, gases at the leaves
   params: sun 1 (day) / 0 (night)    readouts: now, xylem, phloem    parts: "xylem", "phloem", "leaf", "root"
   ========================================================= */
SIM_DEF.k7s10_plant3d = {
  def: { sun: 1 },
  rng: { sun: () => [0, 1, 1] },
  lab: { sun: "Night 0 · Day 1" },
  reads: { now: "Leaves right now", xylem: "Xylem", phloem: "Phloem" },
  readouts(P) {
    const d = kn(P.sun) >= .5;
    return { now: d ? "Photosynthesis (and respiration): CO₂ in, O₂ out through stomata" : "Respiration only: O₂ in, CO₂ out — no food is made at night",
      xylem: "carries water and minerals up from the roots (blue)", phloem: "carries food from the leaves to all parts — stored in roots and seeds (orange)" };
  },
  init(stage, I) {
    const g = make3D(stage, { height: 320, dist: 7.4, phi: 1.0, theta: 0.5, auto: 0.18, target: [0, 1.5, 0], hint: "Drag to turn the plant" });
    if (!g) return null;
    const { THREE, root } = g;
    const M = (c, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: .7 }, o));
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.1, 1.1, 32, 1, true), M(0xb8643a, { side: THREE.DoubleSide, transparent: true, opacity: .35 })); pot.position.y = -0.55; root.add(pot);
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(1.48, 1.48, .06, 32), M(0x4a2e18, { transparent: true, opacity: .55 })); soil.position.y = 0; root.add(soil);
    const stemM = M(0x5f9a4a, { transparent: true, opacity: .45 });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(.09, .13, 3.6, 14), stemM); stem.position.y = 1.8; root.add(stem);
    const rootM = M(0xd9c7a0, { transparent: true, opacity: .8 });
    const tips = [];
    for (let i = 0; i < 5; i++) { const a = i * 1.2566, tip = new THREE.Vector3(Math.cos(a) * .9, -0.95, Math.sin(a) * .9); tips.push(tip); const len = tip.length(); const r = new THREE.Mesh(new THREE.CylinderGeometry(.025, .05, len, 6), rootM); r.position.copy(tip.clone().multiplyScalar(.5)); r.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tip.clone().normalize()); root.add(r); }
    const leafM = M(0x2f9e4a, { side: THREE.DoubleSide, emissive: 0x0a3a14, emissiveIntensity: .3 });
    const leafShape = new THREE.Shape(); leafShape.moveTo(0, 0); leafShape.bezierCurveTo(.3, .35, .9, .3, 1.3, 0); leafShape.bezierCurveTo(.9, -.3, .3, -.35, 0, 0);
    const leafG = new THREE.ShapeGeometry(leafShape, 12);
    const leaves = [];
    for (let i = 0; i < 6; i++) { const y = 1.2 + i * .45, a = i * 2.4; const L = new THREE.Mesh(leafG, leafM); L.position.set(0, y, 0); L.rotation.set(-Math.PI / 2 + .35, 0, 0); L.scale.setScalar(1.4); const holder = new THREE.Object3D(); holder.rotation.y = a; holder.add(L); root.add(holder); const end = new THREE.Vector3(Math.cos(-a) * 1.4, y + .45, Math.sin(-a) * 1.4); leaves.push({ y, a, end, holder }); }
    const flower = new THREE.Mesh(new THREE.SphereGeometry(.22, 14, 10), M(0xffffff, { emissive: 0x332a10 })); flower.position.y = 3.7; root.add(flower);
    const sunM = new THREE.MeshBasicMaterial({ color: 0xffc43d }); const sun = new THREE.Mesh(new THREE.SphereGeometry(.4, 18, 12), sunM); sun.position.set(-3.2, 4.6, -1); root.add(sun);
    const pathOf = (i, up) => { const lf = leaves[i % leaves.length], tp = tips[i % tips.length], off = up ? .05 : -.05; const p = [tp.clone(), new THREE.Vector3(off, -0.05, 0), new THREE.Vector3(off, lf.y, 0), lf.end.clone()]; return up ? p : p.reverse(); };
    const at = (pts, u) => { const n = pts.length - 1, k = Math.min(n - 1e-6, u * n), j = Math.floor(k); return pts[j].clone().lerp(pts[j + 1], k - j); };
    const blueM = new THREE.MeshBasicMaterial({ color: 0x4fb3ff }), orM = new THREE.MeshBasicMaterial({ color: 0xffa531 });
    const dotG = new THREE.SphereGeometry(.06, 8, 6), parts = [];
    for (let i = 0; i < 36; i++) { const up = i % 2 === 0, m = new THREE.Mesh(dotG, up ? blueM : orM); root.add(m); parts.push({ m, up, path: pathOf(Math.floor(i / 2), up), u: (i * .137) % 1 }); }
    const co2M = new THREE.MeshBasicMaterial({ color: 0xcfd8e3 }), o2M = new THREE.MeshBasicMaterial({ color: 0x35c29a }), gasG = new THREE.SphereGeometry(.07, 8, 6), gas = [];
    for (let i = 0; i < 18; i++) { const m = new THREE.Mesh(gasG, co2M); root.add(m); gas.push({ m, lf: leaves[i % leaves.length], inw: i % 2 === 0, u: (i * .21) % 1 }); }
    const lX = g.label("xylem ↑ water", [.5, .6, 0], "plain"), lP = g.label("phloem ↓ food", [-.6, 2.4, 0], "plain"), lL = g.label("leaf: food factory", [1.3, 3.6, 0], "plain"), lR = g.label("roots", [1.1, -1, 0], "plain");
    const st = { day: kn(I.sun) >= .5, hl: null };
    g.onFrame((t, dt) => {
      const sp = RM ? 0 : dt;
      parts.forEach(p => { p.u = (p.u + sp * (p.up ? .16 : .12) * (st.day || !p.up ? 1 : .5)) % 1; p.m.position.copy(at(p.path, p.u)); const big = (st.hl === "xylem" && p.up) || (st.hl === "phloem" && !p.up) ? 1.8 : 1; p.m.scale.setScalar(big); });
      gas.forEach(q => { q.u = (q.u + sp * .25) % 1; const out = new THREE.Vector3(Math.cos(-q.lf.a) * 1.9, q.lf.y + .9, Math.sin(-q.lf.a) * 1.9); const a = q.inw ? out : q.lf.end, b = q.inw ? q.lf.end : out; q.m.position.copy(a.clone().lerp(b, q.u)); const isCO2 = st.day ? q.inw : !q.inw; q.m.material = isCO2 ? co2M : o2M; });
      leafM.emissiveIntensity = st.hl === "leaf" ? .6 + .4 * Math.sin(t * 7) : st.day ? .3 : .05;
      rootM.opacity = st.hl === "root" ? .5 + .5 * Math.abs(Math.sin(t * 6)) : .8;
      sun.visible = st.day;
    });
    return {
      update(D, P, sh, hl) { st.day = kn(P.sun) >= .5; st.hl = hl; lX.show(sh.has("xylem")); lP.show(sh.has("phloem")); lL.show(sh.has("now")); lR.show(true); lL.set(st.day ? "leaf: food factory" : "leaf: resting (night)"); },
      dispose() { g.dispose(); }
    };
  }
};

/* =========================================================
   SCENE — a glasshouse nursery in the misty hills of Wayanad, Kerala
   ========================================================= */
let kw = null;
function kwInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  kw = { W, H,
    hills: [0, 1, 2].map(l => Array.from({ length: 9 }, (_, i) => ({ x: i * W / 8, h: rnd(.1, .22) * H * (1 - l * .22) }))),
    bushes: Array.from({ length: Math.ceil(W / 46) + 2 }, (_, i) => ({ x: i * 46 + rnd(-6, 6), r: rnd(18, 26) })),
    flies: Array.from({ length: 5 }, () => ({ x: rnd(0, W), y: rnd(H * .3, H * .7), ph: rnd(0, 6.28), c: ["#f4a51c", "#e04a86", "#62b6e8"][Math.floor(rnd(0, 3))] })),
    mist: Array.from({ length: 6 }, () => ({ x: rnd(0, W), y: rnd(H * .45, H * .62), w: rnd(160, 320), s: rnd(.08, .2) })) };
}
SCENES.k7s10_glasshouse = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!kw || kw.W !== W || kw.H !== H) kwInit(W, H);
  const gy = H * .8;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#0d2a3e"); g.addColorStop(.6, "#1d4a52"); g.addColorStop(1, "#2f6a5a"); c.fillStyle = g; c.fillRect(0, 0, W, H);
  // sun with slow rays
  const sx = W * .78, sy = H * .16, sr = Math.min(W, H) * .05;
  const gl = c.createRadialGradient(sx, sy, sr * .5, sx, sy, sr * 4); gl.addColorStop(0, "rgba(255,214,110,.45)"); gl.addColorStop(1, "rgba(255,214,110,0)"); c.fillStyle = gl; c.beginPath(); c.arc(sx, sy, sr * 4, 0, 6.28); c.fill();
  c.save(); c.translate(sx, sy); c.rotate(t / 9000); c.strokeStyle = "rgba(255,214,110,.35)"; c.lineWidth = 3; for (let i = 0; i < 12; i++) { c.rotate(Math.PI / 6); c.beginPath(); c.moveTo(sr * 1.3, 0); c.lineTo(sr * 1.9, 0); c.stroke(); } c.restore();
  c.fillStyle = "#ffd36b"; c.beginPath(); c.arc(sx, sy, sr, 0, 6.28); c.fill();
  // layered hills
  ["#1a3d3a", "#174a3a", "#1b5a3c"].forEach((col, l) => { const base = H * (.5 + l * .1); c.fillStyle = col; c.beginPath(); c.moveTo(0, gy); kw.hills[l].forEach((p, i) => { const nx = kw.hills[l][i + 1]; if (nx) c.quadraticCurveTo(p.x, base - p.h, (p.x + nx.x) / 2, base - (p.h + nx.h) / 2); }); c.lineTo(W, base); c.lineTo(W, gy); c.closePath(); c.fill(); });
  // drifting mist
  kw.mist.forEach(m => { if (!RM) { m.x += m.s; if (m.x > W + m.w) m.x = -m.w; } const mg = c.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.w / 2); mg.addColorStop(0, "rgba(230,245,240,.13)"); mg.addColorStop(1, "rgba(230,245,240,0)"); c.fillStyle = mg; c.fillRect(m.x - m.w / 2, m.y - m.w / 2, m.w, m.w); });
  // glasshouse
  const gx = W * .12, gw = Math.min(W * .5, 520), gh = H * .22, top = gy - gh;
  c.fillStyle = "rgba(170,230,220,.13)"; c.beginPath(); c.moveTo(gx, gy); c.lineTo(gx, top); c.lineTo(gx + gw / 2, top - gh * .45); c.lineTo(gx + gw, top); c.lineTo(gx + gw, gy); c.closePath(); c.fill();
  c.strokeStyle = "rgba(220,245,240,.45)"; c.lineWidth = 2; c.stroke();
  c.lineWidth = 1; c.strokeStyle = "rgba(220,245,240,.22)"; for (let x = gx + gw / 8; x < gx + gw; x += gw / 8) { c.beginPath(); c.moveTo(x, gy); c.lineTo(x, top - (gh * .45) * (1 - Math.abs(x - gx - gw / 2) / (gw / 2))); c.stroke(); }
  c.beginPath(); c.moveTo(gx, top + gh * .45); c.lineTo(gx + gw, top + gh * .45); c.stroke();
  // shine sweeping across the glass
  const sw = ((t / 6000) % 1.6) * gw; c.fillStyle = "rgba(255,255,255,.06)"; c.beginPath(); c.moveTo(gx + sw, gy); c.lineTo(gx + sw + 30, gy); c.lineTo(gx + sw + 80, top); c.lineTo(gx + sw + 50, top); c.closePath(); c.fill();
  // seedlings in trays inside, swaying
  for (let i = 0; i < 10; i++) { const x = gx + gw * (.08 + i * .088), sway = Math.sin(t / 1300 + i) * 3; c.fillStyle = "#8a4a2a"; c.fillRect(x - 9, gy - 14, 18, 14); c.strokeStyle = "#5fbf6a"; c.lineWidth = 2; c.beginPath(); c.moveTo(x, gy - 14); c.quadraticCurveTo(x + sway, gy - 30, x + sway, gy - 40 - (i % 3) * 6); c.stroke(); c.fillStyle = "#4fae5a"; c.beginPath(); c.ellipse(x + sway + 5, gy - 38 - (i % 3) * 6, 7, 3, -.5, 0, 6.28); c.ellipse(x + sway - 5, gy - 34 - (i % 3) * 6, 7, 3, .5, 0, 6.28); c.fill(); }
  // ground + tea bushes
  c.fillStyle = "#16362a"; c.fillRect(0, gy, W, H - gy);
  kw.bushes.forEach((b, i) => { c.fillStyle = i % 2 ? "#1f5a34" : "#24663a"; c.beginPath(); c.arc(b.x, gy + 20, b.r, Math.PI, 0); c.fill(); c.fillStyle = "rgba(140,220,120,.25)"; c.beginPath(); c.arc(b.x - 4, gy + 12, b.r * .4, 0, 6.28); c.fill(); });
  // butterflies
  kw.flies.forEach(f => { if (!RM) { f.x += .5 + Math.sin(t / 900 + f.ph) * .6; f.y += Math.sin(t / 500 + f.ph) * .5; if (f.x > W + 20) f.x = -20; } const w = Math.abs(Math.sin(t / 120 + f.ph)) * 7 + 2; c.fillStyle = f.c; c.beginPath(); c.ellipse(f.x - w / 2, f.y, w / 2, 5, 0, 0, 6.28); c.ellipse(f.x + w / 2, f.y, w / 2, 5, 0, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(4,12,20,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Hara, the Indian chameleon gardener (with a tiny watering can)
   ========================================================= */
GUIDES.k7s10_chameleon = () => `<svg class="guide chameleon" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="34" ry="4" fill="#000" opacity=".25"/>
  <path d="M8 104 Q60 96 114 104" stroke="#7a4a24" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M100 100 l8 -10 M104 101 l10 2" stroke="#5a9a3a" stroke-width="3" stroke-linecap="round"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="3s" repeatCount="indefinite"/>
    <path d="M30 84 Q14 86 14 72 Q14 60 26 62 Q34 64 32 72 Q30 78 24 74" stroke="#3fae5a" stroke-width="7" fill="none" stroke-linecap="round">
      <animate attributeName="d" values="M30 84 Q14 86 14 72 Q14 60 26 62 Q34 64 32 72 Q30 78 24 74;M30 84 Q12 88 13 74 Q13 61 25 61 Q34 63 32 72 Q30 79 23 75;M30 84 Q14 86 14 72 Q14 60 26 62 Q34 64 32 72 Q30 78 24 74" dur="4s" repeatCount="indefinite"/>
    </path>
    <path d="M28 88 Q34 58 64 56 Q88 56 92 76 Q92 92 72 94 L40 94 Q28 94 28 88Z" fill="#3fae5a"/>
    <path d="M34 66 Q48 52 64 56" stroke="#2c8a44" stroke-width="3" fill="none"/>
    <path d="M40 78 Q50 72 60 78 Q70 84 80 78" stroke="#f4a51c" stroke-width="2.5" fill="none" opacity=".8"/>
    <path d="M44 94 L40 103 M54 94 L56 103 M74 94 L72 103 M82 92 L86 102" stroke="#2c8a44" stroke-width="4" stroke-linecap="round"/>
    <path d="M70 58 Q80 40 98 46 Q112 52 108 64 Q104 74 90 74 Q76 74 70 66Z" fill="#4cc068"/>
    <path d="M74 54 Q84 36 96 44" stroke="#2c8a44" stroke-width="2.5" fill="none"/>
    <path d="M98 70 Q104 70 108 66" stroke="#15202a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="92" cy="56" r="9" fill="#e9f7c8" stroke="#2c8a44" stroke-width="2"/>
    <circle cx="94" cy="56" r="3.6" fill="#15202a"><animate attributeName="cx" values="94;89;94;96;94" dur="5s" repeatCount="indefinite"/></circle>
    <circle cx="80" cy="66" r="3" fill="#ff7aa2" opacity=".5"/>
  </g>
  <g transform="translate(8 34)">
    <path d="M14 16 L34 16 L32 36 L16 36Z" fill="#62b6e8"/><path d="M32 20 L44 10" stroke="#62b6e8" stroke-width="3.5" stroke-linecap="round"/><path d="M16 14 Q24 4 32 14" stroke="#3a8ac0" stroke-width="2.5" fill="none"/>
    <circle cx="46" cy="12" r="1.6" fill="#bfe4f5"><animate attributeName="cy" values="12;26" dur="1.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.2s" repeatCount="indefinite"/></circle>
  </g>
</svg>`;
})();
