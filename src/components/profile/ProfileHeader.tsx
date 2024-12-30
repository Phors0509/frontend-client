import React from 'react';
import Image from 'next/image';
import { SocialLinks } from './SocialLinks';
interface ProfileHeaderProps {
  name?: string;
  role?: string;
  coverImage?: string;
  profile?: string;
  data?: any;
}

export function ProfileHeader({ profile ,data }: ProfileHeaderProps) {
  return (
    <div className="relative">
      <div className="h-48 w-full relative">
      <Image src={"https://media.istockphoto.com/id/1696167872/photo/aerial-view-of-forest-at-sunset-on-the-background-of-mountains-in-dolomites.jpg?s=1024x1024&w=is&k=20&c=sfRAnSjXlDxAAAMZ0ZtYG5GpetUCOqETKyVc0Oz6kyU="} alt="Background Banner" className="w-full h-full object-cover " width={1000} height={1000} />
        <div className="flex justify-end items-end space-y-4 p-3 absolute inset-0 bg-black bg-opacity-25 text-gray-300">
            <SocialLinks socialLinks={data?.social_links} contact={data?.contact} color={"gray-300"} />
        </div>
      </div>
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
        <div className="relative">
        <Image src={profile || ""} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" width={1000} height={1000} />
        </div>
      </div>
    </div>
  );
}