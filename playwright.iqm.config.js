// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * IQM Site Playwright Configuration with Native AI Agents
 * 
 * This config enables Playwright's built-in AI capabilities:
 * - planner: Helps plan test scenarios and strategies
 * - healer: Auto-recovers from selector changes using fallbacks
 * - generator: Assists in generating test code from page exploration
 * 
 * GitHub Copilot Integration:
 * With GitHub Copilot, you get intelligent suggestions while writing tests.
 * The AI flags enhance Playwright's built-in intelligence for element location,
 * test generation, and self-healing locators.
 * 
 * No external API keys needed - works with Playwright's native AI + GitHub Copilot
 */

export default defineConfig({
  testDir: './tests/specs',
  timeout: 60 * 1000,
  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,
  workers: process.env.CI ? 1 : 4,
  use: {
    headless: process.env.HEADED ? false : true,
    baseURL: 'https://apitesting.stage.iqm.com/',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    // Playwright Native AI Configuration
    // These flags enable built-in AI features in Playwright
    ai: {
      model: "gpt-4o-mini",   // Model name for AI operations
      planner: true,          // Enable test planning assistance
      healer: true,           // Enable self-healing locators
      generator: true         // Enable test generation assistance
    }
  },
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      timeout: 60 * 1000,
    },
  ],
});
