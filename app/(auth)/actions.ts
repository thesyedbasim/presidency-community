'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const handleLogin = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log('handle login hit', email, password);

  // handle-validation: check if no email or password
  const cookieStore = () => cookies();
  const supabase = createServerActionClient({ cookies: cookieStore });
  // handle-error
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) console.error('error while login', error);
  redirect('/');
};
