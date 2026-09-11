import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center py-12 sm:py-20">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-400 mb-4 tracking-tight leading-tight">
                  Welcome to FloodGuard
                </h1>
                <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
                  Incident reporting and shelter management platform.
                </p>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;