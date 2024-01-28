import { Metadata } from 'next';
import MessagesContainer from './components/MessagesContainer';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { getChannelById } from '@/lib/supabase/database/public/channels';
import { getMessagesInChannel } from '@/lib/supabase/database/public/messages';
import { unstable_cache } from 'next/cache';

type MetaDataProps = {
  params: { channel_id: string };
};

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const supabase = createSupabaseClient('server');

  const { data: channel } = await getChannelById(supabase, {
    channel_id: params.channel_id,
  });

  return {
    title: channel.name,
  };
}

const Channel = async ({
  params,
}: {
  params: { community_id: string; channel_id: string };
}) => {
  const supabase = createSupabaseClient('server');

  const { data: messages } = await getMessagesInChannel(supabase, {
    channel_id: params.channel_id,
  });

  return (
    <div className="grid grid-flow-row gap-2 max-h-full">
      <MessagesContainer
        messages={messages}
        community_id={params.community_id}
        channel_id={params.channel_id}
      />
    </div>
  );
};

export default Channel;
