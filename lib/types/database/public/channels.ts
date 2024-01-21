export interface ChannelDb {
  id: string; // uuid
  name: string; // text
  slug: string; // text
  created_at: string; // timestamptz
  community_id: string; // uuid -> public.communities.id
}
