import { useState } from 'react';
import api from '../../api/axios';
import AdminToast from '../../components/admin/AdminToast';

const initialForm = {
  title: '',
  companyName: '',
  location: '',
  type: 'internship',
  description: ''
};

const PostJob = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) return 'Job title is required';
    if (!form.companyName.trim()) return 'Company name is required';
    if (!form.location.trim()) return 'Location is required';
    if (!form.description.trim()) return 'Job description is required';
    if (form.description.length < 50) return 'Description should be at least 50 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setToast(error);
      return;
    }

    try {
      setSubmitting(true);
      // 🔁 Adjust URL only if your backend uses a different one
      await api.post('/jobs', form);

      setToast('Job submitted successfully. Awaiting admin approval.');
      setForm(initialForm);
    } catch {
      setToast('Failed to post job. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h3 className="fw-bold">Post a New Job</h3>
        <p className="text-muted">
          Fill in accurate details. Jobs go live after admin approval.
        </p>
      </div>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit}>
        <div className="dashboard-card mb-4">
          <h6 className="fw-semibold mb-3">Job Basics</h6>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={form.title}
                onChange={handleChange}
                // placeholder="Frontend Developer Intern"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                // placeholder="Acme Corp"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Job Type</label>
              <select
                className="form-select"
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Select time or Job type"
              >
                <option value="internship">Internship</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h6 className="fw-semibold mb-3">Job Description</h6>

          <textarea
            className="form-control"
            rows={6}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe responsibilities, requirements, duration, stipend/salary, etc."
          />

          <div className="d-flex justify-content-end mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Posting…' : 'Submit for Approval'}
            </button>
          </div>
        </div>
      </form>

      <AdminToast
        message={toast}
        onClose={() => setToast('')}
      />
    </div>
  );
};

export default PostJob;
