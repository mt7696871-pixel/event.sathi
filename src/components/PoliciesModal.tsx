import React, { useState } from 'react';
import { X, Shield, FileText, RotateCcw, AlertTriangle, ShieldAlert } from 'lucide-react';
import { LEGAL_POLICIES } from '../data/mockData';
import { cn } from '../lib/utils';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPolicyId?: string;
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({
  isOpen,
  onClose,
  defaultPolicyId = 'privacy'
}) => {
  const [activePolicyId, setActivePolicyId] = useState<string>(defaultPolicyId);

  if (!isOpen) return null;

  const currentPolicy = LEGAL_POLICIES.find((p) => p.id === activePolicyId) || LEGAL_POLICIES[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl my-auto border border-slate-200 flex flex-col max-h-[88vh] relative">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-teal-400" />
            <h2 className="font-serif font-bold text-lg text-white">EventSaathi Official Policies</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Policy Selector Tabs Sidebar */}
          <div className="bg-slate-50 w-full md:w-60 p-4 border-b md:border-b-0 md:border-r border-slate-200 shrink-0 space-y-1 overflow-x-auto md:overflow-y-auto">
            {LEGAL_POLICIES.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePolicyId(p.id)}
                className={cn(
                  "w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between",
                  activePolicyId === p.id
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <span>{p.title}</span>
              </button>
            ))}
          </div>

          {/* Policy Content Reader */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-xl font-serif font-bold text-slate-900">{currentPolicy.title}</h3>
            </div>

            {currentPolicy.id === 'alcohol' && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block mb-0.5">Strict Non-Alcohol Standard:</strong>
                  EventSaathi packages do NOT contain or sell alcohol. All purchases are handled directly on-site with licensed venue operators in accordance with law.
                </div>
              </div>
            )}

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              {currentPolicy.content.map((paragraph, idx) => (
                <p key={idx} className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
