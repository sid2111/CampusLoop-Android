(function(){
/* Grade 7 Science (Curiosity) Chapter 1 — The Ever-Evolving World of Science
   Plugin: simulations (k7s1_*), the Varanasi ghat-at-dusk scene, and Titli the butterfly guide. */

/* ---------- private helpers ---------- */
const s1hl = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const s1n = x => { const v = +x; return isFinite(v) ? v : 0; };
const s1f = (x, d) => { const v = s1n(x); return (Math.round(v * Math.pow(10, d || 0)) / Math.pow(10, d || 0)).toFixed(d || 0); };

/* =========================================================
   1. k7s1_haldi — haldi (turmeric) paper dipped into household liquids
   params: s (liquid index 0..5), dip (0 up, 1 dipped)
   readouts: liq, res, kind      parts: "strip", "beaker"
   ========================================================= */
const S1LIQ = [
  { n: "Plain water", c: "#9fd3f0", base: false, k: "neutral", t: "no change: water is neither acidic nor basic" },
  { n: "Lemon juice", c: "#f3ef9a", base: false, k: "acidic", t: "no change: lemon juice is acidic (citric acid makes it sour)" },
  { n: "Soap solution", c: "#e8e2f6", base: true, k: "basic", t: "turns red: soap solution is basic" },
  { n: "Vinegar", c: "#f4e9cf", base: false, k: "acidic", t: "no change: vinegar is acidic (sour)" },
  { n: "Baking soda solution", c: "#f2f2f2", base: true, k: "basic", t: "turns red: baking soda solution is basic" },
  { n: "Tamarind water", c: "#b07a45", base: false, k: "acidic", t: "no change: tamarind (imli) is acidic and sour" }
];
SIM_DEF.k7s1_haldi = {
  def: { s: 0, dip: 1 },
  rng: { s: () => [0, 5, 1], dip: () => [0, 1, 1] },
  lab: { s: "Liquid", dip: "Dip the paper (0 up, 1 in)" },
  reads: { liq: "Liquid", res: "Haldi paper", kind: "What it tells us" },
  draw(D, P, sh, hl) {
    const i = Math.max(0, Math.min(5, Math.round(s1n(D.s)))), L = S1LIQ[i], dip = Math.max(0, Math.min(1, s1n(D.dip)));
    const rv = sh.has("res"), red = L.base ? dip : 0, col = !rv ? "#9a9a9a" : red > .5 ? "#b8322a" : "#f2c230";
    const bx = 150, by = 90, bw = 120, bh = 120, ly = by + 40;
    let s = `<svg viewBox="0 0 420 240" role="img" aria-label="haldi paper test">`;
    s += T(210, 22, "Haldi paper test", { size: 14, fill: "var(--muted)" });
    // shelf of bottles
    S1LIQ.forEach((q, j) => { const x = 20 + j * 22, on = j === i; s += `<rect x="${x}" y="${on ? 44 : 50}" width="16" height="30" rx="4" fill="${q.c}" stroke="${on ? "var(--mari)" : "var(--line)"}" stroke-width="${on ? 2.5 : 1}"/><rect x="${x + 4}" y="${on ? 38 : 44}" width="8" height="7" fill="var(--muted)"/>`; });
    // beaker
    s += `<g${s1hl(hl, "beaker")}><path d="M${bx} ${by} L${bx} ${by + bh - 10} Q${bx} ${by + bh} ${bx + 10} ${by + bh} L${bx + bw - 10} ${by + bh} Q${bx + bw} ${by + bh} ${bx + bw} ${by + bh - 10} L${bx + bw} ${by}" fill="rgba(255,255,255,.05)" stroke="var(--ink)" stroke-width="2.5"/>`;
    s += `<rect x="${bx + 2}" y="${ly}" width="${bw - 4}" height="${by + bh - ly - 2}" rx="8" fill="${L.c}" opacity=".75"/></g>`;
    // strip
    const sy = 40 + dip * 70, sx = bx + bw / 2 - 12;
    s += `<g${s1hl(hl, "strip")}><rect x="${sx}" y="${sy}" width="24" height="90" rx="3" fill="#f2c230" stroke="#8a6a10"/>`;
    const wet = Math.max(0, sy + 90 - ly);
    if (wet > 0) s += `<rect x="${sx}" y="${sy + 90 - wet}" width="24" height="${wet}" rx="3" fill="${col}"/>` + (rv ? "" : T(sx + 12, sy + 84, "?", { size: 14, fill: "#fff" }));
    s += `<rect x="${sx + 6}" y="${sy - 10}" width="12" height="14" rx="2" fill="var(--muted)"/></g>`;
    s += T(bx + bw / 2, by + bh + 22, L.n, { size: 14, fill: "var(--ink)" });
    // result card
    s += `<rect x="296" y="96" width="112" height="78" rx="10" fill="rgba(255,255,255,.05)" stroke="var(--line)"/>`;
    s += T(352, 116, "Colour", { size: 11, fill: "var(--muted)" });
    s += `<rect x="330" y="124" width="44" height="18" rx="4" fill="${dip > .5 ? col : "#f2c230"}"/>`;
    s += T(352, 162, dip > .5 ? (!rv ? "?" : L.base ? "RED" : "YELLOW") : "dip it", { size: 13, fill: rv && dip > .5 && L.base ? "var(--rani)" : "var(--mari)" });
    s += T(352, 196, "red = basic", { size: 10.5, fill: "var(--muted)" }) + T(352, 212, "yellow = acidic", { size: 10.5, fill: "var(--muted)" }) + T(352, 226, "or neutral", { size: 10.5, fill: "var(--muted)" });
    s += "</svg>";
    const P_ = S1LIQ[Math.max(0, Math.min(5, Math.round(s1n(P.s))))];
    return { svg: s, reads: { liq: P_.n, res: s1n(P.dip) >= .5 ? (P_.base ? "turns red" : "stays yellow") : "not dipped yet", kind: P_.t } };
  }
};

/* =========================================================
   2. k7s1_circuit — cell, switch, lamp and a gap where we test an object
   params: m (object index 0..6), on (switch 0/1)
   readouts: obj, lamp, kind      parts: "gap", "lamp", "cell"
   ========================================================= */
const S1MAT = [
  { n: "Copper wire", g: 1, k: "metal: a good conductor", c: "#d9894a" },
  { n: "Iron nail", g: 1, k: "metal: a good conductor", c: "#9aa4ad" },
  { n: "Aluminium foil", g: 1, k: "metal: a good conductor", c: "#d8dde3" },
  { n: "Plastic scale", g: 0, k: "does not let current pass (insulator)", c: "#62b6e8" },
  { n: "Wooden stick", g: 0, k: "does not let current pass (insulator)", c: "#a8713e" },
  { n: "Rubber eraser", g: 0, k: "does not let current pass (insulator)", c: "#e04a86" },
  { n: "Pencil lead (graphite)", g: .45, k: "a non-metal that conducts: a surprise!", c: "#4a4f57" }
];
SIM_DEF.k7s1_circuit = {
  def: { m: 0, on: 1 },
  rng: { m: () => [0, 6, 1], on: () => [0, 1, 1] },
  lab: { m: "Object in the gap", on: "Switch (0 off, 1 on)" },
  reads: { obj: "Object", lamp: "Lamp", kind: "So it is" },
  draw(D, P, sh, hl) {
    const lv = sh.has("lamp"), i = Math.max(0, Math.min(6, Math.round(s1n(D.m)))), M = S1MAT[i], on = s1n(D.on) >= .5, g = on && lv ? M.g : 0;
    let s = `<svg viewBox="0 0 420 240" role="img" aria-label="circuit tester">`;
    const wire = "var(--ink)";
    // loop path: cell (left), lamp (top), gap (right), switch (bottom)
    const flow = g > 0 ? `<path d="M60 70 L60 40 L360 40 L360 96 M360 150 L360 200 L60 200 L60 150" fill="none" stroke="var(--mari)" stroke-width="3" stroke-dasharray="4 12" opacity="${.4 + .6 * g}"><animate attributeName="stroke-dashoffset" from="32" to="0" dur="${g > .9 ? .6 : 1.4}s" repeatCount="indefinite"/></path>` : "";
    s += `<path d="M60 70 L60 40 L190 40 M230 40 L360 40 L360 96 M360 150 L360 200 L250 200 M200 200 L60 200 L60 150" fill="none" stroke="${wire}" stroke-width="3" stroke-opacity=".7"/>` + flow;
    // cell
    s += `<g${s1hl(hl, "cell")}><rect x="40" y="70" width="40" height="80" rx="6" fill="#2f6d5a" stroke="var(--ink)"/><rect x="52" y="62" width="16" height="8" fill="var(--muted)"/>${T(60, 100, "+", { size: 16, fill: "#fff" })}${T(60, 135, "cell", { size: 11, fill: "#fff" })}</g>`;
    // lamp
    const glow = g > 0 ? `<circle cx="210" cy="40" r="${26 + 14 * g}" fill="#ffd36b" opacity="${.25 * g}"/>` : "";
    s += `<g${s1hl(hl, "lamp")}>${glow}<circle cx="210" cy="40" r="17" fill="${g > 0 ? (g > .9 ? "#ffe27a" : "#e9c55a") : "rgba(255,255,255,.08)"}" stroke="var(--ink)" stroke-width="2"/>${lv ? `<path d="M203 44 Q206 32 210 42 Q214 32 217 44" fill="none" stroke="${g > 0 ? "#b8322a" : "var(--muted)"}" stroke-width="2"/>` : T(210, 45, "?", { size: 15, fill: "var(--mari)" })}<rect x="202" y="56" width="16" height="10" fill="var(--muted)"/></g>`;
    // switch
    s += on ? `<line x1="200" y1="200" x2="250" y2="200" stroke="${wire}" stroke-width="4"/>` : `<line x1="200" y1="200" x2="244" y2="176" stroke="${wire}" stroke-width="4"/>`;
    s += `<circle cx="200" cy="200" r="4" fill="var(--mari)"/><circle cx="250" cy="200" r="4" fill="var(--mari)"/>` + T(225, 228, on ? "switch ON" : "switch OFF", { size: 11, fill: "var(--muted)" });
    // gap with clips and the object
    s += `<g${s1hl(hl, "gap")}><path d="M352 96 L368 96 L364 106 L356 106Z M352 150 L368 150 L364 140 L356 140Z" fill="#e04a86"/>`;
    s += `<rect x="350" y="104" width="20" height="38" rx="4" fill="${M.c}" stroke="var(--ink)" stroke-width="1.5"/></g>`;
    s += T(340, 120, M.n.length > 14 ? M.n.split(" ")[0] : M.n, { size: 12, fill: "var(--ink)", a: "end" });
    if (M.n.length > 14) s += T(340, 136, M.n.split(" ").slice(1).join(" "), { size: 11, fill: "var(--muted)", a: "end" });
    s += T(190, 162, !lv ? "Lamp: ?" : g > .9 ? "Lamp glows!" : g > 0 ? "Lamp glows dimly" : "Lamp does not glow", { size: 15, fill: g > 0 ? "var(--mari)" : "var(--muted)" });
    s += "</svg>";
    const Q = S1MAT[Math.max(0, Math.min(6, Math.round(s1n(P.m))))], pg = s1n(P.on) >= .5 ? Q.g : 0;
    return { svg: s, reads: { obj: Q.n, lamp: s1n(P.on) < .5 ? "off: the switch breaks the circuit" : pg > .9 ? "glows brightly" : pg > 0 ? "glows dimly" : "does not glow", kind: Q.k } };
  }
};

/* =========================================================
   3. k7s1_water — the water cycle driven by the Sun's heat
   params: sun (0..10 heat), soak (0..1 share that soaks into the ground)
   readouts: evap, cloud, rain, ground     parts: "sea","vapour","cloud","rain","ground","sun"
   ========================================================= */
SIM_DEF.k7s1_water = {
  def: { sun: 6, soak: .5 },
  rng: { sun: () => [0, 10, 1], soak: () => [0, 1, .1] },
  lab: { sun: "Heat from the Sun", soak: "Share soaking into ground" },
  reads: { evap: "Evaporation", cloud: "Clouds", rain: "Rain", ground: "Groundwater" },
  draw(D, P, sh, hl) {
    const sun = Math.max(0, Math.min(10, s1n(D.sun))), soak = Math.max(0, Math.min(1, s1n(D.soak)));
    let s = `<svg viewBox="0 0 420 250" role="img" aria-label="water cycle">`;
    // sky
    s += `<rect x="0" y="0" width="420" height="250" fill="rgba(98,182,232,.06)"/>`;
    // sun
    const sr = 14 + sun * 1.4;
    s += `<g${s1hl(hl, "sun")}><circle cx="44" cy="40" r="${sr}" fill="#ffc94d" opacity="${.35 + sun * .065}"/>`;
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, r1 = sr + 4, r2 = sr + 4 + sun * 1.4; s += `<line x1="${(44 + Math.cos(a) * r1).toFixed(1)}" y1="${(40 + Math.sin(a) * r1).toFixed(1)}" x2="${(44 + Math.cos(a) * r2).toFixed(1)}" y2="${(40 + Math.sin(a) * r2).toFixed(1)}" stroke="#ffc94d" stroke-width="2.5"/>`; }
    s += `</g>`;
    // sea (left), land with hill (right)
    s += `<path d="M0 170 L180 170 L180 250 L0 250Z" fill="#2f7fb8"${s1hl(hl, "sea")}/>` + T(70, 196, "Sea", { size: 13, fill: "#fff" });
    s += `<path d="M180 170 Q240 150 280 120 Q320 92 360 110 Q400 128 420 140 L420 250 L180 250Z" fill="#5a8a3c"/>`;
    s += `<path d="M180 205 L420 205 L420 250 L180 250Z" fill="#7a5a3a"/><g${s1hl(hl, "ground")}><path d="M180 222 L420 222 L420 238 L180 238Z" fill="rgba(98,182,232,${.15 + soak * .55})"/></g>`;
    s += T(300, 216, "soil and rock", { size: 10.5, fill: "#f0dcc0" });
    // groundwater arrow back to the sea
    if (soak > 0 && sun > 0 && sh.has("ground")) s += `<path d="M400 230 L196 230" stroke="var(--sky)" stroke-width="2.5" stroke-dasharray="6 6" fill="none"><animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.6s" repeatCount="indefinite"/></path><path d="M196 230 l8 -5 v10z" fill="var(--sky)"/>` + T(330, 247, "water flows underground", { size: 10, fill: "var(--sky)" });
    // river on the land
    if (sun > 0 && soak < 1) s += `<path d="M350 112 Q300 140 250 152 Q210 162 180 170" stroke="#62b6e8" stroke-width="${2 + (1 - soak) * 4}" fill="none" opacity=".85"/>`;
    // vapour rising
    const nv = Math.round(sun / 2);
    s += `<g${s1hl(hl, "vapour")}>`;
    for (let k = 0; k < nv; k++) { const x = 30 + k * 30; s += `<path d="M${x} 162 q-6 -10 0 -20 q6 -10 0 -20" stroke="rgba(255,255,255,.6)" stroke-width="2" fill="none"><animateTransform attributeName="transform" type="translate" values="0 0;0 -26;0 0" dur="${2.4 + k * .2}s" repeatCount="indefinite"/></path>`; }
    s += `</g>`;
    // cloud grows with evaporation
    const cs = sun / 10;
    if (sun > 0) { s += `<g${s1hl(hl, "cloud")} opacity="${.4 + .6 * cs}"><ellipse cx="260" cy="${52}" rx="${24 + 40 * cs}" ry="${12 + 12 * cs}" fill="${sun > 6 ? "#9aa7b8" : "#e8eef5"}"/><ellipse cx="${236}" cy="44" rx="${14 + 22 * cs}" ry="${10 + 10 * cs}" fill="${sun > 6 ? "#a9b5c4" : "#f2f6fa"}"/><ellipse cx="${288}" cy="42" rx="${12 + 20 * cs}" ry="${10 + 10 * cs}" fill="${sun > 6 ? "#a9b5c4" : "#f2f6fa"}"/></g>`; }
    // rain
    if (sun >= 3) { const nd = Math.round(sun * 1.6); s += `<g${s1hl(hl, "rain")}>`; for (let k = 0; k < nd; k++) { const x = 230 + (k * 37) % 90, y0 = 72 + (k * 13) % 18; s += `<line x1="${x}" y1="${y0}" x2="${x - 3}" y2="${y0 + 9}" stroke="#62b6e8" stroke-width="2"><animateTransform attributeName="transform" type="translate" values="0 0;-8 60" dur="${.9 + (k % 4) * .15}s" repeatCount="indefinite"/></line>`; } s += `</g>`; }
    // labels
    if (sh.has("evap")) s += T(150, 84, "evaporation ↑", { size: 11, fill: "var(--muted)" });
    if (sh.has("cloud")) s += T(260, 18, "condensation: clouds", { size: 11, fill: "var(--muted)" });
    s += "</svg>";
    const ps = s1n(P.sun), pk = s1n(P.soak);
    return { svg: s, reads: {
      evap: ps === 0 ? "none: no heat" : ps < 4 ? "slow" : ps < 8 ? "steady" : "fast",
      cloud: ps === 0 ? "none" : ps < 3 ? "a few white clouds" : ps <= 6 ? "clouds growing" : "big dark rain clouds",
      rain: ps < 3 ? "no rain yet" : ps <= 6 ? "light rain" : "heavy rain",
      ground: ps < 3 ? "little water reaches the ground" : `${Math.round(pk * 100)}% soaks in, the rest runs off in rivers` } };
  }
};

/* =========================================================
   4. k7s1_shadow — a stick's shadow through the day (a March day in central India, ~23° N)
   params: t (hour, 7..17), h (stick height in m)
   readouts: time, elev, len, dir     parts: "sun","stick","shadow"
   ========================================================= */
function s1sun(t) {
  const H = (s1n(t) - 12) * 15 * Math.PI / 180, phi = 23 * Math.PI / 180;
  return { E: -Math.sin(H), N: -Math.sin(phi) * Math.cos(H), U: Math.cos(phi) * Math.cos(H) };
}
function s1tm(t) { const h = Math.floor(s1n(t)), m = Math.round((s1n(t) - h) * 60); const hh = ((h + 11) % 12) + 1; return `${hh}:${String(m).padStart(2, "0")} ${h < 12 ? "a.m." : "p.m."}`; }
SIM_DEF.k7s1_shadow = {
  def: { t: 9, h: 1 },
  rng: { t: () => [7, 17, .5] },
  lab: { t: "Time of day (hour)" },
  reads: { time: "Time", elev: "Sun's height in sky", len: "Shadow length", dir: "Shadow points" },
  draw(D, P, sh, hl) {
    const v = s1sun(D.t), cx = 210, cy = 180, sc = 50, R = 150, hpx = s1n(P.h) * 50;
    let s = `<svg viewBox="0 0 420 240" role="img" aria-label="shadow clock">`;
    // ground ellipse with directions (view from the south: east to the right, north away from us)
    s += `<ellipse cx="${cx}" cy="${cy}" rx="200" ry="44" fill="rgba(90,138,60,.25)" stroke="var(--line)"/>`;
    s += T(cx + 192, cy + 4, "E", { size: 12, fill: "var(--muted)", a: "end" }) + T(cx - 192, cy + 4, "W", { size: 12, fill: "var(--muted)", a: "start" }) + T(cx, cy - 32, "N", { size: 12, fill: "var(--muted)" }) + T(cx, cy + 40, "S", { size: 12, fill: "var(--muted)" });
    // sun's path across the sky
    let path = ""; for (let q = 6; q <= 18.01; q += .5) { const w = s1sun(q); path += `${q === 6 ? "M" : "L"}${(cx + w.E * R).toFixed(1)} ${(cy - w.U * R - w.N * R * .3).toFixed(1)} `; }
    s += `<path d="${path}" fill="none" stroke="rgba(255,201,77,.35)" stroke-width="1.5" stroke-dasharray="4 4"/>`;
    const sx = cx + v.E * R, sy = cy - v.U * R - v.N * R * .3;
    s += `<g${s1hl(hl, "sun")}><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="14" fill="#ffc94d"/><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="22" fill="#ffc94d" opacity=".25"/></g>`;
    // shadow on the ground
    const U = Math.max(.05, v.U), kx = -v.E / U * s1n(P.h), kn = -v.N / U * s1n(P.h);
    let tx = cx + kx * sc, ty = cy - kn * sc * .3; const lenPx = Math.hypot(tx - cx, ty - cy);
    if (lenPx > 195) { const f = 195 / lenPx; tx = cx + (tx - cx) * f; ty = cy + (ty - cy) * f; }
    const shw = sh.has("len") || sh.has("dir");
    if (!shw) s += T(cx, cy + 22, "shadow: ?", { size: 13, fill: "var(--mari)" });
    if (shw) s += `<line x1="${cx}" y1="${cy}" x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="#1a1410" stroke-width="7" stroke-linecap="round" opacity=".8"${s1hl(hl, "shadow")}/>`;
    // stick
    s += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - hpx}" stroke="#c0782e" stroke-width="5" stroke-linecap="round"${s1hl(hl, "stick")}/>`;
    s += `<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="rgba(255,201,77,.4)" stroke-width="1" stroke-dasharray="3 4"/>`;
    s += T(410, 18, `${s1tm(D.t)}`, { size: 14, fill: "var(--mari)", a: "end" });
    s += T(10, 18, "Stick 1 m tall · not to scale", { size: 10.5, fill: "var(--muted)", a: "start" });
    s += "</svg>";
    const w = s1sun(P.t), L = Math.hypot(w.E, w.N) / w.U * s1n(P.h), el = Math.asin(w.U) * 180 / Math.PI;
    const e = -w.E, n = -w.N; // shadow direction
    const dir = Math.abs(e) < .12 ? "north (shortest at noon)" : (n > .05 ? "north-" : "") + (e > 0 ? "east" : "west");
    return { svg: s, reads: { time: s1tm(P.t), elev: `${s1f(el, 0)}° above the ground`, len: `${s1f(L, 2)} m`, dir: dir.replace("north-east", "east, a little north").replace("north-west", "west, a little north") } };
  }
};

/* =========================================================
   5. k7s1_pendulum — a simple pendulum: time for one oscillation
   params: L (length in m), m (mass of bob in g)
   readouts: T, per, rule     parts: "string","bob"
   ========================================================= */
const s1T = L => 2 * Math.PI * Math.sqrt(Math.max(.01, s1n(L)) / 9.8);
SIM_DEF.k7s1_pendulum = {
  def: { L: .5, m: 50 },
  rng: { L: () => [.1, 1.5, .1], m: () => [10, 100, 10] },
  lab: { L: "Length of string (m)", m: "Mass of bob (g)" },
  reads: { T: "Time for one oscillation", per: "Oscillations in 1 minute", rule: "What matters" },
  draw(D, P, sh, hl) {
    const L = Math.max(.1, s1n(D.L)), len = 30 + L * 110, r = 6 + Math.cbrt(s1n(D.m)) * 2.2, T0 = s1T(P.L);
    let s = `<svg viewBox="0 0 420 262" role="img" aria-label="pendulum">`;
    s += `<rect x="110" y="12" width="200" height="10" rx="3" fill="#8a5a2b"/><circle cx="210" cy="22" r="3" fill="var(--ink)"/>`;
    // ghost extremes
    const A = 18 * Math.PI / 180;
    [-1, 1].forEach(k => { const x = 210 + Math.sin(k * A) * len, y = 22 + Math.cos(A) * len; s += `<line x1="210" y1="22" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--line)" stroke-dasharray="3 4"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="var(--line)"/>`; });
    s += `<line x1="210" y1="22" x2="210" y2="${22 + len + r + 6}" stroke="var(--muted)" stroke-dasharray="2 5" stroke-opacity=".5"/>`;
    s += `<g><animateTransform attributeName="transform" type="rotate" values="18 210 22;-18 210 22;18 210 22" keyTimes="0;.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" dur="${T0.toFixed(3)}s" repeatCount="indefinite"/>`;
    s += `<line x1="210" y1="22" x2="210" y2="${(22 + len).toFixed(1)}" stroke="var(--ink)" stroke-width="2"${s1hl(hl, "string")}/>`;
    s += `<circle cx="210" cy="${(22 + len).toFixed(1)}" r="${r.toFixed(1)}" fill="var(--rani)" stroke="var(--ink)"${s1hl(hl, "bob")}/></g>`;
    s += T(40, 60, `${s1f(P.L, 1)} m`, { size: 14, fill: "var(--ink)", a: "start" }) + T(40, 78, "string", { size: 11, fill: "var(--muted)", a: "start" });
    s += T(380, 60, `${s1f(P.m, 0)} g`, { size: 14, fill: "var(--ink)", a: "end" }) + T(380, 78, "bob", { size: 11, fill: "var(--muted)", a: "end" });
    s += T(210, 254, `One oscillation (to and fro) = ${sh.has("T") ? s1f(T0, 1) + " s" : "?"}`, { size: 14, fill: "var(--mari)" });
    s += "</svg>";
    return { svg: s, reads: { T: `${s1f(T0, 1)} s`, per: `about ${Math.round(60 / T0)}`, rule: "only the length changes the time; the mass does not" } };
  }
};

/* =========================================================
   3D — k7s1_sky3d: Sun, Earth and Moon. Earth spins (day and night), the Moon goes round the Earth.
   params: ma (Moon's angle, 0 = between Sun and Earth), hr (hour at your place, 12 = noon)
   readouts: moon, ecl, you
   ========================================================= */
function s1moon(ma) {
  const a = ((Math.round(s1n(ma)) % 360) + 360) % 360;
  const name = a === 0 ? "New Moon (dark side faces us)" : a === 180 ? "Full Moon" : (a === 90 || a === 270) ? "Half Moon" : (a < 90 || a > 270) ? "Crescent Moon" : "Gibbous Moon (more than half lit)";
  const ecl = a === 0 ? "Solar eclipse: the Moon's shadow falls on the Earth" : a === 180 ? "Lunar eclipse: the Moon is inside the Earth's shadow" : "No eclipse: the three are not in one line";
  return { a, name, ecl };
}
SIM_DEF.k7s1_sky3d = {
  def: { ma: 90, hr: 12 },
  rng: { ma: () => [0, 345, 15], hr: () => [0, 23, 1] },
  lab: { ma: "Moon's position (degrees)", hr: "Hour at your place" },
  reads: { moon: "Moon looks like", ecl: "Eclipse?", you: "At your place" },
  readouts(P) {
    const m = s1moon(P.ma), h = Math.round(s1n(P.hr)), day = Math.cos((h - 12) / 24 * 2 * Math.PI) > 0;
    return { moon: m.name, ecl: m.ecl, you: `${h}:00, ${day ? "day: your side faces the Sun" : "night: your side faces away from the Sun"}` };
  },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 13, phi: 1.05, theta: 0.25, auto: 0, target: [-1.5, 0, 0], hint: "Drag to turn the sky" });
    if (!g) return null;
    const { THREE, root, scene, renderer } = g;
    scene.children.forEach(o => { if (o.isLight) o.intensity = o.isHemisphereLight ? .16 : 0; });
    try { renderer.shadowMap.enabled = true; } catch (e) {}
    const SX = -7;
    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.3, 32, 20), new THREE.MeshBasicMaterial({ color: 0xffc94d }));
    sun.position.set(SX, 0, 0); root.add(sun);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(1.9, 24, 16), new THREE.MeshBasicMaterial({ color: 0xffa52e, transparent: true, opacity: .2 }));
    sun.add(halo);
    const light = new THREE.PointLight(0xffffff, 1.7, 0, 0); light.position.set(SX, 0, 0); root.add(light);
    try { light.castShadow = true; light.shadow.mapSize.set(1024, 1024); light.shadow.camera.near = .5; light.shadow.camera.far = 30; } catch (e) {}
    // Earth with a painted texture
    const cv = document.createElement("canvas"); cv.width = 256; cv.height = 128; const c = cv.getContext("2d");
    c.fillStyle = "#2a6fb0"; c.fillRect(0, 0, 256, 128);
    c.fillStyle = "#4f9a4a"; [[40, 50, 26, 20], [70, 80, 14, 22], [140, 44, 34, 18], [170, 64, 12, 18], [200, 86, 18, 10], [120, 90, 10, 8]].forEach(([x, y, a, b]) => { c.beginPath(); c.ellipse(x, y, a, b, .3, 0, 6.28); c.fill(); });
    c.fillStyle = "#e9eef4"; c.fillRect(0, 0, 256, 8); c.fillRect(0, 120, 256, 8);
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(cv), roughness: .8 }));
    earth.castShadow = true; earth.receiveShadow = true; root.add(earth);
    const you = new THREE.Mesh(new THREE.SphereGeometry(.09, 12, 8), new THREE.MeshBasicMaterial({ color: 0xe04a86 }));
    you.position.set(-.97, .28, 0); earth.add(you);
    // Moon
    const moon = new THREE.Mesh(new THREE.SphereGeometry(.32, 28, 18), new THREE.MeshStandardMaterial({ color: 0xdedad0, roughness: .95 }));
    moon.castShadow = true; moon.receiveShadow = true; root.add(moon);
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(3, .015, 6, 90), new THREE.MeshBasicMaterial({ color: 0x8aa0b8, transparent: true, opacity: .5 }));
    orbit.rotation.x = Math.PI / 2; root.add(orbit);
    // shadow cones (pointing away from the Sun)
    const coneM = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .28, depthWrite: false });
    const eCone = new THREE.Mesh(new THREE.ConeGeometry(1, 5, 32, 1, true), coneM); eCone.rotation.z = Math.PI / 2; eCone.position.set(2.5, 0, 0); root.add(eCone);
    const mCone = new THREE.Mesh(new THREE.ConeGeometry(.32, 2.2, 24, 1, true), coneM); mCone.rotation.z = Math.PI / 2; root.add(mCone);
    // star dots
    const sg = new THREE.BufferGeometry(), pts = [];
    for (let i = 0; i < 300; i++) { const r = 40, th = Math.random() * 6.28, ph = Math.acos(2 * Math.random() - 1); pts.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)); }
    sg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3)); root.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: .15 })));
    g.label("Sun", sun, "plain"); g.label("Earth", [0, 1.45, 0], "plain");
    const lm = g.label("Moon", [0, 0, 0], "plain"), lE = g.label("", [-1.5, 2.7, 0], "big");
    const st = { ma: s1n(I.ma), hr: s1n(I.hr), tma: s1n(I.ma), thr: s1n(I.hr) };
    g.onFrame((t, dt) => {
      const k = Math.min(1, dt * 6);
      st.ma += (st.tma - st.ma) * k; st.hr += (st.thr - st.hr) * k;
      const a = st.ma * Math.PI / 180, mx = -3 * Math.cos(a), mz = 3 * Math.sin(a);
      moon.position.set(mx, 0, mz); mCone.position.set(mx + 1.1, 0, mz);
      lm.move([mx, .62, mz]);
      earth.rotation.y = (st.hr - 12) / 24 * Math.PI * 2;
      halo.scale.setScalar(1 + .05 * Math.sin(t * 2));
    });
    return {
      update(D, P, sh, hl) {
        st.tma = s1n(D.ma); st.thr = s1n(D.hr);
        const m = s1moon(P.ma); lE.show(sh.has("ecl") || sh.has("moon")); lE.set(sh.has("ecl") && m.a === 0 ? "Solar eclipse!" : sh.has("ecl") && m.a === 180 ? "Lunar eclipse!" : sh.has("moon") ? m.name.split(" (")[0] : "?");
      },
      dispose() { g.dispose(); }
    };
  }
};

/* =========================================================
   SCENE — Varanasi ghats at dusk: Ganga, steps, temples, diyas, paper planes and butterflies
   ========================================================= */
let s1w = null;
function s1wInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  s1w = { W, H,
    stars: Array.from({ length: Math.round(W * H / 9000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .45), r: rnd(.3, 1.4), p: rnd(0, 6.28) })),
    diyas: Array.from({ length: Math.max(8, Math.round(W / 70)) }, () => ({ x: rnd(0, W), y: rnd(H * .74, H * .96), s: rnd(.1, .35), p: rnd(0, 6.28) })),
    planes: Array.from({ length: 3 }, (_, i) => ({ x: rnd(0, W), y: rnd(H * .1, H * .4), v: rnd(.4, .9), p: rnd(0, 6.28), i })),
    flies: Array.from({ length: 4 }, () => ({ x: rnd(0, W), y: rnd(H * .2, H * .6), p: rnd(0, 6.28), c: Math.random() < .5 ? "#f4a51c" : "#62b6e8" })),
    temples: (() => { const a = []; let x = -20; while (x < W + 40) { const w = rnd(50, 110); a.push({ x, w, h: rnd(40, 110), sp: Math.random() < .55 }); x += w + rnd(-6, 14); } return a; })() };
}
SCENES.k7s1_ghat = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!s1w || s1w.W !== W || s1w.H !== H) s1wInit(W, H);
  const S = s1w, hz = H * .58;
  let g = c.createLinearGradient(0, 0, 0, hz); g.addColorStop(0, "#0d1530"); g.addColorStop(.55, "#3a2350"); g.addColorStop(1, "#c4643c");
  c.fillStyle = g; c.fillRect(0, 0, W, hz);
  S.stars.forEach(s => { c.globalAlpha = .25 + .35 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // setting sun
  const sx = W * .72, sy = hz - 6, sr = Math.min(W, H) * .06;
  const sg = c.createRadialGradient(sx, sy, sr * .5, sx, sy, sr * 3.2); sg.addColorStop(0, "rgba(255,190,90,.55)"); sg.addColorStop(1, "rgba(255,150,80,0)"); c.fillStyle = sg; c.beginPath(); c.arc(sx, sy, sr * 3.2, 0, 6.28); c.fill();
  c.fillStyle = "#ffb35c"; c.beginPath(); c.arc(sx, sy, sr, Math.PI, 0); c.fill();
  // temple skyline on the far bank
  c.fillStyle = "rgba(24,14,34,.92)";
  S.temples.forEach(b => { const y = hz - b.h; c.fillRect(b.x, y, b.w, b.h); if (b.sp) { c.beginPath(); c.moveTo(b.x + b.w * .2, y); c.quadraticCurveTo(b.x + b.w / 2, y - b.h * .9, b.x + b.w * .8, y); c.fill(); c.fillRect(b.x + b.w / 2 - 1, y - b.h * .75, 2, 12); } else { c.beginPath(); c.ellipse(b.x + b.w / 2, y, b.w * .28, b.w * .22, 0, Math.PI, 0); c.fill(); } });
  c.fillStyle = "rgba(255,190,110,.35)"; S.temples.forEach((b, i) => { if (i % 2 === 0) c.fillRect(b.x + b.w * .4, hz - b.h * .5, 5, 7); });
  // river
  g = c.createLinearGradient(0, hz, 0, H * .78); g.addColorStop(0, "#5a3048"); g.addColorStop(1, "#14203a"); c.fillStyle = g; c.fillRect(0, hz, W, H * .78 - hz);
  c.strokeStyle = "rgba(255,180,100,.25)"; c.lineWidth = 1.5;
  for (let i = 0; i < 14; i++) { const y = hz + 6 + i * (H * .2 / 14), w = 30 + i * 6, x = sx + Math.sin(t / 900 + i) * 8; c.beginPath(); c.moveTo(x - w / 2, y); c.lineTo(x + w / 2, y); c.stroke(); }
  // boat
  const bx = (t / 60) % (W + 160) - 80, by = hz + H * .09;
  c.fillStyle = "#2a1a14"; c.beginPath(); c.moveTo(bx - 34, by); c.quadraticCurveTo(bx, by + 14, bx + 34, by); c.lineTo(bx + 26, by + 6); c.lineTo(bx - 26, by + 6); c.fill();
  c.fillStyle = "#f4a51c"; c.fillRect(bx - 12, by - 12, 24, 10);
  // ghat steps
  for (let i = 0; i < 6; i++) { const y = H * .78 + i * (H * .22 / 6); c.fillStyle = i % 2 ? "#3b2a26" : "#463230"; c.fillRect(0, y, W, H * .22 / 6 + 1); }
  // floating diyas on the steps edge and water
  S.diyas.forEach(dd => { if (!RM) { dd.x += dd.s; if (dd.x > W + 10) dd.x = -10; } const fl = .6 + .4 * Math.sin(t / 200 + dd.p);
    const gl = c.createRadialGradient(dd.x, dd.y, 0, dd.x, dd.y, 16); gl.addColorStop(0, `rgba(255,190,80,${.5 * fl})`); gl.addColorStop(1, "rgba(255,190,80,0)"); c.fillStyle = gl; c.beginPath(); c.arc(dd.x, dd.y, 16, 0, 6.28); c.fill();
    c.fillStyle = "#c0782e"; c.beginPath(); c.ellipse(dd.x, dd.y + 2, 6, 2.5, 0, 0, 6.28); c.fill(); c.fillStyle = `rgba(255,220,120,${fl})`; c.beginPath(); c.ellipse(dd.x, dd.y - 3, 2, 4, 0, 0, 6.28); c.fill(); });
  // paper planes gliding
  S.planes.forEach(p => { if (!RM) { p.x += p.v; p.y += Math.sin(t / 900 + p.p) * .25; if (p.x > W + 40) { p.x = -40; p.y = H * (.1 + Math.random() * .3); } }
    c.save(); c.translate(p.x, p.y); c.rotate(Math.sin(t / 900 + p.p) * .15); c.fillStyle = "rgba(240,240,250,.75)"; c.beginPath(); c.moveTo(16, 0); c.lineTo(-12, -7); c.lineTo(-6, 0); c.lineTo(-12, 6); c.closePath(); c.fill(); c.strokeStyle = "rgba(150,160,190,.6)"; c.lineWidth = 1; c.beginPath(); c.moveTo(16, 0); c.lineTo(-6, 0); c.stroke(); c.restore(); });
  // butterflies
  S.flies.forEach(f => { if (!RM) { f.x += Math.cos(t / 1300 + f.p) * .6; f.y += Math.sin(t / 700 + f.p) * .5; if (f.x < -20) f.x = W + 20; if (f.x > W + 20) f.x = -20; }
    const fw = Math.abs(Math.sin(t / 120 + f.p)); c.fillStyle = f.c; c.globalAlpha = .7;
    c.beginPath(); c.ellipse(f.x - 4 * fw, f.y, 5 * fw + 1, 6, -.4, 0, 6.28); c.fill(); c.beginPath(); c.ellipse(f.x + 4 * fw, f.y, 5 * fw + 1, 6, .4, 0, 6.28); c.fill(); c.globalAlpha = 1; });
  c.fillStyle = "rgba(4,8,20,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Titli, the curious butterfly with a magnifying glass
   ========================================================= */
GUIDES.k7s1_titli = () => `<svg class="guide titli" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="28" ry="4" fill="#000" opacity=".25"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2.4s" repeatCount="indefinite"/>
    <g><animateTransform attributeName="transform" type="scale" values="1 1;.72 1;1 1" dur=".9s" repeatCount="indefinite" additive="sum"/>
      <g transform="translate(0 0)">
        <path d="M58 60 Q24 14 10 36 Q2 60 30 70 Q44 72 58 66Z" fill="#f4a51c" stroke="#5a2c06" stroke-width="2"/>
        <path d="M58 70 Q26 74 22 96 Q26 112 44 102 Q56 92 58 76Z" fill="#e04a86" stroke="#5a2c06" stroke-width="2"/>
        <circle cx="26" cy="42" r="6" fill="#fff" opacity=".85"/><circle cx="36" cy="56" r="4" fill="#15202a"/><circle cx="38" cy="92" r="4" fill="#fff" opacity=".8"/>
      </g>
    </g>
    <g><animateTransform attributeName="transform" type="scale" values="1 1;.72 1;1 1" dur=".9s" repeatCount="indefinite"/>
      <g transform="translate(120 0) scale(-1 1)">
        <path d="M58 60 Q24 14 10 36 Q2 60 30 70 Q44 72 58 66Z" fill="#f4a51c" stroke="#5a2c06" stroke-width="2"/>
        <path d="M58 70 Q26 74 22 96 Q26 112 44 102 Q56 92 58 76Z" fill="#e04a86" stroke="#5a2c06" stroke-width="2"/>
        <circle cx="26" cy="42" r="6" fill="#fff" opacity=".85"/><circle cx="36" cy="56" r="4" fill="#15202a"/><circle cx="38" cy="92" r="4" fill="#fff" opacity=".8"/>
      </g>
    </g>
    <ellipse cx="60" cy="80" rx="6" ry="28" fill="#3a2a1c"/>
    <path d="M56 62 L56 104 M64 62 L64 104" stroke="#5a4532" stroke-width="1" opacity=".6"/>
    <circle cx="60" cy="46" r="12" fill="#3a2a1c"/>
    <circle cx="55" cy="45" r="4.5" fill="#fff"/><circle cx="65" cy="45" r="4.5" fill="#fff"/>
    <circle cx="56" cy="46" r="2.2" fill="#15202a"/><circle cx="66" cy="46" r="2.2" fill="#15202a"/>
    <rect x="49" y="40" width="22" height="0" fill="#3a2a1c"><animate attributeName="height" values="0;0;0;10;0" keyTimes="0;.84;.9;.95;1" dur="4.2s" repeatCount="indefinite"/></rect>
    <path d="M55 52 Q60 56 65 52" stroke="#ffd36b" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M56 35 Q48 18 40 14 M64 35 Q72 18 80 14" stroke="#3a2a1c" stroke-width="2" fill="none"/>
    <circle cx="40" cy="14" r="3" fill="#62b6e8"/><circle cx="80" cy="14" r="3" fill="#62b6e8"/>
    <g><animateTransform attributeName="transform" type="rotate" values="0 70 92;-10 70 92;0 70 92" dur="2.8s" repeatCount="indefinite"/>
      <line x1="70" y1="92" x2="88" y2="108" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/>
      <circle cx="94" cy="114" r="9" fill="rgba(160,210,255,.35)" stroke="#dfe6f2" stroke-width="3"/>
    </g>
  </g>
</svg>`;
})();
