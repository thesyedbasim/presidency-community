import { unstable_cache } from 'next/cache';
import { SupabaseClient } from '@supabase/supabase-js';

export const getAuthUser = unstable_cache(
  async (supabase: SupabaseClient) => {
    const userRes = await supabase.auth.getUser();

    return userRes.data.user;
  },
  ['auth-user'],
  { tags: ['auth'] }
);
