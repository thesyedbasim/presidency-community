'use client';

import { deleteMessageById } from '@/lib/supabase/database/queries/public';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

const MessageDeleteItem: React.FC<{ message_id: string }> = ({
  message_id,
}) => {
  return (
    <DropdownMenuItem onClick={() => deleteMessageById(message_id)}>
      Delete message
    </DropdownMenuItem>
  );
};

export default MessageDeleteItem;
