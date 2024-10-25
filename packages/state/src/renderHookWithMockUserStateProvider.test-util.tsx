import { renderHook } from '@testing-library/react-native';
import { MergeableStore } from 'tinybase/mergeable-store';
import { UserStoreProvider } from './UserStoreProvider';
export const MockUserStateProvider = ({
  children,
  testStore,
  userId,
}: {
  children: JSX.Element;
  testStore: MergeableStore;
  userId: string;
}) => {
  return (
    <UserStoreProvider testStore={testStore} testUserId={userId}>
      {children}
    </UserStoreProvider>
  );
};

export const renderHookWithMockUserStateProvider = (
  store: MergeableStore,
  userId: string,
  hook: () => any,
) => {
  return renderHook(hook, {
    wrapper: ({ children }) => {
      return (
        <MockUserStateProvider testStore={store} userId={userId}>
          {children}
        </MockUserStateProvider>
      );
    },
  });
};
