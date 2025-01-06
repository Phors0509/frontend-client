"use client";
import { useRef } from "react";
import { Menubar } from "@/components/ui/menubar";
import { SidebarGroup, SidebarGroupLabel } from "./ui/sidebar";
import { ModeToggle } from "./ui/modeToggle";
import { Bell, ChevronLeft, ChevronRight, Mail, SearchCheckIcon } from "lucide-react";
import { Input } from "./ui/input";
import { ToolTip } from "./ToolTip";
import SabaiROkLogo from "../../public/logoSabaiRok.svg";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { useSidebarContext } from "@/context/SidebarContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const MenuBar = () => {
  const {user ,signOut }=useAuth()
  const { isOpen, toggleSidebar } = useSidebarContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const handleSearch = () => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  };

  return (
    <Menubar className="w-full py-8 bg-white dark:bg-[#1e2746] fixed top-0 z-40">
      <div className="w-1/6 flex items-center">
        <SidebarGroup>
          <SidebarGroupLabel>
              <Image src={SabaiROkLogo} width={100} height={100} alt="logo" />
          </SidebarGroupLabel>
        </SidebarGroup>
      </div>
      <div className="w-5/6 flex justify-between h-[50px] px-5 items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost"size="icon"className="h-10 w-10"onClick={toggleSidebar}>
              {isOpen ? (
                <ChevronLeft className="h-6 w-6" />
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </Button>
          <SearchCheckIcon onClick={handleSearch} className="cursor-pointer"
          />
          <div className="h-[40px] border w-[319px] dark:border-gray-900 rounded-md">
            <Input ref={inputRef} placeholder="Search..." className="h-full" />
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
          <div className=" flex items-center gap-2">
            <div className="">
              <ModeToggle />
            </div>
            <ToolTip icon={<Bell />} text="Notification" />
            <ToolTip icon={<Mail />} text="Inbox" />
          </div>
          <span className="text-sm"> {user?.name}</span>
          <DropdownMenu>
          <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.profile } className="w-15 h-15 object-cover" />
            <AvatarFallback>{user?.name || ""}</AvatarFallback>
          </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </Menubar>
  );
};
