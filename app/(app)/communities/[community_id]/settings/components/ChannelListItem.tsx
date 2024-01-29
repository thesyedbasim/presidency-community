'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateChannelNameById } from '@/lib/supabase/database/public/channels';
import { ChannelDb } from '@/lib/types/database/public/channels';
import {
  ArrowRightIcon,
  CheckIcon,
  Cross1Icon,
  Pencil2Icon,
} from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ChannelListItem: React.FC<{
  channel: ChannelDb;
  isAuthUserAdmin: boolean;
  isAuthUserModerator: boolean;
}> = ({ channel, isAuthUserAdmin, isAuthUserModerator }) => {
  const supabase = createClientComponentClient();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    setChannelName(channel.name);
  }, [channel]);

  const enableEditMode = () => {
    setIsEditMode(true);
  };

  const disableEditMode = () => {
    setIsEditMode(false);
  };

  const saveChanges = async () => {
    // handle-error
    await updateChannelNameById(supabase, {
      channel_id: channel.id,
      channelName,
    });

    disableEditMode();
  };

  const discardChanges = () => {
    setChannelName(channel.name);
    setIsEditMode(false);
  };

  if (!isEditMode)
    return (
      <div className="flex justify-between items-center gap-4">
        <Link href={`/communities/${channel.community_id}/${channel.id}`}>
          <Button variant="link" className="pl-0">
            {channelName} <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        {(isAuthUserAdmin || isAuthUserModerator) && (
          <Button
            size="icon"
            variant="outline"
            className="flex-shrink-0"
            onClick={enableEditMode}
          >
            <Pencil2Icon className="h-4 w-4" />
          </Button>
        )}
      </div>
    );

  return (
    <div className="flex justify-between items-center gap-4">
      <Input
        value={channelName}
        placeholder="Enter new channel name"
        onChange={(e) => {
          setChannelName(e.target.value);
        }}
      />
      <div className="flex flex-shrink-0 gap-2">
        <Button
          size="icon"
          variant="outline"
          className="flex-shrink-0"
          onClick={discardChanges}
        >
          <Cross1Icon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="flex-shrink-0"
          onClick={saveChanges}
        >
          <CheckIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChannelListItem;
