import Link from 'next/link';

import { MessageDetail } from '@/lib/types/database/public/messages';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import MessageDeleteItem from './dropdown-menu-items/MessageDeleteItem';

export const MoreMessageOptions: React.FC<{
  message: MessageDetail;
  isAdmin: { sender: boolean; authUser: boolean };
  isModerator: { sender: boolean; authUser: boolean };
  isSender: boolean;
}> = ({ message, isAdmin, isModerator, isSender }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <Link href={`/user/${message.sender.user.id}`}>
            <DropdownMenuItem>View user info</DropdownMenuItem>
          </Link>
          {(isAdmin.authUser || isModerator.authUser || isSender) && (
            <MessageDeleteItem message_id={message.id} />
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
