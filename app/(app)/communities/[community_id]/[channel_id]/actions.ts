'use server';

import { createMessage } from '@/lib/supabase/database/queries/public/messages';
import { createSupabaseClient } from '@/lib/supabase/utils';

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
