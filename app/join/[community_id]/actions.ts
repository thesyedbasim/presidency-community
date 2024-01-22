'use server';

import { createPendingCommunityMember } from '@/lib/supabase/database/queries/public/pending_members';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const handleJoinCommunity = async ({
  community_id,
}: {
  community_id: string;
}) => {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });

  await createPendingCommunityMember(supabase, {
    community_id: community_id,
  });

  redirect('/join/request-sent');
};
