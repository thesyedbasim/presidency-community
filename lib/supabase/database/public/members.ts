import { getAuthUser } from '@/lib/supabase/database/auth/users';
import { QueryFunction } from '@/lib/supabase';
import { MemberDetail } from '@/lib/types/database/public/members';
import { isEmptyError } from '@/lib/utils/postgrestErrors';

enum MemberSelectQueries {
  db = '*',
  detail = '*, user:user_id(*)',
}

/* CREATE */
export const createMemberFromInvitationAccept: QueryFunction<
  { pending_member_id: string },
  null
> = async (supabase, { pending_member_id }) => {
  const { error } = await supabase.rpc('create_member_from_invitation_accept', {
    pending_member_id,
  });

  if (error)
    console.error('error while creating member from invitation accept');

  return { data: null, error };
};

/* READ */
export const getMemberById: QueryFunction<
  { member_id: string },
  MemberDetail
> = async (supabase, { member_id }) => {
  const { data, error } = await supabase
    .from('members')
    .select(MemberSelectQueries.detail)
    .eq('id', member_id)
    .single();

  if (error) console.error('error while getting member by id', error);

  return { data: data || null, error: null };
};

export const getMembersByCommunityId: QueryFunction<
  { community_id: string },
  MemberDetail[]
> = async (supabase, { community_id }) => {
  const { data, error } = await supabase
    .from('members')
    .select(MemberSelectQueries.detail)
    .eq('community_id', community_id)
    .eq('is_present', true);

  if (error) console.error('error while getting community members', error);

  return { data: data || [], error: null };
};

export const getMemberFromAuthUser: QueryFunction<
  { community_id: string },
  MemberDetail
> = async (supabase, { community_id }) => {
  const user = await getAuthUser(supabase);

  if (!user) return { data: null, error: null };

  const { data, error } = await supabase
    .from('members')
    .select(MemberSelectQueries.detail)
    .eq('user_id', user.id)
    .eq('community_id', community_id)
    .single();

  if (error) console.error('error while getting member auth user', error);

  return { data: data || null, error };
};

export const getMemberByUserAndCommunityById: QueryFunction<
  { user_id: string; community_id: string },
  MemberDetail
> = async (supabase, { user_id, community_id }) => {
  const { data, error } = await supabase
    .from('members')
    .select(MemberSelectQueries.detail)
    .eq('user_id', user_id)
    .eq('community_id', community_id)
    .single();

  if (error) {
    if (!isEmptyError(error.code))
      console.error(
        'error while getting member from user id and community id',
        error
      );
  }

  return { data: data || null, error: null };
};

/* UPDATE */
export const updateMemberPresentStatus: QueryFunction<
  { member_id: string },
  null
> = async (supabase, { member_id }) => {
  const { error } = await supabase
    .from('members')
    .update({ is_present: false })
    .eq('id', member_id);

  if (error) console.error('error while updating member present', error);

  return { data: null, error };
};
