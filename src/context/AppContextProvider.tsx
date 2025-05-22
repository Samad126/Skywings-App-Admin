import { useState } from "react";
import { AppContext } from "./AppContext";
import type { ContextValue, UserData } from "@/types/ContextValue";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<UserData | null>(null);

  function updateUserData() {
    setUserData(null);
  }

  function removeUserData() {
    setUserData(null);
  }

  const contextValue: ContextValue = {
    userData: userData,
    removeUserData,
    updateUserData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
