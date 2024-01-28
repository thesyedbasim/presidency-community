import CommunityHeader from './components/ui/CommunityHeader';
import { getAuthUser } from '@/lib/state/auth';
import { notFound, redirect } from 'next/navigation';
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
    title: {
      template: `%s | ${community.name}`,
      default: community.name,
    },
    description: `${community.member_count} members`,
  };
}

export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { community_id: string };
}) {
  const supabase = createSupabaseClient('server');

  const user = await getAuthUser(supabase);

  if (!user) {
    return redirect('/login');
  }

  const { data: community } = await fetchCommunityById(supabase, {
    community_id: params.community_id,
  });

  if (!community) notFound();

  if (community?.members.length === 0) {
    // user is not present in the community
    return redirect(`/join/${community.id}`);
  }

  return (
    <div className="grid grid-rows-[6rem_1fr] h-screen">
      <CommunityHeader community={community} />
      {children}
    </div>
  );
}
