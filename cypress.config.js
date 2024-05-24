import { defineConfig } from 'cypress';

export default defineConfig({
	fixturesFolder: './__tests__/__fixtures__',
	screenshotsFolder: './tmp/cypress/screenshots',
	downloadsFolder: './tmp/cypress/downloads',
	videosFolder: './tmp/cypress/videos',
	video: false,
	viewportWidth: 1280,
	viewportHeight: 720,
	e2e: {
		baseUrl: 'http://localhost:3001',
		specPattern: './__tests__/integration/tests/**/*.cy.{js,jsx,ts,tsx}',
		supportFile: './__tests__/integration/bootstrap.js',
	},
});
