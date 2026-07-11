import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Play, MessageCircle, Heart, Share2 } from 'lucide-react';

interface Reel {
  id: number;
  videoSrc: string;
  title: string;
  views: string;
  description: string;
  sound: string;
}

export default function ReelsShowcase() {
  const [activeReelIdx, setActiveReelIdx] = useState(0);

  const reels: Reel[] = [
    {
      id: 1,
      videoSrc: 'https://player.vimeo.com/external/554839818.sd.mp4?s=d7e63b6b19a16f91f7c223c6cd631e8b2b95c37c&profile_id=165&oauth2_token_id=57447761',
      title: 'Neon Urban Streetwear',
      views: '1.2M views',
      description: 'Staggered visual pacing cut for clothing drops. Dynamic zoom transitions synced to deep bass loops.',
      sound: 'Original Audio - Viralium Music'
    },
    {
      id: 2,
      videoSrc: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d90d965d50972413e9a03b3&profile_id=139&oauth2_token_id=57447761',
      title: 'Macro Watch Mechanics',
      views: '840K views',
      description: 'Slow-motion macro gears detail shots. High-contrast studio lighting emphasizing metallic reflections.',
      sound: 'Ambient Soundscape - Chronos'
    },
    {
      id: 3,
      videoSrc: 'https://player.vimeo.com/external/517617478.sd.mp4?s=74f4b9f271efd36f2f3d9d71fa9d1c1c1f4e1f72&profile_id=165&oauth2_token_id=57447761',
      title: 'Automotive Aero Glide',
      views: '2.4M views',
      description: 'Track-gimbal tracking shot showing luxury EV corner drifting. Custom engine sound overlays.',
      sound: 'Original Audio - Nova Supercar'
    }
  ];

  const handleNext = () => {
    setActiveReelIdx((prev) => (prev + 1) % reels.length);
  };

  const handlePrev = () => {
    setActiveReelIdx((prev) => (prev - 1 + reels.length) % reels.length);
  };

  return (
    <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Visual mobile frame */}
          <div className="flex justify-center items-center relative">
            
            {/* Swiper Controls */}
            <div className="absolute left-4 md:-left-8 flex flex-col gap-3 z-20">
              <button
                onClick={handlePrev}
                className="bg-neutral-900 border border-white/10 text-white hover:bg-[#ff6b00] hover:border-transparent p-3 rounded-full transition-all duration-300"
                aria-label="Previous Reel"
              >
                <ChevronUp size={18} />
              </button>
              <button
                onClick={handleNext}
                className="bg-neutral-900 border border-white/10 text-white hover:bg-[#ff6b00] hover:border-transparent p-3 rounded-full transition-all duration-300"
                aria-label="Next Reel"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Mobile Device Container Mockup */}
            <div className="relative w-[300px] h-[600px] rounded-[50px] border-[12px] border-neutral-900 bg-neutral-950 shadow-2xl overflow-hidden shadow-purple-500/5">
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-3 h-3 bg-neutral-950 rounded-full border border-neutral-900" />
              </div>

              {/* Inner video player screen */}
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReelIdx}
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -200, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={reels[activeReelIdx].videoSrc} type="video/mp4" />
                    </video>

                    {/* Gradient Overlay for labels */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Instagram UI Overlays */}
                    <div className="absolute bottom-6 left-4 right-12 z-10 flex flex-col items-start text-left">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff6b00] mb-1">
                        @viralium.studio
                      </span>
                      <h4 className="text-sm font-bold text-white mb-2">
                        {reels[activeReelIdx].title}
                      </h4>
                      <p className="text-xs text-neutral-300 leading-relaxed font-light mb-3 line-clamp-2">
                        {reels[activeReelIdx].description}
                      </p>
                      <div className="text-[10px] text-neutral-400 flex items-center gap-1 font-mono">
                        <Play size={10} /> {reels[activeReelIdx].sound}
                      </div>
                    </div>

                    {/* Interaction Buttons on Right */}
                    <div className="absolute right-3 bottom-12 z-10 flex flex-col gap-5 items-center">
                      <div className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/5 group-hover:bg-[#ff6b00] transition-colors">
                          <Heart size={16} />
                        </div>
                        <span className="text-[8px] text-neutral-400">124K</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/5 group-hover:bg-[#ff6b00] transition-colors">
                          <MessageCircle size={16} />
                        </div>
                        <span className="text-[8px] text-neutral-400">842</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/5 group-hover:bg-[#ff6b00] transition-colors">
                          <Share2 size={16} />
                        </div>
                        <span className="text-[8px] text-neutral-400">Share</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative details */}
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3">
              Short-Form Engineering
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-syne mb-8">
              Reels That Command Attention.
            </h2>
            
            <p className="text-neutral-400 font-light leading-relaxed mb-8 text-sm md:text-base">
              Short-form vertical video is the fastest way to build modern brands. We engineer reels with precise hooks, high-retention editing patterns, visual subtitles, and audio soundscapes to ensure maximum reach.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <span className="text-xl font-bold font-syne text-[#ff6b00]">95%</span>
                <div>
                  <h4 className="text-base font-bold font-syne text-white">First 3-Second Hook</h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed mt-1">
                    Visual hooks within the first 3 seconds to keep users from swiping past.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-xl font-bold font-syne text-[#d4af37]">2x</span>
                <div>
                  <h4 className="text-base font-bold font-syne text-white">Pacing & Sound Design</h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed mt-1">
                    Matching video edits to trending audio drops and soundscapes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-xl font-bold font-syne text-purple-400">10x</span>
                <div>
                  <h4 className="text-base font-bold font-syne text-white">Algorithmic Reach</h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed mt-1">
                    Optimized formats and subtitles ensuring maximum discoverability on Instagram, TikTok, and YouTube Shorts.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
