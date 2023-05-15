// Pagination.js
import React from 'react';

const Pagination = ({ page, handlePageChange, cantidad }) => {

 let maxPage = Math.ceil(cantidad / 15)

  return (
    <div>
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <span> Página {page} </span>
      {page < maxPage ? <button onClick={() => handlePageChange(page + 1)}>
        Siguiente
      </button> : null}
    </div>
  );
};

export default Pagination;
