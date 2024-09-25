import { store } from '../store';
import { deleteFeature } from './deleteFeature';
import { Feature, FeatureStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('deleteFeature', () => {
  beforeEach(() => {
    store.delTables();
  });

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
