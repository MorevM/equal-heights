export default {
	moduleFileExtensions: ['js'],
	transform: {},
	testEnvironment: 'jsdom',
	restoreMocks: true,
	setupFilesAfterEnv: ['./__tests__/unit/bootstrap.js'],
	cacheDirectory: './tmp/jest/cache',
	coverageDirectory: './tmp/jest/coverage',
	collectCoverageFrom: ['./src/utility/**/*.js'],
	coverageReporters: ['lcov'],
	coverageProvider: 'v8',
	verbose: true,
};
