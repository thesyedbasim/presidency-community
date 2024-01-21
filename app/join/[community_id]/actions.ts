'use server';

import { createPendingCommunityMember } from '@/lib/supabase/database/queries/public/pending_members';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const handleJoinCommunity = async ({
  community_id,
}: {
  community_id: string;
}) => {
  const supabase = createServerActionClient({ cookies });

  console.log('join community server action ran');

  await createPendingCommunityMember(supabase, {
    community_id: community_id,
  });
};
