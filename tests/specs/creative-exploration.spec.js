import { test } from '@playwright/test';
import { getIQMCredentials } from '../utils/credentials.js';

test.describe('Creative App Exploration', () => {
  
  test('Explore Creative App and discover features', async ({ page }) => {
    const creds = getIQMCredentials();
    const CREATIVE_URL = 'https://apitesting.stage.iqm.com/creatives/u/0/';

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
    
    await page.waitForURL(/dashboard|home/i, { timeout: 10000 });
    await page.waitForLoadState('networkidle');

    // Navigate to Creative App
    console.log('\n' + '='.repeat(80));
    console.log('🎨 CREATIVE APP EXPLORATION');
    console.log('='.repeat(80));
    
    await page.goto(CREATIVE_URL);
    await page.waitForLoadState('networkidle');

    const currentUrl = page.url();
    const pageTitle = await page.title();
    console.log(`\n📍 URL: ${currentUrl}`);
    console.log(`📄 Page Title: ${pageTitle}`);

    // Discover page structure
    console.log('\n' + '='.repeat(80));
    console.log('🔍 PAGE STRUCTURE');
    console.log('='.repeat(80));

    // Header/Navigation
    console.log('\n📌 HEADER & NAVIGATION:');
    const navItems = await page.locator('nav a, [role="navigation"] a, header a, .navbar a, .menu a').all();
    for (const item of navItems) {
      const text = await item.textContent();
      const href = await item.getAttribute('href');
      if (text?.trim()) {
        console.log(`  • ${text.trim()} → ${href || 'N/A'}`);
      }
    }

    // Main buttons
    console.log('\n🔘 MAIN ACTION BUTTONS:');
    const buttons = await page.locator('button:visible, [role="button"]:visible').all();
    const uniqueButtons = new Set();
    for (let i = 0; i < Math.min(buttons.length, 15); i++) {
      const text = await buttons[i].textContent();
      const ariaLabel = await buttons[i].getAttribute('aria-label');
      const label = text?.trim() || ariaLabel || `Button ${i + 1}`;
      if (label && !uniqueButtons.has(label)) {
        console.log(`  • ${label}`);
        uniqueButtons.add(label);
      }
    }

    // Forms
    console.log('\n📝 FORMS:');
    const forms = await page.locator('form').all();
    console.log(`  Found ${forms.length} form(s)`);
    for (let i = 0; i < forms.length; i++) {
      const inputs = await forms[i].locator('input, select, textarea').count();
      const formId = await forms[i].getAttribute('id');
      console.log(`  Form ${i + 1}: ${inputs} input fields${formId ? ` (ID: ${formId})` : ''}`);
    }

    // Tables/Lists
    console.log('\n📊 DATA DISPLAY:');
    const tables = await page.locator('table').all();
    console.log(`  Tables: ${tables.length}`);
    for (let i = 0; i < tables.length; i++) {
      const rows = await tables[i].locator('tr').count();
      const cols = await tables[i].locator('th').count();
      console.log(`    Table ${i + 1}: ${rows} rows, ${cols} columns`);
    }

    const lists = await page.locator('ul, ol, [role="list"]').all();
    console.log(`  Lists: ${lists.length}`);

    // Cards/Grid items
    const cards = await page.locator('[class*="card"], [class*="item"], [class*="tile"], [role="article"]').all();
    console.log(`  Cards/Items: ${cards.length}`);

    // Modals/Dialogs
    console.log('\n🪟 MODALS/DIALOGS:');
    const modals = await page.locator('[role="dialog"], .modal:visible, [class*="dialog"]:visible').count();
    console.log(`  Visible modals: ${modals}`);

    // Sidebar/Panel
    console.log('\n📋 SIDEBAR/PANELS:');
    const sidebars = await page.locator('[role="complementary"], .sidebar, [class*="sidebar"], aside').all();
    console.log(`  Sidebars/Panels: ${sidebars.length}`);
    for (let i = 0; i < sidebars.length; i++) {
      const text = await sidebars[i].textContent();
      const preview = text?.trim().substring(0, 50) || 'N/A';
      console.log(`    Panel ${i + 1}: ${preview}...`);
    }

    // Headings/Sections
    console.log('\n📑 PAGE SECTIONS:');
    const headings = await page.locator('h1, h2, h3, h4').all();
    for (const heading of headings) {
      const text = await heading.textContent();
      const level = await heading.evaluate(el => el.tagName);
      if (text?.trim()) {
        console.log(`  ${level}: ${text.trim()}`);
      }
    }

    // Input fields
    console.log('\n⌨️ INPUT FIELDS:');
    const inputs = await page.locator('input:visible, select:visible, textarea:visible').all();
    const uniqueInputs = new Set();
    for (let i = 0; i < Math.min(inputs.length, 10); i++) {
      const type = await inputs[i].getAttribute('type');
      const placeholder = await inputs[i].getAttribute('placeholder');
      const name = await inputs[i].getAttribute('name');
      const label = placeholder || name || type || `Input ${i + 1}`;
      if (label && !uniqueInputs.has(label)) {
        console.log(`  • ${label} (type: ${type || 'text'})`);
        uniqueInputs.add(label);
      }
    }

    // Search/Filter
    console.log('\n🔍 SEARCH/FILTER:');
    const searchInputs = await page.locator('input[placeholder*="search" i], input[placeholder*="filter" i], input[type="search"]').all();
    console.log(`  Search/Filter inputs: ${searchInputs.length}`);

    // Pagination
    console.log('\n📄 PAGINATION:');
    const pagination = await page.locator('[role="navigation"], .pagination, [class*="pagination"]').count();
    console.log(`  Pagination elements: ${pagination}`);

    // Dropdowns/Selects
    console.log('\n📌 DROPDOWNS/SELECTS:');
    const selects = await page.locator('select, [role="combobox"], [role="listbox"]').all();
    console.log(`  Dropdowns: ${selects.length}`);

    // Tabs
    console.log('\n📑 TABS:');
    const tabs = await page.locator('[role="tab"], .tab, [class*="tab"]').all();
    console.log(`  Tabs: ${tabs.length}`);
    for (let i = 0; i < Math.min(tabs.length, 5); i++) {
      const text = await tabs[i].textContent();
      if (text?.trim()) {
        console.log(`    • ${text.trim()}`);
      }
    }

    // Breadcrumbs
    console.log('\n🔗 BREADCRUMBS:');
    const breadcrumbs = await page.locator('[role="navigation"] a, .breadcrumb a, [class*="breadcrumb"] a').all();
    console.log(`  Breadcrumb items: ${breadcrumbs.length}`);
    for (const crumb of breadcrumbs) {
      const text = await crumb.textContent();
      if (text?.trim()) {
        console.log(`    • ${text.trim()}`);
      }
    }

    // Alerts/Notifications
    console.log('\n🔔 ALERTS/NOTIFICATIONS:');
    const alerts = await page.locator('[role="alert"], .alert, .notification, .toast, [class*="alert"]').count();
    console.log(`  Alert elements: ${alerts}`);

    // Discover interactive elements
    console.log('\n' + '='.repeat(80));
    console.log('🎯 INTERACTIVE ELEMENTS');
    console.log('='.repeat(80));

    // Clickable elements
    console.log('\n🖱️ CLICKABLE ELEMENTS:');
    const clickables = await page.locator('a, button, [role="button"], [onclick], input[type="checkbox"], input[type="radio"]').all();
    console.log(`  Total clickable elements: ${clickables.length}`);

    // Editable elements
    console.log('\n✏️ EDITABLE ELEMENTS:');
    const editables = await page.locator('input:not([type="hidden"]), textarea, [contenteditable="true"]').all();
    console.log(`  Total editable elements: ${editables.length}`);

    // Generate test recommendations
    console.log('\n' + '='.repeat(80));
    console.log('💡 TEST RECOMMENDATIONS FOR CREATIVE APP');
    console.log('='.repeat(80));

    const recommendations = [];

    if (tables.length > 0) {
      recommendations.push({
        category: '📊 Data Table Tests',
        tests: [
          'Verify creative list loads and displays data',
          'Test table sorting by different columns',
          'Test table filtering/search functionality',
          'Test table pagination if available',
          'Test row selection and bulk actions',
          'Verify table row actions (edit, delete, view, preview)'
        ]
      });
    }

    if (forms.length > 0) {
      recommendations.push({
        category: '📝 Form Tests',
        tests: [
          'Test creative creation form with valid data',
          'Test form validation for required fields',
          'Test form submission with invalid data',
          'Test form field interactions',
          'Test form reset/cancel functionality',
          'Verify form error messages display correctly'
        ]
      });
    }

    if (buttons.length > 0) {
      recommendations.push({
        category: '🔘 Button Interaction Tests',
        tests: [
          'Verify all action buttons are clickable',
          'Test button enabled/disabled states',
          'Test button hover and focus states',
          'Verify button click responses and navigation',
          'Test button loading states if applicable'
        ]
      });
    }

    recommendations.push({
      category: '🎨 Creative Management Tests',
      tests: [
        'Test creating a new creative',
        'Test editing an existing creative',
        'Test deleting a creative',
        'Test duplicating a creative',
        'Test creative preview/preview functionality',
        'Test creative status changes',
        'Test creative tagging/categorization',
        'Test creative upload/file handling'
      ]
    });

    recommendations.push({
      category: '🔍 Search & Filter Tests',
      tests: [
        'Test search by creative name',
        'Test filter by creative type',
        'Test filter by status',
        'Test filter by date range',
        'Test combined filters',
        'Test clearing filters'
      ]
    });

    recommendations.push({
      category: '📋 Bulk Operations Tests',
      tests: [
        'Test selecting multiple creatives',
        'Test bulk delete operation',
        'Test bulk status change',
        'Test bulk export',
        'Test select all/deselect all'
      ]
    });

    recommendations.push({
      category: '✅ Validation Tests',
      tests: [
        'Test required field validation',
        'Test file size validation',
        'Test file type validation',
        'Test dimension validation for images',
        'Test naming convention validation'
      ]
    });

    recommendations.forEach((section, idx) => {
      console.log(`\n${idx + 1}. ${section.category}`);
      section.tests.forEach((test, testIdx) => {
        console.log(`   ${String.fromCharCode(97 + testIdx)}. ${test}`);
      });
    });

    console.log('\n' + '='.repeat(80));
    console.log('✅ EXPLORATION COMPLETE');
    console.log('='.repeat(80));
    console.log('\n📊 Summary:');
    console.log(`  • Forms: ${forms.length}`);
    console.log(`  • Tables: ${tables.length}`);
    console.log(`  • Buttons: ${buttons.length}`);
    console.log(`  • Input fields: ${inputs.length}`);
    console.log(`  • Clickable elements: ${clickables.length}`);
    console.log(`  • Editable elements: ${editables.length}\n`);
  });
});
