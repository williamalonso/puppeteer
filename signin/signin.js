/*
  In this exercise we will Sign In on Facebook with Puppeteer
*/
const puppeteer = require('puppeteer');

const SECRET_EMAIL = 'teste@gmail.com';
const SECRET_PASSWORD = 'teste';

const main = async () => {
  const browser = await puppeteer.launch({ // initializes the instance
    headless: false, // By default Puppeteer launches Chrome in old Headless mode. To launch a "headful" version of Chrome, set the headless to ".false"
  });
  const page = await browser.newPage(); // get the browser instance
  await page.goto('https://br.pinterest.com/login/', {
    waitUntil: 'networkidle2'
  });
  await page.waitForSelector('#mweb-unauth-container'); // wait for a certain element to be loaded. In this case, wait the Pinterest Login Fom.
  await page.type('input#email', SECRET_EMAIL); // Insert email on email input
  await page.type('input#password', SECRET_PASSWORD); // Insert password on password input
  await page.click('.SignupButton '); // Clicks on login button
  // await browser.close();
}

main();