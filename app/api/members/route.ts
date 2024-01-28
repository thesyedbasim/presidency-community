import { getAuthUser } from '@/lib/supabase/database/auth/users';
import { createMemberFromInvitationAccept } from '@/lib/supabase/database/public/members';
import { createSupabaseClient } from '@/lib/supabase/utils';
import {
  createNotAuthenticatedResponse,
  createNotAuthorizedResponse,
} from '@/lib/utils/apiErrorResponses';
import { isRLSError } from '@/lib/utils/postgrestErrors';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

// pending_member invite accepted
export const POST = async (req: NextRequest) => {
  console.log('/api/members/ POST route HIT');

  const supabase = createSupabaseClient('route-handler');

  const user = getAuthUser(supabase);

  if (!user) return createNotAuthenticatedResponse();

  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    return Response.json(
      { data: null, error: 'No body specified' },
      { status: 400 }
    );
  }

  if (!body.pending_member_id || !body.community_id)
    return Response.json(
      { data: null, error: 'No pending_member_id or community_id specified' },
      { status: 400 }
    );

  const { error } = await createMemberFromInvitationAccept(supabase, {
    pending_member_id: body.pending_member_id,
  });

  if (error) {
    if (isRLSError(error.code)) return createNotAuthorizedResponse();

    console.error('error while acceping pending member', error);

    return Response.json({ data: null, error: null }, { status: 500 });
  }

  revalidatePath(`/communities/${body.community_id}/members/`);

  return Response.json({ data: null, error: null }, { status: 201 });
};
