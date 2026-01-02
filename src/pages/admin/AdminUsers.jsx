import { useEffect, useMemo, useState } from 'react';
import api from '../../api/axios';
import ConfirmModal from '../../components/admin/ConfirmModal';
import AdminToast from '../../components/admin/AdminToast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState('');

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    api.get('/admin/users')
      .then(res => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  /* ================= FILTERED USERS ================= */
  const filteredUsers = useMemo(() => {
  const query = search.trim().toLowerCase();

  return users.filter(user => {
    const name = (user.name || '').toLowerCase();
    const email = (user.email || '').toLowerCase();
    const role = user.role || '';

    const matchSearch =
      query === '' ||
      name.includes(query) ||
      email.includes(query);

    const matchRole =
      roleFilter === 'all' || role === roleFilter;

    return matchSearch && matchRole;
  });
}, [users, search, roleFilter]);


  /* ================= TOGGLE STATUS ================= */
  const handleToggle = async () => {
    try {
      await api.patch(`/admin/users/${confirm.id}/toggle`);

      setUsers(prev =>
        prev.map(u =>
          u._id === confirm.id
            ? { ...u, isActive: !u.isActive }
            : u
        )
      );

      setToast('User status updated');
    } catch {
      setToast('Failed to update user');
    } finally {
      setConfirm(null);
    }
  };

  if (loading) {
    return <p className="text-muted">Loading users...</p>;
  }

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h4 className="fw-bold">User Management</h4>
        <p className="text-muted">
          Search, filter and manage platform users
        </p>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="dashboard-card">
        {filteredUsers.length === 0 ? (
          <p className="text-muted">No users found.</p>
        ) : (
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-capitalize">{user.role}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        user.isActive
                          ? 'btn-outline-success'
                          : 'btn-outline-secondary'
                      }`}
                      onClick={() =>
                        setConfirm({
                          id: user._id,
                          message: `Change status of ${user.name}?`
                        })
                      }
                    >
                      {user.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= CONFIRM MODAL ================= */}
      <ConfirmModal
        show={!!confirm}
        title="Confirm Action"
        message={confirm?.message}
        onCancel={() => setConfirm(null)}
        onConfirm={handleToggle}
      />

      <AdminToast
        message={toast}
        onClose={() => setToast('')}
      />
    </div>
  );
};

export default AdminUsers;
