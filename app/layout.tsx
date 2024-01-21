import SideNav from '@/components/SideNav';
import './globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="bg-gray-50 dark:bg-slate-900">
        <div className="grid grid-cols-[1fr_3fr] h-screen items-stretch">
          <SideNav />
          {children}
        </div>
      </body>
    </html>
  );
}
