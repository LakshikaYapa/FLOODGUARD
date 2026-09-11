import React, { useState, useContext } from 'react';
import API from '../services/api';
import { LanguageContext } from '../context/LanguageContext';

const Incidents = () => {
  const { lang } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    title: '',
    district: '',
    nearestTown: '',
    waterLevel: 'Medium',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await API.post('/incidents', formData);
      setMessage(lang === 'en' ? 'Incident reported successfully!' : 'ආපදා තත්ත්වය සාර්ථකව වාර්තා කරන ලදී!');
      setFormData({ title: '', district: '', nearestTown: '', waterLevel: 'Medium', description: '' });
    } catch (err) {
      setMessage(lang === 'en' ? 'Failed to report incident.' : 'වාර්තා කිරීම අසාර්ථක විය.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-slate-900 rounded-xl border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        {lang === 'en' ? 'Report Flood Incident' : 'ගංවතුර ආපදාවක් වාර්තා කරන්න'}
      </h2>

      {message && <p className="text-blue-400 text-sm mb-4 text-center font-medium">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder={lang === 'en' ? 'Title / Brief Summary' : 'මාතෘකාව / කෙටි හැඳින්වීම'}
          required
          value={formData.title}
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder={lang === 'en' ? 'District' : 'දිස්ත්‍රික්කය'}
            required
            value={formData.district}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          />
          <input
            type="text"
            placeholder={lang === 'en' ? 'Nearest Town' : 'ළඟම නගරය'}
            required
            value={formData.nearestTown}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
            onChange={(e) => setFormData({ ...formData, nearestTown: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-slate-400 text-xs mb-1">
            {lang === 'en' ? 'Water Level Severity:' : 'ජල මට්ටමේ තීව්‍රතාව:'}
          </label>
          <select
            value={formData.waterLevel}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
            onChange={(e) => setFormData({ ...formData, waterLevel: e.target.value })}
          >
            <option value="Low">{lang === 'en' ? 'Low (Ankle Level)' : 'අඩු (ගෝලීය මට්ටම)'}</option>
            <option value="Medium">{lang === 'en' ? 'Medium (Knee/Waist Level)' : 'මධ්‍යම (දණහිස්/ඉණ මට්ටම)'}</option>
            <option value="High">{lang === 'en' ? 'High (Chest Level & Above)' : 'ඉහළ (පපුව මට්ටමෙන් ඉහළට)'}</option>
            <option value="Critical">{lang === 'en' ? 'Critical (Submerged Houses)' : 'අතිශය අවදානම් (නිවාස යටවී ඇත)'}</option>
          </select>
        </div>

        <textarea
          placeholder={lang === 'en' ? 'Additional Details / Needs' : 'අමතර තොරතුරු / අවශ්‍යතා'}
          rows="3"
          value={formData.description}
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded font-semibold text-sm transition"
        >
          {loading ? (lang === 'en' ? 'Submitting...' : 'යවමින්...') : (lang === 'en' ? 'Submit Report' : 'වාර්තාව යොමු කරන්න')}
        </button>
      </form>
    </div>
  );
};

export default Incidents;