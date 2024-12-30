"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbItemProps {
  href: string;
  label: string;
  isLast: boolean;
  showDivider?: boolean;
}

export function BreadcrumbItemComponent({
  href,
  label,
  isLast,
  showDivider = true,
}: BreadcrumbItemProps) {
  const formattedLabel = label.replace(/-/g, " ");

  return (
    <>
      <BreadcrumbItem>
        {isLast ? (
          <span className="font-medium text-white bg-orange-500 px-2 py-1 rounded dark:text-gray-100">
            {formattedLabel}
          </span>
        ) : (
          <BreadcrumbLink asChild>
            <Link 
              href={href}
              className={cn(
                "text-gray-600 hover:text-orange-500 transition-colors dark:text-gray-100",
                "px-2 py-1 rounded",
                "hover:underline underline-offset-4"
              )}
            >
              {formattedLabel}
            </Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
      {showDivider && !isLast && (
        <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
      )}
    </>
  );
}