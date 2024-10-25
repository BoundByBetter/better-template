import { useDeleteFeature } from './useDeleteFeature';
import { useUserStore } from '../useUserStore';
import { describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('../useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('useDeleteFeature', () => {
  const mockDelRow = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as jest.Mock).mockReturnValue({
      delRow: mockDelRow,
    });
  });

  it('should delete a feature from the store', () => {
    const featureId = '1';
    useDeleteFeature()(featureId);

    expect(mockDelRow).toHaveBeenCalledWith('features', featureId);
  });
});
