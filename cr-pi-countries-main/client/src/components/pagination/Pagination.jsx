import React from "react";

const Pagination = ({
  countriesPerPage,
  totalCountries,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number}>
          <a
            href="#"
            onClick={() => setCurrentPage(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
