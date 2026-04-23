# Test Data Organization

This folder contains all test data files including creative files, fixtures, and mock data used in tests.

## 📁 Folder Structure

```
testdata/
├── README.md                          # This file
├── creatives/                         # Creative files (images, videos, etc.)
│   ├── images/
│   │   ├── sample-image-1.jpg
│   │   ├── sample-image-2.png
│   │   └── ...
│   ├── videos/
│   │   ├── sample-video-1.mp4
│   │   └── ...
│   ├── audio/
│   │   ├── sample-audio-1.mp3
│   │   └── ...
│   └── html/
│       ├── sample-html-1.html
│       └── ...
├── fixtures/                          # Test fixtures and mock data
│   ├── creative-fixtures.json
│   ├── user-fixtures.json
│   └── ...
└── mocks/                             # Mock responses and data
    ├── api-responses.json
    └── ...
```

## 📂 Subdirectories

### `creatives/` - Creative Files
Store all creative assets used in tests:

- **images/** - Image files (.jpg, .png, .gif, .webp)
- **videos/** - Video files (.mp4, .webm, .mov)
- **audio/** - Audio files (.mp3, .wav, .ogg)
- **html/** - HTML creative files (.html)
- **native/** - Native creative files

**Example:**
```
creatives/
├── images/
│   ├── test-banner-300x250.jpg
│   ├── test-image-1920x1080.png
│   └── test-image-small.gif
├── videos/
│   ├── test-video-30sec.mp4
│   └── test-video-15sec.webm
└── audio/
    ├── test-audio-30sec.mp3
    └── test-audio-15sec.wav
```

### `fixtures/` - Test Fixtures
JSON files containing test data structures:

- **creative-fixtures.json** - Creative object fixtures
- **user-fixtures.json** - User data fixtures
- **campaign-fixtures.json** - Campaign data fixtures

**Example creative-fixtures.json:**
```json
{
  "validCreative": {
    "name": "Test Creative",
    "type": "image",
    "description": "Test description"
  },
  "invalidCreative": {
    "name": "",
    "type": "invalid-type"
  }
}
```

### `mocks/` - Mock Data
Mock API responses and data:

- **api-responses.json** - Mock API responses
- **error-responses.json** - Mock error responses

## 🚀 How to Use Test Data

### Using Creative Files in Tests

```javascript
import { test } from '@playwright/test';

test('Upload creative image', async ({ page }) => {
  // Use creative file from testdata folder
  const imagePath = './tests/iqm-site/testdata/creatives/images/test-banner-300x250.jpg';
  
  await page.locator('input[type="file"]').setInputFiles(imagePath);
});
```

### Using Fixtures in Tests

```javascript
import { test } from '@playwright/test';
import fixtures from '../testdata/fixtures/creative-fixtures.json';

test('Create creative with fixture data', async ({ page }) => {
  const creativeData = fixtures.validCreative;
  
  // Use fixture data in test
  await page.getByLabel(/name/i).fill(creativeData.name);
  await page.getByLabel(/type/i).selectOption(creativeData.type);
});
```

### Using Test Data Builder with Fixtures

```javascript
import { CreativeDataBuilder } from '../utils/testData.js';
import fixtures from '../testdata/fixtures/creative-fixtures.json';

test('Create creative', async ({ page }) => {
  // Combine builder with fixture data
  const creative = CreativeDataBuilder.createImageCreative({
    ...fixtures.validCreative,
    name: `${fixtures.validCreative.name} ${Date.now()}`
  });
});
```

## 📋 File Naming Conventions

### Creative Files
```
{type}-{description}-{size/duration}.{extension}

Examples:
- test-banner-300x250.jpg
- test-image-1920x1080.png
- test-video-30sec.mp4
- test-audio-15sec.mp3
- test-html-simple.html
```

### Fixture Files
```
{entity}-fixtures.json

Examples:
- creative-fixtures.json
- user-fixtures.json
- campaign-fixtures.json
```

### Mock Files
```
{type}-{scenario}.json

Examples:
- api-responses.json
- error-responses.json
- success-responses.json
```

## 🎯 Best Practices

### 1. Keep Files Small
- Use compressed images
- Use short video clips (5-30 seconds)
- Keep file sizes under 5MB

### 2. Use Descriptive Names
```javascript
// Good
test-banner-300x250.jpg
test-video-30sec.mp4

// Avoid
image1.jpg
video.mp4
```

### 3. Organize by Type
```
creatives/
├── images/
├── videos/
├── audio/
└── html/
```

### 4. Version Fixtures
```json
{
  "version": "1.0.0",
  "creatives": {
    "validCreative": { ... }
  }
}
```

### 5. Document Fixtures
```json
{
  "validCreative": {
    "name": "Test Creative",
    "type": "image",
    "description": "Test description",
    "_comment": "Used for basic creation tests"
  }
}
```

## 📝 Adding New Test Data

### Step 1: Create Subdirectory (if needed)
```bash
mkdir -p tests/iqm-site/testdata/creatives/images
```

### Step 2: Add Files
```bash
# Copy creative file
cp ~/Downloads/test-image.jpg tests/iqm-site/testdata/creatives/images/

# Or create fixture
cat > tests/iqm-site/testdata/fixtures/new-fixtures.json << 'EOF'
{
  "testData": {
    "name": "Test",
    "type": "image"
  }
}
EOF
```

### Step 3: Use in Tests
```javascript
import { test } from '@playwright/test';

test('Use new test data', async ({ page }) => {
  const filePath = './tests/iqm-site/testdata/creatives/images/test-image.jpg';
  // Use in test
});
```

## 🔍 Finding Test Data

### List All Creative Files
```bash
find tests/iqm-site/testdata/creatives -type f
```

### List All Fixtures
```bash
find tests/iqm-site/testdata/fixtures -type f
```

### Search for Specific File
```bash
find tests/iqm-site/testdata -name "*banner*"
```

## 📊 Test Data Inventory

### Current Structure
```
testdata/
├── creatives/
│   ├── images/          (Add your image files here)
│   ├── videos/          (Add your video files here)
│   ├── audio/           (Add your audio files here)
│   └── html/            (Add your HTML files here)
├── fixtures/            (Add your JSON fixtures here)
└── mocks/               (Add your mock data here)
```

## 🚀 Quick Start

### 1. Add Creative Files
```bash
# Copy your creative files to appropriate folder
cp ~/path/to/image.jpg tests/iqm-site/testdata/creatives/images/
cp ~/path/to/video.mp4 tests/iqm-site/testdata/creatives/videos/
```

### 2. Create Fixtures
```bash
# Create fixture file
cat > tests/iqm-site/testdata/fixtures/creative-fixtures.json << 'EOF'
{
  "validCreative": {
    "name": "Test Creative",
    "type": "image"
  }
}
EOF
```

### 3. Use in Tests
```javascript
import { test } from '@playwright/test';

test('Use test data', async ({ page }) => {
  const imagePath = './tests/iqm-site/testdata/creatives/images/image.jpg';
  await page.locator('input[type="file"]').setInputFiles(imagePath);
});
```

## 📚 Related Files

- **Test Data Builders:** `tests/iqm-site/utils/testData.js`
- **Test Specs:** `tests/specs/`
- **Page Objects:** `tests/iqm-site/pages/`

## 🔗 Import Paths

### From Test Specs
```javascript
// Creative files
const imagePath = './tests/iqm-site/testdata/creatives/images/test.jpg';

// Fixtures
import fixtures from '../iqm-site/testdata/fixtures/creative-fixtures.json';
```

### From Test Infrastructure
```javascript
// Creative files
const imagePath = './testdata/creatives/images/test.jpg';

// Fixtures
import fixtures from './testdata/fixtures/creative-fixtures.json';
```

## ✅ Checklist for Adding Test Data

- [ ] Create appropriate subdirectory
- [ ] Add files with descriptive names
- [ ] Update this README if adding new category
- [ ] Create fixtures if needed
- [ ] Document usage in test files
- [ ] Verify file paths in tests
- [ ] Test that files load correctly

## 📞 Questions?

Refer to:
- **Test Data Builders:** `tests/iqm-site/utils/testData.js`
- **Example Tests:** `tests/specs/creative-management.spec.js`
- **Main Guide:** `docs/TEST_SUITE_GUIDE.md`

---

**Last Updated:** April 23, 2026
**Framework Version:** 2.0.0
**Status:** ✅ Ready to Use
