// SPDX-License-Identifier: AGPL-3.0-or-later
// Headless playthrough of prototype/index.html with a stubbed DOM.
// Usage: node sim.js <doubter|changer|middle|lazy|decoy|group|reach|reveal|resume|earlier|variants|adapt|adaptstats>
const fs=require('fs'), path=require('path');
const el=()=>({style:{},textContent:'',innerHTML:'',setAttribute(){},getContext:()=>new Proxy({},{get:()=>()=>{}}),classList:{add(){}}});
const els={};
const cls=new Set();
global.document={body:{classList:{add:c=>cls.add(c),remove:c=>cls.delete(c)}},getElementById:id=>els[id]||(els[id]=el()),querySelectorAll:()=>[]};
global.innerWidth=800;global.innerHeight=600;global.devicePixelRatio=1;
const LS={};global.localStorage={getItem:k=>k in LS?LS[k]:null,setItem:(k,v)=>{LS[k]=String(v)},removeItem:k=>{delete LS[k]}};
global.addEventListener=()=>{};global.requestAnimationFrame=()=>{};
eval(fs.readFileSync(path.join(__dirname,'g.js'),'utf8')+`
;global.G={AXES,RUNGS,sideOf,leanOf,targetAxis,retarget,whatChangedNote,shiftLine,EARLIER,showDilemma,VARIANTS,dilemmaOf,save,AVATARS,avatarReveal,buildPlan,DILEMMAS,FINAL,tryWord,SECRET_HASH,loadSave,SAVE_KEY,DMAX,LS,wordHash,S,get cur(){return cur},newPlayer,turn,renderDilemma,roomSplit,steelTurn,progress,nextDilemma,reveal,choose,conf,commit,steel,afterDilemma,reveal2,gate,replay,V,lit};`);
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
} else if(process.argv[2]==='earlier'){
  // Each player in a group is reminded of their own trolley answer, in both sequels, even in the minority.
  const S=G.S, D=G.DILEMMAS, t=D.trolley;
  const ids=[...t.options.map(o=>o.id),...t.assumptions.filter(a=>a.unlock).map(a=>a.unlock.id)];
  const missing=ids.filter(id=>!G.EARLIER[id]);
  if(missing.length) throw Error('no wording for trolley answer: '+missing);
  S.mode='group'; S.players=ids.map(G.newPlayer); S.turn=0;
  S.players.forEach((p,i)=>p.history.push({id:'trolley',choice:ids[i]}));
  let bad=0;
  for(const seq of ['trolleyKin','trolleyKin2']){
    G.showDilemma(seq,false);
    ids.forEach((id,i)=>{
      G.cur.k=i; G.turn(); G.renderDilemma();
      const h=G.V.innerHTML;
      if(!h.includes('A minute ago '+G.EARLIER[id]+'.')||h.includes('{earlier}')) bad++;
    });
    if(D[seq].options.some(o=>/still|now/i.test(o.label))) bad++;
  }
  // After replaying the trolley with another answer, the latest answer is the one recalled.
  S.players[0].history.push({id:'trolley',choice:'leave'});
  G.showDilemma('trolleyKin',false); G.cur.k=0; G.turn(); G.renderDilemma();
  if(!G.V.innerHTML.includes('A minute ago '+G.EARLIER.leave+'.')) bad++;
  console.log(bad?'EARLIER FAIL: '+bad:'earlier ok: every trolley answer is recalled correctly in both sequels');
} else if(process.argv[2]==='variants'){
  // Variants are drawn, stay fixed for the run and through a save, and every version of every dilemma plays through.
  const S=G.S; let bad=[];
  for(const id of Object.keys(G.VARIANTS)){
    const seen=new Set();
    for(let i=0;i<200;i++){
      delete S.variants[id]; const t=G.dilemmaOf(id).title; seen.add(t);
      if(G.dilemmaOf(id).title!==t) bad.push(id+' changed within a run');
    }
    if(seen.size!==G.VARIANTS[id].length+1) bad.push(id+' drew '+seen.size+' versions');
  }
  G.save('next');
  const back=G.loadSave();
  if(!back||JSON.stringify(back.variants)!==JSON.stringify(S.variants)) bad.push('variants lost in the save');
  let played=0;
  for(const id of Object.keys(G.DILEMMAS)){
    for(let n=0;n<=(G.VARIANTS[id]||[]).length;n++){
      if(G.VARIANTS[id]) S.variants[id]=n;
      G.showDilemma(id,false);
      const c=G.cur;
      if(!G.V.innerHTML.includes(c.d.title)) bad.push(id+'/'+n+' title not shown');
      G.choose(c.opts[0].id); G.reveal(); G.reveal(); G.reveal();
      if(c.opts.length!==3) bad.push(id+'/'+n+' third way not unlocked');
      G.choose(c.opts[2].id); G.conf('leaning'); G.commit();
      if(!G.V.innerHTML.includes('The Split')) bad.push(id+'/'+n+' no split');
      const i=c.args.findIndex(a=>a.kind==='ok');
      if(i<0||c.args.some(a=>!a.t)) bad.push(id+'/'+n+' bad steelman');
      G.steel(i); played++;
    }
  }
  console.log(bad.length?'VARIANTS FAIL: '+bad.join('; '):`variants ok: ${played} versions played through, every version gets drawn, kept through a save`);
} else if(process.argv[2]==='adapt'||process.argv[2]==='adaptstats'){
  const S=G.S, ASK='class="fb ask"';
  const fresh=(names=['You'])=>{ S.plan=G.buildPlan(); S.variants={}; S.rung=0; S.step=0; S.turn=0; S.mode=names.length>1?'group':'solo'; S.players=names.map(G.newPlayer); };
  // Plays one solo run. prefer(option) scores a main option; ties are random. Returns what the player saw.
  const run=prefer=>{
    fresh();
    let n=0, notes=0, shift=null; const planned=[];
    G.nextDilemma();
    while(n++<80){
      const html=G.V.innerHTML;
      if(html.includes('A message from the Auditor')) break;
      if(html.includes('Avatar reveal')){ if(S.rung===3) shift=/The name has moved|has shifted since|What changed\?/.test(html); G.reveal2(true); G.gate(); continue; }
      if(html.includes('will not hold')){ G.replay(html.match(/replay\('(\w+)'\)/)[1]); continue; }
      if(html.includes('Climb on')){ G.nextDilemma(); continue; }
      const c=G.cur; planned.push(c.id);
      const best=[...c.opts].sort((x,y)=>prefer(y)-prefer(x)+(Math.random()-.5)*.01)[0];
      G.choose(best.id); G.reveal(); G.reveal(); G.reveal(); G.conf('leaning');
      G.commit();
      if(G.V.innerHTML.includes(ASK)) notes++;
      G.steel(c.args.findIndex(a=>a.kind==='ok')); G.afterDilemma();
    }
    return {notes,shift,planned};
  };
  const has=(o,...t)=>o.tags.some(x=>t.includes(x));
  const people={ random:o=>0, rules:o=>has(o,'duty')-has(o,'util'), results:o=>has(o,'util')-has(o,'duty'), holder:o=>has(o,'continuity','stay')-has(o,'change','switch') };
  if(process.argv[2]==='adaptstats'){
    // Not a pass/fail test: how often each thing fires, for tuning. Shows 2000 runs per kind of player.
    const touches=(id,ax)=>G.DILEMMAS[id].options.some(o=>G.sideOf(o,ax)!==null);
    const drawn=id=>G.RUNGS.slice(1).some(r=>r.pool.includes(id));   // rung 1 has no answers to target from
    const axisOf={rules:0,results:0,holder:1,random:0};
    for(const [name,p] of Object.entries(people)){
      let notes=0,zero=0,shifts=0,trolley=0,hits=0,all=0,baseHits=0,baseAll=0; const N=2000, ax=G.AXES[axisOf[name]];
      for(let i=0;i<N;i++){
        const r=run(p); notes+=r.notes; if(!r.notes) zero++; if(r.shift) shifts++;
        if(r.planned.includes('trolley')) trolley++;
        for(const id of r.planned) if(drawn(id)){ all++; if(touches(id,ax)) hits++; }
        for(const id of G.buildPlan().flat()) if(drawn(id)){ baseAll++; if(touches(id,ax)) baseHits++; }
      }
      console.log(name.padEnd(8),`notes/run ${(notes/N).toFixed(2)}  runs with no note ${(100*zero/N).toFixed(1)}%  name moved at 2nd reveal ${(100*shifts/N).toFixed(1)}%  trolley ${(100*trolley/N).toFixed(1)}%  dilemmas on their axis ${(100*hits/all).toFixed(1)}% (untargeted ${(100*baseHits/baseAll).toFixed(1)}%)`);
    }
    process.exit(0);
  }
  const bad=[]; const opt=(d,id)=>G.DILEMMAS[d].options.find(o=>o.id===id);
  const answer=(d,id)=>{ G.showDilemma(d,false); G.choose(id); G.conf('unsure'); };
  // A: duty, then util, asks. The same side doesn't. Only once per rung. No effect on the meters.
  fresh(); answer('bhishma','keep'); G.commit();
  if(G.V.innerHTML.includes(ASK)) bad.push('note with nothing to compare');
  answer('halftruth','refuse'); G.commit();
  if(G.V.innerHTML.includes(ASK)) bad.push('note when both answers lean the same way');
  const P=S.players[0];
  answer('city','stay');
  const metersBefore=JSON.stringify([P.doubt,P.tol,P.ego]);
  const seen=G.whatChangedNote(P,opt('city','stay'));
  if(!seen.includes('What changed?')||!seen.includes('Both can be true')) bad.push('no note when answers lean opposite ways');
  if(JSON.stringify([P.doubt,P.tol,P.ego])!==metersBefore) bad.push('the note moved a meter');
  if(G.whatChangedNote(P,opt('fifthhead','cut'))) bad.push('second note in one rung');
  S.rung=1;
  if(!G.whatChangedNote(P,opt('fifthhead','cut'))) bad.push('no note on the next rung');
  // A third way leans nowhere, unless its tags say so; a replay of the same dilemma doesn't compare with itself.
  fresh(); answer('bhishma','keep'); G.commit(); answer('bhishma','break'); G.commit();
  if(G.V.innerHTML.includes(ASK)) bad.push('note compared a dilemma with itself');
  // The final rank never asks.
  fresh(); answer('bhishma','keep'); G.commit(); G.showDilemma(G.FINAL,true);
  if(G.whatChangedNote(S.players[0],{tags:['change']})) bad.push('note on the final rank');
  // Group: the note is private, shown only to the player it is about, never on the room's split.
  fresh(['Asha','Bo']);
  S.players[0].history.push({id:'bhishma',choice:'keep'}); S.players[1].history.push({id:'fifthhead',choice:'cut'});
  G.showDilemma('city',false); G.renderDilemma(); G.choose('stay'); G.conf('unsure'); G.commit();
  const privA=G.V.innerHTML;
  G.turn(); G.renderDilemma(); G.choose('stay'); G.conf('unsure'); G.commit();
  const privB=G.V.innerHTML;
  if(!privA.includes(ASK)) bad.push('group: no private note for the player who leaned both ways');
  if(privB.includes(ASK)) bad.push('group: note shown to the player who did not');
  G.roomSplit();
  if(G.V.innerHTML.includes(ASK)) bad.push('group: note leaked to the room');
  // B: the rung keeps its length, and draws lean toward the target axis.
  for(let i=0;i<300;i++){
    fresh(); S.players[0].history.push({id:'bhishma',choice:'keep'});
    const lengths=S.plan.map(r=>r.length);
    for(let k=1;k<G.RUNGS.length;k++){ S.rung=k; G.retarget(); }
    if(JSON.stringify(S.plan.map(r=>r.length))!==JSON.stringify(lengths)) bad.push('retarget changed a rung length');
    S.plan.forEach((r,k)=>{ if(k && new Set(r).size!==r.length) bad.push('rung drew a dilemma twice'); });
  }
  fresh(); if(G.targetAxis()!==null) bad.push('a target axis with no answers yet');
  // The trolley's chance holds both at the first draw and after targeting, whatever the player leans toward.
  const N=20000; let drawnFirst=0, retargeted=0;
  fresh(); S.players[0].history.push({id:'shreyas',choice:'now'},{id:'monty',choice:'stay'}); S.rung=1;
  for(let i=0;i<N;i++){
    if(G.buildPlan()[1].includes('trolley')) drawnFirst++;
    G.retarget(); if(S.plan[1].includes('trolley')) retargeted++;
    if(S.plan[1].includes('trolley')!==S.plan[1].includes('ADAPT_TROLLEY')) bad.push('trolley without its sequel');
  }
  for(const [what,n] of [['first draw',drawnFirst],['after targeting',retargeted]]) if(Math.abs(n/N-.25)>.015) bad.push(`trolley in ${(100*n/N).toFixed(1)}% of runs at ${what}`);
  // C: the first reveal says nothing; later ones say whether the name moved.
  if(G.shiftLine(null,'x')) bad.push('shift line at the first reveal');
  if(G.shiftLine('The Loyal','The Loyal').includes('The Loyal')) bad.push('same-name line names the old name');
  if(!G.shiftLine('The Loyal','The Counter').length) bad.push('no line when the name moved');
  // Whole runs still finish, with notes showing up.
  let notes=0; for(let i=0;i<100;i++) notes+=run(people.random).notes;
  if(notes<100) bad.push('notes are rare: '+notes+' in 100 runs');
  console.log(bad.length?'ADAPT FAIL: '+[...new Set(bad)].join('; '):`adapt ok: note, targeted draw and name shift behave, ${notes} notes in 100 runs`);
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
