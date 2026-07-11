import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Video, Camera, Users, Zap, TrendingUp, Compass } from 'lucide-react';

export default function WhyViralium() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const reasons = [
    {
      title: 'Creative Storytelling',
      desc: 'We write scripts that grab attention immediately and maintain emotional investment, building deep consumer trust.',
      icon: <MessageSquare className="text-[#ff6b00]" size={20} />
    },
    {
      title: 'Professional Production',
      desc: 'Cinematic lighting, high-end stabilization, and crisp audio. We do not compromise on technical quality.',
      icon: <Video className="text-[#d4af37]" size={20} />
    },
    {
      title: 'Modern Equipment',
      desc: 'Filming on RED Digital Cinema, Sony FX series, anamorphic lenses, and professional DJI aerial drone platforms.',
      icon: <Camera className="text-purple-400" size={20} />
    },
    {
      title: 'Elite Creative Team',
      desc: 'Experienced directors, directors of photography, editors, colorists, and social distribution strategists.',
      icon: <Users className="text-blue-400" size={20} />
    },
    {
      title: 'High Velocity Execution',
      desc: 'Streamlined scripting and rapid editing workflows ensure your campaigns launch while concepts are hot.',
      icon: <Zap className="text-yellow-400" size={20} />
    },
    {
      title: 'Performance Marketing',
      desc: 'Merging beautiful visuals with data. We structure campaigns around conversion rates, pixel data, and ad spend ROI.',
      icon: <TrendingUp className="text-emerald-400" size={20} />
    },
    {
      title: 'End-to-End Solutions',
      desc: 'From the initial strategy session and scripting to shooting, editing, ad campaign deployment, and analytics.',
      icon: <Compass className="text-pink-400" size={20} />
    }
  ];

  return (
    <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="max-w-3xl mb-16" ref={containerRef}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3"
          >
            The Viralium Edge
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tighter font-syne mb-6"
          >
            Why Brands Partner With Us.
          </motion.h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Main big CTA grid card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-gradient-to-br from-[#ff6b00] via-[#d4af37] to-purple-600 rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[280px] shadow-xl shadow-brand-orange/5"
          >
            <h3 className="text-2xl md:text-4xl font-extrabold font-syne text-white leading-tight">
              We do not just create content. We engineer brand assets.
            </h3>
            
            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-xs uppercase tracking-wider text-white/80 font-bold">
                Viralium Quality Benchmark
              </p>
              <p className="text-sm text-white/90 font-light mt-1.5 leading-relaxed">
                We combine cinematic visual arts with performance-marketing algorithms to guarantee that every video produced achieves maximum reach and conversion.
              </p>
            </div>
          </motion.div>

          {/* Individual cards */}
          {reasons.map((reason, idx) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.08 }}
              className="glassmorphism rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:translate-y-[-6px] transition-transform duration-300 border border-white/5 hover:border-white/10"
            >
              <div className="p-3 bg-neutral-900 rounded-2xl border border-white/5 w-fit mb-6">
                {reason.icon}
              </div>

              <div>
                <h3 className="text-lg font-bold font-syne text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
