import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Search, Compass, FileText, Camera, Film, Send, TrendingUp } from 'lucide-react';

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Scroll tracking for progress line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center']
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      title: 'Discover',
      tagline: 'Audit & DNA Extraction',
      desc: 'Analyzing your brand identity, competitors, and target demographics to find unique creative angles.',
      icon: <Search size={20} />
    },
    {
      title: 'Strategy',
      tagline: 'Distribution & Retention Mapping',
      desc: 'Structuring short-form retention patterns, pacing, advertising channels, and content calendars.',
      icon: <Compass size={20} />
    },
    {
      title: 'Script & Storyboard',
      tagline: 'Visual Flow & Hook Design',
      desc: 'Crafting high-retention dialogue scripts, frame concepts, visual direction, and shot lists.',
      icon: <FileText size={20} />
    },
    {
      title: 'Cinematic Shoot',
      tagline: 'RED / Arri Digital Capture',
      desc: 'Directing on-set photography, commercial lighting setups, and high-fidelity video acquisition.',
      icon: <Camera size={20} />
    },
    {
      title: 'Post-Production',
      tagline: 'Editing, VFX, & Grading',
      desc: 'DaVinci color grading, custom sound effects, modern pacing cuts, and engaging typography animations.',
      icon: <Film size={20} />
    },
    {
      title: 'Launch',
      tagline: 'Algorithmic Publishing',
      desc: 'Optimizing hooks, keywords, thumbnails, metadata, and distributing assets across marketing networks.',
      icon: <Send size={20} />
    },
    {
      title: 'Grow & Scale',
      tagline: 'Conversion & Audience Amplification',
      desc: 'Iterating on performance metrics, running paid campaigns (Meta/Google Ads), and scaling results.',
      icon: <TrendingUp size={20} />
    }
  ];

  return (
    <section 
      id="process" 
      ref={sectionRef} 
      className="py-24 bg-neutral-950 text-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#ff6b00]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3"
          >
            How We Execute
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tighter font-syne"
          >
            The Creative Process.
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative py-8">
          
          {/* Vertical Base Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-900 -translate-x-1/2" />

          {/* Glowing Progress Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff6b00] via-[#d4af37] to-purple-500 -translate-x-1/2 shadow-[0_0_12px_rgba(255,107,0,0.5)]"
          />

          {/* Timeline Items */}
          <div className="space-y-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={step.title} 
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Circle Indicator Icon */}
                  <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 w-12 h-12 rounded-full bg-neutral-900 border-2 border-neutral-800 -translate-x-1/2 -translate-y-1/3 md:-translate-y-1/2 z-10 flex items-center justify-center text-neutral-400 group hover:border-[#ff6b00] hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>

                  {/* Empty Spacer Column (Desktop) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Text Content Column */}
                  <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-12 mt-8 md:mt-0">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                      className="glassmorphism rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors duration-300 relative group"
                    >
                      {/* Step Number label */}
                      <span className="text-[10px] font-mono text-neutral-600 group-hover:text-[#ff6b00] transition-colors block mb-2">
                        PHASE 0{idx + 1}
                      </span>
                      
                      <h3 className="text-xl md:text-2xl font-bold font-syne text-white mb-1.5">
                        {step.title}
                      </h3>
                      
                      <h4 className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-4">
                        {step.tagline}
                      </h4>
                      
                      <p className="text-sm text-neutral-400 font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
