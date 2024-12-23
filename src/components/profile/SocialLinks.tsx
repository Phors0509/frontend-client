import React from "react";
import { Facebook, Twitter, Linkedin, Globe } from "lucide-react";
import type {
  SocialLinks as SocialLinksType,
  Contact,
} from "@/utils/types/profile";

interface SocialLinksProps {
  socialLinks?: SocialLinksType;
  contact?: Contact;
  color?: string;
}

export function SocialLinks({ socialLinks, contact ,color }: SocialLinksProps) {
  return (
    <div className="flex space-x-4 items-center text-white">
      {
        <a
          href={contact?.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-white hover:text-blue-600 transition-colors"
        >
          <Globe className={`w-5 h-5 text-${color}` } />
        </a>
      }
      {
        <a
          href={socialLinks?.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-white hover:text-blue-600 transition-colors"
        >
          <Linkedin className={`w-5 h-5 text-${color}` } />
        </a>
      }
      {
        <a
          href={socialLinks?.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-white hover:text-blue-500 transition-colors"
        >
          <Twitter className={`w-5 h-5 text-${color}` } />
        </a>
      }
      {
        <a
          href={socialLinks?.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-white hover:text-blue-700 transition-colors"
        >
          <Facebook className={`w-5 h-5 text-${color}` } />
        </a>
      }
    </div>
  );
}
