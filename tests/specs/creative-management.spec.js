/**
 * Creative Management Tests
 * Tests CRUD operations for creatives using Page Object Model
 */

import { test, expect } from '@playwright/test';
import { CreativePage } from '../iqm-site/pages/CreativePage.js';
import { CreativeDataBuilder } from '../iqm-site/utils/testData.js';
import {
  expectCreativeVisible,
  expectSuccessMessage,
  expectErrorMessage,
  expectFormVisible,
  expectFormNotVisible,
} from '../iqm-site/utils/assertions.js';
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

test.describe('Creative Management - CRUD Operations', () => {
  
  let creativePage;

  test.beforeEach(async ({ page }) => {
    // Login and navigate to creative app
    await loginToCreativeApp(page);
    await page.goto(CREATIVE_URL);
    await page.waitForLoadState('networkidle');
    
    // Initialize page object
    creativePage = new CreativePage(page);
  });

  test('Create new creative with valid data', async ({ page }) => {
    // Arrange
    const creativeData = CreativeDataBuilder.createImageCreative({
      name: `Test Creative ${Date.now()}`,
    });

    // Act
    await creativePage.clickAddNew();
    await expectFormVisible(page);
    
    await creativePage.fillCreativeForm(creativeData);
    await creativePage.submitForm();

    // Assert
    await expectSuccessMessage(page);
    await expectCreativeVisible(page, creativeData.name);
  });

  test('Create creative with minimal data', async ({ page }) => {
    // Arrange
    const creativeData = CreativeDataBuilder.createMinimalCreative({
      name: `Minimal Creative ${Date.now()}`,
    });

    // Act
    await creativePage.clickAddNew();
    await creativePage.fillCreativeForm(creativeData);
    await creativePage.submitForm();

    // Assert
    await expectSuccessMessage(page);
    await expectCreativeVisible(page, creativeData.name);
  });

  test('Create creative with all fields', async ({ page }) => {
    // Arrange
    const creativeData = CreativeDataBuilder.createCompleteCreative({
      name: `Complete Creative ${Date.now()}`,
    });

    // Act
    await creativePage.clickAddNew();
    await creativePage.fillCreativeForm(creativeData);
    await creativePage.submitForm();

    // Assert
    await expectSuccessMessage(page);
    await expectCreativeVisible(page, creativeData.name);
  });

  test('Create creative fails with empty name', async ({ page }) => {
    // Arrange
    const creativeData = CreativeDataBuilder.createInvalidCreative({
      name: '',
    });

    // Act
    await creativePage.clickAddNew();
    await creativePage.fillCreativeForm(creativeData);
    await creativePage.submitForm();

    // Assert
    await expectErrorMessage(page);
  });

  test('Cancel creative creation', async ({ page }) => {
    // Act
    await creativePage.clickAddNew();
    await expectFormVisible(page);
    
    await creativePage.cancelForm();

    // Assert
    await expectFormNotVisible(page);
  });

  test('Search for creative by name', async ({ page }) => {
    // Arrange
    const searchName = 'Image';

    // Act
    await creativePage.searchByName(searchName);

    // Assert
    const count = await creativePage.getCreativeCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Search returns no results for non-existent creative', async ({ page }) => {
    // Arrange
    const searchName = `NonExistent${Date.now()}`;

    // Act
    await creativePage.searchByName(searchName);

    // Assert
    const count = await creativePage.getCreativeCount();
    expect(count).toBe(0);
  });

  test('Clear search shows all creatives', async ({ page }) => {
    // Arrange
    const initialCount = await creativePage.getCreativeCount();

    // Act
    await creativePage.searchByName('test');
    await creativePage.clearSearch();

    // Assert
    const finalCount = await creativePage.getCreativeCount();
    expect(finalCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('Filter by Image type', async ({ page }) => {
    // Act
    await creativePage.filterByType('Image');

    // Assert
    const count = await creativePage.getCreativeCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Filter by Video type', async ({ page }) => {
    // Act
    await creativePage.filterByType('Video');

    // Assert
    const count = await creativePage.getCreativeCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Filter by Audio type', async ({ page }) => {
    // Act
    await creativePage.filterByType('Audio');

    // Assert
    const count = await creativePage.getCreativeCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Select all creatives', async ({ page }) => {
    // Act
    await creativePage.selectAll();

    // Assert
    const selectedCount = await creativePage.getSelectedCount();
    expect(selectedCount).toBeGreaterThan(0);
  });

  test('Deselect all creatives', async ({ page }) => {
    // Arrange
    await creativePage.selectAll();

    // Act
    await creativePage.deselectAll();

    // Assert
    const selectedCount = await creativePage.getSelectedCount();
    expect(selectedCount).toBe(0);
  });

  test('Verify page is loaded', async ({ page }) => {
    // Act & Assert
    const isLoaded = await creativePage.isPageLoaded();
    expect(isLoaded).toBe(true);
  });

  test('Verify page title', async ({ page }) => {
    // Act
    const title = await creativePage.getPageTitle();

    // Assert
    expect(title).toBeTruthy();
  });

  test('Verify page URL', async ({ page }) => {
    // Act
    const url = await creativePage.getCurrentUrl();

    // Assert
    expect(url).toContain('creatives');
  });

  test('Create multiple creatives in sequence', async ({ page }) => {
    // Arrange
    const creatives = CreativeDataBuilder.createBulkCreatives(3, 'image');

    // Act & Assert
    for (const creative of creatives) {
      await creativePage.clickAddNew();
      await creativePage.fillCreativeForm(creative);
      await creativePage.submitForm();
      await expectSuccessMessage(page);
    }
  });

  test('Search after creating new creative', async ({ page }) => {
    // Arrange
    const creativeData = CreativeDataBuilder.createImageCreative({
      name: `Searchable Creative ${Date.now()}`,
    });

    // Act
    await creativePage.createCreative(creativeData);
    await creativePage.searchByName(creativeData.name);

    // Assert
    await expectCreativeVisible(page, creativeData.name);
  });

  test('Filter after creating new creative', async ({ page }) => {
    // Arrange
    const creativeData = CreativeDataBuilder.createImageCreative({
      name: `Filterable Creative ${Date.now()}`,
    });

    // Act
    await creativePage.createCreative(creativeData);
    await creativePage.filterByType('Image');

    // Assert
    await expectCreativeVisible(page, creativeData.name);
  });

  test('Verify creative count increases after creation', async ({ page }) => {
    // Arrange
    const initialCount = await creativePage.getCreativeCount();
    const creativeData = CreativeDataBuilder.createImageCreative({
      name: `Count Test Creative ${Date.now()}`,
    });

    // Act
    await creativePage.createCreative(creativeData);

    // Assert
    const finalCount = await creativePage.getCreativeCount();
    expect(finalCount).toBeGreaterThan(initialCount);
  });

  test('Create creative with special characters in name', async ({ page }) => {
    // Arrange
    const creativeData = CreativeDataBuilder.createCreativeWithSpecialChars({
      name: `Special @#$% ${Date.now()}`,
    });

    // Act
    await creativePage.createCreative(creativeData);

    // Assert
    await expectSuccessMessage(page);
  });

  test('Create creative with unicode characters', async ({ page }) => {
    // Arrange
    const creativeData = CreativeDataBuilder.createCreativeWithUnicode({
      name: `Unicode 测试 ${Date.now()}`,
    });

    // Act
    await creativePage.createCreative(creativeData);

    // Assert
    await expectSuccessMessage(page);
  });
});
