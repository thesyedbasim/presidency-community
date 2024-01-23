import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export const GET = async () => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { error } = await supabase.auth.signOut();

  if (error)
    Response.json(
      { error: { message: 'Something went wrong while signing out!' } },
      { status: 500 }
    );

  redirect('/login');
};
