import React from 'react';
import { Link, Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

import { SiteBanner } from '@boundbybetter/features';
import { BookOpen, Button, Info, MessageCircle, Settings, YStack, useMedia, useTheme } from '@boundbybetter/ui';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export default function TabLayout() {
  const theme = useTheme();
  const accentColor = theme.accentColor.get();
  const backgroundColor = theme.backgroundColor?.get();
  const media = useMedia();
  if (media.gtMd) {
    // Use a basic custom layout on web.
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SiteBanner />
        <Drawer screenOptions={{
            drawerType: 'permanent',
            headerLeft: () => null,
            drawerStyle: {
              width: 175,
            }
          }}
          useLegacyImplementation={false}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: 'Home',
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Button unstyled p="$0" m="$4">
                    <Info color={accentColor} testID='info-icon' />
                  </Button>
                </Link>
              ),
            }}
          />
          <Drawer.Screen
            name="docs"
            options={{
              title: 'Documentation',
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              title: 'Settings',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    );
  }
  return (
    <YStack f={1}>
      <Tabs
        screenOptions={{
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: true,
          tabBarActiveTintColor: backgroundColor,
        }}
        sceneContainerStyle={{
          flex: 1,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <MessageCircle color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Button unstyled p="$0" m="$4">
                  <Info color={accentColor} testID='info-icon' />
                </Button>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="docs"
          options={{
            title: 'Documentation',
            tabBarIcon: ({ color }) => <BookOpen color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Settings color={color} />,
          }}
        />
      </Tabs>
    </YStack>
  );
}
