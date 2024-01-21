import { ChannelDb } from '@/lib/types/database/public/channels';
import { CommunityDetail } from '@/lib/types/database/public/communities';
import { MemberDb } from '@/lib/types/database/public/members';
import { MessageDetail } from '@/lib/types/database/public/messages';
import supabase from '@/lib/supabase';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { QueryResponse } from '@/lib/types/database/public/utils';

interface UserCommunities extends MemberDb {
  community: CommunityDetail;
}

export async function getUserCommunities(
  supabase: SupabaseClient,
  { user_id }: { user_id: string }
) {
  const { data, error } = await supabase
    .from('members')
    .select('*, community:community_id(*, channels(*), members(*))')
    .eq('user_id', user_id);

  //handle-error
  if (error) console.error('error while getting user communities', error);

  return { data: data || [] } as QueryResponse<UserCommunities[]>;
}

export async function getMemberByUserAndCommunityById(
  supabase: SupabaseClient,
  { user_id, community_id }: { user_id: string; community_id: string }
) {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('user_id', user_id)
    .eq('community_id', community_id)
    .single();

  //handle-error
  if (error)
    console.error(
      'error while getting member from user and community id',
      error
    );

  return { data: data, error } as QueryResponse<MemberDb>;
}

export async function getCommunityById(
  supabase: SupabaseClient,
  { id }: { id: string }
) {
  const { data, error } = await supabase
    .from('communities')
    .select('*, channels(*), members(*)')
    .eq('id', id)
    .single();

  //handle-error
  if (error) console.error('error while fetching communtity by id', error);

  return { data: data || null, error } as QueryResponse<CommunityDetail>;
}

export async function getCommunityChannels(community_id: string) {
  //handle-error

  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .eq('community_id', community_id);

  return (data || []) as ChannelDb[];
}

export async function getMessagesInChannel(
  community_id: string,
  channel_id: string,
  user_id: string
) {
  // confirm user exists in teh community
  const { data: user, error: errorDbUser } = await supabase
    .from('members')
    .select('id')
    .eq('user_id', user_id)
    .eq('community_id', community_id);
  // handle-error
  if (user?.length === 0) return [];

  // get messages of channel
  const { data: messages, error: errorDbMessages } = await supabase
    .from('messages')
    .select('*, sender:sender_id(id, user:user_id(id, name))')
    .eq('channel_id', channel_id);
  // handle-error

  return (messages || []) as MessageDetail[];
}

export async function getMessageById(message_id: string) {
  // handle-error

  const { data, error } = await supabase
    .from('messages')
    .select('*, sender:sender_id(id, role, user:user_id(id, name))')
    .eq('id', message_id)
    .single();

  return (data as MessageDetail) || null;
}

export async function deleteMessageById(message_id: string) {
  // handle-error

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', message_id);
}

export async function createMessage(
  supabase: SupabaseClient,
  {
    content,
    member_id,
    channel_id,
    community_id,
  }: {
    content: string;
    member_id: string;
    channel_id: string;
    community_id: string;
  }
) {
  //handle-error
  const { error } = await supabase
    .from('messages')
    .insert({ content, sender_id: member_id, channel_id, community_id });
}
