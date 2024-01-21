'use client';

import { getAuthUser } from '@/lib/state/auth';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

const Login: NextPage = () => {
  const supabase = createClientComponentClient();

  const handleLogin = () => {
    supabase.auth
      .signInWithPassword({ email: 'basim@gmail.com', password: '12345678' })
      .then(() => {
        redirect('logged in');
      });
  };

  return (
    <main>
      <form onSubmit={handleLogin}>
        login page <button type="submit">login</button>
      </form>
    </main>
  );
};

export default Login;
