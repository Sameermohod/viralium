import { motion, useScroll } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroHook from './components/HeroHook';
import Showreel from './components/Showreel';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import ProcessTimeline from './components/ProcessTimeline';
import WhyViraliam from './components/WhyViraliam';
import BeforeAfter from './components/BeforeAfter';
import ReelsShowcase from './components/ReelsShowcase';
import BehindTheScenes from './components/BehindTheScenes';
import Testimonials from './components/Testimonials';
import ClientsMarquee from './components/ClientsMarquee';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Admin System Context & Controls
import { ContentProvider } from './context/ContentContext';
import AdminControls from './components/AdminControls';

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <ContentProvider>
      <AdminControls />

      <div className="relative min-h-screen bg-neutral-950 grid-bg">
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
          <WhyViraliam />
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
          href="https://wa.me/917264021161?text=Hi%20Viraliam,%20I'd%20like%20to%20book%20a%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl z-40 transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare size={24} className="fill-current" />
        </motion.a>
      </div>
    </ContentProvider>
  );
}
