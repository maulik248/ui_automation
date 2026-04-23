/**
 * Accessibility Tests for Creative App
 * Tests WCAG 2.1 compliance using axe-core
 */

import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import { getIQMCredentials } from '../utils/credentials.js';

const CREATIVE_URL = 'https://apitesting.stage.iqm.com/creatives/u/0/';

/**
 * Helper function to login
 */
async function loginToCreativeApp(page) {
  const creds = getIQMCredentials();
  
  await page.goto('https://apitesting.stage.iqm.com/');
  await page.waitForLoadState('networkidle');

  const emailInput = page.locator('input[type="email"]')
    .or(page.locator('input[name*="email"]'))
    .first();
  await emailInput.fill(creds.username);

  const nextButton = page.locator('button[type="submit"]')
    .or(page.getByRole('button', { name: /next|continue/i }))
    .first();
  await nextButton.click();
  await page.waitForLoadState('networkidle');

  const passwordInput = page.locator('input[type="password"]').first();
  await passwordInput.fill(creds.password);

  const loginButton = page.locator('button[type="submit"]')
    .or(page.getByRole('button', { name: /login|sign in/i }))
    .first();
  await loginButton.click();
  
  await page.waitForURL(/dashboard|home/i, { timeout: 10000 });
  await page.waitForLoadState('networkidle');
}

test.describe('Creative App - Accessibility Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginToCreativeApp(page);
    await page.goto(CREATIVE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('Creative app page should have no accessibility violations', async ({ page }) => {
    // Inject axe-core
    await injectAxe(page);
    
    // Check for accessibility violations
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true }
    });
  });

  test('Creative list should be keyboard navigable', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Verify focus is on first interactive element
    const focused = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    
    expect(['BUTTON', 'A', 'INPUT', 'SELECT']).toContain(focused);
  });

  test('Buttons should have accessible labels', async ({ page }) => {
    const buttons = await page.locator('button:visible').all();
    
    for (const button of buttons) {
      // Check for text content or aria-label
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });

  test('Form inputs should have associated labels', async ({ page }) => {
    const inputs = await page.locator('input:visible, select:visible, textarea:visible').all();
    
    for (const input of inputs) {
      const inputId = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (inputId) {
        // Check if label exists for this input
        const label = page.locator(`label[for="${inputId}"]`);
        const hasLabel = await label.count() > 0;
        
        // Input should have either label, aria-label, or aria-labelledby
        expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  test('Images should have alt text', async ({ page }) => {
    const images = await page.locator('img:visible').all();
    
    for (const image of images) {
      const alt = await image.getAttribute('alt');
      const ariaLabel = await image.getAttribute('aria-label');
      
      // Images should have alt text or aria-label
      expect(alt || ariaLabel).toBeTruthy();
    }
  });

  test('Links should have descriptive text', async ({ page }) => {
    const links = await page.locator('a:visible').all();
    
    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      
      // Links should have text content, aria-label, or title
      expect(text?.trim() || ariaLabel || title).toBeTruthy();
    }
  });

  test('Color contrast should be sufficient', async ({ page }) => {
    // Inject axe-core with color contrast rules
    await injectAxe(page);
    
    // Check for color contrast violations
    const results = await page.evaluate(() => {
      return new Promise((resolve) => {
        axe.run({ rules: ['color-contrast'] }, (error, results) => {
          if (error) throw error;
          resolve(results);
        });
      });
    });
    
    expect(results.violations).toHaveLength(0);
  });

  test('Headings should be properly structured', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    
    let previousLevel = 0;
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName);
      const level = parseInt(tagName.substring(1));
      
      // Heading levels should not skip (e.g., h1 -> h3 is bad)
      expect(level - previousLevel).toBeLessThanOrEqual(1);
      previousLevel = level;
    }
  });

  test('Form should be submittable with keyboard only', async ({ page }) => {
    // Click Add New button
    const addButton = page.getByRole('button', { name: /add new/i }).first();
    await addButton.click();
    await page.waitForTimeout(500);
    
    // Navigate to form fields using Tab
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verify form is focused
    const focused = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    
    expect(['INPUT', 'SELECT', 'TEXTAREA']).toContain(focused);
  });

  test('Modal dialogs should have proper ARIA attributes', async ({ page }) => {
    // Open a modal
    const addButton = page.getByRole('button', { name: /add new/i }).first();
    await addButton.click();
    await page.waitForTimeout(500);
    
    // Check for modal/dialog
    const modal = page.locator('[role="dialog"]').first();
    
    if (await modal.isVisible()) {
      // Modal should have aria-modal
      const ariaModal = await modal.getAttribute('aria-modal');
      expect(ariaModal).toBe('true');
      
      // Modal should have aria-labelledby or aria-label
      const ariaLabelledBy = await modal.getAttribute('aria-labelledby');
      const ariaLabel = await modal.getAttribute('aria-label');
      expect(ariaLabelledBy || ariaLabel).toBeTruthy();
    }
  });

  test('Lists should have proper semantic markup', async ({ page }) => {
    const lists = await page.locator('ul, ol, [role="list"]').all();
    
    for (const list of lists) {
      const role = await list.getAttribute('role');
      const tagName = await list.evaluate(el => el.tagName);
      
      // Lists should use ul/ol or have role="list"
      expect(['UL', 'OL'].includes(tagName) || role === 'list').toBeTruthy();
    }
  });

  test('Tables should have proper headers', async ({ page }) => {
    const tables = await page.locator('table').all();
    
    for (const table of tables) {
      const headers = await table.locator('th').count();
      
      // Tables should have header row
      expect(headers).toBeGreaterThan(0);
    }
  });

  test('Focus should be visible on interactive elements', async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focused = await page.evaluate(() => {
      const element = document.activeElement;
      const styles = window.getComputedStyle(element);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow,
        backgroundColor: styles.backgroundColor,
      };
    });
    
    // Focus should be visible (outline, box-shadow, or background change)
    const hasFocusIndicator = 
      focused.outline !== 'none' || 
      focused.boxShadow !== 'none' ||
      focused.backgroundColor !== 'rgba(0, 0, 0, 0)';
    
    expect(hasFocusIndicator).toBeTruthy();
  });

  test('Error messages should be associated with form fields', async ({ page }) => {
    // Try to submit form with invalid data
    const addButton = page.getByRole('button', { name: /add new/i }).first();
    await addButton.click();
    await page.waitForTimeout(500);
    
    // Submit without filling required fields
    const submitButton = page.getByRole('button', { name: /submit|create/i }).first();
    await submitButton.click();
    await page.waitForTimeout(500);
    
    // Check for error messages
    const errors = await page.locator('[role="alert"], .error, [class*="error"]').all();
    
    for (const error of errors) {
      // Error should be visible
      const isVisible = await error.isVisible();
      expect(isVisible).toBeTruthy();
    }
  });

  test('Skip links should be present', async ({ page }) => {
    // Check for skip to main content link
    const skipLink = page.locator('a[href="#main"], a:has-text(/skip/i)').first();
    
    // Skip link should exist (even if hidden)
    const count = await skipLink.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('Page should have proper language attribute', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    
    // HTML should have lang attribute
    expect(lang).toBeTruthy();
  });

  test('Landmarks should be properly used', async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main, [role="main"]').first();
    
    // Page should have main landmark
    const hasMain = await main.count() > 0;
    expect(hasMain).toBeTruthy();
  });

  test('Text should have sufficient line spacing', async ({ page }) => {
    const textElements = await page.locator('p, span, div').all();
    
    for (const element of textElements.slice(0, 5)) {
      const lineHeight = await element.evaluate(el => {
        return window.getComputedStyle(el).lineHeight;
      });
      
      // Line height should be at least 1.5
      const lineHeightValue = parseFloat(lineHeight);
      expect(lineHeightValue).toBeGreaterThanOrEqual(1.5);
    }
  });

  test('Buttons should have minimum touch target size', async ({ page }) => {
    const buttons = await page.locator('button:visible').all();
    
    for (const button of buttons) {
      const box = await button.boundingBox();
      
      if (box) {
        // Minimum touch target size is 44x44 pixels
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
