'use server';

import { redirect } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/utils';

export const handleLogin = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // handle-validation: check if no email or password
  const supabase = createSupabaseClient('server-action');
  // handle-error
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) console.error('error while login', error);
  redirect('/');
};
