/*
  In this exercise we will search the word "Real Madrid" on "esportes.r7.com/" website
*/

const puppeteer = require('puppeteer');

const searchRealMadrid = async () => {

  // initializes the instance
  const browser = await puppeteer.launch({
    headless: false, // By default Puppeteer launches Chrome in old Headless mode. To launch a "headful" version of Chrome, set the headless to ".false"
  }); 

  // get the browser instance
  const page = await browser.newPage(); 

  // go to website
  await page.goto('https://esportes.r7.com/', {
    waitUntil: 'domcontentloaded'
  });
  
  try {
    // Click on search field
    await page.click('.header-search-base');
    // Type "Real Madrid" on search bar and press Enter
    await page.type('#q', 'Real Madrid');
    await page.keyboard.press('Enter');
  } catch(e) {
    console.log('Error when searching for specifc field');
  }

  try {
    // Wait the result page loading
    await page.waitForSelector('.gsc-results', { visible: true })
  } catch(e) {
    console.log('Error on waitForSelector');
  }

  // Extract and show the search results
  const results = await page.$$eval('.gsc-results', (items) =>
    items.map((item) => item.textContent)
  );

  console.log('Search results for "Real Madrid": ');
  for (const result of results) {
    console.log(result);
  }

  // Finishes the instance
  await browser.close();
  
}

searchRealMadrid();