# Playwright Codegen Guide

Complete guide for recording and automating tests using Playwright Codegen.

## 🎬 What is Codegen?

Codegen is Playwright's built-in tool that **records your interactions** with a web page and **automatically generates test code**. You simply:

1. Click, type, and interact with the page
2. Codegen records every action
3. Test code is automatically generated
4. You can edit and refine the generated code

## 🚀 Quick Start

### Record Your First Test

```bash
# Start recording (opens browser)
npm run record

# Or with custom name
npm run record my-test

# Or with custom URL
npm run record my-test https://example.com
```

### What Happens

1. Browser opens with the URL
2. Interact with the page (click buttons, fill forms, etc.)
3. Press **Ctrl+C** to stop recording
4. Test code is saved to `tests/specs/{testName}.spec.js`

### Run Your Recorded Test

```bash
# Run the recorded test
npm run test:iqm -- my-test.spec.js

# Or run all tests
npm run test:iqm
```

## 📋 Available Commands

### Record a Test
```bash
npm run record [testName] [url]

Examples:
  npm run record                    # Default: recorded-test, IQM URL
  npm run record login-flow         # Custom name
  npm run record search-test https://example.com  # Custom URL
```

### List All Recorded Tests
```bash
npm run record list

Output:
  📋 Recorded Tests:
    1. login-flow.spec.js
    2. search-test.spec.js
    3. my-test.spec.js
```

### View a Recorded Test
```bash
npm run record view [testName]

Example:
  npm run record view login-flow
```

### Delete a Recorded Test
```bash
npm run record delete [testName]

Example:
  npm run record delete old-test
```

### Show Help
```bash
npm run record help
npm run record:help
```

## 🎯 Recording Workflow

### Step 1: Start Recording
```bash
npm run record create-creative
```

### Step 2: Interact with the Page
The browser opens. Now perform your test steps:
- Click buttons
- Fill forms
- Navigate pages
- Verify content

### Step 3: Stop Recording
Press **Ctrl+C** in the terminal

### Step 4: Review Generated Code
```bash
npm run record view create-creative
```

### Step 5: Edit and Refine
Open `tests/specs/create-creative.spec.js` and:
- Add assertions
- Remove unnecessary steps
- Improve readability
- Use Page Object Model

### Step 6: Run the Test
```bash
npm run test:iqm -- create-creative.spec.js
```

## 📝 Example: Recording a Creative Creation Test

### Record the Test
```bash
npm run record create-creative-test
```

### Browser Opens
1. Click "Add New" button
2. Fill in creative name: "Test Creative"
3. Select type: "Image"
4. Click "Create"
5. Press Ctrl+C

### Generated Code
```javascript
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://apitesting.stage.iqm.com/');
  await page.getByRole('button', { name: 'Add New' }).click();
  await page.getByLabel('Name').fill('Test Creative');
  await page.getByLabel('Type').selectOption('image');
  await page.getByRole('button', { name: 'Create' }).click();
});
```

### Refine the Code
```javascript
import { test, expect } from '@playwright/test';
import { CreativePage } from '../iqm-site/pages/CreativePage.js';
import { expectSuccessMessage } from '../iqm-site/utils/assertions.js';

test('Create new creative', async ({ page }) => {
  const creativePage = new CreativePage(page);
  
  // Navigate to creative app
  await creativePage.goto();
  
  // Create creative
  await creativePage.clickAddNew();
  await creativePage.fillCreativeForm({
    name: 'Test Creative',
    type: 'image'
  });
  await creativePage.submitForm();
  
  // Verify success
  await expectSuccessMessage(page);
});
```

## 🎨 Recording Tips

### 1. Keep Recordings Focused
- Record one user flow per test
- Don't record too many steps at once
- Break complex flows into multiple tests

### 2. Use Meaningful Names
```bash
# Good
npm run record login-flow
npm run record create-creative
npm run record search-and-filter

# Avoid
npm run record test1
npm run record test-test
```

### 3. Interact Naturally
- Click buttons as you normally would
- Fill forms with realistic data
- Navigate like a real user

### 4. Review Generated Code
- Check for unnecessary steps
- Verify selectors are correct
- Add meaningful assertions

### 5. Refactor for Maintainability
- Use Page Object Model
- Add custom assertions
- Extract test data
- Add comments

## 🔧 Editing Generated Tests

### Add Assertions
```javascript
// Before
await page.getByRole('button', { name: 'Create' }).click();

// After
await page.getByRole('button', { name: 'Create' }).click();
await expect(page.getByText(/success/i)).toBeVisible();
```

### Use Page Object Model
```javascript
// Before
await page.getByRole('button', { name: 'Add New' }).click();
await page.getByLabel('Name').fill('Test');

// After
const creativePage = new CreativePage(page);
await creativePage.clickAddNew();
await creativePage.fillCreativeForm({ name: 'Test' });
```

### Extract Test Data
```javascript
// Before
await page.getByLabel('Name').fill('Test Creative');
await page.getByLabel('Type').selectOption('image');

// After
const creative = CreativeDataBuilder.createImageCreative();
await creativePage.fillCreativeForm(creative);
```

### Add Comments
```javascript
test('Create new creative', async ({ page }) => {
  // Setup
  const creativePage = new CreativePage(page);
  await creativePage.goto();
  
  // Create creative
  const creative = CreativeDataBuilder.createImageCreative();
  await creativePage.createCreative(creative);
  
  // Verify
  await expectSuccessMessage(page);
});
```

## 📊 Generated Test Structure

### Default Structure
```javascript
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Generated code
});
```

### Recommended Structure
```javascript
import { test, expect } from '@playwright/test';
import { CreativePage } from '../iqm-site/pages/CreativePage.js';
import { CreativeDataBuilder } from '../iqm-site/utils/testData.js';
import { expectSuccessMessage } from '../iqm-site/utils/assertions.js';

test.describe('Creative Management', () => {
  let creativePage;

  test.beforeEach(async ({ page }) => {
    creativePage = new CreativePage(page);
    await creativePage.goto();
  });

  test('Create new creative', async ({ page }) => {
    // Arrange
    const creative = CreativeDataBuilder.createImageCreative();

    // Act
    await creativePage.createCreative(creative);

    // Assert
    await expectSuccessMessage(page);
  });
});
```

## 🎯 Common Recording Scenarios

### Scenario 1: Login Flow
```bash
npm run record login-flow https://apitesting.stage.iqm.com/
# 1. Enter email
# 2. Click next
# 3. Enter password
# 4. Click login
# Ctrl+C
```

### Scenario 2: Create Creative
```bash
npm run record create-creative
# 1. Click Add New
# 2. Fill form
# 3. Click Create
# Ctrl+C
```

### Scenario 3: Search and Filter
```bash
npm run record search-filter
# 1. Enter search term
# 2. Click filter
# 3. Verify results
# Ctrl+C
```

### Scenario 4: Bulk Operations
```bash
npm run record bulk-delete
# 1. Select multiple items
# 2. Click delete
# 3. Confirm deletion
# Ctrl+C
```

## 🔍 Debugging Recorded Tests

### Run in Debug Mode
```bash
npm run test:iqm:debug -- my-test.spec.js
```

### Run in UI Mode
```bash
npm run test:iqm:ui
```

### Run in Headed Mode
```bash
npm run test:iqm:headed -- my-test.spec.js
```

### View Test Report
```bash
npm run report
```

## 📚 Best Practices

### 1. Record Short Tests
- Keep tests focused on one feature
- Avoid long recording sessions
- Break complex flows into multiple tests

### 2. Use Semantic Locators
Codegen generates good locators, but you can improve them:
```javascript
// Generated (good)
await page.getByRole('button', { name: 'Create' }).click();

// Even better
await page.getByRole('button', { name: /create/i }).click();
```

### 3. Add Assertions
Generated tests often lack assertions:
```javascript
// Add after each action
await expect(page.getByText(/success/i)).toBeVisible();
```

### 4. Use Test Data Builders
Replace hardcoded values:
```javascript
const creative = CreativeDataBuilder.createImageCreative();
```

### 5. Refactor for Reusability
Use Page Object Model and custom assertions for maintainability.

## 🚀 Workflow Example

### Complete Workflow
```bash
# 1. Record test
npm run record create-creative

# 2. View generated code
npm run record view create-creative

# 3. Edit the test file
# tests/specs/create-creative.spec.js

# 4. Run the test
npm run test:iqm -- create-creative.spec.js

# 5. View results
npm run report

# 6. If needed, re-record
npm run record delete create-creative
npm run record create-creative
```

## 📞 Troubleshooting

### Browser Doesn't Open
```bash
# Make sure Playwright browsers are installed
npx playwright install

# Then try recording again
npm run record
```

### Test Fails After Recording
- Check if selectors are still valid
- Verify the page structure hasn't changed
- Re-record if needed

### Generated Code is Too Long
- Record shorter interactions
- Break into multiple tests
- Remove unnecessary steps

## 🔗 Related Files

- **Codegen Helper:** `tests/iqm-site/utils/codegenHelper.js`
- **Recording CLI:** `scripts/record-test.js`
- **Page Object Model:** `tests/iqm-site/pages/CreativePage.js`
- **Custom Assertions:** `tests/iqm-site/utils/assertions.js`
- **Test Data Builders:** `tests/iqm-site/utils/testData.js`

## 📖 Additional Resources

- [Playwright Codegen Docs](https://playwright.dev/docs/codegen)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)

---

**Last Updated:** April 23, 2026
**Framework Version:** 2.0.0
**Status:** ✅ Ready to Use
