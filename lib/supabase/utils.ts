import {
  SupabaseClient,
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

type supabaseClientTypes = 'server' | 'route-handler' | 'server-action';

export const createSupabaseClient: (
  clientFor: supabaseClientTypes
) => SupabaseClient = (clientFor) => {
  const cookieStore = cookies();

  let supabase: SupabaseClient;

  switch (clientFor) {
    case 'server':
      supabase = createServerComponentClient({ cookies: () => cookieStore });
      break;
    case 'route-handler':
      supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      break;
    case 'server-action':
      supabase = createServerActionClient({ cookies: () => cookieStore });
      break;
  }

  return supabase;
};
