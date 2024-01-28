import { Metadata } from 'next';
import MessagesContainer from './components/MessagesContainer';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { unstable_cache } from 'next/cache';
import { getChannelById } from '@/lib/supabase/database/queries/public/channels';

const fetchChannelById = unstable_cache(getChannelById, ['channel-by-id']);

type MetaDataProps = {
  params: { channel_id: string };
};

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const supabase = createSupabaseClient('server');

  const { data: channel } = await fetchChannelById(supabase, {
    channel_id: params.channel_id,
  });

  return {
    title: channel.name,
  };
}

const Channel = ({
  params,
}: {
  params: { community_id: string; channel_id: string };
}) => {
  return (
    <div className="grid grid-flow-row gap-2 max-h-full">
      <MessagesContainer
        community_id={params.community_id}
        channel_id={params.channel_id}
      />
    </div>
  );
};

export default Channel;
