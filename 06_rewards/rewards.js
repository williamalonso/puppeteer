const puppeteer = require('puppeteer');

const main = async () => {

  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto('https://www.bing.com/?FORM=Z9FD1', {
    waitUntil: 'networkidle2'
  });

  await page.waitForTimeout(4000);
  
  try {
    await page.type('#sb_form_q', 'Desenvolvimento frontend');
    // Simula a pressão da tecla "Enter"
    await page.keyboard.press('Enter');
  } catch(e) {
    console.log('Error when searching for specifc field');
  }

  // Finishes the instance
  // await browser.close();

}

main();