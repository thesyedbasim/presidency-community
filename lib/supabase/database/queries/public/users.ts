import { QueryFunction } from '@/lib/supabase';
import { UserDb } from '@/lib/types/database/public/users';

enum UserQuery {
  db = '*',
}

export const getUser: QueryFunction<{ user_id: string }, UserDb> = async (
  supabase,
  { user_id }
) => {
  const { data, error } = await supabase
    .from('users')
    .select(UserQuery.db)
    .eq('id', user_id)
    .single();

  if (error) console.error('error while getting user');

  return { data, error };
};
