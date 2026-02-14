# ⚡ Guia de Início Rápido

Este guia mostra como colocar o app e o bot do Telegram em funcionamento em **menos de 10 minutos**.

## 📱 Parte 1: Rodar o App Mobile (5 minutos)

### Pré-requisito
- Instale Node.js: https://nodejs.org/

### Passos

1. **Clone e instale**
   ```bash
   git clone https://github.com/juninmd/evangelho-do-dia.git
   cd evangelho-do-dia
   npm install
   ```

2. **Inicie o app**
   ```bash
   npm start
   ```

3. **Teste no celular**
   - Instale o app "Expo Go" no seu celular:
     - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
     - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - Escaneie o QR code que apareceu no terminal
   - O app abrirá no seu celular!

✅ **Pronto!** Você já tem o app rodando.

## 🤖 Parte 2: Configurar Bot do Telegram (5 minutos)

### Passos

1. **Crie um bot**
   - Abra o Telegram
   - Busque por `@BotFather`
   - Envie: `/newbot`
   - Escolha um nome e username
   - **Copie o TOKEN que ele der**

2. **Crie um canal**
   - No Telegram, crie um canal
   - Adicione o bot como administrador
   - Dê permissão de "postar mensagens"

3. **Descubra o Chat ID**
   - Poste algo no canal
   - Acesse no navegador (substitua SEU_TOKEN):
     ```
     https://api.telegram.org/botSEU_TOKEN/getUpdates
     ```
   - Procure por `"chat":{"id":-100XXXXX`
   - **Copie esse número** (com o `-100`)

4. **Configure no GitHub**
   - Vá em: `Settings` → `Secrets and variables` → `Actions`
   - Clique em `New repository secret`
   - Adicione:
     - Nome: `TELEGRAM_BOT_TOKEN` / Valor: seu token
     - Nome: `TELEGRAM_CHAT_ID` / Valor: seu chat ID

5. **Teste**
   - Vá em `Actions` no GitHub
   - Clique em "Enviar Evangelho do Dia ao Telegram"
   - Clique em `Run workflow`
   - Aguarde ~1 minuto
   - **Verifique seu canal!** 🎉

✅ **Funcionou!** O bot agora enviará automaticamente todo dia às 3:00 AM (horário de Brasília).

## 🎨 Personalize (Opcional)

### Mudar cores do app
Edite `App.tsx` → procure por `StyleSheet.create` → mude as cores:
```javascript
backgroundColor: '#F5F5DC',  // mude aqui
color: '#8B4513',            // e aqui
```

### Mudar horário do envio
Edite `.github/workflows/daily-gospel.yml`:
```yaml
cron: '0 6 * * *'  # 6 = hora UTC
# 0 = 21h Brasília (9 PM)
# 6 = 3h Brasília (3 AM)
# 12 = 9h Brasília (9 AM)
```

### Ajustar o scraper
Quando o site real da Canção Nova estiver acessível:
1. Leia `SCRAPER_GUIDE.md`
2. Identifique os seletores CSS corretos
3. Edite `scripts/scrape-gospel.js`
4. Teste com: `npm run scrape`

## 🆘 Problemas Comuns

### "Cannot find module 'expo'"
```bash
npm install
```

### "Port 8081 already in use"
```bash
# Mate o processo:
npx kill-port 8081
npm start
```

### Bot não envia mensagens
- Verifique se as secrets estão configuradas
- Confirme que o bot é admin do canal
- Veja os logs em `Actions` no GitHub

### Scraper retorna erro
- Normal! O site pode estar bloqueado
- Use os dados de fallback por enquanto
- Veja `SCRAPER_GUIDE.md` para ajustar

## 📚 Próximos Passos

Depois de rodar tudo:

1. ⭐ **Dê uma estrela** no repositório
2. 📖 Leia o `README.md` completo
3. 🎨 Customize as cores e ícones
4. 🔧 Ajuste o scraper para o site real
5. 🤝 Contribua! Veja `CONTRIBUTING.md`

## 💡 Dicas

- O app usa dados mock por padrão
- Em produção, conecte a uma API real
- Os ícones em `assets/` são placeholders
- O scraper precisa de ajustes para o site real
- Teste localmente antes de fazer deploy

## 🎯 Comandos Úteis

```bash
# App
npm start              # Inicia o app
npm run web           # Abre no navegador

# Scripts
npm run scrape        # Testa o scraper
npm run send-telegram # Envia ao Telegram (precisa de .env)

# Desenvolvimento
npm install           # Instala dependências
npm list             # Lista dependências
```

---

**Pronto para começar?** Execute `npm install` e `npm start`! 🚀

Dúvidas? Abra uma [issue](https://github.com/juninmd/evangelho-do-dia/issues)!
