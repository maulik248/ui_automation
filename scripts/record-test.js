#!/usr/bin/env node

/**
 * Test Recording CLI
 * Easy command-line interface for recording tests with Playwright Codegen
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'help';
const testName = args[1] || 'recorded-test';
const url = args[2] || 'https://apitesting.stage.iqm.com/';

const outputFile = `${testName}.spec.js`;
const outputPath = path.join(__dirname, '../tests/specs', outputFile);

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Display help message
 */
function showHelp() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║           Playwright Test Recording CLI                        ║
╚════════════════════════════════════════════════════════════════╝

📝 USAGE:
  npm run record [command] [testName] [url]

🎬 COMMANDS:

  record [testName] [url]
    Record a new test by interacting with the browser
    
    Examples:
      npm run record
      npm run record my-test
      npm run record my-test https://example.com

  list
    List all recorded tests
    
    Example:
      npm run record list

  view [testName]
    View the content of a recorded test
    
    Example:
      npm run record view my-test

  delete [testName]
    Delete a recorded test
    
    Example:
      npm run record delete my-test

  help
    Show this help message

📍 DEFAULT VALUES:
  - testName: recorded-test
  - url: https://apitesting.stage.iqm.com/

💾 OUTPUT LOCATION:
  tests/specs/{testName}.spec.js

🎯 WORKFLOW:
  1. Run: npm run record my-test
  2. Browser opens with the URL
  3. Interact with the page (click, type, etc.)
  4. Press Ctrl+C to stop recording
  5. Test code is automatically generated and saved
  6. Review and edit the generated test
  7. Run: npm run test:iqm to execute the test

✨ TIPS:
  - Keep recordings short and focused
  - Record one user flow per test
  - Edit generated tests to add assertions
  - Use Page Object Model for better maintainability
  - Add custom assertions for better test quality

📚 DOCUMENTATION:
  See docs/CODEGEN_GUIDE.md for detailed instructions
`);
}

/**
 * Record a new test
 */
function recordTest() {
  console.log('\n🎬 Starting Playwright Codegen Recording...');
  console.log(`📍 URL: ${url}`);
  console.log(`📝 Test Name: ${testName}`);
  console.log(`💾 Output: ${outputFile}`);
  console.log('⏹️  Press Ctrl+C to stop recording\n');

  const codegen = spawn('npx', [
    'playwright',
    'codegen',
    '--output',
    outputPath,
    url,
  ]);

  codegen.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  codegen.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  codegen.on('close', (code) => {
    if (code === 0 || code === null) {
      console.log(`\n✅ Test recorded successfully!`);
      console.log(`📁 Location: ${outputPath}`);
      console.log(`\n🚀 Next steps:`);
      console.log(`  1. Review the generated test`);
      console.log(`  2. Add assertions and cleanup`);
      console.log(`  3. Run: npm run test:iqm -- ${outputFile}`);
    } else {
      console.error(`\n❌ Recording failed with code ${code}`);
    }
    process.exit(code);
  });

  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    console.log('\n\n⏹️  Recording stopped');
    codegen.kill();
    
    if (fs.existsSync(outputPath)) {
      console.log(`✅ Test saved to: ${outputPath}`);
      console.log(`\n🚀 Next steps:`);
      console.log(`  1. Review the generated test`);
      console.log(`  2. Add assertions and cleanup`);
      console.log(`  3. Run: npm run test:iqm -- ${outputFile}`);
    }
    process.exit(0);
  });
}

/**
 * List all recorded tests
 */
function listTests() {
  const specsDir = path.join(__dirname, '../tests/specs');

  if (!fs.existsSync(specsDir)) {
    console.log('No recorded tests found');
    return;
  }

  const files = fs.readdirSync(specsDir)
    .filter(file => file.endsWith('.spec.js'))
    .sort();

  if (files.length === 0) {
    console.log('No recorded tests found');
    return;
  }

  console.log('\n📋 Recorded Tests:\n');
  files.forEach((file, index) => {
    const filePath = path.join(specsDir, file);
    const stats = fs.statSync(filePath);
    const size = (stats.size / 1024).toFixed(2);
    const date = stats.mtime.toLocaleDateString();
    
    console.log(`  ${index + 1}. ${file}`);
    console.log(`     Size: ${size} KB | Modified: ${date}`);
  });
  console.log();
}

/**
 * View recorded test
 */
function viewTest() {
  if (!testName || testName === 'view') {
    console.error('❌ Please specify a test name');
    console.log('Usage: npm run record view <testName>');
    process.exit(1);
  }

  const filePath = path.join(__dirname, '../tests/specs', `${testName}.spec.js`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Test not found: ${testName}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  console.log(`\n📄 ${testName}.spec.js:\n`);
  console.log(content);
}

/**
 * Delete recorded test
 */
function deleteTest() {
  if (!testName || testName === 'delete') {
    console.error('❌ Please specify a test name');
    console.log('Usage: npm run record delete <testName>');
    process.exit(1);
  }

  const filePath = path.join(__dirname, '../tests/specs', `${testName}.spec.js`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Test not found: ${testName}`);
    process.exit(1);
  }

  fs.unlinkSync(filePath);
  console.log(`✅ Deleted: ${testName}.spec.js`);
}

// Execute command
switch (command) {
  case 'help':
  case '-h':
  case '--help':
    showHelp();
    break;
  case 'list':
    listTests();
    break;
  case 'view':
    viewTest();
    break;
  case 'delete':
    deleteTest();
    break;
  case 'record':
  default:
    recordTest();
    break;
}
