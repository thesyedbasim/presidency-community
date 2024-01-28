import { getCommunityById } from '@/lib/supabase/database/queries/public/communities';
import { createSupabaseClient } from '@/lib/supabase/utils';

export async function GET(
  _: Request,
  { params }: { params: { community_id: string } }
) {
  const supabase = createSupabaseClient('route-handler');

  const community_id = params.community_id;

  const communityRes = await getCommunityById(supabase, { community_id });

  return Response.json(communityRes);
}
