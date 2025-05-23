import Layout from "../layout/Layout.tsx";

import Error from "../Error.tsx";

import Homepage from "../pages/Home/Homepage.tsx";

import FlightsIndex from "../pages/Flights/Index.tsx";
import FlightsEdit from "../pages/Flights/Edit.tsx";
import FlightsCreate from "../pages/Flights/Create.tsx";

import AirportIndex from "../pages/Airports/Index.tsx";
import AirportsCreate from "../pages/Airports/Create.tsx";

import AdminIndex from "../pages/Admin/Index.tsx";
import AdminCreate from "../pages/Admin/Create.tsx";
import FlightDetail from "../pages/Flights/Detail.tsx";
import Login from "../pages/Login/Login.tsx";
import { createHashRouter } from "react-router";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import AdminDetail from "@/pages/Admin/Detail.tsx";

export const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
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
            path: ":id",
            element: <AdminDetail />,
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
