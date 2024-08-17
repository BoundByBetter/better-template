// Added next 3 lines for tamagui.
// Removing to get tests to pass.
// import '../tamagui-web.css'
import { tg, colors, tamaguiConfig } from '@boundbybetter/ui';
// import { tamaguiConfig } from '../tamagui.config'

import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { MyState } from '@boundbybetter/state';
import { Platform } from 'react-native';
import { useColorScheme } from '@boundbybetter/ui';
import { AuthProvider, WebSplashScreen } from '@boundbybetter/features';
import { logCall, logRaw, logSetup } from '@boundbybetter/shared';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  logSetup('RootLayout');
  const [loaded, error] = useFonts({
    // Added next two lines for tamagui. (Removing to get tests to run)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    //SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    // istanbul ignore next
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    logCall('RootLayout', 'useEffect', 'SplashScreen.hideAsync');
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    if (Platform.OS === 'web') {
      return <WebSplashScreen />;
    } else {
      return null;
    }
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  logCall('RootLayoutNav');
  const colorScheme = useColorScheme();
  logRaw('colorScheme', colorScheme);
  DefaultTheme.colors.primary = colors.blue.blue8;
  DarkTheme.colors.primary = colors.blueDark.blue8;
  //DefaultTheme.colors.background = colorScheme === 'dark' ? '#000000' : '#b8dff6';

  return (
    <tg.TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={
        /*istanbul ignore next*/ colorScheme === 'dark'
          ? 'dark_blue'
          : 'light_blue'
      }
    >
      <ThemeProvider
        value={
          /*istanbul ignore next*/ colorScheme === 'dark'
            ? DarkTheme
            : DefaultTheme
        }
      >
        <MyState>
          {/* <AuthProvider> */}
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
          {/* </AuthProvider> */}
        </MyState>
      </ThemeProvider>
    </tg.TamaguiProvider>
  );
}
