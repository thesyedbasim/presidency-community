import { ChannelDb } from './channels';
import { MemberDb } from './members';
import { UserDb } from './users';

export interface CommunityDb {
  id: string; // uuid
  name: string; // text
  description: string | null; // text
  slug: string; // text
  created_by: string; // uuid -> public.users.id
  created_at: string; // timestamptz
  member_count: number; // int2
}

export interface CommunityProfile extends CommunityDb {
  created_by_user: UserDb;
}

export interface CommunityBasic extends CommunityDb {
  channels: ChannelDb[];
}

export interface CommunityDetail extends CommunityDb {
  channels: ChannelDb[];
  members: MemberDb[];
}
