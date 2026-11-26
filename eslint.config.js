import js from '@eslint/js';
import globals from 'globals';

export default [
    { ignores: ['coverage/**', 'playwright-report/**', 'test-results/**'] },
    js.configs.recommended,
    {
        files: ['app.js'],
        languageOptions: { globals: globals.browser },
    },
    {
        files: ['*.config.js'],
        languageOptions: { globals: globals.node },
    },
];
