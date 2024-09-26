import { renderHook } from '@testing-library/react-native';
import { useBulkLoadStatus } from './useBulkLoadStatus';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('useBulkLoadStatus', () => {
  beforeEach(() => {
    store.delTables();
  });

  it('should return the bulk load status', () => {
    store.setTable('app', {
      status: { isBulkLoading: true, bulkLoadingProgress: 50 },
    });

    const { result } = renderHook(() => useBulkLoadStatus());

    expect(result.current).toEqual({
      isBulkLoading: true,
      bulkLoadingProgress: 50,
    });
  });

  it('should return the bulk load status from the store', () => {
    store.setTable('app', {
      status: { isBulkLoading: true, bulkLoadingProgress: 50 },
    });

    const { result } = renderHook(() => useBulkLoadStatus());

    expect(result.current).toEqual({
      isBulkLoading: true,
      bulkLoadingProgress: 50,
    });
  });
});
