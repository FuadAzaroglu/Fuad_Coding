import { test, expect } from '@playwright/test';
import {Given, When, Then } from '@cucumber/cucumber'
import {page,browser} from '../test.setup';
import AllureReporter from '@wdio/allure-reporter';
import * as fs from 'fs';

let products = readProductFromCsv('./src/tests/resources/product_over40.csv');
//const products: string[] = ["Sauce Labs Backpack", "Sauce Labs Bolt T-Shirt", "Sauce Labs Fleece Jacket"];
Given('I navigate to login page',async function(){
    AllureReporter.addFeature('Login Feature');
    AllureReporter.addSeverity('Critical');
    AllureReporter.addDescription('This test case verifies More than 40 Price product order',"test");

    await page.goto('https://www.saucedemo.com/');
});
When('User login with {string} and {string}',async function(userName: string, password: string){
    await page.getByPlaceholder('Username').type(userName);
    await page.getByPlaceholder('Password').type(password);
    await page.locator("#login-button").click();

    console.log('In when step');
});
Then('Login is successful',async function(){
    console.log('In Then step');
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
});

Then('Add products in cart from csv file {string}',async function(usecsvFileName: string){
    console.log('In Then step : Add products in cart');
    products = readProductFromCsv('./src/tests/resources/'+usecsvFileName);
    for (const str of products) {
        expect(page.locator('//div[text()="'+str+'"]//ancestor::div[@class="inventory_item_description"]//button')).toBeVisible();
        await page.locator('//div[text()="'+str+'"]//ancestor::div[@class="inventory_item_description"]//button').click();
    }
    
});

Then('Products are added in cart',async function(){
    console.log('In Then step : Products are added in cart');
    await expect(page.locator('//*[@id="shopping_cart_container"]/a/span')).toHaveText('3')

});
Then('Navigate to cart page',async function(){
    console.log('In Then step : Navigate to cart page');
    await page.locator('//*[@id="shopping_cart_container"]/a/span').click();
    await expect(page.locator('//button[text()="Checkout"]')).toBeVisible();

});

Then('Click On Checkout',async function(){
    console.log('In Then step : Click On Checkout');
    await page.locator('//button[text()="Checkout"]').click();
    await expect(page.getByPlaceholder('First Name')).toBeVisible();
    await expect(page.getByPlaceholder('Last Name')).toBeVisible();
    await expect(page.getByPlaceholder('Zip/Postal Code')).toBeVisible();
    await expect(page.locator('//input[@id="continue"]')).toBeVisible();
});

Then('Provide user detail and select continue',async function(){
    console.log('In Then step : Provide user detail and select continue');
    await page.getByPlaceholder('First Name').type('David');
    await page.getByPlaceholder('Last Name').type('Peter');
    await page.getByPlaceholder('Zip/Postal Code').type('925301');
    await page.locator('//input[@id="continue"]').click();
    await expect(page.getByText('Checkout: Overview')).toBeVisible();

});
Then('Remove a product from cart',async function(){
    console.log('In Then step : Remove a product from cart');
    await page.locator('//div[text()="'+products[0]+'"]//ancestor::div[@class="cart_item_label"]//button').click();
});

Then('Verify total prices is more than limit',async function(){
    console.log('In Then step : Verify total prices is more than limit');
    const totalPrice =  await page.locator('//div[@class="summary_total_label"]').first().innerText();
    const extractedPrice = extractFloatNumbersFromString(totalPrice);
    console.log('extracted product '+extractedPrice);
    await expect(extractedPrice).toBeGreaterThan(40);
});

Then('Verify total prices is less than limit',async function(){
    console.log('In Then step : Verify total prices is less than limit');
    const totalPrice =  await page.locator('//div[@class="summary_total_label"]').first().innerText();
    const extractedPrice = extractFloatNumbersFromString(totalPrice);
    console.log('extracted product '+extractedPrice);
    await expect(extractedPrice).toBeLessThanOrEqual(40);

});

Then('Click Finish Button',async function(){
        await page.locator('//button[@id="finish"]').click();
        await expect(page.locator('//h2[text()="Thank you for your order!"]')).toBeVisible();
});
Then('Click Back Home Button',async function(){
    await expect(page.locator('//button[@name="back-to-products"]')).toBeVisible();
    await page.locator('//button[@name="back-to-products"]').click();

});
Then('Logout Application',async function(){
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
    await page.locator('#react-burger-menu-btn').click();

    await expect(page.locator('//a[text()="Logout"]')).toBeVisible();
    await page.locator('//a[text()="Logout"]').click();

    await expect(page.locator('#login-button')).toBeVisible();
});
Then('click Cancel Button',async function(){
    await page.locator('//button[@id="cancel"]').click();
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
});
function extractFloatNumbersFromString(input: string): number {
    const regex = /[+-]?\d+(\.\d+)?/g;
    const matches = input.match(regex);
    if (!matches) return 0; // Return an empty array if no matches found

    // Convert the matched strings to numbers
    const numbers = matches.map(match => parseFloat(match));
    return numbers[0];
}

function readProductFromCsv(filePath: string): string[] {
    const csvData = fs.readFileSync(filePath, 'utf8');
    const rows = csvData.split('\n');
    const products: string[] = [];
    for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(',');
        for(const product of columns)
            {
                const productName = product;
                products.push(productName);
            }
    }

    return products;
}