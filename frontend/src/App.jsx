import React from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full space-y-4">
        <div className="flex justify-center">
          <ShieldAlert className="w-16 h-16 text-blue-500 animate-pulse" />
        </div>
        
        <h1 className="text-3xl font-bold tracking-wide text-blue-400">
          FloodGuard System
        </h1>
        
        <div className="flex items-center justify-center space-x-2 bg-emerald-500/10 text-emerald-400 py-2 px-4 rounded-lg border border-emerald-500/20">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Tailwind CSS is Working Perfectly!</span>
        </div>

        <p className="text-slate-400 text-sm">
          MERN Stack Incident Reporting & Management Platform Setup Completed.
        </p>

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg shadow-blue-500/30">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;