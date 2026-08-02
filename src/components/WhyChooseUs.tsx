import React from 'react';
import { 
  ShieldCheck, 
  BadgeCheck, 
  Zap, 
  Lock, 
  Sliders, 
  Sparkles, 
  Tag, 
  Headphones, 
  Globe 
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/mockData';

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-teal-600" />,
  BadgeCheck: <BadgeCheck className="w-6 h-6 text-teal-600" />,
  Zap: <Zap className="w-6 h-6 text-teal-600" />,
  Lock: <Lock className="w-6 h-6 text-teal-600" />,
  Sliders: <Sliders className="w-6 h-6 text-teal-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-teal-600" />,
  Tag: <Tag className="w-6 h-6 text-teal-600" />,
  Headphones: <Headphones className="w-6 h-6 text-teal-600" />,
  Globe: <Globe className="w-6 h-6 text-teal-600" />,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-16 md:py-24 px-4 sm:px-6 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
            Unmatched Quality
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Why Choose EventSaathi
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            We simplify event management so you can focus strictly on celebrating. Here is why thousands trust us for their special moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                {ICON_MAP[item.icon] || <ShieldCheck className="w-6 h-6 text-teal-600" />}
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
