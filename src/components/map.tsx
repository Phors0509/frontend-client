/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Jobs } from "@/utils/types/form-type";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef, useState } from "react";

const Map: React.FC<{
  setFormData: React.Dispatch<React.SetStateAction<Jobs>>;
  existingMap?: string;
}> = ({ setFormData, existingMap }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [initialLocation, setInitialLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [location, setLocation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const DEFAULT_LOCATION = { lat: 11.576244, lng: 104.923662 }; // Wat Phnom, Phnom Penh
  console.log("wat:", DEFAULT_LOCATION);

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
        setErrorMessage(
          "Geolocation access denied. Please enable location permissions.fswaefwa"
        );
        return false;
      }
      return true;
    } catch (error) {
      setErrorMessage("Error checking geolocation permissions.");
      return false;
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      // Ensure mapRef is available and API key is set
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
          libraries: ["places"], // Add places library
        });

        // Ensure Google Maps libraries are loaded
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
            if (existingMap) {
              const arrMap = existingMap.split(",");
              userLocation = {
                lat: parseFloat(arrMap[0]),
                lng: parseFloat(arrMap[1]),
              };
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

            // Add null check before initializing map
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
  }, []);

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
          display: isMapLoaded ? "block" : "none",
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
            style={{ marginTop: "10px" }}
          >
            Reset to Current Location
          </button>
        </>
      )}
    </div>
  );
};

export default Map;
