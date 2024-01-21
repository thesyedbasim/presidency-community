import { getMembersByCommunityId } from '@/lib/supabase/database/queries/public/members';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { MembersContainer } from './components/MembersContainer';
import { PendingMembersContainer } from './components/PendingMembersContainer';

const CommunityMembers: React.FC<{
  params: { community_id: string };
}> = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: members } = await getMembersByCommunityId(supabase, {
    community_id: params.community_id,
  });

  if (!members) return;

  return (
    <div className="grid grid-flow-row auto-rows-min gap-6 pt-6 px-6 h-full overflow-y-scroll">
      <MembersContainer
        members={members}
        community_id={params.community_id}
        className="w-full"
      />
      {/* TODO: show only if auth user is admin */}
      <PendingMembersContainer community_id={params.community_id} />
    </div>
  );
};

export default CommunityMembers;
