'use client';

import { useRef } from 'react';
import { sendMessage } from '../actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MessageForm: React.FC<{
  channel_id: string;
  community_id: string;
  member_id: string;
}> = ({ channel_id, community_id, member_id }) => {
  const ref = useRef<HTMLFormElement>(null);

  const sendMessageWithPayload = sendMessage.bind(null, {
    member_id: member_id,
    channel_id,
    community_id,
  });

  return (
    <form
      ref={ref}
      action={(formData) => {
        ref.current?.reset();
        sendMessageWithPayload(formData);
      }}
      className=""
    >
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          name="message"
          placeholder="Type your message..."
          required
        />
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
};

export default MessageForm;
