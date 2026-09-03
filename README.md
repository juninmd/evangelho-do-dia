# 📖 Evangelho do Dia

> Uma experiência sublime de oração, liturgia e fé diária direto no seu bolso e navegador.

[![Deployment Status](https://img.shields.io/badge/ArgoCD-Synced-success?style=for-the-badge&logo=argocd)](https://argocd.antonio-code.duckdns.org)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## 📝 Descrição

O **Evangelho do Dia** é um aplicativo mobile e web reimaginado para levar a experiência de oração e liturgia diária ao ápice da serenidade e beleza visual. Inspirado no design editorial sacro e em princípios contemplativos, o app oferece o Evangelho completo, homilias, orações, narração em áudio e propósitos espirituais diários.

## ✨ Destaques de UI/UX & Funcionalidades

- 🕊️ **Design Litúrgico Transcendente**:
  - Paleta nobre inspirada nas cores litúrgicas da Igreja Católica (Verde, Branco/Dourado, Roxo, Vermelho e Rosa).
  - Tema Claro ("Pergaminho Sagrado") e Tema Escuro ("Santuário Noturno") com alternância fluida em um toque.
  - Capitular iluminada clássica para abertura dos textos sagrados.
- 🔊 **Narração em Áudio (Text-to-Speech)**:
  - Ouça a proclamação do Evangelho em português brasileiro com controle de reprodução e velocidade ajustável (0.8x, 1.0x, 1.2x).
  - Efeito visual de ondas sonoras animadas durante a leitura.
- 🔠 **Ajuste Tipográfico Dinâmico**:
  - Modal com 4 níveis de escala tipográfica (Compacto, Padrão Nobre, Grande e Leitura Ampliada) para o máximo conforto de leitura.
- 📅 **Navegação Temporal Litúrgica**:
  - Alternância rápida entre leituras de **Ontem**, **Hoje** e **Amanhã**.
- 🕊️ **Seções Contemplativas**:
  - **Evangelho**: Texto sagrado com diálogo litúrgico interativo ("Glória a vós, Senhor").
  - **Meditação**: Homilética explicativa e provocação espiritual para o coração.
  - **Oração & Propósito**: Oração diária e propósito prático de caridade com marcação de cumprimento.
  - **Favoritos**: Guarde suas passagens mais marcantes para revisitar a qualquer momento.
- 📤 **Partilha & Cópia**:
  - Compartilhamento nativo de passagens formatadas com citações e emojis para WhatsApp, Telegram e redes sociais.

## 🛠️ Tech Stack

- **Framework**: [Expo SDK 51](https://expo.dev/) (React Native & Web)
- **Linguagem**: TypeScript
- **Áudio**: `expo-speech`
- **Ícones & Gradientes**: `@expo/vector-icons`, `expo-linear-gradient`
- **Persistência**: `@react-native-async-storage/async-storage`
- **Scraper**: Node.js + Cheerio + Axios

## 🚀 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/juninmd/evangelho-do-dia.git
   cd evangelho-do-dia
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o Expo:
   ```bash
   npm start
   # ou para web:
   npm run web
   ```

4. Verificação de tipos:
   ```bash
   npx tsc --noEmit
   ```

## 📦 Deployment

A versão web é servida via **Nginx** no cluster **K3s**.

- **URL Web**: [https://evangelho.antonio-code.duckdns.org](https://evangelho.antonio-code.duckdns.org)