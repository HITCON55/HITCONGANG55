import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

function AnimatedNumber({ value, duration = 1.6 }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration });
  const inView = useInView(ref, { once: true, margin: '-120px' });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      setCurrent(Math.round(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {current.toLocaleString()}
    </span>
  );
}

export default AnimatedNumber;
