// node build.js <id> [...]  → dist/<id>.html   (chapters/<id>/{meta.json,data.js,chap.js})
const fs=require('fs'), path=require('path');
const T=d=>fs.readFileSync(path.join(__dirname,'template',d),'utf8');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function build(id){
  const dir=path.join(__dirname,'chapters',id);
  const meta=JSON.parse(fs.readFileSync(path.join(dir,'meta.json'),'utf8'));
  const data=fs.readFileSync(path.join(dir,'data.js'),'utf8').trim();
  const chap=fs.readFileSync(path.join(dir,'chap.js'),'utf8').trim();
  if(!/^const BOOK_TITLE\s*=/.test(data)) throw new Error(id+': data.js must start with const BOOK_TITLE');
  if(!/^\(function\s*\(\)\s*\{/.test(chap)||!/\}\)\(\);?$/.test(chap)) throw new Error(id+': chap.js must be one (function(){ ... })(); IIFE');
  const head=T('head.html').split('{{TITLE}}').join(esc(meta.title)).replace('{{DESC}}',esc(meta.desc||'')).replace('{{LANG}}',meta.lang||'en');
  const html=head+'<script>\n'+data+'\n'+T('engA.js')+'\n'+chap+'\n'+T('tail.js');
  fs.mkdirSync(path.join(__dirname,'dist'),{recursive:true});
  fs.writeFileSync(path.join(__dirname,'dist',id+'.html'),html);
  return html.length;
}
if(require.main===module) for(const id of process.argv.slice(2)) console.log(id, build(id));
module.exports=build;
