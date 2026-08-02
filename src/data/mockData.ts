import { CelebrationType, VenueType, Venue, ExperiencePackage, AddOnCategory, Coupon, Booking, PolicyTopic } from '../types';

export const CELEBRATION_TYPES: { type: CelebrationType; icon: string; description: string; popularTag?: string }[] = [
  { type: 'Birthday Celebration', icon: 'Cake', description: 'Milestones, surprise parties & theme celebrations', popularTag: 'Most Popular' },
  { type: 'Anniversary Celebration', icon: 'Heart', description: 'Romantic dining, candlelight setups & violinists', popularTag: 'Trending' },
  { type: 'Couple Date', icon: 'Sparkles', description: 'Private theatre, rooftop dining & intimate ambiance' },
  { type: 'Proposal', icon: 'Ring', description: 'Grand romantic setups, cold pyro & red carpet entries', popularTag: 'Special' },
  { type: 'Family Celebration', icon: 'Users', description: 'Feasts, banquet halls & family-friendly lounges' },
  { type: 'Friends Party', icon: 'GlassWater', description: 'Clubs, rooftop bars & pool party villas' },
  { type: 'Bachelor Party', icon: 'PartyPopper', description: 'VIP club lounges, DJ nights & farmhouse bashes' },
  { type: 'Bachelorette Party', icon: 'Wine', description: 'Chic rooftop cafes, photo booths & glam setups' },
  { type: 'Corporate Event', icon: 'Briefcase', description: 'Team outings, award nights & rooftop mixers' },
  { type: 'Farewell Party', icon: 'GraduationCap', description: 'Memorable college & office farewell gatherings' },
  { type: 'Baby Shower', icon: 'Baby', description: 'Pastel decor, games, high tea & photo backdrops' },
  { type: 'Kids Birthday', icon: 'Smile', description: 'Theme character decor, magic shows & fun activities' },
  { type: 'Surprise Celebration', icon: 'Gift', description: 'Secret venue entries, surprise singers & flash mobs' },
];

export const VENUE_TYPES: { type: VenueType; icon: string; description: string }[] = [
  { type: 'Clubs', icon: 'Music', description: 'High-energy DJ beats, strobe lights & dance floors' },
  { type: 'Bars', icon: 'Wine', description: 'Craft cocktails, relaxed lounge seating & live acoustic nights' },
  { type: 'Rooftop Restaurants', icon: 'Sun', description: 'Skyline views, fine dining & romantic starry ambiance' },
  { type: 'Rooftop Cafes', icon: 'Coffee', description: 'Cozy breeze, fairy lights & casual bistro treats' },
  { type: 'Restaurants', icon: 'Utensils', description: 'Multi-cuisine dining, private dining rooms & rich buffets' },
  { type: 'Private Theatre', icon: 'Film', description: 'HD projection, plush recliners & intimate private screenings' },
  { type: 'Banquet Hall', icon: 'Building2', description: 'Spacious royal halls for large family gatherings & receptions' },
  { type: 'Farmhouse', icon: 'Trees', description: 'Lush green lawns, private villas & overnight pool parties' },
  { type: 'Resort', icon: 'Palmtree', description: 'Weekend luxury staycations, spas & scenic celebration spots' },
  { type: 'Lounge', icon: 'Armchair', description: 'Plush velvet seating, dim lighting & ambient music' },
  { type: 'Pool Party Venues', icon: 'Waves', description: 'Sunbeds, floaties, poolside bar & energetic summer vibes' },
];

export const MOCK_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'Aura Rooftop & Grill',
    type: 'Rooftop Restaurants',
    city: 'Delhi NCR',
    area: 'Connaught Place',
    priceStarting: 1499,
    rating: 4.8,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    features: ['360 Skyline View', 'Candlelight Setup', 'Live Saxophone'],
    amenities: ['Valet Parking', 'Air Conditioned Indoor', 'Outdoor Mist Fans', 'Covered Cabanas'],
    capacity: '20 - 150 Guests',
    description: 'Breathtaking rooftop dining venue featuring panoramic views of Connaught Place, bespoke table decor, and exquisite European & Asian cuisine.',
    address: 'Block M, Connaught Place, New Delhi',
    isPopular: true
  },
  {
    id: 'v2',
    name: 'CinePrivate Luxury Screening Lounge',
    type: 'Private Theatre',
    city: 'Mumbai',
    area: 'Bandra West',
    priceStarting: 1299,
    rating: 4.9,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    features: ['4K Dolby Atmos Screen', 'Leather Recliners', 'Surprise Entry Tunnel'],
    amenities: ['Private Butler', 'Popcorn & Soda Station', 'Customized Screen Message', 'Ambient Lighting'],
    capacity: '2 - 20 Guests',
    description: 'An ultra-exclusive private cinema experience tailored for romantic date nights, birthday surprises, and intimate movie parties with custom decor.',
    address: 'Hill Road, Bandra West, Mumbai',
    isPopular: true
  },
  {
    id: 'v3',
    name: 'Vault Nightclub & VIP Lounge',
    type: 'Clubs',
    city: 'Bengaluru',
    area: 'Indiranagar',
    priceStarting: 1999,
    rating: 4.7,
    reviewsCount: 289,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80',
    features: ['International DJ Lineup', 'VIP Bottle Service', 'LED Laser Wall'],
    amenities: ['Dedicated VIP Tables', 'Dance Floor', 'Bouncer Security', 'Smoking Zone'],
    capacity: '50 - 300 Guests',
    description: 'Bengaluru’s premier high-octane club offering state-of-the-art sound, VIP section bookings, and thrilling laser light shows for birthdays & bachelor bashes.',
    address: '100 Feet Road, Indiranagar, Bengaluru',
    isPopular: true
  },
  {
    id: 'v4',
    name: 'Green Meadows Luxury Farmhouse',
    type: 'Farmhouse',
    city: 'Delhi NCR',
    area: 'Chattarpur',
    priceStarting: 4999,
    rating: 4.9,
    reviewsCount: 185,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    features: ['Private Swimming Pool', '2-Acre Lawn', 'Overnight Stay Villa'],
    amenities: ['Private Chef Kitchen', 'Barbecue Station', 'Sound System', 'Indoor Games'],
    capacity: '30 - 250 Guests',
    description: 'Sprawling 2-acre private estate with a sparkling pool, manicured lawns, and a 4-bedroom luxury villa perfect for pool parties, family reunions, and grand celebrations.',
    address: 'Main Chattarpur Road, New Delhi',
    isPopular: true
  },
  {
    id: 'v5',
    name: 'Cloud Nine Rooftop Cafe',
    type: 'Rooftop Cafes',
    city: 'Jaipur',
    area: 'C-Scheme',
    priceStarting: 799,
    rating: 4.6,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    features: ['Boho Fairy Light Setup', 'Acoustic Live Music', 'Instagrammable Booths'],
    amenities: ['Free High-Speed Wi-Fi', 'Custom Cake Display', 'Mocktail Counter', 'Cozy Cabanas'],
    capacity: '10 - 80 Guests',
    description: 'A charming, boho-chic rooftop cafe bathed in warm fairy lights, offering artisan coffee, woodfired pizzas, and intimate birthday setups.',
    address: 'Subhash Marg, C-Scheme, Jaipur'
  },
  {
    id: 'v6',
    name: 'The Social Taproom & Bar',
    type: 'Bars',
    city: 'Pune',
    area: 'Koregaon Park',
    priceStarting: 999,
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    features: ['Craft Mocktails', 'Outdoor Beer Garden', 'Trivia & Live Band'],
    amenities: ['Reserved Lounge Booths', 'Projector for Live Sports', 'Smoking Terrace'],
    capacity: '15 - 120 Guests',
    description: 'Vibrant neighborhood bar and taproom with rustic wood interiors, outdoor beer garden, and energetic music for corporate mixers and friends get-togethers.',
    address: 'Lane 7, Koregaon Park, Pune'
  },
  {
    id: 'v7',
    name: 'Splashtopia Azure Pool Villa',
    type: 'Pool Party Venues',
    city: 'Goa',
    area: 'Calangute',
    priceStarting: 2999,
    rating: 4.9,
    reviewsCount: 260,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    features: ['Infiniti Edge Pool', 'Sunbed Deck', 'Floating Breakfast / Bar'],
    amenities: ['Poolside DJ Setup', 'BBQ Grill', 'Shower Rooms', 'Cocktail Shakers'],
    capacity: '20 - 100 Guests',
    description: 'The ultimate tropical pool party destination in Goa with a luxury infinity pool, sunken poolside lounge, and tropical cocktail setups.',
    address: 'Calangute-Baga Road, Goa'
  },
  {
    id: 'v8',
    name: 'Imperial Grand Ballroom',
    type: 'Banquet Hall',
    city: 'Lucknow',
    area: 'Gomti Nagar',
    priceStarting: 3999,
    rating: 4.8,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    features: ['Crystal Chandelier Ceiling', 'Royal Stage Setup', 'Centralized AC'],
    amenities: ['Green Rooms for Hosts', 'Valet Parking for 200 Cars', 'In-house Catering', 'Stage Lighting'],
    capacity: '100 - 600 Guests',
    description: 'Grand royal banquet hall with majestic crystal chandeliers and opulent decor designed for grand anniversaries, baby showers, and lavish family receptions.',
    address: 'Vibhuti Khand, Gomti Nagar, Lucknow'
  },
  {
    id: 'v9',
    name: 'Saffron Fine Dining Restaurant',
    type: 'Restaurants',
    city: 'Delhi NCR',
    area: 'Cyber Hub, Gurugram',
    priceStarting: 1199,
    rating: 4.7,
    reviewsCount: 275,
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    features: ['Private Dining Rooms (PDR)', 'Authentic Indian & Continental Feast', 'Sommelier Service'],
    amenities: ['Personal Waitstaff', 'Floral Centerpieces', 'Background Piano Music'],
    capacity: '10 - 75 Guests',
    description: 'Elegant fine-dining establishment with dedicated private dining enclosures, customized multi-course menus, and exquisite table styling.',
    address: 'DLF Cyber Hub, DLF Phase 2, Gurugram'
  },
  {
    id: 'v10',
    name: 'The Palms Luxury Resort',
    type: 'Resort',
    city: 'Jaipur',
    area: 'Kukas',
    priceStarting: 4499,
    rating: 4.9,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    features: ['Heritage Architecture', 'Spa & Wellness Center', 'Courtyard Folk Performances'],
    amenities: ['Luxury Cottages', 'Swimming Pool', 'Puppet Show & Folk Dance', 'Bonfire Pit'],
    capacity: '20 - 300 Guests',
    description: 'Royal Rajasthani heritage resort offering royal welcome, traditional folk entertainment, luxury cottage stays, and courtyard celebrations.',
    address: 'Delhi-Jaipur Highway, Kukas, Jaipur'
  }
];

export const FEATURED_PACKAGES: ExperiencePackage[] = [
  {
    id: 'pkg-basic',
    title: 'Basic Experience',
    startingPrice: 799,
    badge: 'Budget Friendly',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    description: 'Essential seating and warm hospitality ideal for intimate gatherings and casual celebrations.',
    features: [
      'Reserved Seating Area',
      'Standard Venue Entry Pass',
      'Dedicated Service Support Staff',
      'Welcome Greetings & Table Setup',
      'Standard Background Ambiance'
    ],
    recommendedFor: 'Casual Birthday & Friend Catch-ups'
  },
  {
    id: 'pkg-silver',
    title: 'Silver Experience',
    startingPrice: 1499,
    badge: 'Popular',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    description: 'A cozy setup with custom table decoration and refreshing welcome drinks.',
    features: [
      'Reserved Priority Table / Booth',
      'Balloon & Candlelight Table Decoration',
      'Welcome Drink / Mocktail per guest',
      'Dedicated Event Assistant',
      'Customized Music Playlist Request'
    ],
    recommendedFor: 'Anniversaries, Date Nights & Birthdays'
  },
  {
    id: 'pkg-gold',
    title: 'Gold Experience',
    startingPrice: 2999,
    badge: 'Most Value',
    badgeColor: 'bg-teal-600 text-white border-teal-600',
    description: 'Enhanced theme decoration, designer cake, prime seating, and professional photography.',
    features: [
      'Premium Theme Floral & Foil Decoration',
      'Delicious 1/2 Kg Designer Celebration Cake',
      'Prime Reserved Seating / VIP Cabana',
      '1-Hour Professional DSLR Photography',
      'Welcome Drinks & Special Table Banner'
    ],
    recommendedFor: 'Proposals, Milestones & Family Celebrations'
  },
  {
    id: 'pkg-premium',
    title: 'Premium Experience',
    startingPrice: 4999,
    badge: 'High-End',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    description: 'Comprehensive luxury setup including photo & video coverage, special entry, and VIP area.',
    features: [
      'Luxury Balloon Arch & Neon Board Setup',
      '1 Kg Premium Gourmet / Photo Cake',
      'DSLR Photography + Cinematic Video Edit',
      'Special Pyro / Cold Sparkle Entry',
      'Reserved Premium VIP Area / Stage Access',
      'Dedicated On-site Event Manager'
    ],
    recommendedFor: 'Bachelor Parties, Farewell & Grand Birthdays'
  },
  {
    id: 'pkg-luxury',
    title: 'Luxury Experience',
    startingPrice: 9999,
    badge: 'Bespoke VIP',
    badgeColor: 'bg-slate-950 text-amber-400 border-amber-500/30',
    description: 'Completely bespoke celebration with VIP setup, live entertainment, drone shoot, and full coordinator team.',
    features: [
      'Completely Customized Grand Celebration Concept',
      'Bespoke VIP Canopy / Stage Decoration',
      'Dedicated Lead Event Coordinator & Host',
      'Live Acoustic Singer / Guitarist / DJ',
      'Cinematic Videography + Drone Coverage',
      'Customized Food & Beverage Tasting Menu',
      'Surprise Gift Hamper & Red Carpet Entrance'
    ],
    recommendedFor: 'Grand Proposals, Weddings & Corporate Galas'
  }
];

export const ADD_ON_CATEGORIES: AddOnCategory[] = [
  {
    id: 'cat-decoration',
    title: 'Decoration',
    iconName: 'Sparkles',
    options: [
      { id: 'dec-1', category: 'Decoration', name: 'Balloon Decoration', price: 499, description: '100+ metallic and pastel helium balloon cluster setup' },
      { id: 'dec-2', category: 'Decoration', name: 'Romantic Candlelight & Rose Setup', price: 1299, description: 'Red rose petals pathways, scented tea lights & glass jars' },
      { id: 'dec-3', category: 'Decoration', name: 'Theme Character / Floral Backdrop', price: 2499, description: 'Custom thematic printed or faux floral photo booth wall' },
      { id: 'dec-4', category: 'Decoration', name: 'LED Name Light Setup', price: 899, description: 'Bright glowing neon letters for birthday/anniversary name' },
      { id: 'dec-5', category: 'Decoration', name: 'Personalized Welcome Board', price: 599, description: 'Easel board with floral border and customized event text' },
    ]
  },
  {
    id: 'cat-cake',
    title: 'Cake',
    iconName: 'Cake',
    options: [
      { id: 'cake-1', category: 'Cake', name: 'Rich Dutch Chocolate Cake (1/2 Kg)', price: 599, description: 'Decadent dark chocolate ganache layered cake' },
      { id: 'cake-2', category: 'Cake', name: 'Classic Black Forest Cake (1/2 Kg)', price: 649, description: 'Fresh whipped cream, maraschino cherries & chocolate flakes' },
      { id: 'cake-3', category: 'Cake', name: 'Creamy Butterscotch Crunch (1/2 Kg)', price: 599, description: 'Crunchy praline & smooth butterscotch whipped cream' },
      { id: 'cake-4', category: 'Cake', name: 'Royal Red Velvet Cream Cheese (1/2 Kg)', price: 799, description: 'Moist crimson sponge with rich cream cheese frosting' },
      { id: 'cake-5', category: 'Cake', name: 'Fresh Exotic Fruit Gateau (1/2 Kg)', price: 849, description: 'Topped with seasonal kiwi, berries, mango & peaches' },
      { id: 'cake-6', category: 'Cake', name: 'Customized Edible Photo Cake (1 Kg)', price: 1299, description: 'High definition edible sugar sheet print of your favorite photo' },
    ]
  },
  {
    id: 'cat-photography',
    title: 'Photography',
    iconName: 'Camera',
    options: [
      { id: 'photo-1', category: 'Photography', name: 'DSLR Professional Photography (1 Hr)', price: 1999, description: '50+ color-graded high-resolution edited candid photos' },
      { id: 'photo-2', category: 'Photography', name: 'Cinematic Teaser & Highlight Reel', price: 3999, description: '1-minute Instagram reel + 3-minute 4K event highlight video' },
      { id: 'photo-3', category: 'Photography', name: 'Drone Aerial Shoot (Subject to permission)', price: 4999, description: 'Stunning 4K aerial shots of open-air venue celebrations' },
    ]
  },
  {
    id: 'cat-entertainment',
    title: 'Entertainment',
    iconName: 'Music',
    options: [
      { id: 'ent-1', category: 'Entertainment', name: 'Live Acoustic Singer & Guitarist (45 Mins)', price: 3500, description: 'Personalized romantic or Bollywood song dedications at your table' },
      { id: 'ent-2', category: 'Entertainment', name: 'Solo Violinist / Saxophonist Performance', price: 2999, description: 'Sophisticated instrumental melodies during dinner' },
      { id: 'ent-3', category: 'Entertainment', name: 'Professional Party DJ & Sound Console', price: 4500, description: '2 Hours high-energy track mixing tailored to your playlist' },
      { id: 'ent-4', category: 'Entertainment', name: 'Emcee / Event Anchor for Games', price: 3000, description: 'Engaging host to conduct fun trivia, cake-cutting & guest interaction' },
      { id: 'ent-5', category: 'Entertainment', name: 'Surprise Character / Mascot Entry', price: 1800, description: 'Fun mascot (Teddy, Superhero) for kids or surprise entry' },
    ]
  },
  {
    id: 'cat-special-fx',
    title: 'Special Effects',
    iconName: 'Zap',
    options: [
      { id: 'fx-1', category: 'Special Effects', name: 'Cold Pyro Sparkle Shots (4 Shots)', price: 1200, description: 'Indoor-safe cold spark fountain bursts for cake cutting' },
      { id: 'fx-2', category: 'Special Effects', name: 'Low Fog / Dry Ice Cloud Walk', price: 1800, description: 'Walking on clouds effect during romantic dance or grand entry' },
      { id: 'fx-3', category: 'Special Effects', name: 'Bubble Blast Generator', price: 999, description: 'Continuous floating bubbles during photo moments' },
      { id: 'fx-4', category: 'Special Effects', name: 'Confetti Cannon Blast', price: 800, description: 'Gold & silver metallic paper shower upon cake cutting' },
    ]
  },
  {
    id: 'cat-gifts',
    title: 'Gift Services',
    iconName: 'Gift',
    options: [
      { id: 'gift-1', category: 'Gift Services', name: 'Fresh Exotic Red Rose Bouquet (20 Roses)', price: 699, description: 'Hand-tied velvet rose bouquet with ribbon wrapping' },
      { id: 'gift-2', category: 'Gift Services', name: 'Fluffy Teddy Bear (3 Feet)', price: 899, description: 'Cudly premium plush bear for sweet surprises' },
      { id: 'gift-3', category: 'Gift Services', name: 'Luxury Imported Chocolate Hamper', price: 799, description: 'Ferrero Rocher, Lindt & Toblerone gift box' },
      { id: 'gift-4', category: 'Gift Services', name: 'Handcrafted Calligraphy Greeting Card', price: 299, description: 'Custom printed emotional message card in wax-sealed envelope' },
    ]
  },
  {
    id: 'cat-travel',
    title: 'Travel',
    iconName: 'Car',
    options: [
      { id: 'trv-1', category: 'Travel', name: 'Luxury Sedan Cab Pick-up & Drop', price: 1499, description: 'Chauffeur-driven sedan for stress-free party travel' },
      { id: 'trv-2', category: 'Travel', name: 'Decorated Couple Car Ride', price: 2499, description: 'Ribbon & flower decorated cab for romantic date night' },
    ]
  },
  {
    id: 'cat-fnb',
    title: 'Food & Beverage',
    iconName: 'Utensils',
    options: [
      { id: 'fnb-1', category: 'Food & Beverage', name: 'Gourmet Veg Buffet / Meal (Per Person)', price: 599, description: '2 Starters, 3 Main Course, Assorted Bread & Dessert' },
      { id: 'fnb-2', category: 'Food & Beverage', name: 'Non-Veg Royal Feast (Per Person)', price: 799, description: '2 Veg + 2 Non-Veg Starters, Royal Biryani/Curries, Dessert' },
      { id: 'fnb-3', category: 'Food & Beverage', name: 'Unlimited Artisanal Mocktail Counter (Per Person)', price: 349, description: 'Fresh fruit Mojitos, Sangria twists, & Fizzy Coolers' },
    ]
  }
];

export const MOCK_COUPONS: Coupon[] = [
  { code: 'FIRSTPARTY', discountPercent: 15, maxDiscount: 500, minSpend: 1000, description: '15% OFF on your very first booking with EventSaathi!' },
  { code: 'CELEBRATE2026', discountPercent: 20, maxDiscount: 800, minSpend: 2500, description: 'Flat 20% OFF for special anniversary & birthday reservations' },
  { code: 'LUXURYVIP', discountPercent: 25, maxDiscount: 2000, minSpend: 5000, description: '25% OFF on Premium & Luxury experience packages' }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-1001',
    bookingRef: 'ES-2026-9812',
    customerName: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@gmail.com',
    eventDate: '2026-08-15',
    timeSlot: '07:30 PM - 10:30 PM',
    guestCount: 6,
    celebrationType: 'Birthday Celebration',
    venueId: 'v1',
    venueName: 'Aura Rooftop & Grill',
    venueAddress: 'Block M, Connaught Place, New Delhi',
    venueImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    packageId: 'pkg-gold',
    packageName: 'Gold Experience',
    packagePrice: 2999,
    selectedAddOns: [
      { id: 'cake-1', category: 'Cake', name: 'Rich Dutch Chocolate Cake (1/2 Kg)', price: 599, description: 'Decadent dark chocolate' },
      { id: 'fx-1', category: 'Special Effects', name: 'Cold Pyro Sparkle Shots', price: 1200, description: 'Cold spark burst' }
    ],
    addOnsTotal: 1799,
    subtotal: 4798,
    discount: 500,
    totalAmount: 4298,
    advancePaid: 1000,
    balanceDue: 3298,
    specialRequests: 'Please place the birthday banner near the skyline view table.',
    couponCode: 'FIRSTPARTY',
    status: 'Confirmed',
    qrCodeValue: 'EVENTSAATHI-PASS-ES-2026-9812-AARAV',
    createdAt: '2026-08-01'
  },
  {
    id: 'b-1002',
    bookingRef: 'ES-2026-8741',
    customerName: 'Priya Mukherjee',
    phone: '+91 98123 76543',
    email: 'priya.m@yahoo.com',
    eventDate: '2026-08-20',
    timeSlot: '08:00 PM - 11:00 PM',
    guestCount: 2,
    celebrationType: 'Couple Date',
    venueId: 'v2',
    venueName: 'CinePrivate Luxury Screening Lounge',
    venueAddress: 'Hill Road, Bandra West, Mumbai',
    venueImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    packageId: 'pkg-silver',
    packageName: 'Silver Experience',
    packagePrice: 1499,
    selectedAddOns: [
      { id: 'dec-2', category: 'Decoration', name: 'Romantic Candlelight & Rose Setup', price: 1299, description: 'Red rose pathways' },
      { id: 'ent-1', category: 'Entertainment', name: 'Live Acoustic Singer & Guitarist', price: 3500, description: 'Personalized song' }
    ],
    addOnsTotal: 4799,
    subtotal: 6298,
    discount: 800,
    totalAmount: 5498,
    advancePaid: 1500,
    balanceDue: 3998,
    specialRequests: 'Play romantic acoustic songs during entry.',
    couponCode: 'CELEBRATE2026',
    status: 'Confirmed',
    qrCodeValue: 'EVENTSAATHI-PASS-ES-2026-8741-PRIYA',
    createdAt: '2026-08-01'
  }
];

export const WHY_CHOOSE_US = [
  { title: 'Trusted Venues', desc: 'Handpicked, quality-checked clubs, rooftops, cafes and private theatres.', icon: 'ShieldCheck' },
  { title: 'Verified Partners', desc: 'Background-checked decorators, bakers, musicians, and photofilm creators.', icon: 'BadgeCheck' },
  { title: 'Easy Booking', desc: 'Select venue, customize add-ons, choose date, pay advance in under 3 minutes.', icon: 'Zap' },
  { title: 'Secure Payments', desc: 'Encrypted transactions with transparent advance payment structure & instant receipt.', icon: 'Lock' },
  { title: 'Customizable Packages', desc: '100% tailor-made celebrations from basic table reservation to VIP luxury setup.', icon: 'Sliders' },
  { title: 'Professional Event Planning', desc: 'Dedicated EventSaathi coordinators to ensure smooth venue execution.', icon: 'Sparkles' },
  { title: 'Affordable Pricing', desc: 'Upfront rates with starting packages from ₹799—no hidden surprise costs.', icon: 'Tag' },
  { title: 'Customer Support', desc: '24/7 dedicated celebration assistant team on Call and WhatsApp.', icon: 'Headphones' },
  { title: 'Growing Network', desc: 'Continuously expanding selection of hot venues across top metropolitan cities.', icon: 'Globe' }
];

export const FUTURE_EXPANSION = [
  { title: 'Private Theatres Expansion', desc: '100+ new boutique private screening rooms coming to top malls.', icon: 'Film' },
  { title: 'Luxury Rooftops', desc: 'Exclusive sky bars with 360-degree city skyline vistas.', icon: 'Building' },
  { title: 'Premium Resorts & Staycations', desc: 'Weekend villa getaways for overnight celebration bashes.', icon: 'Palmtree' },
  { title: 'Destination Celebrations', desc: 'Curated royal experience packages in Goa, Udaipur & Jaipur.', icon: 'MapPin' },
  { title: 'Pool Parties & Farmhouses', desc: 'Private estate bookings with floaties, DJ consoles & live BBQ.', icon: 'Waves' },
  { title: 'More Cities & Pan-India', desc: 'Launching soon in Hyderabad, Chennai, Ahmedabad, Chandigarh & Kolkata.', icon: 'Compass' }
];

export const LEGAL_POLICIES: PolicyTopic[] = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: [
      'EventSaathi collects customer contact details (Name, Phone, Email) strictly for processing venue bookings, generating digital passes, and sending order updates.',
      'We never share or sell your personal details with third-party advertisers. Information is shared strictly with the chosen venue partner for fulfillment.',
      'All payment card details are encrypted and handled directly by RBI-approved payment processors.'
    ]
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    content: [
      'EventSaathi acts as an experience booking facilitator connecting customers with verified venue partners.',
      'Customers must present the official EventSaathi QR Code booking pass at the venue entrance during check-in.',
      'Guest count must adhere to the capacity booked. Extra guests will be charged at standard venue rates.',
      'Respect venue decorum and rules. Any accidental damage to venue property will be billed directly by the venue.'
    ]
  },
  {
    id: 'refund',
    title: 'Refund Policy',
    content: [
      'Cancellations requested 48+ hours prior to the event date are eligible for a 90% refund of the advance amount paid.',
      'Cancellations requested between 24 and 48 hours prior to the event are eligible for a 50% refund.',
      'Cancellations requested less than 24 hours before the event date or no-shows are non-refundable as venue resources and perishables (cakes/flowers) are locked in advance.',
      'Refunds are processed within 5 to 7 working days to the original payment source.'
    ]
  },
  {
    id: 'cancellation',
    title: 'Cancellation Policy',
    content: [
      'Customers can cancel bookings directly from the Customer Dashboard under "My Bookings" or by contacting EventSaathi support.',
      'In rare cases where a venue partner cannot host due to unexpected emergency or weather events, a 100% full refund or free reschedule will be offered immediately.'
    ]
  },
  {
    id: 'reschedule',
    title: 'Reschedule Policy',
    content: [
      'Rescheduling is FREE of charge if requested at least 24 hours before the booked time slot, subject to venue slot availability.',
      'To reschedule, navigate to "My Bookings" in your dashboard or chat with our WhatsApp support line.'
    ]
  },
  {
    id: 'vendor',
    title: 'Vendor Policy',
    content: [
      'All listed venues and add-on service providers are background-checked for safety, hygiene, and service excellence.',
      'Vendors must honor all confirmed EventSaathi passes and deliver exact package inclusions as described.'
    ]
  },
  {
    id: 'alcohol',
    title: 'Alcohol Policy',
    content: [
      'CRITICAL DISCLAIMER: Alcohol is NOT included in any EventSaathi package or add-on service.',
      'If available, alcoholic beverages can ONLY be purchased directly from the venue on-site, strictly according to applicable state laws, age restrictions, and the venue’s official liquor license.',
      'EventSaathi does not sell, deliver, or encourage unlicensed alcohol consumption.'
    ]
  }
];
