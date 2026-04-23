# IQM Creative App - Test Suite

Comprehensive Playwright test suite for the IQM Creative App with Page Object Model, custom assertions, and accessibility testing.

## 📁 Directory Structure

```
tests/iqm-site/
├── pages/                          # Page Object Models
│   └── CreativePage.js            # Creative app page object
├── fixtures/                       # Test fixtures
│   └── auth.fixture.js            # Authentication fixture
├── utils/                          # Utility functions
│   ├── assertions.js              # Custom assertions
│   └── testData.js                # Test data builders
├── creative-management.spec.js    # CRUD operation tests
├── creative-exploration.spec.js   # App exploration tests
├── creative-search-filter.spec.js # Search & filter tests (TODO)
├── creative-bulk-ops.spec.js      # Bulk operations tests (TODO)
├── creative-validation.spec.js    # Form validation tests (TODO)
├── creative-error-handling.spec.js # Error scenario tests (TODO)
├── accessibility.spec.js          # WCAG accessibility tests
├── login.spec.js                  # Login tests
├── dashboard.spec.js              # Dashboard tests
└── README.md                       # This file
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Credentials
```bash
cp .env.example .env
# Edit .env with your IQM credentials
```

### 3. Run Tests
```bash
# Run all tests
npm run test:iqm

# Run specific test file
npm run test:iqm -- tests/iqm-site/creative-management.spec.js

# Run in UI mode (interactive)
npm run test:iqm:ui

# Run in headed mode (see browser)
npm run test:iqm:headed

# Run in debug mode
npm run test:iqm:debug

# Run in CI mode (with retries)
npm run test:iqm:ci

# Run in parallel
npm run test:iqm:parallel
```

### 4. View Results
```bash
npm run report
```

## 📚 Test Files

### Core Tests

#### `creative-management.spec.js`
Tests for CRUD operations on creatives.

**Features:**
- Create creative with valid/invalid data
- Search by name
- Filter by type
- Bulk select operations
- Form validation

**Run:**
```bash
npm run test:iqm -- tests/iqm-site/creative-management.spec.js
```

#### `accessibility.spec.js`
WCAG 2.1 accessibility compliance tests using axe-core.

**Features:**
- No accessibility violations
- Keyboard navigation
- Proper ARIA labels
- Color contrast
- Heading structure
- Focus indicators

**Run:**
```bash
npm run test:iqm -- tests/iqm-site/accessibility.spec.js
```

#### `creative-exploration.spec.js`
Automated discovery of app features and UI elements.

**Features:**
- Page structure analysis
- Interactive element discovery
- Test recommendations

**Run:**
```bash
npm run test:iqm -- tests/iqm-site/creative-exploration.spec.js
```

### Additional Tests (Existing)

- `login.spec.js` - Login functionality
- `dashboard.spec.js` - Dashboard features
- `explore-dashboard.spec.js` - Dashboard exploration

## 🏗️ Architecture

### Page Object Model (POM)

The `CreativePage` class encapsulates all interactions with the Creative App page.

**Usage:**
```javascript
import { CreativePage } from './pages/CreativePage.js';

test('Example test', async ({ page }) => {
  const creativePage = new CreativePage(page);
  
  await creativePage.goto();
  await creativePage.clickAddNew();
  await creativePage.fillCreativeForm({ name: 'Test' });
  await creativePage.submitForm();
});
```

**Available Methods:**
- `goto()` - Navigate to creative app
- `clickAddNew()` - Click add new button
- `searchByName(name)` - Search for creative
- `filterByType(type)` - Filter by type
- `getCreativeCount()` - Get visible creative count
- `createCreative(data)` - Create new creative
- `editCreative(name, data)` - Edit creative
- `deleteCreative(name)` - Delete creative
- `selectAll()` - Select all creatives
- `isSuccessMessageVisible()` - Check success message
- `isErrorMessageVisible()` - Check error message

### Authentication Fixture

The `auth.fixture.js` provides an authenticated page context.

**Usage:**
```javascript
import { test, expect } from '../fixtures/auth.fixture.js';

test('Example test', async ({ authenticatedPage }) => {
  // authenticatedPage is already logged in
  await authenticatedPage.goto('https://apitesting.stage.iqm.com/creatives/u/0/');
});
```

### Custom Assertions

The `assertions.js` file provides reusable assertion helpers.

**Usage:**
```javascript
import {
  expectCreativeVisible,
  expectSuccessMessage,
  expectErrorMessage,
} from './utils/assertions.js';

test('Example test', async ({ page }) => {
  await expectCreativeVisible(page, 'Creative Name');
  await expectSuccessMessage(page);
  await expectErrorMessage(page, 'Error text');
});
```

**Available Assertions:**
- `expectCreativeVisible(page, name)` - Creative is visible
- `expectSuccessMessage(page, message)` - Success message shown
- `expectErrorMessage(page, message)` - Error message shown
- `expectFormVisible(page)` - Form is visible
- `expectButtonEnabled(page, name)` - Button is enabled
- `expectInputValue(page, label, value)` - Input has value
- `expectElementCount(page, selector, count)` - Element count matches
- `expectPageUrl(page, pattern)` - Page URL matches
- And many more...

### Test Data Builders

The `testData.js` file provides factory methods for creating test data.

**Usage:**
```javascript
import { CreativeDataBuilder } from './utils/testData.js';

test('Example test', async ({ page }) => {
  const creative = CreativeDataBuilder.createImageCreative({
    name: 'My Creative',
  });
  
  const creatives = CreativeDataBuilder.createBulkCreatives(5, 'image');
});
```

**Available Builders:**
- `CreativeDataBuilder` - Create creative data
- `SearchDataBuilder` - Create search queries
- `FilterDataBuilder` - Create filters
- `BulkOperationDataBuilder` - Create bulk operations
- `ValidationDataBuilder` - Get validation test cases
- `ErrorScenarioDataBuilder` - Get error scenarios

## 🔄 CI/CD Integration

GitHub Actions workflow automatically runs tests on push and pull requests.

**Workflow:** `.github/workflows/test.yml`

**Features:**
- Runs on multiple Node versions (18.x, 20.x)
- Uploads test reports as artifacts
- Publishes test results
- Runs accessibility tests separately
- Requires IQM credentials as secrets

**Setup:**
1. Add secrets to GitHub repository:
   - `IQM_USERNAME`
   - `IQM_PASSWORD`

2. Workflow runs automatically on:
   - Push to main/develop
   - Pull requests to main/develop

## 📊 Test Commands

### Development
```bash
npm run test:iqm              # Run all tests
npm run test:iqm:ui          # Interactive UI mode
npm run test:iqm:headed      # See browser
npm run test:iqm:debug       # Debug mode
npm run test:iqm:parallel    # Parallel execution
```

### CI/CD
```bash
npm run test:iqm:ci          # CI mode with retries
```

### Reporting
```bash
npm run report               # View HTML report
```

## ✅ Best Practices

### Writing Tests

1. **Use Page Object Model**
   ```javascript
   const creativePage = new CreativePage(page);
   await creativePage.createCreative(data);
   ```

2. **Use Custom Assertions**
   ```javascript
   await expectCreativeVisible(page, 'Creative Name');
   ```

3. **Use Test Data Builders**
   ```javascript
   const data = CreativeDataBuilder.createImageCreative();
   ```

4. **Follow AAA Pattern**
   ```javascript
   // Arrange
   const data = CreativeDataBuilder.createCreative();
   
   // Act
   await creativePage.createCreative(data);
   
   // Assert
   await expectSuccessMessage(page);
   ```

5. **Use Semantic Locators**
   ```javascript
   // Good
   page.getByRole('button', { name: /create/i })
   page.getByLabel(/name/i)
   
   // Avoid
   page.locator('.btn-primary')
   page.locator('#input-123')
   ```

6. **Use .or() for Resilience**
   ```javascript
   const button = page.locator('button.submit')
     .or(page.locator('button[type="submit"]'))
     .or(page.getByRole('button', { name: /submit/i }))
     .first();
   ```

### Test Organization

1. **Group related tests**
   ```javascript
   test.describe('Creative Management', () => {
     test('Create creative', async () => {});
     test('Edit creative', async () => {});
   });
   ```

2. **Use beforeEach/afterEach**
   ```javascript
   test.beforeEach(async ({ page }) => {
     // Setup
   });
   
   test.afterEach(async ({ page }) => {
     // Cleanup
   });
   ```

3. **Keep tests independent**
   - Each test should be runnable in isolation
   - Don't depend on other tests
   - Clean up after each test

4. **Use descriptive names**
   ```javascript
   // Good
   test('Create creative with valid data succeeds')
   
   // Avoid
   test('Test 1')
   ```

## 🐛 Debugging

### Run Single Test
```bash
npm run test:iqm -- -g "test name"
```

### Debug Mode
```bash
npm run test:iqm:debug
```

### Headed Mode
```bash
npm run test:iqm:headed
```

### UI Mode
```bash
npm run test:iqm:ui
```

### Add Breakpoint
```javascript
test('Example', async ({ page }) => {
  await page.pause(); // Pauses execution
});
```

### Take Screenshot
```javascript
await page.screenshot({ path: 'screenshot.png' });
```

### View Trace
Traces are automatically saved on failure in `test-results/`.

## 📈 Test Coverage

### Current Coverage
- **Test Files:** 7
- **Test Cases:** 50+
- **Coverage:** ~25%

### Target Coverage
- **Test Files:** 10+
- **Test Cases:** 150+
- **Coverage:** ~80-90%

### Planned Tests
- [ ] Search & Filter tests
- [ ] Bulk Operations tests
- [ ] Form Validation tests
- [ ] Error Handling tests
- [ ] Performance tests
- [ ] Integration tests

## 🔗 Resources

### Documentation
- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Locators Guide](https://playwright.dev/docs/locators)
- [Assertions Reference](https://playwright.dev/docs/test-assertions)

### Project Files
- `playwright.iqm.config.js` - Playwright configuration
- `package.json` - Dependencies and scripts
- `.env.example` - Environment variables template
- `.github/workflows/test.yml` - CI/CD workflow

## 🤝 Contributing

### Adding New Tests

1. Choose a category (search, filter, validation, etc.)
2. Create test file: `creative-{category}.spec.js`
3. Use Page Object Model for interactions
4. Use custom assertions for verification
5. Use test data builders for test data
6. Follow best practices above
7. Run tests locally: `npm run test:iqm`
8. Commit and push

### Updating Page Object Model

1. Edit `pages/CreativePage.js`
2. Add new locators or methods
3. Update tests to use new methods
4. Run tests to verify

### Adding Custom Assertions

1. Edit `utils/assertions.js`
2. Add new assertion function
3. Export from module
4. Use in tests

## 📞 Support

### Common Issues

**Tests timeout:**
```bash
npm run test:iqm -- --timeout=120000
```

**Element not found:**
- Use browser DevTools to inspect
- Check if element is visible
- Use .or() for fallback selectors

**Flaky tests:**
- Use proper waits instead of timeouts
- Use waitForLoadState('networkidle')
- Avoid hardcoded delays

**Authentication fails:**
- Check credentials in .env
- Verify login flow hasn't changed
- Check browser console for errors

### Getting Help

1. Check Playwright docs: https://playwright.dev
2. Review existing tests for patterns
3. Use debug mode: `npm run test:iqm:debug`
4. Check browser console for errors
5. Take screenshots: `page.screenshot()`

## 📝 Changelog

### Version 2.0.0
- Added Page Object Model (CreativePage)
- Added authentication fixture
- Added custom assertions
- Added test data builders
- Added accessibility tests
- Added GitHub Actions workflow
- Added CI/CD commands
- Improved test organization

### Version 1.0.0
- Initial test suite
- Basic login and dashboard tests
- Creative exploration tests

---

**Happy Testing! 🚀**
