import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, LogOut, User, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-400">
            <ShieldAlert className="w-7 h-7 text-blue-500 animate-pulse" />
            <span>FloodGuard</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 font-medium text-slate-300">
            <Link to="/" className="hover:text-blue-400 transition">Dashboard</Link>
            <Link to="/reports" className="hover:text-blue-400 transition">Incidents</Link>
            <Link to="/shelters" className="hover:text-blue-400 transition">Shelters</Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                  <User className="w-4 h-4 text-blue-400" /> {user.name || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-rose-600/80 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1 transition text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg font-semibold transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-blue-400 py-2 font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/reports"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-blue-400 py-2 font-medium"
          >
            Incidents
          </Link>
          <Link
            to="/shelters"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-blue-400 py-2 font-medium"
          >
            Shelters
          </Link>

          {user ? (
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="text-sm text-slate-400 flex items-center gap-1">
                <User className="w-4 h-4 text-blue-400" /> {user.name || 'User'}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-rose-600/80 hover:bg-rose-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;