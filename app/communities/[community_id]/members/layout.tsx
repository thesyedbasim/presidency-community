export default function ChannelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full overflow-hidden">
      <div id="content" className="grid items-end h-full overflow-x-hidden">
        {children}
      </div>
    </main>
  );
}
