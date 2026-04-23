/**
 * Creative App Page Object Model
 * Encapsulates all interactions with the Creative App page
 */

export class CreativePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://apitesting.stage.iqm.com/creatives/u/0/';
    
    // Locators
    this.addNewButton = page.getByRole('button', { name: /add new/i })
      .or(page.locator('button:has-text("Add New")'))
      .first();
    
    this.searchInput = page.locator('input[placeholder*="Search"]')
      .or(page.getByPlaceholder(/search/i))
      .first();
    
    this.filterButtons = page.locator('button[class*="filter"], [role="button"]:has-text(/image|video|audio|html|native/i)');
    
    this.creativeCards = page.locator('[class*="creative"], [class*="item"], [class*="card"], [role="article"]');
    
    this.selectAllCheckbox = page.locator('input[name="select_all_rows"], input[type="checkbox"][aria-label*="all" i]').first();
    
    this.deleteButton = page.getByRole('button', { name: /delete|remove/i })
      .or(page.locator('button:has-text("Delete")'))
      .first();
    
    this.editButton = page.getByRole('button', { name: /edit/i })
      .or(page.locator('button:has-text("Edit")'))
      .first();
    
    this.duplicateButton = page.getByRole('button', { name: /duplicate|copy/i })
      .or(page.locator('button:has-text("Duplicate")'))
      .first();
    
    this.previewButton = page.getByRole('button', { name: /preview|view/i })
      .or(page.locator('button:has-text("Preview")'))
      .first();
    
    this.createForm = page.locator('form, [role="dialog"]').first();
    
    this.nameInput = page.getByLabel(/name/i)
      .or(page.locator('input[name*="name"]'))
      .first();
    
    this.typeSelect = page.getByLabel(/type/i)
      .or(page.locator('select[name*="type"]'))
      .first();
    
    this.submitButton = page.getByRole('button', { name: /create|submit|save/i })
      .or(page.locator('button:has-text("Submit")'))
      .first();
    
    this.cancelButton = page.getByRole('button', { name: /cancel|close/i })
      .or(page.locator('button:has-text("Cancel")'))
      .first();
    
    this.successMessage = page.getByText(/success|created|updated|deleted/i);
    
    this.errorMessage = page.getByText(/error|failed|invalid/i);
    
    this.loadingSpinner = page.locator('[class*="loading"], [class*="spinner"], [role="status"]');
  }

  /**
   * Navigate to Creative App
   */
  async goto() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Add New button to create creative
   */
  async clickAddNew() {
    await this.addNewButton.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Search for creative by name
   */
  async searchByName(name) {
    await this.searchInput.fill(name);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Clear search input
   */
  async clearSearch() {
    await this.searchInput.clear();
    await this.page.waitForTimeout(500);
  }

  /**
   * Filter by creative type
   */
  async filterByType(type) {
    const typeButton = this.page.getByRole('button', { name: new RegExp(type, 'i') })
      .or(this.page.locator(`button:has-text("${type}")`))
      .first();
    await typeButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get count of visible creatives
   */
  async getCreativeCount() {
    return await this.creativeCards.count();
  }

  /**
   * Get creative by name
   */
  async getCreativeByName(name) {
    return this.page.locator(`[class*="creative"], [class*="item"]:has-text("${name}")`).first();
  }

  /**
   * Click on creative to select/open
   */
  async clickCreative(name) {
    const creative = await this.getCreativeByName(name);
    await creative.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Select all creatives
   */
  async selectAll() {
    await this.selectAllCheckbox.check();
    await this.page.waitForTimeout(500);
  }

  /**
   * Deselect all creatives
   */
  async deselectAll() {
    await this.selectAllCheckbox.uncheck();
    await this.page.waitForTimeout(500);
  }

  /**
   * Get count of selected creatives
   */
  async getSelectedCount() {
    const selectedCheckboxes = this.page.locator('input[type="checkbox"]:checked');
    return await selectedCheckboxes.count();
  }

  /**
   * Fill creative form
   */
  async fillCreativeForm(data) {
    if (data.name) {
      await this.nameInput.fill(data.name);
    }
    if (data.type) {
      await this.typeSelect.selectOption(data.type);
    }
    if (data.description) {
      const descInput = this.page.getByLabel(/description/i)
        .or(this.page.locator('textarea[name*="description"]'))
        .first();
      await descInput.fill(data.description);
    }
    await this.page.waitForTimeout(500);
  }

  /**
   * Submit creative form
   */
  async submitForm() {
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Cancel form
   */
  async cancelForm() {
    await this.cancelButton.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Create new creative
   */
  async createCreative(data) {
    await this.clickAddNew();
    await this.fillCreativeForm(data);
    await this.submitForm();
  }

  /**
   * Edit creative
   */
  async editCreative(name, newData) {
    await this.clickCreative(name);
    await this.editButton.click();
    await this.fillCreativeForm(newData);
    await this.submitForm();
  }

  /**
   * Delete creative
   */
  async deleteCreative(name) {
    await this.clickCreative(name);
    await this.deleteButton.click();
    // Handle confirmation dialog if present
    const confirmButton = this.page.getByRole('button', { name: /confirm|yes|delete/i }).first();
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Duplicate creative
   */
  async duplicateCreative(name) {
    await this.clickCreative(name);
    await this.duplicateButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Preview creative
   */
  async previewCreative(name) {
    await this.clickCreative(name);
    await this.previewButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Bulk delete creatives
   */
  async bulkDelete() {
    await this.deleteButton.click();
    const confirmButton = this.page.getByRole('button', { name: /confirm|yes|delete/i }).first();
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if success message is visible
   */
  async isSuccessMessageVisible() {
    return await this.successMessage.isVisible();
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }

  /**
   * Get error message text
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  /**
   * Wait for loading to complete
   */
  async waitForLoadingComplete() {
    await this.page.waitForLoadState('networkidle');
    const spinner = this.loadingSpinner;
    if (await spinner.isVisible()) {
      await spinner.waitFor({ state: 'hidden', timeout: 10000 });
    }
  }

  /**
   * Get current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Verify page is loaded
   */
  async isPageLoaded() {
    await this.page.waitForLoadState('networkidle');
    return await this.page.locator('body').isVisible();
  }
}
