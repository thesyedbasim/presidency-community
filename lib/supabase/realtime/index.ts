import { SupabaseClient } from '@supabase/supabase-js';

export function subscribeToChannelMessages(
  supabase: SupabaseClient,
  { channel_id }: { channel_id: string },
  callbackFn: (...args: any[]) => any
) {
  return supabase
    .channel('community-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'messages',
        filter: `channel_id=eq.${channel_id}`,
      },
      callbackFn
    )
    .subscribe();
}

export function subscribeToPendingMembers(
  supabase: SupabaseClient,
  { community_id }: { community_id: string },
  callbackFn: (...args: any[]) => any
) {
  return supabase
    .channel('pending-members')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'pending_members',
        filter: `community_id=eq.${community_id}`,
      },
      callbackFn
    )
    .subscribe();
}
