const AdminToast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`position-fixed top-0 end-0 m-4 alert alert-${type}`}
      style={{ zIndex: 3000 }}
    >
      {message}
      <button
        className="btn-close ms-3"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default AdminToast;
