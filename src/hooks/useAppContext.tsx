import { AppContext } from "@/context/AppContext";
import type { ContextValue } from "@/types/ContextValue";
import { useContext } from "react";

export function useAppContext(): ContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
