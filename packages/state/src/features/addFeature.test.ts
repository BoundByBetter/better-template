import { store } from '../store';
import { addFeature } from './addFeature';
import { Feature, FeatureStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('addFeature', () => {
  beforeEach(() => {
    store.delTables();
  });

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
});
