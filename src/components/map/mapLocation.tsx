import React from 'react';
import { Jobs } from '@/utils/types/form-type';
import { useMap } from '@/hooks/useMap';

interface MapProps {
  setFormData: React.Dispatch<React.SetStateAction<Jobs>>;
  existingMap?: string;
}

const Map: React.FC<MapProps> = ({ setFormData, existingMap }) => {
  const {
    mapRef,
    location,
    errorMessage,
    isMapLoaded,
    resetToCurrentLocation,
  } = useMap({ setFormData, existingMap });

  return (
    <div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {!isMapLoaded && <div>Loading map...</div>}
      <div 
        style={{ 
          height: "400px", 
          width: "100%", 
          display: isMapLoaded ? 'block' : 'none' 
        }} 
        ref={mapRef}
      />
      {isMapLoaded && (
        <>
          <div style={{ marginTop: "10px" }}>
            <strong>Current Address:</strong>
            <p>{location || "Fetching address..."}</p>
          </div>
          <button 
            onClick={resetToCurrentLocation} 
            className="mt-2 px-4 py-2 bg-gray-200 rounded dark:bg-gray-800 hover:bg-gray-300"
          >
            Reset to Current Location
          </button>
        </>
      )}
    </div>
  );
};

export default Map;