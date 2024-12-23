"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@/components/ui/breadcrumb";

const DynamicBreadcrumb = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter((segment) => segment);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                    const href =
                        "/" + pathSegments.slice(0, index + 1).join("/");
                    const isLast = index === pathSegments.length - 1;

                    return (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <span style={{ margin: "0 8px" }}>-</span>
                            )}
                            <BreadcrumbItem>
                                {isLast ? (
                                    // If it's the last item, apply an "active" style
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            color: "gray",
                                        }}
                                    >
                                        {segment.replace(/-/g, " ")}
                                    </span>
                                ) : (
                                    // Otherwise, make it a clickable link
                                    <BreadcrumbLink asChild>
                                        <Link href={href}>
                                            {segment.replace(/-/g, " ")}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DynamicBreadcrumb;
