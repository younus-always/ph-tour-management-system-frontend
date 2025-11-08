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
            title: "Tour Management",
            items: [
                  {
                        title: "Add Tour",
                        url: "/user/add-tour",
                        component: AddTour
                  },
            ],
      }
];