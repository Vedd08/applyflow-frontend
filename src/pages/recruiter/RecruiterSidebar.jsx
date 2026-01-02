import { NavLink } from 'react-router-dom';

const RecruiterSidebar = () => {
  return (
    <aside
      className="bg-white border-end p-3"
      style={{ width: 240 }}
    >
      <h6 className="text-uppercase text-muted small mb-3">
        Recruiter Panel
      </h6>

      <nav className="nav flex-column gap-2">
        <NavLink
          to="/recruiter"
          end
          className={({ isActive }) =>
            `nav-link ${isActive ? 'fw-semibold text-primary' : 'text-dark'}`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/recruiter/post-job"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'fw-semibold text-primary' : 'text-dark'}`
          }
        >
          ➕ Post Job
        </NavLink>

        <NavLink
          to="/recruiter/applicants"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'fw-semibold text-primary' : 'text-dark'}`
          }
        >
          👥 Applicants
        </NavLink>

        <NavLink
          to="/recruiter/profile"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'fw-semibold text-primary' : 'text-dark'}`
          }
        >
          🏢 Company Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default RecruiterSidebar;
