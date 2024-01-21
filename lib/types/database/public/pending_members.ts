export interface PendingMemberDb {
  id: string; // uuid
  user_id: string; // uuid -> public.users.id
  community_id: string; // uuid -> public.communities.id
}

export interface PendingMemberDetail extends PendingMemberDb {
  user: {
    id: string; // uuid
    name: string; // text
    email: string; // text
  };
}
