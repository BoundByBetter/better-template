import { renderHook } from '@testing-library/react-native';
import { useFeature } from '@boundbybetter/state';
import { FeatureStatus } from '@boundbybetter/shared';
import { useActiveFeature } from './useActiveFeature';
import { useCurrentUser } from '@boundbybetter/auth';
import { describe, it, expect } from '@jest/globals';

jest.mock('@boundbybetter/state', () => ({
  useFeature: jest.fn(),
}));

jest.mock('@boundbybetter/auth', () => ({
  useCurrentUser: jest.fn(),
}));

jest.mock('./Features', () => ({
  features: {
    feature1: {
      key: 'feature1',
      defaultGroups: ['group1'],
    },
    feature2: {
      key: 'feature2',
    },
    feature3: {
      key: 'feature3',
      groups: ['group1'],
    },
    feature4: {
      key: 'feature4',
      requiresActivation: true,
    },
  },
}));

describe('useActiveFeature', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when feature is active and user belongs to at least one group', () => {
    const featureKey = 'feature1';
    const feature = { status: FeatureStatus.ACTIVE };
    const userGroups = ['group1'];

    (useFeature as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useCurrentUser as unknown as jest.Mock).mockReturnValueOnce({
      groups: userGroups,
    });

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(true);
  });

  it('should return true when the feature is active, does not require any groups and the user is not set', () => {
    const featureKey = 'feature2';
    const feature = { status: FeatureStatus.ACTIVE };

    (useFeature as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useCurrentUser as unknown as jest.Mock).mockReturnValueOnce(undefined);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(true);
  });

  it('should return true when feature is active and user belongs to at least one group regardless of group case', () => {
    const featureKey = 'feature1';
    const feature = undefined;
    const user = { groups: ['Group1'] };

    (useFeature as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useCurrentUser as unknown as jest.Mock).mockReturnValueOnce(user);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(true);
  });
  it('should return false when feature is not active', () => {
    const featureKey = 'feature2';
    const feature = { status: FeatureStatus.INACTIVE };
    const user = { groups: ['group1'] };

    (useFeature as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useCurrentUser as unknown as jest.Mock).mockReturnValueOnce(user);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(false);
  });

  it('should return false when user does not belong to any group', () => {
    const featureKey = 'feature3';
    const feature = { groups: ['group1'], status: FeatureStatus.ACTIVE };
    const user = { groups: ['group2'] };

    (useFeature as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useCurrentUser as unknown as jest.Mock).mockReturnValueOnce(user);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(false);
  });

  it('should return false when feature is not defined and requires activitation', () => {
    const featureKey = 'feature4';
    const feature = undefined;
    const user = { groups: ['group1'] };

    (useFeature as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useCurrentUser as unknown as jest.Mock).mockReturnValueOnce(user);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(false);
  });

  it('should return false when the feature is not defined in Features object', () => {
    const featureKey = 'nonexistentFeature';
    const feature = undefined;
    const user = { groups: ['group1'] };

    (useFeature as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useCurrentUser as unknown as jest.Mock).mockReturnValueOnce(user);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(false);
  });
});
