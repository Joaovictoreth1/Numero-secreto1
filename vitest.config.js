import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['test/game.test.js'],
        coverage: {
            provider: 'v8',
            include: ['game.js'],
            thresholds: {
                lines: 90,
                statements: 90,
                functions: 90,
                branches: 90,
            },
        },
    },
});
