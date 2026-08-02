import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export const AlcoholDisclaimerBanner: React.FC<{ onOpenPolicy?: () => void }> = ({ onOpenPolicy }) => {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white font-semibold">Important Notice:</strong> Alcohol is <strong className="text-amber-300">NOT included</strong> in any EventSaathi package or add-on. Purchases, if available, are made directly with the licensed venue.
          </span>
        </div>
        {onOpenPolicy && (
          <button 
            onClick={onOpenPolicy}
            className="text-teal-400 hover:text-teal-300 underline font-medium text-[11px] shrink-0"
          >
            Read Alcohol Policy & Rules
          </button>
        )}
      </div>
    </div>
  );
};
