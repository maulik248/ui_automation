# 🎭 Playwright Test Runner Dashboard - Complete Guide

A modern, web-based UI for running Playwright tests directly and viewing comprehensive reports with screenshots, videos, and logs.

## Features

✨ **Key Features:**
- 🎯 Run individual or all tests from a web interface
- 📊 Real-time test execution status and progress
- 📸 Screenshot capture and gallery view
- 🎬 Video recording playback
- 📝 Detailed logs and error messages
- 📋 Test statistics and summary
- 🔄 Real-time updates via WebSocket
- 🎨 Modern, responsive UI design
- 🔍 Filter tests by status (passed, failed, running)
- ⏹️ Stop running tests at any time

## Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server framework
- `ws` - WebSocket support for real-time updates
- `nodemon` - Development server with auto-reload (optional)

### 2. Verify Playwright Configuration

Ensure your `playwright.iqm.config.js` has the following settings for capturing artifacts:

```javascript
use: {
  screenshot: 'only-on-failure',  // or 'on' for all tests
  video: 'retain-on-failure',     // or 'on' for all tests
  trace: 'retain-on-failure',
}
```

## Usage

### Start the Dashboard Server

```bash
# Production mode
npm run dashboard

# Development mode with auto-reload
npm run dashboard:dev
```

The server will start on `http://localhost:3000`

### Access the Dashboard

Open your browser and navigate to:
```
http://localhost:3000
```

### Running Tests

1. **Run All Tests**: Click the "▶ Run All Tests" button in the sidebar
2. **Run Individual Test**: Click on a test name in the list
3. **Stop Tests**: Click the "⏹ Stop Tests" button (appears while tests are running)
4. **Clear Results**: Click "🗑 Clear Results" to reset all test results

### Viewing Results

#### Overview Tab
- Test status (Passed/Failed)
- Execution duration
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
- Color-coded by log level:
  - 🔴 Error (red)
  - 🟡 Warning (yellow)
  - 🟢 Success (green)
  - 🔵 Info (blue)

### Filtering Tests

Use the "Filter by Status" dropdown to view:
- **All Tests** - Show all available tests
- **Passed** - Show only passed tests
- **Failed** - Show only failed tests
- **Running** - Show currently running tests

## Project Structure

```
.
├── test-runner-ui.html          # Frontend UI (single HTML file)
├── test-runner-server.js        # Backend server
├── package.json                 # Dependencies and scripts
├── playwright.iqm.config.js     # Playwright configuration
├── tests/
│   ├── specs/                   # Test files
│   │   ├── login.spec.js
│   │   ├── creative-management.spec.js
│   │   └── ...
│   └── iqm-site/
│       ├── pages/               # Page objects
│       ├── fixtures/            # Test fixtures
│       └── testdata/            # Test data
└── test-results/
    ├── results.json             # Test results (generated)
    └── playwright-report/       # HTML report (generated)
```

## API Endpoints

### GET `/api/tests`
Returns list of available test files and their test cases.

**Response:**
```json
[
  {
    "id": "login",
    "name": "LOGIN",
    "file": "login.spec.js",
    "tests": ["User can login successfully", "Login fails with invalid email"],
    "fullPath": "/path/to/tests/specs/login.spec.js"
  }
]
```

### POST `/api/run-tests`
Start test execution.

**Request:**
```json
{
  "tests": ["login", "creative-management"]
}
```

**Response:**
```json
{
  "status": "started"
}
```

### POST `/api/stop-tests`
Stop currently running tests.

**Response:**
```json
{
  "status": "stopped"
}
```

## WebSocket Events

The dashboard uses WebSocket for real-time updates:

### Client → Server
- Connection established automatically

### Server → Client

**test-start**
```json
{
  "type": "test-start",
  "tests": ["login", "creative-management"]
}
```

**test-result**
```json
{
  "type": "test-result",
  "testId": "login",
  "result": {
    "status": "passed",
    "duration": 5000,
    "error": null,
    "screenshots": ["/path/to/screenshot.png"],
    "video": "/path/to/video.webm",
    "logs": [
      {"level": "info", "message": "Test started"},
      {"level": "success", "message": "Test passed"}
    ]
  }
}
```

**test-complete**
```json
{
  "type": "test-complete",
  "code": 0
}
```

**test-error**
```json
{
  "type": "test-error",
  "message": "Error message"
}
```

## Configuration

### Playwright Configuration

Edit `playwright.iqm.config.js` to customize:

```javascript
export default defineConfig({
  testDir: './tests/specs',
  timeout: 60 * 1000,
  retries: 0,
  workers: 4,
  use: {
    headless: true,
    baseURL: 'https://apitesting.stage.iqm.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
});
```

### Server Configuration

Set environment variables:

```bash
# Change port (default: 3000)
PORT=8080 npm run dashboard

# Enable debug logging
DEBUG=* npm run dashboard
```

## Troubleshooting

### Tests Not Appearing
1. Ensure test files are in `tests/specs/` directory
2. Test files must end with `.spec.js`
3. Restart the server

### No Screenshots/Videos
1. Check `playwright.iqm.config.js` has screenshot/video settings
2. Ensure tests are failing (screenshots captured on failure by default)
3. Check `test-results/` directory exists

### WebSocket Connection Failed
1. Check server is running on correct port
2. Verify firewall allows WebSocket connections
3. Check browser console for errors

### Tests Hang or Timeout
1. Increase timeout in `playwright.iqm.config.js`
2. Check if tests are waiting for elements that don't exist
3. Review test logs for specific errors

## Performance Tips

1. **Parallel Execution**: Adjust `workers` in config
   ```javascript
   workers: process.env.CI ? 1 : 4
   ```

2. **Selective Screenshots**: Only capture on failure
   ```javascript
   screenshot: 'only-on-failure'
   ```

3. **Video Recording**: Only on failure to save space
   ```javascript
   video: 'retain-on-failure'
   ```

4. **Retries**: Reduce flaky test failures
   ```javascript
   retries: process.env.CI ? 2 : 0
   ```

## Advanced Usage

### Running Specific Tests

Modify the test selection in the UI or use the API:

```bash
curl -X POST http://localhost:3000/api/run-tests \
  -H "Content-Type: application/json" \
  -d '{"tests": ["login", "creative-management"]}'
```

### Viewing Raw Results

Test results are stored in JSON format:

```bash
cat test-results/results.json
```

### Generating HTML Report

```bash
npm run report
```

This opens the Playwright HTML report in your browser.

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Run all tests (when focused on test list)
- `Escape` - Close image modal

## Limitations

- Tests run sequentially by default (configure `workers` for parallel)
- Large video files may take time to load
- Screenshots are embedded as data URLs for easy sharing

## Contributing

To extend the dashboard:

1. **Add new tabs**: Edit `test-runner-ui.html` tabs section
2. **Add new API endpoints**: Edit `test-runner-server.js`
3. **Customize styling**: Modify CSS in `test-runner-ui.html`

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Playwright documentation: https://playwright.dev
3. Check test logs in the dashboard

## License

ISC

---

**Happy Testing! 🎭**
