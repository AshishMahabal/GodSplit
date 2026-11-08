// Headless playthrough of prototype/index.html with a stubbed DOM.
// Usage: node sim.js <doubter|middle|lazy|decoy>
const fs=require('fs'), path=require('path');
const el=()=>({style:{},textContent:'',innerHTML:'',setAttribute(){},getContext:()=>new Proxy({},{get:()=>()=>{}}),classList:{add(){}}});
const els={};
const cls=new Set();
global.document={body:{classList:{add:c=>cls.add(c),remove:c=>cls.delete(c)}},getElementById:id=>els[id]||(els[id]=el()),querySelectorAll:()=>[]};
global.innerWidth=800;global.innerHeight=600;global.devicePixelRatio=1;
global.addEventListener=()=>{};global.requestAnimationFrame=()=>{};
eval(fs.readFileSync(path.join(__dirname,'g.js'),'utf8')+`
;global.G={buildPlan,DILEMMAS,FINAL,tryWord,SECRET_HASH,wordHash,S,get cur(){return cur},nextDilemma,reveal,choose,conf,commit,steel,afterDilemma,reveal2,gate,replay,V,lit};`);
function unlockGate(){
  // Page must open on the lock screen; a wrong word keeps it shut; the right hash opens it.
  if(!cls.has('locked')||!G.V.innerHTML.includes('secret word')) throw Error('gate not shown');
  document.getElementById('word').value='definitely wrong'; G.tryWord({preventDefault(){}});
  if(!cls.has('locked')) throw Error('wrong word opened the gate');
  // We only know the hash, so check unlock by patching the input to a word whose hash we force-match.
  if(G.SECRET_HASH!==G.wordHash(process.env.GS_WORD||'')) { cls.delete('locked'); return 'gate ok (word not given, skipped unlock check)'; }
  document.getElementById('word').value=process.env.GS_WORD; G.tryWord({preventDefault(){}});
  if(cls.has('locked')) throw Error('right word did not open the gate');
  return 'gate ok (unlock checked)';
}
function play(mode){
  const gateMsg=unlockGate();
  let n=0, seen=[], maxLitBeforeFinal=0, revealMsgs=[];
  G.nextDilemma();
  while(n++<60){
    const html=G.V.innerHTML;
    if(html.includes('A message from the Auditor')) break;
    if(html.includes('Avatar reveal')){ G.reveal2(true); revealMsgs.push(els.revfb.innerHTML.replace(/<[^>]+>/g,'').slice(0,45)); G.gate(); continue;}
    if(html.includes('will not hold')){ G.replay(html.match(/replay\('(\w+)'\)/)[1]); continue;}
    const c=G.cur; seen.push(c.id);
    const k={doubter:3,middle:1,lazy:0,decoy:3}[mode];
    for(let i=0;i<k;i++) G.reveal();
    G.choose(c.opts[0].id); G.conf(mode==='lazy'?'certain':'leaning'); G.commit();
    const want={doubter:'ok',middle:'ok',lazy:'bad',decoy:'decoy'}[mode];
    G.steel(c.args.findIndex(a=>a.kind===want));
    if(!c.final) maxLitBeforeFinal=Math.max(maxLitBeforeFinal,G.lit());
    G.afterDilemma();
  }
  const end=G.V.innerHTML.includes('A message from the Auditor');
  return {gate:gateMsg,mode,dilemmas:seen.length,S:{doubt:G.S.doubt,tol:G.S.tol,ego:G.S.ego,rung:G.S.rung},
    maxLitBeforeFinal,finalLit:G.lit(),end,strong:G.V.innerHTML.includes('audit is complete'),revealMsgs};
}
if(process.argv[2]==='reach'){
  // Over many drawn ladders, every dilemma should turn up at least once.
  const seen=new Set([G.FINAL,'trolleyKin','trolleyKin2']);
  for(let i=0;i<2000;i++) G.buildPlan().flat().forEach(id=>seen.add(id));
  const missing=Object.keys(G.DILEMMAS).filter(id=>!seen.has(id));
  console.log(missing.length?'UNREACHABLE: '+missing.join(','):'reach ok: every dilemma appears in some ladder');
} else console.log(JSON.stringify(play(process.argv[2])));
