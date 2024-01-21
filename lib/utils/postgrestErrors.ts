import { PostgrestError } from '@supabase/supabase-js';

const EMPTY_ROWS_ERROR_CODE = 'PGRST116';
const RLS_ERROR = '42501';

export const isEmptyError = (errorCode: PostgrestError['code']) => {
  return errorCode === EMPTY_ROWS_ERROR_CODE;
};

export const isRLSError = (errorCode: PostgrestError['code']) => {
  return errorCode === RLS_ERROR;
};
