import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import CommunityHeader from './ui/CommunityHeader';
import { fetchCommunityById } from '@/lib/state/communities';
import { getAuthUser } from '@/lib/state/auth';
import { redirect } from 'next/navigation';

export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { community_id: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const user = await getAuthUser(supabase);

  if (!user) {
    // redirect to auth page
    redirect('/login');
  }

  const { data: community, error } = await fetchCommunityById(supabase, {
    id: params.community_id,
  });

  // handle-error (404 if null)

  // handle-error (if user is not present, redirect to join page)
  if (community?.members.length === 0) {
    // user is not present in the community

    redirect(`/join/${community.id}`);
  }

  return (
    <>
      <div className="grid grid-rows-[6rem_1fr] h-screen">
        {community && (
          <>
            <CommunityHeader community={community} />
            {children}
          </>
        )}
      </div>
    </>
  );
}
