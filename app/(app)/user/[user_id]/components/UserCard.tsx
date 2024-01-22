import { Card, CardContent } from '@/components/ui/card';
import TypographyH2 from '@/components/ui/typography/typography-h2';
import { UserDb } from '@/lib/types/database/public/users';

const UserCard: React.FC<{ user: UserDb }> = ({ user }) => {
  return (
    <Card className="">
      <CardContent className="flex justify-center pt-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="bg-black w-16 h-16 rounded-full"></div>
          <TypographyH2>{user.name}</TypographyH2>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
