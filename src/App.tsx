import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { MessageSquare } from 'lucide-react';

// Components
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroHook from './components/HeroHook';
import Showreel from './components/Showreel';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import ProcessTimeline from './components/ProcessTimeline';
import WhyViralium from './components/WhyViralium';
import BeforeAfter from './components/BeforeAfter';
import ReelsShowcase from './components/ReelsShowcase';
import BehindTheScenes from './components/BehindTheScenes';
import Testimonials from './components/Testimonials';
import ClientsMarquee from './components/ClientsMarquee';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Spotlight cursor radial background tracking
    const handleMouseMove = (e: MouseEvent) => {
      const xPercentage = (e.clientX / window.innerWidth) * 100;
      const yPercentage = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--x', `${xPercentage}%`);
      document.documentElement.style.setProperty('--y', `${yPercentage}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor follower */}
      <CustomCursor />

      {/* Preloader Intro Sequence */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* Main Website Assembly */}
      <AnimatePresence>
        {loadingComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen bg-neutral-950 grid-bg"
          >
            {/* Spotlight radial gradient overlay */}
            <div className="fixed inset-0 radial-glow pointer-events-none z-0" />

            {/* Top Scroll Progress Indicator */}
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
              className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ff6b00] via-[#d4af37] to-purple-600 z-50 shadow-[0_0_12px_rgba(255,107,0,0.5)]"
            />

            {/* Navigation Header */}
            <Navbar />

            {/* Page Sections */}
            <main className="relative">
              <Hero />
              <HeroHook />
              <Showreel />
              <Portfolio />
              <Services />
              <ProcessTimeline />
              <WhyViralium />
              <BeforeAfter />
              <ReelsShowcase />
              <BehindTheScenes />
              <Testimonials />
              <ClientsMarquee />
              <FAQ />
              <ContactForm />
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating Action Button: WhatsApp */}
            <motion.a
              href="https://wa.me/919999999999?text=Hi%20Viralium,%20I'd%20like%20to%20book%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.2, type: 'spring', stiffness: 260, damping: 20 }}
              className="fixed bottom-6 right-6 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl z-40 transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare size={24} className="fill-current" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
