'use server';

import { insertCommunity } from '@/lib/supabase/database/public/communities';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { createSupabaseClient } from '@/lib/supabase/utils';

export const createNewCommunity = async (formData: FormData) => {
  const supabase = createSupabaseClient('server-action');

  console.log('server action, ', formData, formData.get('name'));

  const { data: community } = await insertCommunity(supabase, {
    name: formData.get('name') as string,
  });

  revalidateTag('user-communities');
  redirect(`/communities/${community.id}/`);
};
