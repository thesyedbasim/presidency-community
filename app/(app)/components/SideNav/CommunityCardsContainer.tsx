import { getCommunitiesByUserId } from '@/lib/supabase/database/public/communities';
import CommunityCard from './CommunityCard';
import { getAuthUser } from '@/lib/supabase/database/auth/users';
import { createSupabaseClient } from '@/lib/supabase/utils';

const CommunityCardsContainer: React.FC = async () => {
  const supabase = createSupabaseClient('server');
  const user = await getAuthUser(supabase);
  //handle-error
  const { data: userCommunities } = await getCommunitiesByUserId(supabase, {
    user_id: user!.id,
  })();

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
