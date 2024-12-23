import React from 'react';
import { Jobs } from '@/utils/types/form-type';
import Map from '@/components/map/mapLocation';

interface LocationSectionProps {
  formData: Jobs;
  setFormData: React.Dispatch<React.SetStateAction<Jobs>>;
}

const LocationSection: React.FC<LocationSectionProps> = ({ formData, setFormData }) => {
  return (
    <div className="mb-6">
      <Map setFormData={setFormData} existingMap={formData.address} />
    </div>
  );
};

export default LocationSection;