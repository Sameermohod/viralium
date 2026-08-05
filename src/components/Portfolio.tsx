import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Calendar, User, ArrowUpRight, Trash2, Edit, Plus, Save, Upload as UploadIcon, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Film, Grid, LayoutList } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import type { PortfolioItem } from '../context/ContentContext';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef(null);
  const gridScrollRef = useRef<HTMLDivElement>(null);

  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');

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
  const [formPlayAudio, setFormPlayAudio] = useState(false);

  // Upload S3 states
  const [isUploadingSrc, setIsUploadingSrc] = useState(false);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const categories = [
    'All',
    'Brand Ads',
    'Containt Creation',
    'Product Videos',
    'Reels',
    'Photography',
    'Music Videos',
    'Wedding Shoots',
    'Commercials',
    'Corporate',
    'Behind The Scenes'
  ];

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleScrollCheck = () => {
    if (gridScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth } = gridScrollRef.current;
      if (viewMode === 'grid') {
        setCanScrollUp(scrollTop > 15);
        setCanScrollDown(scrollTop + clientHeight < scrollHeight - 15);
      } else {
        setCanScrollUp(scrollLeft > 15);
        setCanScrollDown(scrollLeft + clientHeight < scrollWidth - 15);
      }
    }
  };

  useEffect(() => {
    handleScrollCheck();
    const timer = setTimeout(handleScrollCheck, 150);
    return () => clearTimeout(timer);
  }, [portfolioItems, activeCategory, viewMode]);

  const scrollContainer = (direction: 'prev' | 'next') => {
    if (gridScrollRef.current) {
      if (viewMode === 'grid') {
        const scrollAmount = direction === 'prev' ? -420 : 420;
        gridScrollRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      } else {
        const scrollAmount = direction === 'prev' ? -380 : 380;
        gridScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = gridScrollRef.current;
    if (!container) return;

    if (viewMode === 'grid') {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 4;
      const isAtTop = scrollTop <= 4;

      if ((e.deltaY > 0 && isAtBottom) || (e.deltaY < 0 && isAtTop)) {
        window.scrollBy({ top: e.deltaY, behavior: 'auto' });
      }
    } else {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const isAtRight = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 4;
      const isAtLeft = scrollLeft <= 4;

      if ((e.deltaY > 0 && isAtRight) || (e.deltaY < 0 && isAtLeft)) {
        window.scrollBy({ top: e.deltaY, behavior: 'auto' });
      }
    }
  };

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
    setFormPlayAudio(false);
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
    setFormPlayAudio(item.playAudio || false);
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
      aspectClass: formAspect,
      playAudio: formPlayAudio
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

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="py-24 bg-neutral-950 text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#f27424] font-bold mb-3">
              Creative Collection
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter font-syne">
              Visual Masterpieces.
            </h2>
          </div>
          <div className="text-neutral-500 max-w-xs text-sm">
            Hover cards to play reel snippets. Select categories or scroll through our collection.
          </div>
        </div>

        {/* Categories Tab Bar & Scroller Controls Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
          {/* Categories Bar */}
          <div className="flex overflow-x-auto gap-2.5 scrollbar-none py-1 -mx-6 px-6 md:mx-0 md:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/10 scale-105'
                    : 'bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Scroller Controls & Layout Toggle */}
          <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
            {/* Project Count Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-white/5 text-xs text-neutral-400">
              <Film size={13} className="text-[#f27424]" />
              <span className="font-mono text-white font-medium">{filteredItems.length}</span>
              <span>{filteredItems.length === 1 ? 'project' : 'projects'}</span>
            </div>

            {/* Layout View Switcher */}
            <div className="flex items-center bg-neutral-900 border border-white/5 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#f27424] text-white font-semibold shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
                title="Scrollable Grid View"
              >
                <Grid size={14} />
                <span className="hidden sm:inline text-[10px] uppercase font-bold">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('carousel')}
                className={`p-1.5 rounded-lg transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'carousel' ? 'bg-[#f27424] text-white font-semibold shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
                title="Horizontal Filmstrip Carousel"
              >
                <LayoutList size={14} />
                <span className="hidden sm:inline text-[10px] uppercase font-bold">Carousel</span>
              </button>
            </div>

            {/* Scroll Navigation Controls */}
            {(filteredItems.length > 3 || viewMode === 'carousel') && (
              <div className="flex items-center gap-1.5 bg-neutral-900 border border-white/5 p-1 rounded-xl">
                <button
                  onClick={() => scrollContainer('prev')}
                  disabled={!canScrollUp}
                  className="p-1.5 rounded-lg text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 transition-all cursor-pointer"
                  title={viewMode === 'grid' ? 'Scroll Up' : 'Scroll Left'}
                >
                  {viewMode === 'grid' ? <ChevronUp size={16} /> : <ChevronLeft size={16} />}
                </button>
                <button
                  onClick={() => scrollContainer('next')}
                  disabled={!canScrollDown}
                  className="p-1.5 rounded-lg text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 transition-all cursor-pointer"
                  title={viewMode === 'grid' ? 'Scroll Down' : 'Scroll Right'}
                >
                  {viewMode === 'grid' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Container Wrapper */}
        <div className="relative group/scroll">
          {/* Top / Left Fade Overlay */}
          {canScrollUp && viewMode === 'grid' && (
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-neutral-950 to-transparent z-20 transition-opacity duration-300" />
          )}
          {canScrollUp && viewMode === 'carousel' && (
            <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-neutral-950 to-transparent z-20 transition-opacity duration-300" />
          )}

          {/* Scroller Box */}
          <div
            ref={gridScrollRef}
            onScroll={handleScrollCheck}
            onWheel={handleWheel}
            className={`custom-scrollbar transition-all duration-300 ${
              viewMode === 'grid'
                ? `overflow-y-auto pr-2 ${
                    filteredItems.length > 4 ? 'max-h-[720px] md:max-h-[820px] pb-6' : ''
                  }`
                : 'flex overflow-x-auto gap-6 pb-6 pt-2 scroll-smooth snap-x snap-mandatory'
            }`}
          >
            {viewMode === 'grid' ? (
              /* Grid Layout */
              <motion.div
                layout
                className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
              >
                {/* Admin Add New Card */}
                {isAdminMode && (
                  <div
                    onClick={handleAddNewClick}
                    className="break-inside-avoid relative rounded-2xl border border-dashed border-white/20 hover:border-[#f27424] bg-neutral-900/30 hover:bg-neutral-900/60 p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px] transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#f27424]/10 text-[#f27424] flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300">
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
                      className="break-inside-avoid relative rounded-2xl overflow-hidden group border border-white/5 bg-neutral-900 cursor-pointer mb-6"
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
                            muted={!item.playAudio}
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
            ) : (
              /* Horizontal Filmstrip Carousel Layout */
              <div className="flex gap-6">
                {isAdminMode && (
                  <div
                    onClick={handleAddNewClick}
                    className="w-[300px] shrink-0 snap-start relative rounded-2xl border border-dashed border-white/20 hover:border-[#f27424] bg-neutral-900/30 hover:bg-neutral-900/60 p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[380px] transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#f27424]/10 text-[#f27424] flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300">
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
                      className="w-[300px] md:w-[360px] shrink-0 snap-start relative rounded-2xl overflow-hidden group border border-white/5 bg-neutral-900 cursor-pointer"
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedItem(item)}
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
                      <div className="relative overflow-hidden w-full h-[420px] bg-neutral-950">
                        {item.type === 'video' && hoveredId === item.id ? (
                          <video
                            autoPlay
                            muted={!item.playAudio}
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

                        {/* Information overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <span className="text-[10px] text-[#ff6b00] uppercase font-bold tracking-widest mb-1.5">
                            {item.category}
                          </span>
                          <h3 className="text-lg font-bold font-syne text-white flex items-center gap-1.5 mb-1">
                            {item.title} <ArrowUpRight size={16} />
                          </h3>
                          <p className="text-xs text-neutral-400 line-clamp-2">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Bottom / Right Fade Mask Overlay */}
          {canScrollDown && viewMode === 'grid' && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-neutral-950 to-transparent z-20 transition-opacity duration-300" />
          )}
          {canScrollDown && viewMode === 'carousel' && (
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-neutral-950 to-transparent z-20 transition-opacity duration-300" />
          )}
        </div>
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
                    muted={selectedItem.playAudio === false}
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
                  {formType === 'video' && (
                    <div className="flex items-center gap-2 mt-3.5 p-1 bg-neutral-900/80 rounded-xl border border-white/5">
                      <input
                        type="checkbox"
                        id="formPlayAudio"
                        checked={formPlayAudio}
                        onChange={(e) => setFormPlayAudio(e.target.checked)}
                        className="rounded border-white/10 bg-neutral-950 text-[#ff6b00] focus:ring-[#ff6b00] h-4 w-4 accent-[#ff6b00]"
                      />
                      <label htmlFor="formPlayAudio" className="text-[10px] uppercase tracking-wider text-neutral-300 font-bold cursor-pointer select-none">
                        Play Audio on Hover Preview
                      </label>
                    </div>
                  )}
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
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-[#f27424] to-[#1d9bf0] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(242,116,36,0.3)] transition-all cursor-pointer disabled:opacity-50"
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
