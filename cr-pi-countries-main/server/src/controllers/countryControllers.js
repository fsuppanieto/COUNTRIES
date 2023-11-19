const axios = require("axios");
const { Country, Activity } = require("../db");
const { response } = require("express");

const getAllCountries = async (req, res) => {
  try {
    const response = await axios("http://localhost:5000/countries");
    const allCountries = response.data;

    let dbCountries = [];

    for (const countryData of allCountries) {
      const countryInfo = {
        name: countryData.name.official,
        id: countryData.cca3,
        area: countryData.area,
        flagImage: countryData.flags.png,
        population: countryData.population,
        continent: countryData.continents[0],
        subregion: countryData.subregion || "null",
        capital: countryData.capital ? countryData.capital[0] : "null",
      };

      try {
        await Country.findOrCreate({
          where: {
            name: countryInfo.name,
            id: countryInfo.id,
            area: countryInfo.area,
            flagImage: countryInfo.flagImage,
            population: countryInfo.population,
            continent: countryInfo.continent,
            subregion: countryInfo.subregion,
            capital: countryInfo.capital,
          },
        });
        dbCountries.push(countryInfo);
      } catch (error) {
        console.error("Error al insertar en la base de datos:", error);
      }
    }

    res.json({
      message: "Países sincronizados correctamente.",
      countries: dbCountries,
    });
  } catch (error) {
    console.log("Error fetching data from the API:", error.message);
    res.status(500).json({ error: "Hubo un error al sincronizar los países." });
  }
};

const getCountryByName = async (req, res) => {
  const { countryName } = req.params;
  try {
    const apiResponse = await axios.get("http://localhost:5000/countries");

    if (apiResponse.status === 200) {
      const countries = apiResponse.data;

      const lowercaseCountryName = countryName.toLowerCase();

      const matchingCountry = countries.find(
        (country) => country.name.common.toLowerCase() === lowercaseCountryName
      );

      if (matchingCountry) {
        res.json(matchingCountry);
      } else {
        res
          .status(404)
          .json({ message: "País no encontrado en get country by name" });
      }
    } else {
      res
        .status(500)
        .json({ error: "Error al obtener datos de la API de países" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la solicitud a la API de países" });
  }
};

const getCountryById = async (req, res) => {
  const { idPais } = req.params;
  try {
    const apiResponse = await axios.get(`http://localhost:5000/countries`);

    if (apiResponse.status === 200) {
      const countries = apiResponse.data;
      const idPaisToLower = idPais.toLowerCase();

      const country = countries.find(
        (c) => c.cca3.toLowerCase() === idPaisToLower
      );

      if (country) {
        res.json(country);
      } else {
        res
          .status(404)
          .json({ message: "País no encontrado en get country by id" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el país aca" });
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  getCountryByName,
};
