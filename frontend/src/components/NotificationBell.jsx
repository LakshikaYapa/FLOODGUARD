import React, { useState, useEffect, useContext, useRef } from 'react';
import API from '../services/api';
import { LanguageContext } from '../context/LanguageContext';

const NotificationBell = () => {
  const { lang } = useContext(LanguageContext);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      const res = await API.get('/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications(
        notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-300 hover:text-white transition rounded-full hover:bg-slate-800/60 focus:outline-none"
        title="Notifications"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl z-[1100] overflow-hidden backdrop-blur-lg">
          <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
              <span>📢</span>
              <span>{lang === 'en' ? 'Notifications' : 'දැනුම්දීම්'}</span>
            </h3>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 font-semibold px-2 py-0.5 rounded-full">
                {unreadCount} {lang === 'en' ? 'New' : 'අලුත්'}
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
            {notifications.length === 0 ? (
              <p className="p-6 text-center text-xs text-slate-400">
                {lang === 'en' ? 'No notifications available.' : 'දැනුම්දීම් කිසිවක් නැත.'}
              </p>
            ) : (
              notifications.map((item) => (
                <div
                  key={item._id}
                  onClick={() => !item.isRead && markAsRead(item._id)}
                  className={`p-3.5 transition cursor-pointer hover:bg-slate-800/50 space-y-1 ${
                    !item.isRead ? 'bg-slate-800/30' : 'opacity-70'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      {item.type === 'ALERT' && '🚨'}
                      {item.type === 'REQUEST_UPDATE' && '🆘'}
                      {item.type === 'SHELTER_UPDATE' && '🏠'}
                      {item.type === 'GENERAL' && 'ℹ️'}
                      <span>{lang === 'si' ? item.title?.si || item.title?.en : item.title?.en}</span>
                    </h4>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {lang === 'si' ? item.message?.si || item.message?.en : item.message?.en}
                  </p>
                  <span className="text-[9px] text-slate-500 block pt-1">
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;