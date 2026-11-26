export const MIN_GUESS = 1;
export const MAX_GUESS = 10;

const numbers = Array.from(
    { length: MAX_GUESS - MIN_GUESS + 1 },
    (_, index) => MIN_GUESS + index,
);

export function createGame(random = Math.random) {
    let remaining = [];
    let secret;
    let attempts;
    let won;

    function startRound() {
        if (remaining.length === 0) {
            remaining = [...numbers];
        }

        const index = Math.floor(random() * remaining.length);
        [secret] = remaining.splice(index, 1);
        attempts = 0;
        won = false;
    }

    function guess(value) {
        if (won) {
            return { outcome: 'finished', attempts };
        }

        if (
            !Number.isInteger(value) ||
            value < MIN_GUESS ||
            value > MAX_GUESS
        ) {
            return { outcome: 'invalid', attempts };
        }

        attempts++;
        won = value === secret;

        if (won) {
            return { outcome: 'win', attempts };
        }

        return { outcome: value < secret ? 'higher' : 'lower', attempts };
    }

    function restart() {
        if (won) {
            startRound();
        }
    }

    startRound();
    return { guess, restart };
}
