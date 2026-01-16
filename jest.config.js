module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/*.test.(js|ts)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/performance.test.js',
  ],
};