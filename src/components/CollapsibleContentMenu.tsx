import React, { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

interface CollapsibleContentMenuProps {
  item: MenuItem[];
  triggerName: string;
  iconTrigger: React.ReactNode;
  isCollapsibleOpen?: boolean;
}

const CollapsibleContentMenu: React.FC<CollapsibleContentMenuProps> = ({
  item,
  triggerName,
  iconTrigger,
  isCollapsibleOpen,
}) => {
  const pathname = usePathname();
  const isActive = pathname === item[0].url;
  const [isActives, setIsActives] = useState(false);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  // Toggle active state on click
  const handleClick = () => {
    setIsActives(!isActives);
  };
  const handleClickList = (url: string) => {
    setActiveUrl(url);
  };
  return (
    <>
      <div>
        {isCollapsibleOpen ? (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                {/* sidebar job button */}
                <CollapsibleTrigger
                  onClick={handleClick}
                  className={`flex gap-2 p-5 text-[16px]
        ${!isActives ? " dark:bg-gray-700 bg-orange-100 dark:text-white" : "hover:bg-[rgba(251,146,60,1)] dark:hover:bg-gray-800 hover:text-white"}`}
                >
                  <span className="size-7">{iconTrigger}</span>
                  {triggerName}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="CollapsibleContent">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {/* separator on dropdown sidebar  */}
                    <div className="relative">
                      <Separator
                        orientation="vertical"
                        className="absolute left-0 top-0 h-full w-[1px] bg-[rgba(251,146,60,1)]"
                        aria-orientation="vertical"
                      />
                      <SidebarMenu className="pl-4">
                        {item.map((item: any) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              {/* link in dropdown job*/}
                              <Link
                                href={item.url}
                                key={item}
                                onClick={() => handleClickList(item.url)}
                                className={`flex items-center font-medium text-md  ${activeUrl === item.url ? "text-orange-500" : ""}`}
                              >
                                <item.icon />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </div>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ) : (
          <SidebarGroupLabel className="px-2 py-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={item[0].url}
                    className={cn("flex items-center", {
                      "bg-orange-100 hover:text-orange-200  dark:bg-gray-700 dark:text-white ":
                        isActive,
                    })}
                  >
                    <span className="size-7">{iconTrigger}</span>
                    {triggerName}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupLabel>
        )}
      </div>
    </>
  );
};

export default CollapsibleContentMenu;
