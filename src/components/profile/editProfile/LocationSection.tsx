import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Location } from '@/utils/types/profile';
import ProfileLocationMap from './ProfileLocationMap';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface LocationSectionProps {
  location?: Location;
  onChange: (location: Location) => void;
}

export function LocationSection({ location, onChange }: LocationSectionProps) {
  const [showMap, setShowMap] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...location,
      [name]: value || '',
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-400">Location</h3>
      
      <div className="grid grid-cols-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400"> Address </label>
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={location?.address || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

       
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">City</label>
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={location?.city || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Country</label>
          <Input
            type="text"
            name="country"
            placeholder="Country"
            value={location?.country || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {showMap ? "Hide Map" : "Select Location on Map"}
            </AccordionTrigger>
            <AccordionContent>
              <ProfileLocationMap
                setLocation={onChange}
                existingLocation={location}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
