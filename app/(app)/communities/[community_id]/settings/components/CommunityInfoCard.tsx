import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TypographyMuted from '@/components/ui/typography/typography-muted';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MediaTabContent from './MediaTabContent';
import { getCommunityProfileById } from '@/lib/supabase/database/public/communities';
import { createSupabaseClient } from '@/lib/supabase/utils';
import CommunityNameItem from './CommunityNameItem';
import CommunityDescriptionItem from './CommunityDescriptionItem';

const CommunityInfoCard: React.FC<{
  community_id: string;
  isAuthUserAdmin: boolean;
  isAuthUserModerator: boolean;
}> = async ({ community_id, isAuthUserAdmin, isAuthUserModerator }) => {
  const supabase = createSupabaseClient('server');

  const { data: community } = await getCommunityProfileById(supabase, {
    community_id,
  });

  return (
    <Card className="">
      <CardContent className="w-full pt-6 flex flex-col gap-8">
        <div className="grid grid-cols-[min-content_1fr] gap-6">
          <div className="bg-black w-16 h-16 rounded-full"></div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <CommunityNameItem
                community={community}
                isAuthUserAdmin={isAuthUserAdmin}
                isAuthUserModerator={isAuthUserModerator}
              />
              <TypographyMuted>
                {community.member_count} members
              </TypographyMuted>
            </div>
            <CommunityDescriptionItem
              community={community}
              isAuthUserAdmin={isAuthUserAdmin}
              isAuthUserModerator={isAuthUserModerator}
            />
          </div>
        </div>
        <Separator className="w-full" />
        <Tabs defaultValue="media" className="">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="docs">Docs</TabsTrigger>
          </TabsList>
          <MediaTabContent />
          <TabsContent value="links"></TabsContent>
          <TabsContent value="docs"></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunityInfoCard;
