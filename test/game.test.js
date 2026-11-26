import { describe, expect, it } from 'vitest';
import { createGame, MAX_GUESS, MIN_GUESS } from '../game.js';

describe('game', () => {
    it.each([NaN, '', '1', 1.5, MIN_GUESS - 1, MAX_GUESS + 1])(
        'rejects %s without counting an attempt',
        (invalid) => {
            const game = createGame(() => 0);

            expect(game.guess(invalid)).toEqual({
                outcome: 'invalid',
                attempts: 0,
            });
            expect(game.guess(MIN_GUESS)).toEqual({
                outcome: 'win',
                attempts: 1,
            });
        },
    );

    it('gives both hints, counts valid guesses, and freezes a finished round', () => {
        const game = createGame(() => 0.4);
        const secret = MIN_GUESS + 4;

        expect(game.guess(MIN_GUESS)).toEqual({
            outcome: 'higher',
            attempts: 1,
        });
        expect(game.guess(MAX_GUESS)).toEqual({
            outcome: 'lower',
            attempts: 2,
        });
        expect(game.guess(secret)).toEqual({ outcome: 'win', attempts: 3 });
        expect(game.guess(secret)).toEqual({
            outcome: 'finished',
            attempts: 3,
        });
    });

    it('accepts the highest valid number and only restarts a completed round', () => {
        const game = createGame(() => 0.999);

        expect(game.guess(MIN_GUESS)).toEqual({
            outcome: 'higher',
            attempts: 1,
        });
        game.restart();
        expect(game.guess(MAX_GUESS)).toEqual({ outcome: 'win', attempts: 2 });
        game.restart();
        expect(game.guess(MAX_GUESS - 1)).toEqual({
            outcome: 'win',
            attempts: 1,
        });
    });

    it('uses every number once before refilling the draw pool', () => {
        const game = createGame(() => 0);

        for (let value = MIN_GUESS; value <= MAX_GUESS; value++) {
            expect(game.guess(value)).toEqual({ outcome: 'win', attempts: 1 });
            game.restart();
        }

        expect(game.guess(MIN_GUESS)).toEqual({ outcome: 'win', attempts: 1 });
    });
});
