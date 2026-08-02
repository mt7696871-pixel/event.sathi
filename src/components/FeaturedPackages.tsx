import React from 'react';
import { Sparkles, Check, PartyPopper, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { FEATURED_PACKAGES } from '../data/mockData';
import { ExperiencePackage } from '../types';
import { cn } from '../lib/utils';

interface FeaturedPackagesProps {
  onSelectPackage: (pkg: ExperiencePackage) => void;
}

export const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="py-16 md:py-24 px-4 sm:px-6 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider border border-teal-100">
            <Sparkles className="w-3.5 h-3.5" /> Carefully Curated TIERS
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Featured Celebration Packages
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Choose from five tiered experiences crafted to fit every celebration budget, from intimate casual setups to royal VIP custom galas.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {FEATURED_PACKAGES.map((pkg) => {
            const isHighlight = pkg.id === 'pkg-gold' || pkg.id === 'pkg-premium';
            return (
              <div
                key={pkg.id}
                className={cn(
                  "rounded-3xl p-6 flex flex-col justify-between border transition-all duration-300 relative group hover:-translate-y-1.5",
                  isHighlight 
                    ? "bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 text-white border-teal-500/50 shadow-2xl ring-2 ring-teal-500/30" 
                    : "bg-white text-slate-900 border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-500/50"
                )}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="mb-4">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", pkg.badgeColor)}>
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl leading-snug">{pkg.title}</h3>
                    <p className={cn("text-xs mt-1 line-clamp-2 leading-relaxed", isHighlight ? "text-slate-300" : "text-slate-500")}>
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price Banner */}
                  <div className={cn("p-3 rounded-2xl border", isHighlight ? "bg-white/10 border-white/10" : "bg-slate-50 border-slate-100")}>
                    <span className={cn("text-[10px] font-bold uppercase block", isHighlight ? "text-teal-300" : "text-slate-400")}>
                      Starting From
                    </span>
                    <span className={cn("text-2xl font-bold font-serif", isHighlight ? "text-white" : "text-teal-600")}>
                      ₹{pkg.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2">
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider block", isHighlight ? "text-slate-400" : "text-slate-400")}>
                      Included Features
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <Check className={cn("w-4 h-4 shrink-0 mt-0.5 stroke-[2.5]", isHighlight ? "text-teal-400" : "text-teal-600")} />
                        <span className={isHighlight ? "text-slate-200" : "text-slate-700"}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="mt-8 pt-4 border-t border-slate-100/20">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={cn(
                      "w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md",
                      isHighlight
                        ? "bg-teal-500 hover:bg-teal-400 text-white shadow-teal-500/20"
                        : "bg-slate-900 hover:bg-teal-600 text-white shadow-slate-900/10"
                    )}
                  >
                    <span>Select {pkg.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
