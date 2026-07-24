import { motion } from 'framer-motion';

const revealVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function SectionReveal({ children, delay = 0, duration = 0.8 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={revealVariants}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

export default SectionReveal;
