import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';
import rainBg from '../assets/rain-bg.jpg';

const Dashboard = () => {
  const { lang } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [photos, setPhotos] = useState([
    { id: '1', url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80', title: 'Food Distribution', location: 'Galle' },
    { id: '2', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80', title: 'Medical Aid Camp', location: 'Colombo' }
  ]);
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '', location: '' });
  const [showUpload, setShowUpload] = useState(false);

  const isVolunteer = user?.roles?.includes('volunteer');

  useEffect(() => {
    API.get('/incidents').then((res) => setIncidents(res.data)).catch(() => setIncidents([]));
  }, []);

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    if (!newPhoto.url) return;
    setPhotos([{ id: Date.now().toString(), ...newPhoto }, ...photos]);
    setNewPhoto({ title: '', url: '', location: '' });
    setShowUpload(false);
  };

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] w-full bg-cover bg-center bg-fixed relative p-4 sm:p-8"
      style={{ backgroundImage: `url(${rainBg})` }}
    >
      {/* Transparency Overlay */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 text-center space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            🌧️ {lang === 'en' ? 'Live Flood Alert System' : 'සජීවී ගංවතුර පූර්ව අනතුරු ඇඟවීමේ පද්ධතිය'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            {lang === 'en' ? 'Rapid Flood Response Sri Lanka' : 'ශ්‍රී ලංකා හදිසි ගංවතුර සහන මෙහෙයුම්'}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
            {lang === 'en'
              ? 'FloodGuard connects flood-affected residents, relief workers, and safe shelter managers in real-time.'
              : 'FloodGuard මගින් ගංවතුරෙන් ආපදාවට ලක්වූවන්, ස්වේච්ඡා සහන සේවකයින් සහ සුරක්ෂිත මධ්‍යස්ථාන සජීවීව සම්බන්ධ කරයි.'}
          </p>
        </section>

        {/* Volunteer Photos */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-700/60 pb-2">
            <div>
              <h2 className="text-xl font-bold text-white">{lang === 'en' ? 'Community Relief Efforts' : 'සහන සේවාවන්හි සජීවී සෙවනැලි'}</h2>
              <p className="text-xs text-slate-300">{lang === 'en' ? 'Photos uploaded by volunteers' : 'ස්වේච්ඡා සේවකයින්ගේ සහන සේවා ඡායාරූප'}</p>
            </div>
            {isVolunteer && (
              <button onClick={() => setShowUpload(!showUpload)} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded font-semibold">
                {showUpload ? 'X' : lang === 'en' ? '+ Upload Photo' : '+ ඡායාරූපයක් එක් කරන්න'}
              </button>
            )}
          </div>

          {showUpload && (
            <form onSubmit={handlePhotoSubmit} className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl space-y-2 max-w-md mx-auto">
              <input type="text" placeholder="Title" required className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })} />
              <input type="url" placeholder="Image URL" required className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })} />
              <input type="text" placeholder="Location" required className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })} />
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded text-xs font-semibold">Post</button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((item) => (
              <div key={item.id} className="bg-slate-900/70 backdrop-blur border border-slate-700/60 rounded-xl overflow-hidden">
                <img src={item.url} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                  <p className="text-xs text-blue-300">📍 {item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Incidents */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white border-b border-slate-700/60 pb-2">{lang === 'en' ? 'Recent Flood Incidents' : 'නවතම ආපදා වාර්තා'}</h2>
          {incidents.length === 0 ? (
            <p className="text-slate-300 text-xs text-center py-6 bg-slate-900/50 backdrop-blur rounded-xl border border-slate-700/50">
              {lang === 'en' ? 'No active flood incidents reported.' : 'වාර්තා වූ ආපදා නොමැත.'}
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {incidents.map((item) => (
                <div key={item._id || item.id} className="bg-slate-900/70 backdrop-blur border border-slate-700/60 p-4 rounded-xl">
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-blue-300">📍 {item.nearestTown}, {item.district}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;