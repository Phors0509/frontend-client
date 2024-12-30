import React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileData } from "@/utils/types/profile";
interface ProfileProps {
  user?: ProfileData | null;
}

export function Profile({ user }: ProfileProps) {
  return (
    <div className="w-full mx-auto bg-white dark:bg-[#1e2746] rounded-lg shadow-lg overflow-hidden mb-5">
      <ProfileHeader name={user?.name} profile={user?.profile} />
      <div className="text-center mt-20 dark:bg-[#1e2746]">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100"> {user?.name} </h1>
      </div>
      <ProfileInfo data={user} />
    </div>
  );
}
