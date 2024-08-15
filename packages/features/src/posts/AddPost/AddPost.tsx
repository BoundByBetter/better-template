import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@boundbybetter/state';
import { nanoid } from '@reduxjs/toolkit';
import { Post, PostStatus, postAdded } from '@boundbybetter/shared';
import { logMessage } from '@boundbybetter/shared';
import { tg } from '@boundbybetter/ui';
import { useActiveFeature } from '../../features/useActiveFeature';
import { FeatureKeys } from '../../features/Features';

export function AddPost() {
  const [newPostName, setNewPostName] = useState('');
  const dispatch = useAppDispatch();
  const createPost = async () => {
    const post: Post = {
      id: nanoid(),
      title: newPostName,
      rating: 5,
      status: PostStatus.ACTIVE,
      createdAt: new Date().toISOString(),
    };
    dispatch(postAdded(post));
    logMessage('Post saved successfully!', post);
  };
  // istanbul ignore next
  const navigateToPurchase = () => {
    // istanbul ignore next
    logMessage('Navigate to purchase');
  };
  const postCount = useAppSelector(
    /* istanbul ignore next */ (state) => state.posts.ids.length,
  );
  const unlimitedPosts = useActiveFeature(FeatureKeys.MyAppPostsUnlimited);
  const canAdd = postCount < 5 || unlimitedPosts;
  return canAdd ? (
    <tg.XStack gap="$4" ai="center">
      <tg.Paragraph>New Post:</tg.Paragraph>
      <tg.Input
        onChangeText={(text) => setNewPostName(text)}
        value={newPostName}
        placeholder="New Post Name"
        accessibilityLabel="New Post Name"
        flex={1}
        testID="new-post-name"
        onSubmitEditing={createPost}
      />
      <tg.Button onPress={createPost} testID="new-post-submit">
        Add
      </tg.Button>
    </tg.XStack>
  ) : (
    <tg.YStack gap="$4" ai="center">
      <tg.H3>Free Limit Reached</tg.H3>
      <tg.Paragraph>
        The free version is for evaluation purposes only and only allows up to 5
        posts. To add more posts please purchase a license.
      </tg.Paragraph>
      <tg.Button onPress={navigateToPurchase}>Purchase</tg.Button>
    </tg.YStack>
  );
}
