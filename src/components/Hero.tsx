import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import Magnetic from './Magnetic';
import AnimatedCounter from './AnimatedCounter';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';

export default function Hero() {
  const { content } = useContent();
  const headline = content.hero.title;
  const words = headline.split(" ");

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.1 });

  useEffect(() => {
    if (videoRef.current) {
      if (isSectionInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isSectionInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4
      }
    }
  };

  const wordVariants: any = {
    hidden: { 
      opacity: 0,
      y: 40,
      rotateX: -40
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950 text-white">
      {/* Background Cinematic Video */}
      <Editable path={['hero', 'videoSrc']} label="Hero Background Video URL" type="url" className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none">
        <video
          key={content.hero.videoSrc}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-35 scale-105"
        >
          <source 
            src={content.hero.videoSrc} 
            type="video/mp4" 
          />
          {/* Fallback pattern */}
        </video>
        {/* Dark radial overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950" />
        <div className="absolute inset-0 bg-radial-glow" />
      </Editable>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 flex flex-col justify-between min-h-[85vh] w-full">
        <div className="flex-grow flex flex-col justify-center max-w-4xl">
          <Editable path={['hero', 'title']} label="Hero Headline" className="mb-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="perspective-[1000px]"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7.5xl font-extrabold tracking-tighter leading-[1.05] flex flex-wrap gap-x-3 gap-y-1">
                {words.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block py-2">
                    <motion.span
                      variants={wordVariants}
                      className="inline-block origin-left"
                    >
                      {word === "Brands." ? (
                        <span className="text-[#ff6b00] drop-shadow-[0_0_15px_rgba(255,107,0,0.3)]">{word}</span>
                      ) : word === "Content" ? (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#d4af37]">{word}</span>
                      ) : (
                        word
                      )}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </motion.div>
          </Editable>

          <Editable path={['hero', 'subtitle']} label="Hero Subtitle" type="textarea" className="mb-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
              className="text-neutral-400 text-base md:text-xl font-light tracking-wide max-w-2xl leading-relaxed"
            >
              {content.hero.subtitle}
            </motion.p>
          </Editable>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Magnetic strength={0.2} range={35}>
              <button
                onClick={() => handleScrollTo('#portfolio')}
                className="bg-gradient-to-r from-[#ff6b00] to-[#d4af37] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] transition-all duration-300 flex items-center gap-2 group"
              >
                View Portfolio <Play size={14} className="fill-current group-hover:scale-110 transition-transform" />
              </button>
            </Magnetic>

            <Magnetic strength={0.2} range={35}>
              <button
                onClick={() => handleScrollTo('#contact')}
                className="glassmorphism hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300"
              >
                Book Free Consultation
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 border-t border-white/10 pt-10 mt-12 w-full"
        >
          {/* Stat 1 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white font-syne">
              <AnimatedCounter value={100} suffix="+" />
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-wider text-neutral-500 font-bold">
              Projects Completed
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white font-syne">
              <AnimatedCounter value={50} suffix="+" />
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-wider text-neutral-500 font-bold">
              Happy Global Clients
            </span>
          </div>

          {/* Stat 3 */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
            <span className="text-3xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] to-[#d4af37] font-syne">
              <AnimatedCounter value={20} suffix="M+" />
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-wider text-neutral-500 font-bold">
              Organic Video Views
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating Mouse/Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none z-10 cursor-pointer hidden md:flex"
        onClick={() => handleScrollTo('#showreel')}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[8px] uppercase tracking-widest text-neutral-600 font-bold">Scroll to discover</span>
        <div className="w-5 h-8 border border-neutral-800 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[#ff6b00] rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
