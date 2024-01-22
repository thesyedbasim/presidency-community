import { MemberDetail } from '@/lib/types/database/public/members';

export const findAuthUserFromMembers = ({
  members,
  user_id,
}: {
  members: MemberDetail[];
  user_id: string | undefined;
}) => {
  return members.find((member) => member.user_id === user_id);
};
