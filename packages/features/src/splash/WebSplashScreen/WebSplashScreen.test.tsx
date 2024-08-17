import React from 'react';
import { WebSplashScreen } from './WebSplashScreen';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

jest.mock('expo-image');

describe('WebSplashScreen', () => {
  it('should render the splash screen', () => {
    const { getByTestId } = renderWithTamagui(<WebSplashScreen />);
    expect(getByTestId('web-splash-screen')).toBeTruthy();
  });
});
