import React, { ReactNode } from "react";
import { MenuBar } from "@/components/MenuBar";
import { DynamicBreadcrumb } from "@/components/breadcrumb/dynamic-breadcrumb";
import { SidebarProvider } from "@/context/SidebarContext";
import SideBarCom from "@/components/SideBarCom";
import { SocketContextProvider } from "@/context/SocketContext";
import { JobProvider } from "@/context/JobContext";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <JobProvider>
      <SocketContextProvider>
      <div className="w-full h-screen">
        <div className="relative z-10 w-full text-black bg-white dark:bg-black dark:text-white">
            <MenuBar />
          </div>
        <div className="flex">
          <SideBarCom/>
          <div className="w-full h-screen px-5 pt-16 overflow-y-auto bg-slate-50">
            <DynamicBreadcrumb />
            {children}
          </div>
        </div>
      </div>
      </SocketContextProvider>
      </JobProvider>
    </SidebarProvider>
  );
};

export default layout;
