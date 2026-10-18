'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {mkdtempSync,mkdirSync,rmSync}=require('node:fs');
const {join}=require('node:path');
const {tmpdir}=require('node:os');
const {execFileSync}=require('node:child_process');

test('clean outside project can install npm tarball and execute public API',()=>{
 const base=mkdtempSync(join(tmpdir(),'decision-systems-consumer-'));
 try{
  const dist=join(base,'dist');
  const app=join(base,'external-consumer');
  mkdirSync(dist);mkdirSync(app);
  const archive=execFileSync('npm',['pack','--silent','--pack-destination',dist],{
   cwd:join(__dirname,'..'),encoding:'utf8',timeout:30000
  }).trim().split('\n').pop();
  assert.match(archive,/decision-systems-.*\.tgz$/);
  execFileSync('npm',['install','--ignore-scripts','--no-audit','--no-fund','--offline',join(dist,archive)],{
    cwd:app,timeout:45000,stdio:'pipe'
  });
  const output=execFileSync(process.execPath,['-e',`
    const assert=require('node:assert/strict');
    const {decide,record,toActionTraits}=require('decision-systems');
    const safe=decide({clear:true,consequential:false,reversible:true});
    const unknown=decide({clear:true,consequential:false});
    assert.equal(safe.decider,'system');
    assert.equal(unknown.reason,'reversibility_unverified');
    const e=record({happened:'Demo lead',next:'Save a draft',clear:true,consequential:false,reversible:true});
    assert.equal(e.decider,'system');
    assert.equal(toActionTraits(e).reversible,true);
    process.stdout.write('CONSUMER_OK');
  `],{cwd:app,encoding:'utf8',timeout:10000});
  assert.equal(output,'CONSUMER_OK');
 }finally{rmSync(base,{recursive:true,force:true})}
});
