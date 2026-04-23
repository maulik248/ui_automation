# Quick Reference - Framework v2.0.0

## 🚀 Getting Started (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Set up credentials
cp .env.example .env
# Edit .env with your credentials

# 3. Run tests
npm run test:iqm

# 4. View results
npm run report
```

## 📋 Test Commands

```bash
# Run all tests
npm run test:iqm

# Run specific test file
npm run test:iqm -- tests/iqm-site/creative-management.spec.js

# Run specific test by name
npm run test:iqm -- -g "Create new creative"

# Interactive UI mode
npm run test:iqm:ui

# See browser (headed mode)
npm run test:iqm:headed

# Debug mode
npm run test:iqm:debug

# CI mode (with retries)
npm run test:iqm:ci

# Parallel execution
npm run test:iqm:parallel

# View HTML report
npm run report
```

## 🏗️ Architecture

### Page Object Model
```javascript
import { CreativePage } from './pages/CreativePage.js';

const creativePage = new CreativePage(page);
await creativePage.goto();
await creativePage.createCreative({ name: 'Test' });
```

### Custom Assertions
```javascript
import { expectCreativeVisible, expectSuccessMessage } from './utils/assertions.js';

await expectCreativeVisible(page, 'Creative Name');
await expectSuccessMessage(page);
```

### Test Data Builders
```javascript
import { CreativeDataBuilder } from './utils/testData.js';

const creative = CreativeDataBuilder.createImageCreative();
const creatives = CreativeDataBuilder.createBulkCreatives(5);
```

### Authentication Fixture
```javascript
import { test } from '../fixtures/auth.fixture.js';

test('Example', async ({ authenticatedPage }) => {
  // Already logged in
});
```

## 📁 File Structure

```
tests/iqm-site/
├── pages/
│   └── CreativePage.js              # Page Object Model
├── fixtures/
│   └── auth.fixture.js              # Auth fixture
├── utils/
│   ├── assertions.js                # Custom assertions
│   └── testData.js                  # Test data builders
├── creative-management.spec.js      # Example tests
├── accessibility.spec.js            # A11y tests
├── login.spec.js                    # Login tests
├── dashboard.spec.js                # Dashboard tests
└── README.md                        # Full documentation
```

## 🎯 Writing Tests

### Basic Test Template
```javascript
import { test, expect } from '@playwright/test';
import { CreativePage } from './pages/CreativePage.js';
import { CreativeDataBuilder } from './utils/testData.js';
import { expectSuccessMessage } from './utils/assertions.js';

test.describe('Creative Management', () => {
  let creativePage;

  test.beforeEach(async ({ page }) => {
    creativePage = new CreativePage(page);
    await creativePage.goto();
  });

  test('Create new creative', async ({ page }) => {
    // Arrange
    const data = CreativeDataBuilder.createImageCreative();

    // Act
    await creativePage.createCreative(data);

    // Assert
    await expectSuccessMessage(page);
  });
});
```

## 🔍 Common Operations

### Create Creative
```javascript
const creative = CreativeDataBuilder.createImageCreative({
  name: 'My Creative',
  description: 'Test description'
});
await creativePage.createCreative(creative);
```

### Search Creative
```javascript
await creativePage.searchByName('Creative Name');
const count = await creativePage.getCreativeCount();
```

### Filter by Type
```javascript
await creativePage.filterByType('Image');
await creativePage.filterByType('Video');
```

### Bulk Operations
```javascript
await creativePage.selectAll();
const selectedCount = await creativePage.getSelectedCount();
await creativePage.bulkDelete();
```

### Check Messages
```javascript
const isSuccess = await creativePage.isSuccessMessageVisible();
const isError = await creativePage.isErrorMessageVisible();
const errorMsg = await creativePage.getErrorMessage();
```

## 🧪 Assertion Examples

```javascript
// Creative visibility
await expectCreativeVisible(page, 'Creative Name');
await expectCreativeNotVisible(page, 'Creative Name');

// Messages
await expectSuccessMessage(page);
await expectErrorMessage(page, 'Error text');

// Forms
await expectFormVisible(page);
await expectFormNotVisible(page);

// Buttons
await expectButtonEnabled(page, 'Create');
await expectButtonDisabled(page, 'Delete');

// Input fields
await expectInputValue(page, 'Name', 'Test');
await expectInputEmpty(page, 'Email');

// Elements
await expectElementCount(page, 'button', 5);
await expectElementCountGreaterThan(page, '[class*="creative"]', 0);

// Page
await expectPageUrl(page, 'creatives');
await expectPageTitle(page, 'Creative');

// Modals
await expectModalVisible(page, 'Create Creative');
await expectModalNotVisible(page);

// Checkboxes
await expectCheckboxChecked(page, 'Select All');
await expectCheckboxNotChecked(page, 'Select All');
```

## 📊 Test Data Examples

```javascript
// Single creative
const creative = CreativeDataBuilder.createImageCreative();
const creative = CreativeDataBuilder.createVideoCreative();
const creative = CreativeDataBuilder.createAudioCreative();

// Bulk creatives
const creatives = CreativeDataBuilder.createBulkCreatives(5, 'image');

// With overrides
const creative = CreativeDataBuilder.createImageCreative({
  name: 'Custom Name',
  description: 'Custom description'
});

// Special cases
const creative = CreativeDataBuilder.createCreativeWithSpecialChars();
const creative = CreativeDataBuilder.createCreativeWithUnicode();
const creative = CreativeDataBuilder.createCreativeWithLongName();

// Search queries
const search = SearchDataBuilder.searchByName('Test');
const search = SearchDataBuilder.searchByType('image');
const search = SearchDataBuilder.createAdvancedSearch();

// Validation cases
const cases = ValidationDataBuilder.getValidationTestCases();
const fieldCases = ValidationDataBuilder.getFieldValidationCases();

// Error scenarios
const scenarios = ErrorScenarioDataBuilder.getErrorScenarios();
const conflicts = ErrorScenarioDataBuilder.getConflictScenarios();
```

## 🐛 Debugging

```bash
# Debug mode (step through tests)
npm run test:iqm:debug

# Headed mode (see browser)
npm run test:iqm:headed

# UI mode (interactive)
npm run test:iqm:ui

# Specific test
npm run test:iqm -- -g "test name"

# With timeout
npm run test:iqm -- --timeout=120000
```

### Debug in Code
```javascript
// Pause execution
await page.pause();

// Take screenshot
await page.screenshot({ path: 'debug.png' });

// Log to console
console.log('Current URL:', page.url());
console.log('Page title:', await page.title());

// Inspect element
const element = page.locator('button');
console.log(await element.textContent());
```

## 🔧 Configuration

### Environment Variables
```bash
# Required
IQM_USERNAME=your_email@example.com
IQM_PASSWORD=your_password

# Optional
HEADED=true          # Run in headed mode
CI=true              # Run in CI mode
DEBUG=true           # Run in debug mode
```

### Playwright Config
- **File:** `playwright.iqm.config.js`
- **Timeout:** 60 seconds
- **Retries:** 2 in CI, 0 locally
- **Workers:** 4 locally, 1 in CI
- **Browsers:** Chromium
- **Viewport:** 1280x720

## 📈 CI/CD

### GitHub Actions
- **File:** `.github/workflows/test.yml`
- **Triggers:** Push to main/develop, Pull requests
- **Runs:** Node 18.x and 20.x
- **Reports:** HTML, JSON, Test results

### Setup
1. Add secrets to GitHub:
   - `IQM_USERNAME`
   - `IQM_PASSWORD`
2. Workflow runs automatically

## 📚 Documentation

- **Full Guide:** `tests/iqm-site/README.md`
- **Quick Start:** `QUICK_START_TESTING.md`
- **Implementation:** `IMPLEMENTATION_SUMMARY.md`
- **Main README:** `README_TESTING.md`

## 🎓 Best Practices

1. **Use Page Object Model** - Reduces duplication
2. **Use Custom Assertions** - Consistent patterns
3. **Use Test Data Builders** - Easy to maintain
4. **Follow AAA Pattern** - Arrange, Act, Assert
5. **Use Semantic Locators** - More resilient
6. **Use .or() Chains** - Fallback selectors
7. **Keep Tests Independent** - No dependencies
8. **Use Descriptive Names** - Clear intent

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase timeout: `--timeout=120000` |
| Element not found | Use .or() for fallbacks, check DevTools |
| Flaky tests | Use proper waits, avoid hardcoded delays |
| Auth fails | Check .env credentials, verify login flow |
| CI fails | Check secrets, verify environment |

## 📞 Quick Help

```bash
# Install dependencies
npm install

# Run tests
npm run test:iqm

# View report
npm run report

# Debug test
npm run test:iqm:debug

# Run specific test
npm run test:iqm -- -g "test name"

# Run in UI mode
npm run test:iqm:ui

# Run in CI mode
npm run test:iqm:ci
```

## 🔗 Resources

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Framework Version:** 2.0.0
**Last Updated:** April 23, 2026
**Status:** ✅ Production Ready
