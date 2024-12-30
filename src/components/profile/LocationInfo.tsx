import React from "react";
import { MapPin } from "lucide-react";
import { Location } from "@/utils/types/profile";

interface LocationInfoProps {
  location?: Location;
}

export function LocationInfo({ location }: LocationInfoProps) {
  return (
    <div className="flex items-center text-gray-600 dark:text-gray-100">
      <MapPin className="w-8 h-8 mr-2" />
      <span>{location?.address || 'Location not specified'}</span>
    </div>
  );
}
