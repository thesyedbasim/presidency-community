import { getAuthUser } from '@/lib/state/auth';
import { getUserCommunities } from '@/lib/supabase/database/queries/public';
import { createNotAuthenticatedResponse } from '@/lib/utils/apiErrorResponses';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// get all communities determined by auth user
export const GET = async (req: NextRequest) => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const user = await getAuthUser(supabase);

  if (!user) return createNotAuthenticatedResponse();

  const { data } = await getUserCommunities(supabase, { user_id: user.id });

  return Response.json({ data, error: null });
};
