import '@/app/global.scss';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createSupabaseClient('server');

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
