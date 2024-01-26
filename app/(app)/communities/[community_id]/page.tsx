import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { fetchCommunityById } from './layout';
import { redirect } from 'next/navigation';

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
