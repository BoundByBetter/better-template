/* istanbul ignore file */
import { SerializedError } from '@reduxjs/toolkit';
import { StateObject } from '@boundbybetter/shared';

export interface StateObjectCollection<T extends StateObject> {
  ids: string[];
  entities: Record<string, T>;
  status: string;
  error: SerializedError | null;
}
