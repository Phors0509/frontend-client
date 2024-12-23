import React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileData } from "@/utils/types/profile";
interface ProfileProps {
  user?: ProfileData | null;
}

export function Profile({ user }: ProfileProps) {
  return (
    <div className="w-full mx-auto bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden">
      <ProfileHeader name={user?.name} profile={user?.profile} />
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {user?.name}
        </h1>
      </div>
      <ProfileInfo data={user} />
    </div>
  );
}
