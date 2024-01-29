import { CommunityRoles } from '../types/database/public/members';

export const isAdmin = (memberRole?: string) => {
  return memberRole === CommunityRoles.ADMIN_ROLE;
};

export const isModerator = (memberRole?: string) => {
  return memberRole === CommunityRoles.MODERATOR_ROLE;
};

export const isMember = (memberRole?: string) => {
  return memberRole === CommunityRoles.MEMBER_ROLE;
};
