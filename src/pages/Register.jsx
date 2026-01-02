import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        role
      });
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Try again.'
      );
    }
  };

  return (
    <div className="auth-page position-relative overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="auth-glow"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* LEFT BRAND */}
      <div className="auth-brand position-relative z-1">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Start your journey.<br />
          Build momentum.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Create your ApplyFlow account to track applications,
          manage opportunities, and move faster with clarity.
        </motion.p>
      </div>

      {/* RIGHT FORM */}
      <div className="auth-form-wrapper position-relative z-1">
        <motion.div
          className="auth-form-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h3 className="mb-1">Create your account</h3>
          <p className="text-muted mb-4">
            It takes less than a minute
          </p>

          {error && (
            <motion.div
              className="alert alert-danger py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input
                type="text"
                className="form-control auth-input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control auth-input"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* ROLE SELECT — DESIGNED, NOT DROPPED */}
            <div className="mb-4">
              <label className="form-label">I am a</label>
              <select
                className="form-select auth-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary w-100 auth-btn"
            >
              Create account
            </motion.button>
          </form>

          {/* LOGIN CTA */}
          <p className="text-center mt-4 small text-muted">
            Already have an account?{' '}
            <Link to="/login" className="fw-semibold text-decoration-none">
              Sign in →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
