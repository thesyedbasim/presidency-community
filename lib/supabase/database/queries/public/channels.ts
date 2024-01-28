import { QueryFunction } from '@/lib/supabase';
import { ChannelDb } from '@/lib/types/database/public/channels';

enum ChannelQuery {
  db = '*',
}

/* READ */
export const getChannelById: QueryFunction<
  { channel_id: string },
  ChannelDb
> = async (supabase, { channel_id }) => {
  const { data: channel, error } = await supabase
    .from('channels')
    .select('*')
    .eq('id', channel_id)
    .single();

  if (error) {
    console.error('error while getting channel by id', error);
  }

  return { data: channel || null, error };
};

export const getChannelsByCommunityId: QueryFunction<
  { community_id: string },
  ChannelDb[]
> = async (supabase, { community_id }) => {
  const { data: channels, error } = await supabase
    .from('channels')
    .select(ChannelQuery.db)
    .eq('community_id', community_id);

  if (error) {
    console.error('error while getting community channels', error);
  }

  return { data: channels || [], error };
};
