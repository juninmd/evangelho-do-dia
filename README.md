# 📖 Evangelho do Dia

Aplicativo React Native que exibe o Evangelho do Dia da Canção Nova com interface moderna e cronjob automatizado para enviar o evangelho diariamente em um canal do Telegram.

## 🌟 Características

- **App React Native**: Interface moderna e responsiva para visualizar o evangelho do dia
- **Scraping Automatizado**: Extração diária do conteúdo do site da Canção Nova
- **Integração com Telegram**: Bot que envia o evangelho automaticamente para um canal
- **GitHub Actions**: Cronjob configurado para execução diária automática
- **Design Moderno**: Interface com cores temáticas e tipografia otimizada para leitura

## 📱 Funcionalidades do App

- Exibição do evangelho do dia
- Referência bíblica
- Texto completo do evangelho
- Reflexão diária
- Pull-to-refresh para atualizar conteúdo
- Tratamento de erros com retry
- Design responsivo e acessível

## 🚀 Começando

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Expo CLI (instalado automaticamente)
- Para desenvolvimento mobile: Expo Go app no seu dispositivo

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/juninmd/evangelho-do-dia.git
cd evangelho-do-dia
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o app:
```bash
npm start
```

4. Escaneie o QR code com o Expo Go (Android) ou Camera (iOS)

## 🤖 Configuração do Bot do Telegram

### 1. Criar um Bot no Telegram

1. Abra o Telegram e procure por [@BotFather](https://t.me/botfather)
2. Envie `/newbot` e siga as instruções
3. Copie o **token** fornecido

### 2. Obter o Chat ID do Canal

1. Crie um canal no Telegram
2. Adicione o bot como administrador do canal
3. Use [@userinfobot](https://t.me/userinfobot) ou envie uma mensagem no canal e use a API:
```bash
https://api.telegram.org/bot<SEU_TOKEN>/getUpdates
```

### 3. Configurar Secrets no GitHub

1. Vá para `Settings` > `Secrets and variables` > `Actions`
2. Adicione os seguintes secrets:
   - `TELEGRAM_BOT_TOKEN`: Token do seu bot
   - `TELEGRAM_CHAT_ID`: ID do canal (geralmente começa com `-100`)

## 📅 GitHub Actions

O workflow está configurado para:

- **Execução Automática**: Todos os dias às 6:00 UTC (3:00 AM horário de Brasília)
- **Execução Manual**: Pode ser disparado manualmente via GitHub Actions
- **Passos**:
  1. Faz o scraping do evangelho do dia
  2. Envia a mensagem formatada para o Telegram
  3. Salva os dados como artifact

### Executar Manualmente

1. Vá para a aba `Actions` no GitHub
2. Selecione o workflow "Enviar Evangelho do Dia ao Telegram"
3. Clique em "Run workflow"

## 🛠️ Scripts Disponíveis

```bash
# Iniciar o app em modo de desenvolvimento
npm start

# Iniciar no Android
npm run android

# Iniciar no iOS
npm run ios

# Iniciar na web
npm run web

# Fazer scraping do evangelho
npm run scrape

# Enviar para o Telegram
npm run send-telegram
```

## 📂 Estrutura do Projeto

```
evangelho-do-dia/
├── App.tsx                      # Componente principal do app
├── app.json                    # Configuração do Expo
├── package.json                # Dependências e scripts
├── services/
│   └── gospel-service.ts       # Serviço para buscar evangelho
├── scripts/
│   ├── scrape-gospel.js        # Script de scraping
│   └── send-telegram.js        # Script de envio ao Telegram
├── .github/
│   └── workflows/
│       └── daily-gospel.yml    # Workflow do GitHub Actions
└── assets/                     # Ícones e imagens do app
```

## 🎨 Customização

### Cores do Tema

As cores podem ser ajustadas no arquivo `App.tsx` na seção `StyleSheet`:

- **Primária**: `#8B4513` (Marrom)
- **Background**: `#F5F5DC` (Bege claro)
- **Texto**: `#2C2C2C` (Cinza escuro)
- **Accent**: `#D4A574` (Dourado)

### Horário do Cronjob

Edite o arquivo `.github/workflows/daily-gospel.yml`:

```yaml
schedule:
  - cron: '0 6 * * *'  # Formato: minuto hora dia mês dia-da-semana
```

## 🔍 Scraping

O scraper utiliza:
- **axios**: Para fazer requisições HTTP
- **cheerio**: Para parsing do HTML

**Nota**: Os seletores CSS no `scrape-gospel.js` podem precisar de ajustes baseados na estrutura atual do site da Canção Nova.

## 📝 Formato da Mensagem no Telegram

A mensagem é formatada em Markdown com:
- Título com emoji 📖
- Data 📅
- Referência bíblica 📜
- Texto completo do evangelho
- Reflexão 💭
- Fonte

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🙏 Agradecimentos

- [Canção Nova](https://liturgia.cancaonova.com/) pela disponibilização do conteúdo litúrgico
- Comunidade React Native e Expo

## 📞 Suporte

Para questões ou suporte, abra uma issue no GitHub.

---

Desenvolvido com ❤️ e fé