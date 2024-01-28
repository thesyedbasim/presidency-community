import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

const CommunitySettings: React.FC<{
  params: { community_id: string };
}> = async () => {
  return null;
};

export default CommunitySettings;
