/* eslint-env node */
// Get directory to app folder
const path = require('path');
const appDir = path.join(__dirname, '../../packages/ui/src');

module.exports = function (api) {
  console.log('I was hit!');

  api.cache(true);
  process.env.EXPO_ROUTER_APP_ROOT = './app';
  process.env.EXPO_ROUTER_ABS_APP_ROOT = path.join(__dirname, 'app');
  const config = {
    presets: ['babel-preset-expo'],
    // Added plugins as recommended by tamagui.
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: appDir + '/tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],

      // NOTE: this is only necessary if you are using reanimated for animations
      'react-native-reanimated/plugin',
    ],
  };
  return config;
};