import React from 'react';
import { tg } from '@boundbybetter/ui';
import { updateCurrentUser } from '@boundbybetter/state';
import { User } from '@boundbybetter/shared';

export const LogInScreen = () => {
  const theme = tg.useTheme();
  const logIn = (method: string) => {
    const newUser: User = {
      userName: 'Test User',
      userEmail: 'testuser@boundbybetter.com',
      groups: [],
    };
    updateCurrentUser(newUser);
    // TODO: Implement login logic for the selected method
    // console.log(`Logging in with ${method}`);
  };

  return (
    <tg.YStack
      padding="$4"
      space="$2"
      testID="app-log-in"
      backgroundColor={theme.background}
      flex={1}
    >
      <tg.H1>My App</tg.H1>
      <tg.H3>Log In</tg.H3>
      <tg.Paragraph>Please select a method for logging in.</tg.Paragraph>
      <tg.Button width="$14" onPress={() => logIn('Microsoft')}>
        Microsoft
      </tg.Button>
      <tg.Button width="$14" onPress={() => logIn('Google')}>
        Google
      </tg.Button>
      <tg.Button width="$14" onPress={() => logIn('Facebook')}>
        Facebook
      </tg.Button>
    </tg.YStack>
  );
};
