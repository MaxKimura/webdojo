# Testes Automatizados - Webdojo com Cypress

Este repositório contém os testes automatizados desenvolvidos com [Cypress](https://www.cypress.io/) para a aplicação Webdojo, que também está contida neste mesmo repositório.

## 📁 Estrutura do Projeto

A estrutura da pasta `cypress` está organizada da seguinte forma:

```
cypress/
│
├── e2e/                    # Testes de ponta a ponta (E2E)
│   ├── alerts.cy.js
│   ├── cep.cy.js
│   ├── consultancy.cy.js
│   ├── github.cy.js
│   ├── iFrame.cy.js
│   ├── kanban.cy.js
│   ├── links.cy.js
│   ├── login.cy.js
│   └── mouseHover.cy.js
│
├── fixtures/               # Dados simulados para os testes
│   ├── cep.json
│   ├── consultancy.json
│   └── lorem-ipsum-test.pdf
│
├── support/                # Suporte e comandos customizados
│   ├── actions/
│   │   └── consultancy.actions.js
│   ├── commands.js
│   ├── e2e.js
│   └── utils.js
```

## ▶️ Como executar os testes

### 1. Instalação

Certifique-se de que você tem o Node.js instalado. Em seguida, instale as dependências do projeto:

```bash
npm install
```

### 2. Executar a aplicação Webdojo

Antes de rodar os testes, você precisa iniciar a aplicação Webdojo localmente:

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

### 3. Rodar os testes automatizados

Você pode rodar os testes de duas formas:

#### Modo headless (linha de comando)

```bash
npm test
```

#### Modo interativo (com interface do Cypress)

```bash
npm run test:ui
```

## 💡 Observações

- Os testes utilizam arquivos de fixture para simular dados e interações com a aplicação.
- A estrutura de Page Actions está localizada em `cypress/support/actions/`, e ajuda a manter os testes mais organizados e reutilizáveis.
- O projeto utiliza o Cypress 10+ com a nova estrutura de pastas (`e2e`, `fixtures`, `support`).

## 📄 Licença

Este projeto é de uso interno para fins de automação de testes da aplicação Webdojo.
