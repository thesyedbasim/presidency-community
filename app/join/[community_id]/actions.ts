'use server';

import { createPendingMember } from '@/lib/supabase/database/queries/public/pending_members';
import { redirect } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/utils';

export const handleJoinCommunity = async ({
  community_id,
}: {
  community_id: string;
}) => {
  const supabase = createSupabaseClient('server-action');

  await createPendingMember(supabase, {
    community_id: community_id,
  });

  redirect('/join/request-sent');
};
