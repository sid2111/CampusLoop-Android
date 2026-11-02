(function(){
/* Grade 7 Science (Curiosity) Chapter 5 — Changes Around Us: Physical and Chemical
   Plugin: simulations (k7s5_*), the Varanasi ghats at Dev Deepawali scene, and Jugnu the firefly guide. */

/* ---------- private helpers ---------- */
const s5hl = (hl, p) => ` data-part="${p}"${hl === p ? ' class="hl"' : ""}`;
const s5r = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const s5n = x => { const v = +x; return isFinite(v) ? v : 0; };
const s5f = (x, d = 1) => fmtN(+x, d);
const s5j = (a, b, dur) => `<animateTransform attributeName="transform" type="translate" values="0 0;${a.toFixed(1)} ${b.toFixed(1)};0 0" dur="${dur}s" repeatCount="indefinite"/>`;
const s5rise = (x, y0, y1, r, col, dur, beg, op = .8) => `<circle cx="${x.toFixed(1)}" cy="${y0}" r="${r}" fill="none" stroke="${col}" stroke-width="1.4" opacity="${op}"><animate attributeName="cy" values="${y0};${y1}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/><animate attributeName="opacity" values="${op};${op};0" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/></circle>`;
function s5flame(x, y, s, extra = "") {
  if (s <= 0.02) return "";
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})"${extra}><ellipse cx="0" cy="-6" rx="16" ry="20" fill="#f4a51c" opacity=".18"/>
   <path d="M0 -30 Q11 -12 7 0 Q0 6 -7 0 Q-11 -12 0 -30Z" fill="#f4a51c"><animateTransform attributeName="transform" type="scale" values="1 1;0.92 1.08;1 1" dur=".5s" repeatCount="indefinite"/></path>
   <path d="M0 -18 Q5 -8 3 0 Q0 3 -3 0 Q-5 -8 0 -18Z" fill="#fff4c2"/></g>`;
}

/* =========================================================
   1. k7s5_states — particle model of water: heating and cooling (ice ⇄ water ⇄ steam)
   params: temp (°C), lx    readouts: state, change, rev    parts: "beaker", "thermo"
   ========================================================= */
SIM_DEF.k7s5_states = {
  def: { temp: 25, lx: "" },
  rng: { temp: () => [-20, 120, 5] },
  lab: { temp: "Temperature (°C)" },
  reads: { state: "State", change: "What is happening", rev: "Can it be reversed?" },
  draw(D, P, sh, hl) {
    const tp = s5n(D.temp), pt = Math.round(s5n(P.temp));
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(150, 18, P.lx || "Water particles as the temperature changes", { size: 12.5, fill: "var(--muted)" });
    // heat source / cooling
    if (tp > 30) s += s5flame(150, 222, .55 + Math.min(.45, (tp - 30) / 150)) + `<rect x="120" y="222" width="60" height="8" rx="3" fill="#5a6f80"/>`;
    else if (tp < 5) s += `<g fill="none" stroke="var(--sky)" stroke-width="2">${[0, 60, 120].map(a => `<line x1="150" y1="212" x2="150" y2="232" transform="rotate(${a} 150 222)"/>`).join("")}</g>` + T(150, 238, "cooling", { size: 10.5, fill: "var(--sky)" });
    // beaker
    s += `<path d="M62 38 L62 200 Q62 208 70 208 L230 208 Q238 208 238 200 L238 38" fill="rgba(255,255,255,.04)" stroke="#c9d4ea" stroke-width="3"${s5hl(hl, "beaker")}/>`;
    const N = 30, st = tp < -0.01 ? 0 : (Math.abs(tp) <= 0.01 ? 0.5 : (tp < 99.99 ? 1 : (tp <= 100.01 ? 1.5 : 2)));
    // backdrops
    if (st === 1 || st === 1.5 || st === 0.5) s += `<rect x="65" y="152" width="170" height="53" rx="5" fill="rgba(98,182,232,.16)"/>`;
    if (st <= 0.5) s += `<rect x="${st === 0 ? 102 : 102}" y="${st === 0 ? 112 : 144}" width="96" height="${st === 0 ? 94 : 62}" rx="6" fill="rgba(200,235,255,.14)" stroke="rgba(200,235,255,.5)" stroke-width="1.5"/>`;
    for (let i = 0; i < N; i++) {
      const c = i % 6, r = Math.floor(i / 6);
      const sol = [110 + c * 16, 198 - r * 16];
      const lc = i % 10, lr = Math.floor(i / 10);
      const liq = [74 + lc * 16 + s5r(i) * 4, 196 - lr * 14 - s5r(i + 50) * 3];
      const gas = [70 + s5r(i + 9) * 160, 40 + s5r(i + 99) * 150];
      let p, amp, col, op = 1;
      let mode = st;
      if (st === 0.5) mode = i < 18 ? 0 : 1;      // melting point: ice and water together
      if (st === 1.5) mode = i < 20 ? 1 : 2;      // boiling: some particles escape as steam
      if (mode === 0) { p = sol; amp = 1; col = "#bfe6ff"; }
      else if (mode === 1) { p = liq; amp = 3; col = "#3d8fd6"; }
      else { p = st === 1.5 ? [80 + s5r(i + 9) * 140, 30 + s5r(i + 99) * 90] : gas; amp = 12; col = "#cfe6ff"; op = .75; }
      const a1 = (s5r(i + 7) - .5) * 2 * amp, a2 = (s5r(i + 17) - .5) * 2 * amp;
      s += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="7" fill="${col}" opacity="${op}" stroke="rgba(255,255,255,.55)" stroke-width="1">${s5j(a1, a2, (.35 + s5r(i) * .4).toFixed(2))}</circle>`;
    }
    if (st >= 1.5) for (let k = 0; k < 4; k++) s += `<path d="M${90 + k * 40} 34 q6 -10 0 -18 q-6 -8 0 -16" stroke="rgba(220,235,255,.5)" stroke-width="3" fill="none"><animate attributeName="opacity" values=".1;.7;.1" dur="${1.6 + k * .3}s" repeatCount="indefinite"/></path>`;
    // thermometer
    const y = v => 196 - (clampN(v, -20, 120) + 20) / 140 * 150;
    s += `<g${s5hl(hl, "thermo")}><rect x="290" y="38" width="16" height="164" rx="8" fill="rgba(255,255,255,.08)" stroke="#c9d4ea" stroke-width="2"/>
      <circle cx="298" cy="208" r="12" fill="var(--red)" stroke="#c9d4ea" stroke-width="2"/>
      <rect x="294" y="${y(tp).toFixed(1)}" width="8" height="${(208 - y(tp)).toFixed(1)}" fill="var(--red)"/></g>`;
    [[100, "100 °C boils"], [0, "0 °C melts"], [-20, "−20 °C"]].forEach(([v, t]) => { s += `<line x1="306" y1="${y(v)}" x2="316" y2="${y(v)}" stroke="var(--ink)" stroke-width="2"/>` + T(320, y(v) + 4, t, { size: 11.5, a: "start", fill: v === -20 ? "var(--muted)" : "var(--mari)" }); });
    s += T(298, 30, `${s5f(tp, 0)} °C`, { size: 13, fill: "var(--ink)" });
    s += `</svg>`;
    const name = pt < 0 ? "Solid — ice" : pt === 0 ? "Ice melting into water (both present)" : pt < 100 ? "Liquid — water" : pt === 100 ? "Water boiling into steam" : "Gas — steam (water vapour)";
    const ch = pt < 0 ? "Water has frozen: particles locked in a pattern. Still water — a physical change" : pt === 0 ? "Melting / freezing point: only the state changes, no new substance" : pt < 100 ? "Liquid water: particles close but free to move" : pt === 100 ? "Boiling: particles escape as steam. Still water — physical change" : "Steam: particles far apart and fast. Still water";
    const rv = pt <= 0 ? "Yes — warm the ice and it melts back to water" : pt < 100 ? "Yes — cool it to make ice, heat it to make steam" : "Yes — cool the steam and it condenses back to water";
    return { svg: s, reads: { state: name, change: ch, rev: rv } };
  }
};

/* =========================================================
   2. k7s5_lime — the lime water test for carbon dioxide
   params: src (0 nothing · 1 breath · 2 vinegar+baking soda · 3 lemon juice+vinegar · 4 vinegar+common salt ·
           5 lemon juice+baking soda · 6 baking soda+water), liq (0 tap water · 1 lime water), t (0..1 time)
   readouts: gas, obs, kind, eq     parts: "gen", "tube"
   ========================================================= */
const S5SRC = [
  { n: "Nothing added", gas: 0, fizz: 0 },
  { n: "Breath blown through a straw", gas: 1, fizz: 0 },
  { n: "Vinegar + baking soda", gas: 1, fizz: 1, a: "#f3e7c6", p: 1 },
  { n: "Lemon juice + vinegar", gas: 0, fizz: 0, a: "#f6ee9a" },
  { n: "Vinegar + common salt", gas: 0, fizz: 0, a: "#f3e7c6", p: 1 },
  { n: "Lemon juice + baking soda", gas: 1, fizz: 1, a: "#f6ee9a", p: 1 },
  { n: "Baking soda + water", gas: 0, fizz: 0, a: "#bfe0f2", p: 1 }
];
SIM_DEF.k7s5_lime = {
  def: { src: 2, liq: 1, t: 1, lx: "" },
  rng: { src: () => [0, 6, 1], t: () => [0, 1, 0.1], liq: () => [0, 1, 1] },
  lab: { src: "What goes into the tube", t: "Time", liq: "Liquid in the test tube (0 tap water, 1 lime water)" },
  reads: { gas: "Gas given off", obs: "Observation", kind: "Type of change", eq: "Word equation" },
  draw(D, P, sh, hl) {
    const si = clampN(Math.round(s5n(P.src)), 0, 6), S = S5SRC[si], lime = Math.round(s5n(P.liq)) === 1, t = clampN(s5n(D.t), 0, 1);
    const flow = S.gas && t > 0.05, milk = (S.gas && lime) ? clampN(t * 1.3, 0, 1) : 0;
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 18, P.lx || "Does the gas turn lime water milky?", { size: 12.5, fill: "var(--muted)" });
    // generator flask
    if (si >= 2) {
      s += `<g${s5hl(hl, "gen")}><path d="M86 70 L86 104 L42 192 Q38 202 50 202 L150 202 Q162 202 158 192 L114 104 L114 70Z" fill="rgba(255,255,255,.05)" stroke="#c9d4ea" stroke-width="3"/>
        <path d="M63 150 L137 150 L156 192 Q159 199 150 199 L50 199 Q41 199 44 192Z" fill="${S.a}" opacity=".55"/>
        <rect x="82" y="62" width="36" height="14" rx="3" fill="#8a5a2b"/></g>`;
      if (S.p) s += `<ellipse cx="100" cy="194" rx="${S.fizz ? 34 * (1 - t * .6) : 30}" ry="5" fill="#fff" opacity=".85"/>`;
      if (S.fizz && t > 0) for (let k = 0; k < 9; k++) s += s5rise(62 + k * 9 + s5r(k) * 6, 192, 152, 2.5 + s5r(k + 3) * 2, "#fff", .7 + s5r(k) * .6, -s5r(k + 5));
      s += T(100, 222, S.n, { size: 12, fill: "var(--ink)" });
      // delivery tube
      s += `<path d="M100 62 L100 44 Q100 36 108 36 L298 36 Q306 36 306 44 L306 186" fill="none" stroke="#c9d4ea" stroke-width="5" stroke-linejoin="round"/><path d="M100 62 L100 44 Q100 36 108 36 L298 36 Q306 36 306 44 L306 186" fill="none" stroke="#163449" stroke-width="2"/>`;
    } else if (si === 1) {
      s += `<path d="M306 186 L306 52 Q306 44 298 44 L262 44" fill="none" stroke="var(--rani)" stroke-width="5" stroke-linecap="round"/>`;
      s += `<g opacity="${t > 0 ? 1 : .5}">${[0, 1, 2].map(k => `<circle cx="${244 - k * 18}" cy="${44 + (k % 2) * 6}" r="${9 - k * 2}" fill="#cfe6ff" opacity=".5"><animate attributeName="opacity" values=".1;.6;.1" dur="1.2s" begin="${k * .3}s" repeatCount="indefinite"/></circle>`).join("")}</g>`;
      s += T(150, 96, "Exhaled air (breath)", { size: 12, fill: "var(--ink)" }) + T(150, 112, "blown in through a straw", { size: 11, fill: "var(--muted)" });
    } else s += T(130, 120, "Nothing is added", { size: 13, fill: "var(--muted)" });
    // test tube
    const tc = lime ? "rgba(225,240,240,.30)" : "rgba(98,182,232,.35)";
    s += `<g${s5hl(hl, "tube")}><path d="M280 64 L280 196 Q280 222 306 222 Q332 222 332 196 L332 64" fill="rgba(255,255,255,.04)" stroke="#c9d4ea" stroke-width="3"/>
      <path d="M282 112 L330 112 L330 196 Q330 220 306 220 Q282 220 282 196Z" fill="${tc}"/>
      <path d="M282 112 L330 112 L330 196 Q330 220 306 220 Q282 220 282 196Z" fill="#f6f6f0" opacity="${(milk * .85).toFixed(2)}"/></g>`;
    if (milk > .75) s += `<ellipse cx="306" cy="212" rx="18" ry="6" fill="#fff" opacity="${((milk - .75) * 4).toFixed(2)}"/>`;
    if (flow) for (let k = 0; k < 6; k++) s += s5rise(300 + s5r(k + 2) * 12, 188, 114, 3 + s5r(k) * 1.5, "#fff", .8 + s5r(k + 1) * .5, -s5r(k + 8));
    s += T(306, 236, lime ? "Lime water" : "Tap water", { size: 12, fill: "var(--ink)" });
    s += T(370, 150, milk > .5 ? "milky!" : (flow ? "bubbles" : "clear"), { size: 13, fill: milk > .5 ? "var(--mari)" : "var(--muted)" });
    s += `</svg>`;
    let gas = S.gas ? "Carbon dioxide" : (si === 0 ? "None" : "No gas — no bubbles"), obs, kind, eq = "—";
    if (si === 0) { obs = "Nothing happens"; kind = "No change"; }
    else if (si === 1 && !lime) { obs = "Only bubbles; the water looks the same"; kind = "No new substance is seen"; eq = "—"; }
    else if (S.gas) { obs = lime ? (t > .5 ? (S.fizz ? "Fizzing, bubbles, and" : "Bubbles, and") + " the lime water turns milky; a white solid settles" : "Bubbles pass into the lime water…") : "Bubbles pass, the tap water looks the same"; kind = "Chemical change — new substances form"; eq = lime ? "Calcium hydroxide + Carbon dioxide → Calcium carbonate + Water" : "Vinegar/lemon + Baking soda → Carbon dioxide + Other substances"; }
    else if (si === 6) { obs = "Baking soda just dissolves — no bubbles; lime water stays clear"; kind = "Physical change — no new substance"; }
    else if (si === 4) { obs = "Salt just dissolves — no bubbles; lime water stays clear"; kind = "No new substance — no carbon dioxide"; }
    else { obs = "The two liquids just mix — no bubbles; lime water stays clear"; kind = "No new substance — no carbon dioxide"; }
    if (si === 2 && !lime) eq = "Vinegar + Baking soda → Carbon dioxide + Other substances";
    return { svg: s, reads: { gas, obs, kind, eq } };
  }
};

/* =========================================================
   3. k7s5_slow — slow changes: rusting of an iron nail, weathering of rock, erosion by a river
   params: obj ("nail" | "rock" | "river"), t (0..10: days for nail, thousands of years otherwise), moist (nail: 0 dry, 1 moist)
   readouts: what, kind, rev     parts: "rust", "crack", "red", "pebble", "sand"
   ========================================================= */
SIM_DEF.k7s5_slow = {
  def: { obj: "nail", t: 0, moist: 1, lx: "" },
  rng: { t: () => [0, 10, 1], moist: () => [0, 1, 1] },
  lab: { t: "Time passing", moist: "Moisture (0 dry, 1 moist air)" },
  reads: { what: "What we see", kind: "Type of change", rev: "Reversible?" },
  draw(D, P, sh, hl) {
    const t = clampN(s5n(D.t), 0, 10), k = t / 10, ob = P.obj || "nail";
    let s = `<svg viewBox="0 0 420 240">`, what = "", kind = "", rev = "";
    if (ob === "nail") {
      const m = Math.round(s5n(P.moist)) === 1, rust = k * (m ? 1 : .06);
      s += T(210, 18, P.lx || `Iron nail in ${m ? "moist" : "dry"} air — day ${s5f(t, 0)}`, { size: 12.5, fill: "var(--muted)" });
      s += `<rect x="40" y="70" width="18" height="70" rx="4" fill="#9aa7b4"/><path d="M58 96 L330 96 L370 105 L330 114 L58 114Z" fill="#9aa7b4" stroke="#6d7a87" stroke-width="2"/>`;
      s += `<path d="M58 99 L330 99" stroke="#d8e0e8" stroke-width="2" opacity=".7"/>`;
      let g = ""; const nP = Math.round(48 * rust);
      for (let i = 0; i < nP; i++) { const x = 62 + s5r(i) * 290, y = 97 + s5r(i + 40) * 16, r = 4 + s5r(i + 80) * 7 * (0.5 + rust); g += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * .55).toFixed(1)}" fill="${i % 3 ? "#a0522d" : "#7a3a1c"}" opacity=".92"/>`; }
      if (nP) for (let i = 0; i < Math.round(nP / 4); i++) g += `<ellipse cx="${(44 + s5r(i + 3) * 10).toFixed(1)}" cy="${(76 + s5r(i + 33) * 58).toFixed(1)}" rx="4" ry="5" fill="#a0522d"/>`;
      s += `<g${s5hl(hl, "rust")}>${g}</g>`;
      if (m) for (let i = 0; i < 10; i++) s += `<path d="M${(70 + i * 30).toFixed(0)} ${150 + (i % 3) * 12} q4 7 0 10 q-4 -3 0 -10Z" fill="var(--sky)" opacity=".7"/>`;
      s += T(110, 214, m ? "moist air (oxygen + water vapour)" : "dry air", { size: 12, fill: "var(--sky)" });
      if (rust > .15) { s += `<rect x="236" y="178" width="164" height="44" rx="10" fill="rgba(160,82,45,.25)" stroke="#a0522d"/>` + T(318, 197, "new brown substance:", { size: 11.5 }) + T(318, 213, "rust (iron oxide)", { size: 12.5, fill: "var(--mari)" }); }
      what = rust > .15 ? `Brown flaky rust covers about ${Math.round(Math.min(100, rust * 100))}% of the nail` : (m ? "Shiny grey nail — rust has not shown yet" : "Dry air: hardly any rust forms");
      kind = "Rusting is a chemical change — a new substance, iron oxide (rust), forms";
      rev = "No — rust cannot be turned back into the shiny nail";
    } else if (ob === "rock") {
      s += T(210, 18, P.lx || `Weathering of rocks — ${s5f(t, 0)} thousand years`, { size: 12.5, fill: "var(--muted)" });
      s += `<rect x="0" y="210" width="420" height="30" fill="#5a4630"/>`;
      s += `<path d="M0 40 L140 40 L150 70 L160 120 L175 210 L0 210Z" fill="#6b6f78"/>`;
      s += `<path d="M30 40 Q36 26 50 30 Q56 18 70 26 Q84 20 90 34" fill="#2f7d4f"/><rect x="58" y="30" width="6" height="12" fill="#6b4a2a"/>`;
      // cracks
      const cl = 20 + k * 120;
      s += `<g${s5hl(hl, "crack")}><path d="M120 40 L112 ${(40 + cl * .4).toFixed(0)} L122 ${(40 + cl * .75).toFixed(0)} L114 ${(40 + cl).toFixed(0)}" stroke="#1d2026" stroke-width="${(2 + k * 4).toFixed(1)}" fill="none"/>`;
      if (t >= 2) s += `<path d="M116 46 L112 ${(40 + cl * .4).toFixed(0)} L120 ${(40 + cl * .6).toFixed(0)}" stroke="#bfe6ff" stroke-width="${(1 + k * 2).toFixed(1)}" fill="none"/>`;
      if (t >= 1) s += `<path d="M62 42 Q66 ${(56 + k * 30).toFixed(0)} 58 ${(70 + k * 60).toFixed(0)}" stroke="#8a6a3a" stroke-width="3" fill="none"/>`;
      s += `</g>`;
      if (t >= 2) s += T(230, 60, "water freezes in cracks", { size: 11.5, fill: "var(--sky)", a: "start" }) + `<line x1="226" y1="56" x2="124" y2="76" stroke="var(--sky)" stroke-width="1" stroke-dasharray="3 3"/>`;
      if (t >= 1) s += T(230, 80, "roots grow into cracks", { size: 11.5, fill: "#8fd18f", a: "start" });
      s += T(230, 100, "heating by day, cooling by night", { size: 11.5, fill: "var(--mari)", a: "start" });
      // sediments heap
      const nh = Math.round(k * 26);
      for (let i = 0; i < nh; i++) { const x = 172 + s5r(i) * 70 - (i % 5) * 4, y = 206 - s5r(i + 9) * 18 * k, r = 4 + s5r(i + 4) * 6; s += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} l${r.toFixed(0)} ${-r.toFixed(0)} l${r.toFixed(0)} ${r.toFixed(0)}Z" fill="${i % 3 ? "#8b8f98" : "#c2a77a"}"/>`; }
      if (nh) s += T(215, 232, "sediments", { size: 11, fill: "var(--ink)" });
      // basalt slab with red layer
      const rl = 2 + k * 14;
      s += `<rect x="290" y="${180 - rl}" width="110" height="${30 + rl}" rx="4" fill="#25272c"/><rect x="290" y="${(180 - rl).toFixed(1)}" width="110" height="${rl.toFixed(1)}" rx="3" fill="#b5492a"${s5hl(hl, "red")}/>`;
      s += T(345, 128, "basalt (has iron)", { size: 11, fill: "var(--muted)" }) + T(345, 144, t > 2 ? "red iron oxide layer" : "black rock", { size: 11.5, fill: t > 2 ? "#ff8a6a" : "var(--muted)" });
      what = t < 1 ? "A big rock face, almost unbroken" : `Cracks widen and pieces fall as sediments${t > 2 ? "; basalt grows a red iron-oxide layer" : ""}`;
      kind = "Breaking up = physical change; red iron oxide on basalt = chemical change. Both together = weathering → soil";
      rev = "No — takes thousands of years and cannot be reversed";
    } else {
      s += T(210, 18, P.lx || `Erosion by a river — ${s5f(t, 0)} thousand years`, { size: 12.5, fill: "var(--muted)" });
      s += `<path d="M0 60 L250 150 L250 240 L0 240Z" fill="#5a4630"/><path d="M250 150 L420 150 L420 240 L250 240Z" fill="#3b2f22"/>`;
      s += `<path d="M0 52 L250 142 L420 142 L420 206 L250 206 L250 150 L0 60Z" fill="rgba(98,182,232,.45)"/>`;
      for (let i = 0; i < 5; i++) s += `<path d="M${-60 + i * 50} ${40 + i * 18} l40 14" stroke="#cfe6ff" stroke-width="2" opacity=".7"><animateTransform attributeName="transform" type="translate" values="0 0;50 18" dur="1.4s" repeatCount="indefinite"/></path>`;
      s += T(80, 34, "fast flowing water", { size: 11.5, fill: "var(--sky)" }) ;
      s += T(335, 136, t > 1 ? "lake: water slows" : "lake", { size: 11.5, fill: "var(--sky)" });
      // pebbles getting rounder
      let pg = "";
      [[60, 82, 14], [120, 104, 12], [180, 126, 15]].forEach(([cx, cy, R], j) => {
        let d = ""; const n = 14;
        for (let i = 0; i < n; i++) { const a = i / n * 6.283, jag = (1 - k) * (s5r(i + j * 20) - .5) * R * .9, rr = R * (1 - k * .25) + jag; d += (i ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(1) + " " + (cy + rr * .7 * Math.sin(a)).toFixed(1); }
        pg += `<path d="${d}Z" fill="#9aa0a8" stroke="#6d737b" stroke-width="1.5"/>`;
      });
      s += `<g${s5hl(hl, "pebble")}>${pg}</g>`;
      // sand settling in lake
      const sh2 = k * 22;
      s += `<rect x="252" y="${(204 - sh2).toFixed(1)}" width="168" height="${(sh2 + 2).toFixed(1)}" fill="#d9bf7a"${s5hl(hl, "sand")}/>`;
      for (let i = 0; i < 8; i++) s += `<circle cx="${(262 + i * 19).toFixed(0)}" cy="150" r="2" fill="#e8d39a"><animate attributeName="cy" values="150;${(200 - sh2).toFixed(0)}" dur="${2 + s5r(i) * 1.5}s" begin="${-s5r(i + 3) * 2}s" repeatCount="indefinite"/></circle>`;
      if (t > 1) s += T(336, 226, "sand settles → new rock", { size: 11.5, fill: "var(--ink)" });
      what = t < 1 ? "Sharp, jagged rocks in the stream" : "Pebbles become smooth and round; fine sand is carried and settles in the lake";
      kind = "Erosion — rock, soil and sediments are moved by water or wind: a physical change";
      rev = "No — happens over thousands of years and cannot be reversed";
    }
    s += `</svg>`;
    return { svg: s, reads: { what, kind, rev } };
  }
};

/* =========================================================
   4. k7s5_fire — what a fire needs: the fire triangle, ignition temperature, and a candle under a tumbler
   params: mode ("tri" | "paper" | "candles"); tri: fuel, oxy, heat (0/1); paper: sec (0..60 s of focused sunlight), match (0/1);
           candles: t (0..10 minutes), lime (0/1 lime water in the dish)
   readouts: tri, res, why     parts: "flame", "lens", "tumbler", "triangle", "thermo"
   ========================================================= */
function s5tri(f, o, h, hl) {
  const A = [350, 58], B = [292, 170], C = [408, 170];
  const sd = (p, q, on, lab, col, lx, ly) => `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${on ? col : "#5b6b78"}" stroke-width="${on ? 7 : 4}" stroke-linecap="round"${on ? "" : ' stroke-dasharray="6 6"'}/>` + T(lx, ly, lab, { size: 11.5, fill: on ? col : "#7d8d99" });
  let s = `<g${s5hl(hl, "triangle")}>`;
  s += sd(B, A, h, "HEAT", "var(--red)", 300, 104) + sd(A, C, f, "FUEL", "var(--mari)", 402, 104) + sd(B, C, o, "OXYGEN", "var(--sky)", 350, 192);
  s += (f && o && h) ? s5flame(350, 150, .9) : T(350, 140, "no fire", { size: 11, fill: "#7d8d99" });
  return s + `</g>`;
}
SIM_DEF.k7s5_fire = {
  def: { mode: "tri", fuel: 1, oxy: 1, heat: 0, sec: 0, match: 0, t: 0, lime: 0, lx: "" },
  rng: { fuel: () => [0, 1, 1], oxy: () => [0, 1, 1], heat: () => [0, 1, 1], sec: () => [0, 60, 5], t: () => [0, 10, 1] },
  lab: { fuel: "Fuel (oil and wick)", oxy: "Air (oxygen)", heat: "Heat (lit matchstick)", sec: "Seconds of focused sunlight", t: "Minutes passed" },
  reads: { tri: "Fire triangle", res: "Result", why: "Why" },
  draw(D, P, sh, hl) {
    const md = P.mode || "tri";
    let s = `<svg viewBox="0 0 420 240">`, tri = "", res = "", why = "";
    const tick = b => b ? "✓" : "✗";
    if (md === "tri") {
      const f = Math.round(s5n(P.fuel)) === 1, o = Math.round(s5n(P.oxy)) === 1, h = Math.round(s5n(P.heat)) === 1, on = f && o && h;
      s += T(140, 18, P.lx || "Light the diya", { size: 12.5, fill: "var(--muted)" });
      s += `<path d="M70 176 Q140 222 210 176 Q190 160 140 160 Q90 160 70 176Z" fill="#b8643a" stroke="#7a3d1f" stroke-width="2"/><path d="M200 172 L222 164 L214 178Z" fill="#b8643a"/>`;
      if (f) s += `<ellipse cx="140" cy="170" rx="56" ry="7" fill="#d9a521"/><path d="M206 170 Q214 160 220 156" stroke="#f2efe6" stroke-width="3.5" fill="none"/>`;
      else s += T(140, 214, "empty: no oil, no wick", { size: 11.5, fill: "var(--muted)" });
      if (on) s += `<g${s5hl(hl, "flame")}>${s5flame(221, 154, 1.3)}</g>`;
      if (h) s += `<line x1="268" y1="96" x2="232" y2="146" stroke="#e8c38a" stroke-width="4"/><circle cx="231" cy="147" r="4" fill="#b8323a"/>` + (on ? "" : s5flame(231, 145, .6));
      if (!o) s += `<path d="M52 206 L52 104 Q52 84 72 84 L232 84 Q252 84 252 104 L252 206" fill="rgba(200,230,255,.10)" stroke="#c9d4ea" stroke-width="2.5"/>` + T(152, 100, "sealed glass: no fresh air", { size: 11.5, fill: "var(--sky)" });
      s += s5tri(f, o, h, hl);
      tri = `Fuel ${tick(f)} · Oxygen ${tick(o)} · Heat ${tick(h)}`;
      res = on ? "The diya burns!" : "No fire";
      why = on ? "All three sides of the fire triangle are present" : "Missing: " + [!f && "fuel", !o && "oxygen", !h && "heat to reach the ignition temperature"].filter(Boolean).join(", ");
    } else if (md === "paper") {
      const sc = clampN(s5n(D.sec), 0, 60), m = Math.round(s5n(P.match)) === 1, temp = m ? 1 : clampN(sc / 50, 0, 1), ig = .8;
      const smoke = m || sc >= 30, fire = m || sc >= 40;
      s += T(140, 18, P.lx || (m ? "A lighted matchstick touches the paper" : "Focusing sunrays with a magnifying glass"), { size: 12.5, fill: "var(--muted)" });
      s += `<circle cx="34" cy="40" r="14" fill="#ffd166"/>`;
      if (!m) {
        s += `<g${s5hl(hl, "lens")}><ellipse cx="130" cy="96" rx="58" ry="9" fill="rgba(180,220,255,.35)" stroke="#c9d4ea" stroke-width="2.5"/><line x1="188" y1="96" x2="226" y2="70" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/></g>`;
        [-50, -25, 0, 25, 50].forEach(dx => { s += `<line x1="${130 + dx}" y1="44" x2="${130 + dx}" y2="92" stroke="#ffd166" stroke-width="1.6" opacity=".7"/><line x1="${130 + dx}" y1="100" x2="130" y2="180" stroke="#ffd166" stroke-width="1.6" opacity="${(.35 + .6 * temp).toFixed(2)}"/>`; });
      } else s += `<line x1="200" y1="120" x2="146" y2="176" stroke="#e8c38a" stroke-width="4"/><circle cx="145" cy="177" r="4" fill="#b8323a"/>`;
      s += `<path d="M40 184 L222 184 L214 196 L48 196Z" fill="${fire ? "#3a2e26" : "#f2efe6"}"/>`;
      if (!fire) s += `<ellipse cx="130" cy="186" rx="${(3 + temp * 6).toFixed(1)}" ry="2.5" fill="#fff6c8" opacity="${(.4 + .6 * temp).toFixed(2)}"/>`;
      if (sc > 0 && !fire && sc < 30) s += `<circle cx="130" cy="186" r="${(2 + temp * 3).toFixed(1)}" fill="#a0522d" opacity="${temp.toFixed(2)}"/>`;
      if (smoke) for (let k = 0; k < 3; k++) s += `<path d="M${124 + k * 6} 178 q-8 -14 0 -26 q8 -12 0 -24" stroke="rgba(200,200,210,.55)" stroke-width="3" fill="none"><animate attributeName="opacity" values=".1;.7;.1" dur="${1.4 + k * .4}s" repeatCount="indefinite"/></path>`;
      if (fire) s += `<g${s5hl(hl, "flame")}>${s5flame(110, 186, 1.2)}${s5flame(140, 186, 1.5)}${s5flame(170, 186, 1)}</g>`;
      // thermometer of paper temperature
      const y = v => 200 - v * 150;
      s += `<g${s5hl(hl, "thermo")}><rect x="246" y="44" width="14" height="158" rx="7" fill="rgba(255,255,255,.08)" stroke="#c9d4ea" stroke-width="2"/><rect x="249" y="${y(temp).toFixed(1)}" width="8" height="${(202 - y(temp)).toFixed(1)}" fill="var(--red)"/>
        <line x1="240" y1="${y(ig)}" x2="270" y2="${y(ig)}" stroke="var(--mari)" stroke-width="2.5" stroke-dasharray="4 3"/></g>` + T(253, 36, "paper temp.", { size: 11, fill: "var(--muted)" }) + T(275, y(ig) - 6, "ignition", { size: 10.5, fill: "var(--mari)", a: "start" });
      s += s5tri(true, true, temp >= ig, hl);
      tri = `Fuel (paper) ✓ · Oxygen ✓ · Heat ${tick(temp >= ig)}`;
      res = fire ? "The paper catches fire!" : (smoke ? "The paper smokes…" : sc > 0 ? "The bright spot heats the paper" : "Paper resting in the sun");
      why = m ? "The match flame is already hotter than the ignition temperature of paper" : (fire ? "The paper has reached its ignition temperature — burning without any fire!" : "The paper is still below its ignition temperature");
    } else {
      const tm = clampN(s5n(D.t), 0, 10), o2 = clampN(1 - tm / 6, 0, 1), lime = Math.round(s5n(P.lime)) === 1;
      s += T(140, 18, P.lx || `Two candles — ${s5f(tm, 0)} min`, { size: 12.5, fill: "var(--muted)" });
      const candle = (x, fl) => `<rect x="${x - 12}" y="130" width="24" height="64" rx="3" fill="#f2efe6"/><line x1="${x}" y1="130" x2="${x}" y2="122" stroke="#222" stroke-width="2"/>` + s5flame(x, 124, fl);
      s += `<ellipse cx="80" cy="200" rx="40" ry="7" fill="rgba(200,230,255,.25)" stroke="#c9d4ea"/>` + candle(80, 1);
      s += `<ellipse cx="200" cy="200" rx="46" ry="8" fill="${lime ? `rgba(246,246,240,${(.2 + .75 * (1 - o2)).toFixed(2)})` : "rgba(200,230,255,.25)"}" stroke="#c9d4ea"/>` + `<g${s5hl(hl, "flame")}>${candle(200, o2 > 0 ? .4 + .6 * o2 : 0)}</g>`;
      if (o2 <= 0) for (let k = 0; k < 2; k++) s += `<path d="M${198 + k * 4} 118 q-6 -10 0 -20 q6 -10 0 -18" stroke="rgba(200,200,210,.6)" stroke-width="2.5" fill="none"/>`;
      s += `<path d="M160 198 L160 82 Q160 74 168 74 L232 74 Q240 74 240 82 L240 198" fill="rgba(200,230,255,.08)" stroke="#c9d4ea" stroke-width="3"${s5hl(hl, "tumbler")}/>`;
      s += `<rect x="252" y="80" width="12" height="110" rx="4" fill="rgba(255,255,255,.08)" stroke="#c9d4ea" stroke-width="1.5"/><rect x="254" y="${(188 - 106 * o2).toFixed(1)}" width="8" height="${(106 * o2).toFixed(1)}" fill="var(--sky)"/>` + T(258, 72, "O₂", { size: 11.5, fill: "var(--sky)" });
      s += T(80, 222, "open: fresh air", { size: 11.5 }) + T(200, 222, "covered by a tumbler", { size: 11.5 });
      if (lime && o2 < .5) s += T(200, 236, "lime water turns milky: CO₂", { size: 11, fill: "var(--mari)" });
      s += s5tri(true, o2 > 0, true, hl);
      tri = `Covered candle: Fuel ✓ · Oxygen ${o2 > 0 ? "running out" : "✗"} · Heat ✓`;
      res = o2 > 0 ? (tm > 0 ? "The covered flame grows smaller…" : "Both candles burn") : "The covered candle goes out; the open one keeps burning";
      why = o2 > 0 ? "The tumbler stops fresh air from coming in" : "No continuous supply of air: the oxygen is used up. Carbon from wax + oxygen made carbon dioxide";
    }
    s += `</svg>`;
    return { svg: s, reads: { tri, res, why } };
  }
};

/* =========================================================
   5. k7s5_sort — sorting board: Venn (A physical · C both · B chemical) or labelled columns
   params: mode ("venn" | "cols"), cols (headings), items ([[label, zone], …]), n (how many placed), lx
   readouts: count, last     parts: "z0", "z1", "z2"
   ========================================================= */
SIM_DEF.k7s5_sort = {
  def: { mode: "cols", cols: ["Physical change", "Chemical change"], items: [], n: 99, lx: "" },
  rng: { n: (P) => [0, (P.items || []).length, 1] },
  lab: { n: "Changes placed" },
  reads: { count: "Sorted so far", last: "Latest card" },
  draw(D, P, sh, hl) {
    const it = P.items || [], nD = clampN(s5n(D.n), 0, it.length), nP = Math.min(it.length, Math.round(s5n(P.n)));
    let s = `<svg viewBox="0 0 420 252">`;
    s += T(210, 16, P.lx || "Sort the changes", { size: 12.5, fill: "var(--muted)" });
    const chip = (x, y, w, lab, col, i) => { const op = clampN(nD - i, 0, 1); if (op <= 0) return ""; return `<g opacity="${op.toFixed(2)}" transform="translate(0 ${((1 - op) * -14).toFixed(1)})"><rect x="${(x - w / 2).toFixed(1)}" y="${y - 11}" width="${w.toFixed(1)}" height="21" rx="10" fill="${col}" fill-opacity=".22" stroke="${col}" stroke-width="1.5"/>${T(x.toFixed(1), y + 4, lab, { size: 11, fill: "var(--ink)" })}</g>`; };
    const COL = ["var(--sky)", "var(--rani)", "var(--mari)", "var(--teal)"];
    const cnt = [0, 0, 0, 0];
    if (P.mode === "venn") {
      s += `<ellipse cx="142" cy="146" rx="140" ry="100" fill="rgba(98,182,232,.10)" stroke="var(--sky)" stroke-width="2"${s5hl(hl, "z0")}/>`;
      s += `<ellipse cx="278" cy="146" rx="140" ry="100" fill="rgba(224,74,134,.10)" stroke="var(--rani)" stroke-width="2"${s5hl(hl, "z1")}/>`;
      s += T(70, 38, "A: Physical", { size: 12.5, fill: "var(--sky)" }) + T(350, 38, "B: Chemical", { size: 12.5, fill: "var(--rani)" }) + T(210, 112, "C: Both", { size: 12.5, fill: "var(--mari)" });
      const zx = [83, 335, 210], zy0 = [104, 96, 138];
      it.forEach((c, i) => { const z = c[1], k = cnt[z]++; const w = Math.min(z === 2 ? 130 : 116, String(c[0]).length * 5.9 + 16); s += chip(zx[z], zy0[z] + k * 27, w, c[0], [COL[0], COL[1], COL[2]][z], i); });
    } else {
      const cols = P.cols || [], nc = Math.max(1, cols.length), cw = 404 / nc;
      cols.forEach((h, j) => { const x0 = 8 + j * cw; s += `<rect x="${(x0 + 2).toFixed(1)}" y="28" width="${(cw - 4).toFixed(1)}" height="216" rx="12" fill="rgba(255,255,255,.04)" stroke="${COL[j % 4]}" stroke-width="1.6"${s5hl(hl, "z" + j)}/>` + T((x0 + cw / 2).toFixed(1), 48, h, { size: 12.5, fill: COL[j % 4] }); });
      it.forEach((c, i) => { const z = c[1], k = cnt[z]++; const x = 8 + z * cw + cw / 2, w = Math.min(cw - 14, String(c[0]).length * 5.9 + 16); s += chip(x, 72 + k * 26, w, c[0], COL[z % 4], i); });
    }
    s += `</svg>`;
    const last = nP > 0 ? it[nP - 1] : null, zn = z => P.mode === "venn" ? ["A (physical)", "B (chemical)", "C (both)"][z] : (P.cols || [])[z];
    return { svg: s, reads: { count: `${nP} of ${it.length}`, last: last ? `${last[0]} → ${zn(last[1])}` : "—" } };
  }
};

/* =========================================================
   3D. k7s5_candle3d — a burning candle: melting, rising, evaporating wax (physical) and burning wax vapour (chemical);
   a glass tumbler can be lowered over it on a dish of lime water.
   params: cover (0/1 tumbler), t (0..1 time under the tumbler), lime (0/1)   readouts: phys, chem, flame
   parts: "wax", "flame", "tumbler"
   ========================================================= */
SIM_DEF.k7s5_candle3d = {
  def: { cover: 0, t: 0, lime: 0 },
  rng: { cover: () => [0, 1, 1], t: () => [0, 1, 0.1] },
  lab: { cover: "Glass tumbler (0 off, 1 over the candle)", t: "Time under the tumbler" },
  reads: { phys: "Physical changes", chem: "Chemical change", flame: "The flame" },
  readouts(P) {
    const f = Math.round(+P.cover) === 1 ? clampN(1 - (+P.t) / 0.7, 0, 1) : 1;
    return {
      phys: "Wax melts, the liquid wax rises up the wick and evaporates; drips solidify again",
      chem: "Wax vapour burns with oxygen: new substances such as carbon dioxide, with heat and light",
      flame: f >= 1 ? "Burning steadily in fresh air" : f > 0 ? "Getting smaller: the oxygen inside is being used up" : "Gone out — no supply of oxygen" + (Math.round(+P.lime) === 1 ? "; lime water turned milky (CO₂)" : "")
    };
  },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 5.4, phi: 1.2, theta: 0.5, auto: 0.18, target: [0, 1.7, 0], hint: "Drag to look around the candle" });
    if (!g) return null;
    const { THREE, root } = g;
    const std = (c, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: .6 }, o));
    const table = new THREE.Mesh(new THREE.BoxGeometry(7, 0.2, 4.4), std(0x4a3320)); table.position.y = -0.1; root.add(table);
    const dish = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.45, 0.14, 40), std(0xcfe6ff, { transparent: true, opacity: .35, roughness: .1 })); dish.position.y = 0.07; root.add(dish);
    const limeM = std(0xbfe0f2, { transparent: true, opacity: .35, roughness: .2 });
    const limeL = new THREE.Mesh(new THREE.CylinderGeometry(1.38, 1.38, 0.06, 40), limeM); limeL.position.y = 0.12; root.add(limeL);
    const waxM = std(0xf4efe2, { roughness: .45, emissive: 0x332a10, emissiveIntensity: .1 });
    const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.47, 2, 36), waxM); wax.position.y = 1.15; root.add(wax);
    const pool = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.05, 32), std(0xffe08a, { roughness: .05, metalness: .1, emissive: 0x6a4a00, emissiveIntensity: .4 })); pool.position.y = 2.16; root.add(pool);
    const drip = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 10), waxM); drip.scale.set(1, 3.5, 1); drip.position.set(0.46, 1.85, 0.05); root.add(drip);
    const lump = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), waxM); lump.scale.set(1, .5, 1); lump.position.set(0.55, 0.2, 0.1); root.add(lump);
    const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.32, 8), std(0x222222)); wick.position.y = 2.32; root.add(wick);
    const flame = new THREE.Group(); flame.position.y = 2.62; root.add(flame);
    const outer = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 16), new THREE.MeshBasicMaterial({ color: 0xf4a51c, transparent: true, opacity: .85 })); outer.scale.set(1, 2.2, 1); flame.add(outer);
    const inner = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), new THREE.MeshBasicMaterial({ color: 0xfff4c2 })); inner.scale.set(1, 2, 1); inner.position.y = -0.08; flame.add(inner);
    const blue = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), new THREE.MeshBasicMaterial({ color: 0x3a6bff, transparent: true, opacity: .5 })); blue.position.y = -0.22; blue.scale.set(1, .6, 1); flame.add(blue);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 12), new THREE.MeshBasicMaterial({ color: 0xf4a51c, transparent: true, opacity: .12 })); halo.scale.set(1, 1.6, 1); flame.add(halo);
    const light = new THREE.PointLight(0xffaa44, 0.7, 5); light.position.y = 2.7; root.add(light);
    const vapM = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .45 }), vapG = new THREE.SphereGeometry(0.03, 8, 6);
    const vap = []; for (let i = 0; i < 12; i++) { const m = new THREE.Mesh(vapG, vapM); root.add(m); vap.push({ m, ph: i / 12, a: i * 2.4 }); }
    const smM = new THREE.MeshBasicMaterial({ color: 0x9aa3ad, transparent: true, opacity: .35 }), smG = new THREE.SphereGeometry(0.09, 10, 8);
    const smoke = []; for (let i = 0; i < 8; i++) { const m = new THREE.Mesh(smG, smM); root.add(m); smoke.push({ m, ph: i / 8 }); }
    const glassM = new THREE.MeshStandardMaterial({ color: 0xdff0ff, transparent: true, opacity: .2, roughness: .05, side: THREE.DoubleSide });
    const tumb = new THREE.Group(); root.add(tumb);
    const tw = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.15, 3.4, 40, 1, true), glassM); tw.position.y = 1.7; tumb.add(tw);
    const tt = new THREE.Mesh(new THREE.CircleGeometry(1.25, 40), glassM); tt.rotation.x = -Math.PI / 2; tt.position.y = 3.4; tumb.add(tt);
    const lWax = g.label("solid wax", [1.35, 0.9, 0.3], "plain"), lPool = g.label("melts → rises → evaporates: physical", [1.0, 2.15, 0.3], "plain"), lVap = g.label("wax vapour burns: chemical", [1.0, 3.05, 0.3], "plain"), lMsg = g.label("", [0, 4.5, 0], "big");
    const st = { f: 1, hl: null, cov: 0, tc: 0 };
    g.onFrame((t) => {
      const f = st.f, fl = 1 + 0.07 * Math.sin(t * 23) + 0.05 * Math.sin(t * 37);
      flame.visible = f > 0.02; flame.scale.set(.6 + .4 * f, (.5 + .5 * f) * fl, .6 + .4 * f);
      light.intensity = 0.7 * f;
      const pulse = k => st.hl === k ? .5 + .4 * Math.sin(t * 8) : .1;
      waxM.emissiveIntensity = pulse("wax"); outer.material.opacity = st.hl === "flame" ? .6 + .35 * Math.sin(t * 8) : .85;
      vap.forEach(v => { const k = (t * .7 + v.ph) % 1; v.m.visible = f > .05; v.m.position.set(Math.cos(v.a + t) * .12 * (1 - k), 2.2 + k * .4, Math.sin(v.a + t) * .12 * (1 - k)); });
      smoke.forEach(s => { const k = (t * .25 + s.ph) % 1; s.m.visible = f <= .02; s.m.position.set(Math.sin(t + s.ph * 9) * .15 * k, 2.5 + k * 0.8, 0); s.m.scale.setScalar(1 + k * 2); });
      st.tc += (st.cov - st.tc) * .06; tumb.position.y = (1 - st.tc) * 4.2; tumb.visible = st.tc > .01 || st.cov > 0;
      glassM.opacity = st.hl === "tumbler" ? .3 + .2 * Math.sin(t * 8) : .2;
    });
    function apply(D, P, sh, hl) {
      st.hl = hl; const cov = Math.round(+P.cover) === 1 ? 1 : 0; st.cov = clampN(+D.cover, 0, 1);
      const tt2 = clampN(+D.t, 0, 1); st.f = cov ? clampN(1 - tt2 / 0.7, 0, 1) : 1;
      const milk = Math.round(+P.lime) === 1 && cov ? clampN(tt2 / 0.7, 0, 1) : 0;
      limeL.visible = Math.round(+P.lime) === 1;
      limeM.color.setRGB(.75 + .21 * milk, .88 + .08 * milk, .95 - .01 * milk); limeM.opacity = .35 + .55 * milk;
      lMsg.set(st.f >= 1 ? "the candle burns" : st.f > 0 ? "the flame grows smaller…" : "the flame has gone out!");
      lPool.show(st.f > 0 && sh.has("phys")); lVap.show(st.f > 0 && sh.has("chem"));
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

/* =========================================================
   SCENE — the Varanasi ghats on Dev Deepawali night: steps lined with diyas, floating lamps, fireflies
   ========================================================= */
let s5w = null;
function s5wInit(W, H) {
  s5w = { W, H,
    stars: Array.from({ length: 60 }, () => ({ x: Math.random() * W, y: Math.random() * H * .35, r: .5 + Math.random() * 1.2, p: Math.random() * 6.28 })),
    lamps: Array.from({ length: Math.round(W / 60) + 6 }, () => ({ x: Math.random() * W, y: H * (.7 + Math.random() * .26), v: .12 + Math.random() * .25, p: Math.random() * 6.28 })),
    flies: Array.from({ length: 16 }, () => ({ x: Math.random() * W, y: H * (.1 + Math.random() * .4), p: Math.random() * 6.28, s: .3 + Math.random() * .5 })),
    temples: (() => { const a = []; let x = -10; while (x < W + 40) { const w = 50 + Math.random() * 70; a.push({ x, w, h: 50 + Math.random() * 70, sh: Math.random() < .5 }); x += w - 4; } return a; })(),
    boatX: W * .3 };
}
SCENES.k7s5_ghat = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!s5w || s5w.W !== W || s5w.H !== H) s5wInit(W, H);
  const S = s5w, sh = H * .44, wl = H * .66;
  let g = c.createLinearGradient(0, 0, 0, wl); g.addColorStop(0, "#081428"); g.addColorStop(.6, "#1a2048"); g.addColorStop(1, "#4a2c4e"); c.fillStyle = g; c.fillRect(0, 0, W, wl);
  S.stars.forEach(s => { c.globalAlpha = .3 + .35 * Math.sin(t / 900 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  const mx = W * .82, my = H * .14, mr = Math.min(W, H) * .045; c.fillStyle = "rgba(255,240,210,.15)"; c.beginPath(); c.arc(mx, my, mr * 2.6, 0, 6.28); c.fill(); c.fillStyle = "#fbefd6"; c.beginPath(); c.arc(mx, my, mr, 0, 6.28); c.fill();
  // temples and buildings on the bank
  S.temples.forEach(b => { const y = sh - b.h; c.fillStyle = "#1b1a30"; c.fillRect(b.x, y, b.w, sh - y + 2);
    if (b.sh) { c.beginPath(); c.moveTo(b.x + b.w * .2, y); c.quadraticCurveTo(b.x + b.w / 2, y - b.h * .9, b.x + b.w * .8, y); c.fill(); c.fillStyle = "#f4a51c"; c.fillRect(b.x + b.w / 2 - 1, y - b.h * .72 - 10, 2, 10); }
    c.fillStyle = "rgba(244,165,28,.35)"; for (let i = 0; i < 3; i++) c.fillRect(b.x + 8 + i * (b.w / 3.2), y + 14, 5, 8); });
  // ghat steps with rows of diyas
  for (let i = 0; i < 6; i++) { const y = sh + i * (wl - sh) / 6; c.fillStyle = i % 2 ? "#5c4436" : "#6a4f3e"; c.fillRect(0, y, W, (wl - sh) / 6 + 1);
    for (let x = 12 + (i % 2) * 14; x < W; x += 28) { const a = .6 + .4 * Math.sin(t / 300 + x * .7 + i); const rg = c.createRadialGradient(x, y + 2, 0, x, y + 2, 9); rg.addColorStop(0, `rgba(255,200,90,${a})`); rg.addColorStop(1, "rgba(255,200,90,0)"); c.fillStyle = rg; c.beginPath(); c.arc(x, y + 2, 9, 0, 6.28); c.fill(); } }
  // river
  g = c.createLinearGradient(0, wl, 0, H); g.addColorStop(0, "#14284a"); g.addColorStop(1, "#0a1830"); c.fillStyle = g; c.fillRect(0, wl, W, H - wl);
  c.strokeStyle = "rgba(255,190,90,.12)"; c.lineWidth = 2; for (let i = 0; i < 9; i++) { const y = wl + 10 + i * (H - wl) / 9, o = Math.sin(t / 1200 + i) * 20; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y + o * .1); c.stroke(); }
  // floating diyas drifting downstream
  S.lamps.forEach(l => { if (!RM) { l.x += l.v; if (l.x > W + 20) l.x = -20; } const y = Math.max(wl + 8, l.y) + Math.sin(t / 700 + l.p) * 2;
    c.fillStyle = "#b8643a"; c.beginPath(); c.ellipse(l.x, y, 7, 3, 0, 0, 6.28); c.fill();
    const rg = c.createRadialGradient(l.x, y - 5, 0, l.x, y - 5, 14); rg.addColorStop(0, "rgba(255,210,110,.9)"); rg.addColorStop(1, "rgba(255,210,110,0)"); c.fillStyle = rg; c.beginPath(); c.arc(l.x, y - 5, 14, 0, 6.28); c.fill();
    c.fillStyle = "rgba(255,190,90,.18)"; c.fillRect(l.x - 1.5, y + 4, 3, 16); });
  // a boat
  if (!RM) { S.boatX += .18; if (S.boatX > W + 90) S.boatX = -90; }
  const bx = S.boatX, by = wl + (H - wl) * .45; c.fillStyle = "#2a1c14"; c.beginPath(); c.moveTo(bx - 60, by); c.quadraticCurveTo(bx, by + 18, bx + 60, by); c.lineTo(bx + 48, by + 8); c.lineTo(bx - 48, by + 8); c.fill();
  c.strokeStyle = "#2a1c14"; c.lineWidth = 3; c.beginPath(); c.moveTo(bx + 20, by); c.lineTo(bx + 40, by - 36); c.stroke();
  // fireflies
  S.flies.forEach(f => { const x = f.x + Math.sin(t / 1500 + f.p) * 30, y = f.y + Math.cos(t / 1100 + f.p) * 18, a = .25 + .75 * Math.max(0, Math.sin(t / 400 * f.s + f.p));
    const rg = c.createRadialGradient(x, y, 0, x, y, 8); rg.addColorStop(0, `rgba(200,255,120,${a})`); rg.addColorStop(1, "rgba(200,255,120,0)"); c.fillStyle = rg; c.beginPath(); c.arc(x, y, 8, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(4,8,24,.28)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Jugnu, the firefly scientist, whose tail glows by a chemical change
   ========================================================= */
GUIDES.k7s5_firefly = () => `<svg class="guide firefly" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="125" rx="26" ry="3.5" fill="#000" opacity=".25"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2.6s" repeatCount="indefinite"/>
    <g opacity=".75"><path d="M54 52 Q28 18 14 34 Q14 54 52 60Z" fill="#cfe9ff"><animateTransform attributeName="transform" type="rotate" values="0 54 56;-14 54 56;0 54 56" dur=".35s" repeatCount="indefinite"/></path>
      <path d="M66 52 Q92 18 106 34 Q106 54 68 60Z" fill="#cfe9ff"><animateTransform attributeName="transform" type="rotate" values="0 66 56;14 66 56;0 66 56" dur=".35s" repeatCount="indefinite"/></path></g>
    <ellipse cx="60" cy="98" rx="20" ry="18" fill="#d9ff7a" opacity=".35"><animate attributeName="opacity" values=".15;.6;.15" dur="1.8s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="60" cy="96" rx="14" ry="15" fill="#e8ff8a"><animate attributeName="fill" values="#b8d860;#f2ff9a;#b8d860" dur="1.8s" repeatCount="indefinite"/></ellipse>
    <path d="M48 90 Q60 94 72 90 M48 98 Q60 102 72 98" stroke="#9ab84a" stroke-width="1.5" fill="none"/>
    <ellipse cx="60" cy="70" rx="17" ry="15" fill="#3b2a4a"/>
    <path d="M44 70 L30 82 M76 70 L90 82 M46 78 L36 94 M74 78 L84 94" stroke="#3b2a4a" stroke-width="3" stroke-linecap="round"/>
    <g transform="translate(84 94)"><rect x="-3" y="-20" width="9" height="22" rx="4" fill="rgba(220,240,255,.35)" stroke="#cfe9ff" stroke-width="1.5"/><rect x="-1.5" y="-8" width="6" height="9" rx="3" fill="#f6f6f0"/></g>
    <circle cx="60" cy="42" r="18" fill="#4a3560"/>
    <path d="M52 26 Q46 10 38 8 M68 26 Q74 10 82 8" stroke="#4a3560" stroke-width="2.4" fill="none"/><circle cx="38" cy="8" r="3.5" fill="#f4a51c"/><circle cx="82" cy="8" r="3.5" fill="#f4a51c"/>
    <circle cx="52" cy="42" r="7.5" fill="#fff"/><circle cx="68" cy="42" r="7.5" fill="#fff"/>
    <circle cx="52" cy="42" r="8.5" fill="none" stroke="#f4a51c" stroke-width="2"/><circle cx="68" cy="42" r="8.5" fill="none" stroke="#f4a51c" stroke-width="2"/><path d="M60.5 42 h-0.5" stroke="#f4a51c" stroke-width="2"/>
    <circle cx="53" cy="43" r="3.6" fill="#15202a"/><circle cx="69" cy="43" r="3.6" fill="#15202a"/><circle cx="54.2" cy="41.6" r="1.2" fill="#fff"/><circle cx="70.2" cy="41.6" r="1.2" fill="#fff"/>
    <path d="M54 53 Q60 58 66 53" stroke="#f2c4d8" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;

})();
