import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface SignUpFormWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function SignUpFormWrapper({ children , title , description  }: SignUpFormWrapperProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black p-4">
      <div className="flex flex-col-reverse md:flex-row w-full md:w-3/4 lg:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-1/2 w-full flex items-center justify-center p-8">
          <Image className="w-full h-auto object-cover" src="/img/Job hunt-amico.png" alt="Job image" width={800} height={800} priority />
        </div>
        <div className="md:w-1/2 w-full p-8">
          <Card className="w-full border-none shadow-none">
            <div className="space-y-6 dark:bg-gray-800">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
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