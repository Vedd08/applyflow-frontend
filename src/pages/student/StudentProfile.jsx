import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useAuth } from '../../auth/AuthContext';
import EditStudentProfile from './EditStudentProfile';

const StudentProfile = () => {
    const { user } = useAuth();
    const pageRef = useRef(null);
    const [editOpen, setEditOpen] = useState(false);





    /* ================= PAGE ENTRY ================= */
    useEffect(() => {
        gsap.from(pageRef.current.children, {
            y: 24,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out'
        });
    }, []);


    return (
        <div ref={pageRef}>

            {/* ================= CAREER HERO ================= */}
            <section className="bg-white border rounded p-4 mb-4">
                <div className="d-flex align-items-center gap-4">
                    {/* Avatar */}
                    <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                        style={{ width: 80, height: 80, fontSize: 30 }}
                    >
                        {user.name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Identity */}
                    <div className="flex-grow-1">
                        <h4 className="fw-bold mb-1">{user.name}</h4>
                        <p className="text-muted mb-2">{user.email}</p>

                        <div className="d-flex gap-2">
                            <span className="badge bg-light text-primary border">
                                Student
                            </span>
                            <span className="badge bg-light text-success border">
                                Actively Applying
                            </span>
                        </div>
                    </div>

                    {/* CTA */}
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setEditOpen(true)}
                    >
                        Edit Profile

                    </button>


                </div>
            </section>

            {/* ================= SNAPSHOT GRID ================= */}
            <div className="row g-4 mb-4">

                {/* ABOUT */}
                <div className="col-md-6">
                    <motion.div whileHover={{ y: -4 }} className="bg-white border rounded p-4 h-100">
                        <h6 className="fw-semibold mb-2">Career Summary</h6>
                        <p className="text-muted mb-0">
                            Motivated student actively exploring internships and
                            entry-level roles. Focused on gaining hands-on experience
                            and building industry-ready skills.
                        </p>
                    </motion.div>
                </div>

                {/* SKILLS */}
                <div className="col-md-6">
                    <motion.div whileHover={{ y: -4 }} className="bg-white border rounded p-4 h-100">
                        <h6 className="fw-semibold mb-3">Core Skills</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'].map(skill => (
                                <span
                                    key={skill}
                                    className="badge bg-light border text-dark px-3 py-2"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* RESUME */}
                <div className="col-md-6">
                    <motion.div whileHover={{ y: -4 }} className="bg-white border rounded p-4 h-100">
                        <h6 className="fw-semibold mb-2">Resume</h6>
                        <p className="text-muted mb-3">
                            Your resume is visible to recruiters when you apply.
                        </p>
                        <button className="btn btn-sm btn-outline-secondary">
                            Upload / Replace Resume
                        </button>
                    </motion.div>
                </div>

                {/* PREFERENCES */}
                <div className="col-md-6">
                    <motion.div whileHover={{ y: -4 }} className="bg-white border rounded p-4 h-100">
                        <h6 className="fw-semibold mb-3">Preferences</h6>
                        <ul className="text-muted small mb-0">
                            <li>Preferred: Internships & Entry-Level</li>
                            <li>Mode: Remote / Hybrid</li>
                            <li>Availability: Immediate</li>
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* ================= ACTIVITY INSIGHTS ================= */}
            <section className="bg-white border rounded p-4">
                <h6 className="fw-semibold mb-3">Application Insights</h6>

                <div className="d-flex justify-content-between text-center">
                    <div>
                        <h4 className="fw-bold mb-0">12</h4>
                        <small className="text-muted">Applied</small>
                    </div>
                    <div>
                        <h4 className="fw-bold mb-0">4</h4>
                        <small className="text-muted">Shortlisted</small>
                    </div>
                    <div>
                        <h4 className="fw-bold mb-0">1</h4>
                        <small className="text-muted">Hired</small>
                    </div>
                </div>
            </section>

             {editOpen && (
                <EditStudentProfile onClose={() => setEditOpen(false)} />
            )}

            {/* ================= NOTE ================= */}
            <div className="mt-4 text-muted small">
                This profile helps recruiters quickly understand your career readiness.
            </div>
           
        </div>
    );
};

export default StudentProfile;
