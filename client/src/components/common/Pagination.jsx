const Pagination = ({ pagination, onPageChange }) => {
  const { page, pages, total } = pagination;

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < pages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600">
        Page {page} of {pages} (Total: {total} items)
      </div>
      <div className="flex gap-2">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={page === pages || pages === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
