import { SupabaseClient } from '@supabase/supabase-js';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { fetchCommunityById } from '@/lib/state/communities';
import MessageForm from './MessageForm';

const getMemberId = async (supabase: SupabaseClient, community_id: string) => {
  //handle-error invalid community id
  const { data: community } = await fetchCommunityById(supabase, {
    id: community_id,
  });
  const memberList = community!.members;

  const userRes = await supabase.auth.getUser();

  const member = memberList.find((m) => m.user_id === userRes.data.user!.id);

  return member!.id;
};

const MessageFormContainer: React.FC<{
  channel_id: string;
  community_id: string;
}> = async ({ channel_id, community_id }) => {
  const supabase = createServerComponentClient({ cookies });

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
