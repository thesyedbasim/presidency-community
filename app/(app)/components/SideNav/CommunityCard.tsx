'use client';

import Link from 'next/link';
import { CommunityBasic } from '@/lib/types/database/public/communities';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CommunityChannelLink from './CommunityChannelLink';

const CommunityCard: React.FC<{
  community: CommunityBasic;
}> = ({ community }) => {
  const params = useParams<{ community_id?: string; channel_id?: string }>();

  const [communitySelected, setCommunitySelected] = useState<string | null>(
    null
  );

  const [channelSelected, setChannelSelected] = useState<string | null>(null);

  useEffect(() => {
    setCommunitySelected(params.community_id || null);
    setChannelSelected(params.channel_id || null);
  }, [params]);

  if (communitySelected !== community.id)
    return (
      <Link href={`/communities/${community.id}/${community.channels[0].id}`}>
        <Card>
          <CardHeader className="grid grid-cols-[min-content_1fr] items-center gap-2">
            <div className="bg-black w-12 h-12 rounded-full"></div>
            <div className="grid grid-flow-row">
              <CardTitle>{community.name}</CardTitle>
              <CardDescription>
                {community.member_count} members
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </Link>
    );

  return (
    <Card>
      <CardHeader className="grid grid-cols-[min-content_1fr] items-center gap-2">
        <div className="bg-black w-12 h-12 rounded-full"></div>
        <div className="grid grid-flow-row">
          <CardTitle>{community.name}</CardTitle>
          <CardDescription>{community.member_count} members</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {community.channels.map((channel) => (
          <CommunityChannelLink
            key={channel.id}
            channel={channel}
            isSelected={channelSelected === channel.id}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
