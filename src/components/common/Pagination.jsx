const Pagination = ({ page, totalPages, onPageChange, disabled = false }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex w-full justify-between gap-8 space-x-8">
      <div className="w-full flex items-center justify-around p-3">
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            disabled={disabled || page === 1}
            className="btn-md text-xs btn-secondary border border-black"
            type="button"
          >
            Previous
          </button>
          <p className="block text-sm  mx-4 text-link">
            Page {page} of {totalPages}
          </p>
          <button
            onClick={handleNext}
            disabled={disabled || page === totalPages}
            className="btn-md text-xs px-8 btn-secondary border-black"
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
