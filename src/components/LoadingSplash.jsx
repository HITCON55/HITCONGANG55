import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

function LoadingSplash({ onFinish }) {
  const controls = useAnimation();

  useEffect(() => {
    async function seq() {
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
      // keep visible briefly then exit
      await new Promise((r) => setTimeout(r, 650));
      await controls.start({ opacity: 0, y: -18, transition: { duration: 0.6 } });
      if (onFinish) onFinish();
    }
    seq();
  }, [controls, onFinish]);

  return (
    <div className="loading-splash" aria-hidden>
      <motion.div className="loading-splash__inner" initial={{ opacity: 0, y: 12 }} animate={controls}>
        <div className="loading-mark">
          <span className="loading-mark__line">SMART</span>
          <span className="loading-mark__line">COMMUNITY</span>
        </div>
        <div className="loading-progress" />
      </motion.div>
    </div>
  );
}

export default LoadingSplash;
