import MyBooking from "@/pages/User/MyBooking";
import Bookings from "@/pages/User/MyBooking";
import MyTour from "@/pages/User/MyTour";
import { IconCreditCardPay, IconRoute, IconTicket } from "@tabler/icons-react";

export const userSidebarItems = [
      {
            title: "History",
            items: [
                  {
                        title: "Payment",
                        url: "/user/payment",
                        icon: IconCreditCardPay,
                        component: Bookings
                  }
            ],
      },
      {
            title: "Tour & Booking",
            items: [
                  {
                        title: "My Tour",
                        url: "/user/tours",
                        icon: IconRoute,
                        component: MyTour
                  },
                  {
                        title: "My Booking",
                        url: "/user/bookings",
                        icon: IconTicket,
                        component: MyBooking
                  },
            ],
      }
];