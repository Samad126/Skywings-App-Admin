import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "./Layout.tsx";

import Error from "./Error.tsx";

import Homepage from "./pages/Homepage.tsx";

import FlightsIndex from "./pages/Flights/Index.tsx";
import FlightsEdit from "./pages/Flights/Edit.tsx";
import FlightsCreate from "./pages/Flights/Create.tsx";

import AirportIndex from "./pages/Airports/Index.tsx";
import AirportsCreate from "./pages/Airports/Create.tsx";

import AdminIndex from "./pages/Admin/Index.tsx";
import AdminCreate from "./pages/Admin/Create.tsx";
import FlightDetail from "./pages/Flights/Detail.tsx";

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
        path: "flights",
        children: [
          {
            index: true,
            element: <FlightsIndex />,
          },
          {
            path: "create",
            element: <FlightsCreate />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <FlightDetail />,
              },
              {
                path: "edit",
                element: <FlightsEdit />,
              },
            ],
          },
        ],
      },
      {
        path: "airports",
        children: [
          {
            index: true,
            element: <AirportIndex />,
          },
          {
            path: "create",
            element: <AirportsCreate />,
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            index: true,
            element: <AdminIndex />,
          },
          {
            path: "create",
            element: <AdminCreate />,
          },
        ],
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
