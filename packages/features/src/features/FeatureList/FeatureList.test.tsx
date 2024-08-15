import React from 'react';
import { FeatureList } from './FeatureList';
import { useAppSelector } from '@boundbybetter/state';
import { FeatureItem } from '../FeatureItem';
import { AddFeature } from '../AddFeature';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

//mock useAppSelector
jest.mock('@boundbybetter/state', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
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
  it('should render a FeatureItem for each feature', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue([
      {
        id: '1',
        title: 'My Feature',
        status: 'ACTIVE',
        content: 'This is my feature',
      },
      {
        id: '2',
        title: 'My Second Feature',
        status: 'ACTIVE',
        content: 'This is my second feature',
      },
    ]);
    renderWithTamagui(<FeatureList />);
    expect(FeatureItem).toHaveBeenCalledWith(
      {
        feature: {
          id: '1',
          title: 'My Feature',
          status: 'ACTIVE',
          content: 'This is my feature',
        },
      },
      {},
    );
    expect(FeatureItem).toHaveBeenCalledWith(
      {
        feature: {
          id: '2',
          title: 'My Second Feature',
          status: 'ACTIVE',
          content: 'This is my second feature',
        },
      },
      {},
    );
  });
  it('should render an AddFeature', () => {
    renderWithTamagui(<FeatureList />);
    expect(AddFeature).toHaveBeenCalledWith({}, {});
  });
});
