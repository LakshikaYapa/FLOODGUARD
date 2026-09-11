import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { LanguageContext } from '../context/LanguageContext';

const Dashboard = () => {
  const { lang } = useContext(LanguageContext);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await API.get('/incidents');
        setIncidents(res.data);
      } catch (err) {
        setIncidents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  const getBadgeColor = (level) => {
    switch (level) {
      case 'Critical': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'High': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {lang === 'en' ? 'Live Flood Dashboard' : 'සජීවී ගංවතුර තොරතුරු පුවරුව'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {lang === 'en' ? 'Real-time reported incidents' : 'පරිශීලකයින් විසින් සජීවීව වාර්තා කළ ආපදා තොරතුරු'}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-400 text-center py-8">
          {lang === 'en' ? 'Loading incidents...' : 'තොරතුරු ලබා ගනිමින්...'}
        </p>
      ) : incidents.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
          <p className="text-slate-400 text-sm">
            {lang === 'en' 
              ? 'No incidents reported yet. Verified reports will appear here.' 
              : 'තවම කිසිදු ආපදාවක් වාර්තා වී නොමැත. පරිශීලකයින් වාර්තා කරන තොරතුරු මෙහි දර්ශනය වේ.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {incidents.map((item) => (
            <div key={item._id || item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">{item.title}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full border ${getBadgeColor(item.waterLevel)}`}>
                  {item.waterLevel}
                </span>
              </div>
              <p className="text-xs text-blue-400 font-medium">
                📍 {item.nearestTown}, {item.district}
              </p>
              <p className="text-slate-300 text-xs line-clamp-2">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;