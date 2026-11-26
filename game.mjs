export const limit = 10;
export const levels = [limit, 25, 50];

export function createGame(random = Math.random, maximum = limit) {
    if (!levels.includes(maximum)) throw new RangeError('Dificuldade inválida.');
    let pool = [];
    let secret;
    let attempts;
    let won;
    let lower;
    let upper;

    function restart() {
        if (!pool.length) pool = Array.from({ length: maximum }, (_, index) => index + 1);
        [secret] = pool.splice(Math.floor(random() * pool.length), 1);
        attempts = 0;
        won = false;
        lower = 1;
        upper = maximum;
    }

    restart();
    return {
        restart,
        remainingRange() {
            return { lower, upper };
        },
        guess(input) {
            if (won) return { result: 'finished', attempts };
            const value = Number(input);
            if (!Number.isInteger(value) || value < 1 || value > maximum) {
                return { result: 'invalid', attempts };
            }
            attempts++;
            won = value === secret;
            if (won) {
                lower = value;
                upper = value;
            } else if (value > secret) {
                upper = Math.min(upper, value - 1);
            } else {
                lower = Math.max(lower, value + 1);
            }
            return { result: won ? 'correct' : value > secret ? 'lower' : 'higher', attempts };
        },
    };
}
