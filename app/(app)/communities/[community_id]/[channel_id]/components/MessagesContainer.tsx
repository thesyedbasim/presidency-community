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
import { RealtimePostgresChangesPayload, User } from '@supabase/supabase-js';
import MessageCardSkeleton from './MessageCardSkeleton';
import { getAuthUser } from '@/lib/state/auth';
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

      const messagesData = await getMessagesInChannel(
        community_id,
        channel_id,
        sbUserRes.data.user.id
      );

      setMessages(messagesData);
      setIsLoading(false);
    }

    subscribeToChannelMessages(
      channel_id,
      (payload: RealtimePostgresChangesPayload<MessageDb>) => {
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
