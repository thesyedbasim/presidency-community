import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { handleJoinCommunity } from '../actions';

type CardProps = React.ComponentProps<typeof Card>;

export default async function JoinCommunityCard({
  className,
  ...props
}: CardProps & { user_id: string; community_id: string }) {
  const handleJoinCommunityWithPayload = handleJoinCommunity.bind(null, {
    community_id: props.community_id,
  });

  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <CardHeader className="">
        <h3 className="text-center scroll-m-20 text-2xl font-semibold tracking-tight">
          Community name here
        </h3>
        <p className="text-center text-sm text-muted-foreground">{3} members</p>
      </CardHeader>
      <CardFooter>
        <form action={handleJoinCommunityWithPayload} className="w-full">
          <Button className="w-full" type="submit">
            Join the community
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
