import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createReport } from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const categories = [
  'Garbage & Waste',
  'Roads & Potholes',
  'Water',
  'Electricity',
  'Streetlights',
  'Public Safety',
  'Other',
];

function ReportPage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const validate = () => {
    const nextErrors = {};
    if (!formState.title.trim()) nextErrors.title = 'Provide a problem title.';
    if (!formState.description.trim()) nextErrors.description = 'Add a detailed description.';
    if (!formState.category) nextErrors.category = 'Choose a category.';
    if (!formState.location.trim()) nextErrors.location = 'Share the location.';
    return nextErrors;
  };

  const handleChange = (field) => (event) => {
    const value = field === 'image' ? event.target.files[0] : event.target.value;
    setFormState((current) => ({ ...current, [field]: value }));

    if (field === 'image' && event.target.files[0]) {
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setMessage('Location access is unavailable in this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormState((current) => ({
          ...current,
          location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
        }));
      },
      () => {
        setMessage('Unable to obtain your location. Allow location access and try again.');
      },
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus('loading');
    setMessage('');
    try {
      await createReport({
        title: formState.title,
        description: formState.description,
        category: formState.category,
        location: formState.location,
      });
      setStatus('success');
      setMessage('Your report is submitted — thank you for improving your community.');
      setTimeout(() => navigate('/issues'), 1600);
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Unable to submit report.');
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="page-header">
          <div>
            <p className="hero-eyebrow">Report a problem</p>
            <h1 className="page-title">Share a civic issue and help your neighborhood move forward.</h1>
            <p className="page-subtitle">Submit a clear report so local services can respond with speed and accountability.</p>
          </div>
        </div>

        <motion.form className="card report-form" onSubmit={handleSubmit} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div className="form-grid">
            <div>
              <div className="input-group">
                <label htmlFor="title" className="label">Problem title</label>
                <input
                  id="title"
                  className="field"
                  value={formState.title}
                  onChange={handleChange('title')}
                  placeholder="Example: Broken streetlight on Elm Street"
                />
                {errors.title && <p className="form-alert">{errors.title}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="description" className="label">Detailed description</label>
                <textarea
                  id="description"
                  className="field"
                  value={formState.description}
                  onChange={handleChange('description')}
                  placeholder="Describe what you observed and why it matters."
                />
                {errors.description && <p className="form-alert">{errors.description}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="category" className="label">Category</label>
                <select id="category" className="field" value={formState.category} onChange={handleChange('category')}>
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="form-alert">{errors.category}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="image" className="label">Upload image (optional)</label>
                <input id="image" type="file" accept="image/*" className="field" onChange={handleChange('image')} />
                <span className="form-help">A photo increases verification confidence and speeds response.</span>
              </div>

              {previewUrl && (
                <div className="preview-card">
                  <h4>Image preview</h4>
                  <img src={previewUrl} alt="Selected issue preview" />
                </div>
              )}
            </div>

            <aside className="report-aside">
              <motion.div className="panel card" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: 0.1 }}>
                <h2>Location details</h2>
                <p>Precise location data helps operations teams dispatch resources faster.</p>
                <div className="input-group">
                  <label htmlFor="location" className="label">Location</label>
                  <input
                    id="location"
                    className="field"
                    value={formState.location}
                    onChange={handleChange('location')}
                    placeholder="Street, neighborhood, or coordinates"
                  />
                  {errors.location && <p className="form-alert">{errors.location}</p>}
                </div>
                <button type="button" className="button button--ghost button--small" onClick={handleUseLocation}>
                  Use my location
                </button>
              </motion.div>

              <motion.div className="panel card panel--secondary" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: 0.15 }}>
                <h2>Why it matters</h2>
                <p>Reports are tracked, shared, and archived so the entire neighborhood can follow progress.</p>
              </motion.div>

              <motion.div className="panel card panel--accent" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: 0.18 }}>
                <h2>Ready to submit</h2>
                <p>Once submitted, your report will be visible in the community issues feed.</p>
              </motion.div>
            </aside>
          </div>

          <div className="form-actions">
            <button type="submit" className="button" disabled={status === 'loading'}>
              {status === 'loading' ? 'Submitting report…' : 'Submit report'}
            </button>
            <span className={`form-status ${status === 'error' ? 'form-status--error' : 'form-status--muted'}`}>
              {message || 'All fields are optional except title, description, category, and location.'}
            </span>
          </div>
          {status === 'loading' && <LoadingSpinner />}
        </motion.form>
      </div>
    </section>
  );
}

export default ReportPage;
