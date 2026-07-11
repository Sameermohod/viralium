import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Showreel', href: '#showreel' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-neutral-950/70 border-b border-white/5 backdrop-blur-md' 
            : 'py-8 bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-1 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="font-syne font-extrabold text-2xl md:text-3xl tracking-tighter text-white transition-colors duration-300">
              VIRALIUM
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#d4af37] animate-pulse" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(link.href);
                }}
                className="text-sm font-medium tracking-wide text-neutral-400 hover:text-white transition-colors duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ff6b00] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Magnetic strength={0.25} range={40}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('#contact');
                }}
                className="relative inline-flex items-center gap-2 bg-white text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-neutral-100 transition-all duration-300 overflow-hidden group shadow-lg shadow-white/5"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Book Consultation <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                </span>
                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </a>
            </Magnetic>
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-white hover:text-[#ff6b00] transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-neutral-950/95 backdrop-blur-xl z-50 flex flex-col justify-between p-8"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex justify-between items-center">
              <span className="font-syne font-bold text-2xl tracking-tighter text-white">VIRALIUM</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white hover:text-[#ff6b00] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-8 my-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.href);
                  }}
                  className="text-4xl font-syne font-bold text-white hover:text-[#ff6b00] transition-colors flex items-center gap-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                >
                  <span className="text-xs text-neutral-600 font-outfit">0{idx + 1}.</span>
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="flex flex-col gap-6">
              <button
                onClick={() => handleScrollTo('#contact')}
                className="w-full bg-[#ff6b00] text-white font-bold py-4 rounded-full flex justify-center items-center gap-2"
              >
                Book Consultation <ArrowUpRight size={18} />
              </button>
              
              <div className="flex justify-center gap-6 text-sm text-neutral-500">
                <a href="#" className="hover:text-white">Instagram</a>
                <a href="#" className="hover:text-white">Vimeo</a>
                <a href="#" className="hover:text-white">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
