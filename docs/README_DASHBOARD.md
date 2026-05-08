# 🎭 Playwright Test Runner Dashboard

A modern, web-based UI for running Playwright tests and viewing comprehensive reports with screenshots, videos, and logs in real-time.

## 🚀 Quick Start (2 Minutes)

### 1. Start the Server
```bash
npm run dashboard
```

### 2. Open in Browser
```
http://localhost:3000
```

### 3. Run Tests
Click "▶ Run All Tests" and watch the magic happen! ✨

## 📋 What's Included

### Frontend
- **test-runner-ui.html** - Beautiful, responsive web UI
  - Real-time test execution monitoring
  - Screenshot gallery with modal viewer
  - Video playback with controls
  - Color-coded logs
  - Test filtering and statistics
  - No build process needed

### Backend
- **test-runner-server.js** - Basic Express.js server
- **test-runner-enhanced.js** - Enhanced version with logging

### Documentation
- **QUICK_START_DASHBOARD.md** - Get started in 2 minutes
- **TEST_RUNNER_GUIDE.md** - Comprehensive feature guide
- **DASHBOARD_SETUP.md** - Complete setup and configuration
- **DASHBOARD_SUMMARY.md** - Architecture and overview

## ✨ Features

### Test Execution
- ✅ Run all tests or individual tests
- ✅ Real-time execution status
- ✅ Stop tests at any time
- ✅ Parallel test execution support

### Reporting
- 📸 Screenshot capture and gallery
- 🎬 Video recording playback
- 📝 Detailed execution logs
- 📊 Test statistics and summary
- 🔍 Filter tests by status

### User Experience
- 🎨 Modern, responsive design
- 🔄 Real-time WebSocket updates
- 📱 Mobile-friendly interface
- ⚡ Fast and lightweight
- 🌐 Cross-browser compatible

## 📦 Installation

### Prerequisites
- Node.js 14+
- npm or yarn
- Playwright tests in `tests/specs/` directory

### Setup
```bash
# Install dependencies
npm install

# Start the dashboard
npm run dashboard
```

## 🎯 Usage

### Running Tests

1. **Run All Tests**
   - Click "▶ Run All Tests" button
   - Watch real-time progress
   - View results as they complete

2. **Run Individual Test**
   - Click on a test name in the sidebar
   - View detailed results

3. **Stop Tests**
   - Click "⏹ Stop Tests" button
   - Current execution stops

4. **Clear Results**
   - Click "🗑 Clear Results"
   - Reset all test results

### Viewing Results

#### Overview Tab
- Test status (Passed/Failed)
- Execution duration
- Error messages
- Test file path

#### Screenshots Tab
- Gallery of captured images
- Click to view full size
- Automatically captured on failure

#### Video Tab
- Full test execution video
- Playback controls
- Recorded on failure

#### Logs Tab
- Detailed execution logs
- Color-coded by level
- Searchable content

### Filtering Tests

Use the "Filter by Status" dropdown:
- **All Tests** - Show all tests
- **Passed** - Show only passed
- **Failed** - Show only failed
- **Running** - Show currently running

## 🔧 Configuration

### Environment Variables

```bash
# Change port (default: 3000)
PORT=8080 npm run dashboard

# Enable debug logging
DEBUG=* npm run dashboard

# Run tests in headed mode
HEADED=true npm run dashboard
```

### Playwright Configuration

Edit `playwright.iqm.config.js`:

```javascript
use: {
  screenshot: 'only-on-failure',  // Capture screenshots
  video: 'retain-on-failure',     // Record videos
  trace: 'retain-on-failure',     // Capture traces
}
```

## 📡 API Reference

### REST Endpoints

```bash
# Get available tests
curl http://localhost:3000/api/tests

# Run tests
curl -X POST http://localhost:3000/api/run-tests \
  -H "Content-Type: application/json" \
  -d '{"tests": ["login", "creative-management"]}'

# Stop tests
curl -X POST http://localhost:3000/api/stop-tests

# Health check
curl http://localhost:3000/health
```

### WebSocket Events

Real-time updates via WebSocket on `ws://localhost:3000/ws`

**Events:**
- `test-start` - Tests started
- `test-result` - Individual test completed
- `test-complete` - All tests completed
- `test-error` - Error occurred

## 🐛 Troubleshooting

### Port Already in Use
```bash
PORT=8080 npm run dashboard
```

### Tests Not Appearing
1. Check files are in `tests/specs/` directory
2. Files must end with `.spec.js`
3. Restart server

### No Screenshots/Videos
1. Verify `playwright.iqm.config.js` has artifact settings
2. Ensure tests are failing (artifacts captured on failure)
3. Check `test-results/` directory exists

### WebSocket Connection Failed
1. Check server is running: `curl http://localhost:3000/health`
2. Check firewall settings
3. Try different port

## 📚 Documentation

- **[QUICK_START_DASHBOARD.md](./QUICK_START_DASHBOARD.md)** - Get started in 2 minutes
- **[TEST_RUNNER_GUIDE.md](./TEST_RUNNER_GUIDE.md)** - Comprehensive feature guide
- **[DASHBOARD_SETUP.md](./DASHBOARD_SETUP.md)** - Complete setup and configuration
- **[DASHBOARD_SUMMARY.md](./DASHBOARD_SUMMARY.md)** - Architecture and overview

## 🎨 Customization

### Add Custom Tabs
Edit `test-runner-ui.html` and add new tab:
```html
<div class="tab" onclick="switchTab('custom')">🔧 Custom</div>
```

### Add New API Endpoints
Edit `test-runner-server.js`:
```javascript
app.get('/api/custom', (req, res) => {
  res.json({ /* data */ });
});
```

### Modify Styling
Edit CSS in `test-runner-ui.html` to customize colors, fonts, layout.

## 🌐 Browser Support

- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Click test | Select and view details |
| Click screenshot | View full size |
| Escape | Close image modal |
| Click outside modal | Close modal |

## 📊 Project Structure

```
.
├── test-runner-ui.html              # Frontend UI
├── test-runner-server.js            # Basic backend
├── test-runner-enhanced.js          # Enhanced backend
├── package.json                     # Dependencies
├── playwright.iqm.config.js         # Playwright config
├── tests/specs/                     # Test files
├── test-results/                    # Test results (generated)
└── Documentation/
    ├── README_DASHBOARD.md          # This file
    ├── QUICK_START_DASHBOARD.md     # Quick start
    ├── TEST_RUNNER_GUIDE.md         # Feature guide
    ├── DASHBOARD_SETUP.md           # Setup guide
    └── DASHBOARD_SUMMARY.md         # Overview
```

## 🚀 Advanced Usage

### Development Mode with Auto-Reload
```bash
npm run dashboard:dev
```

### Run Specific Tests via API
```bash
curl -X POST http://localhost:3000/api/run-tests \
  -H "Content-Type: application/json" \
  -d '{"tests": ["login"]}'
```

### View Raw Results
```bash
cat test-results/results.json
```

### Generate HTML Report
```bash
npm run report
```

## 💡 Performance Tips

1. **Parallel Execution**: Set `workers: 4` in Playwright config
2. **Selective Screenshots**: Use `screenshot: 'only-on-failure'`
3. **Selective Video**: Use `video: 'retain-on-failure'`
4. **Reduce Retries**: Set `retries: 0` for faster execution

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev)
- [Express.js Documentation](https://expressjs.com)
- [WebSocket Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

## 📝 License

ISC

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Playwright documentation
3. Check test logs in the dashboard

---

## 🎉 Get Started Now!

```bash
# Install dependencies
npm install

# Start the dashboard
npm run dashboard

# Open in browser
# http://localhost:3000
```

**Happy Testing! 🎭**

---

**Version:** 1.0.0  
**Created:** May 6, 2026  
**Author:** Kiro AI Assistant
