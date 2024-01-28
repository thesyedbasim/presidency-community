'use client';

import { MessageDb, MessageDetail } from '@/lib/types/database/public/messages';
import MessageCard from './MessageCard';
import { useEffect, useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getMessageById } from '@/lib/supabase/database/public/messages';
import { subscribeToChannelMessages } from '@/lib/supabase/realtime';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { getMemberFromAuthUser } from '@/lib/supabase/database/public/members';
import { MemberDetail } from '@/lib/types/database/public/members';

const MessagesContainer: React.FC<{
  messages: MessageDetail[];
  community_id: string;
  channel_id: string;
}> = ({ messages, community_id, channel_id }) => {
  const supabase = createClientComponentClient();

  const [clientMessages, setClientMessages] = useState<MessageDetail[]>([]);
  const [authMember, setAuthMember] = useState<MemberDetail | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  useEffect(() => {
    getMemberFromAuthUser(supabase, { community_id }).then((member) =>
      setAuthMember(member.data)
    );
  }, [community_id, supabase]);

  useEffect(() => {
    lastMessageRef.current &&
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  //handle-error
  useEffect(() => {
    setClientMessages(messages);

    const messageChannel = subscribeToChannelMessages(
      supabase,
      { channel_id },
      (payload: RealtimePostgresChangesPayload<MessageDb>) => {
        if (payload.eventType === 'INSERT') {
          getMessageById(supabase, { message_id: payload.new.id }).then(
            ({ data: message }) => {
              if (!message) return;

              setClientMessages((prevMessages) => [...prevMessages, message]);
            }
          );
        } else if (payload.eventType === 'DELETE') {
          setClientMessages((prevMessages) => {
            const filteredMessages = prevMessages.filter(
              (msg) => msg.id !== payload.old.id
            );

            return filteredMessages;
          });
        }
      }
    );

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [community_id, channel_id, supabase, messages]);

  return clientMessages.map((message) => (
    <MessageCard
      key={message.id}
      message={message}
      authMember={authMember}
      refProp={lastMessageRef}
    />
  ));
};

export default MessagesContainer;
