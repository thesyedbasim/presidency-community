import { getUser } from '@/lib/supabase/database/queries/public/users';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import UserCard from './components/UserCard';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Metadata } from 'next';

export const fetchUser = unstable_cache(getUser, ['public-user'], {
  tags: ['public-user'],
});

type MetaDataProps = {
  params: { user_id: string };
};

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

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
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // handle-error
  const { data: user } = await fetchUser(supabase, {
    user_id: params.user_id,
  });

  if (!user) notFound();

  return <UserCard user={user} />;
}
