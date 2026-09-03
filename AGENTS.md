# AGENTS.md - Evangelho do Dia

## Tech Stack
- **Language**: TypeScript & JavaScript
- **Framework**: React Native (Expo SDK 51)
- **UI/UX**: Design Sagrado Sublime, Temas Claro (Pergaminho) e Escuro (Santuário Noturno), Cores Litúrgicas Dinâmicas
- **Áudio**: Expo Speech (Text-to-Speech pt-BR integrado com velocidade ajustável)
- **Persistência**: @react-native-async-storage/async-storage
- **Ícones & Efeitos**: @expo/vector-icons, expo-linear-gradient
- **Scraping**: Axios + Cheerio (Node.js scripts)
- **Bot**: node-telegram-bot-api
- **Build**: Expo (Android, iOS e Web responsivo)

## Project Structure
```
components/           # Componentes modulares de UI/UX
  Header.tsx          # Cabeçalho com navegação diária e abas
  ReadingView.tsx     # Leitura do Evangelho com capitular iluminada
  HeroQuoteCard.tsx   # Versículo em destaque com gradiente nobre
  AudioPlayerBar.tsx  # Barra de áudio com ondas sonoras animadas
  ReflectionView.tsx  # Homilia e meditação do coração
  PrayerPurposeView.tsx # Oração do dia e propósito diário interativo
  FavoritesView.tsx   # Gerenciamento de passagens favoritas salvas
  LiturgicalBadge.tsx # Distintivo litúrgico da Igreja Católica
  FontSizeModal.tsx   # Ajuste tipográfico de leitura
  Toast.tsx           # Feedback visual elegante
theme/                # Sistema de cores, contrastes e cores litúrgicas
services/             # Serviços da aplicação
  gospel-service.ts   # Liturgia diária, calendário e textos sagrados
  speech-service.ts   # Síntese de voz e narração
  storage-service.ts  # Persistência local de preferências e favoritos
scripts/              # Utilitários de backend
  scrape-gospel.js    # Scraper Canção Nova
  send-telegram.js    # Bot de envio Telegram
```

## Scripts
```bash
npm start             # Start Expo
npm run android       # Run Android
npm run ios           # Run iOS
npm run web           # Run web version
npm run scrape        # Scrape daily gospel
npm run send-telegram # Send via Telegram bot
npx tsc --noEmit      # Type-check TypeScript
```

## Conventions
- Expo managed workflow
- Tipagem estrita com TypeScript
- Acessibilidade e responsividade para dispositivos móveis e web
- Conteúdo litúrgico da Igreja Católica em Língua Portuguesa (pt-BR)
