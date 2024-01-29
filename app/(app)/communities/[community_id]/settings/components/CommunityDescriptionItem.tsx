'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TypographyMuted from '@/components/ui/typography/typography-muted';
import { TypographyP } from '@/components/ui/typography/typography-p';
import { updateCommunityDescriptionById } from '@/lib/supabase/database/public/communities';
import { CommunityProfile } from '@/lib/types/database/public/communities';
import { CheckIcon, Cross1Icon, Pencil2Icon } from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

export default function CommunityDescriptionItem({
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
  const [communityDescription, setCommunityDescription] = useState('');

  useEffect(() => {
    setCommunityDescription(community.description || '');
  }, [community]);

  const enableEditMode = () => {
    setIsEditMode(true);
  };

  const disableEditMode = () => {
    setIsEditMode(false);
  };

  const saveChanges = async () => {
    // handle-error
    await updateCommunityDescriptionById(supabase, {
      community_id: community.id,
      description: communityDescription,
    });

    disableEditMode();
  };

  const discardChanges = () => {
    setCommunityDescription(community.description || '');
    setIsEditMode(false);
  };

  if (isEditMode)
    return (
      <div className="flex justify-between items-center gap-4">
        <Input
          value={communityDescription}
          onChange={(e) => {
            setCommunityDescription(e.target.value);
          }}
          placeholder="Enter community description"
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

  if (!isEditMode && communityDescription)
    return (
      <div className="flex justify-between items-center gap-10">
        <TypographyP>{communityDescription}</TypographyP>
        {(isAuthUserAdmin || isAuthUserModerator) && (
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Pencil2Icon className="h-4 w-4" onClick={enableEditMode} />
          </Button>
        )}
      </div>
    );

  if (!isEditMode && !communityDescription)
    return (
      <div className="flex justify-between items-center gap-10">
        <TypographyMuted>
          {isAuthUserAdmin || isAuthUserModerator
            ? 'Add a community description'
            : 'No community description'}
        </TypographyMuted>
        {(isAuthUserAdmin || isAuthUserModerator) && (
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Pencil2Icon className="h-4 w-4" onClick={enableEditMode} />
          </Button>
        )}
      </div>
    );
}
