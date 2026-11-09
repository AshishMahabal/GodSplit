// SPDX-License-Identifier: AGPL-3.0-or-later
// Headless playthrough of prototype/index.html with a stubbed DOM.
// Usage: node sim.js <doubter|changer|middle|lazy|decoy|group|reach|reveal|resume|earlier|variants|adapt|adaptstats|look>
const fs=require('fs'), path=require('path');
const el=()=>({style:{},textContent:'',innerHTML:'',setAttribute(){},getContext:()=>new Proxy({},{get:()=>()=>({addColorStop(){}})}),classList:{add(){},remove(){}}});
const els={};
const cls=new Set();
global.document={body:{classList:{add:c=>cls.add(c),remove:c=>cls.delete(c),toggle:c=>cls.has(c)?(cls.delete(c),false):(cls.add(c),true)}},getElementById:id=>els[id]||(els[id]=el()),querySelectorAll:()=>[],querySelector:()=>null};
global.innerWidth=800;global.innerHeight=600;global.devicePixelRatio=1;
const LS={};global.localStorage={getItem:k=>k in LS?LS[k]:null,setItem:(k,v)=>{LS[k]=String(v)},removeItem:k=>{delete LS[k]}};
global.addEventListener=()=>{};global.requestAnimationFrame=()=>{};global.scrollTo=()=>{};
// The sky interlude waits on a timer. Here it runs at once, so a playthrough stays synchronous.
global.setTimeout=f=>f();
eval(fs.readFileSync(path.join(__dirname,'g.js'),'utf8')+`
;global.G={get scene(){return scene},intro,finale,figSVG,unlock,get shownN(){return shownN},cls,skyBeat,makeSky,saveSkies,loadSkies,skySVG,skiesView,start,ending,SKIES_KEY,SKIES_MAX,toggleHud,AXES,RUNGS,sideOf,leanOf,targetAxis,retarget,whatChangedNote,shiftLine,EARLIER,showDilemma,VARIANTS,dilemmaOf,save,AVATARS,avatarReveal,buildPlan,DILEMMAS,FINAL,tryWord,SECRET_HASH,loadSave,SAVE_KEY,DMAX,LS,wordHash,S,get cur(){return cur},newPlayer,turn,renderDilemma,roomSplit,steelTurn,progress,nextDilemma,reveal,choose,conf,commit,steel,afterDilemma,reveal2,gate,replay,V,lit};`);
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
} else if(process.argv[2]==='look'){
  // The third way's moment, the sky interlude, and the constellations kept after a run.
  const S=G.S, bad=[], door=h=>/class="[^"]*\bdoor\b/.test(h), third=h=>/class="[^"]*\bthird\b/.test(h);
  // Constellations: one per finished run, climbing, the same choices giving the same shape.
  const n0=G.loadSkies().length;
  const r1=play('doubter');
  if(!r1.end) bad.push('run did not finish');
  const all=G.loadSkies();
  if(all.length!==n0+1) bad.push('run saved '+(all.length-n0)+' skies');
  const k=all[all.length-1];
  if(k.pts.length!==12) bad.push('constellation has '+k.pts.length+' stars');
  if(k.pts.some((p,i)=>i&&p[1]>=k.pts[i-1][1])) bad.push('constellation does not climb');
  if(k.pts.some(p=>p[0]<10||p[0]>90||p[1]<8||p[1]>122)) bad.push('star outside the frame');
  if(JSON.stringify(G.makeSky(S.players[0]).pts)!==JSON.stringify(k.pts)) bad.push('same answers, different shape');
  // Third way: the door animates once, when it opens, and stays marked afterwards. The next player starts clean.
  S.mode='group'; S.players=['Asha','Bo'].map(G.newPlayer); S.turn=0;
  G.showDilemma('dog',false); G.renderDilemma(); G.choose(G.cur.opts[0].id);
  let opened=0;
  for(let i=0;i<3;i++){
    const had=G.cur.doorId; G.reveal();
    if(G.cur.doorId&&!had){ opened++; if(!door(G.V.innerHTML)) bad.push('no door when the third way opened'); }
    else if(door(G.V.innerHTML)) bad.push('door animated without opening');
  }
  if(opened!==1) bad.push('third way opened '+opened+' times');
  G.conf('unsure');
  if(door(G.V.innerHTML)) bad.push('door animated again on the next render');
  if(!third(G.V.innerHTML)||!G.V.innerHTML.includes('doorline')) bad.push('third way lost its mark');
  G.commit(); G.turn(); G.renderDilemma();
  if(third(G.V.innerHTML)||G.V.innerHTML.includes('doorline')) bad.push('next player sees the door before finding it');
  // Interlude: the sky catches up with the meters only at this moment, and always moves on.
  S.mode='solo'; S.players=[G.newPlayer('You')]; S.turn=0;
  let moved=0, P=S.players[0], from=G.shownN;
  P.doubt=20; P.tol=10;
  const target=Math.round(G.progress()*120);
  if(G.shownN!==from) bad.push('sky moved before the interlude');
  G.skyBeat(()=>moved++);
  if(moved!==1) bad.push('interlude did not move on');
  if(G.shownN!==target) bad.push('sky did not catch up: '+G.shownN+' of '+target);
  if(G.cls.has('gaze')) bad.push('interlude stayed on screen');
  G.skyBeat(()=>moved++);
  if(moved!==2) bad.push('no move on when no stars were lit');
  // Slim bar: tapping folds and unfolds the meters.
  G.toggleHud(); if(!G.cls.has('hudopen')) bad.push('meters did not open'); G.toggleHud(); if(G.cls.has('hudopen')) bad.push('meters did not close');
  // Marks: third way gold, a let-go first answer as a branch, size from what was questioned.
  S.players=[G.newPlayer('You')];
  S.players[0].history.push({id:'dog',choice:'ask',first:'enter',examined:3},{id:'monty',choice:'stay',first:'switch',examined:1},{id:'pascal',choice:'nobet',first:null,examined:0});
  const m=G.makeSky(S.players[0]).pts;
  if(m[0][3]!==1||m[1][3]!==0) bad.push('third way not marked');
  if(m[0][4]===undefined||m[1][4]===undefined||m[2][4]!==undefined) bad.push('branches wrong');
  if(m[0][2]!==3||m[2][2]!==0) bad.push('size does not follow what was questioned');
  // The page: start offers the skies, the view lists them, and bad or overfull storage is handled.
  G.start();
  if(!G.V.innerHTML.includes('Your skies ('+G.loadSkies().length+')')) bad.push('start screen does not offer the skies');
  G.skiesView();
  if((G.V.innerHTML.match(/<figure>/g)||[]).length!==G.loadSkies().length) bad.push('skies view misses some');
  G.saveSkies(Array.from({length:70},(_,i)=>({...k,lit:i})));
  const kept=G.loadSkies();
  if(kept.length!==G.SKIES_MAX||kept[kept.length-1].lit!==69) bad.push('cap should keep the newest');
  G.LS[G.SKIES_KEY]='not json'; if(G.loadSkies().length!==0) bad.push('bad storage not handled');
  G.LS[G.SKIES_KEY]='{"a":1}'; if(G.loadSkies().length!==0) bad.push('wrong storage not handled');
  // Group: one constellation per player, shown at the end, and a new run doesn't clear them.
  delete G.LS[G.SKIES_KEY];
  S.mode='group'; S.players=['Asha','Bo'].map(G.newPlayer);
  S.players.forEach(p=>p.history.push({id:'dog',choice:'enter',first:null,examined:1},{id:G.FINAL,choice:'show',first:null,examined:1}));
  G.ending();
  const g=G.loadSkies();
  if(g.length!==2||g[0].who!=='Asha'||g[1].who!=='Bo') bad.push('group skies wrong');
  if((G.V.innerHTML.match(/<svg/g)||[]).length!==2) bad.push('group ending should show 2 constellations');
  // The opening: once per device, skipped for a saved run, leaving the sky as it was and no scene running.
  delete G.LS.gs_intro; S.mode='solo'; S.players=[G.newPlayer('You')]; S.resume=null;
  G.unlock();
  if(G.LS.gs_intro!=='1') bad.push('opening not remembered');
  if(G.cls.has('stage')) bad.push('opening stayed on screen');
  if(G.scene) bad.push('opening left its scene running');
  if(!G.V.innerHTML.includes('The stars have gone dark')) bad.push('opening did not lead to the start screen');
  if(!G.V.innerHTML.includes('Watch the opening again')) bad.push('no way to watch it again');
  delete G.LS.gs_intro; S.resume='next'; G.unlock();
  if(G.LS.gs_intro) bad.push('saved run should go straight on, without the opening');
  S.resume=null;
  // The figure: on the Fifth Head and nowhere else, and it never needs a face.
  G.showDilemma('fifthhead',false);
  if(!G.V.innerHTML.includes('closeup')) bad.push('no figure at the Fifth Head');
  if(!/hand raised in blessing/.test(G.DILEMMAS.fifthhead.text)) bad.push('Fifth Head text should mention the hand');
  G.showDilemma('dog',false);
  if(G.V.innerHTML.includes('closeup')) bad.push('figure on another dilemma');
  // The ending: both verdicts pass through the finale and arrive at the Auditor.
  for(const [doubt,tol,want] of [[42,24,'audit is complete'],[2,0,'audit continues']]){
    S.mode='solo'; S.players=[G.newPlayer('You')]; const Q=S.players[0];
    Q.doubt=doubt; Q.tol=tol; Q.history.push({id:G.FINAL,choice:'show',first:null,examined:1});
    let arrived=false; G.finale(()=>{arrived=true; G.ending();});
    if(!arrived||!G.V.innerHTML.includes(want)) bad.push('finale did not reach: '+want);
    if(G.cls.has('stage')) bad.push('finale stayed on screen');
  }
  console.log(bad.length?'LOOK FAIL: '+bad.join('; '):'look ok: third way, sky interlude, slim bar, constellations, opening and figure behave');
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
