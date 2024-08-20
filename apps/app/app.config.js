const IS_PROD = process.env.APP_VARIANT === 'prod';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

export default {
  name: IS_PROD
    ? 'BetterApp'
    : IS_PREVIEW
      ? 'BetterApp (Preview)'
      : 'BetterApp (Dev)',
  slug: 'better-app',
  version: '0.0.7',
  runtimeVersion: '0.0.7',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  // Added for tamagui.
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  owner: 'bound-by-better',
  scheme: IS_PROD
    ? 'better-app'
    : IS_PREVIEW
      ? 'better-app-preview'
      : 'better-app-dev',
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: 'automatic',
    bundleIdentifier: IS_PROD
      ? 'com.boundbybetter.betterapp'
      : IS_PREVIEW
        ? 'com.boundbybetter.betterapp.preview'
        : 'com.boundbybetter.betterapp.dev',
  },
  android: {
    userInterfaceStyle: 'automatic',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_PROD
      ? 'com.boundbybetter.betterapp'
      : IS_PREVIEW
        ? 'com.boundbybetter.betterapp.preview'
        : 'com.boundbybetter.betterapp.dev',
  },
  web: {
    favicon: './assets/images/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
    // Added as part of tamagui.
    'expo-font',
    [
      'expo-screen-orientation',
      {
        initialOrientation: 'DEFAULT',
      },
    ],
    ['expo-dev-launcher', { launchMode: 'most-recent' }],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: 'f8a3e524-1104-4579-9323-9f274f126eee',
    },
  },
  updates: {
    url: 'https://u.expo.dev/f8a3e524-1104-4579-9323-9f274f126eee',
  },
};
