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
import Link from 'next/link';
import { redirectToMembersPage } from '../../actions';

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

  redirectToMembersPage({ community_id });
};

export const MoreMemberOptions: React.FC<{
  member: MemberDetail;
  isAuthUserAdmin: boolean;
  isAuthUserModerator: boolean;
}> = ({ member, isAuthUserAdmin, isAuthUserModerator }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <Link href={`/user/${member.user_id}`}>
            <DropdownMenuItem>View info</DropdownMenuItem>
          </Link>
          {(isAuthUserAdmin || isAuthUserModerator) && (
            <DropdownMenuItem
              onClick={() =>
                removeMember({
                  member_id: member.id,
                  community_id: member.community_id,
                })
              }
            >
              Remove member
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
