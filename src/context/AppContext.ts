import type { ContextValue } from "@/types/ContextValue";
import { createContext } from "react";

export const AppContext = createContext<ContextValue | null>(null);
