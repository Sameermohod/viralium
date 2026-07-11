import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Increment progress counter
    const duration = 1800; // 1.8 seconds loading time
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(onComplete, 800); // Wait for slide-out animation to finish
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 bg-neutral-950 z-[9999] flex flex-col justify-between p-8 md:p-16 select-none"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Header metadata */}
          <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
            <span>Viralium Studio v1.0</span>
            <span>Est. 2026</span>
          </div>

          {/* Central Logo / Typography */}
          <div className="flex flex-col items-start max-w-4xl mx-auto w-full justify-center flex-grow">
            <div className="overflow-hidden mb-2">
              <motion.h1 
                className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white font-syne"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              >
                VIRALIUM
              </motion.h1>
            </div>
            
            <div className="overflow-hidden">
              <motion.p 
                className="text-xs md:text-sm tracking-widest text-[#ff6b00] uppercase font-bold"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              >
                Premium Content • Visual Storytelling • Digital Influence
              </motion.p>
            </div>
          </div>

          {/* Bottom counter and loading indicator */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="w-full md:w-1/3 flex flex-col gap-2">
              <div className="h-[2px] bg-neutral-900 w-full relative overflow-hidden rounded-full">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#ff6b00] to-[#d4af37]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                Loading creative space...
              </div>
            </div>
            
            <div className="font-syne font-bold text-8xl md:text-9xl tracking-tighter text-white leading-none">
              {Math.floor(progress).toString().padStart(3, '0')}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
