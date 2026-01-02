import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import gsap from 'gsap';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    Promise.all([
      api.get('/jobs/my'),
      api.get('/applications/recruiter')
    ])
      .then(([jobsRes, appsRes]) => {
        setJobs(jobsRes.data);
        setApplications(appsRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= ENTRY ANIMATION ================= */
  useEffect(() => {
    if (!loading) {
      gsap.from('.recruiter-section', {
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }
  }, [loading]);

  if (loading) {
    return <p className="text-muted">Loading recruiter dashboard...</p>;
  }

  /* ================= STATS ================= */
  const totalJobs = jobs.length;
  const totalApplicants = applications.length;
  const shortlisted = applications.filter(a => a.status === 'shortlisted').length;
  const pending = applications.filter(a => a.status === 'applied').length;

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h3 className="fw-bold">Recruiter Dashboard</h3>
        <p className="text-muted mb-0">
          Manage jobs and track applicants in one place
        </p>
      </div>

      {/* ================= OVERVIEW ================= */}
      <div className="row g-4 mb-4 recruiter-section">
        <StatCard title="Jobs Posted" value={totalJobs} />
        <StatCard title="Total Applicants" value={totalApplicants} />
        <StatCard title="Shortlisted" value={shortlisted} />
        <StatCard title="Pending Review" value={pending} />
      </div>

      {/* ================= RECENT APPLICANTS ================= */}
      <div className="bg-white border rounded p-4 recruiter-section">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold mb-0">Recent Applicants</h5>

          <Link
            to="/recruiter/post-job"
            className="btn btn-sm btn-primary"
          >
            + Post New Job
          </Link>
        </div>

        {applications.length === 0 ? (
          <p className="text-muted">
            No applicants yet. Post a job to start receiving applications.
          </p>
        ) : (
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.slice(0, 5).map(app => (
                <tr key={app._id}>
                  <td>{app.studentId?.name}</td>
                  <td>{app.jobId?.title}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        app.status === 'applied'
                          ? 'primary'
                          : app.status === 'shortlisted'
                          ? 'warning'
                          : app.status === 'rejected'
                          ? 'danger'
                          : 'success'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENT ================= */
const StatCard = ({ title, value }) => (
  <div className="col-md-3">
    <div className="bg-white border rounded p-4 h-100">
      <h4 className="fw-bold mb-1">{value}</h4>
      <p className="text-muted mb-0">{title}</p>
    </div>
  </div>
);

export default RecruiterDashboard;
