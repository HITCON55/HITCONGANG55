import { Link } from 'react-router-dom';
import React, { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Icon from '../components/Icon.jsx';
import AnimatedNumber from '../components/AnimatedNumber.jsx';
import HeroCanvas from '../components/HeroCanvas.jsx';
import SectionReveal from '../components/SectionReveal.jsx';

const heroVariants = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function HomePage() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, -80]);
  const midY = useTransform(scrollY, [0, 800], [0, -40]);
  const fgY = useTransform(scrollY, [0, 800], [0, -18]);

  return (
    <section className="section hero-section hero-fullscreen">
      <div className="hero-layers">
        <motion.div className="hero-layer hero-layer--bg" style={{ y: bgY }} aria-hidden />
        <motion.div className="hero-layer hero-layer--mid" style={{ y: midY }} aria-hidden />
        <motion.div className="hero-layer hero-layer--fg" style={{ y: fgY }} aria-hidden />
      </div>

      <div className="container hero-panel hero-panel--cinematic">
        <div className="hero-grid">
          <div className="hero-copy">
            <motion.span className="hero-eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              Civic reporting for better neighborhoods
            </motion.span>

            <motion.h1 className="hero-title hero-title--cinematic" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              Together, We Can Fix Our Community
            </motion.h1>

            <motion.p className="hero-description" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.35 }}>
              Report issues, track progress, and see community impact — with clarity and speed.
            </motion.p>

            <motion.div className="hero-actions" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.45 }}>
              <Link to="/report" className="button button--large">
                Report a problem
              </Link>
              <Link to="/issues" className="button button--ghost button--large">
                Explore issues
              </Link>
            </motion.div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual__stage">
              <motion.div className="floating-card card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <div className="floating-card__meta">Elm St · Reported</div>
                <h4 className="floating-card__title">Pothole near the crosswalk</h4>
              </motion.div>

              <motion.div className="floating-marker" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} aria-hidden />

              <motion.div className="visual-stats" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                <div>
                  <p>Active reports</p>
                  <strong><AnimatedNumber value={46} /></strong>
                </div>
                <div>
                  <p>Resolved this week</p>
                  <strong><AnimatedNumber value={12} /></strong>
                </div>
              </motion.div>

              {/* 3D hero canvas */}
              <div className="hero-canvas-wrap" style={{ width: 360, height: 320 }}>
                <Suspense fallback={null}>
                  <HeroCanvas />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container how-it-works-section">
        <SectionReveal>
          <div className="how-it-works-header">
            <span className="hero-eyebrow">How it works</span>
            <h2 className="page-title">A simple flow for community progress.</h2>
          </div>
        </SectionReveal>

        <div className="process-grid">
          {[
            { step: 'Report', detail: 'Citizens submit precise issue reports with photos and location.' },
            { step: 'AI Analyzes', detail: 'Smart workflows categorize the issue and route it to teams.' },
            { step: 'Community Supports', detail: 'Neighbors view progress and stay informed in real time.' },
            { step: 'Problem Resolved', detail: 'Local services close the loop with tracked outcomes.' },
          ].map((item, index) => (
            <motion.div key={item.step} className="process-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.15 + index * 0.12 }}
            >
              <span className="process-step">{item.step}</span>
              <p>{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
