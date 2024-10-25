import { renderHook } from '@testing-library/react-native';
import { useBulkLoadStatus } from './useBulkLoadStatus';
import { useUserStore } from '../useUserStore';
import { createStore } from 'tinybase';
import { describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('../useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('useBulkLoadStatus', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = createStore();
    (useUserStore as jest.Mock).mockReturnValue(store);
  });

  it('should return the bulk load status', () => {
    store.setTable('app', {
      status: {
        isBulkLoading: true,
        bulkLoadingProgress: 50,
      },
    });

    const { result } = renderHook(() => useBulkLoadStatus());

    expect(result.current).toEqual({
      isBulkLoading: true,
      bulkLoadingProgress: 50,
    });
  });

  it('should return the bulk load status from the store', () => {
    store.setTable('app', {
      status: {
        isBulkLoading: false,
        bulkLoadingProgress: 0,
      },
    });

    const { result } = renderHook(() => useBulkLoadStatus());

    expect(result.current).toEqual({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });
  });
});
