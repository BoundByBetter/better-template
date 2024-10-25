import React from 'react';
import { useBulkAddTasks } from '@boundbybetter/state';
import { tg } from '@boundbybetter/ui';

interface BulkAddButtonProps {
  count: number;
}

export const BulkAddButton = ({ count }: BulkAddButtonProps) => {
  const bulkAddTasks = useBulkAddTasks();
  const handleBulkAdd = () => {
    bulkAddTasks(count);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <tg.Button onPress={handleBulkAdd} testID="bulk-add-button">
      {`Bulk Add ${count.toString()} Tasks`}
    </tg.Button>
  );
};
