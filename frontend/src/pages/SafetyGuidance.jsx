import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { ShieldCheck, AlertTriangle, LifeBuoy } from 'lucide-react';

const SafetyGuidance = () => {
  const { lang } = useContext(LanguageContext);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 text-slate-100">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-blue-400">
          🛡️ {lang === 'en' ? 'Flood Safety & Evacuation Guidance' : 'ගංවතුර ආරක්ෂිත සහ ඉවත් වීමේ උපදෙස්'}
        </h1>
        <p className="text-slate-400 text-sm">
          {lang === 'en' 
            ? 'Essential safety measures before, during, and after a flood disaster.' 
            : 'ගංවතුර ආපදාවකට පෙර, අතරතුර සහ පසුව අනුගමනය කළ යුතු අත්‍යවශ්‍ය ආරක්ෂිත පියවර.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* BEFORE FLOOD */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center space-x-2 text-amber-400">
            <ShieldCheck className="w-6 h-6 shrink-0" />
            <h2 className="font-bold text-lg">{lang === 'en' ? 'Before a Flood' : 'ආපදාවකට පෙර'}</h2>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li>{lang === 'en' ? 'Prepare an emergency kit (Documents, Water, Medicine, Torch).' : 'හදිසි ආපදා බෑගයක් සූදානම් කර තබාගන්න (ලේඛන, ජලය, ඖෂධ, විදුලි පන්දම්).'}</li>
            <li>{lang === 'en' ? 'Know your area evacuation routes and safe shelter locations.' : 'ඔබගේ ප්‍රදේශයේ ආරක්ෂිත මධ්‍යස්ථාන සහ ඉවත් වීමේ මාර්ග හඳුනාගන්න.'}</li>
            <li>{lang === 'en' ? 'Keep mobile phones and power banks fully charged.' : 'දුරකථන සහ Power Banks සම්පූර්ණයෙන්ම ඡාර්ජ් කර තබන්න.'}</li>
            <li>{lang === 'en' ? 'Secure main electricity switches and gas valves.' : 'ප්‍රධාන විදුලි ස්විච සහ ගෑස් වෑල්ව අක්‍රිය කරන්න.'}</li>
          </ul>
        </div>

        {/* DURING FLOOD */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center space-x-2 text-rose-500">
            <AlertTriangle className="w-6 h-6 shrink-0 animate-pulse" />
            <h2 className="font-bold text-lg">{lang === 'en' ? 'During a Flood' : 'ආපදාව අතරතුර'}</h2>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li>{lang === 'en' ? 'Move immediately to higher ground or a designated shelter.' : 'වහාම උස් ස්ථානයකට හෝ ආපදා මධ්‍යස්ථානයකට යන්න.'}</li>
            <li>{lang === 'en' ? 'NEVER walk or drive through moving floodwaters.' : 'ගලන ගංවතුර හරහා කිසිවිටෙකත් ගමන් නොකරන්න හෝ රථ වාහන නොපදවන්න.'}</li>
            <li>{lang === 'en' ? 'Stay clear of fallen power lines and electrical wires.' : 'කඩාවැටුණු විදුලි රැහැන් සහ කණු වලින් ඈත්ව සිටින්න.'}</li>
            <li>{lang === 'en' ? 'Listen to official FloodGuard alerts and instructions.' : 'නිල ගංවතුර අනතුරු ඇඟවීම් පිළිබඳව නිරන්තරයෙන් අවධානයෙන් සිටින්න.'}</li>
          </ul>
        </div>

        {/* AFTER FLOOD */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center space-x-2 text-emerald-400">
            <LifeBuoy className="w-6 h-6 shrink-0" />
            <h2 className="font-bold text-lg">{lang === 'en' ? 'After a Flood' : 'ආපදාවෙන් පසුව'}</h2>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li>{lang === 'en' ? 'Return home ONLY when authorities declare it safe.' : 'බලධාරීන් ආරක්ෂිත බව දැනුම් දෙන තෙක් නිවසට නොයන්න.'}</li>
            <li>{lang === 'en' ? 'Boil all drinking water before consumption.' : 'පානීය ජලය භාවිතයට පෙර හොඳින් තම්බා ගන්න.'}</li>
            <li>{lang === 'en' ? 'Check for structural damage before entering buildings.' : 'ගොඩනැගිලිවලට ඇතුළු වීමට පෙර හානි සිදුව ඇත්දැයි පරීක්ෂා කරන්න.'}</li>
            <li>{lang === 'en' ? 'Beware of snakes and dangerous animals in receded water.' : 'වතුර බැසගිය පසු සර්පයන් ඇතුළු සතුන්ගෙන් ආරක්ෂා වන්න.'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidance;