"use client";
import { EditProfileForm } from "@/components/profile/editProfile/EditProfileForm";
import { EditProfileSkeleton } from "@/components/profile/editProfile/EditProfileSkeleton";
import { Profile } from "@/components/profile/Profile";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { useAuth } from "@/context/AuthContext";
import { ProfileData } from "@/utils/types/profile";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user, fetchUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (data: ProfileData) => {
    try {
      setIsLoading(false);
      await axiosInstance.put(
        `${API_ENDPOINTS.CORPARATE_PROFILE_UPDATE}/${user?._id}`,
        data
      );
      await fetchUser();
      setIsLoading(true);
    } catch (error) {
      console.error("Failed to update profile data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen w-full">
      <div className="w-full">
      { isLoading ? ( 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="lg:sticky lg:top-0 lg:h-[calc(100vh-8rem)]">
            <Profile user={user} />
          </div>
          <div className="h-screen ">
              <EditProfileForm initialData={user || undefined} onSubmit={handleSubmit} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:sticky lg:top-0 lg:h-[calc(100vh-8rem)]">
            <ProfileSkeleton/>
          </div>
          <div className="">
            <EditProfileSkeleton/>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProfilePage;
