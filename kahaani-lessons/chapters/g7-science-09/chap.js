(function(){
/* Grade 7 Science (Curiosity) Chapter 9 — Life Processes in Animals
   Plugin: simulations (k7s9_*), the Shareerpur Express scene, and Bholu the elephant conductor guide. */

/* ---------- private helpers ---------- */
const s9hl = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const s9n = x => { const v = +x; return isFinite(v) ? v : 0; };
const s9lerp = (a, b, k) => a + (b - a) * k;
// wrap a sentence into lines of at most n characters
function s9wrap(s, n) { const out = []; let line = ""; String(s).split(" ").forEach(w => { if ((line + " " + w).trim().length > n && line) { out.push(line); line = w; } else line = (line + " " + w).trim(); }); if (line) out.push(line); return out; }
function s9lines(x, y, s, n, o) { return s9wrap(s, n).map((l, i) => T(x, y + i * (o.lh || 15), l, o)).join(""); }
function s9mix(c1, c2, k) { k = clampN(k, 0, 1); const p = c => c.charAt(0) === "#" ? [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)) : c.slice(4, -1).split(",").map(Number); const a = p(c1), b = p(c2); return "rgb(" + a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(",") + ")"; }
const s9title = (P, def) => T(210, 18, P.lx ? svgFr(P.lx) : def, { size: 12.5, fill: "var(--muted)" });

/* =========================================================
   1. k7s9_canal — the alimentary canal; a food ball travels station by station
   params: pos (0 mouth … 6 anus), lx   readouts: where, job
   parts: mouth, pipe, stomach, liver, pancreas, small, large, rectum, anus
   ========================================================= */
const S9ST = [
  { n: "Mouth", p: "mouth", x: 110, y: 52, job: "Teeth crush and chew food (mechanical digestion). Saliva moistens it and breaks starch into sugar." },
  { n: "Food pipe (oesophagus)", p: "pipe", x: 113, y: 84, job: "Its walls contract and relax in a wave-like motion that pushes food down to the stomach." },
  { n: "Stomach", p: "stomach", x: 136, y: 115, job: "Walls churn the food. Digestive juice breaks down proteins, acid kills bacteria, mucus protects the lining." },
  { n: "Small intestine", p: "small", x: 114, y: 180, job: "Bile (liver), pancreatic juice and intestinal juice finish digestion. Nutrients are absorbed into the blood." },
  { n: "Large intestine", p: "large", x: 112, y: 150, job: "Absorbs water and some salts from undigested food, making semi-solid waste called stool." },
  { n: "Rectum", p: "rectum", x: 113, y: 224, job: "The lower part of the large intestine stores the stool until the body is ready." },
  { n: "Anus", p: "anus", x: 113, y: 240, job: "The stool is expelled. This is called egestion." }
];
SIM_DEF.k7s9_canal = {
  def: { pos: 0, lx: "" },
  rng: { pos: () => [0, 6, 1] },
  lab: { pos: "Move the food along" },
  reads: { where: "Food is in the", job: "What happens here" },
  draw(D, P, sh, hl) {
    const d = clampN(s9n(D.pos), 0, 6), a = Math.floor(d), b = Math.min(6, a + 1), f = d - a;
    const A = S9ST[a], B = S9ST[b], fx0 = s9lerp(A.x, B.x, f), fy0 = s9lerp(A.y, B.y, f);
    const k = Math.round(clampN(s9n(P.pos), 0, 6)), S = S9ST[k], on = p => (S.p === p || hl === p);
    const glow = p => on(p) ? ' stroke="var(--mari)" stroke-width="3"' : '';
    let s = `<svg viewBox="0 0 420 252">`;
    // body outline
    s += `<circle cx="110" cy="38" r="28" fill="rgba(239,220,174,.10)" stroke="var(--line)" stroke-width="2"/>`;
    s += `<path d="M96 64 L96 74 Q52 78 50 104 L50 238 Q50 248 60 248 L160 248 Q170 248 170 238 L170 104 Q168 78 124 74 L124 64" fill="rgba(239,220,174,.08)" stroke="var(--line)" stroke-width="2"/>`;
    // mouth
    s += `<path d="M98 50 Q110 60 122 50" fill="${on("mouth") ? "var(--rani)" : "#c4566f"}" stroke="#7a2a3a" stroke-width="1.5"${s9hl(hl, "mouth")}/>`;
    // food pipe
    s += `<path d="M110 56 L112 100 Q116 106 124 108" fill="none" stroke="${on("pipe") ? "var(--mari)" : "#d98d74"}" stroke-width="7" stroke-linecap="round"${s9hl(hl, "pipe")}/>`;
    // liver + pancreas
    s += `<path d="M60 96 Q90 86 124 94 Q118 112 92 118 Q66 122 60 110Z" fill="#8c3b2e"${glow("liver")}${s9hl(hl, "liver")}/>`;
    s += `<ellipse cx="136" cy="138" rx="18" ry="5" fill="#e9b45a"${glow("pancreas")}${s9hl(hl, "pancreas")}/>`;
    // stomach
    s += `<path d="M122 104 Q136 96 152 104 Q162 120 146 132 Q130 138 124 126 Q130 120 122 112Z" fill="${on("stomach") ? "var(--mari)" : "#e0866f"}" stroke="#7a3a2a" stroke-width="1.5"${s9hl(hl, "stomach")}/>`;
    // large intestine frame + rectum
    s += `<path d="M84 206 L82 150 Q82 145 88 145 L142 145 Q148 145 148 151 L148 204 Q148 212 136 212 L116 212 L114 232" fill="none" stroke="${on("large") ? "var(--mari)" : "#b5835a"}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"${s9hl(hl, "large")}/>`;
    s += `<path d="M115 214 L114 233" stroke="${on("rectum") ? "var(--mari)" : "#9a6a46"}" stroke-width="11" stroke-linecap="round"${s9hl(hl, "rectum")}/>`;
    s += `<circle cx="114" cy="241" r="4" fill="${on("anus") ? "var(--mari)" : "#6a4630"}"${s9hl(hl, "anus")}/>`;
    // small intestine coils
    let c = "M138 140 Q140 150 128 156"; for (let r = 0; r < 4; r++) { const y = 160 + r * 11; c += r % 2 ? ` Q86 ${y} 96 ${y + 6} L128 ${y + 6}` : ` L96 ${y} Q134 ${y + 3} 128 ${y + 6}`; } c += " Q90 210 86 204";
    s += `<path d="${c}" fill="none" stroke="${on("small") ? "var(--mari)" : "#f0b49a"}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"${s9hl(hl, "small")}/>`;
    // juices from liver and pancreas when food is in the small intestine
    if (k === 3) s += `<path d="M96 118 Q100 140 104 156" stroke="#7bc46a" stroke-width="2.5" stroke-dasharray="4 3" fill="none"><animate attributeName="stroke-dashoffset" values="14;0" dur=".8s" repeatCount="indefinite"/></path><path d="M130 142 Q124 150 120 158" stroke="#ffd36b" stroke-width="2.5" stroke-dasharray="4 3" fill="none"><animate attributeName="stroke-dashoffset" values="14;0" dur=".8s" repeatCount="indefinite"/></path>`;
    // food ball
    s += `<circle cx="${fx0.toFixed(1)}" cy="${fy0.toFixed(1)}" r="7" fill="#ffe08a" stroke="#8a5a1a" stroke-width="2"><animate attributeName="r" values="6;7.5;6" dur="1.2s" repeatCount="indefinite"/></circle>`;
    // side labels
    s += T(32, 104, "Liver", { size: 10.5, fill: "var(--muted)", a: "middle" }) + T(186, 160, "Pancreas", { size: 10, fill: "var(--muted)", a: "middle" });
    // station card
    s += `<rect x="214" y="30" width="200" height="170" rx="12" fill="rgba(10,20,34,.6)" stroke="var(--line)"/>`;
    s += T(314, 52, `Station ${k + 1} of 7`, { size: 11, fill: "var(--muted)" });
    s += T(314, 76, sh.has("where") ? S.n : "?", { size: 15.5, fill: "var(--mari)" });
    s += sh.has("job") ? s9lines(314, 100, S.job, 31, { size: 11.5, lh: 16, w: 600 }) : T(314, 120, "What happens here? ?", { size: 12, fill: "var(--muted)" });
    // progress dots
    S9ST.forEach((q, i) => { s += `<circle cx="${232 + i * 27}" cy="222" r="7" fill="${i <= k ? "var(--teal)" : "rgba(255,255,255,.1)"}" stroke="var(--line)"/>`; });
    s += T(314, 244, "Mouth → … → Anus", { size: 10.5, fill: "var(--muted)" });
    s += s9title(P, "The journey of food: the alimentary canal");
    s += "</svg>";
    return { svg: s, reads: { where: S.n, job: S.job } };
  }
};

/* =========================================================
   2. k7s9_iodine — the iodine (starch) test in 2 or 3 test tubes
   params: sa, sb, sc (starch left 0–1, sc<0 = no third tube), chew (seconds, ≥0 overrides sb), iod (0/1 drops added), la, lb, lc
   readouts: result, why    parts: A, B, C, dropper
   ========================================================= */
function s9starch(P) { return [s9n(P.sa), s9n(P.chew) >= 0 ? clampN(1 - s9n(P.chew) / 60 * 0.92, 0, 1) : s9n(P.sb), s9n(P.sc)]; }
const s9col = s => s > 0.6 ? "blue-black" : s > 0.25 ? "light blue-black" : "no blue-black (stays brownish-yellow)";
SIM_DEF.k7s9_iodine = {
  def: { sa: 1, sb: 1, sc: -1, chew: -1, iod: 0, la: "A: Boiled rice", lb: "B: Chewed boiled rice", lc: "C", lx: "" },
  rng: { chew: () => [0, 60, 10], iod: () => [0, 1, 1] },
  lab: { chew: "Chewing time (seconds)", iod: "Add iodine drops" },
  reads: { result: "After iodine", why: "Reason" },
  draw(D, P, sh, hl) {
    const st = s9starch(P), n = st[2] >= 0 ? 3 : 2, io = clampN(s9n(D.iod), 0, 1), labs = [P.la, P.lb, P.lc], parts = ["A", "B", "C"];
    let s = `<svg viewBox="0 0 420 250">`;
    s += s9title(P, "Iodine turns blue-black when starch is present");
    for (let i = 0; i < n; i++) {
      const cx = 210 + (i - (n - 1) / 2) * (n === 3 ? 130 : 160), top = 52, h = 120;
      const col = io < 0.05 ? "#e9e4d4" : s9mix("#e9e4d4", s9mix("#c98a2a", "#1b2150", st[i]), io);
      s += `<g${s9hl(hl, parts[i])}>`;
      s += `<path d="M${cx - 18} ${top} L${cx - 18} ${top + h} Q${cx - 18} ${top + h + 18} ${cx} ${top + h + 18} Q${cx + 18} ${top + h + 18} ${cx + 18} ${top + h} L${cx + 18} ${top}" fill="rgba(255,255,255,.06)" stroke="var(--ink)" stroke-width="2"/>`;
      s += `<path d="M${cx - 16} ${top + 50} L${cx - 16} ${top + h} Q${cx - 16} ${top + h + 16} ${cx} ${top + h + 16} Q${cx + 16} ${top + h + 16} ${cx + 16} ${top + h} L${cx + 16} ${top + 50}Z" fill="${col}"/>`;
      // rice grains / pieces
      const lumps = i === 1 && s9n(P.chew) >= 0 ? Math.max(1, 6 - Math.round(s9n(P.chew) / 12)) : 5;
      for (let j = 0; j < lumps; j++) s += `<ellipse cx="${cx - 9 + (j % 3) * 9}" cy="${top + h + 6 - Math.floor(j / 3) * 9}" rx="${i === 1 && s9n(P.chew) > 0 ? 2.5 : 4}" ry="2.4" fill="rgba(255,255,255,.55)"/>`;
      s += `</g>`;
      // dropper
      if (io > 0.02 && io < 0.98) s += `<g${s9hl(hl, "dropper")}><rect x="${cx - 4}" y="${top - 34}" width="8" height="26" rx="3" fill="#c98a2a"/><circle cx="${cx}" cy="${top - 6 + io * 52}" r="3.5" fill="#c98a2a"/></g>`;
      else if (io < 0.02) s += `<rect x="${cx - 4}" y="${top - 34}" width="8" height="22" rx="3" fill="#c98a2a" opacity=".55"${s9hl(hl, "dropper")}/>`;
      s += s9lines(cx, top + h + 38, labs[i], n === 3 ? 17 : 22, { size: 11.5, lh: 14 });
      if (sh.has("result") && io > 0.98) s += T(cx, 246, st[i] > 0.6 ? "blue-black" : st[i] > 0.25 ? "light" : "no change", { size: 11, fill: st[i] > 0.25 ? "var(--sky)" : "var(--mari)" });
    }
    if (s9n(P.chew) >= 0) s += T(210, 40, `Chewed for ${Math.round(s9n(P.chew))} s`, { size: 11, fill: "var(--teal)" });
    s += "</svg>";
    const res = [], why = [];
    for (let i = 0; i < n; i++) { res.push(`${parts[i]}: ${s9n(P.iod) >= 1 ? s9col(st[i]) : "not tested yet"}`); }
    why.push(st.slice(0, n).map((x, i) => `${parts[i]} ${x > 0.6 ? "has starch" : x > 0.25 ? "has a little starch" : "has almost no starch left"}`).join("; "));
    return { svg: s, reads: { result: res.join(" · "), why: why[0] + (s9n(P.chew) >= 0 ? ". Saliva breaks starch into sugar, so longer chewing leaves less starch." : ".") } };
  }
};

/* =========================================================
   3. k7s9_villi — inner lining of the small intestine: bile breaks fat into droplets, villi absorb nutrients
   params: v (number of finger-like projections 0–10), bile (0–1), lx    readouts: area, fat
   parts: villi, blood, fat
   ========================================================= */
SIM_DEF.k7s9_villi = {
  def: { v: 0, bile: 0, lx: "" },
  rng: { v: () => [0, 10, 1], bile: () => [0, 1, 0.25] },
  lab: { v: "Finger-like projections", bile: "Bile added" },
  reads: { area: "Absorbing surface", fat: "Fat" },
  draw(D, P, sh, hl) {
    const v = Math.round(clampN(s9n(D.v), 0, 10)), bl = clampN(s9n(D.bile), 0, 1), x0 = 30, x1 = 390, base = 168, vh = 56;
    let s = `<svg viewBox="0 0 420 250">`;
    s += s9title(P, "Inside the small intestine (magnified)");
    s += `<rect x="${x0}" y="30" width="${x1 - x0}" height="${base - 30}" rx="10" fill="rgba(239,220,174,.07)"/>`;
    // fat droplets
    const nd = 1 + Math.round(bl * 13), r = 20 / Math.sqrt(nd);
    let g = `<g${s9hl(hl, "fat")}>`;
    for (let i = 0; i < nd; i++) { const cx = 80 + (i % 5) * 18 + (nd === 1 ? 20 : 0), cy = 66 + Math.floor(i / 5) * 18 + (nd === 1 ? 6 : 0); g += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="#ffd36b" fill-opacity=".85" stroke="#b8862a"/>`; }
    s += g + `</g>` + (!sh.has("fat") ? "" : T(110, 128, nd === 1 ? "one big fat drop" : `${nd} tiny fat droplets`, { size: 11, fill: "var(--mari)" }));
    // the wall path with villi
    let w = `M${x0} ${base}`; const gap = (x1 - x0) / (v + 1);
    for (let i = 1; i <= v; i++) { const cx = x0 + gap * i; w += ` L${(cx - 9).toFixed(1)} ${base} L${(cx - 9).toFixed(1)} ${base - vh + 9} Q${cx.toFixed(1)} ${base - vh - 6} ${(cx + 9).toFixed(1)} ${base - vh + 9} L${(cx + 9).toFixed(1)} ${base}`; }
    w += ` L${x1} ${base} L${x1} ${base + 22} L${x0} ${base + 22}Z`;
    s += `<path d="${w}" fill="#e88f7c" stroke="#a3483a" stroke-width="2"${s9hl(hl, "villi")}/>`;
    // blood vessel
    s += `<rect x="${x0}" y="${base + 24}" width="${x1 - x0}" height="20" rx="10" fill="#b8323a"${s9hl(hl, "blood")}/>`;
    s += `<path d="M${x0 + 10} ${base + 34} L${x1 - 10} ${base + 34}" stroke="#ff9b9b" stroke-width="3" stroke-dasharray="6 10"><animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/></path>`;
    s += T(x0 + 8, base + 62, "Blood carries nutrients to the whole body", { size: 11, fill: "var(--muted)", a: "start" });
    // nutrient dots falling into the wall: more surface → more dots
    const surf = (x1 - x0) + v * 2 * (vh - 6), ratio = surf / (x1 - x0), nn = Math.round(3 + ratio * 4);
    for (let i = 0; i < nn; i++) { const x = 180 + ((i * 47) % 200), dur = (1.4 + (i % 4) * .3).toFixed(1); s += `<circle cx="${x}" cy="60" r="3.2" fill="var(--teal)"><animate attributeName="cy" values="50;${base + 32}" dur="${dur}s" begin="${(i * .23).toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" dur="${dur}s" begin="${(i * .23).toFixed(2)}s" repeatCount="indefinite"/></circle>`; }
    s += T(290, 46, "digested nutrients", { size: 11, fill: "var(--teal)" });
    // meter
    if (sh.has("area")) s += `<rect x="236" y="${base + 52}" width="150" height="10" rx="5" fill="rgba(255,255,255,.08)"/><rect x="236" y="${base + 52}" width="${(150 * Math.min(1, ratio / 4.2)).toFixed(1)}" height="10" rx="5" fill="var(--teal)"/>`;
    s += "</svg>";
    return { svg: s, reads: { area: `${ratio.toFixed(1)} × the flat lining (${v} projection${v === 1 ? "" : "s"})`, fat: nd === 1 ? "one big drop: hard to digest" : `${nd} tiny droplets: easier to digest` } };
  }
};

/* =========================================================
   4. k7s9_lungs — mechanism of breathing (chest view or the bottle–balloon model)
   params: b (0 exhaled … 1 fully inhaled), model (0 chest, 1 bottle model), lx    readouts: phase, chest
   parts: nostrils, windpipe, lungs, ribs, diaphragm, alveoli
   ========================================================= */
SIM_DEF.k7s9_lungs = {
  def: { b: 0, model: 0, lx: "" },
  rng: { b: () => [0, 1, 0.25] },
  lab: { b: "Pull diaphragm down" },
  reads: { phase: "Now", chest: "Inside the chest" },
  draw(D, P, sh, hl) {
    const b = clampN(s9n(D.b), 0, 1), M = s9n(P.model) >= 1;
    let s = `<svg viewBox="0 0 420 250">`;
    s += s9title(P, M ? "A bottle model of breathing" : "Mechanism of breathing");
    const arrow = (x, y, up, col) => `<path d="M${x} ${y} l0 ${up ? -22 : 22} m-6 ${up ? 8 : -8} l6 ${up ? -8 : 8} l6 ${up ? 8 : -8}" stroke="${col}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (!M) {
      const cx = 150, sp = 1 + 0.12 * b;
      // nose and windpipe
      s += `<path d="M${cx - 8} 32 Q${cx} 22 ${cx + 8} 32 L${cx + 10} 44 L${cx - 10} 44Z" fill="#d9a577"${s9hl(hl, "nostrils")}/><circle cx="${cx - 4}" cy="41" r="2" fill="#5a3a20"/><circle cx="${cx + 4}" cy="41" r="2" fill="#5a3a20"/>`;
      s += `<path d="M${cx} 46 L${cx} 92 M${cx} 92 L${cx - 22} 108 M${cx} 92 L${cx + 22} 108" stroke="#d6e4ee" stroke-width="7" stroke-linecap="round"${s9hl(hl, "windpipe")}/>`;
      // lungs
      const lw = 42 * (1 + 0.22 * b), lh = 60 * (1 + 0.14 * b);
      s += `<g${s9hl(hl, "lungs")}><ellipse cx="${cx - 34 * sp}" cy="${136 + 6 * b}" rx="${lw.toFixed(1)}" ry="${lh.toFixed(1)}" fill="#e98a9e" fill-opacity=".9"/><ellipse cx="${cx + 34 * sp}" cy="${136 + 6 * b}" rx="${lw.toFixed(1)}" ry="${lh.toFixed(1)}" fill="#e98a9e" fill-opacity=".9"/></g>`;
      s += `<path d="M${cx} 100 L${cx - 30} 120 M${cx - 18} 112 L${cx - 22} 140 M${cx} 100 L${cx + 30} 120 M${cx + 18} 112 L${cx + 22} 140" stroke="#b5566a" stroke-width="2.5" fill="none"/>`;
      // ribs
      let rb = ""; for (let i = 0; i < 5; i++) { const y = 96 + i * 22 - b * (6 - i); const w = (78 + i * 6) * sp; rb += `M${cx - 6} ${y} Q${cx - w} ${y - 4} ${cx - w + 4} ${y + 26} M${cx + 6} ${y} Q${cx + w} ${y - 4} ${cx + w - 4} ${y + 26} `; }
      s += `<path d="${rb}" stroke="#efe6d2" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85"${s9hl(hl, "ribs")}/>`;
      // diaphragm
      const dy = 202 + 16 * b, dome = 26 * (1 - 0.7 * b);
      s += `<path d="M${cx - 98 * sp} ${dy + 6} Q${cx} ${dy - dome * 2} ${cx + 98 * sp} ${dy + 6}" stroke="var(--rani)" stroke-width="6" fill="none" stroke-linecap="round"${s9hl(hl, "diaphragm")}/>`;
      if (sh.has("chest")) s += T(cx, Math.min(246, dy + 26), b >= .5 ? "Diaphragm moves down" : "Diaphragm moves up (dome)", { size: 11, fill: "var(--rani)" });
      // alveoli inset
      s += `<g${s9hl(hl, "alveoli")}><circle cx="352" cy="82" r="44" fill="rgba(10,20,34,.6)" stroke="var(--line)"/>`;
      [[-14, -10], [8, -16], [16, 6], [-6, 12], [-20, 12], [4, -2]].forEach(([x, y]) => { s += `<circle cx="${352 + x * (1 + .2 * b)}" cy="${86 + y * (1 + .2 * b)}" r="${(9 + 3 * b).toFixed(1)}" fill="#f2a3b3" stroke="#b5566a"/>`; });
      s += `<path d="M352 38 L352 64" stroke="#b5566a" stroke-width="3"/></g>` + T(352, 142, "Alveoli: tiny air sacs", { size: 10.5, fill: "var(--muted)" });
      if (sh.has("phase")) s += arrow(cx + 40, 46, b < .5, b >= .5 ? "var(--teal)" : "var(--mari)") + T(cx + 52, 40, b >= .5 ? "air drawn in" : "air forced out", { size: 11, fill: b >= .5 ? "var(--teal)" : "var(--mari)", a: "start" });
      if (!sh.has("chest")) s += T(352, 182, "Ribs? Chest space?", { size: 11, fill: "var(--muted)" });
      else if (b >= .5) s += T(352, 176, "Ribs: up and outwards", { size: 11, fill: "var(--ink)" }) + T(352, 194, "Chest space: bigger", { size: 11, fill: "var(--teal)" });
      else s += T(352, 176, "Ribs: down and inwards", { size: 11, fill: "var(--ink)" }) + T(352, 194, "Chest space: smaller", { size: 11, fill: "var(--mari)" });
    } else {
      const cx = 200;
      s += `<path d="M${cx - 70} 66 L${cx - 70} 200 L${cx + 70} 200 L${cx + 70} 66 Q${cx + 70} 50 ${cx + 30} 44 L${cx + 14} 40 L${cx - 14} 40 L${cx - 30} 44 Q${cx - 70} 50 ${cx - 70} 66Z" fill="rgba(160,210,255,.10)" stroke="#a9d3f0" stroke-width="2.5"/>`;
      s += `<rect x="${cx - 16}" y="30" width="32" height="12" rx="3" fill="#5c7d99"/>`;
      s += `<path d="M${cx} 14 L${cx} 92 M${cx} 92 L${cx - 28} 116 M${cx} 92 L${cx + 28} 116" stroke="#d6e4ee" stroke-width="7" stroke-linecap="round"${s9hl(hl, "windpipe")}/>`;
      const r = 10 + 22 * b;
      s += `<g${s9hl(hl, "lungs")}><ellipse cx="${cx - 32}" cy="${118 + r * .8}" rx="${r.toFixed(1)}" ry="${(r * 1.15).toFixed(1)}" fill="#e98a9e"/><ellipse cx="${cx + 32}" cy="${118 + r * .8}" rx="${r.toFixed(1)}" ry="${(r * 1.15).toFixed(1)}" fill="#e98a9e"/></g>`;
      const sag = 30 * b;
      s += `<path d="M${cx - 70} 200 Q${cx} ${200 + sag * 2} ${cx + 70} 200" stroke="var(--rani)" stroke-width="5" fill="rgba(224,74,134,.2)"${s9hl(hl, "diaphragm")}/>`;
      s += `<path d="M${cx} ${200 + sag} L${cx} ${214 + sag}" stroke="var(--ink)" stroke-width="3"/><circle cx="${cx}" cy="${218 + sag}" r="5" fill="var(--mari)"/>`;
      const r2 = sh.has("chest");
      s += T(cx + 120, 110, "Balloons", { size: 12, fill: "#e98a9e" }) + T(cx + 120, 126, r2 ? "= lungs" : "= ?", { size: 12 });
      s += T(cx + 120, 196, "Rubber sheet", { size: 12, fill: "var(--rani)" }) + T(cx + 120, 212, r2 ? "= diaphragm" : "= ?", { size: 12 });
      s += T(cx - 130, 110, "Y-tube", { size: 12, fill: "#d6e4ee" }) + T(cx - 130, 126, r2 ? "= windpipe" : "= ?", { size: 12 });
      s += arrow(cx + 26, 30, b < .5, b >= .5 ? "var(--teal)" : "var(--mari)");
      if (sh.has("phase")) s += T(cx - 130, 196, b >= .5 ? "Sheet pulled down:" : "Sheet released up:", { size: 11, fill: "var(--muted)" }) + T(cx - 130, 212, b >= .5 ? "balloons inflate" : "balloons deflate", { size: 11, fill: b >= .5 ? "var(--teal)" : "var(--mari)" });
    }
    s += "</svg>";
    const ph = b >= .75 ? "Inhalation (breathing in)" : b <= .25 ? "Exhalation (breathing out)" : "In between: changing";
    const ch = M ? (s9n(P.b) >= .5 ? "Space in the bottle increases, air rushes into the balloons" : "Space in the bottle decreases, air is pushed out of the balloons")
      : (s9n(P.b) >= .5 ? "Ribs move up and out, diaphragm moves down: more space, air enters the lungs" : "Ribs move down and in, diaphragm moves up: less space, air is pushed out");
    return { svg: s, reads: { phase: ph, chest: ch } };
  }
};

/* =========================================================
   5. k7s9_gas — what we breathe out: lime water test + composition of inhaled/exhaled air, or gas exchange in an alveolus
   params: blows (0–10 breaths blown into tube B), view ("lime" | "alv"), lx    readouts: lime, air
   parts: A, B, bars, alveolus, blood
   ========================================================= */
SIM_DEF.k7s9_gas = {
  def: { blows: 0, view: "lime", lx: "" },
  rng: { blows: () => [0, 10, 1] },
  lab: { blows: "Breaths blown into B" },
  reads: { lime: "Lime water", air: "Air" },
  draw(D, P, sh, hl) {
    const bw = clampN(s9n(D.blows), 0, 10), milk = Math.min(1, bw / 6);
    let s = `<svg viewBox="0 0 420 250">`;
    s += s9title(P, P.view === "alv" ? "Gas exchange in an alveolus" : "Inhaled air vs exhaled air");
    if (P.view === "alv") {
      s += `<g${s9hl(hl, "alveolus")}><circle cx="120" cy="128" r="70" fill="rgba(242,163,179,.25)" stroke="#f2a3b3" stroke-width="4"/></g>`;
      s += `<path d="M40 214 Q120 236 200 204 Q236 150 196 76" fill="none" stroke="#b8323a" stroke-width="14" stroke-linecap="round"${s9hl(hl, "blood")}/>`;
      s += T(120, 120, "Alveolus", { size: 13, fill: "#f2a3b3" }) + T(120, 138, "(air sac)", { size: 11, fill: "var(--muted)" });
      // oxygen: alveolus → blood ; CO2: blood → alveolus (SMIL)
      for (let i = 0; i < 5; i++) { const y0 = 92 + i * 16, b = (i * .35).toFixed(2); s += `<circle r="5" fill="var(--sky)"><animate attributeName="cx" values="130;${206 + (i % 2) * 6}" dur="2s" begin="${b}s" repeatCount="indefinite"/><animate attributeName="cy" values="${y0};${y0 + 14}" dur="2s" begin="${b}s" repeatCount="indefinite"/></circle>`; }
      for (let i = 0; i < 4; i++) { const y0 = 100 + i * 20, b = (i * .45 + .2).toFixed(2); s += `<circle r="5" fill="#bdbdbd"><animate attributeName="cx" values="${212};120" dur="2.2s" begin="${b}s" repeatCount="indefinite"/><animate attributeName="cy" values="${y0 + 10};${y0}" dur="2.2s" begin="${b}s" repeatCount="indefinite"/></circle>`; }
      const r3 = sh.has("air");
      s += `<circle cx="248" cy="58" r="6" fill="var(--sky)"/>` + T(260, 62, r3 ? "Oxygen: air sac → blood" : "Blue gas: ?", { size: 11.5, a: "start" });
      s += `<circle cx="248" cy="82" r="6" fill="#bdbdbd"/>` + T(260, 86, r3 ? "Carbon dioxide: blood → air sac" : "Grey gas: ?", { size: 11.5, a: "start" });
      s += s9lines(320, 130, "Thin walls of the alveoli are surrounded by fine tubes with blood.", 26, { size: 11, lh: 15, fill: "var(--muted)" });
      s += s9lines(320, 190, "Blood then carries oxygen to all parts of the body.", 26, { size: 11, lh: 15, fill: "var(--teal)" });
    } else {
      // tubes
      const tube = (cx, lbl, sub, k, part) => `<g${s9hl(hl, part)}><path d="M${cx - 18} 60 L${cx - 18} 170 Q${cx - 18} 188 ${cx} 188 Q${cx + 18} 188 ${cx + 18} 170 L${cx + 18} 60" fill="rgba(255,255,255,.05)" stroke="var(--ink)" stroke-width="2"/><path d="M${cx - 16} 110 L${cx - 16} 170 Q${cx - 16} 186 ${cx} 186 Q${cx + 16} 186 ${cx + 16} 170 L${cx + 16} 110Z" fill="${s9mix("#bfe3f5", "#f4f1ea", k)}" fill-opacity="${(.45 + .5 * k).toFixed(2)}"/><path d="M${cx + 4} 40 L${cx + 4} 176" stroke="#d9c7a0" stroke-width="4"/></g>` + T(cx, 206, lbl, { size: 12 }) + T(cx, 222, sub, { size: 10.5, fill: "var(--muted)" });
      s += tube(60, "A", "air we inhale", 0, "A") + tube(150, "B", "air we exhale", milk, "B");
      s += `<ellipse cx="60" cy="34" rx="16" ry="9" fill="#5c7d99"/>` + T(60, 30, "pichkari", { size: 9.5, fill: "var(--ink)" });
      if (bw > 0) for (let i = 0; i < 4; i++) s += `<circle cx="${150 + (i % 2 ? 5 : -3)}" r="3" fill="rgba(255,255,255,.7)"><animate attributeName="cy" values="176;112" dur="${(1 + i * .2).toFixed(1)}s" begin="${(i * .3).toFixed(1)}s" repeatCount="indefinite"/></circle>`;
      s += T(105, 244, bw ? `B: ${Math.round(bw)} breath${bw >= 1.5 ? "s" : ""} blown` : "B: no breaths yet", { size: 11, fill: "var(--teal)" });
    }
    // composition bars (both views)
    if (P.view !== "alv") {
      const r4 = sh.has("air"), bx = 230, by = 200, sc = 6.4, bar = (x, v, col, lbl, part) => `<rect x="${x}" y="${(by - v * sc).toFixed(1)}" width="26" height="${Math.max(1.5, v * sc).toFixed(1)}" rx="3" fill="${col}"${s9hl(hl, part)}/>` + T(x + 13, by - v * sc - 5, r4 ? lbl : "?", { size: 10.5 });
      s += `<g${s9hl(hl, "bars")}>`;
      s += bar(bx, 21, "var(--sky)", "21%", "o2in") + bar(bx + 30, 0.04, "#bdbdbd", "0.04%", "co2in");
      s += bar(bx + 92, 16.5, "var(--sky)", "16–17%", "o2out") + bar(bx + 122, 4.5, "#bdbdbd", "4–5%", "co2out");
      s += `</g><path d="M${bx - 6} ${by} L${bx + 156} ${by}" stroke="var(--line)" stroke-width="2"/>`;
      s += T(bx + 28, by + 18, "Inhaled", { size: 11.5 }) + T(bx + 120, by + 18, "Exhaled", { size: 11.5 });
      s += `<rect x="${bx}" y="${by + 30}" width="10" height="10" fill="var(--sky)"/>` + T(bx + 14, by + 39, "oxygen", { size: 10.5, a: "start" }) + `<rect x="${bx + 74}" y="${by + 30}" width="10" height="10" fill="#bdbdbd"/>` + T(bx + 88, by + 39, "carbon dioxide", { size: 10.5, a: "start" });
    }
    s += "</svg>";
    const nb = Math.round(s9n(P.blows));
    return { svg: s, reads: { lime: P.view === "alv" ? "(not used here)" : `A stays clear; B ${nb === 0 ? "is still clear" : nb < 4 ? "is turning slightly cloudy" : "turns milky: exhaled air has more carbon dioxide"}`, air: "Inhaled: about 21% oxygen, 0.04% carbon dioxide. Exhaled: about 16–17% oxygen, 4–5% carbon dioxide" } };
  }
};

/* =========================================================
   SCENE — Shareerpur Express: a toy train winds past station boards under a dusk sky
   ========================================================= */
let s9w = null;
function s9wInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  s9w = { W, H, stars: Array.from({ length: Math.round(W * H / 7000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .55), r: rnd(.4, 1.6), p: rnd(0, 6.28) })),
    hills: Array.from({ length: 10 }, (_, i) => ({ x: i * W / 9, h: rnd(40, 110) })), bub: Array.from({ length: 22 }, () => ({ x: rnd(0, W), y: rnd(0, H), r: rnd(3, 9), s: rnd(.2, .6), p: rnd(0, 6.28) })), puffs: [] };
}
SCENES.k7s9_express = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!s9w || s9w.W !== W || s9w.H !== H) s9wInit(W, H);
  const S = s9w, gy = H * .8;
  let g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, "#1a0f2e"); g.addColorStop(.55, "#3a1d3f"); g.addColorStop(1, "#7a3b3a");
  c.fillStyle = g; c.fillRect(0, 0, W, gy);
  S.stars.forEach(s => { c.globalAlpha = .3 + .4 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // setting sun
  const sx = W * .78, sy = gy - 30, sr = Math.min(W, H) * .09; const sg = c.createRadialGradient(sx, sy, sr * .5, sx, sy, sr * 3); sg.addColorStop(0, "rgba(255,180,90,.45)"); sg.addColorStop(1, "rgba(255,180,90,0)"); c.fillStyle = sg; c.beginPath(); c.arc(sx, sy, sr * 3, 0, 6.28); c.fill();
  c.fillStyle = "#ffb35a"; c.beginPath(); c.arc(sx, sy, sr, 0, 6.28); c.fill();
  // oxygen bubbles drifting up
  S.bub.forEach(b => { if (!RM) { b.y -= b.s; b.x += Math.sin(t / 1500 + b.p) * .3; if (b.y < -20) { b.y = H + 10; b.x = Math.random() * W; } } c.strokeStyle = "rgba(98,182,232,.28)"; c.lineWidth = 1.5; c.beginPath(); c.arc(b.x, b.y, b.r, 0, 6.28); c.stroke(); });
  // hills
  c.fillStyle = "#2a1630"; c.beginPath(); c.moveTo(0, gy); S.hills.forEach((h, i) => c.quadraticCurveTo(h.x - W / 18, gy - h.h - 20, h.x, gy - h.h * .6)); c.lineTo(W, gy); c.fill();
  // ground + track
  c.fillStyle = "#1c1020"; c.fillRect(0, gy, W, H - gy);
  c.strokeStyle = "#8a6a50"; c.lineWidth = 2; c.beginPath(); c.moveTo(0, gy + 18); c.lineTo(W, gy + 18); c.moveTo(0, gy + 26); c.lineTo(W, gy + 26); c.stroke();
  c.fillStyle = "#5a3f30"; for (let x = 0; x < W; x += 22) c.fillRect(x, gy + 15, 4, 14);
  // station boards
  ["MUKH JN", "AMASHAYA", "AANT NAGAR", "PHEPHDA HILL"].forEach((n, i) => { const x = W * (.12 + i * .25); c.fillStyle = "#4a3a2a"; c.fillRect(x - 2, gy - 34, 4, 34); c.fillStyle = "#f4a51c"; c.fillRect(x - 42, gy - 58, 84, 24); c.fillStyle = "#1d160a"; c.font = "bold 12px sans-serif"; c.textAlign = "center"; c.fillText(n, x, gy - 41); c.textAlign = "start"; });
  // the train
  const L = W + 420, tx = ((t / 14) % L) - 300, ty = gy + 6;
  const cars = ["#e04a86", "#35c29a", "#62b6e8"];
  cars.forEach((col, i) => { const x = tx - i * 78; c.fillStyle = col; c.fillRect(x, ty - 28, 68, 26); c.fillStyle = "rgba(255,240,200,.85)"; for (let w = 0; w < 3; w++) c.fillRect(x + 8 + w * 20, ty - 22, 12, 10); c.fillStyle = "#222"; c.beginPath(); c.arc(x + 14, ty + 2, 6, 0, 6.28); c.arc(x + 54, ty + 2, 6, 0, 6.28); c.fill(); });
  c.fillStyle = "#f4a51c"; c.fillRect(tx + 72, ty - 34, 60, 32); c.fillStyle = "#b8323a"; c.fillRect(tx + 112, ty - 50, 14, 18); c.fillStyle = "#222"; c.beginPath(); c.arc(tx + 86, ty + 2, 7, 0, 6.28); c.arc(tx + 118, ty + 2, 7, 0, 6.28); c.fill();
  c.fillStyle = "rgba(255,240,200,.95)"; c.beginPath(); c.arc(tx + 134, ty - 18, 4, 0, 6.28); c.fill();
  if (!RM && Math.random() < .3) S.puffs.push({ x: tx + 119, y: ty - 52, r: 5, a: .35 });
  S.puffs.forEach(p => { p.x -= .6; p.y -= .5; p.r += .3; p.a -= .004; c.fillStyle = `rgba(230,220,230,${Math.max(0, p.a)})`; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.28); c.fill(); });
  S.puffs = S.puffs.filter(p => p.a > 0).slice(-80);
  c.fillStyle = "rgba(10,6,20,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Bholu, the baby elephant train conductor
   ========================================================= */
GUIDES.k7s9_bholu = () => `<svg class="guide elephant" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="125" rx="34" ry="4" fill="#000" opacity=".25"/>
  <rect x="36" y="100" width="14" height="22" rx="6" fill="#8d97a6"/><rect x="70" y="100" width="14" height="22" rx="6" fill="#8d97a6"/>
  <ellipse cx="60" cy="94" rx="32" ry="22" fill="#9aa4b3"/>
  <path d="M44 84 L76 84 L72 108 L48 108Z" fill="#2f6d5a"/><circle cx="60" cy="92" r="3" fill="#f4a51c"/><circle cx="60" cy="101" r="3" fill="#f4a51c"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 22 52;-8 22 52;0 22 52" dur="3s" repeatCount="indefinite"/><ellipse cx="22" cy="54" rx="18" ry="22" fill="#b3bcc9"/><ellipse cx="24" cy="54" rx="11" ry="15" fill="#e9a9b6"/></g>
  <g><animateTransform attributeName="transform" type="rotate" values="0 98 52;8 98 52;0 98 52" dur="3s" repeatCount="indefinite"/><ellipse cx="98" cy="54" rx="18" ry="22" fill="#b3bcc9"/><ellipse cx="96" cy="54" rx="11" ry="15" fill="#e9a9b6"/></g>
  <circle cx="60" cy="52" r="26" fill="#a9b3c1"/>
  <g><animateTransform attributeName="transform" type="rotate" values="0 60 66;14 60 66;0 60 66;-6 60 66;0 60 66" dur="2.6s" repeatCount="indefinite"/>
    <path d="M54 62 Q52 86 62 96 Q70 100 72 92 Q64 88 64 62Z" fill="#a9b3c1"/><circle cx="70" cy="94" r="2" fill="#7c8695"/></g>
  <path d="M46 66 Q42 74 46 78 M74 66 Q78 74 74 78" stroke="#f6f2e8" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="50" cy="48" r="4" fill="#15202a"/><circle cx="70" cy="48" r="4" fill="#15202a"/><circle cx="51.3" cy="46.6" r="1.3" fill="#fff"/><circle cx="71.3" cy="46.6" r="1.3" fill="#fff"/>
  <rect x="44" y="42" width="32" height="0" fill="#a9b3c1"><animate attributeName="height" values="0;0;0;11;0" keyTimes="0;.8;.9;.95;1" dur="4.2s" repeatCount="indefinite"/></rect>
  <circle cx="42" cy="58" r="3.5" fill="#ff7aa2" opacity=".5"/><circle cx="78" cy="58" r="3.5" fill="#ff7aa2" opacity=".5"/>
  <path d="M38 32 Q60 18 82 32 L80 38 L40 38Z" fill="#2f6d5a"/><rect x="34" y="36" width="52" height="6" rx="3" fill="#24574a"/><circle cx="60" cy="30" r="4" fill="#f4a51c"/>
</svg>`;

/* =========================================================================================
   3D — k7s9_body3d: a turnable see-through body with the digestive tract, lungs, heart and blood loop.
   params: sys ("all" | "dig" | "resp" | "circ"), pos (0–6 food station), rate (breaths per minute), lx
   readouts: sys, food, rate     parts: none (systems light up through sys)
   ========================================================================================= */
const S9SYS = { all: "Digestive, respiratory and circulatory systems working together", dig: "Digestive system: alimentary canal + liver + pancreas", resp: "Respiratory system: nostrils, windpipe, lungs; diaphragm below", circ: "Circulatory system: the heart pumps blood through blood vessels" };
SIM_DEF.k7s9_body3d = {
  def: { sys: "all", pos: 0, rate: 16, lx: "" },
  rng: { pos: () => [0, 6, 1], rate: () => [10, 40, 2] },
  lab: { pos: "Move the food along", rate: "Breaths per minute" },
  reads: { sys: "System", food: "Food is in the", rate: "Breathing" },
  readouts(P) { const k = Math.round(clampN(s9n(P.pos), 0, 6)); return { sys: S9SYS[P.sys] || S9SYS.all, food: S9ST[k].n, rate: `${Math.round(s9n(P.rate))} breaths per minute${s9n(P.rate) >= 26 ? " (fast: the body needs more oxygen)" : ""}` }; },
  init(stage, I) {
    const g = make3D(stage, { height: 330, dist: 7.6, phi: 1.4, theta: 0.5, auto: 0.18, target: [0, 0.5, 0], hint: "Drag to turn the body" });
    if (!g) return null;
    const { THREE, root } = g, V = (x, y, z) => new THREE.Vector3(x, y, z);
    const skin = new THREE.MeshStandardMaterial({ color: 0xe8c9a0, transparent: true, opacity: .13, roughness: .8, depthWrite: false });
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.05, 4.2, 28, 1, true), skin); torso.position.y = 0; root.add(torso);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.85, 24, 18), skin); head.position.y = 3.0; root.add(head);
    // digestive tract along a curve
    const digPts = [V(0, 2.75, .55), V(0, 2.2, .1), V(0, 1.2, .1), V(.15, .45, .2), V(.55, .35, .35), V(.7, .1, .3), V(.1, -.2, .5), V(-.5, -.35, .4), V(.4, -.6, .5), V(-.4, -.85, .4), V(.3, -1.1, .5), V(-.75, -1.1, .3), V(-.85, -.4, .3), V(-.6, -.1, .35), V(.65, -.1, .35), V(.85, -.5, .3), V(.8, -1.4, .3), V(.1, -1.6, .2), V(0, -2.05, .1)];
    const curve = new THREE.CatmullRomCurve3(digPts);
    const digM = new THREE.MeshStandardMaterial({ color: 0xf0a080, roughness: .5, emissive: 0x401a10, emissiveIntensity: .3 });
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 220, 0.09, 10, false), digM); root.add(tube);
    const stomach = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 14), digM); stomach.scale.set(1.2, .8, .8); stomach.position.set(.45, .3, .3); root.add(stomach);
    const liverM = new THREE.MeshStandardMaterial({ color: 0x8c3b2e, roughness: .6 });
    const liver = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 14), liverM); liver.scale.set(1.4, .55, .8); liver.position.set(-.45, .7, .25); root.add(liver);
    const panM = new THREE.MeshStandardMaterial({ color: 0xe9b45a, roughness: .6 });
    const pan = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .7, 10), panM); pan.rotation.z = Math.PI / 2; pan.position.set(.35, -.02, .05); root.add(pan);
    // lungs, windpipe, diaphragm
    const lungM = new THREE.MeshStandardMaterial({ color: 0xe98a9e, roughness: .55, transparent: true, opacity: .9 });
    const lungs = [-1, 1].map(sd => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.55, 22, 16), lungM); m.position.set(sd * .62, 1.55, -.1); m.scale.set(.85, 1.35, .8); root.add(m); return m; });
    const pipeM = new THREE.MeshStandardMaterial({ color: 0xd6e4ee, roughness: .5 });
    const wp = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, 1.1, 10), pipeM); wp.position.set(0, 2.45, -.15); root.add(wp);
    const diaM = new THREE.MeshStandardMaterial({ color: 0xe04a86, roughness: .6, side: THREE.DoubleSide, transparent: true, opacity: .75 });
    const dia = new THREE.Mesh(new THREE.SphereGeometry(1.1, 24, 8, 0, Math.PI * 2, 0, Math.PI / 3.2), diaM); dia.scale.set(1, .35, .8); dia.position.set(0, .82, 0); root.add(dia);
    // heart + blood loop
    const heartM = new THREE.MeshStandardMaterial({ color: 0xc8283a, roughness: .4, emissive: 0x5a0a12, emissiveIntensity: .5 });
    const heart = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 14), heartM); heart.position.set(.18, 1.35, .35); root.add(heart);
    const loop = new THREE.CatmullRomCurve3([V(.18, 1.35, .35), V(.9, 2.2, .6), V(.4, 3.4, .5), V(-.4, 3.4, .5), V(-.9, 2.2, .6), V(.18, 1.35, .35), V(1.0, .5, .65), V(1.0, -1.8, .6), V(-1.0, -1.8, .6), V(-1.0, .5, .65)], true);
    const vesM = new THREE.MeshStandardMaterial({ color: 0x8a1f2a, roughness: .5, transparent: true, opacity: .6 });
    const ves = new THREE.Mesh(new THREE.TubeGeometry(loop, 200, 0.035, 6, true), vesM); root.add(ves);
    const cellG = new THREE.SphereGeometry(.06, 8, 6), cellM = new THREE.MeshBasicMaterial({ color: 0xff4d5e });
    const cells = Array.from({ length: 26 }, (_, i) => { const m = new THREE.Mesh(cellG, cellM); root.add(m); return { m, u: i / 26 }; });
    // food ball
    const food = new THREE.Mesh(new THREE.SphereGeometry(.16, 16, 12), new THREE.MeshStandardMaterial({ color: 0xffe08a, emissive: 0xc08a20, emissiveIntensity: .7 })); root.add(food);
    const STU = [0, .1, .26, .55, .78, .93, 1];
    const labs = { mouth: g.label("Mouth", [0, 2.75, 1.0], "plain"), stomach: g.label("Stomach", [1.1, .35, .5], "plain"), liver: g.label("Liver", [-1.35, .75, .4], "plain"), small: g.label("Small intestine", [.3, -1.35, 1.0], "plain"), large: g.label("Large intestine", [-1.9, -.4, .4], "plain"),
      lung: g.label("Lungs", [-1.25, 1.75, 0], "plain"), wind: g.label("Windpipe", [0, 3.1, -.6], "plain"), dia: g.label("Diaphragm", [1.45, .85, 0], "plain"), heart: g.label("Heart", [.5, 1.3, .9], "plain"), ves: g.label("Blood vessels", [1.35, -1.4, .6], "plain") };
    const lTitle = g.label("", [0, 4.25, 0], "plain");
    const st = { sys: "all", rate: 16, fu: 0, tu: 0 };
    let ph = 0;
    g.onFrame((t, dt) => {
      ph += dt * st.rate / 60 * Math.PI * 2; const br = (1 - Math.cos(ph)) / 2;
      lungs.forEach(m => m.scale.set(.85 + .12 * br, 1.35 + .12 * br, .8 + .1 * br)); dia.position.y = .82 - .18 * br;
      const hb = 1 + .12 * Math.max(0, Math.sin(t * 7.5)); heart.scale.setScalar(hb);
      cells.forEach(c => { c.u = (c.u + dt * .07) % 1; c.m.position.copy(loop.getPointAt(c.u)); });
      st.fu = s9lerp(st.fu, st.tu, Math.min(1, dt * 2.5)); food.position.copy(curve.getPointAt(clampN(st.fu, 0, 1))); food.position.z += .08;
    });
    function apply(D, P, sh, hl) {
      st.sys = P.sys || "all"; st.rate = clampN(s9n(P.rate), 4, 60);
      const d = clampN(s9n(D.pos), 0, 6), a = Math.floor(d), b = Math.min(6, a + 1); st.tu = s9lerp(STU[a], STU[b], d - a);
      const on = k => st.sys === "all" || st.sys === k;
      [digM, liverM, panM].forEach(m => { m.transparent = true; m.opacity = on("dig") ? 1 : .15; }); food.visible = on("dig");
      lungM.opacity = on("resp") ? .9 : .12; pipeM.transparent = true; pipeM.opacity = on("resp") ? 1 : .15; diaM.opacity = on("resp") ? .75 : .1;
      heartM.transparent = true; heartM.opacity = on("circ") ? 1 : .2; vesM.opacity = on("circ") ? .6 : .08; cells.forEach(c => c.m.visible = on("circ"));
      ["mouth", "stomach", "liver", "small", "large"].forEach(k => labs[k].show(on("dig") && st.sys !== "all"));
      ["lung", "wind", "dia"].forEach(k => labs[k].show(on("resp") && st.sys !== "all"));
      ["heart", "ves"].forEach(k => labs[k].show(on("circ") && st.sys !== "all"));
      if (st.sys === "all") { labs.stomach.show(true); labs.lung.show(true); labs.heart.show(true); }
      lTitle.set(P.lx ? fx(String(P.lx)) : "Shareerpur: the body's systems");
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

})();
