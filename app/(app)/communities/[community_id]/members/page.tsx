import { getMembersByCommunityId } from '@/lib/supabase/database/queries/public/members';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { MembersContainer } from './components/MembersContainer';
import { PendingMembersContainer } from './components/PendingMembersContainer';
import { isAdmin } from '@/lib/utils/memberRole';
import { getAuthUser } from '@/lib/state/auth';
import { findAuthUserFromMembers } from '@/lib/utils/database/members';
import { unstable_cache } from 'next/cache';

const fetchMembersByCommunityId = unstable_cache(
  getMembersByCommunityId,
  ['members-list'],
  { tags: ['members'] }
);

const CommunityMembers: React.FC<{
  params: { community_id: string };
}> = async ({ params }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const user = await getAuthUser(supabase);

  const { data: members } = await fetchMembersByCommunityId(supabase, {
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
