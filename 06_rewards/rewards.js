const puppeteer = require('puppeteer');

const getRandomPhrases = () => {
  let phrases = [
    "Como aprender JavaScript rápido?",
    "Melhores frameworks para desenvolvimento web",
    "O que é React e como funciona?",
    "Dicas para programadores iniciantes",
    "Como funciona o CSS Grid?",
    "ia do bing já está funcionando melhor ia",
    "O que é o Bing e como funciona?",
    "Quais são as características do Bing?",
    "Qual a diferença entre var, let e const no JavaScript?",
    "Como fazer deploy de uma aplicação Node.js?",
    "O que é TypeScript e por que usá-lo?",
    "Como otimizar performance no frontend?",
    "Os benefícios do uso de WebAssembly",
    "Como funciona o protocolo HTTP?",
    "Diferentes formas de manipular arrays em JavaScript",
    "O que são Promises e Async/Await?",
    "Qual a importância do SEO no desenvolvimento web?",
    "Diferenças entre SSR e CSR",
    "Como criar uma API REST com Node.js e Express?",
    "O que são WebSockets e como usá-los?",
    "Como funciona o Virtual DOM no React?",
    "Diferença entre SPA, MPA e PWA",
    "Dicas para melhorar a acessibilidade em sites",
    "O que é GraphQL e como ele se compara ao REST?",
    "Como proteger uma aplicação web contra ataques XSS?",
    "O que são cookies, localStorage e sessionStorage?",
    "Como usar Service Workers para melhorar o desempenho?",
    "Diferença entre mobile-first e desktop-first",
    "Como criar animações com CSS e JavaScript?",
    "O que é um Progressive Web App (PWA)?"
  ];

    // Embaralha as frases para garantir aleatoriedade
    return phrases.sort(() => Math.random() - 0.5);
};

const main = async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        headless: false,
    });

    const page = await browser.newPage();

    await page.goto('https://www.bing.com/?FORM=Z9FD1', {
        waitUntil: 'networkidle2'
    });

    await page.waitForTimeout(4000);

    // Obtém as frases embaralhadas (sem repetição)
    const phrases = getRandomPhrases();

    for (const phrase of phrases) {
        try {
            console.log(`Pesquisando: ${phrase}`);

            await page.waitForSelector('#sb_form_q', { visible: true });

            // Limpa o campo antes de digitar a nova frase
            await page.evaluate(() => document.querySelector('#sb_form_q').value = "");

            // Digita a frase no campo de pesquisa
            await page.type('#sb_form_q', phrase, { delay: 100 });

            // Pressiona Enter para buscar
            await page.keyboard.press('Enter');

            // Espera 4 segundos antes da próxima pesquisa
            await page.waitForTimeout(4000);
        } catch (e) {
            console.log('Erro ao digitar a frase:', e);
        }
    }

    console.log("Pesquisas concluídas!");

    // Fecha o navegador ao finalizar
    // await browser.close();
};

main();