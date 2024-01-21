import { PendingMemberDetail } from '@/lib/types/database/public/pending_members';
import { QueryResponse } from '@/lib/types/database/public/utils';
import { SupabaseClient } from '@supabase/supabase-js';

export async function createPendingCommunityMember(
  supabase: SupabaseClient,
  { community_id }: { community_id: string }
) {
  const { error } = await supabase
    .from('pending_members')
    .insert({ community_id });

  if (error)
    console.error('error while creating pending community member', error);

  return { data: null, error } as QueryResponse<null>;
}

export async function getCommunityPendingMembers(
  supabase: SupabaseClient,
  { community_id }: { community_id: string }
) {
  const { data, error } = await supabase
    .from('pending_members')
    .select('*, user:user_id(*)')
    .eq('community_id', community_id);

  //handle-error
  if (error)
    console.error('error while getting pending community members', error);

  return { data: data || [] } as QueryResponse<PendingMemberDetail[]>;
}
