module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-redux|escape-string-regexp)',
  ],
  moduleNameMapper: {
    '^@boundbybetter/(.*)$': '<rootDir>/packages/$1/src',
  },
  maxWorkers: '50%',
  cache: true,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  collectCoverageFrom: [
    'apps/*/app/**/*.{js,jsx,ts,tsx}',
    'apps/*/app-test/**/*.{js,jsx,ts,tsx}',
    'packages/*/src/**/*.{js,jsx,ts,tsx}',
    '!src/index.tsx',
    '!**/node_modules/**',
  ],
  coverageReporters: ['lcov', 'text', 'cobertura'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageDirectory: '<rootDir>/coverage',
};
