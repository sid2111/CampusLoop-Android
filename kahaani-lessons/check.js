// node check.js <id> [...]  — static checks + headless play-through of every step.
const fs=require('fs'), path=require('path');
const build=require('./build.js');
const {validateContent}=require('./validate-content.js');
let chromium; try{ ({chromium}=require('playwright')); }catch(e){ ({chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright')); }

function staticCheck(id){
  const dir=path.join(__dirname,'chapters',id), errs=[], warn=[];
  const meta=JSON.parse(fs.readFileSync(path.join(dir,'meta.json'),'utf8'));
  const data=fs.readFileSync(path.join(dir,'data.js'),'utf8'), chap=fs.readFileSync(path.join(dir,'chap.js'),'utf8');
  let R; try{ R=new Function(data+'\n;return {BOOK_TITLE,GRADE,BOOK,CHAPTERS};')(); }catch(e){ errs.push('data.js does not run: '+e.message); return {errs,warn}; }
  if(R.CHAPTERS.length!==1) errs.push('exactly one CHAPTERS.push expected');
  const C=R.CHAPTERS[0]; if(!C) return {errs,warn};
  for(const k of ['no','title','story','intro','theme','people','cases','summary']) if(C[k]==null) errs.push('chapter.'+k+' missing');
  if(meta.title!==R.BOOK_TITLE) errs.push('meta.title must equal BOOK_TITLE');
  const reg=new Set([...chap.matchAll(/SIM_DEF\.([A-Za-z0-9_]+)\s*=/g)].map(m=>m[1]));
  const builtin=new Set(['hundred','fracbar','partof','change','shop','compound','discounts','mix','balance']);
  const scenes=new Set([...chap.matchAll(/SCENES\.([A-Za-z0-9_]+)\s*=/g)].map(m=>m[1])), guides=new Set([...chap.matchAll(/GUIDES\.([A-Za-z0-9_]+)\s*=/g)].map(m=>m[1]));
  if(C.theme){ if(!scenes.has(C.theme.scene)) errs.push('theme.scene not registered: '+C.theme.scene); if(!guides.has(C.theme.guide)) errs.push('theme.guide not registered: '+C.theme.guide);
    for(const k of ['guideName','unit','doneStamp','badge']) if(!C.theme[k]) errs.push('theme.'+k+' missing'); }
  const used=new Set(); let nq=0, nsteps=0;
  (C.cases||[]).forEach((c,ci)=>{
    for(const k of ['title','sec','icon','brief','steps']) if(!c[k]) errs.push(`case ${ci+1}: ${k} missing`);
    (c.steps||[]).forEach((s,si)=>{ nsteps++; const at=`case ${ci+1} step ${si+1}`;
      if(!['s','m','n','x','o'].includes(s.t)) errs.push(at+': bad t '+s.t);
      if(!s.say) errs.push(at+': say missing'); if(!s.who) errs.push(at+': who missing');
      else if(!(s.who==='guide'||s.who==='owl'||(C.people||{})[s.who])) errs.push(at+': who not in people: '+s.who);
      if(s.t==='s'&&!s.note) errs.push(at+': note missing');
      if(s.t!=='s'){ nq++; if(!s.q) errs.push(at+': q missing'); }
      if(s.t==='m'){ if(!Array.isArray(s.o)||s.o.length<2||s.o.length>4) errs.push(at+': o needs 2-4 options'); if(!(Number.isInteger(s.a)&&s.a>=0&&s.a<(s.o||[]).length)) errs.push(at+': bad a'); if(!s.h) errs.push(at+': h (hint) missing'); if(new Set((s.o||[]).map(String)).size!==(s.o||[]).length) errs.push(at+': duplicate options'); }
      if(s.t==='n'){ if(typeof s.ans!=='number'||!isFinite(s.ans)) errs.push(at+': ans must be a number'); if(!s.h) errs.push(at+': h missing'); }
      if(s.t==='x'){ if(!s.goal||!s.v||s.v.k!=='sim') errs.push(at+': x needs goal + sim'); else if(!s.v.p||!s.v.p.slider) errs.push(at+': x sim needs p.slider'); if(!s.h) errs.push(at+': h missing'); }
      if(s.t!=='s'&&s.t!=='o'&&!(Array.isArray(s.xs)&&s.xs.length)) warn.push(at+': no xs explanation');
      if(s.v){ if(s.v.k==='sim'){ used.add(s.v.sim); if(!reg.has(s.v.sim)&&!builtin.has(s.v.sim)) errs.push(at+': sim not registered: '+s.v.sim); }
        else if(!['grid','marbles','unmask','bar','bars','lines','table','svg'].includes(s.v.k)) errs.push(at+': unknown v.k '+s.v.k); }
      if(s.xa&&(!Array.isArray(s.xa)||s.xa.length>xsLen(s))) errs.push(at+': xa longer than xs');
    });
  });
  function xsLen(s){ return Array.isArray(s.xs)?s.xs.length:(s.x?1:0); }
  const cj=path.join(dir,'content.json');
  if(!fs.existsSync(cj)){ if(!process.env.NOCONTENT) errs.push('content.json missing'); } else { try{ const v=validateContent(JSON.parse(fs.readFileSync(cj,'utf8'))); v.errors.forEach(e=>errs.push('content: '+e)); }catch(e){ errs.push('content.json: '+e.message); } }
  return {errs,warn,stats:{cases:C.cases.length,steps:nsteps,questions:nq,sims:reg.size,simsUsed:used.size,unusedSims:[...reg].filter(x=>!used.has(x))}};
}

async function play(id, browser){
  const file='file://'+path.join(__dirname,'dist',id+'.html');
  const page=await browser.newPage({viewport:{width:1100,height:900}});
  const errs=[];
  page.on('pageerror',e=>errs.push('pageerror: '+e.message));
  page.on('console',m=>{ if(m.type()==='error' && !/Failed to load resource/.test(m.text())) errs.push('console: '+m.text()); });
  await page.addInitScript(()=>{ try{ localStorage.setItem('casebook-voice','off'); }catch(e){} });
  await page.goto(file); await page.waitForTimeout(600);
  const res=await page.evaluate(async()=>{
    const out=[]; const sleep=ms=>new Promise(r=>setTimeout(r,ms));
    for(let ch=0; ch<CHAPTERS.length; ch++) for(let c=0;c<CHAPTERS[ch].cases.length;c++){
      const steps=CHAPTERS[ch].cases[c].steps;
      for(let s=0;s<steps.length;s++){
        try{ jumpTo(ch,c,s); await sleep(60);
          const st=steps[s];
          const vis=document.querySelector('#vis');
          if(st.v&&st.v.k==='sim'){ if(!cur.sim) out.push(`case ${c+1} step ${s+1}: sim did not mount`);
            else if(/not available|could not start/.test(vis.textContent)) out.push(`case ${c+1} step ${s+1}: ${vis.textContent.slice(0,80)}`);
            (st.xa||[]).forEach(a=>{ try{ applyXa(a); }catch(e){ out.push(`case ${c+1} step ${s+1}: xa error ${e.message}`); } });
            if(st.t==='x'){ try{ cur.sim.set(st.goal,{animate:false}); const g=cur.sim.get(); const tol=st.goalTol||{};
              const ok=Object.keys(st.goal).every(k=>Math.abs((+g[k])-(+st.goal[k]))<=(tol[k]!=null?tol[k]:1e-6)); if(!ok) out.push(`case ${c+1} step ${s+1}: goal not reachable`);
              (cur.sim.sliders||[]).forEach(k=>{ const inp=vis.querySelector(`input[data-k="${k}"]`); if(inp&&typeof st.goal[k]==='number'){ const mn=+inp.min,mx=+inp.max,stp=+inp.step; if(st.goal[k]<mn||st.goal[k]>mx) out.push(`case ${c+1} step ${s+1}: goal ${k}=${st.goal[k]} outside slider ${mn}..${mx}`); else if(stp&&Math.abs(((st.goal[k]-mn)/stp)-Math.round((st.goal[k]-mn)/stp))>1e-6) out.push(`case ${c+1} step ${s+1}: goal ${k} not on slider step ${stp}`); } });
              Object.keys(st.goal).forEach(k=>{ if(!(cur.sim.sliders||[]).includes(k)) out.push(`case ${c+1} step ${s+1}: goal key ${k} has no slider`); });
            }catch(e){ out.push(`case ${c+1} step ${s+1}: goal error ${e.message}`); } }
            await sleep(st.v && st.v.sim && /3d/i.test(st.v.sim)?250:30);
          }
          const r=vis.getBoundingClientRect(); if(st.v && r.height<40) out.push(`case ${c+1} step ${s+1}: visual looks empty (${Math.round(r.height)}px)`);
        }catch(e){ out.push(`case ${c+1} step ${s+1}: ${e.message}`); }
      }
    }
    for(const g of ['notebook','summaryPg','keyPg','final','home']){ try{ go(g); }catch(e){ out.push('page '+g+': '+e.message); } }
    return out;
  });
  const shot=path.join(__dirname,'dist',id+'.png'); await page.screenshot({path:shot});
  await page.close();
  return errs.concat(res);
}

(async()=>{
  const ids=process.argv.slice(2); let bad=0;
  const browser=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  for(const id of ids){
    let st; try{ st=staticCheck(id); }catch(e){ st={errs:['static: '+e.message],warn:[]}; }
    let pe=[]; if(!st.errs.length){ try{ build(id); pe=await play(id,browser); }catch(e){ pe=['play: '+e.message]; } }
    const all=st.errs.concat(pe); if(all.length) bad++;
    console.log(`\n== ${id} ${all.length?'FAIL':'PASS'} ${JSON.stringify(st.stats||{})}`);
    [...new Set(all)].slice(0,60).forEach(e=>console.log('  ✗ '+e));
    if(st.warn.length) console.log(`  (${st.warn.length} warnings) `+st.warn.slice(0,5).join(' | '));
  }
  await browser.close(); process.exit(bad?1:0);
})();
