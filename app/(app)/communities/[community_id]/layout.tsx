import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import CommunityHeader from './components/ui/CommunityHeader';
import { getAuthUser } from '@/lib/state/auth';
import { notFound, redirect } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { getCommunityById } from '@/lib/supabase/database/queries/public/communities';

const fetchCommunityById = unstable_cache(getCommunityById);

export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { community_id: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const user = await getAuthUser(supabase);

  if (!user) {
    return redirect('/login');
  }

  // handle-error
  const { data: community } = await fetchCommunityById(supabase, {
    community_id: params.community_id,
  });

  if (!community) {
    return notFound();
  }

  if (community?.members.length === 0) {
    // user is not present in the community
    return redirect(`/join/${community.id}`);
  }

  return (
    <>
      <div className="grid grid-rows-[6rem_1fr] h-screen">
        <CommunityHeader community={community} />
        {children}
      </div>
    </>
  );
}
