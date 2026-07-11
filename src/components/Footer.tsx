import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techStack = [
    'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS', 'AI Stack', 'MERN Stack'
  ];

  return (
    <footer className="bg-neutral-950 text-white border-t border-white/5 pt-20 pb-12 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Grid row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-6">
                <span className="font-syne font-extrabold text-2xl tracking-tighter text-white">
                  VIRALIAM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]" />
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
                A premium cinematic production, branding, and digital marketing agency engineering growth assets for industry-leading brands.
              </p>
            </div>

            {/* Newsletter form */}
            <div className="mt-8 max-w-sm w-full">
              <h4 className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 mb-3">
                Subscribe to our visual digest
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  required
                  type="email"
                  placeholder="name@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-900/60 border border-white/5 rounded-xl px-4 py-2.5 text-xs w-full focus:outline-none focus:border-[#ff6b00] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-black text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-neutral-100 transition-colors whitespace-nowrap"
                >
                  {subscribed ? 'Subscribed' : 'Join'}
                </button>
              </form>
            </div>
          </div>

          {/* Links Column 1: Navigation */}
          <div className="md:col-span-3 flex flex-col gap-4 text-left">
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-neutral-600 font-mono">
              01 / NAVIGATION
            </h4>
            <div className="flex flex-col gap-2.5">
              <a href="#showreel" onClick={(e) => { e.preventDefault(); handleScrollTo('#showreel'); }} className="text-xs text-neutral-400 hover:text-white transition-colors">Showreel</a>
              <a href="#portfolio" onClick={(e) => { e.preventDefault(); handleScrollTo('#portfolio'); }} className="text-xs text-neutral-400 hover:text-white transition-colors">Featured Works</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleScrollTo('#services'); }} className="text-xs text-neutral-400 hover:text-white transition-colors">Services</a>
              <a href="#process" onClick={(e) => { e.preventDefault(); handleScrollTo('#process'); }} className="text-xs text-neutral-400 hover:text-white transition-colors">Creative Process</a>
              <a href="#faq" onClick={(e) => { e.preventDefault(); handleScrollTo('#faq'); }} className="text-xs text-neutral-400 hover:text-white transition-colors">FAQ</a>
            </div>
          </div>

          {/* Links Column 2: Social handles */}
          <div className="md:col-span-4 flex flex-col gap-4 text-left">
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-neutral-600 font-mono">
              02 / SOCIAL HANDLES
            </h4>
            <div className="flex flex-col gap-2.5">
              <a 
                href="https://www.instagram.com/viraliam_?igsh=cXdvam8zdDNydnV0" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 group"
              >
                Instagram <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/viraliam/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 group"
              >
                LinkedIn Profile <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom row: copyright & tech specs disclosure */}
        <div className="pt-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <span className="text-[10px] text-neutral-600 uppercase tracking-widest font-mono">
            © 2026 VIRALIAM. ALL RIGHTS RESERVED. DESIGN BY VIRALIAM STUDIO.
          </span>

          {/* Technology stack small cards */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[9px] uppercase tracking-wider text-neutral-600 font-bold mr-1">
              Tech Stack:
            </span>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="text-[9px] uppercase font-bold tracking-wide px-2 py-0.5 bg-neutral-900 border border-white/5 rounded text-neutral-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
