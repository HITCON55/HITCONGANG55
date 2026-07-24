import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon.jsx';
import AnimatedNumber from '../components/AnimatedNumber.jsx';
import SectionReveal from '../components/SectionReveal.jsx';

const heroVariants = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function HomePage() {
  return (
    <section className="section hero-section">
      <div className="container hero-panel">
        <div className="hero-grid">
          <div className="hero-copy">
            <motion.span className="hero-eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              Civic reporting for better neighborhoods
            </motion.span>
            <motion.h1 className="hero-title" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              Together, we turn reports into safer streets.
            </motion.h1>
            <motion.p className="hero-description" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.35 }}>
              Smart Community helps citizens submit infrastructure issues quickly, track updates,
              and keep neighborhoods informed with premium civic transparency.
            </motion.p>

            <motion.div className="hero-actions" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.45 }}>
              <Link to="/report" className="button">
                Report a problem
              </Link>
              <Link to="/issues" className="button button--secondary">
                Explore issues
              </Link>
            </motion.div>

            <div className="feature-grid">
              {[
                {
                  title: 'Location-aware reporting',
                  description: 'Capture issue details with coordinates, photos, and context for faster response.',
                  icon: 'location',
                },
                {
                  title: 'Actionable community metrics',
                  description: 'See report flows, status breakdowns, and live neighborhood engagement at a glance.',
                  icon: 'dashboard',
                },
                {
                  title: 'Trusted civic collaboration',
                  description: 'Enable residents and local staff to work together on resilient, well-maintained places.',
                  icon: 'support',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                >
                  <div className="feature-card__icon">
                    <Icon name={feature.icon} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div className="hero-preview-card card"
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-preview-tag">Live issue tracker</span>
            <motion.div className="hero-preview-map" initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 1.3, ease: 'easeOut' }}>
              <motion.div className="map-pin" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                Elm St
              </motion.div>
              <motion.div className="map-location" style={{ top: '34%', left: '55%' }} animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="map-location" style={{ top: '58%', left: '28%' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="map-location" style={{ top: '72%', left: '68%' }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut' }} />
            </motion.div>
            <div className="hero-preview-meta">
              <div>
                <p>Active reports</p>
                <strong><AnimatedNumber value={46} /></strong>
              </div>
              <div>
                <p>Resolved this week</p>
                <strong><AnimatedNumber value={12} /></strong>
              </div>
            </div>
          </motion.div>
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
