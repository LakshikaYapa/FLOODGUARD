import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { PhoneCall, ShieldAlert, HeartPulse, Flame, Radio } from 'lucide-react';

const EmergencyContacts = () => {
  const { lang } = useContext(LanguageContext);
  const [contacts, setContacts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Fallback default contacts for high availability
  const defaultContacts = [
    { _id: '1', name: { en: 'Disaster Management Centre (DMC)', si: 'ආපදා කළමනාකරණ මධ්‍යස්ථානය' }, category: 'DISASTER_MANAGEMENT', phone: '117', district: 'All Island' },
    { _id: '2', name: { en: 'Emergency Police Operating Room', si: 'පොලිස් හදිසි ඇමතුම් ඒකකය' }, category: 'POLICE', phone: '119', district: 'All Island' },
    { _id: '3', name: { en: 'Suwa Seriya Ambulance Service', si: 'සුවසැරිය ඇම්බියුලන්ස් සේවාව' }, category: 'AMBULANCE', phone: '1990', district: 'All Island' },
    { _id: '4', name: { en: 'Fire & Rescue Service', si: 'ගිනි නිවන සහ මුදාගැනීමේ සේවාව' }, category: 'FIRE_RESCUE', phone: '110', district: 'All Island' },
  ];

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await API.get('/emergency-contacts');
      if (res.data && res.data.length > 0) {
        setContacts(res.data);
      } else {
        setContacts(defaultContacts);
      }
    } catch (err) {
      console.error(err);
      setContacts(defaultContacts);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'POLICE': return <ShieldAlert className="w-5 h-5 text-blue-400" />;
      case 'AMBULANCE': return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case 'FIRE_RESCUE': return <Flame className="w-5 h-5 text-amber-500" />;
      default: return <Radio className="w-5 h-5 text-emerald-400" />;
    }
  };

  const filteredContacts = selectedCategory === 'ALL' 
    ? contacts 
    : contacts.filter(c => c.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 text-slate-100">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-rose-500">
          📞 {lang === 'en' ? 'Emergency Hotline Directory' : 'හදිසි ඇමතුම් සහ සේවා ඩිරෙක්ටරිය'}
        </h1>
        <p className="text-slate-400 text-sm">
          {lang === 'en' 
            ? 'Official emergency response numbers for immediate flood rescue and assistance.' 
            : 'ගංවතුර ආපදා සහ හදිසි මුදාගැනීම් සඳහා නිල හදිසි ඇමතුම් අංක.'}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {['ALL', 'DISASTER_MANAGEMENT', 'POLICE', 'AMBULANCE', 'FIRE_RESCUE'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              selectedCategory === cat
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {cat === 'ALL' ? (lang === 'en' ? 'All Services' : 'සියලුම සේවාවන්') : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Contacts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContacts.map((contact) => (
          <div key={contact._id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-slate-700 transition">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(contact.category)}
                <h3 className="font-bold text-sm text-slate-200">
                  {lang === 'en' ? contact.name.en : contact.name.si}
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                📍 {contact.district || 'All Island'}
              </p>
            </div>

            <a
              href={`tel:${contact.phone}`}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center space-x-1.5 shadow-lg shadow-emerald-600/30 transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{contact.phone}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;