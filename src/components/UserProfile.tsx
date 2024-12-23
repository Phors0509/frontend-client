"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
interface UserProfileProps {
  avatarImage?: string;
  fallback?: string;
  userDetails?: {
    username: string;
    email: string;
    bio?: string;
    phone?: string;
  };
}
export const UserProfile: React.FC<UserProfileProps> = ({
  avatarImage,
  fallback,
}) => {
    const {signOut ,isLoading } = useAuth()
    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={avatarImage} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width]"
      >
        <DropdownMenuItem>
          <span>
            Account
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
      { isLoading ? <span>Sign out.....</span>  : <span>Sign out</span> }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
