(function(){
/* Grade 7 Science (Curiosity) Chapter 11 — Light: Shadows and Reflections
   Plugin: sims (k7s11_*), the Purushwadi firefly-forest scene, and Kajwa the firefly guide. */

const hlA = (hl, part) => ` data-part="${part}"${hl === part ? ' class="hl"' : ""}`;
const num = x => { const v = +x; return isFinite(v) ? v : 0; };
const f1 = x => (Math.round(num(x) * 10) / 10).toLocaleString("en-IN", { maximumFractionDigits: 1 });
const f2 = x => (Math.round(num(x) * 100) / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 });
const DEG = Math.PI / 180;
const arrow = (x1, y1, x2, y2, col, w, extra) => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 9;
  const p1 = [x2 - L * Math.cos(a - .4), y2 - L * Math.sin(a - .4)], p2 = [x2 - L * Math.cos(a + .4), y2 - L * Math.sin(a + .4)];
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${col}" stroke-width="${w || 3}" stroke-linecap="round"${extra || ""}/>` +
    `<path d="M${x2.toFixed(1)} ${y2.toFixed(1)} L${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" fill="${col}"/>`;
};
const glowDef = id => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#fff6c4"/><stop offset=".45" stop-color="#ffd36b" stop-opacity=".9"/><stop offset="1" stop-color="#ffd36b" stop-opacity="0"/></radialGradient></defs>`;
const torchSvg = (x, y, on, dir) => {
  const s = dir || 1; // lamp at (x,y); body extends to the left when s=1
  return `<g><rect x="${x - s * 40}" y="${y - 8}" width="30" height="16" rx="4" fill="#3a5f9a" transform="${s < 0 ? `translate(${2 * x} 0) scale(-1 1)` : ""}"/>` +
    `<path d="M${x - s * 12} ${y - 8} L${x} ${y - 13} L${x} ${y + 13} L${x - s * 12} ${y + 8}Z" fill="#9bb6dc"/>` +
    `<rect x="${x - 1.5}" y="${y - 12}" width="3" height="24" fill="${on ? "#fff3b0" : "#556"}"/></g>`;
};
const candleSvg = (x, y, sc) => { const k = sc || 1;
  return `<g transform="translate(${x} ${y}) scale(${k})"><rect x="-7" y="0" width="14" height="34" rx="2" fill="#f4f0e6"/><path d="M0 -2 L0 3" stroke="#222" stroke-width="1.5"/>` +
    `<path d="M0 -26 Q9 -12 0 -1 Q-9 -12 0 -26Z" fill="#ffb52e"/><path d="M0 -16 Q4 -9 0 -3 Q-4 -9 0 -16Z" fill="#fff3b0"/><ellipse cx="0" cy="38" rx="14" ry="4" fill="#8a5a2b"/></g>`; };

/* =========================================================
   1. k7s11_beam — does light travel in a straight line?
   modes: "box" (three matchboxes with holes, torch, screen), "pipe" (candle seen through a pipe),
          "laser" (laser through milky water)
   params: mode, off (how far the middle part is pushed, −3..3), lx (title)
   readouts: spot (what is seen), why
   parts: "boxes", "beam", "screen"
   ========================================================= */
SIM_DEF.k7s11_beam = {
  def: { mode: "box", off: 0, lx: "" },
  rng: { off: () => [-3, 3, 1] },
  lab: { off: "Push the middle part up / down" },
  reads: { spot: "What we see", why: "Why" },
  draw(D, P, sh, hl) {
    const off = num(D.off), lined = Math.abs(off) < .25, mode = P.mode, rev = sh.has("spot");
    let s = `<svg viewBox="0 0 420 240">` + glowDef("k7s11g1");
    s += `<rect x="4" y="30" width="412" height="200" rx="14" fill="rgba(4,10,20,.55)" stroke="var(--line)"/>`;
    const title = P.lx || (mode === "pipe" ? "Can the eye see the flame through the pipe?" : mode === "laser" ? "A laser beam in water with a drop of milk" : "Are the three holes in one straight line?");
    s += T(210, 20, title, { size: 13, fill: "var(--muted)" });
    let spot = "", why = "Light travels in a straight line. It gets through only when every opening lies on one straight line.";
    if (mode === "laser") {
      s += `<path d="M120 80 L120 205 Q120 214 130 214 L300 214 Q310 214 310 205 L310 80" fill="rgba(98,182,232,.12)" stroke="#9fd3f5" stroke-width="3"/>`;
      s += `<rect x="122" y="104" width="186" height="108" fill="rgba(240,240,255,.22)"/>`;
      s += `<rect x="20" y="150" width="64" height="14" rx="5" fill="#2a2a38" stroke="#556"/><rect x="84" y="153" width="8" height="8" fill="#ef5b45"/>`;
      s += `<line x1="92" y1="157" x2="400" y2="157" stroke="#ff4d4d" stroke-width="2" opacity=".35"/>`;
      s += `<line x1="122" y1="157" x2="308" y2="157" stroke="#ff4d4d" stroke-width="4"${hlA(hl, "beam")}/>`;
      s += `<circle cx="398" cy="157" r="5" fill="#ff4d4d"/>`;
      s += T(52, 184, "Laser", { size: 12, fill: "var(--muted)" }) + T(215, 96, "water + a drop of milk", { size: 12, fill: "var(--sky)" });
      s += T(215, 140, "the beam is a straight line", { size: 13, fill: "#ff8a8a" });
      spot = "The red beam goes straight through the water";
      why = "The milk makes the path of light visible: it is a straight line. (Light can bend around corners a tiny bit; you will learn this later.)";
    } else if (mode === "pipe") {
      const y = 130, dy = off * 16;
      const pts = [[60, y], [150, y], [175, y + dy], [245, y + dy], [270, y], [350, y]];
      const d = "M" + pts.map(p => p.join(" ")).join(" L");
      s += `<path d="${d}" fill="none" stroke="#7d91a8" stroke-width="26" stroke-linejoin="round"${hlA(hl, "boxes")}/><path d="${d}" fill="none" stroke="#1a2735" stroke-width="16" stroke-linejoin="round"/>`;
      s += candleSvg(382, y + 4, 1);
      // eye
      s += `<ellipse cx="36" cy="${y}" rx="16" ry="10" fill="#fff"/><circle cx="40" cy="${y}" r="6" fill="#4a2c1a"/><circle cx="41" cy="${y}" r="2.5" fill="#000"/>`;
      if (!rev) {
        s += T(210, 205, "Can the eye see the flame? ?", { size: 14, fill: "var(--mari)" });
        spot = lined ? "The eye sees the candle flame" : "The flame cannot be seen";
      } else if (lined) {
        s += `<line x1="372" y1="${y - 10}" x2="54" y2="${y}" stroke="#ffd36b" stroke-width="3" stroke-dasharray="7 5"${hlA(hl, "beam")}/>`;
        s += T(210, 205, "Straight pipe: the flame is seen ✓", { size: 14, fill: "var(--teal)" });
        spot = "The eye sees the candle flame";
      } else {
        s += `<line x1="372" y1="${y - 6}" x2="262" y2="${y - 2}" stroke="#ffd36b" stroke-width="3" stroke-dasharray="7 5"${hlA(hl, "beam")}/><circle cx="262" cy="${y - 2}" r="7" fill="url(#k7s11g1)"/>`;
        s += T(210, 205, "Bent pipe: light is blocked at the bend ✗", { size: 14, fill: "var(--red)" });
        spot = "The flame cannot be seen";
      }
      s += T(36, 160, "eye", { size: 12, fill: "var(--muted)" }) + T(382, 70, "candle", { size: 12, fill: "var(--muted)" });
    } else {
      const y = 132, xs = [130, 210, 290];
      s += torchSvg(62, y, true);
      s += T(42, y + 34, "torch", { size: 12, fill: "var(--muted)" });
      xs.forEach((x, i) => {
        const yy = y + (i === 1 ? off * 14 : 0);
        s += `<rect x="${x - 14}" y="${(yy - 34).toFixed(1)}" width="28" height="68" rx="3" fill="var(--manila)" stroke="var(--manila3)"${hlA(hl, "boxes")}/>`;
        s += `<rect x="${x - 14}" y="${(yy - 34).toFixed(1)}" width="28" height="10" fill="#e04a86"/>`;
        s += `<circle cx="${x}" cy="${yy.toFixed(1)}" r="5" fill="#2a2418"/>`;
      });
      s += `<rect x="370" y="50" width="14" height="150" rx="3" fill="#d9d2c0"${hlA(hl, "screen")}/>`;
      s += T(377, 218, "screen", { size: 12, fill: "var(--muted)" }) + T(210, 218, "matchboxes with holes", { size: 12, fill: "var(--muted)" });
      if (!rev) {
        s += `<path d="M64 ${y - 8} L116 ${y - 7} L116 ${y + 7} L64 ${y + 8}Z" fill="rgba(255,230,140,.28)"/>`;
        s += T(250, 70, "Spot on the screen? ?", { size: 14, fill: "var(--mari)" });
        spot = lined ? "A bright spot of light appears on the screen" : "No spot on the screen";
      } else if (lined) {
        s += `<path d="M64 ${y - 8} L370 ${y - 5} L370 ${y + 5} L64 ${y + 8}Z" fill="rgba(255,230,140,.28)"${hlA(hl, "beam")}/>`;
        s += `<line x1="64" y1="${y}" x2="370" y2="${y}" stroke="#ffe48a" stroke-width="2.5"/>`;
        s += `<circle cx="369" cy="${y}" r="16" fill="url(#k7s11g1)"/>`;
        s += T(250, 70, "Bright spot on the screen ✓", { size: 14, fill: "var(--teal)" });
        spot = "A bright spot of light appears on the screen";
      } else {
        s += `<path d="M64 ${y - 8} L196 ${y - 6} L196 ${y + 6} L64 ${y + 8}Z" fill="rgba(255,230,140,.28)"${hlA(hl, "beam")}/>`;
        s += `<circle cx="196" cy="${y}" r="11" fill="url(#k7s11g1)"/>`;
        s += T(250, 70, "No spot: the middle hole is out of line ✗", { size: 14, fill: "var(--red)" });
        spot = "No spot on the screen";
      }
    }
    s += "</svg>";
    return { svg: s, reads: { spot, why } };
  }
};

/* =========================================================
   2. k7s11_shadow — torch, object, screen (side view + front view of the screen)
   params: d (object distance from torch, cm; torch–screen = 100 cm), mat (0 opaque, 1 translucent, 2 transparent),
           name (material label), shape ("ball" 10 cm across | "card"), tilt (card tilt °), col (object colour),
           obj (1/0), scr (1/0), on (1/0), n (torches 1/2)
   readouts: size, kind     parts: "obj", "screen", "torch"
   ========================================================= */
const MATK = ["Opaque", "Translucent", "Transparent"];
SIM_DEF.k7s11_shadow = {
  def: { d: 50, mat: 0, name: "", shape: "ball", tilt: 0, col: "#e04a86", obj: 1, scr: 1, on: 1, n: 1 },
  rng: { d: () => [20, 80, 5], mat: () => [0, 2, 1], tilt: () => [0, 60, 15] },
  lab: { d: "Object's distance from the torch (cm)", mat: "Material: opaque → transparent", tilt: "Tilt the card (°)" },
  reads: { size: "Shadow size", kind: "Shadow" },
  draw(D, P, sh, hl) {
    const d = Math.max(15, num(D.d)), mat = Math.round(num(D.mat)), L = 100, k = 2.6, cy = 120, x0 = 30, xs = x0 + L * k;
    const on = +P.on !== 0, scr = +P.scr !== 0, obj = +P.obj !== 0, two = +P.n === 2, tilt = num(D.tilt) * DEG;
    const h = P.shape === "card" ? 10 * Math.cos(tilt) : 10, w = P.shape === "card" ? 8 : 10;
    const torchY = two ? [-12, 12] : [0];
    const op = [.88, .45, .12][mat] || .88, rev = sh.has("size") || sh.has("kind");
    let s = `<svg viewBox="0 0 420 240">` + glowDef("k7s11g2");
    s += `<defs><clipPath id="k7s11c2"><rect x="318" y="26" width="96" height="190" rx="6"/></clipPath></defs>`;
    s += `<rect x="4" y="22" width="300" height="200" rx="12" fill="rgba(4,10,20,.6)" stroke="var(--line)"/>`;
    s += T(154, 14, "Side view", { size: 11, fill: "var(--muted)" }) + T(366, 14, "On the screen", { size: 11, fill: "var(--muted)" });
    // beams
    torchY.forEach(ty => {
      const y = cy + ty * k;
      if (on) {
        const xe = scr ? xs : 302, spread = 30 * (xe - x0) / (L * k);
        s += `<path d="M${x0} ${y} L${xe} ${y - spread * k} L${xe} ${y + spread * k}Z" fill="rgba(255,230,140,${two ? .14 : .2})"/>`;
      }
      s += torchSvg(x0, y, on);
    });
    // object + its shadow cone in side view
    const ox = x0 + d * k;
    if (obj) {
      if (on && scr && rev) torchY.forEach(ty => {
        const y = cy + ty * k, top = cy - h / 2 * k, bot = cy + h / 2 * k, m = L / d;
        const st = y + (top - y) * m, sb = y + (bot - y) * m;
        s += `<path d="M${ox} ${top} L${xs} ${st.toFixed(1)} L${xs} ${sb.toFixed(1)} L${ox} ${bot}Z" fill="rgba(0,0,0,${(op * .55).toFixed(2)})"/>`;
        s += `<line x1="${x0}" y1="${y}" x2="${xs}" y2="${st.toFixed(1)}" stroke="#ffe48a" stroke-width="1" stroke-dasharray="4 4" opacity=".7"/><line x1="${x0}" y1="${y}" x2="${xs}" y2="${sb.toFixed(1)}" stroke="#ffe48a" stroke-width="1" stroke-dasharray="4 4" opacity=".7"/>`;
      });
      const fill = mat === 0 ? P.col : mat === 1 ? "rgba(240,236,220,.55)" : "rgba(160,220,255,.18)";
      if (P.shape === "card") {
        const hh = 10 * k / 2, dx = Math.sin(tilt) * hh, dyy = Math.cos(tilt) * hh;
        s += `<line x1="${(ox - dx).toFixed(1)}" y1="${(cy - dyy).toFixed(1)}" x2="${(ox + dx).toFixed(1)}" y2="${(cy + dyy).toFixed(1)}" stroke="${mat === 0 ? P.col : "#cfe8ff"}" stroke-width="5" stroke-linecap="round"${hlA(hl, "obj")}/>`;
      } else s += `<circle cx="${ox}" cy="${cy}" r="${5 * k}" fill="${fill}" stroke="${mat === 2 ? "#9fd3f5" : "rgba(255,255,255,.5)"}" stroke-width="1.5"${hlA(hl, "obj")}/>`;
    }
    if (scr) s += `<rect x="${xs}" y="34" width="8" height="176" fill="#d9d2c0"${hlA(hl, "screen")}/>`;
    s += T(x0 + 2, 212, "torch", { size: 11, fill: "var(--muted)" });
    if (obj) s += T(ox, 52, `${d} cm`, { size: 11, fill: "var(--mari)" });
    if (scr) s += T(xs - 4, 212, "screen", { size: 11, fill: "var(--muted)", a: "end" });
    // front view of the screen
    const fx0 = 366, fc = 121, q = 1.55;
    s += `<rect x="318" y="26" width="96" height="190" rx="6" fill="${scr ? "#2b2a26" : "rgba(4,10,20,.6)"}" stroke="var(--line)"/>`;
    let size = "", kind = "";
    if (!scr) { s += T(fx0, 110, "No screen,", { size: 12, fill: "var(--muted)" }) + T(fx0, 128, "so no shadow", { size: 12, fill: "var(--muted)" }) + T(fx0, 146, "is seen", { size: 12, fill: "var(--muted)" }); size = "—"; kind = "No screen: the light just goes on. We need a screen to see a shadow."; }
    else if (!on) { s += T(fx0, 118, "Dark: no", { size: 12, fill: "var(--muted)" }) + T(fx0, 136, "light, no shadow", { size: 12, fill: "var(--muted)" }); size = "—"; kind = "Torch off: no light, so no shadow."; }
    else {
      s += `<g clip-path="url(#k7s11c2)">`;
      torchY.forEach(ty => { s += `<circle cx="${fx0}" cy="${fc + ty * q}" r="${30 * q}" fill="#f6e7a8" opacity="${two ? .75 : .95}"/>`; });
      if (obj && rev) torchY.forEach(ty => {
        const m = L / d, yc2 = fc + (ty + (0 - ty) * m) * q, R = h / 2 * m * q, Rw = w / 2 * m * q;
        s += `<clipPath id="k7s11cl${ty < 0 ? "a" : "b"}"><circle cx="${fx0}" cy="${fc + ty * q}" r="${30 * q}"/></clipPath>`;
        const sh2 = P.shape === "card" ? `<rect x="${(fx0 - Rw).toFixed(1)}" y="${(yc2 - R).toFixed(1)}" width="${(2 * Rw).toFixed(1)}" height="${(2 * R).toFixed(1)}"` : `<ellipse cx="${fx0}" cy="${yc2.toFixed(1)}" rx="${R.toFixed(1)}" ry="${R.toFixed(1)}"`;
        s += `<g clip-path="url(#k7s11cl${ty < 0 ? "a" : "b"})">${sh2} fill="#151519" opacity="${op}"/></g>`;
      });
      s += `</g>`;
      const sz = 10 * L / d;
      if (!obj) { size = "no object, no shadow"; kind = "Only a bright spot of light on the screen."; }
      else {
        size = P.shape === "card" ? `${f1(h)} cm × 100 ÷ ${d} ≈ ${f1(h * L / d)} cm tall` : `10 cm × 100 ÷ ${d} = ${f1(sz)} cm across`;
        kind = (two ? "Two torches: two shadows. " : "") + (mat === 0 ? "Opaque: a dark shadow" : mat === 1 ? "Translucent: a lighter shadow" : "Transparent: only a faint shadow") + (P.name ? ` (${P.name})` : "") + ". It is dark grey, whatever the object's colour.";
      }
    }
    if (scr && on && obj && !rev) s += T(fx0, fc + 6, "?", { size: 26, fill: "var(--mari)" });
    if (scr && on && obj) s += T(fx0, 232, sh.has("size") ? `≈ ${f1((P.shape === "card" ? h : 10) * L / d)} cm` : "shadow", { size: 12, fill: "var(--mari)" });
    s += "</svg>";
    return { svg: s, reads: { size, kind } };
  }
};

/* =========================================================
   3. k7s11_sun — shadows under the Sun
   mode "kid": a 1.4 m child, Sun height changes with the time hr (6..18) → shadow length
   mode "bird": a bird flying at bh metres; the Sun is a big source so the shadow fades with height
   readouts: len, rule      parts: "sun", "shadow"
   ========================================================= */
const sunElev = hr => Math.max(6, 80 - 13 * Math.abs(hr - 12));
const hrTxt = hr => { const h = Math.round(hr); return h === 12 ? "12 PM (noon)" : h < 12 ? `${h} AM` : `${h - 12} PM`; };
SIM_DEF.k7s11_sun = {
  def: { mode: "kid", hr: 9, bh: 5 },
  rng: { hr: () => [6, 18, 1], bh: () => [1, 60, 1] },
  lab: { hr: "Time of day (hour, 24-h clock)", bh: "Bird's height above ground (m)" },
  reads: { len: "Shadow", rule: "Rule" },
  draw(D, P, sh, hl) {
    let s = `<svg viewBox="0 0 420 240">` + glowDef("k7s11g3");
    const gy = 200;
    if (P.mode === "bird") {
      const bh = Math.max(1, num(D.bh)), by = gy - bh * 2.9, wb = .4, sp = .006; // sun's angular spread
      const pw = wb + 2 * bh * sp, uw = Math.max(0, wb - 2 * bh * sp), px = 110;
      s += `<rect x="0" y="0" width="420" height="${gy}" fill="rgba(98,182,232,.18)"/><rect x="0" y="${gy}" width="420" height="40" fill="#8a6a2e"/>`;
      s += `<circle cx="210" cy="-30" r="60" fill="url(#k7s11g3)"${hlA(hl, "sun")}/>`;
      // rays from the two edges of the Sun to the wing tips
      const ext = (x0, x1) => x0 + (x1 - x0) * gy / by;
      s += `<line x1="150" y1="0" x2="${ext(150, 225).toFixed(1)}" y2="${gy}" stroke="#ffe48a" stroke-width="1" opacity=".6" stroke-dasharray="4 4"/>`;
      s += `<line x1="270" y1="0" x2="${ext(270, 195).toFixed(1)}" y2="${gy}" stroke="#ffe48a" stroke-width="1" opacity=".6" stroke-dasharray="4 4"/>`;
      // bird
      const fl = Math.sin(Date.now() / 160) * 6;
      s += `<path d="M195 ${by} Q202 ${by - 8 - fl} 210 ${by} Q218 ${by - 8 - fl} 225 ${by} Q210 ${by + 5} 195 ${by}Z" fill="#2a2418"/>`;
      s += `<line x1="380" y1="${gy}" x2="380" y2="${by}" stroke="var(--muted)" stroke-dasharray="3 3"/>` + T(388, (gy + by) / 2, `${Math.round(bh)} m`, { size: 12, fill: "var(--mari)", a: "start" });
      // ground shadow: penumbra + umbra
      const pOp = Math.min(.8, .8 * wb / pw), rv = sh.has("len");
      if (rv) {
      s += `<ellipse cx="210" cy="${gy + 8}" rx="${(pw * px / 2).toFixed(1)}" ry="5" fill="#000" opacity="${pOp.toFixed(2)}"${hlA(hl, "shadow")}/>`;
      if (uw > 0) s += `<ellipse cx="210" cy="${gy + 8}" rx="${(uw * px / 2).toFixed(1)}" ry="4" fill="#000" opacity=".85"/>`; }
      const seen = bh <= 20;
      s += T(210, 234, !rv ? "Shadow on the ground? ?" : seen ? "A dark shadow on the ground" : bh < 35 ? "The shadow is pale and spread out" : "Too faint to notice", { size: 13, fill: seen ? "var(--ink)" : "var(--muted)" });
      s += "</svg>";
      return { svg: s, reads: { len: seen ? `Bird ${Math.round(bh)} m up: a clear dark shadow` : `Bird ${Math.round(bh)} m up: the shadow is very faint and spread out`, rule: "The Sun is a big source. When the bird is high, light from different parts of the Sun reaches the ground behind the small bird, so its shadow fades away. Near the ground it blocks the light well and its shadow is dark." } };
    }
    const hr = num(D.hr), e = sunElev(hr), side = hr < 12 ? -1 : 1, kx = 210, kh = 1.4, ppm = 50;
    const sx = kx + side * 175 * Math.cos(e * DEG), sy = gy - 175 * Math.sin(e * DEG);
    const Ls = kh / Math.tan(e * DEG), tipX = kx - side * Ls * ppm;
    s += `<rect x="0" y="0" width="420" height="${gy}" fill="rgba(98,182,232,.16)"/><rect x="0" y="${gy}" width="420" height="40" fill="#8a6a2e"/>`;
    s += T(30, 20, "East", { size: 11, fill: "var(--muted)" }) + T(390, 20, "West", { size: 11, fill: "var(--muted)" });
    s += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="26" fill="url(#k7s11g3)"${hlA(hl, "sun")}/><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="10" fill="#ffd36b"/>`;
    const cl = Math.max(0, Math.min(420, tipX)), rv = sh.has("len");
    if (rv) s += `<path d="M${kx} ${gy} L${cl.toFixed(1)} ${gy - 3} L${cl.toFixed(1)} ${gy + 5} Z" fill="#000" opacity=".7"${hlA(hl, "shadow")}/><ellipse cx="${cl.toFixed(1)}" cy="${gy + 1}" rx="5" ry="4" fill="#000" opacity=".7"/>`;
    // ray past the head to the tip of the shadow
    if (rv) s += `<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${cl.toFixed(1)}" y2="${(gy - (cl - tipX) * Math.tan(e * DEG) * side).toFixed(1)}" stroke="#ffe48a" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    // child (1.4 m = 70 px)
    s += `<g><line x1="${kx}" y1="${gy}" x2="${kx - 6}" y2="${gy - 28}" stroke="#2f3b66" stroke-width="5"/><line x1="${kx}" y1="${gy}" x2="${kx + 6}" y2="${gy - 28}" stroke="#2f3b66" stroke-width="5"/>
      <rect x="${kx - 9}" y="${gy - 56}" width="18" height="30" rx="5" fill="#e04a86"/><circle cx="${kx}" cy="${gy - 63}" r="8" fill="#a96d45"/><path d="M${kx - 8} ${gy - 65} Q${kx} ${gy - 75} ${kx + 8} ${gy - 65}Z" fill="#22160f"/></g>`;
    s += T(210, 228, `${hrTxt(hr)} · shadow ${rv ? "≈ " + f1(Ls) + " m" : "?"}`, { size: 14, fill: "var(--mari)" });
    s += "</svg>";
    return { svg: s, reads: { len: `At ${hrTxt(hr)} the Sun is about ${Math.round(e)}° high: a 1.4 m child's shadow ≈ ${f1(Ls)} m`, rule: "The higher the Sun, the shorter the shadow. The shadow is shortest near noon and always falls on the side away from the Sun." } };
  }
};

/* =========================================================
   4. k7s11_mirror — reflection of light by a plane mirror
   mode "ray": flat mirror, normal, incident ray at angle i (0..80) → reflected ray at r = i
   mode "tilt": sunlight comes in at a fixed slant; tilt the mirror (mt) to move the light spot on a wall
   mode "periscope": shape "z" (Z-shaped periscope) or "c" (⊐-shaped tube); mir = 1 shows the two 45° mirrors
   readouts: ang, law      parts: "normal", "inc", "ref", "mirror"
   ========================================================= */
SIM_DEF.k7s11_mirror = {
  def: { mode: "ray", i: 40, mt: 0, shape: "z", mir: 1 },
  rng: { i: () => [0, 80, 5], mt: () => [-30, 30, 5] },
  lab: { i: "Angle of incidence i (°)", mt: "Tilt the mirror (°)" },
  reads: { ang: "Angles", law: "Rule" },
  draw(D, P, sh, hl) {
    let s = `<svg viewBox="0 0 420 240">` + glowDef("k7s11g4");
    s += `<rect x="4" y="4" width="412" height="232" rx="14" fill="rgba(4,10,20,.5)" stroke="var(--line)"/>`;
    const Y = "#ffd36b";
    if (P.mode === "periscope") {
      const c = P.shape === "c", mir = +P.mir !== 0;
      const tube = c ? "M90 40 H220 V200 H90 V160 H180 V80 H90 Z" : "M90 40 H220 V160 H330 V200 H180 V80 H90 Z";
      s += `<path d="${tube}" fill="rgba(239,220,174,.18)" stroke="var(--manila3)" stroke-width="3"/>`;
      // wall that blocks the direct view
      s += c ? "" : `<rect x="250" y="20" width="16" height="120" fill="#5a4636"/>`;
      // object: a flag on a pole, top-left
      s += `<line x1="40" y1="96" x2="40" y2="36" stroke="#ccc" stroke-width="3"/><path d="M40 38 L70 46 L40 56Z" fill="var(--rani)"/>`;
      const ex = c ? 62 : 360, ey = 180;
      s += `<ellipse cx="${ex}" cy="${ey}" rx="14" ry="9" fill="#fff"/><circle cx="${ex + (c ? 4 : -4)}" cy="${ey}" r="5" fill="#4a2c1a"/>`;
      const rvp = sh.has("ang") || sh.has("law");
      if (mir && !rvp) {
        s += `<line x1="182" y1="42" x2="218" y2="78" stroke="#dfe9f5" stroke-width="5"/>` + (c ? `<line x1="182" y1="198" x2="218" y2="162" stroke="#dfe9f5" stroke-width="5"/>` : `<line x1="182" y1="162" x2="218" y2="198" stroke="#dfe9f5" stroke-width="5"/>`) + arrow(70, 60, 150, 60, Y, 2.5);
        s += T(210, 232, "Where does the light go? ?", { size: 12, fill: "var(--mari)" });
      } else if (mir) {
        s += `<line x1="182" y1="42" x2="218" y2="78" stroke="#dfe9f5" stroke-width="5"${hlA(hl, "mirror")}/>`;
        s += c ? `<line x1="182" y1="198" x2="218" y2="162" stroke="#dfe9f5" stroke-width="5"${hlA(hl, "mirror")}/>` : `<line x1="182" y1="162" x2="218" y2="198" stroke="#dfe9f5" stroke-width="5"${hlA(hl, "mirror")}/>`;
        s += arrow(70, 60, 196, 60, Y, 2.5) + arrow(200, 60, 200, 176, Y, 2.5) + (c ? arrow(200, 180, ex + 18, 180, Y, 2.5) : arrow(200, 180, ex - 18, 180, Y, 2.5));
        s += T(236, 56, "mirror 1 (45°)", { size: 11, fill: "var(--sky)", a: "start" }) + T(c ? 236 : 150, c ? 186 : 222, "mirror 2 (45°)", { size: 11, fill: "var(--sky)", a: c ? "start" : "middle" });
        s += T(210, 232, c ? "⊐-shaped tube works too: see objects above you" : "Two reflections let the eye see over the wall", { size: 12, fill: "var(--teal)" });
      } else {
        s += arrow(70, 60, 214, 60, Y, 2.5) + `<circle cx="216" cy="60" r="8" fill="url(#k7s11g4)"/>`;
        s += T(210, 232, "No mirrors: light hits the tube wall and stops", { size: 12, fill: "var(--red)" });
      }
      s += "</svg>";
      return { svg: s, reads: { ang: mir ? "Each mirror turns the light through 90° (i = r = 45°)" : "No mirrors fixed yet", law: "Light travels in straight lines and changes direction at each mirror. Two mirrors at 45°, facing each other, guide it around the bends." } };
    }
    let a, O, dIn; const rv = sh.has("ang") || P.mode === "tilt";
    if (P.mode === "tilt") { a = num(D.mt) * DEG; O = [130, 196]; dIn = [Math.cos(-50 * DEG), Math.sin(50 * DEG)]; }
    else { a = 0; O = [210, 196]; const ii = num(D.i) * DEG; dIn = [Math.sin(ii), Math.cos(ii)]; }
    const m = [Math.cos(a), -Math.sin(a)], n = [-Math.sin(a), -Math.cos(a)];
    const dn = dIn[0] * n[0] + dIn[1] * n[1], r = [dIn[0] - 2 * dn * n[0], dIn[1] - 2 * dn * n[1]];
    const iAng = Math.acos(Math.min(1, -dn)) / DEG;
    const M1 = [O[0] - 110 * m[0], O[1] - 110 * m[1]], M2 = [O[0] + 110 * m[0], O[1] + 110 * m[1]];
    // mirror with hatching behind
    let hatch = ""; for (let k = -100; k <= 100; k += 14) { const p = [O[0] + k * m[0], O[1] + k * m[1]]; hatch += `M${p[0].toFixed(1)} ${p[1].toFixed(1)} l${(-n[0] * 9 - m[0] * 6).toFixed(1)} ${(-n[1] * 9 - m[1] * 6).toFixed(1)}`; }
    s += `<path d="${hatch}" stroke="var(--muted)" stroke-width="1.5"/><line x1="${M1[0].toFixed(1)}" y1="${M1[1].toFixed(1)}" x2="${M2[0].toFixed(1)}" y2="${M2[1].toFixed(1)}" stroke="#dfe9f5" stroke-width="5" stroke-linecap="round"${hlA(hl, "mirror")}/>`;
    // normal
    const N2 = [O[0] + 150 * n[0], O[1] + 150 * n[1]];
    s += `<line x1="${O[0]}" y1="${O[1]}" x2="${N2[0].toFixed(1)}" y2="${N2[1].toFixed(1)}" stroke="var(--sky)" stroke-width="2" stroke-dasharray="6 5"${hlA(hl, "normal")}/>`;
    s += T(N2[0] + 2, N2[1] - 6, "normal", { size: 11, fill: "var(--sky)" });
    const Lr = P.mode === "tilt" ? 0 : 160;
    const S = [O[0] - 160 * dIn[0], O[1] - 160 * dIn[1]];
    s += arrow(S[0], S[1], O[0] - 30 * dIn[0], O[1] - 30 * dIn[1], Y, 3, hlA(hl, "inc")) + `<line x1="${(O[0] - 32 * dIn[0]).toFixed(1)}" y1="${(O[1] - 32 * dIn[1]).toFixed(1)}" x2="${O[0]}" y2="${O[1]}" stroke="${Y}" stroke-width="3"/>`;
    // reflected ray, to the wall (tilt mode) or fixed length
    let E, spot = null;
    if (P.mode === "tilt") {
      const wx = 392; let t = 1e9;
      if (r[0] > 1e-6) t = (wx - O[0]) / r[0];
      if (r[1] < -1e-6) t = Math.min(t, (14 - O[1]) / r[1]);
      E = [O[0] + t * r[0], O[1] + t * r[1]];
      if (E[0] >= wx - 1 && E[1] > 14 && E[1] < 226) spot = E;
      s += `<rect x="${wx}" y="14" width="16" height="212" fill="#9c8b6e"/>` + T(400, 236, "wall", { size: 10, fill: "var(--muted)" });
      s += `<circle cx="30" cy="30" r="22" fill="url(#k7s11g4)"/><circle cx="30" cy="30" r="9" fill="#ffd36b"/>`;
    } else E = [O[0] + Lr * r[0], O[1] + Lr * r[1]];
    if (rv) s += arrow(O[0], O[1], E[0] - (P.mode === "tilt" ? 2 * r[0] : 0), E[1] - (P.mode === "tilt" ? 2 * r[1] : 0), "#ffb52e", 3, hlA(hl, "ref"));
    if (spot) s += `<circle cx="${spot[0].toFixed(1)}" cy="${spot[1].toFixed(1)}" r="16" fill="url(#k7s11g4)"/>`;
    // angle arcs
    const base = Math.atan2(n[1], n[0]), aI = Math.atan2(-dIn[1], -dIn[0]), aR = Math.atan2(r[1], r[0]);
    const arc = (a1, a2, R, col) => { const p1 = [O[0] + R * Math.cos(a1), O[1] + R * Math.sin(a1)], p2 = [O[0] + R * Math.cos(a2), O[1] + R * Math.sin(a2)]; let dd = a2 - a1; while (dd > Math.PI) dd -= 2 * Math.PI; while (dd < -Math.PI) dd += 2 * Math.PI; return `<path d="M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A${R} ${R} 0 0 ${dd > 0 ? 1 : 0} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" fill="none" stroke="${col}" stroke-width="2"/>`; };
    const ia = Math.round(iAng);
    if (ia > 1) {
      s += arc(aI, base, 44, Y) + arc(base, aR, 52, "#ffb52e");
      const mi = (aI + base) / 2, mr = (base + aR) / 2;
      s += T(O[0] + 64 * Math.cos(mi), O[1] + 64 * Math.sin(mi) + 4, `i = ${ia}°`, { size: 13, fill: Y });
      s += T(O[0] + 72 * Math.cos(mr), O[1] + 72 * Math.sin(mr) + 4, `r = ${rv ? ia + "°" : "?"}`, { size: 13, fill: "#ffb52e" });
    } else s += T(O[0] + 40, O[1] - 90, rv ? "i = 0°: light goes straight back" : "i = 0°, r = ?", { size: 12, fill: Y, a: "start" });
    if (P.mode !== "tilt") s += T(S[0] + (S[0] < 60 ? 30 : 0), Math.max(18, S[1] - 8), "incident ray", { size: 11, fill: Y }) + (rv ? "" : T(330, 60, "reflected ray: ?", { size: 13, fill: "#ffb52e" })) + (!rv ? "" : T(Math.min(380, E[0]), Math.max(18, E[1] - 8), "reflected ray", { size: 11, fill: "#ffb52e" }));
    else s += T(210, 230, spot ? `Spot on the wall at height ${Math.round(226 - spot[1])}` : "The light misses the wall (goes up)", { size: 12, fill: spot ? "var(--teal)" : "var(--muted)" });
    s += "</svg>";
    return { svg: s, reads: { ang: `Angle of incidence i = ${ia}°, angle of reflection r = ${ia}°`, law: "The reflected ray leaves the mirror at the same angle to the normal as the incident ray comes in: i = r." } };
  }
};

/* =========================================================
   5. k7s11_image — image in a plane mirror (mirror line at x = 210; the image is the reflection)
   params: kind ("pen" | "kid" | "text"), u (object distance, m, 1..6), txt, flip (1: the object text is written mirror-wise), scr (1: a screen is placed behind the mirror)
   readouts: dist, props     parts: "obj", "img", "mirror"
   ========================================================= */
SIM_DEF.k7s11_image = {
  def: { kind: "pen", u: 3, txt: "KESHAV", flip: 0, scr: 0 },
  rng: { u: () => [1, 6, 0.5] },
  lab: { u: "Object's distance from the mirror (m)" },
  reads: { dist: "Distances", props: "The image is" },
  draw(D, P, sh, hl) {
    const u = Math.max(.5, num(D.u)), px = 30, X = 210 - u * px, gy = 196;
    let o = "";
    if (P.kind === "kid") {
      // child facing us, raising the LEFT arm (on our right side)
      o = `<g><line x1="${X - 6}" y1="${gy}" x2="${X - 5}" y2="${gy - 34}" stroke="#2f3b66" stroke-width="6"/><line x1="${X + 6}" y1="${gy}" x2="${X + 5}" y2="${gy - 34}" stroke="#2f3b66" stroke-width="6"/>
        <rect x="${X - 12}" y="${gy - 72}" width="24" height="40" rx="6" fill="#35c29a"/>
        <line x1="${X - 12}" y1="${gy - 66}" x2="${X - 20}" y2="${gy - 38}" stroke="#a96d45" stroke-width="5" stroke-linecap="round"/>
        <line x1="${X + 12}" y1="${gy - 66}" x2="${X + 22}" y2="${gy - 100}" stroke="#a96d45" stroke-width="5" stroke-linecap="round"/><circle cx="${X + 22}" cy="${gy - 102}" r="4" fill="#f4a51c"/>
        <circle cx="${X}" cy="${gy - 82}" r="11" fill="#a96d45"/><path d="M${X - 11} ${gy - 84} Q${X} ${gy - 98} ${X + 11} ${gy - 84}Z" fill="#22160f"/>
        <text x="${X + 30}" y="${gy - 104}" font-size="11" font-weight="800" fill="#f4a51c" font-family="Mulish, sans-serif">L</text></g>`;
    } else if (P.kind === "text") {
      const t = String(P.txt || "KESHAV"), wv = Math.min(150, 14 + t.length * 11), fs = Math.min(16, 150 / Math.max(1, t.length) * 1.4);
      const cx = Math.max(X, 20 + wv / 2), tx = P.flip ? `transform="translate(${2 * cx} 0) scale(-1 1)"` : "";
      o = `<g><rect x="${cx - wv / 2}" y="${gy - 110}" width="${wv}" height="40" rx="5" fill="#fff8e6" stroke="var(--manila3)"/><line x1="${cx}" y1="${gy - 70}" x2="${cx}" y2="${gy}" stroke="#8a5a2b" stroke-width="4"/>
        <text x="${cx}" y="${gy - 84}" font-size="${fs.toFixed(1)}" font-weight="800" fill="#2a2418" text-anchor="middle" font-family="Mulish, sans-serif" ${tx}>${esc(t)}</text></g>`;
    } else {
      o = `<g><rect x="${X - 6}" y="${gy - 100}" width="12" height="86" rx="3" fill="#3a5f9a"/><path d="M${X - 6} ${gy - 14} L${X + 6} ${gy - 14} L${X} ${gy}Z" fill="#cfd6df"/><rect x="${X - 6}" y="${gy - 112}" width="12" height="16" rx="3" fill="var(--rani)"/><rect x="${X + 6}" y="${gy - 104}" width="3" height="30" fill="#cfd6df"/></g>`;
    }
    let s = `<svg viewBox="0 0 420 240">`;
    s += `<rect x="4" y="4" width="412" height="232" rx="14" fill="rgba(4,10,20,.5)" stroke="var(--line)"/>`;
    s += `<rect x="212" y="20" width="200" height="${gy - 20}" fill="rgba(98,182,232,.07)"/>`;
    s += `<line x1="10" y1="${gy}" x2="410" y2="${gy}" stroke="var(--muted)" stroke-width="2"/>`;
    s += `<g${hlA(hl, "obj")}>${o}</g>`;
    const rvI = sh.has("props");
    s += rvI ? `<g transform="translate(420 0) scale(-1 1)" opacity=".62"${hlA(hl, "img")}>${o}</g>` : T(315, 120, "image: ?", { size: 18, fill: "var(--sky)" });
    s += `<rect x="206" y="18" width="8" height="${gy - 18}" fill="#dfe9f5"${hlA(hl, "mirror")}/>`;
    if (+P.scr) { s += `<rect x="${Math.min(392, 210 + u * px + 26)}" y="60" width="6" height="${gy - 60}" fill="#d9d2c0"/>` + T(Math.min(380, 210 + u * px + 10), 52, "screen: blank", { size: 11, fill: "var(--muted)" }); }
    // distance arrows
    const y2 = gy + 18;
    s += arrow(205, y2, X + 6, y2, "var(--mari)", 2) + (sh.has("dist") ? arrow(215, y2, 420 - X - 6, y2, "var(--sky)", 2) : "");
    s += T((205 + X) / 2, y2 - 6, `${f1(u)} m`, { size: 12, fill: "var(--mari)" }) + T((215 + 420 - X) / 2, y2 - 6, sh.has("dist") ? `${f1(u)} m` : "? m", { size: 12, fill: "var(--sky)" });
    s += T(105, 16, "object", { size: 12, fill: "var(--muted)" }) + T(315, 16, "image (behind the mirror)", { size: 12, fill: "var(--muted)" });
    s += "</svg>";
    return { svg: s, reads: { dist: `Object ${f1(u)} m in front of the mirror → image ${f1(u)} m behind it`, props: P.kind === "kid" ? "Same size, erect, laterally inverted: the left arm looks like the right arm" : P.kind === "text" ? "Same size, erect, laterally inverted: the letters are reversed left to right" : "Same size and erect (the tip is still on top). It cannot be caught on a screen." } };
  }
};

/* =========================================================
   3D — k7s11_pinhole3d: a candle (or tree) in front of a pinhole; the image forms upside down on a tracing-paper screen
   params: u (object distance from pinhole, cm 20..100), s (pinhole–screen distance, cm 10..40), obj ("candle" | "tree")
   readouts: img, why     parts: "rays", "screen"
   ========================================================= */
const phReads = P => {
  const u = num(P.u), sd = num(P.s), k = sd / u;
  return P.obj === "tree"
    ? { img: `Upside down, ${f2(k)} times as tall as the model tree (s ÷ u = ${sd} ÷ ${u})`, why: "Rays from the top of the tree go through the pinhole in a straight line and land at the bottom of the screen; rays from the bottom land at the top." }
    : { img: `Upside down: 12 cm × ${sd} ÷ ${u} = ${f2(12 * k)} cm tall`, why: "Rays from the top of the flame go through the pinhole in a straight line and land at the bottom of the screen; rays from the bottom land at the top." };
};
SIM_DEF.k7s11_pinhole3d = {
  def: { u: 60, s: 20, obj: "candle" },
  rng: { u: () => [20, 100, 10], s: () => [10, 40, 5] },
  lab: { u: "Object to pinhole u (cm)", s: "Pinhole to screen s (cm)" },
  reads: { img: "Image", why: "Why" },
  readouts(P) { return phReads(P); },
  init(stage, I) {
    const g = make3D(stage, { height: 300, dist: 9, phi: 1.3, theta: 1.08, auto: 0, target: [-1.2, 1.0, 0], hint: "Drag to turn the pinhole camera" });
    if (!g) return null;
    const { THREE, root } = g, yc = 1.1;
    g.scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(16, 5), new THREE.MeshStandardMaterial({ color: 0x1a2b38, roughness: .9 }));
    ground.rotation.x = -Math.PI / 2; ground.position.set(-3, 0, 0); root.add(ground);
    // object builders
    const flameM = new THREE.MeshBasicMaterial({ color: 0xffb52e }), coreM = new THREE.MeshBasicMaterial({ color: 0xfff3b0 });
    const waxM = new THREE.MeshStandardMaterial({ color: 0xf4f0e6, roughness: .6 }), trunkM = new THREE.MeshStandardMaterial({ color: 0x8a5a2b }), leafM = new THREE.MeshStandardMaterial({ color: 0x35c29a, roughness: .7 });
    function candle() { const gr = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(.16, .16, .8, 20), waxM); b.position.y = -.2; gr.add(b);
      const f = new THREE.Mesh(new THREE.ConeGeometry(.13, .4, 16), flameM); f.position.y = .42; gr.add(f); const fb = new THREE.Mesh(new THREE.SphereGeometry(.13, 16, 12), flameM); fb.position.y = .24; gr.add(fb);
      const c = new THREE.Mesh(new THREE.SphereGeometry(.06, 10, 8), coreM); c.position.y = .28; gr.add(c); gr.userData.top = .62; gr.userData.bot = -.6; return gr; }
    function tree() { const gr = new THREE.Group(); const t = new THREE.Mesh(new THREE.CylinderGeometry(.08, .11, .5, 12), trunkM); t.position.y = -.55; gr.add(t);
      const c1 = new THREE.Mesh(new THREE.ConeGeometry(.45, .8, 16), leafM); c1.position.y = -.05; gr.add(c1); const c2 = new THREE.Mesh(new THREE.ConeGeometry(.33, .6, 16), leafM); c2.position.y = .4; gr.add(c2);
      gr.userData.top = .7; gr.userData.bot = -.8; return gr; }
    const objs = { candle: candle(), tree: tree() }, imgs = { candle: candle(), tree: tree() };
    Object.values(objs).forEach(o => root.add(o)); Object.values(imgs).forEach(o => { o.rotation.x = Math.PI; root.add(o); });
    const flameLight = new THREE.PointLight(0xffb52e, 0.8, 6); root.add(flameLight);
    // stand under the object
    const stand = new THREE.Mesh(new THREE.BoxGeometry(.6, 1, .6), new THREE.MeshStandardMaterial({ color: 0x5a4636 })); root.add(stand);
    // pinhole plate
    const plateM = new THREE.MeshStandardMaterial({ color: 0x8a6a3e, roughness: .8, side: THREE.DoubleSide });
    const plate = new THREE.Group(); const pw = 2.2;
    [[0, yc + .6, pw, 1.0], [0, yc - .6, pw, 1.0]].forEach(([x, y, w, h]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(.06, h - .03, w), plateM); m.position.set(x, y, 0); plate.add(m); });
    [[-.74], [.74]].forEach(([z]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(.06, .2, 1.04), plateM); m.position.set(0, yc, z * 0.86); plate.add(m); });
    root.add(plate);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.07, .02, 8, 20), new THREE.MeshBasicMaterial({ color: 0xffd36b })); ring.rotation.y = Math.PI / 2; ring.position.set(0, yc, 0); root.add(ring);
    // box shell (from pinhole to screen) + screen
    const shellM = new THREE.MeshStandardMaterial({ color: 0xc9a66b, transparent: true, opacity: .16, depthWrite: false, side: THREE.DoubleSide });
    const shell = new THREE.Mesh(new THREE.BoxGeometry(1, pw, pw), shellM); root.add(shell);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, pw, pw)), new THREE.LineBasicMaterial({ color: 0xc9a66b })); root.add(edges);
    const scrM = new THREE.MeshStandardMaterial({ color: 0xf6efd9, transparent: true, opacity: .4, side: THREE.DoubleSide, roughness: .9 });
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(pw, pw), scrM); scr.rotation.y = Math.PI / 2; root.add(scr);
    // rays
    const mkLine = col => { const arr = new Float32Array(9), geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(arr, 3)); const l = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: col })); root.add(l); return { arr, geo, l }; };
    const rTop = mkLine(0xffd36b), rBot = mkLine(0xff7aa2);
    const lPin = g.label("pinhole", [0, yc + .5, 0], "plain"), lScr = g.label("screen", [0, yc + 1.6, 0], "plain"), lImg = g.label("", [0, yc - 1.7, 0], "big"), lObj = g.label("", [0, 0, 0], "plain");
    const st = { hl: null };
    g.onFrame(t => {
      const fl = 1 + .08 * Math.sin(t * 13) + .05 * Math.sin(t * 7);
      [objs.candle, imgs.candle].forEach(o => { o.children[1].scale.set(1, fl, 1); });
      flameLight.intensity = .7 + .2 * Math.sin(t * 11);
      [rTop.l, rBot.l].forEach(l => { l.material.opacity = 1; });
      scrM.emissive = scrM.emissive || new THREE.Color(0); scrM.emissive.setHex(st.hl === "screen" ? 0x554411 : 0x000000);
    });
    function apply(D, P, sh, hl) {
      st.hl = hl;
      const u = Math.max(1, num(D.u) / 10), sd = Math.max(.5, num(D.s) / 10), k = sd / u, kind = P.obj === "tree" ? "tree" : "candle";
      Object.keys(objs).forEach(n => { objs[n].visible = n === kind; imgs[n].visible = n === kind && sh.has("img"); });
      const o = objs[kind], im = imgs[kind];
      o.position.set(-u, yc, 0);
      stand.position.set(-u, (yc + o.userData.bot) / 2, 0); stand.scale.y = Math.max(.05, yc + o.userData.bot);
      flameLight.position.set(-u, yc + .4, 0); flameLight.visible = kind === "candle";
      im.position.set(sd + .06, yc, 0); im.scale.set(.08, k, k);
      shell.position.set(sd / 2, yc, 0); shell.scale.x = sd; edges.position.copy(shell.position); edges.scale.x = sd;
      scr.position.set(sd, yc, 0);
      const top = o.userData.top, bot = o.userData.bot;
      const set = (R, y0) => { R.arr.set(sh.has("img") ? [-u, yc + y0, 0, 0, yc, 0, sd, yc - y0 * k, 0] : [-u, yc + y0, 0, 0, yc, 0, 0, yc, 0]); R.geo.attributes.position.needsUpdate = true; R.geo.computeBoundingSphere(); };
      set(rTop, top); set(rBot, bot);
      const lw = hl === "rays"; rTop.l.material.color.setHex(lw ? 0xffffff : 0xffd36b);
      lScr.move([sd, yc + 1.25, 0]); lImg.move([sd + .1, yc + 1.75, 0]);
      lImg.set(sh.has("img") ? (kind === "tree" ? "upside-down tree" : `image ≈ ${f1(12 * k)} cm, upside down`) : "image: ?");
      lObj.move([-u, yc + top + .35, 0]); lObj.set(kind === "tree" ? "tree" : "candle 12 cm");
    }
    return { update: apply, dispose() { g.dispose(); } };
  }
};

/* =========================================================
   SCENE — Purushwadi forest at night (Western Ghats): hills, a stream, the Moon and blinking fireflies
   ========================================================= */
let gw = null;
function gwInit(W, H) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  gw = { W, H,
    stars: Array.from({ length: Math.round(W * H / 7000) }, () => ({ x: rnd(0, W), y: rnd(0, H * .5), r: rnd(.3, 1.4), p: rnd(0, 6.28) })),
    flies: Array.from({ length: Math.max(30, Math.round(W / 22)) }, () => ({ x: rnd(0, W), y: rnd(H * .45, H * .95), p: rnd(0, 6.28), sp: rnd(.6, 1.6), vx: rnd(-.3, .3), vy: rnd(-.2, .2), tree: Math.random() < .6 })),
    trees: (() => { const a = []; let x = -20; while (x < W + 40) { const w = rnd(40, 80); a.push({ x, w, h: rnd(90, 200) }); x += w * .7; } return a; })(),
    ridge: Array.from({ length: 12 }, (_, i) => ({ x: i * W / 11, h: rnd(60, 150) })) };
}
SCENES.k7s11_ghats = function (t) {
  const d = devicePixelRatio, W = innerWidth, H = innerHeight, c = bctx; c.setTransform(d, 0, 0, d, 0, 0);
  if (!gw || gw.W !== W || gw.H !== H) gwInit(W, H);
  const S = gw;
  let g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#050b1c"); g.addColorStop(.55, "#0d2033"); g.addColorStop(1, "#0a1a18");
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  S.stars.forEach(s => { c.globalAlpha = .3 + .35 * Math.sin(t / 800 + s.p); c.fillStyle = "#fff"; c.beginPath(); c.arc(s.x, s.y, s.r, 0, 6.28); c.fill(); }); c.globalAlpha = 1;
  // Moon (lit by the Sun)
  const mx = W * .82, my = H * .16, mr = Math.min(W, H) * .055;
  const mg = c.createRadialGradient(mx, my, mr * .8, mx, my, mr * 3); mg.addColorStop(0, "rgba(230,240,255,.22)"); mg.addColorStop(1, "rgba(230,240,255,0)"); c.fillStyle = mg; c.beginPath(); c.arc(mx, my, mr * 3, 0, 6.28); c.fill();
  c.fillStyle = "#e9ecf2"; c.beginPath(); c.arc(mx, my, mr, 0, 6.28); c.fill();
  c.fillStyle = "rgba(160,170,190,.5)"; [[-.3, -.2, .2], [.25, .15, .15], [-.05, .4, .1]].forEach(([a, b, r]) => { c.beginPath(); c.arc(mx + a * mr, my + b * mr, r * mr, 0, 6.28); c.fill(); });
  // far ridge (Sahyadri)
  c.fillStyle = "#0e2230"; c.beginPath(); c.moveTo(0, H * .62); S.ridge.forEach(r => c.lineTo(r.x, H * .62 - r.h)); c.lineTo(W, H * .62); c.lineTo(W, H); c.lineTo(0, H); c.fill();
  // stream with moon glints
  const sy = H * .86; c.fillStyle = "#0d2a3a"; c.beginPath(); c.moveTo(0, sy); for (let x = 0; x <= W; x += 20) c.lineTo(x, sy + Math.sin(x / 90 + t / 2200) * 5); c.lineTo(W, H); c.lineTo(0, H); c.fill();
  c.strokeStyle = "rgba(220,235,255,.25)"; c.lineWidth = 1.5;
  for (let i = 0; i < 8; i++) { const x = mx - 60 + ((i * 37 + t / 40) % 120), y = sy + 10 + i * 4; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 14, y); c.stroke(); }
  // forest silhouettes
  c.fillStyle = "#06120f";
  S.trees.forEach(tr => { const base = H * .8; c.beginPath(); c.moveTo(tr.x, base); c.quadraticCurveTo(tr.x + tr.w / 2, base - tr.h * 1.3, tr.x + tr.w, base); c.fill(); c.fillRect(tr.x + tr.w / 2 - 3, base - 4, 6, 14); });
  c.fillRect(0, H * .8, W, sy - H * .8 + 2);
  // fireflies: synchronised waves of flashing
  c.globalCompositeOperation = "lighter";
  S.flies.forEach(f => {
    if (!RM) { f.x += f.vx + Math.sin(t / 1300 + f.p) * .2; f.y += f.vy + Math.cos(t / 1700 + f.p) * .15; if (f.x < -10) f.x = W + 10; if (f.x > W + 10) f.x = -10; if (f.y < H * .4) f.vy = Math.abs(f.vy); if (f.y > H * .96) f.vy = -Math.abs(f.vy); }
    const wave = Math.sin(t / 900 * f.sp - f.x / 260 + f.p * .3), a = Math.max(0, wave) ** 3;
    if (a < .02) return;
    const rg = c.createRadialGradient(f.x, f.y, 0, f.x, f.y, 10); rg.addColorStop(0, `rgba(210,255,120,${a})`); rg.addColorStop(1, "rgba(210,255,120,0)");
    c.fillStyle = rg; c.beginPath(); c.arc(f.x, f.y, 10, 0, 6.28); c.fill();
  });
  c.globalCompositeOperation = "source-over";
  c.fillStyle = "rgba(3,8,16,.3)"; c.fillRect(0, 0, W, H);
  if (!RM) requestAnimationFrame(drawBg);
};

/* =========================================================
   GUIDE — Kajwa, the firefly of Purushwadi (kajwa = firefly in Marathi)
   ========================================================= */
GUIDES.k7s11_kajwa = () => `<svg class="guide firefly" viewBox="0 0 120 130" aria-hidden="true">
  <defs><radialGradient id="k7s11gl"><stop offset="0" stop-color="#f6ffb0"/><stop offset=".5" stop-color="#c8ff5a" stop-opacity=".8"/><stop offset="1" stop-color="#c8ff5a" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="60" cy="124" rx="26" ry="4" fill="#000" opacity=".25"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2.4s" repeatCount="indefinite"/>
    <circle cx="60" cy="96" r="30" fill="url(#k7s11gl)"><animate attributeName="opacity" values=".3;1;.3" dur="1.8s" repeatCount="indefinite"/></circle>
    <g opacity=".75"><ellipse cx="34" cy="58" rx="22" ry="11" fill="#cfe8ff" transform="rotate(-25 34 58)"><animateTransform attributeName="transform" type="rotate" values="-25 50 64;-45 50 64;-25 50 64" dur=".35s" repeatCount="indefinite"/></ellipse>
      <ellipse cx="86" cy="58" rx="22" ry="11" fill="#cfe8ff" transform="rotate(25 86 58)"><animateTransform attributeName="transform" type="rotate" values="25 70 64;45 70 64;25 70 64" dur=".35s" repeatCount="indefinite"/></ellipse></g>
    <ellipse cx="60" cy="94" rx="15" ry="19" fill="#d8ff6a"><animate attributeName="fill" values="#a6c94a;#f2ff9a;#a6c94a" dur="1.8s" repeatCount="indefinite"/></ellipse>
    <path d="M47 88 H73 M46 96 H74 M48 104 H72" stroke="#8fb03a" stroke-width="1.5"/>
    <ellipse cx="60" cy="68" rx="16" ry="13" fill="#3b2a52"/><path d="M48 64 Q60 56 72 64" stroke="#e04a86" stroke-width="4" fill="none"/>
    <circle cx="60" cy="44" r="17" fill="#2c2140"/>
    <circle cx="53" cy="42" r="6" fill="#fff"/><circle cx="67" cy="42" r="6" fill="#fff"/><circle cx="54" cy="43" r="3.2" fill="#15202a"/><circle cx="68" cy="43" r="3.2" fill="#15202a"/><circle cx="55" cy="41.6" r="1.1" fill="#fff"/><circle cx="69" cy="41.6" r="1.1" fill="#fff"/>
    <rect x="46" y="35" width="28" height="0" fill="#2c2140"><animate attributeName="height" values="0;0;0;12;0" keyTimes="0;.8;.9;.95;1" dur="4.2s" repeatCount="indefinite"/></rect>
    <path d="M53 51 Q60 56 67 51" stroke="#f4a51c" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M52 29 Q46 14 38 12" stroke="#2c2140" stroke-width="2.5" fill="none"/><path d="M68 29 Q74 14 82 12" stroke="#2c2140" stroke-width="2.5" fill="none"/>
    <circle cx="38" cy="12" r="3.5" fill="#f4a51c"/><circle cx="82" cy="12" r="3.5" fill="#f4a51c"/>
    <path d="M46 76 L36 84 M74 76 L84 84 M48 80 L40 92 M72 80 L80 92" stroke="#2c2140" stroke-width="2.5" stroke-linecap="round"/>
  </g>
</svg>`;
})();
