import React, { useState, useEffect } from 'react';
import { PartyPopper, Calendar, Store, ShieldCheck, User, Menu, X, Search, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  onBookClick: () => void;
  onNavigate: (sectionId: string) => void;
  activeView: 'customer' | 'vendor' | 'admin';
  setActiveView: (view: 'customer' | 'vendor' | 'admin') => void;
  onOpenDashboards: (tab?: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookClick,
  onNavigate,
  activeView,
  setActiveView,
  onOpenDashboards,
  wishlistCount,
  onOpenWishlist
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Celebrations', target: 'celebrations' },
    { label: 'Venues', target: 'venues' },
    { label: 'Packages', target: 'packages' },
    { label: 'Add-On Services', target: 'add-ons' },
    { label: 'Booking Steps', target: 'booking-steps' },
    { label: 'Why EventSaathi', target: 'why-us' },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 w-full backdrop-blur-md",
        isScrolled ? "bg-white/95 shadow-md py-3 border-b border-slate-100" : "bg-white/80 py-4 border-b border-slate-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setActiveView('customer');
            onNavigate('hero');
          }}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <PartyPopper className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-serif font-bold text-slate-900 tracking-tight">Event</span>
              <span className="text-xl font-serif font-bold text-teal-600 tracking-tight">Saathi</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide -mt-1 hidden sm:block">
              One Platform. Every Celebration.
            </p>
          </div>
        </button>

        {/* Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => {
                setActiveView('customer');
                onNavigate(link.target);
              }}
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* View Switcher & Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dashboard Mode Pills */}
          <div className="bg-slate-100 p-1 rounded-full flex items-center border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveView('customer')}
              className={cn(
                "px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5",
                activeView === 'customer'
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span>Customer</span>
            </button>
            <button
              onClick={() => {
                setActiveView('vendor');
                onOpenDashboards('vendor');
              }}
              className={cn(
                "px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5",
                activeView === 'vendor'
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span>Vendor</span>
            </button>
            <button
              onClick={() => {
                setActiveView('admin');
                onOpenDashboards('admin');
              }}
              className={cn(
                "px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5",
                activeView === 'admin'
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Admin</span>
            </button>
          </div>

          {/* Customer Dashboard / My Bookings */}
          {activeView === 'customer' && (
            <>
              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-slate-600 hover:text-rose-600 transition-colors rounded-full hover:bg-slate-100"
                title="View Saved Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => onOpenDashboards('bookings')}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>My Bookings</span>
              </button>
            </>
          )}

          {/* Main Book Now CTA */}
          <button
            onClick={onBookClick}
            className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-5 py-2 rounded-xl text-xs font-bold hover:from-teal-700 hover:to-teal-800 transition-all shadow-md shadow-teal-600/20 active:scale-95"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onBookClick}
            className="bg-teal-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 rounded-xl hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl mb-4">
            <button
              onClick={() => {
                setActiveView('customer');
                setMobileMenuOpen(false);
              }}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-lg text-center",
                activeView === 'customer' ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              )}
            >
              Customer View
            </button>
            <button
              onClick={() => {
                setActiveView('vendor');
                onOpenDashboards('vendor');
                setMobileMenuOpen(false);
              }}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-lg text-center",
                activeView === 'vendor' ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              )}
            >
              Vendor Portal
            </button>
            <button
              onClick={() => {
                setActiveView('admin');
                onOpenDashboards('admin');
                setMobileMenuOpen(false);
              }}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-lg text-center",
                activeView === 'admin' ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              )}
            >
              Admin Panel
            </button>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-3">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => {
                  setActiveView('customer');
                  onNavigate(link.target);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left font-medium text-slate-700 hover:text-teal-600 py-1 text-sm"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenDashboards('bookings');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-bold text-teal-700 py-1 text-sm flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> My Bookings & Passes
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
