export type ContextValue = {
  adminId: number | null;
  updateAdminState: (adminId: number) => void;
  resetAdminState: () => void;
};