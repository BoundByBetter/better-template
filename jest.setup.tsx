import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup.js';
import { WebSocket as MockWebSocket } from 'mock-socket';

process.env.LOGGING = 'false';

jest.mock(
  '@tamagui/font-inter/otf/Inter-Medium.otf',
  () => 'mocked-inter-font',
);
jest.mock(
  '@tamagui/font-inter/otf/Inter-Bold.otf',
  () => 'mocked-inter-bold-font',
);

jest.mock('expo-font', () => {
  const actual = jest.requireActual('expo-font');
  return {
    ...actual,
    useFonts: jest.fn().mockReturnValue([true, null]),
  };
});

jest.mock('expo-image', () => {
  const React = jest.requireActual('react');
  const View = jest.requireActual('react-native').View;
  const actual = jest.requireActual('expo-image');
  return {
    ...actual,
    Image: jest.fn().mockImplementation(() => <View testID="Image" />),
  };
});

jest.mock('@boundbybetter/ui', () => {
  const actual = jest.requireActual('@boundbybetter/ui');
  return {
    ...actual,
    useColorScheme: jest.fn().mockImplementation(actual.useColorScheme),
  };
});

jest.mock('@boundbybetter/features', () => {
  const React = jest.requireActual('react');
  const View = jest.requireActual('react-native').View;
  return {
    EditScreenInfo: jest
      .fn()
      .mockImplementation(() => <View testID="EditScreenInfo" />),
    Settings: jest.fn().mockImplementation(() => <View testID="Settings" />),
    AuthProvider: jest
      .fn()
      .mockImplementation(({ children }: { children: React.ReactNode }) => (
        <View testID="AuthProvider">{children}</View>
      )),
    AdminBanner: jest
      .fn()
      .mockImplementation(() => <View testID="AdminBanner" />),
    AccessDenied: jest
      .fn()
      .mockImplementation(() => <View testID="AccessDenied" />),
    TaskList: jest.fn().mockImplementation(() => <View testID="TaskList" />),
    FeatureList: jest
      .fn()
      .mockImplementation(() => <View testID="FeatureList" />),
    Banner: jest.fn().mockImplementation(() => <View testID="Banner" />),
    SiteBanner: jest
      .fn()
      .mockImplementation(() => <View testID="SiteBanner" />),
    Task: jest.fn().mockImplementation(() => <View testID="Task" />),
    TaskDetail: jest
      .fn()
      .mockImplementation(() => <View testID="TaskDetail" />),
    TasksScreen: jest
      .fn()
      .mockImplementation(() => <View testID="TasksScreen" />),
    WebSplashScreen: jest
      .fn()
      .mockImplementation(() => <View testID="WebSplashScreen" />),
  };
});

jest.mock('@boundbybetter/auth', () => {
  const React = jest.requireActual('react');
  const View = jest.requireActual('react-native').View;
  return {
    AuthProvider: jest
      .fn()
      .mockImplementation(({ children }: { children: React.ReactNode }) => (
        <View testID="AuthProvider">{children}</View>
      )),
    useCurrentUser: jest.fn(),
  };
});

jest.mock('@boundbybetter/state', () => {
  const React = jest.requireActual('react');
  const View = jest.requireActual('react-native').View;
  return {
    StateProvider: jest
      .fn()
      .mockImplementation(({ children }: { children: React.ReactNode }) => (
        <View testID="StateProvider">{children}</View>
      )),
  };
});

jest.mock('expo-splash-screen', () => {
  const actual = jest.requireActual('expo-splash-screen');
  return {
    ...actual,
    preventAutoHideAsync: jest.fn().mockImplementation(() => {
      return actual.preventAutoHideAsync;
    }),
  };
});

jest.mock('expo-sqlite', () => ({
  openDatabaseSync: jest.fn(),
}));

jest.mock('tinybase/persisters/persister-expo-sqlite', () => ({
  createExpoSqlitePersister: jest.fn(),
}));

jest.mock('tinybase/synchronizers/synchronizer-ws-client', () => ({
  createWsSynchronizer: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      // Mock the expected methods/properties of the synchronizer
      start: jest.fn(),
      stop: jest.fn(),
      // Add any other methods you need to mock
    });
  }),
}));

class EnhancedWebSocket extends MockWebSocket {
  ping() {
    // Add an empty implementation
  }
}

global.WebSocket = EnhancedWebSocket as any;

require('@shopify/flash-list/jestSetup');

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// );

// jest.mock(
//   "@tamagui/font-inter/otf/Inter-Medium.otf",
//   () => "mocked-inter-font",
// );
// jest.mock(
//   "@tamagui/font-inter/otf/Inter-Bold.otf",
//   () => "mocked-inter-bold-font",
// );
jest.mock('@azure/web-pubsub-client', () => ({
  WebPubSubClient: {
    constructor() {
      // Initialize any necessary properties or state here
    },
    sendEvent: jest.fn(),
    on: jest.fn(),
    sendToGroup: jest.fn(),
    start: jest.fn(),
    joinGroup: jest.fn(),
    stop: jest.fn(),
  },
}));
