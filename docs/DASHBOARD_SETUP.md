# 📊 Test Runner Dashboard - Complete Setup Guide

## Overview

The Test Runner Dashboard is a modern web-based interface for running Playwright tests and viewing comprehensive reports with screenshots, videos, and logs.

### What's Included

1. **test-runner-ui.html** - Frontend UI (single HTML file, no build needed)
2. **test-runner-server.js** - Basic backend server
3. **test-runner-enhanced.js** - Enhanced server with better logging and error handling
4. **TEST_RUNNER_GUIDE.md** - Detailed documentation
5. **QUICK_START_DASHBOARD.md** - Quick start guide

## Prerequisites

- Node.js 14+ installed
- npm or yarn
- Playwright tests in `tests/specs/` directory
- Test files must end with `.spec.js`

## Installation

### 1. Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web server
- `ws` - WebSocket for real-time updates
- `nodemon` - Development server (optional)

### 2. Verify Playwright Config

Ensure `playwright.iqm.config.js` has artifact capture enabled:

```javascript
use: {
  screenshot: 'only-on-failure',  // Capture screenshots on failure
  video: 'retain-on-failure',     // Record video on failure
  trace: 'retain-on-failure',     // Capture trace on failure
}
```

### 3. Create Test Results Directory

```bash
mkdir -p test-results
```

## Running the Dashboard

### Option 1: Basic Server (Recommended for Production)

```bash
npm run dashboard
```

Output:
```
🎭 Playwright Test Runner Dashboard
📍 Open http://localhost:3000 in your browser

Server running on port 3000
```

### Option 2: Enhanced Server (Recommended for Development)

```bash
node test-runner-enhanced.js
```

Features:
- Better logging
- Execution history
- Error tracking
- Health check endpoint

### Option 3: Development Mode with Auto-Reload

```bash
npm run dashboard:dev
```

Uses `nodemon` to restart server on file changes.

### Option 4: Custom Port

```bash
PORT=8080 npm run dashboard
```

## Accessing the Dashboard

Open your browser and navigate to:
```
http://localhost:3000
```

## Using the Dashboard

### Main Interface

```
┌─────────────────────────────────────────────────────────┐
│  🎭 Playwright Test Runner Dashboard                    │
│  Run tests, view reports, and analyze results           │
└─────────────────────────────────────────────────────────┘

┌──────────────────┬──────────────────────────────────────┐
│   SIDEBAR        │         MAIN PANEL                   │
│                  │                                      │
│ Test Suites      │ ▶ Run All Tests                      │
│ ─────────────    │ ⏹ Stop Tests                         │
│ ✅ login         │ 🗑 Clear Results                     │
│ ❌ creative      │                                      │
│ ⏳ dashboard     │ Filter: [All Tests ▼]               │
│                  │                                      │
│ [Run All Tests]  │ ┌──────────────────────────────────┐│
│ [Stop Tests]     │ │ Test Details                     ││
│ [Clear Results]  │ │                                  ││
│                  │ │ Status: ✅ PASSED                ││
│ Filter:          │ │ Duration: 5000ms                 ││
│ [All Tests ▼]    │ │ File: login.spec.js              ││
│                  │ │                                  ││
│                  │ │ [Overview] [Screenshots] [Video] ││
│                  │ │ [Logs]                           ││
│                  │ └──────────────────────────────────┘│
└──────────────────┴──────────────────────────────────────┘
```

### Running Tests

1. **View Available Tests**
   - All test files from `tests/specs/` appear in the sidebar
   - Each test shows its current status

2. **Run All Tests**
   - Click "▶ Run All Tests" button
   - Watch real-time progress
   - Status updates as tests complete

3. **Run Individual Test**
   - Click on a test name in the sidebar
   - Test details appear in the main panel

4. **Stop Tests**
   - Click "⏹ Stop Tests" button (appears while running)
   - Current test execution stops

5. **Clear Results**
   - Click "🗑 Clear Results" to reset all results

### Viewing Results

#### Overview Tab
- Test status (Passed/Failed)
- Execution duration in milliseconds
- Error messages (if any)
- Test file path

#### Screenshots Tab
- Gallery of captured screenshots
- Click any screenshot to view full size
- Automatically captured on test failure

#### Video Tab
- Full test execution video
- Playback controls
- Recorded on test failure

#### Logs Tab
- Detailed execution logs
- Color-coded by level:
  - 🔴 Error (red)
  - 🟡 Warning (yellow)
  - 🟢 Success (green)
  - 🔵 Info (blue)

### Filtering Tests

Use the "Filter by Status" dropdown:
- **All Tests** - Show all available tests
- **Passed** - Show only passed tests
- **Failed** - Show only failed tests
- **Running** - Show currently running tests

## API Reference

### REST Endpoints

#### GET `/api/tests`
Get list of available tests.

```bash
curl http://localhost:3000/api/tests
```

#### POST `/api/run-tests`
Start test execution.

```bash
curl -X POST http://localhost:3000/api/run-tests \
  -H "Content-Type: application/json" \
  -d '{"tests": ["login", "creative-management"]}'
```

#### POST `/api/stop-tests`
Stop running tests.

```bash
curl -X POST http://localhost:3000/api/stop-tests
```

#### GET `/health`
Health check endpoint.

```bash
curl http://localhost:3000/health
```

## Troubleshooting

### Server Won't Start

**Error: Port already in use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=8080 npm run dashboard
```

**Error: Module not found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Tests Not Appearing

1. Check test files are in `tests/specs/` directory
2. Files must end with `.spec.js`
3. Restart the server
4. Check browser console for errors (F12)

### No Screenshots/Videos

1. Verify `playwright.iqm.config.js` has:
   ```javascript
   screenshot: 'only-on-failure',
   video: 'retain-on-failure',
   ```

2. Ensure tests are failing (artifacts captured on failure by default)

3. Check `test-results/` directory exists:
   ```bash
   mkdir -p test-results
   ```

### WebSocket Connection Failed

1. Check server is running: `curl http://localhost:3000/health`
2. Check firewall allows WebSocket connections
3. Check browser console for errors (F12)
4. Try different port: `PORT=8080 npm run dashboard`

### Tests Hang or Timeout

1. Increase timeout in `playwright.iqm.config.js`:
   ```javascript
   timeout: 120 * 1000  // 2 minutes
   ```

2. Check test logs for specific errors

3. Verify test selectors are correct

## Performance Optimization

### Parallel Execution

```javascript
// In playwright.iqm.config.js
workers: 4  // Run 4 tests in parallel
```

### Selective Screenshots

```javascript
// Only on failure (default)
screenshot: 'only-on-failure'

// Or on all tests
screenshot: 'on'
```

### Selective Video

```javascript
// Only on failure (default)
video: 'retain-on-failure'

// Or on all tests
video: 'on'
```

### Reduce Retries

```javascript
// In playwright.iqm.config.js
retries: 0  // No retries (faster)
```

## File Structure

```
.
├── test-runner-ui.html              # Frontend UI
├── test-runner-server.js            # Basic backend
├── test-runner-enhanced.js          # Enhanced backend
├── package.json                     # Dependencies
├── playwright.iqm.config.js         # Playwright config
├── tests/
│   ├── specs/                       # Test files
│   │   ├── login.spec.js
│   │   ├── creative-management.spec.js
│   │   └── ...
│   └── iqm-site/
│       ├── pages/                   # Page objects
│       ├── fixtures/                # Test fixtures
│       └── testdata/                # Test data
└── test-results/
    ├── results.json                 # Test results
    └── playwright-report/           # HTML report
```

## Support & Resources

- 📖 [Playwright Documentation](https://playwright.dev)
- 🐛 [Report Issues](https://github.com/microsoft/playwright/issues)
- 💬 [Playwright Community](https://discord.gg/playwright)

## License

ISC

---

**Ready to run tests? Start with:**
```bash
npm run dashboard
```

Then open http://localhost:3000 in your browser! 🎉
