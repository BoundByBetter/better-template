import React, { useEffect } from 'react';
import { render } from '@testing-library/react-native';

import { MyState } from './MyState';
import { useAppDispatch, useAppSelector } from './hooks';
import { userLoggedIn } from '@boundbybetter/shared';
import { selectUser } from './user/userSlice';
import { Text } from 'react-native';

describe('MyState', () => {
  it('should load the store for use by child components', () => {
    const { findByText } = render(
      <MyState>
        <MyTest />
      </MyState>,
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
