import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';

const VolunteerPortal = () => {
  const { lang } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);

  const [skills, setSkills] = useState([]);
  const [district, setDistrict] = useState('');
  const [availability, setAvailability] = useState('AVAILABLE');
  const [vehicleOrResources, setVehicleOrResources] = useState('');
  
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const skillOptions = [
    { value: 'First Aid', en: 'First Aid', si: 'ප්‍රථමාධාර' },
    { value: 'Medical', en: 'Medical', si: 'සෞඛ්‍ය / වෛද්‍ය' },
    { value: 'Rescue', en: 'Rescue', si: 'මුදාගැනීමේ මෙහෙයුම්' },
    { value: 'Driving', en: 'Driving', si: 'වාහන පැදවීම' },
    { value: 'Communication', en: 'Communication', si: 'සන්නිවේදනය' },
    { value: 'Food distribution', en: 'Food distribution', si: 'ආහාර බෙදාහැරීම' },
    { value: 'Search and rescue', en: 'Search and rescue', si: 'සෙවීම් සහ මුදාගැනීම්' },
    { value: 'Technical support', en: 'Technical support', si: 'තාක්ෂණික සහාය' }
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

  const handleSkillChange = (skillValue) => {
    if (skills.includes(skillValue)) {
      setSkills(skills.filter((s) => s !== skillValue));
    } else {
      setSkills([...skills, skillValue]);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/volunteers/register', {
        userId: user?._id || user?.id,
        district,
        skills,
        availability,
        vehicleOrResources
      });
      setMessage(lang === 'en' ? 'Volunteer profile saved successfully!' : 'ස්වේච්ඡා සේවක ගිණුම සාර්ථකව යාවත්කාලීන විය!');
      setIsRegistered(true);
    } catch (err) {
      setMessage(lang === 'en' ? 'Error saving profile.' : 'ගිණුම යාවත්කාලීන කිරීම අසාර්ථක විය.');
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await API.put(`/assistance/${requestId}`, {
        status: 'In Progress',
        volunteerId: user?._id || user?.id
      });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 text-white">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-blue-400">
          🤝 {lang === 'en' ? 'Volunteer Portal & Relief Network' : 'ස්වේච්ඡා සේවක මෙහෙයුම් මධ්‍යස්ථානය'}
        </h1>
        <p className="text-slate-300 text-sm">
          {lang === 'en'
            ? 'Register as a volunteer and help affected people in flood-prone areas.'
            : 'ආපදාවට ලක්වූවන්ට සහන සැලසීමට ස්වේච්ඡා සේවකයෙකු ලෙස සම්බන්ධ වන්න.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Registration / Profile Form */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-6 rounded-2xl space-y-4 shadow-xl">
          <h2 className="text-lg font-bold border-b border-slate-800 pb-2 text-blue-300">
            👤 {lang === 'en' ? 'Volunteer Registration / Status' : 'ස්වේච්ඡා සේවක ලියාපදිංචිය'}
          </h2>

          {message && <div className="p-2.5 bg-blue-600/30 border border-blue-500 rounded text-xs text-center">{message}</div>}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1">{lang === 'en' ? 'District' : 'දිස්ත්‍රික්කය'}</label>
              <input
                type="text"
                required
                placeholder={lang === 'en' ? 'e.g. Galle' : 'උදා. ගාල්ල'}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">{lang === 'en' ? 'Availability Status' : 'පවතින සක්‍රීය භාවය'}</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              >
                <option value="AVAILABLE">{lang === 'en' ? 'AVAILABLE 🟢' : 'සූදානම් (AVAILABLE) 🟢'}</option>
                <option value="BUSY">{lang === 'en' ? 'BUSY 🟠' : 'කාර්යබහුලයි (BUSY) 🟠'}</option>
                <option value="OFFLINE">{lang === 'en' ? 'OFFLINE 🔴' : 'අක්‍රීයයි (OFFLINE) 🔴'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">{lang === 'en' ? 'Skills / Capabilities' : 'කුසලතා / හැකියාවන්'}</label>
              <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-950 border border-slate-800 rounded-lg">
                {skillOptions.map((item) => (
                  <label key={item.value} className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={skills.includes(item.value)}
                      onChange={() => handleSkillChange(item.value)}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span>{lang === 'si' ? item.si : item.en}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">{lang === 'en' ? 'Available Resources / Vehicles' : 'සම්පත් / වාහන (තිබේ නම්)'}</label>
              <input
                type="text"
                placeholder={lang === 'en' ? 'e.g. 4x4 Truck, Boat, First Aid Kit' : 'උදා. 4x4 ලොරිය, බෝට්ටුව, ප්‍රථමාධාර කට්ටලය'}
                value={vehicleOrResources}
                onChange={(e) => setVehicleOrResources(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 font-bold p-3 rounded-xl transition text-sm shadow-lg shadow-blue-600/30"
            >
              {lang === 'en' ? 'Save Profile / Status' : 'තොරතුරු සුරකින්න'}
            </button>
          </form>
        </div>

        {/* Requests Matching Section */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold border-b border-slate-800 pb-2 flex justify-between items-center">
            <span>🚨 {lang === 'en' ? 'Nearby Emergency Requests' : 'ආසන්නයේ ඇති ආපදා සහන ඉල්ලීම්'}</span>
            <span className="text-xs font-normal text-slate-400">Total: {requests.length}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((req) => (
              <div key={req._id} className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded">
                      {req.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${req.priority === 'URGENT' ? 'bg-red-600 text-white' : 'bg-orange-500/20 text-orange-400'}`}>
                      {req.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{req.description}</p>
                </div>

                <div className="space-y-2 border-t border-slate-800 pt-2">
                  <div className="text-[11px] text-slate-400 flex justify-between">
                    <span>📍 {req.address}, {req.district}</span>
                    <span className="font-semibold text-blue-400">📞 {req.contactPhone}</span>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${req.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-slate-800 text-slate-400'}`}>
                      Status: {req.status}
                    </span>

                    {req.status === 'Pending' && (
                      <button
                        onClick={() => handleAcceptRequest(req._id)}
                        className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded font-bold transition"
                      >
                        {lang === 'en' ? 'Accept Request' : 'භාරගන්න'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VolunteerPortal;