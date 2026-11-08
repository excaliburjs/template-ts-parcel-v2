import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// Port is env driven so several checkouts (or several templates) can run their suites
// side by side without silently attaching to each other's dev server via
// `reuseExistingServer`. CI leaves EX_E2E_PORT unset and keeps parcel's default 1234.
const port = Number(process.env.EX_E2E_PORT ?? 1234);
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: './tests',
  webServer: {
    // Deliberately serves the real parcel build rather than a raw dev bundle - for a
    // template the build pipeline itself is part of what is under test.
    command: `npm run start -- --port ${port}`,
    timeout: 240 * 1000, // linux takes a long time
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
   },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Force software rendering and a 1x device scale so screenshots taken on a
        // developer machine with a real GPU match the ones CI takes on a headless runner.
        launchOptions: {
          args: [
            '--disable-background-timer-throttling',
            '--disable-renderer-backgrounding',
            '--disable-dev-shm-usage',
            '--mute-audio',
            '--force-device-scale-factor=1',
            '--use-gl=swiftshader'
          ]
        }
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
});
