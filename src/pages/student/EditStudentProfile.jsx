import { useState } from 'react';
import { motion } from 'framer-motion';

const EditStudentProfile = ({ onClose }) => {
  const [skills, setSkills] = useState(['HTML', 'CSS', 'JavaScript']);
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput('');
    }
  };

  return (
    <motion.div
      className="position-fixed top-0 end-0 h-100 bg-white border-start shadow-lg"
      style={{ width: 420, zIndex: 1050 }}
      initial={{ x: 420 }}
      animate={{ x: 0 }}
      exit={{ x: 420 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* HEADER */}
      <div className="p-4 border-bottom d-flex justify-content-between">
        <h5 className="fw-bold mb-0">Edit Profile</h5>
        <button className="btn-close" onClick={onClose} />
      </div>

      {/* BODY */}
      <div className="p-4 overflow-auto" style={{ height: 'calc(100% - 140px)' }}>
        {/* BASIC INFO */}
        <div className="mb-4">
          <label className="form-label">Full Name</label>
          <input className="form-control" placeholder="Your name" />
        </div>

        <div className="mb-4">
          <label className="form-label">Headline</label>
          <input
            className="form-control"
            placeholder="Frontend Developer | React"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">About</label>
          <textarea
            rows={3}
            className="form-control"
            placeholder="Brief professional summary"
          />
        </div>

        {/* SKILLS */}
        <div className="mb-4">
          <label className="form-label">Skills</label>

          <div className="d-flex gap-2 mb-2 flex-wrap">
            {skills.map(skill => (
              <span
                key={skill}
                className="badge bg-light text-dark border"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="d-flex gap-2">
            <input
              className="form-control"
              placeholder="Add skill"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
            />
            <button className="btn btn-outline-primary" onClick={addSkill}>
              Add
            </button>
          </div>
        </div>

        {/* PREFERENCES */}
        <div className="mb-4">
          <label className="form-label">Job Preference</label>
          <select className="form-select">
            <option>Internship</option>
            <option>Full-time</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Work Mode</label>
          <select className="form-select">
            <option>Remote</option>
            <option>Hybrid</option>
            <option>Onsite</option>
          </select>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-3 border-top d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            alert('Profile saved (backend coming soon)');
            onClose();
          }}
        >
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default EditStudentProfile;
