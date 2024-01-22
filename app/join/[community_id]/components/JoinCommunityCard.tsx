'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { handleJoinCommunity } from '../actions';
import { CommunityDetail } from '@/lib/types/database/public/communities';

type CardProps = React.ComponentProps<typeof Card>;

export default function JoinCommunityCard({
  className,
  community,
  ...props
}: CardProps & { community: CommunityDetail }) {
  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <CardHeader className="">
        <h3 className="text-center scroll-m-20 text-2xl font-semibold tracking-tight">
          {community.name}
        </h3>
        <p className="text-center text-sm text-muted-foreground">
          {community.members.length} members
        </p>
      </CardHeader>
      <CardFooter>
        <Button
          className="w-full"
          onClick={async () => {
            await handleJoinCommunity({ community_id: community.id });
          }}
        >
          Join the community
        </Button>
      </CardFooter>
    </Card>
  );
}
