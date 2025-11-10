import AddDivision from "@/pages/Admin/AddDivision";
import AddTour from "@/pages/Admin/AddTour";
// import Analytics from "@/pages/Admin/Analytics";
import AddTourType from "@/pages/Admin/AddTourType";
import type { ISidebarItem } from "@/types";
import { IconBrandGoogleAnalytics, IconCategoryPlus, IconMapPinPlus, IconMapPlus } from "@tabler/icons-react";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const adminSidebarItems: ISidebarItem[] = [
      {
            title: "Dashboard",
            items: [
                  {
                        title: "Analytics",
                        url: "/admin/analytics",
                        icon: IconBrandGoogleAnalytics,
                        component: Analytics
                  }
            ],
      },
      {
            title: "Tour Management",
            items: [
                  {
                        title: "Add Tour Type",
                        url: "/admin/add-tour-type",
                        icon: IconCategoryPlus,
                        component: AddTourType
                  },
                  {
                        title: "Add Tour",
                        url: "/admin/add-tour",
                        icon: IconMapPlus,
                        component: AddTour
                  },
                  {
                        title: "Add Division",
                        url: "/admin/add-division",
                        icon: IconMapPinPlus,
                        component: AddDivision
                  },
            ],
      }
];