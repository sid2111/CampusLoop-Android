// node shoot.js <id> <case#> <step#> [more "case:step" ...]  → dist/<id>-c<case>-s<step>.png (1-based numbers)
// Builds the lesson, jumps to each step, applies all xa actions, reveals the clue, and screenshots the page.
const path=require('path'); const build=require('./build.js');
let chromium; try{ ({chromium}=require('playwright')); }catch(e){ ({chromium}=require('/opt/node22/lib/node_modules/playwright')); }
(async()=>{
  const [id,...rest]=process.argv.slice(2); build(id);
  const pairs=[]; for(let i=0;i<rest.length;i++){ if(rest[i].includes(':')) pairs.push(rest[i].split(':').map(Number)); else { pairs.push([+rest[i],+rest[i+1]]); i++; } }
  const browser=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const page=await browser.newPage({viewport:{width:1100,height:1000}});
  page.on('pageerror',e=>console.log('pageerror:',e.message));
  await page.addInitScript(()=>{ try{ localStorage.setItem('casebook-voice','off'); }catch(e){} });
  await page.goto('file://'+path.join(__dirname,'dist',id+'.html')); await page.waitForTimeout(500);
  for(const [c,s] of pairs){
    await page.evaluate(([c,s])=>{ jumpTo(0,c-1,s-1); },[c,s]); await page.waitForTimeout(2600);
    await page.evaluate(([c,s])=>{ const st=CHAPTERS[0].cases[c-1].steps[s-1]; (st.xa||[]).forEach(a=>{ try{ applyXa(a); }catch(e){} }); },[c,s]);
    await page.waitForTimeout(1500);
    const out=path.join(__dirname,'dist',`${id}-c${c}-s${s}.png`); await page.screenshot({path:out,fullPage:true}); console.log(out);
  }
  await browser.close();
})();
