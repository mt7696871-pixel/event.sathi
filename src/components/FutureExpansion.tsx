import React from 'react';
import { 
  Film, 
  Building, 
  Palmtree, 
  MapPin, 
  Waves, 
  Compass, 
  Sparkles, 
  PartyPopper 
} from 'lucide-react';
import { FUTURE_EXPANSION } from '../data/mockData';

const ICON_MAP: Record<string, React.ReactNode> = {
  Film: <Film className="w-5 h-5 text-amber-400" />,
  Building: <Building className="w-5 h-5 text-teal-400" />,
  Palmtree: <Palmtree className="w-5 h-5 text-emerald-400" />,
  MapPin: <MapPin className="w-5 h-5 text-rose-400" />,
  Waves: <Waves className="w-5 h-5 text-sky-400" />,
  Compass: <Compass className="w-5 h-5 text-indigo-400" />,
};

export const FutureExpansion: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Roadmap
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
            Future Expansion — Coming Soon
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            We are rapidly expanding our partner footprint. Here is what is launching next across major metro hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FUTURE_EXPANSION.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 hover:border-amber-500/50 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700">
                {ICON_MAP[item.icon] || <Sparkles className="w-5 h-5 text-amber-400" />}
              </div>
              <h3 className="font-serif font-bold text-white text-lg">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              <span className="inline-block text-[10px] font-bold text-amber-400 uppercase tracking-widest pt-2">
                Launching Next Q3
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
