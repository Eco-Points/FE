import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "../components/ui/button";
import { getlocation } from "../utils/apis/waste-location";
import { IGetLocation } from "@/utils/types/waste-location";

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const WasteLocation: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [nearestLocations, setNearestLocations] = useState<IGetLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch location data from API
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const locationsFromAPI: IGetLocation[] = await getlocation();
        console.log(locationsFromAPI);
        if (Array.isArray(locationsFromAPI)) {
          setNearestLocations(locationsFromAPI);
        } else {
          setError("Data lokasi tidak valid.");
        }
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Terjadi kesalahan saat memuat data lokasi.");
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const sortedLocations = nearestLocations
        .map((location) => ({
          ...location,
          coordinates: {
            latitude: parseFloat(location.lat),
            longitude: parseFloat(location.long),
          },
        }))
        .filter((location) => getDistance(userLocation.latitude, userLocation.longitude, parseFloat(location.lat), parseFloat(location.long)) > 0)
        .sort((a, b) => {
          const distanceA = getDistance(userLocation.latitude, userLocation.longitude, parseFloat(a.lat), parseFloat(a.long));
          const distanceB = getDistance(userLocation.latitude, userLocation.longitude, parseFloat(b.lat), parseFloat(b.long));
          return distanceA - distanceB;
        });
      setNearestLocations(sortedLocations);
    }
  }, [userLocation, nearestLocations]);

  const handleFindNearest = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };

  const handleViewMyLocation = () => {
    if (userLocation) {
      const map = (window as any).map;
      if (map) {
        map.setView([userLocation.latitude, userLocation.longitude], 13);
      }
    }
  };

  const handleNavigate = (location: IGetLocation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.long}`;
    window.open(url, "_blank");
  };

  const userIcon = new Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 4.07 6.53 10.69 6.93 11.16.36.36.86.36 1.22 0C12.47 19.69 19 13.07 19 9c0-3.87-3.13-7-7-7zm0 11.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#00FF00"/></svg>'
      ),
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });

  const wasteIcon = new Icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
    shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });

  const MapWithCenter = () => {
    const map = useMap();
    useEffect(() => {
      if (userLocation) {
        map.setView([userLocation.latitude, userLocation.longitude], 13);
      }
    }, [userLocation, map]);
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto py-8 space-x-4">
      <div className="flex-1" data-testid="map-container">
        <div className="flex items-center mb-4 space-x-4">
          <Button onClick={handleFindNearest} className="bg-green-600 text-white hover:bg-green-700" data-testid="find-nearest-button">
            Cari Lokasi Terdekat
          </Button>
          <Button
            onClick={handleViewMyLocation}
            className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white"
            disabled={!userLocation}
            data-testid="view-my-location-button"
          >
            Lihat Lokasi Saya
          </Button>
        </div>
        <MapContainer
          center={userLocation ? [userLocation.latitude, userLocation.longitude] : [0, 0]}
          zoom={userLocation ? 13 : 2}
          style={{ height: "100%", width: "100%" }}
          data-testid="map-container"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
          {userLocation && (
            <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon} data-testid="user-location-marker">
              <Popup>Lokasi Anda Saat Ini</Popup>
            </Marker>
          )}
          {nearestLocations.map((location) => (
            <Marker
              key={location.id}
              position={[parseFloat(location.lat), parseFloat(location.long)]}
              icon={wasteIcon}
              data-testid={`waste-location-marker-${location.id}`}
            >
              <Popup>
                <strong>{location.name}</strong>
                <br />
                {location.address}
                <br />
                Jam Buka: {location.start} - {location.end}
                <br />
                Status: {location.status}
                <br />
                <Button
                  onClick={() => handleNavigate(location)}
                  className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white mt-2"
                  data-testid={`navigate-button-${location.id}`}
                >
                  Arahkan ke Lokasi
                </Button>
              </Popup>
            </Marker>
          ))}
          <MapWithCenter />
        </MapContainer>
      </div>
      <div className="w-full lg:w-1/3 bg-white border border-gray-300 rounded-lg p-4 overflow-y-auto h-[500px]" data-testid="location-list">
        <h2 className="text-xl font-bold mb-4">Daftar Lokasi Waste</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {nearestLocations.map((location) => (
              <li key={location.id} className="mb-4" data-testid={`location-list-item-${location.id}`}>
                <h3 className="font-semibold">{location.name}</h3>
                <p>{location.address}</p>
                <p>
                  Jam Buka: {location.start} - {location.end}
                </p>
                <p>Status: {location.status}</p>
                <Button
                  onClick={() => handleNavigate(location)}
                  className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white mt-2"
                  data-testid={`navigate-button-list-${location.id}`}
                >
                  Arahkan ke Lokasi
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WasteLocation;
