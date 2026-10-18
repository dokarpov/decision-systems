import { chromium } from 'playwright';

const base=process.env.BASE_URL||'http://127.0.0.1:4173';
const viewports=[
  {name:'small-mobile',width:320,height:700},
  {name:'mobile',width:390,height:844},
  {name:'tablet',width:768,height:1024},
  {name:'desktop',width:1440,height:900}
];

const browser=await chromium.launch({headless:true});
try{
 for(const vp of viewports){
  const context=await browser.newContext({viewport:{width:vp.width,height:vp.height}});
  const page=await context.newPage();
  try{
   const errors=[],failed=[];
   page.on('pageerror',e=>errors.push(String(e)));
   page.on('requestfailed',r=>failed.push(r.url()));
   const response=await page.goto(base+'/',{waitUntil:'networkidle'});
   if(response?.status()!==200)throw new Error(vp.name+': HTTP '+response?.status());
   const info=await page.evaluate(()=>({
     title:document.querySelector('h1')?.textContent.trim(),
     scroll:document.documentElement.scrollWidth,
     viewport:innerWidth
   }));
   if(!info.title?.includes('Which decisions'))throw new Error(vp.name+': heading missing');
   if(info.scroll>info.viewport+2)throw new Error(vp.name+': horizontal overflow');
   const route=page.locator('#decision');
   if((await route.textContent()).trim()!=='SYSTEM DECIDES')throw new Error(vp.name+': safe default');
   await page.locator('#scenario').selectOption('identity');
   if((await route.textContent()).trim()!=='HUMAN REVIEW')throw new Error(vp.name+': duplicate identity should defer');
   await page.locator('#scenario').selectOption('unknown');
   if((await route.textContent()).trim()!=='HUMAN REVIEW')throw new Error(vp.name+': unknown reversibility should defer');
   if(!(await page.locator('#reason').textContent()).includes('unverified'))throw new Error(vp.name+': unknown reason not visible');
   await page.locator('input[name="rev"][value="yes"]').check();
   if((await route.textContent()).trim()!=='SYSTEM DECIDES')throw new Error(vp.name+': known reversible low consequence');
   await page.locator('input[name="impact"][value="yes"]').check();
   if((await route.textContent()).trim()!=='HUMAN REVIEW')throw new Error(vp.name+': consequence should defer');
   // Key product requirement: show consequence of changing an input without manually scrolling to results.
   if(vp.width<=390){
     const metrics=await page.evaluate(()=>{
       const r=document.getElementById('result').getBoundingClientRect();
       return {y:r.y,visible:r.bottom>0&&r.top<innerHeight,top:r.top,bottom:r.bottom,screen:innerHeight};
     });
     if(!metrics.visible)throw new Error(vp.name+': changed result is below viewport: '+JSON.stringify(metrics));
   }
   await page.locator('details summary').click();
   const output=JSON.parse(await page.locator('#output').textContent());
   if(output.decider!=='person'||output.reason!=='consequential')throw new Error(vp.name+': JSON output disagrees with UI');
   const contrast=await page.evaluate(()=>{
    const rgb=str=>(str.match(/\d+(?:\.\d+)?/g)||[]).slice(0,3).map(Number);
    const lum=a=>a.map(v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
    const el=document.querySelector('#reason');const f=lum(rgb(getComputedStyle(el).color)),b=lum(rgb(getComputedStyle(document.querySelector('.result')).backgroundColor));
    return (Math.max(f,b)+.05)/(Math.min(f,b)+.05);
   });
   if(contrast<4.5)throw new Error(vp.name+': result contrast below 4.5:1 '+contrast);
   if(errors.length||failed.length)throw new Error(vp.name+': '+JSON.stringify({errors,failed}));
   console.log('PASS',vp.name);
  }finally{await context.close()}
 }
}finally{await browser.close()}
