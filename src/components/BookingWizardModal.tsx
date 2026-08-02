import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  PartyPopper, 
  Building2, 
  Package, 
  Sparkles, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Users, 
  CreditCard, 
  QrCode, 
  MapPin, 
  Clock, 
  Tag, 
  ShieldCheck, 
  CheckCircle2,
  Copy,
  Download,
  AlertCircle
} from 'lucide-react';
import { CelebrationType, VenueType, Venue, ExperiencePackage, AddOnOption, Booking } from '../types';
import { CELEBRATION_TYPES, MOCK_VENUES, FEATURED_PACKAGES, ADD_ON_CATEGORIES, MOCK_COUPONS } from '../data/mockData';
import { cn } from '../lib/utils';

interface BookingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (newBooking: Booking) => void;
  initialCelebration?: CelebrationType;
  initialVenue?: Venue;
  initialPackage?: ExperiencePackage;
  initialAddOns?: AddOnOption[];
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  isOpen,
  onClose,
  onBookingSuccess,
  initialCelebration,
  initialVenue,
  initialPackage,
  initialAddOns = []
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [celebration, setCelebration] = useState<CelebrationType>(initialCelebration || 'Birthday Celebration');
  const [selectedVenue, setSelectedVenue] = useState<Venue>(initialVenue || MOCK_VENUES[0]);
  const [selectedPackage, setSelectedPackage] = useState<ExperiencePackage>(initialPackage || FEATURED_PACKAGES[2]); // default Gold
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>(initialAddOns);
  
  // Date & Details State
  const [eventDate, setEventDate] = useState<string>(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState<string>('07:00 PM - 10:00 PM');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(10);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Payment State
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponError, setCouponError] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Generated Booking Result
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  // Pricing Calculations
  const packagePrice = selectedPackage.startingPrice;
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const rawSubtotal = packagePrice + addOnsTotal;

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);
  
  // 20% Advance requirement
  const advanceRequired = Math.round(finalTotal * 0.20);
  const balanceDueAtVenue = finalTotal - advanceRequired;

  const handleApplyCoupon = () => {
    setCouponError('');
    if (!couponCode.trim()) return;
    const match = MOCK_COUPONS.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (match) {
      if (rawSubtotal < match.minSpend) {
        setCouponError(`Minimum total spend of ₹${match.minSpend} required for code ${match.code}`);
        return;
      }
      const calc = Math.min(Math.round((rawSubtotal * match.discountPercent) / 100), match.maxDiscount);
      setAppliedCoupon({ code: match.code, discountAmount: calc });
    } else {
      setCouponError('Invalid coupon code. Try FIRSTPARTY or CELEBRATE2026');
    }
  };

  const handleToggleAddOn = (option: AddOnOption) => {
    const exists = selectedAddOns.some((item) => item.id === option.id);
    if (exists) {
      setSelectedAddOns(selectedAddOns.filter((item) => item.id !== option.id));
    } else {
      setSelectedAddOns([...selectedAddOns, option]);
    }
  };

  const handleCompletePayment = () => {
    const bookingRef = `ES-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      bookingRef,
      customerName: customerName.trim() || 'Guest Customer',
      phone: phone.trim() || '+91 98765 43210',
      email: email.trim() || 'customer@eventsaathi.com',
      eventDate,
      timeSlot,
      guestCount,
      celebrationType: celebration,
      venueId: selectedVenue.id,
      venueName: selectedVenue.name,
      venueAddress: selectedVenue.address,
      venueImage: selectedVenue.image,
      packageId: selectedPackage.id,
      packageName: selectedPackage.title,
      packagePrice,
      selectedAddOns,
      addOnsTotal,
      subtotal: rawSubtotal,
      discount: discountAmount,
      totalAmount: finalTotal,
      advancePaid: advanceRequired,
      balanceDue: balanceDueAtVenue,
      specialRequests,
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      status: 'Confirmed',
      qrCodeValue: `EVENTSAATHI-PASS-${bookingRef}-${customerName.toUpperCase().slice(0, 4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCreatedBooking(newBooking);
    onBookingSuccess(newBooking);
    setCurrentStep(8); // Move to Step 8 (QR Pass Confirmation)
  };

  const TIME_SLOTS = [
    '12:00 PM - 03:00 PM (Lunch)',
    '04:00 PM - 07:00 PM (High Tea)',
    '07:00 PM - 10:00 PM (Prime Evening)',
    '08:30 PM - 11:30 PM (Dinner & Party)',
    '10:00 PM - 01:00 AM (Late Night)'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl my-auto flex flex-col max-h-[92vh] border border-slate-100 relative">
        
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-sm">
              {currentStep}/9
            </div>
            <div>
              <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                EventSaathi 9-Step Booking Flow
              </div>
              <h2 className="text-lg font-serif font-bold text-white">
                {currentStep === 1 && 'Step 1: Choose Your Celebration'}
                {currentStep === 2 && 'Step 2: Select Venue'}
                {currentStep === 3 && 'Step 3: Choose Package Tier'}
                {currentStep === 4 && 'Step 4: Customize Add-On Services'}
                {currentStep === 5 && 'Step 5: Date & Time Slot'}
                {currentStep === 6 && 'Step 6: Fill Customer Details'}
                {currentStep === 7 && 'Step 7: Pay Advance & Confirm'}
                {currentStep === 8 && 'Step 8: Booking Pass & QR Code'}
                {currentStep === 9 && 'Step 9: Visit Venue & Celebrate!'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator Bar */}
        <div className="bg-slate-100 h-1.5 w-full shrink-0">
          <div
            className="bg-teal-600 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 9) * 100}%` }}
          />
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: CHOOSE CELEBRATION */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h3 className="text-xl font-serif font-bold text-slate-900">What are you celebrating?</h3>
                <p className="text-xs text-slate-500">Pick the occasion so we can customize decorations & music</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {CELEBRATION_TYPES.map((item) => {
                  const isSelected = celebration === item.type;
                  return (
                    <button
                      key={item.type}
                      onClick={() => setCelebration(item.type)}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 relative",
                        isSelected
                          ? "bg-teal-50 border-teal-600 shadow-md ring-2 ring-teal-500/20"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      )}
                    >
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 absolute top-3 right-3" />
                      )}
                      <PartyPopper className={cn("w-5 h-5", isSelected ? "text-teal-600" : "text-slate-400")} />
                      <span className="font-bold text-xs text-slate-900 leading-snug">{item.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT VENUE */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h3 className="text-xl font-serif font-bold text-slate-900">Select Venue Partner</h3>
                <p className="text-xs text-slate-500">Choose from top rated rooftops, private cinemas, clubs & farmhouses</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_VENUES.map((v) => {
                  const isSelected = selectedVenue.id === v.id;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVenue(v)}
                      className={cn(
                        "p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 relative",
                        isSelected
                          ? "bg-teal-50/80 border-teal-600 shadow-md ring-2 ring-teal-500/20"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="space-y-1 flex-1 min-w-0">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">
                          {v.type}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm truncate">{v.name}</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                          <span className="truncate">{v.area}, {v.city}</span>
                        </p>
                        <div className="text-xs font-bold text-teal-600">
                          Starting @ ₹{v.priceStarting.toLocaleString('en-IN')}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE PACKAGE */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h3 className="text-xl font-serif font-bold text-slate-900">Choose Package Tier</h3>
                <p className="text-xs text-slate-500">Select base package inclusions from Basic to Luxury</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FEATURED_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={cn(
                        "p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 relative",
                        isSelected
                          ? "bg-slate-900 text-white border-teal-500 shadow-xl ring-2 ring-teal-500/30"
                          : "bg-white text-slate-900 border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-lg">{pkg.title}</span>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-teal-400" />}
                        </div>
                        <div className={cn("text-2xl font-serif font-bold", isSelected ? "text-teal-400" : "text-teal-600")}>
                          ₹{pkg.startingPrice.toLocaleString('en-IN')}
                        </div>
                        <p className={cn("text-xs line-clamp-2", isSelected ? "text-slate-300" : "text-slate-500")}>
                          {pkg.description}
                        </p>
                      </div>

                      <div className="space-y-1.5 border-t border-slate-100/20 pt-3 text-xs">
                        {pkg.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Check className={cn("w-3.5 h-3.5 shrink-0", isSelected ? "text-teal-400" : "text-teal-600")} />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: SELECT ADD-ON SERVICES */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h3 className="text-xl font-serif font-bold text-slate-900">Select Add-On Services</h3>
                <p className="text-xs text-slate-500">Pick custom decorations, cake, photography, music & special effects</p>
              </div>

              <div className="space-y-6">
                {ADD_ON_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" /> {cat.title}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {cat.options.map((opt) => {
                        const isChecked = selectedAddOns.some((i) => i.id === opt.id);
                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleToggleAddOn(opt)}
                            className={cn(
                              "p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs",
                              isChecked
                                ? "bg-teal-50 border-teal-600 shadow-sm font-semibold"
                                : "bg-white border-slate-200 hover:border-slate-300"
                            )}
                          >
                            <div>
                              <div className="font-bold text-slate-900">{opt.name}</div>
                              <div className="text-teal-600 font-bold mt-0.5">+₹{opt.price.toLocaleString('en-IN')}</div>
                            </div>
                            <div className={cn(
                              "w-5 h-5 rounded-md flex items-center justify-center border shrink-0",
                              isChecked ? "bg-teal-600 border-teal-600 text-white" : "border-slate-300 bg-white"
                            )}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: DATE & TIME SLOT */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in max-w-lg mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-serif font-bold text-slate-900">Choose Event Date & Time Slot</h3>
                <p className="text-xs text-slate-500">Select when you want to host your celebration</p>
              </div>

              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-teal-600" /> Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-600" /> Preferred Time Slot
                  </label>
                  <div className="space-y-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between",
                          timeSlot === slot
                            ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <span>{slot}</span>
                        {timeSlot === slot && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: FILL CUSTOMER DETAILS */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in max-w-xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-serif font-bold text-slate-900">Customer Details</h3>
                <p className="text-xs text-slate-500">Provide contact details to receive your booking confirmation QR pass</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-teal-600" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-teal-600" /> Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-teal-600" /> Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aarav@gmail.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-teal-600" /> Guest Count
                    </label>
                    <span className="text-xs font-bold text-teal-600">{guestCount} Guests</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Special Request / Message for Venue (Optional)</label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Please place birthday cake on candle table near the skyline edge..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: PAY ADVANCE */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h3 className="text-xl font-serif font-bold text-slate-900">Pay Advance & Confirm Booking</h3>
                <p className="text-xs text-slate-500">Pay a 20% advance to lock your venue slot. Pay balance at venue.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Order Summary Box */}
                <div className="md:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-2">
                    Itemized Breakdown
                  </h4>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between font-semibold">
                      <span>Celebration: {celebration}</span>
                      <span>{selectedVenue.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{selectedPackage.title} Package</span>
                      <span className="font-bold">₹{packagePrice.toLocaleString('en-IN')}</span>
                    </div>

                    {selectedAddOns.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/60 space-y-1">
                        <div className="text-[11px] font-bold text-slate-400 uppercase">Selected Add-Ons ({selectedAddOns.length}):</div>
                        {selectedAddOns.map((item) => (
                          <div key={item.id} className="flex justify-between text-slate-600 pl-2">
                            <span>• {item.name}</span>
                            <span>+₹{item.price.toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Coupon Input */}
                    <div className="pt-3 border-t border-slate-200">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon Code (e.g. FIRSTPARTY)"
                          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs uppercase font-bold outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && <p className="text-[11px] text-rose-500 font-semibold mt-1">{couponError}</p>}
                      {appliedCoupon && (
                        <p className="text-[11px] text-teal-600 font-bold mt-1 flex items-center gap-1">
                          <Tag className="w-3 h-3" /> Coupon '{appliedCoupon.code}' applied! Saved ₹{appliedCoupon.discountAmount}
                        </p>
                      )}
                    </div>

                    {/* Math Totals */}
                    <div className="pt-3 border-t border-slate-200 space-y-1.5 text-sm">
                      <div className="flex justify-between text-slate-600 text-xs">
                        <span>Subtotal:</span>
                        <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-teal-600 font-bold text-xs">
                          <span>Discount:</span>
                          <span>-₹{appliedCoupon.discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-slate-900 text-base pt-1 border-t border-slate-200">
                        <span>Total Experience Amount:</span>
                        <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advance Payment Action Box */}
                <div className="md:col-span-5 bg-teal-900 text-white p-6 rounded-2xl flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest block mb-1">
                      Advance Required Now (20%)
                    </span>
                    <div className="text-3xl font-serif font-bold text-white">
                      ₹{advanceRequired.toLocaleString('en-IN')}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Pay <strong>₹{advanceRequired.toLocaleString('en-IN')}</strong> now to secure venue slot. Remaining <strong>₹{balanceDueAtVenue.toLocaleString('en-IN')}</strong> is payable at venue on event day.
                    </p>

                    <div className="mt-4 pt-4 border-t border-teal-800/80 space-y-2">
                      <span className="text-[11px] font-bold text-teal-200 uppercase block">Select Payment Method:</span>
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-xs cursor-pointer font-medium">
                          <input
                            type="radio"
                            name="paym"
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                            className="accent-teal-400"
                          />
                          <span>UPI / GPay / PhonePe / Paytm</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs cursor-pointer font-medium">
                          <input
                            type="radio"
                            name="paym"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="accent-teal-400"
                          />
                          <span>Credit / Debit Card</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCompletePayment}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Pay ₹{advanceRequired.toLocaleString('en-IN')} & Book</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: RECEIVE CONFIRMATION PASS & QR CODE */}
          {currentStep === 8 && createdBooking && (
            <div className="space-y-6 animate-in fade-in max-w-xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-full border border-teal-200">
                  Booking Confirmed!
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Your Celebration Pass is Ready</h3>
                <p className="text-xs text-slate-500">Ref: <strong className="text-slate-800">{createdBooking.bookingRef}</strong></p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-800 text-left relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">Official Entry Pass</span>
                    <h4 className="font-serif font-bold text-lg text-white">{createdBooking.venueName}</h4>
                    <p className="text-xs text-slate-400">{createdBooking.venueAddress}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Date</span>
                    <span className="text-sm font-bold text-teal-300">{createdBooking.eventDate}</span>
                  </div>
                </div>

                {/* QR Code Canvas Representation */}
                <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 text-slate-900">
                  <div className="w-36 h-36 border-4 border-slate-900 p-2 rounded-xl flex items-center justify-center bg-slate-50 relative">
                    <QrCode className="w-full h-full text-slate-900 stroke-[1.5]" />
                  </div>
                  <div className="text-[11px] font-mono font-bold tracking-widest text-slate-700">
                    {createdBooking.qrCodeValue}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Guest Name:</span>
                    <strong className="text-white">{createdBooking.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Time Slot:</span>
                    <strong className="text-white">{createdBooking.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Advance Paid:</span>
                    <strong className="text-teal-400">₹{createdBooking.advancePaid.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Balance Due at Venue:</span>
                    <strong className="text-amber-400">₹{createdBooking.balanceDue.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setCurrentStep(9)}
                  className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Step 9: Venue Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 9: VISIT VENUE & CELEBRATE */}
          {currentStep === 9 && createdBooking && (
            <div className="space-y-6 animate-in fade-in max-w-xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
                <PartyPopper className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold text-slate-900">Step 9: Visit Venue & Celebrate!</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Everything is locked in! Simply present your digital QR pass at the entrance of <strong className="text-slate-900">{createdBooking.venueName}</strong> upon arrival.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-3 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Celebration Day Check-list:</h4>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Keep your mobile phone ready with the QR pass on your screen.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Arrive 10-15 minutes prior to your time slot ({createdBooking.timeSlot}).</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Pay remaining balance of ₹{createdBooking.balanceDue.toLocaleString('en-IN')} directly at the venue counter.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Enjoy custom cake, decorations & hospitality curated by EventSaathi!</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl uppercase tracking-wider shadow-lg"
                >
                  Close & View in Customer Dashboard
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Controls (Steps 1 to 7) */}
        {currentStep <= 7 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <div className="text-xs font-bold text-slate-500">
              Total: <span className="text-teal-600 font-serif font-extrabold text-sm">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => {
                if (currentStep === 6 && (!customerName || !phone || !email)) {
                  alert('Please fill in your Name, Phone Number, and Email Address.');
                  return;
                }
                setCurrentStep(Math.min(7, currentStep + 1));
              }}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-md shadow-teal-600/20 flex items-center gap-1"
            >
              <span>{currentStep === 6 ? 'Proceed to Pay Advance' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
