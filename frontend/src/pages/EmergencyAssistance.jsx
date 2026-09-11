import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { LanguageContext } from '../context/LanguageContext';

const EmergencyAssistance = () => {
  const { lang } = useContext(LanguageContext);
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    category: 'Rescue required',
    priority: 'HIGH',
    description: '',
    district: '',
    address: '',
    contactPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Categories with Sinhala translations
  const categories = [
    { value: 'Rescue required', en: 'Rescue required', si: 'මුදාගැනීම අවශ්‍යයි' },
    { value: 'Medical emergency', en: 'Medical emergency', si: 'සෞඛ්‍ය / වෛද්‍ය හදිසි අවස්ථාවක්' },
    { value: 'Food required', en: 'Food required', si: 'ආහාර අවශ්‍යයි' },
    { value: 'Drinking water required', en: 'Drinking water required', si: 'බීමට පිරිසිදු ජලය අවශ්‍යයි' },
    { value: 'Medicine required', en: 'Medicine required', si: 'ඖෂධ අවශ්‍යයි' },
    { value: 'Elderly person needs assistance', en: 'Elderly person needs assistance', si: 'වැඩිහිටි පුද්ගලයෙකුට උපකාර අවශ්‍යයි' },
    { value: 'Child needs assistance', en: 'Child needs assistance', si: 'කුඩා ළමයෙකුට උපකාර අවශ්‍යයි' },
    { value: 'Person with disability needs assistance', en: 'Person with disability needs assistance', si: 'ආබාධිත පුද්ගලයෙකුට උපකාර අවශ්‍යයි' },
    { value: 'Evacuation required', en: 'Evacuation required', si: 'ආරක්ෂිත ස්ථානයකට ඉවත් වීම' },
    { value: 'Missing person', en: 'Missing person', si: 'අතුරුදහන් වූ අයෙකු සෙවීම' },
    { value: 'Other', en: 'Other', si: 'වෙනත්' }
  ];

  // Priorities with Sinhala translations
  const priorities = [
    { value: 'LOW', en: 'LOW', si: 'අඩු' },
    { value: 'MEDIUM', en: 'MEDIUM', si: 'මධ්‍යම' },
    { value: 'HIGH', en: 'HIGH', si: 'ඉහළ' },
    { value: 'URGENT', en: 'URGENT 🚨', si: 'අතිශය හදිසි 🚨' }
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get('/assistance');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await API.post('/assistance', formData);
      setMessage(lang === 'en' ? 'Request submitted successfully!' : 'ඉල්ලීම සාර්ථකව යොමු කරන ලදී!');
      setFormData({
        category: 'Rescue required',
        priority: 'HIGH',
        description: '',
        district: '',
        address: '',
        contactPhone: ''
      });
      fetchRequests();
    } catch (err) {
      setMessage(lang === 'en' ? 'Error submitting request.' : 'ඉල්ලීම යොමු කිරීම අසාර්ථක විය.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (val) => {
    const item = categories.find((c) => c.value === val);
    return item ? (lang === 'si' ? item.si : item.en) : val;
  };

  const getPriorityLabel = (val) => {
    const item = priorities.find((p) => p.value === val);
    return item ? (lang === 'si' ? item.si : item.en) : val;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 text-white">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-red-500">
          🆘 {lang === 'en' ? 'Emergency Assistance Request' : 'හදිසි සහන සහ ආපදා ඉල්ලීම්'}
        </h1>
        <p className="text-slate-300 text-sm">
          {lang === 'en' 
            ? 'Request urgent help for rescue, medical, food, or evacuation.' 
            : 'බෙහෙත්, ආහාර, හෝ මුදාගැනීම් සඳහා හදිසි සහන ඉල්ලුම් කරන්න.'}
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur border border-slate-700 p-6 rounded-2xl max-w-2xl mx-auto space-y-4 shadow-xl">
        {message && <div className="p-3 bg-blue-600/30 border border-blue-500 rounded text-xs text-center">{message}</div>}

        <div>
          <label className="block text-xs font-semibold mb-1">{lang === 'en' ? 'Category' : 'වර්ගය'}</label>
          <select 
            value={formData.category} 
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {lang === 'si' ? cat.si : cat.en}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">{lang === 'en' ? 'Priority' : 'ප්‍රමුඛතාවය'}</label>
            <select 
              value={formData.priority} 
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            >
              {priorities.map((p) => (
                <option key={p.value} value={p.value}>
                  {lang === 'si' ? p.si : p.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">{lang === 'en' ? 'District' : 'දිස්ත්‍රික්කය'}</label>
            <input 
              type="text" 
              required
              placeholder={lang === 'en' ? 'e.g. Galle' : 'උදා. ගාල්ල'}
              value={formData.district} 
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">{lang === 'en' ? 'Contact Phone' : 'දුරකථන අංකය'}</label>
            <input 
              type="text" 
              required
              placeholder="07XXXXXXXX"
              value={formData.contactPhone} 
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">{lang === 'en' ? 'Address / Location Details' : 'ලිපිනය / ස්ථානය'}</label>
            <input 
              type="text" 
              required
              placeholder={lang === 'en' ? 'Street, Landmark' : 'පාර, ආසන්න සලකුණ'}
              value={formData.address} 
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1">{lang === 'en' ? 'Description' : 'විස්තරය'}</label>
          <textarea 
            rows="3"
            required
            placeholder={lang === 'en' ? 'Describe the situation...' : 'තත්වය විස්තර කරන්න...'}
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-500 font-bold p-3 rounded-xl transition text-sm shadow-lg shadow-red-600/30"
        >
          {loading ? 'Submitting...' : lang === 'en' ? 'Submit Emergency Request' : 'ආපදා ඉල්ලීම යොමු කරන්න'}
        </button>
      </form>

      {/* Active Requests List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold border-b border-slate-800 pb-2">
          📋 {lang === 'en' ? 'Recent Assistance Requests' : 'නවතම ආපදා සහන ඉල්ලීම්'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded">
                  {getCategoryLabel(req.category)}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${req.priority === 'URGENT' ? 'bg-red-600 text-white' : 'bg-orange-500/20 text-orange-400'}`}>
                  {getPriorityLabel(req.priority)}
                </span>
              </div>
              <p className="text-xs text-slate-300">{req.description}</p>
              <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
                <span>📍 {req.address}, {req.district}</span>
                <span className="font-semibold text-blue-400">📞 {req.contactPhone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyAssistance;