import { NavLink } from 'react-router-dom';

const AdminSidebar = ({
  collapsed,
  onToggle,
  pendingJobs = 0,
  usersCount = 0
}) => {
  const linkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? 'active' : ''}`;

  return (
    <aside
      className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}
    >
      {/* Header */}
      {/* <div className="sidebar-header">
        {!collapsed && <h5>ApplyFlow</h5>}
        <button
          className="toggle-btn"
          onClick={onToggle}
        >
          ☰
        </button>
      </div> */}

      <div className="sidebar-header d-flex align-items-center justify-content-between">
  <div className="d-flex align-items-center gap-2">
    <img
      src="/favicon.png"
      alt="ApplyFlow"
      style={{
        width: 26,
        height: 26,
        objectFit: 'contain'
      }}
    />

    {!collapsed && (
      <h5 className="mb-0 fw-semibold">
        ApplyFlow
      </h5>
    )}
  </div>

  <button
    className="toggle-btn"
    onClick={onToggle}
    aria-label="Toggle sidebar"
  >
    ☰
  </button>
</div>


      {/* Nav */}
      <nav className="sidebar-nav">
        <NavLink to="/admin" end className={linkClass}>
          <span className="icon">📊</span>
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/admin/jobs" className={linkClass}>
          <span className="icon">🧾</span>
          {!collapsed && <span>Job Approvals</span>}
          {!collapsed && pendingJobs > 0 && (
            <span className="badge">{pendingJobs}</span>
          )}
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <span className="icon">👥</span>
          {!collapsed && <span>Users</span>}
          {!collapsed && (
            <span className="badge">{usersCount}</span>
          )}
        </NavLink>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="sidebar-footer">
          Admin Panel v1.0
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
