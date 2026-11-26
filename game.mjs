export const limit = 10;

export function createGame(random = Math.random) {
    let pool = [];
    let secret;
    let attempts;
    let won;

    function restart() {
        if (!pool.length) pool = Array.from({ length: limit }, (_, index) => index + 1);
        [secret] = pool.splice(Math.floor(random() * pool.length), 1);
        attempts = 0;
        won = false;
    }

    restart();
    return {
        restart,
        guess(input) {
            if (won) return { result: 'finished', attempts };
            const value = Number(input);
            if (!Number.isInteger(value) || value < 1 || value > limit) {
                return { result: 'invalid', attempts };
            }
            attempts++;
            won = value === secret;
            return { result: won ? 'correct' : value > secret ? 'lower' : 'higher', attempts };
        },
    };
}
