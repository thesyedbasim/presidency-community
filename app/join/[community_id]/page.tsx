import { getAuthUser } from '@/lib/state/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getCommunityById } from '@/lib/supabase/database/queries/public';
import { getMemberByUserAndCommunityById } from '@/lib/supabase/database/queries/public/members';
import JoinCommunityCard from './components/JoinCommunityCard';

const JoinCommunityPage = async ({
  params,
}: {
  params: { community_id: string };
}) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const user = await getAuthUser(supabase);
  if (!user) {
    return redirect('/login');
  }

  const { data: member, error } = await getMemberByUserAndCommunityById(
    supabase,
    {
      user_id: user.id,
      community_id: params.community_id,
    }
  );

  // redirect if user present in community
  if (member) {
    return redirect(`/communities/${params.community_id}`);
  }

  const { data: community } = await getCommunityById(supabase, {
    id: params.community_id,
  });

  return (
    <main className="grid place-items-center w-full h-screen">
      <JoinCommunityCard community={community} />
    </main>
  );
};

export default JoinCommunityPage;
