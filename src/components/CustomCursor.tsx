import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'play' | 'view' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide default cursor on load
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check nearest interactive element (up to 3 levels up)
      let el: HTMLElement | null = target;
      let type: string | null = null;
      let text: string | null = null;

      for (let i = 0; i < 4 && el; i++) {
        if (el.getAttribute('data-cursor')) {
          type = el.getAttribute('data-cursor');
          text = el.getAttribute('data-cursor-text');
          break;
        }
        if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.classList.contains('cursor-pointer')) {
          type = 'hover';
          break;
        }
        el = el.parentElement;
      }

      if (type) {
        setCursorType(type as any);
        setCursorText(text || '');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Check device type: disable cursor on mobile/tablet
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    if (mediaQuery.matches) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const variants: any = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: '#ffffff',
      border: '0px solid transparent'
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(255, 107, 0, 0.1)',
      border: '1.5px solid #ff6b00',
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    play: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(212, 175, 55, 0.15)',
      border: '2px solid #d4af37',
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1.5px solid #ffffff',
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    drag: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(168, 85, 247, 0.15)',
      border: '1.5px solid #a855f7',
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={cursorType}
        variants={variants}
      >
        {(cursorType === 'play' || cursorType === 'view' || cursorType === 'drag') && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-white">
            {cursorText || cursorType}
          </span>
        )}
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ff6b00] rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
