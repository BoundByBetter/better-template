import React from 'react';
import { tg } from '@boundbybetter/ui';
import { useAppDispatch } from '@boundbybetter/state';
import { userLoggedIn } from '@boundbybetter/shared';

export const LogInScreen = () => {
  const dispatch = useAppDispatch();
  const logIn = (method: string) => {
    dispatch(
      userLoggedIn({
        userName: 'Test User',
        userEmail: 'testuser@boundbybetter.com',
        groups: [],
      }),
    );
    // TODO: Implement login logic for the selected method
    // console.log(`Logging in with ${method}`);
  };

  return (
    <tg.YStack padding="$4" space="$2" testID="app-log-in">
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
