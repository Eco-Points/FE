import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "../components/ui/button";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Location {
  id: number;
  name: string;
  address: string;
  openHours: string;
  wasteTypes: string[];
  coordinates: Coordinates;
}

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius BUMI in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const WasteLocation: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [nearestLocations, setNearestLocations] = useState<Location[]>([]);
  // const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Dummy data for locations
  const locations: Location[] = [
    { id: 1, name: "Pusat Daur Ulang Kota", address: "Jl. Raya Kota No. 123, Kota", openHours: "08:00 - 17:00", wasteTypes: ["plastik", "kertas", "logam"], coordinates: { latitude: -6.17511, longitude: 106.865036 } },
    { id: 2, name: "Tempat Pengumpulan Sampah Daur Ulang", address: "Jl. Hijau No. 45, Kota", openHours: "09:00 - 16:00", wasteTypes: ["plastik", "kertas", "kaca"], coordinates: { latitude: -6.17486, longitude: 106.866254 } },
    { id: 3, name: "Tempat Daur Ulang Jakarta", address: "Jl. Merah No. 12, Jakarta", openHours: "07:00 - 18:00", wasteTypes: ["plastik", "kertas"], coordinates: { latitude: -6.17, longitude: 106.84 } },
    { id: 4, name: "Pusat Pengumpulan Sampah", address: "Jl. Biru No. 77, Jakarta", openHours: "08:00 - 15:00", wasteTypes: ["kaca", "logam"], coordinates: { latitude: -6.18, longitude: 106.855 } },
    { id: 5, name: "Kantor Daur Ulang", address: "Jl. Kuning No. 88, Jakarta", openHours: "10:00 - 20:00", wasteTypes: ["plastik", "kertas"], coordinates: { latitude: -6.19, longitude: 106.87 } },
    { id: 6, name: "Tempat Sampah Daur Ulang", address: "Jl. Orange No. 55, Jakarta", openHours: "08:00 - 17:00", wasteTypes: ["logam", "kaca"], coordinates: { latitude: -6.2, longitude: 106.86 } },
    { id: 7, name: "Pusat Pengolahan Sampah", address: "Jl. Hijau No. 10, Jakarta", openHours: "09:00 - 16:00", wasteTypes: ["plastik", "kertas"], coordinates: { latitude: -6.21, longitude: 106.85 } },
    { id: 8, name: "Sampah Daur Ulang Area", address: "Jl. Putih No. 45, Jakarta", openHours: "07:00 - 19:00", wasteTypes: ["kaca", "plastik"], coordinates: { latitude: -6.22, longitude: 106.845 } },
    { id: 9, name: "Tempat Daur Ulang Terdekat", address: "Jl. Biru No. 99, Jakarta", openHours: "10:00 - 18:00", wasteTypes: ["logam", "kertas"], coordinates: { latitude: -6.23, longitude: 106.875 } },
    { id: 10, name: "Pusat Sampah Daur Ulang", address: "Jl. Kuning No. 66, Jakarta", openHours: "08:00 - 16:00", wasteTypes: ["plastik", "logam"], coordinates: { latitude: -6.24, longitude: 106.865 } },
    { id: 11, name: "Pusat Daur Ulang Bekasi Timur", address: "Jl. Timur No. 55, Bekasi Timur", openHours: "08:00 - 17:00", wasteTypes: ["plastik", "kertas", "kaca"], coordinates: { latitude: -6.237, longitude: 106.987 } },
  ];

  useEffect(() => {
    if (userLocation) {
      // Filter out the user's location and sort the rest by distance
      const sortedLocations = locations
        .filter(
          (location) => getDistance(userLocation.latitude, userLocation.longitude, location.coordinates.latitude, location.coordinates.longitude) > 0 // Ensure the user's location is not included
        )
        .sort((a, b) => {
          const distanceA = getDistance(userLocation.latitude, userLocation.longitude, a.coordinates.latitude, a.coordinates.longitude);
          const distanceB = getDistance(userLocation.latitude, userLocation.longitude, b.coordinates.latitude, b.coordinates.longitude);
          return distanceA - distanceB;
        });
      setNearestLocations(sortedLocations); // Show all locations sorted by distance
    }
  }, [userLocation]);

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
      const map = (window as any).map; // Access the Leaflet map instance from global window object
      if (map) {
        map.setView([userLocation.latitude, userLocation.longitude], 13); // Center the map at the user's location
      }
    }
  };

  const handleNavigate = (location: Location) => {
    // Generate URL for Google Maps with the coordinates of the selected location
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.latitude},${location.coordinates.longitude}`;
    window.open(url, "_blank");
  };

  // Custom icons
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
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png", // Green icon for waste locations
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
      <div className="flex-1">
        <div className="flex items-center mb-4 space-x-4">
          <Button onClick={handleFindNearest} className="bg-green-600 text-white hover:bg-green-700">
            Cari Lokasi Terdekat
          </Button>
          <Button onClick={handleViewMyLocation} className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white" disabled={!userLocation}>
            Lihat Lokasi Saya
          </Button>
        </div>
        <MapContainer center={userLocation ? [userLocation.latitude, userLocation.longitude] : [0, 0]} zoom={userLocation ? 13 : 2} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
          {userLocation && (
            <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
              <Popup>Lokasi Anda Saat Ini</Popup>
            </Marker>
          )}
          {nearestLocations.map((location) => (
            <Marker key={location.id} position={[location.coordinates.latitude, location.coordinates.longitude]} icon={wasteIcon}>
              <Popup>
                <strong>{location.name}</strong>
                <br />
                {location.address}
                <br />
                {location.openHours}
                <br />
                {location.wasteTypes.join(", ")}
                <br />
                <Button onClick={() => handleNavigate(location)} className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white mt-2 ">
                  Arahkan ke Lokasi
                </Button>
              </Popup>
            </Marker>
          ))}
          <MapWithCenter />
        </MapContainer>
      </div>
      <div className="w-full lg:w-1/3 bg-white border border-gray-300 rounded-lg p-4 overflow-y-auto h-[500px] ">
        <h2 className="text-xl font-bold mb-4">Daftar Lokasi Waste</h2>
        <ul>
          {nearestLocations.map((location) => (
            <li key={location.id} className="mb-4 p-2 border-b border-gray-300">
              <strong>{location.name}</strong>
              <br />
              {location.address}
              <br />
              {location.openHours}
              <br />
              {location.wasteTypes.join(", ")}
              <br />
              <Button onClick={() => handleNavigate(location)} className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white  mt-2">
                Arahkan ke Lokasi
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WasteLocation;
