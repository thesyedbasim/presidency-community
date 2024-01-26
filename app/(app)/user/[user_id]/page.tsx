import { getUser } from '@/lib/supabase/database/queries/public/users';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import UserCard from './components/UserCard';
import { notFound } from 'next/navigation';

export default async function UserPage({
  params,
}: {
  params: { user_id: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // handle-error
  const { data: user } = await getUser(supabase, {
    user_id: params.user_id,
  });

  if (!user) notFound();

  return <UserCard user={user} />;
}
