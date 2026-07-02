# AGENTS.md - Evangelho do Dia

## Tech Stack
- **Language**: JavaScript
- **Framework**: React Native (Expo SDK 51)
- **Scraping**: Axios + Cheerio (Node.js scripts)
- **Bot**: node-telegram-bot-api
- **Notifications**: Firebase Cloud Messaging / Telegram API
- **Package Manager**: npm
- **Build**: Expo (Android/iOS/Web)

## Project Structure
```
src/                  # Expo app source
scripts/              # Node.js utility scripts
  scrape-gospel.js    # Daily gospel scraper
  send-telegram.js    # Telegram bot sender
```

## Scripts
```bash
npm start             # Start Expo
npm run android       # Run Android
npm run ios          # Run iOS
npm run web          # Run web version
npm run scrape       # Scrape daily gospel
npm run send-telegram # Send via Telegram bot
```

## Key Dependencies
- expo ~51.0, react-native 0.74.5
- axios + cheerio (web scraping)
- node-telegram-bot-api

## Conventions
- Expo managed workflow
- Node scripts for backend automation
- Portuguese (Brazilian) content

## Environment Variables
- `TELEGRAM_BOT_TOKEN` - Telegram bot authentication
- `TELEGRAM_CHAT_ID` - Target chat ID
