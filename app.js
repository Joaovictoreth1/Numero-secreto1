import { createGame, limit } from './game.mjs';

const game = createGame();
const input = document.getElementById('guess');
const submit = document.getElementById('submit');
const restart = document.getElementById('reiniciar');
const heading = document.querySelector('h1');
const status = document.getElementById('status');

function showInitialState() {
    heading.textContent = 'Jogo do número secreto';
    status.textContent = `Escolha um número de 1 a ${limit}.`;
    input.value = '';
    input.disabled = submit.disabled = false;
    restart.disabled = true;
}

document.getElementById('guess-form').addEventListener('submit', event => {
    event.preventDefault();
    const { result, attempts } = game.guess(input.value);
    if (result === 'correct') {
        heading.textContent = 'Acertou!';
        status.textContent = `Você descobriu o número secreto em ${attempts} ${attempts === 1 ? 'tentativa' : 'tentativas'}!`;
        input.disabled = submit.disabled = true;
        restart.disabled = false;
        restart.focus();
    } else if (result !== 'finished') {
        status.textContent = { invalid: `Digite um número inteiro de 1 a ${limit}.`, lower: 'O número secreto é menor.', higher: 'O número secreto é maior.' }[result];
        input.select();
    }
});

restart.addEventListener('click', () => {
    game.restart();
    showInitialState();
    input.focus();
});

showInitialState();






