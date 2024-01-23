'use client';

import { MessageDb, MessageDetail } from '@/lib/types/database/public/messages';
import MessageCard from './MessageCard';
import { useEffect, useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  getMessageById,
  getMessagesInChannel,
} from '@/lib/supabase/database/queries/public/messages';
import { subscribeToChannelMessages } from '@/lib/supabase/realtime';
import { RealtimePostgresChangesPayload, User } from '@supabase/supabase-js';
import MessageCardSkeleton from './MessageCardSkeleton';
import { getMemberFromAuthUser } from '@/lib/supabase/database/queries/public/members';
import { MemberDetail } from '@/lib/types/database/public/members';

const MessagesContainer: React.FC<{
  community_id: string;
  channel_id: string;
}> = ({ community_id, channel_id }) => {
  const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageDetail[]>([]);
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
    async function setMessagesValue() {
      setIsLoading(true);
      const sbUserRes = await supabase.auth.getUser();
      if (!sbUserRes.data.user) return;

      const { data: messagesData } = await getMessagesInChannel(supabase, {
        channel_id,
      });

      setMessages(messagesData);
      setIsLoading(false);
    }

    const messageChannel = subscribeToChannelMessages(
      supabase,
      { channel_id },
      (payload: RealtimePostgresChangesPayload<MessageDb>) => {
        if (payload.eventType === 'INSERT') {
          getMessageById(supabase, { message_id: payload.new.id }).then(
            ({ data: message }) => {
              if (!message) return;

              setMessages((prevMessages) => [...prevMessages, message]);
            }
          );
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

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [community_id, channel_id, supabase]);

  if (isLoading)
    return (
      <>
        <MessageCardSkeleton />
        <MessageCardSkeleton />
        <MessageCardSkeleton />
        <MessageCardSkeleton />
      </>
    );

  return messages.map((message) => (
    <MessageCard
      key={message.id}
      message={message}
      authMember={authMember}
      refProp={lastMessageRef}
    />
  ));
};

export default MessagesContainer;
