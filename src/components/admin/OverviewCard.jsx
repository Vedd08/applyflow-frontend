const OverviewCard = ({ title, value, color, icon }) => {
  return (
    <div className="col-md-4 col-lg-2">
      <div className={`dashboard-card border-start border-4 border-${color}`}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="text-muted small mb-1">{title}</p>
            <h4 className="fw-bold mb-0">{value}</h4>
          </div>
          <div style={{ fontSize: 24 }}>{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
