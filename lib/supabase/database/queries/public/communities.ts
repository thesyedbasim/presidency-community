import { QueryFunction } from '@/lib/supabase';
import {
  CommunityBasic,
  CommunityDetail,
} from '@/lib/types/database/public/communities';
import { MemberDb } from '@/lib/types/database/public/members';

interface UserCommunities extends MemberDb {
  community: CommunityBasic;
}

enum CommunityQuery {
  db = '*',
  basic = '*, channels(*)',
  user = '*, community:community_id(*, channels(*))',
  detail = '*, channels(*), members(*)',
}

export const insertCommunity: QueryFunction<
  { name: string },
  CommunityBasic
> = async (supabase, { name }) => {
  console.log('insert community hit with name as ', name);
  const { data: newCommunity, error } = await supabase
    .from('communities')
    .insert({ name })
    .select(CommunityQuery.basic)
    .single();

  if (error) console.error('Error while creating new community', error);

  return { data: newCommunity, error };
};

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

  return { data: data || null, error };
};

export const getCommunityBasicById: QueryFunction<
  { community_id: string },
  CommunityBasic
> = async (supabase, { community_id }) => {
  const { data, error } = await supabase
    .from('communities')
    .select(CommunityQuery.basic)
    .eq('id', community_id)
    .single();

  if (error) console.error('error while fetching communtity by id', error);

  return { data: data || null, error };
};
