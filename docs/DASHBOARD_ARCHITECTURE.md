# 🏗️ Dashboard Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  test-runner-ui.html                      │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  Header                                             │ │  │
│  │  │  🎭 Playwright Test Runner Dashboard               │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  ┌──────────────────┬──────────────────────────────────┐ │  │
│  │  │   SIDEBAR        │      MAIN PANEL                 │ │  │
│  │  │                  │                                  │ │  │
│  │  │ Test List        │  ┌──────────────────────────┐   │ │  │
│  │  │ ✅ login         │  │ Test Details             │   │ │  │
│  │  │ ❌ creative      │  │                          │   │ │  │
│  │  │ ⏳ dashboard     │  │ [Overview] [Screenshots] │   │ │  │
│  │  │                  │  │ [Video] [Logs]           │   │ │  │
│  │  │ [Run All]        │  │                          │   │ │  │
│  │  │ [Stop]           │  │ Status: ✅ PASSED        │   │ │  │
│  │  │ [Clear]          │  │ Duration: 5000ms         │   │ │  │
│  │  │                  │  │ File: login.spec.js      │   │ │  │
│  │  │ Filter: [All ▼]  │  │                          │   │ │  │
│  │  │                  │  └──────────────────────────┘   │ │  │
│  │  └──────────────────┴──────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  JavaScript Engine                                        │  │
│  │  ├─ Event Handlers                                        │  │
│  │  ├─ WebSocket Client                                      │  │
│  │  ├─ REST API Client                                       │  │
│  │  └─ UI State Management                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ↕ HTTP/WebSocket (ws://localhost:3000)                        │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      NODE.JS SERVER                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  test-runner-server.js / test-runner-enhanced.js         │  │
│  │                                                           │  │
│  │  Express.js Application                                  │  │
│  │  ├─ HTTP Server (Port 3000)                              │  │
│  │  ├─ WebSocket Server                                     │  │
│  │  └─ Static File Server                                   │  │
│  │                                                           │  │
│  │  REST API Endpoints                                      │  │
│  │  ├─ GET /api/tests                                       │  │
│  │  ├─ POST /api/run-tests                                  │  │
│  │  ├─ POST /api/stop-tests                                 │  │
│  │  ├─ GET /api/results (enhanced)                          │  │
│  │  ├─ GET /api/log (enhanced)                              │  │
│  │  └─ GET /health                                          │  │
│  │                                                           │  │
│  │  WebSocket Event Handlers                                │  │
│  │  ├─ connection                                            │  │
│  │  ├─ message                                               │  │
│  │  ├─ close                                                 │  │
│  │  └─ error                                                 │  │
│  │                                                           │  │
│  │  Test Management                                          │  │
│  │  ├─ Test Discovery                                        │  │
│  │  ├─ Test Execution                                        │  │
│  │  ├─ Result Parsing                                        │  │
│  │  └─ Broadcast Updates                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ↕ Child Process (spawn)                                        │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    PLAYWRIGHT TEST RUNNER                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  npx playwright test --config=playwright.iqm.config.js   │  │
│  │                                                           │  │
│  │  Test Execution                                          │  │
│  │  ├─ Load Configuration                                   │  │
│  │  ├─ Discover Tests                                       │  │
│  │  ├─ Launch Browser                                       │  │
│  │  ├─ Run Tests                                            │  │
│  │  ├─ Capture Screenshots                                  │  │
│  │  ├─ Record Videos                                        │  │
│  │  ├─ Generate Traces                                      │  │
│  │  └─ Generate JSON Report                                 │  │
│  │                                                           │  │
│  │  Output Files                                            │  │
│  │  ├─ test-results/results.json                            │  │
│  │  ├─ test-results/screenshots/                            │  │
│  │  ├─ test-results/videos/                                 │  │
│  │  └─ playwright-report/                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Test Discovery Flow

```
User Opens Dashboard
        ↓
Browser Loads test-runner-ui.html
        ↓
JavaScript Calls GET /api/tests
        ↓
Server Reads tests/specs/ Directory
        ↓
Server Parses .spec.js Files
        ↓
Server Returns Test List (JSON)
        ↓
UI Renders Test List in Sidebar
```

### 2. Test Execution Flow

```
User Clicks "Run All Tests"
        ↓
UI Sends POST /api/run-tests
        ↓
Server Spawns Playwright Process
        ↓
Server Broadcasts "test-start" via WebSocket
        ↓
Playwright Runs Tests
        ↓
Playwright Generates JSON Report
        ↓
Server Parses Results
        ↓
Server Broadcasts "test-result" for Each Test
        ↓
UI Updates Test List & Stats in Real-Time
        ↓
Server Broadcasts "test-complete"
        ↓
UI Shows Final Results
```

### 3. Result Viewing Flow

```
User Clicks on Test in Sidebar
        ↓
UI Retrieves Test Result from Memory
        ↓
UI Displays Overview Tab
        ├─ Status
        ├─ Duration
        ├─ Error (if any)
        └─ File Path
        ↓
User Clicks Screenshots Tab
        ↓
UI Displays Screenshot Gallery
        ├─ Loads from test-results/
        └─ Shows Thumbnails
        ↓
User Clicks on Screenshot
        ↓
UI Opens Modal with Full-Size Image
        ↓
User Clicks Video Tab
        ↓
UI Displays Video Player
        ├─ Loads from test-results/
        └─ Shows Playback Controls
        ↓
User Clicks Logs Tab
        ↓
UI Displays Color-Coded Logs
        ├─ Error (Red)
        ├─ Warning (Yellow)
        ├─ Success (Green)
        └─ Info (Blue)
```

## Component Architecture

### Frontend Components

```
test-runner-ui.html
├── HTML Structure
│   ├── Header
│   ├── Sidebar
│   │   ├── Test List
│   │   ├── Controls
│   │   └── Filters
│   └── Main Panel
│       ├── Panel Header
│       ├── Tabs
│       └── Tab Content
│
├── CSS Styling
│   ├── Layout (Grid, Flexbox)
│   ├── Colors & Themes
│   ├── Responsive Design
│   ├── Animations
│   └── Modals
│
└── JavaScript
    ├── State Management
    │   ├── testResults
    │   ├── selectedTest
    │   ├── isRunning
    │   └── allTests
    │
    ├── API Functions
    │   ├── loadTests()
    │   ├── runAllTests()
    │   ├── stopTests()
    │   └── clearResults()
    │
    ├── UI Functions
    │   ├── renderTestList()
    │   ├── displayTestDetails()
    │   ├── switchTab()
    │   └── updateStats()
    │
    ├── WebSocket Handler
    │   ├── setupWebSocket()
    │   ├── onMessage()
    │   ├── onError()
    │   └── onClose()
    │
    └── Utility Functions
        ├── escapeHtml()
        ├── showNotification()
        └── openImageModal()
```

### Backend Components

```
test-runner-server.js
├── Express App
│   ├── Middleware
│   │   ├── express.json()
│   │   └── express.static()
│   │
│   ├── REST Routes
│   │   ├── GET /
│   │   ├── GET /api/tests
│   │   ├── POST /api/run-tests
│   │   ├── POST /api/stop-tests
│   │   ├── GET /health
│   │   └── Error Handler
│   │
│   └── Static Files
│       └── test-runner-ui.html
│
├── WebSocket Server
│   ├── Connection Handler
│   ├── Message Handler
│   ├── Close Handler
│   ├── Error Handler
│   └── Broadcast Function
│
├── Test Management
│   ├── loadTests()
│   │   ├── Read tests/specs/
│   │   ├── Parse .spec.js
│   │   └── Extract Test Names
│   │
│   ├── runTests()
│   │   ├── Spawn Playwright
│   │   ├── Capture Output
│   │   ├── Handle Errors
│   │   └── Parse Results
│   │
│   └── parseTestResults()
│       ├── Read results.json
│       ├── Extract Attachments
│       ├── Parse Logs
│       └── Broadcast Results
│
└── State Management
    ├── testResults {}
    ├── wsClients Set
    ├── currentTestProcess
    └── testExecutionLog []
```

## File Structure

```
Project Root
│
├── Frontend
│   └── test-runner-ui.html              # Single HTML file with CSS & JS
│
├── Backend
│   ├── test-runner-server.js            # Basic server
│   └── test-runner-enhanced.js          # Enhanced server with logging
│
├── Configuration
│   ├── package.json                     # Dependencies & scripts
│   └── playwright.iqm.config.js         # Playwright config
│
├── Tests
│   ├── specs/
│   │   ├── login.spec.js
│   │   ├── creative-management.spec.js
│   │   └── ...
│   └── iqm-site/
│       ├── pages/
│       ├── fixtures/
│       └── testdata/
│
├── Results (Generated)
│   ├── test-results/
│   │   ├── results.json
│   │   ├── screenshots/
│   │   ├── videos/
│   │   └── traces/
│   └── playwright-report/
│
└── Documentation
    ├── README_DASHBOARD.md
    ├── QUICK_START_DASHBOARD.md
    ├── TEST_RUNNER_GUIDE.md
    ├── DASHBOARD_SETUP.md
    ├── DASHBOARD_SUMMARY.md
    └── DASHBOARD_ARCHITECTURE.md
```

## Communication Protocols

### HTTP/REST

```
Client Request:
POST /api/run-tests HTTP/1.1
Content-Type: application/json

{
  "tests": ["login", "creative-management"]
}

Server Response:
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "started"
}
```

### WebSocket

```
Client → Server (Connection):
GET / HTTP/1.1
Upgrade: websocket
Connection: Upgrade

Server → Client (Initial State):
{
  "type": "initial-state",
  "results": { /* test results */ },
  "log": [ /* execution log */ ]
}

Server → Client (Test Start):
{
  "type": "test-start",
  "tests": ["login", "creative-management"]
}

Server → Client (Test Result):
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
      {"level": "info", "message": "Test started"}
    ]
  }
}

Server → Client (Test Complete):
{
  "type": "test-complete",
  "code": 0
}
```

## State Management

### Frontend State

```javascript
{
  testResults: {
    "login": {
      status: "passed",
      duration: 5000,
      error: null,
      screenshots: [],
      video: null,
      logs: [],
      timestamp: "2026-05-06T10:30:00Z"
    },
    "creative-management": {
      status: "failed",
      duration: 3000,
      error: "Element not found",
      screenshots: ["/path/to/screenshot.png"],
      video: "/path/to/video.webm",
      logs: [...]
    }
  },
  selectedTest: "login",
  isRunning: false,
  allTests: [
    { id: "login", name: "LOGIN", file: "login.spec.js", ... },
    { id: "creative-management", name: "CREATIVE-MANAGEMENT", ... }
  ]
}
```

### Backend State

```javascript
{
  testResults: { /* same as frontend */ },
  wsClients: Set(3),  // 3 connected clients
  currentTestProcess: ChildProcess,  // null if not running
  testExecutionLog: [
    { timestamp: "2026-05-06T10:30:00Z", level: "info", message: "..." },
    ...
  ]
}
```

## Performance Considerations

### Frontend
- Single HTML file (no build process)
- Minimal dependencies
- Efficient DOM updates
- WebSocket for real-time updates
- Modal for full-size images

### Backend
- Streaming output from Playwright
- Efficient JSON parsing
- WebSocket broadcasting
- Child process management
- Graceful error handling

### Network
- WebSocket for real-time updates (lower latency)
- REST API for initial data
- Efficient JSON payloads
- Gzip compression (Express default)

## Security Considerations

### Frontend
- HTML escaping for user input
- Modal for image viewing (prevents XSS)
- No sensitive data in localStorage

### Backend
- Input validation for API endpoints
- Error handling without exposing internals
- No authentication (local development)
- Process isolation (child process)

### File System
- Read-only access to test files
- Write access to test-results/ only
- No arbitrary file access

## Scalability

### Current Limitations
- Single server instance
- In-memory state (lost on restart)
- Sequential test execution (configurable)
- Local file system only

### Future Enhancements
- Multiple server instances (load balancing)
- Persistent state (database)
- Distributed test execution
- Cloud storage for artifacts
- Test result history

---

**Architecture Version:** 1.0.0  
**Last Updated:** May 6, 2026
