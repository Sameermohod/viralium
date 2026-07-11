import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Video, Award, Camera, MonitorPlay, Globe, Cpu, ChevronRight } from 'lucide-react';

export default function Services() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const creativeServices = [
    {
      title: 'Cinematic Video Production',
      desc: 'Creating high-end narrative content that captures emotional interest and establishes immediate authority.',
      items: ['Brand Advertisement Videos', 'Product Advertisement Videos', 'Commercial Ads', 'Client Testimonials'],
      icon: <Video className="text-[#ff6b00]" size={24} />
    },
    {
      title: 'Social & Short-Form Content',
      desc: 'Viral-engineered short form vertical media designed to scale organic traffic and capture viewer retention.',
      items: ['Social Media Reels', 'Instagram Layout Content', 'Music Videos', 'Event Coverage'],
      icon: <MonitorPlay className="text-purple-400" size={24} />
    },
    {
      title: 'Premium Photography',
      desc: 'High-definition editorial imagery highlighting brand aesthetics, craftsmanship, and raw human element.',
      items: ['Product Shoots', 'Fashion Shoots', 'Portfolio Shoots', 'Corporate Photography'],
      icon: <Camera className="text-[#d4af37]" size={24} />
    },
    {
      title: 'Editing & Motion Design',
      desc: 'Polishing raw cuts with world-class sound design, custom motion graphics, color correction, and visual effects.',
      items: ['Advanced Video Editing', 'Motion Graphics', 'Sound FX Design', 'Color Grading (DaVinci)'],
      icon: <Award className="text-blue-400" size={24} />
    }
  ];

  const digitalServices = [
    {
      title: 'Custom Software & Web Solutions',
      items: ['E-commerce Web Development', 'CRM & ERP Development', 'Custom Software Architecture', 'MERN Stack Development'],
      icon: <Globe className="text-neutral-500" size={16} />
    },
    {
      title: 'AI Integrations & Automation',
      items: ['AI Chatbots & Agents', 'Workflow Automations', 'Brand Strategy Automation'],
      icon: <Cpu className="text-neutral-500" size={16} />
    }
  ];

  return (
    <section 
      id="services" 
      ref={containerRef} 
      className="py-24 bg-neutral-950 text-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ff6b00]/5 blur-[120px] rounded-full" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tighter font-syne mb-6"
          >
            Premium Services.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 font-light leading-relaxed max-w-xl text-sm md:text-base"
          >
            Our core mission is storytelling. We build brands through stunning visual design, cinematic video production, and high-impact digital marketing campaigns.
          </motion.p>
        </div>

        {/* Primary Services: Creative Production */}
        <div className="mb-20">
          <div className="border-b border-white/10 pb-4 mb-8">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-extrabold">
              01 / Creative Production & Strategy (Primary Focus)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {creativeServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group glassmorphism glow-hover rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[380px] hover:translate-y-[-6px] transition-transform duration-500"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="p-3.5 bg-neutral-900/80 rounded-2xl border border-white/5 group-hover:scale-105 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <span className="text-xs font-mono text-neutral-600 group-hover:text-[#ff6b00] transition-colors">
                      [0{idx + 1}]
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold font-syne mb-4 text-white group-hover:text-gradient-gold">
                    {service.title}
                  </h4>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Sublist tags */}
                <div className="flex flex-wrap gap-2.5">
                  {service.items.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-full text-neutral-300 group-hover:bg-white/10 group-hover:text-white transition-all"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Secondary Services: Digital Solutions */}
        <div>
          <div className="border-b border-white/10 pb-4 mb-8">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-extrabold">
              02 / Secondary Services (Digital & Development)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {digitalServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.15 }}
                className="glassmorphism-light rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-neutral-900 rounded-lg border border-white/5 mt-0.5 text-neutral-400">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold font-syne text-white/80 mb-2">
                      {service.title}
                    </h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {service.items.map((item, i) => (
                        <span key={item} className="text-xs text-neutral-500 font-light flex items-center gap-1">
                          {item} {i < service.items.length - 1 && <span className="text-neutral-700">•</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <span className="text-xs text-neutral-600 font-mono tracking-widest uppercase self-end md:self-auto flex items-center gap-1">
                  SUPP-SERV <ChevronRight size={12} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
