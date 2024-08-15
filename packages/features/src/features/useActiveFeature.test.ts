import { renderHook } from '@testing-library/react-native';
import { useAppSelector } from '@boundbybetter/state';
import { FeatureStatus } from '@boundbybetter/shared';
import { useActiveFeature } from './useActiveFeature';

jest.mock('@boundbybetter/state', () => ({
  useAppSelector: jest.fn(),
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
    const feature = undefined;
    const userGroups = ['group1'];

    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce(userGroups);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(true);
  });

  it('should return true when feature is active and user belongs to at least one group regardless of group case', () => {
    const featureKey = 'feature1';
    const feature = undefined;
    const userGroups = ['Group1'];

    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce(userGroups);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(true);
  });
  it('should return false when feature is not active', () => {
    const featureKey = 'feature2';
    const feature = { status: FeatureStatus.INACTIVE };
    const userGroups = ['group1'];

    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce(userGroups);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(false);
  });

  it('should return false when user does not belong to any group', () => {
    const featureKey = 'feature3';
    const feature = { groups: ['group1'], status: FeatureStatus.ACTIVE };
    const userGroups: string[] = [];

    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce(userGroups);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(false);
  });

  it('should return false when feature is not defined and requires activitation', () => {
    const featureKey = 'feature4';
    const feature = undefined;
    const userGroups = ['group1'];

    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce(feature);
    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce(userGroups);

    const { result } = renderHook(() => useActiveFeature(featureKey));

    expect(result.current).toBe(false);
  });
});
