# 🎯 Getting Started with Test Runner Dashboard

## What You Have

A complete web-based test runner dashboard for Playwright tests with real-time reporting, screenshots, videos, and logs.

## 3-Step Setup

### Step 1: Start the Server (30 seconds)

```bash
npm run dashboard
```

You'll see:
```
🎭 Playwright Test Runner Dashboard
📍 Open http://localhost:3000 in your browser

Server running on port 3000
```

### Step 2: Open in Browser (10 seconds)

Navigate to:
```
http://localhost:3000
```

### Step 3: Run Tests (20 seconds)

1. Click **"▶ Run All Tests"** button in the sidebar
2. Watch tests execute in real-time
3. Click on any test to see details

**Total time: ~1 minute** ⏱️

## What You'll See

### Left Sidebar
- **Test List**: All available tests from `tests/specs/`
- **Status Indicators**:
  - ✅ Green = Passed
  - ❌ Red = Failed
  - ⏳ Orange = Running
- **Controls**: Run, Stop, Clear buttons
- **Filter**: Filter by status

### Main Panel
- **Overview Tab**: Test status, duration, errors
- **Screenshots Tab**: Gallery of captured images
- **Video Tab**: Full test execution video
- **Logs Tab**: Color-coded execution logs

## Common Tasks

### Run All Tests
```
Click "▶ Run All Tests" button
```

### View Test Details
```
Click on any test in the sidebar
```

### Stop Running Tests
```
Click "⏹ Stop Tests" button
```

### Clear All Results
```
Click "🗑 Clear Results" button
```

### Filter Tests
```
Use "Filter by Status" dropdown
```

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| View full screenshot | Click screenshot |
| Close image modal | Press Escape |
| Close modal | Click outside |

## Troubleshooting

### Server won't start
```bash
# Check if port is in use
lsof -i :3000

# Use different port
PORT=8080 npm run dashboard
```

### No tests appear
1. Check `tests/specs/` directory exists
2. Test files must end with `.spec.js`
3. Restart server

### No screenshots/videos
1. Tests must fail to capture artifacts
2. Check `playwright.iqm.config.js` has:
   ```javascript
   screenshot: 'only-on-failure',
   video: 'retain-on-failure',
   ```

## Next Steps

1. **Read the docs**
   - [QUICK_START_DASHBOARD.md](./QUICK_START_DASHBOARD.md) - 2 minute guide
   - [TEST_RUNNER_GUIDE.md](./TEST_RUNNER_GUIDE.md) - Feature guide
   - [DASHBOARD_SETUP.md](./DASHBOARD_SETUP.md) - Setup guide

2. **Customize the dashboard**
   - Edit `test-runner-ui.html` for UI changes
   - Edit `test-runner-server.js` for backend changes

3. **Add more tests**
   - Create new `.spec.js` files in `tests/specs/`
   - Tests will appear automatically

4. **Configure Playwright**
   - Edit `playwright.iqm.config.js`
   - Adjust timeouts, workers, reporters

## File Locations

```
test-runner-ui.html          ← Frontend (open in browser)
test-runner-server.js        ← Backend server
test-runner-enhanced.js      ← Enhanced backend
package.json                 ← Dependencies (already updated)
playwright.iqm.config.js     ← Playwright config
tests/specs/                 ← Your test files
test-results/                ← Generated results
```

## Commands

```bash
# Start dashboard
npm run dashboard

# Start with auto-reload (development)
npm run dashboard:dev

# Use different port
PORT=8080 npm run dashboard

# View Playwright HTML report
npm run report

# Run tests directly (without dashboard)
npm run test:iqm
```

## API Examples

### Get Available Tests
```bash
curl http://localhost:3000/api/tests
```

### Run Specific Tests
```bash
curl -X POST http://localhost:3000/api/run-tests \
  -H "Content-Type: application/json" \
  -d '{"tests": ["login"]}'
```

### Stop Tests
```bash
curl -X POST http://localhost:3000/api/stop-tests
```

### Health Check
```bash
curl http://localhost:3000/health
```

## Browser Support

- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Performance Tips

1. **Faster execution**: Set `workers: 4` in Playwright config
2. **Save space**: Use `screenshot: 'only-on-failure'`
3. **Reduce flakiness**: Set `retries: 2`

## Need Help?

1. Check [DASHBOARD_SETUP.md](./DASHBOARD_SETUP.md) troubleshooting section
2. Review [Playwright docs](https://playwright.dev)
3. Check browser console (F12) for errors

## What's Next?

```bash
# You're ready! Start with:
npm run dashboard

# Then open:
# http://localhost:3000
```

---

**That's it! You're all set. Happy testing! 🎭**

For detailed information, see [README_DASHBOARD.md](./README_DASHBOARD.md)
