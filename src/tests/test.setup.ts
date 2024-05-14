import {Before, BeforeAll, AfterAll, After, setDefaultTimeout} from '@cucumber/cucumber'
import {chromium, Browser, BrowserContext, Page} from 'playwright'

let browser:Browser;
let page:Page;
let context: BrowserContext;
setDefaultTimeout(60000)
BeforeAll(async function () {
    browser = await chromium.launch({
        headless:false,
        slowMo:1000
    });
    
});

AfterAll(async function(){
    await browser.close();
})

Before(async function () {
    context = await browser.newContext({permissions: []});
    page = await context.newPage();
})

After(async function(){
    await page.close();
    await context.close();
})


export {page,browser}
