const puppeteer = require('puppeteer');

(async () => {
  
  const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      headless: false,
  });

  const page = await browser.newPage();

  // User Agent do Edge Mobile (Android)
  await page.setUserAgent(
    'Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.7049.38 Mobile Safari/537.36 EdgA/134.0.3124.105'
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

  // Lista de pesquisas
  const pesquisas = [
    'como cultivar ervas em apartamento',
    'chá de camomila para dormir',
    'horta vertical caseira simples',
    'temperos que combinam com frango',
    'plantas aromáticas que espantam insetos',
    'como cuidar de manjericão em vaso',
    'ervas medicinais e seus benefícios',
    'como plantar hortelã em garrafa pet',
    'receitas com alecrim fresco',
    'diferença entre ervas e temperos',
    'como secar ervas em casa',
    'benefícios do chá de erva-doce',
    'como fazer um jardim de temperos na cozinha',
    'ervas que ajudam na digestão',
    'como armazenar ervas frescas por mais tempo',
    'plantas que purificam o ar',
    'como montar uma mini horta em apartamento',
    'horta em vasos: o que plantar',
    'ervas fáceis de cultivar para iniciantes',
    'como usar lavanda na culinária',
    'atividades para a familia',
    'atividades para crianças em casa',
    'atividades educativas para crianças',
    'atividades de arte para crianças',
  ];

  for (let i = 0; i < pesquisas.length; i++) {
    // Espera o campo de pesquisa estar presente
    await page.waitForSelector('#sb_form_q', { visible: true });

    // Limpa o campo de pesquisa
    await page.evaluate(() => {
      const input = document.querySelector('#sb_form_q');
      if (input) input.value = '';
    });

    // Digita a nova pesquisa
    await page.type('#sb_form_q', pesquisas[i]);
    await page.keyboard.press('Enter');

    // Aguarda os resultados
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    console.log(`Pesquisa ${i + 1} feita: ${pesquisas[i]}`);

    // Espera 3 segundos antes da próxima (se não for a última)
    if (i < pesquisas.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Volta para a página inicial do Bing para a próxima pesquisa
    await page.goto('https://www.bing.com', { waitUntil: 'networkidle2' });
  }

  // await browser.close();
})();