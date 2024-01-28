import { getAuthUser } from '@/lib/state/auth';
import { updateMemberPresentStatus } from '@/lib/supabase/database/queries/public/members';
import { createSupabaseClient } from '@/lib/supabase/utils';
import { createNotAuthenticatedResponse } from '@/lib/utils/apiErrorResponses';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

// member left, or removed by admin/moderator from the community
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { member_id: string } }
) => {
  console.log('/api/member/[member_id]/ DELETE route HIT');

  const supabase = createSupabaseClient('route-handler');
  const user = await getAuthUser(supabase);

  if (!user) return createNotAuthenticatedResponse();

  const searchParams = req.nextUrl.searchParams;

  if (!searchParams.get('community_id'))
    return Response.json(
      { data: null, error: 'No  community_id query specified' },
      { status: 400 }
    );

  const { error } = await updateMemberPresentStatus(supabase, {
    member_id: params.member_id,
  });

  if (error) {
    console.error('error while deleting member');

    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }

  revalidatePath(`/communities/${searchParams.get('community_id')}/members/`);

  return Response.json({ data: null, error: null }, { status: 200 });
};
