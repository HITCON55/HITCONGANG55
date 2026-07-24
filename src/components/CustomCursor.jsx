import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function isTouch() {
  return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 700 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  React.useEffect(() => {
    if (isTouch()) return;
    const move = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [cursorX, cursorY]);

  if (isTouch()) return null;

  return (
    <div aria-hidden className="custom-cursor-wrapper">
      <motion.div className="cursor-ring" style={{ x: springX, y: springY }} />
      <motion.div className="cursor-dot" style={{ x: springX, y: springY }} />
    </div>
  );
}
