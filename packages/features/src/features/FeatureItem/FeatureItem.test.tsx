import React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import { FeatureItem } from './FeatureItem';
import { FeatureStatus } from '@boundbybetter/shared';
import { useAppDispatch } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

jest.mock('@boundbybetter/state');

describe('FeatureItem', () => {
  it('should render the feature title', async () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const feature = {
      id: '1',
      key: 'My Feature',
      status: FeatureStatus.ACTIVE,
      groups: [],
    };
    const { getByText } = renderWithTamagui(<FeatureItem feature={feature} />);
    await act(async () => {
      const title = getByText(feature.key);
      expect(title).toBeTruthy();
    });
  });
  it('should render a delete button', async () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const feature = {
      id: '1',
      key: 'My Feature',
      status: FeatureStatus.ACTIVE,
      groups: [],
    };
    const { getByText } = renderWithTamagui(<FeatureItem feature={feature} />);
    await act(async () => {
      const deleteButton = getByText('X');
      expect(deleteButton).toBeTruthy();
    });
  });
  it('should dispatch a featureDeleted action when delete button is pressed', async () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const feature = {
      id: '1',
      key: 'My Feature',
      status: FeatureStatus.ACTIVE,
      groups: [],
    };
    const { getByText } = renderWithTamagui(<FeatureItem feature={feature} />);
    const deleteButton = getByText('X');
    await act(async () => {
      fireEvent.press(deleteButton);
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'features/featureDeleted',
      payload: feature,
    });
  });
});
