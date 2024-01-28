import { getAuthUser } from '@/lib/state/auth';
import { getCommunitiesByUserId } from '@/lib/supabase/database/queries/public/communities';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { createNotAuthenticatedResponse } from '@/lib/utils/apiErrorResponses';
import { NextRequest } from 'next/server';

// get all communities determined by auth user
export const GET = async (_: NextRequest) => {
  const supabase = createSupabaseClient('route-handler');

  const user = await getAuthUser(supabase);

  if (!user) return createNotAuthenticatedResponse();

  const { data } = await getCommunitiesByUserId(supabase, { user_id: user.id });

  return Response.json({ data, error: null });
};
