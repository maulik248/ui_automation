# Test Data Setup Guide

Complete setup guide for organizing and using test data in your Playwright tests.

## 📁 Where to Add Test Data

### Creative Files Location
```
tests/iqm-site/testdata/creatives/
├── images/          ← Add .jpg, .png, .gif files here
├── videos/          ← Add .mp4, .webm files here
├── audio/           ← Add .mp3, .wav files here
└── html/            ← Add .html files here
```

### Fixtures Location
```
tests/iqm-site/testdata/fixtures/
└── creative-fixtures.json    ← Edit to add test data
```

### Mock Data Location
```
tests/iqm-site/testdata/mocks/
└── (add mock API responses here)
```

## 🚀 Quick Setup

### Step 1: Add Creative Files

Copy your creative files to the appropriate folder:

```bash
# Add images
cp ~/Downloads/banner.jpg tests/iqm-site/testdata/creatives/images/
cp ~/Downloads/photo.png tests/iqm-site/testdata/creatives/images/

# Add videos
cp ~/Downloads/video.mp4 tests/iqm-site/testdata/creatives/videos/

# Add audio
cp ~/Downloads/audio.mp3 tests/iqm-site/testdata/creatives/audio/

# Add HTML
cp ~/Downloads/creative.html tests/iqm-site/testdata/creatives/html/
```

### Step 2: Update Fixtures (Optional)

Edit `tests/iqm-site/testdata/fixtures/creative-fixtures.json` to add your test data:

```json
{
  "validCreatives": {
    "myCustomCreative": {
      "name": "My Custom Creative",
      "type": "image",
      "description": "My custom test creative"
    }
  }
}
```

### Step 3: Use in Tests

```javascript
import { getCreativeFixture, getCreativeFilePath } from '../utils/testDataLoader.js';

test('Use test data', async ({ page }) => {
  // Get fixture data
  const creative = getCreativeFixture('validCreatives.myCustomCreative');
  
  // Get file path
  const imagePath = getCreativeFilePath('images', 'banner.jpg');
  
  // Use in test
  await page.locator('input[type="file"]').setInputFiles(imagePath);
});
```

## 📋 File Organization

### Naming Convention for Creative Files

```
{type}-{description}-{size/duration}.{extension}

Examples:
- test-banner-300x250.jpg
- test-image-1920x1080.png
- test-video-30sec.mp4
- test-audio-15sec.mp3
- test-html-simple.html
```

### Naming Convention for Fixtures

```
{entity}-fixtures.json

Examples:
- creative-fixtures.json
- user-fixtures.json
- campaign-fixtures.json
```

## 🎯 Common Tasks

### Add Image Files

```bash
mkdir -p tests/iqm-site/testdata/creatives/images
cp ~/path/to/image.jpg tests/iqm-site/testdata/creatives/images/test-image.jpg
```

### Add Video Files

```bash
mkdir -p tests/iqm-site/testdata/creatives/videos
cp ~/path/to/video.mp4 tests/iqm-site/testdata/creatives/videos/test-video.mp4
```

### Add Audio Files

```bash
mkdir -p tests/iqm-site/testdata/creatives/audio
cp ~/path/to/audio.mp3 tests/iqm-site/testdata/creatives/audio/test-audio.mp3
```

### Add HTML Files

```bash
mkdir -p tests/iqm-site/testdata/creatives/html
cp ~/path/to/creative.html tests/iqm-site/testdata/creatives/html/test-creative.html
```

### List All Creative Files

```bash
# List all files
find tests/iqm-site/testdata/creatives -type f

# List images only
ls tests/iqm-site/testdata/creatives/images/

# List videos only
ls tests/iqm-site/testdata/creatives/videos/
```

## 💡 Usage Examples

### Example 1: Upload Image

```javascript
import { test } from '@playwright/test';
import { getCreativeFilePath } from '../utils/testDataLoader.js';

test('Upload image', async ({ page }) => {
  const imagePath = getCreativeFilePath('images', 'test-banner-300x250.jpg');
  await page.locator('input[type="file"]').setInputFiles(imagePath);
});
```

### Example 2: Use Fixture Data

```javascript
import { test } from '@playwright/test';
import { getCreativeFixture } from '../utils/testDataLoader.js';

test('Create creative', async ({ page }) => {
  const creative = getCreativeFixture('validCreatives.imageCreative');
  
  await page.getByLabel(/name/i).fill(creative.name);
  await page.getByLabel(/type/i).selectOption(creative.type);
  await page.getByRole('button', { name: /create/i }).click();
});
```

### Example 3: Create Multiple Test Data

```javascript
import { test } from '@playwright/test';
import { createMultipleTestData } from '../utils/testDataLoader.js';

test('Bulk create', async ({ page }) => {
  const creatives = createMultipleTestData({
    name: 'Bulk Creative',
    type: 'image'
  }, 5);
  
  for (const creative of creatives) {
    // Create each creative
  }
});
```

### Example 4: Add Timestamp for Uniqueness

```javascript
import { test } from '@playwright/test';
import { createTestDataWithTimestamp } from '../utils/testDataLoader.js';

test('Create unique creative', async ({ page }) => {
  const creative = createTestDataWithTimestamp({
    name: 'Test Creative',
    type: 'image'
  });
  
  // creative.name will be: "Test Creative 1713897600000"
});
```

## 📊 Test Data Loader API

### Load Fixture
```javascript
import { loadFixture } from '../utils/testDataLoader.js';
const fixtures = loadFixture('creative-fixtures');
```

### Get Specific Fixture
```javascript
import { getCreativeFixture } from '../utils/testDataLoader.js';
const creative = getCreativeFixture('validCreatives.imageCreative');
```

### Get File Path
```javascript
import { getCreativeFilePath } from '../utils/testDataLoader.js';
const path = getCreativeFilePath('images', 'test.jpg');
```

### List Files
```javascript
import { listCreativeFiles } from '../utils/testDataLoader.js';
const images = listCreativeFiles('images');
```

### Check File Exists
```javascript
import { creativeFileExists } from '../utils/testDataLoader.js';
const exists = creativeFileExists('images', 'test.jpg');
```

### Get Statistics
```javascript
import { getFixtureStats, getCreativeFileStats } from '../utils/testDataLoader.js';
const fixtureStats = getFixtureStats();
const fileStats = getCreativeFileStats();
```

## ✅ Checklist

- [ ] Created `tests/iqm-site/testdata/` folder
- [ ] Created subdirectories for creatives (images, videos, audio, html)
- [ ] Created fixtures folder
- [ ] Created mocks folder
- [ ] Added creative files to appropriate folders
- [ ] Updated `creative-fixtures.json` with your test data
- [ ] Imported `testDataLoader` in tests
- [ ] Used `getCreativeFixture()` to load fixtures
- [ ] Used `getCreativeFilePath()` to get file paths
- [ ] Verified tests run successfully

## 🔗 Related Files

- **Test Data Loader:** `tests/iqm-site/utils/testDataLoader.js`
- **Creative Fixtures:** `tests/iqm-site/testdata/fixtures/creative-fixtures.json`
- **Test Data README:** `tests/iqm-site/testdata/README.md`
- **Full Guide:** `docs/TEST_DATA_GUIDE.md`

## 📞 Quick Reference

### Add Files
```bash
cp ~/path/to/file tests/iqm-site/testdata/creatives/{type}/
```

### Load Fixture
```javascript
import { getCreativeFixture } from '../utils/testDataLoader.js';
const data = getCreativeFixture('validCreatives.imageCreative');
```

### Get File Path
```javascript
import { getCreativeFilePath } from '../utils/testDataLoader.js';
const path = getCreativeFilePath('images', 'test.jpg');
```

### Use in Test
```javascript
await page.locator('input[type="file"]').setInputFiles(path);
```

## 🎓 Best Practices

1. **Use Descriptive Names**
   - ✅ `test-banner-300x250.jpg`
   - ❌ `image1.jpg`

2. **Organize by Type**
   - Keep images in `images/`
   - Keep videos in `videos/`
   - Keep audio in `audio/`
   - Keep HTML in `html/`

3. **Keep Files Small**
   - Use compressed images
   - Use short video clips (5-30 seconds)
   - Keep file sizes under 5MB

4. **Use Fixtures for Structured Data**
   - Store test scenarios in JSON
   - Use fixtures for valid/invalid/edge cases
   - Document fixtures with comments

5. **Add Timestamps for Uniqueness**
   - Use `createTestDataWithTimestamp()` for unique names
   - Prevents conflicts in tests

## 📚 Documentation

- **Setup Guide:** This file
- **Full Guide:** `docs/TEST_DATA_GUIDE.md`
- **Test Data README:** `tests/iqm-site/testdata/README.md`

---

**Last Updated:** April 23, 2026
**Framework Version:** 2.0.0
**Status:** ✅ Ready to Use
