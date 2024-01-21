import { PostgrestError } from '@supabase/supabase-js';

export interface QueryResponse<T> {
  data: T | null;
  error: PostgrestError | null;
}
