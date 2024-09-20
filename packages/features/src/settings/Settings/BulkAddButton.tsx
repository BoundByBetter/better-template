import React from 'react';
import { bulkAddPosts } from '@boundbybetter/state';
import { tg } from '@boundbybetter/ui';

interface BulkAddButtonProps {
  count: number;
}

export const BulkAddButton = ({ count }: BulkAddButtonProps) => {
  const handleBulkAdd = () => {
    bulkAddPosts(count);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <tg.Button onPress={handleBulkAdd} testID="bulk-add-button">
      Bulk Add {count.toString()} Posts
    </tg.Button>
  );
};
