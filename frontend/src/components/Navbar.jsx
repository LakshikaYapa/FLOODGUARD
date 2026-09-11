import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, LogOut, User, Menu, X, Globe } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { lang, toggleLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 shadow-lg sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Nav Links */}
          <div className="flex items-center space-x-5">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-black text-blue-400">
              <ShieldAlert className="w-9 h-9 text-blue-500 animate-pulse" />
              <span>FloodGuard</span>
              <img src="https://flagcdn.com/w40/lk.png" alt="SL" className="w-6 h-auto rounded-sm border border-slate-700 ml-1 inline-block" />
            </Link>
            <Link to="/volunteers" className="hover:text-blue-400 font-semibold transition">
  🤝 {lang === 'en' ? 'Volunteers' : 'ස්වේච්ඡා සේවකයින්'}
</Link>

            <div className="hidden md:flex items-center space-x-5 font-medium text-slate-300 text-sm pl-4 border-l border-slate-800">
              <Link to="/" className="hover:text-blue-400">{lang === 'en' ? 'Dashboard' : 'ප්‍රධාන පුවරුව'}</Link>
             <Link to="/reports" className="hover:text-blue-400">{lang === 'en' ? 'Incidents' : 'වාර්තා'}</Link>
              <Link to="/shelters" className="hover:text-blue-400">{lang === 'en' ? 'Shelters' : 'සුරක්ෂිත මධ්‍යස්ථාන'}</Link>
              <Link to="/assistance" className="hover:text-blue-400 font-semibold transition">
  🆘 {lang === 'en' ? 'Emergency Help' : 'හදිසි සහන'}
</Link>
            </div>
          </div>

          {/* Right Controls: Language Selector + User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={lang}
                onChange={(e) => toggleLanguage(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-semibold"
              >
                <option value="en" className="bg-slate-900">EN</option>
                <option value="si" className="bg-slate-900">සිංහල</option>
              </select>
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-blue-400" /> {user.name}
                </span>
                <button onClick={handleLogout} className="bg-rose-600/80 hover:bg-rose-600 px-3 py-1.5 rounded-lg text-xs font-semibold">
                  <LogOut className="w-3.5 h-3.5 inline mr-1" />
                  {lang === 'en' ? 'Logout' : 'නික්මෙන්න'}
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-lg font-semibold text-sm">
                {lang === 'en' ? 'Login' : 'ඇතුළු වන්න'}
              </Link>

              
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <select
              value={lang}
              onChange={(e) => toggleLanguage(e.target.value)}
              className="bg-slate-950 text-slate-200 border border-slate-800 text-xs p-1 rounded"
            >
              <option value="en">EN</option>
              <option value="si">සිංහල</option>
            </select>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;