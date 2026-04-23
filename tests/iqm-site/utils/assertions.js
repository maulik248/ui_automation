/**
 * Custom Assertions for Creative App Tests
 * Provides reusable assertion helpers
 */

import { expect } from '@playwright/test';

/**
 * Assert that a creative is visible by name
 */
export async function expectCreativeVisible(page, creativeName) {
  const creative = page.locator(`[class*="creative"], [class*="item"]:has-text("${creativeName}")`).first();
  await expect(creative).toBeVisible();
}

/**
 * Assert that a creative is not visible by name
 */
export async function expectCreativeNotVisible(page, creativeName) {
  const creative = page.locator(`[class*="creative"], [class*="item"]:has-text("${creativeName}")`).first();
  await expect(creative).not.toBeVisible();
}

/**
 * Assert that success message is displayed
 */
export async function expectSuccessMessage(page, message = null) {
  const successMsg = page.getByText(/success|created|updated|deleted/i);
  await expect(successMsg).toBeVisible();
  
  if (message) {
    await expect(successMsg).toContainText(message);
  }
}

/**
 * Assert that error message is displayed
 */
export async function expectErrorMessage(page, message = null) {
  const errorMsg = page.getByText(/error|failed|invalid/i);
  await expect(errorMsg).toBeVisible();
  
  if (message) {
    await expect(errorMsg).toContainText(message);
  }
}

/**
 * Assert that form is visible
 */
export async function expectFormVisible(page) {
  const form = page.locator('form, [role="dialog"]').first();
  await expect(form).toBeVisible();
}

/**
 * Assert that form is not visible
 */
export async function expectFormNotVisible(page) {
  const form = page.locator('form, [role="dialog"]').first();
  await expect(form).not.toBeVisible();
}

/**
 * Assert that button is enabled
 */
export async function expectButtonEnabled(page, buttonName) {
  const button = page.getByRole('button', { name: new RegExp(buttonName, 'i') }).first();
  await expect(button).toBeEnabled();
}

/**
 * Assert that button is disabled
 */
export async function expectButtonDisabled(page, buttonName) {
  const button = page.getByRole('button', { name: new RegExp(buttonName, 'i') }).first();
  await expect(button).toBeDisabled();
}

/**
 * Assert that input field has value
 */
export async function expectInputValue(page, label, value) {
  const input = page.getByLabel(new RegExp(label, 'i')).first();
  await expect(input).toHaveValue(value);
}

/**
 * Assert that input field is empty
 */
export async function expectInputEmpty(page, label) {
  const input = page.getByLabel(new RegExp(label, 'i')).first();
  await expect(input).toHaveValue('');
}

/**
 * Assert that element count matches expected
 */
export async function expectElementCount(page, selector, expectedCount) {
  const elements = page.locator(selector);
  await expect(elements).toHaveCount(expectedCount);
}

/**
 * Assert that element count is greater than
 */
export async function expectElementCountGreaterThan(page, selector, minCount) {
  const elements = page.locator(selector);
  const count = await elements.count();
  expect(count).toBeGreaterThan(minCount);
}

/**
 * Assert that element count is less than
 */
export async function expectElementCountLessThan(page, selector, maxCount) {
  const elements = page.locator(selector);
  const count = await elements.count();
  expect(count).toBeLessThan(maxCount);
}

/**
 * Assert that page has specific URL
 */
export async function expectPageUrl(page, urlPattern) {
  await expect(page).toHaveURL(new RegExp(urlPattern));
}

/**
 * Assert that page title contains text
 */
export async function expectPageTitle(page, titleText) {
  await expect(page).toHaveTitle(new RegExp(titleText, 'i'));
}

/**
 * Assert that element is in viewport
 */
export async function expectElementInViewport(page, selector) {
  const element = page.locator(selector).first();
  const box = await element.boundingBox();
  expect(box).not.toBeNull();
}

/**
 * Assert that element has specific class
 */
export async function expectElementHasClass(page, selector, className) {
  const element = page.locator(selector).first();
  await expect(element).toHaveClass(new RegExp(className));
}

/**
 * Assert that element has specific attribute
 */
export async function expectElementHasAttribute(page, selector, attribute, value = null) {
  const element = page.locator(selector).first();
  if (value) {
    await expect(element).toHaveAttribute(attribute, new RegExp(value));
  } else {
    const attr = await element.getAttribute(attribute);
    expect(attr).not.toBeNull();
  }
}

/**
 * Assert that loading spinner is visible
 */
export async function expectLoadingVisible(page) {
  const spinner = page.locator('[class*="loading"], [class*="spinner"], [role="status"]').first();
  await expect(spinner).toBeVisible();
}

/**
 * Assert that loading spinner is hidden
 */
export async function expectLoadingHidden(page) {
  const spinner = page.locator('[class*="loading"], [class*="spinner"], [role="status"]').first();
  await expect(spinner).not.toBeVisible();
}

/**
 * Assert that modal/dialog is visible
 */
export async function expectModalVisible(page, title = null) {
  const modal = page.locator('[role="dialog"], .modal:visible, [class*="dialog"]:visible').first();
  await expect(modal).toBeVisible();
  
  if (title) {
    await expect(modal).toContainText(title);
  }
}

/**
 * Assert that modal/dialog is not visible
 */
export async function expectModalNotVisible(page) {
  const modal = page.locator('[role="dialog"], .modal:visible, [class*="dialog"]:visible').first();
  await expect(modal).not.toBeVisible();
}

/**
 * Assert that table has specific number of rows
 */
export async function expectTableRowCount(page, expectedCount) {
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(expectedCount);
}

/**
 * Assert that table has specific number of columns
 */
export async function expectTableColumnCount(page, expectedCount) {
  const columns = page.locator('table thead th');
  await expect(columns).toHaveCount(expectedCount);
}

/**
 * Assert that checkbox is checked
 */
export async function expectCheckboxChecked(page, label) {
  const checkbox = page.getByLabel(new RegExp(label, 'i')).first();
  await expect(checkbox).toBeChecked();
}

/**
 * Assert that checkbox is not checked
 */
export async function expectCheckboxNotChecked(page, label) {
  const checkbox = page.getByLabel(new RegExp(label, 'i')).first();
  await expect(checkbox).not.toBeChecked();
}

/**
 * Assert that select has specific value
 */
export async function expectSelectValue(page, label, value) {
  const select = page.getByLabel(new RegExp(label, 'i')).first();
  await expect(select).toHaveValue(value);
}

/**
 * Assert that element is focused
 */
export async function expectElementFocused(page, selector) {
  const element = page.locator(selector).first();
  const focused = await page.evaluate(() => document.activeElement);
  const elementHandle = await element.elementHandle();
  expect(focused).toBe(elementHandle);
}

/**
 * Assert that element has specific text
 */
export async function expectElementText(page, selector, text) {
  const element = page.locator(selector).first();
  await expect(element).toHaveText(text);
}

/**
 * Assert that element contains specific text
 */
export async function expectElementContainsText(page, selector, text) {
  const element = page.locator(selector).first();
  await expect(element).toContainText(text);
}

/**
 * Assert that element is visible and enabled
 */
export async function expectElementVisibleAndEnabled(page, selector) {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();
  await expect(element).toBeEnabled();
}

/**
 * Assert that element is hidden or disabled
 */
export async function expectElementHiddenOrDisabled(page, selector) {
  const element = page.locator(selector).first();
  const isVisible = await element.isVisible();
  const isEnabled = await element.isEnabled();
  expect(isVisible || isEnabled).toBeFalsy();
}
