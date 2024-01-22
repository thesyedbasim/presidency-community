import { Button } from '@/components/ui/button';
import { ChannelDb } from '@/lib/types/database/public/channels';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const CommunityChannelLink: React.FC<{
  channel: ChannelDb;
  isSelected: boolean;
}> = ({ channel, isSelected }) => {
  return (
    <Link href={`/communities/${channel.community_id}/${channel.id}`}>
      <Button
        variant="link"
        className={cn('flex items-center gap-2', isSelected ? 'font-bold' : '')}
      >
        <span>{channel.name}</span>
        <ArrowRightIcon className="mr-2 h-4 w-4" />
      </Button>
    </Link>
  );
};

export default CommunityChannelLink;
