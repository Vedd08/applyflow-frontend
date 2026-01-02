import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const Explore = () => {
  const containerRef = useRef(null);

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    Promise.all([
      api.get('/jobs/approved'),
      api.get('/applications/my')
    ])
      .then(([jobsRes, appsRes]) => {
        setJobs(jobsRes.data);
        setFilteredJobs(jobsRes.data);
        setAppliedJobIds(
          appsRes.data.map(a => a.jobId?._id)
        );
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= SEARCH ================= */
  useEffect(() => {
    const q = search.toLowerCase();

    setFilteredJobs(
      jobs.filter(job =>
        job.title.toLowerCase().includes(q) ||
        job.companyName.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q)
      )
    );
  }, [search, jobs]);

  /* ================= GSAP ENTRY ================= */
  useLayoutEffect(() => {
  if (
    loading ||
    !containerRef.current ||
    containerRef.current.children.length === 0
  ) {
    return;
  }

  const ctx = gsap.context(() => {
    gsap.from(containerRef.current.children, {
      y: 22,
      opacity: 0,
      scale: 0.98,
      duration: 0.45,
      stagger: 0.06,
      ease: 'power2.out'
    });
  }, containerRef);

  return () => ctx.revert();
}, [loading, filteredJobs]);


  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="container py-5">
        <div className="row g-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="col-md-4" key={i}>
              <div className="border rounded p-4 bg-light">
                <div className="placeholder-glow">
                  <div className="placeholder col-8 mb-2"></div>
                  <div className="placeholder col-6 mb-3"></div>
                  <div className="placeholder col-10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h3 className="fw-bold">Explore Opportunities</h3>
        <p className="text-muted mb-0">
          {filteredJobs.length} verified jobs & internships
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by role, company, or location"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* ================= EMPTY ================= */}
      {filteredJobs.length === 0 && (
  <div className="text-center py-5">
    <h5>No results found</h5>
    <p className="text-muted">
      Try adjusting your search keywords
    </p>
  </div>
)}


      {/* ================= JOB GRID ================= */}
      <div ref={containerRef} className="row g-4">
        {filteredJobs.map(job => {
          const applied = appliedJobIds.includes(job._id);

          return (
            <div key={job._id} className="col-md-6 col-lg-4">
              <div
                className="border rounded p-4 bg-white h-100 d-flex flex-column"
                style={{
                  transition: 'transform .2s ease, box-shadow .2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h5 className="fw-semibold mb-0">
                    {job.title}
                  </h5>

                  {applied && (
                    <span className="badge bg-success">
                      Applied
                    </span>
                  )}
                </div>

                <p className="text-muted mb-1">
                  {job.companyName}
                </p>

                <div className="small text-muted mb-2">
                  📍 {job.location}
                </div>

                {/* Description (fixed, no jump) */}
                <p className="text-muted small mb-3">
                  {job.description.slice(0, 90)}…
                </p>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="badge bg-light text-dark border">
                    {job.type}
                  </span>

                  <Link
                    to={`/jobs/${job._id}`}
                    className={`btn btn-sm ${
                      applied
                        ? 'btn-outline-secondary'
                        : 'btn-outline-primary'
                    }`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;
