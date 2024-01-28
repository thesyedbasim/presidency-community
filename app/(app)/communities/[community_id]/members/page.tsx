import { getMembersByCommunityId } from '@/lib/supabase/database/public/members';
import { MembersContainer } from './components/MembersContainer';
import { PendingMembersContainer } from './components/PendingMembersContainer';
import { isAdmin } from '@/lib/utils/memberRole';
import { getAuthUser } from '@/lib/supabase/database/auth/users';
import { findAuthUserFromMembers } from '@/lib/utils/database/members';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Members',
};

const CommunityMembers: React.FC<{
  params: { community_id: string };
}> = async ({ params }) => {
  const supabase = createSupabaseClient('server');

  const user = await getAuthUser(supabase);

  const { data: members } = await getMembersByCommunityId(supabase, {
    community_id: params.community_id,
  });

  const authUserMember = findAuthUserFromMembers({
    members,
    user_id: user?.id,
  });

  return (
    <div className="grid grid-flow-row auto-rows-min gap-6 pt-6 px-6 h-full overflow-y-scroll">
      <MembersContainer
        className="w-full"
        members={members}
        authUserMember={authUserMember}
      />
      {isAdmin(authUserMember?.role || 'member') && (
        <PendingMembersContainer community_id={params.community_id} />
      )}
    </div>
  );
};

export default CommunityMembers;
