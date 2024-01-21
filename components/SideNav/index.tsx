import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import CommunityCard from './CommunityCard';
import { getUserCommunities } from '@/lib/supabase/database/queries/public';
import { cookies } from 'next/headers';

const getUserCommunitiesData = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const communitiesRes = await getUserCommunities(supabase, {
      user_id: user!.id,
    });

    return (communitiesRes.data || []).map(
      (userCommunity) => userCommunity.community
    );
  } catch (err) {
    return [];
  }
};

const SideNav: React.FC = async () => {
  const communities = await getUserCommunitiesData();

  return (
    <>
      <aside
        id="side-nav"
        className="grid grid-rows-[6rem_1fr] px-4 bg-gray-950 border-r-2 border-r-gray-800"
      >
        <header className="flex items-center"></header>
        <div className="grid auto-rows-min grid-flow-row gap-6">
          <span className="text-lg font-bold text-white">Communities</span>
          <div className="grid grid-flow-row gap-4">
            {communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
