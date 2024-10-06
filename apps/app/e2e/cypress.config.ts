import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081',
    testIsolation: false,
    specPattern: 'e2e/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'e2e/support/e2e.ts',
    downloadsFolder: 'e2e/downloads',
    fixturesFolder: 'e2e/fixtures',
    supportFolder: 'e2e/support',
    videosFolder: 'e2e/videos',
    screenshotsFolder: 'e2e/screenshots',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
