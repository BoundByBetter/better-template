import { Stack } from 'expo-router';
import { tg } from '@boundbybetter/ui';

export default function WelcomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Welcome' }} />
      <tg.YStack testID="welcome-screen">
        <tg.Text>Welcome to the site!</tg.Text>
      </tg.YStack>
    </>
  );
}
