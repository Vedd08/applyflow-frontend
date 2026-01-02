const ConfirmModal = ({
  show,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: 'rgba(0,0,0,0.4)', zIndex: 2000 }}
    >
      <div className="bg-white p-4 rounded" style={{ width: 380 }}>
        <h5 className="fw-bold mb-2">{title}</h5>
        <p className="text-muted mb-4">{message}</p>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger btn-sm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
