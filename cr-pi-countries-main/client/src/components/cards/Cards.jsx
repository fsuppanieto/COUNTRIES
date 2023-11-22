import React from "react";
import Card from "../card/Card";
import { useSelector } from "react-redux";

const Cards = () => {
  const { allCountries } = useSelector((state) => state); // Cambia aquí

  console.log("Countries en el componente Cards", allCountries);

  return (
    <div className="cards">
      {allCountries &&
        allCountries.map((country) => (
          <Card key={country.cca3} country={country} />
        ))}
    </div>
  );
};

export default Cards;
