import { PostsScreen } from '@boundbybetter/features';
import { YStack } from '@boundbybetter/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeTab() {
  const insets = useSafeAreaInsets();
  return (
    <YStack f={1} ml={insets.left} mr={insets.right}>
      <PostsScreen />
    </YStack>
  );
}
