import { getAuthUser } from '@/lib/state/auth';
import { redirect } from 'next/navigation';
import { getCommunityBasicById } from '@/lib/supabase/database/queries/public/communities';
import { getMemberByUserAndCommunityById } from '@/lib/supabase/database/queries/public/members';
import JoinCommunityCard from './components/JoinCommunityCard';
import { createSupabaseClient } from '@/lib/supabase/utils';

const JoinCommunityPage = async ({
  params,
}: {
  params: { community_id: string };
}) => {
  const supabase = createSupabaseClient('server');

  const user = await getAuthUser(supabase);
  if (!user) {
    return redirect('/login');
  }

  // handle-error
  const { data: member } = await getMemberByUserAndCommunityById(supabase, {
    user_id: user.id,
    community_id: params.community_id,
  });

  // redirect if user present in community
  if (member) {
    return redirect(`/communities/${params.community_id}`);
  }

  const { data: community } = await getCommunityBasicById(supabase, {
    community_id: params.community_id,
  });

  return (
    <main className="grid place-items-center w-full h-screen">
      <JoinCommunityCard community={community} />
    </main>
  );
};

export default JoinCommunityPage;
