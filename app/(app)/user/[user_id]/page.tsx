import { getUser } from '@/lib/supabase/database/queries/public/users';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import UserCard from './components/UserCard';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Metadata } from 'next';
import { createSupabaseClient } from '@/lib/supabase/utils';

export const fetchUser = unstable_cache(getUser, ['public-user'], {
  tags: ['public-user'],
});

type MetaDataProps = {
  params: { user_id: string };
};

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const supabase = createSupabaseClient('server');

  const { data: user } = await fetchUser(supabase, {
    user_id: params.user_id,
  });

  return {
    title: user.name,
  };
}

export default async function UserPage({
  params,
}: {
  params: { user_id: string };
}) {
  const supabase = createSupabaseClient('server');

  // handle-error
  const { data: user } = await fetchUser(supabase, {
    user_id: params.user_id,
  });

  if (!user) notFound();

  return <UserCard user={user} />;
}
