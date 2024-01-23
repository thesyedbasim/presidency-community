import { getCommunityById } from '@/lib/supabase/database/queries/public/communities';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(
  _: Request,
  { params }: { params: { community_id: string } }
) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const community_id = params.community_id;

  const communityRes = await getCommunityById(supabase, { community_id });

  return Response.json(communityRes);
}
