# ✅ Codegen Integration - Setup Complete

## What Was Created

### Documentation Files

1. **CODEGEN_INTEGRATION_GUIDE.md** (12 KB)
   - Complete guide to using Playwright codegen
   - Step-by-step integration instructions
   - Best practices and patterns
   - Troubleshooting guide

2. **CODEGEN_WORKFLOW.md** (8 KB)
   - Complete workflow from recording to testing
   - Helper utilities usage
   - Complete examples
   - Best practices

### Code Files

1. **tests/specs/codegen-example.spec.js** (8 KB)
   - 8 complete example tests
   - Demonstrates all codegen patterns
   - Shows how to adapt generated code
   - Includes best practices

2. **tests/iqm-site/utils/codegenHelper.js** (7 KB)
   - 14 helper functions
   - Simplifies working with codegen code
   - Flexible locator strategies
   - Error handling and retries

## Quick Start

### 1. Start Codegen
```bash
npm run codegen:iqm
```

### 2. Record Your Scenario
- Interact with the application
- Watch code generate in the inspector
- Copy the generated code

### 3. Create Test File
```bash
touch tests/specs/my-scenario.spec.js
```

### 4. Paste & Adapt
- Paste generated code
- Use helper utilities
- Add assertions

### 5. Run Test
```bash
npm run test:iqm
```

### 6. View Results
```bash
npm run dashboard
# Open http://localhost:3000
```

## Helper Utilities

### Available Functions

- **loginHelper(page, options)** - Complete login flow
- **findElement(page, text, type)** - Find elements with fallbacks
- **fillField(page, label, value)** - Fill form fields
- **clickButton(page, text)** - Click buttons
- **waitForNavigation(page, urlPattern)** - Wait for page navigation
- **uploadFile(page, filePath)** - Upload files
- **selectDropdown(page, label, option)** - Select dropdown options
- **verifyText(page, text)** - Verify text on page
- **waitForElement(page, selector)** - Wait for element visibility
- **getElementText(page, selector)** - Get element text content
- **takeScreenshot(page, name)** - Take screenshots
- **retryAction(action, options)** - Retry actions
- **handleAlert(page, action)** - Handle browser alerts
- **waitForAPIResponse(page, urlPattern, action)** - Wait for API responses

## Example Usage

### Simple Login
```javascript
import { loginHelper } from '../iqm-site/utils/codegenHelper.js';

test('My test', async ({ page }) => {
  await loginHelper(page);
});
```

### Fill Form
```javascript
import { fillField, clickButton } from '../iqm-site/utils/codegenHelper.js';

test('My test', async ({ page }) => {
  await fillField(page, 'Email', 'user@example.com');
  await fillField(page, 'Password', 'password123');
  await clickButton(page, 'Login');
});
```

### Upload File
```javascript
import { uploadFile } from '../iqm-site/utils/codegenHelper.js';

test('My test', async ({ page }) => {
  await uploadFile(page, 'tests/testdata/image.png');
});
```

### Complete Workflow
```javascript
import { 
  loginHelper, 
  fillField, 
  clickButton, 
  uploadFile,
  verifyText 
} from '../iqm-site/utils/codegenHelper.js';

test('Create creative', async ({ page }) => {
  await loginHelper(page);
  await clickButton(page, 'Create Creative');
  await fillField(page, 'Title', 'My Creative');
  await uploadFile(page, 'tests/testdata/image.png');
  await clickButton(page, 'Save');
  await verifyText(page, 'My Creative');
});
```

## Workflow

```
1. Start Codegen
   npm run codegen:iqm
   
2. Record Scenario
   - Interact with application
   - Watch code generate
   - Copy generated code
   
3. Create Test File
   touch tests/specs/my-scenario.spec.js
   
4. Paste & Adapt
   - Paste generated code
   - Use helper utilities
   - Add assertions
   - Use credentials from config
   
5. Run Test
   npm run test:iqm
   
6. View Results
   npm run dashboard
   Open http://localhost:3000
```

## Best Practices

### 1. Use Helper Utilities
✅ **Do:**
```javascript
await loginHelper(page);
```

❌ **Don't:**
```javascript
await page.locator('input[type="email"]').fill(...);
await page.locator('button:has-text("Next")').click();
```

### 2. Use Credentials from Config
✅ **Do:**
```javascript
const creds = getIQMCredentials();
await fillField(page, 'Email', creds.username);
```

❌ **Don't:**
```javascript
await fillField(page, 'Email', 'hardcoded@email.com');
```

### 3. Add Meaningful Assertions
✅ **Do:**
```javascript
await clickButton(page, 'Save');
await verifyText(page, 'Success');
await expect(page).toHaveURL(/dashboard/);
```

❌ **Don't:**
```javascript
await clickButton(page, 'Save');
```

### 4. Extract Common Patterns
✅ **Do:**
```javascript
test.beforeEach(async ({ page }) => {
  await loginHelper(page);
});
```

❌ **Don't:**
```javascript
// Repeat login in every test
```

### 5. Use Flexible Locators
✅ **Do:**
```javascript
await page.locator('button:has-text("Submit")');
```

❌ **Don't:**
```javascript
await page.locator('div > button:nth-child(3)');
```

## Example Tests

See `tests/specs/codegen-example.spec.js` for 8 complete examples:

1. Navigate and verify page loads
2. Fill form and submit
3. Multi-step workflow with verification
4. File upload workflow
5. Search and filter
6. Modal/dialog interaction
7. Dropdown selection
8. Keyboard interactions

Each example shows:
- How to adapt generated code
- Best practices
- Flexible locators
- Error handling
- Assertions

## Commands

```bash
# Start Codegen
npm run codegen:iqm

# Run Tests
npm run test:iqm

# View Dashboard
npm run dashboard

# Run Specific Test
npm run test:iqm -- tests/specs/codegen-example.spec.js

# Run with Headed Mode
HEADED=true npm run test:iqm

# Run in Debug Mode
npm run test:iqm:debug
```

## Documentation

Read these files:

1. **CODEGEN_INTEGRATION_GUIDE.md**
   - Complete guide to codegen
   - Step-by-step instructions
   - Best practices
   - Troubleshooting

2. **CODEGEN_WORKFLOW.md**
   - Complete workflow
   - Helper utilities usage
   - Complete examples
   - Best practices

3. **tests/specs/codegen-example.spec.js**
   - 8 complete example tests
   - Shows all patterns
   - Best practices

4. **tests/iqm-site/utils/codegenHelper.js**
   - 14 helper functions
   - Flexible locators
   - Error handling

## Troubleshooting

### Codegen Won't Start
```bash
# Check if port is in use
lsof -i :3000

# Use different port
npx playwright codegen --port 3001 https://apitesting.stage.iqm.com/
```

### Generated Code Not Working
1. Check locators are correct
2. Add waits for dynamic elements
3. Verify credentials are correct
4. Check for timing issues

### Locators Too Specific
Use more flexible selectors:
```javascript
✅ button:has-text("Submit")
❌ div > button:nth-child(3)
```

## Next Steps

1. **Start Codegen**: `npm run codegen:iqm`
2. **Record a Scenario**: Interact with your app
3. **Copy Generated Code**: Use the inspector
4. **Create Test File**: `touch tests/specs/my-scenario.spec.js`
5. **Adapt Code**: Use helper utilities, add assertions
6. **Run Test**: `npm run test:iqm`
7. **View Results**: `npm run dashboard`

## Summary

✅ Codegen integration complete
✅ Helper utilities created
✅ Example tests provided
✅ Documentation complete
✅ Workflow documented
✅ Best practices included

You can now:
- Record scenarios with codegen
- Integrate generated code into your framework
- Use helper utilities for cleaner code
- Run tests and view results in dashboard
- Follow best practices for maintainable tests

**Start with:** `npm run codegen:iqm`

---

**Happy Recording! 🎬**
