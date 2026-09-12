import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { LanguageContext } from '../context/LanguageContext';

const AdminDashboard = () => {
  const { lang } = useContext(LanguageContext);
  const [stats, setStats] = useState({
    totalReports: 0,
    verifiedReports: 0,
    totalRequests: 0,
    urgentRequests: 0,
    totalShelters: 0,
    activeVolunteers: 0
  });

  const [reports, setReports] = useState([]);
  const [broadcastMessage, setBroadcastMessage] = useState({ titleEn: '', titleSi: '', msgEn: '', msgSi: '' });
  const [alertStatus, setAlertStatus] = useState('');

  useEffect(() => {
    fetchStats();
    fetchReports();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/admin/stats');
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await API.get('/reports');
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyReport = async (id, status) => {
    try {
      await API.put(`/admin/reports/${id}/status`, { status });
      fetchReports();
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBroadcastAlert = async (e) => {
    e.preventDefault();
    try {
      await API.post('/admin/broadcast-alert', {
        title: { en: broadcastMessage.titleEn, si: broadcastMessage.titleSi },
        message: { en: broadcastMessage.msgEn, si: broadcastMessage.msgSi },
        type: 'ALERT'
      });
      setAlertStatus(lang === 'en' ? 'Alert broadcasted successfully!' : 'අනතුරු ඇඟවීම සාර්ථකව නිකුත් කරන ලදී!');
      setBroadcastMessage({ titleEn: '', titleSi: '', msgEn: '', msgSi: '' });
    } catch (err) {
      setAlertStatus(lang === 'en' ? 'Failed to broadcast alert.' : 'අනතුරු ඇඟවීම නිකුත් කිරීම අසාර්ථක විය.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 text-white">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-amber-500">
          ⚙️ {lang === 'en' ? 'Admin Disaster Operations Control' : 'ආපදා කළමනාකරණ පාලක පුවරුව'}
        </h1>
        <p className="text-slate-300 text-sm">
          {lang === 'en' 
            ? 'Monitor disaster reports, manage shelters, verify incidents, and broadcast system-wide alerts.' 
            : 'ආපදා වාර්තා පරීක්ෂා කිරීම, තහවුරු කිරීම සහ සජීවී අනතුරු ඇඟවීම් නිකුත් කිරීම මෙතැනින් සිදු කරන්න.'}
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-amber-400">{stats.totalReports}</p>
          <p className="text-xs text-slate-400">{lang === 'en' ? 'Total Flood Reports' : 'සම්පූර්ණ ආපදා වාර්තා'}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-emerald-400">{stats.verifiedReports}</p>
          <p className="text-xs text-slate-400">{lang === 'en' ? 'Verified Incidents' : 'තහවුරු කළ වාර්තා'}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-rose-500">{stats.urgentRequests}</p>
          <p className="text-xs text-slate-400">{lang === 'en' ? 'Urgent Assistance Reqs' : 'අතිශය හදිසි ඉල්ලීම්'}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-blue-400">{stats.activeVolunteers}</p>
          <p className="text-xs text-slate-400">{lang === 'en' ? 'Available Volunteers' : 'සක්‍රීය ස්වේච්ඡා සේවකයින්'}</p>
        </div>
      </div>

      {/* Broadcast Alert Section */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-rose-400 border-b border-slate-800 pb-2">
          📢 {lang === 'en' ? 'Broadcast Emergency Flood Alert' : 'සජීවී ගංවතුර අනතුරු ඇඟවීමක් නිකුත් කරන්න'}
        </h2>
        
        {alertStatus && <div className="p-2.5 bg-blue-600/30 border border-blue-500 rounded text-xs text-center">{alertStatus}</div>}

        <form onSubmit={handleBroadcastAlert} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Title (English)"
              value={broadcastMessage.titleEn}
              onChange={(e) => setBroadcastMessage({ ...broadcastMessage, titleEn: e.target.value })}
              className="p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
            <input
              type="text"
              required
              placeholder="මාතෘකාව (සිංහල)"
              value={broadcastMessage.titleSi}
              onChange={(e) => setBroadcastMessage({ ...broadcastMessage, titleSi: e.target.value })}
              className="p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              rows="2"
              required
              placeholder="Message Description (English)"
              value={broadcastMessage.msgEn}
              onChange={(e) => setBroadcastMessage({ ...broadcastMessage, msgEn: e.target.value })}
              className="p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
            <textarea
              rows="2"
              required
              placeholder="විස්තරය (සිංහල)"
              value={broadcastMessage.msgSi}
              onChange={(e) => setBroadcastMessage({ ...broadcastMessage, msgSi: e.target.value })}
              className="p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-500 font-bold p-3 rounded-xl transition text-sm shadow-lg shadow-rose-600/30"
          >
            🚨 {lang === 'en' ? 'Send Emergency Alert to All Users' : 'සියලුම පරිශීලකයින්ට අනතුරු ඇඟවීම යවන්න'}
          </button>
        </form>
      </div>

      {/* Reports Verification Table */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-2">
          📑 {lang === 'en' ? 'Manage & Verify Flood Incident Reports' : 'ආපදා වාර්තා පරික්ෂා කිරීම සහ තහවුරු කිරීම'}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/50">
                <th className="p-3">Location</th>
                <th className="p-3">Water Level</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {reports.map((r) => (
                <tr key={r._id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold">{r.district || 'Galle'}</td>
                  <td className="p-3 text-amber-400">{r.waterLevel ? `${r.waterLevel} m` : 'N/A'}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 border border-red-500/30">
                      {r.severity || 'HIGH'}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-300">{r.status || 'Pending'}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleVerifyReport(r._id, 'Verified')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded font-bold transition"
                    >
                      {lang === 'en' ? 'Verify' : 'තහවුරු කරන්න'}
                    </button>
                    <button
                      onClick={() => handleVerifyReport(r._id, 'Resolved')}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1 rounded font-bold transition"
                    >
                      {lang === 'en' ? 'Resolve' : 'විසඳා ඇත'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;