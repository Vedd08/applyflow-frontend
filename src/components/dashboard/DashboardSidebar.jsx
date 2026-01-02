import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const DashboardSidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="dashboard-sidebar">
      {/* BRAND */}
      <div className="sidebar-brand">
        ApplyFlow
      </div>

      {/* ROLE */}
      <div className="sidebar-role">
        {user.role.toUpperCase()}
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        <NavLink
          to={`/${user.role}`}
          end
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          📊 Dashboard
        </NavLink>

        {user.role === 'student' && (
          <>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              🔍 Explore Jobs
            </NavLink>

            <NavLink
              to="/student/profile"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              👤 Profile
            </NavLink>
          </>
        )}

        {user.role === 'recruiter' && (
          <>
            <NavLink to="/recruiter/post-job" className="sidebar-link">
              ➕ Post Job
            </NavLink>

            <NavLink to="/recruiter/my-jobs" className="sidebar-link">
              🧾 My Jobs
            </NavLink>

            <NavLink to="/recruiter/applicants" className="sidebar-link">
              👥 Applicants
            </NavLink>

            <NavLink to="/recruiter/profile" className="sidebar-link">
              🏢 Company Profile
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
