export interface MemberDb {
  id: string; // uuid
  user_id: string; // uuid -> public.users.id
  joined_at: string; // timestamptz
  community_id: string; // uuid -> public.communities.id
  role: string; // uuid -> public.roles
}

export interface MemberDetail extends Omit<MemberDb, 'role'> {
  user: {
    id: string; // uuid
    name: string; // text
    email: string; // text
  };
  role: string; // text
}

export const ADMIN_ROLE_ID = 'fdfe20ab-2ff0-4009-a53b-6ee0bf3bd249';
export const MODERATOR_ROLE_ID = 'd8e4badf-1163-4637-843f-821f4edd67f5';
export const MEMBER_ROLE_ID = '57a22c48-7648-4e4d-afea-2b16b8faf0a9';

export enum CommunityRoles {
  ADMIN_ROLE = 'admin',
  MODERATOR_ROLE = 'moderator',
  MEMBER_ROLE = 'member',
}
