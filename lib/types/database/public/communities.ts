import { ChannelDb } from './channels';
import { MemberDb } from './members';

export interface CommunityDb {
  id: string; // uuid
  name: string; // text
  slug: string; // text
  created_by: string; // uuid -> public.users.id
  created_at: string; // timestamptz
}

export interface CommunityDetail extends CommunityDb {
  channels: ChannelDb[];
  members: MemberDb[];
}
