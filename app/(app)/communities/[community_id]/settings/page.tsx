import { Metadata } from 'next';
import CommunityInfoCard from './components/CommunityInfoCard';
import ChannelListCard from './components/ChannelListCard';
import CommunityOptionsCard from './components/CommunityOptionsCard';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { isAdmin, isModerator } from '@/lib/utils/memberRole';
import { getMemberFromAuthUser } from '@/lib/supabase/database/public/members';

export const metadata: Metadata = {
  title: 'Settings',
};

const CommunitySettings: React.FC<{
  params: { community_id: string };
}> = async ({ params }) => {
  const supabase = createSupabaseClient('server');

  const member = await getMemberFromAuthUser(supabase, {
    community_id: params.community_id,
  });

  return (
    <main className="h-full overflow-y-hidden">
      <div className="py-6 px-12 flex flex-col gap-8 h-full overflow-y-scroll">
        <CommunityInfoCard
          community_id={params.community_id}
          isAuthUserAdmin={isAdmin(member.data.role)}
          isAuthUserModerator={isModerator(member.data.role)}
        />
        <ChannelListCard
          community_id={params.community_id}
          isAuthUserAdmin={isAdmin(member.data.role)}
          isAuthUserModerator={isModerator(member.data.role)}
        />
        <CommunityOptionsCard
          member_id={member.data.id}
          community_id={params.community_id}
          isAuthUserAdmin={isAdmin(member.data.role)}
        />
      </div>
    </main>
  );
};

export default CommunitySettings;
