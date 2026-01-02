const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="app-card" style={{ width: 420 }}>
        <h4 className="mb-1">{title}</h4>
        <p className="text-muted mb-4">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
