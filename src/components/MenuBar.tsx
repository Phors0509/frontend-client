"use client";
import { useRef, useState } from "react";
import { Menubar } from "@/components/ui/menubar";
import { SidebarGroup, SidebarGroupLabel } from "./ui/sidebar";
import { ModeToggle } from "./ui/modeToggle";
import { Bell, Mail, SearchCheckIcon } from "lucide-react";
import { Input } from "./ui/input";
import { ToolTip } from "./ToolTip";
import SabaiROkLogo from "../../public/logoSabaiRok.svg";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
// import { Button } from "./ui/button";
// import { useSidebarContext } from "@/context/SidebarContext";
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
import { useSidebarContext } from "@/context/SidebarContext";

export const MenuBar = () => {
  const {user ,signOut }=useAuth();
  const [isOpenProfile,setIsOpenPorfile] = useState(false);
  // const { isOpen, toggleSidebar } = useSidebarContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const handleSearch = () => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  };
  return (
    <Menubar className="w-full py-8 bg-white dark:bg-[#1e2746] fixed top-0 z-40">
      <div className="flex items-center w-1/6">
        <SidebarGroup>
          <SidebarGroupLabel>
              <Image src={SabaiROkLogo} width={1000} height={1000} alt="logo" className="w-[110px]"/>
          </SidebarGroupLabel>
        </SidebarGroup>
      </div>
      <div className="w-5/6 flex justify-between h-[50px] px-5 items-center">
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost"size="icon"className="w-10 h-10"onClick={toggleSidebar}>
              {isOpen ? (
                <ChevronLeft className="w-6 h-6" />
              ) : (
                <ChevronRight className="w-6 h-6" />
              )}
            </Button> */}
          <SearchCheckIcon onClick={handleSearch} className="cursor-pointer"
          />
          <div className="h-[40px] border w-[319px] dark:border-gray-900 rounded-md">
            <Input ref={inputRef} placeholder="Search..." className="h-full" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 ">
            <div className="">
              <ModeToggle />
            </div>
            <ToolTip icon={<Bell />} text="Notification" />
            <ToolTip icon={<Mail />} text="Inbox" />
          </div>
          <span className="text-sm"> {user?.name}</span>
          <DropdownMenu open={isOpenProfile}>
          <DropdownMenuTrigger>
          <Avatar onMouseEnter={()=>setIsOpenPorfile(true)} onMouseLeave={()=>setIsOpenPorfile(false)}>
            <AvatarImage src={user?.profile } className="w-15 h-15" />
            <AvatarFallback>{user?.name || ""}</AvatarFallback>
          </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent onMouseEnter={()=>setIsOpenPorfile(true)} onMouseLeave={()=>setIsOpenPorfile(false)}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="text-red-500">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </Menubar>
  );
};
