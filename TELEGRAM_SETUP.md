# Guia Rápido: Configuração do Telegram

Este guia mostra como configurar o bot do Telegram para receber o evangelho do dia.

## Passo 1: Criar um Bot no Telegram

1. **Abra o Telegram** no seu celular ou computador

2. **Procure por @BotFather**
   - Digite `@BotFather` na busca
   - Inicie a conversa clicando em "Start"

3. **Crie um novo bot**
   - Envie o comando: `/newbot`
   - Escolha um nome para o bot (ex: "Evangelho Diário")
   - Escolha um username (deve terminar em 'bot', ex: "evangelho_diario_bot")

4. **Salve o token**
   - O BotFather enviará um token assim: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
   - **GUARDE ESTE TOKEN** - você vai precisar dele!

## Passo 2: Criar um Canal

1. **No Telegram, crie um novo canal**
   - Clique em "Novo Canal" (New Channel)
   - Escolha um nome (ex: "Evangelho do Dia")
   - Defina como público ou privado

2. **Adicione o bot como administrador**
   - Entre nas configurações do canal
   - Clique em "Administradores" (Administrators)
   - Clique em "Adicionar Administrador" (Add Administrator)
   - Procure pelo username do seu bot
   - Dê permissão de "Postar mensagens" (Post messages)

## Passo 3: Obter o Chat ID do Canal

### Método 1: Usando o Bot userinfobot

1. Adicione o bot [@userinfobot](https://t.me/userinfobot) ao seu canal
2. Ele enviará o Chat ID automaticamente
3. Remova o bot depois se desejar

### Método 2: Usando a API do Telegram

1. Envie uma mensagem qualquer no canal
2. Acesse no navegador (substitua SEU_TOKEN):
   ```
   https://api.telegram.org/botSEU_TOKEN/getUpdates
   ```
3. Procure por `"chat":{"id":-100XXXXXXXXX`
4. O número após "id" é seu Chat ID

### Método 3: Usando código Node.js

```javascript
const TelegramBot = require('node-telegram-bot-api');
const token = 'SEU_TOKEN';
const bot = new TelegramBot(token);

bot.getUpdates().then(updates => {
  console.log(JSON.stringify(updates, null, 2));
});
```

## Passo 4: Configurar no GitHub

1. **Vá para o repositório no GitHub**

2. **Acesse Settings → Secrets and variables → Actions**

3. **Adicione dois secrets:**
   
   **TELEGRAM_BOT_TOKEN**
   - Clique em "New repository secret"
   - Nome: `TELEGRAM_BOT_TOKEN`
   - Valor: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz` (seu token)
   
   **TELEGRAM_CHAT_ID**
   - Clique em "New repository secret"
   - Nome: `TELEGRAM_CHAT_ID`
   - Valor: `-1001234567890` (ID do seu canal)

## Passo 5: Testar

### Teste Local (Opcional)

```bash
# Configure as variáveis de ambiente
export TELEGRAM_BOT_TOKEN="seu_token"
export TELEGRAM_CHAT_ID="seu_chat_id"

# Execute os scripts
npm run scrape
npm run send-telegram
```

### Teste no GitHub Actions

1. Vá para a aba **Actions** no GitHub
2. Clique em "Enviar Evangelho do Dia ao Telegram"
3. Clique em "Run workflow"
4. Selecione a branch e clique em "Run workflow"
5. Aguarde a execução
6. Verifique se a mensagem chegou no seu canal!

## Formato do Chat ID

- **Canais públicos/privados**: Começam com `-100`, ex: `-1001234567890`
- **Grupos**: Começam com `-`, ex: `-123456789`
- **Chats privados**: Números positivos, ex: `123456789`

## Solução de Problemas

### "Error: 403 Forbidden"
- Verifique se o bot foi adicionado como administrador do canal
- Certifique-se de que o bot tem permissão de postar mensagens

### "Error: 401 Unauthorized"
- O token está incorreto
- Verifique se você copiou o token completo do BotFather

### "Error: 400 Bad Request: chat not found"
- O Chat ID está incorreto
- Certifique-se de incluir o `-100` no início para canais
- Tente obter o ID novamente

### Mensagem não chega
- Verifique os logs no GitHub Actions
- Confirme que as secrets estão configuradas corretamente
- Teste localmente primeiro

## Exemplo de Mensagem

Quando tudo estiver configurado, o bot enviará mensagens assim:

```
📖 Evangelho do Dia

📅 Sexta-feira, 14 de fevereiro de 2026

📜 Mateus 5, 1-12

Naquele tempo, vendo Jesus as multidões...

💭 Reflexão
As bem-aventuranças nos ensinam...

Fonte: Canção Nova
```

## Recursos Adicionais

- [Documentação oficial do Telegram Bot API](https://core.telegram.org/bots/api)
- [Tutorial do BotFather](https://core.telegram.org/bots#6-botfather)
- [Como criar um canal](https://telegram.org/faq_channels)

## Precisa de Ajuda?

Se encontrar problemas, abra uma issue no GitHub com:
- Descrição do erro
- Logs do GitHub Actions (sem expor o token!)
- Passos que você já tentou
