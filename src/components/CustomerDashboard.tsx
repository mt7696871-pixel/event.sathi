import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  QrCode, 
  FileText, 
  RefreshCw, 
  XCircle, 
  Headphones, 
  Star, 
  Heart, 
  Users, 
  CheckCircle2, 
  Download,
  X,
  MessageSquare
} from 'lucide-react';
import { Booking, Venue } from '../types';
import { MOCK_VENUES } from '../data/mockData';
import { cn } from '../lib/utils';

interface CustomerDashboardProps {
  bookings: Booking[];
  wishlistIds: string[];
  onRemoveWishlist: (venueId: string) => void;
  onBookVenue: (venue: Venue) => void;
  onCancelBooking: (bookingId: string) => void;
  onRescheduleBooking: (bookingId: string, newDate: string, newSlot: string) => void;
  activeTab?: string;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  bookings,
  wishlistIds,
  onRemoveWishlist,
  onBookVenue,
  onCancelBooking,
  onRescheduleBooking,
  activeTab = 'bookings'
}) => {
  const [currentTab, setCurrentTab] = useState<string>(activeTab);
  const [selectedPass, setSelectedPass] = useState<Booking | null>(null);
  const [rescheduleBookingTarget, setRescheduleBookingTarget] = useState<Booking | null>(null);
  
  // Reschedule form inputs
  const [newDate, setNewDate] = useState<string>('');
  const [newSlot, setNewSlot] = useState<string>('07:00 PM - 10:00 PM');

  // Support ticket form
  const [supportMessage, setSupportMessage] = useState<string>('');
  const [supportSent, setSupportSent] = useState<boolean>(false);

  const wishlistedVenues = MOCK_VENUES.filter((v) => wishlistIds.includes(v.id));

  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-1">
              Customer Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
              My Celebrations Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage upcoming celebrations, view QR passes, download invoices & access support.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-teal-50 px-4 py-2 rounded-2xl border border-teal-100 text-teal-800 text-xs font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>{bookings.filter(b => b.status === 'Confirmed').length} Active Bookings</span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {[
            { id: 'bookings', label: 'My Bookings', icon: <Calendar className="w-4 h-4" /> },
            { id: 'history', label: 'Booking History', icon: <FileText className="w-4 h-4" /> },
            { id: 'wishlist', label: `Saved Wishlist (${wishlistedVenues.length})`, icon: <Heart className="w-4 h-4" /> },
            { id: 'support', label: 'Support & Help', icon: <Headphones className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
                currentTab === tab.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: UPCOMING BOOKINGS */}
        {currentTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-lg font-serif font-bold text-slate-900">Upcoming Celebrations</h2>
            {bookings.filter(b => b.status === 'Confirmed').length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800">No Upcoming Celebrations</h3>
                <p className="text-xs text-slate-500">You don't have any confirmed bookings yet. Explore venues to plan your next event!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.filter(b => b.status === 'Confirmed').map((b) => (
                  <div key={b.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 font-bold text-[10px] uppercase border border-teal-200">
                            {b.celebrationType}
                          </span>
                          <h3 className="font-serif font-bold text-lg text-slate-900 mt-2">{b.venueName}</h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" /> {b.venueAddress}
                          </p>
                        </div>
                        <span className="text-xs font-mono font-bold bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700">
                          {b.bookingRef}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl text-xs">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Event Date</span>
                          <span className="font-bold text-slate-800">{b.eventDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Time Slot</span>
                          <span className="font-bold text-slate-800">{b.timeSlot}</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <div>Package: <strong className="text-slate-900">{b.packageName}</strong></div>
                        <div>Add-Ons: <strong className="text-slate-900">{b.selectedAddOns.length} Items</strong></div>
                        <div className="pt-2 flex justify-between font-bold border-t border-slate-100">
                          <span>Total Experience Cost: ₹{b.totalAmount.toLocaleString('en-IN')}</span>
                          <span className="text-amber-600">Balance Due: ₹{b.balanceDue.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedPass(b)}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <QrCode className="w-4 h-4" /> View QR Pass
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setRescheduleBookingTarget(b);
                            setNewDate(b.eventDate);
                          }}
                          className="px-3 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl flex items-center gap-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-teal-600" /> Reschedule
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to cancel booking ${b.bookingRef}?`)) {
                              onCancelBooking(b.id);
                            }
                          }}
                          className="px-3 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs rounded-xl flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BOOKING HISTORY */}
        {currentTab === 'history' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-serif font-bold text-slate-900">Past & Cancelled Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Ref Code</th>
                    <th className="py-3 px-4">Venue & Celebration</th>
                    <th className="py-3 px-4">Date & Slot</th>
                    <th className="py-3 px-4">Total Paid</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{b.bookingRef}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{b.venueName}</div>
                        <div className="text-[11px] text-slate-500">{b.celebrationType}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div>{b.eventDate}</div>
                        <div className="text-[10px] text-slate-400">{b.timeSlot}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">₹{b.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                          b.status === 'Confirmed' ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        )}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => alert(`Invoice downloaded for ${b.bookingRef}`)}
                          className="text-teal-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: WISHLIST */}
        {currentTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="text-lg font-serif font-bold text-slate-900">Saved Venues</h2>
            {wishlistedVenues.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
                <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800">Your Wishlist is Empty</h3>
                <p className="text-xs text-slate-500">Heart any venue while exploring to save it for future parties!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wishlistedVenues.map((v) => (
                  <div key={v.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-4 space-y-3">
                    <img src={v.image} alt={v.name} className="w-full h-40 object-cover rounded-2xl" />
                    <div>
                      <h4 className="font-bold text-slate-900">{v.name}</h4>
                      <p className="text-xs text-slate-500">{v.area}, {v.city}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        onClick={() => onBookVenue(v)}
                        className="px-3.5 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl"
                      >
                        Book Now
                      </button>
                      <button
                        onClick={() => onRemoveWishlist(v.id)}
                        className="text-xs text-rose-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SUPPORT */}
        {currentTab === 'support' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
            <div className="text-center space-y-1">
              <Headphones className="w-10 h-10 text-teal-600 mx-auto" />
              <h2 className="text-2xl font-serif font-bold text-slate-900">24/7 EventSaathi Help Desk</h2>
              <p className="text-xs text-slate-500">Need help customizing decor, changing guest count, or contacting venue?</p>
            </div>

            {supportSent ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-center text-xs font-bold space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600" />
                <p>Support message sent successfully! Our coordinator will contact you on WhatsApp/Call within 15 minutes.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSupportSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Query / Issue</label>
                  <textarea
                    rows={4}
                    required
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Describe your question or special request for your upcoming celebration..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Send Message to Coordinator
                </button>
              </form>
            )}
          </div>
        )}

        {/* QR Pass Viewer Modal */}
        {selectedPass && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 text-white w-full max-w-md rounded-3xl p-6 relative border border-slate-800 space-y-4">
              <button
                onClick={() => setSelectedPass(null)}
                className="absolute top-4 right-4 p-2 bg-slate-800 text-white rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">Official QR Booking Pass</span>
                <h3 className="font-serif font-bold text-xl text-white">{selectedPass.venueName}</h3>
                <p className="text-xs text-slate-400">{selectedPass.bookingRef}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl text-center space-y-2 text-slate-900">
                <QrCode className="w-32 h-32 mx-auto stroke-[1.5]" />
                <span className="text-[10px] font-mono font-bold block tracking-widest">{selectedPass.qrCodeValue}</span>
              </div>

              <div className="text-xs space-y-1 text-slate-300 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                <div>Date: <strong className="text-white">{selectedPass.eventDate}</strong></div>
                <div>Slot: <strong className="text-white">{selectedPass.timeSlot}</strong></div>
                <div>Guest Name: <strong className="text-white">{selectedPass.customerName}</strong></div>
                <div>Advance Paid: <strong className="text-teal-400">₹{selectedPass.advancePaid.toLocaleString('en-IN')}</strong></div>
                <div>Balance at Venue: <strong className="text-amber-400">₹{selectedPass.balanceDue.toLocaleString('en-IN')}</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {rescheduleBookingTarget && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-6 relative border border-slate-200 space-y-4">
              <button
                onClick={() => setRescheduleBookingTarget(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif font-bold text-xl">Reschedule Celebration</h3>
              <p className="text-xs text-slate-500">Select a new date and time slot for {rescheduleBookingTarget.bookingRef}</p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">New Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">New Time Slot</label>
                  <select
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none"
                  >
                    <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM (Lunch)</option>
                    <option value="04:00 PM - 07:00 PM">04:00 PM - 07:00 PM (High Tea)</option>
                    <option value="07:00 PM - 10:00 PM">07:00 PM - 10:00 PM (Prime Evening)</option>
                    <option value="08:30 PM - 11:30 PM">08:30 PM - 11:30 PM (Dinner & Party)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => {
                  onRescheduleBooking(rescheduleBookingTarget.id, newDate, newSlot);
                  setRescheduleBookingTarget(null);
                  alert('Booking rescheduled successfully!');
                }}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Confirm Free Reschedule
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
