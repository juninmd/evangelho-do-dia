# Guia de Contribuição

Obrigado por seu interesse em contribuir com o projeto Evangelho do Dia! 

## Como Contribuir

### Reportando Bugs

Se você encontrou um bug:

1. Verifique se já existe uma issue sobre o problema
2. Se não existir, crie uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs. comportamento atual
   - Screenshots (se aplicável)
   - Versão do app/ambiente

### Sugerindo Melhorias

Para sugerir uma melhoria:

1. Abra uma issue descrevendo a melhoria
2. Explique por que essa melhoria seria útil
3. Se possível, sugira como implementá-la

### Pull Requests

1. **Fork o repositório**
2. **Crie uma branch** para sua feature:
   ```bash
   git checkout -b feature/minha-feature
   ```

3. **Faça suas alterações**:
   - Siga as convenções de código existentes
   - Adicione comentários quando necessário
   - Mantenha as alterações focadas e pequenas

4. **Teste suas alterações**:
   - Teste o app no iOS/Android/Web
   - Teste os scripts de scraping
   - Verifique se o workflow do GitHub Actions está correto

5. **Commit suas alterações**:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade X"
   ```
   
   Use commits semânticos:
   - `feat:` - Nova funcionalidade
   - `fix:` - Correção de bug
   - `docs:` - Documentação
   - `style:` - Formatação
   - `refactor:` - Refatoração
   - `test:` - Testes
   - `chore:` - Tarefas de manutenção

6. **Push para seu fork**:
   ```bash
   git push origin feature/minha-feature
   ```

7. **Abra um Pull Request**:
   - Descreva suas alterações
   - Referencie issues relacionadas
   - Adicione screenshots se houver mudanças visuais

## Diretrizes de Código

### JavaScript/React Native

- Use ES6+ features
- Prefira const/let ao invés de var
- Use arrow functions quando apropriado
- Mantenha componentes pequenos e reutilizáveis
- Adicione PropTypes quando aplicável

### Estilo

- Use 2 espaços para indentação
- Use aspas simples para strings
- Adicione ponto e vírgula no final das declarações
- Mantenha linhas com no máximo 100 caracteres

### Commits

- Escreva mensagens de commit claras e descritivas
- Use o formato de commit semântico
- Uma alteração lógica por commit

## Estrutura do Projeto

```
evangelho-do-dia/
├── App.js                    # Componente principal
├── services/                 # Serviços e lógica de negócio
├── scripts/                  # Scripts Node.js
├── .github/workflows/        # GitHub Actions
└── assets/                   # Recursos visuais
```

## Testando Localmente

### App React Native

```bash
npm install
npm start
```

### Scripts

```bash
# Testar scraping
npm run scrape

# Testar envio ao Telegram (requer variáveis de ambiente)
export TELEGRAM_BOT_TOKEN="seu_token"
export TELEGRAM_CHAT_ID="seu_chat_id"
npm run send-telegram
```

## Áreas que Precisam de Ajuda

- [ ] Implementação real do scraper com seletores corretos
- [ ] Testes automatizados
- [ ] Melhorias na UI/UX
- [ ] Internacionalização
- [ ] Modo offline/cache
- [ ] Notificações push no app
- [ ] Compartilhamento nas redes sociais

## Dúvidas?

Se tiver dúvidas, sinta-se à vontade para:
- Abrir uma issue
- Comentar em PRs existentes
- Entrar em contato com os mantenedores

## Código de Conduta

Este projeto segue um código de conduta. Ao participar, espera-se que você:
- Seja respeitoso com todos
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

Obrigado por contribuir! 🙏
