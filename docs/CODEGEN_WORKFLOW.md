# 🎬 Codegen Workflow - Complete Integration

## Overview

This guide shows how to use Playwright's codegen to record scenarios and integrate them into your framework.

## Quick Workflow

```
1. Start Codegen
   npm run codegen:iqm
   
2. Record Scenario
   - Interact with app
   - Watch code generate
   
3. Copy Code
   - Select generated code
   - Copy to clipboard
   
4. Create Test File
   touch tests/specs/my-scenario.spec.js
   
5. Paste & Adapt
   - Paste generated code
   - Use helper utilities
   - Add assertions
   
6. Run Test
   npm run test:iqm
   
7. View Results
   npm run dashboard
```

## Step-by-Step Guide

### Step 1: Start Codegen

```bash
npm run codegen:iqm
```

This opens:
- Your application in a browser
- Codegen inspector panel on the right side

### Step 2: Record Your Scenario

**Example: Recording a login scenario**

1. In the browser, enter your email
2. Click "Next"
3. Enter your password
4. Click "Login"
5. Watch the code generate in the inspector

**Generated code:**
```javascript
await page.goto('https://apitesting.stage.iqm.com/');
await page.locator('input[type="email"]').fill('user@example.com');
await page.locator('button:has-text("Next")').click();
await page.locator('input[type="password"]').fill('password123');
await page.locator('button:has-text("Login")').click();
```

### Step 3: Copy Generated Code

1. Click "Copy" button in the inspector
2. Or select all code and copy manually

### Step 4: Create Test File

```bash
touch tests/specs/my-scenario.spec.js
```

### Step 5: Paste and Adapt

```javascript
import { test, expect } from '@playwright/test';
import { getIQMCredentials } from '../iqm-site/utils/testData.js';
import { loginHelper } from '../iqm-site/utils/codegenHelper.js';

test.describe('My Recorded Scenario', () => {
  test('User can login', async ({ page }) => {
    // Use helper instead of pasting raw code
    await loginHelper(page);
    
    // Verify
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### Step 6: Run Test

```bash
npm run test:iqm
```

### Step 7: View Results

```bash
npm run dashboard
```

Open http://localhost:3000 to see results with screenshots, videos, and logs.

## Using Helper Utilities

### Login Helper

Instead of pasting raw codegen code, use the helper:

```javascript
import { loginHelper } from '../iqm-site/utils/codegenHelper.js';

test('My test', async ({ page }) => {
  // Simple login
  await loginHelper(page);
  
  // With custom credentials
  await loginHelper(page, {
    username: 'custom@email.com',
    password: 'custom-password'
  });
});
```

### Find Element

```javascript
import { findElement } from '../iqm-site/utils/codegenHelper.js';

test('My test', async ({ page }) => {
  const button = await findElement(page, 'Submit', 'button');
  await button.click();
});
```

### Fill Field

```javascript
import { fillField } from '../iqm-site/utils/codegenHelper.js';

test('My test', async ({ page }) => {
  await fillField(page, 'Email', 'user@example.com');
  await fillField(page, 'Password', 'password123');
});
```

### Click Button

```javascript
import { clickButton } from '../iqm-site/utils/codegenHelper.js';

test('My test', async ({ page }) => {
  await clickButton(page, 'Submit');
  await clickButton(page, 'Login');
});
```

### Upload File

```javascript
import { uploadFile } from '../iqm-site/utils/codegenHelper.js';

test('My test', async ({ page }) => {
  await uploadFile(page, 'tests/iqm-site/testdata/creatives/images/Image1.png');
});
```

### Select Dropdown

```javascript
import { selectDropdown } from '../iqm-site/utils/codegenHelper.js';

test('My test', async ({ page }) => {
  await selectDropdown(page, 'Status', 'Active');
});
```

### Verify Text

```javascript
import { verifyText } from '../iqm-site/utils/codegenHelper.js';

test('My test', async ({ page }) => {
  await verifyText(page, 'Welcome');
  await verifyText(page, 'Success message');
});
```

## Complete Example

### Scenario: Create and Upload Creative

#### Step 1: Record with Codegen

```bash
npm run codegen:iqm
```

**Actions:**
1. Login
2. Click "Create Creative"
3. Fill title
4. Upload image
5. Click "Save"

#### Step 2: Generated Code

```javascript
await page.goto('https://apitesting.stage.iqm.com/');
await page.locator('input[type="email"]').fill('user@example.com');
await page.locator('button:has-text("Next")').click();
await page.locator('input[type="password"]').fill('password123');
await page.locator('button:has-text("Login")').click();
await page.locator('button:has-text("Create Creative")').click();
await page.locator('input[name="title"]').fill('My Creative');
await page.locator('input[type="file"]').setInputFiles('image.png');
await page.locator('button:has-text("Save")').click();
```

#### Step 3: Integrated Test

```javascript
import { test, expect } from '@playwright/test';
import { 
  loginHelper, 
  fillField, 
  clickButton, 
  uploadFile,
  verifyText 
} from '../iqm-site/utils/codegenHelper.js';

test.describe('Creative Management - Codegen', () => {
  test.beforeEach(async ({ page }) => {
    // Login using helper
    await loginHelper(page);
  });

  test('User can create and upload creative', async ({ page }) => {
    // Click Create button
    await clickButton(page, 'Create Creative');
    
    // Fill title
    await fillField(page, 'Title', 'My Creative');
    
    // Upload file
    await uploadFile(page, 'tests/iqm-site/testdata/creatives/images/Image1.png');
    
    // Save
    await clickButton(page, 'Save');
    
    // Verify
    await verifyText(page, 'My Creative');
    await expect(page.locator('text=My Creative')).toBeVisible();
  });
});
```

## Best Practices

### 1. Use Helpers Instead of Raw Code

❌ **Don't:**
```javascript
await page.locator('input[type="email"]').fill('user@example.com');
await page.locator('button:has-text("Next")').click();
await page.locator('input[type="password"]').fill('password123');
await page.locator('button:has-text("Login")').click();
```

✅ **Do:**
```javascript
await loginHelper(page);
```

### 2. Use Credentials from Config

❌ **Don't:**
```javascript
await fillField(page, 'Email', 'hardcoded@email.com');
```

✅ **Do:**
```javascript
const creds = getIQMCredentials();
await fillField(page, 'Email', creds.username);
```

### 3. Add Meaningful Assertions

❌ **Don't:**
```javascript
await clickButton(page, 'Save');
```

✅ **Do:**
```javascript
await clickButton(page, 'Save');
await verifyText(page, 'Saved successfully');
await expect(page).toHaveURL(/dashboard/);
```

### 4. Extract Common Patterns

❌ **Don't:**
```javascript
// Repeat login in every test
await page.locator('input[type="email"]').fill(creds.username);
await page.locator('button:has-text("Next")').click();
// ... more code
```

✅ **Do:**
```javascript
// Use beforeEach hook
test.beforeEach(async ({ page }) => {
  await loginHelper(page);
});
```

### 5. Use Page Objects for Complex Interactions

```javascript
import { CreativePage } from '../pages/CreativePage.js';

test('My test', async ({ page }) => {
  const creativePage = new CreativePage(page);
  
  await creativePage.createCreative('My Creative');
  await creativePage.uploadImage('image.png');
  await creativePage.save();
});
```

## Troubleshooting

### Codegen Won't Start

```bash
# Check if port is in use
lsof -i :3000

# Use different port
npx playwright codegen --port 3001 https://apitesting.stage.iqm.com/
```

### Generated Code Not Working

1. **Check locators are correct**
   - Codegen sometimes creates brittle locators
   - Use more flexible selectors

2. **Add waits for dynamic elements**
   ```javascript
   await page.waitForLoadState('networkidle');
   ```

3. **Verify credentials are correct**
   ```javascript
   const creds = getIQMCredentials();
   console.log('Using credentials:', creds.username);
   ```

4. **Check for timing issues**
   ```javascript
   await page.waitForSelector('button:has-text("Next")', { timeout: 10000 });
   ```

### Locators Too Specific

**Generated (brittle):**
```javascript
await page.locator('div > button:nth-child(3)').click();
```

**Better (flexible):**
```javascript
await page.locator('button:has-text("Submit")').click();
```

## Workflow Summary

```
┌─────────────────────────────────────────────────────────┐
│ 1. Start Codegen                                        │
│    npm run codegen:iqm                                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Record Scenario                                      │
│    - Interact with app                                  │
│    - Watch code generate                                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Copy Generated Code                                  │
│    - Click Copy button                                  │
│    - Or select and copy                                 │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Create Test File                                     │
│    touch tests/specs/my-scenario.spec.js                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Paste & Adapt Code                                   │
│    - Use helper utilities                               │
│    - Add assertions                                     │
│    - Use credentials from config                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 6. Run Test                                             │
│    npm run test:iqm                                     │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 7. View Results                                         │
│    npm run dashboard                                    │
│    http://localhost:3000                                │
└─────────────────────────────────────────────────────────┘
```

## Next Steps

1. **Start codegen**: `npm run codegen:iqm`
2. **Record a scenario**: Interact with your app
3. **Copy the code**: Use the inspector
4. **Create a test file**: In `tests/specs/`
5. **Adapt the code**: Use helpers and best practices
6. **Run the test**: `npm run test:iqm`
7. **View results**: `npm run dashboard`

## Resources

- [Playwright Codegen Docs](https://playwright.dev/docs/codegen)
- [Codegen Integration Guide](./CODEGEN_INTEGRATION_GUIDE.md)
- [Codegen Example Tests](./tests/specs/codegen-example.spec.js)
- [Codegen Helper Utilities](./tests/iqm-site/utils/codegenHelper.js)

---

**Happy Recording! 🎬**
