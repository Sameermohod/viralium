import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Video, Film, Share2, TrendingUp } from 'lucide-react';

export default function HeroHook() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const steps = [
    {
      num: '01',
      title: 'Raw Footage',
      icon: <Video className="text-[#ff6b00]" size={28} />,
      desc: 'High-end 4K/6K cinema capture, professional lighting setups, and flat color profiles preserving ultimate sensory details.',
      color: 'from-[#ff6b00]/20 to-transparent'
    },
    {
      num: '02',
      title: 'Creative Editing',
      icon: <Film className="text-[#d4af37]" size={28} />,
      desc: 'Precision cuts, pacing, sound design, soundscapes, and color grading that transform clips into emotional narratives.',
      color: 'from-[#d4af37]/20 to-transparent'
    },
    {
      num: '03',
      title: 'Viral Content',
      icon: <Share2 className="text-purple-500" size={28} />,
      desc: 'Engineered hooks, high-retention editing styles, and platform optimization designed to scale organic social algorithms.',
      color: 'from-purple-500/20 to-transparent'
    },
    {
      num: '04',
      title: 'Business Growth',
      icon: <TrendingUp className="text-emerald-500" size={28} />,
      desc: 'Converting views into high-value leads, customer trust, revenue generation, and undeniable brand dominance.',
      color: 'from-emerald-500/20 to-transparent'
    }
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-36 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-transparent blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-[#ff6b00]/10 to-transparent blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Large Typography Hook */}
        <div className="max-w-4xl mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-4"
          >
            The Viralium Manifesto
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight font-syne"
          >
            Your Brand Deserves More Than{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-500 to-neutral-700">
              Ordinary Content.
            </span>
          </motion.h2>
        </div>

        {/* Split Pipeline Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              className="group relative glassmorphism rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[320px] transition-all duration-500 hover:y-[-8px] hover:border-white/10"
            >
              {/* Background gradient glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-0`} />

              <div className="relative z-10 flex justify-between items-start">
                <span className="font-syne font-extrabold text-4xl text-neutral-800 group-hover:text-white/25 transition-colors duration-300">
                  {step.num}
                </span>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>

              <div className="relative z-10 mt-16">
                <h3 className="text-xl font-bold font-syne mb-3 text-white group-hover:text-[#ff6b00] transition-colors duration-300 flex items-center gap-2">
                  {step.title}
                  {idx < 3 && (
                    <span className="hidden md:inline text-neutral-700 group-hover:text-[#ff6b00] translate-x-0 group-hover:translate-x-1.5 transition-all duration-300">
                      →
                    </span>
                  )}
                </h3>
                <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
