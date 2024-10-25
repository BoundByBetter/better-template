import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { AddFeature } from './AddFeature';
import { useAddFeature } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-native/extend-expect';

jest.mock('@boundbybetter/state', () => ({
  useAddFeature: jest.fn(),
}));

describe('AddFeature', () => {
  it('should update the key when input value changes', async () => {
    const { getByPlaceholderText } = renderWithTamagui(<AddFeature />);
    const inputElement = getByPlaceholderText('New Feature Key');
    fireEvent.changeText(inputElement, 'New Feature Key');
    await waitFor(() =>
      expect(inputElement.props.value).toBe('New Feature Key'),
    );
  });

  it('should update the status when the selected value changes', async () => {
    const addFeatureMock = jest.fn();
    (useAddFeature as jest.Mock).mockImplementation(() => addFeatureMock);
    const { getByTestId, getByText } = renderWithTamagui(<AddFeature />);
    const select = getByTestId('select-status');
    expect(select).toBeTruthy();
    fireEvent(select, 'onValueChange', 'ACTIVE');
    await waitFor(() => expect(select).toHaveTextContent('ACTIVE'));
    const addButton = getByText('Add');
    fireEvent.press(addButton);
    expect(addFeatureMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'ACTIVE',
      }),
    );
  });

  it('should call addFeature when Add button is pressed', async () => {
    const addFeatureMock = jest.fn();
    (useAddFeature as jest.Mock).mockImplementation(() => addFeatureMock);
    const { getByPlaceholderText, getByText } = renderWithTamagui(
      <AddFeature />,
    );
    const inputElement = getByPlaceholderText('New Feature Key');
    const addButton = getByText('Add');

    fireEvent.changeText(inputElement, 'New Feature Title');
    fireEvent.press(addButton);

    await waitFor(() =>
      expect(addFeatureMock).toHaveBeenCalledWith(
        expect.objectContaining({
          key: 'New Feature Title',
          status: 'INACTIVE',
          groups: [],
        }),
      ),
    );
  });
});
