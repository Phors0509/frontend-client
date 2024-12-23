"use client";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface ToolTipProps {
    icon: React.ReactNode;
    text: string;
}

export const ToolTip: React.FC<ToolTipProps> = ({ icon, text }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{icon}</TooltipTrigger>
                <TooltipContent>{text}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
