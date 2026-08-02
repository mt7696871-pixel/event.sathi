import React, { useState } from 'react';
import { 
  PartyPopper, 
  Phone, 
  MessageCircle, 
  Mail, 
  Instagram, 
  Facebook, 
  MapPin, 
  ShieldCheck, 
  ExternalLink,
  X
} from 'lucide-react';

interface FooterProps {
  onOpenPolicy: (policyId: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPolicy,
  onNavigateSection,
  onBookClick
}) => {
  const [mapModalOpen, setMapModalOpen] = useState(false);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 px-4 sm:px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20">
                <PartyPopper className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">EventSaathi</span>
            </div>

            <p className="text-sm font-semibold text-teal-400">
              One Platform. Every Celebration.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Discover. Customize. Book. Celebrate. The premier celebration booking engine for birthdays, anniversaries, date nights, proposals, and private parties.
            </p>

            {/* Alcohol Disclaimer Small */}
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-[11px] text-slate-400">
              <strong className="text-amber-400 font-bold block mb-0.5">Alcohol Policy Disclaimer:</strong>
              Alcohol is NOT included in any package or add-on. If available, liquor is purchased directly from licensed venues on-site.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateSection('celebrations')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Choose Celebration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('venues')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Explore Venues
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('packages')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Featured Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('add-ons')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Add-On Customizer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('booking-steps')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  How Booking Works
                </button>
              </li>
              <li>
                <button onClick={onBookClick} className="text-teal-400 font-bold hover:underline">
                  Book Experience Now →
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Contact Us</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-emerald-300 underline">
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>support@eventsaathi.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@eventsaathi_official</span>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>facebook.com/eventsaathi</span>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => setMapModalOpen(true)}
                  className="flex items-center gap-1.5 text-teal-400 hover:underline font-bold text-xs"
                >
                  <MapPin className="w-4 h-4" /> View HQ on Google Maps
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Policies</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onOpenPolicy('privacy')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('terms')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('refund')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('cancellation')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('reschedule')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Reschedule Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('vendor')} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Vendor Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('alcohol')} className="text-amber-400 font-bold hover:underline">
                  Alcohol Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 <strong>EventSaathi</strong>. All rights reserved. Built for unforgettable celebrations.
          </div>
          <div className="flex items-center gap-4">
            <span>Verified Venue Network</span>
            <span>•</span>
            <span>256-Bit Encrypted Payments</span>
          </div>
        </div>
      </div>

      {/* Google Maps Location Modal */}
      {mapModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white w-full max-w-lg rounded-3xl p-6 border border-slate-800 relative space-y-4">
            <button
              onClick={() => setMapModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-400" />
              <h3 className="font-serif font-bold text-lg">EventSaathi Headquarters</h3>
            </div>

            <p className="text-xs text-slate-400">
              Tower B, DLF Cyber City, Gurugram, Delhi NCR - 122002, India
            </p>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
              <MapPin className="w-10 h-10 text-teal-400 mx-auto" />
              <div className="font-bold text-sm text-white">Google Maps Location Pin</div>
              <p className="text-xs text-slate-400">Coordinates: 28.4950° N, 77.0895° E</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl mt-2"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
