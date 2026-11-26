import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createGame, limit } from './game.mjs';

test('checks the range and counts only valid guesses', () => {
    const game = createGame(() => 0.4);
    for (const input of ['', '1.5', '0', String(limit + 1)]) {
        assert.deepEqual(game.guess(input), { result: 'invalid', attempts: 0 });
    }
    assert.deepEqual(game.guess('2'), { result: 'higher', attempts: 1 });
    assert.deepEqual(game.guess('6'), { result: 'lower', attempts: 2 });
    assert.deepEqual(game.guess('5'), { result: 'correct', attempts: 3 });
    assert.deepEqual(game.guess('5'), { result: 'finished', attempts: 3 });
});

test('reset restores attempts and avoids repeats until the pool is exhausted', () => {
    const game = createGame(() => 0);
    for (let value = 1; value <= limit; value++) {
        assert.deepEqual(game.guess(value), { result: 'correct', attempts: 1 });
        game.restart();
    }
    assert.deepEqual(game.guess(1), { result: 'correct', attempts: 1 });
});
