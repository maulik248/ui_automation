# IQM Creative App - Testing Framework & Documentation

## 📚 Documentation Overview

This repository contains comprehensive testing documentation and test cases for the IQM Creative App. Below is a guide to all available resources.

---

## 📖 Documentation Files

### 1. **QUICK_START_TESTING.md** ⭐ START HERE
- Quick reference guide for running tests
- Common test patterns and examples
- Debugging tips and troubleshooting
- **Best for:** Getting started quickly, running tests, writing first test

### 2. **CREATIVE_APP_DISCOVERY_SUMMARY.md**
- Summary of creative app features discovered
- Inventory of creatives by type (56 total)
- UI elements and interactive components
- Quick reference statistics
- **Best for:** Understanding what the app does, quick facts

### 3. **CREATIVE_APP_TEST_CASES.md**
- Detailed test cases for creative app (120-150 tests)
- Organized by category and priority
- Includes test steps and expected results
- Implementation roadmap
- **Best for:** Planning test implementation, detailed reference

### 4. **TEST_CASES_ANALYSIS.md**
- Comprehensive analysis of all test categories
- Includes both dashboard and creative app tests
- Priority matrix and implementation roadmap
- Best practices and testing guidelines
- **Best for:** Strategic planning, understanding test scope

### 5. **PLAYWRIGHT-AI-GUIDE.md**
- Guide to Playwright's native AI features
- Self-healing locators with .or() chains
- Semantic locators and best practices
- GitHub Copilot integration tips
- **Best for:** Learning Playwright AI features, writing resilient tests

---

## 🎯 Quick Navigation

### I want to...

#### Run Tests
→ See **QUICK_START_TESTING.md** - "Available Test Commands" section

#### Understand the Creative App
→ See **CREATIVE_APP_DISCOVERY_SUMMARY.md** - "Key Features Discovered" section

#### Write a New Test
→ See **QUICK_START_TESTING.md** - "Writing Your First Test" section

#### See All Test Cases
→ See **CREATIVE_APP_TEST_CASES.md** - "Test Cases by Category" section

#### Learn Playwright AI Features
→ See **PLAYWRIGHT-AI-GUIDE.md** - "How to Use Playwright AI Agents" section

#### Debug a Failing Test
→ See **QUICK_START_TESTING.md** - "Debugging Tests" section

#### Understand Test Strategy
→ See **TEST_CASES_ANALYSIS.md** - "Test Case Priority Matrix" section

---

## 🚀 Getting Started (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Credentials
```bash
echo "IQM_USERNAME=your_email@example.com" > .env
echo "IQM_PASSWORD=your_password" >> .env
```

### Step 3: Run Exploration Test
```bash
npm run test:iqm -- tests/iqm-site/creative-exploration.spec.js
```

### Step 4: View Results
```bash
npm run report
```

---

## 📊 Test Coverage Summary

### Current Tests (18 total)
| File | Tests | Category |
|------|-------|----------|
| login.spec.js | 3 | Authentication |
| dashboard.spec.js | 13 | Dashboard |
| explore-dashboard.spec.js | 1 | Exploration |
| creative-exploration.spec.js | 1 | Exploration |

### Recommended Tests (120-150 total)
| Category | Count | Priority |
|----------|-------|----------|
| Button Interactions | 15 | 🔴 HIGH |
| Search & Filter | 20 | 🔴 HIGH |
| Creative Management | 20 | 🔴 HIGH |
| Form Validation | 15 | 🟡 MEDIUM |
| Bulk Operations | 15 | 🟡 MEDIUM |
| Creative Type Specific | 15 | 🟡 MEDIUM |
| Error Handling | 10 | 🟡 MEDIUM |
| Notifications | 10 | 🟢 LOW |
| UI/UX & Accessibility | 15 | 🟢 LOW |
| Performance | 10 | 🟢 LOW |

---

## 🎨 Creative App Features

### Creative Types (56 Total)
- **Image:** 19 creatives
- **HTML:** 7 creatives
- **Video:** 11 creatives
- **Audio:** 14 creatives
- **Native:** 5 creatives

### Main Features
- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ Search by ID, Name, or 3rd Party ID
- ✅ Filter by creative type
- ✅ View modes: All, Ungrouped, Grouped
- ✅ Bulk operations (select, delete, export)
- ✅ Creative preview
- ✅ Duplicate creative

### UI Elements
- 41 clickable elements
- 10 editable elements
- 6 sidebar panels
- 37 tabs/filters

---

## 🛠️ Test Commands

### Basic Commands
```bash
# Run all tests
npm run test:iqm

# Run specific test file
npm run test:iqm -- tests/iqm-site/creative-exploration.spec.js

# Run tests in UI mode (interactive)
npm run test:iqm:ui

# Run tests in headed mode (see browser)
npm run test:iqm:headed

# Run tests in debug mode
npm run test:iqm:debug

# View test report
npm run report
```

### Advanced Commands
```bash
# Run specific test by name
npm run test:iqm -- -g "Search by creative name"

# Run tests with specific config
npm run test:iqm -- --config=playwright.iqm.config.js

# Run tests with specific browser
npm run test:iqm -- --project=chromium

# Run tests with retries
npm run test:iqm -- --retries=2

# Run tests in CI mode (with retries)
npm run test:iqm:ci

# Run tests in parallel
npm run test:iqm:parallel
```

---

## 📝 Test File Structure

### Recommended Organization
```
tests/iqm-site/
├── pages/                           # Page Object Models
│   └── CreativePage.js             # Creative app page object
├── fixtures/                        # Test fixtures
│   └── auth.fixture.js             # Authentication fixture
├── utils/                           # Utility functions
│   ├── assertions.js               # Custom assertions
│   └── testData.js                 # Test data builders
├── login.spec.js                    # ✅ Login tests (3)
├── dashboard.spec.js                # ✅ Dashboard tests (13)
├── explore-dashboard.spec.js        # ✅ Dashboard exploration (1)
├── creative-exploration.spec.js     # ✅ Creative exploration (1)
├── creative-management.spec.js      # ✅ CRUD operations (20+)
├── creative-search-filter.spec.js   # ⏳ Search & filter
├── creative-bulk-ops.spec.js        # ⏳ Bulk operations
├── creative-validation.spec.js      # ⏳ Form validation
├── creative-error-handling.spec.js  # ⏳ Error scenarios
├── accessibility.spec.js            # ✅ WCAG accessibility tests
└── README.md                        # Test suite documentation
```

### Architecture Improvements

#### 1. Page Object Model (POM)
- **File:** `pages/CreativePage.js`
- **Purpose:** Encapsulates all interactions with Creative App
- **Benefits:** Maintainable, reusable, reduces duplication

#### 2. Authentication Fixture
- **File:** `fixtures/auth.fixture.js`
- **Purpose:** Provides authenticated page context
- **Benefits:** Shared login logic, cleaner tests

#### 3. Custom Assertions
- **File:** `utils/assertions.js`
- **Purpose:** Reusable assertion helpers
- **Benefits:** Consistent assertions, better readability

#### 4. Test Data Builders
- **File:** `utils/testData.js`
- **Purpose:** Factory methods for test data
- **Benefits:** Consistent test data, easy to maintain

#### 5. Accessibility Tests
- **File:** `accessibility.spec.js`
- **Purpose:** WCAG 2.1 compliance testing
- **Benefits:** Ensures app is accessible to all users

#### 6. CI/CD Integration
- **File:** `.github/workflows/test.yml`
- **Purpose:** Automated testing on push/PR
- **Benefits:** Catch issues early, consistent quality

---

## 🎯 Implementation Roadmap

### Phase 1: Core Functionality (Week 1-2)
- [ ] Button Interaction tests
- [ ] Search & Filter tests
- [ ] Creative Management tests (CRUD)
- [ ] Form Validation tests
- **Target:** 40-50 tests

### Phase 2: Advanced Features (Week 3-4)
- [ ] Bulk Operations tests
- [ ] Creative Type Specific tests
- [ ] Error Handling tests
- [ ] Notifications tests
- **Target:** 50-60 tests

### Phase 3: Quality & Performance (Week 5-6)
- [ ] UI/UX & Accessibility tests
- [ ] Performance tests
- [ ] Edge case tests
- [ ] Integration tests
- **Target:** 30-40 tests

---

## 💡 Best Practices

### Using Page Object Model
```javascript
import { CreativePage } from './pages/CreativePage.js';

test('Create creative', async ({ page }) => {
  const creativePage = new CreativePage(page);
  
  await creativePage.goto();
  await creativePage.clickAddNew();
  await creativePage.fillCreativeForm({ name: 'Test' });
  await creativePage.submitForm();
});
```

### Using Custom Assertions
```javascript
import {
  expectCreativeVisible,
  expectSuccessMessage,
  expectErrorMessage,
} from './utils/assertions.js';

test('Create creative', async ({ page }) => {
  // ... test code ...
  await expectSuccessMessage(page);
  await expectCreativeVisible(page, 'Creative Name');
});
```

### Using Test Data Builders
```javascript
import { CreativeDataBuilder } from './utils/testData.js';

test('Create creative', async ({ page }) => {
  const creative = CreativeDataBuilder.createImageCreative({
    name: 'My Creative',
  });
  
  // ... use creative data ...
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

### Test Organization
```javascript
test.describe('Creative Management', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Login and navigate
  });

  test('Create new creative', async ({ page }) => {
    // Test implementation
  });

  test.afterEach(async ({ page }) => {
    // Cleanup
  });
});
```

### Assertions
```javascript
// Visibility
await expect(element).toBeVisible();

// State
await expect(button).toBeEnabled();

// Text
await expect(heading).toContainText('Creatives');

// URL
await expect(page).toHaveURL(/creatives/);
```

---

## 🔍 Key Discoveries

### App Structure
- **URL:** https://apitesting.stage.iqm.com/creatives/u/0/
- **Routing:** Hash-based (#/all, #/ungrouped, #/grouped)
- **UI Pattern:** Card-based layout (no tables)
- **Interactions:** 41 clickable elements

### Creative Inventory
- **Total:** 56 creatives
- **By Type:** Image (19), HTML (7), Video (11), Audio (14), Native (5)
- **Organization:** Grouped and ungrouped

### Main Operations
- Create new creative
- Edit existing creative
- Delete creative
- Duplicate creative
- Preview creative
- Search and filter
- Bulk select and operations

---

## 📈 Coverage Goals

### Current
- **Test Files:** 4
- **Test Cases:** 18
- **Coverage:** ~15%

### Target
- **Test Files:** 8-10
- **Test Cases:** 120-150
- **Coverage:** ~80-90%

---

## 🚨 Troubleshooting

### Common Issues

#### Test Timeout
```bash
# Increase timeout in config or specific test
timeout: 60 * 1000  // 60 seconds
```

#### Element Not Found
```javascript
// Use .or() for fallback selectors
const element = page.locator('selector1')
  .or(page.locator('selector2'))
  .first();
```

#### Flaky Tests
```javascript
// Use proper waits
await page.waitForLoadState('networkidle');
await expect(element).toBeVisible();
```

#### Authentication Issues
- Verify credentials in .env file
- Check if login flow has changed
- Review login test for reference

---

## 📚 Additional Resources

### Playwright Documentation
- [Official Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Locators Guide](https://playwright.dev/docs/locators)
- [Assertions Reference](https://playwright.dev/docs/test-assertions)

### Project Resources
- `playwright.iqm.config.js` - Playwright configuration
- `utils/credentials.js` - Credential management
- `package.json` - Dependencies and scripts

---

## 🎓 Learning Path

### For Beginners
1. Read **QUICK_START_TESTING.md**
2. Run existing tests: `npm run test:iqm`
3. Review **PLAYWRIGHT-AI-GUIDE.md**
4. Write first test using template

### For Intermediate
1. Review **CREATIVE_APP_TEST_CASES.md**
2. Implement HIGH PRIORITY tests
3. Learn debugging techniques
4. Optimize test performance

### For Advanced
1. Study **TEST_CASES_ANALYSIS.md**
2. Implement all test categories
3. Set up CI/CD integration
4. Create custom test utilities

---

## ✅ Checklist for New Tests

- [ ] Test has descriptive name
- [ ] Test has clear setup (beforeEach)
- [ ] Test has clear teardown (afterEach)
- [ ] Test uses semantic locators
- [ ] Test uses .or() for resilience
- [ ] Test has proper assertions
- [ ] Test handles async operations
- [ ] Test is independent
- [ ] Test is repeatable
- [ ] Test is fast (< 30 seconds)

---

## 🤝 Contributing

### Adding New Tests
1. Choose a category from CREATIVE_APP_TEST_CASES.md
2. Create test file following naming convention
3. Use template from QUICK_START_TESTING.md
4. Follow best practices from PLAYWRIGHT-AI-GUIDE.md
5. Run tests and verify they pass
6. Update documentation

### Reporting Issues
- Document the issue clearly
- Include test name and error message
- Provide steps to reproduce
- Attach screenshots if applicable

---

## 📞 Support & Questions

### Getting Help
1. Check **QUICK_START_TESTING.md** - Troubleshooting section
2. Review existing tests for patterns
3. Use debug mode: `npm run test:iqm:debug`
4. Check Playwright documentation
5. Review browser console for errors

### Common Questions
- **How do I run a specific test?** → See QUICK_START_TESTING.md
- **How do I write a new test?** → See QUICK_START_TESTING.md
- **How do I debug a failing test?** → See QUICK_START_TESTING.md
- **What are the test cases?** → See CREATIVE_APP_TEST_CASES.md
- **How do I use Playwright AI?** → See PLAYWRIGHT-AI-GUIDE.md

---

## 📊 Project Statistics

### Documentation
- **Files:** 6 markdown files
- **Total Pages:** ~50+ pages
- **Test Cases:** 120-150 recommended
- **Coverage:** ~80-90% target

### Code
- **Test Files:** 4 (18 tests)
- **Utility Files:** 1 (credentials)
- **Config Files:** 1 (Playwright)
- **Package Files:** 2 (package.json, package-lock.json)

---

## 🎉 Summary

This testing framework provides:
- ✅ Comprehensive test case documentation
- ✅ Automated discovery of app features
- ✅ Playwright AI integration
- ✅ Best practices and patterns
- ✅ Quick start guide
- ✅ Detailed implementation roadmap
- ✅ Troubleshooting guide

**Ready to build comprehensive test coverage for the IQM Creative App!**

---

## 📅 Last Updated
- **Date:** April 2, 2026
- **Version:** 1.0
- **Status:** Complete & Ready for Implementation

---

**Start with QUICK_START_TESTING.md and happy testing! 🚀**

