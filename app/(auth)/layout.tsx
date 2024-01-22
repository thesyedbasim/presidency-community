import '@/app/global.scss';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) return redirect('/');

  return (
    <html lang="en">
      <head></head>
      <body>
        <main className="grid place-content-center w-full h-screen">
          {children}
        </main>
      </body>
    </html>
  );
};

export default AuthLayout;
