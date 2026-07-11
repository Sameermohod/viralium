import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, X } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const isSectionVisible = useInView(containerRef, { amount: 0.1 });

  useEffect(() => {
    if (previewVideoRef.current) {
      if (isSectionVisible) {
        previewVideoRef.current.play().catch(() => {});
      } else {
        previewVideoRef.current.pause();
      }
    }
  }, [isSectionVisible]);

  return (
    <section 
      id="showreel" 
      ref={containerRef} 
      className="py-24 bg-neutral-950 text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Text */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-4"
          >
            Featured Showreel
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight font-syne"
          >
            Our Work Speaks Louder Than Words.
          </motion.h2>
        </div>

        {/* Cinematic Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="relative aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden group shadow-2xl shadow-black/80 border border-white/5 cursor-pointer"
          onClick={() => setIsPlaying(true)}
          data-cursor="play"
          data-cursor-text="play"
        >
          {/* Muted Autoplay Video Background */}
          <video
            ref={previewVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          >
            <source 
              src="https://player.vimeo.com/external/517617478.sd.mp4?s=74f4b9f271efd36f2f3d9d71fa9d1c1c1f4e1f72&profile_id=165&oauth2_token_id=57447761" 
              type="video/mp4" 
            />
          </video>

          {/* Dark Glassmorphic Overlay */}
          <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-colors duration-500 flex items-center justify-center">
            {/* Pulsing Play Button */}
            <div className="relative">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 bg-white/20 rounded-full scale-125 animate-ping opacity-75" />
              <Magnetic strength={0.3} range={60}>
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white text-black rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <Play size={32} className="fill-current translate-x-1" />
                </div>
              </Magnetic>
            </div>
          </div>

          {/* Bottom metadata tags */}
          <div className="absolute bottom-6 left-8 right-8 flex justify-between items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs font-bold tracking-widest uppercase text-white/80">
              Viraliam Creative Showreel ©2026
            </span>
            <span className="text-xs font-bold tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full backdrop-blur-md text-white/90">
              02:14 MIN
            </span>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Theatre Lightbox Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="fixed inset-0 bg-neutral-950 z-[999] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(false);
              }}
              className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/10 hover:bg-[#ff6b00] border border-white/10 text-white p-3 rounded-full hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center"
              aria-label="Close video"
            >
              <X size={20} />
            </button>

            {/* Video Player */}
            <motion.div
              className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5 relative"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            >
              <video
                ref={videoRef}
                autoPlay
                controls
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
              >
                <source 
                  src="https://player.vimeo.com/external/517617478.sd.mp4?s=74f4b9f271efd36f2f3d9d71fa9d1c1c1f4e1f72&profile_id=165&oauth2_token_id=57447761" 
                  type="video/mp4" 
                />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
