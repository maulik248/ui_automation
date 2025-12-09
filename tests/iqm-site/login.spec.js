import { test, expect } from '@playwright/test';
import { getIQMCredentials } from '../../utils/credentials.js';

test.describe.serial('IQM Login Tests', () => {
  
  test('User can login successfully', async ({ page }) => {
    const creds = getIQMCredentials();

    await page.goto('https://apitesting.stage.iqm.com/');
    await page.waitForLoadState('networkidle');

    // Enter email with multiple fallback strategies
    const emailInput = page.locator('input[type="email"]')
      .or(page.locator('input[name*="email"]'))
      .or(page.locator('input[name*="username"]'))
      .first();

    await emailInput.fill(creds.username);

    // Click Next button
    const nextButton = page.locator('button[type="submit"]')
      .or(page.getByRole('button', { name: /next|continue/i }))
      .or(page.locator('button:has-text("Next")'))
      .first();
    
    await nextButton.click();
    
    // Wait for password field to appear
    await page.waitForLoadState('networkidle');

    // Enter password with multiple strategies
    const passwordInput = page.locator('input[type="password"]')
      .or(page.locator('input[name*="password"]'))
      .first();

    await passwordInput.fill(creds.password);

    // Click login button
    const loginButton = page.locator('button[type="submit"]')
      .or(page.getByRole('button', { name: /login|sign in/i }))
      .first();

    await loginButton.click();
    
    // Verify successful login
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard|home/i);
  });

  test('Login fails with invalid email', async ({ page }) => {
    await page.goto('https://apitesting.stage.iqm.com/');
    await page.waitForLoadState('networkidle');

    // Enter invalid email
    const emailInput = page.locator('input[type="email"]')
      .or(page.locator('input[name*="email"]'))
      .or(page.locator('input[name*="username"]'))
      .first();

    await emailInput.fill('invalid.email@test.com');

    // Click Next button
    const nextButton = page.locator('button[type="submit"]')
      .or(page.getByRole('button', { name: /next|continue/i }))
      .or(page.locator('button:has-text("Next")'))
      .first();
    
    await nextButton.click();
    await page.waitForTimeout(2000);

    // Check if password field appears or error shows
    const passwordVisible = await page.locator('input[type="password"]').isVisible().catch(() => false);
    
    if (passwordVisible) {
      // System allows invalid email, complete the flow to get final error
      const passwordInput = page.locator('input[type="password"]').first();
      await passwordInput.fill('DummyPassword123!');
      
      const loginButton = page.locator('button[type="submit"]')
        .or(page.getByRole('button', { name: /login|sign in/i }))
        .first();
      await loginButton.click();
      await page.waitForTimeout(2000);
    }

    // Verify either:
    // 1. Error message is visible OR
    // 2. User did not reach dashboard (stayed on login page)
    const hasError = await page.locator('*:has-text("User not found"), *:has-text("Invalid"), *:has-text("incorrect"), *:has-text("failed")')
      .first()
      .isVisible()
      .catch(() => false);
    
    const currentUrl = page.url();
    const notOnDashboard = !currentUrl.includes('dashboard') && !currentUrl.includes('home');
    
    expect(hasError || notOnDashboard).toBeTruthy();
  });

  test('Login fails with invalid password', async ({ page }) => {
    const creds = getIQMCredentials();

    await page.goto('https://apitesting.stage.iqm.com/');
    await page.waitForLoadState('networkidle');

    // Enter valid email
    const emailInput = page.locator('input[type="email"]')
      .or(page.locator('input[name*="email"]'))
      .or(page.locator('input[name*="username"]'))
      .first();

    await emailInput.fill(creds.username);

    // Click Next button
    const nextButton = page.locator('button[type="submit"]')
      .or(page.getByRole('button', { name: /next|continue/i }))
      .or(page.locator('button:has-text("Next")'))
      .first();
    
    await nextButton.click();
    
    // Wait for password field
    await page.waitForLoadState('networkidle');

    // Enter invalid password
    const passwordInput = page.locator('input[type="password"]')
      .or(page.locator('input[name*="password"]'))
      .first();

    await passwordInput.fill('WrongPassword123!');

    // Click login button
    const loginButton = page.locator('button[type="submit"]')
      .or(page.getByRole('button', { name: /login|sign in/i }))
      .first();

    await loginButton.click();
    
    // Wait for error message
    await page.waitForLoadState('networkidle');

    // Verify error message appears
    const errorMessage = page.locator('[role="alert"]')
      .or(page.locator('.error, .invalid-feedback, .alert-danger'))
      .or(page.getByText(/invalid|incorrect|wrong|error|failed/i))
      .first();

    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });
});
