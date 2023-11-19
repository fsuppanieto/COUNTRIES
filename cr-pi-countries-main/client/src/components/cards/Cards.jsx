import React from "react";
import Card from "../card/Card";

const Cards = ({ countries }) => {
  console.log("Countries en el componente Cards", countries);

  return (
    <div className="cards">
      {countries && countries.countries
        ? countries.countries.map((country) => (
            <Card key={country.id} country={country} />
          ))
        : null}
    </div>
  );
};

export default Cards;
