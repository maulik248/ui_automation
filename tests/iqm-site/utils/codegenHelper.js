/**
 * Codegen Helper
 * Utilities for recording and generating test code
 */

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Start recording with codegen
 * Records user interactions and generates test code
 */
export async function startRecording(options = {}) {
  const {
    url = 'https://apitesting.stage.iqm.com/',
    outputFile = 'recorded-test.spec.js',
    headless = false,
    viewport = { width: 1280, height: 720 },
  } = options;

  console.log('\n🎬 Starting Playwright Codegen Recording...');
  console.log(`📍 URL: ${url}`);
  console.log(`💾 Output: ${outputFile}`);
  console.log('⏹️  Press Ctrl+C to stop recording\n');

  const browser = await chromium.launch({ headless });
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  // Start codegen
  await page.goto(url);

  // Use Playwright's built-in codegen
  const { codegen } = await import('@playwright/test');
  
  // Record interactions
  await new Promise((resolve) => {
    process.on('SIGINT', resolve);
  });

  await context.close();
  await browser.close();

  console.log('\n✅ Recording stopped');
}

/**
 * Generate test from recorded actions
 */
export async function generateTestFromRecording(recordedActions, testName = 'Generated Test') {
  const testCode = `
import { test, expect } from '@playwright/test';

test('${testName}', async ({ page }) => {
${recordedActions.map(action => `  ${action}`).join('\n')}
});
`;

  return testCode;
}

/**
 * Save generated test to file
 */
export function saveGeneratedTest(testCode, filename = 'generated-test.spec.js') {
  const testDir = path.join(__dirname, '../specs');
  const filePath = path.join(testDir, filename);

  // Ensure directory exists
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  fs.writeFileSync(filePath, testCode, 'utf-8');
  console.log(`✅ Test saved to: ${filePath}`);

  return filePath;
}

/**
 * Record and save test in one go
 */
export async function recordAndSaveTest(options = {}) {
  const {
    url = 'https://apitesting.stage.iqm.com/',
    testName = 'Recorded Test',
    outputFile = 'recorded-test.spec.js',
  } = options;

  console.log('\n🎬 Starting Playwright Codegen...');
  console.log(`📍 URL: ${url}`);
  console.log(`📝 Test Name: ${testName}`);
  console.log(`💾 Output: ${outputFile}\n`);

  // Use Playwright's codegen command
  const { spawn } = await import('child_process');
  
  return new Promise((resolve, reject) => {
    const codegen = spawn('npx', [
      'playwright',
      'codegen',
      '--output',
      path.join(__dirname, '../specs', outputFile),
      url,
    ]);

    codegen.stdout.on('data', (data) => {
      console.log(`📝 ${data}`);
    });

    codegen.stderr.on('data', (data) => {
      console.error(`❌ ${data}`);
    });

    codegen.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ Test saved to: tests/iqm-site/specs/${outputFile}`);
        resolve(path.join(__dirname, '../specs', outputFile));
      } else {
        reject(new Error(`Codegen exited with code ${code}`));
      }
    });

    // Handle Ctrl+C gracefully
    process.on('SIGINT', () => {
      codegen.kill();
      resolve(path.join(__dirname, '../specs', outputFile));
    });
  });
}

/**
 * Convert recorded test to use Page Object Model
 */
export function convertToPageObjectModel(testCode, pageObjectName = 'CreativePage') {
  // Replace direct page interactions with POM methods
  let converted = testCode;

  // Example conversions
  const conversions = [
    {
      pattern: /await page\.getByRole\('button', \{ name: \/create\/i \}\)\.click\(\);/g,
      replacement: `await ${pageObjectName.toLowerCase()}.clickAddNew();`,
    },
    {
      pattern: /await page\.getByLabel\(\/name\/i\)\.fill\('(.+?)'\);/g,
      replacement: `await ${pageObjectName.toLowerCase()}.fillCreativeForm({ name: '$1' });`,
    },
  ];

  conversions.forEach(({ pattern, replacement }) => {
    converted = converted.replace(pattern, replacement);
  });

  return converted;
}

/**
 * Add custom assertions to generated test
 */
export function addAssertions(testCode, assertions = []) {
  let code = testCode;

  // Add import for custom assertions
  if (assertions.length > 0) {
    const assertionImport = `import { ${assertions.join(', ')} } from '../utils/assertions.js';\n`;
    code = code.replace(
      "import { test, expect } from '@playwright/test';",
      `import { test, expect } from '@playwright/test';\n${assertionImport}`
    );
  }

  return code;
}

/**
 * Format generated test code
 */
export function formatTestCode(testCode) {
  // Add proper formatting
  let formatted = testCode;

  // Add spacing
  formatted = formatted.replace(/\n\n+/g, '\n\n');

  // Add comments
  formatted = formatted.replace(
    /test\('(.+?)',/,
    `/**\n * Generated test: $1\n * Auto-generated by Playwright Codegen\n */\ntest('$1',`
  );

  return formatted;
}

/**
 * List all recorded tests
 */
export function listRecordedTests() {
  const specsDir = path.join(__dirname, '../specs');

  if (!fs.existsSync(specsDir)) {
    return [];
  }

  const files = fs.readdirSync(specsDir);
  return files.filter(file => file.endsWith('.spec.js'));
}

/**
 * Get recorded test content
 */
export function getRecordedTestContent(filename) {
  const filePath = path.join(__dirname, '../specs', filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Test file not found: ${filePath}`);
  }

  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Delete recorded test
 */
export function deleteRecordedTest(filename) {
  const filePath = path.join(__dirname, '../specs', filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Test file not found: ${filePath}`);
  }

  fs.unlinkSync(filePath);
  console.log(`✅ Deleted: ${filename}`);
}

/**
 * Export all utilities
 */
export default {
  startRecording,
  generateTestFromRecording,
  saveGeneratedTest,
  recordAndSaveTest,
  convertToPageObjectModel,
  addAssertions,
  formatTestCode,
  listRecordedTests,
  getRecordedTestContent,
  deleteRecordedTest,
};
