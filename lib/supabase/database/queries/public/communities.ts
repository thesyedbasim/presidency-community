import { QueryFunction } from '@/lib/supabase';
import { CommunityDetail } from '@/lib/types/database/public/communities';
import { MemberDb } from '@/lib/types/database/public/members';
import { QueryResponse } from '@/lib/types/database/public/utils';

interface UserCommunities extends MemberDb {
  community: CommunityDetail;
}

enum CommunityQuery {
  db = '*',
  user = '*, community:community_id(*, channels(*), members(*))',
  detail = '*, channels(*), members(*)',
}

export const getCommunitiesByUserId: QueryFunction<
  { user_id: string },
  UserCommunities[]
> = async (supabase, { user_id }) => {
  const { data, error } = await supabase
    .from('members')
    .select(CommunityQuery.user)
    .eq('user_id', user_id)
    .eq('is_present', true);

  //handle-error
  if (error) console.error('error while getting user communities', error);

  return { data: data || [], error };
};

export const getCommunityById: QueryFunction<
  { community_id: string },
  CommunityDetail
> = async (supabase, { community_id }) => {
  const { data, error } = await supabase
    .from('communities')
    .select(CommunityQuery.detail)
    .eq('id', community_id)
    .single();

  if (error) console.error('error while fetching communtity by id', error);

  return { data: data || null, error } as QueryResponse<CommunityDetail>;
};
