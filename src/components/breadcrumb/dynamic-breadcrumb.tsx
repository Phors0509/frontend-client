"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import { BreadcrumbItemComponent } from "./breadcrumb-item";
import { Home } from "lucide-react";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm my-5">
      <Breadcrumb className="px-4 py-3">
        <BreadcrumbList className="flex items-center space-x-1">
          <div className="flex items-center">
            <Home className="h-4 w-4 text-gray-500 mr-1" />
            <BreadcrumbItemComponent
              href="/"
              label="Home"
              isLast={pathSegments.length === 0}
              showDivider={pathSegments.length > 0}
            />
          </div>
          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            const isLast = index === pathSegments.length - 1;

            return (
              <BreadcrumbItemComponent
                key={href}
                href={href}
                label={segment}
                isLast={isLast}
                showDivider={!isLast}
              />
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}