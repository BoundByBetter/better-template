import { Post, postDeleted } from '@boundbybetter/shared';
import { useAppDispatch } from '@boundbybetter/state';
import { tg } from '@boundbybetter/ui';
import moment from 'moment';
import { Platform } from 'react-native';

export interface PostProps {
  post: Post;
}

export function PostItem(props: PostProps) {
  const dispatch = useAppDispatch();
  const deletePostHandler = () => {
    dispatch(postDeleted(props.post));
  };

  return (
    <tg.YStack gap="$2">
      <tg.Card fd="row" key={props.post.id} testID="post-item">
        <tg.Stack
          f={1}
          p="$4"
          pr="$0"
          $gtSm={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <tg.Text f={1} testID="post-item.title">
            {props.post.title}
          </tg.Text>
          <tg.Stack
            fd="row"
            mt="$4"
            $gtSm={{
              flex: -1,
              marginTop: '$0',
              marginLeft: '$4',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <tg.Text
              f={1}
              // Fixes a layout bug on mobile.  if this is set to 1, the title compresses.
              $gtSm={{
                flex:
                  /*istanbul ignore next*/ Platform.OS === 'web'
                    ? undefined
                    : -1,
              }}
              fontStyle="italic"
            >
              Stewart Armbrecht
            </tg.Text>
            <tg.Text
              $gtSm={{ alignSelf: 'flex-end', paddingRight: '$4' }}
              pl="$4"
            >
              {moment(props.post.createdAt).fromNow()}
            </tg.Text>
          </tg.Stack>
        </tg.Stack>
        <tg.Button $gtSm={{ height: '100%' }} onPress={deletePostHandler}>
          X
        </tg.Button>
      </tg.Card>
    </tg.YStack>
  );
}
