import { SupabaseClient } from '@supabase/supabase-js';

export async function handleUserLogin(
  supabase: SupabaseClient,
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  }
) {
  // handle-error
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return data;
}

export async function handleUserSignOut(supabase: SupabaseClient) {
  await supabase.auth.signOut();
}
