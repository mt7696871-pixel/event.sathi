import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  Store, 
  CreditCard, 
  Package, 
  Sparkles, 
  Tag, 
  FileText, 
  Percent, 
  RotateCcw, 
  Bell, 
  BarChart3, 
  CheckCircle2, 
  XCircle,
  Plus
} from 'lucide-react';
import { Booking, Coupon } from '../types';
import { MOCK_VENUES, MOCK_COUPONS } from '../data/mockData';
import { cn } from '../lib/utils';

interface AdminDashboardProps {
  bookings: Booking[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ bookings }) => {
  const [adminTab, setAdminTab] = useState<string>('overview');
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [newCouponCode, setNewCouponCode] = useState<string>('');
  const [newCouponDiscount, setNewCouponDiscount] = useState<number>(20);

  const totalGMV = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const platformCommission = Math.round(totalGMV * 0.12); // 12% commission

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const created: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: newCouponDiscount,
      maxDiscount: 1000,
      minSpend: 2000,
      description: `Flat ${newCouponDiscount}% OFF for EventSaathi users`
    };
    setCoupons([...coupons, created]);
    setNewCouponCode('');
    alert(`Coupon ${created.code} activated successfully!`);
  };

  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">
                Platform Admin Control
              </span>
              <h1 className="text-2xl font-serif font-bold text-white">EventSaathi Master Console</h1>
              <p className="text-xs text-slate-400">System overview, vendor payouts, commission tracking & coupon engine</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-right">
              <span className="text-slate-400 block text-[10px] uppercase">Total GMV</span>
              <span className="text-teal-400 text-lg font-serif">₹{totalGMV.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-right">
              <span className="text-slate-400 block text-[10px] uppercase">Net Commission (12%)</span>
              <span className="text-amber-400 text-lg font-serif">₹{platformCommission.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Admin Subtabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'overview', label: 'System Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'bookings', label: 'All Bookings', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'venues', label: 'Venues & Partners', icon: <Building2 className="w-4 h-4" /> },
            { id: 'coupons', label: 'Coupons & Offers', icon: <Tag className="w-4 h-4" /> },
            { id: 'reports', label: 'Commissions & Reports', icon: <Percent className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
                adminTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md font-bold"
                  : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: SYSTEM OVERVIEW */}
        {adminTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase">Active Venues</span>
                <span className="text-2xl font-serif text-white">{MOCK_VENUES.length} Partners</span>
              </div>
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase">Total Customers</span>
                <span className="text-2xl font-serif text-teal-400">1,240 Users</span>
              </div>
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase">Total Bookings</span>
                <span className="text-2xl font-serif text-amber-400">{bookings.length} Orders</span>
              </div>
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase">Platform Rating</span>
                <span className="text-2xl font-serif text-indigo-400">4.9 / 5.0 ★</span>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-serif font-bold text-white">Recent System Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                      <th className="py-3 px-3">Ref Code</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Venue</th>
                      <th className="py-3 px-3">Total</th>
                      <th className="py-3 px-3">Commission</th>
                      <th className="py-3 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-medium text-slate-300">
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td className="py-3 px-3 font-mono font-bold text-teal-400">{b.bookingRef}</td>
                        <td className="py-3 px-3">{b.customerName}</td>
                        <td className="py-3 px-3">{b.venueName}</td>
                        <td className="py-3 px-3 font-bold text-white">₹{b.totalAmount.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-3 text-amber-400 font-bold">₹{Math.round(b.totalAmount * 0.12).toLocaleString('en-IN')}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS ENGINE */}
        {adminTab === 'coupons' && (
          <div className="space-y-6">
            {/* Create Coupon Form */}
            <form onSubmit={handleAddCoupon} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-serif font-bold text-lg text-white">Generate Promotional Coupon</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="e.g. DIWALI2026"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs uppercase font-bold text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Discount %</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(parseInt(e.target.value))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Activate Code
                  </button>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-amber-400 text-base">{c.code}</span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">
                      {c.discountPercent}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VENUES */}
        {adminTab === 'venues' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-serif font-bold text-white">Active Venues List ({MOCK_VENUES.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_VENUES.map((v) => (
                <div key={v.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <img src={v.image} alt={v.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{v.name}</h4>
                    <p className="text-xs text-slate-400">{v.type} • {v.city}</p>
                    <span className="text-teal-400 text-xs font-bold mt-1 block">Rating: {v.rating} ★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
