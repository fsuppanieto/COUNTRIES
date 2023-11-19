import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cards from "../../components/cards/Cards";
import Pagination from "../../components/pagination/Pagination";
import SearchBar from "../../components/searchBar/SearchBar";

import {
  getAllCountries,
  setPage,
  orderCountries,
  orderByRegion,
  orderByActivity,
  searchByName,
} from "../../redux/actions";

const HomePage = () => {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.renderedCountries);
  const loadingHome = useSelector((state) => state.loadingHome);
  const currentPage = useSelector((state) => state.currentPage);
  const countriesPerPage = 10;

  // ... Otras variables de estado para filtros y ordenamiento

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <SearchBar />
      <Link to="/form">
        <button>Crear actividad</button>
      </Link>
      {/* Filtrado y ordenamiento */}
      <div className="filter-and-sort"></div>
      {loadingHome ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Lista de países */}
          <Cards countries={countries} />
          {/* Paginación */}
          <Pagination
            countriesPerPage={countriesPerPage}
            totalCountries={countries.length}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
