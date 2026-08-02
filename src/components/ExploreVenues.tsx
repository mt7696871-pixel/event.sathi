import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Star, 
  Users, 
  Sparkles, 
  Check, 
  Eye, 
  Heart, 
  Calendar, 
  X,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Venue, VenueType } from '../types';
import { MOCK_VENUES, VENUE_TYPES } from '../data/mockData';
import { cn } from '../lib/utils';

interface ExploreVenuesProps {
  onBookVenue: (venue: Venue) => void;
  wishlist: string[];
  onToggleWishlist: (venueId: string) => void;
  selectedCategoryFilter?: VenueType | '';
}

export const ExploreVenues: React.FC<ExploreVenuesProps> = ({
  onBookVenue,
  wishlist,
  onToggleWishlist,
  selectedCategoryFilter = ''
}) => {
  const [selectedType, setSelectedType] = useState<string>(selectedCategoryFilter || 'All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [detailModalVenue, setDetailModalVenue] = useState<Venue | null>(null);

  const CITIES = ['All', 'Delhi NCR', 'Mumbai', 'Bengaluru', 'Goa', 'Jaipur', 'Lucknow', 'Pune'];

  const filteredVenues = MOCK_VENUES.filter((venue) => {
    const matchesType = selectedType === 'All' || venue.type === selectedType;
    const matchesCity = selectedCity === 'All' || venue.city === selectedCity;
    return matchesType && matchesCity;
  });

  return (
    <section id="venues" className="py-16 md:py-24 px-4 sm:px-6 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" /> Curated Party Spaces
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              Explore Venues
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Handpicked clubs, rooftops, private theatres, farmhouses, and resorts. Filter by city or venue type to discover your dream setting.
            </p>
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <MapPin className="w-4 h-4 text-teal-600 ml-2" />
            <span className="text-xs font-bold text-slate-500 uppercase">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-900 outline-none pr-3 py-1 cursor-pointer"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Venue Type Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          <button
            onClick={() => setSelectedType('All')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border",
              selectedType === 'All'
                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
            )}
          >
            All Venues ({MOCK_VENUES.length})
          </button>
          {VENUE_TYPES.map((v) => {
            const count = MOCK_VENUES.filter((venue) => venue.type === v.type).length;
            return (
              <button
                key={v.type}
                onClick={() => setSelectedType(v.type)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5",
                  selectedType === v.type
                    ? "bg-teal-600 text-white border-teal-600 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
                )}
              >
                <span>{v.type}</span>
                {count > 0 && (
                  <span className={cn(
                    "px-1.5 py-0.2 rounded-full text-[10px]",
                    selectedType === v.type ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-600"
                  )}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Venues Grid */}
        {filteredVenues.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-slate-200 space-y-4">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Venues Found</h3>
            <p className="text-xs text-slate-500">
              We are adding new venues in {selectedCity} for {selectedType} every week. Try clearing filters to view available options.
            </p>
            <button
              onClick={() => { setSelectedType('All'); setSelectedCity('All'); }}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => {
              const isWishlisted = wishlist.includes(venue.id);
              return (
                <div
                  key={venue.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Image & Badges */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Venue Type Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 shadow-sm">
                      {venue.type}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(venue.id)}
                      className={cn(
                        "absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all",
                        isWishlisted ? "bg-rose-500 text-white" : "bg-white/80 text-slate-700 hover:bg-white"
                      )}
                      title="Save to Wishlist"
                    >
                      <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
                    </button>

                    {/* Rating & City Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1 font-bold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{venue.rating}</span>
                        <span className="text-slate-300 text-[10px]">({venue.reviewsCount})</span>
                      </div>
                      <div className="flex items-center gap-1 font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <MapPin className="w-3.5 h-3.5 text-teal-400" />
                        <span>{venue.area}, {venue.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-serif font-bold text-slate-900 text-lg group-hover:text-teal-600 transition-colors line-clamp-1">
                        {venue.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {venue.description}
                      </p>

                      {/* Features Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {venue.features.map((feat, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-semibold">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Starting @</span>
                        <span className="text-lg font-bold text-teal-600">₹{venue.priceStarting.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDetailModalVenue(venue)}
                          className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                        <button
                          onClick={() => onBookVenue(venue)}
                          className="px-4 py-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700 text-xs font-bold transition-all shadow-md shadow-teal-600/20"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Venue Detail Modal */}
        {detailModalVenue && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col relative">
              {/* Header Image */}
              <div className="relative h-64 bg-slate-900 shrink-0">
                <img
                  src={detailModalVenue.image}
                  alt={detailModalVenue.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setDetailModalVenue(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                  {detailModalVenue.type}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-2xl font-serif font-bold text-slate-900">{detailModalVenue.name}</h2>
                    <div className="flex items-center gap-1 text-sm font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span>{detailModalVenue.rating} ({detailModalVenue.reviewsCount} Reviews)</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{detailModalVenue.address}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About This Venue</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{detailModalVenue.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">Capacity</span>
                    <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Users className="w-4 h-4 text-teal-600" /> {detailModalVenue.capacity}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">Starting Experience Rate</span>
                    <span className="text-base font-bold text-teal-600">
                      ₹{detailModalVenue.priceStarting.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Venue Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {detailModalVenue.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <Check className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Ready to Celebrate?</span>
                  <span className="text-base font-bold text-slate-900">Custom packages available</span>
                </div>
                <button
                  onClick={() => {
                    const venue = detailModalVenue;
                    setDetailModalVenue(null);
                    onBookVenue(venue);
                  }}
                  className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20"
                >
                  Proceed to Book
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
