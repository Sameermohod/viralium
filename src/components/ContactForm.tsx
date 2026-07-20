import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Send, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const web3AccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      if (web3AccessKey && web3AccessKey.trim() !== '') {
        // Send via Web3Forms API (Works on Vercel + Local, instant delivery to inbox)
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3AccessKey,
            subject: `🔥 New Lead Inquiry from ${formData.name} - Viraliam`,
            from_name: 'Viraliam Website Lead',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            business_name: formData.businessName || 'N/A',
            service_requested: formData.service,
            estimated_budget: formData.budget,
            message: formData.message
          })
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed sending enquiry email.');
        }
      } else {
        // Send via local Vite dev server /api/contact middleware
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || 'Failed sending enquiry email.');
        }
      }

      setSubmitted(true);
      setFormData({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        service: 'Brand Ads',
        budget: '₹1L - ₹5L',
        message: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Something went wrong. Please try again or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
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

            {/* Quick action widgets */}
            <div className="flex flex-col gap-4 mb-12">
              {/* WhatsApp Widget */}
              <a
                href="https://wa.me/917264021161?text=Hi%20Viraliam,%20I'd%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-neutral-900/60 border border-white/5 hover:border-[#ff6b00]/50 rounded-2xl flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct WhatsApp Consultation</h4>
                    <p className="text-xs text-neutral-400 font-light mt-0.5">+91 72640 21161</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </a>

              {/* Direct Call Widget */}
              <a
                href="tel:+917264021161"
                className="p-5 bg-neutral-900/60 border border-white/5 hover:border-[#ff6b00]/50 rounded-2xl flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/10 text-[#ff6b00] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Speak With Our Directors</h4>
                    <p className="text-xs text-neutral-400 font-light mt-0.5">Mon - Sat (10:00 AM - 7:00 PM IST)</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </a>
            </div>
          </div>

          {/* Right Panel: Project Brief Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900/40 border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden backdrop-blur-md">
              
              {/* Success Notification Modal */}
              <AnimatePresence>
                {submitted && (
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
                      An email notification has been dispatched to our team. We will review your brand details and get back to you within 12 hours.
                    </p>
                  </motion.div>
                )}
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
                      className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors text-white"
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
                      className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors text-white"
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
                      className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors text-white"
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
                      className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors text-white"
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
                    className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors resize-none text-white leading-relaxed"
                  />
                </div>

                {/* Submit error display */}
                {submitError && (
                  <div className="p-4 bg-red-950/60 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit button */}
                <Magnetic strength={0.15} range={30}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-bold text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-neutral-100 transition-colors shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin text-black" />
                        Sending Proposal...
                      </>
                    ) : (
                      <>
                        Submit Proposal <Send size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </>
                    )}
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
