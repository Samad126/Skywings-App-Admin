import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.tsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import { TestPage1 } from "./pages/TestPage1.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        // path: "/test",
        element: <TestPage1 />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
