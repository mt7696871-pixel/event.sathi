import React from 'react';
import { 
  PartyPopper, 
  Building2, 
  Package, 
  Sparkles, 
  Calendar, 
  UserCheck, 
  CreditCard, 
  QrCode, 
  PartyPopper as CelebrationIcon,
  ChevronRight
} from 'lucide-react';

export const BookingProcess: React.FC = () => {
  const steps = [
    { num: '01', title: 'Choose Celebration', desc: 'Birthday, Anniversary, Date, Proposal', icon: <PartyPopper className="w-5 h-5 text-teal-600" /> },
    { num: '02', title: 'Select Venue', desc: 'Clubs, Rooftops, Private Theatre, Resort', icon: <Building2 className="w-5 h-5 text-teal-600" /> },
    { num: '03', title: 'Choose Package', desc: 'Basic, Silver, Gold, Premium, Luxury', icon: <Package className="w-5 h-5 text-teal-600" /> },
    { num: '04', title: 'Select Add-Ons', desc: 'Cake, Decor, Singer, Photo, Effects', icon: <Sparkles className="w-5 h-5 text-teal-600" /> },
    { num: '05', title: 'Date & Time Slot', desc: 'Select preferred day & event duration', icon: <Calendar className="w-5 h-5 text-teal-600" /> },
    { num: '06', title: 'Customer Details', desc: 'Name, Mobile, Email & Guest Count', icon: <UserCheck className="w-5 h-5 text-teal-600" /> },
    { num: '07', title: 'Pay Advance', desc: '15-20% secure advance & coupon discount', icon: <CreditCard className="w-5 h-5 text-teal-600" /> },
    { num: '08', title: 'Confirmation Pass', desc: 'Instant QR code pass sent to Phone & Email', icon: <QrCode className="w-5 h-5 text-teal-600" /> },
    { num: '09', title: 'Visit & Celebrate!', desc: 'Show QR pass at venue & enjoy your event', icon: <CelebrationIcon className="w-5 h-5 text-amber-500" /> },
  ];

  return (
    <section id="booking-steps" className="py-16 md:py-24 px-4 sm:px-6 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider border border-teal-100">
            Simple 9-Step Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            How Booking Works on EventSaathi
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            From discovering the venue to customized decor and instant QR pass generation, our seamless booking flow takes less than 3 minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-teal-500/50 hover:bg-white hover:shadow-lg transition-all duration-300 relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-2xl font-serif font-bold text-slate-300 group-hover:text-teal-600 transition-colors">
                  {step.num}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-1">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
