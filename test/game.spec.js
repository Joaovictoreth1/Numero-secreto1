import { URL } from 'node:url';
import { expect, test } from '@playwright/test';

test('loads, guides guesses, rejects invalid input and restarts cleanly', async ({
    page,
}) => {
    const errors = [];
    const requests = new Set();

    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
        if (message.type() === 'error') {
            errors.push(message.text());
        }
    });
    page.on('request', (request) =>
        requests.add(new URL(request.url()).origin),
    );
    await page.addInitScript(() => {
        Math.random = () => 0.4;
    });
    const response = await page.goto('/');

    const guess = page.getByRole('spinbutton', { name: 'Seu palpite' });
    const submit = page.getByRole('button', { name: 'Chutar' });
    const restart = page.getByRole('button', { name: 'Novo jogo' });
    const status = page.getByRole('status');

    expect(response?.ok()).toBe(true);
    await expect(
        page.getByRole('heading', { name: 'Jogo do número secreto' }),
    ).toBeVisible();
    await expect(
        page.getByText('Escolha um número inteiro de 1 a 10.'),
    ).toBeVisible();
    await expect(restart).toBeDisabled();
    expect(
        await page.locator('html').evaluate((html) => html.scrollWidth),
    ).toBeLessThanOrEqual(
        await page.locator('html').evaluate((html) => html.clientWidth),
    );

    await guess.fill('3');
    await guess.press('Enter');
    await expect(status).toHaveText('O número secreto é maior.');
    await expect(guess).toBeFocused();
    await expect(guess).toHaveValue('');

    for (const invalid of ['', '2.5', '11']) {
        await guess.fill(invalid);
        await submit.click();
        await expect(status).toHaveText('Digite um número inteiro de 1 a 10.');
        await expect(guess).toHaveAttribute('aria-invalid', 'true');
    }

    await guess.fill('5');
    await expect(guess).not.toHaveAttribute('aria-invalid', 'true');
    await submit.click();
    await expect(status).toHaveText(
        'Acertou! Você descobriu o número secreto em 2 tentativas!',
    );
    await expect(guess).toBeDisabled();
    await expect(submit).toBeDisabled();
    await expect(restart).toBeFocused();

    await restart.click();
    await expect(status).toHaveText('Novo jogo iniciado.');
    await expect(restart).toBeDisabled();
    await expect(submit).toBeEnabled();
    await expect(guess).toBeFocused();
    await expect(guess).toHaveValue('');

    await guess.fill('4');
    await submit.click();
    await expect(status).toHaveText(
        'Acertou! Você descobriu o número secreto em 1 tentativa!',
    );
    expect([...requests]).toEqual([new URL(page.url()).origin]);
    expect(errors).toEqual([]);
});
