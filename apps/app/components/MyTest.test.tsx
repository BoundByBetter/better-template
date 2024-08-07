import * as React from 'react';

import { MyTest } from './MyTest';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { act, render } from '@testing-library/react-native';
import { renderWithTamagui } from '../test/renderWithTamagui.test-util';

// Mock the react-native-safe-area-context hook
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('MyTest', () => {
  it('should render My Test', async () => {
    (useSafeAreaInsets as unknown as jest.Mock).mockReturnValue({ top: 10 });
    const { getByText } = renderWithTamagui(<MyTest />);
    await act(async () => {
      expect(getByText('My Test')).toBeTruthy();
    });
  });
});