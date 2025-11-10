import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Logo from "@/assets/icons/Logo"
import { Link } from "react-router"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { CircleChevronLeft } from "lucide-react"
import { NavUser } from "./ui/nav-user"
import { IconHelp, IconSearch, IconSettings } from "@tabler/icons-react"
import { NavSecondary } from "./ui/nav-secondary"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#search",
        icon: IconSearch,
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <div className="flex items-center justify-between p-2">
        <Logo />
        <SidebarTrigger icon={<CircleChevronLeft />} size={"lg"} className="" />
      </div>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center gap-2">
                        {"icon" in item && item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>

                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData?.data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar >
  )
}
