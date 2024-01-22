import SideNav from './components/SideNav';
import './globals.scss';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return redirect('/login');

  return (
    <html lang="en">
      <head></head>
      <body className="bg-gray-50 dark:bg-slate-900">
        <div className="grid grid-cols-[1fr_3fr] h-screen items-stretch">
          <SideNav />
          {children}
        </div>
      </body>
    </html>
  );
}
