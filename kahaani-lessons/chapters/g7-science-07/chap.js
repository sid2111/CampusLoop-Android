(function(){
/* Grade 7 Science (Curiosity) Chapter 7 — Heat Transfer in Nature
   Plugin: sims (k7s7_*), the Gangtok winter-night scene, and Tashi the red panda guide. */

const hA = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const nn = x => { const v = +x; return isFinite(v) ? v : 0; };
const cl = (x, a, b) => Math.max(a, Math.min(b, x));
const f1 = x => (Math.round(x * 10) / 10).toString();
// cold (sky) → warm (mari) → hot (red) colour for heat h in 0..1
function heatCol(h) {
  h = cl(h, 0, 1);
  const A = [98, 140, 180], B = [244, 165, 28], C = [239, 70, 50];
  const [p, q, k] = h < .5 ? [A, B, h * 2] : [B, C, (h - .5) * 2];
  return `rgb(${p.map((v, i) => Math.round(v + (q[i] - v) * k)).join(",")})`;
}
const flame = (x, y, s = 1, on = true) => on ? `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -26 Q10 -12 6 -4 Q3 2 0 2 Q-3 2 -6 -4 Q-10 -12 0 -26Z" fill="var(--mari)"><animate attributeName="d" values="M0 -26 Q10 -12 6 -4 Q3 2 0 2 Q-3 2 -6 -4 Q-10 -12 0 -26Z;M1 -29 Q11 -13 6 -4 Q3 2 0 2 Q-3 2 -6 -4 Q-9 -12 1 -29Z;M0 -26 Q10 -12 6 -4 Q3 2 0 2 Q-3 2 -6 -4 Q-10 -12 0 -26Z" dur=".7s" repeatCount="indefinite"/></path><path d="M0 -15 Q5 -7 3 -2 Q0 1 -3 -2 Q-5 -7 0 -15Z" fill="#fff3c4"/></g>` : "";
const candle = (x, y, on = true) => `<rect x="${x - 7}" y="${y}" width="14" height="34" rx="2" fill="#f2efe6"/><line x1="${x}" y1="${y}" x2="${x}" y2="${y - 5}" stroke="#333" stroke-width="1.5"/>` + flame(x, y - 4, .8, on);
const arrow = (x1, y1, x2, y2, col, w = 2.5, extra = "") => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 8;
  return `<g${extra}><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x2} ${y2} L${(x2 - L * Math.cos(a - .45)).toFixed(1)} ${(y2 - L * Math.sin(a - .45)).toFixed(1)} L${(x2 - L * Math.cos(a + .45)).toFixed(1)} ${(y2 - L * Math.sin(a + .45)).toFixed(1)}Z" fill="${col}"/></g>`;
};

/* =========================================================
   1. k7s7_rod — Activity 7.1: wax pins on a heated metal strip (conduction)
   params: t (minutes), mat (0 metal, 1 wood, 2 glass), cand (0 at the free end, 1 between pins I and II)
   readouts: fallen, spread    parts: "pins", "flame", "particles"
   ========================================================= */
const ROD_MAT = [{ n: "aluminium (metal)", v: 2, c: "#b9c4cf" }, { n: "wood", v: .12, c: "#a8743f" }, { n: "glass", v: .2, c: "#9fd7e8" }];
const ROD_PINS = [3, 5, 7, 9], ROD_NAMES = ["I", "II", "III", "IV"];
function rodState(t, mat, cand) {
  const m = ROD_MAT[cl(Math.round(nn(mat)), 0, 2)], src = Math.round(nn(cand)) ? 4 : 0;
  const front = m.v * nn(t) + (nn(t) > 0 && !src ? 1 : 0);
  const dist = ROD_PINS.map(p => Math.abs(p - src));
  return { m, src, front, dist, fall: dist.map(d => cl((front - d + .5) * 2, 0, 1)) };
}
SIM_DEF.k7s7_rod = {
  def: { t: 0, mat: 0, cand: 0, lx: "" },
  rng: { t: () => [0, 6, 1], mat: () => [0, 2, 1] },
  lab: { t: "Minutes of heating", mat: "Strip: 0 metal · 1 wood · 2 glass" },
  reads: { fallen: "Pins fallen", spread: "Heat has spread" },
  draw(D, P, sh, hl) {
    const S = rodState(D.t, P.mat, P.cand), SP = rodState(P.t, P.mat, P.cand);
    const x0 = 46, x1 = 384, cm = (x1 - x0) / 15, X = d => x1 - d * cm, y = 70; // distances measured from the free (right) end
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 20, P.lx || `Strip of ${SP.m.n}, 15 cm long`, { size: 13, fill: "var(--muted)" });
    // stand
    s += `<rect x="24" y="40" width="10" height="176" rx="3" fill="#6b7d8f"/><rect x="10" y="212" width="60" height="10" rx="3" fill="#6b7d8f"/><rect x="28" y="${y - 6}" width="26" height="20" rx="3" fill="#8a9bab"/>`;
    // strip coloured by local heat
    const N = 30;
    for (let i = 0; i < N; i++) {
      const dc = (i + .5) * 15 / N, dd = Math.abs(dc - S.src), h = S.front > 0 ? cl((S.front - dd) / 3 + .35, 0, 1) * (S.m.v > 1 ? 1 : .9) : 0;
      const col = h > .02 ? heatCol(h) : S.m.c;
      s += `<rect x="${(X(dc) - cm / 2 - .3).toFixed(1)}" y="${y}" width="${(cm / 2 + .6).toFixed(1)}" height="10" fill="${col}"/>`;
    }
    s += `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="10" fill="none" stroke="#2b3945" stroke-width="1"/>`;
    // particles: vibrate harder where hot, but stay in place
    let pg = "";
    for (let i = 0; i < 16; i++) {
      const dc = (i + .5) * 15 / 16, dd = Math.abs(dc - S.src), h = S.front > 0 ? cl((S.front - dd) / 3 + .35, 0, 1) : 0, px = X(dc), py = 130, a = (1 + h * 5).toFixed(1);
      pg += `<circle cx="${px.toFixed(1)}" cy="${py}" r="5" fill="${heatCol(h)}" stroke="#10233a" stroke-width=".8"><animate attributeName="cx" values="${(px - a).toFixed(1)};${(px + +a).toFixed(1)};${(px - a).toFixed(1)}" dur="${(.5 - h * .3).toFixed(2)}s" repeatCount="indefinite"/></circle>`;
      if (i) pg += `<line x1="${(X(dc) + 15 / 16 * cm - 5).toFixed(1)}" y1="${py}" x2="${(px + 5).toFixed(1)}" y2="${py}" stroke="var(--line)" stroke-width="1.5"/>`;
    }
    s += `<g${hA(hl, "particles")}>${pg}</g>` + T(215, 152, "particles shake and pass heat on, but stay in place", { size: 10.5, fill: "var(--muted)", w: 600 });
    s += `<path d="M${X(15)} 84 L${X(15)} 118 M${X(0)} 84 L${X(0)} 118" stroke="var(--line)" stroke-dasharray="3 3"/>`;
    // pins
    let pins = "";
    ROD_PINS.forEach((p, i) => {
      const px = X(p), f = S.fall[i];
      if (f < .02) pins += `<circle cx="${px}" cy="${y + 13}" r="5" fill="#f3e2a0"/><line x1="${px}" y1="${y + 14}" x2="${px}" y2="${y + 44}" stroke="#d6dde4" stroke-width="2.4"/>` + T(px, y + 58, ROD_NAMES[i], { size: 12, fill: "var(--ink)" });
      else { const yy = y + 14 + f * (196 - y - 14), r = f * 90; pins += `<g transform="rotate(${r.toFixed(0)} ${px} ${yy.toFixed(1)})"><line x1="${px}" y1="${yy.toFixed(1)}" x2="${px}" y2="${(yy + 30).toFixed(1)}" stroke="#d6dde4" stroke-width="2.4"/></g>` + (f > .9 ? T(px, 214, ROD_NAMES[i] + " fell", { size: 11, fill: "var(--mari)" }) : ""); }
    });
    s += `<g${hA(hl, "pins")}>${pins}</g>`;
    s += `<line x1="70" y1="220" x2="410" y2="220" stroke="var(--line)" stroke-width="2"/>`;
    // candle under the heat source
    const cx = X(S.src === 0 ? .4 : S.src);
    s += `<g${hA(hl, "flame")}><rect x="${cx - 7}" y="186" width="14" height="34" rx="2" fill="#f2efe6"/>${flame(cx, 182, .8, true)}</g>`;
    if (nn(D.t) > 0) s += `<path d="M${cx} 160 Q${cx + 4} 120 ${cx} 86" stroke="var(--mari)" stroke-width="1.5" fill="none" stroke-dasharray="3 4" opacity=".7"/>`;
    s += T(20, 236, `t = ${f1(nn(D.t))} min`, { size: 11, fill: "var(--muted)", a: "start" });
    s += "</svg>";
    const fl = SP.fall.map((f, i) => f >= 1 ? ROD_NAMES[i] : null).filter(Boolean);
    return { svg: s, reads: { fallen: fl.length ? fl.join(", ") + (fl.length === 4 ? " (all)" : "") : "none yet", spread: SP.front > 0 ? `about ${f1(Math.min(15, SP.front))} cm from the flame along the ${SP.m.n} strip` : "no heating yet" } };
  }
};

/* =========================================================
   2. k7s7_wall — heat leaking through a barrier, with or without trapped air
   params: mode (blanket | wool | house | mori | tumbler), air (0/1), season (winter | summer)
   readouts: flow, keep     parts: "air", "warm", "cold"
   ========================================================= */
const WALLS = {
  blanket: { title: "Bed on a winter night", in: "You", tin: 37, out: "Cold room", tout: 6, l0: "one thick blanket", l1: "two thin blankets + air", f: [.45, .15] },
  wool: { title: "Walking in Gangtok's cold air", in: "Body", tin: 37, out: "Cold air", tout: 4, l0: "thin cotton shirt", l1: "woollen sweater (air in pores)", f: [.6, .18] },
  house: { title: "Outer wall of a house", in: "Room", tin: 0, out: "Outside", tout: 0, l0: "solid bricks", l1: "hollow bricks (trapped air)", f: [.5, .2] },
  mori: { title: "Mori block house, Uttarkashi", in: "Room", tin: 20, out: "Snow outside", tout: -8, l0: "thin stone wall", l1: "wood | mud + cow dung | wood", f: [.55, .15] },
  tumbler: { title: "Cold lassi on a hot day", in: "Lassi", tin: 8, out: "Hot air", tout: 35, l0: "one leaky tumbler", l1: "leaky tumbler inside a second one", f: [.55, .2] }
};
SIM_DEF.k7s7_wall = {
  def: { mode: "blanket", air: 0, season: "winter" },
  rng: { air: () => [0, 1, 1] },
  lab: { air: "Trapped air layer: 0 no · 1 yes" },
  reads: { flow: "Heat flow", keep: "After 1 hour (example)" },
  draw(D, P, sh, hl) {
    const W0 = WALLS[P.mode] || WALLS.blanket, a = cl(nn(D.air), 0, 1), A = Math.round(nn(P.air));
    let tin = W0.tin, tout = W0.tout;
    if (P.mode === "house") { if (P.season === "summer") { tin = 28; tout = 45; } else { tin = 22; tout = 4; } }
    const hotIn = tin > tout, fr = W0.f[0] + (W0.f[1] - W0.f[0]) * a, after = tin + (tout - tin) * fr, afterP = tin + (tout - tin) * W0.f[A];
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 20, W0.title + (P.mode === "house" ? ` — ${P.season}` : ""), { size: 13, fill: "var(--muted)" });
    const warmC = "rgba(239,91,69,.20)", coldC = "rgba(98,182,232,.18)";
    s += `<rect x="10" y="34" width="150" height="170" rx="10" fill="${hotIn ? warmC : coldC}"${hA(hl, "warm")}/>`;
    s += `<rect x="260" y="34" width="150" height="170" rx="10" fill="${hotIn ? coldC : warmC}"${hA(hl, "cold")}/>`;
    s += T(85, 54, `${W0.in}: ${tin} °C`, { size: 13 }) + T(335, 54, `${W0.out}: ${tout} °C`, { size: 13 });
    // barrier
    const bx = 166, bw = 88;
    if (a < .5) {
      const col = P.mode === "blanket" ? "#b8323a" : P.mode === "wool" ? "#d9d4c7" : P.mode === "tumbler" ? "#9fd7e8" : P.mode === "mori" ? "#7b8794" : "#b5523b";
      const w = P.mode === "wool" || P.mode === "tumbler" ? 22 : 56;
      s += `<rect x="${210 - w / 2}" y="40" width="${w}" height="160" rx="4" fill="${col}" stroke="#10233a"/>`;
      if (P.mode === "house") for (let r = 0; r < 8; r++) s += `<line x1="${182}" y1="${60 + r * 20}" x2="238" y2="${60 + r * 20}" stroke="#7a2f20"/>`;
    } else {
      if (P.mode === "blanket" || P.mode === "tumbler") {
        const c = P.mode === "blanket" ? "#b8323a" : "#9fd7e8";
        s += `<rect x="${bx + 4}" y="40" width="16" height="160" rx="3" fill="${c}" stroke="#10233a"/><rect x="${bx + bw - 20}" y="40" width="16" height="160" rx="3" fill="${c}" stroke="#10233a"/>`;
      } else if (P.mode === "house") {
        s += `<rect x="${bx + 4}" y="40" width="${bw - 8}" height="160" rx="4" fill="#b5523b" stroke="#10233a"/>`;
        for (let r = 0; r < 4; r++) s += `<rect x="${bx + 18}" y="${50 + r * 38}" width="${bw - 36}" height="26" rx="4" fill="#10233a"/>`;
      } else if (P.mode === "mori") {
        s += `<rect x="${bx + 2}" y="40" width="18" height="160" fill="#a8743f" stroke="#10233a"/><rect x="${bx + 20}" y="40" width="${bw - 40}" height="160" fill="#6d5233"/><rect x="${bx + bw - 20}" y="40" width="18" height="160" fill="#a8743f" stroke="#10233a"/>`;
      } else {
        s += `<rect x="${bx + 14}" y="40" width="${bw - 28}" height="160" rx="12" fill="#e9dfc8" stroke="#10233a"/>`;
      }
      let dots = "";
      for (let i = 0; i < 14; i++) { const xx = bx + 26 + (i * 37) % (bw - 50), yy = 52 + (i * 53) % 140; dots += `<circle cx="${xx}" cy="${yy}" r="3" fill="var(--sky)" opacity=".85"/>`; }
      s += `<g${hA(hl, "air")}>${dots}</g>`;
      s += `<rect x="${210 - 34}" y="206" width="68" height="18" rx="9" fill="rgba(10,24,38,.8)"/>` + T(210, 219, "trapped air", { size: 11, fill: "var(--sky)" });
    }
    // heat arrows from hot side to cold side; fewer get through with trapped air
    const n = 6, thr = Math.round(6 - 4 * a);
    for (let i = 0; i < n; i++) {
      const yy = 74 + i * 22, through = i < thr, dir = hotIn ? 1 : -1;
      const xs = hotIn ? 120 : 300, xm = 210, xe = hotIn ? 300 : 120;
      s += arrow(xs, yy, through ? xe : xm - dir * 30, yy, through ? "var(--red)" : "rgba(239,91,69,.45)", 2.5, through ? ` opacity="${(.5 + .5 * (1 - a)).toFixed(2)}"` : "");
    }
    s += T(85, 196, hotIn ? "heat leaves from here" : "heat tries to enter here", { size: 10.5, fill: "var(--muted)", w: 600 });
    s += T(210, 236, a < .5 ? W0.l0 : W0.l1, { size: 12, fill: "var(--mari)" });
    s += "</svg>";
    const fast = A === 0;
    return { svg: s, reads: { flow: fast ? `fast — ${W0.l0} lets heat pass easily` : `slow — air is a poor conductor of heat`, keep: `${W0.in.toLowerCase()} side reaches about ${Math.round(afterP)} °C (started ${tin} °C)` } };
  }
};

/* =========================================================
   3. k7s7_conv — convection in air and water
   params: mode (cups | smoke | spiral | beaker | tube), side (-1,0,1), dir (0 up, 1 down), pos (-2..2), sel (0 a, 1 b)
   readouts: what, why     parts: "cup", "smoke", "detector", "streak", "bulb"
   ========================================================= */
function motionDots(path, n, dur, col, r = 3.2) {
  let s = ""; for (let i = 0; i < n; i++) s += `<circle r="${r}" fill="${col}" opacity=".9"><animateMotion dur="${dur}s" repeatCount="indefinite" begin="-${(i * dur / n).toFixed(2)}s" path="${path}"/></circle>`;
  return s;
}
SIM_DEF.k7s7_conv = {
  def: { mode: "cups", side: 0, dir: 0, pos: 0, sel: 0 },
  rng: { side: () => [-1, 1, 1], dir: () => [0, 1, 1], pos: () => [-2, 2, 1] },
  lab: { side: "Candle: −1 left · 0 none · 1 right", dir: "Incense stick: 0 up · 1 down", pos: "Candle position under the beaker" },
  reads: { what: "What happens", why: "Why" },
  draw(D, P, sh, hl) {
    let s = `<svg viewBox="0 0 420 240">`, what = "", why = "";
    const m = P.mode;
    if (m === "cups") {
      const sd = nn(D.side), ang = -sd * 11, cx = 210, cy = 50;
      s += T(210, 18, "Activity 7.2: two paper cups on a stick", { size: 13, fill: "var(--muted)" });
      s += `<line x1="${cx}" y1="24" x2="${cx}" y2="${cy}" stroke="#d6dde4" stroke-width="1.5"/><circle cx="${cx}" cy="${cy}" r="3" fill="#d6dde4"/>`;
      s += `<g transform="rotate(${ang.toFixed(1)} ${cx} ${cy})"><rect x="${cx - 150}" y="${cy - 3}" width="300" height="6" rx="3" fill="#a8743f"/>`;
      [-1, 1].forEach(k => {
        const x = cx + k * 140, hot = Math.round(nn(P.side)) === k;
        s += `<g transform="rotate(${(-ang).toFixed(1)} ${x} ${cy})"><line x1="${x}" y1="${cy}" x2="${x}" y2="${cy + 40}" stroke="#d6dde4" stroke-width="1.2"/>`;
        s += `<path d="M${x - 22} ${cy + 40} L${x + 22} ${cy + 40} L${x + 32} ${cy + 104} L${x - 32} ${cy + 104}Z" fill="#f2efe6" stroke="#9aa6b2"${hot ? hA(hl, "cup") : ""}/>`;
        let dd = ""; const sp = hot ? 15 : 9;
        for (let yy = cy + 50; yy < cy + 100; yy += sp) for (let xx = x - 18; xx <= x + 18; xx += sp) dd += `<circle cx="${xx}" cy="${yy}" r="2.2" fill="${hot ? "var(--red)" : "var(--sky)"}"/>`;
        s += dd + `</g>`;
      });
      s += `</g>`;
      const k = Math.round(nn(P.side));
      [-1, 1].forEach(q => { const x = cx + q * 140; s += candle(x, 196, q === k); if (q === k) s += motionDots(`M${x} 186 Q${x + 6} 172 ${x} 160`, 4, 1.2, "rgba(244,165,28,.8)", 2.5); });
      s += `<line x1="40" y1="230" x2="380" y2="230" stroke="var(--line)" stroke-width="2"/>`;
      what = k ? `the cup above the candle (${k < 0 ? "left" : "right"}) rises; the other dips` : "the stick stays level";
      why = k ? "air in that cup warms, expands, becomes lighter and rises" : "both cups hold air at the same temperature";
    } else if (m === "smoke") {
      const dn = Math.round(nn(P.dir));
      s += `<rect x="20" y="28" width="380" height="8" fill="#5b6e80"/>` + T(210, 22, "ceiling", { size: 11, fill: "var(--muted)" });
      if (sh.has("what")) s += `<g${hA(hl, "detector")}><rect x="300" y="36" width="40" height="12" rx="5" fill="#e9eef2"/><circle cx="320" cy="44" r="2.5" fill="var(--red)"><animate attributeName="opacity" values="1;.2;1" dur="1s" repeatCount="indefinite"/></circle></g>` + T(320, 64, "smoke detector", { size: 10.5, fill: "var(--muted)", w: 600 });
      const tipY = dn ? 196 : 150, sx = 150;
      // incense stand and stick
      s += `<rect x="${sx - 22}" y="214" width="44" height="12" rx="4" fill="#8a5a2b"/>`;
      if (dn) s += `<path d="M${sx} 214 Q${sx + 30} 150 ${sx + 6} 140" stroke="#8a5a2b" stroke-width="3" fill="none"/><line x1="${sx + 6}" y1="140" x2="${sx}" y2="${tipY}" stroke="#5a3a1a" stroke-width="3"/>`;
      else s += `<line x1="${sx}" y1="214" x2="${sx}" y2="${tipY}" stroke="#5a3a1a" stroke-width="3"/>`;
      s += `<circle cx="${sx}" cy="${tipY}" r="3" fill="var(--red)"/>`;
      const sm = dn ? `M${sx} ${tipY} Q${sx - 14} ${tipY + 6} ${sx - 10} ${tipY - 20} Q${sx + 10} 120 ${sx - 4} 90 Q${sx - 16} 60 ${sx + 8} 40` : `M${sx} ${tipY} Q${sx + 12} ${tipY - 30} ${sx - 4} 100 Q${sx - 16} 66 ${sx + 8} 40`;
      if (sh.has("what")) s += `<path d="${sm}" stroke="rgba(220,226,236,.35)" stroke-width="10" fill="none" stroke-linecap="round"${hA(hl, "smoke")}/>` + motionDots(sm, 9, 3.2, "rgba(230,236,244,.85)", 3);
      else s += T(250, 120, "Which way will the smoke go? ?", { size: 13, fill: "var(--mari)" });
      if (sh.has("what")) s += arrow(250, 170, 250, 100, "var(--mari)", 2.5) + T(300, 140, "hot smoke", { size: 11, fill: "var(--mari)" }) + T(300, 154, "rises", { size: 11, fill: "var(--mari)" });
      s += `<line x1="20" y1="230" x2="400" y2="230" stroke="var(--line)" stroke-width="2"/>`;
      what = dn ? "even with the stick pointing down, the smoke curls round and goes up" : "the smoke rises straight up towards the ceiling";
      why = "smoke is hot gases + tiny particles, warmer and lighter than the air around, so it rises";
    } else if (m === "spiral") {
      s += T(210, 18, "A paper spiral above a candle", { size: 13, fill: "var(--muted)" });
      s += `<line x1="210" y1="26" x2="210" y2="60" stroke="#d6dde4" stroke-width="1.2"/>`;
      let sp = ""; for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 6, r = 6 + i * 1.25; sp += (i ? "L" : "M") + (210 + r * Math.cos(a)).toFixed(1) + " " + (90 + r * Math.sin(a) * .35 + i * .9).toFixed(1); }
      s += `<g><path d="${sp}" fill="none" stroke="#f2efe6" stroke-width="5" stroke-linecap="round"/><animateTransform attributeName="transform" type="skewX" values="0;8;0;-8;0" dur="2.4s" repeatCount="indefinite"/></g>`;
      s += `<path d="M150 74 a60 24 0 1 0 120 0" fill="none" stroke="var(--teal)" stroke-width="2" stroke-dasharray="5 4"><animate attributeName="stroke-dashoffset" values="0;-18" dur=".8s" repeatCount="indefinite"/></path>`;
      if (sh.has("what")) s += arrow(282, 80, 270, 98, "var(--teal)", 2) + T(330, 66, "it turns!", { size: 12, fill: "var(--teal)" });
      s += candle(210, 196, true) + motionDots("M210 186 Q216 160 206 130 Q200 110 210 90", 6, 1.6, "rgba(244,165,28,.85)", 2.6);
      s += `<line x1="40" y1="230" x2="380" y2="230" stroke="var(--line)" stroke-width="2"/>`;
      what = "the paper spiral starts to spin";
      why = "hot air rising from the flame pushes on the slanted turns of the spiral (convection)";
    } else if (m === "beaker") {
      const p = nn(D.pos) * 34, cx = 210, bx0 = 110, bx1 = 310, top = 70, bot = 196;
      s += T(210, 18, "Activity 7.3: potassium permanganate in heated water", { size: 13, fill: "var(--muted)" });
      s += `<defs><linearGradient id="k7s7wg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="rgba(239,91,69,.45)"/><stop offset="1" stop-color="rgba(98,182,232,.35)"/></linearGradient></defs>`;
      s += `<rect x="${bx0}" y="${top}" width="${bx1 - bx0}" height="${bot - top}" fill="url(#k7s7wg)"/>`;
      s += `<path d="M${bx0 - 6} 34 L${bx0} 40 L${bx0} ${bot} Q${bx0} ${bot + 6} ${bx0 + 6} ${bot + 6} L${bx1 - 6} ${bot + 6} Q${bx1} ${bot + 6} ${bx1} ${bot} L${bx1} 34" fill="none" stroke="#d6dde4" stroke-width="3"/>`;
      s += T(bx1 + 10, top + 4, "water", { size: 11, fill: "var(--muted)", a: "start" });
      const hx = cx + p, L = `M${hx} ${bot - 6} L${hx} ${top + 14} Q${hx} ${top + 4} ${hx - 20} ${top + 6} L${bx0 + 14} ${top + 8} Q${bx0 + 6} ${top + 12} ${bx0 + 8} ${top + 30} L${bx0 + 10} ${bot - 12} Q${bx0 + 14} ${bot - 4} ${hx - 10} ${bot - 6} Z`;
      const R = `M${hx} ${bot - 6} L${hx} ${top + 14} Q${hx} ${top + 4} ${hx + 20} ${top + 6} L${bx1 - 14} ${top + 8} Q${bx1 - 6} ${top + 12} ${bx1 - 8} ${top + 30} L${bx1 - 10} ${bot - 12} Q${bx1 - 14} ${bot - 4} ${hx + 10} ${bot - 6} Z`;
      s += `<g${hA(hl, "streak")}><path d="${L}" fill="none" stroke="rgba(160,60,200,.35)" stroke-width="6"/><path d="${R}" fill="none" stroke="rgba(160,60,200,.35)" stroke-width="6"/>` + motionDots(L, 8, 4, "#b04ad8") + motionDots(R, 8, 4, "#b04ad8") + `</g>`;
      s += arrow(hx, 160, hx, 110, "var(--red)", 3) + arrow(bx0 + 20, 110, bx0 + 20, 160, "var(--sky)", 3) + arrow(bx1 - 20, 110, bx1 - 20, 160, "var(--sky)", 3);
      s += `<rect x="${bx0 - 10}" y="${bot + 6}" width="${bx1 - bx0 + 20}" height="4" fill="#6b7d8f"/><line x1="${bx0}" y1="${bot + 10}" x2="${bx0 - 10}" y2="236" stroke="#6b7d8f" stroke-width="3"/><line x1="${bx1}" y1="${bot + 10}" x2="${bx1 + 10}" y2="236" stroke="#6b7d8f" stroke-width="3"/>`;
      s += `<rect x="${hx - 5}" y="${bot + 18}" width="10" height="20" fill="#f2efe6"/>` + flame(hx, bot + 16, .6, true);
      if (sh.has("why")) s += T(60, 120, "hot water", { size: 11, fill: "var(--red)" }) + T(60, 134, "rises above", { size: 11, fill: "var(--red)" }) + T(60, 148, "the flame", { size: 11, fill: "var(--red)" });
      if (sh.has("why")) s += T(370, 120, "cooler water", { size: 11, fill: "var(--sky)" }) + T(370, 134, "sinks at", { size: 11, fill: "var(--sky)" }) + T(370, 148, "the sides", { size: 11, fill: "var(--sky)" });
      const pp = Math.round(nn(P.pos));
      what = pp === 0 ? "the purple streak rises in the middle and comes down along both sides" : `the streak rises above the flame, on the ${pp < 0 ? "left" : "right"} of centre`;
      why = "water above the flame warms, expands, becomes lighter and rises; cooler, heavier water sinks to take its place";
    } else { // tube
      const sel = Math.round(nn(P.sel));
      s += T(210, 18, "Fig. 7.16: which thermometer reads higher?", { size: 13, fill: "var(--muted)" });
      [[0, 110, "(a) flame at the bottom"], [1, 310, "(b) flame near the top"]].forEach(([k, x, lab]) => {
        const g = `translate(${x} 0) rotate(-35 0 140)`;
        s += `<g transform="${g}"${k === sel ? hA(hl, "bulb") : ""}>`;
        s += `<rect x="-16" y="60" width="32" height="140" rx="16" fill="none" stroke="#d6dde4" stroke-width="2.5"/>`;
        const rv = sh.has("why");
        if (!rv) s += `<rect x="-14" y="80" width="28" height="118" rx="14" fill="rgba(98,182,232,.4)"/>`;
        else if (k === 0) { s += `<rect x="-14" y="80" width="28" height="118" rx="14" fill="rgba(239,91,69,.45)"/>` + motionDots("M0 190 L0 92 Q8 86 10 100 L10 186 Z", 6, 2.4, "#ffd3c4", 2.2); }
        else { s += `<rect x="-14" y="80" width="28" height="118" rx="14" fill="rgba(98,182,232,.4)"/><rect x="-14" y="80" width="28" height="44" fill="rgba(239,91,69,.55)"/>`; }
        // thermometer
        const by = k === 0 ? 104 : 182;
        if (!rv) s += "";
        s += `<line x1="4" y1="20" x2="4" y2="${by}" stroke="#e9eef2" stroke-width="4"/><circle cx="4" cy="${by}" r="5" fill="var(--red)"/>`;
        s += `</g>`;
        const fx0 = k === 0 ? x + 36 : x - 30, fy = k === 0 ? 206 : 122;
        s += `<rect x="${fx0 - 5}" y="${fy}" width="10" height="${226 - fy}" fill="#f2efe6"/>` + flame(fx0, fy - 2, .55, true);
        s += T(x, 238, lab, { size: 11.5, fill: k === sel ? "var(--mari)" : "var(--muted)" });
      });
      what = "thermometer (a) shows the higher temperature";
      why = "in (a) heated water at the bottom rises to the bulb; in (b) hot water stays at the top and the bulb at the bottom stays cool";
    }
    s += "</svg>";
    return { svg: s, reads: { what, why } };
  }
};

/* =========================================================
   4. k7s7_coast — Activity 7.4 (soil vs water) and land / sea breeze
   params: mode (bowls | coast), min (0..40: 0-20 in sunlight, 20-40 indoors), hour (0..23)
   readouts: soil, water, breeze, warmer   parts: "soil", "water", "breeze", "window"
   ========================================================= */
const soilT = m => m <= 20 ? 25 + .6 * m : 37 - .45 * (m - 20);
const watT = m => m <= 20 ? 25 + .2 * m : 29 - .1 * (m - 20);
function breezeOf(h) { h = ((Math.round(h) % 24) + 24) % 24; if (h >= 9 && h <= 17) return 1; if (h >= 20 || h <= 6) return -1; return 0; }
SIM_DEF.k7s7_coast = {
  def: { mode: "bowls", min: 0, hour: 13 },
  rng: { min: () => [0, 40, 5], hour: () => [0, 23, 1] },
  lab: { min: "Minutes (0–20 in Sun, 20–40 indoors)", hour: "Time of day (hour)" },
  reads: { soil: "Soil", water: "Water", breeze: "Breeze", warmer: "Warmer surface" },
  draw(D, P, sh, hl) {
    let s = `<svg viewBox="0 0 420 240">`, R = {};
    if (P.mode !== "coast") {
      const m = cl(nn(D.min), 0, 40), mp = cl(Math.round(nn(P.min) / 5) * 5, 0, 40), sun = m <= 20;
      s += T(110, 18, sun ? "In sunlight" : "Brought indoors", { size: 13, fill: sun ? "var(--mari)" : "var(--sky)" });
      if (sun) s += `<circle cx="196" cy="22" r="11" fill="var(--mari)"/>`;
      [[0, 60, "Soil", soilT(m), "#8a5a2b", "soil"], [1, 160, "Water", watT(m), "#3d8fd1", "water"]].forEach(([k, x, n, tc, col, part]) => {
        s += `<g${hA(hl, part)}><path d="M${x - 38} 160 Q${x} 214 ${x + 38} 160Z" fill="${col}"/><path d="M${x - 44} 156 Q${x} 222 ${x + 44} 156" fill="none" stroke="#d6dde4" stroke-width="3"/></g>`;
        const tb = 40, tl = 140, hgt = (tc - 20) / 20 * (tl - 20);
        s += `<rect x="${x - 4}" y="${tb}" width="8" height="${tl}" rx="4" fill="#e9eef2"/><rect x="${x - 2}" y="${(tb + tl - hgt).toFixed(1)}" width="4" height="${hgt.toFixed(1)}" fill="var(--red)"/><circle cx="${x}" cy="${tb + tl + 2}" r="6" fill="var(--red)"/>`;
        s += T(x + 30, 60, `${f1(tc)} °C`, { size: 14, fill: "var(--ink)" }) + T(x, 236, n, { size: 12, fill: "var(--muted)" });
      });
      // graph
      const gx = 240, gy = 200, gw = 168, gh = 160, X = t => gx + t / 40 * gw, Y = v => gy - (v - 24) / 14 * gh;
      s += `<rect x="${gx}" y="${gy - gh}" width="${gw / 2}" height="${gh}" fill="rgba(244,165,28,.08)"/>`;
      s += `<line x1="${gx}" y1="${gy}" x2="${gx + gw}" y2="${gy}" stroke="var(--line)"/><line x1="${gx}" y1="${gy}" x2="${gx}" y2="${gy - gh}" stroke="var(--line)"/>`;
      [24, 28, 32, 36].forEach(v => s += T(gx - 4, Y(v) + 4, v, { size: 9.5, fill: "var(--muted)", a: "end" }));
      [0, 20, 40].forEach(t => s += T(X(t), gy + 13, t, { size: 9.5, fill: "var(--muted)" }));
      s += T(gx + gw / 2, gy + 26, "minutes", { size: 10, fill: "var(--muted)" }) + T(gx + gw / 4, gy - gh + 12, "Sun", { size: 10, fill: "var(--mari)" }) + T(gx + gw * .75, gy - gh + 12, "indoors", { size: 10, fill: "var(--sky)" });
      let ps = "", pw = ""; for (let t = 0; t <= m + .001; t += 1) { ps += (t ? "L" : "M") + X(t).toFixed(1) + " " + Y(soilT(t)).toFixed(1); pw += (t ? "L" : "M") + X(t).toFixed(1) + " " + Y(watT(t)).toFixed(1); }
      s += `<path d="${ps}" stroke="#c98a4b" stroke-width="2.5" fill="none"/><path d="${pw}" stroke="var(--sky)" stroke-width="2.5" fill="none"/>`;
      for (let t = 0; t <= mp; t += 5) s += `<circle cx="${X(t)}" cy="${Y(soilT(t))}" r="2.8" fill="#c98a4b"/><circle cx="${X(t)}" cy="${Y(watT(t))}" r="2.8" fill="var(--sky)"/>`;
      R.soil = `${f1(soilT(mp))} °C at ${mp} min (started 25 °C)`; R.water = `${f1(watT(mp))} °C at ${mp} min (started 25 °C)`;
      R.breeze = "—"; R.warmer = mp === 0 ? "both start at 25 °C" : mp <= 20 ? "soil heats up faster than water" : "soil also cools down faster than water";
    } else {
      const h = nn(D.hour), hp = Math.round(nn(P.hour)), b = breezeOf(hp), day = h >= 6 && h <= 18;
      const sk = day ? "#5aa6d8" : "#0d1a33";
      s += `<rect x="0" y="0" width="420" height="160" fill="${sk}"/>`;
      if (day) { const a = (h - 6) / 12 * Math.PI, sx = 210 - 170 * Math.cos(a), sy = 130 - 110 * Math.sin(a); s += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="14" fill="#ffd36b"/>`; }
      else { s += `<circle cx="330" cy="34" r="11" fill="#efe6c8"/><circle cx="335" cy="30" r="10" fill="${sk}"/>`; for (let i = 0; i < 12; i++) s += `<circle cx="${(i * 67) % 400 + 10}" cy="${(i * 29) % 90 + 10}" r="1.2" fill="#fff"/>`; }
      // sea (left) and land (right)
      s += `<rect x="0" y="160" width="200" height="80" fill="#1f6fa8"${hA(hl, "water")}/>`;
      for (let i = 0; i < 6; i++) s += `<path d="M${i * 34 + 6} 172 q8 -6 16 0 t16 0" stroke="#9fd7e8" stroke-width="1.5" fill="none"/>`;
      s += `<path d="M200 160 L420 150 L420 240 L196 240Z" fill="#c9a46a"${hA(hl, "soil")}/>`;
      // house with window facing the sea, coconut tree
      s += `<rect x="330" y="112" width="60" height="40" fill="#e9dfc8"/><path d="M324 114 L360 90 L396 114Z" fill="#b8323a"/><rect x="334" y="122" width="14" height="14" fill="${day ? "#5aa6d8" : "#ffd36b"}"${hA(hl, "window")}/>`;
      s += `<path d="M262 150 Q258 110 270 80" stroke="#7a5230" stroke-width="5" fill="none"/>` + [[-30, 8], [-14, -14], [12, -12], [28, 6]].map(([dx, dy]) => `<path d="M270 80 q${dx / 2} ${dy - 10} ${dx} ${dy}" stroke="#2f8f5b" stroke-width="5" fill="none" stroke-linecap="round"/>`).join("");
      const tl = day ? 31 : 22, ts = day ? 26 : 25;
      s += T(100, 230, `sea ≈ ${ts} °C`, { size: 12, fill: "#fff" }) + T(300, 230, `land ≈ ${tl} °C`, { size: 12, fill: "#3b2410" });
      if (b !== 0) {
        const rx = b > 0 ? 300 : 100, sx = b > 0 ? 100 : 300, op = cl(1 - Math.abs(h - hp), 0, 1) * .9 + .1;
        let g = `<g opacity="${op.toFixed(2)}"${hA(hl, "breeze")}>`;
        g += arrow(rx, 140, rx, 56, "var(--red)", 3) + T(rx + (b > 0 ? -44 : 44), 70, "warm air rises", { size: 11, fill: "#fff" });
        g += arrow(sx, 140, rx - b * 30, 140, "var(--sky)", 4) + T(200, 132, b > 0 ? "cool sea breeze →" : "← cool land breeze", { size: 12.5, fill: "#fff" });
        g += arrow(rx, 46, sx, 46, "rgba(255,255,255,.5)", 2) + arrow(sx, 50, sx, 128, "rgba(255,255,255,.5)", 2);
        s += g + `</g>`;
      } else s += T(210, 110, "the breeze is changing direction…", { size: 12.5, fill: "#fff" });
      s += `<rect x="6" y="6" width="74" height="22" rx="11" fill="rgba(10,24,38,.75)"/>` + T(43, 21, `${String(hp).padStart(2, "0")}:00`, { size: 13, fill: "var(--mari)" });
      R.breeze = b > 0 ? "sea breeze: cool air moves from sea to land" : b < 0 ? "land breeze: cool air moves from land to sea" : "changing over (calm)";
      R.warmer = b > 0 ? "land (heats faster in sunlight)" : b < 0 ? "sea (land cools faster at night)" : "both nearly the same";
      R.soil = `land ≈ ${tl} °C`; R.water = `sea ≈ ${ts} °C`;
    }
    s += "</svg>";
    return { svg: s, reads: R };
  }
};

/* =========================================================
   5. k7s7_water — water cycle, seepage bottles, aquifer
   params: mode (cycle | seep | aquifer), stage (0..4), min (0..10)
   readouts: stage, info / clay, sand, gravel    parts: "aquifer", "well", "pit", "gravel"
   ========================================================= */
const STAGES = [["Evaporation", "Sun's heat turns water of seas, rivers and lakes into water vapour"], ["Transpiration", "plants give out water vapour from their leaves"], ["Condensation", "rising vapour cools down and condenses into clouds"], ["Precipitation", "clouds bring rain, snow and hail"], ["Back to water bodies", "water flows into rivers, lakes, oceans, or seeps into the ground"]];
const SEEP = [["Clay", 3, "#b5523b"], ["Sand", 9, "#e2c585"], ["Gravel", 16, "#8a9bab"]];
SIM_DEF.k7s7_water = {
  def: { mode: "cycle", stage: 0, min: 0 },
  rng: { stage: () => [0, 4, 1], min: () => [0, 10, 1] },
  lab: { stage: "Step of the water cycle", min: "Minutes" },
  reads: { stage: "Step", info: "What happens", clay: "Clay", sand: "Sand", gravel: "Gravel" },
  draw(D, P, sh, hl) {
    let s = `<svg viewBox="0 0 420 240">`, R = {};
    if (P.mode === "seep") {
      const m = cl(nn(D.min), 0, 10), mp = Math.round(nn(P.min));
      s += T(210, 16, "Activity 7.5: 200 mL of water poured into each bottle", { size: 12.5, fill: "var(--muted)" });
      SEEP.forEach(([n, r, col], i) => {
        const x = 75 + i * 135, got = Math.min(200, r * m), gotP = Math.min(200, r * mp);
        s += `<g${n === "Gravel" ? hA(hl, "gravel") : ""}>`;
        s += `<path d="M${x - 34} 28 L${x + 34} 28 L${x + 34} 92 L${x + 8} 116 L${x - 8} 116 L${x - 34} 92Z" fill="rgba(255,255,255,.08)" stroke="#d6dde4" stroke-width="2"/>`;
        const wl = 28 + (200 - got) / 200 * 0;
        s += `<rect x="${x - 32}" y="${wl + 2}" width="64" height="${Math.max(0, 22 * (1 - got / 200)).toFixed(1)}" fill="rgba(98,182,232,.6)"/>`;
        let grains = ""; const gs = n === "Clay" ? 3 : n === "Sand" ? 4 : 8, sp = n === "Clay" ? 6 : n === "Sand" ? 8 : 17;
        for (let yy = 56; yy < 100; yy += sp) for (let xx = x - 28; xx <= x + 28; xx += sp) if (Math.abs(xx + (yy % 2 ? sp / 2 : 0) - x) + gs < (yy <= 92 ? 33 : 33 - (yy - 92) * 26 / 24)) grains += `<circle cx="${xx + (yy % 2 ? sp / 2 : 0)}" cy="${yy}" r="${gs}" fill="${col}"/>`;
        s += grains + `</g>`;
        if (m > 0 && got < 200) s += motionDots(`M${x} 118 L${x} 160`, Math.max(1, Math.round(r / 4)), .8, "var(--sky)", 2.2);
        s += `<path d="M${x - 30} 160 L${x - 26} 216 L${x + 26} 216 L${x + 30} 160" fill="none" stroke="#d6dde4" stroke-width="2"/>`;
        const hgt = got / 200 * 54; s += `<rect x="${x - 26}" y="${(216 - hgt).toFixed(1)}" width="52" height="${hgt.toFixed(1)}" fill="rgba(98,182,232,.75)"/>`;
        s += T(x, 152, `${i + 1}. ${n}`, { size: 12, fill: "var(--ink)" }) + T(x, 234, `${Math.round(got)} mL`, { size: 13, fill: "var(--sky)" });
        R[n.toLowerCase()] = `${Math.round(gotP)} mL collected in ${mp} min`;
      });
      R.stage = mp ? `${mp} min` : "just poured"; R.info = "gravel fastest, sand slower, clay slowest";
    } else if (P.mode === "aquifer") {
      s += `<rect x="0" y="0" width="420" height="70" fill="#5aa6d8"/>`;
      for (let i = 0; i < 14; i++) s += `<line x1="${20 + i * 28}" y1="${18 + (i % 3) * 8}" x2="${14 + i * 28}" y2="${34 + (i % 3) * 8}" stroke="#e9f4fb" stroke-width="2"/>`;
      s += T(60, 14, "Rain", { size: 11, fill: "#fff" });
      s += `<rect x="0" y="70" width="420" height="38" fill="#8a5a2b"/>` + T(395, 94, "soil", { size: 11, fill: "#fff", a: "end" });
      s += `<rect x="300" y="64" width="120" height="8" fill="#9aa6b2"/>` + T(360, 60, "concrete", { size: 10.5, fill: "#10233a" });
      s += `<g${hA(hl, "aquifer")}><rect x="0" y="108" width="420" height="72" fill="#6b7d8f"/>`;
      let d = ""; for (let i = 0; i < 70; i++) d += `<circle cx="${(i * 47) % 410 + 6}" cy="${112 + (i * 31) % 64}" r="${(i % 3) + 4}" fill="#a3b1be"/>`;
      for (let i = 0; i < 40; i++) d += `<circle cx="${(i * 53 + 20) % 410 + 4}" cy="${116 + (i * 23) % 60}" r="2" fill="var(--sky)"/>`;
      s += d + `</g>` + T(210, 172, "aquifer: water stored in pore spaces of gravel, sand and rock", { size: 11, fill: "#fff" });
      s += `<rect x="0" y="180" width="420" height="60" fill="#3b4652"/>` + T(210, 214, "hard rock (water cannot pass easily)", { size: 11, fill: "var(--muted)" });
      for (let i = 0; i < 5; i++) s += arrow(40 + i * 46, 74, 40 + i * 46, 116, "var(--sky)", 2);
      s += T(150, 100, "infiltration", { size: 11, fill: "#e9f4fb" });
      s += `<g${hA(hl, "well")}><rect x="262" y="44" width="10" height="104" fill="#e9dfc8"/><rect x="254" y="38" width="26" height="8" fill="#b8323a"/><rect x="264" y="120" width="6" height="28" fill="var(--sky)"/></g>` + T(267, 30, "well", { size: 11, fill: "#10233a" });
      s += `<g${hA(hl, "pit")}><path d="M190 70 L230 70 L222 104 L198 104Z" fill="#a3b1be" stroke="#10233a"/></g>` + T(210, 62, "recharge pit", { size: 10.5, fill: "#10233a" });
      s += arrow(210, 84, 210, 124, "var(--sky)", 3);
      R.stage = "Groundwater"; R.info = "rainwater infiltrates and is stored in aquifers; wells draw it out";
    } else {
      const st = Math.round(nn(P.stage)), k = cl(nn(D.stage), 0, 4);
      s += `<rect x="0" y="0" width="420" height="240" fill="rgba(90,166,216,.18)"/>`;
      s += `<circle cx="44" cy="34" r="18" fill="#ffd36b"/>`;
      s += `<path d="M0 180 Q60 170 150 182 L150 240 L0 240Z" fill="#1f6fa8"/>` + T(56, 222, "sea / lake", { size: 11, fill: "#fff" });
      s += `<path d="M150 240 L150 182 Q200 186 230 176 L300 70 L340 110 L370 60 L420 120 L420 240Z" fill="#5d7a5a"/><path d="M285 92 L300 70 L314 92 Z M358 80 L370 60 L384 82Z" fill="#f2f6f8"/>`;
      s += `<path d="M300 200 Q260 196 230 214 Q180 230 150 214" stroke="#62b6e8" stroke-width="5" fill="none"/>`;
      s += `<rect x="196" y="150" width="6" height="32" fill="#7a5230"/><circle cx="199" cy="140" r="18" fill="#2f8f5b"/>`;
      s += `<g><ellipse cx="250" cy="40" rx="44" ry="16" fill="#e9eef2"/><ellipse cx="226" cy="44" rx="26" ry="12" fill="#e9eef2"/><ellipse cx="276" cy="46" rx="26" ry="12" fill="#dfe6ee"/></g>`;
      const on = i => i === st ? 1 : .25, LB = sh.has("stage");
      s += `<g opacity="${on(0)}">` + arrow(70, 166, 90, 70, "var(--mari)", 3) + arrow(110, 166, 140, 70, "var(--mari)", 3) + motionDots("M90 170 L120 70", 4, 2, "rgba(255,255,255,.8)", 2.2) + (LB ? T(70, 110, "Evaporation", { size: 11.5, fill: "#fff", a: "end" }) : "") + `</g>`;
      s += `<g opacity="${on(1)}">` + arrow(199, 120, 210, 66, "var(--teal)", 3) + (LB ? T(212, 104, "Transpiration", { size: 11.5, fill: "#fff", a: "start" }) : "") + `</g>`;
      s += `<g opacity="${on(2)}">` + arrow(150, 56, 200, 42, "#e9eef2", 3) + (LB ? T(170, 30, "Condensation", { size: 11.5, fill: "#fff" }) : "") + `</g>`;
      let rain = ""; for (let i = 0; i < 8; i++) rain += `<line x1="${230 + i * 9}" y1="${62 + (i % 2) * 6}" x2="${226 + i * 9}" y2="${78 + (i % 2) * 6}" stroke="#9fd7e8" stroke-width="2"/>`;
      s += `<g opacity="${on(3)}">${rain}` + motionDots("M250 62 L242 130", 3, 1, "#9fd7e8", 2.2) + (LB ? T(330, 40, "Precipitation", { size: 11.5, fill: "#fff", a: "start" }) : "") + `</g>`;
      s += `<g opacity="${on(4)}">` + arrow(250, 214, 160, 214, "var(--sky)", 3) + arrow(240, 186, 240, 230, "var(--sky)", 2) + (LB ? T(268, 236, "runoff + seepage", { size: 11, fill: "#fff", a: "start" }) : "") + `</g>`;
      R.stage = `${st + 1}. ${STAGES[st][0]}`; R.info = STAGES[st][1];
    }
    s += "</svg>";
    return { svg: s, reads: R };
  }
};

/* =========================================================
   6. k7s7_bukhari3d — 3D bukhari stove in a Gangtok room: conduction, convection, radiation together
   params: fire (0..10)   readouts: cond, conv, rad   parts (hl): "cond", "conv", "rad"
   ========================================================= */
SIM_DEF.k7s7_bukhari3d = {
  def: { fire: 6 },
  rng: { fire: () => [0, 10, 1] },
  lab: { fire: "Fire in the bukhari" },
  reads: { cond: "Conduction", conv: "Convection", rad: "Radiation" },
  readouts(P) {
    const f = Math.round(nn(P.fire));
    if (!f) return { cond: "fire is out: the pan slowly cools", conv: "no rising currents", rad: "the stove radiates less and less" };
    return { cond: "heat passes from the hot iron top into the base of the pan", conv: "water in the pan circulates; smoke and hot air rise up the chimney", rad: "warmth reaches Pema and Palden directly, no medium needed" };
  },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 10.5, phi: 1.2, theta: 0.6, auto: 0.18, target: [0, 2.2, 0], hint: "Drag to look around the room" });
    if (!g) return null;
    const { THREE, root } = g;
    const M = (c, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: .7 }, o));
    const floor = new THREE.Mesh(new THREE.BoxGeometry(10, .2, 8), M(0x7a5230)); floor.position.y = -.1; root.add(floor);
    const wall = new THREE.Mesh(new THREE.BoxGeometry(10, 5, .2), M(0x3d5a6e)); wall.position.set(0, 2.4, -3.4); root.add(wall);
    // stove
    const iron = M(0x2b2f36, { metalness: .6, roughness: .5 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(2, 1.4, 1.4), iron); body.position.y = 1.0; root.add(body);
    [[-.8, -.5], [.8, -.5], [-.8, .5], [.8, .5]].forEach(([x, z]) => { const l = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, .3, 8), iron); l.position.set(x, .15, z); root.add(l); });
    const doorM = new THREE.MeshStandardMaterial({ color: 0xff7a1a, emissive: 0xff5a00, emissiveIntensity: 1 });
    const door = new THREE.Mesh(new THREE.PlaneGeometry(.9, .55), doorM); door.position.set(0, .9, .71); root.add(door);
    const topM = new THREE.MeshStandardMaterial({ color: 0x5a2a1a, emissive: 0xff3300, emissiveIntensity: .3, metalness: .5 });
    const top = new THREE.Mesh(new THREE.BoxGeometry(2.04, .08, 1.44), topM); top.position.y = 1.74; root.add(top);
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(.16, .16, 3.4, 16), iron); pipe.position.set(-.6, 3.4, -.3); root.add(pipe);
    // pan + water
    const panM = new THREE.MeshStandardMaterial({ color: 0xb9c4cf, metalness: .8, roughness: .3, emissive: 0xff3300, emissiveIntensity: 0 });
    const pan = new THREE.Mesh(new THREE.CylinderGeometry(.55, .48, .45, 28, 1, true), panM); pan.position.set(.4, 2.0, 0); root.add(pan);
    const panBase = new THREE.Mesh(new THREE.CylinderGeometry(.48, .48, .04, 28), panM); panBase.position.set(.4, 1.8, 0); root.add(panBase);
    const water = new THREE.Mesh(new THREE.CylinderGeometry(.52, .52, .02, 28), new THREE.MeshStandardMaterial({ color: 0x62b6e8, transparent: true, opacity: .55 })); water.position.set(.4, 2.15, 0); root.add(water);
    const dotM = new THREE.MeshBasicMaterial({ color: 0xff8a5c }), dotG = new THREE.SphereGeometry(.045, 8, 6);
    const wd = []; for (let i = 0; i < 14; i++) { const d = new THREE.Mesh(dotG, dotM); root.add(d); wd.push({ d, ph: i / 14, side: i % 2 ? 1 : -1 }); }
    const smokeM = new THREE.MeshBasicMaterial({ color: 0xcfd6de, transparent: true, opacity: .5 });
    const smk = []; for (let i = 0; i < 14; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(.12, 10, 8), smokeM.clone()); root.add(d); smk.push({ d, ph: i / 14 }); }
    // radiation rings
    const rings = []; for (let i = 0; i < 3; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(1, .03, 8, 48), new THREE.MeshBasicMaterial({ color: 0xffb52e, transparent: true, opacity: .5 })); r.position.set(0, 1.0, 0); root.add(r); rings.push({ r, ph: i / 3 }); }
    // two children sitting near the bukhari
    const kid = (x, z, col) => { const k = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(.28, .36, .8, 14), M(col)); b.position.y = .4; k.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(.24, 16, 12), M(0xb97a4e)); h.position.y = 1.05; k.add(h); const hair = new THREE.Mesh(new THREE.SphereGeometry(.25, 16, 12, 0, 6.3, 0, 1.4), M(0x1d1a1a)); hair.position.y = 1.08; k.add(hair); k.position.set(x, 0, z); k.lookAt(0, 0, 0); root.add(k); return k; };
    kid(2.6, 1.8, 0xe04a86); kid(-2.5, 2.0, 0x35c29a);
    const light = new THREE.PointLight(0xff8a3a, 1.2, 9); light.position.set(0, 1.0, 1.2); root.add(light);
    const lCond = g.label("Conduction", [2.1, 1.9, .5]), lConv = g.label("Convection", [-1.5, 3.8, .3]), lRad = g.label("Radiation", [-1.9, .7, 1.6]);
    const st = { f: 6, hl: null };
    g.onFrame((t, dt) => {
      const f = st.f / 10;
      doorM.emissiveIntensity = f * (0.8 + .2 * Math.sin(t * 9)); light.intensity = .2 + f * 1.4 * (0.9 + .1 * Math.sin(t * 7));
      topM.emissiveIntensity = f * .5; panM.emissiveIntensity = (st.hl === "cond" ? .35 + .25 * Math.sin(t * 8) : 0) + f * .08;
      const sp = .25 + f * .5;
      wd.forEach(w => { const p = (w.ph + t * sp * .4) % 1; let x, y; if (p < .5) { x = .4 + w.side * .06; y = 1.85 + p * 2 * .26; } else { const q = (p - .5) * 2; x = .4 + w.side * (.06 + Math.sin(q * Math.PI) * .38); y = 2.11 - q * .26 + Math.sin(q * Math.PI) * .02; } w.d.position.set(x, y, 0); w.d.visible = f > 0; w.d.scale.setScalar(st.hl === "conv" ? 1.6 : 1); });
      smk.forEach(s => { const p = (s.ph + t * .12 * (0.5 + f)) % 1; s.d.position.set(-.6 + Math.sin(p * 6 + s.ph * 9) * .25 * p, 5.1 + p * 2.2, -.3); s.d.material.opacity = (1 - p) * .5 * f; s.d.scale.setScalar(.6 + p * 1.8); });
      rings.forEach(r => { const p = (r.ph + t * .35) % 1; r.r.scale.setScalar(1 + p * 2.8); r.r.material.opacity = (1 - p) * .55 * f * (st.hl === "rad" ? 1.6 : 1); r.r.rotation.x = Math.PI / 2; });
    });
    function apply(D, P, sh, hl) {
      st.f = cl(nn(D.fire), 0, 10); st.hl = hl;
      lCond.show(sh.has("cond") || hl === "cond"); lConv.show(sh.has("conv") || hl === "conv"); lRad.show(sh.has("rad") || hl === "rad");
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

/* =========================================================
   SCENE — Gangtok on a winter night: Kanchenjunga, prayer flags, warm windows, chimney smoke, snow
   ========================================================= */
let gw = null;
function gwInit(W, H) {
  const r = (a, b) => a + Math.random() * (b - a);
  gw = { W, H,
    stars: Array.from({ length: Math.round(W * H / 6000) }, () => ({ x: r(0, W), y: r(0, H * .5), s: r(.3, 1.5), p: r(0, 6.28) })),
    snow: Array.from({ length: Math.round(W / 9) }, () => ({ x: r(0, W), y: r(0, H), v: r(.3, 1), s: r(1, 2.6), p: r(0, 6.28) })),
    houses: (() => { const a = []; let x = -20; while (x < W + 40) { const w = r(46, 90); a.push({ x, w, h: r(36, 70), y: r(0, 50), ch: Math.random() < .7 }); x += w + r(4, 30); } return a; })(),
    puffs: [] };
}
SCENES.k7s7_gangtok = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!gw || gw.W !== W || gw.H !== H) gwInit(W, H);
  const S = gw;
  let g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#07142a"); g.addColorStop(.55, "#15305a"); g.addColorStop(1, "#28345a");
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  S.stars.forEach(s => { c.globalAlpha = .3 + .4 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.s, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // moon
  const mx = W * .78, my = H * .16, mr = Math.min(W, H) * .045;
  const mg = c.createRadialGradient(mx, my, mr, mx, my, mr * 4); mg.addColorStop(0, "rgba(255,248,220,.22)"); mg.addColorStop(1, "rgba(255,248,220,0)"); c.fillStyle = mg; c.beginPath(); c.arc(mx, my, mr * 4, 0, 6.28); c.fill();
  c.fillStyle = "#f4ecd2"; c.beginPath(); c.arc(mx, my, mr, 0, 6.28); c.fill();
  // Kanchenjunga range with moonlit snow
  const base = H * .62;
  c.fillStyle = "#2c3f66"; c.beginPath(); c.moveTo(0, base);
  const peaks = [[0, .5], [.12, .36], [.22, .44], [.35, .22], [.42, .3], [.5, .18], [.58, .28], [.7, .34], [.82, .27], [.92, .4], [1, .46]];
  peaks.forEach(([x, y]) => c.lineTo(x * W, y * H)); c.lineTo(W, base); c.fill();
  c.fillStyle = "rgba(235,242,250,.85)";
  peaks.forEach(([x, y], i) => { if (y < .36) { c.beginPath(); c.moveTo(x * W, y * H); c.lineTo(x * W - W * .035, y * H + H * .06); c.lineTo(x * W - W * .01, y * H + H * .05); c.lineTo(x * W + W * .012, y * H + H * .065); c.lineTo(x * W + W * .035, y * H + H * .055); c.fill(); } });
  // near hills
  c.fillStyle = "#13223d"; c.beginPath(); c.moveTo(0, H); for (let x = 0; x <= W; x += 20) c.lineTo(x, H * .7 + Math.sin(x / 140) * 20 + Math.sin(x / 47) * 6); c.lineTo(W, H); c.fill();
  // prayer flags strung across
  const fc = ["#3a7bd5", "#f2f2f2", "#e04a3a", "#35c29a", "#f4c51c"];
  [[.02, .55, .4, .6], [.55, .58, .98, .52]].forEach(([a, ya, b, yb], k) => {
    const x0 = a * W, x1 = b * W, y0 = ya * H, y1 = yb * H; c.strokeStyle = "rgba(220,220,220,.35)"; c.lineWidth = 1; c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2, Math.max(y0, y1) + 30, x1, y1); c.stroke();
    for (let i = 0; i < 16; i++) { const u = (i + .5) / 16, x = (1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * (x0 + x1) / 2 + u * u * x1, y = (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * (Math.max(y0, y1) + 30) + u * u * y1, sw = Math.sin(t / 500 + i + k) * 3;
      c.fillStyle = fc[i % 5]; c.globalAlpha = .55; c.beginPath(); c.moveTo(x - 5, y); c.lineTo(x + 5, y); c.lineTo(x + 5 + sw, y + 13); c.lineTo(x - 5 + sw, y + 13); c.fill(); }
    c.globalAlpha = 1;
  });
  // houses with warm windows and smoking chimneys (convection!)
  S.houses.forEach((h, i) => {
    const y = H - h.h - h.y * .4 - 10;
    c.fillStyle = "#0d1830"; c.fillRect(h.x, y, h.w, H - y);
    c.fillStyle = "#1c2b4a"; c.beginPath(); c.moveTo(h.x - 6, y); c.lineTo(h.x + h.w / 2, y - 16); c.lineTo(h.x + h.w + 6, y); c.fill();
    c.fillStyle = `rgba(255,190,100,${.55 + .15 * Math.sin(t / 600 + i)})`; c.fillRect(h.x + h.w * .2, y + 12, 9, 9); c.fillRect(h.x + h.w * .62, y + 12, 9, 9);
    if (h.ch) { const cx = h.x + h.w * .75; c.fillStyle = "#0d1830"; c.fillRect(cx, y - 18, 7, 14);
      if (!RM && Math.random() < .04) S.puffs.push({ x: cx + 3.5, y: y - 20, r: 3, a: .3 }); }
  });
  S.puffs.forEach(p => { p.y -= .35; p.x += Math.sin(p.y / 30) * .25; p.r += .05; p.a -= .0012; c.fillStyle = `rgba(200,210,225,${Math.max(0, p.a)})`; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.28); c.fill(); });
  S.puffs = S.puffs.filter(p => p.a > 0).slice(-160);
  // gentle snowfall
  c.fillStyle = "rgba(255,255,255,.75)";
  S.snow.forEach(f => { if (!RM) { f.y += f.v; f.x += Math.sin(t / 1200 + f.p) * .3; if (f.y > H) { f.y = -5; f.x = Math.random() * W; } } c.beginPath(); c.arc(f.x, f.y, f.s, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(4,10,24,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Tashi, the red panda of Sikkim, in a woollen scarf
   ========================================================= */
GUIDES.k7s7_panda = () => `<svg class="guide redpanda" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="32" ry="4" fill="#000" opacity=".25"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 82 104;10 82 104;0 82 104;-6 82 104;0 82 104" dur="3s" repeatCount="indefinite"/>
    <path d="M80 104 Q112 100 112 70 Q112 56 104 50 Q100 70 92 82 Q86 92 76 96Z" fill="#c4521f"/>
    <path d="M110 62 Q104 60 100 66 M108 76 Q102 74 98 80 M102 88 Q96 86 92 90" stroke="#f2d7b0" stroke-width="5" fill="none" stroke-linecap="round"/></g>
  <ellipse cx="58" cy="94" rx="28" ry="26" fill="#c4521f"/>
  <ellipse cx="58" cy="104" rx="18" ry="16" fill="#3a1c10"/>
  <rect x="36" y="108" width="12" height="16" rx="6" fill="#2a130b"/><rect x="66" y="108" width="12" height="16" rx="6" fill="#2a130b"/>
  <path d="M32 84 Q24 96 30 106" stroke="#2a130b" stroke-width="9" fill="none" stroke-linecap="round"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 84 84;-22 84 84;0 84 84;-10 84 84;0 84 84" dur="2.4s" repeatCount="indefinite"/>
    <path d="M82 82 Q96 74 100 62" stroke="#2a130b" stroke-width="9" fill="none" stroke-linecap="round"/></g>
  <path d="M34 70 Q58 82 84 70 L86 80 Q58 92 32 80Z" fill="#35c29a"/><path d="M40 78 L36 98 L46 96 L48 80Z" fill="#35c29a"/>
  <path d="M38 74 L44 78 M50 76 L56 80 M64 76 L70 80 M76 74 L82 78" stroke="#f4a51c" stroke-width="2.5"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M30 34 Q26 16 40 18 Q44 24 44 30Z" fill="#c4521f"/><path d="M33 31 Q32 22 39 22" fill="#f2d7b0"/>
    <path d="M90 34 Q94 16 80 18 Q76 24 76 30Z" fill="#c4521f"/><path d="M87 31 Q88 22 81 22" fill="#f2d7b0"/>
    <ellipse cx="60" cy="48" rx="30" ry="25" fill="#c4521f"/>
    <path d="M40 46 Q44 38 52 44 Q50 56 42 58Z" fill="#f2d7b0"/><path d="M80 46 Q76 38 68 44 Q70 56 78 58Z" fill="#f2d7b0"/>
    <ellipse cx="60" cy="60" rx="14" ry="10" fill="#f2d7b0"/>
    <path d="M44 60 Q50 72 56 66 M76 60 Q70 72 64 66" stroke="#7a2e12" stroke-width="3" fill="none"/>
    <circle cx="50" cy="48" r="4.4" fill="#15202a"/><circle cx="70" cy="48" r="4.4" fill="#15202a"/><circle cx="51.4" cy="46.6" r="1.5" fill="#fff"/><circle cx="71.4" cy="46.6" r="1.5" fill="#fff"/>
    <rect x="44" y="42" width="32" height="0" fill="#c4521f"><animate attributeName="height" values="0;0;0;12;0" keyTimes="0;.82;.9;.95;1" dur="4.2s" repeatCount="indefinite"/></rect>
    <ellipse cx="60" cy="57" rx="4" ry="3" fill="#15202a"/>
    <path d="M55 63 Q60 67 65 63" stroke="#15202a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M38 30 Q60 6 82 30 Q60 22 38 30Z" fill="#e04a86"/><circle cx="60" cy="12" r="5" fill="#f4a51c"/>
  </g>
</svg>`;
})();
