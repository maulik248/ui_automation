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

// Broadcast to all WebSocket clients
function broadcast(data) {
    wsClients.forEach(client => {
        if (client.readyState === 1) { // OPEN
            client.send(JSON.stringify(data));
        }
    });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
    wsClients.add(ws);
    console.log('Client connected. Total clients:', wsClients.size);

    ws.on('close', () => {
        wsClients.delete(ws);
        console.log('Client disconnected. Total clients:', wsClients.size);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

// API: Get available tests
app.get('/api/tests', (req, res) => {
    const testsDir = path.join(__dirname, 'tests', 'specs');
    
    try {
        const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.spec.js'));
        
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
        console.error('Error reading tests:', error);
        res.status(500).json({ error: 'Failed to read tests' });
    }
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

    res.json({ status: 'started' });

    // Run tests
    runTests(tests);
});

// API: Stop tests
app.post('/api/stop-tests', (req, res) => {
    if (currentTestProcess) {
        currentTestProcess.kill();
        currentTestProcess = null;
        broadcast({ type: 'test-stopped' });
    }
    res.json({ status: 'stopped' });
});

// Run tests function
async function runTests(testIds) {
    const testSpecs = testIds.map(id => `tests/specs/${id}.spec.js`);
    
    console.log('Starting tests:', testSpecs);
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
            stdout += data.toString();
            console.log('Test output:', data.toString());
        });

        currentTestProcess.stderr.on('data', (data) => {
            stderr += data.toString();
            console.error('Test error:', data.toString());
        });

        currentTestProcess.on('close', (code) => {
            console.log('Tests completed with code:', code);
            currentTestProcess = null;

            // Parse results
            parseTestResults(testIds);

            broadcast({ type: 'test-complete', code });
            resolve();
        });

        currentTestProcess.on('error', (error) => {
            console.error('Failed to start tests:', error);
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
            console.warn('Results file not found:', resultsFile);
            return;
        }

        const rawResults = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));

        // Process each test suite
        rawResults.suites?.forEach(suite => {
            suite.tests?.forEach(test => {
                const testId = generateTestId(test.title);
                const result = {
                    status: test.status === 'passed' ? 'passed' : 'failed',
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

                console.log(`Test result: ${testId} - ${result.status}`);
            });
        });
    } catch (error) {
        console.error('Error parsing test results:', error);
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
    res.json({ status: 'ok' });
});

// Start server
server.listen(PORT, () => {
    console.log(`\n🎭 Playwright Test Runner Dashboard`);
    console.log(`📍 Open http://localhost:${PORT} in your browser`);
    console.log(`\nServer running on port ${PORT}\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down...');
    if (currentTestProcess) {
        currentTestProcess.kill();
    }
    wss.close();
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
