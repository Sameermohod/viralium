import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, X, Calendar, User, ArrowUpRight } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'image';
  src: string;
  thumbnail: string;
  client: string;
  date: string;
  desc: string;
  aspectClass?: string;
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const categories = [
    'All',
    'Brand Ads',
    'Product Videos',
    'Reels',
    'Photography',
    'Music Videos',
    'Commercials',
    'Corporate',
    'Behind The Scenes'
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'Aura Luxury Perfume',
      category: 'Product Videos',
      type: 'video',
      src: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d90d965d50972413e9a03b3&profile_id=139&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
      client: 'Aura Paris',
      date: 'April 2026',
      desc: 'A sensory commercial film showcasing the luxury glass design and gold mist notes of Aura Perfume. Shot on RED V-Raptor.',
      aspectClass: 'aspect-[3/4]'
    },
    {
      id: '2',
      title: 'Chronos Timepiece Campaign',
      category: 'Brand Ads',
      type: 'video',
      src: 'https://player.vimeo.com/external/403848749.sd.mp4?s=d0db5d51829e5a88c3a164b155f93539e0836528&profile_id=165&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      client: 'Chronos Watches',
      date: 'June 2026',
      desc: 'Cinematic brand film for premium chronographs. Focused on water resistance, macro detail shots, and ticking precision.',
      aspectClass: 'aspect-[16/9]'
    },
    {
      id: '3',
      title: 'Solstice Summer Fashion',
      category: 'Photography',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      client: 'Solstice Label',
      date: 'May 2026',
      desc: 'High-fashion editorial campaign captured in desert sunlight. Warm filters, heavy shadows, and linen textures.',
      aspectClass: 'aspect-[3/4]'
    },
    {
      id: '4',
      title: 'Nova Electric Supercar',
      category: 'Commercials',
      type: 'video',
      src: 'https://player.vimeo.com/external/517617478.sd.mp4?s=74f4b9f271efd36f2f3d9d71fa9d1c1c1f4e1f72&profile_id=165&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
      client: 'Nova Motors',
      date: 'March 2026',
      desc: 'Commercial highlighting aerodynamics and high-voltage performance. Dynamic gimbal track shots and neon grading.',
      aspectClass: 'aspect-[16/9]'
    },
    {
      id: '5',
      title: 'Pulse Neon Rap Video',
      category: 'Music Videos',
      type: 'video',
      src: 'https://player.vimeo.com/external/554839818.sd.mp4?s=d7e63b6b19a16f91f7c223c6cd631e8b2b95c37c&profile_id=165&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      client: 'Yung Pulse',
      date: 'January 2026',
      desc: 'A futuristic cyber-rap music video featuring rapid transition editing, glitch effects, neon lasers, and high-contrast grading.',
      aspectClass: 'aspect-[16/9]'
    },
    {
      id: '6',
      title: 'Infinite Urban Reel',
      category: 'Reels',
      type: 'video',
      src: 'https://player.vimeo.com/external/554839818.sd.mp4?s=d7e63b6b19a16f91f7c223c6cd631e8b2b95c37c&profile_id=165&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80',
      client: 'Velo Clothing',
      date: 'February 2026',
      desc: 'Vertical 9:16 high-retention reel displaying street fashion in Tokyo. Staggered cuts matching the beat drop.',
      aspectClass: 'aspect-[9/16]'
    },
    {
      id: '7',
      title: 'RED Camera Rig Setup',
      category: 'Behind The Scenes',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
      client: 'Viralium BTS',
      date: 'Ongoing',
      desc: 'Close-up look at our custom camera rigs, wireless video systems, anamorphic lenses, and stabilizer setups.',
      aspectClass: 'aspect-[4/3]'
    },
    {
      id: '8',
      title: 'Apex Office Architecture',
      category: 'Corporate',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      client: 'Apex Group',
      date: 'February 2026',
      desc: 'Corporate design and architectural overview for Apex headquarters. Minimal layout, geometric composition, and clean lighting.',
      aspectClass: 'aspect-[16/9]'
    },
    {
      id: '9',
      title: 'Whispering Woods Editorial',
      category: 'Photography',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
      client: 'Wild Wander',
      date: 'July 2026',
      desc: 'Outdoor lifestyle portraiture showcasing extreme weather apparel. Cold cinematic tones, morning fog backdrop.',
      aspectClass: 'aspect-[3/4]'
    },
    {
      id: '10',
      title: 'Ascend Tech Keynote Promo',
      category: 'Corporate',
      type: 'video',
      src: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d90d965d50972413e9a03b3&profile_id=139&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
      client: 'Ascend AI',
      date: 'January 2026',
      desc: 'Cinematic corporate keynote preview film, featuring motion typography overlays, minimalist office shoots, and executive interviews.',
      aspectClass: 'aspect-[16/9]'
    }
  ];

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section 
      id="portfolio" 
      ref={containerRef} 
      className="py-24 bg-neutral-950 text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3"
            >
              Creative Collection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tighter font-syne"
            >
              Visual Masterpieces.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-neutral-500 max-w-xs text-sm"
          >
            Hover cards to play reel snippets. Select categories to filter our narrative works.
          </motion.div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex overflow-x-auto gap-3 pb-8 scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-white text-black font-bold'
                  : 'bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden group border border-white/5 bg-neutral-900 cursor-pointer"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedItem(item)}
                data-cursor="view"
                data-cursor-text="view"
              >
                {/* Visual Media Container */}
                <div className={`relative overflow-hidden w-full ${item.aspectClass || 'aspect-[4/5]'} bg-neutral-950`}>
                  {item.type === 'video' && hoveredId === item.id ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Subtle Video Badge Icon */}
                  {item.type === 'video' && hoveredId !== item.id && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 z-10">
                      <Play size={12} className="fill-current text-white" />
                    </div>
                  )}

                  {/* Hover Information overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[10px] text-[#ff6b00] uppercase font-bold tracking-widest mb-1.5">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold font-syne text-white flex items-center gap-1.5">
                      {item.title} <ArrowUpRight size={16} />
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project details popup modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Global viewport-fixed close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="fixed top-6 right-6 md:top-8 md:right-8 bg-black/75 border border-white/10 text-white p-3 rounded-full hover:bg-[#ff6b00] hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <motion.div
              className="bg-neutral-900 border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, y: 55 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 55 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Banner Video/Image Display */}
              <div className="relative aspect-video w-full bg-black border-b border-white/5">
                {selectedItem.type === 'video' ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  >
                    <source src={selectedItem.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain bg-black"
                  />
                )}
              </div>

              {/* Description Content */}
              <div className="p-6 md:p-10 overflow-y-auto flex-grow flex flex-col md:flex-row gap-8 bg-neutral-900">
                <div className="md:w-2/3">
                  <span className="text-[10px] text-[#ff6b00] uppercase font-bold tracking-widest mb-2 block">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold font-syne text-white mb-4">
                    {selectedItem.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
                    {selectedItem.desc}
                  </p>
                </div>

                {/* Metadata card */}
                <div className="md:w-1/3 bg-neutral-950/60 rounded-2xl p-6 border border-white/5 flex flex-col gap-4 justify-center">
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-neutral-500" />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-600 font-bold block">Client</span>
                      <span className="text-xs font-semibold text-white">{selectedItem.client}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-neutral-500" />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-600 font-bold block">Date</span>
                      <span className="text-xs font-semibold text-white">{selectedItem.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
