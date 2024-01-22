import TypographyH1 from '@/components/ui/typography/typography-h1';
import TypographyMuted from '@/components/ui/typography/typography-muted';
import { CommunityDetail } from '@/lib/types/database/public/communities';
import CommunityMembersButton from '../CommunityMembersButton';
import CommunitySettingsButton from '../CommunitySettingsButton';

const CommunityHeader: React.FC<{ community: CommunityDetail }> = ({
  community,
}) => {
  return (
    <header className="flex justify-between items-center py-2 px-8 border shadow">
      <>
        <div className="grid grid-flow-row gap-1">
          <TypographyH1>{community.name}</TypographyH1>
          <TypographyMuted>{community.members.length} members</TypographyMuted>
        </div>
        <div className="flex gap-2">
          <CommunityMembersButton community_id={community.id} />
          <CommunitySettingsButton community_id={community.id} />
        </div>
      </>
    </header>
  );
};

export default CommunityHeader;
