const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // abre janela visível
  const page = await browser.newPage();

  // User Agent do Edge Mobile (Android)
  await page.setUserAgent(
    'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36 EdgA/115.0.0.0'
  );

  // Simula viewport de celular (ex: iPhone X ou similar)
  await page.setViewport({
    width: 375,
    height: 812,
    isMobile: true,
    hasTouch: true,
  });

  // Vai até o Bing
  await page.goto('https://www.bing.com', { waitUntil: 'networkidle2' });

  // Espera o campo de pesquisa
  await page.waitForSelector('input[name="q"]');

  // Digita a pesquisa e envia
  await page.type('input[name="q"]', 'como preservar ervas');
  await page.keyboard.press('Enter');

  // Aguarda os resultados carregarem
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  console.log('Pesquisa feita como Edge Mobile!');
})();
