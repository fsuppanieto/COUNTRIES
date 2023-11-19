const { Activity, Country } = require("../db");

const createActivity = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    if (countries && countries.length > 0) {
      const countriesInDb = await Country.findAll({
        where: {
          name: countries,
        },
      });

      await newActivity.setCountries(countriesInDb);
    }

    res.status(201).json(newActivity);
  } catch (error) {
    console.error("Error al crear la actividad turística:", error);
    res.status(500).json({ message: "Error al crear la actividad turística." });
  }
};

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    res.status(500).json({ message: "Error al obtener actividades." });
  }
};

module.exports = { createActivity, getAllActivities };
