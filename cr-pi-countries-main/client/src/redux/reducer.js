const initialState = {
  allCountries: [],
  renderedCountries: [],
  loadingHome: true,
  currentPage: 1,
  countryDetails: [],
  loadingDetails: false,
  loadingActivities: true,
  activities: [],
  searchTerm: " ",
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_ALL_COUNTRIES":
      return {
        ...state,
        allCountries: payload,
        renderedCountries: payload,
        loadingHome: false,
        loadingDetails: true,
        loadingActivities: true,
      };
    case "SET_PAGE":
      return {
        ...state,
        currentPage: payload,
      };
    case "SEARCH_BY_NAME":
      if (payload.length === 0) {
        return {
          ...state,
          currentPage: 1,
          renderedCountries: state.allCountries,
        };
      } else {
        return {
          ...state,
          renderedCountries: payload,
          currentPage: 1,
        };
      }
    case "UPDATE_SEARCH_TERM":
      return {
        ...state,
        searchTerm: payload,
      };
    case "SHOW_DETAILS":
      return {
        ...state,
        countryDetails: payload,
        loadingDetails: false,
        loadingHome: false,
        loadingActivities: false,
      };
    case "ORDER":
      return {
        ...state,
        renderedCountries: [...state.allCountries].sort((a, b) => {
          if (payload === "AZ") return a.name.localeCompare(b.name);
          if (payload === "ZA") return b.name.localeCompare(a.name);
          if (payload === "+") return b.population - a.population;
          return payload === "-" && a.population - b.population;
        }),
      };
    case "REGION":
      return {
        ...state,
        renderedCountries: state.allCountries.filter(
          (country) => country.continents === payload
        ),
        currentPage: 1,
      };
    case "ACTIVITY":
      let activity = state.activities.find(
        (activity) => activity.name === payload
      );

      return {
        ...state,
        renderedCountries: state.allCountries.filter((country) =>
          activity.Countries.includes(country.name)
        ),
        currentPage: 1,
      };

    case "CREATE_ACTIVITY":
      return {
        ...state,
        activities: [payload, ...state.activities],
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: payload.activities,
        countries: payload.countries,
        loadingActivities: false,
      };
    case "DELETE_ACTIVITY":
      return {
        ...state,
        activities: payload,
      };

    default:
      return state;
  }
}