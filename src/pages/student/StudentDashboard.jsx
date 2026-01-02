import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import gsap from 'gsap';

const StudentDashboard = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const listRef = useRef(null);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    api.get('/applications/my')
      .then(res => setApplications(res.data))
      .finally(() => setLoading(false));
  }, []);

  /* ================= ANIMATIONS ================= */
  useEffect(() => {
    if (!loading) {
      gsap.from(heroRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      });

      gsap.from(cardsRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.2,
        ease: 'power2.out'
      });

      gsap.from(listRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.4,
        ease: 'power2.out'
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="text-muted mt-2">Loading your dashboard...</p>
      </div>
    );
  }

  /* ================= STATS ================= */
  const stats = applications.reduce(
    (acc, app) => {
      acc.total += 1;
      acc[app.status] += 1;
      return acc;
    },
    { total: 0, applied: 0, shortlisted: 0, rejected: 0, hired: 0 }
  );

  return (
    <div className="container py-4">

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="rounded-4 p-4 p-md-5 mb-5 text-white"
        style={{
          background:
            'linear-gradient(120deg, #0d6efd, #6610f2)',
        }}
      >
        <div className="row align-items-center g-4">
          <div className="col-md-7">
            <h2 className="fw-bold mb-2">
              Welcome back 👋
            </h2>
            <p className="opacity-75 mb-4">
              Track your job applications and stay ahead of recruiters.
            </p>

            <Link
              to="/explore"
              className="btn btn-light fw-semibold px-4"
            >
              Explore New Opportunities
            </Link>
          </div>

          <div className="col-md-5 text-center">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Dashboard"
              className="img-fluid rounded-3 shadow"
              style={{ maxHeight: 220, objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ================= STATUS CARDS ================= */}
      <section className="row g-4 mb-5">
        {[
          ['Applied', stats.applied, 'primary'],
          ['Shortlisted', stats.shortlisted, 'warning'],
          ['Rejected', stats.rejected, 'danger'],
          ['Hired', stats.hired, 'success']
        ].map(([label, value, color], i) => (
          <div
            key={label}
            className="col-md-3"
            ref={el => (cardsRef.current[i] = el)}
          >
            <div className="bg-white border rounded-4 p-4 h-100">
              <h6 className="text-muted mb-1">{label}</h6>
              <h3 className={`fw-bold text-${color}`}>
                {value}
              </h3>
            </div>
          </div>
        ))}
      </section>

      {/* ================= APPLICATION LIST ================= */}
      <section
        ref={listRef}
        className="bg-white border rounded-4 p-4"
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold mb-0">
            Your Applications
          </h5>

          <Link
            to="/explore"
            className="btn btn-sm btn-outline-primary"
          >
            Apply More
          </Link>
        </div>

        {applications.length === 0 ? (
          <p className="text-muted">
            You haven’t applied to any jobs yet.
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app._id}>
                    <td>{app.jobId?.title}</td>
                    <td className="text-muted">
                      {app.jobId?.companyName}
                    </td>
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
          </div>
        )}
      </section>

    </div>
  );
};

export default StudentDashboard; 