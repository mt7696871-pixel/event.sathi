import React, { useState } from 'react';
import { AlcoholDisclaimerBanner } from './components/AlcoholDisclaimerBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CelebrationCategories } from './components/CelebrationCategories';
import { ExploreVenues } from './components/ExploreVenues';
import { FeaturedPackages } from './components/FeaturedPackages';
import { AddOnServices } from './components/AddOnServices';
import { BookingProcess } from './components/BookingProcess';
import { BookingWizardModal } from './components/BookingWizardModal';
import { CustomerDashboard } from './components/CustomerDashboard';
import { VendorDashboard } from './components/VendorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FutureExpansion } from './components/FutureExpansion';
import { PoliciesModal } from './components/PoliciesModal';
import { Footer } from './components/Footer';

import { CelebrationType, VenueType, Venue, ExperiencePackage, AddOnOption, Booking } from './types';
import { INITIAL_BOOKINGS } from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState<'customer' | 'vendor' | 'admin'>('customer');
  const [dashboardTab, setDashboardTab] = useState<string>('bookings');
  
  // App State
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['v1', 'v2']);

  // Modals state
  const [wizardOpen, setWizardOpen] = useState<boolean>(false);
  const [policyModalOpen, setPolicyModalOpen] = useState<boolean>(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('privacy');

  // Booking Wizard initial pre-fills
  const [wizardPrefills, setWizardPrefills] = useState<{
    celebration?: CelebrationType;
    venue?: Venue;
    package?: ExperiencePackage;
    addOns?: AddOnOption[];
  }>({});

  const handleOpenWizard = (prefills?: {
    celebration?: CelebrationType;
    venue?: Venue;
    package?: ExperiencePackage;
    addOns?: AddOnOption[];
  }) => {
    if (prefills) {
      setWizardPrefills(prefills);
    } else {
      setWizardPrefills({});
    }
    setWizardOpen(true);
  };

  const handleToggleWishlist = (venueId: string) => {
    if (wishlistIds.includes(venueId)) {
      setWishlistIds(wishlistIds.filter(id => id !== venueId));
    } else {
      setWishlistIds([...wishlistIds, venueId]);
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveView('customer');
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPolicy = (policyId: string = 'privacy') => {
    setSelectedPolicyId(policyId);
    setPolicyModalOpen(true);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b));
  };

  const handleRescheduleBooking = (bookingId: string, newDate: string, newSlot: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, eventDate: newDate, timeSlot: newSlot } : b));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Alcohol Disclaimer Banner */}
      <AlcoholDisclaimerBanner onOpenPolicy={() => handleOpenPolicy('alcohol')} />

      {/* Main Navbar */}
      <Navbar
        onBookClick={() => handleOpenWizard()}
        onNavigate={handleNavigateSection}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenDashboards={(tab) => {
          if (tab) setDashboardTab(tab);
          if (activeView === 'customer') {
            const el = document.getElementById('customer-dashboard-view');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => {
          setActiveView('customer');
          setDashboardTab('wishlist');
          const el = document.getElementById('customer-dashboard-view');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Multi-Role View Rendering */}
      {activeView === 'vendor' ? (
        <VendorDashboard
          bookings={bookings}
          onApproveBooking={(id) => alert(`Approved booking ${id}`)}
          onRejectBooking={(id) => alert(`Rejected booking ${id}`)}
        />
      ) : activeView === 'admin' ? (
        <AdminDashboard bookings={bookings} />
      ) : (
        <main>
          {/* Hero Section */}
          <Hero
            onBookNow={(celebration, venueType) => handleOpenWizard({ celebration })}
            onExploreVenues={() => handleNavigateSection('venues')}
          />

          {/* Celebration Categories */}
          <CelebrationCategories
            onSelectCelebration={(celebration) => handleOpenWizard({ celebration })}
          />

          {/* Explore Venues Grid */}
          <ExploreVenues
            onBookVenue={(venue) => handleOpenWizard({ venue })}
            wishlist={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />

          {/* Featured Packages */}
          <FeaturedPackages
            onSelectPackage={(pkg) => handleOpenWizard({ package: pkg })}
          />

          {/* Add-On Services Customizer */}
          <AddOnServices
            onCustomiseBooking={(addOns) => handleOpenWizard({ addOns })}
          />

          {/* 9-Step Booking Flow Diagram */}
          <BookingProcess />

          {/* Customer Dashboard Anchor */}
          <div id="customer-dashboard-view">
            <CustomerDashboard
              bookings={bookings}
              wishlistIds={wishlistIds}
              onRemoveWishlist={handleToggleWishlist}
              onBookVenue={(venue) => handleOpenWizard({ venue })}
              onCancelBooking={handleCancelBooking}
              onRescheduleBooking={handleRescheduleBooking}
              activeTab={dashboardTab}
            />
          </div>

          {/* Why Choose Us */}
          <WhyChooseUs />

          {/* Future Expansion */}
          <FutureExpansion />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenPolicy={handleOpenPolicy}
        onNavigateSection={handleNavigateSection}
        onBookClick={() => handleOpenWizard()}
      />

      {/* 9-Step Interactive Booking Wizard Modal */}
      <BookingWizardModal
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onBookingSuccess={handleBookingSuccess}
        initialCelebration={wizardPrefills.celebration}
        initialVenue={wizardPrefills.venue}
        initialPackage={wizardPrefills.package}
        initialAddOns={wizardPrefills.addOns}
      />

      {/* Policies Reader Modal */}
      <PoliciesModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        defaultPolicyId={selectedPolicyId}
      />
    </div>
  );
}
