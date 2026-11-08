// SPDX-License-Identifier: AGPL-3.0-or-later
// Headless playthrough of prototype/index.html with a stubbed DOM.
// Usage: node sim.js <doubter|changer|middle|lazy|decoy|group|reach|reveal|resume>
const fs=require('fs'), path=require('path');
const el=()=>({style:{},textContent:'',innerHTML:'',setAttribute(){},getContext:()=>new Proxy({},{get:()=>()=>{}}),classList:{add(){}}});
const els={};
const cls=new Set();
global.document={body:{classList:{add:c=>cls.add(c),remove:c=>cls.delete(c)}},getElementById:id=>els[id]||(els[id]=el()),querySelectorAll:()=>[]};
global.innerWidth=800;global.innerHeight=600;global.devicePixelRatio=1;
const LS={};global.localStorage={getItem:k=>k in LS?LS[k]:null,setItem:(k,v)=>{LS[k]=String(v)},removeItem:k=>{delete LS[k]}};
global.addEventListener=()=>{};global.requestAnimationFrame=()=>{};
eval(fs.readFileSync(path.join(__dirname,'g.js'),'utf8')+`
;global.G={AVATARS,avatarReveal,buildPlan,DILEMMAS,FINAL,tryWord,SECRET_HASH,loadSave,SAVE_KEY,DMAX,LS,wordHash,S,get cur(){return cur},newPlayer,turn,renderDilemma,roomSplit,steelTurn,progress,nextDilemma,reveal,choose,conf,commit,steel,afterDilemma,reveal2,gate,replay,V,lit};`);
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
function play(mode,stopAfter){
  const gateMsg=unlockGate();
  let n=0, seen=[], maxLitBeforeFinal=0, revealMsgs=[];
  G.nextDilemma();
  while(n++<60){
    const html=G.V.innerHTML;
    if(html.includes('A message from the Auditor')) break;
    if(html.includes('Avatar reveal')){ G.reveal2(true); revealMsgs.push(els.revfb.innerHTML.replace(/<[^>]+>/g,'').slice(0,45)); G.gate(); continue;}
    if(html.includes('will not hold')){ G.replay(html.match(/replay\('(\w+)'\)/)[1]); continue;}
    if(html.includes('Climb on')){ G.nextDilemma(); continue;}
    if(stopAfter && seen.length>=stopAfter) break;
    const c=G.cur; seen.push(c.id);
    if(html.includes('Pass the device')) throw Error('hand-off screen in solo play');
    // A first answer must come before any reveal.
    G.reveal(); if(c.shown) throw Error('revealed before a first answer');
    G.choose(c.opts[0].id);
    const k={doubter:3,changer:3,middle:1,lazy:0,decoy:3}[mode];
    for(let i=0;i<k;i++) G.reveal();
    // The changer switches answer after looking, on every dilemma (only a quarter of them can count).
    if(mode==='changer') G.choose(c.opts.find(o=>o.id!==c.first).id);
    G.conf(mode==='lazy'?'certain':'leaning'); G.commit();
    const want={doubter:'ok',changer:'ok',middle:'ok',lazy:'bad',decoy:'decoy'}[mode];
    G.steel(c.args.findIndex(a=>a.kind===want));
    if(!c.final) maxLitBeforeFinal=Math.max(maxLitBeforeFinal,G.lit());
    G.afterDilemma();
  }
  const end=G.V.innerHTML.includes('A message from the Auditor');
  const P=G.S.players[0];
  return {gate:gateMsg,mode,dmax:G.DMAX,dilemmas:seen.length,S:{doubt:P.doubt,tol:P.tol,ego:P.ego,rung:G.S.rung},
    maxLitBeforeFinal,finalLit:G.lit(),end,strong:G.V.innerHTML.includes('audit is complete'),revealMsgs};
}
if(process.argv[2]==='reveal'){
  // Public reveal: 6 other players, distinct names, none equal to the player's, each shown in English and Marathi.
  let bad=0; const keys=Object.keys(G.AVATARS);
  for(let i=0;i<500;i++){
    G.S.players[0].tags={[keys[i%keys.length]]:1};
    G.avatarReveal();
    const me=G.V.innerHTML.match(/<b>([^<]+)<\/b>/)[1];
    const others=[...G.V.innerHTML.matchAll(/<span>[^<]*?: ([^·<]+) · ([^<]+)<\/span>/g)].map(m=>m[1].trim());
    if(others.length!==6||new Set(others).size!==6||others.includes(me)) bad++;
  }
  console.log(bad?'REVEAL FAIL in '+bad+' of 500':'reveal ok: 6 distinct bilingual names, never the player\'s own');
} else if(process.argv[2]==='reach'){
  // Over many drawn ladders, every dilemma should turn up at least once.
  const seen=new Set([G.FINAL,'trolleyKin','trolleyKin2']);
  for(let i=0;i<2000;i++) G.buildPlan().flat().forEach(id=>seen.add(id));
  const missing=Object.keys(G.DILEMMAS).filter(id=>!seen.has(id));
  console.log(missing.length?'UNREACHABLE: '+missing.join(','):'reach ok: every dilemma appears in some ladder');
} else if(process.argv[2]==='group'){
  // Pass-and-play with three players who play differently. Checks: everyone answers every dilemma in private,
  // the room split counts every answer, each steelman targets another player's real answer when one differs,
  // the reveal names everyone, and the run reaches the Auditor.
  unlockGate();
  const S=G.S; S.mode='group'; S.players=['Asha','Bo','Chitra','Dev'].map(G.newPlayer); S.turn=0;
  // Dev doesn't look under the first two dilemmas, so the ladder stops for Dev alone and Dev replays.
  const style=['doubter','changer','middle','slow'];
  let n=0, rounds=0, steelOk=0, steelAll=0, reveals=0, replays=0;
  G.nextDilemma();
  while(n++<400){
    const html=G.V.innerHTML;
    if(html.includes('A message from the Auditor')) break;
    if(html.includes('Climb on')){ G.nextDilemma(); continue; }
    if(html.includes('will not hold')){ replays++; if(!html.includes('Dev')) throw Error('wrong player held back'); G.replay(html.match(/replay\('(\w+)'\)/)[1]); continue; }
    if(html.includes('Every avatar must now')){
      reveals++;
      if(!S.players.every(p=>html.includes('<b>'+p.name+'</b>'))) throw Error('reveal misses a player');
      S.players.forEach((_,i)=>G.reveal2(i!==1,i)); G.gate(); continue;
    }
    const c=G.cur;
    if(html.includes('Pass the device')){
      const who=S.players[S.turn].name;
      if(!html.includes(who)) throw Error('hand-off names the wrong player');
      G.renderDilemma();
      const mode=style[S.turn];
      G.choose(c.opts[0].id);
      const slowNow=mode==='slow' && S.players[3].history.length<2 && !c.isReplay;
      for(let i=0;i<(slowNow?0:{doubter:3,changer:3,middle:1,slow:3}[mode]);i++) G.reveal();
      if(mode==='changer') G.choose(c.opts.find(o=>o.id!==c.first).id);
      G.conf('leaning'); G.commit();
      if(c.k<c.who.length) G.turn(); else { rounds++;
        G.roomSplit();
        const counted=(G.V.innerHTML.match(/<div>(\d+)<\/div>/g)||[]).reduce((s,x)=>s+ +x.replace(/\D/g,''),0);
        if(counted!==c.who.length) throw Error('split counts '+counted+' of '+c.who.length);
        for(let k=0;k<c.who.length;k++){
          G.steelTurn(); const h=G.V.innerHTML, i=c.who[k];
          const others=c.who.filter(j=>j!==i && c.answers[j].choice!==c.answers[i].choice && c.d.options.some(o=>o.id===c.answers[j].choice));
          steelAll++; if(!others.length || /'s answer/.test(h)) steelOk++;
          if(c.target.id===c.answers[i].choice) throw Error('asked to steelman own answer');
          G.steel(c.args.findIndex(a=>a.kind==='ok'));
        }
        G.afterDilemma();
      }
      continue;
    }
    throw Error('unexpected screen: '+html.slice(0,120));
  }
  const end=G.V.innerHTML.includes('A message from the Auditor');
  const ok=end && replays>0 && reveals===2 && steelOk===steelAll && S.players.every(p=>p.history.length>=12);
  console.log((ok?'group ok: ':'GROUP FAIL: ')+JSON.stringify({rounds,replays,reveals,steel:`${steelOk}/${steelAll}`,stars:G.lit(),
    players:S.players.map(p=>`${p.name} d${p.doubt} t${p.tol} e${p.ego} h${p.history.length}`)}));
} else if(process.argv[2]==='resume'){
  // Play part of a run, then check the saved state loads back the same, and that a bad save is dropped.
  play('doubter',5);
  const back=G.loadSave(), S=G.S;
  const P=S.players[0], B=back&&back.players[0];
  const same=back && back.rung===S.rung && back.step===S.step && B.doubt===P.doubt && B.history.length===P.history.length && back.resume;
  G.LS[G.SAVE_KEY]=G.LS[G.SAVE_KEY].replace(/"shreyas"|"monty"|"nachiketa"|"boxes"/,'"nosuchdilemma"');
  const dropped=G.loadSave()===null;
  console.log(same&&dropped?`resume ok: saved at rung ${S.rung+1} step ${S.step} (${S.resume}), stale save dropped`:'RESUME FAIL '+JSON.stringify({same:!!same,dropped}));
} else console.log(JSON.stringify(play(process.argv[2])));
