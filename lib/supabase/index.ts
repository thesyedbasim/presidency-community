import { SupabaseClient } from '@supabase/supabase-js';
import { QueryResponse } from '../types/database/public/utils';

export type QueryFunction<K, T> = (
  supabase: SupabaseClient,
  args: K
) => Promise<QueryResponse<T>>;
