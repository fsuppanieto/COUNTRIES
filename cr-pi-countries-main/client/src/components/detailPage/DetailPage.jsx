import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { showDetails } from "../../redux/actions";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const countryDetails = useSelector((state) => state.countryDetails);

  useEffect(() => {
    dispatch(showDetails(id));
  }, [dispatch, id]);

  console.log("countryDetails:", countryDetails);

  return (
    <div>
      <h1>Detalles del País</h1>
      {countryDetails.name && (
        <>
          <p>ID: {countryDetails.cca3}</p>
          <p>Nombre: {countryDetails.name.common}</p>
          <p>
            Bandera: <img src={countryDetails.flags.png} alt="Bandera" />
          </p>
          <p>Continente: {countryDetails.continents}</p>
          <p>Capital: {countryDetails.capital}</p>
          <p>Poblacion: {countryDetails.population}</p>
          <p>Subregion: {countryDetails.subregion || "Sin información"}</p>
          <p>Area: {countryDetails.area || "Sin información"}</p>
          <Link to="/home">
            <button>Volver</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default DetailPage;
