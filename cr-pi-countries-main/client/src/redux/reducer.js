const initialState = {
  allCountries: [],
  allCountriesStore: [],
  loadingHome: true,
  items: 10,
  indexPage: 0,
  totalPages: 0,
  countryDetails: [],
  loadingDetails: false,
  loadingActivities: true,
  activities: [],
  message: "",
};
const calculatePages = (total, items) => {
  const remainder = total % items;
  if (total < items) {
    return 0;
  } else if (remainder !== 0) {
    return Math.ceil(total / items);
  } else {
    return total / items;
  }
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_ALL_COUNTRIES":
      if (
        !payload ||
        !payload.countries ||
        typeof payload.countries !== "object"
      ) {
        // Manejar el caso en el que payload no tenga la estructura esperada
        return state;
      }

      const countriesArray = Object.values(payload.countries);
      const pages = calculatePages(countriesArray.length, state.items);
      const lastIndex = state.items;
      return {
        ...state,
        allCountries: countriesArray.slice(0, state.items),
        allCountriesBackup: payload.countries,
        allCountriesStore: payload.countries,
        loadingHome: false,
        loadingDetails: true,
        loadingActivities: true,
        indexPage: 0,
        totalPages: pages,
        message: "",
      };
    case "SET_PAGE":
      const countriesCopyPage = [...state.allCountriesStore];
      return {
        ...state,
        allCountries: countriesCopyPage.slice(
          payload * state.items,
          payload * state.items + state.items
        ),
        indexPage: payload,
      };
    case "SEARCH":
      if (
        !payload ||
        (!Array.isArray(payload) && typeof payload !== "object")
      ) {
        // Si payload no es un array ni un objeto iterable, no hacemos cambios en el estado
        return state;
      }

      const searchResults = Array.isArray(payload)
        ? payload
        : Object.values(payload);

      const Pages = calculatePages(searchResults.length, state.items);

      return {
        ...state,
        allCountries: searchResults.slice(0, state.items),
        allCountriesStore: searchResults,
        indexPage: 0,
        totalPages: Pages,
      };
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

    case "POST_ACTIVITIES":
      return {
        ...state,
        message: payload,
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        allActivities: payload,
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
