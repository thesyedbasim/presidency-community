'use client';

import { MessageDb, MessageDetail } from '@/lib/types/database/public/messages';
import MessageCard from './MessageCard';
import { useEffect, useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  getMessageById,
  getMessagesInChannel,
} from '@/lib/supabase/database/queries/public';
import { subscribeToChannelMessages } from '@/lib/supabase/realtime';
import {
  RealtimePostgresChangesPayload,
  RealtimePostgresInsertPayload,
} from '@supabase/supabase-js';

const MessagesContainer: React.FC<{
  community_id: string;
  channel_id: string;
}> = ({ community_id, channel_id }) => {
  const supabase = createClientComponentClient();

  const [messages, setMessages] = useState<MessageDetail[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current &&
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  //handle-error
  useEffect(() => {
    async function setMessagesValue() {
      const sbUserRes = await supabase.auth.getUser();
      if (!sbUserRes.data.user) return;

      const messagesData = await getMessagesInChannel(
        community_id,
        channel_id,
        sbUserRes.data.user.id
      );

      setMessages(messagesData);
    }

    subscribeToChannelMessages(
      channel_id,
      (payload: RealtimePostgresChangesPayload<MessageDb>) => {
        console.log('payload data', payload);

        if (payload.eventType === 'INSERT') {
          getMessageById(payload.new.id).then((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
          });
        } else if (payload.eventType === 'DELETE') {
          setMessages((prevMessages) => {
            const filteredMessages = prevMessages.filter(
              (msg) => msg.id !== payload.old.id
            );

            return filteredMessages;
          });
        }
      }
    );

    setMessagesValue();
  }, [community_id, channel_id, supabase.auth]);

  return messages.map((message) => (
    <MessageCard key={message.id} message={message} refProp={lastMessageRef} />
  ));
};

export default MessagesContainer;
