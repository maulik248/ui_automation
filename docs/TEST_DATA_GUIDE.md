# Test Data Guide

Complete guide for managing and using test data in the Playwright testing framework.

## 📁 Test Data Structure

```
tests/iqm-site/testdata/
├── README.md                          # Test data documentation
├── creatives/                         # Creative files
│   ├── images/                        # Image files (.jpg, .png, .gif)
│   ├── videos/                        # Video files (.mp4, .webm)
│   ├── audio/                         # Audio files (.mp3, .wav)
│   └── html/                          # HTML files (.html)
├── fixtures/                          # JSON test fixtures
│   └── creative-fixtures.json         # Creative test data
└── mocks/                             # Mock API responses
    └── (add mock files here)
```

## 🎯 Types of Test Data

### 1. Creative Files
Actual media files used for upload and testing:
- **Images:** .jpg, .png, .gif, .webp
- **Videos:** .mp4, .webm, .mov
- **Audio:** .mp3, .wav, .ogg
- **HTML:** .html files

**Location:** `tests/iqm-site/testdata/creatives/{type}/`

### 2. Fixtures
JSON files containing structured test data:
- Creative objects
- User data
- Campaign data
- Test scenarios

**Location:** `tests/iqm-site/testdata/fixtures/`

### 3. Mocks
Mock API responses and data:
- Success responses
- Error responses
- Edge case responses

**Location:** `tests/iqm-site/testdata/mocks/`

## 📚 Using Test Data

### Method 1: Using Test Data Loader

The `testDataLoader.js` utility provides easy access to test data.

#### Load Fixtures
```javascript
import { loadFixture, getCreativeFixture } from '../utils/testDataLoader.js';

// Load entire fixture file
const fixtures = loadFixture('creative-fixtures');

// Get specific fixture
const imageCreative = getCreativeFixture('validCreatives.imageCreative');
```

#### Get Creative Files
```javascript
import { getCreativeFilePath, listCreativeFiles } from '../utils/testDataLoader.js';

// Get specific file path
const imagePath = getCreativeFilePath('images', 'test-banner-300x250.jpg');

// List all files of a type
const allImages = listCreativeFiles('images');
```

#### Create Test Data
```javascript
import { 
  createTestDataWithTimestamp,
  createMultipleTestData,
  mergeFixtureData 
} from '../utils/testDataLoader.js';

// Create with timestamp
const creative = createTestDataWithTimestamp({
  name: 'Test Creative',
  type: 'image'
});

// Create multiple
const creatives = createMultipleTestData({
  name: 'Bulk Creative',
  type: 'image'
}, 5);

// Merge with overrides
const custom = mergeFixtureData('validCreatives.imageCreative', {
  name: 'Custom Name'
});
```

### Method 2: Using Test Data Builders

The `testData.js` file provides factory methods for creating test data.

```javascript
import { CreativeDataBuilder } from '../utils/testData.js';

// Create single creative
const creative = CreativeDataBuilder.createImageCreative({
  name: 'Test Creative'
});

// Create bulk creatives
const creatives = CreativeDataBuilder.createBulkCreatives(5, 'image');

// Create with special characters
const special = CreativeDataBuilder.createCreativeWithSpecialChars();
```

### Method 3: Direct Fixture Import

Import fixtures directly in tests.

```javascript
import fixtures from '../testdata/fixtures/creative-fixtures.json';

test('Use fixture data', async ({ page }) => {
  const creative = fixtures.validCreatives.imageCreative;
  // Use in test
});
```

## 🚀 Complete Examples

### Example 1: Upload Creative File

```javascript
import { test } from '@playwright/test';
import { getCreativeFilePath } from '../utils/testDataLoader.js';

test('Upload creative image', async ({ page }) => {
  // Get file path
  const imagePath = getCreativeFilePath('images', 'test-banner-300x250.jpg');
  
  // Upload file
  await page.locator('input[type="file"]').setInputFiles(imagePath);
  
  // Verify upload
  await expect(page.getByText(/uploaded|success/i)).toBeVisible();
});
```

### Example 2: Create Creative with Fixture Data

```javascript
import { test } from '@playwright/test';
import { getCreativeFixture, createTestDataWithTimestamp } from '../utils/testDataLoader.js';

test('Create creative with fixture', async ({ page }) => {
  // Get fixture data
  const baseData = getCreativeFixture('validCreatives.imageCreative');
  
  // Add timestamp to make unique
  const creative = createTestDataWithTimestamp(baseData);
  
  // Fill form
  await page.getByLabel(/name/i).fill(creative.name);
  await page.getByLabel(/type/i).selectOption(creative.type);
  await page.getByLabel(/description/i).fill(creative.description);
  
  // Submit
  await page.getByRole('button', { name: /create/i }).click();
});
```

### Example 3: Bulk Create with Test Data

```javascript
import { test } from '@playwright/test';
import { createMultipleTestData } from '../utils/testDataLoader.js';

test('Bulk create creatives', async ({ page }) => {
  // Create multiple test data items
  const creatives = createMultipleTestData({
    name: 'Bulk Creative',
    type: 'image',
    description: 'Bulk test creative'
  }, 3);
  
  // Create each creative
  for (const creative of creatives) {
    await page.getByRole('button', { name: /add new/i }).click();
    await page.getByLabel(/name/i).fill(creative.name);
    await page.getByLabel(/type/i).selectOption(creative.type);
    await page.getByRole('button', { name: /create/i }).click();
  }
});
```

### Example 4: Test with Invalid Data

```javascript
import { test } from '@playwright/test';
import { getCreativeFixture } from '../utils/testDataLoader.js';

test('Reject invalid creative', async ({ page }) => {
  // Get invalid fixture
  const invalid = getCreativeFixture('invalidCreatives.emptyName');
  
  // Try to create
  await page.getByRole('button', { name: /add new/i }).click();
  await page.getByLabel(/name/i).fill(invalid.name);
  await page.getByLabel(/type/i).selectOption(invalid.type);
  await page.getByRole('button', { name: /create/i }).click();
  
  // Verify error
  await expect(page.getByText(/required|invalid/i)).toBeVisible();
});
```

### Example 5: Search Test Data

```javascript
import { test } from '@playwright/test';
import { getCreativeFixture } from '../utils/testDataLoader.js';

test('Search for creative', async ({ page }) => {
  // Get search test data
  const searchData = getCreativeFixture('searchTestData.byName.0');
  
  // Search
  await page.getByPlaceholder(/search/i).fill(searchData.searchTerm);
  await page.waitForTimeout(500);
  
  // Verify results
  await expect(page.getByText(searchData.name)).toBeVisible();
});
```

## 📋 Fixture Structure

### Valid Creatives
```json
{
  "validCreatives": {
    "imageCreative": {
      "name": "Test Image Creative",
      "type": "image",
      "description": "A test image creative"
    },
    "videoCreative": { ... },
    "audioCreative": { ... },
    "htmlCreative": { ... },
    "nativeCreative": { ... }
  }
}
```

### Invalid Creatives
```json
{
  "invalidCreatives": {
    "emptyName": {
      "name": "",
      "type": "image"
    },
    "invalidType": {
      "name": "Test",
      "type": "invalid-type"
    }
  }
}
```

### Edge Cases
```json
{
  "edgeCaseCreatives": {
    "specialCharacters": { ... },
    "unicodeCharacters": { ... },
    "longName": { ... },
    "veryLongName": { ... }
  }
}
```

## 🔧 Test Data Loader API

### Loading Data

| Function | Purpose | Example |
|----------|---------|---------|
| `loadFixture(name)` | Load entire fixture file | `loadFixture('creative-fixtures')` |
| `getCreativeFixture(key)` | Get specific fixture | `getCreativeFixture('validCreatives.imageCreative')` |
| `getAllValidCreatives()` | Get all valid creatives | `getAllValidCreatives()` |
| `getAllInvalidCreatives()` | Get all invalid creatives | `getAllInvalidCreatives()` |
| `getAllEdgeCaseCreatives()` | Get all edge cases | `getAllEdgeCaseCreatives()` |

### File Operations

| Function | Purpose | Example |
|----------|---------|---------|
| `getCreativeFilePath(type, filename)` | Get file path | `getCreativeFilePath('images', 'test.jpg')` |
| `listCreativeFiles(type)` | List files of type | `listCreativeFiles('images')` |
| `getAllCreativeFiles()` | Get all files | `getAllCreativeFiles()` |
| `creativeFileExists(type, filename)` | Check if file exists | `creativeFileExists('images', 'test.jpg')` |

### Data Creation

| Function | Purpose | Example |
|----------|---------|---------|
| `createTestDataWithTimestamp(data)` | Add timestamp | `createTestDataWithTimestamp(creative)` |
| `createMultipleTestData(data, count)` | Create multiple | `createMultipleTestData(creative, 5)` |
| `mergeFixtureData(key, overrides)` | Merge with overrides | `mergeFixtureData('validCreatives.imageCreative', {name: 'Custom'})` |
| `getRandomCreativeFixture()` | Get random fixture | `getRandomCreativeFixture()` |
| `getRandomCreativeFile(type)` | Get random file | `getRandomCreativeFile('images')` |

### Statistics

| Function | Purpose | Example |
|----------|---------|---------|
| `getFixtureStats()` | Get fixture counts | `getFixtureStats()` |
| `getCreativeFileStats()` | Get file counts | `getCreativeFileStats()` |

## 📝 Adding New Test Data

### Step 1: Add Creative Files
```bash
# Copy files to appropriate folder
cp ~/Downloads/image.jpg tests/iqm-site/testdata/creatives/images/
cp ~/Downloads/video.mp4 tests/iqm-site/testdata/creatives/videos/
```

### Step 2: Update Fixtures
Edit `tests/iqm-site/testdata/fixtures/creative-fixtures.json`:
```json
{
  "validCreatives": {
    "myNewCreative": {
      "name": "My New Creative",
      "type": "image",
      "description": "My new test creative"
    }
  }
}
```

### Step 3: Use in Tests
```javascript
import { getCreativeFixture, getCreativeFilePath } from '../utils/testDataLoader.js';

test('Use new test data', async ({ page }) => {
  const creative = getCreativeFixture('validCreatives.myNewCreative');
  const filePath = getCreativeFilePath('images', 'image.jpg');
  
  // Use in test
});
```

## ✅ Best Practices

### 1. Use Fixtures for Structured Data
```javascript
// Good - Use fixtures
const creative = getCreativeFixture('validCreatives.imageCreative');

// Avoid - Hardcoded data
const creative = { name: 'Test', type: 'image' };
```

### 2. Add Timestamps for Uniqueness
```javascript
// Good - Unique data
const creative = createTestDataWithTimestamp(baseData);

// Avoid - Duplicate data
const creative = baseData;
```

### 3. Use Descriptive File Names
```
// Good
test-banner-300x250.jpg
test-video-30sec.mp4

// Avoid
image1.jpg
video.mp4
```

### 4. Organize by Type
```
creatives/
├── images/
├── videos/
├── audio/
└── html/
```

### 5. Document Fixtures
```json
{
  "imageCreative": {
    "name": "Test Image",
    "type": "image",
    "_comment": "Used for image upload tests"
  }
}
```

## 🔗 Related Files

- **Test Data Loader:** `tests/iqm-site/utils/testDataLoader.js`
- **Test Data Builders:** `tests/iqm-site/utils/testData.js`
- **Creative Fixtures:** `tests/iqm-site/testdata/fixtures/creative-fixtures.json`
- **Test Data README:** `tests/iqm-site/testdata/README.md`

## 📞 Quick Reference

### Load Fixture
```javascript
import { getCreativeFixture } from '../utils/testDataLoader.js';
const creative = getCreativeFixture('validCreatives.imageCreative');
```

### Get File Path
```javascript
import { getCreativeFilePath } from '../utils/testDataLoader.js';
const path = getCreativeFilePath('images', 'test.jpg');
```

### Create with Timestamp
```javascript
import { createTestDataWithTimestamp } from '../utils/testDataLoader.js';
const creative = createTestDataWithTimestamp(baseData);
```

### Create Multiple
```javascript
import { createMultipleTestData } from '../utils/testDataLoader.js';
const creatives = createMultipleTestData(baseData, 5);
```

---

**Last Updated:** April 23, 2026
**Framework Version:** 2.0.0
**Status:** ✅ Ready to Use
