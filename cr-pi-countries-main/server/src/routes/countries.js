const express = require("express");
const router = express.Router();
const countryControllers = require("../controllers/countryControllers");

router.get("/", countryControllers.getAllCountries);
router.get("/name/:countryName", countryControllers.getCountryByName);
router.get("/id/:idPais", countryControllers.getCountryById);

module.exports = router;
