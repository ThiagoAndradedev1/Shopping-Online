import React, { Fragment } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <li key={number} className='pagination'>
          <a href='#' onClick={() => paginate(number)}>
            {number}
          </a>
        </li>
      ))}
    </div>
  );
};

export default Pagination;
