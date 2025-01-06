import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Jobs } from "@/utils/types/form-type";

interface UseMapProps {
  setFormData: React.Dispatch<React.SetStateAction<Jobs>>;
  existingMap?: string;
}

export const useMap = ({ setFormData }: UseMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [initialLocation, setInitialLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [location, setLocation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const DEFAULT_LOCATION = { lat: 11.576244, lng: 104.923662 }; // Wat Phnom, Phnom Penh

  const reverseGeocode = (location: google.maps.LatLngLiteral) => {
    const geocoder = new google.maps.Geocoder();
    geocoder
      .geocode({ location })
      .then((response) => {
        if (response.results && response.results.length > 0) {
          const formattedAddress = response.results[0].formatted_address;
          const locArr = formattedAddress.split(",").slice(-2);
          const locationString = `${locArr[0].trim()}, ${locArr[1].trim()}`;

          setFormData((prev: Jobs) => ({
            ...prev,
            location: locationString,
            address: `${location.lat},${location.lng}`,
          }));

          setLocation(formattedAddress);
        } else {
          console.error("No address found for this location.");
        }
      })
      .catch((error) => {
        console.error("Error during geocoding:", error);
      });
  };

  const checkGeolocationPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      if (result.state === "denied") {
        // If location is denied, load the map with a default location
        loadMapWithLocation(DEFAULT_LOCATION);
        return false;
      }

      // If permission is granted, load the map with user's actual location
      return true;
    } catch (error) {
      loadMapWithLocation(DEFAULT_LOCATION); // Default location in case of error
      return false;
    }
  };

  const loadMapWithLocation = (userLocation: { lat: number; lng: number }) => {
    // Update state to reflect the current location (either default or user's actual location)
    setInitialLocation(userLocation);

    // Load Google Maps with the specified location (either default or user's location)
    const mapOptions: google.maps.MapOptions = {
      center: userLocation,
      zoom: 15,
    };

    if (mapRef.current) {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "quarterly",
        libraries: ["places"],
      });

      loader.load().then(async () => {
        //ui map
        const { Map } = await loader.importLibrary("maps");
        // klg pin
        const { Marker } = await loader.importLibrary("marker");

        const map = mapRef.current ? new Map(mapRef.current, mapOptions) : null;

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

        reverseGeocode(userLocation);
        setIsMapLoaded(true);
      });
    }
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
        if (!navigator.geolocation) {
          setErrorMessage("Geolocation is not supported by this browser.");
          loadMapWithLocation(DEFAULT_LOCATION); // Default location if geolocation is not supported
          return;
        }

        const hasPermission = await checkGeolocationPermission();

        if (hasPermission) {
          // Geolocation permission granted, get user's actual position
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              setInitialLocation(userLocation);
              loadMapWithLocation(userLocation);
            },
            (error) => {
              console.error("Error getting current position:", error);
              loadMapWithLocation(DEFAULT_LOCATION); // Default location if geolocation fails
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        setErrorMessage("Error initializing map. Please try again later.");
        loadMapWithLocation(DEFAULT_LOCATION); // Default location in case of error
      }
    };

    initializeMap();
  }, []);

  const resetToCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (markerRef.current && initialLocation) {
      markerRef.current.setPosition(initialLocation);
      reverseGeocode(initialLocation);
    }
  };

  return {
    mapRef,
    location,
    errorMessage,
    isMapLoaded,
    resetToCurrentLocation,
  };
};
