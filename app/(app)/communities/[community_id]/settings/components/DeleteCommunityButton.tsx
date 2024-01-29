'use client';

import { Button } from '@/components/ui/button';
import { deleteCommunityById } from '@/lib/supabase/database/public/communities';
import { redirectToMainPage } from '../actions';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function DeleteCommunityButton({
  community_id,
}: {
  community_id: string;
}) {
  const supabase = createClientComponentClient();

  const handleCommunityDelete = async () => {
    await deleteCommunityById(supabase, { community_id });

    redirectToMainPage();
  };

  return (
    <Button
      variant="destructive"
      className="w-full"
      onClick={handleCommunityDelete}
    >
      Delete community
    </Button>
  );
}
