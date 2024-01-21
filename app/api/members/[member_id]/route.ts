import { getAuthUser } from '@/lib/state/auth';
import { updateMemberPresentStatus } from '@/lib/supabase/database/queries/public/members';
import { createNotAuthenticatedResponse } from '@/lib/utils/apiErrorResponses';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// member left, or removed by admin/moderator from the community
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { member_id: string } }
) => {
  console.log('delete route hit');

  console.log('member to remove', params.member_id);

  const supabase = createRouteHandlerClient({ cookies });

  const user = getAuthUser(supabase);

  if (!user) return createNotAuthenticatedResponse();

  const { error } = await updateMemberPresentStatus(supabase, {
    member_id: params.member_id,
  });

  console.log('the error before checing', error);

  if (error) {
    console.error('error while deleting member');

    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }

  return Response.json({ data: null, error: null }, { status: 200 });
};
