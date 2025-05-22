export type AdminDetail = {
  id: number;
  username: string | null;
  email: string | null;
  profile_photo: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminPOSTBody = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};