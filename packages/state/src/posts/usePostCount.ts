import { useMetric } from 'tinybase/ui-react';
import { metrics } from '../store';
import { logCall } from '@boundbybetter/shared';

export const usePostCount = (caller?: string[]): number => {
  const logParams = caller ? [...caller, 'usePostCount'] : ['usePostCount'];
  logCall(logParams[0], ...logParams.slice(1));
  return useMetric('postCount', metrics) ?? 0;
};
