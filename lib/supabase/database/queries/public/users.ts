import { QueryFunction } from '@/lib/supabase';
import { UserDb } from '@/lib/types/database/public/users';

export const getUser: QueryFunction<{ user_id: string }, UserDb> = async (
  supabase,
  { user_id }
) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user_id)
    .single();

  if (error) console.error('error while getting user');

  return { data, error };
};
