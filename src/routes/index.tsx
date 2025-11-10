import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import HomePage from "@/pages/HomePage";
import Tours from "@/pages/Tours";
import TourDetails from "@/pages/TourDetails";
import Booking from "@/pages/Booking";

export const router = createBrowserRouter([
      {
            path: "/",
            Component: App,
            children: [
                  {
                        index: true,
                        Component: HomePage
                  },
                  {
                        path: "about",
                        Component: About
                  },
                  {
                        path: "tours",
                        Component: Tours
                  },
                  {
                        path: "tours/:slug",
                        Component: TourDetails
                  },
                  {
                        path: "booking/:id",
                        Component: withAuth(Booking)
                  }
            ]
      },
      {
            path: "/admin",
            Component: withAuth(DashboardLayout, [role.admin, role.superAdmin] as TRole[]),
            children: [
                  {
                        index: true,
                        element: <Navigate to="/admin/analytics" />
                  },
                  ...generateRoutes(adminSidebarItems)]
      },
      {
            path: "/user",
            Component: withAuth(DashboardLayout, role.user as TRole),
            children: [
                  {
                        index: true,
                        element: <Navigate to="/user/bookings" />
                  },
                  ...generateRoutes(userSidebarItems)]
      },
      {
            path: "/login",
            Component: Login
      },
      {
            path: "/register",
            Component: Register
      },
      {
            path: "/verify",
            Component: Verify
      },
      {
            path: "/unauthorized",
            Component: Unauthorized
      },

]);