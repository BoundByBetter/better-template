import { useState } from 'react';
import { useAppDispatch } from '@boundbybetter/state';
import { nanoid } from '@reduxjs/toolkit';
import { Feature, FeatureStatus, featureAdded } from '@boundbybetter/shared';
import { logMessage } from '@boundbybetter/shared';
import { Adapt, Button, Input, Paragraph, Select, Sheet, Text, XStack } from '@boundbybetter/ui';
import { Check, ChevronDown } from '@tamagui/lucide-icons';

export function AddFeature() {
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureStatus, setNewFeatureStatus] = useState('INACTIVE');
  const dispatch = useAppDispatch();
  const createFeature = () => {
    const feature: Feature = {
      id: nanoid(),
      key: newFeatureName,
      status: newFeatureStatus as FeatureStatus,
      groups: [],
      createdAt: new Date().toISOString(),
    };
    dispatch(featureAdded(feature));
    logMessage('Feature saved successfully!', feature);
  }
  const native = false;
  return (
    <XStack gap="$4" ai="center" flexWrap='wrap'>
      <Paragraph>
        New Feature:
      </Paragraph>
      <Input
        onChangeText={text => setNewFeatureName(text)}
        value={newFeatureName}
        placeholder='New Feature Key'
        accessibilityLabel='New Feature Key'
        flex={2}
        testID='new-feature-key'
        minWidth={200}
      />
      <Select value={newFeatureStatus} onValueChange={(value) => setNewFeatureStatus(value)}>
        <Select.Trigger width={150} iconAfter={ChevronDown}>
          <Select.Value testID='select-status' placeholder={newFeatureStatus}  />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native={!!native}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.Viewport
            // to do animations:
            // animation="quick"
            // animateOnly={['transform', 'opacity']}
            // enterStyle={{ o: 0, y: -10 }}
            // exitStyle={{ o: 0, y: 10 }}
            minWidth={200}
          >
            {
                [FeatureStatus.ACTIVE, FeatureStatus.INACTIVE].map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item}
                      value={item}
                    >
                      <Select.ItemText testID={`select-status-${item}`}>{item}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                })
            }
          </Select.Viewport>
        </Select.Content>
      </Select>
      <Button 
        onPress={createFeature}
        testID="new-feature-submit"
      >Add</Button>
    </XStack>
  );
}
