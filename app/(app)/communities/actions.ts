'use server';

import { insertCommunity } from '@/lib/supabase/database/queries/public/communities';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export const createNewCommunity = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });

  console.log('server action, ', formData, formData.get('name'));

  const { data: community } = await insertCommunity(supabase, {
    name: formData.get('name') as string,
  });

  revalidateTag('user-communities');
  redirect(`/communities/${community.id}/`);
};
