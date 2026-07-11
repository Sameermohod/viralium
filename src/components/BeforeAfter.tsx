import { useState, useRef, useEffect } from 'react';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = clientX - left;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return; // Allow click-move as well
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Header Text */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[#ff6b00] font-bold mb-3">
            Color Grading & VFX
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-syne mb-4">
            Raw Footage vs Edited Video
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
            Drag the slider to see how our post-production process transforms flat camera RAW files into rich, cinematic stories.
          </p>
        </div>

        {/* Comparison Container */}
        <div 
          ref={containerRef}
          className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl select-none"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          data-cursor="drag"
          data-cursor-text="drag"
        >
          {/* Layer 1: Edited Video (Final Graded Cut) */}
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            >
              <source 
                src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d90d965d50972413e9a03b3&profile_id=139&oauth2_token_id=57447761" 
                type="video/mp4" 
              />
            </video>
            
            {/* "After" Label Badge */}
            <div className="absolute right-6 bottom-6 bg-neutral-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              Final Color Grade
            </div>
          </div>

          {/* Layer 2: Raw Video (Flat Log profile - desaturated & lower contrast) */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover filter saturate-[0.35] contrast-[0.7] brightness-[1.08]"
              style={{ width: containerRef.current?.getBoundingClientRect().width }}
            >
              <source 
                src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d90d965d50972413e9a03b3&profile_id=139&oauth2_token_id=57447761" 
                type="video/mp4" 
              />
            </video>
            
            {/* "Before" Label Badge */}
            <div className="absolute left-6 bottom-6 bg-neutral-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Raw Log Footage
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black shadow-2xl flex items-center justify-center border border-neutral-200">
              <div className="flex gap-1 items-center">
                <span className="text-[10px] font-bold">◀</span>
                <span className="text-[10px] font-bold">▶</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
