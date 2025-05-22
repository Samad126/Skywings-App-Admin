import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./util/route";
import AppContextProvider from "./context/AppContextProvider";

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);
