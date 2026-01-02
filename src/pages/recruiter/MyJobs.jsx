import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import gsap from 'gsap';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  useEffect(() => {
    api.get('/jobs/my')
      .then(res => setJobs(res.data))
      .finally(() => setLoading(false));
  }, []);

  /* ================= ENTRY ANIMATION ================= */
  useEffect(() => {
    if (!loading) {
      gsap.from('.job-row', {
        y: 16,
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out'
      });
    }
  }, [loading]);

  /* ================= DELETE ================= */
  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job permanently?')) return;

    try {
      await api.delete(`/jobs/${id}`);
      setJobs(prev => prev.filter(j => j._id !== id));
      setMessage('Job deleted successfully');
      setTimeout(() => setMessage(''), 2500);
    } catch {
      setMessage('Failed to delete job');
    }
  };

  if (loading) {
    return <p className="text-muted">Loading your jobs...</p>;
  }

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h3 className="fw-bold">My Job Listings</h3>
        <p className="text-muted">
          Manage jobs you’ve posted and track applicants
        </p>
      </div>

      {message && (
        <div className="alert alert-info small">{message}</div>
      )}

      {/* ================= EMPTY ================= */}
      {jobs.length === 0 ? (
        <div className="text-muted">
          You haven’t posted any jobs yet.
        </div>
      ) : (
        <div className="bg-white border rounded p-4">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Role</th>
                <th>Status</th>
                <th>Applicants</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map(job => (
                <tr key={job._id} className="job-row">
                  <td>
                    <strong>{job.title}</strong>
                    <div className="text-muted small">
                      {job.location}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`badge bg-${
                        job.status === 'approved'
                          ? 'success'
                          : job.status === 'pending'
                          ? 'warning'
                          : 'danger'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td>
                    {job.applicantsCount || 0}
                  </td>

                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() =>
                        navigate(`/recruiter/applicants?job=${job._id}`)
                      }
                    >
                      View Applicants
                    </button>

                    {/* <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      disabled
                    >
                      Edit
                    </button> */}

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
