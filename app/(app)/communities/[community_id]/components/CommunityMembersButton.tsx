import { Button } from '@/components/ui/button';
import { PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const CommunityMembersButton: React.FC<{ community_id: string }> = ({
  community_id,
}) => {
  return (
    <Link href={`/communities/${community_id}/members`}>
      <Button variant="outline" size="icon">
        <PersonIcon className="h-4 w-4" />
      </Button>
    </Link>
  );
};

export default CommunityMembersButton;
