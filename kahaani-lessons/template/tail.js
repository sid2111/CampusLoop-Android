
const MULTI = CHAPTERS.length > 1;
let CH = 0, CASES = CHAPTERS[0].cases;
function setCh(i){ CH=i; CASES=CHAPTERS[i].cases; }
const DEFP = {name:"Friend", skin:"#b8784c", hair:"short", bg:"#62b6e8", shirt:"#2f6d5a"};
function P(who){ return (CHAPTERS[CH].people||{})[who] || CHAPTERS.map(c=>c.people&&c.people[who]).find(Boolean) || DEFP; }
const nameOf = who => isGuide(who) ? guideName() : P(who).name;
const iconOf = c => (c.icon && String(c.icon).trim().startsWith("<svg")) ? c.icon : (ICONS[c.icon] || ICONS.star);

const KEY=BOOK.key+"-"+GRADE.replace(/\D/g,"")+"-v2";
let S = {name:"", best:{}, done:{}};
try{ const raw=localStorage.getItem(KEY); if(raw) S=Object.assign(S,JSON.parse(raw)); }catch(e){}
function save(){ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} }
const K = (ch,c) => CHAPTERS[ch].no+"-"+c;
const qCount = (c,ch=CH) => CHAPTERS[ch].cases[c].steps.filter(s=>s.t==="m"||s.t==="n"||s.t==="x").length;
const bestOf = (c,ch=CH) => S.best[K(ch,c)];
const doneOf = (c,ch=CH) => !!S.done[K(ch,c)];
function stars(c,ch=CH){ const b=bestOf(c,ch); if(b==null) return 0; const mx=qCount(c,ch)*10; const r=mx?b/mx:1; return r>=.9?3:r>=.6?2:1; }
const chDone = ch => CHAPTERS[ch].cases.filter((_,i)=>doneOf(i,ch)).length;
const chPts = ch => CHAPTERS[ch].cases.reduce((a,_,i)=>a+(bestOf(i,ch)||0),0);
const chMax = ch => CHAPTERS[ch].cases.reduce((a,_,i)=>a+qCount(i,ch)*10,0);
const chStars = ch => CHAPTERS[ch].cases.reduce((a,_,i)=>a+stars(i,ch),0);
const bookPts = () => CHAPTERS.reduce((a,_,i)=>a+chPts(i),0);
const bookMax = () => CHAPTERS.reduce((a,_,i)=>a+chMax(i),0);

let cur = {c:0,s:0,pts:0,tries:0,busy:false};
let timers=[];
const later=(fn,ms)=>{ const id=setTimeout(fn,RM?0:ms); timers.push(id); return id; };
const clearTimers=()=>{ timers.forEach(clearTimeout); timers=[]; };

let screen = MULTI ? "book" : "home";
const SCREENS=["book","home","play","final","notebook","summaryPg","keyPg"];
function show(id){
  screen=id; if(id!=="play"){ stopTalk(); if(cur.sim&&cur.sim.dispose){ cur.sim.dispose(); cur.sim=null; } } SCREENS.forEach(x=>$("#"+x).hidden = x!==id);
  if(id!=="play"){ clearTimers(); $("#mbarTitle").textContent = id==="book" ? BOOK_TITLE : `Ch ${CHAPTERS[CH].no} · ${CHAPTERS[CH].title}`; }
  closeMenu(); renderSide(); scrollTo({top:0,behavior:RM?"auto":"smooth"});
}
function nameBar(){ return `<div class="namebar"><label>Your name</label><input class="dname" type="text" maxlength="28" placeholder="Type your name" autocomplete="off" value="${esc(S.name||"")}" aria-label="Your name"></div>`; }
function bindName(){ document.querySelectorAll(".dname").forEach(i=>i.oninput=e=>{ S.name=e.target.value.trim(); save(); }); }

/* =========================================================
   BOOK HOME (all chapters)
   ========================================================= */
function renderBook(){
  $("#book").innerHTML = `<div class="hero"><div class="heroOwl">${OWL}</div><div>
      <div class="eyebrow">${esc(BOOK.name)} · Grade ${GRADE} · ${esc(BOOK.part)}</div>
      <h1>${esc(BOOK.name)} <span class="hl">Story Worlds</span></h1>
      <p>${CHAPTERS.length} chapters, ${CHAPTERS.length} animated story worlds. Each chapter has its own guide, simulations and voice explanations. Everything is open: start anywhere, or go in order.</p>
      ${nameBar()}</div></div>
    <div class="board-h"><h2>Chapters</h2><span class="eyebrow" style="color:var(--muted)">${bookPts()} / ${bookMax()} points</span></div>
    <div class="chapters">${CHAPTERS.map((C,i)=>{ const d=chDone(i), n=C.cases.length;
      return `<button class="chtile" type="button" data-ch="${i}">
        <span class="chno">Chapter ${C.no}</span><h3>${esc(C.title)}</h3><span class="story">${esc(C.story)}${C.theme?` · with ${esc(C.theme.guideName)}`:""}</span>
        <span class="chprog"><i style="width:${d/n*100}%"></i></span>
        <span class="chmeta"><span>${d}/${n} parts done</span><span class="stx">${"★".repeat(Math.min(chStars(i),21)>0?1:0)} ${chStars(i)}</span></span></button>`;}).join("")}
      <div class="chtile note"><span class="chno">How it works</span><h3>Everything is open</h3><span class="story">Pick any chapter. Inside, parts run one after another, and the menu on the left jumps to any story step or clue.</span></div>
    </div>`;
  bindName();
  document.querySelectorAll(".chtile[data-ch]").forEach(b=>b.onclick=()=>{ sfx.tick(); openChapter(+b.dataset.ch); });
}
function openChapter(ch){ setCh(ch); exCh.add(ch); renderHome(); show("home"); }

/* =========================================================
   CHAPTER HOME (case map)
   ========================================================= */
function renderHome(){
  const C=CHAPTERS[CH], d=chDone(CH);
  $("#home").innerHTML = `<div class="hero"><div class="heroOwl">${guideSvg()}</div><div>
      <div class="eyebrow">${MULTI?"Chapter "+C.no+" · ":""}${esc(C.title)}</div>
      <h1>${esc(C.story)}</h1><p>${esc(C.intro||"")}</p>
      ${MULTI?"":nameBar()}</div></div>
    <div class="board-h"><h2>${esc(UNITS())}</h2><span class="eyebrow" style="color:var(--muted)">${d}/${CASES.length} closed · ${chPts(CH)} / ${chMax(CH)} points</span></div>
    <div class="cases">${CASES.map((c,i)=>{ const st=stars(i);
      return `<button class="tile" type="button" data-c="${i}" aria-label="Case ${i+1}: ${esc(c.title)}">
        <span class="ic">${iconOf(c)}</span>
        <span class="no">${esc(UNIT())} ${i+1}</span><h3>${esc(c.title)}</h3><span class="sec">${esc(c.sec)}</span>
        <span class="st">${[0,1,2].map(k=>`<span class="${k<st?"on":""}">★</span>`).join("")}${doneOf(i)?"":`<span class="new">Open</span>`}</span></button>`;}).join("")}
      <button class="tile final" type="button" id="finalTile"><span class="ic">${ICONS.star}</span><span class="no">Closing report</span><h3>Certificate</h3>
        <span class="sec">Your chapter certificate and summary</span><span class="st">${d}/${CASES.length} parts done</span></button>
    </div>
    ${MULTI && CH<CHAPTERS.length-1 ? `<div class="final-actions"><button class="btn alt" id="nextChBtn" type="button">Next chapter: ${esc(CHAPTERS[CH+1].title)} ›</button></div>`:""}`;
  bindName();
  document.querySelectorAll(".tile[data-c]").forEach(b=>b.onclick=()=>{ sfx.tick(); openCase(+b.dataset.c); });
  $("#finalTile").onclick=()=>renderFinal();
  const nb=$("#nextChBtn"); if(nb) nb.onclick=()=>openChapter(CH+1);
}

/* =========================================================
   SIDEBAR MENU
   ========================================================= */
const I = {
  home:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>`,
  map:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/></svg>`,
  book:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h11M9 8h6"/></svg>`,
  list:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.3" fill="currentColor"/><circle cx="4.5" cy="12" r="1.3" fill="currentColor"/><circle cx="4.5" cy="18" r="1.3" fill="currentColor"/></svg>`,
  key:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/></svg>`,
  award:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/></svg>`,
  reset:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8"/><path d="M3 3v5h5"/></svg>`,
  car:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M9 5l7 7-7 7"/></svg>`
};
const exCh=new Set([0]), exCase=new Set();
const plain = s => String(s).replace(/<[^>]+>/g,"").replace(/\[([^\[\]\/]+)\/([^\[\]\/]+)\]/g,"$1/$2").replace(/&lt;/g,"<").replace(/&gt;/g,">");
let resetArm=false;

function caseList(ch){
  const Ch=CHAPTERS[ch], inPlay=screen==="play"&&CH===ch;
  return Ch.cases.map((C,i)=>{
    const key=K(ch,i), open=exCase.has(key), st=stars(i,ch);
    let qn=0;
    const steps = open ? `<ul class="steps">${C.steps.map((s,j)=>{
      const isQ=s.t!=="s"; if(isQ) qn++;
      const label = isQ ? plain(s.q) : plain(s.note||s.say);
      return `<li><button type="button" data-jh="${ch}" data-jc="${i}" data-js="${j}" class="${inPlay&&cur.c===i&&cur.s===j?"cur":""}" title="${esc(label)}"><span class="k ${isQ?(s.t==="o"?"o":s.t==="x"?"x":""):"s"}">${isQ?(s.t==="o"?"Task ":s.t==="x"?"Try ":"Q ")+qn:"Story"}</span><span class="x">${esc(label)}</span></button></li>`;
    }).join("")}</ul>` : "";
    return `<div class="case-row">
      <button class="nb ${inPlay&&cur.c===i?"on":""}" type="button" data-oh="${ch}" data-oc="${i}" title="${esc(C.title)}">
        <span class="num">${i+1}</span><span class="t">${esc(C.title)}</span><span class="meta st">${doneOf(i,ch)?"★".repeat(st):""}</span></button>
      <button class="car" type="button" data-exc="${key}" aria-expanded="${open}" aria-label="Show steps of case ${i+1}">${I.car}</button>
    </div>${steps}`;
  }).join("");
}

function renderSide(){
  const side=$("#side"); if(!side) return;
  let files;
  if(MULTI){
    files = `<div class="nav-h">Chapters <span>${CHAPTERS.reduce((a,_,i)=>a+chDone(i),0)}/${CHAPTERS.reduce((a,c)=>a+c.cases.length,0)} parts</span></div>
    <nav class="nav" aria-label="Chapters">${CHAPTERS.map((C,ch)=>{ const open=exCh.has(ch);
      return `<div class="case-row"><button class="nb ch ${CH===ch&&screen!=="book"?"on":""}" type="button" data-och="${ch}" title="${esc(C.title)}">
          <span class="num chn">${C.no}</span><span class="t">${esc(C.title)}</span><span class="meta">${chDone(ch)}/${C.cases.length}</span></button>
        <button class="car" type="button" data-exh="${ch}" aria-expanded="${open}" aria-label="Show parts of chapter ${C.no}">${I.car}</button></div>
        ${open?`<div class="sub">${caseList(ch)}</div>`:""}`;}).join("")}</nav>`;
  } else {
    files = `<div class="nav-h">${esc(UNITS())} <span>${chDone(0)}/${CASES.length} done</span></div><nav class="nav" aria-label="Case files">${caseList(0)}</nav>`;
  }
  const chLbl = MULTI ? ` <span class="meta">Ch ${CHAPTERS[CH].no}</span>` : "";
  side.innerHTML = `
    <button class="brand" type="button" data-go="${MULTI?"book":"home"}">${MULTI?OWL:guideSvg()}<span><b>${esc(MULTI?BOOK.short+" Story Worlds":CHAPTERS[0].story)}</b><small>Grade ${GRADE} · ${esc(BOOK.part)}${MULTI?" · "+CHAPTERS.length+" chapters":" · Ch "+CHAPTERS[0].no}</small></span></button>
    <nav class="nav" aria-label="Pages">
      ${MULTI?`<button class="nb ${screen==="book"?"on":""}" type="button" data-go="book"><span class="ni">${I.home}</span><span class="t">All chapters</span></button>`:""}
      <button class="nb ${screen==="home"?"on":""}" type="button" data-go="home"><span class="ni">${I.map}</span><span class="t">Story map</span>${chLbl}</button>
      <button class="nb ${screen==="notebook"?"on":""}" type="button" data-go="notebook"><span class="ni">${I.book}</span><span class="t">Notebook</span>${chLbl}</button>
      <button class="nb ${screen==="summaryPg"?"on":""}" type="button" data-go="summaryPg"><span class="ni">${I.list}</span><span class="t">Chapter summary</span>${chLbl}</button>
      <button class="nb ${screen==="final"?"on":""}" type="button" data-go="final"><span class="ni">${I.award}</span><span class="t">Certificate</span>${chLbl}</button>
    </nav>
    ${files}
    <div class="side-foot">
      <div class="meter">${MULTI?"Book points":"Total points"} <b>${bookPts()}</b> / ${bookMax()}<div class="bar"><i style="width:${bookPts()/bookMax()*100}%"></i></div></div>
      ${TTS.ok?`<button class="nb" type="button" id="sideVoice"><span class="ni">${SPK}</span><span class="t">Voice narration ${TTS.on?"on":"off"}</span></button>`:""}
      ${TTS.ok&&TTS.on?`<label class="vpick"><span>Narrator voice</span><select id="voicePick">${voiceList().map(v=>`<option value="${esc(v.name)}" ${TTS.voice&&TTS.voice.name===v.name?"selected":""}>${esc(v.name.replace(/Microsoft |Google |\(Natural\)|Online/g,"").replace(/ +- +/," – ").replace(/  +/g," ").trim())} · ${esc(v.lang)}${voiceScore(v)>=80?" (Indian)":""}</option>`).join("")||"<option>Default voice</option>"}</select>${hasIndianVoice()?"":`<small>${esc(VOICE_TIP)}</small>`}</label>`:""}
      <button class="nb" type="button" id="sideSnd"><span class="ni">${soundOn?SND_ON:SND_OFF}</span><span class="t">Sound effects ${soundOn?"on":"off"}</span></button>
      <div class="nav-h" style="margin-top:6px">For teachers</div>
      <button class="nb ${screen==="keyPg"?"on":""}" type="button" data-go="keyPg"><span class="ni">${I.key}</span><span class="t">Answer key</span>${chLbl}</button>
      <button class="nb warn" type="button" id="sideReset"><span class="ni">${I.reset}</span><span class="t">${resetArm?"Tap again to erase":"Reset progress"}</span></button>
    </div>`;
  side.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{ sfx.tick(); go(b.dataset.go); });
  side.querySelectorAll("[data-och]").forEach(b=>b.onclick=()=>{ sfx.tick(); openChapter(+b.dataset.och); });
  side.querySelectorAll("[data-exh]").forEach(b=>b.onclick=()=>{ const c=+b.dataset.exh; exCh.has(c)?exCh.delete(c):exCh.add(c); renderSide(); });
  side.querySelectorAll("[data-oc]").forEach(b=>b.onclick=()=>{ sfx.tick(); const ch=+b.dataset.oh, c=+b.dataset.oc; setCh(ch); exCase.add(K(ch,c)); openCase(c); });
  side.querySelectorAll("[data-exc]").forEach(b=>b.onclick=()=>{ const k=b.dataset.exc; exCase.has(k)?exCase.delete(k):exCase.add(k); renderSide(); });
  side.querySelectorAll("[data-jc]").forEach(b=>b.onclick=()=>{ sfx.tick(); jumpTo(+b.dataset.jh,+b.dataset.jc,+b.dataset.js); });
  if($("#sideVoice")) $("#sideVoice").onclick=()=>$("#voiceBtn").click();
  if($("#voicePick")) $("#voicePick").onchange=e=>{ setVoiceName(e.target.value); stopTalk(); speak("Namaste! I will read everything to you in this voice.","owl"); };
  $("#sideSnd").onclick=()=>{ soundOn=!soundOn; drawSnd(); if(soundOn) sfx.tick(); };
  $("#sideReset").onclick=()=>{
    if(!resetArm){ resetArm=true; renderSide(); setTimeout(()=>{ if(resetArm){ resetArm=false; renderSide(); } },3500); return; }
    resetArm=false; S={name:S.name,best:{},done:{}}; save(); go(MULTI?"book":"home");
  };
  const cb=side.querySelector(".steps .cur"); if(cb){ const r=cb.getBoundingClientRect(), sr=side.getBoundingClientRect(); if(r.top<sr.top||r.bottom>sr.bottom) side.scrollTop += r.top - sr.top - sr.height/3; }
}
function go(id){
  closeOverlay();
  if(id==="book"){ renderBook(); show("book"); }
  else if(id==="home"){ renderHome(); show("home"); }
  else if(id==="final") renderFinal();
  else if(id==="notebook") renderNotebook();
  else if(id==="summaryPg") renderSummary();
  else if(id==="keyPg") renderKey();
}
function jumpTo(ch,c,s){
  closeOverlay(); ac();
  if(!(screen==="play" && CH===ch && cur.c===c)){ setCh(ch); cur={c,s,pts:0,tries:0,busy:false}; } else cur.s=s;
  exCh.add(ch); exCase.add(K(ch,c)); show("play"); renderStep();
}
function openMenu(){ $("#side").classList.add("open"); $("#scrim").hidden=false; $("#hamb").setAttribute("aria-expanded","true"); }
function closeMenu(){ const s=$("#side"); if(!s) return; s.classList.remove("open"); $("#scrim").hidden=true; $("#hamb").setAttribute("aria-expanded","false"); }
$("#hamb").onclick=openMenu; $("#scrim").onclick=closeMenu;
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeMenu(); });

/* =========================================================
   NOTEBOOK · SUMMARY · ANSWER KEY (per chapter, with switcher)
   ========================================================= */
function chSwitch(page){
  if(!MULTI) return "";
  return `<div class="chips" role="tablist" aria-label="Choose chapter">${CHAPTERS.map((C,i)=>`<button type="button" class="chipbtn ${i===CH?"on":""}" data-pch="${i}" data-page="${page}">Ch ${C.no}</button>`).join("")}</div>`;
}
function bindSwitch(){ document.querySelectorAll("[data-pch]").forEach(b=>b.onclick=()=>{ setCh(+b.dataset.pch); exCh.add(CH); go(b.dataset.page); }); }
function pageHead(eyebrow,title,p,page){ const C=CHAPTERS[CH]; return `<div class="page-h"><div class="eyebrow">${eyebrow}${MULTI?" · Chapter "+C.no+": "+esc(C.title):""}</div><h1>${title}</h1><p>${p}</p>${chSwitch(page)}</div>`; }
function renderNotebook(){
  $("#notebook").innerHTML = pageHead("Revision","Notebook","Every key idea from the story, step by step. Open any part straight from here.","notebook") +
    `<div class="nbk">${CASES.map((C,i)=>{
      const notes=C.steps.filter(s=>s.t==="s");
      return `<section><h3><small>${esc(UNIT())} ${i+1} · ${esc(C.sec)}</small>${esc(C.title)}</h3>
        <ul>${notes.map(n=>`<li><b>${fx(n.note)}</b>${xsOf(n).length?`<ol class="nsub">${xsOf(n).map(x=>`<li>${fx(x)}</li>`).join("")}</ol>`:""}</li>`).join("")}</ul>
        <div style="margin-top:12px"><button class="btn" type="button" data-nc="${i}">Open ›</button></div></section>`;
    }).join("")}</div>`;
  document.querySelectorAll("[data-nc]").forEach(b=>b.onclick=()=>openCase(+b.dataset.nc));
  bindSwitch(); show("notebook");
}
function renderSummary(){
  $("#summaryPg").innerHTML = pageHead(esc(CHAPTERS[CH].story),"Chapter summary","The big ideas of the chapter on one page.","summaryPg") +
    `<div class="summary">${(CHAPTERS[CH].summary||[]).map(s=>`<div><h3>${fx(s[0])}</h3><p>${fx(s[1])}</p></div>`).join("")}</div>`;
  bindSwitch(); show("summaryPg");
}
function ansText(st){ if(st.t==="o") return "Model answer"; if(st.t==="x") return "Set: "+goalText(st); return st.t==="m" ? st.o[st.a] : (st.pre||"") + Number(st.ans).toLocaleString("en-IN",{maximumFractionDigits:4}) + (st.u?(st.u==="%"?"%":" "+st.u):""); }
function renderKey(){
  const nQ=CASES.reduce((a,C)=>a+C.steps.filter(s=>s.t!=="s").length,0);
  $("#keyPg").innerHTML = pageHead("For teachers","Answer key",`All ${nQ} clues and tasks of this chapter with answers and step-by-step working. Open a part to see its answers.`,"keyPg") +
    `<div class="key">${CASES.map((C,i)=>{ const qs=C.steps.filter(s=>s.t!=="s");
      return `<details><summary>${esc(UNIT())} ${i+1} · ${esc(C.title)}</summary><ol>${qs.map(s=>`<li>${s.ref?`<span class="kref">${fx(s.ref)}</span>`:""}${fx(s.q)}<br><b>${fx(ansText(s))}</b><ol class="ex">${xsOf(s).map(x=>`<li>${fx(x)}</li>`).join("")}</ol></li>`).join("")}</ol></details>`;
    }).join("")}</div>`;
  bindSwitch(); show("keyPg");
}

/* =========================================================
   CASE FLOW (clue cards, answers, step-by-step explanations, narration)
   ========================================================= */
const xsOf = st => Array.isArray(st.xs)&&st.xs.length ? st.xs : (st.x ? [st.x] : []);
const KIND_LABEL = {Draw:"Draw it", Construct:"Construct it", Discuss:"Discuss", Explain:"Explain", Activity:"Activity", Project:"Project", Think:"Think"};

function openCase(c){
  stopTalk();
  cur={c,s:0,pts:0,tries:0,busy:false,answered:false,miss:0};
  const C=CASES[c], Ch=CHAPTERS[CH];
  exCh.add(CH); exCase.add(K(CH,c));
  overlay(`<div class="card"><div class="gfly">${guideSvg()}</div><div class="fileno">${MULTI?"Chapter "+Ch.no+" · ":""}${esc(UNIT())} ${c+1} of ${CASES.length}</div>
    <h2>${esc(C.title)}</h2><div class="sec">From ${esc(C.sec)}</div>
    <p>${fx(C.brief||"")}</p><div class="row"><button class="btn pinkb" id="goCase" type="button">Let’s go ›</button></div>
    ${TTS.ok?`<div class="vhint">${TTS.on?"Voice narration is on. You can change the voice or turn it off from the menu.":"Voice narration is off. Turn it on with the speaker button at the top."}${TTS.on&&!hasIndianVoice()?"<br>"+esc(VOICE_TIP):""}</div>`:""}</div>`);
  later(()=>sfx.stamp(),300);
  closeMenu(); $("#goCase").focus();
  $("#goCase").onclick=()=>{ ac(); closeOverlay(); show("play"); renderStep(); };
}
function overlay(html){ const o=$("#ov"); o.innerHTML=html; o.hidden=false; }
function closeOverlay(){ $("#ov").hidden=true; $("#ov").innerHTML=""; }

function renderHud(){
  const C=CASES[cur.c];
  $("#hudNo").textContent=`${MULTI?"Ch "+CHAPTERS[CH].no+" · ":""}${UNIT()} ${cur.c+1} · ${C.sec}`;
  $("#hudTitle").textContent=C.title;
  $("#prog").innerHTML=C.steps.map((_,i)=>`<i class="${i<cur.s?"done":i===cur.s?"now":""}"></i>`).join("");
  $("#score").textContent=cur.pts;
  drawVoice();
}
function wordsHTML(text){
  let i=0; return text.split(" ").map(w=>`<span class="w" style="--d:${(i++)*38}ms">${fx(w)}</span>`).join(" ") + `<span class="skip">tap to skip</span>`;
}
function hiWord(r){ const ws=document.querySelectorAll("#bubble .w"); if(!ws.length) return; const k=Math.min(ws.length-1,Math.floor(r*ws.length)); ws.forEach((w,i)=>w.classList.toggle("hi",i===k)); }

function renderStep(){
  clearTimers(); stopTalk();
  const C=CASES[cur.c], st=C.steps[cur.s];
  cur.tries=0; cur.busy=false; cur.answered=false;
  renderHud();
  const scene=$("#scene"); scene.classList.remove("enter"); void scene.offsetWidth; scene.classList.add("enter");
  $("#who").innerHTML = (isGuide(st.who)?guideSvg():person(P(st.who))) + `<span>${esc(nameOf(st.who))}</span>`;
  const b=$("#bubble"); b.classList.remove("done"); b.innerHTML = wordsHTML(st.say);
  if(cur.sim&&cur.sim.dispose) cur.sim.dispose(); cur.sim=null;
  $("#vis").innerHTML = V(st.v); $("#vis").classList.remove("shake");
  cur.sim = (st.v&&st.v.k==="sim") ? mountSim($("#vis .simhost"), st.v) : null; showSub(-1);
  const clue=$("#clue"); clue.className="clue hide"; clue.innerHTML="";
  renderSide(); $("#mbarTitle").textContent = `${MULTI?"Ch "+CHAPTERS[CH].no+" · ":""}${C.title}`;
  const typeMs = Math.min(st.say.split(" ").length*38+250, 2200);
  const tok=TTS.token;
  const showClue = ()=>{ if(!clue.classList.contains("hide")) return; b.classList.add("done"); clue.classList.remove("hide"); clue.classList.add("show"); buildClue(st); sfx.tick();
    if(st.t==="s" && st.v && st.v.auto) later(revealVis,500); };
  b.onclick = ()=>{ stopTalk(); b.querySelectorAll(".w.hi").forEach(w=>w.classList.remove("hi")); showClue(); narrateClue(st); };
  if(TTS.ok && TTS.on){
    $("#who").classList.add("talking");
    later(showClue, typeMs);
    speak(st.say, st.who, hiWord).then(ok=>{ $("#who").classList.remove("talking"); b.querySelectorAll(".w.hi").forEach(w=>w.classList.remove("hi")); if(ok && tok===TTS.token){ showClue(); narrateClue(st); } });
  } else later(showClue, typeMs);
}

function refChip(st){ return st.ref ? `<div class="ref">From the textbook: ${fx(st.ref)}</div>` : ""; }
function buildClue(st){
  const clue=$("#clue"); const C=CASES[cur.c];
  const qi = C.steps.slice(0,cur.s+1).filter(s=>s.t!=="s").length, qn=C.steps.filter(s=>s.t!=="s").length;
  if(st.t==="s"){
    clue.innerHTML = `<i class="clip"></i><div class="tag"><span>Notebook</span><span>${cur.s+1}/${C.steps.length}</span></div>
      <div class="note">${fx(st.note)}</div>
      ${xsOf(st).length?`<div class="xhead">How it works</div>${stepsHTML(xsOf(st))}`:""}
      <div class="next">${replayBtn()}<button class="btn" id="nextBtn" type="button">Continue ›</button></div>`;
    $("#nextBtn").onclick=nextStep; bindReplay(()=>narrateClue(st,true));
    $("#nextBtn").focus({preventScroll:true});
    if(!(TTS.ok&&TTS.on)) revealAllSteps(clue, st.xa);
    return;
  }
  const kindTag = st.t==="x" ? `<span class="kind hands">Hands-on</span>` : st.t==="o" ? `<span class="kind">${esc(KIND_LABEL[st.kind]||st.kind||"Task")}</span>` : `<span>${st.t==="n"?"Type your answer":"Pick one"}</span>`;
  const head = `<i class="clip"></i><div class="tag"><span>${st.t==="o"?"Task":st.t==="x"?"Challenge":"Question"} ${qi} of ${qn}</span>${kindTag}</div>${refChip(st)}<div class="qt">${fx(st.q)}</div>`;
  if(st.t==="m"){
    clue.innerHTML = head + `<div class="opts">${st.o.map((o,i)=>`<button class="opt" type="button" data-i="${i}"><span class="k">${"ABCDEF"[i]}</span><span>${fx(o)}</span></button>`).join("")}</div><div id="fbx"></div><div class="next pre">${replayBtn()}</div>`;
    clue.querySelectorAll(".opt").forEach(b=>b.onclick=()=>answerMCQ(+b.dataset.i,b));
  } else if(st.t==="n"){
    clue.innerHTML = head + `<form class="numrow" id="numForm" autocomplete="off"><div class="inwrap">${st.pre?`<span>${st.pre}</span>`:""}<input id="numIn" inputmode="decimal" aria-label="Your answer" placeholder="?">${st.u?`<span style="font-size:16px;opacity:.7">${fx(st.u)}</span>`:""}</div><button class="btn" type="submit">Check</button></form><div class="tip">You can type a decimal or a fraction like 3/4.</div><div id="fbx"></div><div class="next pre">${replayBtn()}</div>`;
    $("#numForm").addEventListener("submit",e=>{ e.preventDefault(); answerNum(); });
    later(()=>$("#numIn")&&$("#numIn").focus({preventScroll:true}),200);
  } else if(st.t==="x"){
    clue.innerHTML = head + `<div class="otask hands">Move the sliders under the picture to set it up. Press Check when you think it is right.</div>
      <div class="next pre">${replayBtn()}<button class="btn ghost" id="resetSim" type="button">Reset</button><button class="btn" id="chkBtn" type="button">Check</button></div><div id="fbx"></div>`;
    $("#chkBtn").onclick=checkChallenge; $("#resetSim").onclick=()=>{ if(cur.sim&&!cur.busy) cur.sim.reset(); };
  } else {
    clue.innerHTML = head + `<div class="otask">Try this in your notebook first. When you are ready, open the model answer and listen to the explanation.</div>
      <div class="next">${replayBtn()}<button class="btn alt" id="modelBtn" type="button">Show model answer</button></div><div id="fbx"></div>`;
    $("#modelBtn").onclick=()=>{ $("#modelBtn").closest(".next").remove(); showModel(st); };
  }
  bindReplay(()=>narrateClue(st,true));
}
function replayBtn(){ return TTS.ok ? `<button class="btn ghost replay" type="button" aria-label="Listen again">${SPK} Listen</button>` : ""; }
function bindReplay(fn){ document.querySelectorAll("#clue .replay").forEach(b=>b.onclick=()=>{ stopTalk(); if(!TTS.on){ TTS.on=true; saveVoice(); drawVoice(); } fn(); }); }
function stepsHTML(xs){ const ol=`<ol class="xsteps">${xs.map((x,i)=>`<li data-k="${i}"><span class="sn">${i+1}</span><span class="st">${fx(x)}</span></li>`).join("")}</ol>`; return BOOK.minimal ? `<details class="xall"><summary>Read the steps</summary>${ol}</details>` : ol; }
function showSub(i,n,text){ const s=$("#subt"); if(!s) return; if(i<0){ s.hidden=true; return; } s.hidden=false; s.innerHTML=`<span class="sdots">${Array.from({length:n},(_,k)=>`<i class="${k<i?"d":k===i?"c":""}"></i>`).join("")}</span><span class="tx">${fx(text)}</span>`; s.classList.remove("pop"); void s.offsetWidth; s.classList.add("pop"); }
function revealAllSteps(root, xa){ const gap = xa ? 1700 : 650; const tok=TTS.token; root.querySelectorAll(".xsteps li").forEach((li,i)=>setTimeout(()=>{ if(tok!==TTS.token) return; li.classList.add("on"); showSub(i, root.querySelectorAll(".xsteps li").length, li.querySelector(".st").innerHTML); if(xa) applyXa(xa[i]); }, RM?0:350+i*gap)); }
async function playSteps(root, xs, who, intro, xa){
  const tok=TTS.token; const lis=[...root.querySelectorAll(".xsteps li")];
  if(!(TTS.ok&&TTS.on)){ revealAllSteps(root, xa); return; }
  if(intro){ await speak(intro, who); if(tok!==TTS.token) return; }
  for(let i=0;i<lis.length;i++){
    if(tok!==TTS.token) return;
    lis[i].classList.add("on","now"); if(xa) applyXa(xa[i]); showSub(i, lis.length, xs[i]);
    if(!BOOK.minimal) lis[i].scrollIntoView({block:"nearest",behavior:RM?"auto":"smooth"});
    await speak(xs[i], who);
    lis[i].classList.remove("now");
    if(tok!==TTS.token){ lis.slice(i).forEach(l=>l.classList.add("on")); return; }
  }
}
async function narrateClue(st, again){
  if(!(TTS.ok&&TTS.on)) return;
  const clue=$("#clue"); const tok=TTS.token;
  if(again && !cur.answered && st.t!=="s"){ await speak(st.say, st.who); if(tok!==TTS.token) return; }
  if(st.t==="s"){
    clue.querySelectorAll(".xsteps li").forEach(li=>li.classList.remove("on","now"));
    await speak("Notebook. "+st.note, "owl"); if(tok!==TTS.token) return;
    if(again && cur.sim) cur.sim.reset();
    await playSteps(clue, xsOf(st), "owl", null, st.xa);
    return;
  }
  if(cur.answered){ const f=$("#fbx"); if(f){ f.querySelectorAll(".xsteps li").forEach(li=>li.classList.remove("on","now")); if(cur.sim){ cur.sim.reset(); if(st.t==="x") cur.sim.set(st.goal,{animate:false}); } await playSteps(f, xsOf(st), "owl", null, st.xa); } return; }
  if(st.t==="m"){
    await speak(st.q, "owl"); if(tok!==TTS.token) return;
    for(let i=0;i<st.o.length;i++){ const b=clue.querySelector(`.opt[data-i="${i}"]`); if(b) b.classList.add("reading"); await speak("Option "+"ABCD"[i]+". "+st.o[i], "owl"); if(b) b.classList.remove("reading"); if(tok!==TTS.token) return; }
  } else if(st.t==="x"){
    await speak(st.q+" Move the sliders, then press Check.", "owl");
  } else if(st.t==="n"){
    await speak(st.q+" Type your answer and press Check.", "owl");
  } else {
    await speak((KIND_LABEL[st.kind]||"Task")+". "+st.q+" Try it in your notebook, then tap Show model answer.", "owl");
  }
}

function feedback(kind, title, st, spokenIntro){
  const last = cur.s===CASES[cur.c].steps.length-1;
  const xs=xsOf(st);
  $("#fbx").innerHTML = `<div class="fb ${kind}"><b class="v">${title}</b>${xs.length?`<div class="xhead">Step-by-step explanation</div>${stepsHTML(xs)}`:""}</div>
    <div class="next">${replayBtn()}<button class="btn ${kind==="ok"?"":"alt"}" id="nextBtn" type="button">${last?`Finish this ${esc(UNIT().toLowerCase())} ›`:"Next ›"}</button></div>`;
  $("#nextBtn").onclick=nextStep; bindReplay(()=>narrateClue(st,true));
  document.querySelectorAll("#clue .next.pre").forEach(n=>n.remove());
  cur.answered=true;
  stopTalk();
  playSteps($("#fbx"), xs, "owl", spokenIntro, st.xa);
  setTimeout(()=>{ const n=$("#nextBtn"); if(n) n.scrollIntoView({block:"nearest",behavior:RM?"auto":"smooth"}); }, 50);
}
function hintBox(title, body){
  const f=$("#fbx"); f.innerHTML=`<div class="fb hint"><b class="v">${title}</b>${fx(body)}</div>`;
  stopTalk(); speak(title+" "+body, "owl");
}
function showModel(st){ sfx.whoosh(); revealVis(); feedback("model", "Model answer", st, "Here is one way to do it."); }
const PRAISE=["Brilliant!","Sharp thinking!","Well done!","Spot on!","Superb!","Exactly right!"];
const NUDGE=["Not quite. Here is a hint.","Close, but check again.","Almost! Try once more."];
function win(el){
  const first = cur.tries===0; const p = first?10:5; cur.pts+=p;
  $("#score").textContent=cur.pts; const ch=$("#scoreChip"); ch.classList.remove("bump"); void ch.offsetWidth; ch.classList.add("bump");
  revealVis(); sfx.good();
  const r=el.getBoundingClientRect(); burst(r.left+r.width/2, r.top+r.height/2, first?110:60);
  const st=CASES[cur.c].steps[cur.s]; const pr=PRAISE[Math.floor(Math.random()*PRAISE.length)];
  feedback("ok", pr + `<span class="pts">+${p}</span>`, st, `${pr} Now let us see why.`);
}
function lose(st, revealText){ revealVis(); sfx.bad(); feedback("no", "The answer is: "+fx(revealText), st, "The correct answer is "+revealText+". Let us work it out step by step."); }
function answerMCQ(i,btn){
  if(cur.busy) return; const st=CASES[cur.c].steps[cur.s];
  if(i===st.a){ cur.busy=true; btn.classList.add("good"); document.querySelectorAll(".opt").forEach(b=>b.disabled=true); win(btn); return; }
  btn.classList.add("bad"); btn.disabled=true; cur.tries++; if(cur.tries===1) cur.miss=(cur.miss||0)+1;
  if(cur.tries>=2){ cur.busy=true; document.querySelectorAll(".opt").forEach(b=>{ b.disabled=true; if(+b.dataset.i===st.a) b.classList.add("good"); }); lose(st, st.o[st.a]); }
  else { sfx.bad(); hintBox(NUDGE[Math.floor(Math.random()*NUDGE.length)], "Hint: "+st.h); }
}
function answerNum(){
  if(cur.busy) return; const st=CASES[cur.c].steps[cur.s];
  const inp=$("#numIn"), w=inp.parentElement;
  const raw=inp.value.replace(/[₹,%\s]/g,"").replace(/[a-z²³°]+$/i,"").replace(/−/g,"-");
  let val = /^-?\d+(\.\d+)?\/\d+(\.\d+)?$/.test(raw) ? raw.split("/").reduce((a,b)=>parseFloat(a)/parseFloat(b)) : parseFloat(raw);
  if(isNaN(val)){ w.classList.remove("bad"); void w.offsetWidth; w.classList.add("bad"); hintBox("Type a number first.","Use digits, for example 45 or 43.2, or a fraction like 3/4."); return; }
  const tol = st.tol!=null?st.tol:Math.max(.011,Math.abs(st.ans)*.001);
  if(Math.abs(val-st.ans)<=tol){ cur.busy=true; w.classList.remove("bad"); w.classList.add("good"); inp.disabled=true; $("#numForm button").disabled=true; win(w); return; }
  cur.tries++; if(cur.tries===1) cur.miss=(cur.miss||0)+1; w.classList.remove("bad"); void w.offsetWidth; w.classList.add("bad");
  if(cur.tries>=2){ cur.busy=true; inp.disabled=true; $("#numForm button").disabled=true; lose(st, ansText(st)); }
  else { sfx.bad(); hintBox(NUDGE[Math.floor(Math.random()*NUDGE.length)], "Hint: "+st.h); inp.select(); }
}
function nextStep(){
  sfx.tick(); stopTalk();
  if(cur.s < CASES[cur.c].steps.length-1){ cur.s++; renderStep(); }
  else closeCase();
}
/* report progress to the Kahaani Class app (web iframe or mobile WebView) */
function kcReport(msg){ try{ const m=JSON.stringify(msg); if(window.ReactNativeWebView) window.ReactNativeWebView.postMessage(m); if(window.parent && window.parent!==window) window.parent.postMessage(msg,"*"); }catch(e){} }
function closeCase(){
  clearTimers(); stopTalk();
  const c=cur.c, max=qCount(c)*10, key=K(CH,c);
  S.best[key]=Math.max(S.best[key]||0,cur.pts); S.done[key]=true; save(); renderSide();
  const r=max?cur.pts/max:1, st= r>=.9?3:r>=.6?2:1;
  const nextC = c+1<CASES.length ? c+1 : null;
  const nextCh = nextC==null && MULTI && CH<CHAPTERS.length-1 ? CH+1 : null;
  overlay(`<div class="card"><div class="fileno">${MULTI?"Chapter "+CHAPTERS[CH].no+" · ":""}${esc(UNIT())} ${c+1}</div><h2>${esc(CASES[c].title)}</h2>
    <div style="margin:18px 0 4px"><span class="stamp green">${esc(DONE())}</span></div>
    <div class="stars">${[0,1,2].map(k=>`<span class="${k<st?"on":""}" style="animation-delay:${.6+k*.2}s">★</span>`).join("")}</div>
    <p><b>${cur.pts}</b> of ${max} points. ${st===3?"Perfect score!":st===2?"Great work. Replay any time to earn 3 stars.":"Done! Replay it to sharpen your skills."}</p>
    <div class="row">
      ${nextC!=null?`<button class="btn pinkb" id="toNext" type="button">Next ${esc(UNIT().toLowerCase())} ›</button>`:`<button class="btn pinkb" id="toFinal" type="button">Chapter certificate ›</button>`}
      ${nextCh!=null?`<button class="btn" id="toNextCh" type="button">Next chapter ›</button>`:""}
      <button class="btn alt" id="toHome" type="button">Story map</button></div></div>`);
  later(()=>sfx.stamp(),250); later(()=>{ sfx.fanfare(); burst(innerWidth/2, innerHeight/2.4, 160); },700);
  later(()=>speak(`${UNIT()} complete! You scored ${cur.pts} out of ${max} points.`,"owl"),900);
  if($("#toNext")) $("#toNext").onclick=()=>{ closeOverlay(); openCase(nextC); };
  if($("#toFinal")) $("#toFinal").onclick=()=>{ closeOverlay(); renderFinal(); };
  if($("#toNextCh")) $("#toNextCh").onclick=()=>{ closeOverlay(); openChapter(nextCh); };
  $("#toHome").onclick=()=>{ closeOverlay(); go("home"); };
  kcReport({type:"kc-progress", chapter:CHAPTERS[CH].no, title:CHAPTERS[CH].title, part:c+1, parts:CASES.length, partTitle:CASES[c].title, pts:cur.pts, max, missed:cur.miss||0, stars:st, grade:GRADE, subject:BOOK.subj});
}

/* voice controls */
const SPK = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 8q3 4 0 8"/></svg>`;
function saveVoice(){ try{ localStorage.setItem("casebook-voice",TTS.on?"on":"off"); localStorage.setItem("casebook-rate",String(TTS.rate)); }catch(e){} }
function drawVoice(){
  const b=$("#voiceBtn"), r=$("#rateBtn"); if(!b) return;
  if(!TTS.ok){ b.hidden=true; r.hidden=true; return; }
  b.classList.toggle("on",TTS.on); b.setAttribute("aria-pressed",TTS.on?"true":"false");
  b.innerHTML = `${TTS.on?SND_ON:SND_OFF}<span>Voice ${TTS.on?"on":"off"}</span>`;
  r.textContent = TTS.rate+"×"; r.hidden=!TTS.on;
}
$("#voiceBtn").onclick=()=>{ TTS.on=!TTS.on; saveVoice(); drawVoice(); renderSide(); if(!TTS.on) stopTalk(); else if(screen==="play"){ const st=CASES[cur.c].steps[cur.s]; if($("#clue").classList.contains("hide")){ renderStep(); } else narrateClue(st,true); } };
$("#rateBtn").onclick=()=>{ const R=[0.8,1,1.2,1.4]; TTS.rate=R[(R.indexOf(TTS.rate)+1)%R.length]||1; saveVoice(); drawVoice(); stopTalk(); speak("This is the new reading speed.","owl"); };
document.addEventListener("visibilitychange",()=>{ if(document.hidden) stopTalk(); });

/* =========================================================
   CERTIFICATE (per chapter)
   ========================================================= */
function renderFinal(){
  const Ch=CHAPTERS[CH], d=chDone(CH), n=CASES.length, all=d===n;
  const nm = S.name || "Detective";
  $("#final").innerHTML = `<div class="page-h">${chSwitch("final")}</div>
  <div class="cert"><div class="eyebrow" style="color:#8a6a2a">${esc(BOOK.name)} · Grade ${GRADE} · ${MULTI?"Chapter "+Ch.no+": ":""}${esc(Ch.title)}</div>
    <div style="width:110px;margin:10px auto 0">${guideSvg()}</div>
    <h1>${all?esc(BADGE()):"Almost there!"}</h1><div>This certifies that</div><div class="nm">${esc(nm)}</div>
    <div>${all?`has finished every ${esc(UNIT().toLowerCase())} in <b>${esc(Ch.story)}</b>.`:`has finished ${d} of ${n} ${esc(UNIT().toLowerCase())}s in <b>${esc(Ch.story)}</b>. Keep going!`}</div>
    <div class="big" style="margin-top:14px">${chPts(CH)} / ${chMax(CH)}</div><div>${chStars(CH)} of ${n*3} stars · signed, Inspector Ullu</div>
    <div style="margin-top:14px"><span class="stamp ${all?"green":""}">${all?"ALL DONE":"IN PROGRESS"}</span></div></div>
  <h2 style="margin-top:30px;font-size:28px">What we learnt</h2>
  <div class="summary">${(Ch.summary||[]).map(s=>`<div><h3>${fx(s[0])}</h3><p>${fx(s[1])}</p></div>`).join("")}</div>
  <div class="final-actions"><button class="btn alt" id="finMap" type="button">Story map</button>${MULTI&&CH<CHAPTERS.length-1?`<button class="btn pinkb" id="finNext" type="button">Next chapter ›</button>`:""}</div>`;
  bindSwitch(); show("final");
  $("#finMap").onclick=()=>go("home");
  const fn=$("#finNext"); if(fn) fn.onclick=()=>openChapter(CH+1);
  if(all) later(()=>{ sfx.fanfare(); burst(innerWidth/2, innerHeight/3, 220); },400);
}

/* =========================================================
   WIRING
   ========================================================= */
$("#toMap").onclick=()=>go("home");
$("#sndBtn").onclick=()=>{ soundOn=!soundOn; drawSnd(); if(soundOn) sfx.tick(); };
document.addEventListener("keydown",e=>{
  if($("#play").hidden || !$("#ov").hidden) return;
  if(e.target.tagName==="INPUT") return;
  const k=e.key.toUpperCase(); const idx="ABCD".indexOf(k)>=0?"ABCD".indexOf(k):["1","2","3","4"].indexOf(e.key);
  if(idx>=0){ const b=document.querySelector(`.opt[data-i="${idx}"]`); if(b&&!b.disabled) b.click(); }
});
addEventListener("resize",()=>{ sizeFx(); sizeBg(); if(RM) drawBg(0); });
sizeFx(); sizeBg(); if(BOOK.minimal) document.body.classList.add("minimal");
if(MULTI){ renderBook(); show("book"); } else { renderHome(); show("home"); }
drawSnd();
requestAnimationFrame(drawBg);

</script>
</body>
</html>
