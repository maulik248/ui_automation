import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Store for test results and WebSocket clients
let testResults = {};
let wsClients = new Set();
let currentTestProcess = null;
let testExecutionLog = [];

// Broadcast to all WebSocket clients
function broadcast(data) {
    wsClients.forEach(client => {
        if (client.readyState === 1) { // OPEN
            client.send(JSON.stringify(data));
        }
    });
}

// Log test execution
function logExecution(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message };
    testExecutionLog.push(logEntry);
    console.log(`[${level.toUpperCase()}] ${message}`);
}

// WebSocket connection handler
wss.on('connection', (ws) => {
    wsClients.add(ws);
    logExecution(`Client connected. Total clients: ${wsClients.size}`);

    // Send current test results to new client
    ws.send(JSON.stringify({
        type: 'initial-state',
        results: testResults,
        log: testExecutionLog.slice(-50) // Last 50 log entries
    }));

    ws.on('close', () => {
        wsClients.delete(ws);
        logExecution(`Client disconnected. Total clients: ${wsClients.size}`);
    });

    ws.on('error', (error) => {
        logExecution(`WebSocket error: ${error.message}`, 'error');
    });
});

// API: Get available tests
app.get('/api/tests', (req, res) => {
    const testsDir = path.join(__dirname, 'tests', 'specs');
    
    try {
        if (!fs.existsSync(testsDir)) {
            return res.status(404).json({ error: 'Tests directory not found' });
        }

        const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.spec.js'));
        
        if (files.length === 0) {
            return res.json([]);
        }

        const tests = files.map(file => {
            const filePath = path.join(testsDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Extract test names from describe and test blocks
            const testNames = [];
            const describeMatch = content.match(/test\.describe(?:\.serial)?\(['"`]([^'"`]+)['"`]/);
            const testMatches = content.matchAll(/test\(['"`]([^'"`]+)['"`]/g);
            
            if (describeMatch) {
                testNames.push(describeMatch[1]);
            }
            
            for (const match of testMatches) {
                testNames.push(match[1]);
            }

            return {
                id: file.replace('.spec.js', ''),
                name: file.replace('.spec.js', '').replace(/-/g, ' ').toUpperCase(),
                file: file,
                tests: testNames,
                fullPath: filePath
            };
        });

        res.json(tests);
    } catch (error) {
        logExecution(`Error reading tests: ${error.message}`, 'error');
        res.status(500).json({ error: 'Failed to read tests' });
    }
});

// API: Get test results
app.get('/api/results', (req, res) => {
    res.json(testResults);
});

// API: Get execution log
app.get('/api/log', (req, res) => {
    const limit = parseInt(req.query.limit) || 100;
    res.json(testExecutionLog.slice(-limit));
});

// API: Run tests
app.post('/api/run-tests', async (req, res) => {
    const { tests } = req.body;

    if (!tests || tests.length === 0) {
        return res.status(400).json({ error: 'No tests specified' });
    }

    if (currentTestProcess) {
        return res.status(400).json({ error: 'Tests already running' });
    }

    logExecution(`Starting test execution for: ${tests.join(', ')}`);
    res.json({ status: 'started' });

    // Run tests
    runTests(tests);
});

// API: Stop tests
app.post('/api/stop-tests', (req, res) => {
    if (currentTestProcess) {
        logExecution('Stopping test execution');
        currentTestProcess.kill();
        currentTestProcess = null;
        broadcast({ type: 'test-stopped' });
    }
    res.json({ status: 'stopped' });
});

// API: Clear results
app.post('/api/clear-results', (req, res) => {
    testResults = {};
    logExecution('Test results cleared');
    broadcast({ type: 'results-cleared' });
    res.json({ status: 'cleared' });
});

// Run tests function
async function runTests(testIds) {
    const testSpecs = testIds.map(id => `tests/specs/${id}.spec.js`);
    
    logExecution(`Running tests: ${testSpecs.join(', ')}`);
    broadcast({ type: 'test-start', tests: testIds });

    return new Promise((resolve) => {
        currentTestProcess = spawn('npx', [
            'playwright',
            'test',
            '--config=playwright.iqm.config.js',
            '--reporter=json',
            ...testSpecs
        ], {
            cwd: __dirname,
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        currentTestProcess.stdout.on('data', (data) => {
            const output = data.toString();
            stdout += output;
            logExecution(`Test output: ${output.trim()}`, 'info');
        });

        currentTestProcess.stderr.on('data', (data) => {
            const output = data.toString();
            stderr += output;
            logExecution(`Test error: ${output.trim()}`, 'error');
        });

        currentTestProcess.on('close', (code) => {
            logExecution(`Tests completed with exit code: ${code}`);
            currentTestProcess = null;

            // Parse results
            parseTestResults(testIds);

            broadcast({ type: 'test-complete', code });
            resolve();
        });

        currentTestProcess.on('error', (error) => {
            logExecution(`Failed to start tests: ${error.message}`, 'error');
            currentTestProcess = null;
            broadcast({ type: 'test-error', message: error.message });
            resolve();
        });
    });
}

// Parse test results from Playwright JSON report
function parseTestResults(testIds) {
    const resultsFile = path.join(__dirname, 'test-results', 'results.json');

    try {
        if (!fs.existsSync(resultsFile)) {
            logExecution(`Results file not found: ${resultsFile}`, 'warning');
            return;
        }

        const rawResults = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));
        let passedCount = 0;
        let failedCount = 0;

        // Process each test suite
        rawResults.suites?.forEach(suite => {
            suite.tests?.forEach(test => {
                const testId = generateTestId(test.title);
                const isPassed = test.status === 'passed';
                
                if (isPassed) passedCount++;
                else failedCount++;

                const result = {
                    status: isPassed ? 'passed' : 'failed',
                    duration: test.duration || 0,
                    error: test.error?.message || null,
                    screenshots: [],
                    video: null,
                    logs: [],
                    timestamp: new Date().toISOString()
                };

                // Extract attachments (screenshots, videos)
                test.attachments?.forEach(attachment => {
                    if (attachment.contentType.includes('image')) {
                        result.screenshots.push(attachment.path);
                    } else if (attachment.contentType.includes('video')) {
                        result.video = attachment.path;
                    }
                });

                // Extract logs
                if (test.stdout) {
                    result.logs.push({
                        level: 'info',
                        message: test.stdout
                    });
                }

                if (test.stderr) {
                    result.logs.push({
                        level: 'error',
                        message: test.stderr
                    });
                }

                testResults[testId] = result;
                broadcast({
                    type: 'test-result',
                    testId,
                    result
                });

                logExecution(`Test result: ${testId} - ${result.status}${result.error ? ` (${result.error})` : ''}`);
            });
        });

        logExecution(`Test summary: ${passedCount} passed, ${failedCount} failed`);
    } catch (error) {
        logExecution(`Error parsing test results: ${error.message}`, 'error');
    }
}

// Generate test ID from test title
function generateTestId(title) {
    return title.toLowerCase().replace(/\s+/g, '-');
}

// Serve the HTML UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-runner-ui.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        uptime: process.uptime(),
        testResults: Object.keys(testResults).length,
        wsClients: wsClients.size,
        isRunning: currentTestProcess !== null
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logExecution(`Express error: ${err.message}`, 'error');
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
server.listen(PORT, () => {
    logExecution(`\n🎭 Playwright Test Runner Dashboard`);
    logExecution(`📍 Open http://localhost:${PORT} in your browser`);
    logExecution(`\nServer running on port ${PORT}\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    logExecution('Shutting down...');
    if (currentTestProcess) {
        currentTestProcess.kill();
    }
    wss.close();
    server.close(() => {
        logExecution('Server closed');
        process.exit(0);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logExecution(`Uncaught exception: ${error.message}`, 'error');
});

process.on('unhandledRejection', (reason, promise) => {
    logExecution(`Unhandled rejection: ${reason}`, 'error');
});
