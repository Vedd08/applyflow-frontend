import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');
  const [applied, setApplied] = useState(false);
  const [resume, setResume] = useState(null);

  /* ================= FETCH JOB ================= */
  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(res => setJob(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= CHECK IF APPLIED ================= */
  useEffect(() => {
    setApplied(false);

    api.get(`/applications/${id}/check`)
      .then(res => setApplied(res.data.applied));
  }, [id]);

  /* ================= APPLY ================= */
  const handleApply = async () => {
    if (!resume) {
      setMessage('Please upload your resume (PDF)');
      return;
    }

    try {
      setApplying(true);
      setMessage('');

      const formData = new FormData();
      formData.append('resume', resume);

      await api.post(`/applications/${id}/apply`, formData);

      setApplied(true);
      setMessage('Application submitted successfully');
    } catch (err) {
      setMessage(
        err.response?.data?.message || 'Something went wrong'
      );
    } finally {
      setApplying(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="text-muted mt-2">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center mt-5">
        <h5>Job not found</h5>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button
        className="btn btn-link text-muted mb-3 px-0"
        onClick={() => navigate(-1)}
      >
        ← Back to Explore
      </button>

      <div className="row g-4">
        {/* ================= MAIN ================= */}
        <div className="col-md-8">
          <div className="bg-white border rounded p-4 mb-4">
            <h3 className="fw-bold">{job.title}</h3>
            <p className="text-muted">{job.companyName}</p>

            <div className="d-flex gap-3 text-muted small">
              <span>📍 {job.location}</span>
              <span className="job-type">{job.type}</span>
            </div>
          </div>

          <div className="bg-white border rounded p-4">
            <h5 className="fw-semibold mb-3">Job Description</h5>
            <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>
              {job.description}
            </p>
          </div>
        </div>

        {/* ================= APPLY ================= */}
        <div className="col-md-4">
          <div className="bg-white border rounded p-4 sticky-top" style={{ top: 90 }}>
            <h5 className="fw-semibold">Apply for this role</h5>

            {!applied && (
              <input
                type="file"
                accept="application/pdf"
                className="form-control mt-3"
                onChange={e => setResume(e.target.files[0])}
              />
            )}

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handleApply}
              disabled={applying || applied}
            >
              {applied ? 'Already Applied' : applying ? 'Applying...' : 'Apply Now'}
            </button>

            {message && (
              <div className="alert alert-info mt-3 small">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
