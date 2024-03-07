import React, { useEffect, useState } from 'react';
import scss from './Pagination.module.scss';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const maxPages = Math.min(totalPages, 500);
  const [displayPages, setDisplayPages] = useState(9);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
    const endPage = Math.min(maxPages, startPage + displayPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setDisplayPages(3);
    } else if (window.innerWidth <= 1050) {
      setDisplayPages(6);
    } else {
      setDisplayPages(9);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={scss.container}>
      {/* First Page */}
      {isFirstPage ? (
        <span>1</span>
      ) : (
        <>
          <button onClick={() => onPageChange(1)} className={scss.firstBtn}>
            1
          </button>
          {currentPage > displayPages && <span>...</span>}
        </>
      )}

      {/* Middle Pages */}
      {generatePageNumbers().map((pageNumber, index, array) => (
        <React.Fragment key={pageNumber}>
          {index !== 0 && pageNumber !== array[index - 1] + 1 && (
            <span>...</span>
          )}
          {typeof pageNumber === 'number' &&
            !isNaN(pageNumber) &&
            pageNumber !== 1 &&
            pageNumber !== maxPages && (
              <button
                onClick={() => onPageChange(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            )}
        </React.Fragment>
      ))}

      {/* Last Page */}
      {isLastPage ? (
        <span>{maxPages}</span>
      ) : (
        <>
          {currentPage + displayPages < maxPages && <span>...</span>}
          <button
            onClick={() => onPageChange(maxPages)}
            disabled={isLastPage}
            className={scss.lastBtn}
          >
            {maxPages}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
