import React, { useState } from 'react';
import { 
  Sparkles, 
  Cake, 
  Camera, 
  Music, 
  Zap, 
  Gift, 
  Car, 
  Utensils, 
  Plus, 
  Check, 
  Info,
  ShieldAlert
} from 'lucide-react';
import { ADD_ON_CATEGORIES } from '../data/mockData';
import { AddOnOption } from '../types';
import { cn } from '../lib/utils';

interface AddOnServicesProps {
  onCustomiseBooking: (addOns?: AddOnOption[]) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Decoration: <Sparkles className="w-4 h-4 text-amber-500" />,
  Cake: <Cake className="w-4 h-4 text-rose-500" />,
  Photography: <Camera className="w-4 h-4 text-blue-500" />,
  Entertainment: <Music className="w-4 h-4 text-purple-500" />,
  'Special Effects': <Zap className="w-4 h-4 text-amber-600" />,
  'Gift Services': <Gift className="w-4 h-4 text-pink-500" />,
  Travel: <Car className="w-4 h-4 text-teal-600" />,
  'Food & Beverage': <Utensils className="w-4 h-4 text-emerald-600" />
};

export const AddOnServices: React.FC<AddOnServicesProps> = ({ onCustomiseBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('cat-decoration');
  const [previewSelectedAddOns, setPreviewSelectedAddOns] = useState<AddOnOption[]>([]);

  const activeCategory = ADD_ON_CATEGORIES.find((c) => c.id === selectedCategory) || ADD_ON_CATEGORIES[0];

  const toggleAddOnPreview = (option: AddOnOption) => {
    const exists = previewSelectedAddOns.some((item) => item.id === option.id);
    if (exists) {
      setPreviewSelectedAddOns(previewSelectedAddOns.filter((item) => item.id !== option.id));
    } else {
      setPreviewSelectedAddOns([...previewSelectedAddOns, option]);
    }
  };

  const previewTotal = previewSelectedAddOns.reduce((sum, item) => sum + item.price, 0);

  return (
    <section id="add-ons" className="py-16 md:py-24 px-4 sm:px-6 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
            Customization Hub
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Add-On Services
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Customize every celebration to perfection. Mix and match decorations, custom cakes, live acoustic guitarists, DSLR photo shoots, and special effects.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {ADD_ON_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2",
                selectedCategory === cat.id
                  ? "bg-teal-600 text-white border-teal-600 shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              )}
            >
              {CATEGORY_ICONS[cat.title] || <Sparkles className="w-4 h-4" />}
              <span>{cat.title}</span>
              <span className={cn(
                "px-1.5 py-0.2 rounded-full text-[10px]",
                selectedCategory === cat.id ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-600"
              )}>
                {cat.options.length}
              </span>
            </button>
          ))}
        </div>

        {/* Category Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {activeCategory.options.map((option) => {
            const isSelected = previewSelectedAddOns.some((i) => i.id === option.id);
            return (
              <div
                key={option.id}
                onClick={() => toggleAddOnPreview(option)}
                className={cn(
                  "p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 relative",
                  isSelected
                    ? "bg-teal-50/80 border-teal-500 shadow-md ring-2 ring-teal-500/20"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                )}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{option.name}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{option.description}</p>
                  <div className="pt-2">
                    <span className="text-sm font-extrabold text-teal-600">
                      +₹{option.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors mt-1",
                    isSelected ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Alcohol Disclaimer Alert Box */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <strong className="font-bold">Alcohol Policy Notice:</strong> Alcohol is <u>NOT included</u> in any EventSaathi package or add-on. If available, liquor can only be purchased directly at the venue subject to legal age limits and licensing.
            </div>
          </div>
        </div>

        {/* Interactive Customization Preview Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block mb-1">
              Custom Add-Ons Summary
            </span>
            <div className="text-xl md:text-2xl font-serif font-bold">
              {previewSelectedAddOns.length} Add-On{previewSelectedAddOns.length !== 1 ? 's' : ''} Selected
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Estimated Add-On Cost: <strong className="text-white">₹{previewTotal.toLocaleString('en-IN')}</strong>
            </p>
          </div>

          <button
            onClick={() => onCustomiseBooking(previewSelectedAddOns)}
            className="w-full sm:w-auto px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-teal-500/20 whitespace-nowrap"
          >
            Build Experience with Selected Add-Ons
          </button>
        </div>
      </div>
    </section>
  );
};
