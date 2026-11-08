const fs=require('fs');
const el=()=>({style:{},textContent:'',innerHTML:'',getContext:()=>new Proxy({},{get:()=>()=>{}}),classList:{add(){}}});
const els={};
global.document={getElementById:id=>els[id]||(els[id]=el()),querySelectorAll:()=>[]};
global.innerWidth=800;global.innerHeight=600;global.devicePixelRatio=1;
global.addEventListener=()=>{};global.requestAnimationFrame=()=>{};
const code=fs.readFileSync(require('path').join(__dirname,'g.js'),'utf8')+`
;global.G={S,get cur(){return cur},nextDilemma,reveal,choose,conf,commit,steel,afterDilemma,reveal2,gate,replay,V};`;
eval(code);
function play(mode){
  let n=0, seen=[];
  G.nextDilemma();
  while(n++<40){
    const c=G.cur;
    if(G.V.innerHTML.includes('Auditor')&&G.V.innerHTML.includes('audit')) break;
    if(G.V.innerHTML.includes('Avatar reveal')){ G.reveal2(true); G.gate(); continue;}
    if(G.V.innerHTML.includes('will not hold')){ const id=G.V.innerHTML.match(/replay\('(\w+)'\)/)[1]; G.replay(id); continue;}
    seen.push(c.id);
    const k = mode==='doubter'?2:(mode==='lazy'?0:1);
    for(let i=0;i<k;i++) G.reveal();
    G.choose(c.opts[0].id); G.conf(mode==='lazy'?'certain':'leaning'); G.commit();
    const ok=c.args.findIndex(a=>a.ok); G.steel(mode==='lazy'?(ok+1)%3:ok);
    G.afterDilemma();
  }
  return {mode,seen:seen.join(','),S:{doubt:G.S.doubt,tol:G.S.tol,ego:G.S.ego,rung:G.S.rung},end:G.V.innerHTML.includes('audit'),strong:G.V.innerHTML.includes('audit is complete')};
}
console.log(JSON.stringify(play(process.argv[2])));
