import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Helper component to re-center map dynamically when items change
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const MapView = ({ incidents = [], shelters = [] }) => {
  const defaultCenter = [7.8731, 80.7718];

  // Latest added shelter or incident center
  const latestItem = shelters[0] || incidents[0];
  const dynamicCenter = latestItem?.location?.coordinates 
    ? [latestItem.location.coordinates[1], latestItem.location.coordinates[0]] 
    : defaultCenter;

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl relative z-0">
      <MapContainer center={defaultCenter} zoom={7} className="h-full w-full">
        <ChangeView center={dynamicCenter} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Incident Markers */}
        {incidents.map((item) => (
          item.location?.coordinates && (
            <Marker key={item._id || item.id} position={[item.location.coordinates[1], item.location.coordinates[0]]}>
              <Popup>
                <div className="text-slate-900">
                  <h4 className="font-bold text-red-600">🚨 {item.title}</h4>
                  <p className="text-xs font-semibold">{item.address || item.district}</p>
                  <p className="text-xs text-slate-600">Water Level: {item.waterLevel || 'High'}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}

        {/* Shelter Markers */}
        {shelters.map((item) => (
          item.location?.coordinates && (
            <Marker key={item._id || item.id} position={[item.location.coordinates[1], item.location.coordinates[0]]}>
              <Popup>
                <div className="text-slate-900">
                  <h4 className="font-bold text-blue-600">🏠 {item.name}</h4>
                  <p className="text-xs font-semibold">{item.town}, {item.district}</p>
                  <p className="text-xs text-slate-600">Capacity: {item.capacity} people</p>
                  <p className="text-xs text-blue-800 font-medium">📞 {item.contactPhone}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;