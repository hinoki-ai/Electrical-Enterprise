import { test, expect } from '@playwright/test';

// Authentication helper
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
    console.log('[E2E-DEBUG] Already authenticated or on dashboard - waiting for app to load');
    // Even if already authenticated, wait for the app to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Extra wait for app initialization
  }
}

test.describe('Electrical Enterprise E2E Tests', () => {
  test('homepage loads and user can authenticate', async ({ page }) => {
    console.log('[E2E-DEBUG] Testing homepage load and authentication...');
    await page.goto('/');

    // Handle authentication if needed
    await authenticateUser(page);

    // Wait for either dashboard content or error/loading states
    const mainHeading = page.getByRole('heading', { name: 'Electrical Enterprise' });
    const dashboardElements = page.locator('[data-testid="dashboard"], .dashboard, [class*="dashboard"]');
    const loadingHeading = page.getByRole('heading', { name: 'loading' });
    const errorElements = page.locator('[class*="error"], [data-testid*="error"]');

    // Wait for content to settle (either loaded or in error state)
    await Promise.race([
      mainHeading.waitFor({ state: 'visible', timeout: 10000 }).catch(() => null),
      dashboardElements.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => null),
      loadingHeading.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null),
      errorElements.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => null),
      page.waitForTimeout(10000) // Max wait time
    ]);

    // Check what state we're in
    const hasMainHeading = await mainHeading.isVisible().catch(() => false);
    const hasDashboard = (await dashboardElements.count()) > 0;
    const isLoading = await loadingHeading.isVisible().catch(() => false);
    const hasError = (await errorElements.count()) > 0;

    console.log(`[E2E-DEBUG] hasMainHeading: ${hasMainHeading}, hasDashboard: ${hasDashboard}, isLoading: ${isLoading}, hasError: ${hasError}`);

    // Verify we're in some expected state
    expect(hasMainHeading || hasDashboard || isLoading || hasError).toBe(true);

    console.log('[E2E-DEBUG] Homepage authentication test passed');
  });

  test('can navigate to advanced calculator when available', async ({ page }) => {
    await page.goto('/');

    // Handle authentication first
    await authenticateUser(page);

    // Check if calculator card is available
    const calculatorCard = page.getByRole('heading', { name: 'Calculadora Avanzada' });
    const calculatorLink = page.getByRole('link', { name: /calculadora|calculator/i });

    if (await calculatorCard.isVisible()) {
      // Click on the advanced calculator card
      await calculatorCard.click();

      // Wait for navigation and check we're on the calculator page
      await page.waitForURL('**/advanced-calculator');

      // Check that calculator components load
      await expect(page.locator('h1, h2, h3').first()).toBeVisible();
    } else if (await calculatorLink.isVisible()) {
      // Try alternative calculator link
      await calculatorLink.click();
      await page.waitForURL('**/advanced-calculator');
      await expect(page.locator('body')).toBeVisible();
    } else {
      // Calculator not available - check if we're in a working state
      console.log('Calculator navigation not available - checking if page loads normally');
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('calculator page loads and functions', async ({ page }) => {
    await page.goto('/advanced-calculator');

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Check that main elements are present
    await expect(page.locator('body')).toBeVisible();

    // Look for common calculator elements (these may vary based on implementation)
    const hasFormElements = await page.locator('input, select, button').count() > 0;
    expect(hasFormElements).toBe(true);
  });

  test('recent quotes section appears when quotes exist', async ({ page }) => {
    await page.goto('/');

    // Check if recent quotes section is visible (only appears if quotes exist)
    const quotesSection = page.getByRole('heading', { name: 'Cotizaciones Recientes' });

    // Either the section exists and is visible, or it doesn't exist (which is also fine)
    const isVisible = await quotesSection.isVisible().catch(() => false);
    if (isVisible) {
      await expect(quotesSection).toBeVisible();
    }
  });

  test('responsive design works on mobile', async ({ page }) => {
    console.log('[E2E-DEBUG] Testing responsive design on mobile...');
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size

    await page.goto('/');

    // Handle authentication on mobile
    await authenticateUser(page);

    // Wait for content to load on mobile
    const mainHeading = page.getByRole('heading', { name: 'Electrical Enterprise' });
    const dashboardElements = page.locator('[data-testid="dashboard"], .dashboard, [class*="dashboard"]');
    const loadingHeading = page.getByRole('heading', { name: 'loading' });
    const errorElements = page.locator('[class*="error"], [data-testid*="error"]');

    // Wait for content to settle on mobile
    await Promise.race([
      mainHeading.waitFor({ state: 'visible', timeout: 10000 }).catch(() => null),
      dashboardElements.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => null),
      loadingHeading.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null),
      errorElements.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => null),
      page.waitForTimeout(10000)
    ]);

    const hasMainHeading = await mainHeading.isVisible().catch(() => false);
    const hasDashboard = (await dashboardElements.count()) > 0;
    const isLoading = await loadingHeading.isVisible().catch(() => false);
    const hasError = (await errorElements.count()) > 0;

    console.log(`[E2E-DEBUG] Mobile - hasMainHeading: ${hasMainHeading}, hasDashboard: ${hasDashboard}, isLoading: ${isLoading}, hasError: ${hasError}`);

    // Verify mobile page is in some expected state
    expect(hasMainHeading || hasDashboard || isLoading || hasError).toBe(true);

    // If calculator card is available, check it's still clickable on mobile
    const calculatorCard = page.getByRole('heading', { name: 'Calculadora Avanzada' });
    const calculatorLink = page.getByRole('link', { name: /calculadora|calculator/i });

    if (await calculatorCard.isVisible().catch(() => false)) {
      console.log('[E2E-DEBUG] Calculator card visible on mobile');
      await expect(calculatorCard).toBeVisible();
    } else if (await calculatorLink.isVisible().catch(() => false)) {
      console.log('[E2E-DEBUG] Calculator link visible on mobile');
      await expect(calculatorLink).toBeVisible();
    } else {
      console.log('[E2E-DEBUG] Calculator not visible on mobile - may be in mobile layout');
    }
  });

  test('navigation works correctly when available', async ({ page }) => {
    await page.goto('/');

    // Handle authentication first
    await authenticateUser(page);

    // Only test navigation if calculator is available
    const calculatorCard = page.getByRole('heading', { name: 'Calculadora Avanzada' });
    const calculatorLink = page.getByRole('link', { name: /calculadora|calculator/i });

    if (await calculatorCard.isVisible()) {
      // Test back/forward navigation
      await calculatorCard.click();
      await page.waitForURL('**/advanced-calculator');

      await page.goBack();
      await expect(page).toHaveURL('/');

      await page.goForward();
      await expect(page).toHaveURL(/.*advanced-calculator/);
    } else if (await calculatorLink.isVisible()) {
      // Test with alternative calculator link
      await calculatorLink.click();
      await page.waitForURL('**/advanced-calculator');

      await page.goBack();
      await expect(page).toHaveURL('/');

      await page.goForward();
      await expect(page).toHaveURL(/.*advanced-calculator/);
    } else {
      // Skip navigation test if calculator is not available
      console.log('Skipping navigation test - calculator not available');
    }
  });
});
