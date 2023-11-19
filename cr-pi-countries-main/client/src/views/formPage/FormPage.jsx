import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getActivities } from "../../redux/actions";

const FormPage = ({ countries, getActivities }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    paises: [],
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Agrega un console.log para verificar las countries después de la llamada a la acción
    if (!countries || !countries.countries) {
      getActivities();
    }
    console.log("Countries después de getActivities:", countries);
  }, [getActivities, countries]);

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "paises") {
      const selectedCountries = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData({
        ...formData,
        [name]: selectedCountries,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    if (
      !formData.nombre ||
      !formData.dificultad ||
      !formData.duracion ||
      !formData.temporada ||
      formData.paises.length === 0
    ) {
      setErrorMessage("Todos los campos son obligatorios");
      return false;
    }

    if (
      isNaN(formData.dificultad) ||
      formData.dificultad < 1 ||
      formData.dificultad > 5
    ) {
      setErrorMessage("La dificultad debe ser un número entre 1 y 5");
      return false;
    }
    const nombreRegex = /^[a-zA-Z]+$/;
    if (!nombreRegex.test(formData.nombre)) {
      setErrorMessage("El nombre solo debe contener letras");
      return false;
    }

    if (isNaN(formData.duracion) || formData.duracion < 0) {
      setErrorMessage("La duración debe ser un número mayor o igual a 0");
      return false;
    }

    if (!formData.temporada) {
      setErrorMessage("Debes seleccionar una temporada");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Formulario enviado:", formData);
      setErrorMessage("");
    }
  };

  return (
    <div>
      <h1>FORM PAGE</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          Dificultad (1-5):
          <input
            type="number"
            name="dificultad"
            value={formData.dificultad}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </label>
        <label>
          Duración (en horas):
          <input
            type="number"
            name="duracion"
            value={formData.duracion}
            onChange={handleChange}
            min="0" // Puedes ajustar el valor mínimo según tus requisitos
          />
        </label>
        <label>
          Temporada:
          <select
            name="temporada"
            value={formData.temporada}
            onChange={handleChange}
          >
            <option value="">Selecciona una temporada</option>
            <option value="verano">Verano</option>
            <option value="otonio">Otoño</option>
            <option value="invierno">Invierno</option>
            <option value="primavera">Primavera</option>
          </select>
        </label>
        <br />

        {/* Resto de tus campos de formulario */}

        <label>
          Paises:
          <select
            name="paises"
            multiple
            value={formData.paises}
            onChange={handleChange}
          >
            {countries && countries.countries
              ? countries.countries.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))
              : null}
          </select>
        </label>
        <br />

        <button type="submit">Crear Actividad Turística</button>
      </form>
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
  };
};

export default connect(mapStateToProps, { getActivities })(FormPage);
