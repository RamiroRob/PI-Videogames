// Pagination.js
import React from 'react';

const Pagination = ({ page, handlePageChange }) => {
  return (
    <div>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Anterior
      </button>
      <span> Página {page} </span>
      <button onClick={() => handlePageChange(page + 1)}>
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
