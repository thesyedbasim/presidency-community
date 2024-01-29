import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getChannelsByCommunityId } from '@/lib/supabase/database/public/channels';
import { createSupabaseClient } from '@/lib/supabase/utils';
import CreateChannelDialogue from './CreateChannelDialogue';
import ChannelListItem from './ChannelListItem';

const ChannelListCard: React.FC<{
  community_id: string;
  isAuthUserAdmin: boolean;
  isAuthUserModerator: boolean;
}> = async ({ community_id, isAuthUserAdmin, isAuthUserModerator }) => {
  const supabase = createSupabaseClient('server');

  const { data: channels } = await getChannelsByCommunityId(supabase, {
    community_id,
  });

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Channels</CardTitle>
        {(isAuthUserAdmin || isAuthUserModerator) && (
          <CreateChannelDialogue community_id={community_id} />
        )}
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col gap-2">
          {channels.map((channel) => (
            <ChannelListItem
              key={channel.id}
              channel={channel}
              isAuthUserAdmin={isAuthUserAdmin}
              isAuthUserModerator={isAuthUserModerator}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelListCard;
