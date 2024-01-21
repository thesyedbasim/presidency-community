export interface MessageDb {
  id: string; // uuid
  content: string; // text
  sender_id: string; // uuid -> public.members.id
  created_at: string; // timestamptz
  channel_id: string; // uuid -> public.channels.id
  community_id: string; // uuid -> public.communities.id
}

export interface MessageDetail extends MessageDb {
  sender: {
    id: string; // uuid
    role: string; // uuid
    user: {
      id: string; // uuid
      name: string; // text
    };
  };
}
