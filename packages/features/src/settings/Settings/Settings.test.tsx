import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Settings } from './Settings';
import { useCurrentUser, updateCurrentUser } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

jest.mock('@boundbybetter/state', () => ({
  useCurrentUser: jest.fn(),
  updateCurrentUser: jest.fn(),
}));

describe('Settings', () => {
  it('should render the users name', async () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      userName: 'myusername',
    });
    const { getByText } = renderWithTamagui(<Settings />);
    expect(getByText('Hello there myusername,')).toBeTruthy();
  });

  it('should call updateCurrentUser when the sign out button is pressed', async () => {
    const { getByText } = renderWithTamagui(<Settings />);
    const signOutButton = getByText('Sign Out');
    fireEvent.press(signOutButton);
    expect(updateCurrentUser).toHaveBeenCalledWith(null);
  });
});
