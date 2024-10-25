import { renderHook } from '@testing-library/react-native';
import { useFeature } from './useFeature';
import { useUserStore } from '../useUserStore';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { createStore, Store } from 'tinybase/store';

jest.mock('../useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('useFeature', () => {
  let store: Store;
  const mockUseUserStore = useUserStore as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    store = createStore();
    mockUseUserStore.mockReturnValue(store);
  });

  it('should return a specific feature from the store', async () => {
    const featureId = 'feature1';
    const mockFeature = {
      id: 'feature1',
      key: 'Feature 1',
      status: 'ACTIVE',
      groups: JSON.stringify(['group1']),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.setRow('features', featureId, mockFeature);

    const { result } = renderHook(() => useFeature(featureId));

    expect(result.current).toEqual({
      id: 'feature1',
      key: 'Feature 1',
      status: 'ACTIVE',
      groups: ['group1'],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('should return undefined for a non-existent feature', async () => {
    const featureId = 'feature3';

    const { result } = renderHook(() => useFeature(featureId));

    expect(result.current).toBeUndefined();
  });

  it('should return an empty array when there are no groups', async () => {
    const featureId = 'feature1';
    const mockFeature = {
      id: 'feature1',
      key: 'Feature 1',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.setRow('features', featureId, mockFeature);

    const { result } = renderHook(() => useFeature(featureId));

    expect(result.current).toEqual({
      id: 'feature1',
      key: 'Feature 1',
      status: 'ACTIVE',
      groups: [],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('should return an empty array for groups when the groups property is not set', () => {
    const featureId = 'feature1';
    const mockFeature = {
      id: 'feature1',
      key: 'Feature 1',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.setRow('features', featureId, mockFeature);

    const { result } = renderHook(() => useFeature(featureId));

    expect(result.current).toEqual({
      id: 'feature1',
      key: 'Feature 1',
      status: 'ACTIVE',
      groups: [],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
