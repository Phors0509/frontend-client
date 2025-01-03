import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface SignUpFormWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function FormWrapper({ children , title , description }: SignUpFormWrapperProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 dark:bg-[#181f39] bg-gray-100">
      <div className="flex flex-col-reverse md:flex-row w-full md:w-3/4 lg:w-2/3 bg-white rounded-lg shadow-lg overflow-hidden dark:bg-[#1e2746]">
        <div className="w-full flex items-center justify-center p-8">
          <Image className="w-full h-auto object-cover" src="/img/Jobhunt-amico.png" alt="Job image" width={800} height={800} priority />
        </div>
        <div className="w-full p-8 dark:bg-[#1e2746]">
          <Card className="w-full border-none shadow-none dark:bg-[#1e2746] ">
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
                <p className="text-gray-500">{description}</p>
              </div>
              {children}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}