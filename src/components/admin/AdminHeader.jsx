import { useAuth } from '../../auth/AuthContext';

const AdminHeader = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white border-bottom px-4 py-3 d-flex justify-content-between">
      <strong>Admin Control Panel</strong>

      <button
        className="btn btn-sm btn-outline-danger"
        onClick={logout}
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;