### README.md
```markdown
# 📖 evangelho-do-dia

**evangelho-do-dia** is a high-performance cross-platform ecosystem designed to deliver daily spiritual reflections directly to users via a React Native/Expo mobile interface and an automated Telegram Bot. By leveraging robust scraping technologies and a modular architecture, the project ensures real-time access to the liturgy and gospel of the day.

## 🏗️ Architecture & Stack
- **Frontend Core**: [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) (SDK 50+)
- **Data Acquisition**: [Axios](https://axios-http.com/) + [Cheerio](https://cheerio.js.org/) (Scraping Engine)
- **Integration Layer**: [Node Telegram Bot API](https://github.com/yagop/node-telegram-bot-api)
- **Networking**: RESTful architecture with asynchronous processing

## 🚀 Key Features
- **Cross-Platform Access**: Native experience on iOS/Android and seamless bot interaction on Telegram.
- **Automated Scraping**: Precise daily retrieval of Catholic liturgy and gospel readings.
- **Push & Broadcast**: Scheduled notifications and automated messaging for daily engagement.
- **Minimalist UX**: Clean, high-contrast design optimized for reading and meditation.

## 🛠️ Quick Start
1. **Clone & Install**:
   ```bash
   git clone https://github.com/user/evangelho-do-dia.git
   cd evangelho-do-dia
   pnpm install
   ```
2. **Environment Setup**:
   Create a `.env` file with your `TELEGRAM_BOT_TOKEN`.
3. **Execution**:
   - Mobile: `npx expo start`
   - Bot: `node src/bot/main.js`

## ⚖️ Standards
- **Antigravity Protocol**: Strict typing, no `any`, 150-line file limit.
- **Reliability**: Fault-tolerant scraping with automatic retry logic.
```