import { useMetric, useMetrics } from 'tinybase/ui-react';
import { useCurrentUser } from '@boundbybetter/auth';
export const useTaskCount = (testUserId?: string): number => {
  const prodUser = useCurrentUser();
  const user = testUserId ?? prodUser.userId;
  const metrics = useMetrics(user);
  return useMetric('taskCount', metrics) ?? 0;
};
