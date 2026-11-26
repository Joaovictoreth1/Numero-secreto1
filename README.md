# Jogo do número secreto

Adivinhe o número secreto em um jogo de navegador, sem dependências externas em tempo de execução. O jogo dá uma dica a cada palpite válido e só habilita **Novo jogo** após o acerto. Os números não se repetem até que todos tenham sido sorteados.

## Jogar localmente

Na raiz do repositório, execute `python3 -m http.server 8080 --bind 127.0.0.1` e abra <http://127.0.0.1:8080/>. O servidor HTTP é necessário para carregar os módulos JavaScript; não é preciso instalar pacotes nem compilar o site.

## Verificar alterações

Com Node.js 24 e Python 3:

```sh
npm ci
npm run check
npx playwright install chromium
npm run test:browser
```

`npm run check` verifica JavaScript, CSS, HTML e formatação e executa os testes com cobertura mínima de 90% em `game.js` (linhas, instruções, funções e ramificações). `npm run format` aplica a formatação. Os testes de navegador usam Chromium em tamanhos de tela desktop e móvel, com um servidor Python iniciado pelo Playwright.

## Publicação

O [GitHub Pages](https://joaovictoreth1.github.io/Numero-secreto1/) publica os arquivos estáticos diretamente da raiz do branch `master` (`master:/`). Não há etapa de build nem publicação pelo workflow de CI. Mantenha os caminhos dos arquivos relativos para que o site funcione no subdiretório do repositório.
