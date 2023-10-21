/*
  In this exercise we will create a pdf with Puppeteer
*/

const puppeteer = require('puppeteer'); // calling puppeteer package

const main = async () => {
  const browser = await puppeteer.launch(); // initializes the instance
  const page = await browser.newPage(); // get the browser instance
  await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle2' }); // networkidle2 consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
  await page.pdf({ path: 'hn.pdf', format: 'A4' });
  await browser.close();
}

main();