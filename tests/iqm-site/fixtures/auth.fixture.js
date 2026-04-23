/**
 * Authentication Fixture
 * Provides authenticated page context for tests
 */

import { test as base } from '@playwright/test';
import { getIQMCredentials } from '../../utils/credentials.js';

/**
 * Login to IQM application
 */
async function loginToIQM(page) {
  const creds = getIQMCredentials();
  
  await page.goto('https://apitesting.stage.iqm.com/');
  await page.waitForLoadState('networkidle');

  // Fill email
  const emailInput = page.locator('input[type="email"]')
    .or(page.locator('input[name*="email"]'))
    .first();
  await emailInput.fill(creds.username);

  // Click next
  const nextButton = page.locator('button[type="submit"]')
    .or(page.getByRole('button', { name: /next|continue/i }))
    .first();
  await nextButton.click();
  await page.waitForLoadState('networkidle');

  // Fill password
  const passwordInput = page.locator('input[type="password"]').first();
  await passwordInput.fill(creds.password);

  // Click login
  const loginButton = page.locator('button[type="submit"]')
    .or(page.getByRole('button', { name: /login|sign in/i }))
    .first();
  await loginButton.click();
  
  // Wait for navigation to dashboard
  await page.waitForURL(/dashboard|home/i, { timeout: 10000 });
  await page.waitForLoadState('networkidle');
}

/**
 * Extend base test with authenticated page
 */
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Setup: Login before test
    await loginToIQM(page);
    
    // Use the authenticated page in test
    await use(page);
    
    // Teardown: Optional cleanup after test
    // (page is automatically closed by Playwright)
  },
});

export const expect = base.expect;
