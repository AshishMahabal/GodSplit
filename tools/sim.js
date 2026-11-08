// Headless playthrough of prototype/index.html with a stubbed DOM.
// Usage: node sim.js <doubter|middle|lazy|decoy>
const fs=require('fs'), path=require('path');
const el=()=>({style:{},textContent:'',innerHTML:'',setAttribute(){},getContext:()=>new Proxy({},{get:()=>()=>{}}),classList:{add(){}}});
const els={};
global.document={getElementById:id=>els[id]||(els[id]=el()),querySelectorAll:()=>[]};
global.innerWidth=800;global.innerHeight=600;global.devicePixelRatio=1;
global.addEventListener=()=>{};global.requestAnimationFrame=()=>{};
eval(fs.readFileSync(path.join(__dirname,'g.js'),'utf8')+`
;global.G={S,get cur(){return cur},nextDilemma,reveal,choose,conf,commit,steel,afterDilemma,reveal2,gate,replay,V,lit};`);
function play(mode){
  let n=0, seen=[], maxLitBeforeFinal=0, revealMsgs=[];
  G.nextDilemma();
  while(n++<40){
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
  return {mode,dilemmas:seen.length,S:{doubt:G.S.doubt,tol:G.S.tol,ego:G.S.ego,rung:G.S.rung},
    maxLitBeforeFinal,finalLit:G.lit(),end,strong:G.V.innerHTML.includes('audit is complete'),revealMsgs};
}
console.log(JSON.stringify(play(process.argv[2])));
