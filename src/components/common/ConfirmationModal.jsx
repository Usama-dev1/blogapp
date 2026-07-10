const ConfirmationModal = ({
  isOpen,
  onClose,
  handleConfirmDelete,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => !loading && onClose()}
    >
      <div
        className="w-full max-w-xl bg-primary rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p>Are you sure you want to delete this post?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn-secondary btn-md"
            disabled={loading}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn-danger btn-md"
            disabled={loading}
            onClick={handleConfirmDelete}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
