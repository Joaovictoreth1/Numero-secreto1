# Jogo do número secreto

Adivinhe um inteiro entre 1 e 10. O jogo dá dicas de maior/menor, conta apenas palpites válidos e permite reiniciar após acertar. O jogo não depende de um serviço de voz.

## Rodar localmente

Na raiz do repositório, execute:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abra <http://localhost:8000/>.

## Estrutura

`index.html`, `style.css`, `img/`: interface e imagens. `app.js`: integração com a interface. `game.mjs` e `game.test.mjs`: regras e testes (`node --test`, Node 24). As cópias antigas de arquivos foram mantidas.

A CI valida o HTML e verifica arquivos e âncoras locais. Links e serviços externos não são consultados pela CI.
