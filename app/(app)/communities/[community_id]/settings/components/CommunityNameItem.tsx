'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TypographyH2 from '@/components/ui/typography/typography-h2';
import { updateCommunityNameById } from '@/lib/supabase/database/public/communities';
import { CommunityProfile } from '@/lib/types/database/public/communities';
import { CheckIcon, Cross1Icon, Pencil2Icon } from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

export default function CommunityNameItem({
  community,
  isAuthUserAdmin,
  isAuthUserModerator,
}: {
  community: CommunityProfile;
  isAuthUserAdmin: boolean;
  isAuthUserModerator: boolean;
}) {
  const supabase = createClientComponentClient();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [communityName, setCommunityName] = useState('');

  useEffect(() => {
    setCommunityName(community.name);
  }, [community]);

  const enableEditMode = () => {
    setIsEditMode(true);
  };

  const disableEditMode = () => {
    setIsEditMode(false);
  };

  const saveChanges = async () => {
    // handle-error
    await updateCommunityNameById(supabase, {
      community_id: community.id,
      name: communityName,
    });

    disableEditMode();
  };

  const discardChanges = () => {
    setCommunityName(community.name);
    setIsEditMode(false);
  };

  if (!isEditMode)
    return (
      <div className="flex justify-between items-center gap-10">
        <TypographyH2>{communityName}</TypographyH2>
        {(isAuthUserAdmin || isAuthUserModerator) && (
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Pencil2Icon className="h-4 w-4" onClick={enableEditMode} />
          </Button>
        )}
      </div>
    );

  return (
    <div className="flex justify-between items-center gap-4">
      <Input
        value={communityName}
        onChange={(e) => {
          setCommunityName(e.target.value);
        }}
        placeholder="Enter new community name"
      />
      <div className="flex flex-shrink-0 gap-2">
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <Cross1Icon className="h-4 w-4" onClick={discardChanges} />
        </Button>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <CheckIcon className="h-4 w-4" onClick={saveChanges} />
        </Button>
      </div>
    </div>
  );
}
