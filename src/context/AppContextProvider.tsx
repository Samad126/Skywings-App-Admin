import { useState } from "react";
import { AppContext } from "./AppContext";
import type { ContextValue } from "@/types/ContextValue";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storageAdminId = Number(localStorage.getItem("adminId")) || null;

  const [adminId, setAdminId] =
    useState<ContextValue["adminId"]>(storageAdminId);

  function updateAdminState(adminId: number) {
    setAdminId(adminId);
    localStorage.setItem("adminId", adminId.toString());
  }

  function resetAdminState() {
    setAdminId(null);
    localStorage.removeItem("adminId");
  }

  const contextValue: ContextValue = {
    adminId,
    updateAdminState,
    resetAdminState,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
