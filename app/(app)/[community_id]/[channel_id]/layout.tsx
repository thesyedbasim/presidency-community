import MessageFormContainer from './components/MessageFormContainer';

export default function ChannelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { community_id: string; channel_id: string };
}) {
  return (
    <main className="grid grid-rows-[1fr_5rem] gap-4 h-full overflow-hidden">
      <div
        id="content"
        className="grid items-end h-full overflow-x-hidden overflow-y-scroll"
      >
        {children}
      </div>
      <MessageFormContainer
        channel_id={params.channel_id}
        community_id={params.community_id}
      />
    </main>
  );
}
