import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    service: 'Brand Ads',
    budget: '₹1L - ₹5L',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const services = [
    'Brand Ads',
    'Product Videos',
    'Reels Campaign',
    'Music Video',
    'Corporate Film',
    'Photography Shoot',
    'Custom Web Dev',
    'AI Chatbot Setup'
  ];

  const budgets = [
    'Under ₹1L',
    '₹1L - ₹3L',
    '₹3L - ₹8L',
    '₹8L - ₹15L',
    '₹15L+'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectService = (service: string) => {
    setFormData(prev => ({ ...prev, service }));
  };

  const handleSelectBudget = (budget: string) => {
    setFormData(prev => ({ ...prev, budget }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        service: 'Brand Ads',
        budget: '₹1L - ₹5L',
        message: ''
      });
    }, 4000);
  };

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="py-24 bg-neutral-950 text-white relative overflow-hidden"
    >
      {/* Radial glow background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff6b00]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-12 left-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Panel: Contact info & Quick links */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3"
              >
                Let's Collaborate
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold tracking-tighter font-syne mb-6"
              >
                Elevate Your Brand.
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-neutral-400 font-light leading-relaxed max-w-sm text-sm mb-12"
              >
                Whether you need commercial videos, viral reels, custom web platforms, or end-to-end strategy, we are ready to build it.
              </motion.p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col gap-4 mb-12">
              {/* WhatsApp Widget */}
              <a
                href="https://wa.me/919999999999?text=Hi%20Viralium,%20I'd%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-4 transition-all duration-300 group"
              >
                <div className="p-3 bg-emerald-500 text-white rounded-xl">
                  <MessageSquare size={20} className="fill-current" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Chat on WhatsApp</span>
                  <span className="text-sm font-semibold text-white flex items-center gap-1">
                    +91 99999 99999 <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </a>

              {/* Call Widget */}
              <a
                href="tel:+919999999999"
                className="flex items-center gap-4 bg-neutral-900/40 hover:bg-neutral-900 border border-white/5 hover:border-white/20 rounded-2xl p-4 transition-all duration-300 group"
              >
                <div className="p-3 bg-[#ff6b00] text-white rounded-xl shadow-lg shadow-brand-orange/20">
                  <Phone size={20} className="fill-current" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Direct Studio Line</span>
                  <span className="text-sm font-semibold text-white flex items-center gap-1">
                    +91 99999 99999 <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </a>

              {/* Studio Map Widget */}
              <div className="flex items-center gap-4 bg-neutral-900/40 border border-white/5 rounded-2xl p-4">
                <div className="p-3 bg-neutral-850 border border-white/5 rounded-xl text-purple-400">
                  <MapPin size={20} />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Studio Office</span>
                  <span className="text-xs text-white">Film City Sector-16A, Noida, UP, India</span>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-neutral-900 hover:bg-[#ff6b00] border border-white/5 rounded-full text-white transition-all hover:-translate-y-1" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="p-3 bg-neutral-900 hover:bg-[#ff6b00] border border-white/5 rounded-full text-white transition-all hover:-translate-y-1" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
              <a href="#" className="p-3 bg-neutral-900 hover:bg-[#ff6b00] border border-white/5 rounded-full text-white transition-all hover:-translate-y-1" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="p-3 bg-neutral-900 hover:bg-[#ff6b00] border border-white/5 rounded-full text-white transition-all hover:-translate-y-1" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Right Panel: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glassmorphism rounded-3xl p-8 md:p-10 border border-white/5 relative">
              <AnimatePresence>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-neutral-950/95 backdrop-blur-sm z-20 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                      <Send size={24} className="translate-x-0.5 -translate-y-0.5" />
                    </div>
                    <h3 className="text-2xl font-bold font-syne text-white mb-2">Proposal Received!</h3>
                    <p className="text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
                      Our directors will review your brand details and reach back within 12 hours with a calendar invite.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Your Name *</label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors"
                    />
                  </div>
                  {/* Business Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="businessName" className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Business Name</label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Aura Luxury"
                      className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Email Address *</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@brand.com"
                      className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors"
                    />
                  </div>
                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 99999 99999"
                      className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors"
                    />
                  </div>
                </div>

                {/* Service chips selection */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Required Service *</span>
                  <div className="flex flex-wrap gap-2">
                    {services.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => handleSelectService(svc)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                          formData.service === svc
                            ? 'bg-[#ff6b00] border-transparent text-white shadow-lg shadow-brand-orange/10'
                            : 'bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget chips selection */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Project Budget Scope *</span>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((bud) => (
                      <button
                        key={bud}
                        type="button"
                        onClick={() => handleSelectBudget(bud)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                          formData.budget === bud
                            ? 'bg-[#d4af37] border-transparent text-black font-bold'
                            : 'bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {bud}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Brief Message *</label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your brand, project timeline, and visual goals..."
                    className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <Magnetic strength={0.15} range={30}>
                  <button
                    type="submit"
                    className="w-full bg-white text-black font-bold text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-neutral-100 transition-colors shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Submit Proposal <Send size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </Magnetic>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
