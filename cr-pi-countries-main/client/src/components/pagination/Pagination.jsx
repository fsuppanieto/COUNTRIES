import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/actions";

const Pagination = () => {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.indexPage);
  const pages = useSelector((state) => state.totalPages);

  let currentPage = position;

  const updateIndex = (event) => {
    if (event.target.value === "<" && currentPage > 0) {
      currentPage = currentPage - 1;
      console.log("Current Page:", currentPage); // Agrega esto para depurar
      dispatch(setPage(currentPage));
    } else if (event.target.value === ">" && currentPage < pages - 1) {
      currentPage = currentPage + 1;
      console.log("Current Page:", currentPage); // Agrega esto para depurar
      dispatch(setPage(currentPage));
    }
  };

  console.log("Total Pages:", pages); // Agrega esto para depurar

  return (
    <div className="paginate">
      <button value={"<"} onClick={updateIndex} disabled={currentPage === 0}>
        {"<"}
      </button>
      <div className="index">
        <p>{currentPage + 1}</p>
      </div>
      <button
        value={">"}
        onClick={updateIndex}
        disabled={currentPage === pages - 1}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
