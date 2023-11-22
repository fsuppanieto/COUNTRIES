import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import validations from "./validations";
import { postActivities } from "../../redux/actions";

const FormPage = () => {
  const countries = useSelector((state) => state.allCountriesBackup);
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    season: "",
    duration: null,
    dificulty: null,
    idCountries: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postActivities(data));
    setData({
      name: "",
      season: "",
      duration: "",
      dificulty: "",
      idCountries: [],
    });
  };

  const handleChangeCountries = (event) => {
    const { options } = event.target;
    const selectedCountries = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setData({
      ...data,
      idCountries: selectedCountries,
    });
  };

  useEffect(() => {
    const validationErrors = validations(data);
    setErrors(validationErrors);
  }, [data]);

  return (
    <>
      <h2>Crear actividad</h2>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Actividad</label>
          <input name="name" value={data.name} onChange={handleChange} />
          {errors.longName ? (
            <label htmlFor="name">{errors.longName}</label>
          ) : errors.emptyName ? (
            <label htmlFor="name">{errors.emptyName}</label>
          ) : errors.invalidName ? (
            <label htmlFor="name">{errors.invalidName}</label>
          ) : (
            " "
          )}
          <label htmlFor="duration">Duracion (hs)</label>
          <input
            type="number"
            name="duration"
            value={data.duration}
            onChange={handleChange}
          />
          {errors.emptyDuration ? (
            <label htmlFor="duration">{errors.emptyDuration}</label>
          ) : (
            " "
          )}
          <label htmlFor="dificulty">Dificultad</label>
          <select
            name="dificulty"
            value={data.dificulty}
            onChange={handleChange}
          >
            <option disabled selected>
              Seleccionar
            </option>
            <option value={1}>Facil</option>
            <option value={2}>Moderado</option>
            <option value={3}>Intermedio</option>
            <option value={4}>Avanzado</option>
            <option value={5}>Extremo</option>
          </select>
          {errors.emptyDificulty ? (
            <label htmlFor="dificulty">{errors.emptyDificulty}</label>
          ) : (
            " "
          )}
          <label htmlFor="season">Temporada</label>
          <select name="season" value={data.season} onChange={handleChange}>
            <option disabled value="">
              Seleccionar
            </option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
          {errors.emptySeason ? (
            <label htmlFor="season">{errors.emptySeason}</label>
          ) : (
            " "
          )}
          <label htmlFor="idCountries">Paises</label>
          <select
            name="idCountries"
            multiple
            value={data.idCountries}
            onChange={handleChangeCountries}
          >
            {countries &&
              countries.map(({ id, name, flag }, index) => {
                return (
                  <option key={index} value={id}>
                    {name}
                  </option>
                );
              })}
          </select>
          {errors.emptyCountry ? (
            <label htmlFor="idCountries">{errors.emptyCountry}</label>
          ) : (
            " "
          )}
          <button
            type="submit"
            disabled={Object.keys(errors).length !== 0}
            id={Object.keys(errors).length !== 0 ? "disabled" : ""}
          >
            Crear
          </button>
        </form>
        {message === "Actividad creada con exito" ? (
          <h3>Actividad creada con exito</h3>
        ) : message === "La actividad ya existe" ? (
          <h3>La actividad ya existe</h3>
        ) : (
          ""
        )}
      </main>
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </>
  );
};
export default FormPage;
