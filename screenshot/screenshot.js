/*
  In this exercise we will screenshot a webpage with Puppeteer
*/

const puppeteer = require('puppeteer'); // calling puppeteer package

const main = async () => {
  const browser = await puppeteer.launch(); // initializes the instance
  const page = await browser.newPage(); // get the browser instance
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.goto('https://unsplash.com'); // go to website
  await page.screenshot({ path: 'unsplash2.png' }); // screenshot the website and name it as 'unsplash.png'
  await browser.close();
}

main();