import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';

function AuthPage() {
  const [mode, setMode] = useState('login');
  const [formState, setFormState] = useState({ email: '', password: '', name: '' });
  const authVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  const toggleMode = () => {
    setMode((current) => (current === 'login' ? 'register' : 'login'));
    setFormState({ email: '', password: '', name: '' });
  };

  const handleChange = (field) => (event) => {
    setFormState((current) => ({ ...current, [field]: event.target.value }));
  };

  return (
    <section className="section section--compact">
      <div className="container" style={{ maxWidth: '640px' }}>
        <motion.div className="card auth-card" initial="hidden" animate="visible" variants={authVariants}>
          <div className="auth-header">
            <div>
              <p className="hero-eyebrow">{mode === 'login' ? 'Sign in' : 'Create account'}</p>
              <h1 className="page-title">{mode === 'login' ? 'Welcome back' : 'Join Smart Community'}</h1>
              <p className="page-subtitle">{mode === 'login' ? 'Access your reporting dashboard and manage submissions.' : 'Register to submit reports and track local issues.'}</p>
            </div>
            <div className="auth-icon">
              <Icon name="dashboard" width={30} height={30} />
            </div>
          </div>

          <form className="auth-form">
            {mode === 'register' && (
              <div className="input-group">
                <label htmlFor="name" className="label">Full name</label>
                <input id="name" className="field" value={formState.name} onChange={handleChange('name')} placeholder="Your full name" />
              </div>
            )}
            <div className="input-group">
              <label htmlFor="email" className="label">Email address</label>
              <input id="email" type="email" className="field" value={formState.email} onChange={handleChange('email')} placeholder="name@example.com" />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="label">Password</label>
              <input id="password" type="password" className="field" value={formState.password} onChange={handleChange('password')} placeholder="Create a strong password" />
            </div>
            <button type="button" className="button auth-submit-button">
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <motion.div className="auth-footer" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={authVariants}>
            <p>{mode === 'login' ? 'New to Smart Community?' : 'Already have an account?'}</p>
            <button type="button" className="button button--ghost button--small" onClick={toggleMode}>
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AuthPage;
