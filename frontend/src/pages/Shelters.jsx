import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';

const Shelters = () => {
  const { lang } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [shelters, setShelters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', district: '', town: '', capacity: '', contactPhone: '', facilities: '' });

  const userDistrict = user?.district || '';

  useEffect(() => {
    API.get('/shelters')
      .then((res) => setShelters(res.data))
      .catch(() => setShelters([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/shelters', formData);
      setShelters([res.data, ...shelters]);
      setShowForm(false);
      setFormData({ name: '', district: '', town: '', capacity: '', contactPhone: '', facilities: '' });
    } catch (err) {
      alert('Failed to add shelter');
    }
  };

  const sortedShelters = [...shelters].sort((a, b) => {
    if (a.district?.toLowerCase() === userDistrict.toLowerCase()) return -1;
    if (b.district?.toLowerCase() === userDistrict.toLowerCase()) return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{lang === 'en' ? 'Safe Shelters' : 'සුරක්ෂිත මධ්‍යස්ථාන'}</h1>
          <p className="text-slate-400 text-xs mt-1">{lang === 'en' ? 'Find or register emergency shelters' : 'ආසන්නතම සහන මධ්‍යස්ථාන'}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white text-xs px-3 py-2 rounded font-semibold">
          {showForm ? 'X' : lang === 'en' ? '+ Add Shelter' : '+ එකතු කරන්න'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 max-w-md mx-auto">
          <input type="text" placeholder="Shelter Name" required className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="District" required className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" onChange={(e) => setFormData({ ...formData, district: e.target.value })} />
            <input type="text" placeholder="Town" required className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" onChange={(e) => setFormData({ ...formData, town: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" placeholder="Capacity" required className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} />
            <input type="tel" placeholder="Phone" required className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} />
          </div>
          <input type="text" placeholder="Facilities" className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" onChange={(e) => setFormData({ ...formData, facilities: e.target.value })} />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded text-xs font-semibold">Save</button>
        </form>
      )}

      {shelters.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-8">{lang === 'en' ? 'No shelters available.' : 'මධ්‍යස්ථාන ඇතුළත් කර නොමැත.'}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedShelters.map((item) => {
            const isNearby = userDistrict && item.district?.toLowerCase() === userDistrict.toLowerCase();
            return (
              <div key={item._id || item.id} className={`rounded-xl p-4 space-y-2 border relative ${isNearby ? 'bg-blue-950/40 border-blue-500' : 'bg-slate-900 border-slate-800'}`}>
                {isNearby && <span className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">📍 Nearby</span>}
                <h3 className="font-bold text-white text-base">{item.name}</h3>
                <p className="text-xs text-blue-400 font-medium">📍 {item.town}, {item.district}</p>
                <div className="flex justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <span>👥 Capacity: <strong className="text-white">{item.capacity}</strong></span>
                  <span className="text-blue-400 font-semibold">📞 {item.contactPhone}</span>
                </div>
                {item.facilities && <p className="text-xs text-slate-400">🏥 {item.facilities}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shelters;