import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.tsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import { Homepage } from "./pages/Homepage.tsx";
import Error from "./Error.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
