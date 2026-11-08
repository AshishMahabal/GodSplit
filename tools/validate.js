// Content checks for prototype/dilemmas.js, plus ladder reachability.
// Run via test.sh (expects g.js = dilemmas.js + page script).
const fs=require('fs'), path=require('path');
const src=fs.readFileSync(path.join(__dirname,'..','prototype','dilemmas.js'),'utf8');
eval(src+';global.C={DILEMMAS,RUNGS,CHAINS,PER_RUNG,FINAL};');
const {DILEMMAS,RUNGS,CHAINS,PER_RUNG,FINAL}=C;
const errs=[];
const AVATAR_TAGS=["util","duty","loyal","now","later","world","seeker","reframe","we","stay","switch","continuity","change","self"];
for(const [id,d] of Object.entries(DILEMMAS)){
  const e=m=>errs.push(`${id}: ${m}`);
  for(const k of ["title","mr","text"]) if(!d[k]) e(`missing ${k}`);
  if(d.options?.length!==2) e("needs exactly 2 options");
  if(d.assumptions?.length!==3) e("needs exactly 3 assumptions");
  const unl=(d.assumptions||[]).filter(a=>a.unlock);
  if(unl.length!==1) e("needs exactly 1 unlocking assumption");
  const all=[...(d.options||[]),...unl.map(a=>a.unlock)];
  const ids=all.map(o=>o.id);
  if(new Set(ids).size!==ids.length) e("duplicate option ids");
  for(const o of all){
    if(!o.label) e(`option ${o.id} has no label`);
    if(!o.tags?.length) e(`option ${o.id} has no tags`);
    for(const t of o.tags||[]) if(!AVATAR_TAGS.includes(t)) e(`unknown tag ${t}`);
    if(typeof d.split?.[o.id]!=="number") e(`no split for ${o.id}`);
  }
  for(const o of d.options||[]){
    const st=d.steel?.[o.id];
    if(!st?.good || st.bad?.length!==2) e(`steel for ${o.id} needs good + 2 bad`);
  }
  const txt=JSON.stringify(d);
  if(txt.includes("—")) e("contains an em dash");
}
// Every pooled id exists; every dilemma (except chain sequels picked by the engine, and FINAL) is in some pool.
const pooled=new Set(RUNGS.flatMap(r=>[...r.pool,...(r.always?[r.always]:[])]));
for(const id of pooled) if(!DILEMMAS[id]) errs.push(`pool references missing ${id}`);
const sequels=["trolleyKin","trolleyKin2"];
for(const id of Object.keys(DILEMMAS)) if(!pooled.has(id)&&id!==FINAL&&!sequels.includes(id)) errs.push(`${id} is not in any rung pool`);
for(const r of RUNGS) if(r.pool.length<PER_RUNG+1) errs.push(`rung ${r.name} pool too small to vary`);
console.log(errs.length?`CONTENT ERRORS:\n  ${errs.join("\n  ")}`:`content ok: ${Object.keys(DILEMMAS).length} dilemmas, ${RUNGS.length} rungs`);
process.exitCode=errs.length?1:0;
