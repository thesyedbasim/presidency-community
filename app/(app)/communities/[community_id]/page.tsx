import { redirect } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { getCommunityById } from '@/lib/supabase/database/queries/public/communities';
import { createSupabaseClient } from '@/lib/supabase/utils';

const fetchCommunityById = unstable_cache(getCommunityById, [
  'community-by-id',
]);

const CommunityPage = async ({
  params,
}: {
  params: { community_id: string };
}) => {
  const supabase = createSupabaseClient('server');

  const { data: community } = await fetchCommunityById(supabase, {
    community_id: params.community_id,
  });

  redirect(`/communities/${community.id}/${community.channels[0].id}`);
};

export default CommunityPage;
