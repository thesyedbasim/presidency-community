type communityRoles = 'admin' | 'moderator' | 'member';

export interface RoleDb {
  id: string; // uuid
  name: communityRoles;
}
