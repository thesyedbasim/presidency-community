export interface UserDb {
  id: string; // uuid
  name: string; // text
  email: string; // text
  is_super_user: boolean;
  is_faculty: boolean;
}
