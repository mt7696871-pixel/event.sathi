import React, { useState } from 'react';
import { Search, MapPin, Calendar, PartyPopper, Sparkles, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { CelebrationType, VenueType } from '../types';
import { CELEBRATION_TYPES, VENUE_TYPES } from '../data/mockData';

interface HeroProps {
  onBookNow: (celebration?: CelebrationType, venueType?: VenueType, city?: string) => void;
  onExploreVenues: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookNow, onExploreVenues }) => {
  const [selectedCelebration, setSelectedCelebration] = useState<string>('');
  const [selectedVenueType, setSelectedVenueType] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('Delhi NCR');

  const CITIES = ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Goa', 'Jaipur', 'Lucknow', 'Pune'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookNow(
      selectedCelebration as CelebrationType || undefined,
      selectedVenueType as VenueType || undefined,
      selectedCity
    );
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/50 via-slate-50 to-white">
      {/* Background Glow Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-teal-200/30 via-amber-200/20 to-teal-300/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold tracking-wide border border-teal-200 shadow-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>One Platform, Every Celebration</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Celebrate Every Moment with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-700 to-amber-600">EventSaathi</span>
          </h1>

          {/* Sub Heading */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Book the best Clubs, Bars, Rooftops, Private Theatres, Cafes, Restaurants and Celebration Venues in one place.
          </p>

          {/* Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onBookNow()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold text-base hover:from-teal-700 hover:to-teal-800 transition-all shadow-xl shadow-teal-600/25 active:scale-95 flex items-center justify-center gap-2"
            >
              <PartyPopper className="w-5 h-5" />
              <span>Book Now</span>
            </button>
            <button
              onClick={onExploreVenues}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-800 font-bold text-base hover:bg-slate-100 border border-slate-200 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <Building2 className="w-5 h-5 text-teal-600" />
              <span>Explore Venues</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>100% Verified Venues</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Instant Confirmation Pass</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Customizable Add-On Services</span>
            </div>
          </div>
        </div>

        {/* Quick Search Widget */}
        <div className="mt-12 max-w-5xl mx-auto bg-white rounded-3xl p-4 sm:p-6 shadow-2xl shadow-slate-200/60 border border-slate-100">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Celebration Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <PartyPopper className="w-3.5 h-3.5 text-teal-600" /> Celebration
              </label>
              <select
                value={selectedCelebration}
                onChange={(e) => setSelectedCelebration(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="">All Celebrations</option>
                {CELEBRATION_TYPES.map((c) => (
                  <option key={c.type} value={c.type}>
                    {c.type}
                  </option>
                ))}
              </select>
            </div>

            {/* Venue Type Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-teal-600" /> Venue Type
              </label>
              <select
                value={selectedVenueType}
                onChange={(e) => setSelectedVenueType(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="">All Venue Types</option>
                {VENUE_TYPES.map((v) => (
                  <option key={v.type} value={v.type}>
                    {v.type}
                  </option>
                ))}
              </select>
            </div>

            {/* City Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600" /> City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Find Venues CTA */}
            <div className="pt-2 md:pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Experiences</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
