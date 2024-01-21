import { cache } from 'react';
import { CommunityDetail } from '../types/database/public/communities';
import { SupabaseClient } from '@supabase/supabase-js';
import { getCommunityById } from '../supabase/database/queries/public';
import { QueryResponse } from '../types/database/public/utils';

export const fetchCommunityById: (
  supabase: SupabaseClient,
  params: { id: string }
) => Promise<QueryResponse<CommunityDetail>> = cache(
  async (supabase, { id }) => {
    const res = await getCommunityById(supabase, { id });

    return res;
  }
);
