'use client';

import { CheckIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { redirectToMembersPage } from '../../actions';

const handleAccept = async ({
  pending_member_id,
  community_id,
}: {
  pending_member_id: string;
  community_id: string;
}) => {
  try {
    await fetch('/api/members', {
      method: 'POST',
      body: JSON.stringify({
        pending_member_id,
        community_id,
      }),
    });

    redirectToMembersPage({ community_id });
  } catch (err) {
    console.error('error while fetch to accept invite', err);
  }
};

export function AcceptButton({
  pending_member_id,
}: {
  pending_member_id: string;
}) {
  const searchParams: { community_id: string } = useParams();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        handleAccept({
          pending_member_id,
          community_id: searchParams.community_id,
        })
      }
    >
      <CheckIcon className="h-4 w-4" />
    </Button>
  );
}
