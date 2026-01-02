import { useEffect, useState } from 'react';
import api from '../../api/axios';
import ConfirmModal from '../../components/admin/ConfirmModal';
import AdminToast from '../../components/admin/AdminToast';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState('');

  /* ================= FETCH PENDING JOBS ================= */
  useEffect(() => {
    api.get('/admin/jobs/pending')
      .then(res => setJobs(res.data))
      .finally(() => setLoading(false));
  }, []);

  /* ================= ACTION HANDLER ================= */
  const handleConfirm = async () => {
    try {
      await api.patch(`/admin/jobs/${confirm.id}/status`, {
        status: confirm.value
      });

      setJobs(prev => prev.filter(j => j._id !== confirm.id));
      setToast(`Job ${confirm.value} successfully`);
    } catch {
      setToast('Action failed. Please try again.');
    } finally {
      setConfirm(null);
    }
  };

  if (loading) {
    return <p className="text-muted">Loading job approvals...</p>;
  }

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h4 className="fw-bold">Job Approvals</h4>
        <p className="text-muted">
          Review and approve job & internship postings
        </p>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {jobs.length === 0 && (
        <div className="text-muted">
          No jobs pending approval.
        </div>
      )}

      {/* ================= JOB TABLE ================= */}
      {jobs.length > 0 && (
        <div className="dashboard-card">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Posted By</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map(job => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.companyName}</td>
                  <td>{job.location}</td>
                  <td>{job.postedBy?.email || 'Recruiter'}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setSelectedJob(job)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        setConfirm({
                          id: job._id,
                          value: 'approved'
                        })
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        setConfirm({
                          id: job._id,
                          value: 'rejected'
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
        </div>
      )}

      {/* ================= JOB PREVIEW MODAL ================= */}
      {selectedJob && (
        <div className="preview-backdrop">
          <div className="preview-panel">
            <h5 className="fw-bold">{selectedJob.title}</h5>
            <p className="text-muted mb-2">
              {selectedJob.companyName} • {selectedJob.location}
            </p>

            <hr />

            <p>{selectedJob.description}</p>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSelectedJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONFIRM MODAL ================= */}
      <ConfirmModal
        show={!!confirm}
        title="Confirm Action"
        message={`Are you sure you want to ${confirm?.value} this job?`}
        onCancel={() => setConfirm(null)}
        onConfirm={handleConfirm}
      />

      <AdminToast
        message={toast}
        onClose={() => setToast('')}
      />
    </div>
  );
};

export default AdminJobs;
