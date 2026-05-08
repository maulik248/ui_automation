/**
 * Codegen Helper Utilities
 * 
 * Utilities to make it easier to work with Playwright codegen-generated tests
 * and integrate them into your framework.
 */

import { expect } from '@playwright/test';
import { getIQMCredentials } from './testData.js';

/**
 * Login Helper
 * 
 * Handles the complete login flow with flexible locators
 * 
 * @param {Page} page - Playwright page object
 * @param {Object} options - Login options
 * @param {string} options.username - Username (optional, uses config if not provided)
 * @param {string} options.password - Password (optional, uses config if not provided)
 * @param {number} options.timeout - Timeout in ms (default: 30000)
 * 
 * @example
 * await loginHelper(page);
 * await loginHelper(page, { username: 'custom@email.com' });
 */
export async function loginHelper(page, options = {}) {
  const creds = getIQMCredentials();
  const username = options.username || creds.username;
  const password = options.password || creds.password;
  const timeout = options.timeout || 30000;

  try {
    // Navigate to app
    await page.goto('https://apitesting.stage.iqm.com/');
    
    // Fill email with flexible locators
    const emailInput = page.locator('input[type="email"]')
      .or(page.locator('input[name*="email"]'))
      .or(page.locator('input[name*="username"]'))
      .first();
    
    await emailInput.fill(username, { timeout });
    
    // Click Next button with flexible locators
    const nextButton = page.locator('button[type="submit"]')
      .or(page.getByRole('button', { name: /next|continue/i }))
      .or(page.locator('button:has-text("Next")'))
      .first();
    
    await nextButton.click({ timeout });
    
    // Wait for password field
    await page.waitForLoadState('networkidle');
    
    // Fill password
    const passwordInput = page.locator('input[type="password"]')
      .or(page.locator('input[name*="password"]'))
      .first();
    
    await passwordInput.fill(password, { timeout });
    
    // Click login button
    const loginButton = page.locator('button[type="submit"]')
      .or(page.getByRole('button', { name: /login|sign in/i }))
      .first();
    
    await loginButton.click({ timeout });
    
    // Verify successful login
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard|home/i);
    
    return true;
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
}

/**
 * Find Element with Fallbacks
 * 
 * Tries multiple locator strategies to find an element
 * 
 * @param {Page} page - Playwright page object
 * @param {string} text - Text to search for
 * @param {string} type - Element type (button, input, link, etc.)
 * @param {Object} options - Additional options
 * 
 * @example
 * const button = await findElement(page, 'Submit', 'button');
 * const input = await findElement(page, 'Email', 'input');
 */
export async function findElement(page, text, type = 'button', options = {}) {
  const timeout = options.timeout || 5000;
  
  const locators = [
    // Exact text match
    page.locator(`${type}:has-text("${text}")`),
    // Partial text match
    page.locator(`${type}:has-text("${text.substring(0, 3)}")`),
    // Role-based
    page.getByRole(type === 'button' ? 'button' : 'textbox', { name: new RegExp(text, 'i') }),
    // Placeholder
    page.locator(`${type}[placeholder*="${text}"]`),
    // Label
    page.locator(`label:has-text("${text}") ~ ${type}`),
  ];
  
  for (const locator of locators) {
    try {
      if (await locator.first().isVisible({ timeout: 1000 })) {
        return locator.first();
      }
    } catch (e) {
      // Continue to next locator
    }
  }
  
  throw new Error(`Could not find ${type} with text "${text}"`);
}

/**
 * Fill Form Field
 * 
 * Fills a form field with flexible locator matching
 * 
 * @param {Page} page - Playwright page object
 * @param {string} label - Field label or placeholder
 * @param {string} value - Value to fill
 * @param {Object} options - Additional options
 * 
 * @example
 * await fillField(page, 'Email', 'user@example.com');
 * await fillField(page, 'Password', 'password123');
 */
export async function fillField(page, label, value, options = {}) {
  const timeout = options.timeout || 5000;
  
  const locators = [
    // By placeholder
    page.locator(`input[placeholder*="${label}"]`),
    // By label
    page.locator(`label:has-text("${label}") ~ input`),
    // By name
    page.locator(`input[name*="${label.toLowerCase()}"]`),
    // By aria-label
    page.locator(`input[aria-label*="${label}"]`),
  ];
  
  for (const locator of locators) {
    try {
      if (await locator.first().isVisible({ timeout: 1000 })) {
        await locator.first().fill(value, { timeout });
        return;
      }
    } catch (e) {
      // Continue to next locator
    }
  }
  
  throw new Error(`Could not find field with label "${label}"`);
}

/**
 * Click Button
 * 
 * Clicks a button with flexible locator matching
 * 
 * @param {Page} page - Playwright page object
 * @param {string} text - Button text
 * @param {Object} options - Additional options
 * 
 * @example
 * await clickButton(page, 'Submit');
 * await clickButton(page, 'Login');
 */
export async function clickButton(page, text, options = {}) {
  const timeout = options.timeout || 5000;
  
  const button = await findElement(page, text, 'button', { timeout });
  await button.click({ timeout });
}

/**
 * Wait for Navigation
 * 
 * Waits for page to navigate to a specific URL pattern
 * 
 * @param {Page} page - Playwright page object
 * @param {RegExp|string} urlPattern - URL pattern to match
 * @param {Object} options - Additional options
 * 
 * @example
 * await waitForNavigation(page, /dashboard/);
 * await waitForNavigation(page, 'dashboard');
 */
export async function waitForNavigation(page, urlPattern, options = {}) {
  const timeout = options.timeout || 30000;
  
  const pattern = typeof urlPattern === 'string' 
    ? new RegExp(urlPattern, 'i') 
    : urlPattern;
  
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(pattern, { timeout });
}

/**
 * Upload File
 * 
 * Uploads a file to a file input
 * 
 * @param {Page} page - Playwright page object
 * @param {string} filePath - Path to file to upload
 * @param {Object} options - Additional options
 * 
 * @example
 * await uploadFile(page, 'tests/testdata/image.png');
 */
export async function uploadFile(page, filePath, options = {}) {
  const timeout = options.timeout || 5000;
  
  const fileInput = page.locator('input[type="file"]').first();
  
  if (!await fileInput.isVisible({ timeout: 1000 })) {
    throw new Error('File input not found');
  }
  
  await fileInput.setInputFiles(filePath, { timeout });
}

/**
 * Select Dropdown Option
 * 
 * Selects an option from a dropdown
 * 
 * @param {Page} page - Playwright page object
 * @param {string} dropdownLabel - Dropdown label
 * @param {string} optionText - Option text to select
 * @param {Object} options - Additional options
 * 
 * @example
 * await selectDropdown(page, 'Status', 'Active');
 */
export async function selectDropdown(page, dropdownLabel, optionText, options = {}) {
  const timeout = options.timeout || 5000;
  
  // Find dropdown
  const dropdown = page.locator(`select, [role="combobox"]`).first();
  
  if (!await dropdown.isVisible({ timeout: 1000 })) {
    throw new Error(`Dropdown "${dropdownLabel}" not found`);
  }
  
  // Click to open
  await dropdown.click({ timeout });
  
  // Select option
  const option = page.locator(`[role="option"]:has-text("${optionText}")`)
    .or(page.locator(`.dropdown-item:has-text("${optionText}")`))
    .first();
  
  if (!await option.isVisible({ timeout: 1000 })) {
    throw new Error(`Option "${optionText}" not found`);
  }
  
  await option.click({ timeout });
}

/**
 * Verify Element Text
 * 
 * Verifies that an element contains specific text
 * 
 * @param {Page} page - Playwright page object
 * @param {string} text - Text to verify
 * @param {Object} options - Additional options
 * 
 * @example
 * await verifyText(page, 'Welcome');
 * await verifyText(page, 'Error message');
 */
export async function verifyText(page, text, options = {}) {
  const timeout = options.timeout || 5000;
  
  const element = page.locator(`text=${text}`).first();
  await expect(element).toBeVisible({ timeout });
}

/**
 * Wait for Element
 * 
 * Waits for an element to be visible
 * 
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector or text
 * @param {Object} options - Additional options
 * 
 * @example
 * await waitForElement(page, 'button:has-text("Submit")');
 */
export async function waitForElement(page, selector, options = {}) {
  const timeout = options.timeout || 5000;
  
  const element = page.locator(selector).first();
  await expect(element).toBeVisible({ timeout });
}

/**
 * Get Element Text
 * 
 * Gets the text content of an element
 * 
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector
 * 
 * @example
 * const text = await getElementText(page, 'h1');
 */
export async function getElementText(page, selector) {
  const element = page.locator(selector).first();
  return await element.textContent();
}

/**
 * Take Screenshot
 * 
 * Takes a screenshot with a descriptive name
 * 
 * @param {Page} page - Playwright page object
 * @param {string} name - Screenshot name
 * @param {Object} options - Additional options
 * 
 * @example
 * await takeScreenshot(page, 'login-page');
 */
export async function takeScreenshot(page, name, options = {}) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${name}-${timestamp}.png`;
  const path = `test-results/screenshots/${filename}`;
  
  await page.screenshot({ path, ...options });
  console.log(`Screenshot saved: ${path}`);
}

/**
 * Retry Action
 * 
 * Retries an action multiple times
 * 
 * @param {Function} action - Action to retry
 * @param {Object} options - Retry options
 * 
 * @example
 * await retryAction(async () => {
 *   await clickButton(page, 'Submit');
 * }, { maxRetries: 3, delay: 1000 });
 */
export async function retryAction(action, options = {}) {
  const maxRetries = options.maxRetries || 3;
  const delay = options.delay || 1000;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await action();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Handle Alert
 * 
 * Handles browser alerts
 * 
 * @param {Page} page - Playwright page object
 * @param {string} action - 'accept' or 'dismiss'
 * 
 * @example
 * page.on('dialog', dialog => handleAlert(page, 'accept'));
 */
export async function handleAlert(page, action = 'accept') {
  page.on('dialog', async dialog => {
    if (action === 'accept') {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });
}

/**
 * Wait for API Response
 * 
 * Waits for a specific API response
 * 
 * @param {Page} page - Playwright page object
 * @param {string|RegExp} urlPattern - URL pattern to match
 * @param {Function} action - Action that triggers the request
 * 
 * @example
 * await waitForAPIResponse(page, /api\/creatives/, async () => {
 *   await clickButton(page, 'Create');
 * });
 */
export async function waitForAPIResponse(page, urlPattern, action) {
  const responsePromise = page.waitForResponse(response => {
    const url = response.url();
    return typeof urlPattern === 'string' 
      ? url.includes(urlPattern) 
      : urlPattern.test(url);
  });
  
  await action();
  return await responsePromise;
}

export default {
  loginHelper,
  findElement,
  fillField,
  clickButton,
  waitForNavigation,
  uploadFile,
  selectDropdown,
  verifyText,
  waitForElement,
  getElementText,
  takeScreenshot,
  retryAction,
  handleAlert,
  waitForAPIResponse,
};
