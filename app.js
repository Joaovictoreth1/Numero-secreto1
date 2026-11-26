import { createGame, levels, limit } from './game.mjs';

let maximum = limit;
let game = createGame();
const input = document.getElementById('guess');
const submit = document.getElementById('submit');
const restart = document.getElementById('reiniciar');
const heading = document.querySelector('h1');
const status = document.getElementById('status');
const difficulty = document.getElementById('difficulty');
const history = document.getElementById('guess-history');
const recent = document.getElementById('recent-guesses');
const rangeHint = document.getElementById('range-hint');
const feedback = {
    lower: 'O número secreto é menor.',
    higher: 'O número secreto é maior.',
    correct: 'Correto!',
};

function showInitialState() {
    heading.textContent = 'Jogo do número secreto';
    status.textContent = `Escolha um número de 1 a ${maximum}.`;
    input.value = '';
    input.max = String(maximum);
    input.removeAttribute('aria-invalid');
    input.disabled = submit.disabled = false;
    restart.disabled = true;
    recent.replaceChildren();
    history.hidden = true;
}

function recordGuess(attempts, value, result) {
    const item = document.createElement('li');
    item.textContent = `#${attempts} · ${value} — ${feedback[result]}`;
    recent.prepend(item);
    if (recent.children.length > 5) recent.lastElementChild.remove();
    const { lower, upper } = game.remainingRange();
    rangeHint.textContent = result === 'correct'
        ? 'Intervalo resolvido.'
        : `Intervalo possível: ${lower} a ${upper}.`;
    history.hidden = false;
}

document.getElementById('guess-form').addEventListener('submit', event => {
    event.preventDefault();
    const { result, attempts } = game.guess(input.value);
    if (result === 'finished') return;
    if (result === 'invalid') {
        input.setAttribute('aria-invalid', 'true');
        status.textContent = `Digite um número inteiro de 1 a ${maximum}.`;
        input.select();
        return;
    }

    input.removeAttribute('aria-invalid');
    recordGuess(attempts, Number(input.value), result);
    if (result === 'correct') {
        heading.textContent = 'Acertou!';
        status.textContent = `Você descobriu o número secreto em ${attempts} ${attempts === 1 ? 'tentativa' : 'tentativas'}!`;
        input.disabled = submit.disabled = true;
        restart.disabled = false;
        restart.focus();
    } else {
        status.textContent = `${feedback[result]} ${rangeHint.textContent}`;
        input.select();
    }
});

difficulty.addEventListener('change', () => {
    const selected = Number(difficulty.value);
    if (!levels.includes(selected) || selected === maximum) return;
    maximum = selected;
    game = createGame(Math.random, maximum);
    showInitialState();
});

restart.addEventListener('click', () => {
    game.restart();
    showInitialState();
    input.focus();
});

showInitialState();





