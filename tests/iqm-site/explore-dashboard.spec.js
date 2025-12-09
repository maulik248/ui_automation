import { test } from '@playwright/test';
import { getIQMCredentials } from '../../utils/credentials.js';

test.describe('Dashboard Exploration and Test Planning', () => {
  
  test('Explore dashboard and generate test plan', async ({ page }) => {
    const creds = getIQMCredentials();

    // Login first
    await page.goto('https://apitesting.stage.iqm.com/');
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
    
    // Wait for navigation to dashboard
    await page.waitForURL(/dashboard|home/i, { timeout: 10000 });
    await page.waitForLoadState('networkidle');

    console.log('\n' + '='.repeat(80));
    console.log('🤖 DASHBOARD EXPLORATION & TEST PLAN GENERATION');
    console.log('='.repeat(80));

    // Get current URL
    const currentUrl = page.url();
    console.log(`\n📍 Current URL: ${currentUrl}`);

    // Discover page title
    const pageTitle = await page.title();
    console.log(`📄 Page Title: ${pageTitle}`);

    // Find all navigation links
    console.log('\n🔗 NAVIGATION ELEMENTS:');
    const navLinks = await page.locator('nav a, [role="navigation"] a, header a').all();
    for (const link of navLinks) {
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      if (text?.trim()) {
        console.log(`  • ${text.trim()} → ${href || 'N/A'}`);
      }
    }

    // Find all buttons
    console.log('\n🔘 INTERACTIVE BUTTONS:');
    const buttons = await page.locator('button:visible, [role="button"]:visible').all();
    for (let i = 0; i < Math.min(buttons.length, 10); i++) {
      const text = await buttons[i].textContent();
      const ariaLabel = await buttons[i].getAttribute('aria-label');
      const label = text?.trim() || ariaLabel || `Button ${i + 1}`;
      console.log(`  • ${label}`);
    }

    // Find all headings
    console.log('\n📑 PAGE SECTIONS (Headings):');
    const headings = await page.locator('h1, h2, h3').all();
    for (const heading of headings) {
      const text = await heading.textContent();
      const tagName = await heading.evaluate(el => el.tagName);
      if (text?.trim()) {
        console.log(`  ${tagName}: ${text.trim()}`);
      }
    }

    // Find forms
    console.log('\n📝 FORMS DETECTED:');
    const forms = await page.locator('form').all();
    console.log(`  Found ${forms.length} form(s)`);
    for (let i = 0; i < forms.length; i++) {
      const inputs = await forms[i].locator('input, select, textarea').count();
      console.log(`  Form ${i + 1}: ${inputs} input fields`);
    }

    // Find tables
    console.log('\n📊 DATA TABLES:');
    const tables = await page.locator('table').all();
    console.log(`  Found ${tables.length} table(s)`);
    for (let i = 0; i < tables.length; i++) {
      const rows = await tables[i].locator('tr').count();
      console.log(`  Table ${i + 1}: ${rows} rows`);
    }

    // Check for modals/dialogs
    console.log('\n🪟 MODALS/DIALOGS:');
    const modals = await page.locator('[role="dialog"], .modal:visible, [class*="dialog"]:visible').count();
    console.log(`  Found ${modals} visible modal(s)`);

    // Check for notifications/alerts
    console.log('\n🔔 NOTIFICATIONS/ALERTS:');
    const alerts = await page.locator('[role="alert"], .alert, .notification, .toast').count();
    console.log(`  Found ${alerts} notification element(s)`);

    // Generate Test Plan
    console.log('\n' + '='.repeat(80));
    console.log('📋 SUGGESTED TEST PLAN');
    console.log('='.repeat(80));

    const testPlan = [];

    // Navigation tests
    if (navLinks.length > 0) {
      testPlan.push({
        category: '🔗 Navigation Tests',
        tests: [
          'Verify all navigation links are clickable',
          'Verify navigation links lead to correct pages',
          'Test breadcrumb navigation if present',
          'Test back button functionality'
        ]
      });
    }

    // Button interaction tests
    if (buttons.length > 0) {
      testPlan.push({
        category: '🔘 Button Interaction Tests',
        tests: [
          'Verify primary action buttons work correctly',
          'Test button disabled/enabled states',
          'Verify button hover and focus states',
          'Test button click responses'
        ]
      });
    }

    // Form tests
    if (forms.length > 0) {
      testPlan.push({
        category: '📝 Form Tests',
        tests: [
          'Test form submission with valid data',
          'Test form validation for required fields',
          'Test form submission with invalid data',
          'Verify form error messages display correctly',
          'Test form reset functionality'
        ]
      });
    }

    // Data table tests
    if (tables.length > 0) {
      testPlan.push({
        category: '📊 Data Table Tests',
        tests: [
          'Verify table data loads correctly',
          'Test table sorting functionality',
          'Test table filtering/search',
          'Test table pagination if present',
          'Verify table row actions (edit, delete, view)'
        ]
      });
    }

    // UI/Visual tests
    testPlan.push({
      category: '🎨 UI/Visual Tests',
      tests: [
        'Verify page layout and responsive design',
        'Test page loading states',
        'Verify all images load correctly',
        'Test accessibility (ARIA labels, keyboard navigation)',
        'Verify consistent styling across pages'
      ]
    });

    // User workflow tests
    testPlan.push({
      category: '👤 User Workflow Tests',
      tests: [
        'Test complete user journey from login to logout',
        'Verify session timeout handling',
        'Test browser back/forward navigation',
        'Verify proper error handling',
        'Test page refresh behavior'
      ]
    });

    // Print test plan
    testPlan.forEach((section, idx) => {
      console.log(`\n${idx + 1}. ${section.category}`);
      section.tests.forEach((test, testIdx) => {
        console.log(`   ${String.fromCharCode(97 + testIdx)}. ${test}`);
      });
    });

    // Priority recommendations
    console.log('\n' + '='.repeat(80));
    console.log('🎯 PRIORITY RECOMMENDATIONS');
    console.log('='.repeat(80));
    console.log('\n🔴 HIGH PRIORITY:');
    console.log('  1. Navigation - Verify all main navigation links work');
    console.log('  2. Forms - Test critical form submissions');
    console.log('  3. User Workflows - Test complete end-to-end scenarios');
    
    console.log('\n🟡 MEDIUM PRIORITY:');
    console.log('  1. Data Tables - Verify data display and interactions');
    console.log('  2. Button Actions - Test all interactive elements');
    console.log('  3. Error Handling - Verify proper error messages');
    
    console.log('\n🟢 LOW PRIORITY:');
    console.log('  1. UI/Visual - Verify styling and responsive design');
    console.log('  2. Accessibility - Test keyboard navigation and ARIA');
    console.log('  3. Performance - Monitor page load times');

    console.log('\n' + '='.repeat(80));
    console.log('✅ EXPLORATION COMPLETE');
    console.log('='.repeat(80));
    console.log('\n💡 Next Steps:');
    console.log('  1. Review the suggested test plan above');
    console.log('  2. Create new test files for each category');
    console.log('  3. Implement high-priority tests first');
    console.log('  4. Use Playwright AI agents (healer) for resilient selectors\n');
  });
});
