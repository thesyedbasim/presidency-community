import { getUser } from '@/lib/supabase/database/queries/public/users';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import UserCard from './components/UserCard';

export default async function UserPage({
  params,
}: {
  params: { user_id: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: user, error } = await getUser(supabase, {
    user_id: params.user_id,
  });

  return (
    <main className="pt-6 px-12">
      <UserCard user={user} />
    </main>
  );
}
