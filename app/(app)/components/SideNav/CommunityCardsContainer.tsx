import { getCommunitiesByUserId } from '@/lib/supabase/database/queries/public/communities';
import CommunityCard from './CommunityCard';
import { getAuthUser } from '@/lib/state/auth';
import { unstable_cache } from 'next/cache';
import { createSupabaseClient } from '@/lib/supabase/utils';

const fetchUserCommunities = unstable_cache(
  getCommunitiesByUserId,
  ['user-communities'],
  { tags: ['user-communities'] }
);

const CommunityCardsContainer: React.FC = async () => {
  const supabase = createSupabaseClient('server');
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
