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
  message_id: string;
  isAdmin: boolean;
  isModerator: boolean;
  isSender: boolean;
}> = ({ message_id, isAdmin, isModerator, isSender }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {(isAdmin || isModerator || isSender) && (
            <MessageDeleteItem message_id={message_id} />
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
