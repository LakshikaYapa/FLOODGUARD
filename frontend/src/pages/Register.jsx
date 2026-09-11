import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', password: '', 
    district: '', nearestTown: '', address: '' 
  });
  const [roles, setRoles] = useState(['resident']);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setRoles(roles.includes(role) ? roles.filter((r) => r !== role) : [...roles, role]);
  };

  const needsLocation = roles.includes('resident') || roles.includes('victim');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roles.length === 0) {
      return setError(lang === 'en' ? 'Please select at least one role' : 'කරුණාකර අවම වශයෙන් එක් වගකීමක් තෝරන්න');
    }
    try {
      const res = await API.post('/auth/register', { ...formData, roles });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || (lang === 'en' ? 'Registration failed' : 'ලියාපදිංචිය අසාර්ථකයි'));
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-slate-900 rounded-xl border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        {lang === 'en' ? 'Register' : 'ලියාපදිංචි වන්න'}
      </h2>
      {error && <p className="text-rose-500 text-sm mb-4 text-center">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text" 
          placeholder={lang === 'en' ? 'Full Name' : 'සම්පූර්ණ නම'} 
          required 
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm" 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
        />
        <input 
          type="email" 
          placeholder={lang === 'en' ? 'Email Address' : 'විද්‍යුත් තැපෑල'} 
          required 
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm" 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
        />
        <input 
          type="tel" 
          placeholder={lang === 'en' ? 'Phone Number' : 'දුරකථන අංකය'} 
          required 
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm" 
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
        />

        {/* Dynamic Roles Select */}
        <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1.5">
          <label className="block text-slate-400 text-xs font-semibold">
            {lang === 'en' ? 'Select Roles:' : 'වගකීම් තෝරන්න:'}
          </label>
          <label className="flex items-center space-x-2 text-sm text-slate-200 cursor-pointer">
            <input type="checkbox" checked={roles.includes('resident')} onChange={() => handleRoleChange('resident')} className="accent-blue-600" />
            <span>{lang === 'en' ? 'Resident / Reporter' : 'ප්‍රදේශවාසි / වාර්තාකරු'}</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-slate-200 cursor-pointer">
            <input type="checkbox" checked={roles.includes('victim')} onChange={() => handleRoleChange('victim')} className="accent-blue-600" />
            <span>{lang === 'en' ? 'In Need of Help / Victim' : 'ආපදාවට ලක්වූවෙක් / ආධාර අවශ්‍ය අයෙක්'}</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-slate-200 cursor-pointer">
            <input type="checkbox" checked={roles.includes('volunteer')} onChange={() => handleRoleChange('volunteer')} className="accent-blue-600" />
            <span>{lang === 'en' ? 'Volunteer / Relief Worker' : 'ස්වේච්ඡා සේවක / සහන සේවක'}</span>
          </label>
        </div>

        {/* Conditional Location Fields */}
        {needsLocation && (
          <div className="bg-slate-950/60 p-3 rounded border border-slate-800/80 space-y-2">
            <label className="block text-blue-400 text-xs font-semibold">
              {lang === 'en' ? 'Location Details:' : 'ප්‍රදේශයේ තොරතුරු:'}
            </label>
            <input 
              type="text" 
              placeholder={lang === 'en' ? 'District' : 'දිස්ත්‍රික්කය'} 
              required 
              className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" 
              onChange={(e) => setFormData({ ...formData, district: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder={lang === 'en' ? 'Nearest Town' : 'ළඟම නගරය'} 
              required 
              className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" 
              onChange={(e) => setFormData({ ...formData, nearestTown: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder={lang === 'en' ? 'Address / Landmark' : 'ලිපිනය / ළඟම ස්ථානය'} 
              className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white text-xs" 
              onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
            />
          </div>
        )}

        <input 
          type="password" 
          placeholder={lang === 'en' ? 'Password' : 'මුරපදය'} 
          required 
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm" 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded font-semibold text-sm transition">
          {lang === 'en' ? 'Register' : 'ලියාපදිංචි වන්න'}
        </button>
      </form>
      
      <p className="text-slate-400 text-xs text-center mt-3">
        {lang === 'en' ? 'Already have an account?' : 'දැනටමත් ගිණුමක් තිබේද?'}{' '}
        <Link to="/login" className="text-blue-400">
          {lang === 'en' ? 'Login' : 'ඇතුළු වන්න'}
        </Link>
      </p>
    </div>
  );
};

export default Register;