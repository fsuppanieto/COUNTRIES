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
export const search = (name) => {
  console.log(name);
  return async (dispatch) => {
    try {
      const response = (
        await axios(`http://localhost:3001/countries?name=${name}`)
      ).data;
      dispatch({
        type: "SEARCH",
        payload: response,
      });
    } catch (error) {
      console.log(error);
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
export const setPage = (index) => {
  return {
    type: "SET_PAGE",
    payload: index,
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

export const postActivities = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`http://localhost:3001/activities`, data);
      dispatch({
        type: "POST_ACTIVITIES",
        payload: "Actividad creada con exito",
      });
    } catch (error) {
      console.error("Error en postActivities:", error);
      console.log("Detalles del error:", error.response);
      dispatch({
        type: "POST_ACTIVITIES",
        payload: "La actividad ya existe",
      });
    }
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    try {
      const response = (await axios("http://localhost:3001/activities")).data;
      dispatch({
        type: GET_ACTIVITIES,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVITIES,
        payload: "No hay actividades disponibles",
      });
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
