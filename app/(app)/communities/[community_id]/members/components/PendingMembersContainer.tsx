'use client';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AcceptButton } from './MoreOptions/AcceptButton';
import { RejectButton } from './MoreOptions/RejectButton';
import {
  PendingMemberDb,
  PendingMemberDetail,
} from '@/lib/types/database/public/pending_members';
import { useEffect, useState } from 'react';
import { subscribeToPendingMembers } from '@/lib/supabase/realtime';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getPendingMembersByCommunityId } from '@/lib/supabase/database/queries/public/pending_members';

type CardProps = React.ComponentProps<typeof Card>;

export function PendingMembersContainer({
  className,
  ...props
}: CardProps & { community_id: string }) {
  const supabase = createClientComponentClient();

  const [pendingMembers, setPendingMembers] = useState<PendingMemberDetail[]>(
    []
  );

  useEffect(() => {
    getPendingMembersByCommunityId(supabase, {
      community_id: props.community_id,
    }).then((pendingMembersRes) => {
      setPendingMembers(pendingMembersRes.data || []);
    });
  }, [props.community_id, supabase]);

  useEffect(() => {
    const pendingMembersChannel = subscribeToPendingMembers(
      supabase,
      { community_id: props.community_id },
      (payload: RealtimePostgresChangesPayload<PendingMemberDb>) => {
        if (payload.eventType === 'INSERT') {
          supabase
            .from('pending_members')
            .select('*, user:user_id(*)')
            .eq('id', payload.new.id)
            .single()
            .then(({ data: pendingMember }) => {
              setPendingMembers((prevPendingMembers) => [
                ...prevPendingMembers,
                pendingMember,
              ]);
            });
        } else if (payload.eventType === 'DELETE') {
          setPendingMembers((prevPendingMembers) => {
            return prevPendingMembers.filter(
              (prevPendingMember) => prevPendingMember.id !== payload.old.id
            );
          });
        }
      }
    );

    return () => {
      supabase.removeChannel(pendingMembersChannel);
    };
  }, [props.community_id, supabase]);

  if (pendingMembers.length === 0) return null;

  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        <CardTitle>Members awaiting</CardTitle>
        <CardDescription>{pendingMembers.length} members</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {pendingMembers.map((member) => (
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
                </div>
                <p className="text-sm text-muted-foreground">
                  {member.user.email}
                </p>
              </div>
              <div className="flex gap-2">
                <AcceptButton pending_member_id={member.id} />
                <RejectButton pending_member_id={member.id} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
