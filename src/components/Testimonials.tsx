import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Director of Marketing',
      company: 'Aura Luxury Perfume',
      content: 'Viralium exceeded all expectations. The cinematic product video they shot increased our website conversion rates by 48% and generated millions of impressions on social media.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'Marcus Thorne',
      role: 'Founder & CEO',
      company: 'Chronos Watches',
      content: 'Their team understands premium visual storytelling. The macros of watch gears look absolutely pristine. We finally have a brand video that feels luxury.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Creative Lead',
      company: 'Solstice Fashion Label',
      content: 'The lighting, model styling, and composition of our photography shoots were spectacular. The turnaround speed was impressive. Viralium is our go-to creative agency.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    }
  ];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3">
            Client Feedback
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-syne">
            Loved By Industry Leaders.
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div className="relative glassmorphism rounded-3xl p-8 md:p-16 flex flex-col items-center text-center shadow-xl border border-white/5 min-h-[380px] justify-center">
          {/* Quote Icon background decoration */}
          <div className="absolute top-6 left-6 text-white/5 select-none pointer-events-none">
            <Quote size={80} className="fill-current" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIdx].rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current text-[#d4af37]" />
                ))}
              </div>

              {/* Review content */}
              <p className="text-lg md:text-2xl font-light text-neutral-200 italic leading-relaxed max-w-3xl mb-8">
                "{testimonials[currentIdx].content}"
              </p>

              {/* Profile details */}
              <div className="flex items-center gap-4 text-left">
                <img
                  src={testimonials[currentIdx].avatar}
                  alt={testimonials[currentIdx].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                />
                <div>
                  <h4 className="font-bold font-syne text-white text-base">
                    {testimonials[currentIdx].name}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">
                    {testimonials[currentIdx].role} —{' '}
                    <span className="text-[#ff6b00] font-semibold">
                      {testimonials[currentIdx].company}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Arrows */}
          <div className="flex gap-4 mt-12">
            <button
              onClick={handlePrev}
              className="w-12 h-12 bg-neutral-900 hover:bg-[#ff6b00] border border-white/5 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 bg-neutral-900 hover:bg-[#ff6b00] border border-white/5 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
