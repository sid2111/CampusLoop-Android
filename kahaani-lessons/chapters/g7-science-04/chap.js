(function(){
/* Grade 7 Science (Curiosity), Chapter 4 — The World of Metals and Non-metals
   Plugin: simulations (k7s4_*), the desert-forge scene, and Dhatu the brass Dhokra camel guide. */

/* ---------- private helpers ---------- */
const h4 = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const n4 = x => { const v = +x; return isFinite(v) ? v : 0; };
const f4 = x => (+x).toFixed(1);
function mix4(a, b, k) { // mix two #rrggbb colours
  k = clampN(k, 0, 1); const p = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const A = p(a), B = p(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, "0")).join("");
}
function chips4(names, sel, y) { // a row of name chips, the selected one in marigold
  const n = names.length, w = Math.min(68, 404 / n), x0 = 210 - n * w / 2; let s = "";
  names.forEach((nm, i) => { const on = i === sel;
    s += `<rect x="${f4(x0 + i * w + 1)}" y="${y}" width="${f4(w - 2)}" height="20" rx="6" fill="${on ? "var(--mari)" : "rgba(255,255,255,.06)"}" stroke="${on ? "var(--mari)" : "var(--line)"}"/>`;
    s += T(x0 + i * w + w / 2, y + 14, nm, { size: w < 50 ? 8.5 : 10, fill: on ? "#2a1a00" : "var(--muted)" }); });
  return s;
}

/* =========================================================
   1. k7s4_bench — property bench: hammer test (malleable / brittle), drop test (sonorous), wire test (ductile)
   params: mat (0 copper,1 aluminium,2 iron,3 coal,4 sulfur,5 wood), hits (blows / drops / pulls), test ("hammer"|"drop"|"wire")
   readouts: look, hard, res     parts: "obj", "hammer"
   ========================================================= */
const S4MAT = [
  { n: "Copper", c: "#b8612c", c2: "#f3a76d", k: "metal" },
  { n: "Aluminium", c: "#9aa6b2", c2: "#f1f5f9", k: "metal" },
  { n: "Iron", c: "#5d6874", c2: "#c6ced6", k: "metal" },
  { n: "Coal", c: "#1f1f23", c2: "#3b3b42", k: "brittle" },
  { n: "Sulfur", c: "#c9b120", c2: "#ecdf72", k: "brittle" },
  { n: "Wood", c: "#7d4f27", c2: "#b07a45", k: "wood" }
];
const S4TEST = { hammer: "Hammer test", drop: "Drop test: listen!", wire: "Wire-drawing test" };
function lump4(cx, cy, r, fill, seed) { let d = ""; for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283, rr = r * (0.75 + 0.25 * Math.abs(Math.sin(i * 2.3 + seed))); d += (i ? "L" : "M") + f4(cx + Math.cos(a) * rr) + " " + f4(cy + Math.sin(a) * rr * .8); } return `<path d="${d}Z" fill="${fill}" stroke="rgba(0,0,0,.35)"/>`; }
function res4(m, test, hP) {
  if (!hP) return test === "drop" ? "not dropped yet" : test === "wire" ? "not pulled yet" : "not hammered yet";
  if (test === "hammer") return m.k === "metal" ? "flattens into a sheet: MALLEABLE" : m.k === "brittle" ? "breaks into pieces: BRITTLE" : "neither flattens nor breaks";
  if (test === "drop") return m.k === "metal" ? "ringing sound: SONOROUS" : "dull thud: not sonorous";
  return m.k === "metal" ? "drawn into a thin wire: DUCTILE" : m.k === "brittle" ? "crumbles, no wire: not ductile" : "splinters, no wire: not ductile";
}
SIM_DEF.k7s4_bench = {
  def: { mat: 0, hits: 0, test: "hammer" },
  rng: { mat: () => [0, 5, 1], hits: () => [0, 5, 1] },
  lab: { mat: "Material (0 copper … 5 wood)", hits: "Blows / drops / pulls" },
  reads: { look: "Appearance", hard: "Hardness", res: "Result" },
  draw(D, P, sh, hl) {
    const mi = clampN(Math.round(n4(P.mat)), 0, 5), m = S4MAT[mi], test = S4TEST[P.test] ? P.test : "hammer";
    const hD = clampN(n4(D.hits), 0, 5), hP = clampN(Math.round(n4(P.hits)), 0, 5), met = m.k === "metal";
    let s = `<svg viewBox="0 0 420 250"><defs><linearGradient id="k7s4gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m.c2}"/><stop offset="1" stop-color="${m.c}"/></linearGradient></defs>`;
    s += T(210, 20, `${S4TEST[test]} — ${m.n}`, { size: 14, fill: "var(--muted)" });
    let label = "";
    if (test === "hammer") {
      s += `<path d="M150 170 H270 L256 184 H236 V204 H266 V214 H154 V204 H184 V184 H164 Z" fill="#3b4652" stroke="#6a7888"/>`;
      let top = 140;
      if (met) {
        const w = 56 + hD * 24, hh = Math.max(5, 28 - hD * 4.6), x = 210 - w / 2; top = 170 - hh;
        s += `<g${h4(hl, "obj")}><rect x="${f4(x)}" y="${f4(top)}" width="${f4(w)}" height="${f4(hh)}" rx="3" fill="url(#k7s4gb)" stroke="rgba(0,0,0,.3)"/><rect x="${f4(x + 6)}" y="${f4(top + 1.5)}" width="${f4(w - 12)}" height="${f4(Math.max(1.2, hh * .2))}" fill="#fff" opacity=".6"/></g>`;
        label = hP ? "flattens!" : "";
      } else if (m.k === "brittle") {
        if (hD < .35) { s += `<g${h4(hl, "obj")}>${lump4(210, 154, 20, m.c2, mi)}</g>`; top = 136; }
        else { const n = Math.min(12, 3 + Math.floor(hD * 2)), sp = Math.min(1, hD / 2 + .35); let g = "";
          for (let i = 0; i < n; i++) { const a = i * 2.4, d = (8 + (i % 4) * 13) * sp, px = clampN(210 + Math.cos(a) * d * 1.7, 120, 300), py = 165 - (i % 3) * 3; g += lump4(px, py, 4 + (i % 3) * 2, i % 2 ? m.c : m.c2, i); }
          s += `<g${h4(hl, "obj")}>${g}</g>`; top = 156; }
        label = hP ? "breaks!" : "";
      } else {
        const dent = Math.min(4, hD * 1.2); top = 140;
        s += `<g${h4(hl, "obj")}><rect x="173" y="140" width="74" height="30" rx="3" fill="url(#k7s4gb)" stroke="rgba(0,0,0,.35)"/><path d="M178 150 Q210 146 242 152 M178 160 Q210 164 242 158" stroke="#5a3519" fill="none"/><path d="M196 140 Q210 ${f4(140 + dent)} 224 140" stroke="#5a3519" stroke-width="1.5" fill="none"/></g>`;
        label = hP ? "no change" : "";
      }
      const ph = hD - Math.floor(hD), lift = Math.sin(Math.PI * ph), hitY = top - 26, upY = hitY - 62, hy = upY + 62 * lift;
      s += `<g${h4(hl, "hammer")}><line x1="236" y1="${f4(hy + 13)}" x2="340" y2="${f4(hy - 34)}" stroke="#a8743f" stroke-width="8" stroke-linecap="round"/><rect x="178" y="${f4(hy)}" width="62" height="26" rx="4" fill="#4a5560" stroke="#8796a6"/></g>`;
      if (lift > .9) s += `<path d="M150 ${f4(top - 4)} l-16 -8 M270 ${f4(top - 4)} l16 -8 M156 ${f4(top + 4)} l-18 2 M264 ${f4(top + 4)} l18 2" stroke="var(--mari)" stroke-width="3" stroke-linecap="round"/>`;
      s += T(370, 120, `blows: ${hP}`, { size: 13, fill: "var(--muted)" });
    } else if (test === "drop") {
      s += `<line x1="40" y1="200" x2="380" y2="200" stroke="var(--muted)" stroke-width="3"/>`;
      s += `<line x1="70" y1="50" x2="70" y2="200" stroke="var(--line)" stroke-dasharray="4 4"/>` + T(70, 44, "height", { size: 10, fill: "var(--muted)" });
      const f = hP ? clampN(hD, 0, 1) : 0, y = 52 + f * f * 136;
      let o = met ? `<ellipse cx="210" cy="${f4(y)}" rx="22" ry="6" fill="url(#k7s4gb)" stroke="rgba(0,0,0,.35)"/><ellipse cx="204" cy="${f4(y - 2)}" rx="9" ry="1.6" fill="#fff" opacity=".7"/>`
        : m.k === "brittle" ? lump4(210, y - 4, 13, m.c2, mi) : `<rect x="190" y="${f4(y - 10)}" width="40" height="18" rx="2" fill="url(#k7s4gb)"/>`;
      s += `<g${h4(hl, "obj")}>${o}</g>`;
      if (!hP) s += `<path d="M196 40 q14 -14 28 0" stroke="#c98d5f" stroke-width="8" fill="none" stroke-linecap="round"/>`;
      if (hP && hD > .97) {
        if (met) { for (let i = 0; i < 4; i++) s += `<circle cx="210" cy="194" r="12" fill="none" stroke="var(--mari)" stroke-width="2.5"><animate attributeName="r" values="12;84" dur="1.4s" begin="${i * .35}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".95;0" dur="1.4s" begin="${i * .35}s" repeatCount="indefinite"/></circle>`;
          label = "TING-ting-ting!"; }
        else { s += `<path d="M180 190 q30 -14 60 0" stroke="var(--muted)" stroke-width="2" fill="none"/>`; label = "thud."; }
      }
      s += T(370, 120, `drops: ${hP}`, { size: 13, fill: "var(--muted)" });
    } else {
      s += `<line x1="30" y1="200" x2="390" y2="200" stroke="var(--muted)" stroke-width="3"/>`;
      s += `<rect x="150" y="90" width="26" height="110" rx="3" fill="#3b4652" stroke="#6a7888"/><circle cx="163" cy="130" r="3" fill="#0f2436"/>` + T(163, 84, "draw plate", { size: 10, fill: "var(--muted)" });
      if (met) {
        const lw = Math.max(18, 56 - hD * 7), L = hD * 40;
        s += `<g${h4(hl, "obj")}><rect x="${f4(148 - lw)}" y="116" width="${f4(lw)}" height="28" rx="5" fill="url(#k7s4gb)"/>`;
        if (L > 1) s += `<line x1="176" y1="130" x2="${f4(176 + L)}" y2="130" stroke="${m.c2}" stroke-width="3"/><line x1="176" y1="129" x2="${f4(176 + L)}" y2="129" stroke="#fff" stroke-width=".8" opacity=".7"/><path d="M${f4(176 + L)} 124 l12 -6 M${f4(176 + L)} 136 l12 6" stroke="#8796a6" stroke-width="4" stroke-linecap="round"/>`;
        s += "</g>"; if (hP) label = "a long wire!";
      } else {
        s += `<g${h4(hl, "obj")}>${m.k === "brittle" ? lump4(118, 130, 18, m.c2, mi) : `<rect x="96" y="116" width="52" height="28" rx="2" fill="url(#k7s4gb)"/>`}`;
        if (hP) { const n = Math.min(14, Math.ceil(hD * 3)); for (let i = 0; i < n; i++) s += m.k === "brittle" ? lump4(110 + (i * 23) % 60, 196 - (i % 3) * 3, 3 + i % 3, m.c, i) : `<line x1="${105 + (i * 19) % 50}" y1="${196 - (i % 3) * 2}" x2="${117 + (i * 19) % 50}" y2="${193 - (i % 2) * 4}" stroke="${m.c2}" stroke-width="2"/>`; label = m.k === "brittle" ? "snaps and crumbles" : "only splinters"; }
        s += "</g>";
      }
      s += T(370, 60, `pulls: ${hP}`, { size: 13, fill: "var(--muted)" });
    }
    if (label && sh.has("res")) s += T(test === "wire" ? 300 : 80, test === "wire" ? 170 : 110, label, { size: 15, fill: met ? "var(--mari)" : "var(--sky)" });
    s += chips4(S4MAT.map(x => x.n), mi, 222) + "</svg>";
    return { svg: s, reads: { look: met ? "lustrous (metallic lustre)" : "non-lustrous (dull)", hard: met ? "hard" : "not as hard as metals", res: res4(m, test, hP) } };
  }
};

/* =========================================================
   2. k7s4_heat — conduction of heat: (mode "spoon") metal and wooden spoons in hot water;
      (mode "pan") a pan of a chosen material on a flame
   params: mode, t (minutes), mat (pan: 0 iron,1 copper,2 sulfur,3 coal,4 plastic,5 wood,6 cardboard)
   readouts: a, b, idea     parts: "metal", "wood", "pan", "water"
   ========================================================= */
const S4PAN = [
  { n: "Iron", c: "#6a7480", r: .75, f: "" }, { n: "Copper", c: "#c06a32", r: 1, f: "" },
  { n: "Sulfur", c: "#d9c22e", r: 0, f: "cracks and burns with a blue flame, giving a harmful gas" },
  { n: "Coal", c: "#2a2a2e", r: 0, f: "is brittle and catches fire" }, { n: "Plastic", c: "#5fb3d6", r: 0, f: "softens and melts" },
  { n: "Wood", c: "#8b5a2f", r: 0, f: "chars and burns" }, { n: "Cardboard", c: "#c9a46a", r: 0, f: "catches fire at once" }
];
const heatLvl4 = h => h > .6 ? "very hot" : h > .32 ? "hot" : h > .12 ? "warm" : "cool";
SIM_DEF.k7s4_heat = {
  def: { mode: "spoon", t: 0, mat: 1 },
  rng: { t: () => [0, 10, 1], mat: () => [0, 6, 1] },
  lab: { t: "Time (minutes)", mat: "Pan material (0 iron … 6 cardboard)" },
  reads: { a: "First", b: "Second", idea: "Big idea" },
  draw(D, P, sh, hl) {
    const tD = clampN(n4(D.t), 0, 10), tP = clampN(Math.round(n4(P.t)), 0, 10), fD = 1 - Math.exp(-tD / 2.5), fP = 1 - Math.exp(-tP / 2.5);
    let s = `<svg viewBox="0 0 420 250">`;
    if (P.mode !== "pan") {
      s += T(210, 18, `Hot water, both spoons dipped · ${tP} min`, { size: 13, fill: "var(--muted)" });
      s += `<path d="M126 92 L294 92 L278 222 L142 222 Z" fill="rgba(98,182,232,.08)" stroke="var(--sky)" stroke-width="2"/>`;
      s += `<path d="M131 128 L289 128 L278 220 L142 220 Z" fill="rgba(239,91,69,.35)"/>`;
      for (let i = 0; i < 3; i++) s += `<path d="M${180 + i * 30} 118 q-8 -12 0 -24 q8 -12 0 -24" stroke="#fff" stroke-opacity=".35" stroke-width="2.5" fill="none"><animateTransform attributeName="transform" type="translate" values="0 6;0 -10" dur="${2 + i * .4}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="${2 + i * .4}s" repeatCount="indefinite"/></path>`;
      const spoon = (x0, y0, x1, y1, base, k, part) => { // bowl end (x0,y0) under water, top (x1,y1)
        let g = `<g${h4(hl, part)}>`; const N = 16, wy = 128, uw = (y0 - wy) / (y0 - y1);
        for (let i = 0; i < N; i++) { const u0 = i / N, u1 = (i + 1) / N, um = (u0 + u1) / 2, d = Math.max(0, (um - uw) / (1 - uw));
          const h = um < uw ? 1 : clampN(fD * k - d, 0, 1);
          g += `<line x1="${f4(x0 + (x1 - x0) * u0)}" y1="${f4(y0 + (y1 - y0) * u0)}" x2="${f4(x0 + (x1 - x0) * u1)}" y2="${f4(y0 + (y1 - y0) * u1)}" stroke="${mix4(base, "#ff4a1c", h * .95)}" stroke-width="9" stroke-linecap="round"/>`; }
        return g + `<ellipse cx="${x0}" cy="${y0}" rx="13" ry="8" fill="${mix4(base, "#ff4a1c", .95)}"/></g>`;
      };
      s += spoon(178, 200, 112, 40, "#aab4be", 1.6, "metal") + spoon(244, 200, 308, 40, "#a8743f", .25, "wood");
      const topM = clampN(fP * 1.6 - 1, 0, 1), topW = clampN(fP * .25 - 1, 0, 1);
      s += T(88, 34, "metal spoon", { size: 12 }) + T(332, 34, "wooden spoon", { size: 12 });
      if (sh.has("a")) s += T(88, 58, `top: ${heatLvl4(topM)}`, { size: 13, fill: topM > .12 ? "var(--red)" : "var(--sky)" });
      if (sh.has("b")) s += T(332, 58, `top: ${heatLvl4(topW)}`, { size: 13, fill: topW > .12 ? "var(--red)" : "var(--sky)" });
      s += `<rect x="70" y="232" width="280" height="8" rx="4" fill="rgba(255,255,255,.08)"/><rect x="70" y="232" width="${f4(28 * tD)}" height="8" rx="4" fill="var(--mari)"/>` + T(60, 240, "0", { size: 10, a: "end", fill: "var(--muted)" }) + T(360, 240, "10 min", { size: 10, a: "start", fill: "var(--muted)" });
      s += "</svg>";
      return { svg: s, reads: { a: `metal spoon top feels ${heatLvl4(topM)}`, b: `wooden spoon top feels ${heatLvl4(topW)}`, idea: tP ? "heat travels along the metal: metals are good conductors of heat; wood is a poor conductor" : "start the timer to see where the heat goes" } };
    }
    const mi = clampN(Math.round(n4(P.mat)), 0, 6), m = S4PAN[mi], ok = m.r > 0;
    const wT = ok ? 1 - Math.exp(-tD * m.r / 2.2) : 0, wP = ok ? 1 - Math.exp(-tP * m.r / 2.2) : 0;
    s += T(210, 18, `A pan of ${m.n} on the flame · ${tP} min`, { size: 13, fill: "var(--muted)" });
    // stove + flame
    s += `<rect x="150" y="206" width="120" height="14" rx="4" fill="#3b4652"/>`;
    for (let i = 0; i < 5; i++) { const x = 172 + i * 19; s += `<path d="M${x} 206 q-7 -12 0 -24 q7 12 0 24" fill="${i % 2 ? "#ffb52e" : "#62b6e8"}" opacity=".9"><animateTransform attributeName="transform" type="scale" values="1 1;1 .82;1 1" dur="${.5 + i * .07}s" repeatCount="indefinite" additive="sum"/></path>`; }
    let pan;
    if (mi === 4 && tD > .5) { const sag = Math.min(1, tD / 4) * 18; pan = `<path d="M120 150 Q130 ${f4(180 + sag)} 210 ${f4(184 + sag)} Q290 ${f4(180 + sag)} 300 150" fill="${m.c}" stroke="rgba(0,0,0,.35)"/><path d="M200 ${f4(184 + sag)} q4 ${f4(sag)} 0 ${f4(sag + 6)}" stroke="${m.c}" stroke-width="5" stroke-linecap="round"/>`; }
    else pan = `<path d="M120 140 H300 L290 182 Q210 192 130 182 Z" fill="${m.c}" stroke="rgba(0,0,0,.35)"/><rect x="300" y="146" width="80" height="9" rx="4" fill="#5a3519"/>`;
    s += `<g${h4(hl, "pan")}>${pan}</g>`;
    if (mi === 2 || mi === 3) s += `<path d="M170 150 l12 18 l-6 12 M240 146 l-8 20 l10 14" stroke="#111" stroke-width="2" fill="none"/>`;
    if ((mi === 5 || mi === 6) && tD > .5) { const k = Math.min(1, tD / (mi === 6 ? 1.5 : 4)); s += `<ellipse cx="210" cy="184" rx="${f4(60 * k)}" ry="7" fill="#1a1008" opacity=".8"/>`; if (mi === 6 || tD > 4) for (let i = 0; i < 4; i++) s += `<path d="M${150 + i * 34} 150 q-8 -16 0 -32 q8 16 0 32" fill="#ff7a1c" opacity=".85"><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="${.4 + i * .1}s" repeatCount="indefinite"/></path>`; }
    if (mi === 2 && tD > .5) s += `<path d="M196 150 q-6 -12 0 -24 q6 12 0 24 M226 150 q-6 -12 0 -24 q6 12 0 24" fill="#5aa7ff" opacity=".85"/>`;
    if (ok) { s += `<path d="M126 148 H294" stroke="rgba(98,182,232,.9)" stroke-width="8"${h4(hl, "water")}/>`; const nb = Math.floor(wT * 9); for (let i = 0; i < nb; i++) s += `<circle cx="${140 + i * 17}" cy="142" r="3" fill="none" stroke="#fff" opacity=".8"><animate attributeName="cy" values="148;132" dur="${.6 + (i % 3) * .2}s" repeatCount="indefinite"/></circle>`; }
    // water-warmth bar
    s += `<rect x="40" y="60" width="16" height="120" rx="8" fill="rgba(255,255,255,.07)" stroke="var(--line)"/><rect x="40" y="${f4(180 - 120 * wT)}" width="16" height="${f4(120 * wT)}" rx="8" fill="var(--red)"/>` + T(48, 52, "water", { size: 10, fill: "var(--muted)" }) + T(48, 198, wP > .96 ? "boiling!" : wP > .5 ? "hot" : wP > .1 ? "warm" : "cold", { size: 11, fill: "var(--mari)" });
    s += chips4(S4PAN.map(x => x.n), mi, 226) + "</svg>";
    return { svg: s, reads: { a: `${m.n} pan: ${ok ? "metal, conducts heat well" : m.f}`, b: ok ? `water is ${wP > .96 ? "boiling" : wP > .5 ? "hot" : wP > .1 ? "warming" : "still cold"} after ${tP} min${mi === 1 ? " (copper conducts fastest)" : ""}` : "this pan cannot boil water", idea: ok ? "metals are good conductors of heat and can be beaten into shape" : "non-metals and materials like plastic, wood, cardboard are poor conductors and get damaged by the flame" } };
  }
};

/* =========================================================
   3. k7s4_tester — electric tester circuit: cell, bulb and a test object between two open ends
   params: mat (0..8, Table 4.2 objects)    readouts: obj, bulb, kind     parts: "bulb", "gap"
   ========================================================= */
const S4TST = [
  ["Aluminium foil", 1, "#d6dde4"], ["Iron nail", 1, "#7c8792"], ["Sulfur lump", 0, "#d9c22e"], ["Copper wire", 1, "#c8733a"],
  ["Coal", 0, "#2a2a2e"], ["Dry wood", 0, "#8b5a2f"], ["Stone", 0, "#8d8a80"], ["Rubber eraser", 0, "#e46b8c"], ["Nylon rope", 0, "#e8e2cf"]
];
SIM_DEF.k7s4_tester = {
  def: { mat: 0 },
  rng: { mat: () => [0, 8, 1] },
  lab: { mat: "Test object (0 … 8)" },
  reads: { obj: "Object", bulb: "Bulb", kind: "Conductor?" },
  draw(D, P, sh, hl) {
    const mi = clampN(Math.round(n4(P.mat)), 0, 8), [nm, cond, col] = S4TST[mi], settled = Math.abs(n4(D.mat) - mi) < .08, on = cond && settled && sh.has("bulb");
    let s = `<svg viewBox="0 0 420 240">`;
    s += T(210, 20, "Tester circuit", { size: 13, fill: "var(--muted)" });
    const wire = `M124 74 H290 V98 M310 98 V150 H286 M56 74 H36 V150 H134`;
    s += `<path d="${wire}" stroke="#d9a35b" stroke-width="4" fill="none" stroke-linejoin="round"/>`;
    if (on) s += `<path d="${wire}" stroke="#fff6c2" stroke-width="2.5" fill="none" stroke-dasharray="3 11"><animate attributeName="stroke-dashoffset" values="28;0" dur=".7s" repeatCount="indefinite"/></path>`;
    // cell
    s += `<rect x="56" y="60" width="64" height="28" rx="5" fill="#2f6d5a" stroke="#8fd3b8"/><rect x="120" y="68" width="6" height="12" rx="2" fill="#c8ccd2"/>` + T(70, 79, "−", { size: 14, fill: "#fff" }) + T(106, 79, "+", { size: 14, fill: "#fff" }) + T(88, 106, "cell", { size: 11, fill: "var(--muted)" });
    // bulb
    s += `<g${h4(hl, "bulb")}>`;
    if (on) s += `<circle cx="300" cy="64" r="40" fill="#ffe680" opacity=".25"><animate attributeName="r" values="34;44;34" dur="1.4s" repeatCount="indefinite"/></circle>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<line x1="${f4(300 + Math.cos(a) * 26)}" y1="${f4(62 + Math.sin(a) * 26)}" x2="${f4(300 + Math.cos(a) * 36)}" y2="${f4(62 + Math.sin(a) * 36)}" stroke="#ffe680" stroke-width="2.5" stroke-linecap="round"/>`; }).join("");
    s += `<circle cx="300" cy="62" r="20" fill="${on ? "#fff2a8" : "rgba(220,235,245,.18)"}" stroke="#dfe6f2" stroke-width="2"/><path d="M293 70 l4 -10 l3 6 l3 -6 l4 10" stroke="${on ? "#ff9d00" : "#8796a6"}" stroke-width="1.6" fill="none"/><rect x="290" y="80" width="20" height="18" rx="3" fill="#8796a6"/></g>`;
    // probes and object
    s += `<path d="M134 150 V168 M286 150 V168" stroke="#d9a35b" stroke-width="4"/><circle cx="134" cy="170" r="4" fill="#c8ccd2"/><circle cx="286" cy="170" r="4" fill="#c8ccd2"/>`;
    let ob;
    if (mi === 0) ob = `<rect x="126" y="166" width="168" height="10" rx="2" fill="${col}"/><path d="M134 168 l20 4 l20 -3 l24 4 l30 -4 l40 3" stroke="#fff" stroke-width="1" fill="none" opacity=".8"/>`;
    else if (mi === 1) ob = `<rect x="132" y="166" width="150" height="8" rx="3" fill="${col}"/><rect x="128" y="162" width="8" height="16" rx="2" fill="${col}"/><path d="M282 166 l12 4 l-12 4z" fill="${col}"/>`;
    else if (mi === 3) ob = `<path d="M126 171 C170 160 250 182 294 171" stroke="${col}" stroke-width="5" fill="none"/>`;
    else if (mi === 8) ob = `<path d="M126 171 C170 162 250 180 294 171" stroke="${col}" stroke-width="8" fill="none" stroke-dasharray="6 3"/>`;
    else if (mi === 5) ob = `<rect x="126" y="162" width="168" height="18" rx="2" fill="${col}"/><path d="M130 168 H290 M130 174 H290" stroke="#5a3519"/>`;
    else ob = `<rect x="126" y="160" width="168" height="22" rx="10" fill="${col}" stroke="rgba(0,0,0,.35)"/>`;
    s += `<g${h4(hl, "gap")}>${ob}</g>`;
    s += T(210, 204, nm, { size: 16, fill: "var(--ink)" });
    if (sh.has("bulb")) s += T(210, 228, settled ? (cond ? "the bulb GLOWS: good conductor" : "no glow: poor conductor") : "…", { size: 13, fill: cond ? "var(--mari)" : "var(--sky)" });
    s += "</svg>";
    return { svg: s, reads: { obj: nm, bulb: cond ? "glows" : "does not glow", kind: cond ? "good conductor of electricity (it is a metal)" : "poor conductor of electricity" } };
  }
};

/* =========================================================
   4. k7s4_rust — rusting bottles over the days
   params: day (0..10), set ("abc" Activity 4.5 | "q9" oil/water/vinegar | "coat" ways to prevent rust)
   readouts: obs, rule     parts: "c" (the bottle that rusts), "nail"
   ========================================================= */
const S4RUST = {
  abc: { b: [{ l: "A", w: 0, cap: 1, si: 1, r: 0, c: "dry air" }, { l: "B", w: 2, cap: 1, oil: 1, r: 0, c: "water, no air" }, { l: "C", w: 1, cap: 0, r: 1, c: "air + water" }],
    rule: "rust forms only when BOTH air and water touch the iron" },
  q9: { b: [{ l: "Oil", w: 1, liq: "#e8c547", cap: 0, r: 0, c: "in oil" }, { l: "Water", w: 1, cap: 0, r: 1, c: "in water" }, { l: "Vinegar", w: 1, liq: "#d9b8a0", cap: 0, r: 1.4, c: "in vinegar" }],
    rule: "the nail in oil does not rust: oil keeps air and moisture away" },
  coat: { b: [{ l: "Bare", w: 1, cap: 0, r: 1, c: "no coat" }, { l: "Painted", w: 1, cap: 0, r: 0, coat: "#c0392b", c: "paint" }, { l: "Greased", w: 1, cap: 0, r: 0, coat: "#3d3a2a", c: "grease" }, { l: "Zinc", w: 1, cap: 0, r: 0, coat: "#d5dde3", c: "zinc layer" }],
    rule: "painting, oiling, greasing or a zinc layer (galvanisation) keep moist air off" }
};
SIM_DEF.k7s4_rust = {
  def: { day: 0, set: "abc" },
  rng: { day: () => [0, 10, 1] },
  lab: { day: "Days passed" },
  reads: { obs: "Observation", rule: "Conclusion" },
  draw(D, P, sh, hl) {
    const S = S4RUST[P.set] || S4RUST.abc, n = S.b.length, dD = clampN(n4(D.day), 0, 10), dP = clampN(Math.round(n4(P.day)), 0, 10);
    const bw = n > 3 ? 82 : 100, gap = n > 3 ? 18 : 30, x0 = 210 - (n * bw + (n - 1) * gap) / 2;
    let s = `<svg viewBox="0 0 420 250">`;
    s += T(210, 18, `Day ${dP}`, { size: 15, fill: "var(--mari)" });
    S.b.forEach((b, i) => {
      const x = x0 + i * (bw + gap), cx = x + bw / 2, top = 56, bot = 200, rust = clampN(b.r * dD / 10, 0, 1);
      const part = b.r > 0 && P.set === "abc" ? "c" : "nail";
      s += `<g${b.r > 0 ? h4(hl, part) : ""}>`;
      s += `<path d="M${x + 12} ${top} H${x + bw - 12} V${top + 14} Q${x + bw} ${top + 22} ${x + bw} ${top + 40} V${bot} Q${x + bw} ${bot + 8} ${x + bw - 8} ${bot + 8} H${x + 8} Q${x} ${bot + 8} ${x} ${bot} V${top + 40} Q${x} ${top + 22} ${x + 12} ${top + 14} Z" fill="rgba(98,182,232,.08)" stroke="var(--sky)" stroke-width="2"/>`;
      if (b.w) { const wy = b.w === 2 ? top + 52 : 140; s += `<rect x="${x + 2}" y="${wy}" width="${bw - 4}" height="${bot + 6 - wy}" rx="6" fill="${b.liq || "#62b6e8"}" opacity=".45"/>`; if (b.oil) s += `<rect x="${x + 2}" y="${wy - 10}" width="${bw - 4}" height="11" fill="#e8c547" opacity=".8"/>` + T(cx, wy - 1, "oil", { size: 9, fill: "#2a1a00" }); }
      if (b.si) for (let j = 0; j < 14; j++) s += `<circle cx="${x + 10 + (j * 13) % (bw - 18)}" cy="${bot + 2 - Math.floor(j / 7) * 7}" r="3.4" fill="#e8f1ff" stroke="#9fb8d6"/>`;
      if (b.cap) s += `<rect x="${x + 8}" y="${top - 12}" width="${bw - 16}" height="14" rx="4" fill="#e04a86"/>`;
      s += `<line x1="${cx}" y1="${top - (b.cap ? 2 : 6)}" x2="${cx}" y2="86" stroke="#efdcae" stroke-width="1.5"/>`;
      // nail
      const nc = b.coat || "#9aa6b2";
      s += `<rect x="${cx - 9}" y="86" width="18" height="5" rx="2" fill="${nc}"/><rect x="${cx - 3.5}" y="90" width="7" height="88" fill="${nc}"/><path d="M${cx - 3.5} 178 L${cx} 190 L${cx + 3.5} 178Z" fill="${nc}"/>`;
      if (!b.coat) s += `<rect x="${cx - 2.5}" y="92" width="1.6" height="84" fill="#fff" opacity="${f4(.6 * (1 - rust))}"/>`;
      const ns = Math.floor(rust * 18);
      for (let j = 0; j < ns; j++) { const yy = b.w === 1 ? 118 + (j * 37) % 62 : 96 + (j * 41) % 80; s += `<circle cx="${f4(cx - 3 + (j * 7) % 7)}" cy="${yy}" r="${2.2 + (j % 3) * .9}" fill="#9a4a1c" opacity=".92"/>`; }
      s += "</g>";
      const hide = P.set === "coat" && !sh.has("rule"); s += T(cx, 226, hide ? "Nail " + (i + 1) : b.l, { size: 14, fill: "var(--ink)" }) + T(cx, 242, hide ? "?" : b.c, { size: 10, fill: "var(--muted)" });
    });
    s += "</svg>";
    const obs = S.b.map(b => `${b.l}: ${b.r * dP / 10 >= .2 ? "brown rust" : "no rust"}`).join(", ");
    return { svg: s, reads: { obs: dP ? obs : "fresh shiny nails on day 0", rule: S.rule } };
  }
};

/* =========================================================
   5. k7s4_burn — burn a metal (magnesium) or a non-metal (sulfur), dissolve the product, test with litmus
   params: el ("Mg"|"S"), stage (0 take, 1 burn, 2 product, 3 water + litmus)
   readouts: prod, nat, rule     parts: "flame", "litmus"
   ========================================================= */
SIM_DEF.k7s4_burn = {
  def: { el: "Mg", stage: 0 },
  rng: { stage: () => [0, 3, 1] },
  lab: { stage: "Experiment stage (0 … 3)" },
  reads: { prod: "Product", nat: "Nature", rule: "Rule" },
  draw(D, P, sh, hl) {
    const mg = P.el !== "S", st = clampN(Math.round(n4(D.stage)), 0, 3), sP = clampN(Math.round(n4(P.stage)), 0, 3);
    let s = `<svg viewBox="0 0 420 250">`;
    s += chips4(["0 Take", "1 Burn", "2 Product", "3 Litmus test"], st, 8);
    const lamp = `<path d="M70 236 h60 l-8 -34 h-44 z" fill="#3a6f8f" stroke="#62b6e8"/><rect x="96" y="194" width="8" height="10" fill="#cfd8dc"/>`;
    const flame = (x, y, k) => `<path d="M${x} ${y} q-${8 * k} -${14 * k} 0 -${28 * k} q${8 * k} ${14 * k} 0 ${28 * k}" fill="#ffb52e"><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur=".5s" repeatCount="indefinite"/></path>`;
    if (mg) {
      if (st <= 1) {
        s += lamp + flame(100, 194, 1);
        s += `<path d="M330 60 L190 150 M336 70 L196 158" stroke="#8796a6" stroke-width="4" stroke-linecap="round"/>` + T(340, 54, "tongs", { size: 11, fill: "var(--muted)" });
        s += `<path d="M192 152 L112 186" stroke="#cfd8dc" stroke-width="4" stroke-linecap="round"/>` + T(170, 196, "magnesium ribbon", { size: 11, fill: "var(--muted)" });
        if (st === 1) s += `<g${h4(hl, "flame")}><circle cx="114" cy="184" r="34" fill="#fff" opacity=".35"><animate attributeName="r" values="28;40;28" dur=".35s" repeatCount="indefinite"/></circle><circle cx="114" cy="184" r="15" fill="#fff"/></g>` + T(250, 110, "dazzling white flame!", { size: 14, fill: "#fff" });
      } else {
        s += `<path d="M120 170 Q210 214 300 170" fill="rgba(98,182,232,.15)" stroke="var(--sky)" stroke-width="2"/>` + T(210, 228, "watch glass", { size: 11, fill: "var(--muted)" });
        if (st === 2) { for (let i = 0; i < 26; i++) s += `<circle cx="${172 + (i * 29) % 76}" cy="${182 - (i % 4) * 3}" r="${2 + i % 3}" fill="#f4f6f8"/>`; if (sh.has("prod")) s += T(210, 140, "white powder: magnesium oxide", { size: 14 }); }
        else { s += `<path d="M150 180 Q210 204 270 180 Z" fill="rgba(240,240,240,.55)"/>`; }
      }
    } else {
      if (st === 0) { s += lamp + flame(100, 194, 1) + `<line x1="100" y1="160" x2="300" y2="80" stroke="#8796a6" stroke-width="4"/><path d="M84 160 q16 12 32 0 z" fill="#8796a6"/><ellipse cx="100" cy="160" rx="12" ry="3" fill="#ecdf72"/>` + T(250, 120, "sulfur in a deflagrating spoon", { size: 12, fill: "var(--muted)" }); }
      else {
        s += `<rect x="150" y="70" width="120" height="150" rx="8" fill="rgba(98,182,232,.06)" stroke="var(--sky)" stroke-width="2"/><rect x="142" y="60" width="136" height="10" rx="3" fill="#e04a86"/>`;
        if (st <= 2) s += `<rect x="152" y="72" width="116" height="146" rx="6" fill="#c9c3a2" opacity="${st === 2 ? .35 : .18}"/>`;
        if (st === 1) s += `<line x1="210" y1="60" x2="210" y2="160" stroke="#8796a6" stroke-width="4"/><g${h4(hl, "flame")}><path d="M210 166 q-12 -16 0 -32 q12 16 0 32" fill="#5aa7ff"><animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur=".5s" repeatCount="indefinite"/></path></g>` + T(340, 130, "blue flame", { size: 13, fill: "#8fc2ff" });
        if (st === 2) s += T(210, 150, sh.has("prod") ? "sulfur dioxide" : "? gas", { size: 14 }) + T(210, 168, "gas", { size: 12, fill: "var(--muted)" });
        if (st === 3) s += `<rect x="152" y="170" width="116" height="48" rx="6" fill="#62b6e8" opacity=".35"/>` + T(210, 160, "water added, shaken", { size: 11, fill: "var(--muted)" });
      }
    }
    if (st === 3) { // litmus strips: blue and red
      const rv = sh.has("nat"), blueEnd = rv && !mg ? "#d8384a" : "#3b6fd8", redEnd = rv && mg ? "#3b6fd8" : "#d8384a";
      s += `<g${h4(hl, "litmus")}><rect x="40" y="70" width="18" height="110" rx="3" fill="#3b6fd8"/><rect x="40" y="140" width="18" height="40" rx="3" fill="${blueEnd}"/><rect x="72" y="70" width="18" height="110" rx="3" fill="#d8384a"/><rect x="72" y="140" width="18" height="40" rx="3" fill="${redEnd}"/></g>` + T(49, 64, "blue", { size: 10, fill: "var(--muted)" }) + T(81, 64, "red", { size: 10, fill: "var(--muted)" });
      s += T(345, 110, rv ? (mg ? "red litmus → blue" : "blue litmus → red") : "litmus test: ?", { size: 14, fill: !rv ? "var(--ink)" : mg ? "var(--sky)" : "var(--rani)" });
      if (sh.has("nat")) s += T(345, 136, mg ? "BASIC" : "ACIDIC", { size: 20, fill: mg ? "var(--sky)" : "var(--rani)" });
    }
    s += "</svg>";
    const prod = mg ? (sP >= 2 ? "magnesium oxide (white powder)" : "burns to form magnesium oxide") : (sP >= 2 ? (sP === 3 ? "sulfur dioxide + water → sulfurous acid" : "sulfur dioxide gas") : "burns to form sulfur dioxide");
    return { svg: s, reads: { prod, nat: sP < 3 ? "test it with litmus at stage 3" : mg ? "basic: red litmus turns blue" : "acidic: blue litmus turns red", rule: mg ? "oxides of metals are generally basic" : "oxides of non-metals are acidic" } };
  }
};

/* =========================================================
   3D — k7s4_shelf3d: samples on a turntable; the picked one goes to the anvil and is beaten.
   params: pick (0 gold,1 silver,2 copper,3 aluminium,4 iron,5 coal,6 sulfur), beat (blows 0..3)
   readouts: name, kind, res     parts: "sample"
   ========================================================= */
const S43D = [
  { n: "Gold", c: 0xffc93a, m: 1 }, { n: "Silver", c: 0xe6ebf0, m: 1 }, { n: "Copper", c: 0xd27a43, m: 1 }, { n: "Aluminium", c: 0xc3ccd5, m: 1 },
  { n: "Iron", c: 0x8a949e, m: 1 }, { n: "Coal", c: 0x232327, m: 0 }, { n: "Sulfur", c: 0xe2c93a, m: 0 }
];
const lerp4 = (a, b, k) => a + (b - a) * k;
SIM_DEF.k7s4_shelf3d = {
  def: { pick: 0, beat: 0 },
  rng: { pick: () => [0, 6, 1], beat: () => [0, 3, 1] },
  lab: { pick: "Sample (0 gold … 6 sulfur)", beat: "Hammer blows" },
  reads: { name: "Sample", kind: "Type", res: "When beaten" },
  readouts(P) {
    const i = clampN(Math.round(n4(P.pick)), 0, 6), S = S43D[i], b = Math.round(n4(P.beat));
    return { name: S.n, kind: S.m ? "metal: shiny (metallic lustre)" : "non-metal: dull, non-lustrous", res: !b ? "not beaten yet" : S.m ? (i < 2 ? "spreads into a very thin sheet (gold and silver are the most malleable)" : "flattens into a sheet: malleable") : "shatters into pieces: brittle" };
  },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 7.4, phi: 1.05, theta: 0.15, auto: 0.08, target: [0, 0.7, 0.3], hint: "Drag to turn the metal shelf" });
    if (!g) return null;
    const { THREE, root } = g;
    const table = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.8, 0.3, 48), new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: .85 }));
    table.position.y = -0.15; root.add(table);
    const anvil = new THREE.Group(); root.add(anvil); anvil.position.set(0, 0, 1.4);
    const am = new THREE.MeshStandardMaterial({ color: 0x3b4652, metalness: .5, roughness: .5 });
    const a1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.35, 0.9), am); a1.position.y = 0.85; anvil.add(a1);
    const a2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.6), am); a2.position.y = 0.38; anvil.add(a2);
    const a3 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 0.9), am); a3.position.y = 0.06; anvil.add(a3);
    const lamp = new THREE.PointLight(0xffe2b0, 1.3, 14); root.add(lamp);
    const mats = S43D.map(S => new THREE.MeshStandardMaterial({ color: S.c, metalness: S.m ? .75 : 0, roughness: S.m ? .22 : .95, emissive: S.m ? S.c : 0x000000, emissiveIntensity: S.m ? .12 : 0 }));
    const geo = new THREE.BoxGeometry(0.7, 0.42, 0.5), rockG = new THREE.DodecahedronGeometry(0.34, 0);
    const items = S43D.map((S, i) => {
      const me = new THREE.Mesh(S.m ? geo : rockG, mats[i]); root.add(me);
      const a = Math.PI * (1.0 + i / 6), home = new THREE.Vector3(Math.cos(a) * 3.0, 0.3, Math.sin(a) * 2.4 + 0.4);
      me.position.copy(home); const tag = g.label(S.n, [home.x, -0.2, home.z + 0.45], "plain");
      return { me, home, tag, sc: new THREE.Vector3(1, 1, 1) };
    });
    const fragG = new THREE.TetrahedronGeometry(0.16, 0), frags = [];
    for (let i = 0; i < 10; i++) { const f = new THREE.Mesh(fragG, mats[5]); f.visible = false; root.add(f); const a = i / 10 * Math.PI * 2; frags.push({ f, dir: new THREE.Vector3(Math.cos(a), 0, Math.sin(a) * .6) }); }
    const hammer = new THREE.Group(); root.add(hammer);
    const hh = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.42, 0.42), new THREE.MeshStandardMaterial({ color: 0x4a5560, metalness: .6, roughness: .4 })); hammer.add(hh);
    const hd = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.9, 12), new THREE.MeshStandardMaterial({ color: 0xa8743f, roughness: .8 })); hd.position.set(0, 0.95, 0); hammer.add(hd);
    const lRes = g.label("", [0, 3.1, 1.4], "big");
    const st = { pick: 0, beatD: 0, beatP: 0, hl: null };
    g.onFrame((t, dt) => {
      const k = Math.min(1, dt * 6), S = S43D[st.pick];
      lamp.position.set(Math.cos(t * .7) * 4, 3.2, Math.sin(t * .7) * 4 + 1);
      items.forEach((it, i) => {
        const sel = i === st.pick, tgt = sel ? new THREE.Vector3(0, 1.03 + (S.m ? 0.21 : 0.3) * it.sc.y, 1.4) : it.home;
        it.me.position.lerp(tgt, k);
        const b = sel ? st.beatD : 0, want = S43D[i].m ? new THREE.Vector3(1 + b * .45, 1 / (1 + b * .9), 1 + b * .35) : new THREE.Vector3(1, 1, 1);
        it.sc.lerp(want, k); it.me.scale.copy(it.sc);
        it.me.visible = !(sel && !S43D[i].m && st.beatD > .3);
        if (!sel) it.me.rotation.y = t * .4 + i; else it.me.rotation.y = lerp4(it.me.rotation.y, 0, k);
        const pulse = sel && st.hl === "sample";
        mats[i].emissiveIntensity = pulse ? .4 + .3 * Math.sin(t * 8) : (S43D[i].m ? .12 : 0);
      });
      const brittle = !S.m, spread = brittle ? clampN(st.beatD, 0, 3) : 0;
      frags.forEach((F, j) => { F.f.material = mats[st.pick]; F.f.visible = brittle && spread > .3; F.f.position.set(F.dir.x * (.2 + spread * .35), 1.1 + (j % 3) * .05, 1.4 + F.dir.z * (.2 + spread * .3)); F.f.rotation.set(j, j * 2, 0); });
      const ph = st.beatD - Math.floor(st.beatD), lift = Math.sin(Math.PI * ph);
      hammer.position.set(0.15, 2.4 - 1.0 * lift, 1.4); hammer.rotation.z = 0.25 - 0.25 * lift;
    });
    function apply(D, P, sh, hl) {
      st.pick = clampN(Math.round(n4(P.pick)), 0, 6); st.beatD = clampN(n4(D.beat), 0, 3); st.hl = hl;
      const r = SIM_DEF.k7s4_shelf3d.readouts(P); lRes.set(!sh.has("name") ? "mystery sample ?" : sh.has("res") ? `${S43D[st.pick].n}: ${Math.round(n4(P.beat)) ? (S43D[st.pick].m ? "flattens" : "shatters") : "ready"}` : S43D[st.pick].n); void r;
      items.forEach((it, i) => it.tag.show(i !== st.pick));
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

/* =========================================================
   SCENE — a Rajasthani desert forge at dusk: dunes, a glowing furnace, an anvil throwing sparks
   ========================================================= */
let k4w = null;
function k4Init(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  k4w = { W, H, stars: Array.from({ length: Math.round(W * H / 9000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .4), r: rnd(.3, 1.4), p: rnd(0, 6.28) })),
    sparks: [], lastHit: 0, birds: Array.from({ length: 4 }, (_, i) => ({ x: rnd(0, W), y: rnd(H * .12, H * .3), s: rnd(.3, .6), p: i })) };
}
SCENES.k7s4_forge = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!k4w || k4w.W !== W || k4w.H !== H) k4Init(W, H);
  const S = k4w, gy = H * .74;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#160f33"); g.addColorStop(.5, "#5a2747"); g.addColorStop(.85, "#c8613f"); g.addColorStop(1, "#eb9a4e");
  c.fillStyle = g; c.fillRect(0, 0, W, gy);
  S.stars.forEach(s => { c.globalAlpha = .25 + .35 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // setting sun
  const sx = W * .22, sy = gy - H * .05, sr = Math.min(W, H) * .07;
  const sg = c.createRadialGradient(sx, sy, sr * .5, sx, sy, sr * 3); sg.addColorStop(0, "rgba(255,200,120,.45)"); sg.addColorStop(1, "rgba(255,200,120,0)"); c.fillStyle = sg; c.beginPath(); c.arc(sx, sy, sr * 3, 0, 6.28); c.fill();
  c.fillStyle = "#ffcf7a"; c.beginPath(); c.arc(sx, sy, sr, 0, 6.28); c.fill();
  // birds
  c.strokeStyle = "rgba(30,15,30,.7)"; c.lineWidth = 1.6;
  S.birds.forEach(b => { if (!RM) { b.x += b.s; if (b.x > W + 20) b.x = -20; } const f = Math.sin(t / 200 + b.p) * 4; c.beginPath(); c.moveTo(b.x - 8, b.y + f); c.quadraticCurveTo(b.x - 4, b.y - 3, b.x, b.y); c.quadraticCurveTo(b.x + 4, b.y - 3, b.x + 8, b.y + f); c.stroke(); });
  // dunes
  [["#7a3b2e", .0, 30, 0.004], ["#5a2a26", .05, 22, 0.006], ["#3a1c1e", .1, 16, 0.009]].forEach(([col, off, amp, fr], j) => {
    c.fillStyle = col; c.beginPath(); c.moveTo(0, H);
    for (let x = 0; x <= W; x += 10) c.lineTo(x, gy - 30 + j * 22 + off * H - amp * Math.sin(x * fr + j * 2) - amp * .5 * Math.sin(x * fr * 2.3 + j));
    c.lineTo(W, H); c.fill(); });
  c.fillStyle = "#26130f"; c.fillRect(0, gy + 40, W, H - gy - 40);
  // furnace (bhatti)
  const fx = W * .74, fy = gy + 40, fw = Math.min(150, W * .16);
  c.fillStyle = "#4a2418"; c.beginPath(); c.moveTo(fx - fw / 2, fy); c.quadraticCurveTo(fx - fw / 2, fy - fw * .9, fx, fy - fw * .95); c.quadraticCurveTo(fx + fw / 2, fy - fw * .9, fx + fw / 2, fy); c.fill();
  const fl = .75 + .25 * Math.sin(t / 90) * Math.sin(t / 230);
  const fg = c.createRadialGradient(fx, fy - fw * .25, 2, fx, fy - fw * .25, fw * .9); fg.addColorStop(0, `rgba(255,220,120,${.95 * fl})`); fg.addColorStop(.35, `rgba(255,120,30,${.55 * fl})`); fg.addColorStop(1, "rgba(255,80,20,0)");
  c.fillStyle = fg; c.beginPath(); c.arc(fx, fy - fw * .25, fw * .9, 0, 6.28); c.fill();
  c.fillStyle = `rgba(255,${150 + 60 * fl | 0},60,1)`; c.beginPath(); c.ellipse(fx, fy - fw * .22, fw * .2, fw * .16, 0, 0, 6.28); c.fill();
  // anvil + iron bar
  const ax = W * .58, ay = fy - 6;
  c.fillStyle = "#2c3238"; c.fillRect(ax - 34, ay - 30, 68, 12); c.fillRect(ax - 12, ay - 18, 24, 18); c.fillRect(ax - 26, ay - 4, 52, 6);
  c.fillStyle = `rgba(255,${120 + 80 * fl | 0},40,1)`; c.fillRect(ax - 22, ay - 35, 44, 5);
  // hammer swing + sparks every 1.3 s
  const cyc = (t % 1300) / 1300, lift = Math.max(0, Math.sin(cyc * Math.PI * 2));
  c.save(); c.translate(ax + 60, ay - 40); c.rotate(-.9 + .9 * (1 - lift)); c.fillStyle = "#a8743f"; c.fillRect(-60, -4, 60, 7); c.fillStyle = "#4a5560"; c.fillRect(-72, -12, 16, 24); c.restore();
  if (!RM && cyc > .48 && cyc < .55 && t - S.lastHit > 800) { S.lastHit = t; for (let i = 0; i < 26; i++) S.sparks.push({ x: ax, y: ay - 36, vx: (Math.random() - .5) * 6, vy: -Math.random() * 5 - 1, l: 1 }); }
  S.sparks.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .2; p.l -= .025; c.fillStyle = `rgba(255,${180 + Math.random() * 60 | 0},80,${Math.max(0, p.l)})`; c.fillRect(p.x, p.y, 2.2, 2.2); });
  S.sparks = S.sparks.filter(p => p.l > 0).slice(-200);
  // tools hanging on a rack: tawa, chimta, khurpi
  const rx = W * .88; c.strokeStyle = "#1a0d0a"; c.lineWidth = 4; c.beginPath(); c.moveTo(rx - 40, fy - 100); c.lineTo(rx + 50, fy - 100); c.moveTo(rx - 36, fy - 100); c.lineTo(rx - 36, fy); c.moveTo(rx + 46, fy - 100); c.lineTo(rx + 46, fy); c.stroke();
  c.fillStyle = "#1a0d0a"; c.beginPath(); c.arc(rx - 12, fy - 76, 14, 0, 6.28); c.fill(); c.fillRect(rx + 12, fy - 98, 3, 44); c.fillRect(rx + 20, fy - 98, 3, 44); c.beginPath(); c.moveTo(rx + 32, fy - 98); c.lineTo(rx + 42, fy - 60); c.lineTo(rx + 28, fy - 60); c.fill();
  // smoke from furnace
  for (let i = 0; i < 5; i++) { const k = ((t / 4000 + i / 5) % 1); c.fillStyle = `rgba(200,180,170,${.18 * (1 - k)})`; c.beginPath(); c.arc(fx + Math.sin(k * 6 + i) * 14, fy - fw * .95 - k * H * .3, 10 + k * 30, 0, 6.28); c.fill(); }
  c.fillStyle = "rgba(10,6,20,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Dhatu, a brass Dhokra camel with a ringing bell
   ========================================================= */
GUIDES.k7s4_camel = () => `<svg class="guide camel" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="125" rx="36" ry="4" fill="#000" opacity=".25"/>
  <g stroke="#7a4a12" stroke-width="1.2">
    <rect x="30" y="80" width="8" height="42" rx="4" fill="#c98a2c"/><rect x="44" y="82" width="8" height="40" rx="4" fill="#b67a22"/>
    <rect x="70" y="82" width="8" height="40" rx="4" fill="#b67a22"/><rect x="82" y="80" width="8" height="42" rx="4" fill="#c98a2c"/>
  </g>
  <g><animateTransform attributeName="transform" type="rotate" values="0 94 70;14 94 70;0 94 70" dur="1.8s" repeatCount="indefinite"/>
    <path d="M94 70 Q104 78 102 92" stroke="#b67a22" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="102" cy="93" r="3" fill="#7a4a12"/></g>
  <ellipse cx="60" cy="74" rx="36" ry="17" fill="#d99a35" stroke="#7a4a12" stroke-width="1.5"/>
  <path d="M40 62 Q54 34 70 60" fill="#e0a640" stroke="#7a4a12" stroke-width="1.5"/>
  <path d="M30 72 q6 -5 12 0 q6 5 12 0 q6 -5 12 0 q6 5 12 0 q6 -5 12 0" stroke="#7a4a12" stroke-width="1.3" fill="none"/>
  <circle cx="44" cy="80" r="3" fill="none" stroke="#7a4a12"/><circle cx="60" cy="82" r="3" fill="none" stroke="#7a4a12"/><circle cx="76" cy="80" r="3" fill="none" stroke="#7a4a12"/>
  <path d="M46 56 Q55 50 64 56" stroke="#e04a86" stroke-width="3" fill="none"/><path d="M48 60 Q55 55 62 60" stroke="#35c29a" stroke-width="2.5" fill="none"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M26 72 Q16 52 22 34" stroke="#d99a35" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M26 72 Q16 52 22 34" stroke="#7a4a12" stroke-width="1" fill="none" stroke-dasharray="2 3"/>
    <ellipse cx="22" cy="28" rx="14" ry="9" fill="#e0a640" stroke="#7a4a12" stroke-width="1.5"/>
    <ellipse cx="10" cy="31" rx="5" ry="4" fill="#c98a2c"/><circle cx="8" cy="30" r="1" fill="#5a2f08"/>
    <path d="M28 20 l3 -6 l3 6" fill="#c98a2c" stroke="#7a4a12"/>
    <circle cx="24" cy="25" r="3.2" fill="#15202a"/><circle cx="25" cy="24" r="1" fill="#fff"/>
    <rect x="20" y="21" width="8" height="0" fill="#e0a640"><animate attributeName="height" values="0;0;0;8;0" keyTimes="0;.82;.9;.95;1" dur="4s" repeatCount="indefinite"/></rect>
    <path d="M12 35 Q17 38 22 35" stroke="#5a2f08" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="31" r="2.6" fill="#ff7aa2" opacity=".5"/>
  </g>
  <g><animateTransform attributeName="transform" type="rotate" values="-12 24 62;12 24 62;-12 24 62" dur="1.2s" repeatCount="indefinite"/>
    <line x1="24" y1="62" x2="24" y2="68" stroke="#7a4a12" stroke-width="1.5"/>
    <path d="M18 76 Q18 66 24 66 Q30 66 30 76 Z" fill="#f4c542" stroke="#7a4a12" stroke-width="1.2"/><circle cx="24" cy="78" r="2" fill="#7a4a12"/></g>
</svg>`;

})();
