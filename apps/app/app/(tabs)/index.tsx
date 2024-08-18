import { PostsScreen } from '@boundbybetter/features';
import { tg } from '@boundbybetter/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PostsTab() {
  const insets = useSafeAreaInsets();
  return (
    <tg.YStack f={1} ml={insets.left} mr={insets.right} testID="home-screen">
      <PostsScreen />
    </tg.YStack>
  );
}
