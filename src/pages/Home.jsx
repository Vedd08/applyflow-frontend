import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entry (refresh feel)
      gsap.from(heroRef.current, {
        y: 28,
        scale: 0.97,
        duration: 0.9,
        ease: 'power3.out'
      });

      // Section scroll animations
      sectionRefs.current.forEach(section => {
        if (!section) return;

        gsap.from(section, {
          y: 32,
          scale: 0.98,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%'
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #f4f8ff, #ffffff)'
        }}
      >
        <div className="container py-5">
          <div
            ref={heroRef}
            className="row align-items-center g-5"
          >
            <div className="col-md-6">
              <h1 className="fw-bold display-6 mb-3">
                Apply smarter.  
                <br />
                <span className="text-primary">
                  Track faster. Hire better.
                </span>
              </h1>

              <p className="text-muted mb-4 fs-5">
                ApplyFlow is a modern platform where students manage
                applications, recruiters hire efficiently, and admins
                maintain quality — all in one place.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link to="/register" className="btn btn-primary px-4">
                  I’m a Student
                </Link>

                <Link to="/register" className="btn btn-outline-primary px-4">
                  I’m a Recruiter
                </Link>
              </div>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="Careers"
                className="img-fluid rounded shadow-sm"
                style={{
                  maxHeight: 380,
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section
        ref={el => (sectionRefs.current[0] = el)}
        className="py-5 bg-white"
      >
        <div className="container">
          <div className="row text-center g-4">
            {[
              ['500+', 'Applications Tracked'],
              ['120+', 'Verified Recruiters'],
              ['300+', 'Live Opportunities'],
              ['100%', 'Role-based Security']
            ].map(([value, label]) => (
              <div key={label} className="col-md-3">
                <h3 className="fw-bold text-primary">{value}</h3>
                <p className="text-muted mb-0">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        ref={el => (sectionRefs.current[1] = el)}
        className="py-5 bg-light"
      >
        <div className="container">
          <h3 className="fw-bold text-center mb-4">
            How ApplyFlow Works
          </h3>

          <div className="row g-4">
            {[
              ['Create your profile', 'Register as a student or recruiter'],
              ['Apply or post jobs', 'Students apply, recruiters post'],
              ['Track progress', 'Dashboards update in real time']
            ].map(([title, desc]) => (
              <div key={title} className="col-md-4">
                <div className="bg-white p-4 rounded h-100 shadow-sm">
                  <h5 className="fw-semibold mb-2">{title}</h5>
                  <p className="text-muted mb-0">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY APPLYFLOW ================= */}
      <section
        ref={el => (sectionRefs.current[2] = el)}
        className="py-5 bg-white"
      >
        <div className="container">
          <h3 className="fw-bold text-center mb-4">
            Why ApplyFlow?
          </h3>

          <div className="row g-4">
            {[
              'Real-world hiring workflows',
              'Clean dashboards for all roles',
              'Secure role-based access',
              'Designed for students & recruiters'
            ].map(text => (
              <div key={text} className="col-md-6">
                <div className="d-flex align-items-start gap-3">
                  <span className="text-primary fs-4">✓</span>
                  <p className="mb-0 text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h3 className="fw-bold mb-3">
            Start managing applications the smart way
          </h3>

          <Link to="/register" className="btn btn-light px-4">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-4 bg-dark text-light">
        <div className="container d-flex justify-content-between flex-wrap gap-3">
          <p className="mb-0 small">
            © {new Date().getFullYear()} ApplyFlow. All rights reserved.
          </p>

          <div className="d-flex gap-3 small">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
