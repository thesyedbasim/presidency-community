import { QueryFunction } from '@/lib/supabase';
import { ChannelDb } from '@/lib/types/database/public/channels';

enum ChannelQuery {
  db = '*',
}

/* READ */
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
