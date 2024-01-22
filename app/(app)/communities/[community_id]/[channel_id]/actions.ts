'use server';

import { createMessage } from '@/lib/supabase/database/queries/public';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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

  const cookieStore = cookies();

  const supabase = createServerActionClient({ cookies: () => cookieStore });

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
