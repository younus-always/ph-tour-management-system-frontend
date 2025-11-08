import AddTour from "@/pages/Admin/AddTour";
import Bookings from "@/pages/User/Bookings";

export const userSidebarItems = [
      {
            title: "History",
            items: [
                  {
                        title: "Bookings",
                        url: "/user/bookings",
                        component: Bookings
                  }
            ],
      },
      {
            title: "Tour",
            items: [
                  {
                        title: "My Tour",
                        url: "/user/tour",
                        component: AddTour
                  },
            ],
      }
];