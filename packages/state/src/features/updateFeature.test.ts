import { store } from '../store';
import { updateFeature } from './updateFeature';
import { Feature, FeatureStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('updateFeature', () => {
  beforeEach(() => {
    store.delTables();
  });

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
