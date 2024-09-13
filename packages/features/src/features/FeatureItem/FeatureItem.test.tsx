import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { FeatureItem } from './FeatureItem';
import { FeatureStatus } from '@boundbybetter/shared';
import { deleteFeature } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

jest.mock('@boundbybetter/state', () => ({
  deleteFeature: jest.fn(),
}));

describe('FeatureItem', () => {
  it('should render the feature title', async () => {
    const feature = {
      id: '1',
      key: 'My Feature',
      status: FeatureStatus.ACTIVE,
      groups: [],
    };
    const { getByText } = renderWithTamagui(<FeatureItem feature={feature} />);
    const title = getByText(feature.key);
    expect(title).toBeTruthy();
  });

  it('should render a delete button', async () => {
    const feature = {
      id: '1',
      key: 'My Feature',
      status: FeatureStatus.ACTIVE,
      groups: [],
    };
    const { getByText } = renderWithTamagui(<FeatureItem feature={feature} />);
    const deleteButton = getByText('X');
    expect(deleteButton).toBeTruthy();
  });

  it('should call deleteFeature when delete button is pressed', async () => {
    const feature = {
      id: '1',
      key: 'My Feature',
      status: FeatureStatus.ACTIVE,
      groups: [],
    };
    const { getByText } = renderWithTamagui(<FeatureItem feature={feature} />);
    const deleteButton = getByText('X');
    fireEvent.press(deleteButton);
    expect(deleteFeature).toHaveBeenCalledWith(feature.id);
  });
});
