import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { getCommunityById } from '@/lib/supabase/database/queries/public/communities';

const fetchCommunityById = unstable_cache(getCommunityById, [
  'community-by-id',
]);

const CommunityPage = async ({
  params,
}: {
  params: { community_id: string };
}) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: community } = await fetchCommunityById(supabase, {
    community_id: params.community_id,
  });

  redirect(`/communities/${community.id}/${community.channels[0].id}`);
};

export default CommunityPage;
