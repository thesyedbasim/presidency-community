import { getCommunitiesByUserId } from '@/lib/supabase/database/queries/public/communities';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import CommunityCard from './CommunityCard';
import { getAuthUser } from '@/lib/state/auth';
import { unstable_cache } from 'next/cache';

const fetchUserCommunities = unstable_cache(
  getCommunitiesByUserId,
  ['user-communities'],
  { tags: ['user-communities'] }
);

const CommunityCardsContainer: React.FC = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await getAuthUser(supabase);
  //handle-error
  const { data: userCommunities } = await fetchUserCommunities(supabase, {
    user_id: user!.id,
  });

  return (
    <div className="grid grid-flow-row gap-4">
      {userCommunities?.map((userCommunity) => (
        <CommunityCard
          key={userCommunity.community.id}
          community={userCommunity.community}
        />
      ))}
    </div>
  );
};

export default CommunityCardsContainer;
