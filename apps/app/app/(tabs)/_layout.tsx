import { Link, Tabs } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { Banner } from '@boundbybetter/features';
import { BookOpen, tg, Info, MessageCircle, Settings } from '@boundbybetter/ui';
import { Pressable } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export default function TabLayout() {
  const theme = tg.useTheme();
  const accentColor = theme.accentColor;
  const backgroundColor = theme.background.val;
  const media = tg.useMedia();

  if (media.gtMd) {
    // Use a basic custom layout on web.
    return (
      <tg.YStack f={1}>
        <Banner />
        <Drawer
          screenOptions={{
            drawerType: 'permanent',
            headerLeft: () => null,
            drawerStyle: {
              width: 175,
            },
          }}
          useLegacyImplementation={false}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: 'Tasks',
              headerRight: () => (
                <Link href="/modal" asChild>
                  <tg.Button unstyled p="$0" m="$4">
                    <Info color={accentColor} testID="info-icon" />
                  </tg.Button>
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
      </tg.YStack>
    );
  }

  return (
    <tg.YStack f={1}>
      <Tabs
        screenOptions={{
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: true,
          tabBarActiveTintColor: backgroundColor,
        }}
        sceneContainerStyle={{
          flex: 1,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tasks',
            tabBarIcon: ({ color }) => <MessageCircle color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <tg.Button unstyled p="$0" m="$4">
                  <Info color={accentColor} testID="info-icon" />
                </tg.Button>
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
            tabBarButton: (props) => (
              <Pressable {...props} testID="tab-settings" />
            ),
          }}
        />
      </Tabs>
    </tg.YStack>
  );
}
