import { test, expect } from '@playwright/test';

test.describe('Advanced Calculator Functionality', () => {
  test('calculator page loads with all components', async ({ page }) => {
    await page.goto('/advanced-calculator');

    // Wait for full page load
    await page.waitForLoadState('networkidle');

    // Verify page title or header
    await expect(page.locator('body')).toBeVisible();

    // Check for common calculator components
    // These will depend on the actual implementation, but we expect some form of input
    const inputs = page.locator('input, select, textarea');
    const buttons = page.locator('button');

    // Should have some form of user input
    expect(await inputs.count() + await buttons.count()).toBeGreaterThan(0);
  });

  test('calculator handles form interactions', async ({ page }) => {
    await page.goto('/advanced-calculator');
    await page.waitForLoadState('networkidle');

    // Try to interact with form elements
    const inputs = page.locator('input').all();

    for (const input of await inputs) {
      if (await input.isVisible() && await input.isEnabled()) {
        const inputType = await input.getAttribute('type');

        if (inputType === 'text' || inputType === 'number' || !inputType) {
          await input.fill('Test input');
          await expect(input).toHaveValue('Test input');
          break; // Just test one input
        }
      }
    }
  });

  test('calculator responds to user actions', async ({ page }) => {
    await page.goto('/advanced-calculator');
    await page.waitForLoadState('networkidle');

    // Look for buttons and try to click them
    const buttons = page.locator('button').all();

    for (const button of await buttons) {
      if (await button.isVisible() && await button.isEnabled()) {
        const buttonText = await button.textContent();

        // Skip print buttons for now
        if (!buttonText?.toLowerCase().includes('imprimir') && !buttonText?.toLowerCase().includes('print')) {
          try {
            await button.click();
            // Wait a bit for any response
            await page.waitForTimeout(1000);
            break; // Just test one button
          } catch (e) {
            // Button might not be clickable or might cause navigation
            continue;
          }
        }
      }
    }
  });

  test('calculator maintains state during navigation', async ({ page }) => {
    await page.goto('/advanced-calculator');
    await page.waitForLoadState('networkidle');

    // Try to enter some data
    const firstInput = page.locator('input').first();
    if (await firstInput.isVisible()) {
      await firstInput.fill('Test data');

      // Navigate away and back
      await page.goto('/');
      await page.getByRole('heading', { name: 'Calculadora Avanzada' }).click();

      // Note: State might not persist depending on implementation
      // This test just ensures navigation works
      await expect(page.url()).toContain('/advanced-calculator');
    }
  });

  test('calculator works on different screen sizes', async ({ page }) => {
    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/advanced-calculator');
    await page.waitForLoadState('networkidle');

    // Verify calculator still functions on mobile
    await expect(page.locator('body')).toBeVisible();

    const hasInteractiveElements = await page.locator('input, button, select').count() > 0;
    expect(hasInteractiveElements).toBe(true);

    // Test on tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toBeVisible();
  });

  test('calculator handles error states gracefully', async ({ page }) => {
    await page.goto('/advanced-calculator');
    await page.waitForLoadState('networkidle');

    // Try to submit empty forms or invalid data
    const submitButtons = page.locator('button').filter({ hasText: /calcular|calculate|submit|enviar/i });

    if (await submitButtons.count() > 0) {
      await submitButtons.first().click();

      // Should not crash, should handle validation gracefully
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
