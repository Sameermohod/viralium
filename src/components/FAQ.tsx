import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const faqs: FAQItem[] = [
    {
      question: 'What types of cameras and gear does Viralium shoot on?',
      answer: 'We capture visuals using industry-standard digital cinema platforms, including RED V-Raptor and Sony FX series, paired with premium anamorphic prime lenses, active gimbal stabilization rigs, and professional DJI Inspire series drones for aerial shoots.'
    },
    {
      question: 'Do you write the scripts and handle storyboards?',
      answer: 'Yes! We provide full pre-production services. Our creative team handles concepts, scriptwriting, pacing maps, shot lists, casting direction, and storyboards before we set foot on set.'
    },
    {
      question: 'How long does a typical video project take from start to finish?',
      answer: 'Generally, small-scale Reels or social media campaigns take 1 to 2 weeks. Larger commercial brand ads, music videos, or product shoots take 3 to 6 weeks, which includes scripting, shooting, visual editing, and color grading cycles.'
    },
    {
      question: 'Do you offer custom web design and application development?',
      answer: 'Yes, we provide high-performance digital services (Portfolio sites, custom E-commerce setups, CRM platforms) for clients who want their digital storefronts to match the cinematic luxury styling of their video assets.'
    },
    {
      question: 'How do you structure project pricing and booking deposits?',
      answer: 'Every project is custom-quoted based on crew size, equipment needs, shoot days, and post-production complexity. We typically structure agreements with a 50% booking deposit, with the remaining 50% due upon final approval of project deliverables.'
    }
  ];

  return (
    <section 
      id="faq" 
      ref={containerRef} 
      className="py-24 bg-neutral-950 text-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3"
          >
            Got Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight font-syne"
          >
            Frequently Answered.
          </motion.h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glassmorphism rounded-2xl overflow-hidden border border-white/5"
              >
                {/* Header toggle button */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 md:py-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold font-syne text-sm md:text-base pr-4 text-white">
                    {faq.question}
                  </span>
                  <div className="text-[#ff6b00] p-1 bg-neutral-950 rounded-full border border-white/5">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {/* Collapsible content panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-xs md:text-sm text-neutral-400 font-light leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
