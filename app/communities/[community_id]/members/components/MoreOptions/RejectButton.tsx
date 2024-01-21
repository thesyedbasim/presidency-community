'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Cross1Icon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

export function RejectButton({
  pending_member_id,
}: {
  pending_member_id: string;
}) {
  const supabase = createClientComponentClient();

  const handleReject = async () => {
    await supabase.from('pending_members').delete().eq('id', pending_member_id);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleReject}>
      <Cross1Icon className="h-4 w-4" />
    </Button>
  );
}
