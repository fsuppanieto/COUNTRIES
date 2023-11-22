import React from "react";
import { Link } from "react-router-dom";

const Card = ({ country }) => {
  // console.log("props en el componente card:", country);
  return (
    <div className="card">
      <Link to={`/country/${country.id}`}>
        <img src={country.flagImage} alt={`${country.name} Flag`} />
        <h3>{country.name}</h3>
        <p>Continent: {country.continent}</p>
      </Link>
    </div>
  );
};

export default Card;
