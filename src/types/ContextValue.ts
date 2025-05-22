// export type UserData = {
//   success: boolean;
//   message: string;
//   data: {
//     id: number;
//     username: string | null;
//     email: string | null;
//     profile_photo: string | null;
//     created_at: string | null;
//     updated_at: string | null;
//   };
// };

export type ContextValue = {
  adminId: number | null;
  updateAdminState: (adminId: number) => void;
  resetAdminState: () => void;
};