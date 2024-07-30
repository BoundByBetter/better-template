export interface FeatureKey {
  requiresActivation?: boolean;
  defaultGroups?: string[];
  actions?: {
    [key: string]: number;
  };
}

export interface FeatureDetail {
  [key: string]: FeatureKey;
}

export class FeatureKeys {
  // Max: 7
  public static readonly MyAppPosts = 'MyAppPosts';
  public static readonly MyAppPostsUnlimited = 'MyAppPostsUnlimited';
  public static readonly MyAppFeatures = 'MyAppFeatures';
  public static readonly MyAppSettings = 'MyAppSettings';
  public static readonly MyAppDocs = 'MyAppDocs';
  public static readonly MyAppAuth = 'MyAppAuth';
  public static readonly MyAdminFeatures = 'MyAdminFeatures';
}
const features: FeatureDetail = {};
features[FeatureKeys.MyAppPosts] =          { actions: { read: 1, refresh: 2, create: 3, update: 4, delete: 5 } };
features[FeatureKeys.MyAppPostsUnlimited] = { actions: { read: 1, refresh: 2, create: 3, update: 4, delete: 5 }, defaultGroups: ['licensed'] };
features[FeatureKeys.MyAppFeatures] =       { actions: { read: 1 }};
features[FeatureKeys.MyAppSettings] =       { actions: { read: 1, signOut: 2 }};
features[FeatureKeys.MyAppDocs] =           { actions: { read: 1 }};
features[FeatureKeys.MyAppAuth] =           { actions: { signIn: 1, signOut: 2, signInFailure: 3, passwordReminder: 4, createAccount: 5 }};
features[FeatureKeys.MyAdminFeatures] =     { actions: { read: 1, create: 2, update: 3, delete: 4 }, defaultGroups: ['admin']};

export { features };