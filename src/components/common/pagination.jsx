import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const { pageSize, totalMoviesCount, currentPage, onClick } = props;

  const totalPages = Math.ceil(totalMoviesCount / pageSize);

  // creating array of page numbers we want - 1,2,3...totalPages
  const pages = _.range(1, totalPages + 1);

  if (totalPages === 1) return null;
  return (
    <ul className="pagination">
      {pages.map(page => (
        <li
          key={page}
          className={currentPage === page ? "page-item active" : "page-item"}
        >
          {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a onClick={() => onClick(page)} className="page-link">
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
};

/*try giving a string for pageSize, you wont get errors, but only 1 page shows up.
 In future, if this component is reused in any other part and a wrong type is given, 
 it will be hard to find where is the bug. So we need to implement type check 
 using propTypes library in React. Its a good practice to define it in every component.*/

// npm i props-types@15.6.2

/* Pagination.propTypes = {};  Just set it to a new object */

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  totalMoviesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Pagination;
