// SPDX-License-Identifier: AGPL-3.0-or-later
// Content checks for prototype/dilemmas.js, plus ladder reachability.
// Run via test.sh (expects g.js = dilemmas.js + page script).
const fs=require('fs'), path=require('path');
const src=fs.readFileSync(path.join(__dirname,'..','prototype','dilemmas.js'),'utf8');
eval(src+';global.C={DILEMMAS,VARIANTS,AXES,RUNGS,CHAINS,CHANCE,PER_RUNG,FINAL,PRACTICE};');
const {DILEMMAS,VARIANTS,AXES,RUNGS,CHAINS,CHANCE,PER_RUNG,FINAL,PRACTICE}=C;
const errs=[];
const AVATAR_TAGS=["util","duty","loyal","now","later","world","seeker","reframe","we","stay","switch","continuity","change","self"];
// Every dilemma, and every variant as the game would play it (merged over its dilemma).
const versions=Object.entries(DILEMMAS).concat([["practice",PRACTICE]]);
let nvar=0;
for(const [id,vs] of Object.entries(VARIANTS)){
  if(!DILEMMAS[id]) { errs.push(`variant of missing dilemma ${id}`); continue; }
  vs.forEach((v,i)=>{
    nvar++;
    const base=DILEMMAS[id], m={...base,...v}, name=`${id} variant ${i+1}`;
    for(const k of ["title","text","src"]) if(!v[k]||v[k]===base[k]) errs.push(`${name}: needs its own ${k}`);
    if(m.options.map(o=>o.id).join()!==base.options.map(o=>o.id).join()) errs.push(`${name}: must keep the option ids`);
    versions.push([name,m]);
  });
}
for(const [id,d] of versions){
  const e=m=>errs.push(`${id}: ${m}`);
  for(const k of ["title","mr","text","src"]) if(!d[k]) e(`missing ${k}`);
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
// Axes use known tags, each tag on one axis only, and name both sides.
const axisTags=AXES.flatMap(ax=>[...ax.a,...ax.b]);
for(const t of axisTags) if(!AVATAR_TAGS.includes(t)) errs.push(`axis uses unknown tag ${t}`);
if(new Set(axisTags).size!==axisTags.length) errs.push("a tag appears on more than one axis side");
for(const ax of AXES) if(ax.words?.length!==2) errs.push(`axis ${ax.a} needs a word for each side`);
for(const id of Object.keys(CHANCE)) if(!RUNGS.some(r=>r.pool.includes(id))) errs.push(`CHANCE names ${id}, which is in no pool`);
// Every pooled id exists; every dilemma (except chain sequels picked by the engine, and FINAL) is in some pool.
const pooled=new Set(RUNGS.flatMap(r=>[...r.pool,...(r.always?[r.always]:[])]));
for(const id of pooled) if(!DILEMMAS[id]) errs.push(`pool references missing ${id}`);
const sequels=["trolleyKin","trolleyKin2"];
for(const id of Object.keys(DILEMMAS)) if(!pooled.has(id)&&id!==FINAL&&!sequels.includes(id)) errs.push(`${id} is not in any rung pool`);
for(const r of RUNGS) if(r.pool.length<PER_RUNG+1) errs.push(`rung ${r.name} pool too small to vary`);
console.log(errs.length?`CONTENT ERRORS:\n  ${errs.join("\n  ")}`:`content ok: ${Object.keys(DILEMMAS).length} dilemmas, ${nvar} variants, ${RUNGS.length} rungs`);
process.exitCode=errs.length?1:0;
