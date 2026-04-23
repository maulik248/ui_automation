# Directory Structure - Framework v2.0.0

## 📁 Project Organization

The project is now organized into clear, logical folders for better maintainability and navigation.

```
project-root/
├── docs/                                    # 📚 All Documentation
│   ├── START_HERE.md                       # Entry point
│   ├── QUICK_START_TESTING.md              # Quick start guide
│   ├── QUICK_REFERENCE.md                  # Command reference
│   ├── README_TESTING.md                   # Main testing guide
│   ├── TEST_SUITE_GUIDE.md                 # Full test suite documentation
│   ├── DEVELOPER_CHECKLIST.md              # Development checklist
│   ├── IMPLEMENTATION_SUMMARY.md           # Implementation details
│   ├── IMPLEMENTATION_COMPLETE.md          # Completion summary
│   ├── FRAMEWORK_OVERVIEW.txt              # Visual overview
│   ├── DIRECTORY_STRUCTURE.md              # This file
│   ├── CREATIVE_APP_DISCOVERY_SUMMARY.md   # App discovery findings
│   ├── CREATIVE_APP_TEST_CASES.md          # Test case inventory
│   ├── TEST_CASES_ANALYSIS.md              # Test analysis
│   ├── PLAYWRIGHT-AI-GUIDE.md              # Playwright AI features
│   ├── INDEX.md                            # Index of resources
│   └── TESTING_SUMMARY.txt                 # Testing summary
│
├── tests/                                   # 🧪 All Tests
│   ├── specs/                              # Test Specifications
│   │   ├── login.spec.js                   # Login tests
│   │   ├── dashboard.spec.js               # Dashboard tests
│   │   ├── explore-dashboard.spec.js       # Dashboard exploration
│   │   ├── creative-exploration.spec.js    # Creative app exploration
│   │   ├── creative-management.spec.js     # CRUD operations
│   │   └── accessibility.spec.js           # Accessibility tests
│   │
│   └── iqm-site/                           # Test Infrastructure
│       ├── pages/                          # Page Object Models
│       │   └── CreativePage.js             # Creative app POM
│       ├── fixtures/                       # Test Fixtures
│       │   └── auth.fixture.js             # Authentication fixture
│       └── utils/                          # Test Utilities
│           ├── assertions.js               # Custom assertions (40+)
│           └── testData.js                 # Test data builders (30+)
│
├── utils/                                   # 🛠️ Shared Utilities
│   └── credentials.js                      # Credential management
│
├── .github/                                 # 🔄 CI/CD
│   └── workflows/
│       └── test.yml                        # GitHub Actions workflow
│
├── playwright-report/                       # 📊 Test Reports
│   └── index.html                          # HTML test report
│
├── test-results/                            # 📈 Test Results
│   ├── .last-run.json                      # Last run results
│   └── results.json                        # JSON test results
│
├── playwright.iqm.config.js                # ⚙️ Playwright Configuration
├── package.json                            # 📦 Dependencies & Scripts
├── package-lock.json                       # 🔒 Dependency Lock
├── .env.example                            # 🔐 Environment Template
├── .gitignore                              # 📝 Git Ignore Rules
└── README.md                               # 📖 Project README (if exists)
```

## 📚 Documentation Folder (`docs/`)

All markdown and text documentation files are organized here for easy access.

### Getting Started
- **START_HERE.md** - Begin here! Quick overview and setup
- **QUICK_START_TESTING.md** - 5-minute quick start guide
- **QUICK_REFERENCE.md** - Command and feature reference

### Main Guides
- **README_TESTING.md** - Comprehensive testing guide
- **TEST_SUITE_GUIDE.md** - Full test suite documentation
- **DEVELOPER_CHECKLIST.md** - Development best practices

### Implementation Details
- **IMPLEMENTATION_SUMMARY.md** - Detailed implementation info
- **IMPLEMENTATION_COMPLETE.md** - Completion summary
- **FRAMEWORK_OVERVIEW.txt** - Visual framework overview

### Reference Materials
- **CREATIVE_APP_DISCOVERY_SUMMARY.md** - App feature discovery
- **CREATIVE_APP_TEST_CASES.md** - Test case inventory
- **TEST_CASES_ANALYSIS.md** - Test analysis and strategy
- **PLAYWRIGHT-AI-GUIDE.md** - Playwright AI features
- **INDEX.md** - Resource index
- **TESTING_SUMMARY.txt** - Testing summary

## 🧪 Tests Folder (`tests/`)

### Specs Folder (`tests/specs/`)
Contains all test specification files (.spec.js).

**Test Files:**
- `login.spec.js` - Login functionality tests
- `dashboard.spec.js` - Dashboard feature tests
- `explore-dashboard.spec.js` - Dashboard exploration
- `creative-exploration.spec.js` - Creative app exploration
- `creative-management.spec.js` - CRUD operation tests
- `accessibility.spec.js` - WCAG 2.1 accessibility tests

### IQM-Site Folder (`tests/iqm-site/`)
Contains test infrastructure and utilities.

**Pages Folder (`tests/iqm-site/pages/`)**
- `CreativePage.js` - Page Object Model for Creative App (30+ methods)

**Fixtures Folder (`tests/iqm-site/fixtures/`)**
- `auth.fixture.js` - Authentication fixture for reusable login

**Utils Folder (`tests/iqm-site/utils/`)**
- `assertions.js` - Custom assertions (40+ helpers)
- `testData.js` - Test data builders (30+ methods)

## 🛠️ Utilities Folder (`utils/`)

Shared utilities used across the project.

- `credentials.js` - Credential management and loading

## 🔄 CI/CD Folder (`.github/workflows/`)

GitHub Actions workflows for automated testing.

- `test.yml` - Main test workflow (runs on push/PR)

## 📊 Reports & Results

### Playwright Report (`playwright-report/`)
- `index.html` - HTML test report (generated after test runs)

### Test Results (`test-results/`)
- `.last-run.json` - Last test run metadata
- `results.json` - JSON formatted test results

## ⚙️ Configuration Files

### Root Level
- `playwright.iqm.config.js` - Playwright test configuration
- `package.json` - Project dependencies and npm scripts
- `package-lock.json` - Locked dependency versions
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore rules

## 📋 File Organization Summary

| Type | Location | Count |
|------|----------|-------|
| Documentation | `docs/` | 15 files |
| Test Specs | `tests/specs/` | 6 files |
| Page Objects | `tests/iqm-site/pages/` | 1 file |
| Fixtures | `tests/iqm-site/fixtures/` | 1 file |
| Utilities | `tests/iqm-site/utils/` | 2 files |
| Shared Utils | `utils/` | 1 file |
| Config | Root | 4 files |

## 🚀 Quick Navigation

### I want to...

#### Get Started
→ Read `docs/START_HERE.md`

#### Run Tests
→ Check `docs/QUICK_REFERENCE.md` for commands

#### Write a Test
→ Read `docs/TEST_SUITE_GUIDE.md`

#### Understand Architecture
→ Read `docs/IMPLEMENTATION_SUMMARY.md`

#### Find Test Cases
→ Check `docs/CREATIVE_APP_TEST_CASES.md`

#### Learn Best Practices
→ Read `docs/DEVELOPER_CHECKLIST.md`

#### Understand Playwright AI
→ Read `docs/PLAYWRIGHT-AI-GUIDE.md`

#### View Framework Overview
→ Read `docs/FRAMEWORK_OVERVIEW.txt`

## 📝 Import Paths

### From Test Specs
```javascript
// Import from Page Objects
import { CreativePage } from '../iqm-site/pages/CreativePage.js';

// Import from Fixtures
import { test } from '../iqm-site/fixtures/auth.fixture.js';

// Import from Assertions
import { expectCreativeVisible } from '../iqm-site/utils/assertions.js';

// Import from Test Data
import { CreativeDataBuilder } from '../iqm-site/utils/testData.js';

// Import from Shared Utils
import { getIQMCredentials } from '../utils/credentials.js';
```

### From Test Infrastructure
```javascript
// From pages/CreativePage.js
import { getIQMCredentials } from '../../utils/credentials.js';

// From fixtures/auth.fixture.js
import { getIQMCredentials } from '../../utils/credentials.js';

// From utils/assertions.js
import { expect } from '@playwright/test';

// From utils/testData.js
// No external imports needed
```

## 🎯 Benefits of This Structure

### Organization
✅ Clear separation of concerns
✅ Easy to find files
✅ Logical grouping

### Maintainability
✅ Documentation centralized
✅ Tests organized by type
✅ Infrastructure separated

### Scalability
✅ Easy to add new tests
✅ Easy to add new docs
✅ Easy to extend utilities

### Navigation
✅ Quick access to docs
✅ Clear test locations
✅ Obvious import paths

## 📊 Statistics

| Category | Count |
|----------|-------|
| Documentation Files | 15 |
| Test Spec Files | 6 |
| Page Objects | 1 |
| Fixtures | 1 |
| Utility Files | 3 |
| Configuration Files | 4 |
| **Total** | **30** |

## 🔄 Migration Notes

### What Changed
- All `.md` files moved to `docs/` folder
- All `.spec.js` files moved to `tests/specs/` folder
- Test infrastructure remains in `tests/iqm-site/`
- Import paths updated in all spec files
- Playwright config updated to point to new test directory

### What Stayed the Same
- Page Object Model structure
- Fixtures and utilities
- Shared utilities
- CI/CD configuration
- Environment setup

## ✅ Verification

### Verify Structure
```bash
# Check docs folder
ls -la docs/

# Check tests/specs folder
ls -la tests/specs/

# Check tests/iqm-site folder
ls -la tests/iqm-site/
```

### Verify Tests Run
```bash
# Run all tests
npm run test:iqm

# Run specific test
npm run test:iqm -- -g "test name"

# View report
npm run report
```

## 📞 Quick Links

- **Getting Started:** `docs/START_HERE.md`
- **Commands:** `docs/QUICK_REFERENCE.md`
- **Test Guide:** `docs/TEST_SUITE_GUIDE.md`
- **Development:** `docs/DEVELOPER_CHECKLIST.md`

---

**Last Updated:** April 23, 2026
**Framework Version:** 2.0.0
**Status:** ✅ Reorganized
