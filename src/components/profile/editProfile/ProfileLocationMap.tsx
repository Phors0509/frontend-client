import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Location } from '@/utils/types/profile';

interface ProfileLocationMapProps {
  setLocation: (location: Location) => void;
  existingLocation?: Location;
}

const ProfileLocationMap: React.FC<ProfileLocationMapProps> = ({ 
  setLocation, 
  existingLocation
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [initialLocation, setInitialLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [locationDetails, setLocationDetails] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const reverseGeocode = (location: google.maps.LatLngLiteral) => {
    const geocoder = new google.maps.Geocoder();
    geocoder
      .geocode({ location })
      .then((response) => {
        if (response.results && response.results.length > 0) {
          const formattedAddress = response.results[0].formatted_address;
          const addressComponents = response.results[0].address_components;
          
          console.log('addressComponents:::::::::::::', addressComponents);
          // Extract city and country
          const cityComponent = addressComponents.find(component => 
            component.types.includes('locality')
          );
          const countryComponent = addressComponents.find(component => 
            component.types.includes('country')
          );

          const updatedLocation: Location = {
            address: formattedAddress,
            city: cityComponent ? cityComponent.long_name : '',
            country: countryComponent ? countryComponent.long_name : '',
          };

          setLocation(updatedLocation);
          setLocationDetails(formattedAddress);
        } else {
          console.error("No address found for this location.");
        }
      })
      .catch((error) => {
        console.error("Error during geocoding:", error);
      });
  };

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) {
        console.error("Map container is not available");
        return;
      }

      if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        setErrorMessage("Google Maps API key is missing");
        return;
      }

      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          version: "quarterly",
          libraries: ["places"]
        });

        await loader.load();

        const { Map } = await loader.importLibrary("maps");
        const { Marker } = await loader.importLibrary("marker");

        if (!navigator.geolocation) {
          setErrorMessage("Geolocation is not supported by this browser.");
          return;
        }

        const hasPermission = await checkGeolocationPermission();
        if (!hasPermission) return;

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            let userLocation: { lat: number; lng: number };
            if (existingLocation?.coordinates) {
              const [lat, lng] = existingLocation.coordinates.split(',').map(parseFloat);
              userLocation = { lat, lng };
            } else {
              userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
            }

            setInitialLocation(userLocation);

            const mapOptions: google.maps.MapOptions = {
              center: userLocation,
              zoom: 15,
            };

            if (mapRef.current) {
              const map = new Map(mapRef.current, mapOptions);

              const userMarker = new Marker({
                position: userLocation,
                map: map,
                title: "You are here",
                draggable: true,
              });

              markerRef.current = userMarker;

              userMarker.addListener("dragend", () => {
                const newPosition = userMarker.getPosition();
                if (newPosition) {
                  const newLocation = newPosition.toJSON();
                  reverseGeocode(newLocation);
                }
              });

              await reverseGeocode(userLocation);
              setIsMapLoaded(true);
            }
          },
          (error) => {
            console.error("Error getting current position:", error);
            setErrorMessage(
              "Failed to retrieve location. Please check your permissions or try again later."
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        setErrorMessage("Error initializing map. Please try again later.");
      }
    };

    initializeMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkGeolocationPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      if (result.state === "denied") {
        setErrorMessage(
          "Geolocation access denied. Please enable location permissions."
        );
        return false;
      }
      return true;
    } catch (error) {
      setErrorMessage("Error checking geolocation permissions.");
      return false;
    }
  };

  const resetToCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (markerRef.current && initialLocation) {
      markerRef.current.setPosition(initialLocation);
      reverseGeocode(initialLocation);
    }
  };

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
            <p>{locationDetails || "Fetching address..."}</p>
          </div>
          <button
            onClick={resetToCurrentLocation}
            className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Reset to Current Location
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileLocationMap;