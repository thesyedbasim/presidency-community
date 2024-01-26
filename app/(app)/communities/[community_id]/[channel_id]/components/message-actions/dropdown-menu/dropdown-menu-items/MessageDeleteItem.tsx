'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { deleteMessageById } from '@/lib/supabase/database/queries/public/messages';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const MessageDeleteItem: React.FC<{ message_id: string }> = ({
  message_id,
}) => {
  const supabase = createClientComponentClient();

  return (
    <DropdownMenuItem
      onClick={() => deleteMessageById(supabase, { message_id })}
    >
      Delete message
    </DropdownMenuItem>
  );
};

export default MessageDeleteItem;
