import { getCommunityById } from '@/lib/supabase/database/queries/public';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: { community_id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });

  const community_id = params.community_id;

  const communityRes = await getCommunityById(supabase, { id: community_id! });

  return Response.json(communityRes);
}
