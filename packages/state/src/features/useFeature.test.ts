import { renderHook } from '@testing-library/react-native';
import { useFeature } from './useFeature';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('useFeature', () => {
  beforeEach(() => {
    store.delTables();
  });

  it('should return a specific feature from the store', () => {
    store.setTable('features', {
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
    });

    const { result } = renderHook(() => useFeature('feature1'));

    expect(result.current).toEqual({
      id: 'feature1',
      key: 'Feature 1',
      status: 'ACTIVE',
      groups: ['group1'],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('should return undefined for a non-existent feature', () => {
    const { result } = renderHook(() => useFeature('feature3'));

    expect(result.current).toBeUndefined();
  });

  it('should return an empty array when there are no groups', () => {
    store.setTable('features', {
      feature1: {
        id: 'feature1',
        key: 'Feature 1',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    const { result } = renderHook(() => useFeature('feature1'));

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
    store.setTable('features', {
      feature1: {
        id: 'feature1',
        key: 'Feature 1',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    const { result } = renderHook(() => useFeature('feature1'));

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
