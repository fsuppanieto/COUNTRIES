import axios from "axios";

export const getAllCountries = () => {
  return (dispatch) => {
    try {
      const response = axios
        .get("http://localhost:3001/countries")
        .then(({ data }) => {
          return dispatch({
            type: "GET_ALL_COUNTRIES",
            payload: data,
          });
        });
    } catch (error) {
      console.error("Error fetching getAllCountries", error);
      alert(error.message);
    }
  };
};

export const showDetails = (idPais) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries/id/${idPais}`
      );
      const data = response.data;
      console.log("Data recibida desde API:", data);
      if (!data) {
        throw new Error("No se recibieron datos del país");
      }
      dispatch({
        type: "SHOW_DETAILS",
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching showDetails", error);
      alert(error.message);
    }
  };
};

export const searchByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries/name/${name}`
      );
      const countries = response.data;
      console.log("Data recibida desde API en searchByName", countries);

      dispatch({
        type: "SEARCH_BY_NAME",
        payload: countries,
      });
    } catch (error) {
      console.error("Error fetching searchByName", error);
      alert(error.message);
    }
  };
};
export const updateSearchTerm = (term) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_SEARCH_TERM",
      payload: term,
    });
  };
};
export const setPage = (newPage) => {
  return {
    type: "SET_PAGE",
    payload: newPage,
  };
};

export const orderCountries = (order) => {
  return {
    type: "ORDER",
    payload: order,
  };
};

export const orderByRegion = (region) => {
  return {
    type: "REGION",
    payload: region,
  };
};

export const orderByActivity = (activity) => {
  return {
    type: "ACTIVITY",
    payload: activity,
  };
};

export const createActivity = (activity) => {
  return async (dispatch) => {
    try {
      const { name, difficulty, season, Countries, duration, rating, image } =
        activity;
      const response = await axios.post("http://localhost:3001/activities", {
        name,
        difficulty,
        season,
        Countries,
        duration,
        rating,
        image,
      });
      alert("¡Felicidades, tu actividad ha sido creada!");
      dispatch({
        type: "CREATE_ACTIVITY",
        payload: response,
      });
    } catch (error) {
      console.error("Error fetching createActivity", error);
      alert("Falta información en algunos campos");
    }
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    try {
      // Obtener la lista de actividades
      const responseActivities = await axios.get(
        "http://localhost:3001/activities"
      );
      const activities = responseActivities.data;

      // Obtener la lista de países
      const responseCountries = await axios.get(
        "http://localhost:3001/countries"
      );
      const countries = responseCountries.data;
      console.log("paises de getactivities", countries);

      return dispatch({
        type: "GET_ACTIVITIES",
        payload: { activities, countries },
      });
    } catch (error) {
      console.error("Error fetching data", error);
      alert(error.message);
    }
  };
};

export const deleteActivity = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/activities/${id}`
      );

      console.log(response.data);

      return dispatch({
        type: "DELETE_ACTIVITY",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching deleteActivity", error);
      alert(error.message);
    }
  };
};
