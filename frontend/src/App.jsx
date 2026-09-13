import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Incidents from './pages/Incidents';
import Dashboard from './pages/Dashboard';
import Shelters from './pages/Shelters';
import EmergencyAssistance from './pages/EmergencyAssistance';
import VolunteerPortal from './pages/VolunteerPortal';
import AdminDashboard from './pages/AdminDashboard';
import EmergencyContacts from './pages/EmergencyContacts';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <Routes>
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reports" element={<Incidents />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/assistance" element={<EmergencyAssistance />} /> 
          <Route path="/volunteers" element={<VolunteerPortal />} />
          <Route path="/contacts" element={<EmergencyContacts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;