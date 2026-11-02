// Mirror of the server's lib/content.js validateContent + house rules.
function validateContent(J){
  const errors=[];
  if(!J||typeof J!=='object') return {ok:false,errors:['JSON must be an object']};
  const mcq=(x,id)=>{ if(!x||typeof x!=='object'){errors.push(`${id}: not an object`);return;}
    if(!x.q||!String(x.q).trim()) errors.push(`${id}: question text missing`);
    if(!Array.isArray(x.o)||x.o.length!==4||x.o.some(o=>!String(o==null?'':o).trim())) errors.push(`${id}: needs 4 options`);
    else if(new Set(x.o.map(String)).size!==4) errors.push(`${id}: duplicate options`);
    if(!(Number.isInteger(x.a)&&x.a>=0&&x.a<4)) errors.push(`${id}: a must be 0-3`); };
  if(!Array.isArray(J.quiz)||J.quiz.length!==10) errors.push('quiz must have exactly 10 questions');
  (J.quiz||[]).forEach((x,i)=>{ mcq(x,`quiz ${i+1}`); if(!x||!x.why) errors.push(`quiz ${i+1}: why missing`); });
  if(J.quiz){ const ac=[0,0,0,0]; J.quiz.forEach(x=>ac[x.a]++); if(Math.max(...ac)>5) errors.push('quiz answers too lopsided: '+ac.join('/')); }
  if(!Array.isArray(J.papers)||J.papers.length!==5) errors.push('papers must have exactly 5 papers');
  (J.papers||[]).forEach((p,pi)=>{ const id=`paper ${pi+1}`;
    if(!p||!Array.isArray(p.sections)||!p.sections.length){errors.push(`${id}: sections missing`);return;}
    let tot=0;
    p.sections.forEach((s,si)=>{ if(!s||!Array.isArray(s.qs)||!s.qs.length){errors.push(`${id} section ${si+1}: questions missing`);return;}
      if(!(Number(s.each)>0)) errors.push(`${id} section ${si+1}: 'each' marks missing`); tot+=Number(s.each)*s.qs.length;
      s.qs.forEach((x,qi)=>{ const qid=`${id} S${si+1} Q${qi+1}`; if(Array.isArray(x&&x.o)) mcq(x,qid); else if(!x||!x.q) errors.push(`${qid}: question missing`); if(!x||!x.ans) errors.push(`${qid}: model answer (ans) missing`); }); });
    if(p.marks!=null&&Number(p.marks)!==tot) errors.push(`${id}: marks ${p.marks} but sections add to ${tot}`);
  });
  for(const k of ['grade','chapter','title','book']) if(J[k]==null) errors.push(k+' missing');
  return {ok:!errors.length,errors:errors.slice(0,40)};
}
module.exports={validateContent};
