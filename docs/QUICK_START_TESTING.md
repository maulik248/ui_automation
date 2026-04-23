# Quick Start Guide - Creative App Testing

## 🚀 Getting Started

### Prerequisites
```bash
# Install dependencies
npm install

# Verify Playwright is installed
npx playwright --version
```

### Environment Setup
```bash
# Create .env file with credentials
echo "IQM_USERNAME=your_email@example.com" > .env
echo "IQM_PASSWORD=your_password" >> .env
```

---

## 📋 Available Test Commands

### Run All Tests
```bash
npm run test:iqm
```

### Run Specific Test File
```bash
npm run test:iqm -- tests/iqm-site/creative-exploration.spec.js
```

### Run Tests in UI Mode (Interactive)
```bash
npm run test:iqm:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:iqm:headed
```

### Run Tests in Debug Mode
```bash
npm run test:iqm:debug
```

### Run Specific Test by Name
```bash
npm run test:iqm -- -g "Search by creative name"
```

### View Test Report
```bash
npm run report
```

---

## 🎯 Test Categories & Files

### Current Test Files

#### 1. Login Tests (`tests/iqm-site/login.spec.js`)
- ✅ User can login successfully
- ✅ Login fails with invalid email
- ✅ Login fails with invalid password

**Run:** `npm run test:iqm -- tests/iqm-site/login.spec.js`

#### 2. Dashboard Tests (`tests/iqm-site/dashboard.spec.js`)
- ✅ Button interactions (+New IO, +New Campaign, Logout, etc.)
- ✅ Form tests (search, filter, input validation)
- ✅ Data table tests (display, headers, sorting, pagination)

**Run:** `npm run test:iqm -- tests/iqm-site/dashboard.spec.js`

#### 3. Dashboard Exploration (`tests/iqm-site/explore-dashboard.spec.js`)
- ✅ Automated discovery of dashboard elements
- ✅ Test plan generation

**Run:** `npm run test:iqm -- tests/iqm-site/explore-dashboard.spec.js`

#### 4. Creative App Exploration (`tests/iqm-site/creative-exploration.spec.js`)
- ✅ Automated discovery of creative app features
- ✅ UI element inventory
- ✅ Test recommendations

**Run:** `npm run test:iqm -- tests/iqm-site/creative-exploration.spec.js`

---

## 🎨 Creative App Test Cases

### High Priority Tests (Implement First)

#### 1. Button Interactions
```javascript
test('Verify Add New button opens creative creation form', async ({ page }) => {
  await page.goto('https://apitesting.stage.iqm.com/creatives/u/0/');
  
  const addButton = page.getByRole('button', { name: /add new/i })
    .or(page.locator('button:has-text("Add New")'))
    .first();
  
  await expect(addButton).toBeVisible();
  await expect(addButton).toBeEnabled();
  await addButton.click();
  
  // Verify form appears
  await expect(page.locator('form, [role="dialog"]')).toBeVisible();
});
```

#### 2. Search Functionality
```javascript
test('Search by creative name works', async ({ page }) => {
  await page.goto('https://apitesting.stage.iqm.com/creatives/u/0/');
  
  const searchInput = page.locator('input[placeholder*="Search"]')
    .or(page.getByPlaceholder(/search/i))
    .first();
  
  await searchInput.fill('creative name');
  await page.waitForTimeout(1000);
  
  // Verify results are filtered
  const creatives = await page.locator('[class*="creative"], [class*="item"]').count();
  expect(creatives).toBeGreaterThan(0);
});
```

#### 3. Filter by Type
```javascript
test('Filter by Image type shows only images', async ({ page }) => {
  await page.goto('https://apitesting.stage.iqm.com/creatives/u/0/');
  
  const imageFilter = page.getByRole('button', { name: /image/i })
    .or(page.locator('button:has-text("Image")'))
    .first();
  
  await imageFilter.click();
  await page.waitForTimeout(1000);
  
  // Verify count shows 19 images
  const heading = page.locator('h2:has-text("Image")');
  await expect(heading).toContainText('19');
});
```

#### 4. Create Creative
```javascript
test('Create new creative with valid data', async ({ page }) => {
  await page.goto('https://apitesting.stage.iqm.com/creatives/u/0/');
  
  // Click Add New
  await page.getByRole('button', { name: /add new/i }).click();
  
  // Fill form
  await page.getByLabel(/name/i).fill('Test Creative');
  await page.getByLabel(/type/i).selectOption('image');
  
  // Upload file
  await page.locator('input[type="file"]').setInputFiles('path/to/image.jpg');
  
  // Submit
  await page.getByRole('button', { name: /create|submit/i }).click();
  
  // Verify success
  await expect(page.getByText(/success|created/i)).toBeVisible();
});
```

#### 5. Bulk Select
```javascript
test('Select all creatives', async ({ page }) => {
  await page.goto('https://apitesting.stage.iqm.com/creatives/u/0/');
  
  const selectAllCheckbox = page.locator('input[name="select_all_rows"]');
  await selectAllCheckbox.check();
  
  // Verify all items are selected
  const selectedCount = await page.locator('input[name="select_row"]:checked').count();
  expect(selectedCount).toBeGreaterThan(0);
});
```

---

## 📝 Writing Your First Test

### Basic Test Template
```javascript
import { test, expect } from '@playwright/test';
import { getIQMCredentials } from '../../utils/credentials.js';

test.describe('Creative App - Feature Name', () => {
  
  test.beforeEach(async ({ page }) => {
    // Setup: Login and navigate to creative app
    const creds = getIQMCredentials();
    
    await page.goto('https://apitesting.stage.iqm.com/');
    await page.waitForLoadState('networkidle');
    
    // Login steps...
    await page.goto('https://apitesting.stage.iqm.com/creatives/u/0/');
    await page.waitForLoadState('networkidle');
  });

  test('Test description', async ({ page }) => {
    // Arrange: Set up test data
    
    // Act: Perform action
    
    // Assert: Verify results
    await expect(page.locator('selector')).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    // Cleanup: Delete test data if needed
  });
});
```

### Using Playwright AI Features
```javascript
// Use .or() for resilient selectors
const button = page.locator('button.submit')
  .or(page.locator('button[type="submit"]'))
  .or(page.getByRole('button', { name: /submit/i }))
  .first();

// Use semantic locators
await page.getByRole('button', { name: /create/i }).click();
await page.getByLabel(/email/i).fill('test@example.com');

// Use regex for flexibility
await page.getByRole('button', { name: /delete|remove/i }).click();
```

---

## 🔍 Debugging Tests

### Run Single Test in Debug Mode
```bash
npm run test:iqm:debug -- tests/iqm-site/creative-exploration.spec.js
```

### Run with Headed Browser
```bash
npm run test:iqm:headed -- tests/iqm-site/creative-exploration.spec.js
```

### Run with UI Mode (Interactive)
```bash
npm run test:iqm:ui
```

### Add Debug Statements
```javascript
test('My test', async ({ page }) => {
  // Add breakpoint
  await page.pause();
  
  // Or add console logs
  console.log('Current URL:', page.url());
  console.log('Page title:', await page.title());
});
```

### Take Screenshots
```javascript
test('My test', async ({ page }) => {
  await page.screenshot({ path: 'screenshot.png' });
});
```

### Record Video
```javascript
// Already enabled in playwright.iqm.config.js
// Videos are saved on test failure
```

---

## 📊 Test Organization

### Recommended File Structure
```
tests/iqm-site/
├── login.spec.js                    # Login tests
├── dashboard.spec.js                # Dashboard tests
├── explore-dashboard.spec.js        # Dashboard exploration
├── creative-exploration.spec.js     # Creative app exploration
├── creative-management.spec.js      # Create, edit, delete creatives
├── creative-search-filter.spec.js   # Search and filter tests
├── creative-bulk-ops.spec.js        # Bulk operations
├── creative-validation.spec.js      # Form validation
└── creative-error-handling.spec.js  # Error scenarios
```

### Test File Template
```javascript
import { test, expect } from '@playwright/test';
import { getIQMCredentials } from '../../utils/credentials.js';

const CREATIVE_URL = 'https://apitesting.stage.iqm.com/creatives/u/0/';

async function loginAndNavigate(page) {
  const creds = getIQMCredentials();
  // Login logic...
  await page.goto(CREATIVE_URL);
  await page.waitForLoadState('networkidle');
}

test.describe('Creative Management', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAndNavigate(page);
  });

  test('Test case 1', async ({ page }) => {
    // Test implementation
  });

  test('Test case 2', async ({ page }) => {
    // Test implementation
  });
});
```

---

## 🎯 Common Test Patterns

### Waiting for Elements
```javascript
// Wait for element to be visible
await expect(element).toBeVisible();

// Wait for element with timeout
await element.waitFor({ state: 'visible', timeout: 5000 });

// Wait for navigation
await page.waitForURL(/creatives/);

// Wait for network idle
await page.waitForLoadState('networkidle');
```

### Interacting with Elements
```javascript
// Click
await button.click();

// Fill text
await input.fill('text');

// Select option
await select.selectOption('value');

// Check checkbox
await checkbox.check();

// Upload file
await input.setInputFiles('path/to/file');
```

### Assertions
```javascript
// Visibility
await expect(element).toBeVisible();
await expect(element).toBeHidden();

// State
await expect(element).toBeEnabled();
await expect(element).toBeDisabled();

// Text
await expect(element).toContainText('text');
await expect(element).toHaveText('exact text');

// URL
await expect(page).toHaveURL(/pattern/);

// Count
await expect(locator).toHaveCount(5);
```

---

## 🚨 Troubleshooting

### Test Timeout
```javascript
// Increase timeout for specific test
test('My test', async ({ page }) => {
  // ...
}, { timeout: 60000 }); // 60 seconds

// Or increase globally in config
timeout: 60 * 1000
```

### Element Not Found
```javascript
// Use .or() for fallback selectors
const element = page.locator('selector1')
  .or(page.locator('selector2'))
  .or(page.getByRole('button', { name: /text/i }))
  .first();
```

### Flaky Tests
```javascript
// Use proper waits instead of timeouts
await page.waitForLoadState('networkidle');
await expect(element).toBeVisible();

// Avoid
await page.waitForTimeout(2000);
```

### Authentication Issues
```javascript
// Verify credentials in .env file
// Check if credentials are correct
// Verify login flow hasn't changed
```

---

## 📈 Test Metrics

### Current Coverage
- **Test Files:** 4
- **Test Cases:** 18
- **Coverage:** ~15%

### Target Coverage
- **Test Files:** 8-10
- **Test Cases:** 120-150
- **Coverage:** ~80-90%

---

## 🔗 Useful Resources

### Documentation
- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)

### Project Files
- `PLAYWRIGHT-AI-GUIDE.md` - AI features guide
- `CREATIVE_APP_TEST_CASES.md` - Detailed test cases
- `CREATIVE_APP_DISCOVERY_SUMMARY.md` - Discovery findings
- `TEST_CASES_ANALYSIS.md` - Comprehensive analysis

---

## ✅ Checklist for New Tests

- [ ] Test has descriptive name
- [ ] Test has clear setup (beforeEach)
- [ ] Test has clear teardown (afterEach)
- [ ] Test uses semantic locators
- [ ] Test uses .or() for resilience
- [ ] Test has proper assertions
- [ ] Test handles async operations
- [ ] Test is independent (no dependencies)
- [ ] Test is repeatable (same result each run)
- [ ] Test is fast (< 30 seconds)

---

## 🎓 Next Steps

1. ✅ **Understand the app** - Review CREATIVE_APP_DISCOVERY_SUMMARY.md
2. ✅ **Review test cases** - Read CREATIVE_APP_TEST_CASES.md
3. ⏭️ **Pick a category** - Start with HIGH PRIORITY tests
4. ⏭️ **Create test file** - Use template above
5. ⏭️ **Implement tests** - Follow patterns and best practices
6. ⏭️ **Run tests** - Use npm commands above
7. ⏭️ **Debug failures** - Use debugging techniques
8. ⏭️ **Iterate** - Add more tests incrementally

---

## 💡 Tips & Tricks

### Speed Up Tests
```javascript
// Use parallel execution
test.describe.parallel('Tests', () => {
  // Tests run in parallel
});

// Use serial for dependent tests
test.describe.serial('Tests', () => {
  // Tests run sequentially
});
```

### Reuse Login
```javascript
// Create helper function
async function loginToCreativeApp(page) {
  const creds = getIQMCredentials();
  // Login logic...
  await page.goto(CREATIVE_URL);
}

// Use in tests
test.beforeEach(async ({ page }) => {
  await loginToCreativeApp(page);
});
```

### Generate Test Data
```javascript
// Create helper for test data
function generateCreativeName() {
  return `Test Creative ${Date.now()}`;
}

// Use in tests
const name = generateCreativeName();
```

---

## 📞 Support

### Common Issues
1. **Login fails** - Check credentials in .env
2. **Element not found** - Use browser DevTools to inspect
3. **Test timeout** - Increase timeout or improve waits
4. **Flaky tests** - Use proper waits instead of timeouts

### Getting Help
- Check Playwright docs: https://playwright.dev
- Review existing tests for patterns
- Use debug mode to inspect behavior
- Check browser console for errors

---

**Happy Testing! 🚀**

