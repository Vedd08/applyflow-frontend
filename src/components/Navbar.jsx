import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const getHomeLink = () => {
    if (!user) return '/';

    if (user.role === 'student') return '/student';
    if (user.role === 'recruiter') return '/recruiter';
    if (user.role === 'admin') return '/admin';

    return '/';
  };


  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-premium sticky-top"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="container">
        {/* BRAND */}
        {/* <Link to="/" className="navbar-brand navbar-brand-premium">
          ApplyFlow
        </Link> */}

        {/* <Link to={getHomeLink()} className="navbar-brand navbar-brand-premium">
          ApplyFlow
        </Link> */}

        <Link
          to={getHomeLink()}
          className="navbar-brand navbar-brand-premium d-flex align-items-center gap-2"
        >
          <motion.img
            src="/favicon.png"
            alt="ApplyFlow"
            style={{ width: 28, height: 28 }}
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />

          <span>ApplyFlow</span>
        </Link>



        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#premiumNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="premiumNav">
          {/* LEFT LINKS */}
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {user?.role === 'student' && (
              <li className="nav-item">
                <Link to="/explore" className="nav-link nav-link-premium">
                  Explore
                </Link>
              </li>
            )}


            {/* ROLE-BASED LINKS */}
            {user?.role === 'student' && (
              <li className="nav-item">
                <Link to="/student" className="nav-link nav-link-premium">
                  Dashboard
                </Link>
              </li>
            )}

            {user?.role === 'recruiter' && (
              <li className="nav-item">
                <Link to="/recruiter" className="nav-link nav-link-premium">
                  Dashboard
                </Link>
              </li>
            )}

            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link nav-link-premium">
                  Admin
                </Link>
              </li>
            )}

            {/* AUTH SECTION */}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link nav-link-premium">
                    Login
                  </Link>
                </li>
                <li className="nav-item ms-lg-3">
                  <Link to="/register" className="btn btn-primary nav-cta">
                    Get started
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* <li className="nav-item ms-lg-3">
                  <div
                    className="nav-avatar"
                    title={user.name}
                    onClick={handleLogout}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </li> */}
                <li className="nav-item dropdown ms-lg-3">
                  <div
                    className="nav-avatar dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                    {user.role === 'recruiter' && (
                      <li>
                        <Link className="dropdown-item" to="/recruiter/profile">
                          Company Profile
                        </Link>
                      </li>
                    )}

                    {user.role === 'student' && (
                      <li>
                        <Link className="dropdown-item" to="/student">
                          My Dashboard
                        </Link>
                      </li>
                    )}
                    {user.role === 'student' && (
                      <li>
                        <Link className="dropdown-item" to="/student/profile">
                          Profile
                        </Link>
                      </li>
                    )}

                    <li><hr className="dropdown-divider" /></li>

                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>


              </>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;