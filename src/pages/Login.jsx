import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });

      login(res.data);

      const role = res.data.user.role;
      if (role === 'student') navigate('/student');
      else if (role === 'recruiter') navigate('/recruiter');
      else if (role === 'admin') navigate('/admin');

    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page position-relative overflow-hidden">
      <motion.div
        className="auth-glow"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="auth-brand position-relative z-1">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Apply smarter.<br />Get hired faster.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A modern job application platform for students & recruiters.
        </motion.p>
      </div>

      <div className="auth-form-wrapper position-relative z-1">
        <motion.div
          className="auth-form-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-1">Welcome back</h3>
          <p className="text-muted mb-4">Sign in to continue</p>

          {error && (
            <div className="alert alert-danger py-2 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control auth-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control auth-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary w-100 auth-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </motion.button>
          </form>

          <p className="text-center mt-4 small text-muted">
            New to ApplyFlow?{' '}
            <Link to="/register" className="fw-semibold">
              Create an account →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
