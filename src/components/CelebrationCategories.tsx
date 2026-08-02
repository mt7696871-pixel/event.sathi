import React from 'react';
import { 
  Cake, 
  Heart, 
  Sparkles, 
  Users, 
  PartyPopper, 
  Wine, 
  Briefcase, 
  GraduationCap, 
  Baby, 
  Smile, 
  Gift,
  GlassWater,
  ArrowRight
} from 'lucide-react';
import { CelebrationType } from '../types';
import { CELEBRATION_TYPES } from '../data/mockData';

interface CelebrationCategoriesProps {
  onSelectCelebration: (celebration: CelebrationType) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Cake: <Cake className="w-6 h-6 text-rose-500" />,
  Heart: <Heart className="w-6 h-6 text-rose-600 fill-rose-50" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-500" />,
  Ring: <Sparkles className="w-6 h-6 text-teal-600" />,
  Users: <Users className="w-6 h-6 text-indigo-500" />,
  GlassWater: <GlassWater className="w-6 h-6 text-sky-500" />,
  PartyPopper: <PartyPopper className="w-6 h-6 text-amber-600" />,
  Wine: <Wine className="w-6 h-6 text-fuchsia-500" />,
  Briefcase: <Briefcase className="w-6 h-6 text-slate-700" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-blue-600" />,
  Baby: <Baby className="w-6 h-6 text-pink-500" />,
  Smile: <Smile className="w-6 h-6 text-orange-500" />,
  Gift: <Gift className="w-6 h-6 text-emerald-500" />,
};

export const CelebrationCategories: React.FC<CelebrationCategoriesProps> = ({ onSelectCelebration }) => {
  return (
    <section id="celebrations" className="py-16 md:py-24 px-4 sm:px-6 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider border border-teal-100">
            Tailored Experiences
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Choose Your Celebration
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Select the occasion you are celebrating today. We customize venue setups, cakes, music, and decorations for every unique milestone.
          </p>
        </div>

        {/* Categories Grid - 13 Celebrations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CELEBRATION_TYPES.map((item) => (
            <button
              key={item.type}
              onClick={() => onSelectCelebration(item.type)}
              className="group relative bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 text-left flex flex-col justify-between"
            >
              {item.popularTag && (
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[9px] uppercase tracking-wide">
                  {item.popularTag}
                </span>
              )}

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {ICON_MAP[item.icon] || <Sparkles className="w-6 h-6 text-teal-600" />}
                </div>

                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-teal-600 transition-colors leading-tight">
                    {item.type}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100/60 flex items-center gap-1 text-[11px] font-bold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Book This</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
