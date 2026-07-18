import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronUp, ChevronDown, Play, MessageCircle, Heart, Share2, Plus, Edit, Trash2, Save, X, Upload as UploadIcon } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import type { ReelItem } from '../context/ContentContext';

export default function ReelsShowcase() {
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isSectionVisible = useInView(sectionRef, { amount: 0.1 });

  const { content, updateContent, isAdminMode } = useContent();
  const reels = content.reels;

  // Admin CRUD states
  const [editingReel, setEditingReel] = useState<ReelItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formViews, setFormViews] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formSound, setFormSound] = useState('');
  const [formSrc, setFormSrc] = useState('');

  // Upload S3 state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (videoRef.current) {
      if (isSectionVisible) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isSectionVisible, activeReelIdx, reels]);

  const handleNext = () => {
    if (reels.length === 0) return;
    setActiveReelIdx((prev) => (prev + 1) % reels.length);
  };

  const handlePrev = () => {
    if (reels.length === 0) return;
    setActiveReelIdx((prev) => (prev - 1 + reels.length) % reels.length);
  };

  const handleAddNewClick = () => {
    setFormTitle('');
    setFormViews('500K views');
    setFormDesc('');
    setFormSound('Original Audio - Viraliam');
    setFormSrc('');
    setUploadError('');
    setIsAddingNew(true);
  };

  const handleEditClick = (reel: ReelItem) => {
    setEditingReel(reel);
    setFormTitle(reel.title);
    setFormViews(reel.views);
    setFormDesc(reel.description);
    setFormSound(reel.sound);
    setFormSrc(reel.videoSrc);
    setUploadError('');
  };

  const handleDeleteClick = (id: number) => {
    if (reels.length <= 1) {
      alert("You must keep at least one reel showcase item.");
      return;
    }
    if (window.confirm('Are you sure you want to delete this reel?')) {
      const updated = reels.filter((r) => r.id !== id);
      updateContent('reels', updated);
      setActiveReelIdx(0);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'S3 Upload failed');
      }

      setFormSrc(data.url);
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Error uploading file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReel: ReelItem = {
      id: editingReel ? editingReel.id : Date.now(),
      title: formTitle,
      views: formViews,
      description: formDesc,
      sound: formSound,
      videoSrc: formSrc
    };

    let updatedList;
    if (editingReel) {
      updatedList = reels.map((r) => r.id === editingReel.id ? newReel : r);
    } else {
      updatedList = [...reels, newReel];
    }
    updateContent('reels', updatedList);
    setIsAddingNew(false);
    setEditingReel(null);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Visual mobile frame */}
          <div className="flex justify-center items-center relative">
            
            {/* Swiper Controls */}
            {reels.length > 0 && (
              <div className="absolute left-4 md:-left-8 flex flex-col gap-3 z-20">
                <button
                  onClick={handlePrev}
                  className="bg-neutral-900 border border-white/10 text-white hover:bg-[#ff6b00] hover:border-transparent p-3 rounded-full transition-all duration-300 cursor-pointer"
                  aria-label="Previous Reel"
                >
                  <ChevronUp size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-neutral-900 border border-white/10 text-white hover:bg-[#ff6b00] hover:border-transparent p-3 rounded-full transition-all duration-300 cursor-pointer"
                  aria-label="Next Reel"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            )}

            {/* Mobile Device Container Mockup */}
            <div className="relative w-[300px] h-[600px] rounded-[50px] border-[12px] border-neutral-900 bg-neutral-950 shadow-2xl overflow-hidden shadow-purple-500/5">
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-3 h-3 bg-neutral-950 rounded-full border border-neutral-900" />
              </div>

              {/* Inner video player screen */}
              <div className="relative w-full h-full">
                {reels.length > 0 ? (
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
                        key={reels[activeReelIdx].videoSrc}
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      >
                        <source src={reels[activeReelIdx].videoSrc} type="video/mp4" />
                      </video>

                      {/* Gradient Overlay for labels */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Instagram UI Overlays */}
                      <div className="absolute bottom-6 left-4 right-12 z-10 flex flex-col items-start text-left">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff6b00] mb-1">
                          @viraliam_
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
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-neutral-600 bg-neutral-950">
                    <p className="text-xs">No reels added yet.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Narrative details */}
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3">
              Short-Form Engineering
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-syne mb-6">
              Reels That Command Attention.
            </h2>

            {/* Admin Controls Panel */}
            {isAdminMode && (
              <div className="flex gap-3 mb-8 p-3 bg-neutral-900/60 rounded-xl border border-white/5 max-w-sm">
                <button
                  onClick={handleAddNewClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff6b00] hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  <Plus size={13} />
                  Add Reel
                </button>
                {reels.length > 0 && (
                  <>
                    <button
                      onClick={() => handleEditClick(reels[activeReelIdx])}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-lg transition-colors border border-white/5 cursor-pointer"
                    >
                      <Edit size={13} />
                      Edit Active
                    </button>
                    <button
                      onClick={() => handleDeleteClick(reels[activeReelIdx].id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 hover:bg-red-600 text-neutral-400 hover:text-white text-xs font-bold rounded-lg transition-all border border-red-500/10 cursor-pointer"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
            
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

      {/* Reel Item Add/Edit Form Modal (Portalled to document.body) */}
      {(isAddingNew || editingReel) && createPortal(
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[99999] flex items-center justify-center p-4 text-white">
          <div 
            className="w-full max-w-md bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingReel(null);
              }}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-bold font-syne text-white mb-5 flex items-center gap-2">
              {editingReel ? <Edit className="text-[#ff6b00]" size={18} /> : <Plus className="text-[#ff6b00]" size={18} />}
              {editingReel ? 'Edit Reel Details' : 'Add New Reel'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Reel Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Views Metric</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1.2M views"
                    value={formViews}
                    onChange={(e) => setFormViews(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Audio Track Name</label>
                  <input
                    type="text"
                    required
                    value={formSound}
                    onChange={(e) => setFormSound(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Video MP4 Source URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://player.vimeo.com/external/..."
                  value={formSrc}
                  onChange={(e) => setFormSrc(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                />
                
                {/* Upload to S3 */}
                <div className="mt-2 p-3 bg-neutral-900/60 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                    <UploadIcon size={10} className="text-[#ff6b00]" />
                    Upload MP4 to S3
                  </span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="text-[9px] text-neutral-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 disabled:opacity-50 cursor-pointer"
                  />
                  {isUploading && <span className="text-[10px] text-amber-500 animate-pulse">Uploading...</span>}
                </div>
                {uploadError && <p className="text-xs text-red-500 mt-1.5">{uploadError}</p>}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Reel Caption</label>
                <textarea
                  required
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00] leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingReel(null);
                  }}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#d4af37] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save size={13} />
                  Save Reel
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
