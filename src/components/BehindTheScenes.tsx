import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function BehindTheScenes() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
      span: 'md:col-span-2 md:row-span-2',
      title: 'Cinematography Rigs',
      subtitle: 'RED V-Raptor, anamorphic lens setup'
    },
    {
      url: 'https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?auto=format&fit=crop&w=600&q=80',
      span: 'md:col-span-1 md:row-span-1',
      title: 'Color Grading Suite',
      subtitle: 'DaVinci Resolve panels'
    },
    {
      url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=600&q=80',
      span: 'md:col-span-1 md:row-span-2',
      title: 'Lighting & Set Design',
      subtitle: 'Commercial studio configurations'
    },
    {
      url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
      span: 'md:col-span-2 md:row-span-1',
      title: 'Directing On Set',
      subtitle: 'Guiding actors and framing movement'
    }
  ];

  return (
    <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8" ref={containerRef}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3"
            >
              Behind The Scenes
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tighter font-syne"
            >
              How the Magic Happens.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 max-w-xs text-sm font-light"
          >
            A sneak peek inside our high-end production gear, color correction booths, and dynamic shooting sets.
          </motion.div>
        </div>

        {/* Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.215, 0.61, 0.355, 1] }}
              className={`${img.span} relative rounded-3xl overflow-hidden group border border-white/5 bg-neutral-900 cursor-pointer`}
            >
              {/* Image */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

              {/* Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 text-left">
                <span className="text-[10px] text-[#ff6b00] uppercase font-bold tracking-widest block mb-1">
                  {img.subtitle}
                </span>
                <h3 className="text-lg font-bold font-syne text-white">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
