# Revisão de Arquitetura

## Visão geral atual

O projeto está organizado em três blocos principais:

1. **Aplicativo mobile (Expo/React Native)**
   - `App.tsx` concentra apresentação, estado de carregamento e tratamento de erro.
   - `services/gospel-service.ts` abstrai a obtenção do evangelho, hoje com fallback em mock.

2. **Pipeline de conteúdo (Node.js)**
   - `scripts/scrape-gospel.js` faz scraping da Canção Nova e salva `gospel-data.json`.
   - `scripts/send-telegram.js` lê esse JSON e publica no Telegram.

3. **Orquestração CI/CD (GitHub Actions)**
   - Workflow diário executa scraping e envio automático.
   - Workflows auxiliares cobrem build Android e screenshot de PR.

## Pontos fortes

- Separação clara entre **app cliente** e **automação backend-like** por scripts.
- Simplicidade operacional: fácil executar localmente (`npm run scrape`, `npm run send-telegram`).
- Fluxo de publicação diário já automatizado no GitHub Actions.

## Riscos arquiteturais identificados

1. **Fonte de dados duplicada**
   - O app usa mock local, enquanto o Telegram usa scraping real.
   - Isso cria divergência de comportamento e dificulta validação ponta a ponta.

2. **Acoplamento com HTML externo frágil**
   - Seletores CSS do scraping podem quebrar com mudanças no site-fonte.
   - Não há camada de validação de estrutura/sanidade do conteúdo antes de publicar.

3. **Baixa testabilidade**
   - Scripts e serviço têm pouca cobertura automatizada.
   - Não há testes de contrato para garantir formato de `gospel-data.json`.

4. **Responsabilidades concentradas em `App.tsx`**
   - UI, estado e regra de carregamento estão no mesmo componente raiz.
   - Escalabilidade de features (cache, favoritos, leitura offline) fica limitada.

## Recomendações (prioridade)

### P1 — Unificar a origem de dados

- Introduzir um endpoint simples (serverless function ou serviço leve) que entregue o evangelho normalizado em JSON.
- Fazer **app** e **Telegram** consumirem a mesma fonte de verdade.
- Benefício: consistência funcional e menos retrabalho.

### P1 — Formalizar contrato de domínio

- Definir schema único de `Gospel` (ex.: Zod/TypeScript type guard).
- Validar o resultado do scraping antes de persistir/enviar.
- Em caso de falha, registrar erro observável e evitar envio de conteúdo incompleto.

### P2 — Modularizar frontend

- Extrair de `App.tsx`:
  - `useGospel()` (hook de dados/estado)
  - componentes de apresentação (`GospelHeader`, `GospelBody`, `ErrorState`, `LoadingState`)
- Reduzir acoplamento e facilitar testes unitários.

### P2 — Melhorar resiliência de scraping

- Criar estratégia de fallback por múltiplos seletores.
- Adicionar verificação mínima (título + referência + texto) antes de considerar scraping válido.

### P3 — Observabilidade

- Padronizar logs com contexto (`runId`, horário, duração, etapa).
- Publicar resumo da execução como artifact no workflow diário.

## Arquitetura alvo (incremental)

[Canção Nova]
     |
     v
[Scraper + Validator] ---> [gospel-data.json / storage]
                              |
                              v
               [API Gospel (single source)]
              /                           \
             v                             v
       [App Expo]                  [Telegram Publisher]

## Plano de evolução sugerido

1. Criar módulo compartilhado `shared/gospel-schema`.
2. Adaptar scraper para sempre gerar payload validado.
3. Expor endpoint de leitura do evangelho diário.
4. Migrar app para consumo do endpoint.
5. Quebrar `App.tsx` em componentes + hook.
6. Adicionar testes de contrato e smoke tests do pipeline.

## Conclusão

A arquitetura atual é funcional e simples, boa para início rápido. O maior ganho agora é evoluir para **fonte única de dados com contrato validado**, reduzindo inconsistências entre app e automação, e preparando o projeto para crescimento com menor risco operacional.
