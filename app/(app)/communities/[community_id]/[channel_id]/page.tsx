import { Suspense } from 'react';
import MessagesContainer from './components/MessagesContainer';
import { Loading } from '@/components/ui/loading';

const Channel = ({
  params,
}: {
  params: { community_id: string; channel_id: string };
}) => {
  return (
    <div className="grid grid-flow-row gap-2 max-h-full">
      <MessagesContainer
        community_id={params.community_id}
        channel_id={params.channel_id}
      />
    </div>
  );
};

export default Channel;
