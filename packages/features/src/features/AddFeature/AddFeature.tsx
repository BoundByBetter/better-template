import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Feature, FeatureStatus } from '@boundbybetter/shared';
import { logMessage } from '@boundbybetter/shared';
import { tg } from '@boundbybetter/ui';
import { Check, ChevronDown } from '@tamagui/lucide-icons';
import { addFeature } from '@boundbybetter/state';

export function AddFeature() {
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureStatus, setNewFeatureStatus] = useState('INACTIVE');

  const createFeature = () => {
    const feature: Feature = {
      id: nanoid(),
      key: newFeatureName,
      status: newFeatureStatus as FeatureStatus,
      groups: [],
      createdAt: new Date().toISOString(),
    };
    addFeature(feature);
    logMessage('Feature saved successfully!', feature);
  };

  const native = false;
  return (
    <tg.XStack gap="$4" ai="center" flexWrap="wrap">
      <tg.Paragraph>New Feature:</tg.Paragraph>
      <tg.Input
        onChangeText={(text) => setNewFeatureName(text)}
        value={newFeatureName}
        placeholder="New Feature Key"
        accessibilityLabel="New Feature Key"
        flex={2}
        testID="new-feature-key"
        minWidth={200}
      />
      <tg.Select
        value={newFeatureStatus}
        onValueChange={(value) => setNewFeatureStatus(value)}
      >
        <tg.Select.Trigger width={150} iconAfter={ChevronDown}>
          <tg.Select.Value
            testID="select-status"
            placeholder={newFeatureStatus}
          />
        </tg.Select.Trigger>

        <tg.Adapt when="sm" platform="touch">
          <tg.Sheet
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
            <tg.Sheet.Frame>
              <tg.Sheet.ScrollView>
                <tg.Adapt.Contents />
              </tg.Sheet.ScrollView>
            </tg.Sheet.Frame>
            <tg.Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </tg.Sheet>
        </tg.Adapt>

        <tg.Select.Content zIndex={200000}>
          <tg.Select.Viewport minWidth={200}>
            {[FeatureStatus.ACTIVE, FeatureStatus.INACTIVE].map((item, i) => {
              return (
                <tg.Select.Item index={i} key={item} value={item}>
                  <tg.Select.ItemText testID={`select-status-${item}`}>
                    {item}
                  </tg.Select.ItemText>
                  <tg.Select.ItemIndicator marginLeft="auto">
                    <Check size={16} />
                  </tg.Select.ItemIndicator>
                </tg.Select.Item>
              );
            })}
          </tg.Select.Viewport>
        </tg.Select.Content>
      </tg.Select>
      <tg.Button onPress={createFeature} testID="new-feature-submit">
        Add
      </tg.Button>
    </tg.XStack>
  );
}
