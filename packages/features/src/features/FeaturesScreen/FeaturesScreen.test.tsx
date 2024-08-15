import React from 'react';
import { FeaturesScreen } from './FeaturesScreen';
import { FeatureList } from '../FeatureList';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

// Mock My Features
jest.mock('../FeatureList', () => ({
  FeatureList: jest.fn().mockImplementation(() => null),
}));

describe('FeaturesScreen', () => {
  it('should render FeatureList', async () => {
    renderWithTamagui(<FeaturesScreen />);
    expect(FeatureList as jest.Mock).toHaveBeenCalled();
  });
});
