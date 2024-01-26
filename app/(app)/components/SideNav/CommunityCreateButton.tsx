import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const CommunityCreateButton: React.FC = () => {
  return (
    <Link href={`/communities/new`}>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" /> Create community
      </Button>
    </Link>
  );
};

export default CommunityCreateButton;
