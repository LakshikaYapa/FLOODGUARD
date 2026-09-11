import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || (lang === 'en' ? 'Login failed' : 'ඇතුළු වීම අසාර්ථකයි'));
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-slate-900 rounded-xl border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        {lang === 'en' ? 'Login' : 'ඇතුළු වන්න'}
      </h2>
      {error && <p className="text-rose-500 text-sm mb-4 text-center">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder={lang === 'en' ? 'Email Address' : 'විද්‍යුත් තැපෑල'}
          required
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder={lang === 'en' ? 'Password' : 'මුරපදය'}
          required
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded font-semibold text-sm transition">
          {lang === 'en' ? 'Login' : 'ඇතුළු වන්න'}
        </button>
      </form>
      
      <p className="text-slate-400 text-xs text-center mt-3">
        {lang === 'en' ? "Don't have an account?" : "ගිණුමක් නැතිද?"}{' '}
        <Link to="/register" className="text-blue-400">
          {lang === 'en' ? 'Register' : 'ලියාපදිංචි වන්න'}
        </Link>
      </p>
    </div>
  );
};

export default Login;