'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MemberDetail } from '@/lib/types/database/public/members';

export const MoreMemberOptions: React.FC<{
  member: MemberDetail;
  isAuthUserAdmin: boolean;
  isAuthUserModerator: boolean;
}> = ({ member, isAuthUserAdmin, isAuthUserModerator }) => {
  const removeMember = async () => {
    console.log('fn hit');
    const res = await fetch(`/api/members/${member.id}`, { method: 'DELETE' });

    console.log('res after calling delete api route', res.ok);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {(isAuthUserAdmin || isAuthUserModerator) && (
            <DropdownMenuItem onClick={removeMember}>
              Remove member
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
