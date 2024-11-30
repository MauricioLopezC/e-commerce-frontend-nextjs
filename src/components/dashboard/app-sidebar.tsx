import { Calendar, Home, Inbox, Search, Settings, Shirt, Package, UsersRound } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Productos",
    url: "/dashboard/products",
    icon: Shirt,
  },
  {
    title: "Pedidos",
    url: "/dashboard/orders",
    icon: Package,
  },
  {
    title: "Clientes",
    url: "/dashboard/users",
    icon: UsersRound,
  },
]

export function AppSidebar() {
  //NOTE: absolute and h-full are neccessary for put sidebar
  //inside main content and not outside
  return (
    <Sidebar className="absolute h-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
