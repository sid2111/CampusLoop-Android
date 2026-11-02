(function(){
/* Grade 7 Science (Curiosity) Chapter 2 — Exploring Substances: Acidic, Basic, and Neutral
   Plugin: simulations (k7s2_*), the Rang Bagh garden-lab scene, and Rangeela the chameleon guide. */

/* ---------- private helpers ---------- */
const hp = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const num = x => { const v = +x; return isFinite(v) ? v : 0; };
const hex2 = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => { t = clampN(num(t), 0, 1); const A = hex2(a), B = hex2(b); return "#" + A.map((x, i) => Math.round(x + (B[i] - x) * t).toString(16).padStart(2, "0")).join(""); };
// the indicators: c = own colour (also in neutral), ac = in acidic, ba = in basic
const IND = [
  { n: "Blue litmus", c: "#3d6fd8", ac: "#d8343f", ba: "#3d6fd8", cn: "blue", an: "red", bn: "blue" },
  { n: "Red litmus", c: "#d8343f", ac: "#d8343f", ba: "#3d6fd8", cn: "red", an: "red", bn: "blue" },
  { n: "Red rose extract", c: "#b8336a", ac: "#ee1f3c", ba: "#3f9e3a", cn: "rose pink", an: "red", bn: "green" },
  { n: "Turmeric", c: "#f2c21b", ac: "#f2c21b", ba: "#c2262c", cn: "yellow", an: "yellow", bn: "red" }
];
const indOf = i => IND[clampN(Math.round(num(i)), 0, 3)];
const resCol = (i, k) => { const I = indOf(i); return k < 0 ? I.ac : k > 0 ? I.ba : I.c; };
const resName = (i, k) => { const I = indOf(i), n = k < 0 ? I.an : k > 0 ? I.bn : I.cn; return n === I.cn ? `${n} (no change)` : `turns ${n}`; };
const resShort = (i, k) => { const I = indOf(i), n = k < 0 ? I.an : k > 0 ? I.bn : I.cn; return n === I.cn ? `stays ${n}` : `turns ${n}`; };
const NAT = k => k < 0 ? "acidic" : k > 0 ? "basic" : "neutral";
const NATCOL = k => k < 0 ? "var(--red)" : k > 0 ? "var(--sky)" : "var(--teal)";
// samples from Table 2.1 (+ a few from the exercises): [name, short, nature, own colour]
const SAMP = [
  ["Lemon juice", "Lemon", -1, "#f6ea9a"], ["Soap solution", "Soap", 1, "#e6edf5"], ["Amla juice", "Amla", -1, "#d9e7a6"],
  ["Tamarind water", "Tamarind", -1, "#b9824c"], ["Vinegar", "Vinegar", -1, "#f3f0dc"], ["Baking soda solution", "Baking soda", 1, "#f4f4f4"],
  ["Lime water", "Lime water", 1, "#eef2f4"], ["Tap water", "Tap water", 0, "#cfe8f5"], ["Washing powder solution", "Wash. powder", 1, "#dfe9ff"],
  ["Sugar solution", "Sugar", 0, "#f7f7f2"], ["Salt solution", "Salt", 0, "#f2f6f8"], ["Orange juice", "Orange", -1, "#ffb347"], ["Grape juice", "Grape", -1, "#a2558f"]
];
const smp = i => SAMP[clampN(Math.round(num(i)), 0, SAMP.length - 1)];
const rnd = seed => { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };
const dropper = (x, y, col) => `<g><rect x="${x - 5}" y="${y - 30}" width="10" height="9" rx="3" fill="#e04a86"/><rect x="${x - 3.5}" y="${y - 22}" width="7" height="16" fill="rgba(230,240,250,.85)" stroke="#9fb3c4"/><path d="M${x - 3.5} ${y - 6} L${x} ${y} L${x + 3.5} ${y - 6}Z" fill="rgba(230,240,250,.85)" stroke="#9fb3c4"/>${col ? `<rect x="${x - 2.5}" y="${y - 14}" width="5" height="8" fill="${col}"/>` : ""}</g>`;

/* =========================================================
   1. k7s2_tile — Activity 2.1: a drop of each sample on blue and red litmus pieces on a white tile
   params: n (samples tested, 0–11), red (1 = also red litmus row)
   readouts: last, groups      parts: "blue", "red", "A", "B", "C"
   ========================================================= */
SIM_DEF.k7s2_tile = {
  def: { n: 0, red: 1 },
  rng: { n: () => [0, 11, 1] },
  lab: { n: "Samples tested" },
  reads: { last: "Latest drop", groups: "Groups" },
  draw(D, P, sh, hl) {
    const dn = clampN(num(D.n), 0, 11), red = num(P.red) > 0;
    let s = `<svg viewBox="0 0 420 272">`;
    s += `<rect x="8" y="6" width="404" height="160" rx="10" fill="#f4f1ea" stroke="#cfc6b0"/>`;
    s += `<path d="M8 86h404M210 6v160" stroke="#e2dccb" stroke-width="1"/>`;
    s += `<text x="22" y="46" transform="rotate(-90 22 46)" font-size="9.5" font-weight="800" fill="#3d6fd8" text-anchor="middle" font-family="Mulish, sans-serif">BLUE</text>`;
    if (red) s += `<text x="22" y="88" transform="rotate(-90 22 88)" font-size="9.5" font-weight="800" fill="#d8343f" text-anchor="middle" font-family="Mulish, sans-serif">RED</text>`;
    for (let i = 0; i < 11; i++) {
      const cx = 46 + i * 34, f = clampN(dn - i, 0, 1), k = SAMP[i][2];
      s += `<rect x="${cx - 11}" y="28" width="22" height="30" rx="3" fill="${mix(IND[0].c, resCol(0, k), f)}"${i === 0 ? hp(hl, "blue") : ""}/>`;
      if (f > 0) s += `<ellipse cx="${cx}" cy="43" rx="${(4 + 5 * f).toFixed(1)}" ry="${(3 + 4 * f).toFixed(1)}" fill="#fff" opacity=".28"/>`;
      if (red) { s += `<rect x="${cx - 11}" y="70" width="22" height="30" rx="3" fill="${mix(IND[1].c, resCol(1, k), f)}"${i === 0 ? hp(hl, "red") : ""}/>`; if (f > 0) s += `<ellipse cx="${cx}" cy="85" rx="${(4 + 5 * f).toFixed(1)}" ry="${(3 + 4 * f).toFixed(1)}" fill="#fff" opacity=".28"/>`; }
      s += `<text x="${cx + 4}" y="112" transform="rotate(-40 ${cx + 4} 112)" font-size="9.5" font-weight="700" fill="${f >= 1 ? "#2a2418" : "#8a836f"}" text-anchor="end" font-family="Mulish, sans-serif">${SAMP[i][1]}</text>`;
    }
    // highlight the whole row if asked
    if (hl === "blue") s += `<rect x="30" y="24" width="378" height="38" rx="6" fill="none" stroke="var(--mari)" stroke-width="3" class="hl" data-part="blue"/>`;
    if (hl === "red" && red) s += `<rect x="30" y="66" width="378" height="38" rx="6" fill="none" stroke="var(--mari)" stroke-width="3" class="hl" data-part="red"/>`;
    if (dn > 0 && dn < 11) { const j = Math.min(10, Math.floor(dn)); s += dropper(46 + j * 34, 24, SAMP[j][3]); }
    // the three groups
    const G = [[-1, "A", "blue → red"], [1, "B", "red → blue"], [0, "C", "no change"]];
    G.forEach(([k, g, rule], gi) => {
      const x = 8 + gi * 137, items = SAMP.slice(0, 11).filter((r, i) => r[2] === k && dn - i >= 1);
      s += `<rect x="${x}" y="176" width="130" height="92" rx="9" fill="rgba(255,255,255,.05)" stroke="${NATCOL(k)}" stroke-width="1.6"${hp(hl, g)}/>`;
      s += T(x + 65, 192, `Group ${g}${sh.has("groups") ? " · " + NAT(k) : ""}`, { size: 11.5, fill: NATCOL(k) });
      s += T(x + 65, 205, rule, { size: 9.5, fill: "var(--muted)" });
      items.forEach((r, j) => { s += T(x + 65, 220 + j * 12.5, r[0].replace(" solution", " soln."), { size: 10, w: 600 }); });
    });
    s += "</svg>";
    const nn = Math.round(num(P.n));
    let last = "Put one drop of each sample on the litmus pieces.";
    if (nn > 0) { const r = SAMP[nn - 1]; last = `${r[0]}: blue litmus ${resName(0, r[2])}${red ? ", red litmus " + resName(1, r[2]) : ""} → ${NAT(r[2])}`; }
    const grp = k => SAMP.slice(0, nn).filter(r => r[2] === k).map(r => r[1]).join(", ") || "—";
    return { svg: s, reads: { last, groups: `A (acidic): ${grp(-1)}; B (basic): ${grp(1)}; C (neutral): ${grp(0)}` } };
  }
};

/* =========================================================
   2. k7s2_tube — Activity 2.4: drops of a sample added to an indicator in test tubes A and B
   params: ind (0 blue litmus, 1 red litmus, 2 red rose, 3 turmeric), sA, sB (sample index; sB −1 = one tube), d (drops)
   readouts: A, B      parts: "A", "B", "extract"
   ========================================================= */
function tubeSvg(x, top, bot, col, lvl, tag, hl, part) {
  const w = 44, r = w / 2, ly = bot - (bot - top) * lvl;
  let s = `<clipPath id="k7s2c${part}"><path d="M${x - r} ${top} V${bot - r} A${r} ${r} 0 0 0 ${x + r} ${bot - r} V${top}Z"/></clipPath>`;
  s += `<rect x="${x - r}" y="${ly.toFixed(1)}" width="${w}" height="${(bot - ly + 2).toFixed(1)}" fill="${col}" clip-path="url(#k7s2c${part})"/>`;
  s += `<ellipse cx="${x}" cy="${ly.toFixed(1)}" rx="${r - 1}" ry="3" fill="#fff" opacity=".25" clip-path="url(#k7s2c${part})"/>`;
  s += `<path d="M${x - r} ${top} V${bot - r} A${r} ${r} 0 0 0 ${x + r} ${bot - r} V${top}" fill="rgba(220,235,250,.08)" stroke="#cfe2f0" stroke-width="2.2"${hp(hl, part)}/>`;
  s += `<rect x="${x - r - 4}" y="${top - 4}" width="${w + 8}" height="6" rx="3" fill="#cfe2f0"/>`;
  s += `<path d="M${x - r + 7} ${top + 12} V${bot - r - 4}" stroke="#fff" stroke-width="3" opacity=".35" stroke-linecap="round"/>`;
  s += T(x, top + 26, tag, { size: 15, fill: "#fff" });
  return s;
}
SIM_DEF.k7s2_tube = {
  def: { ind: 2, sA: 0, sB: 1, d: 0, lx: "" },
  rng: { d: () => [0, 30, 1], sA: () => [0, 12, 1] },
  lab: { d: "Drops of sample added", sA: "Sample in tube A (no.)" },
  reads: { A: "Tube A", B: "Tube B" },
  draw(D, P, sh, hl) {
    const I = indOf(P.ind), dd = clampN(num(D.d), 0, 30), f = clampN(dd / 12, 0, 1), two = num(P.sB) >= 0;
    const xs = two ? [130, 290] : [210], ss = two ? [P.sA, P.sB] : [P.sA];
    let s = `<svg viewBox="0 0 420 258">`;
    s += T(210, 20, P.lx || `${I.n} + ${Math.round(dd)} drop${Math.round(dd) === 1 ? "" : "s"} of sample`, { size: 13, fill: "var(--muted)" });
    // stand
    s += `<rect x="40" y="196" width="340" height="14" rx="4" fill="#8a5a2b"/><rect x="52" y="210" width="10" height="26" fill="#6e4520"/><rect x="358" y="210" width="10" height="26" fill="#6e4520"/><rect x="40" y="96" width="340" height="10" rx="4" fill="#8a5a2b"/>`;
    xs.forEach((x, i) => {
      const r = smp(ss[i]), col = mix(I.c, resCol(P.ind, r[2]), f), lvl = 0.34 + 0.4 * dd / 30, part = i ? "B" : "A";
      s += tubeSvg(x, 58, 200, col, lvl, part, hl, part);
      // dropper with the sample
      s += dropper(x, 50, r[3]);
      s += T(x, 30 + 0, "", {});
      const fr = dd % 1; if (fr > 0.05 && fr < 0.95) s += `<ellipse cx="${x}" cy="${(52 + fr * 70).toFixed(1)}" rx="3" ry="4" fill="${r[3]}" stroke="#9fb3c4" stroke-width=".8"/>`;
      s += T(x, 226, r[1] === "Wash. powder" ? "Washing powder" : r[0].replace(" solution", " soln."), { size: 12 });
      if (sh.has(part)) s += T(x, 244, dd >= 6 ? `${resName(P.ind, r[2]).replace(" (no change)", ", no change")}` : "add more drops…", { size: 12, fill: dd >= 6 ? NATCOL(r[2]) : "var(--muted)" });
    });
    // extract bottle on the side
    s += `<g${hp(hl, "extract")}><rect x="${two ? 196 : 300}" y="140" width="28" height="44" rx="6" fill="${I.c}" stroke="#cfe2f0" stroke-width="1.5"/><rect x="${two ? 202 : 306}" y="130" width="16" height="12" rx="2" fill="#cfe2f0"/></g>`;
    s += T(two ? 210 : 314, 192, "", {});
    s += "</svg>";
    const rd = i => { const r = smp(ss[i]); return `${r[0]}: ${I.n.toLowerCase()} ${resName(P.ind, r[2])} → ${NAT(r[2])}`; };
    return { svg: s, reads: { A: rd(0), B: two ? rd(1) : "—" } };
  }
};

/* =========================================================
   3. k7s2_message — a hidden message written with one sample, revealed by an indicator
   params: ind (indicator sprayed / on the paper), ink (sample used for writing), sp (0–1 spray coverage), msg, lx
   readouts: see      parts: "paper", "ink", "spray"
   ========================================================= */
SIM_DEF.k7s2_message = {
  def: { ind: 3, ink: 1, sp: 0, msg: "WELCOME TO SCIENCE", lx: "" },
  rng: { sp: () => [0, 1, 0.05], ink: () => [0, 12, 1] },
  lab: { sp: "Spray the sheet", ink: "Ink sample (no.)" },
  reads: { see: "What appears" },
  draw(D, P, sh, hl) {
    const I = indOf(P.ind), r = smp(P.ink), sp = clampN(num(D.sp), 0, 1), lc = resCol(P.ind, r[2]), vis = lc !== I.c;
    const msg = String(P.msg || "");
    let lines = [msg];
    if (msg.length > 20) { const mid = msg.length / 2; let best = -1; for (let i = 0; i < msg.length; i++) if (msg[i] === " " && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i; if (best > 0) lines = [msg.slice(0, best), msg.slice(best + 1)]; }
    const fs = Math.min(30, 500 / Math.max(...lines.map(l => l.length), 8));
    const txt = fill => lines.map((l, i) => `<text x="195" y="${(112 + (i - (lines.length - 1) / 2) * fs * 1.25).toFixed(1)}" font-size="${fs.toFixed(1)}" font-weight="900" fill="${fill}" text-anchor="middle" font-family="Baloo 2, Mulish, sans-serif">${esc(l)}</text>`).join("");
    let s = `<svg viewBox="0 0 420 246">`;
    s += `<defs><clipPath id="k7s2sp"><rect x="30" y="24" width="330" height="${(160 * sp).toFixed(1)}"/></clipPath></defs>`;
    s += `<g transform="rotate(-1.2 195 104)"><rect x="30" y="24" width="330" height="160" rx="4" fill="#fbfaf5" stroke="#d9d3c2"${hp(hl, "paper")}/>`;
    s += `<g${hp(hl, "ink")}>${txt("#f1efe6")}</g>`;
    s += `<g clip-path="url(#k7s2sp)"><rect x="30" y="24" width="330" height="160" fill="${I.c}" opacity=".92"/>`;
    s += txt(lc);
    const rr = rnd(7); for (let i = 0; i < 40; i++) s += `<circle cx="${(34 + rr() * 322).toFixed(1)}" cy="${(28 + rr() * 152).toFixed(1)}" r="${(1 + rr() * 2.2).toFixed(1)}" fill="#fff" opacity=".18"/>`;
    s += `</g></g>`;
    // spray bottle at the right edge, moving down as it sprays
    const by = 20 + 150 * sp;
    s += `<g${hp(hl, "spray")}><rect x="376" y="${(by + 6).toFixed(1)}" width="26" height="40" rx="6" fill="${I.c}" stroke="#cfe2f0" stroke-width="1.5"/><rect x="380" y="${(by - 4).toFixed(1)}" width="14" height="10" fill="#cfe2f0"/><rect x="368" y="${(by - 2).toFixed(1)}" width="12" height="5" fill="#cfe2f0"/></g>`;
    if (sp > 0.02 && sp < 0.98) for (let i = 0; i < 7; i++) s += `<circle cx="${(362 - i * 7).toFixed(1)}" cy="${(by + (i % 3 - 1) * 5).toFixed(1)}" r="1.8" fill="${I.c}" opacity="${(0.8 - i * 0.1).toFixed(2)}"/>`;
    s += T(195, 206, P.lx || `Written with ${r[0].toLowerCase()} · sprayed with ${I.n.toLowerCase()}`, { size: 12, fill: "var(--muted)" });
    const ln = r[2] < 0 ? I.an : r[2] > 0 ? I.bn : I.cn;
    if (sh.has("see") && sp > 0.5) s += T(195, 230, vis ? `${ln[0].toUpperCase() + ln.slice(1)} letters on ${I.cn} paper!` : "Nothing shows: the indicator does not change", { size: 14, fill: vis ? "var(--mari)" : "var(--muted)" });
    s += "</svg>";
    const see = vis ? `${ln} letters on ${I.cn} — ${r[0].toLowerCase()} is ${NAT(r[2])}` : `no writing — ${I.n.toLowerCase()} stays ${I.cn} with ${r[0].toLowerCase()} (${NAT(r[2])})`;
    return { svg: s, reads: { see: sp < 0.5 ? "spray the sheet to find out" : see } };
  }
};

/* =========================================================
   4. k7s2_neutral — Activity 2.7: mixing acidic and basic drops with an indicator (particle model)
   params: a (acidic drops), b (basic drops), ind (0 blue litmus solution, 2 rose, 3 turmeric), lA, lB (names)
   readouts: nature, eq      parts: "tube", "eq", "heat"
   ========================================================= */
SIM_DEF.k7s2_neutral = {
  def: { a: 6, b: 0, ind: 0, lA: "Lemon juice", lB: "Lime water" },
  rng: { a: () => [0, 15, 1], b: () => [0, 15, 1] },
  lab: { a: "Acidic drops", b: "Basic drops" },
  reads: { nature: "Solution is", eq: "Neutralisation" },
  draw(D, P, sh, hl) {
    const A = Math.max(0, num(D.a)), B = Math.max(0, num(D.b)), net = B - A, I = indOf(P.ind);
    const neu = P.ind == 0 ? "#7a4fb0" : I.c;
    const col = net <= -1 ? I.ac : net < 0 ? mix(I.ac, neu, net + 1) : net < 1 ? mix(neu, I.ba, net) : I.ba;
    const pairs = Math.min(Math.round(A), Math.round(B)), ar = Math.max(0, Math.round(A) - Math.round(B)), br = Math.max(0, Math.round(B) - Math.round(A));
    let s = `<svg viewBox="0 0 420 256">`;
    // droppers for acid and base
    s += dropper(80, 44, "#f6ea9a") + T(80, 10, P.lA, { size: 11, fill: "var(--red)" });
    s += dropper(200, 44, "#eef2f4") + T(200, 10, P.lB, { size: 11, fill: "var(--sky)" });
    // the beaker
    const bx = 40, bw = 200, by = 54, bh = 160, ly = by + 40;
    s += `<rect x="${bx + 3}" y="${ly}" width="${bw - 6}" height="${by + bh - ly - 3}" rx="10" fill="${col}"/>`;
    s += `<path d="M${bx} ${by} V${by + bh - 12} Q${bx} ${by + bh} ${bx + 12} ${by + bh} H${bx + bw - 12} Q${bx + bw} ${by + bh} ${bx + bw} ${by + bh - 12} V${by}" fill="rgba(220,235,250,.06)" stroke="#cfe2f0" stroke-width="2.5"${hp(hl, "tube")}/>`;
    // particles
    const rr = rnd(3), spots = []; for (let i = 0; i < 60; i++) spots.push([bx + 18 + rr() * (bw - 36), ly + 14 + rr() * (by + bh - ly - 28)]);
    let k = 0;
    for (let i = 0; i < Math.min(ar, 15); i++, k++) { const [x, y] = spots[k]; s += `<path d="M${x.toFixed(1)} ${(y - 6).toFixed(1)} l6 10 h-12Z" fill="#ff5a5a" stroke="#fff" stroke-width="1"/>`; }
    for (let i = 0; i < Math.min(br, 15); i++, k++) { const [x, y] = spots[k]; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.5" fill="#62b6e8" stroke="#fff" stroke-width="1"/>`; }
    for (let i = 0; i < Math.min(pairs, 15); i++, k++) { const [x, y] = spots[k]; s += `<rect x="${(x - 9).toFixed(1)}" y="${(y - 4).toFixed(1)}" width="8" height="8" fill="#fff" stroke="#999" stroke-width=".6"/><path d="M${(x + 5).toFixed(1)} ${(y - 5).toFixed(1)} q4 6 0 9 q-4 -3 0 -9Z" fill="#9fd8ff"/>`; }
    // legend + counters
    const rx = 262;
    s += `<path d="M${rx} 40 l6 10 h-12Z" fill="#ff5a5a"/>` + T(rx + 12, 50, `acid left: ${ar}`, { size: 12.5, a: "start" });
    s += `<circle cx="${rx}" cy="70" r="5.5" fill="#62b6e8"/>` + T(rx + 12, 75, `base left: ${br}`, { size: 12.5, a: "start" });
    s += `<rect x="${rx - 6}" y="90" width="8" height="8" fill="#fff"/><path d="M${rx + 5} 89 q4 6 0 9 q-4 -3 0 -9Z" fill="#9fd8ff"/>` + T(rx + 14, 99, `salt + water: ${pairs}`, { size: 12.5, a: "start" });
    // thermometer
    const th = Math.min(1, pairs / 12), tx = 392;
    s += `<g${hp(hl, "heat")}><rect x="${tx - 5}" y="36" width="10" height="92" rx="5" fill="rgba(255,255,255,.12)" stroke="#cfe2f0"/><rect x="${tx - 3}" y="${(124 - 84 * (0.12 + th * 0.88)).toFixed(1)}" width="6" height="${(84 * (0.12 + th * 0.88)).toFixed(1)}" rx="3" fill="var(--red)"/><circle cx="${tx}" cy="132" r="8" fill="var(--red)"/></g>`;
    s += T(tx, 152, pairs ? "warm!" : "", { size: 11, fill: "var(--red)" });
    const nat = Math.abs(net) < 0.5 ? 0 : net < 0 ? -1 : 1;
    s += T(320, 182, sh.has("nature") ? NAT(nat).toUpperCase() : "?", { size: 20, fill: NATCOL(nat) });
    s += `<rect x="20" y="226" width="380" height="26" rx="13" fill="${pairs ? "rgba(244,165,28,.16)" : "rgba(255,255,255,.05)"}" stroke="${pairs ? "var(--mari)" : "var(--line)"}"${hp(hl, "eq")}/>`;
    s += T(210, 244, "Acid + Base → Salt + Water + Heat", { size: 14, fill: pairs ? "var(--mari)" : "var(--muted)" });
    s += "</svg>";
    const nA = Math.round(num(P.a)), nB = Math.round(num(P.b)), pn = Math.min(nA, nB), nt = nB - nA;
    return { svg: s, reads: {
      nature: `${NAT(Math.sign(nt))}: ${indOf(P.ind).n.toLowerCase()} shows ${nt < 0 ? indOf(P.ind).an : nt > 0 ? indOf(P.ind).bn : (P.ind == 0 ? "purple (in between)" : indOf(P.ind).cn)}`,
      eq: pn ? `${pn} acid–base pair${pn > 1 ? "s" : ""} became salt + water, giving out heat` : "nothing to neutralise yet" } };
  }
};

/* =========================================================
   5. k7s2_soil — neutralisation in daily life: a garden bed (mode 0) or a lake by a factory (mode 1)
   params: mode, s0 (starting nature: − acidic, + basic), L (scoops of base added), M (scoops of manure/compost), nut (1 = nutrients missing)
   readouts: nature, fix      parts: "meter", "soil", "life"
   ========================================================= */
SIM_DEF.k7s2_soil = {
  def: { mode: 0, s0: -4, L: 0, M: 0, nut: 0 },
  rng: { L: () => [0, 10, 1], M: () => [0, 10, 1] },
  lab: { L: "Base added (scoops of lime)", M: "Manure / compost (scoops)" },
  reads: { nature: "Nature now", fix: "What to do" },
  draw(D, P, sh, hl) {
    const net = num(P.s0) + num(D.L) - num(D.M), nut = num(P.nut) > 0, lake = num(P.mode) > 0;
    const h = clampN(1 - Math.abs(net) / 5, 0, 1) * (nut ? 0.45 : 1);
    let s = `<svg viewBox="0 0 420 256">`;
    // meter
    s += `<defs><linearGradient id="k7s2m" x1="0" x2="1"><stop offset="0" stop-color="#d8343f"/><stop offset=".5" stop-color="#35c29a"/><stop offset="1" stop-color="#3d6fd8"/></linearGradient></defs>`;
    s += `<rect x="40" y="16" width="340" height="14" rx="7" fill="url(#k7s2m)"${hp(hl, "meter")}/>`;
    s += T(40, 46, "acidic", { size: 11, a: "start", fill: "var(--red)" }) + T(210, 46, "neutral", { size: 11, fill: "var(--teal)" }) + T(380, 46, "basic", { size: 11, a: "end", fill: "var(--sky)" });
    const mx = 210 + clampN(net, -6, 6) * 28;
    s += `<path d="M${mx.toFixed(1)} 34 l-7 -10 h14Z" fill="#fff" stroke="#000" stroke-width="1"/><line x1="210" y1="14" x2="210" y2="32" stroke="#fff" stroke-width="1.5"/>`;
    if (!lake) {
      const soil = net < 0 ? mix("#7a4a2a", "#9a3a2a", -net / 5) : mix("#7a4a2a", "#6b6f7a", net / 5);
      s += `<rect x="20" y="186" width="380" height="60" rx="8" fill="${soil}"${hp(hl, "soil")}/>`;
      const r = rnd(11); for (let i = 0; i < 40; i++) s += `<circle cx="${(26 + r() * 368).toFixed(1)}" cy="${(192 + r() * 50).toFixed(1)}" r="${(1 + r() * 2).toFixed(1)}" fill="#000" opacity=".18"/>`;
      // lime dust and manure piles
      const Lc = Math.round(num(D.L)), Mc = Math.round(num(D.M));
      for (let i = 0; i < Math.min(Lc, 10); i++) s += `<ellipse cx="${36 + i * 14}" cy="188" rx="7" ry="3" fill="#f2f2ee"/>`;
      for (let i = 0; i < Math.min(Mc, 10); i++) s += `<ellipse cx="${384 - i * 14}" cy="188" rx="7" ry="3.5" fill="#3b2614"/>`;
      // plants
      const leaf = mix("#b59a2e", "#2f9e4a", h);
      s += `<g${hp(hl, "life")}>`;
      for (let i = 0; i < 5; i++) {
        const x = 70 + i * 70, ht = 28 + 76 * h, top = 186 - ht;
        s += `<path d="M${x} 186 Q${x + 4} ${(186 - ht / 2).toFixed(1)} ${x} ${top.toFixed(1)}" stroke="#3e7a2e" stroke-width="3" fill="none"/>`;
        for (let j = 1; j <= 3; j++) { const ly = 186 - ht * j / 3.6, sz = 8 + 10 * h, dir = j % 2 ? 1 : -1; s += `<path d="M${x} ${ly.toFixed(1)} q${dir * sz} ${(-sz * 0.9).toFixed(1)} ${dir * sz * 2} ${(-sz * 0.2).toFixed(1)} q${-dir * sz} ${(sz * 0.6).toFixed(1)} ${-dir * sz * 2} ${(sz * 0.2).toFixed(1)}Z" fill="${leaf}"/>`; }
        if (h > 0.8) s += `<circle cx="${x}" cy="${top.toFixed(1)}" r="6" fill="#e04a86"/><circle cx="${x}" cy="${top.toFixed(1)}" r="2.5" fill="#f4d03f"/>`;
        else if (h < 0.4) s += `<path d="M${x} ${top.toFixed(1)} q8 4 10 12" stroke="${leaf}" stroke-width="3" fill="none"/>`;
      }
      s += `</g>`;
    } else {
      // factory with pipe, and the lake
      s += `<rect x="16" y="70" width="70" height="70" fill="#59606e"/><rect x="28" y="44" width="14" height="30" fill="#4a505c"/><rect x="56" y="54" width="12" height="20" fill="#4a505c"/>`;
      for (let i = 0; i < 3; i++) s += `<rect x="${24 + i * 20}" y="92" width="12" height="12" fill="#f4d03f" opacity=".7"/>`;
      s += `<path d="M86 124 H118 V140" stroke="#7a808c" stroke-width="7" fill="none"/>`;
      if (num(P.s0) < 0) s += `<path d="M118 142 q-3 8 0 14" stroke="#c9c13a" stroke-width="3" fill="none"/>`;
      const water = net < 0 ? mix("#2f7fa8", "#7d8f3a", -net / 5) : mix("#2f7fa8", "#5a6fa8", net / 5);
      s += `<path d="M100 160 Q140 146 210 150 Q330 146 404 162 V246 H100Z" fill="${water}"${hp(hl, "soil")}/>`;
      const nf = Math.round(1 + 5 * h);
      s += `<g${hp(hl, "life")}>`;
      for (let i = 0; i < nf; i++) { const x = 150 + i * 42, y = 190 + (i % 2) * 26; s += `<path d="M${x} ${y} q12 -10 24 0 q-12 10 -24 0Z M${x} ${y} l-8 -6 v12Z" fill="#f4a51c"/><circle cx="${x + 18}" cy="${y - 1}" r="1.6" fill="#15202a"/>`; }
      if (h < 0.5) for (let i = 0; i < 2; i++) s += `<path d="M${330 + i * 30} 166 q12 -6 24 0 q-12 6 -24 0Z" fill="#9aa1a8" transform="rotate(180 ${342 + i * 30} 166)"/>`;
      s += `</g>`;
      const Lc = Math.round(num(D.L)); for (let i = 0; i < Math.min(Lc, 10); i++) s += `<circle cx="${130 + i * 6}" cy="${150 + (i % 2) * 4}" r="2.5" fill="#f2f2ee"/>`;
    }
    const nat = Math.abs(net) < 0.5 ? 0 : net < 0 ? -1 : 1;
    s += `<rect x="90" y="50" width="240" height="24" rx="12" fill="rgba(10,24,38,.8)"/>`;
    s += T(210, 67, sh.has("nature") ? `${lake ? "Lake water" : "Soil"}: ${NAT(nat)}${nat === 0 && nut ? " (but nutrients missing)" : ""}` : (lake ? "Lake water: ?" : "Soil: ?"), { size: 15, fill: NATCOL(nat) });
    s += "</svg>";
    const nn = num(P.s0) + num(P.L) - num(P.M), nk = nn < 0 ? -1 : nn > 0 ? 1 : 0;
    const what = lake ? (nk < 0 ? "add a basic substance to the waste before it reaches the lake" : nk > 0 ? "too basic now — add less base" : "neutral: the fish can live again")
      : (nk < 0 ? "add lime (a base) to neutralise the acid" : nk > 0 ? "add manure or compost (it releases acids)" : nut ? "neutral — the poor health is due to missing nutrients" : "neutral: the plants grow well");
    return { svg: s, reads: { nature: `${NAT(nk)}${nk ? (Math.abs(nn) >= 3 ? " (strongly)" : " (slightly)") : ""}`, fix: what } };
  }
};

/* =========================================================
   SCENE — Rang Bagh: a hill-garden science lab at twilight (Nilgiris), with lichen on trees,
   hydrangea bushes, fireflies and a glasshouse with a bubbling flask
   ========================================================= */
let kw = null;
function kwInit(W, H) {
  const r = (a, b) => a + Math.random() * (b - a);
  kw = { W, H,
    stars: Array.from({ length: Math.round(W * H / 9000) }, () => ({ x: r(0, W), y: r(0, H * .45), r: r(.3, 1.4), p: r(0, 6.28) })),
    flies: Array.from({ length: 26 }, () => ({ x: r(0, W), y: r(H * .45, H * .9), p: r(0, 6.28), s: r(.3, .9) })),
    bushes: Array.from({ length: 7 }, (_, i) => ({ x: (i + .5) * W / 7 + r(-20, 20), r: r(22, 40), ph: r(0, 6.28) })),
    bubbles: [] };
}
SCENES.k7s2_garden = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!kw || kw.W !== W || kw.H !== H) kwInit(W, H);
  const S = kw, gy = H * .8;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#0b1a2e"); g.addColorStop(.55, "#1d2f4f"); g.addColorStop(1, "#3c3f5e");
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  S.stars.forEach(s => { c.globalAlpha = .3 + .35 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // moon
  const mx = W * .82, my = H * .16; c.fillStyle = "rgba(255,240,200,.15)"; c.beginPath(); c.arc(mx, my, 46, 0, 6.28); c.fill(); c.fillStyle = "#f3e7c6"; c.beginPath(); c.arc(mx, my, 24, 0, 6.28); c.fill();
  // Nilgiri hills with tea rows
  [["#1b2f3c", .55, 70], ["#213f3a", .64, 50], ["#28503f", .72, 36]].forEach(([col, f, a], i) => {
    c.fillStyle = col; c.beginPath(); c.moveTo(0, gy); for (let x = 0; x <= W; x += 20) c.lineTo(x, H * f - Math.sin(x / (180 + i * 60) + i) * a - Math.sin(x / 70 + i * 3) * 8); c.lineTo(W, gy); c.fill();
  });
  c.strokeStyle = "rgba(90,150,90,.25)"; c.lineWidth = 2; for (let k = 0; k < 6; k++) { c.beginPath(); for (let x = 0; x <= W; x += 20) { const y = H * .72 - Math.sin(x / 180 + 2) * 36 + k * 14 + 10; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
  // ground
  c.fillStyle = "#18261c"; c.fillRect(0, gy, W, H - gy);
  // tree with lichen patches (left)
  const tx = W * .08; c.fillStyle = "#3a2a1e"; c.fillRect(tx - 10, gy - 190, 20, 190);
  c.fillStyle = "#1f4a32"; [[0, -220, 70], [-50, -180, 50], [50, -185, 55]].forEach(([a, b, r]) => { c.beginPath(); c.arc(tx + a, gy + b, r, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(170,200,150,.75)"; [[-6, -60], [4, -100], [-4, -140], [5, -30]].forEach(([a, b]) => { c.beginPath(); c.ellipse(tx + a, gy + b, 7, 5, 0, 0, 6.28); c.fill(); });
  // hydrangea bushes, gently shifting between blue (acidic soil) and pink (basic soil)
  S.bushes.forEach((b, i) => { const k = .5 + .5 * Math.sin(t / 6000 + b.ph), col = `rgb(${Math.round(90 + 140 * k)},${Math.round(120 - 20 * k)},${Math.round(220 - 70 * k)})`;
    c.fillStyle = "#1e3d26"; c.beginPath(); c.arc(b.x, gy, b.r, Math.PI, 0); c.fill();
    c.fillStyle = col; for (let j = 0; j < 4; j++) { c.beginPath(); c.arc(b.x - b.r * .5 + j * b.r * .33, gy - b.r * .55 - (j % 2) * 6, b.r * .25, 0, 6.28); c.fill(); } });
  // glasshouse lab (right)
  const gx = W * .62, gw = Math.min(260, W * .3), gh = 110;
  c.fillStyle = "rgba(160,220,255,.10)"; c.strokeStyle = "rgba(200,235,255,.45)"; c.lineWidth = 2;
  c.beginPath(); c.moveTo(gx, gy); c.lineTo(gx, gy - gh); c.lineTo(gx + gw / 2, gy - gh - 50); c.lineTo(gx + gw, gy - gh); c.lineTo(gx + gw, gy); c.closePath(); c.fill(); c.stroke();
  for (let x = gx + gw / 5; x < gx + gw; x += gw / 5) { c.beginPath(); c.moveTo(x, gy); c.lineTo(x, gy - gh); c.stroke(); }
  // bench with three glowing flasks (acid red, neutral purple, base blue/green)
  c.fillStyle = "#5a3d22"; c.fillRect(gx + 14, gy - 34, gw - 28, 6);
  ["#ee1f3c", "#7a4fb0", "#3f9e3a"].forEach((col, i) => { const fx = gx + gw * (.28 + i * .22), fy = gy - 36;
    c.fillStyle = col; c.globalAlpha = .55 + .25 * Math.sin(t / 700 + i); c.beginPath(); c.moveTo(fx - 4, fy - 30); c.lineTo(fx + 4, fy - 30); c.lineTo(fx + 14, fy); c.lineTo(fx - 14, fy); c.closePath(); c.fill(); c.globalAlpha = 1;
    if (!RM && Math.random() < .04) S.bubbles.push({ x: fx, y: fy - 32, a: .7, c: col }); });
  S.bubbles.forEach(b => { b.y -= .6; b.x += Math.sin(t / 300 + b.y) * .3; b.a -= .008; c.fillStyle = b.c; c.globalAlpha = Math.max(0, b.a); c.beginPath(); c.arc(b.x, b.y, 3, 0, 6.28); c.fill(); });
  c.globalAlpha = 1; S.bubbles = S.bubbles.filter(b => b.a > 0).slice(-40);
  // banner
  c.fillStyle = "rgba(244,165,28,.85)"; c.font = "bold 13px sans-serif"; c.textAlign = "center"; c.fillText("RANG BAGH · NATIONAL SCIENCE DAY", gx + gw / 2, gy - gh - 8); c.textAlign = "start";
  // fireflies
  S.flies.forEach(f => { if (!RM) { f.x += Math.cos(t / 1800 + f.p) * f.s; f.y += Math.sin(t / 1300 + f.p) * f.s * .6; if (f.x < 0) f.x = W; if (f.x > W) f.x = 0; }
    const a = .25 + .6 * Math.max(0, Math.sin(t / 500 + f.p * 3)); const gl = c.createRadialGradient(f.x, f.y, 0, f.x, f.y, 9); gl.addColorStop(0, `rgba(220,255,120,${a})`); gl.addColorStop(1, "rgba(220,255,120,0)"); c.fillStyle = gl; c.beginPath(); c.arc(f.x, f.y, 9, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(4,10,20,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Rangeela, the Indian chameleon with a lab dropper (her skin glides red → green → yellow)
   ========================================================= */
GUIDES.k7s2_chameleon = () => `<svg class="guide chameleon" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="36" ry="4" fill="#000" opacity=".25"/>
  <path d="M8 112 Q60 104 114 112" stroke="#7a4e26" stroke-width="7" fill="none" stroke-linecap="round"/>
  <g>
    <animate attributeName="fill" values="#3fae5a;#e2554a;#f2c21b;#3d6fd8;#3fae5a" dur="9s" repeatCount="indefinite"/>
    <path d="M30 96 Q14 100 14 86 Q14 74 26 76 Q34 78 32 86 Q30 92 24 90" fill="none" stroke="#2f8a47" stroke-width="7" stroke-linecap="round"><animate attributeName="stroke" values="#2f8a47;#b83a32;#c99a10;#2d55a8;#2f8a47" dur="9s" repeatCount="indefinite"/></path>
    <path d="M30 96 Q34 66 64 64 Q92 64 96 88 Q96 104 74 106 L44 106 Q30 106 30 96Z" fill="#3fae5a"><animate attributeName="fill" values="#3fae5a;#e2554a;#f2c21b;#3d6fd8;#3fae5a" dur="9s" repeatCount="indefinite"/></path>
    <path d="M40 80 Q60 70 84 80" stroke="#fff" stroke-width="2" fill="none" opacity=".35" stroke-dasharray="3 4"/>
    <path d="M46 104 l-4 9 M58 106 l0 8 M76 104 l4 9" stroke="#2a5d34" stroke-width="4" stroke-linecap="round"/>
  </g>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M74 66 Q80 34 100 40 Q114 46 110 62 Q106 76 86 76Z" fill="#3fae5a"><animate attributeName="fill" values="#3fae5a;#e2554a;#f2c21b;#3d6fd8;#3fae5a" dur="9s" repeatCount="indefinite"/></path>
    <path d="M80 44 Q86 26 98 32" stroke="#2a5d34" stroke-width="3" fill="none"/>
    <circle cx="96" cy="54" r="9" fill="#f2f6e8" stroke="#2a5d34" stroke-width="2"/>
    <circle cx="98" cy="54" r="3.6" fill="#15202a"><animate attributeName="cx" values="98;93;98;99;98" dur="5s" repeatCount="indefinite"/></circle>
    <path d="M90 70 Q100 72 108 66" stroke="#15202a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="86" cy="64" r="3" fill="#ff7aa2" opacity=".5"/>
    <path d="M108 66 Q118 70 116 78 Q112 80 112 74" stroke="#e04a86" stroke-width="2.5" fill="none" stroke-linecap="round"><animate attributeName="d" values="M108 66 Q110 67 110 68 Q110 68 110 68;M108 66 Q118 70 116 78 Q112 80 112 74;M108 66 Q110 67 110 68 Q110 68 110 68" keyTimes="0;.5;1" dur="3.5s" repeatCount="indefinite"/></path>
  </g>
  <g transform="rotate(-24 62 52)"><rect x="56" y="22" width="10" height="9" rx="3" fill="#e04a86"/><rect x="57.5" y="31" width="7" height="22" fill="rgba(230,240,250,.9)" stroke="#9fb3c4"/><rect x="59" y="42" width="4" height="10" fill="#ee1f3c"/><path d="M57.5 53 L61 60 L64.5 53Z" fill="rgba(230,240,250,.9)" stroke="#9fb3c4"/></g>
  <circle cx="62" cy="66" r="2.6" fill="#ee1f3c"><animate attributeName="cy" values="62;76;76" keyTimes="0;.6;1" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.6;1" dur="2s" repeatCount="indefinite"/></circle>
</svg>`;

/* =========================================================
   3D — k7s2_rack3d: a test-tube stand with three tubes (A, B, C) and an indicator added to each.
   params: ind (indicator for all), iA/iB/iC (own indicator, −1 = use ind), kA/kB/kC (nature −1/0/1), lA/lB/lC (names)
   readouts: res (colours seen), nat (nature)      parts: "A", "B", "C"
   ========================================================= */
const R3N = ["A", "B", "C"];
const r3ind = (P, i) => { const v = num(P["i" + R3N[i]]); return v >= 0 ? v : num(P.ind); };
SIM_DEF.k7s2_rack3d = {
  def: { ind: 0, iA: -1, iB: -1, iC: -1, kA: -1, kB: 0, kC: 1, lA: "A", lB: "B", lC: "C" },
  rng: { ind: () => [0, 3, 1] },
  lab: { ind: "Indicator: 0 blue litmus · 1 red litmus · 2 rose · 3 turmeric" },
  reads: { res: "Colours seen", nat: "Nature" },
  readouts(P) {
    const res = R3N.map((n, i) => `${P["l" + n]}: ${indOf(r3ind(P, i)).n.toLowerCase()} ${resName(r3ind(P, i), num(P["k" + n]))}`).join(" · ");
    const nat = R3N.map(n => `${P["l" + n]} ${NAT(num(P["k" + n]))}`).join(" · ");
    return { res, nat };
  },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 7.4, phi: 1.2, theta: 0.25, auto: 0.12, target: [0, 0.45, 0], hint: "Drag to turn the test-tube stand" });
    if (!g) return null;
    const { THREE, root } = g;
    const wood = new THREE.MeshStandardMaterial({ color: 0x8a5a2b, roughness: .8 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.25, 1.4), wood); base.position.y = -0.9; root.add(base);
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.14, 1.1), wood); shelf.position.y = 1.4; root.add(shelf);
    [-2.45, 2.45].forEach(x => { const p = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.4, 0.18), wood); p.position.set(x, 0.3, 0); root.add(p); });
    const tile = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.08, 2.6), new THREE.MeshStandardMaterial({ color: 0xf4f1ea, roughness: .6 })); tile.position.y = -1.06; root.add(tile);
    const glassM = new THREE.MeshStandardMaterial({ color: 0xdff0ff, transparent: true, opacity: .22, roughness: .05, metalness: .1, side: THREE.DoubleSide, depthWrite: false });
    const tubes = [];
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * 1.6, grp = new THREE.Group(); grp.position.set(x, 0, 0); root.add(grp);
      const gl = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 2.9, 28, 1, true), glassM); gl.position.y = 0.75; grp.add(gl);
      const gb = new THREE.Mesh(new THREE.SphereGeometry(0.36, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), glassM); gb.position.y = -0.7; grp.add(gb);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.04, 8, 28), new THREE.MeshStandardMaterial({ color: 0xcfe2f0 })); rim.rotation.x = Math.PI / 2; rim.position.y = 2.2; grp.add(rim);
      const lm = new THREE.MeshStandardMaterial({ color: 0x3d6fd8, roughness: .3, emissive: 0x111111, emissiveIntensity: .4, transparent: true, opacity: .92 });
      const liq = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.3, 28), lm); liq.position.y = -0.05; grp.add(liq);
      const lb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), lm); lb.position.y = -0.7; grp.add(lb);
      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), new THREE.MeshStandardMaterial({ color: 0xffffff })); drop.visible = false; grp.add(drop);
      const tag = g.label("", [x, 2.75, 0], "big"), out = g.label("", [x, -1.25, 1.05], "");
      tubes.push({ lm, drop, tag, out, cur: new THREE.Color(0x3d6fd8), tgt: new THREE.Color(0x3d6fd8), t0: -9, key: "" });
    }
    const lInd = g.label("", [0, 3.35, 0], "plain");
    let hl = null;
    g.onFrame((t) => {
      tubes.forEach((tb, i) => {
        const age = t - tb.t0;
        if (age < 0.6) { tb.drop.visible = true; tb.drop.position.set(0, 2.6 - age * 4.4, 0); } else tb.drop.visible = false;
        if (age > 0.5 || tb.t0 < 0) tb.cur.lerp(tb.tgt, 0.06);
        tb.lm.color.copy(tb.cur);
        tb.lm.emissiveIntensity = hl === R3N[i] ? 0.6 + 0.4 * Math.sin(t * 8) : 0.35;
      });
    });
    function apply(D, P, sh, h) {
      hl = h; const now = performance.now() / 1000;
      lInd.set(num(P.iA) >= 0 || num(P.iB) >= 0 || num(P.iC) >= 0 ? "Each tube got its own indicator" : `Indicator added: ${indOf(P.ind).n}`);
      tubes.forEach((tb, i) => {
        const n = R3N[i], ii = r3ind(P, i), k = num(P["k" + n]), key = ii + "|" + k;
        const col = resCol(ii, k);
        if (tb.key !== key) { if (tb.key) { tb.t0 = now; } else { tb.cur.set(col); } tb.key = key; tb.drop.material.color.set(indOf(ii).c); }
        tb.tgt.set(col);
        tb.tag.set(esc(String(P["l" + n])));
        const own = num(P.iA) >= 0 || num(P.iB) >= 0 || num(P.iC) >= 0;
        tb.out.set(`<div style="text-align:center;line-height:1.3">${own ? `<span style="font-size:11px;opacity:.8">${indOf(ii).n.replace("Red rose extract", "Rose extract")}</span><br>` : ""}${resShort(ii, k)}${sh.has("nat") ? `<br><b style="color:${k < 0 ? "#ef5b45" : k > 0 ? "#62b6e8" : "#35c29a"}">${NAT(k)}</b>` : ""}</div>`);
        tb.out.show(sh.has("res"));
      });
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

})();
