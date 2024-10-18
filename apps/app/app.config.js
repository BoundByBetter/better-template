const variant = process.env.APP_VARIANT;
// Get first three characters of variant
const shortVariant = variant.slice(0, 3);

export default {
  name:
    shortVariant === 'prod'
      ? 'Better Template'
      : 'Better Template (' + shortVariant + ')',
  slug:
    shortVariant === 'prod'
      ? 'better-template'
      : 'better-template-' + shortVariant,
  version: '0.0.8',
  runtimeVersion: '0.0.8',
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
  scheme:
    shortVariant === 'prod'
      ? 'better-template'
      : 'better-template-' + shortVariant,
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: 'automatic',
    bundleIdentifier:
      variant === 'prod'
        ? 'com.boundbybetter.bettertemplate'
        : 'com.boundbybetter.bettertemplate.' + shortVariant,
  },
  android: {
    userInterfaceStyle: 'automatic',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package:
      shortVariant === 'prod'
        ? 'com.boundbybetter.bettertemplate'
        : 'com.boundbybetter.bettertemplate.' + shortVariant,
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
      projectId: 'b3eb1a51-3050-4224-839c-75c184c49d71',
    },
  },
  updates: {
    url: 'https://u.expo.dev/b3eb1a51-3050-4224-839c-75c184c49d71',
  },
};
