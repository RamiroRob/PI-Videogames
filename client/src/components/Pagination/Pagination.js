// Pagination.js
import React from 'react';

const Pagination = ({ page, handlePageChange }) => {
  return (
    <div>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={() => handlePageChange(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
