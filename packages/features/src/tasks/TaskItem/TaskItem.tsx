import React, { forwardRef } from 'react';
import { logSetup } from '@boundbybetter/shared';
import { useTask } from '@boundbybetter/state';
import { tg } from '@boundbybetter/ui';
import moment from 'moment';
import { Platform } from 'react-native';
import { View } from 'react-native';

export interface TaskProps {
  id: string;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const TaskItemComponent = forwardRef<View, TaskProps>(
  ({ id, isSelected, onSelect, onDelete }, ref) => {
    logSetup('TaskList', 'TaskItem', 'id', id, 'isSelected', isSelected);
    const task = useTask(id, ['TaskList', 'TaskItem']);

    return (
      <View ref={ref}>
        <tg.YStack gap="$2">
          <tg.Card
            fd="row"
            key={task?.id ?? id}
            testID="task-item"
            backgroundColor={isSelected ? '$color4' : undefined}
            focusable
            tabIndex={0}
            onPress={onSelect}
          >
            <tg.Stack
              f={1}
              p="$4"
              pr="$0"
              $gtSm={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <tg.Text f={1} testID="task-item-title">
                {task?.title ?? 'Task not found'}
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
                  $gtSm={{
                    flex:
                      /* istanbul ignore next */ Platform.OS === 'web'
                        ? undefined
                        : /* istanbul ignore next */ -1,
                  }}
                  fontStyle="italic"
                >
                  Stewart Armbrecht
                </tg.Text>
                <tg.Text
                  $gtSm={{ alignSelf: 'flex-end', paddingRight: '$4' }}
                  pl="$4"
                >
                  {task ? moment(task?.createdAt).fromNow() : ''}
                </tg.Text>
              </tg.Stack>
            </tg.Stack>
            {task && (
              <tg.Button
                $gtSm={{ height: '100%' }}
                onPress={(e) => {
                  /* The following code does not fire in jest tests. */
                  /* istanbul ignore next */
                  if (e) {
                    e.stopPropagation();
                    e.preventDefault();
                  }
                  onDelete();
                }}
                testID="task-item-delete"
              >
                X
              </tg.Button>
            )}
          </tg.Card>
        </tg.YStack>
      </View>
    );
  },
);

// Assign display name
TaskItemComponent.displayName = 'TaskItem';

export const TaskItem = TaskItemComponent;
