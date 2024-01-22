import { PostgrestError } from '@supabase/supabase-js';

export interface QueryResponse<T> {
  data: T;
  error: PostgrestError | null;
}
