import supabase from '..';

export function subscribeToChannelMessages(
  channel_id: string,
  callbackFn: (...args: any[]) => any
) {
  supabase
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
  community_id: string,
  callbackFn: (...args: any[]) => any
) {
  supabase
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
