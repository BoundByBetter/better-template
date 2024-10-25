import { renderHook } from '@testing-library/react-native';
import { useFeatures } from './useFeatures';
import { useUserStore } from '../useUserStore';
import { useTable } from 'tinybase/ui-react';
import { describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('../useUserStore', () => ({
  useUserStore: jest.fn(),
}));

jest.mock('tinybase/ui-react', () => ({
  useTable: jest.fn(),
}));

describe('useFeatures', () => {
  const mockUseUserStore = useUserStore as jest.Mock;
  const mockUseTable = useTable as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUserStore.mockReturnValue({});
  });

  it('should return all features from the store', () => {
    const features = {
      feature1: {
        id: 'feature1',
        key: 'Feature 1',
        status: 'ACTIVE',
        groups: JSON.stringify(['group1']),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      feature2: {
        id: 'feature2',
        key: 'Feature 2',
        status: 'INACTIVE',
        groups: JSON.stringify([]),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    mockUseTable.mockReturnValue(features);

    const { result } = renderHook(() => useFeatures());

    expect(result.current).toEqual([
      {
        id: 'feature1',
        key: 'Feature 1',
        status: 'ACTIVE',
        groups: ['group1'],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: 'feature2',
        key: 'Feature 2',
        status: 'INACTIVE',
        groups: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });

  it('should return undefined when there are no features', () => {
    mockUseTable.mockReturnValue({});

    const { result } = renderHook(() => useFeatures());

    expect(result.current).toBeUndefined();
  });
});
