import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MemberDetail } from '@/lib/types/database/public/members';
import { MoreMemberOptions } from './MoreOptions';
import { Badge } from '@/components/ui/badge';
import { isAdmin, isModerator } from '@/lib/utils/memberRole';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getMemberFromAuthUser } from '@/lib/supabase/database/queries/public/members';

type CardProps = React.ComponentProps<typeof Card>;

export async function MembersContainer({
  className,
  members,
  ...props
}: CardProps & { members: MemberDetail[]; community_id: string }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: authUserMember } = await getMemberFromAuthUser(supabase, {
    community_id: props.community_id,
  });

  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>{members.length} members</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {members.map((member) => (
            <div
              key={member.id}
              className="mb-4 grid grid-cols-[25px_1fr_min-content] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <p className="text-sm font-medium leading-none">
                    {member.user.name}
                  </p>
                  <Badge>{member.role}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {member.user.email}
                </p>
              </div>
              <div className="">
                {
                  // handle-blunder: check if auth user is admin, not if member role is admin
                }
                <MoreMemberOptions
                  member={member}
                  isAuthUserAdmin={isAdmin(authUserMember?.role || 'member')}
                  isAuthUserModerator={isModerator(
                    authUserMember?.role || 'member'
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
