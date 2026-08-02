import React, { useState } from 'react';
import { 
  Store, 
  DollarSign, 
  Calendar, 
  Package, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Image as ImageIcon, 
  Tag, 
  TrendingUp, 
  Clock, 
  Users, 
  Plus, 
  Edit2
} from 'lucide-react';
import { Booking } from '../types';
import { cn } from '../lib/utils';

interface VendorDashboardProps {
  bookings: Booking[];
  onApproveBooking?: (id: string) => void;
  onRejectBooking?: (id: string) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({
  bookings,
  onApproveBooking,
  onRejectBooking
}) => {
  const [vendorTab, setVendorTab] = useState<string>('requests');
  const [vendorName, setVendorName] = useState<string>('Aura Rooftop & Grill');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Vendor Stats
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 p-6 rounded-3xl border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                Vendor Portal
              </span>
              <h1 className="text-2xl font-serif font-bold text-white">{vendorName}</h1>
              <p className="text-xs text-slate-400">Manage venue packages, availability calendar & booking requests</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-700 text-right">
              <span className="text-slate-400 block text-[10px] uppercase">Total Revenue</span>
              <span className="text-teal-400 text-lg font-serif">₹{totalRevenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-700 text-right">
              <span className="text-slate-400 block text-[10px] uppercase">Bookings</span>
              <span className="text-amber-400 text-lg font-serif">{confirmedBookings.length} Active</span>
            </div>
          </div>
        </div>

        {/* Vendor Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'requests', label: 'Booking Requests', icon: <Calendar className="w-4 h-4" /> },
            { id: 'packages', label: 'Manage Packages & Pricing', icon: <Package className="w-4 h-4" /> },
            { id: 'calendar', label: 'Availability Calendar', icon: <Clock className="w-4 h-4" /> },
            { id: 'revenue', label: 'Revenue & Payouts', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'reviews', label: 'Customer Reviews (4.8 ★)', icon: <Star className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setVendorTab(tab.id)}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
                vendorTab === tab.id
                  ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                  : "bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: BOOKING REQUESTS */}
        {vendorTab === 'requests' && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-bold text-white">Incoming Celebration Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <div key={b.id} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase border border-amber-500/30">
                        {b.celebrationType}
                      </span>
                      <h3 className="font-bold text-white text-base mt-2">{b.customerName} ({b.guestCount} Guests)</h3>
                      <p className="text-xs text-slate-400">{b.phone} • {b.email}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-teal-400 bg-slate-900 px-2.5 py-1 rounded-lg">
                      {b.bookingRef}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-3 rounded-2xl text-xs border border-slate-700/60">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Event Date</span>
                      <span className="font-bold text-white">{b.eventDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Time Slot</span>
                      <span className="font-bold text-white">{b.timeSlot}</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1 text-slate-300">
                    <div>Package Chosen: <strong className="text-white">{b.packageName}</strong> (₹{b.packagePrice.toLocaleString('en-IN')})</div>
                    <div>Add-Ons: <strong className="text-white">{b.selectedAddOns.map(a => a.name).join(', ') || 'None'}</strong></div>
                    <div className="pt-2 font-bold text-teal-400 flex justify-between">
                      <span>Total Value: ₹{b.totalAmount.toLocaleString('en-IN')}</span>
                      <span>Advance Received: ₹{b.advancePaid.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Status: {b.status}
                    </span>
                    <button
                      onClick={() => alert(`Accepted booking request ${b.bookingRef}`)}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl"
                    >
                      Accept Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PACKAGES */}
        {vendorTab === 'packages' && (
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-serif font-bold text-white">Manage Packages & Tier Rates</h2>
              <button
                onClick={() => alert('New Custom Package Creator Opened')}
                className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Package
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Basic Seating Pass', price: 799, status: 'Active' },
                { name: 'Silver Table & Mocktail', price: 1499, status: 'Active' },
                { name: 'Gold VIP Skyline Package', price: 2999, status: 'Active' },
              ].map((p, idx) => (
                <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-slate-700 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-white">{p.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {p.status}
                    </span>
                  </div>
                  <div className="text-2xl font-serif font-bold text-amber-400">
                    ₹{p.price.toLocaleString('en-IN')}
                  </div>
                  <button
                    onClick={() => alert(`Edit rates for ${p.name}`)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit Inclusions & Price
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CALENDAR */}
        {vendorTab === 'calendar' && (
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 space-y-4">
            <h2 className="text-lg font-serif font-bold text-white">Availability & Block Dates</h2>
            <p className="text-xs text-slate-400">Mark dates or time slots as fully booked to avoid double reservations.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Today', 'Tomorrow', 'This Weekend', 'Next Weekend'].map((day, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-2xl border border-slate-700 text-center space-y-2">
                  <div className="font-bold text-sm text-white">{day}</div>
                  <span className="px-2 py-1 rounded-md bg-teal-500/20 text-teal-300 font-bold text-[10px] block">
                    3 Slots Open
                  </span>
                  <button
                    onClick={() => alert(`Toggled availability for ${day}`)}
                    className="text-[11px] font-bold text-amber-400 hover:underline"
                  >
                    Block Date
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REVENUE */}
        {vendorTab === 'revenue' && (
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 space-y-4">
            <h2 className="text-lg font-serif font-bold text-white">Revenue & Bank Payouts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700">
                <span className="text-slate-400 uppercase text-[10px] block">Total Gross Bookings</span>
                <span className="text-2xl font-serif text-white">₹{(totalRevenue * 1.1).toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700">
                <span className="text-slate-400 uppercase text-[10px] block">Commission (10%)</span>
                <span className="text-2xl font-serif text-rose-400">-₹{(totalRevenue * 0.1).toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700">
                <span className="text-slate-400 uppercase text-[10px] block">Net Bank Payout</span>
                <span className="text-2xl font-serif text-teal-400">₹{totalRevenue.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
