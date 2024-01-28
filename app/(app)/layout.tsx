import SideNav from './components/SideNav';
import './globals.scss';
import { redirect } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Presidency Communities',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseClient('server');

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return redirect('/login');

  // handle-error
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', session?.user.id)
    .single();

  return (
    <html lang="en">
      <head></head>
      <body className="bg-gray-50 dark:bg-slate-900">
        <div className="grid grid-cols-[1fr_3fr] h-screen items-stretch">
          <SideNav user={user} />
          {children}
        </div>
      </body>
    </html>
  );
}
