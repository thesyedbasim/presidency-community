import MessageCardSkeleton from './components/MessageCardSkeleton';

const ChannelLoading = () => {
  return (
    <div className="grid grid-flow-row gap-2 max-h-full">
      <MessageCardSkeleton />
      <MessageCardSkeleton />
      <MessageCardSkeleton />
      <MessageCardSkeleton />
    </div>
  );
};

export default ChannelLoading;
