(function(){
/* Kahaani Class — Curiosity (Science) Grade 7, Chapter 6: Adolescence: A Stage of Growth and Change
   Story world: the "Growing-Up Garden" of a hill school near Wayanad, Kerala, where every class plants a sapling.
   Guide: Mayil, a young peacock whose tail is just beginning to grow.
   2D sims: k7s6_life (life stages + growth chart), k7s6_sort (changes sorting board), k7s6_cycle (cycle calendar ring),
            k7s6_plate (nutrition thali), k7s6_habit ("just once" habit loop + lungs)
   3D sim:  k7s6_grow3d (a growing figure at a height wall, brain signals and hormones)
   Scene: k7s6_garden   Guide: k7s6_mayil */

const k6hl = (hl, p) => ` data-part="${p}"${hl === p ? ' class="hl"' : ""}`;
const k6n = x => { const v = +x; return isFinite(v) ? v : 0; };

/* ---------- shared growth model (relative height 0..1) ---------- */
function k6h(a, pace) {
  a = Math.max(0, a); const c = 13 + k6n(pace);
  return Math.min(1, 0.16 + 0.42 * (1 - Math.exp(-a / 3.2)) + 0.42 / (1 + Math.exp(-(a - c) / 1.25)));
}
function k6stage(a) { return a < 2 ? "Infancy" : a < 10 ? "Childhood" : a < 19 ? "Adolescence" : a < 60 ? "Adulthood" : "Old age"; }

/* =========================================================
   1. k7s6_life — life-stage band + growth chart + a growing figure
   params: age (0..70), pace (-2..2: earlier / later growth spurt)
   reads: stage, growth     parts: "band", "curve", "figure"
   ========================================================= */
const K6AG = [0, 2, 10, 19, 60, 75], K6X = [30, 70, 170, 280, 390, 430];
function k6x(a) { a = clampN(a, 0, 75); for (let i = 1; i < K6AG.length; i++) if (a <= K6AG[i]) return K6X[i - 1] + (a - K6AG[i - 1]) / (K6AG[i] - K6AG[i - 1]) * (K6X[i] - K6X[i - 1]); return 430; }
SIM_DEF.k7s6_life = {
  def: { age: 12, pace: 0, ticks: 1 },
  rng: { age: () => [0, 70, 1], pace: () => [-2, 2, 1] },
  lab: { age: "Age (years)", pace: "Own pace: earlier ← → later" },
  reads: { stage: "Stage", growth: "Growth" },
  draw(D, P, sh, hl) {
    const a = clampN(k6n(D.age), 0, 70), pc = k6n(D.pace), y0 = 182, y1 = 46, Y = h => y0 - h * (y0 - y1);
    let s = `<svg viewBox="0 0 440 250">`;
    // axes
    s += `<line x1="30" y1="${y0}" x2="432" y2="${y0}" stroke="var(--muted)" stroke-width="1.5"/><line x1="30" y1="${y0}" x2="30" y2="36" stroke="var(--muted)" stroke-width="1.5"/>`;
    s += `<text x="16" y="110" fill="var(--muted)" font-size="10" font-family="Mulish, sans-serif" font-weight="700" text-anchor="middle" transform="rotate(-90 16 110)">height</text>`;
    // adolescence shading
    const tk = k6n(P.ticks) >= 1;
    if (tk) s += `<rect x="170" y="36" width="110" height="${y0 - 36}" fill="var(--rani)" opacity=".1"${k6hl(hl, "band")}/>`;
    // curve
    let d = ""; for (let i = 0; i <= 70; i += 0.5) d += (i ? "L" : "M") + k6x(i).toFixed(1) + " " + Y(k6h(i, pc)).toFixed(1) + " ";
    s += `<path d="${d}" fill="none" stroke="var(--teal)" stroke-width="3" stroke-linecap="round"${k6hl(hl, "curve")}/>`;
    // stage band
    const cols = ["var(--sky)", "var(--teal)", "var(--rani)", "var(--mari)", "var(--muted)"], names = ["Infancy", "Childhood", "Adolescence", "Adulthood", "Old age"];
    for (let i = 0; i < 5; i++) {
      const xa = K6X[i], xb = K6X[i + 1], on = tk && names[i] === k6stage(a);
      if (!tk) { s += `<rect x="${xa + 1}" y="196" width="${xb - xa - 2}" height="22" rx="5" fill="var(--night3)"/>` + T((xa + xb) / 2, 211, "?", { size: 10.5, fill: "var(--muted)" }); continue; }
      s += `<rect x="${xa + 1}" y="196" width="${xb - xa - 2}" height="22" rx="5" fill="${cols[i]}" opacity="${on ? .95 : .35}"${i === 2 ? k6hl(hl, "band") : ""}/>`;
      s += T((xa + xb) / 2, 211, names[i], { size: i === 0 || i === 4 ? 8.5 : 10.5, fill: on ? "#10233a" : "var(--ink)" });
    }
    if (tk) [["10", 170], ["19", 280]].forEach(([t, x]) => { s += `<line x1="${x}" y1="${y0}" x2="${x}" y2="196" stroke="var(--rani)" stroke-width="1.5"/>` + T(x, 232, t + " yrs", { size: 10, fill: "var(--rani)" }); });
    // marker
    const mx = k6x(a), my = Y(k6h(a, pc));
    s += `<line x1="${mx.toFixed(1)}" y1="${my.toFixed(1)}" x2="${mx.toFixed(1)}" y2="${y0}" stroke="var(--mari)" stroke-dasharray="4 3"/><circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="6" fill="var(--mari)" stroke="var(--ink)" stroke-width="1.5"/>`;
    // figure (top-left), scaled by height
    const h = k6h(a, pc), fh = 26 + 62 * h, fx0 = 64, fb = 112;
    s += `<g${k6hl(hl, "figure")}><ellipse cx="${fx0}" cy="${fb + 2}" rx="16" ry="3" fill="#000" opacity=".25"/>`;
    const hr = fh * .13, bodyT = fb - fh + hr * 2;
    s += `<circle cx="${fx0}" cy="${(fb - fh + hr).toFixed(1)}" r="${hr.toFixed(1)}" fill="#c98d5f"/>`;
    s += `<rect x="${(fx0 - fh * .13).toFixed(1)}" y="${(bodyT + 1).toFixed(1)}" width="${(fh * .26).toFixed(1)}" height="${(fh * .42).toFixed(1)}" rx="${(fh * .08).toFixed(1)}" fill="var(--sky)"/>`;
    s += `<rect x="${(fx0 - fh * .11).toFixed(1)}" y="${(bodyT + fh * .42).toFixed(1)}" width="${(fh * .09).toFixed(1)}" height="${(fb - bodyT - fh * .42).toFixed(1)}" rx="2" fill="#2f4a6b"/><rect x="${(fx0 + fh * .02).toFixed(1)}" y="${(bodyT + fh * .42).toFixed(1)}" width="${(fh * .09).toFixed(1)}" height="${(fb - bodyT - fh * .42).toFixed(1)}" rx="2" fill="#2f4a6b"/></g>`;
    s += T(fx0, 128, `${Math.round(k6n(P.age))} yrs`, { size: 11, fill: "var(--mari)" });
    // title
    s += T(300, 24, sh.has("stage") ? `Age ${Math.round(k6n(P.age))}: ${k6stage(k6n(P.age))}` : `Age ${Math.round(k6n(P.age))}: which stage?`, { size: 16 });
    s += "</svg>";
    const A = k6n(P.age), c = 13 + k6n(P.pace), g = A >= 19 ? "height now changes very little" : Math.abs(A - c) <= 2.5 ? "a growth spurt: height increases fast" : A < 10 ? "steady growth in height and weight" : "growing, at this person’s own pace";
    return { svg: s, reads: { stage: `${A} years: ${k6stage(A).toLowerCase()}${A >= 10 && A < 19 ? " (about 10 to 19 years)" : ""}`, growth: g } };
  }
};

/* =========================================================
   2. k7s6_sort — sorting board: changes observed only in boys / only in girls / in both
   params: n (items already placed 0..7), i (current item 0..6), col (column chosen for current item 0..2)
   reads: right     parts: "boys", "girls", "both"
   ========================================================= */
const K6ITEMS = [["Change in voice", 2], ["Development of breasts", 1], ["Growth of moustache", 0], ["Growth of facial hair", 0], ["Pimples on the face", 2], ["Hair in the pubic region", 2], ["Hair in armpits", 2]];
const K6COLS = ["Observed only in boys", "Observed only in girls", "Common in boys and girls"], K6CP = ["boys", "girls", "both"];
SIM_DEF.k7s6_sort = {
  def: { n: 0, i: 0, col: 2 },
  rng: { col: () => [0, 2, 1] },
  lab: { col: "Drop in column (0 boys · 1 girls · 2 both)" },
  reads: { right: "Correct column" },
  draw(D, P, sh, hl) {
    const n = clampN(Math.round(k6n(P.n)), 0, 7), cur = clampN(Math.round(k6n(P.i)), 0, 6), col = clampN(k6n(D.col), 0, 2);
    const cx = [76, 218, 360], cc = ["var(--sky)", "var(--rani)", "var(--teal)"];
    let s = `<svg viewBox="0 0 436 250">`;
    for (let k = 0; k < 3; k++) {
      s += `<rect x="${cx[k] - 68}" y="8" width="136" height="234" rx="10" fill="${cc[k]}" fill-opacity=".1" stroke="${cc[k]}" stroke-width="1.5"${k6hl(hl, K6CP[k])}/>`;
      const w = K6COLS[k].split(" "); s += T(cx[k], 26, w.slice(0, 2).join(" "), { size: 11.5, fill: cc[k] }) + T(cx[k], 41, w.slice(2).join(" "), { size: 11.5, fill: cc[k] });
    }
    const cnt = [0, 0, 0];
    for (let j = 0; j < n; j++) { const [t, k] = K6ITEMS[j], y = 56 + cnt[k]++ * 30;
      s += `<rect x="${cx[k] - 62}" y="${y}" width="124" height="24" rx="6" fill="var(--night3)" stroke="${cc[k]}"/>` + T(cx[k], y + 16, t, { size: t.length > 20 ? 9 : 10, fill: "var(--ink)" }); }
    if (n < 7 && P.showCur !== 0) {
      const [t, k] = K6ITEMS[cur], x = 76 + col * 142, ok = Math.round(col) === k && Math.abs(col - Math.round(col)) < .05;
      s += `<rect x="${(x - 64).toFixed(1)}" y="196" width="128" height="34" rx="8" fill="var(--mari)" stroke="var(--ink)" stroke-width="${ok && sh.has("right") ? 3 : 1.5}"/>` + T(x, 218, t, { size: t.length > 20 ? 9.5 : 11, fill: "#2a1a00" });
      s += T(x, 190, "▼ drop here?", { size: 9.5, fill: "var(--mari)" });
    }
    s += "</svg>";
    const [t, k] = K6ITEMS[cur];
    return { svg: s, reads: { right: `${t} → ${K6COLS[k].toLowerCase()}${cur === 0 ? " (hoarse in boys, slight in girls)" : ""}` } };
  }
};

/* =========================================================
   3. k7s6_cycle — menstrual cycle calendar ring
   params: L (cycle length 21..35), d (days of menstruation 3..7), day (cursor 1..L)
   reads: len, flow, next     parts: "flow", "ring"
   ========================================================= */
SIM_DEF.k7s6_cycle = {
  def: { L: 28, d: 5, day: 1 },
  rng: { L: () => [21, 35, 1], d: () => [3, 7, 1] },
  lab: { L: "Cycle length (days)", d: "Days of menstruation" },
  reads: { len: "Cycle length", flow: "Menstruation", next: "Next cycle" },
  draw(D, P, sh, hl) {
    const L = clampN(Math.round(k6n(D.L)), 21, 35), dd = clampN(Math.round(k6n(D.d)), 3, 7), day = clampN(Math.round(k6n(D.day)), 1, L);
    const cx = 120, cy = 124, R1 = 98, R2 = 70;
    let s = `<svg viewBox="0 0 430 250">`;
    for (let i = 0; i < L; i++) {
      const a0 = -Math.PI / 2 + i * 2 * Math.PI / L + .02, a1 = -Math.PI / 2 + (i + 1) * 2 * Math.PI / L - .02, fl = i < dd;
      const p = (r, a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
      s += `<path d="M${p(R1, a0)} A${R1} ${R1} 0 0 1 ${p(R1, a1)} L${p(R2, a1)} A${R2} ${R2} 0 0 0 ${p(R2, a0)}Z" fill="${fl ? "var(--rani)" : i + 1 === day ? "var(--mari)" : "var(--night3)"}" stroke="var(--line)" stroke-width="1"${fl ? k6hl(hl, "flow") : k6hl(hl, "ring")}/>`;
      const am = (a0 + a1) / 2; if (L <= 30 || i % 2 === 0) s += T(cx + (R1 + R2) / 2 * Math.cos(am), cy + (R1 + R2) / 2 * Math.sin(am) + 3.5, i + 1, { size: 9, fill: fl ? "#fff" : "var(--ink)" });
    }
    s += T(cx, cy - 6, `${L} days`, { size: 20 }) + T(cx, cy + 14, "one cycle", { size: 11, fill: "var(--muted)" });
    // legend + healthy range bar
    s += `<rect x="246" y="22" width="14" height="14" rx="3" fill="var(--rani)"/>` + T(266, 34, `days 1–${dd}: menstruation`, { size: 12, a: "start" });
    s += `<rect x="246" y="46" width="14" height="14" rx="3" fill="var(--night3)" stroke="var(--line)"/>` + T(266, 58, "rest of the cycle", { size: 12, a: "start" });
    const bx = v => 250 + (v - 20) / 16 * 160;
    s += T(330, 84, "healthy cycle lengths", { size: 11.5, fill: "var(--muted)" });
    s += `<rect x="250" y="104" width="160" height="14" rx="7" fill="var(--night3)"/><rect x="${bx(21)}" y="104" width="${bx(35) - bx(21)}" height="14" rx="7" fill="var(--teal)" opacity=".45"/><rect x="${bx(28)}" y="104" width="${bx(30) - bx(28)}" height="14" fill="var(--teal)"/>`;
    s += T(bx(21), 134, "21", { size: 10, fill: "var(--muted)" }) + T(bx(29), 134, "28–30 usual", { size: 10, fill: "var(--teal)" }) + T(bx(35), 134, "35", { size: 10, fill: "var(--muted)" });
    s += `<path d="M${bx(L)} 100 l-6 -9 h12z" fill="var(--mari)"/>`;
    s += T(330, 168, sh.has("next") ? `next cycle starts on day ${L + 1}` : "next cycle starts on day ?", { size: 13, fill: "var(--mari)" });
    s += T(330, 194, "A natural process —", { size: 11.5, fill: "var(--muted)" }) + T(330, 210, "a sign of good reproductive health", { size: 11.5, fill: "var(--muted)" });
    s += "</svg>";
    const Lp = Math.round(k6n(P.L)), dp = Math.round(k6n(P.d));
    return { svg: s, reads: { len: `${Lp} days ${Lp >= 21 && Lp <= 35 ? "(healthy range is 21–35 days)" : ""}`, flow: `${dp} days (it may last 3 to 7 days)`, next: `day ${Lp} + 1 = day ${Lp + 1}` } };
  }
};

/* =========================================================
   4. k7s6_plate — build a thali; nutrient bars respond
   params: milk, dal, greens, grain, fruit, junk (each 0/1)
   reads: got, verdict     parts: "bars", "plate"
   ========================================================= */
const K6FOOD = [
  ["milk", "Milk, curd, paneer", "#f3ead2", { Calcium: 3, Proteins: 1.5, Fats: 1 }],
  ["dal", "Dal, rajma, eggs", "#e9b44c", { Proteins: 3, Iron: 1, Carbohydrates: 1 }],
  ["greens", "Spinach, raisins, figs", "#4caf50", { Iron: 3, Vitamins: 1.5 }],
  ["grain", "Rice, roti, millets", "#d9c08a", { Carbohydrates: 3, Proteins: 1, Calcium: 1 }],
  ["fruit", "Fruits & vegetables", "#ef7b45", { Vitamins: 3, Iron: .5 }],
  ["junk", "Chips, burger, cola", "#8d6e63", { Fats: 3, Carbohydrates: 1 }]];
const K6NUT = ["Calcium", "Proteins", "Carbohydrates", "Fats", "Iron", "Vitamins"];
function k6plate(P) { const t = {}; K6NUT.forEach(k => t[k] = 0); K6FOOD.forEach(([k, , , n]) => { const on = k6n(P[k]); Object.keys(n).forEach(q => t[q] += n[q] * on); }); return t; }
SIM_DEF.k7s6_plate = {
  def: { milk: 0, dal: 0, greens: 0, grain: 0, fruit: 0, junk: 0 },
  rng: { milk: () => [0, 1, 1], dal: () => [0, 1, 1], greens: () => [0, 1, 1], grain: () => [0, 1, 1], fruit: () => [0, 1, 1], junk: () => [0, 1, 1] },
  lab: { milk: "Milk, curd, paneer", dal: "Dal, rajma, eggs", greens: "Spinach, raisins, figs", grain: "Rice, roti, millets", fruit: "Fruits & vegetables", junk: "Chips, burger, cola" },
  reads: { got: "Nutrients", verdict: "Plate check" },
  draw(D, P, sh, hl) {
    const t = k6plate(D);
    let s = `<svg viewBox="0 0 440 240">`;
    // thali
    s += `<circle cx="104" cy="118" r="92" fill="#c9ccd3" stroke="#8d939e" stroke-width="4"${k6hl(hl, "plate")}/><circle cx="104" cy="118" r="80" fill="#dfe2e7"/>`;
    const pos = [[64, 70], [144, 70], [44, 128], [104, 128], [164, 128], [104, 182]];
    K6FOOD.forEach(([k, l, c], i) => { const v = clampN(k6n(D[k]), 0, 1); if (v < .02) return; const [x, y] = pos[i], r = 24 * v;
      s += `<circle cx="${x}" cy="${y}" r="${(r + 3).toFixed(1)}" fill="#a8adb7"/><circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="${c}"/>`;
      if (k === "junk") s += `<path d="M${x - 10 * v} ${y + 4 * v} l${20 * v} ${-8 * v}" stroke="#5d4037" stroke-width="${3 * v}"/>`;
      if (v > .6) s += T(x, y + 4, ["Milk", "Dal", "Greens", "Roti", "Fruit", "Junk"][i], { size: 9.5, fill: "#22160f" }); });
    // bars
    s += `<g${k6hl(hl, "bars")}>`;
    K6NUT.forEach((n, i) => { const y = 22 + i * 32, w = Math.min(t[n], 4) / 4 * 150, good = t[n] >= 2;
      s += T(222, y + 13, n, { size: 11.5, a: "start" });
      s += `<rect x="222" y="${y + 17}" width="150" height="10" rx="5" fill="var(--night3)"/><rect x="222" y="${y + 17}" width="${w.toFixed(1)}" height="10" rx="5" fill="${n === "Fats" && t[n] > 2.6 ? "var(--red)" : good ? "var(--teal)" : "var(--mari)"}"/>`;
      s += T(384, y + 27, good ? (n === "Fats" && t[n] > 2.6 ? "too much" : "✓") : t[n] > 0 ? "low" : "–", { size: 10.5, fill: good ? (n === "Fats" && t[n] > 2.6 ? "var(--red)" : "var(--teal)") : "var(--muted)", a: "start" }); });
    s += `</g></svg>`;
    const tp = k6plate(P), low = ["Calcium", "Proteins", "Carbohydrates", "Iron", "Vitamins"].filter(k => tp[k] < 2), j = k6n(P.junk) >= 1;
    const verdict = !low.length && !j ? "Balanced thali for a growing body!" : !low.length && j ? "Nutrients are there, but drop the junk food" : `Add foods for: ${low.join(", ").toLowerCase()}`;
    return { svg: s, reads: { got: K6NUT.filter(k => tp[k] >= 2).join(", ").toLowerCase() || "very little yet", verdict } };
  }
};

/* =========================================================
   5. k7s6_habit — the "just one time" trap: urge grows with each try; lungs get damaged by smoke
   params: times (0..6), no (0/1: said NO firmly)
   reads: urge, health     parts: "loop", "lungs", "shield"
   ========================================================= */
SIM_DEF.k7s6_habit = {
  def: { times: 0, no: 0 },
  rng: { times: () => [0, 6, 1], no: () => [0, 1, 1] },
  lab: { times: "Times tried", no: "Said NO (0 no · 1 yes)" },
  reads: { urge: "Urge", health: "Lungs" },
  draw(D, P, sh, hl) {
    const no = clampN(k6n(D.no), 0, 1), tm = clampN(k6n(D.times), 0, 6) * (1 - no), k = tm / 6;
    let s = `<svg viewBox="0 0 440 240">`;
    // loop chain
    const lab = ["just once", "again", "again", "often", "regularly", "can’t stop"];
    s += `<g${k6hl(hl, "loop")}>`;
    lab.forEach((t, i) => { const a = -Math.PI / 2 + i * Math.PI / 3, x = 112 + 72 * Math.cos(a), y = 120 + 72 * Math.sin(a), on = tm >= i + 1 - .01;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="27" fill="${on ? "var(--red)" : "var(--night3)"}" fill-opacity="${on ? .85 : 1}" stroke="var(--line)"/>` + T(x, y + 4, t, { size: 9.5, fill: on ? "#fff" : "var(--muted)" });
      const a2 = a + Math.PI / 3, x2 = 112 + 72 * Math.cos(a2), y2 = 120 + 72 * Math.sin(a2);
      if (i < 5) s += `<line x1="${(x + (x2 - x) * .38).toFixed(1)}" y1="${(y + (y2 - y) * .38).toFixed(1)}" x2="${(x + (x2 - x) * .62).toFixed(1)}" y2="${(y + (y2 - y) * .62).toFixed(1)}" stroke="${tm >= i + 2 - .01 ? "var(--red)" : "var(--line)"}" stroke-width="3"/>`; });
    s += `</g>`;
    s += T(112, 116, no > .5 ? "Said NO!" : "Urge", { size: 13, fill: no > .5 ? "var(--teal)" : "var(--ink)" });
    s += `<rect x="82" y="124" width="60" height="9" rx="4.5" fill="var(--night3)"/><rect x="82" y="124" width="${(60 * k).toFixed(1)}" height="9" rx="4.5" fill="var(--red)"/>`;
    if (no > .02) s += `<g opacity="${no.toFixed(2)}"${k6hl(hl, "shield")}><path d="M112 150 l18 6 v12 q0 14 -18 22 q-18 -8 -18 -22 v-12z" fill="var(--teal)" stroke="var(--ink)" stroke-width="1.5"/>` + T(112, 177, "NO", { size: 12, fill: "#10233a" }) + `</g>`;
    // lungs
    const pink = [240, 140, 160], grey = [92, 84, 88], c = pink.map((p, i) => Math.round(p + (grey[i] - p) * k)), col = `rgb(${c.join(",")})`;
    s += `<g${k6hl(hl, "lungs")}><rect x="319" y="40" width="10" height="44" rx="4" fill="#c7a5ab"/>`;
    s += `<path d="M318 82 Q290 70 276 100 Q262 140 270 182 Q284 198 312 188 Q322 150 318 82Z" fill="${col}"/><path d="M330 82 Q358 70 372 100 Q386 140 378 182 Q364 198 336 188 Q326 150 330 82Z" fill="${col}"/>`;
    const sp = [[290, 120], [300, 160], [284, 150], [356, 118], [350, 160], [366, 146], [296, 100], [344, 100], [306, 136], [340, 136], [282, 172], [366, 172]];
    sp.slice(0, Math.round(k * 12)).forEach(([x, y], i) => { s += `<circle cx="${x}" cy="${y}" r="${3 + (i % 3)}" fill="#2a2228" opacity=".75"/>`; });
    s += `</g>`;
    s += T(324, 216, k < .05 ? "healthy lungs" : k < .5 ? "smoke starts to harm the lungs" : "damaged lungs", { size: 12, fill: k < .05 ? "var(--teal)" : "var(--red)" });
    s += T(324, 26, "Lungs", { size: 12, fill: "var(--muted)" });
    s += "</svg>";
    const n = Math.round(k6n(P.times)), nn = k6n(P.no) >= 1;
    return { svg: s, reads: { urge: nn ? "none: said NO the first time and every time" : n === 0 ? "none yet" : n < 3 ? "a strong urge to take it again" : "addiction: substance abuse", health: nn || n === 0 ? "healthy" : n < 3 ? "harm has begun" : "breathing difficulties, damaged lungs" } };
  }
};

/* =========================================================
   SCENE — the Growing-Up Garden at dusk: hills, palms, a row of saplings that grow and flower, fireflies
   ========================================================= */
let k6w = null;
function k6wInit(W, H) {
  const r = (a, b) => a + Math.random() * (b - a);
  k6w = { W, H, ff: Array.from({ length: Math.max(14, Math.round(W / 60)) }, () => ({ x: r(0, W), y: r(H * .35, H * .9), p: r(0, 6.28), s: r(.2, .6) })),
    hills: Array.from({ length: 10 }, (_, i) => ({ x: i * W / 9, h: r(30, 90) })), clouds: Array.from({ length: 4 }, () => ({ x: r(0, W), y: r(H * .06, H * .25), s: r(.08, .2), w: r(80, 160) })) };
}
SCENES.k7s6_garden = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!k6w || k6w.W !== W || k6w.H !== H) k6wInit(W, H);
  const S = k6w, gy = H * .8;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#0e2a3a"); g.addColorStop(.6, "#1c4a52"); g.addColorStop(1, "#3c6b4f");
  c.fillStyle = g; c.fillRect(0, 0, W, gy);
  // setting sun
  const sx = W * .72, sy = gy - H * .16, sr = Math.min(W, H) * .06;
  const sg = c.createRadialGradient(sx, sy, sr * .5, sx, sy, sr * 3.2); sg.addColorStop(0, "rgba(255,200,120,.35)"); sg.addColorStop(1, "rgba(255,200,120,0)"); c.fillStyle = sg; c.beginPath(); c.arc(sx, sy, sr * 3.2, 0, 6.28); c.fill();
  c.fillStyle = "#ffcf7a"; c.beginPath(); c.arc(sx, sy, sr, 0, 6.28); c.fill();
  // clouds
  S.clouds.forEach(k => { if (!RM) { k.x += k.s; if (k.x > W + 200) k.x = -200; } c.fillStyle = "rgba(220,235,240,.12)"; c.beginPath(); c.ellipse(k.x, k.y, k.w, k.w * .22, 0, 0, 6.28); c.fill(); c.beginPath(); c.ellipse(k.x + k.w * .3, k.y - k.w * .1, k.w * .5, k.w * .2, 0, 0, 6.28); c.fill(); });
  // hills
  c.fillStyle = "#1b3d34"; c.beginPath(); c.moveTo(0, gy); S.hills.forEach((h, i) => c.quadraticCurveTo(h.x - W / 18, gy - h.h - 20, h.x, gy - h.h)); c.lineTo(W, gy); c.fill();
  c.fillStyle = "#23493a"; c.fillRect(0, gy - 6, W, 6);
  // coconut palms
  [W * .06, W * .93].forEach((x, i) => { const sw = Math.sin(t / 1800 + i) * 6, th = Math.min(H * .45, 320);
    c.strokeStyle = "#5b4630"; c.lineWidth = 8; c.beginPath(); c.moveTo(x, gy); c.quadraticCurveTo(x + 14, gy - th / 2, x + sw, gy - th); c.stroke();
    c.strokeStyle = "#2f6b3f"; c.lineWidth = 5; for (let k = 0; k < 7; k++) { const a = -Math.PI + k * Math.PI / 6 + Math.sin(t / 1500 + k) * .05; c.beginPath(); c.moveTo(x + sw, gy - th); c.quadraticCurveTo(x + sw + Math.cos(a) * 50, gy - th + Math.sin(a) * 30 - 20, x + sw + Math.cos(a) * 90, gy - th + 40 + Math.sin(a) * 10); c.stroke(); } });
  // ground
  c.fillStyle = "#16301f"; c.fillRect(0, gy, W, H - gy);
  // row of saplings: seed → sapling → young plant → flowering → fruiting, gently growing in a loop
  const n = 5, ph = (t / 9000) % 1;
  for (let i = 0; i < n; i++) {
    const x = W * (.26 + i * .12), grow = clampN((i + ph) / n * 1.15, 0, 1), h = 10 + grow * Math.min(H * .2, 140), sw = Math.sin(t / 1300 + i) * 3;
    c.fillStyle = "#5b3b22"; c.beginPath(); c.ellipse(x, gy + 4, 22, 6, 0, 0, 6.28); c.fill();
    c.strokeStyle = "#7fbf5a"; c.lineWidth = 3 + grow * 4; c.beginPath(); c.moveTo(x, gy); c.quadraticCurveTo(x + sw, gy - h / 2, x + sw * 2, gy - h); c.stroke();
    const leaves = 1 + Math.floor(grow * 6);
    for (let k = 0; k < leaves; k++) { const yy = gy - h * (k + 1) / (leaves + 1), s = k % 2 ? 1 : -1, L = 8 + grow * 14; c.fillStyle = "#59a64a"; c.beginPath(); c.ellipse(x + sw * (yy < gy - h / 2 ? 1.5 : .5) + s * L * .7, yy, L, L * .38, s * -.5, 0, 6.28); c.fill(); }
    if (grow > .55) { c.fillStyle = grow > .8 ? "#ff9a3c" : "#ff7aa8"; for (let k = 0; k < 3; k++) { c.beginPath(); c.arc(x + sw * 2 + (k - 1) * 9, gy - h - 4 + (k % 2) * 6, 4 + (grow > .8 ? 2 : 0), 0, 6.28); c.fill(); } }
  }
  // height-chart wall (school growth chart)
  const wx = W * .82, wh = Math.min(H * .3, 200);
  c.fillStyle = "rgba(239,220,174,.18)"; c.fillRect(wx - 16, gy - wh, 32, wh);
  c.strokeStyle = "rgba(239,220,174,.5)"; c.lineWidth = 1; for (let k = 0; k <= 10; k++) { const y = gy - k * wh / 10; c.beginPath(); c.moveTo(wx - 16, y); c.lineTo(wx - (k % 5 ? 6 : 0), y); c.stroke(); }
  // fireflies
  S.ff.forEach(f => { if (!RM) { f.x += Math.sin(t / 1000 + f.p) * f.s; f.y += Math.cos(t / 1300 + f.p) * f.s * .6; }
    const a = .35 + .45 * Math.sin(t / 400 + f.p * 3); const fg = c.createRadialGradient(f.x, f.y, 0, f.x, f.y, 10); fg.addColorStop(0, `rgba(230,255,140,${a})`); fg.addColorStop(1, "rgba(230,255,140,0)"); c.fillStyle = fg; c.beginPath(); c.arc(f.x, f.y, 10, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(4,14,20,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Mayil, a young peacock whose tail is just growing in
   ========================================================= */
GUIDES.k7s6_mayil = () => `<svg class="guide peacock" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="32" ry="4" fill="#000" opacity=".25"/>
  <g><animateTransform attributeName="transform" type="rotate" values="-4 60 100;4 60 100;-4 60 100" dur="3.2s" repeatCount="indefinite"/>
    ${[-50, -30, -10, 10, 30, 50].map(a => `<g transform="rotate(${a} 60 100)"><path d="M60 100 Q54 66 60 44 Q66 66 60 100Z" fill="#1f8a6e"/><ellipse cx="60" cy="50" rx="6" ry="8" fill="#2a9d8f"/><ellipse cx="60" cy="51" rx="3.6" ry="4.8" fill="#f4a51c"/><circle cx="60" cy="52" r="2.2" fill="#1d3b8a"/></g>`).join("")}
  </g>
  <path d="M50 112 l-3 10 M70 112 l3 10" stroke="#c98d5f" stroke-width="3" stroke-linecap="round"/>
  <path d="M44 124 h8 M68 124 h8" stroke="#c98d5f" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="60" cy="96" rx="20" ry="20" fill="#1d4fa3"/>
  <path d="M44 92 Q40 108 54 114 Q50 100 52 90Z" fill="#163d80"/><path d="M76 92 Q80 108 66 114 Q70 100 68 90Z" fill="#163d80"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M54 82 Q52 62 58 52 L64 52 Q68 64 66 82Z" fill="#2563c9"/>
    <ellipse cx="61" cy="44" rx="13" ry="12" fill="#2563c9"/>
    <g fill="#2a9d8f"><line x1="58" y1="33" x2="54" y2="20" stroke="#1f6f86" stroke-width="1.5"/><line x1="62" y1="33" x2="62" y2="18" stroke="#1f6f86" stroke-width="1.5"/><line x1="66" y1="33" x2="70" y2="20" stroke="#1f6f86" stroke-width="1.5"/>
      <circle cx="54" cy="19" r="2.6"/><circle cx="62" cy="17" r="2.6"/><circle cx="70" cy="19" r="2.6"/></g>
    <path d="M56 46 Q60 40 66 44" fill="#fff" opacity=".9"/>
    <circle cx="57" cy="42" r="3.4" fill="#15202a"/><circle cx="58.2" cy="40.8" r="1.1" fill="#fff"/>
    <circle cx="67" cy="42" r="3.4" fill="#15202a"/><circle cx="68.2" cy="40.8" r="1.1" fill="#fff"/>
    <rect x="52" y="36" width="20" height="0" fill="#2563c9"><animate attributeName="height" values="0;0;0;9;0" keyTimes="0;.82;.9;.95;1" dur="4.2s" repeatCount="indefinite"/></rect>
    <path d="M59 47 L62 55 L65 47Z" fill="#e8b04a"/>
    <circle cx="52" cy="49" r="2.6" fill="#ff7aa2" opacity=".5"/><circle cx="71" cy="49" r="2.6" fill="#ff7aa2" opacity=".5"/>
  </g>
</svg>`;

/* =========================================================
   3D — k7s6_grow3d: a figure grows beside a school height wall; from about 10 years,
   the brain sends signals and hormones (glowing messengers) travel to different parts of the body.
   params: age (4..22), sig (0/1 show signals)   reads: stage, hormones   parts: "brain", "body"
   ========================================================= */
function k6tex(THREE, draw, w, h) { const cv = document.createElement("canvas"); cv.width = w || 128; cv.height = h || 128; draw(cv.getContext("2d"), cv.width, cv.height); const t = new THREE.CanvasTexture(cv); return t; }
SIM_DEF.k7s6_grow3d = {
  def: { age: 8, sig: 0, pace: 0 },
  rng: { age: () => [4, 22, 1], sig: () => [0, 1, 1] },
  lab: { age: "Age (years)", sig: "Show brain signals (0/1)" },
  reads: { stage: "Stage", hormones: "Hormones" },
  readouts(P) {
    const a = Math.round(k6n(P.age)), on = k6n(P.sig) >= 1;
    return { stage: `${a} years: ${k6stage(a).toLowerCase()}`,
      hormones: !on ? "signals hidden" : a < 10 ? "few changes yet: mostly height and weight" : a < 19 ? "brain signals → hormones released → puberty changes, moods" : "body is now adult; hormones keep working" };
  },
  init(stage, I) {
    const g = make3D(stage, { height: 310, dist: 8.5, phi: 1.3, theta: .3, auto: .06, target: [0.3, 2, 0], hint: "Drag to turn" }); if (!g) return null;
    const { THREE, root } = g;
    const floor = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.6, .14, 40), new THREE.MeshStandardMaterial({ color: 0x3c6b4f, roughness: .9 })); floor.position.y = -.07; root.add(floor);
    // height wall with marks
    const wallT = k6tex(THREE, (c, w, h) => { c.fillStyle = "#efdcae"; c.fillRect(0, 0, w, h); c.strokeStyle = "#7a5a2e"; c.fillStyle = "#7a5a2e"; c.font = "bold 16px sans-serif";
      for (let k = 0; k <= 20; k++) { const y = h - k * h / 20; c.lineWidth = k % 5 ? 2 : 4; c.beginPath(); c.moveTo(0, y); c.lineTo(k % 5 ? 30 : 60, y); c.stroke(); } c.fillStyle = "#e04a86"; c.fillRect(w - 26, 0, 14, h); }, 128, 512);
    const wall = new THREE.Mesh(new THREE.BoxGeometry(1.1, 4.4, .12), [0, 0, 0, 0, 0, 0].map((_, i) => i === 4 ? new THREE.MeshStandardMaterial({ map: wallT }) : new THREE.MeshStandardMaterial({ color: 0xd4b26c }))); wall.position.set(-1.0, 2.2, -.5); root.add(wall);
    // figure
    const fig = new THREE.Group(); root.add(fig);
    const skin = new THREE.MeshStandardMaterial({ color: 0xc98d5f, roughness: .6 }), shirt = new THREE.MeshStandardMaterial({ color: 0x62b6e8, roughness: .5, emissive: 0x0b2a44, emissiveIntensity: .2 }), pant = new THREE.MeshStandardMaterial({ color: 0x2f4a6b, roughness: .7 });
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(.13, .12, 1, 14), pant), legR = legL.clone(); legL.position.set(-.17, .5, 0); legR.position.set(.17, .5, 0); fig.add(legL, legR);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(.32, .36, 1.1, 20), shirt); body.position.y = 1.55; fig.add(body);
    const armL = new THREE.Mesh(new THREE.CylinderGeometry(.09, .08, .95, 12), shirt), armR = armL.clone(); armL.position.set(-.45, 1.5, 0); armR.position.set(.45, 1.5, 0); armL.rotation.z = .12; armR.rotation.z = -.12; fig.add(armL, armR);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.34, 24, 18), skin); head.position.y = 2.45; fig.add(head);
    const hair = new THREE.Mesh(new THREE.SphereGeometry(.355, 24, 12, 0, Math.PI * 2, 0, Math.PI * .45), new THREE.MeshStandardMaterial({ color: 0x22160f })); hair.position.y = 2.47; fig.add(hair);
    const brainM = new THREE.MeshBasicMaterial({ color: 0xf4a51c, transparent: true, opacity: .0 });
    const brain = new THREE.Mesh(new THREE.SphereGeometry(.2, 18, 14), brainM); brain.position.set(0, 2.52, .05); fig.add(brain);
    // destinations ("different parts of the body") and travelling messengers
    const dests = [[0, 1.85, .34], [-.42, 1.2, .1], [.42, 1.2, .1], [0, 1.25, .36], [-.17, .45, .14], [.17, .45, .14]];
    const dotM = new THREE.MeshBasicMaterial({ color: 0xe04a86 });
    const spots = dests.map(p => { const m = new THREE.Mesh(new THREE.SphereGeometry(.06, 10, 8), new THREE.MeshBasicMaterial({ color: 0x35c29a, transparent: true, opacity: 0 })); m.position.set(...p); fig.add(m); return m; });
    const msgs = Array.from({ length: 12 }, (_, i) => { const m = new THREE.Mesh(new THREE.SphereGeometry(.055, 10, 8), dotM); m.visible = false; fig.add(m); return { m, k: i % dests.length, off: i / 12 }; });
    const lTop = g.label("", [1.6, 4.3, 0], "big"), lAge = g.label("", [-1.0, 4.7, -.5], "plain");
    const st = { a: 8, on: 0, hl: null };
    g.onFrame((t) => {
      const act = st.on && st.a >= 10 ? (st.a < 19 ? 1 : .45) : 0;
      brainM.opacity = act ? .55 + .35 * Math.sin(t * 5) : (st.hl === "brain" ? .6 : 0);
      msgs.forEach(o => { o.m.visible = act > 0 && (o.off < act + .01); if (!o.m.visible) return; const u = (t * .45 + o.off) % 1, d = dests[o.k];
        o.m.position.set(c4l(0, d[0], u), c4l(2.52, d[1], u) + Math.sin(u * Math.PI) * .1, c4l(.12, d[2] + .05, u)); });
      spots.forEach((m, i) => { m.material.opacity = act ? .5 + .4 * Math.sin(t * 4 + i) : 0; });
      shirt.emissiveIntensity = st.hl === "body" ? .6 + .4 * Math.sin(t * 8) : .2;
    });
    function c4l(a, b, k) { return a + (b - a) * k; }
    return {
      update(D, P, sh, hl) {
        st.hl = hl; const a = clampN(k6n(D.age), 4, 22); st.a = Math.round(k6n(P.age)); st.on = k6n(P.sig) >= 1 ? 1 : 0;
        const h = k6h(a, k6n(P.pace)), sc = .5 + .62 * h; fig.scale.set(sc, sc * 1.15, sc);
        const R = SIM_DEF.k7s6_grow3d.readouts(P);
        lAge.set(`<span style="font-size:12px">${st.a} yrs</span>`);
        lTop.set(sh.has("stage") ? k6stage(st.a) : "Growing up");
        lTop.move([2.1, Math.max(2.4, sc * 1.15 * 2.8), 0]);
      },
      dispose() { g.dispose(); }
    };
  }
};
})();
