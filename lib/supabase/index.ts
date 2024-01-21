import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { QueryResponse } from '../types/database/public/utils';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export type QueryFunction<K, T> = (
  supabase: SupabaseClient,
  args: K
) => Promise<QueryResponse<T>>;

export default supabase;
