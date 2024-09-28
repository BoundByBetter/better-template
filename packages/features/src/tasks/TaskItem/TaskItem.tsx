import { logCall, logSetup } from '@boundbybetter/shared';
import { deleteTask, useTask } from '@boundbybetter/state';
import { tg } from '@boundbybetter/ui';
import moment from 'moment';
import { memo } from 'react';
import { Platform } from 'react-native';

export interface TaskProps {
  id: string;
  isSelected: boolean;
}

const TaskItemComponent = (props: TaskProps) => {
  logSetup(
    'TaskList',
    'TaskItem',
    'id',
    props.id,
    'isSelected',
    props.isSelected,
  );
  const task = useTask(props.id, ['TaskList', 'TaskItem']);
  const deleteTaskHandler = () => {
    logCall('TaskItem', 'deleteTaskHandler');
    deleteTask(props.id);
  };

  return (
    <tg.YStack gap="$2">
      <tg.Card
        fd="row"
        key={task.id}
        testID="task-item"
        backgroundColor={props.isSelected ? '$color4' : undefined}
        focusable
        tabIndex={0}
      >
        <tg.Stack
          f={1}
          p="$4"
          pr="$0"
          $gtSm={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <tg.Text f={1} testID="task-item.title">
            {task.title}
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
              {moment(task.createdAt).fromNow()}
            </tg.Text>
          </tg.Stack>
        </tg.Stack>
        <tg.Button $gtSm={{ height: '100%' }} onPress={deleteTaskHandler}>
          X
        </tg.Button>
      </tg.Card>
    </tg.YStack>
  );
};

export const TaskItem = memo(TaskItemComponent);
