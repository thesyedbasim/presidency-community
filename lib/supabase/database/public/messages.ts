import { QueryFunction } from '@/lib/supabase';
import { MessageDb, MessageDetail } from '@/lib/types/database/public/messages';

enum MessageQuery {
  db = '*',
  detail = '*, sender:sender_id(id, user:user_id(id, name))',
}

/* CREATE */
export const createMessage: QueryFunction<
  {
    content: string;
    member_id: string;
    channel_id: string;
    community_id: string;
  },
  MessageDb
> = async (supabase, { content, member_id, channel_id, community_id }) => {
  const { data: message, error } = await supabase
    .from('messages')
    .insert({ content, sender_id: member_id, channel_id, community_id })
    .select(MessageQuery.db)
    .single();

  if (error) {
    console.error('error while creating new message', error);
  }

  return { data: message, error };
};

/* READ */
let y = 0;
export const getMessageById: QueryFunction<
  { message_id: string },
  MessageDetail | null
> = async (supabase, { message_id }) => {
  console.log('get message by id', y++);
  const { data: message, error } = await supabase
    .from('messages')
    .select(MessageQuery.detail)
    .eq('id', message_id)
    .single();

  if (error) {
    console.error('error while getting message by id', error);
  }

  return { data: message, error };
};
let x = 0;
export const getMessagesInChannel: QueryFunction<
  { channel_id: string },
  MessageDetail[]
> = async (supabase, { channel_id }) => {
  console.log('get messages in channel', x++);
  const { data: messages, error } = await supabase
    .from('messages')
    .select(MessageQuery.detail)
    .limit(100)
    .order('created_at')
    .eq('channel_id', channel_id);

  if (error) {
    console.error('error while getting channel messages', error);
  }

  return { data: messages || [], error };
};

/* DELETE */
export const deleteMessageById: QueryFunction<
  { message_id: string },
  null
> = async (supabase, { message_id }) => {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', message_id);

  if (error) {
    console.error('error while deleting message', error);
  }

  return { data: null, error };
};
