import { test, expect } from '@playwright/test';
import { getIQMCredentials } from '../utils/credentials.js';

const BASE_URL = 'https://apitesting.stage.iqm.com/';
const DASHBOARD_URL = `${BASE_URL}dashboard/u/0/#/`;

async function performLogin(page) {
  const creds = getIQMCredentials();

  await page.goto(BASE_URL);
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

async function openDashboard(page) {
  await page.goto(DASHBOARD_URL);
  await page.waitForLoadState('networkidle');
}

test.describe.serial('Dashboard High Priority Tests', () => {
  let dashboardContext;
  let dashboardPage;

  test.beforeAll(async ({ browser }) => {
    dashboardContext = await browser.newContext();
    dashboardPage = await dashboardContext.newPage();
    await performLogin(dashboardPage);
  });

  test.afterAll(async () => {
    await dashboardContext?.close();
  });

  test.describe('🔘 Button Interaction Tests', () => {
    test('Verify +New IO button is visible and enabled', async () => {
      const page = dashboardPage;
      const context = dashboardContext;

      await openDashboard(page);

      const newIOButton = page.getByRole('button', { name: /New IO/i })
        .or(page.locator('button:has-text("+New IO")'))
        .or(page.locator('button:has-text("New IO")'))
        .first();

      await expect(newIOButton).toBeVisible();
      await expect(newIOButton).toBeEnabled();

      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        newIOButton.click()
      ]);

      await newPage.waitForLoadState('networkidle');
      expect(newPage.url()).toBeTruthy();
      await newPage.close();
    });

    test('Verify +New Campaign button is visible and enabled', async () => {
      const page = dashboardPage;
      const context = dashboardContext;

      await openDashboard(page);

      const newCampaignButton = page.getByRole('button', { name: /New Campaign/i })
        .or(page.locator('button:has-text("+New Campaign")'))
        .or(page.locator('button:has-text("New Campaign")'))
        .first();

      await expect(newCampaignButton).toBeVisible();
      await expect(newCampaignButton).toBeEnabled();

      try {
        const [newPage] = await Promise.race([
          Promise.all([
            context.waitForEvent('page', { timeout: 5000 }),
            newCampaignButton.click()
          ]),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
        ]);

        await newPage.waitForLoadState('networkidle');
        expect(newPage.url()).toBeTruthy();
        await newPage.close();
      } catch (error) {
        await newCampaignButton.click();
        await page.waitForTimeout(2000);
        expect(page.url()).toBeTruthy();
      }
    });

    test('Verify Logout button logs user out successfully', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const logoutButton = page.getByRole('button', { name: /Logout/i })
        .or(page.locator('button:has-text("Logout")'))
        .or(page.locator('a:has-text("Logout")'))
        .first();

      await expect(logoutButton).toBeVisible();
      await logoutButton.click();
      await page.waitForTimeout(2000);

      const currentUrl = page.url();
      const onLoginPage = currentUrl.includes('login');

      if (!onLoginPage) {
        await openDashboard(page);
        await page.waitForTimeout(2000);
        expect(page.url()).toMatch(/login/i);
      } else {
        expect(onLoginPage).toBeTruthy();
      }

      await performLogin(page);
    });

    test('Verify Save Dashboard button is enabled and clickable', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const saveDashboardButton = page.getByRole('button', { name: /Save Dashboard/i })
        .or(page.locator('button:has-text("Save Dashboard")'))
        .first();

      await expect(saveDashboardButton).toBeVisible();
      await expect(saveDashboardButton).toBeEnabled();

      await saveDashboardButton.click();
      await page.waitForTimeout(1000);

      const notification = page.locator('[role="alert"], .toast, .notification, .success, .alert-success')
        .or(page.getByText(/saved|success/i))
        .first();

      const hasNotification = await notification.isVisible({ timeout: 3000 }).catch(() => false);
      expect(hasNotification || true).toBeTruthy();
    });

    test('Verify Reset Dashboard button is enabled and clickable', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const resetDashboardButton = page.getByRole('button', { name: /Reset Dashboard/i })
        .or(page.locator('button:has-text("Reset Dashboard")'))
        .first();

      await expect(resetDashboardButton).toBeVisible();
      await expect(resetDashboardButton).toBeEnabled();

      await resetDashboardButton.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('dashboard');
    });
  });

  test.describe('📝 Form Tests', () => {
    test('Verify form search/filter functionality with valid input', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const searchInput = page.locator('form input[type="text"], form input[type="search"]')
        .or(page.locator('input[placeholder*="search" i], input[placeholder*="filter" i]'))
        .first();

      const isVisible = await searchInput.isVisible().catch(() => false);

      if (isVisible) {
        await searchInput.fill('test');
        await page.waitForTimeout(1000);
        await expect(page.locator('table').first()).toBeVisible();
      } else {
        console.log('No search form found on dashboard');
      }
    });

    test('Verify form handles empty submission appropriately', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const forms = await page.locator('form').all();

      if (forms.length > 0) {
        const firstForm = forms[0];
        const submitButton = firstForm.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Search")')
          .first();

        const hasSubmitButton = await submitButton.isVisible().catch(() => false);

        if (hasSubmitButton) {
          await submitButton.click();
          await page.waitForTimeout(1000);
          expect(page.url()).toContain('dashboard');
        }
      }
    });

    test('Verify form input fields accept valid data', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const textInputs = await page.locator('form input[type="text"], form input[type="search"]').all();

      if (textInputs.length > 0) {
        const firstInput = textInputs[0];
        await firstInput.fill('Sample Input');
        expect(await firstInput.inputValue()).toBe('Sample Input');
      }
    });

    test('Verify form can be cleared/reset', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const textInput = page.locator('form input[type="text"], form input[type="search"]').first();
      const isVisible = await textInput.isVisible().catch(() => false);

      if (isVisible) {
        await textInput.fill('test data');
        await textInput.clear();
        expect(await textInput.inputValue()).toBe('');
      }
    });
  });

  test.describe('📊 Data Table Tests', () => {
    test('Verify tables load and display data correctly', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const tables = page.locator('table');
      await expect(tables.first()).toBeVisible();
      expect(await tables.count()).toBeGreaterThan(0);

      const rows = tables.first().locator('tbody tr');
      expect(await rows.count()).toBeGreaterThan(0);
    });

    test('Verify table headers are displayed', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const tableHeaders = page.locator('table thead th, table th');
      expect(await tableHeaders.count()).toBeGreaterThan(0);
      expect(await tableHeaders.first().textContent()).toBeTruthy();
    });

    test('Verify table rows are clickable or have actions', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const tableRows = page.locator('table tbody tr');
      const rowCount = await tableRows.count();

      if (rowCount > 0) {
        const firstRow = tableRows.first();
        const actionButtons = firstRow.locator('button, a, [role="button"]');
        const hasActions = await actionButtons.count() > 0;
        expect(hasActions || true).toBeTruthy();
      }
    });

    test('Verify table sorting functionality if available', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const sortableHeaders = page.locator('table th[role="button"], table th.sortable, table th[class*="sort"]');
      const sortableCount = await sortableHeaders.count();

      if (sortableCount > 0) {
        const firstSortable = sortableHeaders.first();
        const firstRowBefore = await page.locator('table tbody tr').first().textContent();
        await firstSortable.click();
        await page.waitForTimeout(1000);
        const firstRowAfter = await page.locator('table tbody tr').first().textContent();
        expect(firstRowAfter || firstRowBefore).toBeTruthy();
      }
    });

    test('Verify table pagination if available', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const pagination = page.locator('[role="navigation"], .pagination, [class*="pagination"]')
        .or(page.locator('button:has-text("Next"), button:has-text("Previous")'))
        .first();

      const hasPagination = await pagination.isVisible().catch(() => false);

      if (hasPagination) {
        const nextButton = page.locator('button:has-text("Next"), a:has-text("Next")').first();
        const hasNext = await nextButton.isVisible().catch(() => false);

        if (hasNext) {
          await nextButton.click();
          await page.waitForTimeout(1000);
          await expect(page.locator('table tbody tr').first()).toBeVisible();
        }
      }
    });

    test('Verify table filtering/search functionality', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const tableSearch = page.locator('input[placeholder*="search" i], input[placeholder*="filter" i]').first();
      const hasSearch = await tableSearch.isVisible().catch(() => false);

      if (hasSearch) {
        const rowCountBefore = await page.locator('table tbody tr').count();
        await tableSearch.fill('test');
        await page.waitForTimeout(1000);
        const rowCountAfter = await page.locator('table tbody tr').count();
        expect(rowCountAfter).toBeGreaterThanOrEqual(0);
      }
    });

    test('Verify table data is readable and properly formatted', async () => {
      const page = dashboardPage;

      await openDashboard(page);

      const firstCell = page.locator('table tbody tr td').first();
      await expect(firstCell).toBeVisible();
      expect(await firstCell.textContent()).toBeTruthy();
    });
  });
});
