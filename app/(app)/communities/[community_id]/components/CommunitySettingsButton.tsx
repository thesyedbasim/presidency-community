import { Button } from '@/components/ui/button';
import { GearIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const CommunitySettingsButton: React.FC<{ community_id: string }> = ({
  community_id,
}) => {
  return (
    <Link href={`/communities/${community_id}/settings`}>
      <Button variant="outline" size="icon">
        <GearIcon className="h-4 w-4" />
      </Button>
    </Link>
  );
};

export default CommunitySettingsButton;
