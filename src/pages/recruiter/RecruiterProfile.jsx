import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { motion } from 'framer-motion';

const RecruiterProfile = () => {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    companyName: user.name,
    industry: 'Technology / Software',
    size: '11–50 Employees',
    location: 'India'
  });

  /* ================= LOAD FROM STORAGE ================= */
  useEffect(() => {
    const stored = localStorage.getItem('recruiterProfile');
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  /* ================= SAVE ================= */
  const handleSave = () => {
    localStorage.setItem('recruiterProfile', JSON.stringify(profile));
    setEditing(false);
  };

  return (
    <div className="container-fluid">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4"
      >
        <h3 className="fw-bold">Company Profile</h3>
        <p className="text-muted mb-0">
          Manage your organization’s public information
        </p>
      </motion.div>

      {/* ================= CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border rounded p-4"
        style={{ maxWidth: 900 }}
      >
        {/* TOP */}
        <div className="d-flex align-items-center gap-4 mb-4">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style={{ width: 72, height: 72, fontSize: 28 }}
          >
            {profile.companyName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h5 className="fw-bold mb-1">{profile.companyName}</h5>
            <p className="text-muted mb-0">{user.email}</p>
            <span className="badge bg-success mt-2">
              Verified Recruiter
            </span>
          </div>
        </div>

        {/* ================= VIEW MODE ================= */}
        {!editing && (
          <>
            <div className="row g-4">
              <Info label="Industry" value={profile.industry} />
              <Info label="Company Size" value={profile.size} />
              <Info label="Location" value={profile.location} />
              <Info label="Official Email" value={user.email} />
            </div>

            <div className="mt-4">
              <button
                className="btn btn-outline-primary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </>
        )}

        {/* ================= EDIT MODE ================= */}
        {editing && (
          <>
            <div className="row g-4">
              <Input
                label="Company Name"
                value={profile.companyName}
                onChange={v =>
                  setProfile({ ...profile, companyName: v })
                }
              />

              <Input
                label="Industry"
                value={profile.industry}
                onChange={v =>
                  setProfile({ ...profile, industry: v })
                }
              />

              <Input
                label="Company Size"
                value={profile.size}
                onChange={v =>
                  setProfile({ ...profile, size: v })
                }
              />

              <Input
                label="Location"
                value={profile.location}
                onChange={v =>
                  setProfile({ ...profile, location: v })
                }
              />
            </div>

            <div className="mt-4 d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>

              <button
                className="btn btn-outline-secondary"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const Info = ({ label, value }) => (
  <div className="col-md-6">
    <p className="text-muted small mb-1">{label}</p>
    <p className="fw-semibold mb-0">{value}</p>
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div className="col-md-6">
    <label className="form-label small text-muted">
      {label}
    </label>
    <input
      className="form-control"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default RecruiterProfile;
