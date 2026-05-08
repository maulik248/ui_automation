# 🚀 Quick Start - Test Runner Dashboard

Get up and running with the Playwright Test Runner Dashboard in 2 minutes!

## Step 1: Start the Server

```bash
npm run dashboard
```

You should see:
```
🎭 Playwright Test Runner Dashboard
📍 Open http://localhost:3000 in your browser

Server running on port 3000
```

## Step 2: Open in Browser

Navigate to:
```
http://localhost:3000
```

## Step 3: Run Tests

1. **See all available tests** in the left sidebar
2. **Click "▶ Run All Tests"** to start execution
3. **Watch real-time progress** as tests run
4. **Click any test** to view detailed results

## What You'll See

### Test List (Left Sidebar)
- ✅ Green border = Passed
- ❌ Red border = Failed
- ⏳ Orange border = Running
- Blue highlight = Selected

### Main Panel
- **Overview**: Test status, duration, errors
- **Screenshots**: Gallery of captured images
- **Video**: Full test execution recording
- **Logs**: Detailed execution logs

## Common Tasks

### Run Specific Tests
1. Click individual test names in the sidebar
2. Or use the filter dropdown to show only passed/failed tests

### View Test Details
1. Click on any test in the list
2. Switch between tabs: Overview, Screenshots, Video, Logs

### Stop Running Tests
1. Click the "⏹ Stop Tests" button (appears while running)

### Clear All Results
1. Click "🗑 Clear Results" to reset

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Click test | Select and view details |
| Click screenshot | View full size |
| Escape | Close image modal |

## Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Use different port
PORT=8080 npm run dashboard
```

### No tests appear
1. Ensure test files are in `tests/specs/` directory
2. Files must end with `.spec.js`
3. Restart the server

### Tests don't run
1. Check browser console for errors (F12)
2. Verify Playwright is installed: `npm list @playwright/test`
3. Check test files are valid

## Next Steps

- 📖 Read [TEST_RUNNER_GUIDE.md](./TEST_RUNNER_GUIDE.md) for detailed documentation
- 🔧 Customize Playwright config in `playwright.iqm.config.js`
- 📝 Add more test files to `tests/specs/`
- 🎨 Modify UI styling in `test-runner-ui.html`

## Development Mode

For auto-reload during development:

```bash
npm run dashboard:dev
```

This uses `nodemon` to restart the server when files change.

## Production Deployment

```bash
# Build and run
npm run dashboard

# Or with custom port
PORT=8080 npm run dashboard
```

---

**That's it! You're ready to run tests. 🎉**

For more details, see [TEST_RUNNER_GUIDE.md](./TEST_RUNNER_GUIDE.md)
