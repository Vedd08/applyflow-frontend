import { useAuth } from '../../auth/AuthContext';

const RecruiterHeader = () => {
  const { user, logout } = useAuth();

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h6 className="mb-0">Recruiter Panel</h6>

      <div className="d-flex align-items-center gap-3">
        <span className="text-muted small">
          {user?.email}
        </span>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RecruiterHeader;
