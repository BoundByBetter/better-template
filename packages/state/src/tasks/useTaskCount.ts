import { useMetric } from 'tinybase/ui-react';
import { metrics } from '../store';
import { logCall } from '@boundbybetter/shared';

export const useTaskCount = (caller?: string[]): number => {
  const logParams = caller ? [...caller, 'useTaskCount'] : ['useTaskCount'];
  logCall(logParams[0], ...logParams.slice(1));
  return useMetric('taskCount', metrics) ?? 0;
};
