export type CelebrationType = 
  | 'Birthday Celebration'
  | 'Anniversary Celebration'
  | 'Couple Date'
  | 'Proposal'
  | 'Family Celebration'
  | 'Friends Party'
  | 'Bachelor Party'
  | 'Bachelorette Party'
  | 'Corporate Event'
  | 'Farewell Party'
  | 'Baby Shower'
  | 'Kids Birthday'
  | 'Surprise Celebration';

export type VenueType = 
  | 'Clubs'
  | 'Bars'
  | 'Rooftop Restaurants'
  | 'Rooftop Cafes'
  | 'Restaurants'
  | 'Private Theatre'
  | 'Banquet Hall'
  | 'Farmhouse'
  | 'Resort'
  | 'Lounge'
  | 'Pool Party Venues';

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  city: string;
  area: string;
  priceStarting: number;
  rating: number;
  reviewsCount: number;
  image: string;
  features: string[];
  amenities: string[];
  capacity: string;
  description: string;
  address: string;
  mapUrl?: string;
  isPopular?: boolean;
}

export interface ExperiencePackage {
  id: string;
  title: string;
  startingPrice: number;
  badge?: string;
  badgeColor?: string;
  description: string;
  features: string[];
  recommendedFor?: string;
}

export interface AddOnOption {
  id: string;
  category: 'Decoration' | 'Cake' | 'Photography' | 'Entertainment' | 'Special Effects' | 'Gift Services' | 'Travel' | 'Food & Beverage';
  name: string;
  price: number;
  description: string;
  image?: string;
}

export interface AddOnCategory {
  id: string;
  title: string;
  iconName: string;
  options: AddOnOption[];
}

export interface Booking {
  id: string;
  bookingRef: string;
  customerName: string;
  phone: string;
  email: string;
  eventDate: string;
  timeSlot: string;
  guestCount: number;
  celebrationType: CelebrationType;
  venueId: string;
  venueName: string;
  venueAddress: string;
  venueImage: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  selectedAddOns: AddOnOption[];
  addOnsTotal: number;
  subtotal: number;
  discount: number;
  totalAmount: number;
  advancePaid: number;
  balanceDue: number;
  specialRequests?: string;
  couponCode?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled' | 'Pending';
  qrCodeValue: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minSpend: number;
  description: string;
}

export interface PolicyTopic {
  id: string;
  title: string;
  content: string[];
}
