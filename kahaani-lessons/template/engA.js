
const $ = s => document.querySelector(s);
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fx = s => String(s).replace(/\[([^\[\]\/]+)\/([^\[\]\/]+)\]/g,'<span class="fr"><span class="n">$1</span><span class="d">$2</span></span>');
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pad = n => String(n).padStart(2,"0");

const OWL = `<svg class="owl" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse cx="60" cy="124" rx="34" ry="5" fill="#000" opacity=".25"/>
  <ellipse cx="60" cy="76" rx="42" ry="46" fill="#8b5d3b"/>
  <ellipse cx="60" cy="94" rx="26" ry="26" fill="#d9b98a"/>
  <path d="M48 88 q4 4 8 0 M60 88 q4 4 8 0 M52 98 q4 4 8 0 M64 98 q4 4 8 0" stroke="#a9825a" stroke-width="2" fill="none"/>
  <path d="M20 80 Q12 104 34 114 Q26 98 30 80Z" fill="#6f462c"/>
  <path d="M100 80 Q108 104 86 114 Q94 98 90 80Z" fill="#6f462c"/>
  <circle cx="42" cy="58" r="16" fill="#f6ecd6"/><circle cx="78" cy="58" r="16" fill="#f6ecd6"/>
  <g class="pupils"><circle cx="44" cy="60" r="7" fill="#15202a"/><circle cx="80" cy="60" r="7" fill="#15202a"/>
  <circle cx="46" cy="57" r="2" fill="#fff"/><circle cx="82" cy="57" r="2" fill="#fff"/></g>
  <g class="lids"><rect x="26" y="42" width="32" height="32" rx="16" fill="#8b5d3b"/><rect x="62" y="42" width="32" height="32" rx="16" fill="#8b5d3b"/></g>
  <circle cx="78" cy="58" r="19" fill="none" stroke="#f4a51c" stroke-width="3.5"/>
  <path d="M96 66 Q106 88 98 112" stroke="#f4a51c" stroke-width="1.6" fill="none"/>
  <path d="M53 70 L67 70 L60 83Z" fill="#f4a51c"/>
  <path d="M18 40 Q60 -4 102 40Z" fill="#2f6d5a"/>
  <path d="M40 22 Q60 12 80 22" stroke="#24574a" stroke-width="3" fill="none"/>
  <rect x="14" y="36" width="92" height="9" rx="4.5" fill="#24574a"/>
  <circle cx="60" cy="10" r="4" fill="#e04a86"/>
  <ellipse cx="48" cy="121" rx="7" ry="3.5" fill="#f4a51c"/><ellipse cx="72" cy="121" rx="7" ry="3.5" fill="#f4a51c"/>
</svg>`;

function person(p){
  const hair = "#22160f";
  let h = "";
  const top = `<path d="M27 44 Q27 18 50 18 Q73 18 73 44 Q67 30 50 30 Q33 30 27 44Z" fill="${hair}"/>`;
  if(p.hair==="short") h = top;
  if(p.hair==="curly") h = `<g fill="${hair}"><circle cx="34" cy="30" r="9"/><circle cx="44" cy="23" r="9"/><circle cx="56" cy="22" r="9"/><circle cx="66" cy="29" r="9"/><circle cx="30" cy="40" r="6"/><circle cx="70" cy="40" r="6"/></g>`;
  if(p.hair==="long") h = top + `<path d="M27 40 Q22 64 30 74 L37 70 Q31 56 33 42Z M73 40 Q78 64 70 74 L63 70 Q69 56 67 42Z" fill="${hair}"/>`;
  if(p.hair==="bun") h = top + `<circle cx="50" cy="15" r="8" fill="${hair}"/>`;
  if(p.hair==="turban") h = `<path d="M25 42 Q24 14 50 14 Q76 14 75 42 Q63 30 50 35 Q37 30 25 42Z" fill="${p.acc}"/><path d="M30 34 Q50 20 70 34" stroke="rgba(0,0,0,.18)" stroke-width="3" fill="none"/>`;
  const must = p.hair==="turban" && p.name==="Kishanlal" ? `<path d="M41 55 Q50 51 59 55 Q50 58 41 55Z" fill="${hair}"/>` : "";
  return `<svg class="av" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="50" fill="${p.bg}"/>
  <path d="M14 104 Q18 72 50 70 Q82 72 86 104Z" fill="${p.shirt}"/>
  <rect x="44" y="60" width="12" height="12" fill="${p.skin}"/>
  <circle cx="50" cy="45" r="22" fill="${p.skin}"/>
  ${h}
  <circle cx="42" cy="46" r="2.8" fill="#15202a"/><circle cx="58" cy="46" r="2.8" fill="#15202a"/>
  ${must}<path d="M42 56 Q50 62 58 56" stroke="#15202a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  </svg>`;
}


const MASK = `<svg class="mask" viewBox="0 0 220 80" aria-hidden="true">
 <path fill-rule="evenodd" fill="#e04a86" stroke="#f4a51c" stroke-width="4" d="M10 26 Q110 -8 210 26 Q216 64 166 70 Q130 72 110 52 Q90 72 54 70 Q4 64 10 26Z M40 38 Q60 22 86 36 Q66 52 40 38Z M180 38 Q160 22 134 36 Q154 52 180 38Z"/>
 <path d="M10 26 Q-6 10 -2 0 M210 26 Q226 10 222 0" stroke="#f4a51c" stroke-width="3" fill="none"/>
 <circle cx="110" cy="20" r="5" fill="#f4a51c"/></svg>`;

const ICONS = {
 paint:`<svg viewBox="0 0 48 48"><path d="M10 18h28l-3 22H13z" fill="#e04a86"/><ellipse cx="24" cy="18" rx="14" ry="4" fill="#f4a51c"/><path d="M30 6l6 10" stroke="#2a2418" stroke-width="3"/></svg>`,
 biscuit:`<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="#d49a4a"/><g fill="#8a5a2a"><circle cx="18" cy="19" r="2"/><circle cx="29" cy="17" r="2"/><circle cx="24" cy="27" r="2"/><circle cx="16" cy="30" r="2"/><circle cx="31" cy="30" r="2"/></g></svg>`,
 shop:`<svg viewBox="0 0 48 48"><rect x="8" y="30" width="7" height="12" fill="#35c29a"/><rect x="19" y="22" width="7" height="20" fill="#35c29a"/><rect x="30" y="10" width="7" height="32" fill="#e04a86"/><path d="M4 26h40" stroke="#2a2418" stroke-width="2" stroke-dasharray="3 3"/></svg>`,
 label:`<svg viewBox="0 0 48 48"><rect x="10" y="6" width="28" height="36" rx="3" fill="#f4a51c"/><path d="M15 16h18M15 22h18M15 28h12" stroke="#2a2418" stroke-width="2.5"/></svg>`,
 tag:`<svg viewBox="0 0 48 48"><path d="M6 24L22 8h18v18L24 42z" fill="#e04a86"/><circle cx="33" cy="15" r="3" fill="#efdcae"/><text x="16" y="30" font-size="11" font-weight="800" fill="#fff" font-family="Baloo 2, sans-serif">%</text></svg>`,
 coin:`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="38" rx="14" ry="4" fill="#c4860e"/><rect x="10" y="30" width="28" height="8" fill="#f4a51c"/><ellipse cx="24" cy="30" rx="14" ry="4" fill="#ffd166"/><rect x="14" y="20" width="20" height="8" fill="#f4a51c"/><ellipse cx="24" cy="20" rx="10" ry="3" fill="#ffd166"/><path d="M24 4v10M20 8l4-4 4 4" stroke="#35c29a" stroke-width="3" fill="none"/></svg>`,
 cake:`<svg viewBox="0 0 48 48"><rect x="10" y="24" width="28" height="16" rx="2" fill="#e04a86"/><rect x="10" y="20" width="28" height="7" rx="3" fill="#efdcae" stroke="#2a2418" stroke-width="1.5"/><rect x="22" y="10" width="4" height="10" fill="#35c29a"/><path d="M24 4q3 3 0 6q-3-3 0-6" fill="#f4a51c"/></svg>`,
 star:`<svg viewBox="0 0 48 48"><path d="M24 4l6 13 14 2-10 10 3 14-13-7-13 7 3-14L4 19l14-2z" fill="#fff"/></svg>`
};

/* =========================================================
   VISUALS
   ========================================================= */
function V(v){
  if(!v) return "";
  const cap = v.cap ? `<div class="cap">${fx(v.cap)}</div>` : "";
  switch(v.k){
    case "grid":{
      let c=""; for(let i=0;i<100;i++) c+=`<i class="${i<v.n?"on":""}" style="--d:${i<v.n?i*28:0}ms"></i>`;
      return `<div class="v-grid"><div class="g100">${c}</div>${cap}</div>`;
    }
    case "marbles":{
      let c=""; for(let i=0;i<v.n;i++) c+=`<i class="${i<v.w?"w":""}" style="--d:${i*45}ms"></i>`;
      return `<div class="v-marbles"><div class="bag">${c}</div>${cap}</div>`;
    }
    case "unmask":{
      let ch = `<span style="--d:0ms">${fx(v.front)}</span>`;
      v.chain.forEach((c,i)=>{ const d=(i+1)*330; ch += `<b style="--d:${d-150}ms">=</b><span class="${i===v.chain.length-1?"last":""}" style="--d:${d}ms">${fx(c)}</span>`; });
      return `<div class="v-unmask" data-auto="${v.auto?1:0}"><div class="suspect"><span>${fx(v.front)}</span>${MASK}</div><div class="chain">${ch}</div><div class="cap">${v.auto?"Unmasking…":"Solve the clue to pull off the mask"}</div></div>`;
    }
    case "bar":{
      const segs = v.parts.map((p,i)=>`<div class="seg c-${p.c}" style="flex:0 0 ${p.w*100}%;--d:${i*350}ms"><span>${fx(p.l)}</span></div>`).join("");
      const tk = (arr,cls) => arr ? `<div class="tk ${cls}">${arr.map(([at,t])=>`<span style="left:${at*100}%">${fx(t)}</span>`).join("")}</div>` : "";
      return `<div class="v-bar">${tk(v.top,"t")}<div class="track">${segs}</div>${tk(v.bot,"b")}${cap}</div>`;
    }
    case "bars":{
      const line = v.line ? `<i class="ln" style="left:${v.line/v.max*100}%"></i>` : "";
      const rows = v.items.map((it,i)=>{
        const w = Math.min(it.v/v.max,1)*100;
        let bg = it.c==="rani"?"var(--rani)":it.c==="sky"?"var(--sky)":"var(--mari)";
        if(v.line && it.v>v.line){ const s=v.line/it.v*100; bg=`linear-gradient(90deg,var(--mari) ${s}%,var(--rani) ${s}%)`; }
        return `<div class="row"><span>${esc(it.l)}</span><div class="tr"><div class="fill ${w<42?"short":""}" style="width:${w}%;background:${bg};--d:${i*300}ms"><em>${esc(it.t)}</em></div>${line}</div></div>`;
      }).join("");
      const lab = v.line ? `<div class="lnl"><span style="left:${v.line/v.max*100}%">${esc(v.lineLabel||"")}</span></div>` : "";
      return `<div class="v-bars">${lab}${rows}${cap}</div>`;
    }
    case "growth":{
      const A=[6000,6600,7200,7800], B=[6000,6600,7260,7986], base=5000, top=8200;
      const h = x => ((x-base)/(top-base)*100).toFixed(1);
      const cols = A.map((a,i)=>`<div class="yr"><div style="height:${h(a)}%;background:var(--sky);--d:${i*260}ms"><em>₹${a}</em></div><div style="height:${h(B[i])}%;background:var(--mari);--d:${i*260+130}ms"><em>₹${B[i]}</em></div></div>`).join("");
      return `<div class="v-growth"><div class="cols">${cols}</div><div class="lab"><span>Start</span><span>Year 1</span><span>Year 2</span><span>Year 3</span></div>
      <div class="legend"><span><i style="background:var(--sky)"></i>Interest paid out (total received)</span><span><i style="background:var(--mari)"></i>Compounded</span></div><div class="cap">Bars start at ₹5,000 to show the gap</div></div>`;
    }
    case "chain":{
      const S=[["Manufacturer","CP ₹230","MP ₹255","SP ₹253"],["Wholesaler","CP ₹253","MP ₹310","SP ₹300"],["Retailer","CP ₹300","MP ₹480","SP ₹430"],["Customer","pays","₹430",""]];
      return `<div class="v-chain">${S.map((s,i)=>`<div class="st" style="--d:${i*300}ms"><h4>${s[0]}</h4><div>${s.slice(1).filter(Boolean).join("<br>")}</div></div>`).join("")}</div>`;
    }
    case "lines":
      return `<div class="v-lines">${v.l.map((l,i)=>`<div class="ln2 ${i===v.l.length-1&&v.l.length>1?"hl":""}" style="--d:${i*320}ms">${fx(l)}</div>`).join("")}</div>`;
    case "table":{
      let k=0; const head = v.head ? `<tr>${v.head.map(h=>`<th>${fx(h)}</th>`).join("")}</tr>` : "";
      const rows = (v.rows||[]).map(r=>`<tr>${r.map(c=>`<td style="--d:${(k++)*60}ms">${fx(c)}</td>`).join("")}</tr>`).join("");
      return `<div class="v-table"><table>${head}${rows}</table>${cap}</div>`;
    }
    case "sim":
      return `<div class="simhost"></div>`;
    case "svg":
      return `<div class="v-svg">${v.svg}${cap}</div>`;
    case "packs":{
      const P=[{n:"DEF",bg:"#e2553f",r:[["Sugar","99 g"],["Milk solids","30 g"],["Badam powder","12 g"],["Food chemicals","9 g"]],t:"150 g"},
               {n:"Zacni",bg:"#f4c430",r:[["Sugar","272 g"],["Milk solids","64 g"],["Badam","40 g"],["Food chemicals","24 g"]],t:"400 g"}];
      return `<div class="v-packs">${P.map((p,i)=>`<div class="pack" style="background:${p.bg};--d:${i*250}ms"><h4>${p.n} Badam Mix</h4><table>${p.r.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}<tr class="t"><td>Total weight</td><td>${p.t}</td></tr></table></div>`).join("")}</div>`;
    }
  }
  return "";
}
function revealVis(){ const u = $("#vis .v-unmask"); if(u && !u.classList.contains("rev")){ u.classList.add("rev"); const c=u.querySelector(".cap"); if(c) c.textContent="Unmasked!"; sfx.whoosh(); } }

/* =========================================================
   SOUND
   ========================================================= */
let AC=null, soundOn=true;
function ac(){ if(!AC){ try{ AC=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } if(AC&&AC.state==="suspended") AC.resume(); return AC; }
function tone(f,dur,type="sine",vol=.12,when=0){
  if(!soundOn) return; const a=ac(); if(!a) return;
  const t=a.currentTime+when, o=a.createOscillator(), g=a.createGain();
  o.type=type; o.frequency.setValueAtTime(f,t);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+.01); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t+dur+.05);
}
function noise(dur,vol=.1,from=800,to=3000){
  if(!soundOn) return; const a=ac(); if(!a) return;
  const n=a.sampleRate*dur, buf=a.createBuffer(1,n,a.sampleRate), d=buf.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*(1-i/n);
  const s=a.createBufferSource(); s.buffer=buf; const f=a.createBiquadFilter(); f.type="bandpass";
  f.frequency.setValueAtTime(from,a.currentTime); f.frequency.exponentialRampToValueAtTime(to,a.currentTime+dur);
  const g=a.createGain(); g.gain.value=vol; s.connect(f).connect(g).connect(a.destination); s.start();
}
const sfx = {
  good(){ [523,659,784,1047].forEach((f,i)=>tone(f,.22,"triangle",.11,i*.075)); },
  bad(){ tone(196,.22,"sawtooth",.06); tone(147,.3,"sawtooth",.05,.12); },
  tick(){ tone(1200,.04,"square",.03); },
  whoosh(){ noise(.45,.12,400,4000); },
  stamp(){ noise(.18,.35,150,90); tone(80,.2,"sine",.2); },
  fanfare(){ [392,523,659,784,659,784,1047].forEach((f,i)=>tone(f,.28,"triangle",.1,i*.12)); }
};
const SND_ON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 8q3 4 0 8M19 5q5 7 0 14"/></svg>`;
const SND_OFF = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6"/></svg>`;
function drawSnd(){ $("#sndBtn").innerHTML = soundOn?SND_ON:SND_OFF; $("#sndBtn").setAttribute("aria-label", soundOn?"Sound on":"Sound off"); if(typeof renderSide==="function" && $("#side").innerHTML) renderSide(); }

/* =========================================================
   CONFETTI + BACKGROUND
   ========================================================= */
const fxc=$("#fx"), fctx=fxc.getContext("2d"); let parts=[], fxRun=false;
function sizeFx(){ fxc.width=innerWidth*devicePixelRatio; fxc.height=innerHeight*devicePixelRatio; }
function burst(x,y,n=90){
  if(RM) return;
  const cols=["#f4a51c","#e04a86","#35c29a","#efdcae","#62b6e8"];
  for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2, s=4+Math.random()*9;
    parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6,g:.28,r:Math.random()*6.28,vr:(Math.random()-.5)*.3,c:cols[i%5],t:Math.random()<.3?"%":(Math.random()<.5?"r":"c"),life:120+Math.random()*40,sz:6+Math.random()*7}); }
  if(!fxRun){ fxRun=true; requestAnimationFrame(fxLoop); }
}
function fxLoop(){
  const d=devicePixelRatio; fctx.clearRect(0,0,fxc.width,fxc.height);
  parts.forEach(p=>{ p.vy+=p.g; p.vx*=.985; p.x+=p.vx; p.y+=p.vy; p.r+=p.vr; p.life--;
    fctx.save(); fctx.translate(p.x*d,p.y*d); fctx.rotate(p.r); fctx.globalAlpha=Math.min(1,p.life/40); fctx.fillStyle=p.c;
    if(p.t==="%"){ fctx.font=`800 ${p.sz*2.4*d}px "Baloo 2", sans-serif`; fctx.fillText((typeof BOOK!=="undefined"&&BOOK.subj==="Maths")?"%":"✦",0,0); }
    else if(p.t==="r") fctx.fillRect(-p.sz*d/2,-p.sz*d/4,p.sz*d,p.sz*d/2);
    else { fctx.beginPath(); fctx.arc(0,0,p.sz*d/2.6,0,6.28); fctx.fill(); }
    fctx.restore(); });
  parts=parts.filter(p=>p.life>0&&p.y<innerHeight+60);
  if(parts.length) requestAnimationFrame(fxLoop); else { fxRun=false; fctx.clearRect(0,0,fxc.width,fxc.height); }
}
const bgc=$("#bg"), bctx=bgc.getContext("2d"); let lanterns=[], roofs=[];
function sizeBg(){
  bgc.width=innerWidth*devicePixelRatio; bgc.height=innerHeight*devicePixelRatio;
  lanterns=Array.from({length:Math.round(innerWidth/70)},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:2+Math.random()*4,s:.15+Math.random()*.35,ph:Math.random()*6.28,c:Math.random()<.7?"244,165,28":"224,74,134"}));
  roofs=[]; let x=-20; while(x<innerWidth+40){ const w=50+Math.random()*90, h=40+Math.random()*80, dome=Math.random()<.25; roofs.push({x,w,h,dome}); x+=w-6; }
}
function drawBg(t){
  const d=devicePixelRatio, W=innerWidth, H=innerHeight; bctx.setTransform(d,0,0,d,0,0);
  const g=bctx.createLinearGradient(0,0,0,H); g.addColorStop(0,"#0c1e2e"); g.addColorStop(.7,"#0f2436"); g.addColorStop(1,"#1a3a50");
  bctx.fillStyle=g; bctx.fillRect(0,0,W,H);
  lanterns.forEach(l=>{ if(!RM){ l.y-=l.s; l.x+=Math.sin(t/1400+l.ph)*.25; if(l.y<-20){l.y=H+20;l.x=Math.random()*W;} }
    const a=.35+.25*Math.sin(t/700+l.ph); const rg=bctx.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r*6);
    rg.addColorStop(0,`rgba(${l.c},${a})`); rg.addColorStop(1,`rgba(${l.c},0)`); bctx.fillStyle=rg; bctx.beginPath(); bctx.arc(l.x,l.y,l.r*6,0,6.28); bctx.fill(); });
  bctx.fillStyle="rgba(6,16,26,.55)";
  roofs.forEach(r=>{ const y=H-r.h; bctx.fillRect(r.x,y,r.w,r.h);
    if(r.dome){ bctx.beginPath(); bctx.ellipse(r.x+r.w/2,y,r.w/3,r.w/3,0,Math.PI,0); bctx.fill(); bctx.fillRect(r.x+r.w/2-1.5,y-r.w/3-12,3,12); }
    else { bctx.beginPath(); bctx.moveTo(r.x-4,y); bctx.lineTo(r.x+r.w/2,y-18); bctx.lineTo(r.x+r.w+4,y); bctx.fill(); } });
  bctx.fillStyle="rgba(244,165,28,.22)";
  roofs.forEach((r,i)=>{ if(i%2) bctx.fillRect(r.x+r.w*.3,H-r.h*.6,6,8); });
  if(!RM) requestAnimationFrame(drawBg);
}


/* =========================================================
   NARRATOR — reads everything aloud (Web Speech API)
   ========================================================= */
const TTS = { ok: typeof window!=="undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance!=="undefined", on:true, rate:1, voice:null, token:0 };
try{ if(localStorage.getItem("casebook-voice")==="off") TTS.on=false; const r=parseFloat(localStorage.getItem("casebook-rate")); if(r) TTS.rate=r; }catch(e){}
const INDIAN_NAMES=/india|indian|neerja|prabhat|heera|ravi|rishi|veena|kajal|aditi|raveena|swara|madhur|kavya|aarav|ananya|lekha/i;
function voiceScore(v){
  let sc=0; const lang=(v.lang||"").replace("_","-");
  if(/^en-IN/i.test(lang)) sc+=100;
  if(INDIAN_NAMES.test(v.name)) sc+=80;
  if(/^hi-IN/i.test(lang)) sc+=(typeof BOOK!=="undefined"&&BOOK.lang==="hi")?250:35;
  if(/natural|neural|online|premium|enhanced|google/i.test(v.name)) sc+=15;
  if(/^en-GB/i.test(lang)) sc+=8; else if(/^en/i.test(lang)) sc+=5;
  return sc;
}
function voiceList(){ if(!TTS.ok) return []; return speechSynthesis.getVoices().filter(v=>/^(en|hi)/i.test(v.lang)).sort((a,b)=>voiceScore(b)-voiceScore(a)); }
function hasIndianVoice(){ return voiceList().some(v=>voiceScore(v)>=80); }
function pickVoice(){
  if(!TTS.ok) return; const vs=voiceList(); if(!vs.length) return;
  let saved=null; try{ saved=localStorage.getItem("casebook-voicename"); }catch(e){}
  TTS.voice = (saved && vs.find(v=>v.name===saved)) || vs[0];
  if(typeof renderSide==="function" && document.querySelector("#side") && document.querySelector("#side").innerHTML) renderSide();
}
function setVoiceName(n){ const v=voiceList().find(x=>x.name===n); if(v){ TTS.voice=v; try{ localStorage.setItem("casebook-voicename",n); }catch(e){} } }
const VOICE_TIP="No Indian English voice was found on this device. For a natural Indian accent, open this page in Microsoft Edge (choose the Neerja or Prabhat voice), or add the “English (India)” voice in your computer’s or phone’s speech settings.";
if(TTS.ok){ pickVoice(); try{ speechSynthesis.addEventListener("voiceschanged",pickVoice); }catch(e){ speechSynthesis.onvoiceschanged=pickVoice; } }
function voiceFor(who){
  if(!who||who==="owl") return {pitch:0.9, rate:0.96};
  let h=0; for(const c of who) h=(h*31+c.charCodeAt(0))%101;
  return {pitch:1.05+(h%5)*0.06, rate:1.0};
}
const SUPD={"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","ⁿ":"n","ᵗ":"t","⁻":"minus "};
const UNITW={cm:"centimetres",m:"metres",km:"kilometres",mm:"millimetres",in:"inches",ft:"feet"};
function powWord(p){ p=p.trim(); return p==="2"?" squared":p==="3"?" cubed":" to the power "+p; }
function sayable(html){
  let s=String(html||"");
  s=s.replace(/<sup>([^<]+)<\/sup>/gi,(_,p)=>powWord(p)).replace(/<sub>([^<]+)<\/sub>/gi," $1").replace(/<[^>]+>/g," ");
  s=s.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g," and ").replace(/&nbsp;/g," ");
  s=s.replace(/\b(\d+(?:\.\d+)?)\s?(cm|mm|km|m|in|ft)([²³])/g,(_,n,u,p)=>`${n} ${p==="²"?"square":"cubic"} ${UNITW[u]}`);
  s=s.replace(/\b(cm|mm|km|m|in|ft)([²³])/g,(_,u,p)=>`${p==="²"?"square":"cubic"} ${UNITW[u]}`);
  s=s.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹ⁿᵗ⁻]+)/g,m=>powWord(m.split("").map(c=>SUPD[c]).join("")));
  s=s.replace(/\[([^\[\]\/]+)\/([^\[\]\/]+)\]/g," $1 over $2 ");
  s=s.replace(/(\d+(?:\.\d+)?)\s?\/\s?(\d+(?:\.\d+)?)/g," $1 over $2 ");
  s=s.replace(/₹\s?([\d,]+(?:\.\d+)?)/g,"$1 rupees").replace(/₹/g," rupees ");
  s=s.replace(/(\d)\s*::\s*(\d)/g,"$1, as ").replace(/(\d)\s*:\s*(?=\d)/g,"$1 to ");
  s=s.replace(/√\s?\(?/g," square root of ");
  const R=[["×"," times "],["÷"," divided by "],["−"," minus "],["–"," to "],["≠"," is not equal to "],["≈"," is about "],["≤"," is less than or equal to "],["≥"," is greater than or equal to "],
    ["≅"," is congruent to "],["∠"," angle "],["△"," triangle "],["Δ"," triangle "],["°"," degrees"],["π"," pi "],["↔"," corresponds to "],["→"," gives "],["∥"," is parallel to "],["⊥"," is perpendicular to "],
    ["%"," percent"],["…"," ... "],["="," equals "],["<"," is less than "],[">"," is greater than "],["±"," plus or minus "],["θ"," theta "],["|"," "],["_"," blank "]];
  R.forEach(([a,b])=>{ s=s.split(a).join(b); });
  s=s.replace(/(\d)\s*\+\s*/g,"$1 plus ").replace(/\s\+\s/g," plus ");
  s=s.replace(/(^|[^A-Za-z])([A-Z]{2,4})(?=[^A-Za-z]|$)/g,(m,p,w)=>p+w.split("").join(" "));
  s=s.replace(/\bp\.\s?(\d)/g,"page $1").replace(/\bQ(\d)/g,"question $1").replace(/\bFIO\b/g,"Figure it Out");
  return s.replace(/\s+/g," ").trim();
}
function stopTalk(){ TTS.token++; if(TTS.ok){ try{ speechSynthesis.cancel(); }catch(e){} } document.querySelectorAll(".talking").forEach(e=>e.classList.remove("talking")); }
function speak(text, who, onProgress){
  const tok=TTS.token;
  return new Promise(res=>{
    if(!TTS.ok||!TTS.on){ res(false); return; }
    const spoken=sayable(text); if(!spoken){ res(true); return; }
    const parts=spoken.match(/[^.!?;]+[.!?;]*\s*/g)||[spoken];
    const vc=voiceFor(who); let i=0, done=0; const total=spoken.length;
    const next=()=>{
      if(tok!==TTS.token){ res(false); return; }
      if(i>=parts.length){ res(true); return; }
      const part=parts[i], u=new SpeechSynthesisUtterance(part);
      if(TTS.voice){ u.voice=TTS.voice; u.lang=TTS.voice.lang; } else u.lang=(typeof BOOK!=="undefined"&&BOOK.lang==="hi")?"hi-IN":"en-IN";
      u.rate=Math.min(2,TTS.rate*vc.rate); u.pitch=vc.pitch;
      let fin=false; const base=done;
      const end=()=>{ if(fin) return; fin=true; clearTimeout(guard); done+=part.length; i++; next(); };
      const guard=setTimeout(end, 2500 + part.length*95/TTS.rate);
      u.onboundary=e=>{ if(onProgress && typeof e.charIndex==="number") onProgress((base+e.charIndex)/total); };
      u.onend=end; u.onerror=end;
      try{ speechSynthesis.speak(u); }catch(e){ end(); }
    };
    next();
  });
}
const wait = ms => new Promise(r=>setTimeout(r, RM?0:ms));

/* =========================================================
   SIMULATIONS — interactive, animated, scriptable (xa)
   ========================================================= */
const fmtN = (n,d=2)=>{ if(!isFinite(n)) return "—"; const r=Math.round(n*10**d)/10**d; return r.toLocaleString("en-IN",{maximumFractionDigits:d}); };
function gcdI(a,b){ a=Math.abs(Math.round(a)); b=Math.abs(Math.round(b)); while(b){ [a,b]=[b,a%b]; } return a||1; }
function pctFrac(p){
  let num=p, den=100, k=0; while(Math.abs(num-Math.round(num))>1e-9 && k<4){ num*=10; den*=10; k++; }
  num=Math.round(num); const g=gcdI(num,den);
  return {raw:`[${fmtN(p)}/100]`, simp:`[${num/g}/${den/g}]`, same:(den/g===100)};
}
const clampN=(x,a,b)=>Math.max(a,Math.min(b,x));
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
function niceRange(x){
  const v=Math.max(1,Math.abs(x||1)); const pw=Math.pow(10,Math.floor(Math.log10(v)));
  const max=Math.max(10,Math.ceil(v*2/pw)*pw); const step=v<20?1:pw/10>=1?pw/10:1;
  return [0,max,step];
}
const T=(x,y,s,o={})=>`<text x="${x}" y="${y}" fill="${o.fill||"var(--ink)"}" font-size="${o.size||13}" font-family="Mulish, sans-serif" font-weight="${o.w||700}" text-anchor="${o.a||"middle"}"${o.cls?` class="${o.cls}"`:""}>${s}</text>`;
const svgFr = s => String(s).replace(/\[([^\[\]\/]+)\/([^\[\]\/]+)\]/g,"$1/$2");

const SIM_DEF = {
/* ---------- 1. lamp grid ---------- */
hundred:{
  def:{p:0,color:"mari",label:""}, rng:{p:()=>[0,400,1]}, lab:{p:"Percent lit"},
  reads:{frac:"Fraction",dec:"Decimal",pct:"Percent"},
  draw(D,P,sh,hl){
    const p=clampN(D.p,0,400), grids=clampN(Math.ceil(Math.max(P.p,D.p)/100)||1,1,4);
    const gw=210, W=grids*gw+10, H=236; let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="lamp grid">`;
    const col = P.color==="rani"?"var(--rani)":P.color==="teal"?"var(--teal)":P.color==="sky"?"var(--sky)":"var(--mari)";
    for(let g=0;g<grids;g++){
      const ox=10+g*gw, oy=26;
      s+=T(ox+100,16,grids>1?`${P.label||"Grid"} ${g+1}`:(P.label||"100 lamps"),{size:12,fill:"var(--muted)"});
      s+=`<rect x="${ox-4}" y="${oy-4}" width="208" height="208" rx="10" fill="rgba(255,255,255,.03)" stroke="var(--line)"/>`;
      for(let i=0;i<100;i++){
        const idx=g*100+i, x=ox+10+(i%10)*20, y=oy+12+Math.floor(i/10)*20;
        const lit = idx < Math.floor(p) ? 1 : (idx===Math.floor(p) ? p-Math.floor(p) : 0);
        s+=`<path d="M${x-7} ${y+2} Q${x} ${y+10} ${x+7} ${y+2} Z" fill="${lit?"#c0782e":"#35536b"}"/>`;
        if(lit>0) s+=`<circle cx="${x}" cy="${y-1}" r="8" fill="${col}" opacity="${.18*lit}"/><path d="M${x} ${y-7} Q${x+4} ${y-1} ${x} ${y+1} Q${x-4} ${y-1} ${x} ${y-7}Z" fill="${col}" opacity="${lit}"${hl==="lit"?' class="hl"':""}/>`;
      }
    }
    s+="</svg>";
    const f=pctFrac(P.p);
    return {svg:s, reads:{frac:`${f.raw}${f.same?"":" = "+f.simp}`, dec:fmtN(P.p/100,4), pct:`${fmtN(P.p)}%`}};
  }
},
/* ---------- 2. fraction bar with % ruler ---------- */
fracbar:{
  def:{a:1,b:4}, rng:{a:(P)=>[0,Math.max(3*P.b,6),1], b:()=>[1,20,1]}, lab:{a:"Shaded parts (a)",b:"Equal parts (b)"},
  reads:{frac:"Fraction",eq:"Out of 100",pct:"Percent"},
  draw(D,P,sh,hl){
    const b=Math.max(1,Math.round(D.b)), a=clampN(D.a,0,3*b), wholes=Math.max(1,Math.ceil(Math.max(a,P.a)/b-1e-9));
    const W=420, x0=20, ww=380/wholes, pw=ww/b;
    let s=`<svg viewBox="0 0 ${W} 200">`;
    for(let w=0;w<wholes;w++) for(let j=0;j<b;j++){
      const idx=w*b+j, x=x0+w*ww+j*pw, f= idx<Math.floor(a)?1:(idx===Math.floor(a)?a-Math.floor(a):0);
      s+=`<rect x="${x}" y="40" width="${pw}" height="52" fill="rgba(255,255,255,.04)" stroke="var(--ink)" stroke-opacity=".5"/>`;
      if(f>0) s+=`<rect x="${x}" y="40" width="${pw*f}" height="52" fill="var(--mari)" data-part="shade"${hl==="shade"?' class="hl"':""}/>`;
    }
    for(let w=0;w<wholes;w++) s+=`<rect x="${x0+w*ww}" y="40" width="${ww}" height="52" fill="none" stroke="var(--ink)" stroke-width="2.5"/>`;
    s+=T(x0,28,`${wholes>1?wholes+" wholes, ":""}each cut into ${b} equal parts`,{a:"start",size:12,fill:"var(--muted)"});
    s+=`<line x1="${x0}" y1="122" x2="${x0+380}" y2="122" stroke="var(--muted)" stroke-width="2"/>`;
    for(let w=0;w<wholes;w++) for(let k=0;k<=4;k++){ if(w>0&&k===0) continue; const x=x0+w*ww+k*ww/4; s+=`<line x1="${x}" y1="116" x2="${x}" y2="128" stroke="var(--muted)" stroke-width="2"/>`+T(x,146,`${w*100+k*25}%`,{size:11,fill:"var(--muted)"}); }
    const px=x0+(a/b)*ww, pc=a/b*100;
    if(sh.has("pct")) s+=`<g data-part="pointer"${hl==="pointer"?' class="hl"':""}><line x1="${px}" y1="92" x2="${px}" y2="118" stroke="var(--rani)" stroke-width="3"/><path d="M${px-8} 170 L${px+8} 170 L${px} 156 Z" fill="var(--rani)"/>${T(px,190,sh.has("pct")?fmtN(pc)+"%":"?",{fill:"var(--rani)",size:14})}</g>`;
    s+="</svg>";
    return {svg:s, reads:{frac:`[${fmtN(P.a)}/${P.b}]`, eq:`[${fmtN(P.a/P.b*100)}/100]`, pct:`${fmtN(P.a/P.b*100)}%`}};
  }
},
/* ---------- 3. p% of a quantity ---------- */
partof:{
  def:{q:100,p:25,unit:"",pre:"",lw:"",lp:""}, rng:{p:()=>[0,300,1], q:(P,I)=>niceRange(I.q)}, lab:{p:"Percent",q:"Whole quantity"},
  reads:{amount:"Answer",formula:"Working"},
  draw(D,P,sh,hl){
    const q=D.q, p=clampN(D.p,0,300), span=Math.max(100,Math.max(P.p,D.p)), sc=380/span, x0=20;
    const u=P.unit?` ${P.unit}`:"", q2=v=>`${P.pre||""}${fmtN(v)}${u}`;
    let s=`<svg viewBox="0 0 420 210">`;
    s+=T(x0,24,P.lw?`${P.lw}: ${q2(P.q)} = 100%`:`Whole = ${q2(P.q)} = 100%`,{a:"start",size:13,fill:"var(--muted)"});
    s+=`<rect x="${x0}" y="64" width="${100*sc}" height="54" rx="6" fill="rgba(255,255,255,.05)" stroke="var(--ink)" stroke-width="2.5" data-part="whole"${hl==="whole"?' class="hl"':""}/>`;
    const pin=Math.min(p,100);
    s+=`<rect x="${x0}" y="64" width="${pin*sc}" height="54" rx="6" fill="var(--mari)" data-part="part"${hl==="part"?' class="hl"':""}/>`;
    if(p>100) s+=`<rect x="${x0+100*sc}" y="64" width="${(p-100)*sc}" height="54" rx="6" fill="var(--rani)" data-part="part"${hl==="part"?' class="hl"':""}/>`;
    if(P.lp && pin*sc>70) s+=T(x0+pin*sc/2,96,P.lp,{fill:"#2a1a00",size:13});
    const ticks=[0,25,50,75,100]; for(let t=200;t<=span;t+=100) ticks.push(t);
    ticks.forEach(t=>{ const x=x0+t*sc, an=x>385?"end":(x<30?"start":"middle"); s+=`<line x1="${x}" y1="56" x2="${x}" y2="126" stroke="var(--ink)" stroke-opacity=".35" stroke-dasharray="3 3"/>`+T(x,50,`${t}%`,{size:11,fill:"var(--muted)",a:an})+((sh.has("amount")||t===0||t===100)?T(x,144,q2(P.q*t/100),{size:11,fill:"var(--muted)",a:an}):""); });
    const px=x0+p*sc;
    s+=`<path d="M${px-8} 176 L${px+8} 176 L${px} 162 Z" fill="var(--rani)"/>`+T(clampN(px,60,360),198,`${fmtN(P.p)}% → ${sh.has("amount")?q2(P.q*P.p/100):"?"}`,{fill:"var(--rani)",size:14});
    s+="</svg>";
    return {svg:s, reads:{amount:`${fmtN(P.p)}% of ${q2(P.q)} = ${q2(P.q*P.p/100)}`, formula:`[${fmtN(P.p)}/100] × ${fmtN(P.q)} = ${fmtN(P.q*P.p/100)}`}};
  }
},
/* ---------- 4. increase / decrease ---------- */
change:{
  def:{from:100,to:120,unit:"",pre:"",lf:"Original",lt:"New"}, rng:{from:(P,I)=>niceRange(Math.max(I.from,I.to)),to:(P,I)=>niceRange(Math.max(I.from,I.to))}, lab:{from:"Original value",to:"New value"},
  reads:{diff:"Change",pct:"Percentage change",ratio:"New as % of original"},
  draw(D,P,sh,hl){
    const mx=Math.max(D.from,D.to,1)*1.12, sc=360/mx, x0=24, u=P.unit?` ${P.unit}`:"", q2=v=>`${P.pre||""}${fmtN(v)}${u}`;
    let s=`<svg viewBox="0 0 420 200">`;
    s+=T(x0,26,`${P.lf||"Original"}: ${q2(P.from)}`,{a:"start",size:13,fill:"var(--sky)"});
    s+=`<rect x="${x0}" y="34" width="${D.from*sc}" height="42" rx="6" fill="var(--sky)" data-part="from"${hl==="from"?' class="hl"':""}/>`;
    s+=T(x0,112,`${P.lt||"New"}: ${q2(P.to)}`,{a:"start",size:13,fill:"var(--mari)"});
    s+=`<rect x="${x0}" y="120" width="${D.to*sc}" height="42" rx="6" fill="var(--mari)" data-part="to"${hl==="to"?' class="hl"':""}/>`;
    const d=D.to-D.from, dl=hl==="diff"?' class="hl"':"";
    if(d>0) s+=`<rect x="${x0+D.from*sc}" y="120" width="${d*sc}" height="42" rx="4" fill="var(--rani)" data-part="diff"${dl}/>`;
    else if(d<0) s+=`<rect x="${x0+D.to*sc}" y="34" width="${-d*sc}" height="42" rx="4" fill="var(--rani)" fill-opacity=".75" data-part="diff"${dl}/>`;
    s+=`<line x1="${x0+D.from*sc}" y1="26" x2="${x0+D.from*sc}" y2="172" stroke="var(--ink)" stroke-dasharray="4 4" stroke-opacity=".6"/>`;
    if(Math.abs(d)>0.001) s+=T(x0+Math.min(D.from,D.to)*sc+Math.abs(d)*sc/2, 192, sh.has("diff")?`${d>0?"+":"−"}${q2(Math.abs(P.to-P.from))}`:(d>0?"increase ?":"decrease ?"),{fill:"var(--rani)",size:13});
    s+="</svg>";
    const dd=P.to-P.from, pc=P.from?Math.abs(dd)/P.from*100:0;
    return {svg:s, reads:{diff:`${dd>=0?"Increase":"Decrease"} = ${q2(Math.abs(dd))}`, pct:`${dd>=0?"Increase":"Decrease"} % = [${fmtN(Math.abs(dd))}/${fmtN(P.from)}] × 100 = ${fmtN(pc)}%`, ratio:`New = ${fmtN(P.from?P.to/P.from*100:0)}% of original`}};
  }
},
/* ---------- 5. shop: CP, MP, discount, SP ---------- */
shop:{
  def:{cp:100,mp:150,disc:0}, rng:{cp:(P,I)=>niceRange(Math.max(I.cp,I.mp)),mp:(P,I)=>niceRange(Math.max(I.cp,I.mp)),disc:()=>[0,90,1]}, lab:{cp:"Cost price (₹)",mp:"Marked price (₹)",disc:"Discount %"},
  reads:{sp:"Selling price",pl:"Profit / loss",plpct:"Profit / loss %"},
  draw(D,P,sh,hl){
    const sp=D.mp*(1-D.disc/100), SP=P.mp*(1-P.disc/100), mx=Math.max(D.cp,D.mp,sp,1)*1.1, sc=360/mx, x0=30;
    let s=`<svg viewBox="0 0 420 230">`;
    s+=`<path d="M10 22 Q210 44 410 22" stroke="var(--muted)" stroke-width="2" fill="none"/>`;
    const tag=(x,lbl,val,part,col)=>{ const h=hl===part?' class="hl"':""; return `<g data-part="${part}"${h}><line x1="${x}" y1="30" x2="${x}" y2="44" stroke="var(--muted)"/><path d="M${x-60} 48 L${x+44} 48 L${x+60} 70 L${x+44} 92 L${x-60} 92 Z" fill="${col}"/><circle cx="${x+44}" cy="70" r="4" fill="var(--night)"/>${T(x-8,65,lbl,{size:10.5,fill:"#1d160a"})}${T(x-8,85,val,{size:16,fill:"#1d160a",w:800})}</g>`; };
    s+=tag(76,"COST PRICE","₹"+fmtN(P.cp),"cp","var(--sky)")+tag(210,"MARKED PRICE","₹"+fmtN(P.mp),"mp","var(--manila)")+tag(344,"SELLING PRICE",sh.has("sp")?"₹"+fmtN(SP):"₹ ?","sp","var(--mari)")+(P.disc?T(344,110,`after ${fmtN(P.disc)}% discount`,{size:11,fill:"var(--mari)"}):"");
    s+=`<line x1="${x0}" y1="160" x2="${x0+360}" y2="160" stroke="var(--line)" stroke-width="10" stroke-linecap="round"/>`;
    const a=Math.min(D.cp,sp), b=Math.max(D.cp,sp), prof=sp>=D.cp;
    s+=`<rect x="${x0+a*sc}" y="150" width="${(b-a)*sc}" height="20" rx="4" fill="${prof?"var(--teal)":"var(--red)"}" data-part="meter"${hl==="meter"?' class="hl"':""}/>`;
    s+=`<line x1="${x0+D.cp*sc}" y1="136" x2="${x0+D.cp*sc}" y2="184" stroke="var(--sky)" stroke-width="3"/>`+T(x0+D.cp*sc,132,"CP",{fill:"var(--sky)",size:12});
    s+=`<line x1="${x0+sp*sc}" y1="136" x2="${x0+sp*sc}" y2="184" stroke="var(--mari)" stroke-width="3"/>`+T(x0+sp*sc,200,"SP",{fill:"var(--mari)",size:12});
    const pl=SP-P.cp;
    s+=T(210,222, sh.has("pl")||sh.has("plpct") ? `${pl>=0?"Profit":"Loss"} ₹${fmtN(Math.abs(pl))}${sh.has("plpct")?` = ${fmtN(Math.abs(pl)/P.cp*100)}% of CP`:""}` : (Math.abs(pl)<.005?"":`${pl>=0?"Profit":"Loss"} = ?`),{size:14,fill:prof?"var(--teal)":"var(--red)"});
    s+="</svg>";
    return {svg:s, reads:{sp:`SP = ₹${fmtN(P.mp)}${P.disc?` × (1 − ${fmtN(P.disc)}%)`:""} = ₹${fmtN(SP)}`, pl:`${pl>=0?"Profit":"Loss"} = ₹${fmtN(Math.abs(pl))}`, plpct:`${pl>=0?"Profit":"Loss"} % = [${fmtN(Math.abs(pl))}/${fmtN(P.cp)}] × 100 = ${fmtN(Math.abs(pl)/P.cp*100)}%`}};
  }
},
/* ---------- 6. compounding / depreciation ---------- */
compound:{
  def:{p:1000,r:10,t:3,mode:"both",dir:"grow"}, rng:{p:(P,I)=>niceRange(I.p),r:()=>[0,30,0.5],t:()=>[1,10,1]}, lab:{p:"Principal (₹)",r:"Rate % per year",t:"Years"},
  reads:{simple:"Without compounding",comp:"With compounding",gap:"Difference",formula:"Formula"},
  draw(D,P,sh,hl){
    const g=P.dir==="shrink"?-1:1, r=D.r/100, n=Math.max(1,Math.ceil(D.t-1e-9)), both=P.mode==="both";
    const sim=y=>Math.max(0,D.p*(1+g*r*y)), cmp=y=>Math.max(0,D.p*Math.pow(1+g*r,y));
    let mx=D.p; for(let y=0;y<=n;y++){ mx=Math.max(mx,sim(y),cmp(y)); }
    const H=160, base=190, cw=360/(n+1), x0=40;
    let s=`<svg viewBox="0 0 420 230"><line x1="${x0-6}" y1="${base}" x2="410" y2="${base}" stroke="var(--muted)" stroke-width="2"/>`;
    for(let y=0;y<=n;y++){
      const grow = y<=Math.floor(D.t) ? 1 : clampN(D.t-(y-1),0,1);
      const cx=x0+y*cw, bw=both?cw*.34:cw*.6;
      const bars=[]; if(P.mode!=="compound") bars.push(["simple",sim(y),"var(--sky)"]); if(P.mode!=="simple") bars.push(["comp",cmp(y),"var(--mari)"]);
      bars.forEach(([k,v,c],i)=>{
        const h=v/mx*H*grow, x=cx+(both?i*bw*1.08:cw*.2)-(both?0:0);
        const hlk=(hl===k||hl==="year:"+y)?' class="hl"':"";
        s+=`<rect x="${x}" y="${base-h}" width="${bw}" height="${h}" rx="3" fill="${c}" data-part="${k}"${hlk}/>`;
        if(grow>.95 && sh.has(k) && (n<=6||y===n)) s+=T(x+bw/2,base-h-5,fmtN(v,0),{size:10});
      });
      s+=T(cx+(both?bw:cw*.5),208,y===0?"Start":`Yr ${y}`,{size:11,fill:"var(--muted)"});
    }
    s+=`<g font-size="11">${P.mode!=="compound"?`<rect x="40" y="10" width="12" height="12" fill="var(--sky)"/>${T(58,20,P.dir==="shrink"?"Same amount lost each year":"Interest paid out (no compounding)",{a:"start",size:11,fill:"var(--muted)"})}`:""}${P.mode!=="simple"?`<rect x="${P.mode==="both"?250:40}" y="10" width="12" height="12" fill="var(--mari)"/>${T(P.mode==="both"?268:58,20,"Compounding",{a:"start",size:11,fill:"var(--muted)"})}`:""}</g></svg>`;
    const pr=P.r/100, t=P.t, S=Math.max(0,P.p*(1+g*pr*t)), Cm=P.p*Math.pow(1+g*pr,t);
    return {svg:s, reads:{simple:`₹${fmtN(P.p)} × (1 ${g>0?"+":"−"} ${fmtN(pr,4)} × ${t}) = ₹${fmtN(S)}`, comp:`₹${fmtN(P.p)} × ${fmtN(1+g*pr,4)}<sup>${t}</sup> = ₹${fmtN(Cm)}`, gap:`₹${fmtN(Math.abs(Cm-S))}`, formula:g>0?"p(1 + r)<sup>t</sup> compared with p(1 + rt)":"p(1 − r)<sup>t</sup>"}};
  }
},
/* ---------- 7. successive discounts ---------- */
discounts:{
  def:{price:200,d1:30,d2:20}, rng:{price:(P,I)=>niceRange(I.price),d1:()=>[0,90,1],d2:()=>[0,90,1]}, lab:{price:"Price (₹)",d1:"First discount %",d2:"Second discount %"},
  reads:{steps:"Step by step",final:"Final price",single:"One single discount",effective:"Overall discount"},
  draw(D,P,sh,hl){
    const a1=D.price*(1-D.d1/100), a2=a1*(1-D.d2/100), sg=D.price*(1-(D.d1+D.d2)/100), sc=130/Math.max(D.price,1);
    const A1=P.price*(1-P.d1/100), A2=A1*(1-P.d2/100), SG=Math.max(0,P.price*(1-(P.d1+P.d2)/100));
    const col=(x,y,val,shown,lbl,part,c)=>{ const h=hl===part?' class="hl"':""; const bh=Math.max(0,val)*sc; return `<g data-part="${part}"${h}><rect x="${x}" y="${y+130-bh}" width="54" height="${bh}" rx="4" fill="${c}"/>${T(x+27,y+146,lbl,{size:11,fill:"var(--muted)"})}${T(x+27,y+124-bh,shown?"₹"+fmtN(val):"?",{size:12})}</g>`; };
    let s=`<svg viewBox="0 0 420 240">`;
    s+=col(14,20,P.price,true,"Price","price","var(--sky)");
    s+=T(100,110,`−${fmtN(P.d1)}%`,{fill:"var(--rani)",size:13})+`<path d="M78 118 L118 118" stroke="var(--rani)" stroke-width="2" marker-end=""/>`;
    s+=col(124,20,a1,sh.has("steps"),"After 1st","first","var(--mari)");
    s+=T(210,110,`−${fmtN(P.d2)}%`,{fill:"var(--rani)",size:13})+`<path d="M188 118 L228 118" stroke="var(--rani)" stroke-width="2"/>`;
    s+=col(234,20,a2,sh.has("steps")||sh.has("final"),"After 2nd","second","var(--rani)");
    s+=`<line x1="310" y1="24" x2="310" y2="170" stroke="var(--line)" stroke-dasharray="4 4"/>`;
    s+=T(362,30,`Single −${fmtN(P.d1+P.d2)}%`,{size:12,fill:"var(--teal)"});
    s+=col(335,20,sg,sh.has("single"),"One discount","single","var(--teal)");
    s+=T(210,200,sh.has("effective")?`Overall discount = ${fmtN((1-A2/P.price)*100)}%, not ${fmtN(P.d1+P.d2)}%`:"Is the overall discount the same as one big discount?",{size:13,fill:"var(--ink)"});
    s+="</svg>";
    return {svg:s, reads:{steps:`₹${fmtN(P.price)} → ₹${fmtN(A1)} → ₹${fmtN(A2)}`, final:`₹${fmtN(A2)}`, single:`₹${fmtN(P.price)} − ${fmtN(P.d1+P.d2)}% = ₹${fmtN(SG)}`, effective:`${fmtN((1-A2/P.price)*100)}%`}};
  }
},
/* ---------- 8. mixing jar ---------- */
mix:{
  def:{a:2,b:7,total:500,unit:"ml",la:"Millet",lb:"Water"}, rng:{a:()=>[1,20,1],b:()=>[1,20,1],total:(P,I)=>niceRange(I.total)}, lab:{a:"Parts of first",b:"Parts of second",total:"Total amount"},
  reads:{ratio:"Ratio",frac:"Fraction",pct:"Percent",amounts:"Amounts"},
  draw(D,P,sh,hl){
    const a=Math.max(.001,D.a), b=Math.max(.001,D.b), fa=a/(a+b), top=34, bot=206, H=bot-top, ya=bot-H*fa;
    let s=`<svg viewBox="0 0 420 230"><defs><clipPath id="jarclip"><rect x="46" y="${top}" width="148" height="${H}" rx="18"/></clipPath></defs>`;
    s+=`<g clip-path="url(#jarclip)"><rect x="40" y="${top}" width="160" height="${ya-top}" fill="var(--sky)" fill-opacity=".75" data-part="b"${hl==="b"?' class="hl"':""}/><rect x="40" y="${ya}" width="160" height="${bot-ya}" fill="var(--mari)" data-part="a"${hl==="a"?' class="hl"':""}/>
      <path class="wave" d="M0 ${ya} q18 -7 36 0 t36 0 t36 0 t36 0 t36 0 t36 0 t36 0 v8 h-252z" fill="var(--mari)"/></g>`;
    s+=`<rect x="46" y="${top}" width="148" height="${H}" rx="18" fill="none" stroke="var(--ink)" stroke-width="3"/><rect x="36" y="${top-12}" width="168" height="14" rx="6" fill="var(--line)"/>`;
    s+=T(120,ya+(bot-ya)/2+5,P.la,{fill:"#2a1a00",size:13})+T(120,top+(ya-top)/2+5,P.lb,{fill:"#10283a",size:13});
    const bx=226; s+=T(bx,40,"One unit of the mix:",{a:"start",size:12,fill:"var(--muted)"});
    const n=Math.round(D.a)+Math.round(D.b), per=Math.min(10,Math.max(1,n)), sz=Math.min(18,170/Math.min(10,n));
    for(let i=0;i<n;i++){ const x=bx+(i%10)*(sz+2), y=54+Math.floor(i/10)*(sz+2); s+=`<rect x="${x}" y="${y}" width="${sz}" height="${sz}" rx="3" fill="${i<Math.round(D.a)?"var(--mari)":"var(--sky)"}"/>`; }
    const rows=Math.ceil(n/10), yy=54+rows*(sz+2)+26;
    s+=T(bx,yy,`${P.la} : ${P.lb} = ${fmtN(P.a)} : ${fmtN(P.b)}`,{a:"start",size:14});
    s+=T(bx,yy+24,sh.has("frac")||sh.has("pct")?`${P.la} = [${fmtN(P.a)}/${fmtN(P.a+P.b)}]${sh.has("pct")?" = "+fmtN(P.a/(P.a+P.b)*100)+"%":""}`.replace(/\[([^\/]+)\/([^\]]+)\]/,"$1/$2"):`${P.la} = ? of the mix`,{a:"start",size:14,fill:"var(--mari)"});
    s+=T(bx,yy+48,`Total: ${fmtN(P.total)} ${P.unit}`,{a:"start",size:13,fill:"var(--muted)"});
    s+="</svg>";
    const A=P.total*P.a/(P.a+P.b);
    return {svg:s, reads:{ratio:`${fmtN(P.a)} : ${fmtN(P.b)}`, frac:`${P.la} = [${fmtN(P.a)}/${fmtN(P.a+P.b)}] of the mix`, pct:`${fmtN(P.a/(P.a+P.b)*100)}%`, amounts:`${P.la} ${fmtN(A)} ${P.unit}, ${P.lb} ${fmtN(P.total-A)} ${P.unit}`}};
  }
},
/* ---------- 9. balance scale ---------- */
balance:{
  def:{left:1,right:1,ll:"Left",lr:"Right"}, rng:{left:(P,I)=>niceRange(Math.max(I.left,I.right)),right:(P,I)=>niceRange(Math.max(I.left,I.right))}, lab:{left:"Left value",right:"Right value"},
  reads:{sign:"Comparison",values:"Values"},
  draw(D,P,sh,hl){
    const m=Math.max(Math.abs(D.left),Math.abs(D.right),1e-9), ang=clampN((D.right-D.left)/m*16,-14,14), rad=ang*Math.PI/180;
    const cx=210, cy=70, L=150, lx=cx-L*Math.cos(rad), ly=cy-L*Math.sin(rad), rx=cx+L*Math.cos(rad), ry=cy+L*Math.sin(rad);
    const pan=(x,y,lbl,part)=>`<g data-part="${part}"${hl===part?' class="hl"':""}><line x1="${x}" y1="${y}" x2="${x-40}" y2="${y+70}" stroke="var(--muted)"/><line x1="${x}" y1="${y}" x2="${x+40}" y2="${y+70}" stroke="var(--muted)"/><path d="M${x-58} ${y+70} Q${x} ${y+104} ${x+58} ${y+70} Z" fill="var(--mari)"/>${T(x,y+88,lbl,{size:13,fill:"#1d160a"})}</g>`;
    let s=`<svg viewBox="0 0 420 220"><path d="M${cx-30} 214 L${cx} ${cy} L${cx+30} 214 Z" fill="var(--line)"/>`;
    s+=`<line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="8" fill="var(--rani)"/>`;
    s+=pan(lx,ly,svgFr(P.ll),"left")+pan(rx,ry,svgFr(P.lr),"right");
    s+="</svg>";
    const sg=Math.abs(P.left-P.right)<1e-9?"=":(P.left>P.right?"&gt;":"&lt;");
    return {svg:s, reads:{sign:`${P.ll} ${sg} ${P.lr}`, values:`${fmtN(P.left,3)} and ${fmtN(P.right,3)}`}};
  }
}
};

function mountSim(host, v){
  const def=SIM_DEF[v.sim]; if(!def) { host.innerHTML=`<div class="cap">Simulation “${esc(v.sim)}” is not available.</div>`; return null; }
  const I=Object.assign({}, def.def, v.p||{});
  const P=Object.assign({}, I), D=Object.assign({}, I);
  const allShow=Object.keys(def.reads);
  const parseShow=x=> new Set(x==null||x==="all"||x===true ? allShow : (x==="none"||x===false ? [] : String(x).split(",").map(t=>t.trim())));
  let sh=parseShow(I.show), hl=null, raf=0, hlT=0;
  const sl = I.slider===true ? Object.keys(def.rng) : (I.slider ? String(I.slider).split(",").map(t=>t.trim()).filter(k=>def.rng[k]) : []);
  host.innerHTML = `<div class="sim sim-${v.sim}"><div class="sim-stage"></div><div class="sim-read" aria-live="polite"></div>${sl.length?`<div class="sim-ctl">${sl.map(k=>{ const [mn,mx,st]=def.rng[k](P,I); return `<label class="sl"><span class="sl-l">${esc(def.lab[k]||k)}</span><input type="range" data-k="${k}" min="${mn}" max="${mx}" step="${st}" value="${P[k]}"><output data-o="${k}">${fmtN(P[k])}</output></label>`; }).join("")}</div>`:""}</div>`;
  const stage=host.querySelector(".sim-stage"), read=host.querySelector(".sim-read");
  const listeners=[];
  let inst=null;
  if(def.init){ try{ inst=def.init(stage, Object.assign({},I)); }catch(e){ console.error(e); stage.innerHTML=`<div class="cap">This 3D view could not start on this device.</div>`; } }
  function render(){
    let out;
    if(def.init){ try{ if(inst&&inst.update) inst.update(D,P,sh,hl); }catch(e){ console.error(e); } out={reads:(def.readouts?def.readouts(P,sh):{})||{}}; }
    else { out=def.draw(D,P,sh,hl); stage.innerHTML=out.svg; }
    const keys=allShow.filter(k=>sh.has(k));
    read.innerHTML = keys.map(k=>`<span class="rd"><b>${esc(def.reads[k])}</b>${fx(out.reads[k])}</span>`).join("");
    read.hidden=!keys.length;
  }
  function syncCtl(){ host.querySelectorAll("input[data-k]").forEach(inp=>{ const k=inp.dataset.k; inp.value=P[k]; const o=host.querySelector(`output[data-o="${k}"]`); if(o) o.textContent=fmtN(P[k]); }); }
  host.querySelectorAll("input[data-k]").forEach(inp=>inp.addEventListener("input",()=>{
    const k=inp.dataset.k, val=parseFloat(inp.value); P[k]=val; D[k]=val; cancelAnimationFrame(raf);
    const o=host.querySelector(`output[data-o="${k}"]`); if(o) o.textContent=fmtN(val);
    render(); listeners.forEach(f=>f(api.get())); if(typeof sfx!=="undefined" && Math.random()<.35) sfx.tick();
  }));
  const api={
    set(np, opt={}){
      const numeric={}; Object.keys(np||{}).forEach(k=>{ if(typeof np[k]==="number" && typeof D[k]==="number") numeric[k]=np[k]; else { P[k]=np[k]; D[k]=np[k]; } P[k]=np[k]; });
      syncCtl();
      cancelAnimationFrame(raf);
      if(opt.animate===false || RM){ Object.assign(D,numeric); render(); return; }
      const from=Object.assign({},D), t0=performance.now(), dur=opt.dur||1100;
      const step=now=>{ const k=clampN((now-t0)/dur,0,1), e=ease(k); Object.keys(numeric).forEach(key=>{ D[key]=from[key]+(numeric[key]-from[key])*e; }); render(); if(k<1) raf=requestAnimationFrame(step); };
      raf=requestAnimationFrame(step);
    },
    show(x){ sh=parseShow(x); render(); },
    hl(part){ hl=part||null; clearTimeout(hlT); render(); if(part) hlT=setTimeout(()=>{ hl=null; render(); }, 5000); },
    get(){ return Object.assign({},P); },
    reset(){ Object.keys(P).forEach(k=>delete P[k]); Object.assign(P,I); Object.assign(D,I); sh=parseShow(I.show); hl=null; cancelAnimationFrame(raf); syncCtl(); render(); },
    onChange(f){ listeners.push(f); },
    sliders:sl,
    dispose(){ cancelAnimationFrame(raf); clearTimeout(hlT); try{ inst&&inst.dispose&&inst.dispose(); }catch(e){} inst=null; }
  };
  render();
  return api;
}
function applyXa(a){
  if(!a || !cur.sim) return;
  if(a.show!==undefined) cur.sim.show(a.show);
  if(a.set) cur.sim.set(a.set);
  if(a.hl) cur.sim.hl(a.hl);
}

/* =========================================================
   3D HELPER — make3D(stage, opts) for WebGL simulations (Three.js r128 global THREE)
   ========================================================= */
function make3D(stage, opts={}){
  const THREE=window.THREE;
  if(!THREE){ stage.innerHTML=`<div class="cap">3D view is not available.</div>`; return null; }
  let renderer;
  try{ renderer=new THREE.WebGLRenderer({antialias:true, alpha:true}); }catch(e){ stage.innerHTML=`<div class="cap">This device cannot show 3D. Try Chrome or Edge.</div>`; return null; }
  const H=opts.height||300;
  stage.classList.add("s3d"); stage.style.height=H+"px";
  const wrap=document.createElement("div"); wrap.className="s3d-wrap"; stage.appendChild(wrap);
  const W=()=>Math.max(200, stage.clientWidth||520);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); renderer.setSize(W(),H); renderer.setClearColor(0x000000,0);
  wrap.appendChild(renderer.domElement);
  const labels=document.createElement("div"); labels.className="s3d-labels"; wrap.appendChild(labels);
  const hint=document.createElement("div"); hint.className="s3d-hint"; hint.textContent=opts.hint||"Drag to turn the 3D model"; wrap.appendChild(hint);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(opts.fov||45, W()/H, 0.1, 2000);
  scene.add(new THREE.HemisphereLight(0xdbeaff, 0x1a2230, 0.85));
  const sun=new THREE.DirectionalLight(0xffffff, 0.9); sun.position.set(5,8,6); scene.add(sun);
  const root=new THREE.Group(); scene.add(root);
  const tgt=new THREE.Vector3(...(opts.target||[0,0,0]));
  const view={theta:opts.theta??0.7, phi:opts.phi??1.1, dist:opts.dist??8};
  let auto=opts.auto??0.25, pauseUntil=0, dragging=false, lx=0, ly=0;
  const el=renderer.domElement; el.style.touchAction="none";
  el.addEventListener("pointerdown",e=>{ dragging=true; lx=e.clientX; ly=e.clientY; el.setPointerCapture(e.pointerId); hint.classList.add("gone"); });
  el.addEventListener("pointermove",e=>{ if(!dragging) return; view.theta-=(e.clientX-lx)*0.01; view.phi=Math.max(0.15,Math.min(Math.PI-0.15, view.phi-(e.clientY-ly)*0.01)); lx=e.clientX; ly=e.clientY; pauseUntil=performance.now()+5000; });
  el.addEventListener("pointerup",()=>{ dragging=false; });
  const hooks=[], lbls=[];
  const v3=new THREE.Vector3();
  function place(){ camera.position.set(tgt.x+view.dist*Math.sin(view.phi)*Math.sin(view.theta), tgt.y+view.dist*Math.cos(view.phi), tgt.z+view.dist*Math.sin(view.phi)*Math.cos(view.theta)); camera.lookAt(tgt); }
  let raf=0, last=performance.now(), alive=true;
  function loop(now){
    if(!alive) return;
    const dt=Math.min(0.05,(now-last)/1000); last=now;
    if(!RM && auto && !dragging && now>pauseUntil) view.theta+=auto*dt;
    place();
    hooks.forEach(f=>{ try{ f(now/1000, dt); }catch(e){} });
    renderer.render(scene,camera);
    const w=W();
    lbls.forEach(L=>{ if(!L.obj&&!L.pos) return; if(L.obj) L.obj.getWorldPosition(v3); else v3.copy(L.pos); v3.project(camera);
      const vis=v3.z<1 && L.el.dataset.show!=="0"; L.el.style.display=vis?"":"none"; L.el.style.transform=`translate(${(v3.x*0.5+0.5)*w}px,${(-v3.y*0.5+0.5)*H}px) translate(-50%,-50%)`; });
    raf=requestAnimationFrame(loop);
  }
  const ro = typeof ResizeObserver!=="undefined" ? new ResizeObserver(()=>{ const w=W(); renderer.setSize(w,H); camera.aspect=w/H; camera.updateProjectionMatrix(); }) : null;
  if(ro) ro.observe(stage);
  raf=requestAnimationFrame(loop);
  return {
    THREE, scene, camera, renderer, root,
    onFrame(fn){ hooks.push(fn); },
    setView(v){ Object.assign(view, v); },
    view,
    setAuto(a){ auto=a; },
    label(text, at, cls){ const d=document.createElement("div"); d.className="s3d-label "+(cls||""); d.innerHTML=text; labels.appendChild(d); const L={el:d}; if(at&&at.isObject3D) L.obj=at; else L.pos=new THREE.Vector3(...(at||[0,0,0])); lbls.push(L);
      return { set(t){ d.innerHTML=t; }, show(b){ d.dataset.show=b?"1":"0"; }, el:d, move(p){ if(p&&p.isObject3D){ L.obj=p; L.pos=null; } else { L.obj=null; L.pos=new THREE.Vector3(...p); } } }; },
    dispose(){ alive=false; cancelAnimationFrame(raf); if(ro) ro.disconnect();
      scene.traverse(o=>{ if(o.geometry) o.geometry.dispose(); if(o.material){ (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{ if(m.map) m.map.dispose(); m.dispose(); }); } });
      renderer.dispose(); try{ renderer.forceContextLoss(); }catch(e){} wrap.remove(); stage.classList.remove("s3d"); stage.style.height=""; }
  };
}

/* =========================================================
   STORY WORLDS — guides, terms, scenes
   ========================================================= */
const GUIDES = {
  owl: () => OWL,
  parrot: () => `<svg class="guide parrot" viewBox="0 0 120 130" aria-hidden="true">
    <ellipse cx="60" cy="124" rx="30" ry="4" fill="#000" opacity=".25"/>
    <path d="M20 112 L104 112" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/>
    <g class="p-tail"><path d="M56 96 Q48 124 40 128 Q54 122 62 100Z" fill="#2c7be5"/><path d="M62 98 Q62 126 58 130 Q70 120 68 100Z" fill="#e0362c"/></g>
    <ellipse cx="62" cy="76" rx="26" ry="34" fill="#23b25a"/>
    <ellipse cx="66" cy="84" rx="15" ry="22" fill="#7fe09a"/>
    <g class="p-wing"><path d="M42 62 Q30 86 44 108 Q58 96 58 70Z" fill="#168a43"/><path d="M40 92 Q44 104 48 106" stroke="#2c7be5" stroke-width="4" fill="none"/></g>
    <g class="p-head"><circle cx="66" cy="40" r="24" fill="#23b25a"/>
      <path d="M52 24 Q60 6 76 16 Q70 20 66 22Z" fill="#f4a51c"/>
      <circle cx="74" cy="36" r="9" fill="#fff"/><circle cx="76" cy="37" r="4.5" fill="#15202a"/><circle cx="77.5" cy="35.5" r="1.4" fill="#fff"/>
      <g class="lids"><rect x="64" y="26" width="20" height="20" rx="10" fill="#23b25a"/></g>
      <path d="M86 38 Q104 42 96 60 Q92 52 84 50Z" fill="#e0362c"/><path d="M86 48 Q92 52 90 58 Q86 54 84 50Z" fill="#9c1c16"/>
      <circle cx="60" cy="50" r="5" fill="#ff7aa2" opacity=".55"/></g>
    <path d="M56 108 l-4 6 M64 108 l4 6" stroke="#8a5a2b" stroke-width="3" stroke-linecap="round"/>
  </svg>`
};
const THEME = () => (CHAPTERS[CH] && CHAPTERS[CH].theme) || {};
const isGuide = w => w==="owl" || w==="guide";
const guideSvg = () => (GUIDES[THEME().guide] || GUIDES.owl)();
const guideName = () => THEME().guideName || "Inspector Ullu";
const UNIT = () => THEME().unit || "Case file";
const UNITS = () => { const u=UNIT(); return /s$/i.test(u)?u:u+"s"; };
const DONE = () => THEME().doneStamp || "CASE CLOSED";
const BADGE = () => THEME().badge || "Chief Detective";

/* ---------- background scenes ---------- */
const drawBazaar = drawBg;
let mela = null;
function melaInit(W,H){
  const rnd=(a,b)=>a+Math.random()*(b-a);
  mela = {
    stars: Array.from({length:Math.round(W*H/9000)},()=>({x:rnd(0,W),y:rnd(0,H*.55),r:rnd(.4,1.6),ph:rnd(0,6.28)})),
    kandil: Array.from({length:Math.max(6,Math.round(W/160))},()=>({x:rnd(0,W),y:rnd(H*.2,H),s:rnd(.15,.4),ph:rnd(0,6.28),c:Math.random()<.5?"255,160,40":"255,90,140"})),
    tents: (()=>{ const a=[]; let x=-30; while(x<W+60){ const w=rnd(90,160); a.push({x,w,h:rnd(50,90),c:["#e04a86","#f4a51c","#35c29a","#62b6e8"][Math.floor(rnd(0,4))]}); x+=w-10; } return a; })(),
    fw: [], next: 0
  };
}
function drawMela(t){
  const d=devicePixelRatio, W=innerWidth, H=innerHeight; if(!mela||mela.W!==W||mela.H!==H){ melaInit(W,H); mela.W=W; mela.H=H; }
  const c=bctx; c.setTransform(d,0,0,d,0,0);
  const g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,"#0a0f2c"); g.addColorStop(.55,"#1d1446"); g.addColorStop(1,"#3a1a45");
  c.fillStyle=g; c.fillRect(0,0,W,H);
  mela.stars.forEach(s=>{ c.globalAlpha=.35+.35*Math.sin(t/900+s.ph); c.fillStyle="#fff"; c.beginPath(); c.arc(s.x,s.y,s.r,0,6.28); c.fill(); }); c.globalAlpha=1;
  // fireworks
  if(!RM && t>mela.next){ mela.next=t+1800+Math.random()*2600; const x=W*(.1+Math.random()*.8), y=H*(.12+Math.random()*.3), col=["255,190,60","255,90,150","90,230,180","120,190,255","255,255,255"][Math.floor(Math.random()*5)];
    for(let i=0;i<70;i++){ const a=Math.random()*6.28, sp=1+Math.random()*3.2; mela.fw.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,l:1,col}); } }
  c.globalCompositeOperation="lighter";
  mela.fw.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.vy+=.03; p.vx*=.985; p.l-=.011; c.fillStyle=`rgba(${p.col},${Math.max(0,p.l)*.8})`; c.beginPath(); c.arc(p.x,p.y,1.8,0,6.28); c.fill(); });
  mela.fw=mela.fw.filter(p=>p.l>0);
  c.globalCompositeOperation="source-over";
  // ferris wheel
  const R=Math.min(W,H)*.2, cx=W*.84, cy=H-R-70, ang=t/9000;
  c.strokeStyle="rgba(255,210,150,.28)"; c.lineWidth=2;
  c.beginPath(); c.moveTo(cx-R*.6,H-40); c.lineTo(cx,cy); c.lineTo(cx+R*.6,H-40); c.stroke();
  c.beginPath(); c.arc(cx,cy,R,0,6.28); c.stroke(); c.beginPath(); c.arc(cx,cy,R*.72,0,6.28); c.stroke();
  for(let i=0;i<12;i++){ const a=ang+i*Math.PI/6, x=cx+Math.cos(a)*R, y=cy+Math.sin(a)*R;
    c.strokeStyle="rgba(255,210,150,.22)"; c.beginPath(); c.moveTo(cx,cy); c.lineTo(x,y); c.stroke();
    c.fillStyle=["rgba(244,165,28,.75)","rgba(224,74,134,.75)","rgba(53,194,154,.75)","rgba(98,182,232,.75)"][i%4];
    c.fillRect(x-7,y+2,14,11); c.fillStyle=`rgba(255,240,200,${.5+.4*Math.sin(t/300+i)})`; c.beginPath(); c.arc(x,y,2.4,0,6.28); c.fill(); }
  // string lights
  for(let row=0;row<2;row++){ const y0=18+row*26, sag=26+row*10;
    for(let x=0;x<=W;x+=26){ const k=(x%(W/2))/(W/2), y=y0+Math.sin(k*Math.PI)*sag; const on=.45+.45*Math.sin(t/400+x*.05+row);
      c.fillStyle=["255,190,60","255,90,150","90,230,180","120,190,255"].map(q=>`rgba(${q},${on})`)[(x/26+row)%4|0]; c.beginPath(); c.arc(x,y,3,0,6.28); c.fill(); } }
  // kandil lanterns
  mela.kandil.forEach(l=>{ if(!RM){ l.y-=l.s; l.x+=Math.sin(t/1600+l.ph)*.3; if(l.y<-30){ l.y=H+30; l.x=Math.random()*W; } }
    const gl=c.createRadialGradient(l.x,l.y,0,l.x,l.y,26); gl.addColorStop(0,`rgba(${l.c},.45)`); gl.addColorStop(1,`rgba(${l.c},0)`); c.fillStyle=gl; c.beginPath(); c.arc(l.x,l.y,26,0,6.28); c.fill();
    c.fillStyle=`rgba(${l.c},.8)`; c.beginPath(); c.ellipse(l.x,l.y,6,9,0,0,6.28); c.fill(); });
  // stall tents
  mela.tents.forEach((s,i)=>{ const y=H-s.h; c.fillStyle="rgba(10,6,24,.85)"; c.fillRect(s.x,y,s.w,s.h);
    c.fillStyle=s.c; c.globalAlpha=.55; c.beginPath(); c.moveTo(s.x-8,y); c.lineTo(s.x+s.w/2,y-30); c.lineTo(s.x+s.w+8,y); c.closePath(); c.fill(); c.globalAlpha=1;
    c.fillStyle=`rgba(255,200,120,${.35+.15*Math.sin(t/700+i)})`; c.fillRect(s.x+s.w*.25,y+12,s.w*.5,s.h*.35); });
  if(!RM) requestAnimationFrame(drawBg);
}
const SCENES = { mela: drawMela };
drawBg = function(t){ const f = SCENES[THEME().scene]; if(f && (screen!=="book")) f(t||performance.now()); else drawBazaar(t||performance.now()); };

/* ---------- hands-on challenge ---------- */
function goalText(st){ return Object.entries(st.goal||{}).map(([k,v])=>`${k} = ${fmtN(v)}`).join(", "); }
function checkChallenge(){
  if(cur.busy||!cur.sim) return; const st=CASES[cur.c].steps[cur.s];
  const g=cur.sim.get(), tol=st.goalTol||{};
  const ok=Object.keys(st.goal).every(k=>Math.abs((+g[k])-(+st.goal[k]))<=(tol[k]!=null?tol[k]:1e-6));
  if(ok){ cur.busy=true; lockSim(); win($("#vis")); return; }
  cur.tries++;
  const v=$("#vis"); v.classList.remove("shake"); void v.offsetWidth; v.classList.add("shake");
  if(cur.tries>=2){ cur.busy=true; lockSim(); cur.sim.set(st.goal); lose(st, "the setting shown in the picture"); }
  else { sfx.bad(); hintBox(NUDGE[Math.floor(Math.random()*NUDGE.length)], "Hint: "+st.h); }
}
function lockSim(){ document.querySelectorAll("#vis .sim-ctl input").forEach(i=>i.disabled=true); }
