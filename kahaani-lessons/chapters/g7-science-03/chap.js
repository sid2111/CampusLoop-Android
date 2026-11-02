(function(){
/* Grade 7 Science (Curiosity) Chapter 3 — Electricity: Circuits and their Components
   Plugin: simulations (k7s3_*), the Bhakra–Nangal night scene, and Jugnu the firefly electrician guide. */

/* ---------- private helpers ---------- */
const hA = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const num = x => { const v = +x; return isFinite(v) ? v : 0; };
const on01 = x => num(x) >= 0.5;
const GLOW = "#ffd24a";
// answer hiding: a sim only shows the result (glow) when that read is shown, or when live:1 (hands-on)
const seen = (P, sh, k) => sh.has(k) || on01(P.live);
const QM = (x, y) => T(x, y, "?", { size: 22, fill: "var(--mari)" });
let gid = 0;
// moving current dots along a path (direction = path direction)
const flow = (d, col) => `<path d="${d}" fill="none" stroke="${col || GLOW}" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="2 12" opacity=".95">${RM ? "" : `<animate attributeName="stroke-dashoffset" values="0;-28" dur="0.9s" repeatCount="indefinite"/>`}</path>`;
const halo = (x, y, r, col) => { const id = "k7s3g" + (gid++); return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col || GLOW}" stop-opacity=".85"/><stop offset=".45" stop-color="${col || GLOW}" stop-opacity=".3"/><stop offset="1" stop-color="${col || GLOW}" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`; };
// a small bulb (glass + filament) centred at x,y
function bulb(x, y, r, lit, broken) {
  let s = lit ? halo(x, y, r * 3.2) : "";
  s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${lit ? "rgba(255,226,120,.55)" : "rgba(200,225,245,.16)"}" stroke="#a9c7dd" stroke-width="1.6"/>`;
  const w = r * .5;
  s += broken ? `<path d="M${x - w} ${y + r * .55} L${x - w} ${y} L${x - w * .4} ${y - r * .35} M${x + w * .2} ${y - r * .4} L${x + w} ${y} L${x + w} ${y + r * .55}" fill="none" stroke="#8fa2b4" stroke-width="1.6"/>`
    : `<path d="M${x - w} ${y + r * .55} L${x - w} ${y} L${x - w * .5} ${y - r * .35} L${x} ${y} L${x + w * .5} ${y - r * .35} L${x + w} ${y} L${x + w} ${y + r * .55}" fill="none" stroke="${lit ? "#fff6c8" : "#8fa2b4"}" stroke-width="${lit ? 2.4 : 1.6}"/>`;
  return s;
}
// an upright cell, + cap on top. x = centre, y = top of body
function cellV(x, y, w, h, opts = {}) {
  const dead = opts.dead;
  let s = `<rect x="${x - w / 2 + 3}" y="${y - 7}" width="${w - 6}" height="8" rx="2" fill="#c9d1da"/>`; // the protruding cap (+)
  s += `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="5" fill="${dead ? "#7b5658" : "#c8343a"}" stroke="#7d1a1f" stroke-width="1.5"/>`;
  s += `<rect x="${x - w / 2}" y="${y + h - 6}" width="${w}" height="6" rx="2" fill="#2a2a2a"/>`;
  s += `<rect x="${x - w / 2 + 2}" y="${y + h}" width="${w - 4}" height="3" fill="#9aa4ae"/>`; // flat disc (−)
  s += T(x, y + 20, "+", { size: 16, fill: "#fff" }) + T(x, y + h - 12, "−", { size: 16, fill: "#fff" });
  if (dead) s += T(x, y + h / 2 + 4, "dead", { size: 10, fill: "#ffd0d0" });
  return s;
}
// a horizontal cell drawn as a picture; plusRight decides which way it faces
function cellH(x, y, w, h, plusRight, bad) {
  const cap = 6, bx = plusRight ? x : x + cap, bw = w - cap;
  let s = `<rect x="${plusRight ? x + bw : x}" y="${y + h / 2 - h * .2}" width="${cap}" height="${h * .4}" rx="1.5" fill="#c9d1da"/>`;
  s += `<rect x="${bx}" y="${y}" width="${bw}" height="${h}" rx="5" fill="#c8343a" stroke="${bad ? "#ff6b6b" : "#7d1a1f"}" stroke-width="${bad ? 2.6 : 1.4}"/>`;
  s += `<rect x="${plusRight ? bx : bx + bw - 5}" y="${y}" width="5" height="${h}" fill="#2a2a2a"/>`;
  s += T(plusRight ? bx + bw - 10 : bx + 10, y + h / 2 + 5, "+", { size: 14, fill: "#fff" }) + T(plusRight ? bx + 14 : bx + bw - 14, y + h / 2 + 5, "−", { size: 14, fill: "#fff" });
  return s;
}

/* =========================================================
   1. k7s3_cells — a torch cut open: cells in the compartment, spring, switch, lamp
   params: n (cells 1–4), flip (0 = all correct, k = cell k is turned the wrong way), sw (0 OFF, 1 ON), lx (title)
   readouts: order, lamp     parts: "cells", "switch", "lamp", "strip"
   ========================================================= */
SIM_DEF.k7s3_cells = {
  def: { n: 2, flip: 0, sw: 0, lx: "" },
  rng: { n: () => [1, 4, 1], flip: () => [0, 4, 1], sw: () => [0, 1, 1] },
  lab: { n: "Number of cells", flip: "Reversed cell (0 = none)", sw: "Switch (0 OFF, 1 ON)" },
  reads: { order: "Cell order", lamp: "Torch lamp" },
  draw(D, P, sh, hl) {
    const n = clampN(Math.round(num(P.n)), 1, 4), fl = Math.round(num(P.flip)), bad = fl >= 1 && fl <= n;
    const V = seen(P, sh, "lamp"), Vo = seen(P, sh, "order"), lit = on01(P.sw) && !bad && V;
    let s = `<svg viewBox="0 0 420 230">`;
    s += T(210, 22, P.lx || "Inside a torch", { size: 13, fill: "var(--muted)" });
    // beam
    if (lit) s += `<path d="M392 80 L420 52 L420 192 L392 164Z" fill="${GLOW}" opacity=".28"/>`;
    // body
    s += `<rect x="30" y="86" width="300" height="72" rx="14" fill="#2b3f57" stroke="#4f6f90" stroke-width="2"/>`;
    s += `<rect x="42" y="98" width="278" height="44" rx="6" fill="rgba(0,0,0,.35)"/>`;
    s += `<line x1="46" y1="150" x2="352" y2="150" stroke="#b8c4cf" stroke-width="3"${hA(hl, "strip")}/>`;
    s += T(120, 172 + 10, "metal strip", { size: 10, fill: "var(--muted)" });
    // spring at the back
    let sp = "M44 104"; for (let i = 0; i < 6; i++) sp += ` L${i % 2 ? 44 : 54} ${104 + (i + 1) * 6}`;
    s += `<path d="${sp}" fill="none" stroke="#c9d1da" stroke-width="2"/>`;
    // cells
    const x0 = 58, pitch = 256 / n, w = pitch - 6;
    s += `<g${hA(hl, "cells")}>`;
    for (let i = 0; i < n; i++) s += cellH(x0 + i * pitch, 103, w, 34, !(bad && fl === i + 1), bad && fl === i + 1);
    s += `</g>`;
    if (bad && Vo) { const jx = fl === 1 ? x0 + pitch - 3 : x0 + (fl - 1) * pitch - 3; s += `<circle cx="${jx}" cy="120" r="13" fill="none" stroke="#ff6b6b" stroke-width="2.5" stroke-dasharray="4 3"/>` + T(210, 210, `Cell ${fl} is turned around: like terminals meet`, { size: 13, fill: "#ff8f8f" }); }
    // head + lamp
    s += `<path d="M330 98 L392 70 L392 174 L330 146Z" fill="#33506e" stroke="#4f6f90" stroke-width="2"/>`;
    s += `<g${hA(hl, "lamp")}>` + bulb(366, 122, 15, lit) + `</g>`;
    s += `<line x1="320" y1="120" x2="351" y2="122" stroke="#c9d1da" stroke-width="3"/>`;
    // switch on top
    const k = clampN(num(D.sw), 0, 1);
    s += `<g${hA(hl, "switch")}><rect x="150" y="76" width="62" height="12" rx="6" fill="#16222f" stroke="#4f6f90"/><rect x="${152 + k * 32}" y="72" width="26" height="20" rx="6" fill="${on01(P.sw) ? "var(--teal)" : "var(--rani)"}"/></g>`;
    s += T(181, 66, on01(P.sw) ? "ON" : "OFF", { size: 12, fill: on01(P.sw) ? "var(--teal)" : "var(--rani)" });
    if (lit) s += flow("M352 126 L352 150 L46 150 L46 120");
    if (!V) s += QM(366, 100);
    else if (!bad) s += T(210, 210, lit ? "The path is complete: current flows and the lamp glows" : on01(P.sw) ? "" : "Switch OFF: there is a gap, no current", { size: 13, fill: lit ? GLOW : "var(--muted)" });
    s += "</svg>";
    return { svg: s, reads: {
      order: bad ? `cell ${fl} is reversed: + meets + (or − meets −), so the path is broken` : n === 1 ? "one cell, + cap facing the lamp" : `${n} cells, + of each cell touches − of the next: a battery`,
      lamp: on01(P.sw) && !bad ? "glows" : bad ? "does not glow (cells in the wrong order)" : "does not glow (switch OFF)" } };
  }
};

/* =========================================================
   2. k7s3_lamp — inside an incandescent lamp and an LED; connect to a battery
   params: type (0 incandescent, 1 LED), on (0/1 connected), rev (0/1 wires swapped), broken (0/1 filament broken), col (LED colour)
   readouts: parts, glow     parts: "filament", "case", "tip", "legs", "wires"
   ========================================================= */
SIM_DEF.k7s3_lamp = {
  def: { type: 0, on: 0, rev: 0, broken: 0, col: "#ff5a5a" },
  rng: { type: () => [0, 1, 1], on: () => [0, 1, 1], rev: () => [0, 1, 1] },
  lab: { type: "Lamp (0 bulb, 1 LED)", on: "Connect (0/1)", rev: "Swap wires (0/1)" },
  reads: { parts: "Parts", glow: "Does it glow?" },
  draw(D, P, sh, hl) {
    const led = on01(P.type), con = on01(P.on), rev = on01(P.rev), brk = on01(P.broken);
    const V = seen(P, sh, "glow"), lit0 = con && (led ? !rev : !brk), lit = lit0 && V;
    let s = `<svg viewBox="0 0 420 240">`;
    let A, B; // terminal points (A = first terminal, B = second)
    if (!led) {
      if (lit) s += halo(120, 74, 110);
      s += `<path d="M88 118 Q60 92 74 60 Q92 24 120 24 Q148 24 166 60 Q180 92 152 118Z" fill="${lit ? "rgba(255,230,140,.35)" : "rgba(200,225,245,.12)"}" stroke="#a9c7dd" stroke-width="2"/>`;
      s += `<path d="M106 120 L106 74 M134 120 L134 74" stroke="#c9d1da" stroke-width="3.2"/>`;
      s += `<rect x="113" y="92" width="14" height="10" rx="3" fill="#e9f1f7" opacity=".8"/>`;
      const fil = brk ? "M106 74 L110 62 L114 74 L117 64 M123 66 L126 74 L130 62 L134 74" : "M106 74 L110 62 L114 74 L118 62 L122 74 L126 62 L130 74 L134 62 L134 74";
      s += `<path d="${fil}" fill="none" stroke="${lit ? "#fff7c2" : "#8fa2b4"}" stroke-width="${lit ? 3 : 2}"${hA(hl, "filament")}/>`;
      s += `<rect x="90" y="118" width="60" height="46" rx="4" fill="#9aa6b2" stroke="#6c7884"${hA(hl, "case")}/>`;
      for (let y = 124; y < 162; y += 8) s += `<path d="M90 ${y} L150 ${y + 4}" stroke="#6c7884" stroke-width="2"/>`;
      s += `<rect x="96" y="164" width="48" height="12" rx="3" fill="#20262c"/>`;
      s += `<rect x="111" y="176" width="18" height="10" rx="3" fill="#d4dbe2"${hA(hl, "tip")}/>`;
      s += `<path d="M106 120 L106 150 L118 170 L120 180" fill="none" stroke="#c9d1da" stroke-width="1.6" stroke-dasharray="3 2" opacity=".8"/><path d="M134 120 L148 132" stroke="#c9d1da" stroke-width="1.6" stroke-dasharray="3 2" opacity=".8"/>`;
      s += T(120, 16, "filament", { size: 11, fill: "var(--muted)" });
      s += T(66, 46, "glass bulb", { size: 10.5, fill: "var(--muted)", a: "end" });
      s += T(66, 90, "thick wires", { size: 10.5, fill: "var(--muted)", a: "end" }) + T(66, 103, "on a support", { size: 10, fill: "var(--muted)", a: "end" });
      s += T(84, 136, "metal case", { size: 10.5, fill: "var(--muted)", a: "end" }) + T(84, 149, "(one terminal)", { size: 10, fill: "var(--muted)", a: "end" });
      s += T(90, 172, "insulator", { size: 10, fill: "var(--muted)", a: "end" });
      s += T(105, 200, "metal tip", { size: 10.5, fill: "var(--muted)", a: "end" }) + T(105, 213, "(other terminal)", { size: 10, fill: "var(--muted)", a: "end" });
      A = [120, 186]; B = [150, 130];
    } else {
      if (lit) s += halo(120, 80, 100, P.col);
      s += `<path d="M94 122 L94 72 A26 26 0 0 1 146 72 L146 122Z" fill="${P.col}" fill-opacity="${lit ? .9 : .35}" stroke="${P.col}" stroke-width="2"/>`;
      s += `<rect x="88" y="120" width="64" height="9" rx="2" fill="${P.col}" fill-opacity=".6"/>`;
      s += `<path d="M110 120 L110 96 L104 92 L116 92 Z M130 120 L130 100" fill="#d0d8e0" stroke="#d0d8e0" stroke-width="2"/>`;
      s += `<g${hA(hl, "legs")}><path d="M110 129 L110 214" stroke="#c9d1da" stroke-width="3"/><path d="M130 129 L130 186" stroke="#c9d1da" stroke-width="3"/></g>`;
      s += T(102, 214, "+", { size: 15, fill: "var(--mari)", a: "end" }) + T(138, 186, "−", { size: 15, fill: "var(--sky)", a: "start" });
      s += T(64, 170, "longer leg = +", { size: 10.5, fill: "var(--mari)", a: "end" }) + T(64, 184, "(positive)", { size: 10, fill: "var(--muted)", a: "end" });
      s += T(150, 168, "shorter leg = −", { size: 10.5, fill: "var(--sky)", a: "start" });
      s += T(120, 36, "no filament inside!", { size: 11, fill: "var(--mari)" });
      if (lit) s += `<path d="M152 56 L172 42 M158 72 L182 68 M86 56 L66 42" stroke="${P.col}" stroke-width="2.5" stroke-linecap="round"/>`;
      A = [110, 214]; B = [130, 186];
    }
    // battery of two cells (right)
    s += cellV(352, 62, 28, 60) + cellV(352, 136, 28, 60);
    s += T(392, 62, "+", { size: 16, fill: "var(--mari)" }) + T(392, 202, "−", { size: 16, fill: "var(--sky)" });
    if (con) {
      const pa = led ? A : B, pb = led ? B : A, plusTo = rev ? pb : pa, minusTo = rev ? pa : pb;
      s += `<g${hA(hl, "wires")}><path d="M352 55 C300 40, 230 ${plusTo[1] - 60}, ${plusTo[0]} ${plusTo[1]}" fill="none" stroke="#e0362c" stroke-width="3"/>`;
      s += `<path d="M352 199 C330 236, 240 ${minusTo[1] + 40}, ${minusTo[0]} ${minusTo[1]}" fill="none" stroke="#222" stroke-width="3.4"/><path d="M352 199 C330 236, 240 ${minusTo[1] + 40}, ${minusTo[0]} ${minusTo[1]}" fill="none" stroke="#5b6470" stroke-width="1.4"/></g>`;
      if (lit) s += flow(`M352 55 C300 40, 230 ${plusTo[1] - 60}, ${plusTo[0]} ${plusTo[1]}`);
      if (!V) s += QM(200, 150);
    } else s += T(300, 228, "not connected", { size: 11, fill: "var(--muted)" });
    s += "</svg>";
    const parts = led ? "LED: no filament; longer leg is +, shorter leg is −" : "filament held by two thick wires; terminals = metal case and metal tip (they never touch)";
    const glow = !con ? "no — not connected to the battery" : led ? (rev ? "no — current can pass through an LED in one direction only" : "yes — + leg to + of battery, − leg to −") : brk ? "no — the filament is broken (the lamp has fused)" : "yes — the filament gets hot and glows" + (rev ? " (either way round works)" : "");
    return { svg: s, reads: { parts, glow } };
  }
};

/* =========================================================
   3. k7s3_bench — real cell, lamp holder and wires on a bench
   m = "t31": arr 1–6, the six arrangements of Table 3.1
   m = "switch": a safety-pin switch (sw 0 OFF, 1 ON) with an optional fault 0–5 (Fig. 3.12, Fig. 3.19)
   readouts: glow, why     parts: "cell", "lamp", "gap", "pin"
   ========================================================= */
const ARR = {
  1: { w: [["P", "T1"], ["N", "T2"]], glow: 1, why: "+ goes to one lamp terminal and − to the other: a complete path" },
  2: { w: [["P", "T1"], ["N", "FB"], ["T2", "FB2"]], glow: 0, why: "the wire from − is not joined to the lamp: a gap" },
  3: { w: [["P", "FT"], ["T1", "FT2"], ["N", "T2"]], glow: 0, why: "the wire from + is not joined to the lamp: a gap" },
  4: { w: [["P", "T1"], ["P", "T2"], ["N", "FB"]], glow: 0, why: "both lamp terminals go to + only; − is left free" },
  5: { w: [["N", "T1"], ["N", "T2"], ["P", "FT"]], glow: 0, why: "both lamp terminals go to − only; + is left free" },
  6: { w: [["P", "T2"], ["N", "T1"]], glow: 1, why: "wires crossed, but still one terminal to + and one to −: complete" }
};
const FAULTS = ["none", "fused lamp (broken filament)", "dead (used-up) cell", "a loose connection at the lamp holder", "plastic covering not removed from a wire end", "safety pin bent: it does not touch the second drawing pin"];
SIM_DEF.k7s3_bench = {
  def: { m: "t31", arr: 1, sw: 0, fault: 0 },
  rng: { arr: () => [1, 6, 1], sw: () => [0, 1, 1], fault: () => [0, 5, 1] },
  lab: { arr: "Arrangement (Table 3.1)", sw: "Switch (0 OFF, 1 ON)", fault: "Fault to check (0 = none)" },
  reads: { glow: "Lamp", why: "Why" },
  draw(D, P, sh, hl) {
    const pts = { P: [76, 58], N: [76, 196], T1: [282, 130], T2: [338, 130], FB: [196, 214], FB2: [262, 198], FT: [190, 40], FT2: [236, 70] };
    let s = `<svg viewBox="0 0 420 240">`;
    const swm = P.m === "switch", fault = swm ? clampN(Math.round(num(P.fault)), 0, 5) : 0;
    let lit, why, wires = [], gaps = []; const V = seen(P, sh, "glow"), Vw = seen(P, sh, "why");
    const wcol = ["#e0362c", "#2e8b57", "#d9b400", "#222"];
    if (!swm) {
      const a = ARR[clampN(Math.round(num(P.arr)), 1, 6)]; lit = !!a.glow; why = a.why; wires = a.w;
      if (Vw && a.w.some(w => w[1] === "FB")) gaps.push([229, 206]);
      if (Vw && a.w.some(w => w[1] === "FT")) gaps.push([213, 55]);
    } else {
      const closed = on01(P.sw) && fault !== 5;
      lit = closed && fault === 0;
      why = fault ? FAULTS[fault] : on01(P.sw) ? "pin touches both drawing pins: circuit closed (ON)" : "air gap between the pins: circuit open (OFF)";
    }
    const lit0 = lit; lit = lit && V;
    // cell
    s += `<g${hA(hl, "cell")}>` + cellV(76, 70, 34, 118, { dead: fault === 2 }) + `</g>`;
    // lamp holder + bulb
    s += `<g${hA(hl, "lamp")}><rect x="272" y="96" width="76" height="56" rx="8" fill="#2a7fd4" stroke="#1b5a99" stroke-width="2"/><rect x="298" y="84" width="24" height="16" rx="3" fill="#9aa6b2"/>`;
    s += bulb(310, 66, 20, lit, fault === 1) + `</g>`;
    s += `<circle cx="282" cy="130" r="5" fill="#d4dbe2"/><circle cx="338" cy="130" r="5" fill="#d4dbe2"/>`;
    const curve = (a, b) => { const [x1, y1] = a, [x2, y2] = b, up = y1 < 120 || y2 < 100; const my = up ? Math.min(y1, y2) - 30 : Math.max(y1, y2) + 30; return `M${x1} ${y1} C${x1 + 40} ${my}, ${x2 - 40} ${my}, ${x2} ${y2}`; };
    if (!swm) {
      wires.forEach((w, i) => { const a = pts[w[0]], b = pts[w[1]]; const c = w[0] === "N" ? "#222" : w[0] === "P" ? "#e0362c" : wcol[1 + (i % 2)]; s += `<path d="${curve(a, b)}" fill="none" stroke="${c}" stroke-width="3.2"/>`; if (/^F/.test(w[1])) s += `<circle cx="${b[0]}" cy="${b[1]}" r="3" fill="#d9a066"/>`; });
      gaps.forEach(g => s += `<circle cx="${g[0]}" cy="${g[1]}" r="17" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-dasharray="4 3"${hA(hl, "gap")}/>` + T(g[0], g[1] + (g[1] > 120 ? 30 : -22), "gap", { size: 11, fill: "#ff8f8f" }));
      s += T(380, 30, `No. ${clampN(Math.round(num(P.arr)), 1, 6)}`, { size: 16, fill: "var(--mari)" });
      if (lit) s += flow(curve(pts[wires[0][0]], pts[wires[0][1]]));
    } else {
      // cardboard switch at the bottom
      s += `<rect x="140" y="180" width="120" height="48" rx="5" fill="#8a6d4a" stroke="#5e4a30"/>`;
      const Ax = 162, Ay = 204, Bx = 236, By = 204;
      s += `<path d="${curve([76, 58], [282, 130])}" fill="none" stroke="#e0362c" stroke-width="3.2"/>`;
      s += `<path d="M76 196 C90 214, 140 212, ${Ax} ${Ay}" fill="none" stroke="#222" stroke-width="3.2"/>`;
      s += `<path d="M338 130 C360 180, 290 210, ${Bx} ${By}" fill="none" stroke="#d9b400" stroke-width="3.2"/>`;
      if (fault === 3) { s += `<path d="M282 130 L262 116" stroke="#e0362c" stroke-width="0"/>`; s += `<circle cx="282" cy="130" r="13" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-dasharray="4 3"/>` + T(282, 160, "loose", { size: 10, fill: "#ff8f8f" }); }
      if (fault === 4) s += `<rect x="230" y="196" width="14" height="16" rx="3" fill="#d9b400" stroke="#ff6b6b" stroke-width="2"/>` + T(237, 176, "covered end", { size: 10, fill: "#ff8f8f" });
      const k = clampN(num(D.sw), 0, 1), ang = (1 - k) * -38 + (fault === 5 ? -14 * k : 0), L = Bx - Ax, rad = ang * Math.PI / 180;
      const ex = Ax + L * Math.cos(rad), ey = Ay + L * Math.sin(rad);
      s += `<g${hA(hl, "pin")}><line x1="${Ax}" y1="${Ay}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="#e8eef4" stroke-width="4" stroke-linecap="round"/><circle cx="${Ax}" cy="${Ay}" r="7" fill="#e8c14a" stroke="#9c7d1f"/></g><circle cx="${Bx}" cy="${By}" r="7" fill="#e8c14a" stroke="#9c7d1f"/>`;
      s += T(200, 238, "drawing pins + safety pin = switch", { size: 10, fill: "var(--muted)" });
      s += T(380, 30, on01(P.sw) ? "ON" : "OFF", { size: 16, fill: on01(P.sw) ? "var(--teal)" : "var(--rani)" });
      if (lit) s += flow(curve([76, 58], [282, 130]));
    }
    if (!V) s += QM(352, 60);
    s += T(36, 132, "cell", { size: 10, fill: "var(--muted)" });
    s += "</svg>";
    return { svg: s, reads: { glow: lit0 ? "glows" : "does not glow", why } };
  }
};

/* =========================================================
   4. k7s3_diagram — circuit diagrams with standard symbols
   m = "circuit": load ("lamp" | "led" | "2lamp"), cells (1|2), flip (0: + on the right, 1: + on the left),
       nsw (0,1,2 switches), s1, s2 (0 OFF / 1 ON), broken (0, 1 = L1, 2 = L2)
   m = "symbols": the Table 3.2 symbol chart, c = highlighted card (0–6, −1 none)
   readouts: state, glow, dir     parts: "battery", "load", "s1", "s2"
   ========================================================= */
const SYM = {
  cell(x, y, plusLeft) { const a = plusLeft ? 5 : -5; return `<line x1="${x - a}" y1="${y - 17}" x2="${x - a}" y2="${y + 17}" stroke="var(--ink)" stroke-width="2.4"/><line x1="${x + a}" y1="${y - 9}" x2="${x + a}" y2="${y + 9}" stroke="var(--ink)" stroke-width="4.5"/>`; },
  battery(x, y, plusLeft) { return SYM.cell(x - 10, y, plusLeft) + SYM.cell(x + 10, y, plusLeft) + `<line x1="${x - 5}" y1="${y}" x2="${x + 5}" y2="${y}" stroke="var(--ink)" stroke-width="2"/>`; },
  lamp(x, y, lit, broken) { let s = lit ? halo(x, y, 34) : ""; s += `<circle cx="${x}" cy="${y}" r="13" fill="${lit ? "rgba(255,210,74,.5)" : "none"}" stroke="var(--ink)" stroke-width="2.2"/>`; s += broken ? `<path d="M${x - 9} ${y - 9} L${x - 2} ${y - 2} M${x + 9} ${y + 9} L${x + 2} ${y + 2} M${x + 9} ${y - 9} L${x - 9} ${y + 9}" stroke="#ff6b6b" stroke-width="2.2"/>` : `<path d="M${x - 9} ${y - 9} L${x + 9} ${y + 9} M${x + 9} ${y - 9} L${x - 9} ${y + 9}" stroke="var(--ink)" stroke-width="2.2"/>`; return s; },
  led(x, y, lit) { let s = lit ? halo(x, y, 34, "#ff7a7a") : ""; s += `<path d="M${x - 12} ${y - 12} L${x + 10} ${y} L${x - 12} ${y + 12}Z" fill="${lit ? "#ff7a7a" : "none"}" stroke="var(--ink)" stroke-width="2.2"/><line x1="${x + 10}" y1="${y - 13}" x2="${x + 10}" y2="${y + 13}" stroke="var(--ink)" stroke-width="2.4"/>`;
    s += `<path d="M${x - 2} ${y - 15} L${x + 6} ${y - 25} M${x + 6} ${y - 15} L${x + 14} ${y - 25}" stroke="${lit ? "#ff7a7a" : "var(--ink)"}" stroke-width="1.8"/><path d="M${x + 6} ${y - 25} l-5 1 l3 3Z M${x + 14} ${y - 25} l-5 1 l3 3Z" fill="var(--ink)" stroke="var(--ink)"/>`; return s; },
  sw(x, y, on) { return `<circle cx="${x - 14}" cy="${y}" r="3.2" fill="var(--night)" stroke="var(--ink)" stroke-width="2"/><circle cx="${x + 14}" cy="${y}" r="3.2" fill="var(--night)" stroke="var(--ink)" stroke-width="2"/>` + (on ? `<line x1="${x - 11}" y1="${y}" x2="${x + 11}" y2="${y}" stroke="var(--ink)" stroke-width="2.4"/>` : `<line x1="${x - 11}" y1="${y - 1}" x2="${x + 12}" y2="${y - 13}" stroke="var(--ink)" stroke-width="2.4"/>`); }
};
function hsegs(y, x1, x2, cuts) { // wire pieces on a horizontal line, leaving room for components
  const c = cuts.slice().sort((a, b) => a[0] - b[0]); let s = "", x = x1;
  c.forEach(([cx, hw]) => { if (cx - hw > x) s += `M${x} ${y} H${cx - hw}`; x = cx + hw; }); if (x < x2) s += `M${x} ${y} H${x2}`; return s;
}
const SYMCARDS = [["Electric cell", "cell"], ["Battery", "battery"], ["Electric lamp", "lamp"], ["LED", "led"], ["Switch ‘ON’", "on"], ["Switch ‘OFF’", "off"], ["Wire", "wire"]];
SIM_DEF.k7s3_diagram = {
  def: { m: "circuit", load: "lamp", cells: 1, flip: 0, nsw: 1, s1: 0, s2: 0, broken: 0, c: -1, lx: "" },
  rng: { s1: () => [0, 1, 1], s2: () => [0, 1, 1], flip: () => [0, 1, 1], cells: () => [1, 2, 1] },
  lab: { s1: "Switch S1 (0 OFF, 1 ON)", s2: "Switch S2 (0 OFF, 1 ON)", flip: "Turn battery round (0/1)", cells: "Cells (1 or 2)" },
  reads: { state: "Circuit", glow: "Glows?", dir: "Current" },
  draw(D, P, sh, hl) {
    let s = `<svg viewBox="0 0 420 240">`;
    if (P.m === "symbols") {
      const c = Math.round(num(P.c));
      SYMCARDS.forEach(([name, k], i) => {
        const col = i % 2, row = Math.floor(i / 2), x = 12 + col * 202, y = 10 + row * 56, H = 48, sel = i === c;
        s += `<rect x="${x}" y="${y}" width="194" height="${H}" rx="10" fill="${sel ? "rgba(244,165,28,.18)" : "rgba(255,255,255,.05)"}" stroke="${sel ? "var(--mari)" : "var(--line)"}" stroke-width="${sel ? 2.4 : 1}"/>`;
        const sx = x + 50, sy = y + H / 2 + (k === "led" ? 5 : 0);
        s += `<line x1="${sx - 38}" y1="${sy}" x2="${sx + 38}" y2="${sy}" stroke="var(--ink)" stroke-width="2"/>`;
        s += `<rect x="${sx - (k === "wire" ? 0 : 22)}" y="${sy - 2}" width="${k === "wire" ? 0 : 44}" height="4" fill="var(--night)"/>`;
        if (k === "cell") s += `<rect x="${sx - 8}" y="${sy - 3}" width="16" height="6" fill="var(--night)"/>` + SYM.cell(sx, sy, true) + T(sx - 14, sy - 10, "+", { size: 11, fill: "var(--mari)" }) + T(sx + 14, sy - 10, "−", { size: 11, fill: "var(--sky)" });
        if (k === "battery") s += `<rect x="${sx - 20}" y="${sy - 3}" width="40" height="6" fill="var(--night)"/>` + SYM.battery(sx, sy, true);
        if (k === "lamp") s += `<rect x="${sx - 14}" y="${sy - 3}" width="28" height="6" fill="var(--night)"/>` + SYM.lamp(sx, sy, false);
        if (k === "led") s += SYM.led(sx, sy, false);
        if (k === "on" || k === "off") s += `<rect x="${sx - 12}" y="${sy - 3}" width="24" height="6" fill="var(--night)"/>` + SYM.sw(sx, sy, k === "on");
        s += T(x + 104, y + H / 2 + 5, `${i + 1}. ${name}`, { size: 13, a: "start" });
      });
      s += T(312, 214, "long line = +", { size: 11.5, fill: "var(--mari)" }) + T(312, 230, "triangle points the current’s way", { size: 11.5, fill: "var(--muted)" });
      s += "</svg>";
      return { svg: s, reads: { state: "symbols from Table 3.2", glow: "—", dir: "cell: long line +, short line −; LED: current only along the triangle" } };
    }
    const load = P.load || "lamp", nsw = clampN(Math.round(num(P.nsw)), 0, 2), two = load === "2lamp";
    const plusLeft = on01(P.flip), cells = clampN(Math.round(num(P.cells)), 1, 2), brk = Math.round(num(P.broken));
    const s1 = nsw < 1 || on01(P.s1), s2 = nsw < 2 || on01(P.s2), closed = s1 && s2 && !brk;
    // with + on the left the current runs clockwise: up the left side, left→right along the top
    const V = seen(P, sh, "glow"), ledOK = load !== "led" || plusLeft, lit0 = closed && ledOK, lit = lit0 && V;
    const X1 = 60, X2 = 360, YT = 62, YB = 182;
    const bx = 130, bhw = cells === 2 ? 22 : 9;
    const top = two ? [[130, 14], [290, 14]].concat(nsw === 2 ? [[210, 15]] : []) : [[210, load === "led" ? 13 : 14]];
    const bot = [[bx, bhw]].concat(nsw >= 1 ? [[270, 15]] : []);
    s += T(210, 22, P.lx || "Circuit diagram", { size: 12.5, fill: "var(--muted)" });
    s += `<path d="${hsegs(YT, X1, X2, top)}${hsegs(YB, X1, X2, bot)}M${X1} ${YT} V${YB} M${X2} ${YT} V${YB}" fill="none" stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round"/>`;
    s += `<g${hA(hl, "battery")}>` + (cells === 2 ? SYM.battery(bx, YB, plusLeft) : SYM.cell(bx, YB, plusLeft)) + `</g>`;
    s += T(bx + (plusLeft ? -1 : 1) * (bhw + 10), YB - 16, "+", { size: 15, fill: "var(--mari)" }) + T(bx + (plusLeft ? 1 : -1) * (bhw + 10), YB - 16, "−", { size: 15, fill: "var(--sky)" });
    if (two) {
      s += `<g${hA(hl, "load")}>` + SYM.lamp(130, YT, lit, brk === 1) + SYM.lamp(290, YT, lit, brk === 2) + `</g>` + T(130, YT - 22, "L1", { size: 13 }) + T(290, YT - 22, "L2", { size: 13 });
      if (nsw === 2) s += `<g${hA(hl, "s2")}>` + SYM.sw(210, YT, s2) + `</g>` + T(210, YT - 20, "S2", { size: 13 });
    } else s += `<g${hA(hl, "load")}>` + (load === "led" ? SYM.led(210, YT, lit) : SYM.lamp(210, YT, lit, brk === 1)) + `</g>`;
    if (nsw >= 1) s += `<g${hA(hl, "s1")}>` + SYM.sw(270, YB, s1) + `</g>` + T(270, YB + 24, nsw === 2 ? "S1" : "switch", { size: 12.5 });
    if (!V) { if (two) s += QM(130, YT + 40) + QM(290, YT + 40); else s += QM(210, YT + 40); }
    else if (lit) { const d = plusLeft ? `M${X1 + 10} ${YB - 10} V${YT + 10} H${X2 - 10} V${YB - 10} H${X1 + 10}` : `M${X2 - 10} ${YB - 10} V${YT + 10} H${X1 + 10} V${YB - 10} H${X2 - 10}`; s += flow(d); }
    else if (closed && !ledOK) s += T(210, YT + 46, "current would go against the LED’s triangle", { size: 12, fill: "#ff8f8f" });
    if (V) s += T(210, 222, lit ? "closed circuit: current flows" : !closed ? (brk ? "a broken filament opens the circuit" : "a switch is OFF: the circuit is open") : "no current", { size: 13, fill: lit ? GLOW : "var(--muted)" });
    s += "</svg>";
    const what = two ? "both lamps" : load === "led" ? "the LED" : "the lamp";
    const glow = lit0 ? `yes: ${what} ${two ? "glow" : "glows"}` : two ? "no lamp glows" : `no: ${what} does not glow`;
    return { svg: s, reads: { state: closed ? "closed (complete path)" : "open (there is a gap)", glow, dir: lit0 ? "from the + terminal (long line), through the circuit, to the − terminal" : closed && !ledOK ? "an LED lets current pass one way only — here it is the wrong way" : "no current flows" } };
  }
};

/* =========================================================
   5. k7s3_tester — conduction tester (Activity 3.11, Table 3.3)
   params: mat (0–14 object index)     readouts: obj, glow, verdict     parts: "probes", "obj"
   ========================================================= */
const MATS = [
  ["Stick", "wood", 0, "#a0703c"], ["Scale", "plastic", 0, "#4fa3e0"], ["Bangle", "glass", 0, "#9fe0e6"], ["Paper strip", "paper", 0, "#f2efe4"], ["Candle", "wax", 0, "#f6e7b0"],
  ["Key", "metal", 1, "#d8b24a"], ["Eraser", "rubber", 0, "#e07aa0"], ["Spoon", "metal (steel)", 1, "#c4ccd4"], ["Coin", "metal", 1, "#c9b37a"], ["Cork", "cork", 0, "#b98a56"],
  ["Aluminium foil", "metal (aluminium)", 1, "#dfe5ea"], ["Sewing needle", "metal (steel)", 1, "#aeb8c2"], ["Pencil lead", "graphite", 1, "#555b63"], ["Cardboard", "cardboard", 0, "#c9a56e"], ["Copper wire", "metal (copper)", 1, "#d9773a"]
];
SIM_DEF.k7s3_tester = {
  def: { mat: 0 },
  rng: { mat: () => [0, MATS.length - 1, 1] },
  lab: { mat: "Object to test" },
  reads: { obj: "Object", glow: "Lamp glows?", verdict: "Conclusion" },
  draw(D, P, sh, hl) {
    const i = clampN(Math.round(num(P.mat)), 0, MATS.length - 1), [nm, mt, c, col] = MATS[i];
    const V = seen(P, sh, "glow") || seen(P, sh, "verdict"); const cl = c && V;
    let s = `<svg viewBox="0 0 420 240">`;
    s += cellV(60, 66, 34, 110);
    s += `<rect x="190" y="52" width="60" height="34" rx="6" fill="#2a7fd4" stroke="#1b5a99" stroke-width="2"/>` + bulb(220, 34, 17, !!cl);
    s += `<path d="M60 59 C70 30, 140 60, 196 76" fill="none" stroke="#e0362c" stroke-width="3"/>`;
    s += `<path d="M60 180 C64 214, 120 214, 150 196" fill="none" stroke="#222" stroke-width="3.2"/><path d="M244 76 C320 90, 320 160, 290 196" fill="none" stroke="#d9b400" stroke-width="3"/>`;
    s += `<g${hA(hl, "obj")}><rect x="146" y="198" width="148" height="24" rx="${nm === "Bangle" || nm === "Coin" ? 12 : 5}" fill="${col}" stroke="rgba(0,0,0,.4)"/>` + T(220, 215, nm, { size: 12, fill: "#1a1f26" }) + `</g>`;
    s += `<g${hA(hl, "probes")}><circle cx="150" cy="198" r="4" fill="#d9a066"/><circle cx="290" cy="198" r="4" fill="#d9a066"/></g>`;
    if (cl) s += flow("M60 59 C70 30, 140 60, 196 76");
    s += T(340, 40, `test ${i + 1} of ${MATS.length}`, { size: 11, fill: "var(--muted)", a: "start" });
    if (V) { s += T(340, 120, c ? "GLOWS" : "no glow", { size: 16, fill: c ? GLOW : "var(--muted)", a: "start" });
    s += T(340, 142, c ? "conductor" : "insulator", { size: 13, fill: c ? "var(--teal)" : "var(--rani)", a: "start" }); } else s += QM(360, 126);
    s += "</svg>";
    return { svg: s, reads: { obj: `${nm} — made of ${mt}`, glow: c ? "Yes" : "No", verdict: c ? "conductor: current passes through it easily" : "insulator: current cannot pass through it" } };
  }
};

/* =========================================================
   3D — k7s3_torch3d: a see-through torch. Cells sit in the tube, the switch slides,
   the lamp lights the room.   params: sw (0/1), n (1–3 cells), flip (0/1: last cell turned round)
   readouts: lamp, order    parts: "switch", "cells", "lamp"
   ========================================================= */
SIM_DEF.k7s3_torch3d = {
  def: { sw: 0, n: 2, flip: 0 },
  rng: { sw: () => [0, 1, 1], n: () => [1, 3, 1], flip: () => [0, 1, 1] },
  lab: { sw: "Switch (0 OFF, 1 ON)", n: "Number of cells", flip: "Turn one cell round (0/1)" },
  reads: { lamp: "Torch lamp", order: "Cells" },
  readouts(P) {
    const n = clampN(Math.round(num(P.n)), 1, 3), bad = on01(P.flip) && n >= 1, lit = on01(P.sw) && !bad;
    return { lamp: lit ? "glows: the circuit is complete" : bad ? "dark: one cell is the wrong way round" : "dark: switch OFF leaves a gap", order: bad ? "+ meets + — not a battery" : n === 1 ? "one cell, + towards the lamp" : `${n} cells, + to − in a row: a battery` };
  },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 8.5, phi: 1.15, theta: 0.5, auto: 0.18, target: [0, 0, 0], hint: "Drag to turn the torch" });
    if (!g) return null;
    const { THREE, root } = g;
    const tubeM = new THREE.MeshStandardMaterial({ color: 0x5a86b0, transparent: true, opacity: 0.22, roughness: 0.2, metalness: 0.2, side: THREE.DoubleSide, depthWrite: false });
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 5.2, 32, 1, true), tubeM); tube.rotation.z = Math.PI / 2; root.add(tube);
    const headM = new THREE.MeshStandardMaterial({ color: 0x8fb4d6, transparent: true, opacity: 0.3, roughness: 0.2, side: THREE.DoubleSide, depthWrite: false });
    const head = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 0.62, 1.1, 32, 1, true), headM); head.rotation.z = -Math.PI / 2; head.position.x = 3.15; root.add(head);
    const backM = new THREE.MeshStandardMaterial({ color: 0x2b3f57, roughness: 0.6 });
    const back = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 0.2, 32), backM); back.rotation.z = Math.PI / 2; back.position.x = -2.65; root.add(back);
    // spring
    const springM = new THREE.MeshStandardMaterial({ color: 0xc9d1da, metalness: 0.8, roughness: 0.3 });
    for (let i = 0; i < 4; i++) { const t = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.03, 8, 20), springM); t.rotation.y = Math.PI / 2; t.position.x = -2.5 + i * 0.09; root.add(t); }
    // metal strip
    const strip = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.04, 0.12), springM); strip.position.set(0.2, -0.58, 0); root.add(strip);
    // cells
    const redM = new THREE.MeshStandardMaterial({ color: 0xc8343a, roughness: 0.45, emissive: 0x300000, emissiveIntensity: 0.3 });
    const capM = new THREE.MeshStandardMaterial({ color: 0xd4dbe2, metalness: 0.9, roughness: 0.25 });
    const blackM = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 });
    const cells = [];
    for (let i = 0; i < 3; i++) {
      const grp = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.45, 28), redM); body.rotation.z = Math.PI / 2; grp.add(body);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.485, 0.485, 0.14, 28), blackM); band.rotation.z = Math.PI / 2; band.position.x = -0.66; grp.add(band);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 20), capM); cap.rotation.z = Math.PI / 2; cap.position.x = 0.78; grp.add(cap);
      root.add(grp); const l = g.label("+", [0, 0, 0], "plain"); cells.push({ grp, l, rx: 0, tx: 0, ry: 0 });
    }
    // lamp
    const glassM = new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.45, emissive: 0xffd24a, emissiveIntensity: 0 });
    const glass = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 18), glassM); glass.position.x = 3.05; root.add(glass);
    const filM = new THREE.MeshBasicMaterial({ color: 0x777777 });
    const fil = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.018, 6, 16, Math.PI), filM); fil.position.x = 3.05; root.add(fil);
    const light = new THREE.PointLight(0xffd24a, 0, 9); light.position.set(3.4, 0, 0); root.add(light);
    const beamM = new THREE.MeshBasicMaterial({ color: 0xffe28a, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
    const beam = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3.2, 32, 1, true), beamM); beam.rotation.z = Math.PI / 2; beam.position.x = 5.3; root.add(beam);
    // switch
    const swBase = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.1, 0.34), backM); swBase.position.set(0.3, 0.66, 0); root.add(swBase);
    const knobM = new THREE.MeshStandardMaterial({ color: 0xe04a86, roughness: 0.4 });
    const knob = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.2, 0.3), knobM); knob.position.set(0, 0.76, 0); root.add(knob);
    const lSw = g.label("OFF", [0.3, 1.25, 0], "plain"), lLamp = g.label("", [3.1, 1.35, 0], "big");
    const st = { k: 0, tk: 0, lit: 0, tl: 0, hl: null };
    g.onFrame((t, dt) => {
      const e = Math.min(1, dt * 7);
      st.k += (st.tk - st.k) * e; st.lit += (st.tl - st.lit) * e;
      knob.position.x = 0.05 + st.k * 0.5;
      cells.forEach(c => { c.grp.position.x += (c.tx - c.grp.position.x) * e; c.grp.rotation.y += (c.ry - c.grp.rotation.y) * e; });
      const pulse = st.hl === "lamp" ? 0.5 + 0.5 * Math.sin(t * 8) : 1;
      glassM.emissiveIntensity = st.lit * 1.4 * pulse; light.intensity = st.lit * 2.2; beamM.opacity = st.lit * 0.16;
      filM.color.setHex(st.lit > 0.5 ? 0xfff2a8 : 0x777777);
      knobM.emissive = knobM.emissive || new THREE.Color(0); knobM.emissive.setHex(st.hl === "switch" && Math.sin(t * 8) > 0 ? 0x553300 : 0x000000);
      redM.emissiveIntensity = st.hl === "cells" ? 0.6 + 0.4 * Math.sin(t * 8) : 0.3;
    });
    function apply(D, P, sh, hl) {
      st.hl = hl;
      const n = clampN(Math.round(num(P.n)), 1, 3), bad = on01(P.flip), V = sh.has("lamp") || on01(P.live), lit = on01(P.sw) && !bad && V;
      st.tk = clampN(num(D.sw), 0, 1); st.tl = lit ? 1 : 0;
      knobM.color.setHex(on01(P.sw) ? 0x35c29a : 0xe04a86);
      const x0 = 2.45 - n * 1.6 + 0.8;
      cells.forEach((c, i) => {
        const vis = i < n; c.grp.visible = vis; c.l.show(vis);
        c.tx = x0 + i * 1.6; if (Math.abs(c.grp.position.x) < 1e-6 && !c.init) { c.grp.position.x = c.tx; c.init = 1; }
        const rev = bad && i === n - 1; c.ry = rev ? Math.PI : 0;
        c.l.move([c.tx + (rev ? -0.75 : 0.75), 0.75, 0]); c.l.set(`<b style="color:${rev ? "#ff8f8f" : "#f4a51c"}">+</b>`);
      });
      lSw.set(on01(P.sw) ? "ON" : "OFF");
      lLamp.set(!V ? "?" : lit ? "glows!" : "dark"); lLamp.show(true);
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

/* =========================================================
   SCENE — Bhakra–Nangal at night: Shivalik hills, the dam with falling water, power towers
   carrying sparks of electricity, the little Bhakra–Nangal train and fireflies.
   ========================================================= */
let W0 = null;
function wInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  W0 = { W, H,
    stars: Array.from({ length: Math.round(W * H / 6000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .5), r: rnd(.3, 1.5), p: rnd(0, 6.28) })),
    hills: Array.from({ length: 11 }, (_, i) => ({ x: i * W / 10, h: rnd(60, 140) })),
    hills2: Array.from({ length: 8 }, (_, i) => ({ x: i * W / 7, h: rnd(30, 80) })),
    flies: Array.from({ length: 22 }, () => ({ x: rnd(0, W), y: rnd(H * .45, H * .95), p: rnd(0, 6.28), s: rnd(.3, .9) })) };
}
SCENES.k7s3_nangal = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!W0 || W0.W !== W || W0.H !== H) wInit(W, H);
  const S = W0, gy = H * .8;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#050b1c"); g.addColorStop(.7, "#0f1d3a"); g.addColorStop(1, "#1d2f4f");
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  S.stars.forEach(s => { c.globalAlpha = .3 + .4 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // moon
  const mx = W * .82, my = H * .14, mr = Math.min(W, H) * .045;
  c.fillStyle = "#f2ead0"; c.beginPath(); c.arc(mx, my, mr, 0, 6.28); c.fill(); c.fillStyle = "#0b1530"; c.beginPath(); c.arc(mx + mr * .4, my - mr * .2, mr * .9, 0, 6.28); c.fill();
  // far Shivalik hills
  c.fillStyle = "#13223f"; c.beginPath(); c.moveTo(0, gy); S.hills.forEach(h => c.lineTo(h.x, gy - h.h - 40)); c.lineTo(W, gy); c.fill();
  // the dam wall (centre-left) with water falling
  const dx = W * .18, dw = Math.min(260, W * .26), dTop = gy - 150;
  c.fillStyle = "#2c3b55"; c.beginPath(); c.moveTo(dx, gy); c.lineTo(dx + 24, dTop); c.lineTo(dx + dw - 24, dTop); c.lineTo(dx + dw, gy); c.fill();
  c.fillStyle = "#3a4d6e"; c.fillRect(dx + 20, dTop - 8, dw - 40, 8);
  for (let i = 0; i < 5; i++) { const x = dx + 40 + i * (dw - 80) / 4; const wg = c.createLinearGradient(0, dTop, 0, gy); wg.addColorStop(0, "rgba(150,210,255,.55)"); wg.addColorStop(1, "rgba(150,210,255,.1)"); c.fillStyle = wg; c.fillRect(x - 5, dTop, 10, gy - dTop);
    for (let k = 0; k < 4; k++) { const yy = dTop + ((t / 6 + k * 40 + i * 13) % (gy - dTop)); c.fillStyle = "rgba(220,240,255,.6)"; c.fillRect(x - 3, yy, 6, 10); } }
  // power house glow
  c.fillStyle = "#24324c"; c.fillRect(dx + dw * .3, gy - 34, dw * .4, 34);
  for (let i = 0; i < 4; i++) { c.fillStyle = `rgba(255,214,90,${.55 + .25 * Math.sin(t / 500 + i)})`; c.fillRect(dx + dw * .33 + i * dw * .09, gy - 24, dw * .05, 10); }
  // near hills
  c.fillStyle = "#0e1a31"; c.beginPath(); c.moveTo(0, gy); S.hills2.forEach(h => c.lineTo(h.x, gy - h.h)); c.lineTo(W, gy); c.fill();
  // power towers and lines with travelling sparks
  const towers = [W * .5, W * .68, W * .86, W * 1.04], ty = gy - 120;
  c.strokeStyle = "#5d7194"; c.lineWidth = 2;
  towers.forEach(x => { c.beginPath(); c.moveTo(x - 16, gy); c.lineTo(x, ty); c.lineTo(x + 16, gy); c.moveTo(x - 22, ty + 12); c.lineTo(x + 22, ty + 12); c.moveTo(x - 10, ty + 50); c.lineTo(x + 10, ty + 70); c.moveTo(x + 10, ty + 50); c.lineTo(x - 10, ty + 70); c.stroke(); });
  c.strokeStyle = "rgba(150,170,200,.6)"; c.lineWidth = 1.2;
  const from = [dx + dw * .7, gy - 34];
  const pts = [from].concat(towers.map(x => [x + 22, ty + 12]));
  c.beginPath(); pts.forEach((p, i) => { if (!i) c.moveTo(p[0], p[1]); else { const q = pts[i - 1]; c.quadraticCurveTo((p[0] + q[0]) / 2, Math.max(p[1], q[1]) + 22, p[0], p[1]); } }); c.stroke();
  for (let i = 1; i < pts.length; i++) { const q = pts[i - 1], p = pts[i]; for (let k = 0; k < 2; k++) { const u = ((t / 1400 + k / 2 + i * .17) % 1), mxp = (p[0] + q[0]) / 2, myp = Math.max(p[1], q[1]) + 22;
      const x = (1 - u) * (1 - u) * q[0] + 2 * (1 - u) * u * mxp + u * u * p[0], y = (1 - u) * (1 - u) * q[1] + 2 * (1 - u) * u * myp + u * u * p[1];
      c.fillStyle = "rgba(255,220,90,.9)"; c.beginPath(); c.arc(x, y, 2.4, 0, 6.28); c.fill(); } }
  // ground + rail line
  c.fillStyle = "#0a1326"; c.fillRect(0, gy, W, H - gy);
  c.strokeStyle = "rgba(160,170,190,.45)"; c.lineWidth = 2; c.beginPath(); c.moveTo(0, gy + 26); c.lineTo(W, gy + 26); c.stroke();
  // the little train with lit windows
  const tw = 300, tx = ((t / 18) % (W + tw * 2)) - tw;
  for (let k = 0; k < 4; k++) { const x = tx + k * 74; c.fillStyle = k === 0 ? "#8a3b2a" : "#b5651d"; c.fillRect(x, gy + 4, 68, 20); for (let j = 0; j < 3; j++) { c.fillStyle = `rgba(255,214,90,${.75 + .2 * Math.sin(t / 300 + j + k)})`; c.fillRect(x + 8 + j * 20, gy + 8, 12, 8); } c.fillStyle = "#111"; c.beginPath(); c.arc(x + 14, gy + 25, 4, 0, 6.28); c.arc(x + 54, gy + 25, 4, 0, 6.28); c.fill(); }
  c.fillStyle = "rgba(255,240,170,.5)"; c.beginPath(); c.moveTo(tx + 296, gy + 12); c.lineTo(tx + 380, gy - 4); c.lineTo(tx + 380, gy + 26); c.fill();
  // fireflies
  S.flies.forEach(f => { f.x += Math.sin(t / 1300 + f.p) * f.s; f.y += Math.cos(t / 1700 + f.p) * f.s * .6; if (f.x < 0) f.x = W; if (f.x > W) f.x = 0;
    const a = .35 + .65 * Math.max(0, Math.sin(t / 420 + f.p * 3)); c.fillStyle = `rgba(200,255,120,${a * .25})`; c.beginPath(); c.arc(f.x, f.y, 7, 0, 6.28); c.fill(); c.fillStyle = `rgba(230,255,160,${a})`; c.beginPath(); c.arc(f.x, f.y, 2, 0, 6.28); c.fill(); });
  c.fillStyle = "rgba(4,8,20,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Jugnu, the firefly electrician (yellow hard hat, glowing tail)
   ========================================================= */
GUIDES.k7s3_jugnu = () => `<svg class="guide jugnu" viewBox="0 0 120 130" aria-hidden="true">
  <defs><radialGradient id="k7s3tail"><stop offset="0" stop-color="#f6ff9a"/><stop offset=".5" stop-color="#c8f04a" stop-opacity=".7"/><stop offset="1" stop-color="#c8f04a" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="60" cy="124" rx="30" ry="4" fill="#000" opacity=".25"/>
  <circle cx="60" cy="98" r="30" fill="url(#k7s3tail)"><animate attributeName="opacity" values=".5;1;.5" dur="1.8s" repeatCount="indefinite"/></circle>
  <g><animateTransform attributeName="transform" type="rotate" values="0 52 66;-16 52 66;0 52 66" dur=".5s" repeatCount="indefinite"/>
    <ellipse cx="34" cy="56" rx="22" ry="12" fill="#cfe8ff" opacity=".55" transform="rotate(-25 34 56)"/></g>
  <g><animateTransform attributeName="transform" type="rotate" values="0 68 66;16 68 66;0 68 66" dur=".5s" repeatCount="indefinite"/>
    <ellipse cx="86" cy="56" rx="22" ry="12" fill="#cfe8ff" opacity=".55" transform="rotate(25 86 56)"/></g>
  <ellipse cx="60" cy="98" rx="17" ry="20" fill="#e8ff7a"/>
  <path d="M45 92 Q60 98 75 92 M45 102 Q60 108 75 102" stroke="#b6d33a" stroke-width="2" fill="none"/>
  <ellipse cx="60" cy="72" rx="18" ry="14" fill="#3b2a4a"/>
  <path d="M44 80 l-12 14 M76 80 l12 14 M48 84 l-6 18 M72 84 l6 18" stroke="#3b2a4a" stroke-width="3" stroke-linecap="round"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M50 30 Q42 14 36 12 M70 30 Q78 14 84 12" stroke="#3b2a4a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <circle cx="36" cy="12" r="3.5" fill="#f4a51c"/><circle cx="84" cy="12" r="3.5" fill="#f4a51c"/>
    <circle cx="60" cy="46" r="18" fill="#4a3560"/>
    <path d="M40 38 Q60 14 80 38 Z" fill="#f4c21c"/><rect x="38" y="36" width="44" height="5" rx="2.5" fill="#e0a812"/>
    <path d="M62 22 l-6 9 h5 l-4 8 l9 -11 h-5 l4 -6z" fill="#3b2a4a"/>
    <circle cx="52" cy="48" r="6" fill="#fff"/><circle cx="68" cy="48" r="6" fill="#fff"/>
    <circle cx="53" cy="49" r="3.2" fill="#15202a"/><circle cx="69" cy="49" r="3.2" fill="#15202a"/>
    <circle cx="54" cy="47.6" r="1.1" fill="#fff"/><circle cx="70" cy="47.6" r="1.1" fill="#fff"/>
    <path d="M53 57 Q60 62 67 57" stroke="#f6d6e6" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="46" cy="55" r="3" fill="#ff7aa2" opacity=".5"/><circle cx="74" cy="55" r="3" fill="#ff7aa2" opacity=".5"/></g>
</svg>`;

})();
