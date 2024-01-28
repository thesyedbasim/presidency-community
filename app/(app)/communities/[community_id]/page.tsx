import { redirect } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { getCommunityById } from '@/lib/supabase/database/queries/public/communities';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { Metadata } from 'next';

const fetchCommunityById = unstable_cache(getCommunityById, [
  'community-by-id',
]);

type MetaDataProps = {
  params: { community_id: string };
};

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const supabase = createSupabaseClient('server');

  const { data: community } = await fetchCommunityById(supabase, {
    community_id: params.community_id,
  });

  return {
    title: community.name,
  };
}

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
