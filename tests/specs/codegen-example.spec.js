import { test, expect } from '@playwright/test';
import { getIQMCredentials } from '../iqm-site/utils/testData.js';

/**
 * Example: Tests Generated with Playwright Codegen
 * 
 * This file demonstrates how to:
 * 1. Record scenarios using codegen
 * 2. Integrate generated code into your framework
 * 3. Enhance with framework utilities
 * 4. Add proper assertions and error handling
 * 
 * To generate new tests:
 * npm run codegen:iqm
 * 
 * Then copy the generated code and adapt it following the patterns below.
 */

test.describe('Codegen Examples - Recorded Scenarios', () => {
  
  /**
   * Example 1: Simple Navigation and Verification
   * 
   * Codegen recorded:
   * - Page navigation
   * - Element visibility checks
   * - URL verification
   */
  test('Example 1: Navigate and verify page loads', async ({ page }) => {
    // Generated code
    await page.goto('https://apitesting.stage.iqm.com/');
    
    // Verify page loaded
    await expect(page).toHaveURL(/apitesting/);
    
    // Verify login form is visible
    const emailInput = page.locator('input[type="email"]')
      .or(page.locator('input[name*="email"]'))
      .or(page.locator('input[name*="username"]'));
    
    await expect(emailInput).toBeVisible();
  });

  /**
   * Example 2: Form Filling and Submission
   * 
   * Codegen recorded:
   * - Text input filling
   * - Button clicks
   * - Navigation after submission
   */
  test('Example 2: Fill form and submit', async ({ page }) => {
    const creds = getIQMCredentials();
    
    // Navigate to app
    await page.goto('https://apitesting.stage.iqm.com/');
    
    // Fill email (generated code with fallbacks)
    const emailInput = page.locator('input[type="email"]')
      .or(page.locator('input[name*="email"]'))
      .or(page.locator('input[name*="username"]'))
      .first();
    
    await emailInput.fill(creds.username);
    
    // Click Next button (generated code with fallbacks)
    const nextButton = page.locator('button[type="submit"]')
      .or(page.getByRole('button', { name: /next|continue/i }))
      .or(page.locator('button:has-text("Next")'))
      .first();
    
    await nextButton.click();
    
    // Wait for password field to appear
    await page.waitForLoadState('networkidle');
    
    // Fill password
    const passwordInput = page.locator('input[type="password"]')
      .or(page.locator('input[name*="password"]'))
      .first();
    
    await passwordInput.fill(creds.password);
    
    // Click login button
    const loginButton = page.locator('button[type="submit"]')
      .or(page.getByRole('button', { name: /login|sign in/i }))
      .first();
    
    await loginButton.click();
    
    // Verify navigation to dashboard
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard|home/i);
  });

  /**
   * Example 3: Multi-step Workflow
   * 
   * Codegen recorded:
   * - Multiple page interactions
   * - Sequential actions
   * - Intermediate verifications
   */
  test('Example 3: Multi-step workflow with verification', async ({ page }) => {
    const creds = getIQMCredentials();
    
    // Step 1: Login
    await page.goto('https://apitesting.stage.iqm.com/');
    
    const emailInput = page.locator('input[type="email"]')
      .or(page.locator('input[name*="email"]'))
      .first();
    await emailInput.fill(creds.username);
    
    const nextButton = page.locator('button:has-text("Next")')
      .or(page.getByRole('button', { name: /next/i }))
      .first();
    await nextButton.click();
    
    await page.waitForLoadState('networkidle');
    
    const passwordInput = page.locator('input[type="password"]')
      .or(page.locator('input[name*="password"]'))
      .first();
    await passwordInput.fill(creds.password);
    
    const loginButton = page.locator('button:has-text("Login")')
      .or(page.getByRole('button', { name: /login/i }))
      .first();
    await loginButton.click();
    
    // Step 2: Verify logged in
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard|home/i);
    
    // Step 3: Navigate to creatives section
    const creativesLink = page.locator('a:has-text("Creatives")')
      .or(page.getByRole('link', { name: /creatives/i }))
      .first();
    
    if (await creativesLink.isVisible()) {
      await creativesLink.click();
      await page.waitForLoadState('networkidle');
    }
    
    // Step 4: Verify creatives page loaded
    const pageTitle = page.locator('h1, h2, [role="heading"]').first();
    await expect(pageTitle).toBeVisible();
  });

  /**
   * Example 4: File Upload
   * 
   * Codegen recorded:
   * - File input interaction
   * - File selection
   * - Upload submission
   */
  test('Example 4: File upload workflow', async ({ page }) => {
    const creds = getIQMCredentials();
    
    // Login first
    await page.goto('https://apitesting.stage.iqm.com/');
    
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill(creds.username);
    
    const nextButton = page.locator('button:has-text("Next")').first();
    await nextButton.click();
    
    await page.waitForLoadState('networkidle');
    
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill(creds.password);
    
    const loginButton = page.locator('button:has-text("Login")').first();
    await loginButton.click();
    
    await page.waitForLoadState('networkidle');
    
    // Navigate to upload section
    const uploadButton = page.locator('button:has-text("Upload")')
      .or(page.locator('button:has-text("Create")')).first();
    
    if (await uploadButton.isVisible()) {
      await uploadButton.click();
      await page.waitForLoadState('networkidle');
      
      // Find file input and upload
      const fileInput = page.locator('input[type="file"]').first();
      
      if (await fileInput.isVisible()) {
        // Use test data file
        const testFile = 'tests/iqm-site/testdata/creatives/images/Image1.png';
        await fileInput.setInputFiles(testFile);
        
        // Verify file was selected
        await expect(fileInput).toHaveValue(/Image1/);
      }
    }
  });

  /**
   * Example 5: Search and Filter
   * 
   * Codegen recorded:
   * - Search input
   * - Filter selection
   * - Result verification
   */
  test('Example 5: Search and filter', async ({ page }) => {
    const creds = getIQMCredentials();
    
    // Login
    await page.goto('https://apitesting.stage.iqm.com/');
    
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill(creds.username);
    
    const nextButton = page.locator('button:has-text("Next")').first();
    await nextButton.click();
    
    await page.waitForLoadState('networkidle');
    
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill(creds.password);
    
    const loginButton = page.locator('button:has-text("Login")').first();
    await loginButton.click();
    
    await page.waitForLoadState('networkidle');
    
    // Search
    const searchInput = page.locator('input[type="search"]')
      .or(page.locator('input[placeholder*="Search"]'))
      .or(page.locator('input[name*="search"]')).first();
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      await page.waitForLoadState('networkidle');
      
      // Verify results
      const results = page.locator('[role="row"], .result-item, .list-item').first();
      await expect(results).toBeVisible();
    }
  });

  /**
   * Example 6: Modal/Dialog Interaction
   * 
   * Codegen recorded:
   * - Modal opening
   * - Form filling in modal
   * - Modal submission
   */
  test('Example 6: Modal interaction', async ({ page }) => {
    const creds = getIQMCredentials();
    
    // Login
    await page.goto('https://apitesting.stage.iqm.com/');
    
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill(creds.username);
    
    const nextButton = page.locator('button:has-text("Next")').first();
    await nextButton.click();
    
    await page.waitForLoadState('networkidle');
    
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill(creds.password);
    
    const loginButton = page.locator('button:has-text("Login")').first();
    await loginButton.click();
    
    await page.waitForLoadState('networkidle');
    
    // Open modal
    const openModalButton = page.locator('button:has-text("Create")')
      .or(page.locator('button:has-text("Add")')).first();
    
    if (await openModalButton.isVisible()) {
      await openModalButton.click();
      
      // Wait for modal to appear
      const modal = page.locator('[role="dialog"], .modal, .dialog').first();
      await expect(modal).toBeVisible();
      
      // Fill form in modal
      const titleInput = modal.locator('input[name="title"]')
        .or(modal.locator('input[placeholder*="Title"]')).first();
      
      if (await titleInput.isVisible()) {
        await titleInput.fill('Test Item');
      }
      
      // Submit modal
      const submitButton = modal.locator('button:has-text("Submit")')
        .or(modal.locator('button:has-text("Save")')).first();
      
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // Wait for modal to close
        await expect(modal).not.toBeVisible();
      }
    }
  });

  /**
   * Example 7: Dropdown/Select Interaction
   * 
   * Codegen recorded:
   * - Dropdown opening
   * - Option selection
   * - Verification of selection
   */
  test('Example 7: Dropdown selection', async ({ page }) => {
    const creds = getIQMCredentials();
    
    // Login
    await page.goto('https://apitesting.stage.iqm.com/');
    
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill(creds.username);
    
    const nextButton = page.locator('button:has-text("Next")').first();
    await nextButton.click();
    
    await page.waitForLoadState('networkidle');
    
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill(creds.password);
    
    const loginButton = page.locator('button:has-text("Login")').first();
    await loginButton.click();
    
    await page.waitForLoadState('networkidle');
    
    // Find and interact with dropdown
    const dropdown = page.locator('select, [role="combobox"], .dropdown').first();
    
    if (await dropdown.isVisible()) {
      await dropdown.click();
      
      // Select option
      const option = page.locator('[role="option"]')
        .or(page.locator('.dropdown-item')).first();
      
      if (await option.isVisible()) {
        await option.click();
      }
    }
  });

  /**
   * Example 8: Keyboard Interactions
   * 
   * Codegen recorded:
   * - Keyboard input
   * - Tab navigation
   * - Enter submission
   */
  test('Example 8: Keyboard interactions', async ({ page }) => {
    const creds = getIQMCredentials();
    
    // Navigate
    await page.goto('https://apitesting.stage.iqm.com/');
    
    // Fill email and press Tab
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill(creds.username);
    await emailInput.press('Tab');
    
    // Press Enter to submit
    const nextButton = page.locator('button:has-text("Next")').first();
    await nextButton.press('Enter');
    
    await page.waitForLoadState('networkidle');
    
    // Fill password and press Enter
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill(creds.password);
    await passwordInput.press('Enter');
    
    // Verify navigation
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard|home/i);
  });
});

/**
 * Tips for Using Codegen:
 * 
 * 1. Start codegen: npm run codegen:iqm
 * 2. Interact with the app in the browser
 * 3. Watch code generate in the inspector panel
 * 4. Copy the generated code
 * 5. Paste into a test file
 * 6. Adapt using the patterns shown above
 * 7. Add assertions and error handling
 * 8. Run the test: npm run test:iqm
 * 9. View results in dashboard: npm run dashboard
 * 
 * Best Practices:
 * - Use flexible locators (not just CSS selectors)
 * - Add waits for dynamic content
 * - Use credentials from config, not hardcoded
 * - Extract common patterns into helper functions
 * - Add meaningful assertions
 * - Use page objects for complex interactions
 * - Keep tests focused and readable
 */
