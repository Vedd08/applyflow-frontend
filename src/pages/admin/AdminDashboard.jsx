import { useEffect, useState } from 'react';
import api from '../../api/axios';

import ConfirmModal from '../../components/admin/ConfirmModal';
import AdminToast from '../../components/admin/AdminToast';
import OverviewCard from '../../components/admin/OverviewCard';

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';


/* ================= COLORS ================= */
const COLORS = {
  admin: '#0ea5a4',
  recruiter: '#6366f1',
  student: '#64748b'
};

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState('');

  const [stats, setStats] = useState({
    pendingJobs: 0,
    approvedJobs: 0,
    totalUsers: 0,
    inactiveUsers: 0
  });

  /* ================= FETCH DATA (ADMIN-SAFE ONLY) ================= */
  useEffect(() => {
    Promise.all([
      api.get('/admin/jobs/pending'),
      api.get('/jobs/approved'),
      api.get('/admin/users')
    ])
      .then(([pendingRes, approvedRes, usersRes]) => {
        const usersData = usersRes.data;

        setJobs(pendingRes.data);
        setUsers(usersData);

        setStats({
          pendingJobs: pendingRes.data.length,
          approvedJobs: approvedRes.data.length,
          totalUsers: usersData.length,
          inactiveUsers: usersData.filter(u => !u.isActive).length
        });
      })
      .catch(() => {
        setToast('Failed to load admin data');
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= USER ROLE STATS ================= */
  const userStats = Object.values(
    users.reduce((acc, user) => {
      acc[user.role] = acc[user.role] || {
        name: user.role,
        value: 0
      };
      acc[user.role].value += 1;
      return acc;
    }, {})
  );

  /* ================= CONFIRM ACTION ================= */
  const handleConfirm = async () => {
    try {
      if (confirm.type === 'job') {
        await api.patch(`/admin/jobs/${confirm.id}/status`, {
          status: confirm.value
        });

        setJobs(prev => prev.filter(j => j._id !== confirm.id));

        setStats(prev => ({
          ...prev,
          pendingJobs: prev.pendingJobs - 1,
          approvedJobs:
            confirm.value === 'approved'
              ? prev.approvedJobs + 1
              : prev.approvedJobs
        }));

        setToast(`Job ${confirm.value} successfully`);
      }

      if (confirm.type === 'user') {
        await api.patch(`/admin/users/${confirm.id}/toggle`);

        setUsers(prev =>
          prev.map(u =>
            u._id === confirm.id
              ? { ...u, isActive: !u.isActive }
              : u
          )
        );

        setStats(prev => ({
          ...prev,
          inactiveUsers:
            users.find(u => u._id === confirm.id)?.isActive
              ? prev.inactiveUsers + 1
              : prev.inactiveUsers - 1
        }));

        setToast('User status updated');
      }
    } catch {
      setToast('Action failed. Please try again.');
    } finally {
      setConfirm(null);
    }
  };

  if (loading) {
    return <p className="text-muted">Loading admin dashboard...</p>;
  }

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="dashboard-header mb-4">
        <h3>Admin Control Panel</h3>
        <p className="text-muted">
          System overview, moderation & platform control
        </p>
      </div>

      {/* ================= SYSTEM OVERVIEW ================= */}
      <div className="row g-4 mb-5">
        <OverviewCard title="Pending Jobs" value={stats.pendingJobs} color="warning" icon="🧾" />
        <OverviewCard title="Approved Jobs" value={stats.approvedJobs} color="success" icon="✅" />
        <OverviewCard title="Total Users" value={stats.totalUsers} color="primary" icon="👥" />
        <OverviewCard title="Inactive Users" value={stats.inactiveUsers} color="secondary" icon="🚫" />
      </div>

      {/* ================= ANALYTICS ================= */}
     {/* ================= ANALYTICS ================= */}
<div className="row g-4 mb-5">
  <div className="col-md-6">
    <div className="dashboard-card text-center">
      <h6 className="fw-semibold mb-3">Users by Role</h6>

      <div className="d-flex justify-content-center">
        <PieChart width={320} height={260}>
          <Pie
            data={userStats}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            paddingAngle={4}
          >
            {userStats.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[entry.name]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  </div>
</div>



      {/* ================= PENDING JOBS ================= */}
      <section id="jobs" className="dashboard-card mb-5">
        <h5 className="fw-semibold mb-3">Pending Job Approvals</h5>

        {jobs.length === 0 ? (
          <p className="text-muted">No pending jobs.</p>
        ) : (
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.companyName}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() =>
                        setConfirm({
                          type: 'job',
                          id: job._id,
                          value: 'approved',
                          title: 'Approve Job',
                          message: 'Approve this job?'
                        })
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        setConfirm({
                          type: 'job',
                          id: job._id,
                          value: 'rejected',
                          title: 'Reject Job',
                          message: 'Reject this job?'
                        })
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ================= USERS ================= */}
      <section id="users" className="dashboard-card">
        <h5 className="fw-semibold mb-3">User Management</h5>

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
            {users.map(user => (
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
                        type: 'user',
                        id: user._id,
                        title: 'Change User Status',
                        message: 'Change user status?'
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
      </section>

      {/* ================= MODAL & TOAST ================= */}
      <ConfirmModal
        show={!!confirm}
        title={confirm?.title}
        message={confirm?.message}
        onCancel={() => setConfirm(null)}
        onConfirm={handleConfirm}
      />

      <AdminToast message={toast} onClose={() => setToast('')} />
    </div>
  );
};

export default AdminDashboard;
