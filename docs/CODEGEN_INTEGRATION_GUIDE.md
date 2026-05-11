# 🎬 Playwright Codegen Integration Guide

## Overview

Playwright's `codegen` tool records user interactions and generates test code automatically. This guide shows how to capture scenarios and integrate them into your framework.

## What is Codegen?

Codegen is a Playwright tool that:
- Records browser interactions (clicks, typing, navigation)
- Generates test code automatically
- Creates locators and assertions
- Supports multiple languages (JavaScript, Python, Java, C#)

## Quick Start

### 1. Start Codegen for Your Application

```bash
# For IQM application
npm run codegen:iqm

# Or manually
npx playwright codegen https://apitesting.stage.iqm.com/
```

This opens:
- Your application in a browser
- Codegen inspector panel on the right

### 2. Record Your Scenario

1. **Interact with the application**
   - Click buttons
   - Fill forms
   - Navigate pages
   - Perform actions

2. **Watch the code generate**
   - Code appears in the inspector panel
   - Locators are created automatically
   - Assertions are suggested

3. **Copy the generated code**
   - Click "Copy" button in inspector
   - Or select and copy manually

### 3. Integrate into Your Framework

Paste the generated code into your test file and adapt it.

## Step-by-Step Integration

### Step 1: Generate Code with Codegen

```bash
npm run codegen:iqm
```

**Example: Recording a login scenario**

1. Open the app
2. Enter email
3. Click Next
4. Enter password
5. Click Login
6. Verify dashboard appears

**Generated code:**
```javascript
await page.goto('https://apitesting.stage.iqm.com/');
await page.locator('input[type="email"]').fill('user@example.com');
await page.locator('button:has-text("Next")').click();
await page.locator('input[type="password"]').fill('password123');
await page.locator('button:has-text("Login")').click();
await expect(page).toHaveURL(/dashboard/);
```

### Step 2: Create Test File

Create a new test file in `tests/specs/`:

```bash
touch tests/specs/my-scenario.spec.js
```

### Step 3: Adapt Generated Code

```javascript
import { test, expect } from '@playwright/test';
import { getIQMCredentials } from '../utils/credentials.js';

test.describe('My Recorded Scenario', () => {
  test('User can complete login flow', async ({ page }) => {
    const creds = getIQMCredentials();

    // Generated code (adapted)
    await page.goto('https://apitesting.stage.iqm.com/');
    
    // Use credentials from config
    await page.locator('input[type="email"]').fill(creds.username);
    await page.locator('button:has-text("Next")').click();
    
    await page.locator('input[type="password"]').fill(creds.password);
    await page.locator('button:has-text("Login")').click();
    
    // Verify result
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### Step 4: Enhance with Framework Features

Add your framework's utilities:

```javascript
import { test, expect } from '@playwright/test';
import { getIQMCredentials } from '../utils/credentials.js';
import { CreativePage } from '../pages/CreativePage.js';

test.describe('Creative Management - Recorded Scenario', () => {
  let creativePage;

  test.beforeEach(async ({ page }) => {
    creativePage = new CreativePage(page);
    // Login first
    const creds = getIQMCredentials();
    await page.goto('https://apitesting.stage.iqm.com/');
    await page.locator('input[type="email"]').fill(creds.username);
    await page.locator('button:has-text("Next")').click();
    await page.locator('input[type="password"]').fill(creds.password);
    await page.locator('button:has-text("Login")').click();
    await page.waitForLoadState('networkidle');
  });

  test('User can create and upload creative', async ({ page }) => {
    // Generated code for creative creation
    await page.locator('button:has-text("Create Creative")').click();
    await page.locator('input[name="title"]').fill('My Creative');
    await page.locator('input[type="file"]').setInputFiles('tests/iqm-site/testdata/creatives/images/Image1.png');
    await page.locator('button:has-text("Upload")').click();
    
    // Verify
    await expect(page.locator('text=My Creative')).toBeVisible();
  });
});
```

## Best Practices

### 1. Use Locator Strategies

**Generated (specific):**
```javascript
await page.locator('button[data-testid="login-btn"]').click();
```

**Better (flexible):**
```javascript
await page.locator('button:has-text("Login")').click();
```

**Best (with fallbacks):**
```javascript
await page.locator('button[data-testid="login-btn"]')
  .or(page.locator('button:has-text("Login")'))
  .or(page.getByRole('button', { name: /login/i }))
  .click();
```

### 2. Extract Credentials

**Generated:**
```javascript
await page.locator('input[type="email"]').fill('user@example.com');
```

**Better:**
```javascript
const creds = getIQMCredentials();
await page.locator('input[type="email"]').fill(creds.username);
```

### 3. Add Waits

**Generated:**
```javascript
await page.locator('button').click();
```

**Better:**
```javascript
await page.locator('button').click();
await page.waitForLoadState('networkidle');
```

### 4. Use Page Objects

**Generated:**
```javascript
await page.locator('input[name="title"]').fill('My Creative');
await page.locator('input[type="file"]').setInputFiles('path/to/file');
await page.locator('button:has-text("Upload")').click();
```

**Better (with Page Object):**
```javascript
await creativePage.fillTitle('My Creative');
await creativePage.uploadFile('path/to/file');
await creativePage.clickUpload();
```

## Workflow

### Complete Integration Workflow

```
1. Start Codegen
   npm run codegen:iqm
   
2. Record Scenario
   - Interact with app
   - Watch code generate
   
3. Copy Generated Code
   - Select all code
   - Copy to clipboard
   
4. Create Test File
   touch tests/specs/new-scenario.spec.js
   
5. Paste Code
   - Paste generated code
   - Add imports
   
6. Adapt Code
   - Use credentials from config
   - Add waits
   - Use page objects
   - Add assertions
   
7. Run Test
   npm run test:iqm
   
8. Verify Results
   - Check test passes
   - View dashboard report
   
9. Commit to Git
   git add tests/specs/new-scenario.spec.js
   git commit -m "Add new scenario test"
```

## Advanced: Codegen with Custom Configuration

### Create Codegen Config

Create `playwright.codegen.config.js`:

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://apitesting.stage.iqm.com/',
    viewport: { width: 1280, height: 720 },
    screenshot: 'on',  // Capture screenshots during recording
    video: 'on',       // Record video during recording
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

### Run Codegen with Custom Config

```bash
npx playwright codegen --config=playwright.codegen.config.js https://apitesting.stage.iqm.com/
```

## Codegen Inspector Features

### Available Actions

| Action | Description |
|--------|-------------|
| **Record** | Start/stop recording |
| **Copy** | Copy generated code |
| **Clear** | Clear generated code |
| **Inspect** | Inspect element on page |
| **Pause** | Pause recording |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+R` | Toggle recording |
| `Ctrl+Shift+I` | Toggle inspector |
| `Escape` | Close inspector |

## Common Scenarios to Record

### 1. Login Flow
```bash
npm run codegen:iqm
# 1. Enter email
# 2. Click Next
# 3. Enter password
# 4. Click Login
```

### 2. Create Resource
```bash
npm run codegen:iqm
# 1. Click Create button
# 2. Fill form fields
# 3. Upload file
# 4. Click Submit
```

### 3. Search and Filter
```bash
npm run codegen:iqm
# 1. Enter search term
# 2. Click search
# 3. Apply filters
# 4. Verify results
```

### 4. Edit Resource
```bash
npm run codegen:iqm
# 1. Click edit button
# 2. Modify fields
# 3. Click save
# 4. Verify changes
```

### 5. Delete Resource
```bash
npm run codegen:iqm
# 1. Click delete button
# 2. Confirm deletion
# 3. Verify removal
```

## Integrating with Your Framework

### Your Current Framework Structure

```
tests/
├── specs/                    # Test files
│   ├── login.spec.js
│   ├── creative-management.spec.js
│   └── ...
├── iqm-site/
│   ├── pages/               # Page objects
│   │   └── CreativePage.js
│   ├── fixtures/            # Test fixtures
│   │   └── auth.fixture.js
│   └── utils/               # Utilities
│       ├── assertions.js
│       ├── testData.js
│       └── testDataLoader.js
└── testdata/                # Test data
    └── creatives/
```

### Integration Steps

1. **Generate code with codegen**
   ```bash
   npm run codegen:iqm
   ```

2. **Create new test file**
   ```bash
   touch tests/specs/codegen-scenario.spec.js
   ```

3. **Paste and adapt code**
   ```javascript
   import { test, expect } from '@playwright/test';
   import { getIQMCredentials } from '../utils/credentials.js';
   import { CreativePage } from '../pages/CreativePage.js';
   
   test.describe('Codegen Scenario', () => {
     test('recorded scenario', async ({ page }) => {
       // Paste generated code here
       // Adapt as needed
     });
   });
   ```

4. **Run test**
   ```bash
   npm run test:iqm
   ```

5. **View results in dashboard**
   ```bash
   npm run dashboard
   # Open http://localhost:3000
   ```

## Tips & Tricks

### 1. Record Multiple Scenarios
- Run codegen multiple times
- Record different user flows
- Generate separate test files

### 2. Use Assertions
- Codegen suggests assertions
- Add custom assertions as needed
- Verify expected outcomes

### 3. Handle Dynamic Content
- Use flexible locators
- Add waits for dynamic elements
- Use `waitForSelector` if needed

### 4. Test Data
- Use test data from `testdata/` directory
- Reference files in your tests
- Keep data separate from code

### 5. Reuse Generated Code
- Extract common patterns
- Create helper functions
- Build page objects from patterns

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
- Codegen sometimes creates brittle locators
- Use more flexible selectors
- Add fallback locators

## Example: Complete Integration

### 1. Record Scenario
```bash
npm run codegen:iqm
```

### 2. Generated Code
```javascript
await page.goto('https://apitesting.stage.iqm.com/');
await page.locator('input[type="email"]').fill('user@example.com');
await page.locator('button:has-text("Next")').click();
await page.locator('input[type="password"]').fill('password123');
await page.locator('button:has-text("Login")').click();
await page.locator('button:has-text("Create Creative")').click();
await page.locator('input[name="title"]').fill('Test Creative');
await page.locator('input[type="file"]').setInputFiles('image.png');
await page.locator('button:has-text("Upload")').click();
```

### 3. Integrated Test
```javascript
import { test, expect } from '@playwright/test';
import { getIQMCredentials } from '../utils/credentials.js';
import { CreativePage } from '../pages/CreativePage.js';

test.describe('Creative Upload - Codegen', () => {
  let creativePage;

  test.beforeEach(async ({ page }) => {
    creativePage = new CreativePage(page);
    const creds = getIQMCredentials();
    
    // Login
    await page.goto('https://apitesting.stage.iqm.com/');
    await page.locator('input[type="email"]').fill(creds.username);
    await page.locator('button:has-text("Next")').click();
    await page.locator('input[type="password"]').fill(creds.password);
    await page.locator('button:has-text("Login")').click();
    await page.waitForLoadState('networkidle');
  });

  test('User can upload creative', async ({ page }) => {
    // Create creative
    await page.locator('button:has-text("Create Creative")').click();
    await page.locator('input[name="title"]').fill('Test Creative');
    
    // Upload file
    const testFile = 'tests/iqm-site/testdata/creatives/images/Image1.png';
    await page.locator('input[type="file"]').setInputFiles(testFile);
    await page.locator('button:has-text("Upload")').click();
    
    // Verify
    await expect(page.locator('text=Test Creative')).toBeVisible();
  });
});
```

## Next Steps

1. **Start codegen**: `npm run codegen:iqm`
2. **Record scenarios**: Interact with your app
3. **Copy generated code**: Use the inspector
4. **Create test files**: In `tests/specs/`
5. **Adapt code**: Use framework utilities
6. **Run tests**: `npm run test:iqm`
7. **View results**: `npm run dashboard`

---

**Happy Recording! 🎬**

For more info, see [Playwright Codegen Docs](https://playwright.dev/docs/codegen)
