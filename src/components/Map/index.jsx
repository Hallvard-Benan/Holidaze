import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

export default function LocationMap({ venue, latitude, longitude }) {
  const predefinedLocations = [
    { lat: 59.929675, lng: 10.756532 },
    { lat: 40.712776, lng: -74.005974 },
    { lat: 34.052235, lng: -118.243683 },
    { lat: 51.507351, lng: -0.127758 },
    { lat: 48.856613, lng: 2.352222 },
    { lat: 40.416775, lng: -3.70379 },
  ];

  const getRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * predefinedLocations.length);
    return predefinedLocations[randomIndex];
  };

  const [position, setPosition] = useState(getRandomLocation());

  useEffect(() => {
    if (venue && venue.location && venue.location.lat && venue.location.lng) {
      setPosition({ lat: venue.location.lat, lng: venue.location.lng });
    } else if (!isNaN(latitude) && !isNaN(longitude)) {
      setPosition({ lat: latitude, lng: longitude });
    }
  }, [venue, latitude, longitude]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Map
        center={position}
        zoom={12}
        mapId={import.meta.env.VITE_VENUE_MAP_ID}
      >
        <AdvancedMarker position={position}>
          <Pin background={"white"} borderColor={"grey"} glyphColor={"grey"} />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
