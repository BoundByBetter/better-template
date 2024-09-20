import { PostList } from '../PostList';
import { tg } from '@boundbybetter/ui';

export function PostsScreen() {
  return (
    <tg.YStack gap="$4" flex={1}>
      <PostList />
    </tg.YStack>
  );
}
