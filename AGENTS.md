# AGENTS.md

Evangelho do Dia: a daily Catholic Gospel reader for mobile and web, built with Expo. It shows the liturgical reading, text-to-speech narration, meditation, prayer and a daily purpose. A Node script scrapes the day's Gospel and a second one sends it through Telegram.

## Stack

- Expo (managed workflow, `expo` ~58 in `package.json`), React Native, React
- TypeScript with strict typing (`tsconfig.json`)
- `expo-speech` (pt-BR narration), `@react-native-async-storage/async-storage` (preferences and favorites)
- Node scripts: axios and cheerio (scraper), Telegram delivery (`scripts/send-telegram.js`)
- Package manager: pnpm (`packageManager` field, `pnpm-lock.yaml`). README and CONTRIBUTING still say `npm install`

## Commands

- Install: `pnpm install` (see the package-manager note above)
- Start: `npm start` (`expo start`). Also `npm run android`, `npm run ios`, `npm run web`
- Scrape the day's Gospel: `npm run scrape`
- Send through Telegram: `npm run send-telegram` (needs the bot setup in `TELEGRAM_SETUP.md`)
- Type-check: `npx tsc --noEmit`
- No test or lint script is defined. CI (`validate.yml`) calls only the reusable validate workflow

## Structure

- `App.tsx`: root screen, daily navigation (yesterday, today, tomorrow), theme toggle
- `components/`: UI pieces (`Header`, `ReadingView`, `HeroQuoteCard`, `AudioPlayerBar`, `ReflectionView`, `PrayerPurposeView`, `FavoritesView`, `LiturgicalBadge`, `FontSizeModal`, `Toast`)
- `services/`: `gospel-service.ts` (liturgy and texts), `speech-service.ts` (narration), `storage-service.ts` (preferences and favorites)
- `theme/`: colors, contrast and liturgical colors. `types/`: shared types
- `scripts/`: backend utilities (`scrape-gospel.js`, `send-telegram.js`)
- Root docs: `README.md`, `CONTRIBUTING.md`, `QUICKSTART.md`, `SCRAPER_GUIDE.md`, `TELEGRAM_SETUP.md`, `REFERENCES.md`, `ROADMAP.md`

## Conventions

- Expo managed workflow.
- Strict TypeScript. Run `npx tsc --noEmit` before a PR.
- Accessibility and responsive layout for mobile and web.
- Liturgical content is in Portuguese (pt-BR).

## Gotchas

- Environment: copy `.env.example` for local values. Never commit `.env`, bot tokens or chat IDs.
- The Gospel text comes from a scraper. Check the source when the layout changes, see `SCRAPER_GUIDE.md`.

<!-- base-actions-main-policy -->
## GitHub Actions — padrão obrigatório (@main)

- Referencie as actions internas sempre pelo branch, nunca por SHA:
  - `uses: juninmd/base-actions/<action>@main`
  - `uses: juninmd/base-actions/.github/workflows/<arquivo>.yml@main`
- Não fixe `@<sha>` em `juninmd/base-actions`: a atualização é centralizada no
  `main` e passa a valer no próximo run.
- PRs cujos checks não iniciam por billing/spending limit são mesclados pelo bot central
  `juninmd/base-actions/.github/workflows/auto-merge-billing-blocked.yml`.
  Para impedir o merge automático de um PR, aplique a label `do-not-merge`.
