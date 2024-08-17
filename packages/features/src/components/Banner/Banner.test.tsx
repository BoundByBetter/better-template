import * as React from 'react';

import { Banner } from './Banner';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

jest.mock('expo-image');

// Mock the react-native-safe-area-context hook
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('Banner', () => {
  it('should render the App title', async () => {
    (useSafeAreaInsets as unknown as jest.Mock).mockReturnValue({ top: 10 });
    const { getByText } = renderWithTamagui(<Banner />);
    expect(getByText('My App')).toBeTruthy();
  });
});
