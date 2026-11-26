import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:8090';

export default defineConfig({
    testDir: './test',
    testMatch: '**/*.spec.js',
    forbidOnly: Boolean(process.env.CI),
    use: { baseURL },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
        { name: 'mobile', use: { ...devices['Pixel 7'] } },
    ],
    webServer: {
        command: 'python3 -m http.server 8090 --bind 127.0.0.1',
        url: baseURL,
    },
});
