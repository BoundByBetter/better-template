import * as React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { AdminBanner } from './AdminBanner';
import { describe, it, expect } from '@jest/globals';

jest.mock('expo-image');

// Mock the react-native-safe-area-context hook
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('AdminBanner', () => {
  it('should render the Admin title', () => {
    (useSafeAreaInsets as unknown as jest.Mock).mockReturnValue({ top: 10 });
    const { getByText } = renderWithTamagui(<AdminBanner />);
    expect(getByText('My Admin')).toBeTruthy();
  });
});
