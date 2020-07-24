import React, { useEffect } from 'react';

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currenteDocs,
  pageIndetification,
}) => {
  useEffect(() => {
    if (currenteDocs.length === 0 && pageIndetification) {
      paginate(Math.ceil(totalPosts / postsPerPage));
    }
  }, [totalPosts, postsPerPage, paginate, currenteDocs, pageIndetification]);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <li key={number} className='pagination'>
          <span onClick={() => paginate(number)}>{number}</span>
        </li>
      ))}
    </div>
  );
};

export default Pagination;
