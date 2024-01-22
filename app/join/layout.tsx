import '@/app/global.scss';

const JoinLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
    </html>
  );
};

export default JoinLayout;
