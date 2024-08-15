/* istanbul ignore file */
import { FeatureStatus } from './FeatureStatus';
import { StateObject } from './StateObject';

export interface Feature extends StateObject {
  status: FeatureStatus | keyof typeof FeatureStatus;
  key: string;
  groups: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
}
