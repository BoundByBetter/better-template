import { store } from '../store';
import { addFeature, updateFeature, deleteFeature } from './mutations';
import { Feature, FeatureStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('feature mutations', () => {
  beforeEach(() => {
    store.delTables();
  });

  describe('addFeature', () => {
    it('should add a feature to the store', () => {
      const feature: Feature = {
        id: '1',
        key: 'test-feature',
        status: FeatureStatus.ACTIVE,
        groups: ['group1', 'group2'],
      };
      addFeature(feature);
      const storedFeature = store.getRow('features', '1');
      expect(storedFeature).toEqual(feature);
    });
  });

  it('should set the createdAt and updatedAt fields', () => {
    const feature: Feature = {
      id: '1',
      key: 'test-feature',
      status: FeatureStatus.ACTIVE,
      groups: ['group1', 'group2'],
    };
    addFeature(feature);
    const storedFeature = store.getRow('features', '1');
    expect(storedFeature.createdAt).toBeDefined();
    expect(storedFeature.updatedAt).toBeDefined();
  });

  describe('updateFeature', () => {
    it('should update an existing feature in the store', () => {
      const feature: Feature = {
        id: '1',
        key: 'test-feature',
        status: FeatureStatus.ACTIVE,
        groups: ['group1', 'group2'],
      };
      store.setRow('features', feature.id, feature as any);

      const updates: Partial<Feature> = {
        status: FeatureStatus.INACTIVE,
        groups: ['group3'],
      };
      updateFeature('1', updates);

      const updatedFeature = store.getRow('features', '1');
      expect(updatedFeature).toEqual({ ...feature, ...updates });
    });

    it('should set the updatedAt field', () => {
      const feature: Feature = {
        id: '1',
        key: 'test-feature',
        status: FeatureStatus.ACTIVE,
        groups: ['group1', 'group2'],
      };
      store.setRow('features', feature.id, feature as any);

      const updates: Partial<Feature> = {
        status: FeatureStatus.INACTIVE,
        groups: ['group3'],
      };
      updateFeature('1', updates);

      const updatedFeature = store.getRow('features', '1');

      expect(updatedFeature.updatedAt).not.toEqual(feature.updatedAt);
    });
  });

  describe('deleteFeature', () => {
    it('should delete a feature from the store', () => {
      const feature: Feature = {
        id: '1',
        key: 'test-feature',
        status: FeatureStatus.ACTIVE,
        groups: ['group1', 'group2'],
      };
      store.setRow('features', feature.id, feature as any);

      deleteFeature('1');

      const deletedFeature = store.getRow('features', '1');
      expect(deletedFeature).toEqual({});
    });
  });
});
