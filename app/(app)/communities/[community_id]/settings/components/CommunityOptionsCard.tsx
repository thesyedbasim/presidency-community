import { Card, CardContent } from '@/components/ui/card';
import DeleteCommunityButton from './DeleteCommunityButton';
import LeaveCommunityButton from './LeaveCommunityButton';

export default function CommunityOptionsCard({
  member_id,
  community_id,
  isAuthUserAdmin,
}: {
  member_id: string;
  community_id: string;
  isAuthUserAdmin: boolean;
}) {
  return (
    <Card className="">
      <CardContent className="pt-6 flex flex-col gap-4">
        {isAuthUserAdmin ? (
          <DeleteCommunityButton community_id={community_id} />
        ) : (
          <LeaveCommunityButton
            member_id={member_id}
            community_id={community_id}
          />
        )}
      </CardContent>
    </Card>
  );
}
