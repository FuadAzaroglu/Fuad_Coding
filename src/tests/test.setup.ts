import {Before, BeforeAll, AfterAll, After, setDefaultTimeout, ITestCaseHookParameter, Status} from '@cucumber/cucumber'
import {chromium, Browser, BrowserContext, Page} from 'playwright'
import {Allure, ContentType} from 'allure-cucumberjs'
let browser:Browser;
let page:Page;
let context: BrowserContext;
let allure: Allure
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

After(async function(scenario: ITestCaseHookParameter){
    console.log("In After "+scenario.result?.status);
    if (scenario.result?.status === Status.FAILED) {
        const screenshotPath = `screenshots/failure-${Date.now()}.png`;
        console.log('Test failed - taking screenshot at  '+screenshotPath)
        await page.screenshot({ path: screenshotPath });
            console.log("Attaching log to allure ");
            const image: any = await page?.screenshot({ type: 'png' });
            image && (await allure?.attachment('screenshot', image, 'image/png'));
      }
    await page.close();
    await context.close();
})


export {page,browser}
