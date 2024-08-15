import { PostList } from '../PostList';
import { ScrollView } from 'react-native';
import { tg } from '@boundbybetter/ui';

export function PostsScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ alignSelf: 'stretch', margin: 12 }}
    >
      <tg.YStack gap="$4">
        <PostList />
      </tg.YStack>
    </ScrollView>
  );
}
