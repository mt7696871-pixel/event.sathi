import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  Heart,
  School,
  Music,
  Calendar, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Twitter, 
  Phone, 
  Mail,
  ChevronRight,
  Star,
  Quote,
  User,
  CheckCircle,
  Clock,
  Gamepad2,
  Palmtree,
  Ticket,
  Waves,
  Home,
  Plane,
  Moon,
  Bot,
  Send,
  Loader2,
  Sparkle
} from 'lucide-react';
import { cn } from './lib/utils';

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

// --- Components ---

const Navbar = ({ onBookClick, onAboutClick, onHomeClick, onGenZClick }: { onBookClick: () => void, onAboutClick: () => void, onHomeClick: () => void, onGenZClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', onClick: onAboutClick },
    { name: 'Gen-Z', onClick: onGenZClick },
    { name: 'AI Planner', href: '#ai-planner' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={onHomeClick} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
          <span className={cn(
            "text-xl font-serif font-bold tracking-tight text-slate-900"
          )}>EventSathi</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.onClick ? (
              <button 
                key={link.name} 
                onClick={link.onClick}
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                {link.name}
              </button>
            ) : (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                {link.name}
              </a>
            )
          ))}
          <button 
            onClick={onBookClick}
            className="bg-teal-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              link.onClick ? (
                <button 
                  key={link.name} 
                  onClick={() => { link.onClick!(); setIsMobileMenuOpen(false); }}
                  className="text-lg font-medium text-slate-900 text-left"
                >
                  {link.name}
                </button>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-slate-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <div className="flex items-center gap-4 mt-2">
              <button 
                onClick={() => { onBookClick(); setIsMobileMenuOpen(false); }}
                className="bg-teal-600 text-white w-full py-3 rounded-xl font-semibold"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBookClick }: { onBookClick: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Background Elements */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-20 right-[-10%] w-[60%] aspect-square bg-teal-100/50 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 500], [0, -100]), opacity }}
        className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square bg-gold-100/50 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            Premium Event Management
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-2">
            We plan, you party
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-teal-600 italic mb-8">
            Let's make it unforgettable
          </p>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
            From intimate weddings to grand corporate galas, we bring your vision to life with precision, elegance, and a touch of magic.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onBookClick}
              className="bg-teal-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 group"
            >
              Start Planning With Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="mailto:eventsathi.co.in@gmail.com"
              className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Mail className="w-5 h-5 text-teal-600" />
              Mail Us
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000" 
              alt="Vibrant Celebration" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Cards */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Events Managed</div>
              <div className="text-xl font-bold text-slate-900">500+</div>
            </div>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-6 -right-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Happy Clients</div>
              <div className="text-xl font-bold text-slate-900">1.2k+</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Weddings",
      description: "From traditional ceremonies to modern destination weddings, we handle every detail.",
      icon: <Calendar className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Corporate Events",
      description: "Professional conferences, product launches, and gala dinners that impress.",
      icon: <Users className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Private Parties",
      description: "Birthdays, anniversaries, and milestones celebrated with style and joy.",
      icon: <Sparkles className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Pool Party",
      description: "Sun, music, and refreshing vibes with custom floaties and poolside mocktails.",
      icon: <Waves className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Movie Night",
      description: "Private screenings with gourmet popcorn, cozy seating, and premium sound systems.",
      icon: <Ticket className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Gaming Zone",
      description: "High-stakes e-sports setups with professional equipment and live streaming.",
      icon: <Gamepad2 className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Night Out",
      description: "Experience the ultimate nightlife with curated clubbing, late-night dining, and VIP experiences.",
      icon: <Moon className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We offer end-to-end event management solutions tailored to your unique requirements.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-100 transition-all hover:shadow-2xl"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-teal-600/20">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <a href="#" className="inline-flex items-center gap-2 text-teal-600 font-bold hover:gap-3 transition-all">
                  Learn More <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Bride",
      text: "EventSathi made our big fat Indian wedding so smooth. The decor was breathtaking and exactly how I imagined it!",
      image: "https://images.unsplash.com/photo-1595211097188-31f81b70b7bb?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Rajesh Iyer",
      role: "CEO, TechMinds",
      text: "Superb management for our annual corporate retreat in Goa. Their team is professional and very proactive.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Ananya Verma",
      role: "Birthday Host",
      text: "My daughter's 1st birthday was magical. The theme execution and the kids' activities were a huge hit!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Vikram Malhotra",
      role: "Groom",
      text: "From Sangeet to Reception, they handled everything with grace. Best event planners in Delhi for sure.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Sneha Gupta",
      role: "Marketing Head",
      text: "Our product launch was a huge success. The branding integration and guest management were flawless.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Amit Trivedi",
      role: "Anniversary Host",
      text: "Celebrating 25 years was special, and EventSathi made it unforgettable for us and our guests.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Kavita Reddy",
      role: "Fest Coordinator",
      text: "The energy they brought to our cultural fest was amazing. The coordination was seamless throughout.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Rohan Das",
      role: "Private Party Host",
      text: "Great housewarming party! The catering and music were top-notch. Everyone had a fantastic time.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Meera Nair",
      role: "Bride",
      text: "They truly understood our vision for a traditional Kerala wedding with a modern twist. Highly recommended!",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Arjun Kapoor",
      role: "Corporate Lead",
      text: "The team building event they organized in Lonavala was perfectly executed. The activities were very engaging.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-teal-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Kind Words</h2>
          <p className="text-slate-400">What our Indian clients say about their experience with us.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-[2rem] relative flex flex-col"
            >
              <Quote className="absolute top-4 right-6 w-8 h-8 text-white/5" />
              <div className="flex gap-1 mb-4 text-gold-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <p className="text-sm text-slate-300 mb-6 italic leading-relaxed flex-grow">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BookingPage = ({ onCancel, onSubmit }: { onCancel: () => void, onSubmit: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: 'Wedding'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hello EventSathi! I would like to book an event.%0A%0A` +
      `*Booking Details:*%0A` +
      `• *Name:* ${formData.name}%0A` +
      `• *Phone:* ${formData.phone}%0A` +
      `• *Email:* ${formData.email}%0A` +
      `• *Date:* ${formData.eventDate}%0A` +
      `• *Event Type:* ${formData.eventType}%0A%0A` +
      `Looking forward to hearing from you!`;

    const whatsappUrl = `https://wa.me/919720507177?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Book Your Event</h2>
            <button onClick={onCancel} className="text-slate-400 hover:text-slate-900 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 0000000000" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Event Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    required
                    type="date" 
                    value={formData.eventDate}
                    onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Event Type</label>
                <select 
                  value={formData.eventType}
                  onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                  className="w-full px-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 transition-all appearance-none"
                >
                  <option>Wedding</option>
                  <option>Corporate Event</option>
                  <option>Private Party</option>
                  <option>Pool Party</option>
                  <option>Gaming Zone</option>
                  <option>Movie Night</option>
                  <option>Short Trip</option>
                  <option>Home Party</option>
                  <option>Beach Party</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="button"
                onClick={onCancel}
                className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 py-4 rounded-2xl font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="pt-20">
      {/* Hero Section with Video */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-celebration-with-confetti-and-balloons-4416-large.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            About Us
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 w-24 bg-teal-500 mx-auto"
          />
        </div>
      </section>

      {/* Content Sections */}
      <section className="pt-12 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Who We Are with Background Photo */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 relative rounded-[3rem] overflow-hidden min-h-[500px] flex items-center shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200" 
              alt="Who We Are" 
              className="absolute inset-0 w-full h-full object-cover z-0"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent z-10" />
            
            <div className="relative z-20 p-8 md:p-16 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 flex items-center gap-4">
                <span className="w-12 h-1 bg-teal-500 rounded-full" />
                Who We Are
              </h2>
              <p className="text-lg md:text-xl text-slate-100 leading-relaxed font-light">
                At <span className="font-bold text-teal-400 uppercase">Event Sathi</span>, we don’t just plan events; we create experiences that keep you in memory long after the lights go down. Based in the heart of Kanpur, we are a premier event management and hosting company dedicated to transforming ordinary gatherings into extraordinary milestones.
              </p>
              <p className="text-lg md:text-xl text-slate-100 leading-relaxed font-light mt-6">
                Whether it’s a high-stakes corporate summit, a lavish lifestyle wedding, or an intimate cultural celebration, we bring a blend of modern innovation and traditional hospitality to every project we touch.
              </p>
            </div>
          </motion.div>

          {/* What Sets Us Apart */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100"
            >
              <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-teal-600/20">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">Local Expertise</h3>
              <p className="text-slate-600 leading-relaxed">
                We understand the local vendors, venues, and logistics better than anyone and execute in best ways.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-teal-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-teal-600/30"
            >
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">End-to-End Execution</h3>
              <p className="text-teal-50 leading-relaxed">
                From the first conceptual mood board to the final guest farewell, we handle the heavy lifting so you can be a guest at your own event.
              </p>
            </motion.div>
          </div>

          {/* Party & Dance Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] overflow-hidden shadow-xl h-80 relative group"
            >
              <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" 
                alt="Vibrant Party" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-serif text-xl font-bold">Vibrant Celebrations</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-[2.5rem] overflow-hidden shadow-xl h-80 relative group"
            >
              <img 
                src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" 
                alt="Dance Floor" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-serif text-xl font-bold">Energetic Dance Floors</p>
              </div>
            </motion.div>
          </div>

          {/* Our Mission */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 text-white p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[100px]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 relative z-10">Our Mission</h2>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light italic relative z-10">
              "To become the most trusted event partner in Uttar Pradesh by bridging the gap between imaginative concepts and logistical reality. We make every Event seamless, stress-free, and spectacular success."
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const GenZSection = () => {
  const genZServices = [
    {
      title: "Movie Night",
      description: "Private screenings with gourmet popcorn, cozy seating, and premium sound systems.",
      icon: <Ticket className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Pool Party",
      description: "Sun, music, and refreshing vibes with custom floaties and poolside mocktails.",
      icon: <Waves className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Short Trip",
      description: "Curated weekend getaways and road trips to the most Instagrammable spots.",
      icon: <Plane className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Home Party",
      description: "Intimate house gatherings with professional decor, catering, and entertainment.",
      icon: <Home className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Beach Party",
      description: "Bonfires, music, and the ocean breeze for an unforgettable coastal celebration.",
      icon: <Palmtree className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Gaming Zone",
      description: "High-stakes e-sports setups with professional equipment and live streaming.",
      icon: <Gamepad2 className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-600 text-white text-sm font-bold uppercase tracking-widest mb-6 shadow-lg shadow-teal-600/20"
            >
              <Sparkles className="w-4 h-4" />
              Gen-Z Edition
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6">The Gen-Z Vibe</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Curated experiences for the next generation. Aesthetic, energetic, and absolutely unforgettable.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {genZServices.map((service, idx) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 transition-all hover:shadow-2xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8 relative">
                  <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-teal-600/20 -mt-16 relative z-10 border-4 border-white">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const AIPlanner = () => {
  const [prompt, setPrompt] = useState('');
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setPlan(null);
    
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an expert event architect. Plan a highly creative and detailed event based on this request: "${prompt}". 
        Provide a unique title, a cohesive theme, a minute-by-minute itinerary, a comprehensive checklist, and a vivid description of the "vibe".`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              theme: { type: Type.STRING },
              itinerary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    time: { type: Type.STRING },
                    activity: { type: Type.STRING }
                  }
                }
              },
              checklist: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              vibeDescription: { type: Type.STRING }
            },
            required: ["title", "theme", "itinerary", "checklist", "vibeDescription"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      setPlan(result);
    } catch (err: any) {
      console.error("AI Planning Error:", err);
      setError("Architectural error: Please ensure your API key is correctly set in the Settings menu.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-32 px-6 bg-[#0a0502] text-white overflow-hidden relative">
      {/* Atmospheric Background - Recipe 7 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-900/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-amber-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-8"
          >
            <Sparkles className="w-4 h-4" />
            The AI Architect
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-serif font-bold mb-8 tracking-tight leading-[0.9]">
            Dream It. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">AI Plans It.</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Describe your vision, and our AI will architect a bespoke celebration experience just for you.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-2 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-8 group focus-within:border-teal-500/50 transition-all duration-500">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative flex items-center">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A futuristic masquerade ball for 100 people..."
                className="w-full bg-transparent px-10 py-8 outline-none text-xl placeholder:text-slate-600 font-light pr-16"
                onKeyPress={(e) => e.key === 'Enter' && generatePlan()}
              />
              {prompt && (
                <button 
                  onClick={() => setPrompt('')}
                  className="absolute right-6 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button 
              onClick={generatePlan}
              disabled={isLoading}
              className="bg-white text-black hover:bg-teal-400 hover:text-white px-12 py-8 rounded-[2.5rem] font-bold transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 group-hover:scale-[0.98]"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Bot className="w-6 h-6" />}
              {isLoading ? 'Architecting...' : 'Generate Plan'}
            </button>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center text-sm"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {plan && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Vibe & Checklist */}
              <div className="lg:col-span-7 space-y-8">
                <motion.div 
                  variants={itemVariants}
                  className="bg-white/[0.03] backdrop-blur-md p-10 rounded-[3rem] border border-white/10 hover:border-teal-500/30 transition-colors duration-500"
                >
                  <div className="flex items-center gap-3 text-teal-400 mb-6">
                    <Sparkle className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-[0.3em] text-[10px]">The Concept</span>
                  </div>
                  <h3 className="text-4xl font-serif font-bold mb-6 leading-tight">{plan.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-light italic">"{plan.vibeDescription}"</p>
                  
                  <div className="mt-10 flex flex-wrap gap-4">
                    <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-sm font-medium">
                      <span className="text-slate-500 mr-2">Theme:</span> {plan.theme}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="bg-white/[0.03] backdrop-blur-md p-10 rounded-[3rem] border border-white/10"
                >
                  <div className="flex items-center gap-3 text-purple-400 mb-8">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-[0.3em] text-[10px]">Preparation Checklist</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {plan.checklist.map((item: string, i: number) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 group cursor-default"
                      >
                        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-teal-500/50 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-slate-300 text-sm font-light group-hover:text-white transition-colors">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Itinerary */}
              <motion.div 
                variants={itemVariants}
                className="lg:col-span-5 bg-white/[0.03] backdrop-blur-md p-10 rounded-[3rem] border border-white/10"
              >
                <div className="flex items-center gap-3 text-amber-400 mb-10">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-[0.3em] text-[10px]">Event Timeline</span>
                </div>
                <div className="space-y-10 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-500/50 via-purple-500/50 to-transparent" />
                  {plan.itinerary.map((item: any, i: number) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-12 group"
                    >
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#0a0502] border-2 border-white/20 group-hover:border-teal-500 transition-colors z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-teal-500 transition-colors" />
                      </div>
                      <div className="text-teal-400 font-bold text-xs tracking-widest mb-2">{item.time}</div>
                      <div className="text-white text-lg font-light leading-snug group-hover:translate-x-1 transition-transform">{item.activity}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Footer = ({ onAboutClick, onHomeClick, onGenZClick }: { onAboutClick: () => void, onHomeClick: () => void, onGenZClick: () => void }) => {
  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-xl font-serif font-bold tracking-tight text-slate-900">EventSathi</span>
            </a>
            <p className="text-slate-500 mb-8 leading-relaxed">
              We plan, you party. Let's make it unforgettable.
            </p>
            <div className="flex gap-4">
              <a href="mailto:eventsathi.co.in@gmail.com" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><button onClick={onAboutClick} className="text-slate-500 hover:text-teal-600 transition-colors">About Us</button></li>
              <li><button onClick={onGenZClick} className="text-slate-500 hover:text-teal-600 transition-colors">Gen-Z Vibe</button></li>
              <li><a href="#services" className="text-slate-500 hover:text-teal-600 transition-colors">Services</a></li>
              <li><a href="#testimonials" className="text-slate-500 hover:text-teal-600 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-teal-600 transition-colors">Wedding Planning</a></li>
              <li><a href="#" className="text-slate-500 hover:text-teal-600 transition-colors">Corporate Events</a></li>
              <li><a href="#" className="text-slate-500 hover:text-teal-600 transition-colors">Private Parties</a></li>
              <li><button onClick={onGenZClick} className="text-slate-500 hover:text-teal-600 transition-colors">Gen-Z Vibes</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-500">
                <Phone className="w-5 h-5 text-teal-600" />
                +91 9720507177
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <MapPin className="w-5 h-5 text-teal-600" />
                Kanpur, Uttar Pradesh
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm text-slate-400">© 2026 EventSathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'booking' | 'about' | 'gen-z'>('home');

  const handleHomeClick = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = () => {
    setCurrentPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenZClick = () => {
    setCurrentPage('gen-z');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookClick = () => {
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        onBookClick={handleBookClick} 
        onAboutClick={handleAboutClick}
        onHomeClick={handleHomeClick}
        onGenZClick={handleGenZClick}
      />
      
      {currentPage === 'booking' && (
        <BookingPage 
          onCancel={() => setCurrentPage('home')} 
          onSubmit={() => {
            setCurrentPage('home');
          }} 
        />
      )}

      {currentPage === 'about' && (
        <AboutUs />
      )}

      {currentPage === 'gen-z' && (
        <GenZSection />
      )}

      {currentPage === 'home' && (
        <>
          <Hero onBookClick={handleBookClick} />
          <div id="ai-planner">
            <AIPlanner />
          </div>
          <Services />
          <Testimonials />
        </>
      )}

      <Footer 
        onAboutClick={handleAboutClick}
        onHomeClick={handleHomeClick}
        onGenZClick={handleGenZClick}
      />
    </div>
  );
}
