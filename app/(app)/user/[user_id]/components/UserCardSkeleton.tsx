import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const UserCardSkeleton = () => {
  return (
    <Card className="">
      <CardContent className="flex justify-center pt-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCardSkeleton;
