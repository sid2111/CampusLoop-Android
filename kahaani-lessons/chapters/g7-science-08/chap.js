(function(){
/* Grade 7 Science (Curiosity) Chapter 8 — Measurement of Time and Motion
   Plugin: sims (k7s8_*), the Jaipur Jantar Mantar dusk scene, and Ghadi the gharial timekeeper guide. */

const hlA = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const num = x => { const v = +x; return isFinite(v) ? v : 0; };
const f1 = (x, d = 2) => { const r = Math.round(num(x) * 10 ** d) / 10 ** d; return String(r); };
const G = 9.8;
const periodOf = Lcm => 2 * Math.PI * Math.sqrt(Math.max(1, num(Lcm)) / 100 / G);
const hhmm = h => { const H = Math.floor(h), M = Math.round((h - H) * 60); const hh = ((H + 11) % 12) + 1; return `${hh}:${String(M).padStart(2, "0")} ${H < 12 ? "AM" : "PM"}`; };

/* =========================================================
   1. k7s8_sundial — a stick (gnomon) on a dial; the Sun crosses the sky and the shadow turns
   params: h (hour of day, 6–18), lx (title)   readouts: time, shadow   parts: "sun", "shadow"
   ========================================================= */
SIM_DEF.k7s8_sundial = {
  def: { h: 9, lx: "" },
  rng: { h: () => [6, 18, 0.5] },
  lab: { h: "Hour of the day" },
  reads: { time: "Sundial time", shadow: "Shadow" },
  draw(D, P, sh, hl) {
    const h = Math.max(6, Math.min(18, num(D.h))), a = Math.PI * (h - 6) / 12;
    const el = Math.max(0.12, Math.sin(a) * 1.15);
    const sx = 210 - Math.cos(a) * 170, sy = 112 - Math.sin(a) * 84;
    const cx = 210, cy = 178, R = 150;
    let s = `<svg viewBox="0 0 420 240">`;
    s += `<defs><linearGradient id="k7s8sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b5b86"/><stop offset="1" stop-color="#f3b26b" stop-opacity=".55"/></linearGradient></defs>`;
    s += `<rect x="0" y="0" width="420" height="140" rx="10" fill="url(#k7s8sky)" opacity=".55"/>`;
    s += `<path d="M40 112 A170 84 0 0 1 380 112" fill="none" stroke="var(--manila)" stroke-opacity=".35" stroke-dasharray="4 5"/>`;
    s += T(30, 128, "East", { size: 11, fill: "var(--muted)", a: "start" }) + T(390, 128, "West", { size: 11, fill: "var(--muted)", a: "end" });
    s += `<g${hlA(hl, "sun")}><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="15" fill="#ffd36b"/><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="22" fill="#ffd36b" opacity=".25"/></g>`;
    // the dial plate (seen at a slant)
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${R + 12}" ry="${(R + 12) * .36}" fill="#d8c08a" stroke="#8a6a2b" stroke-width="2"/>`;
    for (let k = 6; k <= 18; k++) {
      const b = Math.PI * (k - 6) / 12, ex = cx + Math.cos(b) * R, ey = cy - Math.sin(b) * R * .36;
      s += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="#8a6a2b" stroke-opacity=".45" stroke-width="1"/>`;
      if (k % 2 === 0) s += T((cx + Math.cos(b) * (R - 14)).toFixed(1), (cy - Math.sin(b) * (R - 14) * .36 + 4).toFixed(1), k > 12 ? k - 12 : k, { size: 10, fill: "#3b2a10" });
    }
    const Ls = Math.min(R - 4, 62 / Math.tan(el)), tx = cx + Math.cos(a) * Ls, ty = cy - Math.sin(a) * Ls * .36;
    s += `<path d="M${cx - 3} ${cy} L${tx.toFixed(1)} ${ty.toFixed(1)} L${cx + 3} ${cy}Z" fill="#2a2418" opacity=".75"${hlA(hl, "shadow")}/>`;
    s += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 62}" stroke="#5a3b16" stroke-width="5" stroke-linecap="round"/>`;
    s += T(cx + 10, cy - 54, "stick", { size: 10, fill: "var(--manila)", a: "start" });
    s += T(210, 24, P.lx ? svgFr(P.lx) : "The shadow moves as the Sun moves", { size: 13, fill: "var(--ink)" });
    s += "</svg>";
    const len = Ls > 110 ? "long" : Ls > 45 ? "medium" : "short", dir = h < 11.75 ? "towards the west" : h > 12.25 ? "towards the east" : "towards the north";
    return { svg: s, reads: { time: hhmm(num(P.h)), shadow: `${len}, pointing ${dir}` } };
  }
};

/* =========================================================
   2. k7s8_water — water clocks. type "out": water drips from an upper vessel (Activity 8.1 bottle);
   minute marks bunch up because the flow slows as the level falls. type "bowl": Ghatika-yantra,
   a bowl with a fine hole fills and sinks in 24 min.
   params: type, t (minutes), T (minutes to empty / sink)   readouts: time, level   parts: "top", "marks", "bowl"
   ========================================================= */
SIM_DEF.k7s8_water = {
  def: { type: "out", t: 0, T: 8, lx: "" },
  rng: { t: P => [0, P.type === "bowl" ? 24 : P.T, 1] },
  lab: { t: "Minutes passed" },
  reads: { time: "Time", level: "Water" },
  draw(D, P, sh, hl) {
    const t = Math.max(0, num(D.t)), TT = Math.max(1, num(P.T));
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 22, P.lx ? svgFr(P.lx) : (P.type === "bowl" ? "Ghatika-yantra: the sinking bowl" : "Bottle water clock"), { size: 13 });
    let reads;
    if (P.type === "bowl") {
      const k = Math.min(1, t / 24), sunk = t >= 23.99;
      s += `<rect x="90" y="70" width="240" height="140" rx="10" fill="rgba(98,182,232,.12)" stroke="var(--sky)" stroke-width="2"/>`;
      s += `<rect x="92" y="96" width="236" height="112" rx="8" fill="var(--sky)" opacity=".45"/>`;
      const by = sunk ? 176 : 80 + k * 30, bw = 80;
      s += `<g${hlA(hl, "bowl")}><path d="M${210 - bw / 2} ${by} Q210 ${by + 44} ${210 + bw / 2} ${by}Z" fill="#c9893a" stroke="#7a4a16" stroke-width="2"/>`;
      s += `<path d="M${210 - bw / 2 + 8 + k * 2} ${by + 6 + 12 * (1 - k)} Q210 ${by + 40} ${210 + bw / 2 - 8 - k * 2} ${by + 6 + 12 * (1 - k)}Z" fill="var(--sky)" opacity="${0.15 + k * .7}"/></g>`;
      s += `<circle cx="210" cy="${by + 22}" r="2" fill="#2a2418"/>`;
      if (!sunk) s += `<path d="M210 ${by + 24} v7" stroke="var(--sky)" stroke-width="2" stroke-dasharray="2 2"/>`;
      s += T(210, 230, sunk ? "Sunk! Strike the gong: 1 ghati" : `bowl ${Math.round(k * 100)}% full`, { size: 13, fill: sunk ? "var(--mari)" : "var(--muted)" });
      s += `<rect x="20" y="70" width="58" height="58" rx="8" fill="rgba(10,15,40,.6)" stroke="var(--mari)"/>` + T(49, 96, `${Math.round(num(P.t))}`, { size: 20, fill: "var(--mari)" }) + T(49, 116, "min", { size: 11, fill: "var(--muted)" });
      if (sunk) s += `<circle cx="372" cy="100" r="24" fill="#d9a441" stroke="#7a4a16" stroke-width="3"${hlA(hl, "gong")}/>` + T(372, 104, "GONG", { size: 10, fill: "#3b2a10" });
      reads = { time: `${Math.round(num(P.t))} min of 24 min`, level: num(P.t) >= 24 ? "bowl sank: 1 ghati = 24 min; 60 ghatis = 24 h" : "bowl slowly filling through the fine hole" };
    } else {
      const u = Math.pow(Math.max(0, 1 - t / TT), 2);
      const topY = 50, topH = 80, botY = 140, botH = 80, X = 160, W = 100;
      // upper (inverted) half
      s += `<path d="M${X} ${topY} h${W} v${topH - 16} l-${W / 2 - 6} 16 h-12 l-${W / 2 - 6} -16 Z" fill="rgba(98,182,232,.08)" stroke="var(--sky)" stroke-width="2"${hlA(hl, "top")}/>`;
      const wl = topY + (topH - 16) * (1 - u);
      if (u > 0.001) s += `<path d="M${X + 2} ${wl.toFixed(1)} h${W - 4} V${topY + topH - 16} l-${W / 2 - 8} 15 h-8 l-${W / 2 - 8} -15 Z" fill="#4f7ff0" opacity=".75"/>`;
      s += `<rect x="${X + W / 2 - 7}" y="${topY + topH - 2}" width="14" height="6" fill="var(--mari)"/>`;
      if (u > 0.001) s += `<path d="M${X + W / 2} ${topY + topH + 6} V${botY + botH - 4 - (botH - 8) * (1 - u)}" stroke="#4f7ff0" stroke-width="2" stroke-dasharray="3 4"/>`;
      // lower half
      s += `<rect x="${X}" y="${botY}" width="${W}" height="${botH}" rx="6" fill="rgba(98,182,232,.08)" stroke="var(--sky)" stroke-width="2"/>`;
      const lv = (botH - 8) * (1 - u);
      s += `<rect x="${X + 2}" y="${(botY + botH - 2 - lv).toFixed(1)}" width="${W - 4}" height="${lv.toFixed(1)}" fill="#4f7ff0" opacity=".75"/>`;
      // minute marks on the lower part
      let mk = "", lastY = 1e9;
      for (let m = 1; m <= Math.min(Math.floor(t + 1e-6), TT); m++) {
        const ly = botY + botH - 2 - (botH - 8) * (1 - Math.pow(1 - m / TT, 2));
        mk += `<line x1="${X + W}" y1="${ly.toFixed(1)}" x2="${X + W + 14}" y2="${ly.toFixed(1)}" stroke="var(--mari)" stroke-width="2"/>` + (lastY - ly >= 11 ? T(X + W + 18, ly + 4, `${m} min`, { size: 10, fill: "var(--mari)", a: "start" }) : "");
        if (lastY - ly >= 11) lastY = ly;
      }
      s += `<g${hlA(hl, "marks")}>${mk}</g>`;
      s += T(X - 10, topY + 30, "cap with", { size: 10, fill: "var(--muted)", a: "end" }) + T(X - 10, topY + 43, "a tiny hole", { size: 10, fill: "var(--muted)", a: "end" });
      s += `<rect x="20" y="150" width="70" height="58" rx="8" fill="rgba(10,15,40,.6)" stroke="var(--mari)"/>` + T(55, 176, `${Math.round(num(P.t))}`, { size: 20, fill: "var(--mari)" }) + T(55, 196, "min", { size: 11, fill: "var(--muted)" });
      reads = { time: `${Math.round(num(P.t))} min`, level: u < 0.001 ? "all the water has dripped down" : (num(P.t) > 0 ? "flow slows as the top level falls: marks get closer" : "top part full, starting to drip") };
    }
    s += "</svg>";
    return { svg: s, reads };
  }
};

/* =========================================================
   3. k7s8_pend — simple pendulum: rigid support, thread, bob; mean position O, extremes A and B.
   The bob swings with the true time period T = 2π√(L/g).
   params: L (cm), m (g), amp (deg), pos ("" swing | "O" | "A" | "B"), lx
   readouts: T (time period), ten (time for 10 oscillations)   parts: "bob", "mean", "ext", "thread"
   ========================================================= */
SIM_DEF.k7s8_pend = {
  def: { L: 100, m: 200, amp: 14, pos: "", lx: "" },
  rng: { L: () => [20, 200, 5], m: () => [50, 500, 50] },
  lab: { L: "Length of string (cm)", m: "Mass of bob (g)" },
  reads: { T: "Time period", ten: "10 oscillations take" },
  draw(D, P, sh, hl) {
    const L = Math.max(20, num(D.L)), px = 150, py = 44, len = 40 + L * 0.8, amp = num(P.amp) || 14;
    const r = 7 + Math.sqrt(Math.max(50, num(D.m))) * 0.55, Tp = periodOf(num(P.L));
    const ang = P.pos === "A" ? amp : P.pos === "B" ? -amp : 0;
    let s = `<svg viewBox="0 0 420 240">`;
    s += `<rect x="60" y="30" width="180" height="14" rx="3" fill="#8a6a2b"/>` + T(66, 58, "rigid support", { size: 10, fill: "var(--muted)", a: "start" });
    for (let i = 0; i < 9; i++) s += `<line x1="${66 + i * 20}" y1="30" x2="${76 + i * 20}" y2="22" stroke="#8a6a2b" stroke-width="2"/>`;
    // guide marks for O, A, B
    const ex = d => px + Math.sin(d * Math.PI / 180) * len, ey = d => py + Math.cos(d * Math.PI / 180) * len;
    s += `<path d="M${ex(-amp).toFixed(1)} ${ey(-amp).toFixed(1)} A${len} ${len} 0 0 0 ${ex(amp).toFixed(1)} ${ey(amp).toFixed(1)}" fill="none" stroke="var(--muted)" stroke-dasharray="3 4"/>`;
    s += `<line x1="${px}" y1="${py}" x2="${px}" y2="${py + len + r + 8}" stroke="var(--teal)" stroke-dasharray="2 4"${hlA(hl, "mean")}/>`;
    s += T(px, Math.min(232, py + len + r + 22), "O (mean)", { size: 11, fill: "var(--teal)" });
    s += `<g${hlA(hl, "ext")}>` + T(ex(amp) + 12, ey(amp) + 4, "A", { size: 13, fill: "var(--mari)", a: "start" }) + T(ex(-amp) - 12, ey(-amp) + 4, "B", { size: 13, fill: "var(--mari)", a: "end" }) + `</g>`;
    const swing = !P.pos && !RM;
    const anim = swing ? `<animateTransform attributeName="transform" type="rotate" values="${-amp} ${px} ${py};${amp} ${px} ${py};${-amp} ${px} ${py}" keyTimes="0;.5;1" calcMode="spline" keySplines=".37 0 .63 1;.37 0 .63 1" dur="${Tp.toFixed(3)}s" repeatCount="indefinite"/>` : "";
    s += `<g transform="rotate(${-ang} ${px} ${py})">${anim}<line x1="${px}" y1="${py}" x2="${px}" y2="${py + len}" stroke="var(--ink)" stroke-width="1.6"${hlA(hl, "thread")}/>`;
    s += `<circle cx="${px}" cy="${py + len}" r="${r.toFixed(1)}" fill="#b9c3cf" stroke="#5d6b7a" stroke-width="2"${hlA(hl, "bob")}/><circle cx="${px - r * .3}" cy="${py + len - r * .3}" r="${(r * .28).toFixed(1)}" fill="#fff" opacity=".6"/></g>`;
    // stopwatch panel
    s += `<rect x="282" y="56" width="124" height="150" rx="12" fill="rgba(10,15,40,.6)" stroke="var(--line)"/>`;
    s += `<circle cx="344" cy="104" r="30" fill="#f3efe3" stroke="var(--mari)" stroke-width="4"/><rect x="338" y="66" width="12" height="8" rx="2" fill="var(--mari)"/>`;
    s += `<line x1="344" y1="104" x2="344" y2="80" stroke="#b8323a" stroke-width="2.5" stroke-linecap="round">${swing ? `<animateTransform attributeName="transform" type="rotate" from="0 344 104" to="360 344 104" dur="60s" repeatCount="indefinite"/>` : ""}</line>`;
    s += T(344, 158, `L = ${Math.round(num(P.L))} cm`, { size: 12 }) + T(344, 176, `bob = ${Math.round(num(P.m))} g`, { size: 12, fill: "var(--muted)" });
    s += T(344, 196, sh.has("T") ? `T ≈ ${f1(Tp, 1)} s` : "T = ?", { size: 13, fill: "var(--teal)" });
    s += T(210, 14, P.lx ? svgFr(P.lx) : "", { size: 12, fill: "var(--muted)" });
    s += "</svg>";
    return { svg: s, reads: { T: `about ${f1(Tp, 2)} s`, ten: `about ${f1(Tp * 10, 1)} s` } };
  }
};

/* =========================================================
   4. k7s8_track — speed lanes: up to three movers start together; after time t each has gone speed × t.
   params: v1,v2,v3 (speeds; 0 hides a lane), t (time), dmax, du ("m"|"km"), tu ("s"|"min"|"h"),
           n1,n2,n3 (names), i1,i2,i3 (icons: run, cycle, bus, train, car, horse), lx
   readouts: d (distances), sp (speed = distance ÷ time)   parts: "lane1", "lane2", "lane3", "clock"
   ========================================================= */
const ICO = {
  run: (x, y, c) => `<circle cx="${x}" cy="${y - 16}" r="4.5" fill="${c}"/><path d="M${x} ${y - 11} l-2 9 l-6 7 M${x - 2} ${y - 2} l7 5 l2 8 M${x} ${y - 9} l-7 3 M${x} ${y - 9} l7 1" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  cycle: (x, y, c) => `<circle cx="${x - 9}" cy="${y - 4}" r="6" fill="none" stroke="${c}" stroke-width="2.5"/><circle cx="${x + 9}" cy="${y - 4}" r="6" fill="none" stroke="${c}" stroke-width="2.5"/><path d="M${x - 9} ${y - 4} l6 -9 h9 l3 9 M${x - 3} ${y - 13} l-1 -4" stroke="${c}" stroke-width="2.5" fill="none"/><circle cx="${x}" cy="${y - 22}" r="4" fill="${c}"/>`,
  bus: (x, y, c) => `<rect x="${x - 18}" y="${y - 22}" width="36" height="18" rx="4" fill="${c}"/><rect x="${x - 14}" y="${y - 19}" width="8" height="6" fill="#dff3ff"/><rect x="${x - 3}" y="${y - 19}" width="8" height="6" fill="#dff3ff"/><rect x="${x + 8}" y="${y - 19}" width="7" height="6" fill="#dff3ff"/><circle cx="${x - 10}" cy="${y - 3}" r="3.5" fill="#222"/><circle cx="${x + 10}" cy="${y - 3}" r="3.5" fill="#222"/>`,
  car: (x, y, c) => `<path d="M${x - 18} ${y - 6} v-7 l7 -7 h16 l7 7 h6 v7 Z" fill="${c}"/><circle cx="${x - 9}" cy="${y - 4}" r="3.5" fill="#222"/><circle cx="${x + 10}" cy="${y - 4}" r="3.5" fill="#222"/>`,
  train: (x, y, c) => `<rect x="${x - 26}" y="${y - 22}" width="44" height="18" rx="3" fill="${c}"/><path d="M${x + 18} ${y - 22} h4 q6 0 6 9 v9 h-10 Z" fill="${c}"/><rect x="${x - 22}" y="${y - 18}" width="7" height="6" fill="#dff3ff"/><rect x="${x - 11}" y="${y - 18}" width="7" height="6" fill="#dff3ff"/><rect x="${x}" y="${y - 18}" width="7" height="6" fill="#dff3ff"/><circle cx="${x - 18}" cy="${y - 3}" r="3" fill="#222"/><circle cx="${x + 10}" cy="${y - 3}" r="3" fill="#222"/>`,
  horse: (x, y, c) => `<path d="M${x - 14} ${y - 14} q12 -6 22 0 l6 -10 l5 3 l-4 9 v3 l-3 0 M${x - 14} ${y - 14} v-1 M${x - 13} ${y - 13} l-3 12 M${x - 8} ${y - 12} l2 11 M${x + 5} ${y - 12} l-2 11 M${x + 10} ${y - 13} l4 11 M${x - 14} ${y - 14} q-6 2 -8 8" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
};
SIM_DEF.k7s8_track = {
  def: { v1: 8, v2: 6, v3: 0, t: 0, dmax: 100, du: "m", tu: "s", n1: "", n2: "", n3: "", i1: "run", i2: "run", i3: "run", lx: "" },
  rng: { t: P => [0, P.tmax || 20, P.tstep || 1], v1: P => [0, P.vmax || 20, P.vstep || 1], v2: P => [0, P.vmax || 20, P.vstep || 1] },
  lab: { t: "Time", v1: "Speed of lane 1", v2: "Speed of lane 2" },
  reads: { d: "Distance covered", sp: "Speed" },
  draw(D, P, sh, hl) {
    const lanes = [1, 2, 3].filter(i => P["n" + i] || num(P["v" + i]) > 0);
    const dmax = Math.max(1, num(P.dmax)), t = Math.max(0, num(D.t)), x0 = 34, x1 = 384, sc = (x1 - x0) / dmax;
    const cols = ["var(--mari)", "var(--rani)", "var(--sky)"], hexes = ["#f4a51c", "#e04a86", "#62b6e8"];
    const n = Math.max(1, lanes.length), laneH = Math.min(58, 150 / n), y0 = 46;
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 20, P.lx ? svgFr(P.lx) : "Who covers more distance in the same time?", { size: 13 });
    // distance scale
    const step = dmax / 5;
    lanes.forEach((i, k) => {
      const yb = y0 + (k + 1) * laneH, v = num(D["v" + i]), d = Math.min(dmax * 1.04, v * t), x = x0 + d * sc;
      s += `<g${hlA(hl, "lane" + i)}><rect x="${x0}" y="${(yb - laneH + 6).toFixed(1)}" width="${x1 - x0}" height="${(laneH - 6).toFixed(1)}" rx="5" fill="${hexes[k]}" fill-opacity=".1" stroke="${hexes[k]}" stroke-opacity=".35"/></g>`;
      s += `<line x1="${x0}" y1="${yb.toFixed(1)}" x2="${x1}" y2="${yb.toFixed(1)}" stroke="var(--line)" stroke-width="2"/>`;
      s += `<g>${(ICO[P["i" + i]] || ICO.run)(x.toFixed(1), yb - 2, hexes[k])}</g>`;
      s += T(x0 + 4, yb - laneH + 20, P["n" + i] || ("Lane " + i), { size: 11, fill: cols[k], a: "start" });
      if (sh.has("d")) s += T(Math.min(x1 - 4, Math.max(x0 + 70, x + 40)), yb - laneH + 20, `${f1(v * t, 2)} ${P.du}`, { size: 11, fill: "var(--ink)", a: "end" });
    });
    const yA = y0 + n * laneH + 8;
    for (let j = 0; j <= 5; j++) { const xx = x0 + j * (x1 - x0) / 5; s += `<line x1="${xx}" y1="${yA - 4}" x2="${xx}" y2="${yA + 2}" stroke="var(--muted)"/>` + T(xx, yA + 14, `${f1(step * j, 1)}`, { size: 10, fill: "var(--muted)" }); }
    s += T(x1 + 18, yA + 14, P.du, { size: 10, fill: "var(--muted)" });
    s += `<line x1="${x0}" y1="${y0 + 2}" x2="${x0}" y2="${yA - 4}" stroke="var(--teal)" stroke-width="2"/>` + T(x0, y0 + 2, "start", { size: 9, fill: "var(--teal)" });
    s += `<g${hlA(hl, "clock")}><rect x="150" y="${yA + 22}" width="120" height="${Math.min(30, 236 - yA - 22)}" rx="8" fill="rgba(10,15,40,.6)" stroke="var(--mari)"/>` + T(210, yA + 42, `time = ${f1(t, 1)} ${P.tu}`, { size: 13, fill: "var(--mari)" }) + `</g>`;
    s += "</svg>";
    const tt = num(P.t), dl = lanes.map(i => `${P["n" + i] || "Lane " + i}: ${f1(num(P["v" + i]) * tt, 2)} ${P.du}`).join("; ");
    const sl = lanes.map(i => `${P["n" + i] || "Lane " + i}: ${f1(num(P["v" + i]), 2)} ${P.du}/${P.tu}`).join("; ");
    return { svg: s, reads: { d: `in ${f1(tt, 2)} ${P.tu}: ${dl}`, sp: sl } };
  }
};

/* =========================================================
   5. k7s8_dt — distance–time table + graph. Equal steps in a straight line = uniform motion.
   params: data ("0,20,40…" distances at equal time steps), data2 (optional second object), dt (time step),
           tu, du, n (points shown), gap (index of a blank to fill, −1 none), y (value at the gap), n1, n2, lx
   readouts: gaps (distance in each interval), avg (average speed)   parts: "line1", "line2", "gaps"
   ========================================================= */
const parseD = s => String(s || "").split(",").map(x => x.trim()).filter(x => x !== "").map(Number);
SIM_DEF.k7s8_dt = {
  def: { data: "0,20,40,60,80,100,120", data2: "", dt: 10, tu: "min", du: "km", n: 7, gap: -1, y: 0, n1: "Train X", n2: "Train Y", lx: "", ymax: 0, times: "" },
  rng: { n: P => [1, parseD(P.data).length, 1], y: P => [0, P.ymaxS || 80, P.ystep || 1] },
  lab: { n: "Readings shown", y: "Distance at the blank" },
  reads: { gaps: "Distance in each interval", avg: "Average speed" },
  draw(D, P, sh, hl) {
    const A = parseD(P.data), B = parseD(P.data2), tms = P.times ? parseD(P.times) : A.map((_, i) => i * num(P.dt));
    if (num(P.gap) >= 0) A[num(P.gap)] = num(D.y);
    const nn = Math.max(1, Math.min(A.length, Math.round(num(D.n)))), tmax = tms[tms.length - 1] || 1;
    const ymax = num(P.ymax) || Math.max(...A, ...(B.length ? B : [0]), 1);
    const gx = 54, gy = 196, gw = 330, gh = 150, X = t => gx + t / tmax * gw, Y = d => gy - d / ymax * gh;
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 18, P.lx ? svgFr(P.lx) : "Distance–time graph", { size: 13 });
    for (let j = 0; j <= 4; j++) { const yy = gy - j * gh / 4; s += `<line x1="${gx}" y1="${yy}" x2="${gx + gw}" y2="${yy}" stroke="var(--line)" stroke-opacity=".6"/>` + T(gx - 6, yy + 4, f1(ymax * j / 4, 1), { size: 10, fill: "var(--muted)", a: "end" }); }
    tms.forEach(t => { s += T(X(t), gy + 14, f1(t, 1), { size: 10, fill: "var(--muted)" }); });
    s += `<line x1="${gx}" y1="${gy}" x2="${gx + gw}" y2="${gy}" stroke="var(--ink)" stroke-width="1.5"/><line x1="${gx}" y1="${gy}" x2="${gx}" y2="${gy - gh - 4}" stroke="var(--ink)" stroke-width="1.5"/>`;
    s += T(gx + gw / 2, gy + 30, `time (${P.tu})`, { size: 11, fill: "var(--muted)" });
    s += `<text x="14" y="${gy - gh / 2}" fill="var(--muted)" font-size="11" font-weight="700" text-anchor="middle" transform="rotate(-90 14 ${gy - gh / 2})">distance (${P.du})</text>`;
    const plot = (arr, col, part) => {
      let p = "", dots = "";
      arr.slice(0, nn).forEach((d, i) => { p += (i ? "L" : "M") + X(tms[i]).toFixed(1) + " " + Y(d).toFixed(1); dots += `<circle cx="${X(tms[i]).toFixed(1)}" cy="${Y(d).toFixed(1)}" r="${i === num(P.gap) ? 6 : 4}" fill="${i === num(P.gap) ? "var(--teal)" : col}"/>`; });
      return `<g${hlA(hl, part)}><path d="${p}" fill="none" stroke="${col}" stroke-width="2.5"/>${dots}</g>`;
    };
    if (B.length) s += plot(B, "var(--rani)", "line2");
    s += plot(A, "var(--mari)", "line1");
    if (sh.has("gaps")) {
      let g = "";
      for (let i = 1; i < nn; i++) { const d = A[i] - A[i - 1]; g += T((X(tms[i]) + X(tms[i - 1])) / 2, Y(A[i]) - 8, `+${f1(d, 1)}`, { size: 10, fill: "var(--mari)" }); }
      s += `<g${hlA(hl, "gaps")}>${g}</g>`;
    }
    if (B.length) s += `<rect x="${gx + 8}" y="30" width="10" height="10" fill="var(--mari)"/>` + T(gx + 22, 39, P.n1, { size: 11, a: "start" }) + `<rect x="${gx + 100}" y="30" width="10" height="10" fill="var(--rani)"/>` + T(gx + 114, 39, P.n2, { size: 11, a: "start" });
    s += "</svg>";
    const diffs = arr => arr.slice(1).map((d, i) => +(d - arr[i]).toFixed(3));
    const desc = (arr, name) => { const df = diffs(arr), eq = df.every(x => Math.abs(x - df[0]) < 1e-9), tot = arr[arr.length - 1] - arr[0], tt = tms[tms.length - 1] - tms[0];
      return { g: `${name}: ${df.join(", ")} ${P.du} (${eq ? "equal: uniform" : "unequal: non-uniform"})`, a: `${name}: ${f1(tot, 2)} ${P.du} ÷ ${f1(tt, 2)} ${P.tu} = ${f1(tot / tt, 3)} ${P.du}/${P.tu}${P.tu === "min" ? ` = ${f1(tot / tt * 60, 2)} ${P.du}/h` : ""}` }; };
    const a = desc(A, P.n1), b = B.length ? desc(B, P.n2) : null;
    return { svg: s, reads: { gaps: a.g + (b ? "; " + b.g : ""), avg: a.a + (b ? "; " + b.a : "") } };
  }
};

/* =========================================================
   SCENE — Jaipur at golden hour: pink city walls, the Samrat Yantra whose shadow creeps,
   a running track with a sprinter, and a train crossing on the far line.
   ========================================================= */
let W8 = null;
function w8Init(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  W8 = { W, H, birds: Array.from({ length: 7 }, () => ({ x: rnd(0, W), y: rnd(H * .08, H * .3), s: rnd(.3, .8), p: rnd(0, 6) })),
    hills: Array.from({ length: 10 }, (_, i) => ({ x: i * W / 9, h: rnd(30, 80) })) };
}
SCENES.k7s8_jaipur = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!W8 || W8.W !== W || W8.H !== H) w8Init(W, H);
  const S = W8, gy = H * .74;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#1b2a4a"); g.addColorStop(.55, "#7a4a6a"); g.addColorStop(1, "#e8925a");
  c.fillStyle = g; c.fillRect(0, 0, W, gy);
  // the Sun drifts slowly across (one crossing every 80 s)
  const ph = (t / 80000) % 1, sa = Math.PI * ph, sx = W * .08 + ph * W * .84, sy = gy - Math.sin(sa) * H * .5;
  const sg = c.createRadialGradient(sx, sy, 6, sx, sy, 90); sg.addColorStop(0, "rgba(255,220,140,.75)"); sg.addColorStop(1, "rgba(255,220,140,0)"); c.fillStyle = sg; c.beginPath(); c.arc(sx, sy, 90, 0, 6.28); c.fill();
  c.fillStyle = "#ffe0a0"; c.beginPath(); c.arc(sx, sy, 18, 0, 6.28); c.fill();
  // Aravalli hills + Nahargarh wall
  c.fillStyle = "#5a3a55"; c.beginPath(); c.moveTo(0, gy); S.hills.forEach(h => c.lineTo(h.x, gy - h.h - 40)); c.lineTo(W, gy); c.fill();
  c.strokeStyle = "rgba(240,180,150,.35)"; c.lineWidth = 3; c.beginPath(); S.hills.forEach((h, i) => i ? c.lineTo(h.x, gy - h.h - 40) : c.moveTo(h.x, gy - h.h - 40)); c.stroke();
  // birds
  S.birds.forEach(b => { if (!RM) { b.x += b.s; if (b.x > W + 20) b.x = -20; } const w = Math.sin(t / 200 + b.p) * 4; c.strokeStyle = "rgba(30,20,40,.6)"; c.lineWidth = 1.5; c.beginPath(); c.moveTo(b.x - 6, b.y - w); c.lineTo(b.x, b.y); c.lineTo(b.x + 6, b.y - w); c.stroke(); });
  // far railway line with a train
  const ry = gy - 18; c.fillStyle = "#6a3c4a"; c.fillRect(0, ry, W, 3);
  const tx = ((t / 20) % (W + 400)) - 300; c.fillStyle = "#2f4a7a"; for (let k = 0; k < 6; k++) { c.fillRect(tx - k * 46, ry - 16, 42, 14); c.fillStyle = "#ffd36b"; for (let w = 0; w < 4; w++) c.fillRect(tx - k * 46 + 5 + w * 9, ry - 12, 5, 4); c.fillStyle = k ? "#2f4a7a" : "#b8323a"; }
  // pink city facade (Hawa Mahal-like)
  const hx = W * .04, hw = Math.min(300, W * .3), hb = gy;
  c.fillStyle = "#d9776a"; c.fillRect(hx, hb - 120, hw, 120);
  for (let r = 0; r < 5; r++) for (let k = 0; k < 9; k++) { const wx = hx + 10 + k * (hw - 20) / 9, wy = hb - 112 + r * 22; c.fillStyle = "#b24f4a"; c.beginPath(); c.moveTo(wx, wy + 16); c.lineTo(wx, wy + 6); c.quadraticCurveTo(wx + 7, wy - 3, wx + 14, wy + 6); c.lineTo(wx + 14, wy + 16); c.fill(); c.fillStyle = `rgba(255,210,120,${.25 + .2 * Math.sin(t / 900 + r + k)})`; c.fillRect(wx + 4, wy + 8, 6, 7); }
  for (let k = 0; k < 5; k++) { const cx = hx + 20 + k * (hw - 40) / 4; c.fillStyle = "#e9958a"; c.beginPath(); c.arc(cx, hb - 120, 14, Math.PI, 0); c.fill(); }
  // Samrat Yantra: giant right-angled gnomon with a curved quadrant; shadow follows the sun
  const yx = W * .66, yb = gy, yh = Math.min(H * .38, 260), yw = yh * 1.25;
  c.fillStyle = "rgba(20,10,20,.35)"; const shx = (0.5 - ph) * yw * 1.3; c.beginPath(); c.moveTo(yx, yb); c.lineTo(yx + yw * .5, yb); c.lineTo(yx + yw * .5 + shx, yb + 26); c.lineTo(yx + shx * .4, yb + 26); c.fill();
  c.fillStyle = "#e7b9a0"; c.beginPath(); c.moveTo(yx, yb); c.lineTo(yx + yw * .5, yb - yh); c.lineTo(yx + yw * .5, yb); c.fill();
  c.strokeStyle = "rgba(120,60,50,.6)"; c.lineWidth = 1.5; for (let k = 1; k < 14; k++) { const fx2 = yx + k * yw * .5 / 14; c.beginPath(); c.moveTo(fx2, yb - (fx2 - yx) * yh / (yw * .5)); c.lineTo(fx2 + 6, yb - (fx2 - yx) * yh / (yw * .5)); c.stroke(); }
  c.fillStyle = "#d8a58b"; c.beginPath(); c.moveTo(yx + yw * .5, yb); c.arc(yx + yw * .5, yb, yw * .36, Math.PI, Math.PI * 1.06, false); c.lineTo(yx + yw * .86, yb); c.fill();
  c.fillStyle = "#c98e74"; c.fillRect(yx + yw * .5, yb - yh * .15, yw * .38, yh * .15); c.fillRect(yx - yw * .08, yb - yh * .15, yw * .1, yh * .15);
  // ground + running track
  c.fillStyle = "#6b3f2a"; c.fillRect(0, gy, W, H - gy);
  c.fillStyle = "#b5523e"; c.fillRect(0, gy + (H - gy) * .35, W, (H - gy) * .4);
  c.strokeStyle = "rgba(255,255,255,.55)"; c.lineWidth = 2; for (let k = 0; k < 4; k++) { const ly = gy + (H - gy) * (.35 + k * .4 / 3); c.beginPath(); c.moveTo(0, ly); c.lineTo(W, ly); c.stroke(); }
  // sprinter looping along lane 2
  const rx = ((t / 6) % (W + 80)) - 40, rly = gy + (H - gy) * .58, leg = Math.sin(t / 70) * 8;
  c.strokeStyle = "#2a1a12"; c.lineWidth = 3.5; c.lineCap = "round"; c.beginPath(); c.arc(rx + 3, rly - 32, 5, 0, 6.28); c.stroke();
  c.beginPath(); c.moveTo(rx, rly - 26); c.lineTo(rx - 3, rly - 12); c.lineTo(rx - 3 + leg, rly); c.moveTo(rx - 3, rly - 12); c.lineTo(rx - 3 - leg, rly); c.moveTo(rx, rly - 22); c.lineTo(rx + leg, rly - 15); c.moveTo(rx, rly - 22); c.lineTo(rx - leg, rly - 16); c.stroke();
  c.fillStyle = "#f4a51c"; c.fillRect(rx - 5, rly - 26, 7, 9);
  c.fillStyle = "rgba(10,8,20,.32)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Ghadi the gharial timekeeper (in Hindi "ghadiyal" means both a crocodile and a clock-gong!)
   ========================================================= */
GUIDES.k7s8_gharial = () => `<svg class="guide gharial" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="40" ry="4" fill="#000" opacity=".25"/>
  <path d="M22 110 Q8 112 4 100 Q14 106 26 100Z" fill="#5f8f4a"/>
  <ellipse cx="54" cy="98" rx="34" ry="20" fill="#6fa356"/>
  <path d="M30 88 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6" fill="none" stroke="#4d7a3a" stroke-width="2.5"/>
  <ellipse cx="56" cy="104" rx="22" ry="10" fill="#d8e3a8"/>
  <rect x="32" y="110" width="10" height="12" rx="5" fill="#5f8f4a"/><rect x="66" y="110" width="10" height="12" rx="5" fill="#5f8f4a"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 56 100;-8 56 100;0 56 100" dur="3s" repeatCount="indefinite"/>
    <path d="M44 100 L58 72" stroke="#b8323a" stroke-width="2.5"/><path d="M68 100 L58 72" stroke="#b8323a" stroke-width="2.5"/>
    <circle cx="58" cy="104" r="11" fill="#f3efe3" stroke="#f4a51c" stroke-width="3"/><rect x="55" y="90" width="6" height="4" rx="1" fill="#f4a51c"/>
    <line x1="58" y1="104" x2="58" y2="96" stroke="#15202a" stroke-width="1.8" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 58 104" to="360 58 104" dur="4s" repeatCount="indefinite"/></line>
    <line x1="58" y1="104" x2="63" y2="104" stroke="#15202a" stroke-width="1.8" stroke-linecap="round"/></g>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.6s" repeatCount="indefinite"/>
    <ellipse cx="46" cy="60" rx="20" ry="16" fill="#6fa356"/>
    <path d="M58 54 Q90 50 112 56 Q116 60 112 64 Q90 68 58 68Z" fill="#7fb565"/>
    <path d="M62 62 L110 60" stroke="#3e6a2e" stroke-width="1.5"/>
    <path d="M66 62 l2 3 M74 62 l2 3 M82 61.5 l2 3 M90 61 l2 3 M98 61 l2 3" stroke="#fff" stroke-width="1.6"/>
    <ellipse cx="110" cy="57" rx="7" ry="6" fill="#8a6a4a"/>
    <circle cx="40" cy="48" r="8" fill="#fff"/><circle cx="54" cy="47" r="8" fill="#fff"/>
    <circle cx="42" cy="49" r="4" fill="#15202a"/><circle cx="56" cy="48" r="4" fill="#15202a"/><circle cx="43.3" cy="47.5" r="1.3" fill="#fff"/><circle cx="57.3" cy="46.5" r="1.3" fill="#fff"/>
    <rect x="31" y="39" width="32" height="0" fill="#6fa356"><animate attributeName="height" values="0;0;0;12;0" keyTimes="0;.82;.9;.95;1" dur="4.4s" repeatCount="indefinite"/></rect>
    <circle cx="36" cy="64" r="3.5" fill="#ff7aa2" opacity=".5"/>
    <path d="M26 44 Q46 26 66 40 L62 44 Q46 34 30 46Z" fill="#e04a86"/><path d="M60 40 L74 42 L64 46Z" fill="#c2306c"/>
  </g>
</svg>`;

/* =========================================================
   3D — k7s8_pend3d: a simple pendulum on a laboratory stand; the bob swings with T = 2π√(L/g).
   params: L (cm), m (g), amp (deg)   readouts: T, ten   parts: "bob", "mean"
   ========================================================= */
SIM_DEF.k7s8_pend3d = {
  def: { L: 100, m: 200, amp: 14, lx: "" },
  rng: { L: () => [20, 200, 5], m: () => [50, 500, 50] },
  lab: { L: "Length of string (cm)", m: "Mass of bob (g)" },
  reads: { T: "Time period", ten: "10 oscillations take" },
  readouts(P) { const Tp = periodOf(P.L); return { T: `about ${f1(Tp, 2)} s for L = ${Math.round(num(P.L))} cm`, ten: `about ${f1(Tp * 10, 1)} s` }; },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 7.5, phi: 1.25, theta: 0.5, auto: 0.12, target: [0, 1.4, 0], hint: "Drag to turn the pendulum stand" });
    if (!g) return null;
    const { THREE, root } = g;
    const wood = new THREE.MeshStandardMaterial({ color: 0x8a6a2b, roughness: .7 }), steel = new THREE.MeshStandardMaterial({ color: 0x9aa6b4, metalness: .6, roughness: .35 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.2, 1.8), wood); base.position.y = -0.1; root.add(base);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.6, 12), steel); pole.position.set(-1.3, 1.8, 0); root.add(pole);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.5, 10), steel); arm.rotation.z = Math.PI / 2; arm.position.set(-0.6, 3.55, 0); root.add(arm);
    const pivot = new THREE.Group(); pivot.position.set(0, 3.55, 0); root.add(pivot);
    const thrM = new THREE.MeshBasicMaterial({ color: 0xeef3f6 });
    const thread = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 6), thrM); pivot.add(thread);
    const bobM = new THREE.MeshStandardMaterial({ color: 0xc9a227, metalness: .7, roughness: .25, emissive: 0x3a2a00, emissiveIntensity: .3 });
    const bob = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 20), bobM); pivot.add(bob);
    const meanM = new THREE.MeshBasicMaterial({ color: 0x35c29a, transparent: true, opacity: .6 });
    const mean = new THREE.Mesh(new THREE.BoxGeometry(0.02, 3.4, 0.02), meanM); mean.position.set(0, 1.75, 0); root.add(mean);
    const arcM = new THREE.LineBasicMaterial({ color: 0xf4a51c });
    let arc = null;
    const lO = g.label("O", [0, 0.2, 0], "plain"), lA = g.label("A", [1, 1, 0], "plain"), lB = g.label("B", [-1, 1, 0], "plain"), lT = g.label("", [1.6, 3.2, 0], "big");
    const st = { len: 2, amp: 0.25, Tp: 2, hl: null, t0: 0 };
    g.onFrame((t) => {
      const th = RM ? st.amp : st.amp * Math.cos(2 * Math.PI * t / st.Tp);
      pivot.rotation.z = th;
      bobM.emissiveIntensity = st.hl === "bob" ? .6 + .4 * Math.sin(t * 8) : .3;
    });
    function apply(D, P, sh, hl) {
      st.hl = hl;
      const L = Math.max(20, num(D.L)), len = 0.6 + L / 200 * 2.6; st.len = len; st.Tp = periodOf(num(P.L)); st.amp = (num(P.amp) || 14) * Math.PI / 180;
      thread.scale.y = len; thread.position.y = -len / 2;
      const r = 0.12 + Math.cbrt(Math.max(50, num(D.m)) / 500) * 0.2; bob.scale.setScalar(r); bob.position.y = -len - r * .8;
      if (arc) { root.remove(arc); arc.geometry.dispose(); }
      const pts = []; for (let i = 0; i <= 30; i++) { const a = -st.amp + 2 * st.amp * i / 30; pts.push(new THREE.Vector3(Math.sin(a) * (len + r), 3.55 - Math.cos(a) * (len + r), 0)); }
      arc = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), arcM); root.add(arc);
      const ex = Math.sin(st.amp) * (len + r) + 0.25, ey = 3.55 - Math.cos(st.amp) * (len + r);
      lA.move([ex, ey, 0]); lB.move([-ex, ey, 0]); lO.move([0, 3.55 - len - 2.4 * r - 0.15, 0]);
      meanM.opacity = hl === "mean" ? 1 : .55;
      lT.set(sh.has("T") ? `T ≈ ${f1(st.Tp, 2)} s` : "T = ?");
    }
    return { update: apply, dispose() { if (arc) arc.geometry.dispose(); g.dispose(); } };
  }
};

})();
