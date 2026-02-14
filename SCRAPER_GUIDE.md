# Guia de Customização do Scraper

## Atualizando Seletores CSS

O site da Canção Nova pode mudar sua estrutura HTML ao longo do tempo. Este guia ajuda a atualizar os seletores CSS no arquivo `scripts/scrape-gospel.js`.

## Como Identificar Seletores

1. **Abra o site no navegador**: https://liturgia.cancaonova.com/pb/

2. **Abra o DevTools**: 
   - Chrome/Edge: F12 ou Ctrl+Shift+I
   - Firefox: F12 ou Ctrl+Shift+C

3. **Inspecione os elementos**:
   - Use a ferramenta de seleção (ícone de seta no DevTools)
   - Clique no elemento que deseja extrair
   - Observe a estrutura HTML no DevTools

4. **Identifique o seletor CSS**:
   - Classes: `.nome-da-classe`
   - IDs: `#id-do-elemento`
   - Tags: `div`, `p`, `h1`, etc.
   - Combinados: `.container .evangelho-texto`

## Exemplo de Seletores Comuns

```javascript
// Título do evangelho
const title = $('.liturgia-titulo').first().text().trim();

// Referência bíblica (ex: João 3, 16-21)
const reference = $('.evangelho-ref').first().text().trim();

// Texto do evangelho
const text = $('.texto-evangelho').text().trim();
// ou múltiplos parágrafos
const paragraphs = $('.texto-evangelho p').map((i, el) => $(el).text()).get();
const text = paragraphs.join('\n\n');

// Reflexão
const reflection = $('.reflexao-texto').text().trim();
```

## Testando Seletores

Use o console do DevTools para testar:

```javascript
// Com jQuery (se disponível no site)
$('.evangelho-texto').text()

// Com JavaScript puro
document.querySelector('.evangelho-texto').textContent
```

## Atualizando o Código

Edite `scripts/scrape-gospel.js` na seção de extração:

```javascript
// ANTES
const title = $('.liturgia-title').first().text().trim();

// DEPOIS (com o seletor correto)
const title = $('.novo-seletor-titulo').first().text().trim();
```

## Debugging

Se o scraper não funcionar:

1. Adicione logs para ver o HTML:
```javascript
console.log('HTML:', response.data.substring(0, 500));
```

2. Teste seletores individuais:
```javascript
console.log('Title element:', $('.liturgia-title').length);
console.log('Title text:', $('.liturgia-title').text());
```

3. Verifique se o site usa JavaScript para carregar conteúdo:
   - Se sim, você precisará usar Puppeteer ou Playwright
   - Adicione ao package.json: `"puppeteer": "^21.0.0"`

## Usando Puppeteer para Sites Dinâmicos

Se o conteúdo é carregado via JavaScript:

```javascript
const puppeteer = require('puppeteer');

async function scrapeWithPuppeteer() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://liturgia.cancaonova.com/pb/');
  
  const gospel = await page.evaluate(() => {
    return {
      title: document.querySelector('.titulo')?.textContent,
      text: document.querySelector('.texto')?.textContent,
    };
  });
  
  await browser.close();
  return gospel;
}
```

## Dicas

- Sempre teste os seletores no DevTools primeiro
- Use `.first()` para pegar apenas o primeiro elemento
- Use `.trim()` para remover espaços em branco
- Trate casos onde elementos podem não existir: `$('.elemento').first().text().trim() || ''`
