import { renderHook } from '@testing-library/react-native';
import { useFeature, useFeatures } from './hooks';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('feature hooks', () => {
  beforeEach(() => {
    store.delTables();
  });

  describe('useFeature', () => {
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
  });

  describe('useFeatures', () => {
    it('should return all features from the store', () => {
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

      const { result } = renderHook(() => useFeatures());

      // Check that the createdAt and updatedAt fields are set
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
      const { result } = renderHook(() => useFeatures());

      expect(result.current).toBeUndefined();
    });

    it('should return an empty array when there are no groups', () => {
      store.setTable('features', {
        feature1: {
          id: 'feature1',
          key: 'Feature 1',
          status: 'ACTIVE',
        },
      });

      const { result } = renderHook(() => useFeatures());

      expect(result.current[0].groups).toEqual([]);
    });
  });
});
