# GitHub Actions Workflows

## Workflow: Enviar Evangelho do Dia ao Telegram

### O que faz?
Este workflow automatiza o envio diário do evangelho para um canal do Telegram.

### Quando executa?
- **Automático**: Todo dia às 6:00 UTC (3:00 AM horário de Brasília)
- **Manual**: Pode ser disparado manualmente na aba Actions

### Requisitos
Para que este workflow funcione, você precisa configurar os seguintes **secrets** no repositório:

1. `TELEGRAM_BOT_TOKEN`: Token do bot obtido do @BotFather
2. `TELEGRAM_CHAT_ID`: ID do canal onde as mensagens serão enviadas

### Como configurar secrets?
1. Vá em `Settings` → `Secrets and variables` → `Actions`
2. Clique em `New repository secret`
3. Adicione cada secret

### Passos do Workflow
1. **Checkout**: Faz checkout do código
2. **Setup Node.js**: Configura Node.js 18
3. **Install**: Instala dependências
4. **Scrape**: Busca o evangelho do dia
5. **Send**: Envia para o Telegram
6. **Upload**: Salva dados como artifact

### Executar Manualmente
1. Vá para a aba `Actions`
2. Selecione "Enviar Evangelho do Dia ao Telegram"
3. Clique em `Run workflow`
4. Aguarde a execução
5. Verifique o canal do Telegram

### Debugging
- Veja os logs de cada step no GitHub Actions
- Baixe o artifact `gospel-data` para ver os dados
- Verifique se as secrets estão configuradas corretamente

### Modificar Horário
Edite o arquivo `daily-gospel.yml` e ajuste a linha do cron:
```yaml
cron: '0 6 * * *'  # minuto hora dia mês dia-da-semana
```

Exemplos:
- `0 6 * * *` → 6:00 UTC (3:00 AM Brasília)
- `0 12 * * *` → 12:00 UTC (9:00 AM Brasília)
- `0 21 * * *` → 21:00 UTC (6:00 PM Brasília)

### Troubleshooting

**Workflow não executa**
- Verifique se está na branch correta
- Confirme que o arquivo YAML está válido
- Veja se há erros na aba Actions

**Telegram não recebe mensagem**
- Verifique se TELEGRAM_BOT_TOKEN está correto
- Confirme que TELEGRAM_CHAT_ID está correto
- Certifique-se de que o bot é admin do canal

**Scraping falha**
- Normal se o site estiver bloqueado
- O sistema usa fallback automático
- Verifique os logs para detalhes

Para mais informações, consulte `TELEGRAM_SETUP.md` e `SCRAPER_GUIDE.md`.
