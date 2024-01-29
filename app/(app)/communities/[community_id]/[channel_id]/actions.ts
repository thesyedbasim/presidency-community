'use server';

import { insertChannel } from '@/lib/supabase/database/public/channels';
import { createMessage } from '@/lib/supabase/database/public/messages';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { redirect } from 'next/navigation';

export const createChannel = async ({
  community_id,
  channelName,
  redirectUrl = `/communities/${community_id}/settings`,
}: {
  community_id: string;
  channelName: string;
  redirectUrl?: string;
}) => {
  const supabase = createSupabaseClient('server-action');

  const { error } = await insertChannel(supabase, {
    community_id,
    name: channelName,
  });

  if (!error) redirect(redirectUrl);
};

export const sendMessage = async (
  {
    member_id,
    channel_id,
    community_id,
  }: { member_id: string; channel_id: string; community_id: string },
  formData: FormData
) => {
  //handle-constraints
  //handle-error

  const supabase = createSupabaseClient('server-action');

  try {
    const messageContent = formData.get('message') as string;
    await createMessage(supabase, {
      content: messageContent,
      member_id,
      channel_id,
      community_id,
    });
  } catch (err) {
    console.error('error while creating new message', err);
  }
};
