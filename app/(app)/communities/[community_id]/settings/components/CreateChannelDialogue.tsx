'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { createChannel } from '../../[channel_id]/actions';

const CreateChannelDialogue: React.FC<{ community_id: string }> = ({
  community_id,
}) => {
  const [channelName, setChannelName] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a channel</DialogTitle>
          <DialogDescription>
            Create a channel for this community
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
              placeholder="Enter channel name here..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => createChannel({ channelName, community_id })}>
            Create channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelDialogue;
