import { useUpdateFeature } from './useUpdateFeature';
import { useUserStore } from '../useUserStore';
import { Feature, FeatureStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('../useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('updateFeature', () => {
  const mockSetPartialRow = jest.fn();
  const mockDelTables = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as jest.Mock).mockReturnValue({
      setPartialRow: mockSetPartialRow,
      delTables: mockDelTables,
    });
    mockDelTables();
  });

  it('should update an existing feature in the store', () => {
    const updates: Partial<Feature> = {
      status: FeatureStatus.INACTIVE,
      groups: ['group3'],
    };

    useUpdateFeature()('1', updates);

    expect(mockSetPartialRow).toHaveBeenCalledWith('features', '1', {
      ...updates,
      updatedAt: expect.any(String),
    });
  });

  it('should set the updatedAt field', () => {
    const updates: Partial<Feature> = {
      status: FeatureStatus.INACTIVE,
      groups: ['group3'],
    };

    useUpdateFeature()('1', updates);

    expect(mockSetPartialRow).toHaveBeenCalledWith('features', '1', {
      ...updates,
      updatedAt: expect.any(String),
    });
  });
});
