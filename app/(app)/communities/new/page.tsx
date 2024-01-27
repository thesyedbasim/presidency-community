import NewCommunityForm from './NewCommunityForm';
import TypographyH2 from '@/components/ui/typography/typography-h2';

const CommunityNew = () => {
  return (
    <div className="h-screen pt-[6rem] px-12">
      <TypographyH2>Create a new Community</TypographyH2>
      <NewCommunityForm />
    </div>
  );
};

export default CommunityNew;
