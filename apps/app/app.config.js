const variant = process.env.APP_VARIANT;

export default {
  name: variant === 'prod' ? 'BetterApp' : 'BetterApp (' + variant + ')',
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
  scheme: variant === 'prod' ? 'better-app' : 'better-app-' + variant,
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: 'automatic',
    bundleIdentifier:
      variant === 'prod'
        ? 'com.boundbybetter.betterapp'
        : 'com.boundbybetter.betterapp.' + variant,
  },
  android: {
    userInterfaceStyle: 'automatic',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package:
      variant === 'prod'
        ? 'com.boundbybetter.betterapp'
        : 'com.boundbybetter.betterapp.' + variant,
    buildTypes: {
      preview: {
        initWith: 'release',
        matchingFallbacks: ['release'],
        signingConfig: 'debug',
        proguardFiles: ['proguard-rules.pro'],
      },
    },
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
    [
      'expo-dev-client',
      {
        addGeneratedScheme: variant !== 'prod',
      },
    ],
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
