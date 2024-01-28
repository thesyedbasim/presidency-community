import { getUserById } from '@/lib/supabase/database/public/users';
import UserCard from './components/UserCard';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createSupabaseClient } from '@/lib/supabase/utils';

type MetaDataProps = {
  params: { user_id: string };
};

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const supabase = createSupabaseClient('server');

  const { data: user } = await getUserById(supabase, {
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
  const { data: user } = await getUserById(supabase, {
    user_id: params.user_id,
  });

  if (!user) notFound();

  return <UserCard user={user} />;
}
