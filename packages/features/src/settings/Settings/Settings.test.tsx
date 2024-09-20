import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Settings } from './Settings';
import { useCurrentUser, clearCurrentUser } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

jest.mock('@boundbybetter/state', () => ({
  useCurrentUser: jest.fn(),
  updateCurrentUser: jest.fn(),
  clearCurrentUser: jest.fn(),
}));

describe('Settings', () => {
  it('should render the users name', async () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      userName: 'myusername',
    });
    const { getByText } = renderWithTamagui(<Settings />);
    expect(getByText('Hello there myusername,')).toBeTruthy();
  });

  it('should call clearCurrentUser when the sign out button is pressed', async () => {
    const { getByText } = renderWithTamagui(<Settings />);
    const signOutButton = getByText('Sign Out');
    fireEvent.press(signOutButton);
    expect(clearCurrentUser).toHaveBeenCalled();
  });
});
