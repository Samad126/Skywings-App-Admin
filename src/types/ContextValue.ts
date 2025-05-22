export type UserData = {
  success: boolean;
  message: string;
  data: {
    id: number;
    username: string | null;
    email: string | null;
    profile_photo: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
};

export type ContextValue = {
  userData: UserData | null;
  updateUserData: () => void;
  removeUserData: () => void;
};