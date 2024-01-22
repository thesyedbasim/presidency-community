import { Skeleton } from '@/components/ui/skeleton';

const MessageCardSkeleton: React.FC = () => {
  return (
    <div className="px-6 pt-2 pb-2 flex items-center space-x-4">
      <Skeleton className="h-6 w-6 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-2 w-[250px]" />
        <Skeleton className="h-2 w-[200px]" />
      </div>
    </div>
  );
};

export default MessageCardSkeleton;
