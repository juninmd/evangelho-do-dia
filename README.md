# 📖 Evangelho do Dia

> Uma dose diária de inspiração e fé, direto no seu bolso.

[![Deployment Status](https://img.shields.io/badge/ArgoCD-Synced-success?style=for-the-badge&logo=argocd)](https://argocd.antonio-code.duckdns.org)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## 📝 Descrição

O **Evangelho do Dia** é um aplicativo (mobile e web) que fornece as leituras bíblicas diárias, reflexões e orações. Com um design sereno e focado na leitura, é o companheiro ideal para o seu momento de espiritualidade.

## ✨ Funcionalidades

- **Leituras Diárias**: Acesso fácil ao evangelho de cada dia.
- **Notificações**: Lembretes diários para a sua meditação.
- **Integração com Telegram**: Receba o evangelho diretamente no seu chat através do bot integrado.
- **Modo Offline**: Leia as mensagens salvas mesmo sem conexão.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Web Support**: [React Native Web](https://necolas.github.io/react-native-web/)
- **Scraper**: Script em Python para coleta de dados litúrgicos.
- **Notificações**: Firebase Cloud Messaging / Telegram API.

## 🚀 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/juninmd/evangelho-do-dia.git
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Inicie o Expo:
   ```bash
   pnpm start
   ```

## 📦 Deployment

A versão web é servida via **Nginx** no cluster **K3s**.

- **URL Web**: [https://evangelho.antonio-code.duckdns.org](https://evangelho.antonio-code.duckdns.org)