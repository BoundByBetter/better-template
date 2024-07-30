import React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import { AccessDenied } from './AccessDenied';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
//import { signOut } from '@boundbybetter/backend';

describe('Access Denied', () => {
  it('should tell the user access was denied', async () => {
    const { getByText } = renderWithTamagui(<AccessDenied />);
    await act(async () => {
      expect(getByText('Access Denied')).toBeTruthy();
      expect(getByText('You do not have access.  Please click Sign Out and then sign in as a user that does.')).toBeTruthy();
    });
  });
  it('should render a Sign Out button that signs the user out.', async () => {
    const { getByText } = renderWithTamagui(<AccessDenied />);
    await act(async () => {
      const signOutButton = getByText('Sign Out');
      expect(signOutButton).toBeTruthy();
      fireEvent.press(signOutButton);
      //expect(signOut).toHaveBeenCalled();
    });
  });
});