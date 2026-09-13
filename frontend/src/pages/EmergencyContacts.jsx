import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { PhoneCall, ShieldAlert, HeartPulse, Flame, Radio } from 'lucide-react';

const EmergencyContacts = () => {
  const { lang } = useContext(LanguageContext);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Sri Lanka Official Emergency Hotlines List
  const defaultContacts = [
    { 
      _id: '1', 
      nameEn: 'Disaster Management Centre (DMC) Call Centre', 
      nameSi: 'ආපදා කළමනාකරණ මධ්‍යස්ථාන ඇමතුම් ඒකකය', 
      category: 'DISASTER_MANAGEMENT', 
      phone: '117', 
      district: 'All Island' 
    },
    { 
      _id: '2', 
      nameEn: 'Emergency Police Operating Room', 
      nameSi: 'පොලිස් හදිසි ඇමතුම් ඒකකය', 
      category: 'POLICE', 
      phone: '119', 
      district: 'All Island' 
    },
    { 
      _id: '3', 
      nameEn: '1990 Suwa Seriya Free Ambulance Service', 
      nameSi: '1990 සුවසැරිය නොමිලේ ඇම්බියුලන්ස් සේවාව', 
      category: 'AMBULANCE', 
      phone: '1990', 
      district: 'All Island' 
    },
    { 
      _id: '4', 
      nameEn: 'Fire & Rescue Service (Colombo Command)', 
      nameSi: 'ගිනි නිවන සහ මුදාගැනීමේ සේවාව', 
      category: 'FIRE_RESCUE', 
      phone: '110', 
      district: 'All Island' 
    },
    { 
      _id: '5', 
      nameEn: 'Sri Lanka Navy Disaster Response HQ', 
      nameSi: 'ශ්‍රී ලංකා නාවික හමුදා ආපදා සහන මූලස්ථානය', 
      category: 'DISASTER_MANAGEMENT', 
      phone: '0112445368', 
      district: 'All Island' 
    },
    { 
      _id: '6', 
      nameEn: 'Sri Lanka Air Force Search & Rescue', 
      nameSi: 'ශ්‍රී ලංකා ගුවන් හමුදා සෙවීම් හා මුදාගැනීම් ඒකකය', 
      category: 'DISASTER_MANAGEMENT', 
      phone: '0112343970', 
      district: 'All Island' 
    },
    { 
      _id: '7', 
      nameEn: 'Irrigation Department (Flood Information Centre)', 
      nameSi: 'වාරිමාර්ග දෙපාර්තමේන්තුව (ගංවතුර තොරතුරු මධ්‍යස්ථානය)', 
      category: 'DISASTER_MANAGEMENT', 
      phone: '0112586798', 
      district: 'All Island' 
    },
    { 
      _id: '8', 
      nameEn: 'Red Cross Sri Lanka Disaster Hotline', 
      nameSi: 'ශ්‍රී ලංකා රතු කුරුස ආපදා හදිසි ඇමතුම්', 
      category: 'AMBULANCE', 
      phone: '0112691095', 
      district: 'All Island' 
    }
  ];

  const [contacts, setContacts] = useState(defaultContacts);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await API.get('/emergency-contacts');
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setContacts(res.data);
        }
      } catch (err) {
        console.warn('Backend contacts fetch failed, using built-in hotlines.');
      }
    };
    fetchContacts();
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'POLICE': return <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0" />;
      case 'AMBULANCE': return <HeartPulse className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'FIRE_RESCUE': return <Flame className="w-5 h-5 text-amber-500 shrink-0" />;
      default: return <Radio className="w-5 h-5 text-emerald-400 shrink-0" />;
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
        {filteredContacts.map((contact, index) => {
          const title = typeof contact.name === 'string' 
            ? contact.name 
            : (contact.name?.[lang] || (lang === 'en' ? contact.nameEn : contact.nameSi) || 'Emergency Service');

          return (
            <div key={contact._id || index} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-slate-700 transition gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(contact.category)}
                  <h3 className="font-bold text-sm text-slate-200">
                    {title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  📍 {contact.district || 'All Island'}
                </p>
              </div>

              <a
                href={`tel:${contact.phone}`}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center space-x-1.5 shadow-lg shadow-emerald-600/30 transition shrink-0"
              >
                <PhoneCall className="w-4 h-4" />
                <span className="text-white font-extrabold">{contact.phone}</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmergencyContacts;