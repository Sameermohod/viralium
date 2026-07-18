import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Calendar, User, ArrowUpRight, Trash2, Edit, Plus, Save, Upload as UploadIcon } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import type { PortfolioItem } from '../context/ContentContext';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef(null);

  const { content, updateContent, isAdminMode } = useContent();
  const portfolioItems = content.portfolio;

  // Admin CRUD states
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Brand Ads');
  const [formType, setFormType] = useState<'video' | 'image'>('video');
  const [formSrc, setFormSrc] = useState('');
  const [formThumbnail, setFormThumbnail] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formAspect, setFormAspect] = useState('aspect-[16/9]');

  // Upload S3 states
  const [isUploadingSrc, setIsUploadingSrc] = useState(false);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [uploadError, setUploadError] = useState('');

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

  const handleAddNewClick = () => {
    setFormTitle('');
    setFormCategory('Brand Ads');
    setFormType('video');
    setFormSrc('');
    setFormThumbnail('');
    setFormClient('');
    setFormDate('');
    setFormDesc('');
    setFormAspect('aspect-[16/9]');
    setUploadError('');
    setIsAddingNew(true);
  };

  const handleEditClick = (e: React.MouseEvent, item: PortfolioItem) => {
    e.stopPropagation();
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormType(item.type);
    setFormSrc(item.src);
    setFormThumbnail(item.thumbnail);
    setFormClient(item.client);
    setFormDate(item.date);
    setFormDesc(item.desc);
    setFormAspect(item.aspectClass || 'aspect-[16/9]');
    setUploadError('');
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = portfolioItems.filter((item) => item.id !== id);
      updateContent('portfolio', updated);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'src' | 'thumb') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (targetField === 'src') setIsUploadingSrc(true);
    else setIsUploadingThumb(true);
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

      if (targetField === 'src') {
        setFormSrc(data.url);
      } else {
        setFormThumbnail(data.url);
      }
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Error uploading file.');
    } finally {
      setIsUploadingSrc(false);
      setIsUploadingThumb(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: PortfolioItem = {
      id: editingItem ? editingItem.id : String(Date.now()),
      title: formTitle,
      category: formCategory,
      type: formType,
      src: formSrc,
      thumbnail: formThumbnail,
      client: formClient,
      date: formDate,
      desc: formDesc,
      aspectClass: formAspect
    };

    let updatedList;
    if (editingItem) {
      updatedList = portfolioItems.map((item) => item.id === editingItem.id ? newItem : item);
    } else {
      updatedList = [newItem, ...portfolioItems];
    }
    updateContent('portfolio', updatedList);
    setIsAddingNew(false);
    setEditingItem(null);
  };

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
            <p className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3">
              Creative Collection
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter font-syne">
              Visual Masterpieces.
            </h2>
          </div>
          <div className="text-neutral-500 max-w-xs text-sm">
            Hover cards to play reel snippets. Select categories to filter our narrative works.
          </div>
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
          {/* Admin Add New Card */}
          {isAdminMode && (
            <div 
              onClick={handleAddNewClick}
              className="break-inside-avoid relative rounded-2xl border border-dashed border-white/20 hover:border-[#ff6b00] bg-neutral-900/30 hover:bg-neutral-900/60 p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#ff6b00]/10 text-[#ff6b00] flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300">
                <Plus size={22} />
              </div>
              <h4 className="text-sm font-bold text-white font-syne">Add New Project</h4>
              <p className="text-xs text-neutral-500 mt-1 max-w-[200px]">Publish a new video or photo showcase to the collection.</p>
            </div>
          )}

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
                {/* Admin Quick Controls Overlay */}
                {isAdminMode && (
                  <div className="absolute top-4 left-4 z-40 flex gap-2">
                    <button
                      onClick={(e) => handleEditClick(e, item)}
                      className="bg-neutral-900 hover:bg-[#ff6b00] border border-white/10 text-white p-2 rounded-lg shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
                      title="Edit Project"
                    >
                      <Edit size={12} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(e, item.id)}
                      className="bg-neutral-900 hover:bg-red-600 border border-white/10 text-white hover:text-white p-2 rounded-lg shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
                      title="Delete Project"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}

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

      {/* Project details popup modal (Portalled to document.body) */}
      <AnimatePresence>
        {selectedItem && createPortal(
          <motion.div
            className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-[99999] flex items-center justify-center p-4 md:p-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/10 hover:bg-[#ff6b00] border border-white/10 text-white p-3 rounded-full hover:scale-110 transition-all duration-300 z-50 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Card content wrapper */}
            <motion.div
              className="w-full max-w-5xl bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:grid md:grid-cols-12 max-h-[90vh] md:max-h-[80vh]"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media Left Panel */}
              <div className="md:col-span-7 bg-neutral-950 aspect-video md:aspect-auto md:h-full flex items-center justify-center overflow-hidden relative">
                {selectedItem.type === 'video' ? (
                  <video
                    key={selectedItem.src}
                    autoPlay
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    <source src={selectedItem.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Text Right Panel */}
              <div className="md:col-span-5 p-8 flex flex-col justify-between overflow-y-auto bg-neutral-900">
                <div>
                  <span className="text-xs text-[#ff6b00] uppercase font-bold tracking-wider mb-2 inline-block">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold font-syne text-white tracking-tight mb-4 leading-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8">
                    {selectedItem.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col gap-3 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-[#ff6b00]" />
                    <span>Client: <strong className="text-white font-medium">{selectedItem.client}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#ff6b00]" />
                    <span>Date: <strong className="text-white font-medium">{selectedItem.date}</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>

      {/* Portfolio Item Add/Edit Form Modal (Portalled to document.body) */}
      {(isAddingNew || editingItem) && createPortal(
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[99999] flex items-center justify-center p-4 overflow-y-auto text-white">
          <div 
            className="w-full max-w-xl bg-neutral-950 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingItem(null);
              }}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold font-syne text-white mb-6 flex items-center gap-2">
              {editingItem ? <Edit className="text-[#ff6b00]" size={20} /> : <Plus className="text-[#ff6b00]" size={20} />}
              {editingItem ? 'Edit Project Details' : 'Create New Project'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Client Name</label>
                  <input
                    type="text"
                    required
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Publish Date</label>
                  <input
                    type="text"
                    placeholder="e.g. June 2026"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Grid Aspect Ratio</label>
                  <select
                    value={formAspect}
                    onChange={(e) => setFormAspect(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                  >
                    <option value="aspect-[16/9]">16:9 Landscape</option>
                    <option value="aspect-[3/4]">3:4 Portrait</option>
                    <option value="aspect-[1/1]">1:1 Square</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Display Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                  >
                    <option value="video">Autoplay Video Snippet</option>
                    <option value="image">Static Image Showcase</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Thumbnail Image URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formThumbnail}
                    onChange={(e) => setFormThumbnail(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                  />
                  <div className="mt-2 p-2 bg-neutral-900/60 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-[9px] text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                      <UploadIcon size={10} className="text-[#ff6b00]" />
                      Upload S3
                    </span>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'thumb')}
                      disabled={isUploadingThumb}
                      className="text-[9px] text-neutral-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 disabled:opacity-50 cursor-pointer"
                    />
                    {isUploadingThumb && <span className="text-[10px] text-amber-500 animate-pulse">Uploading...</span>}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Media Source URL (Direct MP4 / Image)</label>
                <input
                  type="url"
                  required
                  placeholder="e.g. direct mp4 link or image link"
                  value={formSrc}
                  onChange={(e) => setFormSrc(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b00]"
                />
                <div className="mt-2 p-3 bg-neutral-900/60 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                    <UploadIcon size={10} className="text-[#ff6b00]" />
                    Upload S3 Video / Image
                  </span>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'src')}
                    disabled={isUploadingSrc}
                    className="text-[9px] text-neutral-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 disabled:opacity-50 cursor-pointer"
                  />
                  {isUploadingSrc && <span className="text-[10px] text-amber-500 animate-pulse">Uploading...</span>}
                </div>
                {uploadError && <p className="text-xs text-red-500 mt-1.5">{uploadError}</p>}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Description</label>
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
                    setEditingItem(null);
                  }}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingSrc || isUploadingThumb}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#d4af37] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save size={13} />
                  Save Project
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
