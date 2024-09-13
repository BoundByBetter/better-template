import React from 'react';
import { FeatureList } from './FeatureList';
import { useFeatures } from '@boundbybetter/state';
import { FeatureItem } from '../FeatureItem';
import { AddFeature } from '../AddFeature';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

//mock useFeatures
jest.mock('@boundbybetter/state', () => ({
  useFeatures: jest.fn(),
}));

//spy on FeatureItem
jest.mock('../FeatureItem', () => ({
  FeatureItem: jest.fn(() => null),
}));

//mock AddFeature
jest.mock('../AddFeature', () => ({
  AddFeature: jest.fn(() => null),
}));

describe('FeatureItems', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a FeatureItem for each feature', () => {
    (useFeatures as jest.Mock).mockReturnValue([
      {
        id: '1',
        key: 'My Feature',
        status: 'ACTIVE',
        groups: [],
      },
      {
        id: '2',
        key: 'My Second Feature',
        status: 'ACTIVE',
        groups: [],
      },
    ]);
    renderWithTamagui(<FeatureList />);
    expect(FeatureItem).toHaveBeenCalledWith(
      {
        feature: {
          id: '1',
          key: 'My Feature',
          status: 'ACTIVE',
          groups: [],
        },
      },
      {},
    );
    expect(FeatureItem).toHaveBeenCalledWith(
      {
        feature: {
          id: '2',
          key: 'My Second Feature',
          status: 'ACTIVE',
          groups: [],
        },
      },
      {},
    );
  });

  it('should not render FeatureItems when features is undefined', () => {
    (useFeatures as jest.Mock).mockReturnValue(undefined);
    renderWithTamagui(<FeatureList />);
    expect(FeatureItem).not.toHaveBeenCalled();
  });

  it('should render an AddFeature', () => {
    (useFeatures as jest.Mock).mockReturnValue(undefined);
    renderWithTamagui(<FeatureList />);
    expect(AddFeature).toHaveBeenCalledWith({}, {});
  });
});
