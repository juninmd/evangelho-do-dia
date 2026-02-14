# GitHub Actions Workflows

## 1) Workflow: Enviar Evangelho do Dia ao Telegram (`daily-gospel.yml`)

### O que faz?
Automatiza o scraping do evangelho e o envio diário para um canal do Telegram.

### Quando executa?
- **Automático**: todo dia às 6:00 UTC (3:00 horário de Brasília)
- **Manual**: disparo manual pela aba Actions

### Requisitos (secrets)
1. `TELEGRAM_BOT_TOKEN`: token do bot criado no @BotFather
2. `TELEGRAM_CHAT_ID`: ID do canal onde a mensagem será publicada

### Principais passos
1. Checkout do repositório
2. Setup do Node.js
3. Instalação de dependências
4. Scraping do evangelho
5. Envio para Telegram
6. Upload do artifact `gospel-data`

---

## 2) Workflow: Android Build Artifacts (`android-build.yml`)

### O que faz?
Gera artefatos Android em CI para validação e distribuição:
- APK **debug**
- APK **release**
- AAB **release**

### Quando executa?
- Em `push` para `main`
- Em `pull_request`
- Manualmente (`workflow_dispatch`)

### Principais passos
1. Instala dependências NPM
2. Executa `expo prebuild` para gerar o projeto Android nativo
3. Roda Gradle para criar:
   - `assembleDebug`
   - `assembleRelease`
   - `bundleRelease`
4. Publica os artefatos no Actions

### Observações
- O workflow é ideal para garantir que o app continue compilando no Android a cada alteração.
- O APK release pode ser gerado sem assinatura final de produção, dependendo da configuração de signing da sua esteira.

---

## 3) Workflow: PR UI Screenshot (`pr-ui-screenshot.yml`)

### O que faz?
A cada PR, gera um build web do app Expo e captura um screenshot automático da interface para inspeção visual.

### Quando executa?
- `pull_request` (opened, synchronize, reopened)

### Principais passos
1. Build web com `expo export`
2. Sobe o conteúdo estático localmente
3. Usa Playwright (Chromium headless) para capturar screenshot
4. Publica artifact `pr-ui-screenshot`

### Observações
- O screenshot é uma validação visual rápida da tela inicial.
- Você pode expandir para mais telas/rotas com scripts Playwright adicionais.

---

## Troubleshooting

### Workflow não executa
- Verifique se o arquivo YAML está válido
- Confirme se o evento configurado (push/PR/manual) realmente ocorreu
- Veja logs da aba Actions

### Telegram não recebe mensagem
- Confirme `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID`
- Verifique se o bot é admin do canal

### Build Android falha
- Confira logs do `expo prebuild` e do Gradle
- Verifique incompatibilidade de versões Node/Java/dependências

### Screenshot da PR falha
- Verifique logs de `expo export`, `serve`, `wait-on` e Playwright
- Confirme se o bundle web foi gerado em `dist`

Para mais informações, consulte `TELEGRAM_SETUP.md` e `SCRAPER_GUIDE.md`.
