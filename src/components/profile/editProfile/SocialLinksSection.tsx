import React from "react";
import type { SocialLinks, Contact } from "../../../utils/types/profile";
import { Input } from "@/components/ui/input";

interface SocialLinksSectionProps {
  socialLinks?: SocialLinks;
  contact?: Contact;
  onChange: (data: { social_links: SocialLinks; contact: Contact }) => void;
}

export function SocialLinksSection({
  socialLinks,
  contact,
  onChange,
}: SocialLinksSectionProps) {
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      social_links: {
        ...socialLinks,
        [name]: value,
      },
      contact: contact || {},
    });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      social_links: socialLinks || {},
      contact: {
        ...contact,
        [name]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-400">
        Social Links
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Website
          </label>
          <Input
            type="url"
            name="website"
            value={contact?.website}
            onChange={handleContactChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            LinkedIn
          </label>
          <Input
            type="url"
            name="linkedin"
            value={socialLinks?.linkedin}
            onChange={handleSocialChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Twitter
          </label>
          <Input
            type="url"
            name="twitter"
            value={socialLinks?.twitter}
            onChange={handleSocialChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="https://twitter.com/username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Facebook
          </label>
          <Input
            type="url"
            name="facebook"
            value={socialLinks?.facebook}
            onChange={handleSocialChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="https://facebook.com/username"
          />
        </div>
      </div>
    </div>
  );
}
