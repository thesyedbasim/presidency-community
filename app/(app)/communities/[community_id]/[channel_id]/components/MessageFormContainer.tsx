import { SupabaseClient } from '@supabase/supabase-js';
import MessageForm from './MessageForm';
import { getCommunityById } from '@/lib/supabase/database/public/communities';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { getAuthUser } from '@/lib/supabase/database/auth/users';

const getMemberId = async (supabase: SupabaseClient, community_id: string) => {
  //handle-error invalid community id
  const { data: community } = await getCommunityById(supabase, {
    community_id,
  });
  const memberList = community!.members;

  const user = await getAuthUser(supabase);

  const member = memberList.find((m) => m.user_id === user?.id);

  return member!.id;
};

const MessageFormContainer: React.FC<{
  channel_id: string;
  community_id: string;
}> = async ({ channel_id, community_id }) => {
  const supabase = createSupabaseClient('server');

  const member_id = await getMemberId(supabase, community_id);

  return (
    <div className="pt-4 px-4">
      <MessageForm
        channel_id={channel_id}
        community_id={community_id}
        member_id={member_id}
      />
    </div>
  );
};

export default MessageFormContainer;
