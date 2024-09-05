import React, { useEffect } from 'react';
import { render } from '@testing-library/react-native';

import { State } from './State';
import { useAppDispatch, useAppSelector } from './hooks';
import { userLoggedIn } from '@boundbybetter/shared';
import { selectUser } from './user/userSlice';
import { Text } from 'react-native';
import { describe, it, expect } from '@jest/globals';

describe('State', () => {
  it('should load the store for use by child components', () => {
    const { findByText } = render(
      <State>
        <MyTest />
      </State>,
    );
    expect(findByText('Test User')).toBeTruthy();
  });
});

function MyTest() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      userLoggedIn({
        userName: 'Test User',
        userEmail: 'test@test.com',
        groups: [],
      }),
    );
  }, [dispatch]);
  const user = useAppSelector(selectUser);
  return <Text>{user.userName}</Text>;
}
