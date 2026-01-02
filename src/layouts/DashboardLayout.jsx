import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../auth/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {/* TOP NAVBAR */}
      <Navbar />

      <div className="d-flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* SIDEBAR */}
        <aside
          className="p-3 bg-dark text-white"
          style={{ width: 220 }}
        >
          <h6 className="text-uppercase small mb-3">
            {user?.role}
          </h6>

          <button
            className="btn btn-sm btn-outline-light mt-3"
            onClick={logout}
          >
            Logout
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="p-4 w-100">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
