'use client';

import Link from 'next/link';
import cn from 'classnames';
import { CommunityDetail } from '@/lib/types/database/public/communities';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const CommunityCard: React.FC<{
  community: CommunityDetail;
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
        <div className="grid grid-cols-[min-content_1fr] gap-4 content-start py-2 px-4 rounded-md border border-gray-800 bg-gray-950 hover:bg-gray-900 transition-all">
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div className="grid grid-flow-row">
            <div className="grid grid-flow-row">
              <p className="text-md font-semibold text-white">
                {community.name}
              </p>
              <p className="text-xs text-gray-500">
                {community.members.length} members
              </p>
            </div>
          </div>
        </div>
      </Link>
    );

  return (
    <div className="grid grid-flow-row gap-6 relative py-2 px-4 rounded-md border border-gray-800 bg-gray-900 transition-all">
      <div className="grid grid-cols-[min-content_1fr] gap-4 content-start">
        <div className="w-12 h-12 bg-white rounded-full"></div>
        <div className="grid grid-flow-row">
          <div className="grid grid-flow-row">
            <p className="text-md font-semibold text-white">{community.name}</p>
            <p className="text-xs text-gray-500">
              {community.members.length} members
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-flow-row gap-2">
        {community.channels.map((channel) => (
          <Link
            key={channel.id}
            href={`/communities/${community.id}/${channel.id}`}
            className={cn(
              'flex items-center gap-2 group transition-all',
              channelSelected === channel.id
                ? 'text-white'
                : 'text-gray-500 hover:text-white'
            )}
          >
            <span>{channel.name}</span>
            {channelSelected !== channel.id && (
              <button className="h-4 w-4 text-gray-500 group-hover:translate-x-1 group-hover:text-white transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="M268 112l144 144-144 144M392 256H100"
                  />
                </svg>
              </button>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityCard;
