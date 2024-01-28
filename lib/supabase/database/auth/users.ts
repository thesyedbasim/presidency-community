import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getAuthUser = cache(async (supabase: SupabaseClient) => {
  const userRes = await supabase.auth.getUser();

  return userRes.data.user;
});
