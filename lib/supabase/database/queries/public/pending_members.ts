import { QueryFunction } from '@/lib/supabase';
import { PendingMemberDetail } from '@/lib/types/database/public/pending_members';

enum PendingMemberQuery {
  db = '*',
  detail = '*, user:user_id(*)',
}

/* CREATE */
export const createPendingMember: QueryFunction<
  { community_id: string },
  null
> = async (supabase, { community_id }) => {
  const { error } = await supabase
    .from('pending_members')
    .insert({ community_id });

  if (error)
    console.error('error while creating pending community member', error);

  return { data: null, error };
};

/* READ */
export const getPendingMembersByCommunityId: QueryFunction<
  { community_id: string },
  PendingMemberDetail[]
> = async (supabase, { community_id }) => {
  const { data, error } = await supabase
    .from('pending_members')
    .select(PendingMemberQuery.detail)
    .eq('community_id', community_id);

  if (error)
    console.error('error while getting pending community members', error);

  return { data: data || [], error };
};
