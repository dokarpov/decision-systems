import { chromium } from 'playwright';

const base=process.env.BASE_URL||'http://127.0.0.1:4173';
const viewports=[
  {name:'mobile-320',width:320,height:700},
  {name:'mobile-390',width:390,height:844},
  {name:'tablet',width:768,height:1024},
  {name:'desktop',width:1440,height:1000}
];

const browser=await chromium.launch({headless:true});
for(const vp of viewports){
  const context=await browser.newContext({viewport:{width:vp.width,height:vp.height}});
  const page=await context.newPage();
  const errors=[]; page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(base+'/',{waitUntil:'networkidle'});
  const layout=await page.evaluate(()=>({
    scrollWidth:document.documentElement.scrollWidth,
    viewport:innerWidth,
    h1:document.querySelector('h1')?.textContent.trim(),
    decision:document.querySelector('#decision')?.textContent.trim()
  }));
  if(!layout.h1) throw new Error(vp.name+': h1 missing');
  if(layout.scrollWidth>layout.viewport+2) throw new Error(vp.name+': horizontal overflow');
  if(layout.decision!=='DO IT') throw new Error(vp.name+': default decision incorrect');
  await page.locator('input[name="clear"][value="no"]').check();
  if((await page.locator('#decision').textContent()).trim()!=='ASK A PERSON') throw new Error(vp.name+': ambiguity not routed to person');
  await page.locator('input[name="clear"][value="yes"]').check();
  await page.locator('input[name="rev"][value="no"]').check();
  if((await page.locator('#decision').textContent()).trim()!=='ASK A PERSON') throw new Error(vp.name+': irreversible action not routed to person');
  if(errors.length) throw new Error(vp.name+': '+errors.join(' | '));
  console.log('PASS',vp.name);
  await context.close();
}
await browser.close();
