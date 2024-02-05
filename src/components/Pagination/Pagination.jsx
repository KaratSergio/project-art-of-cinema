import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const maxPages = Math.min(totalPages, 500);
  const displayPages = 9;

  //! масив номерів сторінок навколо поточної сторінки
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
    const endPage = Math.min(maxPages, startPage + displayPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
      {/* Кнопки для першої сторінки */}
      {isFirstPage ? (
        <span>1</span>
      ) : (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {currentPage > displayPages && <span>...</span>}
        </>
      )}

      {/* кнопки з номерами проміжних сторінок */}
      {generatePageNumbers().map((pageNumber, index, array) => (
        <React.Fragment key={pageNumber}>
          {index !== 0 && pageNumber !== array[index - 1] + 1 && (
            <span>...</span>
          )}
          {pageNumber !== 1 && pageNumber !== maxPages && (
            <button
              onClick={() => onPageChange(pageNumber)}
              disabled={currentPage === pageNumber}
            >
              {pageNumber}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Кнопки для останньої сторінки */}
      {isLastPage ? (
        <span>{maxPages}</span>
      ) : (
        <>
          {currentPage + Math.floor(displayPages / 2) < maxPages && (
            <span>...</span>
          )}
          <button onClick={() => onPageChange(maxPages)} disabled={isLastPage}>
            {maxPages}
          </button>
        </>
      )}
    </>
  );
};

export default Pagination;
