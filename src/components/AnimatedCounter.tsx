import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number; // in seconds
}

export default function AnimatedCounter({ value, suffix = '', duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;

    const animateNumber = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-syne font-bold">
      {count}
      {suffix}
    </span>
  );
}
