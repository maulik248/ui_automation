# 🤖 Playwright Native AI Agents Guide

## Overview

This framework now uses **Playwright's built-in AI agents** combined with **GitHub Copilot** for intelligent test automation. No custom wrapper classes or external API dependencies needed!

## ✅ What's Enabled

Your `playwright.iqm.config.js` has these AI flags enabled:

```javascript
ai: {
  model: "gpt-4o-mini",
  planner: true,    // Test planning assistance
  healer: true,     // Self-healing locators  
  generator: true   // Test generation assistance
}
```

## 🎯 How to Use Playwright AI Agents

### 1. Self-Healing Locators (healer: true)

Use `.or()` chains to provide fallback strategies. Playwright's healer will automatically pick the working locator:

```javascript
// Multiple fallback strategies
const emailInput = page.locator('input[type="email"]')
  .or(page.locator('input[name*="email"]'))
  .or(page.locator('input[name*="username"]'))
  .or(page.getByPlaceholder(/email|username/i))
  .first();

await emailInput.fill('test@example.com');
```

**Benefits:**
- Auto-recovers if selectors change
- No custom healing classes needed
- Built into Playwright's core

### 2. Smart Element Location

Use semantic locators with regex patterns for flexibility:

```javascript
// Role-based with flexible matching
await page.getByRole('button', { name: /login|sign in|submit/i }).click();

// Label-based location
await page.getByLabel(/email|username/i).fill('user@test.com');

// Placeholder-based
await page.getByPlaceholder(/search|find/i).fill('query');
```

### 3. Multiple Strategy Pattern

Combine different location strategies:

```javascript
// Button with multiple fallbacks
const loginButton = page.locator('button[type="submit"]')
  .or(page.getByRole('button', { name: /login/i }))
  .or(page.locator('button').filter({ hasText: /login/i }))
  .first();

await loginButton.click();
```

## 🚀 Running Tests

```bash
# Run all IQM tests with AI enabled
npx playwright test tests/iqm-site/ --config=playwright.iqm.config.js

# Run specific test file
npx playwright test tests/iqm-site/login.spec.js --config=playwright.iqm.config.js

# Run in headed mode to see AI in action
npx playwright test tests/iqm-site/login.spec.js --config=playwright.iqm.config.js --headed

# Run specific test by name
npx playwright test tests/iqm-site/login.spec.js --config=playwright.iqm.config.js -g "Basic Flow"
```

## 💡 Best Practices with Playwright AI

### 1. Use Semantic Locators First
```javascript
// ✅ Good - Semantic and resilient
await page.getByRole('button', { name: /login/i }).click();

// ❌ Avoid - Too brittle
await page.locator('#btn-login-123').click();
```

### 2. Provide Multiple Strategies
```javascript
// ✅ Good - Multiple fallbacks
const input = page.locator('input[type="email"]')
  .or(page.getByPlaceholder(/email/i))
  .or(page.getByLabel(/email/i));

// ❌ Avoid - Single fragile selector
const input = page.locator('#email-field');
```

### 3. Use Regex for Flexibility
```javascript
// ✅ Good - Handles variations
await page.getByRole('button', { name: /log ?in|sign ?in/i }).click();

// ❌ Avoid - Exact match only
await page.getByRole('button', { name: 'Login' }).click();
```

### 4. Combine with GitHub Copilot
When writing tests in VS Code with GitHub Copilot:
- Type descriptive comments and let Copilot suggest code
- Use clear variable names like `emailInput`, `passwordField`
- Copilot will suggest appropriate Playwright AI patterns

**Example:**
```javascript
// Type this comment:
// Fill in the email field using multiple fallback strategies

// Copilot suggests:
const emailInput = page.locator('input[type="email"]')
  .or(page.getByPlaceholder(/email/i))
  .or(page.getByLabel(/email/i));
await emailInput.fill(email);
```

## 📚 Test Examples

### Basic Login Test
```javascript
test('Login with Playwright AI', async ({ page }) => {
  const creds = getIQMCredentials();

  await page.goto('https://apitesting.stage.iqm.com/');
  
  // AI healer auto-handles selector changes
  await page.getByRole('textbox', { name: /email|username/i })
    .or(page.locator('input[type="email"]'))
    .first()
    .fill(creds.username);
  
  await page.locator('input[type="password"]')
    .or(page.getByLabel(/password/i))
    .first()
    .fill(creds.password);
  
  await page.getByRole('button', { name: /login|sign in/i }).click();
  
  await expect(page).toHaveURL(/dashboard|home/i);
});
```

### Form Validation Test
```javascript
test('Validate form fields', async ({ page }) => {
  await page.goto('https://apitesting.stage.iqm.com/');
  
  // Test empty submission
  await page.getByRole('button', { name: /login/i }).click();
  
  // Check for error messages with flexible matching
  const errorMsg = page.locator('[role="alert"]')
    .or(page.locator('.error, .invalid-feedback'))
    .or(page.getByText(/required|invalid/i));
  
  await expect(errorMsg).toBeVisible();
});
```

## 🔧 Troubleshooting

### Issue: Element not found
**Solution:** Add more fallback strategies using `.or()`

```javascript
// Before
const button = page.locator('button.submit');

// After - More resilient
const button = page.locator('button.submit')
  .or(page.locator('button[type="submit"]'))
  .or(page.getByRole('button', { name: /submit/i }));
```

### Issue: Timeout waiting for element
**Solution:** Increase timeout or use better visibility checks

```javascript
// Add custom timeout
await page.locator('input[type="email"]').waitFor({ 
  state: 'visible', 
  timeout: 15000 
});

// Or use Playwright's auto-wait with .or() chain
const input = page.locator('input[type="email"]')
  .or(page.locator('input[name="email"]'));
await input.fill('test@example.com'); // Auto-waits
```

### Issue: Flaky tests
**Solution:** Use Playwright's auto-waiting and proper waits

```javascript
// ✅ Good - Let Playwright handle waits
await page.getByRole('button', { name: /login/i }).click();
await page.waitForLoadState('networkidle');

// ❌ Avoid - Manual timeouts
await page.getByRole('button', { name: /login/i }).click();
await page.waitForTimeout(2000);
```

## 📖 Additional Resources

- [Playwright Locators Documentation](https://playwright.dev/docs/locators)
- [Playwright AI Features](https://playwright.dev/docs/ai)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [GitHub Copilot in VS Code](https://github.com/features/copilot)

## 🎓 Key Takeaways

1. **No custom agents needed** - Use Playwright's built-in AI features
2. **Use `.or()` chains** - Provide fallback strategies for resilience
3. **Semantic locators first** - Role, label, placeholder over CSS/XPath
4. **Regex for flexibility** - Handle text variations
5. **GitHub Copilot friendly** - Clear naming and comments for better suggestions
6. **Native healing** - Playwright's healer flag enables auto-recovery

---

**Ready to write smarter tests? Start with `tests/iqm-site/login.spec.js` for examples!**
