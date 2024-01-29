'use client';

import { Button } from '@/components/ui/button';
import { redirectToMainPage } from '../actions';

const removeMember = async ({
  member_id,
  community_id,
}: {
  member_id: string;
  community_id: string;
}) => {
  await fetch(`/api/members/${member_id}?community_id=${community_id}`, {
    method: 'DELETE',
  });

  redirectToMainPage();
};

export default function LeaveCommunityButton({
  member_id,
  community_id,
}: {
  member_id: string;
  community_id: string;
}) {
  return (
    <Button
      variant="destructive"
      className="w-full"
      onClick={() => removeMember({ member_id, community_id })}
    >
      Leave community
    </Button>
  );
}
