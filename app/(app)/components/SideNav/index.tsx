import { Suspense } from 'react';
import CommunityCardsContainer from './CommunityCardsContainer';
import CommunityCardSkeleton from './CommunityCardSkeleton';
import TypographyH2 from '@/components/ui/typography/typography-h2';
import CommunityCreateButton from './CommunityCreateButton';
import { UserDb } from '@/lib/types/database/public/users';

const SideNav: React.FC<{ user: UserDb }> = async ({ user }) => {
  return (
    <>
      <aside
        id="side-nav"
        className="grid grid-rows-[6rem_1fr] gap-6 px-4 bg-slate-100"
      >
        <header className="flex items-center">
          <TypographyH2>Communities</TypographyH2>
        </header>
        <div className="grid auto-rows-min grid-flow-row gap-6">
          <Suspense
            fallback={
              <>
                <CommunityCardSkeleton />
                <CommunityCardSkeleton />
                <CommunityCardSkeleton />
              </>
            }
          >
            <CommunityCardsContainer />
            {user.is_faculty && <CommunityCreateButton />}
          </Suspense>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
