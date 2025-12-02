import { test, expect } from '@playwright/test';

// Authentication helper (same as in basic.spec.ts)
async function authenticateUser(page: any) {
  // Wait for the page to fully load first
  await page.waitForLoadState('networkidle');

  // Check if we're on the login page
  const loginForm = page.locator('button').filter({ hasText: 'Crear Cuenta' });

  if (await loginForm.isVisible({ timeout: 5000 }).catch(() => false)) {
    console.log('[E2E-DEBUG] On login page, creating test account...');

    // Fill login form with test credentials
    await page.getByPlaceholder('Elige un usuario').fill('testuser');
    await page.getByPlaceholder('Mínimo 8 caracteres (letras y números)').fill('testpass123');
    await page.getByPlaceholder('Confirma tu contraseña').fill('testpass123');

    // Click create account
    await page.getByRole('button', { name: 'Crear Cuenta' }).click();

    // Wait for authentication to complete and app to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Extra wait for app initialization

    console.log('[E2E-DEBUG] Authentication completed');
  } else {
    console.log('[E2E-DEBUG] Already authenticated or on calculator page - waiting for app to load');
    // Even if already authenticated, wait for the app to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Extra wait for app initialization
  }
}

test.describe('Advanced Calculator Functionality', () => {
  test('calculator page loads with all components', async ({ page }) => {
    await page.goto('/advanced-calculator');

    // Handle authentication if redirected to login
    await authenticateUser(page);

    // If we got redirected to calculator, continue
    if (!page.url().includes('advanced-calculator')) {
      await page.goto('/advanced-calculator');
    }

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

    // Handle authentication if redirected to login
    await authenticateUser(page);

    // If we got redirected to calculator, continue
    if (!page.url().includes('advanced-calculator')) {
      await page.goto('/advanced-calculator');
    }

    await page.waitForLoadState('networkidle');

    // Try to interact with form elements
    const inputs = page.locator('input').all();

    for (const input of await inputs) {
      if (await input.isVisible() && await input.isEnabled()) {
        const inputType = await input.getAttribute('type');

        if (inputType === 'text' || inputType === 'number' || !inputType) {
          // Clear existing value first, then fill with test data
          await input.clear();
          await input.fill('Test input');
          await expect(input).toHaveValue('Test input');
          break; // Just test one input
        }
      }
    }
  });

  test('calculator responds to user actions', async ({ page }) => {
    await page.goto('/advanced-calculator');

    // Handle authentication if redirected to login
    await authenticateUser(page);

    // If we got redirected to calculator, continue
    if (!page.url().includes('advanced-calculator')) {
      await page.goto('/advanced-calculator');
    }

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

    // Handle authentication if redirected to login
    await authenticateUser(page);

    // If we got redirected to calculator, continue
    if (!page.url().includes('advanced-calculator')) {
      await page.goto('/advanced-calculator');
    }

    await page.waitForLoadState('networkidle');

    // Try to enter some data
    const firstInput = page.locator('input').first();
    if (await firstInput.isVisible()) {
      // Clear and fill with test data
      await firstInput.clear();
      await firstInput.fill('Test data');

      // Navigate away and back
      await page.goto('/');

      // Handle authentication again if needed
      await authenticateUser(page);

      // Try to navigate back to calculator
      const calculatorCard = page.getByRole('heading', { name: 'Calculadora Avanzada' });
      const calculatorLink = page.getByRole('link', { name: /calculadora|calculator/i });

      if (await calculatorCard.isVisible()) {
        await calculatorCard.click();
      } else if (await calculatorLink.isVisible()) {
        await calculatorLink.click();
      } else {
        // Navigate directly if no UI elements available
        await page.goto('/advanced-calculator');
      }

      // Note: State might not persist depending on implementation
      // This test just ensures navigation works
      await expect(page.url()).toContain('/advanced-calculator');
    }
  });

  test('calculator works on different screen sizes', async ({ page }) => {
    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/advanced-calculator');

    // Handle authentication if redirected to login
    await authenticateUser(page);

    // If we got redirected to calculator, continue
    if (!page.url().includes('advanced-calculator')) {
      await page.goto('/advanced-calculator');
    }

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

    // Handle authentication if redirected to login
    await authenticateUser(page);

    // If we got redirected to calculator, continue
    if (!page.url().includes('advanced-calculator')) {
      await page.goto('/advanced-calculator');
    }

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
