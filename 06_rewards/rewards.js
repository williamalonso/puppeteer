const puppeteer = require('puppeteer');

// Obtém as frases embaralhadas (sem repetição)
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

const clickIfExists = async (page, selector) => {
    
    const element = await page.$(selector);

    if (element) {
        console.log(`Elemento encontrado (${selector}), clicando...`);
        await element.click();
        await page.waitForTimeout(3000); // Aguarda depois do clique
    } else {
        console.log(`Elemento (${selector}) não encontrado. Pulando...`);
    }
};

const processRewardsCards = async (page) => {
    const browser = page.browser();

    const visitAndClick = async (description, selector) => {
        // Fecha abas extras com delay
        const pages = await browser.pages();
        for (const p of pages) {
            if (p !== page) {
                console.log('⏳ Aguardando 2 segundos antes de fechar a aba extra...');
                await p.waitForTimeout(2000);
                console.log('🧹 Fechando aba extra...');
                await p.close();
            }
        }

        // Volta para rewards.bing.com
        console.log(`🔄 Acessando rewards.bing.com para ${description}...`);
        await page.goto('https://rewards.bing.com/', { waitUntil: 'networkidle2' });
        await page.waitForTimeout(4000);

        // Verifica se o seletor está disponível antes de clicar
        const elementExists = await page.$(selector);
        if (elementExists) {
            console.log(`✅ Elemento encontrado: ${description} — clicando...`);
            await clickIfExists(page, selector);
        } else {
            console.log(`❌ Elemento não encontrado: ${description} — pulando...`);
        }
    };

    const selector1 = 'mee-card.c-card.f-double a.ds-card-sec';
    const selector2 = 'div[data-bi-id="Global_DailySet_20250407_Child2"] a.ds-card-sec';
    const selector3 = 'div[data-bi-id="Global_DailySet_20250407_Child3"] a.ds-card-sec';
    const selector4 = 'div[data-bi-id="PTstar_Rewards_DailyGlobalOffer_Evergreen_Monday"] a.ds-card-sec';

    await visitAndClick('Child1 (mee-card)', selector1);
    await visitAndClick('Child2 (data-bi-id)', selector2);
    await visitAndClick('Child3 (data-bi-id)', selector3);
    await visitAndClick('Quote of the Day (card4)', selector4);
};

  
const main = async () => {

    // inicializa o puppeteer com o Edge
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        headless: false,
    });
    const page = await browser.newPage();

    // Etapa 1: vai pro Bing
    await page.goto('https://www.bing.com/?FORM=Z9FD1', {
        waitUntil: 'networkidle2'
    });
    await page.waitForTimeout(4000);

    // Etapa 2: faz as pesquisas
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

    // Etapa 3: vai para a página de rewards
    await processRewardsCards(page);

    // Fecha o navegador ao finalizar
    // await browser.close();
};

main();