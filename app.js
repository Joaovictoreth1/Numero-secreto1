import { createGame, MAX_GUESS, MIN_GUESS } from './game.js';

const game = createGame();
const form = document.querySelector('#game');
const input = document.querySelector('#guess');
const submit = document.querySelector('#submit');
const restart = document.querySelector('#restart');
const range = document.querySelector('#range');
const status = document.querySelector('#status');

input.min = MIN_GUESS;
input.max = MAX_GUESS;
range.textContent = `Escolha um número inteiro de ${MIN_GUESS} a ${MAX_GUESS}.`;
input.disabled = false;
submit.disabled = false;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { outcome, attempts } = game.guess(input.valueAsNumber);
    input.removeAttribute('aria-invalid');

    switch (outcome) {
        case 'invalid':
            input.setAttribute('aria-invalid', 'true');
            status.textContent = `Digite um número inteiro de ${MIN_GUESS} a ${MAX_GUESS}.`;
            input.focus();
            break;
        case 'higher':
        case 'lower':
            status.textContent =
                outcome === 'higher'
                    ? 'O número secreto é maior.'
                    : 'O número secreto é menor.';
            input.value = '';
            input.focus();
            break;
        case 'win': {
            const word = attempts === 1 ? 'tentativa' : 'tentativas';
            status.textContent = `Acertou! Você descobriu o número secreto em ${attempts} ${word}!`;
            input.disabled = true;
            submit.disabled = true;
            restart.disabled = false;
            restart.focus();
            break;
        }
    }
});

input.addEventListener('input', () => {
    if (input.hasAttribute('aria-invalid')) {
        input.removeAttribute('aria-invalid');
        status.textContent = '';
    }
});

restart.addEventListener('click', () => {
    game.restart();
    form.reset();
    status.textContent = 'Novo jogo iniciado.';
    restart.disabled = true;
    input.disabled = false;
    submit.disabled = false;
    input.focus();
});
