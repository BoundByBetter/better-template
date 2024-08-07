import path from 'path';

module.exports = {
  displayName: 'app',
  preset: 'jest-expo',
  rootDir: path.resolve(__dirname,'../'),
  setupFilesAfterEnv: ['./test/test-setup.tsx'],
  collectCoverageFrom: [
    `<rootDir>/src/**/*.{ts,tsx}`
  ],
  coverageDirectory: '<rootDir>/../../coverage/libs/shared',
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 100,
      functions: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    "\\.svg": "<rootDir>/__mocks__/svgMock.js",
    "@/(.*)": "<rootDir>/$1"
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-redux)"
  ],
  // transformIgnorePatterns: [
  //   'node_modules/(?!react-redux|@react-native|expo(nent)?|react-native|@react-navigation)',
  // ],
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { configFile: path.resolve(__dirname, './babel.config.js') }],
  }
};
