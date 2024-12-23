"use client";
import { ChevronUp } from "lucide-react";

import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserProfile } from "./UserProfile";
import CollapsibleContentMenu from "./CollapsibleContentMenu";
import { itemsMenu } from "@/utils/navigationItems";
import { useAuth } from "@/context/AuthContext";

export function AppSidebar() {
  const {user } = useAuth()
  return (
    <Sidebar className=" z-0 pt-10">
      <ScrollArea className="h-full pr-2">
        <SidebarGroup className="mt-[45px]">
          {itemsMenu.map((item, index) => (
            <CollapsibleContentMenu
              key={index}
              item={item.item}
              triggerName={item.triggerName}
              iconTrigger={<item.iconTrigger />}
              isCollapsibleOpen={item.isCollapsibleOpen}
            />
          ))}
        </SidebarGroup>
      </ScrollArea>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="py-6" asChild>
                <SidebarMenuButton>
                  <UserProfile
                    avatarImage="https://github.com/shadcn.png"
                    fallback="yo"
                  />
                  <span className="text-sm"> {user?.name}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
