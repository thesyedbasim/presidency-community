import { ChannelDb } from './channels';
import { MemberDb } from './members';

export interface CommunityDb {
  id: string; // uuid
  name: string; // text
  slug: string; // text
  created_by: string; // uuid -> public.users.id
  created_at: string; // timestamptz
  member_count: number; // int2
}

export interface CommunityBasic extends CommunityDb {
  channels: ChannelDb[];
}

export interface CommunityDetail extends CommunityDb {
  channels: ChannelDb[];
  members: MemberDb[];
}
