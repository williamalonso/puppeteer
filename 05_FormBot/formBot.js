/*
  This is a bot to access a website and to fill a form
*/
const puppeteer = require('puppeteer');

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://binario.cloud/produtos/storage/object-storage', {
    waitUntil: 'networkidle2'
  });
  
  await page.waitForTimeout(2000);

  const frameHandle = await page.waitForSelector('iframe[name^="a-"]');
  const frame = await frameHandle.contentFrame();
  await frame.waitForSelector('.recaptcha-checkbox-checkmark');
  
  // await page.type('#rd-text_field-lj4kwjr5', 'teste');
  // await page.type('#rd-email_field-lj4kwjr6', 'teste@mail.com');
  // await page.type('#rd-phone_field-lj4kwjr7', '+55 (61) 98157-1069');
  // await page.type('#rd-text_field-lj4kwjr8', 'Binario');

  await page.type('#rd-text_field-lj4kv7w9', 'teste');
  await page.type('#rd-email_field-lj4kv7wa', 'teste@mail.com');
  await page.type('#rd-phone_field-lj4kv7wb', '+55 (61) 98157-1069');
  await page.type('#rd-text_field-lj4kv7wc', 'Binario');

  await frame.click('.recaptcha-checkbox-checkmark');
}

main();