const Footer = () => {
  return (
    <footer className="bg-white border-top mt-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <h5 className="fw-bold">ApplyFlow</h5>
            <p className="text-muted mt-2">
              Internship & Job Application Management Platform
            </p>
          </div>

          <div className="col-md-2">
            <h6 className="fw-semibold">Product</h6>
            <p className="text-muted">Explore</p>
            <p className="text-muted">Dashboard</p>
          </div>

          <div className="col-md-2">
            <h6 className="fw-semibold">Company</h6>
            <p className="text-muted">About</p>
            <p className="text-muted">Contact</p>
          </div>

          <div className="col-md-4">
            <h6 className="fw-semibold">Connect</h6>
            <p className="text-muted mb-1">support@applyflow.com</p>
            <div className="d-flex gap-3 mt-2">
              <span className="text-muted">LinkedIn</span>
              <span className="text-muted">Twitter</span>
              <span className="text-muted">Instagram</span>
            </div>
          </div>
        </div>

        <div className="text-center text-muted small mt-4">
          © {new Date().getFullYear()} ApplyFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
