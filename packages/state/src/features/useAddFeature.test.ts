import { renderHook } from '@testing-library/react-native';
import { useAddFeature } from './useAddFeature';
import { Feature, FeatureStatus } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore'; // Import the useStore hook
import { describe, it, expect, beforeEach } from '@jest/globals';
import { act } from '@testing-library/react-native';

jest.mock('../useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('useAddFeature', () => {
  const mockSetRow = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as jest.Mock).mockReturnValue({
      setRow: mockSetRow,
    });
  });

  it('should add a feature to the store with createdAt and updatedAt', async () => {
    const feature: Feature = {
      id: '1',
      key: 'test-feature',
      status: FeatureStatus.ACTIVE,
      groups: ['group1', 'group2'],
    };

    const { result } = renderHook(() => useAddFeature());
    await act(() => {
      result.current(feature);
    });

    expect(mockSetRow).toHaveBeenCalledWith('features', feature.id, {
      ...feature,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('should set createdAt and updatedAt fields correctly', async () => {
    const feature: Feature = {
      id: '1',
      key: 'test-feature',
      status: FeatureStatus.ACTIVE,
      groups: ['group1', 'group2'],
    };

    const { result } = renderHook(() => useAddFeature());
    await act(() => {
      result.current(feature);
    });

    const addedFeature = mockSetRow.mock.calls[0][2];
    expect(addedFeature.createdAt).toBeDefined();
    expect(addedFeature.updatedAt).toBeDefined();
  });
});
