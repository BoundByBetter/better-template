import { Feature, featureDeleted } from '@boundbybetter/shared';
import { deleteFeature } from '@boundbybetter/state';
import { tg } from '@boundbybetter/ui';
import moment from 'moment';
import { Platform } from 'react-native';

export interface FeatureProps {
  feature: Feature;
}

export function FeatureItem(props: FeatureProps) {
  const deleteFeatureHandler = () => {
    deleteFeature(props.feature.id);
  };

  return (
    <tg.YStack gap="$2">
      <tg.Card fd="row" key={props.feature.id} testID="feature-item">
        <tg.Stack
          f={1}
          p="$4"
          pr="$0"
          $gtSm={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <tg.Text f={1} testID="feature-item.title">
            {props.feature.key}
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
              {props.feature.status}
            </tg.Text>
            <tg.Text
              $gtSm={{ alignSelf: 'flex-end', paddingRight: '$4' }}
              pl="$4"
            >
              {moment(props.feature.createdAt).fromNow()}
            </tg.Text>
          </tg.Stack>
        </tg.Stack>
        <tg.Button $gtSm={{ height: '100%' }} onPress={deleteFeatureHandler}>
          X
        </tg.Button>
      </tg.Card>
    </tg.YStack>
  );
}
