import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LanguageContext } from '../context/LanguageContext';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const createColorPin = (color) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 6px ${color};"></div>`,
    iconSize: [15, 15],
    iconAnchor: [7, 7]
  });
};

const redIcon = createColorPin('#ef4444');    // High Danger
const orangeIcon = createColorPin('#f97316'); // Warning
const blueIcon = createColorPin('#3b82f6');   // Shelter
const greenIcon = createColorPin('#10b981');  // Emergency Services

const MapView = ({ incidents = [], shelters = [], emergencyLocations = [] }) => {
  const { lang } = useContext(LanguageContext);
  const center = [7.8731, 80.7718]; // Sri Lanka Center

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-slate-700/70 shadow-2xl relative z-0 bg-slate-900">
      
      {/* Map Legend */}
      <div className="absolute top-3 right-3 z-[1000] bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/60 text-xs text-white space-y-1.5 shadow-xl">
        <p className="font-bold border-b border-slate-700 pb-1 mb-1">
          🗺️ {lang === 'en' ? 'Map Key' : 'සිතියම් සලකුණු'}
        </p>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span>{lang === 'en' ? 'High Danger' : 'ඉහළ අනතුර'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span>
          <span>{lang === 'en' ? 'Warning Zone' : 'අවදානම් කලාප'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span>{lang === 'en' ? 'Safe Shelters' : 'සුරක්ෂිත මධ්‍යස්ථාන'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span>{lang === 'en' ? 'Emergency Services' : 'හදිසි සේවා'}</span>
        </div>
      </div>

      <MapContainer 
        center={center} 
        zoom={8} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 1. Incidents */}
        {Array.isArray(incidents) && incidents.map((item) => {
          const coords = item?.location?.coordinates;
          if (!coords || coords.length < 2) return null;
          const isHigh = item.severity === 'CRITICAL' || item.severity === 'SEVERE' || item.waterLevel > 5;

          return (
            <Marker key={item._id || item.id} position={[coords[1], coords[0]]} icon={isHigh ? redIcon : orangeIcon}>
              <Popup>
                <div className="text-slate-900 p-1">
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded text-white mb-1 ${isHigh ? 'bg-red-600' : 'bg-orange-500'}`}>
                    {isHigh ? '🔴 HIGH DANGER' : '🟠 WARNING'}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{item.title || 'Flood Report'}</h4>
                  <p className="text-xs text-slate-600">📍 {item.address || item.district}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* 2. Shelters */}
        {Array.isArray(shelters) && shelters.map((item) => {
          const coords = item?.location?.coordinates;
          if (!coords || coords.length < 2) return null;

          return (
            <Marker key={item._id || item.id} position={[coords[1], coords[0]]} icon={blueIcon}>
              <Popup>
                <div className="text-slate-900 p-1">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded mb-1">
                    🏠 SAFE SHELTER
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-600">📍 {item.town}, {item.district}</p>
                  <p className="text-xs text-blue-700 font-bold">📞 {item.contactPhone}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* 3. Emergency Locations */}
        {Array.isArray(emergencyLocations) && emergencyLocations.map((item) => {
          const coords = item?.location?.coordinates;
          if (!coords || coords.length < 2) return null;

          return (
            <Marker key={item._id || item.id} position={[coords[1], coords[0]]} icon={greenIcon}>
              <Popup>
                <div className="text-slate-900 p-1">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-emerald-600 text-white rounded mb-1">
                    🏥 {item.type || 'EMERGENCY'}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-600">📍 {item.district}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>
    </div>
  );
};

export default MapView;