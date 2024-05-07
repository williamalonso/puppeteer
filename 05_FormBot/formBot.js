/*
  This is a bot to access a website and to fill a form
*/
const puppeteer = require('puppeteer');

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8000/produtos/compute', {
    waitUntil: 'networkidle2'
  });
  
  await page.waitForTimeout(2000);

  // const iframeSelector = '.grecaptcha-logo iframe';
  // await page.waitForSelector(iframeSelector);
  // const frameHandle = await page.waitForSelector('iframe[name^="a-"]');
  // const frame = await frameHandle.contentFrame();
  // await frame.waitForSelector('.recaptcha-checkbox-checkmark');
  // const frameHandle = await page.$(iframeSelector);
  // const frame = await frameHandle.contentFrame();
  
  await page.type('#rd-text_field-lj4kwjr5', 'Desenvolvimento teste');
  await page.type('#rd-email_field-lj4kwjr6', 'walonso@binario.cloud');
  await page.type('#rd-phone_field-lj4kwjr7', '+55 (61) 98157-1069');
  await page.type('#rd-text_field-lj4kwjr8', 'Binario Cloud');

  // await frame.click('.recaptcha-checkbox-checkmark');
  await page.click('#rd-button-kzy9efdz');
}

main();