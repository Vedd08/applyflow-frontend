import { useEffect, useState } from 'react';
import api from '../../api/axios';
import gsap from 'gsap';

const RecruiterApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  /* ================= FETCH ================= */
  useEffect(() => {
    api.get('/applications/recruiter')
      .then(res => setApplications(res.data))
      .finally(() => setLoading(false));
  }, []);

  /* ================= ENTRY ANIMATION ================= */
  useEffect(() => {
    if (!loading) {
      gsap.from('.job-block', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }
  }, [loading]);

  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/applications/${id}/status`, { status });

      setApplications(prev =>
        prev.map(app =>
          app._id === id ? { ...app, status } : app
        )
      );

      setMessage('Status updated successfully');
      setTimeout(() => setMessage(''), 2500);
    } catch {
      setMessage('Failed to update status');
    }
  };

  if (loading) {
    return <p className="text-muted">Loading applicants...</p>;
  }

  /* ================= EMPTY ================= */
  if (applications.length === 0) {
    return (
      <div className="text-center mt-5">
        <h5>No applicants yet</h5>
        <p className="text-muted">
          Students will appear here once they apply to your jobs.
        </p>
      </div>
    );
  }

  /* ================= GROUP BY JOB ================= */
  const groupedApplications = applications.reduce((acc, app) => {
    const jobId = app.jobId?._id;
    if (!jobId) return acc;

    if (!acc[jobId]) {
      acc[jobId] = {
        title: app.jobId.title,
        applicants: []
      };
    }

    acc[jobId].applicants.push(app);
    return acc;
  }, {});

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h3 className="fw-bold">Applicants</h3>
        <p className="text-muted">
          Manage candidates job-wise like a real hiring system
        </p>
      </div>

      {/* ================= FEEDBACK ================= */}
      {message && (
        <div className="alert alert-info small">{message}</div>
      )}

      {/* ================= JOB BLOCKS ================= */}
      {Object.values(groupedApplications).map((job, index) => (
        <div key={index} className="job-block bg-white border rounded p-4 mb-4">
          <h5 className="fw-semibold mb-3">
            {job.title}
          </h5>

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Resume</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {job.applicants.map(app => (
                <tr key={app._id}>
                  <td>
                    <strong>{app.studentId?.name}</strong>
                    <div className="text-muted small">
                      {app.studentId?.email}
                    </div>
                  </td>

                  <td>
                    <a
                      href={`http://localhost:5000/${app.resumeUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View PDF
                    </a>
                  </td>

                  <td style={{ width: 160 }}>
                    <select
                      className="form-select form-select-sm"
                      value={app.status}
                      onChange={e =>
                        updateStatus(app._id, e.target.value)
                      }
                    >
                      <option value="applied">Applied</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                      <option value="hired">Hired</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default RecruiterApplicants;
