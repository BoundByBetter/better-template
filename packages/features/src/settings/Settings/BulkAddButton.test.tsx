import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { BulkAddButton } from './BulkAddButton';
import { bulkAddTasks, useBulkLoadStatus } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';

jest.mock('@boundbybetter/state', () => ({
  bulkAddTasks: jest.fn(),
  useBulkLoadStatus: jest.fn(),
}));

describe('BulkAddButton', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'development';
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('should render the button with correct text', () => {
    const { getByText } = renderWithTamagui(<BulkAddButton count={100} />);
    expect(getByText('Bulk Add 100 Tasks')).toBeTruthy();
  });

  it('should call bulkAddTasks when pressed', () => {
    const { getByText } = renderWithTamagui(<BulkAddButton count={100} />);
    const button = getByText('Bulk Add 100 Tasks');

    fireEvent.press(button);

    expect(bulkAddTasks).toHaveBeenCalledWith(100);
  });

  it('should not render in production environment', () => {
    process.env.NODE_ENV = 'production';

    const { queryByTestId } = renderWithTamagui(<BulkAddButton count={100} />);
    expect(queryByTestId('bulk-add-button')).toBeNull();
  });
});
