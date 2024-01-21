'use client';

import { CheckIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

export function AcceptButton({
  pending_member_id,
}: {
  pending_member_id: string;
}) {
  const handleAccept = async () => {
    await fetch('/api/members', {
      method: 'POST',
      body: JSON.stringify({ pending_member_id }),
    });
  };

  return (
    <Button variant="outline" size="icon" onClick={handleAccept}>
      <CheckIcon className="h-4 w-4" />
    </Button>
  );
}
