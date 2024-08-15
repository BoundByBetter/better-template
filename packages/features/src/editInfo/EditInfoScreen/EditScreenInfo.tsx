import React from 'react';

import { ExternalLink } from '../../components/ExternalLink';

import { tg } from '@boundbybetter/ui';

export function EditScreenInfo({ path }: { path: string }) {
  return (
    <tg.YStack gap="$4">
      <tg.Text my="$2" mt="$6" mx="$8">
        Open up the code for this screen:
      </tg.Text>

      <tg.Text my="$2" mx="$8">
        {path}
      </tg.Text>

      <tg.Text my="$2" mx="$8">
        Change any of the text, save the file, and your app will automatically
        update.
      </tg.Text>

      <tg.Card m="$4" mt="$0" p="$4">
        <ExternalLink href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <tg.Text m="$4">
            Tap here if your app doesn't automatically update after making
            changes
          </tg.Text>
        </ExternalLink>
      </tg.Card>
    </tg.YStack>
  );
}
