import { useCurrentUser } from '@boundbybetter/auth';
import { MergeableStore } from 'tinybase/mergeable-store';
import { useStore } from 'tinybase/ui-react';

export const useUserStore = (): MergeableStore => {
  const currentUser = useCurrentUser();
  const store = useStore(currentUser?.userId);
  return store as MergeableStore;
};
